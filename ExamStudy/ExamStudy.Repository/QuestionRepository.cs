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
    public class QuestionRepository : BaseRepository, IQuestionRepository
    {
        public Question AddQuestion(Question question)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_QuestionType", question.QuestionType);
            parameters.Add("p_QuestionTitle", question.QuestionTitle);
            parameters.Add("p_QuestionText", question.QuestionText);
            parameters.Add("p_QuestionImageName", question.QuestionImageName);
            parameters.Add("p_ResourceId", question.ResourceId);
            parameters.Add("p_UserId", question.UserId);


            return SqlMapper.Query<Question>(conn, "AddQuestion", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool DeleteQuestion(int questionId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_QuestionId", questionId);

            SqlMapper.Execute(conn, "DeleteQuestion", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public Question GetQuestion(int questionId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_QuestionId", questionId);

            return SqlMapper.Query<Question>(conn, "GetQuestion", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public IList<Question> GetQuestions(int resourceId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_ResourceId", resourceId);

            return SqlMapper.Query<Question>(conn, "GetQuestions", param: parameters, commandType: StoredProcedure).ToList();
        }

        public bool UpdateQuestion(Question question)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_QuestionType", question.QuestionType);
            parameters.Add("p_QuestionTitle", question.QuestionTitle);
            parameters.Add("p_QuestionText", question.QuestionText);
            parameters.Add("p_QuestionImageName", question.QuestionImageName);
            parameters.Add("p_QuestionId", question.QuestionId);

            SqlMapper.Execute(conn, "UpdateQuestion", param: parameters, commandType: StoredProcedure);
            return true;
        }
    }
}
