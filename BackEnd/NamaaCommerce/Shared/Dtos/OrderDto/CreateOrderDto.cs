

namespace Shared.Dtos.OrderDto
{
    public record CreateOrderDto
    {
   
        public IEnumerable<OrderItemDto> Items { get; init; } = [];
    }
}
