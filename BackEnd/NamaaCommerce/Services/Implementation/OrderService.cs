using AutoMapper;
using Domain.Contracts;
using Domain.Entities.IdentityModule;
using Domain.Entities.NotificationModule;
using Domain.Entities.OrderModule;
using Domain.Entities.ProductModule;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Services.Abstraction.Contracts;
using Services.Specifications;
using Services.Specifications.order;
using Shared.Common;
using Shared.Dtos.NotificationDto;
using Shared.Dtos.OrderDto;
using Shared.Enums;
namespace Services.Implementation
{
    public class OrderService(ICurrentUserService _currentUserService,
        ISignalRNotificationService _notificationsService,
        IUnitOfWork _unitOfWork, IMapper _mapper, ILogger<OrderService> _logger,
        UserManager<ApplicationUser> _userManager) : IOrderService
    {

        private readonly IGenericRepository<Order, int> _orderRepository =
              _unitOfWork.GetRepository<Order, int>();

        public async Task AutoShipProcessingOrdersAsync()
        {
            var specification = new AutoShipOrdersSpecification();

            var orders = await _orderRepository.GetAllAsync(specification);

            foreach (var order in orders)
            {
                order.Status = OrderStatus.Shipped;

                var notification = new Notification
                {
                    OrderId = order.Id,
                    Message = $"Order #{order.Id} auto shipped."
                };

                await _unitOfWork
                    .GetRepository<Notification, int>()
                    .AddAsync(notification);

                _logger.LogInformation(
                    "Order {OrderId} automatically moved to Shipped",
                    order.Id);
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ChangeOrderStatusAsync(int orderId, OrderStatusDto newStatus)
        {
            var orderResult = await _orderRepository.GetByIdAsync(orderId);

            if (orderResult is null)
                throw new OrderNotFoundException(orderId);

            var previousStatus = orderResult.Status;

            UpdateOrderStatusOrder(orderResult, newStatus);

            var notification = await CreateNotificationAsync(orderResult, previousStatus);

            await _unitOfWork.SaveChangesAsync();

            var notificationMap = _mapper.Map<NotificationDto>(notification);

            await _notificationsService.SendOrderStatusChangedAsync(notificationMap);
        }
        public async Task<OrderResult> GetOrderByIdAsync(int id)

        {
            ISpecification<Order, int> specification;

            if (_currentUserService.UserRole == "Admin")
            {
                specification = new OrderWithDetailsSpecification(id);
            }
            else
            {
                specification = new OrderWithDetailsSpecification(_currentUserService.UserId!, id);
            }


            var order = await _orderRepository.GetByIdAsync(specification);

            if (order is null)
                throw new OrderNotFoundException(id);

            return _mapper.Map<OrderResult>(order);
        }

        public async Task<PaginatedResult<OrderResult>> GetOrdersAsync(OrderSpecificationParameters parameters)
        {
            ISpecification<Order, int> specification;

            if (_currentUserService.UserRole == "Admin")
            {
                specification = new OrdersWithItemsSpecification(parameters);
            }
            else
            {
                specification = new OrdersByClientSpecification(_currentUserService.UserId!, parameters);
            }

            var orders = await _orderRepository.GetAllAsync(specification);

            var OrdereDtos = _mapper.Map<IEnumerable<OrderResult>>(orders);

            var specificationForCount = new OrderCountSpecification();
            if (_currentUserService.UserRole == "Admin")
            {
                specificationForCount = new OrderCountSpecification(parameters);
            }
            else
            {
                specificationForCount = new OrderCountSpecification(_currentUserService.UserId!, parameters);
            }

            var totalCount = await _orderRepository.CountAsync(specificationForCount);

            var result = new PaginatedResult<OrderResult>(parameters.PageIndex,
              OrdereDtos.Count(),
              totalCount,
              OrdereDtos);

            return result;
        }

        public async Task<OrderResult> CreateOrderAsync(CreateOrderDto orderDto)
        {

            var neworder = await CreateOrder();

            var products = await ValidateProductsAsync(orderDto.Items);

            CreateOrderItems(neworder, orderDto.Items, products);

            UpdateStock(products, orderDto.Items);



            await _orderRepository.AddAsync(neworder);
            await _unitOfWork.SaveChangesAsync();

            var notification = new NotificationDto
            {
                Message = $"New Order #{neworder.Id} has been created.",
                Order = _mapper.Map<OrderResult>(neworder)
            };

          
            await _notificationsService.SendNewOrderAsync(notification);
           
            return _mapper.Map<OrderResult>(neworder);


        }

        public async Task CancelOrderAsync(int orderId)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);

            if (order is null)
                throw new OrderNotFoundException(orderId);

            if (order.Status != OrderStatus.Pending)
                throw new validationException("Only pending orders can be cancelled.");

            order.Status = OrderStatus.Cancelled;

            _orderRepository.Update(order);

            var notification = await CreateNotificationAsync(order, order.Status);

            await _unitOfWork.SaveChangesAsync();

            var notificationMap = _mapper.Map<NotificationDto>(notification);

            await _notificationsService.SendOrderStatusChangedAsync(notificationMap);

        }
       public async Task<OrderStatisticsDto> GetStatisticsAsync()
        {

            var orders = await _orderRepository.GetAllAsync();

            return new OrderStatisticsDto
            {
                TotalOrders = orders.Count(),
                Pending = orders.Count(o => o.Status == OrderStatus.Pending),
                Processing = orders.Count(o => o.Status == OrderStatus.Processing),
                Shipped = orders.Count(o => o.Status == OrderStatus.Shipped),
                Cancelled = orders.Count(o => o.Status == OrderStatus.Cancelled)
            };
        }

        #region HelperMethods


        private async Task<Order> CreateOrder()
        {
            if (_currentUserService.UserId is null)
            {
                throw new validationException("User is null");
            }
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);
            if (user is null)
            {
                throw new validationException("User not found");
            }
            return new Order
            {
                UserId = _currentUserService.UserId,
                ApplicationUser = user,
                Status = OrderStatus.Pending
            };
        }

