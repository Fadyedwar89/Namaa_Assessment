using Domain.Contracts;
using NamaaCommerce.API.Middlewares;

namespace NamaaCommerce.API.Extensions
{
    public static class WebApplicationExtensions
    {
        public static async  Task<WebApplication> SeedDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope(); // Create a scope to resolve the IDataSeeding service
            var dataSeed = scope.ServiceProvider.GetRequiredService<IDataSeeding>(); // Resolve the IDataSeeding service from the service provider
            await dataSeed.SeedDataAsync(); // Call the SeedData method to seed the data
                                                       
            await dataSeed.SeedIdentityDataAsync();
            // Call the SeedIdentityData method to seed the identity data
            return app;
        }

        public static WebApplication UseGlobalExceptionHandlingMiddleware(this WebApplication app)
        {
            app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
            return app;
        }

        public static WebApplication UseSwaggerMiddleware(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            return app;
        }

    }
}
