using Services;
using Services.Abstraction.Contracts;
using Services.Implementation;
using Services.Implementation.NotificationService;
using Services.TokenGenerateProfile;

namespace NamaaCommerce.API.Extensions
{
    public static class CoreServicesExtensions
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(cfg => { }, typeof(ServicesAssembly).Assembly);

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();

            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<ISignalRNotificationService, SignalRService>();

            services.AddSignalR();

            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddHostedService<OrderBackgroundService>();
            return services;

        }
    }
}
