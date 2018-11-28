using System;
using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IUserManager
    {
        User RegisterUser(User user);
        User LoginUser(User user);
        User UpdateUser(User user);
        bool DeleteUser(int userId);
        IList<User> GetAllUsers();
        User GetUserById(int userId);
        string UpdateUserPhoto(int id, string photoPath);
        string GetUserPhotoPath(int userId);
    }
}
