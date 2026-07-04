using Domain.Entities;

namespace Domain.Contracts
{
    public interface IGenericRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {

        Task<TEntity?> GetByIdAsync(TKey id);
        Task<IEnumerable<TEntity>> GetAllAsync(bool asNoTracking = false);
        Task AddAsync(TEntity entity);
        
        void Delete(TEntity entity);
        void Update(TEntity entity);
        // both Update and Delete methods are not async
        // because they are tracked by the context, 
        // has no async version because
        // it is tracked by the context,
        // so it will be updated when SaveChangesAsync is called

        #region Specification 
        Task<TEntity?> GetByIdAsync(ISpecification<TEntity, TKey> specification);
        Task<IEnumerable<TEntity>> GetAllAsync(ISpecification<TEntity, TKey> specifications);
        Task<int> CountAsync(ISpecification<TEntity, TKey> specifications);

        #endregion
    }
}
