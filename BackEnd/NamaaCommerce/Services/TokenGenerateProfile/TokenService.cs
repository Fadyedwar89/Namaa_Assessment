using Domain.Entities.IdentityModule;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Shared.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Services.TokenGenerateProfile
{
    public class TokenService(IOptions<JWTOption> _options,UserManager<ApplicationUser> _userManager): ITokenService
    {
        public async Task<string> GenerateTokenAsync(ApplicationUser user)
        {
            var jwtOption = _options.Value;
            // claims
            // Name ,email,roles 
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name,user.UserName!),
                new Claim(ClaimTypes.Email,user.Email!),
                };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var item in roles)
                claims.Add(new Claim(ClaimTypes.Role, item));

            // security key

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOption.SecretKey));

            // algorithm + key

            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // token 

            var token = new JwtSecurityToken(
                issuer: jwtOption.Issuer,
                audience: jwtOption.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(jwtOption.ExpirationInDay),
                signingCredentials: signingCredentials
                );

            //write the token object member method ==> jwtSecurityTokenHandler()

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
