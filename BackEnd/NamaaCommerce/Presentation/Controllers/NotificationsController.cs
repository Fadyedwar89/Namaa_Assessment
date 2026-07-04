using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstraction.Contracts;
using System.Security.Claims;

namespace Presentation.Controllers;

[Authorize]
public class NotificationsController(INotificationService notificationService) : ApiController
{
    [HttpGet("unread")]
    public async Task<IActionResult> GetUnread()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        var result = await notificationService.GetUnreadAsync(userId);

        return Ok(result);
    }

    [HttpPatch("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        await notificationService.MarkAsReadAsync(id);

        return NoContent();
    }

    [HttpPatch("read-all")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        await notificationService.MarkAllAsReadAsync(userId);

        return NoContent();
    }
}