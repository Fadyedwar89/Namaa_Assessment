using Shared.Dtos.OrderDto;

namespace Shared.Dtos.NotificationDto
{
    public record NotificationDto 
    {
        public int id { get; init; }
        public OrderResult Order { get; init; } = null!;
        public string Message { get; init; } = null!;
        public bool IsRead { get; init; }

        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }

    }
   
}
