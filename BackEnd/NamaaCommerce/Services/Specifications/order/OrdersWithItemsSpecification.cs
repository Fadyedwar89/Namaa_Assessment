using Domain.Entities.OrderModule;
using Microsoft.EntityFrameworkCore;
using Shared.Common;

namespace Services.Specifications.order
{
    internal class OrdersWithItemsSpecification : BaseSpecification<Order, int>
    {
        public OrdersWithItemsSpecification(OrderSpecificationParameters Parameters) :
            base(o=>
                o.Status == (OrderStatus)Parameters.OrderStatus|| !Parameters.OrderStatus.HasValue  )

        {
            AddInclude(o => o.OrderItems);
            AddIncludeWith(q => q
              .Include(o => o.OrderItems)
              .ThenInclude(oi => oi.Product));

            AddInclude(o => o.ApplicationUser);

            AddOrderByDescending(o => o.CreatedAt);

             AddOrderBy(o => o.CreatedAt);

            ApplyPagination(Parameters.PageIndex, Parameters.PageSize);
        }

    }
}
