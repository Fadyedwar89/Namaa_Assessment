namespace Persistence
{
    // This class is responsible for evaluating the specifications
    // and creating the query based on the criteria
    // and includes expressions defined in the specification.
    // helps to keep the repository implementation clean and focused on data access logic,
    static class SpecificationEvluator
    {
        public static IQueryable<TEntity> CreateQuery<TEntity, TKey>
            (IQueryable<TEntity> inputQuery,// input query from the repository ==> _dbContext.Set<TEntity>()
            ISpecification<TEntity, TKey> specification)
              where TEntity : BaseEntity<TKey>
        {
            var query = inputQuery;

            if (specification.Criteria is not null)
            {
                query = query.Where(specification.Criteria);
            }

            if (specification.IncludesExpression is not null
               && specification.IncludesExpression.Count > 0)
            {
                query = specification.IncludesExpression.Aggregate(query, (currentQuery, Expression)
                 => currentQuery.Include(Expression));
            }
            if (specification.Includes is not null
               && specification.Includes.Count > 0)
            {
                query = specification.Includes.Aggregate(query, (currentQuery, includeExpression)
                 => includeExpression(currentQuery));
            }
            if (specification.OrderBy is not null)
            {
                query = query.OrderBy(specification.OrderBy);
            }

            if (specification.OrderByDescending is not null)
            {
                query = query.OrderByDescending(specification.OrderByDescending);
            }

           
            if (specification.IsPaginationEnabled)
            {
                query = query.Skip(specification.Skip).Take(specification.Take);
            }

            return query;
        }
    }
}