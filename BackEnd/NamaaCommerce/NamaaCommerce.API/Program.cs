
using NamaaCommerce.API.Extensions;
using Services.Implementation.NotificationService;

namespace NamaaCommerce.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddInfrastructureServices(builder.Configuration);
            builder.Services.AuthenticationExtension(builder.Configuration);
            builder.Services.AddWebApiServices(builder.Configuration);
            builder.Services.AddCoreServices(builder.Configuration);

            var app = builder.Build();
          
            // Register the IDataSeeding service with its implementation
            await app.SeedDatabaseAsync();

            // Register the global exception handling Middleware as the first Middleware.
            app.UseGlobalExceptionHandlingMiddleware();

            // Configure the HTTP request pipeline.
            app.UseSwaggerMiddleware();
            app.UseHttpsRedirection();
            app.UseCors("ReactPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.MapHub<NotificationHub>("/notificationHub");

            app.Run();
        }
    }
}
