
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
namespace Services.Implementation.NotificationService
{

    [Authorize]
    public class NotificationHub : Hub
    {
        public class NotificationHub : Hub
        {
            public override async Task OnConnectedAsync()
            {
                Console.WriteLine("========== HUB ==========");
                Console.WriteLine($"Authenticated: {Context.User?.Identity?.IsAuthenticated}");
                Console.WriteLine($"Name: {Context.User?.Identity?.Name}");
                Console.WriteLine($"IsAdmin: {Context.User?.IsInRole("Admin")}");

                foreach (var claim in Context.User.Claims)
                {
                    Console.WriteLine($"{claim.Type} = {claim.Value}");
                }

                if (Context.User.IsInRole("Admin"))
                {
                    Console.WriteLine("Added To Admin Group");
                    await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
                }

                await base.OnConnectedAsync();
            }
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (Context.User.IsInRole("Admin"))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Admins");
            }

            await base.OnDisconnectedAsync(exception);
        }
      

    }
}
