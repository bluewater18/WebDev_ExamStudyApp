using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IUserRepository
    {
        User AddUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(int userId);
        IList<User> GetAllUsers();
        User GetUserById(int userId);
        User GetUserByEmail(string email);
        User GetUserByToken(string token);
        bool UpdateOrCreateUserToken(UserToken userToken);
        bool UpdateUserPhoto(int id, string photoPath);
        string GetUserPhotoPath(int userId);
    }
}
