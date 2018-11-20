using System;
using System.Collections.Generic;
using System.Text;
using ExamStudy.Entities;

namespace ExamStudy.Business
{
    class Validator
    {

        public void ValidateUser(User user)
        {
            if (user.UserName != null && user.UserName.Length > 4 && user.UserEmail != null && user.UserEmail.Contains("@") && user.UserEmail.Length > 4 && user.UserPassword != null && user.UserPassword.Length > 5)
                return;
            throw new InvalidObjectException("Invalid User Object");
        }
    }
}
