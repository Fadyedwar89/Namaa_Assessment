using Domain.Entities.OrderModule;
using Microsoft.EntityFrameworkCore;
using Shared.Common;


namespace Services.Specifications.order
{
    internal class OrdersByClientSpecification : BaseSpecification<Order, int>
    {
        public OrdersByClientSpecification(string clientId, OrderSpecificationParameters parameters)
            : base(
                  o => o.UserId == clientId
                  && (!parameters.OrderStatus.HasValue || o.Status == (OrderStatus)parameters.OrderStatus))
        {
           
            AddInclude(o => o.OrderItems);

            AddInclude(o => o.Notifications);

            AddInclude(o => o.ApplicationUser);

            AddIncludeWith(q => q
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product));

            AddOrderByDescending(o => o.CreatedAt);

            ApplyPagination(parameters.PageIndex,parameters.PageSize);
        }
    }
}
