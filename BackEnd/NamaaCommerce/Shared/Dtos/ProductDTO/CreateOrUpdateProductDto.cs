

using System.ComponentModel.DataAnnotations;

namespace Shared.Dtos.ProductDTO
{
    public record CreateOrUpdateProductDto
    (
        [Required(ErrorMessage = "Product name is required.")]
        string Name,
        [Required(ErrorMessage = "Product description is required.")]
        string Description,
         [Range(0.01, double.MaxValue, ErrorMessage = "Price must be positive.")]
        decimal Price,
        [Range(0, int.MaxValue, ErrorMessage = "Stock cannot be negative.")]
        int Stock
        );
}
