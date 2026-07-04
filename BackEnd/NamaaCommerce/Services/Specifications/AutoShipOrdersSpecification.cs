using Domain.Entities.OrderModule;

namespace Services.Specifications
{
    internal class AutoShipOrdersSpecification
    : BaseSpecification<Order, int>
    {
        public AutoShipOrdersSpecification()
            : base(o =>
                o.Status == OrderStatus.Processing &&
                o.UpdatedAt <= DateTime.UtcNow.AddHours(-24))
        {
        }
    }
}
