namespace Persistence.Data.Configurations
{
    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("Notifications");

            builder.HasKey(n => n.Id);

            builder.Property(n => n.Message)
                .IsRequired()
                .HasMaxLength(500);

            builder.HasOne(n => n.Order)
                .WithMany(n => n.Notifications)
                .HasForeignKey(n => n.OrderId);

            builder.HasIndex(n => n.OrderId);
        }
    }
}
