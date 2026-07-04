using Domain.Entities;

namespace Domain.Contracts
{
    public interface IUnitOfWork
    {
        // SaveChanges to the database Async method to commit the changes to the database 
        // once all the operations are done, and it will return a Task to indicate that the operation is completed
        Task<int> SaveChangesAsync();

        // method to return object from generic repository 
        // it will return the object of the generic repository to be used in the services layer
        //ex : IGenericRepository<Product, int> 
     
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;
    }
}
