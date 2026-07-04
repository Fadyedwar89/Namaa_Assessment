

using Shared.Dtos.NotificationDto;

namespace Services.Abstraction.Contracts
{
    public interface ISignalRNotificationService
    {
        Task SendOrderStatusChangedAsync(NotificationDto notification);
        Task SendNewOrderAsync(NotificationDto notification);

    }
}