        private async Task<List<Product>> ValidateProductsAsync(IEnumerable<OrderItemDto> items)
        {
            var repository = _unitOfWork.GetRepository<Product, int>();

            var products = new List<Product>();

            foreach (var item in items)
            {
                var product = await repository.GetByIdAsync(item.ProductId);

                if (product is null)
                    throw new ProductNotFoundException(item.ProductId);

                if (product.Stock < item.Quantity)
                    throw new validationException(
                        $"Insufficient stock for product '{product.Name}'.");

                products.Add(product);
            }

            return products;
        }

        private static void CreateOrderItems(Order order, IEnumerable<OrderItemDto> items,
            IEnumerable<Product> products)
        {
            foreach (var item in items)
            {
                var product = products.First(p => p.Id == item.ProductId);

                order.OrderItems.Add(new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price,


                });
                order.TotalOrder += product.Price * item.Quantity;
            }
        }
        private static void UpdateStock(IEnumerable<Product> products, IEnumerable<OrderItemDto> items)
        {
            foreach (var product in products)
            {
                var quantity = items
                    .First(i => i.ProductId == product.Id)
                    .Quantity;

                product.Stock -= quantity;
            }
        }
        #endregion


        #region HelperMethod ChangeStatus
        private static void UpdateOrderStatusOrder(Order order, OrderStatusDto newStatus)
        {
            if (order.Status == (OrderStatus)newStatus)
                throw new validationException("Order is already in this status.");

            if (!IsValidTransition(order.Status, (OrderStatus)newStatus))
                throw new validationException($"Cannot change order status from {order.Status} to {newStatus}.");

            order.Status = (OrderStatus)newStatus;
        }
        private static bool IsValidTransition(OrderStatus current, OrderStatus next)
        {
            return current switch
            {
                OrderStatus.Pending =>
                    next is OrderStatus.Processing or OrderStatus.Cancelled,

                OrderStatus.Processing =>
                    next is OrderStatus.Shipped or OrderStatus.Cancelled,

                OrderStatus.Shipped =>
                    next == OrderStatus.Delivered,

                OrderStatus.Delivered => false,

                OrderStatus.Cancelled => false,

                _ => false
            };
        }
        private async Task<Notification> CreateNotificationAsync(Order order, OrderStatus previousStatus)
        {
            var notification = new Notification
            {
                OrderId = order.Id,
                Message = $"Order #{order.Id} status changed from {previousStatus} to {order.Status}"
            };

            await _unitOfWork.GetRepository<Notification, int>().AddAsync(notification);

            return notification;
        }
        #endregion

    }
}
