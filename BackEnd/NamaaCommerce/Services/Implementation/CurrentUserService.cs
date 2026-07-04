using Microsoft.AspNetCore.Http;
using Services.Abstraction.Contracts;
using System.Security.Claims;


namespace Services.Implementation
{
    public class CurrentUserService(IHttpContextAccessor accessor) : ICurrentUserService
    {
        public string? UserId => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        public string? UserName => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name);
        public string? UserEmail => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
        public string? UserRole => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role);
    }
}
