using Domain.Contracts;

namespace Domain.Entities
{
    public abstract class BaseEntity<Tkey> :IBaseEntity
    {
        public  Tkey Id { get; set; } 

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
