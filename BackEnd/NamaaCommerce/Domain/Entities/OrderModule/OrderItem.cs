
using Domain.Entities.ProductModule;

namespace Domain.Entities.OrderModule
{
    public class OrderItem : BaseEntity<int>
    {
        public int OrderId { get; set; } 

        public Order Order { get; set; } = null!;

        public int ProductId { get; set; }


        public Product Product { get; set; } = null!;

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }
    }
}
