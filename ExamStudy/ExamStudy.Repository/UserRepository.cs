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
        public int AddUser(User user)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserName", user.UserName);
                parameters.Add("p_UserEmail", user.UserEmail);
                parameters.Add("p_UserPassword", user.UserPassword);

                int result = SqlMapper.Query<int>(conn, "AddUser", param: parameters, commandType: StoredProcedure).FirstOrDefault();
                return result;
            } catch (Exception ex)
            {
                throw ex;
            }
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
    }
}
