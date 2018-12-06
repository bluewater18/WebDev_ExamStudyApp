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
            parameters.Add("p_AnserType", answer.AnswerType);
            parameters.Add("p_AnserTitle", answer.AnswerTitle);
            parameters.Add("p_AnserText", answer.AnswerText);
            parameters.Add("p_AnserImageName", answer.AnswerImageName);
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
            parameters.Add("p_AnserType", answer.AnswerType);
            parameters.Add("p_AnserTitle", answer.AnswerTitle);
            parameters.Add("p_AnserText", answer.AnswerText);
            parameters.Add("p_AnserImageName", answer.AnswerImageName);
            parameters.Add("p_AnswerId", answer.AnswerId);

            SqlMapper.Execute(conn, "UpdateAnswer", param: parameters, commandType: StoredProcedure);
            return true;
        }
    }
}
