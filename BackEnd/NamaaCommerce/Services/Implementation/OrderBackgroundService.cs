using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Services.Abstraction.Contracts;

namespace Services.Implementation
{
    public class OrderBackgroundService(ILogger<OrderBackgroundService> _logger, IServiceScopeFactory _scopeFactory) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Background Service Started");
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();

                var orderService = scope.ServiceProvider.GetRequiredService<IOrderService>();

                await orderService.AutoShipProcessingOrdersAsync();

                await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
            }
        }
    }
}
