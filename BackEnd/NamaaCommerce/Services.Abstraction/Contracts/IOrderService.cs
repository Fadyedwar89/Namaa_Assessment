using Shared.Common;
using Shared.Dtos.OrderDto;
using Shared.Enums;

namespace Services.Abstraction.Contracts
{
    public interface IOrderService
    {
        //user
        public Task<OrderResult> CreateOrderAsync(CreateOrderDto orderDto);

        // Admin AND user
        public Task<OrderResult> GetOrderByIdAsync(int id);
        public Task<PaginatedResult<OrderResult>> GetOrdersAsync(OrderSpecificationParameters parameters);

        // Admin
        public Task ChangeOrderStatusAsync(int orderId, OrderStatusDto newStatus);
        public Task AutoShipProcessingOrdersAsync();
        Task CancelOrderAsync(int orderId);

        Task<OrderStatisticsDto> GetStatisticsAsync();
    }
}
