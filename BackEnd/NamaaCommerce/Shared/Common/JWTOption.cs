
namespace Shared.Common
{
    public class JWTOption
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string SecretKey { get; set; } = string.Empty;
        public int ExpirationInDay { get; set; }
    }

}
