using Shared.Dtos.OrderDto;

namespace Shared.Dtos.OrderDto
{
    public record OrderResult
    {
        public int Id { get; init; }
        public string UserId { get; init; } = string.Empty;
        public string UserName { get; init; }= string.Empty;
        public string Status { get; init; } = string.Empty;
        public DateTime CreatedAt { get; init; }
        public IEnumerable<OrderItemDto> OrderItems { get; init; } = [];
        public decimal TotalOrder { get; init; }
    }

}
