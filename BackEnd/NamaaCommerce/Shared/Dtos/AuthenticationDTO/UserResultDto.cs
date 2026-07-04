namespace Shared.Dtos.AuthenticationDTO
{
    public record UserResultDto( 
        string DisplayName,
        string Email,
        string Token)
    { }
}
