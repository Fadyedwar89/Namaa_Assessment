using Domain.Entities.IdentityModule;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;
namespace Persistence.Data
{
    public class DataSeeding(ApplicationDbContext _dbContext, UserManager<ApplicationUser> _userManager, RoleManager<IdentityRole> _roleManager) : IDataSeeding
    {
        public async Task SeedDataAsync()
        {
            try
            {
                var pendingMigrations = await _dbContext.Database.GetPendingMigrationsAsync();
                if (pendingMigrations.Any())
                {
                    await _dbContext.Database.MigrateAsync();
                }
                if (!_dbContext.Products.Any())
                {
                    var ProductsData = File.OpenRead("..\\Persistence\\Data\\DataSeed\\Products.json");
                    // json ==> C# object [Products]
                    var Products = await JsonSerializer.DeserializeAsync<List<Product>>(ProductsData);
                    if (Products != null)
                        await _dbContext.Products.AddRangeAsync(Products);
                }
               
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task SeedIdentityDataAsync()
        {
            try
            {
                // seed identity data such as users and roles here
                // assign roles to users here

                if (!_roleManager.Roles.Any())
                {
                    await _roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
                    await _roleManager.CreateAsync(new IdentityRole { Name = "Client" });
                }

                if (!_userManager.Users.Any())
                {
                    var AdminUser = new ApplicationUser
                    {
                        DisplayName = "AdminName",
                        UserName = "admin",
                        Email = "Admin@google.com",
                        PhoneNumber = "01222303297"
                    };
                    await _userManager.CreateAsync(AdminUser, "Pa$$w01rd");
                    await _userManager.AddToRoleAsync(AdminUser, "Admin");
                }
                // save changes to the database automatically by the user manager and role manager
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}