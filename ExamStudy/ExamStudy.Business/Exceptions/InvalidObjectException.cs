using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Business
{
    public class InvalidObjectException : Exception
    {
        public InvalidObjectException()
        { }

        public InvalidObjectException(string message) : base(message)
        { }

        public InvalidObjectException(string message, Exception inner) : base(message, inner)
        { }
    }
}
