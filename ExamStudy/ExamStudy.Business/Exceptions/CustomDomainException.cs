using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Business
{
    public class CustomDomainException : Exception
    {
        public CustomDomainException()
        { }

        public CustomDomainException(string message) : base(message)
        { }

        public CustomDomainException(string message, Exception inner) : base(message, inner)
        { }
    }
}
