using Domain.Entities.NotificationModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.Specifications
{
    internal class UnreadNotificationsSpecification
      : BaseSpecification<Notification, int>
    {

        public UnreadNotificationsSpecification(string userId)
            : base(n => n.Order.UserId == userId && !n.IsRead)
        {
            AddInclude(n => n.Order);
        }


    }
}
