using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Entities
{
    public class UserToken
    {
        public UserToken(int userId, string token)
        {
            UserId = userId;
            UserTokenString = token;
        }
        public int UserId { get; set; }
        public string UserTokenString { get; set; }
    }
}
