using Microsoft.AspNetCore.Mvc;
using Shared.ErrorModels;

namespace NamaaCommerce.API.Factory
{
    public class ApiResponseFactory
    {
        public static IActionResult CustomValidationErrorResponse(ActionContext context)
        {
            // context ==> error ,key [field]
            // context.ModelState ==><string,modelStateEntry>
            // string ==> field name 
            // modelStateEntry ==> Errors Complex object contains the error messages related to the field

            var errors = context.ModelState
                .Where(error => error.Value?.Errors.Any() == true)
                .Select(error => new ValidationError()
                {
                    Field = error.Key,
                    Messages = error.Value?.Errors.Select(e => e.ErrorMessage) ?? new List<string>()
                });

            var response = new ValidationErrorResponse()
            {
                StatusCode = StatusCodes.Status400BadRequest,
                ErrorMessage = "one or more Validation error happen ",
                Errors = errors
            };

            return new BadRequestObjectResult(response);

        }
    }
}