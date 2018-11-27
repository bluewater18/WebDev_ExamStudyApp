using Dapper;
using ExamStudy.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using static System.Data.CommandType;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Repository
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public User AddUser(User user)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserName", user.UserName);
                parameters.Add("p_UserEmail", user.UserEmail);
                parameters.Add("p_UserPassword", user.UserPassword);

                User result = SqlMapper.Query<User>(conn, "AddUser", param: parameters, commandType: StoredProcedure).FirstOrDefault();
                return result;
            } catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateUserPhoto(int id, string photoPath)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserId", id);
            parameters.Add("p_UserImageName", photoPath);

            SqlMapper.Execute(conn, "UpdateUserPhoto", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public string GetUserPhotoPath(int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserId", userId);

            return SqlMapper.Query<string>(conn, "GetUserPhotoPath", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool DeleteUser(int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserId", userId);

            SqlMapper.Execute(conn, "DeleteUser", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public IList<User> GetAllUsers()
        {
            IList<User> userList = SqlMapper.Query<User>(conn, "GetAllUsers", commandType: StoredProcedure).ToList();
            return userList;
        }

        public User GetUserById(int userId)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserID", userId);
                User user = SqlMapper.Query<User>(conn, "GetUserById", param: parameters, commandType: StoredProcedure).FirstOrDefault();
                user.UserPassword = "";
                return user;
            } catch (Exception ex)
            {
                throw ex;
            }
        }

        public User GetUserByEmail(string email)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_Email", email);
            return SqlMapper.Query<User>(conn, "GetUserByEmail", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool UpdateUser(User user)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserId", user.UserId);
                parameters.Add("p_UserName", user.UserName);
                parameters.Add("p_UserEmail", user.UserEmail);

                SqlMapper.Execute(conn, "UpdateUser", param: parameters, commandType: StoredProcedure);
                return true;
            } catch (Exception ex)
            {
                throw ex;
            }
        }

        //user token methods

        private bool AddUserToken(UserToken userToken)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserId", userToken.UserId);
                parameters.Add("p_UserToken", userToken.UserTokenString);

                int result = SqlMapper.Query<int>(conn, "AddUserToken", param: parameters, commandType: StoredProcedure).FirstOrDefault();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User GetUserByToken(string token)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserToken", token);
            return SqlMapper.Query<User>(conn, "GetUserByToken", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        /// <summary>
        /// Updates a users token or will add it if there isnt one
        /// </summary>
        /// <param name="userToken">Usertoken to be updated/added</param>
        /// <returns>if successfull</returns>
        public bool UpdateOrCreateUserToken(UserToken userToken)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserId", userToken.UserId);
                parameters.Add("p_UserToken", userToken.UserTokenString);
                Console.WriteLine("##############" + userToken.UserId);
                SqlMapper.Execute(conn, "UpdateUserToken", param: parameters, commandType: StoredProcedure);
            }
            catch (Exception ex) {
                Console.WriteLine("##############" + ex.Message);
                AddUserToken(userToken);
            }
            return true;
        }
    }
}
