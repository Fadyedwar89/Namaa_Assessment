using System.ComponentModel.DataAnnotations;

namespace Shared.Dtos.AuthenticationDTO
{
    public record RegisterDto(
        string DisplayName,
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        string Email,
        string Password)
    {
    }
}
