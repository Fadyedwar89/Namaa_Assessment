
namespace Shared.Dtos.ProductDTO
{
    public record AdminProductResultDto(
        int Id,
        string Name,
        string Description,
        decimal Price,
        int Stock,
        DateTime CreatedAt,
        DateTime? UpdatedAt
    );
}
