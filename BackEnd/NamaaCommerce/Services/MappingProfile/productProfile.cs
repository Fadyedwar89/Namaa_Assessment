using AutoMapper;
using Domain.Entities.ProductModule;
using Shared.Dtos.ProductDTO;


namespace Services.MappingProfile
{
    internal class productProfile : Profile
    {
        public productProfile()
        {
            CreateMap<Product, UserProductResultDto>().ReverseMap();
            CreateMap<Product, CreateOrUpdateProductDto>().ReverseMap();
            CreateMap<Product, AdminProductResultDto>().ReverseMap();



        }
    }
}
