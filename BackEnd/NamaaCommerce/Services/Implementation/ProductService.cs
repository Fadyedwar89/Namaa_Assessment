using AutoMapper;
using Domain.Contracts;
using Domain.Entities.ProductModule;
using Domain.Exceptions;
using Services.Abstraction.Contracts;
using Services.Specifications;
using Shared.Common;
using Shared.Dtos.ProductDTO;

namespace Services.Implementation
{
    public class ProductService(IUnitOfWork _unitOfWork, IMapper _mapper) : IProductService
    {
        private readonly IGenericRepository<Product, int> _productRepository =
            _unitOfWork.GetRepository<Product, int>();

        public async Task<UserProductResultDto> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new ProductNotFoundException(id);
            }
            return _mapper.Map<UserProductResultDto>(product);
        }

        public async Task<PaginatedResult<UserProductResultDto>> GetAllProductsAsync(ProductSpecificationParameters Parameters)
        {
            var specification = new ProductSpecification(Parameters);
            var products = await _productRepository.GetAllAsync(specification);

            var productDtos = _mapper.Map<IEnumerable<UserProductResultDto>>(products);

            var specificationForCount = new ProductCountSpecification(Parameters);
            var totalCount = await _productRepository.CountAsync(specificationForCount);

            var result = new PaginatedResult<UserProductResultDto>(Parameters.PageIndex,
              productDtos.Count(),
              totalCount,
              productDtos);

            return result;
        }
        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new ProductNotFoundException(id);
            }

            _productRepository.Delete(product);
            await _unitOfWork.SaveChangesAsync();

        }
        public async Task<AdminProductResultDto> CreateProductAsync(CreateOrUpdateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            await _productRepository.AddAsync(product);
            await _unitOfWork.SaveChangesAsync();

            var resultDto = _mapper.Map<AdminProductResultDto>(product);

            return resultDto;
        }

        public async Task<AdminProductResultDto> UpdateProductAsync(int id, CreateOrUpdateProductDto productDto)
        {

            var existingProduct = await _productRepository.GetByIdAsync(id);
            if (existingProduct == null)
                throw new ProductNotFoundException(id);

            _mapper.Map(productDto, existingProduct);

            _productRepository.Update(existingProduct);

            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<AdminProductResultDto>(existingProduct);
        }
    }
}
