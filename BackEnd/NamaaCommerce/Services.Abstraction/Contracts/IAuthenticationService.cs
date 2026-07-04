using Shared.Dtos.AuthenticationDTO;
using Shared.Dtos.NotificationDto;

namespace Services.Abstraction.Contracts
{
    public interface IAuthenticationService 
    {
        Task<UserResultDto> LoginAsync(LoginDto loginDto);
        Task<UserResultDto> RegisterAsync(RegisterDto registerDto);
        Task<UserResultDto> GetCurrentUserAsync(string userEmail);
        Task<bool> EmailExistsAsync(string email);
       
    }
}

