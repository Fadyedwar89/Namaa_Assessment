using Domain.Exceptions;
using Shared.ErrorModels;

namespace NamaaCommerce.API.Middlewares
{
    public class GlobalExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next; // Delegate that represents the next middleware in the pipeline

        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

        public GlobalExceptionHandlingMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
                if (context.Response.StatusCode == StatusCodes.Status404NotFound)
                {

                    await HandleNotFoundApiAsync(context);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while processing the request.{ex.Message}");

                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleNotFoundApiAsync(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            var response = new ErrorDetails()
            {

                StatusCode = StatusCodes.Status404NotFound,
                ErrorMessage = $" the endpoint with url {context.Request.Path} not found "
            }.ToString();

            await context.Response.WriteAsync(response);

        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            // CHANG Status code and content type of the response
            // write the error message to the response body
            //context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            var errorResponse = new ErrorDetails()
            {
                ErrorMessage = ex.Message,
            };

            context.Response.StatusCode = ex switch
            {
                NotFoundException => StatusCodes.Status404NotFound,
                UnauthenticatedException => StatusCodes.Status401Unauthorized,
                validationException validationException => HandleValidationException(validationException, errorResponse),
                _ => StatusCodes.Status500InternalServerError
            };

            errorResponse.StatusCode = context.Response.StatusCode;

            await context.Response.WriteAsync(errorResponse.ToString());
        }

        private int HandleValidationException(validationException validationException, ErrorDetails errorResponse)
        {
            errorResponse.Errors = validationException.Errors;

            return StatusCodes.Status400BadRequest;
        }
    }
}
