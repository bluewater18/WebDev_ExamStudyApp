using System.Collections.Generic;
using ExamStudy.Entities;
using System.Threading.Tasks;

namespace ExamStudy.Business.Interfaces
{
    public interface IUserManager
    {
        User RegisterUser(User user);
        Task<User> Authenticate(string token);
        User LoginUser(User user);
        bool LogoutUser(int userId);
        User UpdateUser(User user);
        bool DeleteUser(int userId);
        IList<User> GetAllUsers();
        User GetUserById(int userId);
        User GetUserByEmail(string email);
        string UpdateUserPhoto(int id, string photoPath);
        string GetUserPhotoPath(int userId);
        string CreateUserResetPasswordKey(int userId);
        int ConfirmUserResetPassword(string key);
        void UpdateUserPassword(int userId, string password);

    }
}
