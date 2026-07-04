using Domain.Entities.OrderModule;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Specifications.order
{
    internal class OrderWithDetailsSpecification: BaseSpecification<Order, int>
    {

         public OrderWithDetailsSpecification(int id)
        : base(o => o.Id == id)
    {
        AddInclude(o => o.ApplicationUser);
        AddInclude(o => o.OrderItems);
            AddIncludeWith(q => q
                   .Include(o => o.OrderItems)
                   .ThenInclude(oi => oi.Product));
        }
        public OrderWithDetailsSpecification(string UserId,int id) : base(o => o.Id == id && o.UserId == UserId)
        {
            AddInclude(o => o.ApplicationUser);

            AddInclude(o => o.OrderItems);
            AddIncludeWith(q => q
                   .Include(o => o.OrderItems)
                   .ThenInclude(oi => oi.Product));
        }
    }
}
