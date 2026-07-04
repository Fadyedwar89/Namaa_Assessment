using System.ComponentModel.DataAnnotations;

namespace Shared.Dtos.OrderDto
{
    public record OrderItemDto 
    {
        public int ProductId { get; init; } 
        public string ProductName { get; init; } = string.Empty;
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public int Quantity { get; init; }
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; init; }

    }
}
