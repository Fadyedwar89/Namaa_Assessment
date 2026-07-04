
namespace Persistence.Repositories
{
    internal class GenericRepository<TEntity, TKey>(ApplicationDbContext _dbContext) :
        IGenericRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        public async Task<IEnumerable<TEntity>> GetAllAsync(bool asNoTracking = false)
        => asNoTracking ? await _dbContext.Set<TEntity>().AsNoTracking().ToListAsync()
            : await _dbContext.Set<TEntity>().ToListAsync();

        public async Task<TEntity?> GetByIdAsync(TKey id)
         => await _dbContext.Set<TEntity>().FindAsync(id);

        public async Task AddAsync(TEntity entity)
         => await _dbContext.Set<TEntity>().AddAsync(entity);

        public void Delete(TEntity entity)
       => _dbContext.Set<TEntity>().Remove(entity);

        public void Update(TEntity entity)
       => _dbContext.Set<TEntity>().Update(entity);


        #region Specification 
      
        //  to get a single entity that matches the given specification
        //  this is useful for scenarios where you want to retrieve a specific entity based on certain criteria
        public async Task<TEntity?> GetByIdAsync(ISpecification<TEntity, TKey> specification)
        => await SpecificationEvluator.CreateQuery(_dbContext.Set<TEntity>(), specification).FirstOrDefaultAsync();
      
        //  to get all entities that match the given specification
        //  this is useful for filtering scenarios
        public async Task<IEnumerable<TEntity>> GetAllAsync(ISpecification<TEntity, TKey> specifications)
        => await SpecificationEvluator.CreateQuery(_dbContext.Set<TEntity>(), specifications).ToListAsync();

        //  to get the count of entities that match the given specification 
        //  this is useful for pagination scenarios 
        public async Task<int> CountAsync(ISpecification<TEntity, TKey> specifications)
        => await SpecificationEvluator.CreateQuery(_dbContext.Set<TEntity>(), specifications).CountAsync();


        #endregion
    }
}