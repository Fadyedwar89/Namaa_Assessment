using Domain.Contracts;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;


namespace Services.Specifications
{
    internal abstract class BaseSpecification<TEntity, Tkey> : ISpecification<TEntity, Tkey>  where TEntity : BaseEntity<Tkey>
    {
        protected BaseSpecification(Expression<Func<TEntity, bool>>? criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<TEntity, bool>>? Criteria { get; private set; }


        #region Include
        // don't forget to initialize the list
        public List<Expression<Func<TEntity, object>>> IncludesExpression { get; } = new();

        protected void AddInclude(Expression<Func<TEntity, object>> includeExpression)
        {
            // don't forget to initialize the list
            IncludesExpression.Add(includeExpression);
        }
        public List<Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>>> Includes { get; }= new();

        protected void AddIncludeWith(Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }
        #endregion

        #region orderBy
        public Expression<Func<TEntity, object>> OrderBy { get; private set; }

        public Expression<Func<TEntity, object>> OrderByDescending { get; private set; }

        protected void AddOrderBy(Expression<Func<TEntity, object>> expression)
            => OrderBy = expression;
        protected void AddOrderByDescending(Expression<Func<TEntity, object>> expression)
            => OrderByDescending = expression;
        #endregion

        #region pagination

        public int Take { get; private set; }
        public int Skip { get; private set; }
        public bool IsPaginationEnabled { get; private set; } = false;

        protected void ApplyPagination(int pageIndex, int pageSize)
        {
            Skip = (pageIndex - 1) * pageSize; // 
            Take = pageSize;
            IsPaginationEnabled = true;
        }

        #endregion
    }
}
