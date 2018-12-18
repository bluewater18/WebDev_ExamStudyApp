using System;
using System.Collections.Generic;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;
using System.Security.Claims;
using System.Threading.Tasks;

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
            User userDb = _userRepository.AddUser(user);//add user to db with id returned
            userDb.UserToken = GenerateToken();
            _userRepository.UpdateOrCreateUserToken(new UserToken(userDb.UserId, userDb.UserToken));//sets the new token for the user
            userDb.UserPassword = null;
            return userDb;
        }

        public string UpdateUserPhoto(int id, string photoPath)
        {
            DeleteOldPhoto(GetUserPhotoPath(id));
            _userRepository.UpdateUserPhoto(id, photoPath);
            return GetUserPhotoPath(id);
        }

        private void DeleteOldPhoto(string photoPath)
        {
            if (photoPath.ToLower().Contains("default"))
                return;
            System.IO.File.Delete(System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot\\images", photoPath));

        }

        public string GetUserPhotoPath(int userId)
        {
            return _userRepository.GetUserPhotoPath(userId);
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
            User user = _userRepository.GetUserById(userId);
            user.UserPassword = "";
            return user;
        }

        public User UpdateUser(User user)
        {
            User oldUser = _userRepository.GetUserById(user.UserId);

            if (_validator.IsNullOrEmpty(user.UserPassword))
                user.UserPassword = oldUser.UserPassword;
            else
                user.UserPassword = PasswordSecurity.PasswordStorage.CreateHash(user.UserPassword);//hash password

            if (_validator.IsNullOrEmpty(user.UserEmail))
                user.UserEmail = oldUser.UserEmail;

            if (_validator.IsNullOrEmpty(user.UserName))
                user.UserName = oldUser.UserName;

            _validator.ValidateUserRegister(user);

            User dbUser =  _userRepository.UpdateUser(user);
            dbUser.UserPassword = null;
            return dbUser;
        }

        public User LoginUser(User user)
        {
            try
            {
                _validator.ValidateUserLogin(user);
                //check password
                User dbUser = _userRepository.GetUserByEmail(user.UserEmail);
                if(!PasswordSecurity.PasswordStorage.VerifyPassword(user.UserPassword, dbUser.UserPassword))
                    throw new InvalidAuthorizationException("Invalid username or Password");

                //update user token
                string token = GenerateToken();
                _userRepository.UpdateOrCreateUserToken(new UserToken(dbUser.UserId, token));
                
                //sanitise returned user (could look to make a special return class)
                dbUser.UserPassword = null;
                dbUser.UserToken = token;
                return dbUser;
            }
            catch(Exception ex){
                throw new InvalidAuthorizationException(ex.Message);
            }
        }

        public bool LogoutUser(int userId)
        {
            return _userRepository.LogoutUser(userId);
        }

        public async Task<User> Authenticate(string token)
        {
            User user = _userRepository.GetUserByToken(token);
            if (user != null)
                return user;
            throw new InvalidAuthorizationException("Invalid Authorization");

        }


        private IEnumerable<Claim> GetUserClaims(User user)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.Email, user.UserEmail));
            claims.AddRange(this.GetUserRoleClaims(user));
            return claims;
        }

        private IEnumerable<Claim> GetUserRoleClaims(User user)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()));
            claims.Add(new Claim(ClaimTypes.Role, "User"));
            return claims;
        }

        private string GenerateToken()
        {
            return new RandomGenerator().RandomToken();//generate new token
        }

        public string CreateUserResetPasswordKey(int userId)
        {
            if (userId <= 0)
                throw new CustomNotFoundException("There is no user with that email");

            UserReset userReset = new UserReset
            {
                UserId = userId,
                UrlKey = GenerateToken(),
                TimeCreated = SecondsSinceEpoch()
            };

            try
            {
                _userRepository.DeleteResetPassword(userReset.UserId);
            }
            finally
            {
                _userRepository.AddResetPassword(userReset);
            }
            return userReset.UrlKey;
        }

        public int ConfirmUserResetPassword(string key)
        {
            UserReset userReset = _userRepository.GetResetPassword(key);
            if (userReset.TimeCreated > (SecondsSinceEpoch() - (5 * 60))) {
                try
                {
                    _userRepository.DeleteResetPassword(userReset.UserId);
                }
                catch { }
                return userReset.UserId;
            }
            else { 
                try
                {
                    _userRepository.DeleteResetPassword(userReset.UserId);
                } catch { }
                throw new TimeoutException("Key has timed out");
            }
        }

        public void UpdateUserPassword(int userId, string password)
        {
            if (_validator.IsNullOrEmpty(password) || password.Length < 4)
                throw new CustomDomainException("The New Password Is Not Secure");
            string hash = PasswordSecurity.PasswordStorage.CreateHash(password);//hash password
            if (!_userRepository.UpdateUserPassword(userId, hash))
                throw new CustomDomainException("Could not reset password");
        }

        private long SecondsSinceEpoch()
        {
            //TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            //return (int)t.TotalSeconds;
            return DateTimeOffset.Now.ToUnixTimeSeconds();
        }

        public User GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }

    }
}