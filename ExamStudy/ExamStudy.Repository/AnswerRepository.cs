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
    public class AnswerRepository : BaseRepository, IAnswerRepository
    {
        public Answer AddAnser(Answer answer)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerTitle", answer.AnswerTitle);
            parameters.Add("p_AnswerText", answer.AnswerText);
            parameters.Add("p_AnswerImageName", answer.AnswerImageName);
            parameters.Add("p_QuestionId", answer.QuestionId);
            parameters.Add("p_UserId", answer.UserId);

            return SqlMapper.Query<Answer>(conn, "AddAnswer", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool DeleteAnswer(int answerId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId",answerId);

            SqlMapper.Execute(conn, "DeleteAnswer", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public Answer GetAnswer(int answerId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId", answerId);

            return SqlMapper.Query<Answer>(conn, "GetAnswer", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public IList<Answer> GetAnswers(int questionId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_QuestionId",questionId);

            return SqlMapper.Query<Answer>(conn, "GetAnswers", param: parameters, commandType: StoredProcedure).ToList();
        }

        public bool UpdateAnswer(Answer answer)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerTitle", answer.AnswerTitle);
            parameters.Add("p_AnswerText", answer.AnswerText);
            parameters.Add("p_AnswerId", answer.AnswerId);

            SqlMapper.Execute(conn, "UpdateAnswer", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool UpdateAnswerPhoto(int answerId, string path)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId", answerId);
            parameters.Add("p_AnswerImageName", path);

            SqlMapper.Execute(conn, "UpdateAnswerImage", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool UpvoteAnswer(int answerId, int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId", answerId);
            parameters.Add("P_UserId", userId);

            SqlMapper.Execute(conn, "AnswerUpvote", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool DownvoteAnswer(int answerId, int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId", answerId);
            parameters.Add("P_UserId", userId);

            SqlMapper.Execute(conn, "AnswerDownvote", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool UpdateUpvoteAnswer(int answerId, int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId", answerId);
            parameters.Add("P_UserId", userId);

            SqlMapper.Execute(conn, "AnswerUpvoteUpdate", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool UpdateDownvoteAnswer(int answerId, int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_AnswerId", answerId);
            parameters.Add("P_UserId", userId);

            SqlMapper.Execute(conn, "AnswerDownvoteUpdate", param: parameters, commandType: StoredProcedure);
            return true;
        }
    }
}
