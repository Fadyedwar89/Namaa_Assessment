namespace Domain.Exceptions
{
    public class validationException : Exception
    {
        public IEnumerable<string> Errors { get; set; } = [];
        public validationException(IEnumerable<string> errors) : base($"Validation failed:")
        {
            Errors = errors;
        }
        public validationException(string error) : base($"Validation failed: {error}")
        {
            Errors = new List<string> { error };
        }
    }
}