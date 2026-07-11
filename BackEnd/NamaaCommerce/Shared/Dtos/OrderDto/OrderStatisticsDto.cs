using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Dtos.OrderDto
{
    public class OrderStatisticsDto
    {
        public int TotalOrders { get; set; }
        public int Pending { get; set; }
        public int Processing { get; set; }
        public int Shipped { get; set; }
        public int Cancelled { get; set; }
    }
}
