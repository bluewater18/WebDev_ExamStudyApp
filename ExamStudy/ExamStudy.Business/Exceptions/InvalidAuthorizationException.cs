using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Business
{
    public class InvalidAuthorizationException : Exception
    {
        public InvalidAuthorizationException()
        { }

        public InvalidAuthorizationException(string message) : base(message)
        { }

        public InvalidAuthorizationException(string message, Exception inner) : base(message, inner)
        { }
    }
}
