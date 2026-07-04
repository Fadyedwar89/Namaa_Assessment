using Domain.Entities.OrderModule;


namespace Domain.Entities.NotificationModule
{
    public class Notification : BaseEntity<int>
    {
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public string Message { get; set; } = null!;

        public bool IsRead { get; set; } = false;
    }
}
