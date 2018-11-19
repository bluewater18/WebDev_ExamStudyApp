using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IUserRepository
    {
        bool AddUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(int userId);
        IList<User> GetAllUsers();
        User GetUserById(int userId);
    }
}
