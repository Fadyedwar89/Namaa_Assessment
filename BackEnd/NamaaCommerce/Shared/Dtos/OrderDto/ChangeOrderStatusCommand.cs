

using Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace Shared.Dtos.OrderDto
{
    public record ChangeOrderStatusCommand
    {
        [Range(1, int.MaxValue, ErrorMessage = "OrderId must be greater than 0")]
        public int OrderId { get; init; }

        [Required(ErrorMessage = "Status is required")]
        public OrderStatusDto Status { get; init; }
    }
}
