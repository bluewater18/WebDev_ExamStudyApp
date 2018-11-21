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

        public User RegisterUser(User user)
        {

            _validator.ValidateUserRegister(user);//validate
            user.UserPassword = PasswordSecurity.PasswordStorage.CreateHash(user.UserPassword);//hash password
            user.UserToken = GenerateToken();
            user.UserId = _userRepository.AddUser(user);//add user to db with id returned
            _userRepository.UpdateOrCreateUserToken(new UserToken(user.UserId, user.UserToken));//sets the new token for the user
            user.UserPassword = null;
            return user;
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

        public User LoginUser(User user)
        {
            try
            {
                _validator.ValidateUserLogin(user);
                //check password
                User dbUser = _userRepository.GetUserByEmail(user.UserEmail);
                PasswordSecurity.PasswordStorage.VerifyPassword(user.UserPassword, dbUser.UserPassword);
                
                //update user token
                string token = GenerateToken();
                _userRepository.UpdateOrCreateUserToken(new UserToken(dbUser.UserId, token));

                //sanitise returned user (could look to make a special return class)
                dbUser.UserPassword = null;
                dbUser.UserToken = token;

                return dbUser;
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