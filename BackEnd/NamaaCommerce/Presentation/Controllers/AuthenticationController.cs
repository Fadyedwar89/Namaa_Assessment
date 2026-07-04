using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstraction.Contracts;
using Shared.Dtos.AuthenticationDTO;
using System.Security.Claims;

namespace Presentation.Controllers
{
    public class AuthenticationController(IAuthenticationService _service) : ApiController
    {

        [HttpPost("Login")]
        public async Task<ActionResult<UserResultDto>> LoginAsync(LoginDto loginDto)
         => Ok(await _service.LoginAsync(loginDto));

        [HttpGet("EmailExists")]
        public async Task<ActionResult<bool>> EmailExistsAsync(string email)
         => Ok(await _service.EmailExistsAsync(email));

        [HttpPost("Register")]
        public async Task<ActionResult<UserResultDto>> RegisterAsync(RegisterDto registerDto)
         => Ok(await _service.RegisterAsync(registerDto));
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserResultDto>> GetCurrentUserAsync()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            return Ok(await _service.GetCurrentUserAsync(email!));
        }
    }
}
