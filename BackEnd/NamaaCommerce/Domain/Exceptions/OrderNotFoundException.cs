using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class OrderNotFoundException: NotFoundException
    {
        public OrderNotFoundException(int orderId) : base($"Order with ID {orderId} not found.")
        {
        }
    }
}
