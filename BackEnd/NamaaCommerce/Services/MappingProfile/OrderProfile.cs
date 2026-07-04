using AutoMapper;
using Domain.Entities.OrderModule;
using Shared.Dtos.OrderDto;

namespace Services.MappingProfile
{
    internal class OrderProfile : Profile
    {
        public OrderProfile()
        {

            CreateMap<Order, OrderResult>()
                 .ForMember(d => d.UserName,
                  o => o.MapFrom(s => s.ApplicationUser.DisplayName))
                   .ForMember(d => d.Status,
                   o => o.MapFrom(s => s.Status.ToString()))
                  .ForMember(d => d.OrderItems,
                    o => o.MapFrom(s => s.OrderItems)).ReverseMap();


            CreateMap<OrderItem, OrderItemDto>()
              .ForMember(d => d.ProductName,
                 o => o.MapFrom(s => s.Product.Name))
                  .ForMember(d => d.Price,
                 o => o.MapFrom(s => s.UnitPrice)).ReverseMap(); 

        }

    }
}
