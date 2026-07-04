using AutoMapper;
using Domain.Contracts;
using Domain.Entities.NotificationModule;
using Domain.Entities.OrderModule;
using Microsoft.AspNetCore.SignalR;
using Services.Abstraction.Contracts;
using Shared.Dtos.NotificationDto;


namespace Services.Implementation.NotificationService
{
    public class SignalRService(IUnitOfWork _unitOfWork, IHubContext<NotificationHub> _hubContext,IMapper mapper) : ISignalRNotificationService
    {
      
        public async Task SendOrderStatusChangedAsync(NotificationDto notification)
        {
            var entity = new Notification
            {
                OrderId = notification.Order.Id,
                Message = notification.Message,
                IsRead = false
            };

            await _unitOfWork.GetRepository<Notification, int>().AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            await _hubContext.Clients.User(notification.Order.UserId.ToString())
                .SendAsync("ReceiveNotification", notification);
        }
        public async Task SendNewOrderAsync(NotificationDto notification)
        {
            await _hubContext.Clients.All
    .SendAsync("ReceiveNotification", notification);
            var entity = new Notification
            {
                OrderId = notification.Order.Id,
                Message = notification.Message,
                IsRead = false
            };

            await _unitOfWork.GetRepository<Notification, int>().AddAsync(entity);

            await _unitOfWork.SaveChangesAsync();

        }
    }
}
