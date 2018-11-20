﻿using System;
using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IUserManager
    {
        string RegisterUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(int userId);
        IList<User> GetAllUsers();
        User GetUserById(int userId);
    }
}
