using Shared.Common;
using Shared.Dtos.ProductDTO;


namespace Services.Abstraction.Contracts
{
    public interface IProductService
    {
        Task<PaginatedResult<UserProductResultDto>> GetAllProductsAsync(ProductSpecificationParameters Parameters);   
        Task<UserProductResultDto> GetProductByIdAsync(int id);
        Task<AdminProductResultDto> CreateProductAsync(CreateOrUpdateProductDto productDto);
        Task<AdminProductResultDto> UpdateProductAsync(int id , CreateOrUpdateProductDto productDto);
        Task DeleteProductAsync(int id);

    }
}
