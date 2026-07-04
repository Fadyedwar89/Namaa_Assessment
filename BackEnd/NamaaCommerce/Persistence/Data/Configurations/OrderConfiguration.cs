namespace Persistence.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            builder.HasKey(o => o.Id);

            builder.Property(o => o.Status)
                .HasConversion<string>()
                .HasMaxLength(30);   //  store status like "Pending"in the database
            builder.HasIndex(o => o.Status);

            builder.HasIndex(o => o.UserId);

            builder.HasMany(oI => oI.OrderItems)
                .WithOne(o => o.Order)
                .HasForeignKey(o => o.OrderId);

            builder.HasMany(o => o.Notifications)
                .WithOne(o => o.Order)
                .HasForeignKey(o => o.OrderId);

           builder.HasOne(o => o.ApplicationUser)
               .WithMany(u => u.Orders)
               .HasForeignKey(o => o.UserId)
               .HasPrincipalKey(u => u.Id);
        }
    }
}
