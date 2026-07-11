using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstraction.Contracts;
using Shared.Common;
using Shared.Dtos.OrderDto;
using Shared.Enums;


namespace Presentation.Controllers
{
    [Authorize]
    public class OrderController(IOrderService _orderService) : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedResult<OrderResult>>> GetOrdersAsync([FromQuery] OrderSpecificationParameters query)
           => Ok(await _orderService.GetOrdersAsync(query));
       
        [HttpPost("CreateOrder")]
        [Authorize(Roles ="Client")]
        public async Task<ActionResult<OrderResult>> CreateOrderAsync([FromBody] CreateOrderDto command)
           => Ok(await _orderService.CreateOrderAsync(command));
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResult>> GetOrder(int id)
           => Ok(await _orderService.GetOrderByIdAsync(id));

        [HttpPatch("{orderId}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeOrderStatus(int orderId, OrderStatusDto status)
        {
           await _orderService.ChangeOrderStatusAsync(orderId, status);
           return NoContent();
        }
        [HttpPatch("{id}/cancel")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> CancelOrder(int id)
        {
            await _orderService.CancelOrderAsync(id);

            return NoContent();
        }

        [HttpGet("statistics")]
        public async Task<ActionResult<OrderStatisticsDto>> GetStatistics()
        {
            var result = await _orderService.GetStatisticsAsync();
            return Ok(result);
        }
    }
}
