using Domain.Entities.ProductModule;
using Shared.Common;



namespace Services.Specifications
{
    internal class ProductCountSpecification : BaseSpecification<Product, int>
    {
        public ProductCountSpecification(ProductSpecificationParameters Parameters)

           :base(p => (string.IsNullOrEmpty(Parameters.Search)|| 
             p.Name.ToLower().Contains(Parameters.Search.ToLower())))
        { 

        }

    }
}