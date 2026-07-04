
using Domain.Entities.IdentityModule;
using Domain.Entities.NotificationModule;

namespace Domain.Entities.OrderModule
{
    public class Order : BaseEntity<int>
    {
        public string UserId { get; set; } = string.Empty;

        public ApplicationUser ApplicationUser { get; set; } = null!;

        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public decimal TotalOrder { get; set; }
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
