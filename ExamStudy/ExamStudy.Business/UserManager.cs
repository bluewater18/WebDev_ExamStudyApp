using System;
using System.Collections.Generic;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Business
{
    public class UserManager : IUserManager
    {
        IUserRepository _userRepository;
        IUserTokenRepository _userTokenRepository;
        Validator _validator;

        public UserManager(IUserRepository userRepository, IUserTokenRepository userTokenRepository)
        {
            _userRepository = userRepository;
            _userTokenRepository = userTokenRepository;
            _validator = new Validator();
        }

        public string RegisterUser(User user)
        {
            _validator.ValidateUser(user);
            string token = new RandomGenerator().RandomToken();
            int userId = _userRepository.AddUser(user);
            UserToken userToken = new UserToken(userId, token);
            _userTokenRepository.AddUserToken(userToken);
            return userToken.UserTokenString;
        }

        public bool DeleteUser(int userId)
        {
            return _userRepository.DeleteUser(userId);
        }

        public IList<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public User GetUserById(int userId)
        {
            return _userRepository.GetUserById(userId);
        }

        public bool UpdateUser(User user)
        {
            return _userRepository.UpdateUser(user);
        }
    }
}
