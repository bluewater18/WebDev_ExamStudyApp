using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IUserTokenRepository
    {
        bool AddUserToken(UserToken user);
        User GetUserByToken(string token);
        UserToken getUserToken(string token);

    }
}
