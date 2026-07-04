using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NamaaCommerce.API.Factory;
using Presentation;

namespace NamaaCommerce.API.Extensions
{
    public static class WebApiServicesExtensions
    {
        public static IServiceCollection AddWebApiServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("URLS")["FrontendURl"];

            services.AddControllers().AddApplicationPart(typeof(ControllerAssembly).Assembly);


            services.AddCors(options =>
            {
                
                options.AddPolicy("ReactPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();
            services.Configure<ApiBehaviorOptions>(option =>
            {
                option.InvalidModelStateResponseFactory = ApiResponseFactory.CustomValidationErrorResponse;
            });

            return services;
        }
    }
}
