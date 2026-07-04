using AutoMapper;
using Domain.Contracts;
using Domain.Entities.NotificationModule;
using Domain.Exceptions;
using Services.Abstraction.Contracts;
using Services.Specifications;
using Shared.Dtos.NotificationDto;


namespace Services.Implementation.NotificationService
{
    public class NotificationService(IUnitOfWork _unitOfWork, IMapper _mapper) : INotificationService
    {
        private readonly IGenericRepository<Notification, int> _notificationRepository =
                   _unitOfWork.GetRepository<Notification, int>();

        public async Task<IEnumerable<NotificationDto>> GetUnreadAsync(string userId)
        {
            var spec = new UnreadNotificationsSpecification(userId);

            var notifications = await _notificationRepository
                .GetAllAsync(spec);

            return _mapper.Map<IEnumerable<NotificationDto>>(notifications);
        }
        public async Task MarkAsReadAsync(int id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);

            if (notification is null)
                throw new NotFoundException($"Notification ({id}) was not found.");

            notification.IsRead = true;

           _notificationRepository.Update(notification);

            await _unitOfWork.SaveChangesAsync();
        }
        public async Task MarkAllAsReadAsync(string userId)
        {
            var spec = new UnreadNotificationsSpecification(userId);

            var notifications = await _notificationRepository.GetAllAsync(spec);

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
                _notificationRepository.Update(notification);
            }

            await _unitOfWork.SaveChangesAsync();
        }
    }
}
