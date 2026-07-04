using AutoMapper;
using Domain.Entities.NotificationModule;
using Shared.Dtos.NotificationDto;

namespace Services.MappingProfile
{
    public class NotificationProfile: Profile
    {
        public NotificationProfile()
        {
            CreateMap<Notification, NotificationDto>()
                .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
                .ReverseMap();
        }
    }
}
