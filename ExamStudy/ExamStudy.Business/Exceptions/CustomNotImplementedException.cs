using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Business
{
    public class CustomNotImplementedException : Exception
    {
        public CustomNotImplementedException()
        { }

        public CustomNotImplementedException(string message) : base(message)
        { }

        public CustomNotImplementedException(string message, Exception inner) : base(message, inner)
        { }
    }
}
