namespace Persistence.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(p=> p.Id);

            builder.Property(p => p.Name)
                .IsRequired();

            builder.HasIndex(p=> p.Name);

            builder.Property(p=> p.Description)
                .HasMaxLength(1000);


            builder.Property(p=> p.Stock)
                .IsRequired();

            builder.Property(p=> p.CreatedAt)
                .IsRequired();
        }
    }
}
