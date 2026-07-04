using Domain.Entities.IdentityModule;

namespace Services.TokenGenerateProfile
{
    public interface ITokenService
    {
        Task<string> GenerateTokenAsync(ApplicationUser user);
    }
}
