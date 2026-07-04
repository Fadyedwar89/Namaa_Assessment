using Domain.Entities.IdentityModule;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence.Data
{
    public class ApplicationDbContext
        : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // why use it not continue in the entity configuration? because to be sure
            // that the precision is applied to the database level and
            // not just in the entity configuration. This ensures that the
            // database schema is created with the correct precision for decimal values,
            // which is important for financial data like prices and totals.
            //prevent errors and warnings while add migration 

            modelBuilder.Entity<Product>() 
            .Property(p => p.Price)
            .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(o => o.UnitPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalOrder)
                .HasPrecision(18, 2);

            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AssemblyReference).Assembly);
        }
      
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Notification> Notifications => Set<Notification>();

        override public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return base.SaveChangesAsync(cancellationToken);

        }

        private void UpdateTimestamps() 
        {
            // This method is responsible for updating the CreatedAt
            // and UpdatedAt timestamps for entities that inherit from BaseEntity.
            // automatically set the CreatedAt and UpdatedAt properties
            // This ensures that these timestamps are always accurate and up-to-date
            // without requiring manual intervention.

            var entries = ChangeTracker.Entries<IBaseEntity>();
           
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

        }
    }

}
