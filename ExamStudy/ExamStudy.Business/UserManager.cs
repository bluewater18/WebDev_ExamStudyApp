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
        Validator _validator;

        public UserManager(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _validator = new Validator();
        }

        public string RegisterUser(User user)
        {

            _validator.ValidateUser(user);//validate
            user.UserPassword = PasswordSecurity.PasswordStorage.CreateHash(user.UserPassword);//hash password
            string token = GenerateToken();
            int userId = _userRepository.AddUser(user);//add user to db with id returned
            _userRepository.UpdateOrCreateUserToken(new UserToken(userId, token));//sets the new token for the user
            return token;
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

        public string LoginUser(string email, string password)
        {
            try
            {
                //check password
                User user = _userRepository.GetUserByEmail(email);
                PasswordSecurity.PasswordStorage.VerifyPassword(password, user.UserPassword);
                user.UserPassword = "";
                //update user token
                string token = GenerateToken();
                _userRepository.UpdateOrCreateUserToken(new UserToken(user.UserId, token));
                return token;
            }catch(Exception ex){
                throw new InvalidAuthorizationException(ex.Message);
            }
        }

        private string GenerateToken()
        {
            return new RandomGenerator().RandomToken();//generate new token
        }
    }
}
