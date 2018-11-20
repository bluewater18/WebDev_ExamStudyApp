using System;
using System.Collections.Generic;
using System.Text;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;
using static System.Data.CommandType;
using Dapper;
using System.Linq;

namespace ExamStudy.Repository
{
    public class UserTokenRepository : BaseRepository, IUserTokenRepository
    {
        public bool AddUserToken(UserToken usertoken)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("p_UserId", usertoken.UserId);
                parameters.Add("p_UserToken", usertoken.UserTokenString);

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
            throw new NotImplementedException();
        }

        public UserToken getUserToken(string token)
        {
            throw new NotImplementedException();
        }
    }
}
