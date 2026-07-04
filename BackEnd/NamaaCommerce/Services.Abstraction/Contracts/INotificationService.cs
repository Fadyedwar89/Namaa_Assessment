using Shared.Dtos.NotificationDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Abstraction.Contracts
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>> GetUnreadAsync(string userId);

        Task MarkAsReadAsync(int id);

        Task MarkAllAsReadAsync(string userId);
    }
}
