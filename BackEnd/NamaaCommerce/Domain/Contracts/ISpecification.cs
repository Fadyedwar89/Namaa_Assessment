using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Domain.Contracts
{
    public interface ISpecification<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        public Expression<Func<TEntity, bool>>? Criteria { get; }

        public List<Expression<Func<TEntity, object>>> IncludesExpression { get; }
        public List<Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>>> Includes { get; }
    
        public Expression<Func<TEntity, object>> OrderBy { get; }

        public Expression<Func<TEntity, object>> OrderByDescending { get; }

        //pagination properties
        public int Take { get; }
        public int Skip { get; }
        public bool IsPaginationEnabled { get; }
    }
}

