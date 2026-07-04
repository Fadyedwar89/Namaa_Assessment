namespace Domain.Exceptions
{
    public class ProductNotFoundException : NotFoundException
    {
        public ProductNotFoundException(int productId) : base($"Product with ID {productId} not found.")
        {
        }
    }
}
