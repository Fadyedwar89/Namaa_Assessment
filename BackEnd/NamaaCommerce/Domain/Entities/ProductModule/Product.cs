
using Domain.Entities.OrderModule;


namespace Domain.Entities.ProductModule
{
    public class Product : BaseEntity<int> 
    {
      
        public string Name { get; set; } = null!;
     
        public string Description { get; set; } = null!;
        
 
        public decimal Price { get; set; }

      
        public int Stock { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Navigation property to OrderItem

    }
}
