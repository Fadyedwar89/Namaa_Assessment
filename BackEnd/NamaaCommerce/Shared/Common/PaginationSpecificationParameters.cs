using Shared.Enums;

namespace Shared.Common
{
    public class PaginationSpecificationParameters
    {
        
        public int PageIndex { get; set; } = 1;

        private const int MaxPageSize = 20;
        private const int defaultPageSize = 5;

        private int _pageSize = defaultPageSize;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    

    }
    public class OrderSpecificationParameters : PaginationSpecificationParameters
    {
       public OrderStatusDto? OrderStatus { get; set; }


    }
    public class ProductSpecificationParameters : PaginationSpecificationParameters
    {
        public SortOptions SortOrder { get; set; }

        public string? Search { get; set; }

    }
}