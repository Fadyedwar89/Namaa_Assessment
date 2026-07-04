

namespace Services.Abstraction.Contracts
{
    public interface ICurrentUserService
    {
        string? UserId { get; }
       string? UserName { get; }
        string? UserEmail { get; }
        string? UserRole { get; }
    }
}
