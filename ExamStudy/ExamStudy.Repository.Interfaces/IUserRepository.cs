using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IUserRepository
    {
        User AddUser(User user);
        User UpdateUser(User user);
        bool DeleteUser(int userId);
        IList<User> GetAllUsers();
        User GetUserById(int userId);
        User GetUserByEmail(string email);
        User GetUserByToken(string token);
        bool UpdateOrCreateUserToken(UserToken userToken);
        bool LogoutUser(int userId);
        bool UpdateUserPhoto(int id, string photoPath);
        string GetUserPhotoPath(int userId);
        bool AddResetPassword(UserReset userReset);
        bool DeleteResetPassword(int userId);
        UserReset GetResetPassword(string key);

    }
}
