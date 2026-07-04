using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstraction.Contracts;
using Shared.Common;
using Shared.Dtos.ProductDTO;

namespace Presentation.Controllers
{
    public class ProductController(IProductService _productService) : ApiController
    { 
        [HttpGet]
        public async Task<ActionResult<PaginatedResult<UserProductResultDto>>> GetAllProducts([FromQuery] ProductSpecificationParameters parameters)
            => Ok(await _productService.GetAllProductsAsync(parameters));
     
        [HttpGet("{id}")]
        public async Task<ActionResult<UserProductResultDto>> GetProductById(int id) 
            => Ok(await _productService.GetProductByIdAsync(id));
       
        [HttpPost("CreateProduct")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AdminProductResultDto>> CreateProduct(CreateOrUpdateProductDto productDto)
         => await _productService.CreateProductAsync(productDto);

        [HttpPut("UpdateProduct/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AdminProductResultDto>> UpdateProduct(int id, CreateOrUpdateProductDto productDto)
            => await _productService.UpdateProductAsync(id,productDto);

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
