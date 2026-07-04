using Domain.Entities.IdentityModule;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;
using Services.Abstraction.Contracts;
using Services.TokenGenerateProfile;
using Shared.Dtos.AuthenticationDTO;

namespace Services.Implementation
{
    public class AuthenticationService(UserManager<ApplicationUser> _userManager,
        ITokenService _tokenService) : IAuthenticationService
    {
       
        public async Task<bool> EmailExistsAsync(string email)
        => await _userManager.FindByEmailAsync(email) is not null;

        /// Authenticates a user and returns a
        /// displayName + Email+JWT token.
        public async Task<UserResultDto> GetCurrentUserAsync(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user is null)
                throw new UserNotFoundException(userEmail); 
            return await MapUserResultDtoAsync(user);
        }

        public async Task<UserResultDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user is null)
                throw new UnauthenticatedException();

            var passwordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!passwordValid)
                throw new UnauthenticatedException();

            return await MapUserResultDtoAsync(user);
        }

        public async Task<UserResultDto> RegisterAsync(RegisterDto registerDto)
        {
            var client = new ApplicationUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email

            };

            var result = await _userManager.CreateAsync(client, registerDto.Password);
            var resultRole = await _userManager.AddToRoleAsync(client, "Client");

            //validate the result
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();

                throw new validationException(errors);
            }
            else if(!resultRole.Succeeded)
            {
                var errors = resultRole.Errors.Select(e => e.Description).ToList();
                throw new validationException(errors);
            }

            return await MapUserResultDtoAsync(client);

        }

        private async Task<UserResultDto> MapUserResultDtoAsync(ApplicationUser user)
        {
            return new UserResultDto
            ( 
               user.DisplayName,
                user.Email!,
                await _tokenService.GenerateTokenAsync(user)
            );
        }

    }
}