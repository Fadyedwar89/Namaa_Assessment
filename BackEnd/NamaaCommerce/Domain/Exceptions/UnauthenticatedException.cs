

namespace Domain.Exceptions
{
    public class UnauthenticatedException : Exception
    {
        public UnauthenticatedException(string message = "Invalid email or password") : base(message)
        {
        }
    }
}
