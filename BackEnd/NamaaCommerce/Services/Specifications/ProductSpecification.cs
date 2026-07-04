using Domain.Entities.ProductModule;
using Shared.Common;
using Shared.Enums;

namespace Services.Specifications
{
    internal class ProductSpecification : BaseSpecification<Product, int>
    {
        public ProductSpecification(ProductSpecificationParameters Parameters) : base(p =>

                    (string.IsNullOrEmpty(Parameters.Search) ||
        p.Name.ToLower().Contains(Parameters.Search.ToLower())))
        {

            switch (Parameters.SortOrder)
            {
                case SortOptions.NameAsc:
                    AddOrderBy(p => p.Name);
                    break;
                case SortOptions.NameDesc:
                    AddOrderByDescending(p => p.Name);
                    break;
                case SortOptions.PriceAsc:
                    AddOrderBy(p => p.Price);
                    break;
                case SortOptions.PriceDesc:
                    AddOrderByDescending(p => p.Price);
                    break;
                default:

                    break;
            }
            
            ApplyPagination(Parameters.PageIndex, Parameters.PageSize);
        }
    }
}
