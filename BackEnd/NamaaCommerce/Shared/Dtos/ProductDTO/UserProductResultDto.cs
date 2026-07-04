namespace Shared.Dtos.ProductDTO
{
    public record UserProductResultDto(
       int Id,
    string Name,
    string Description,
    decimal Price,
    int Stock);
}
