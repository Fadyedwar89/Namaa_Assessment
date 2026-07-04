

using Domain.Entities.OrderModule;
using Shared.Common;

namespace Services.Specifications.order
{
    internal class OrderCountSpecification : BaseSpecification<Order, int>
    {
        public OrderCountSpecification():base(o=>string.IsNullOrEmpty(""))
        { }
        public OrderCountSpecification(OrderSpecificationParameters parameters) :
            base(o => !parameters.OrderStatus.HasValue || o.Status == (OrderStatus)parameters.OrderStatus)
        {
        }
        public OrderCountSpecification( string clientId, OrderSpecificationParameters parameters)
       : base(
                  o => o.UserId == clientId
                  &&(!parameters.OrderStatus.HasValue || o.Status == (OrderStatus)parameters.OrderStatus))
        {
        }
    }
}
