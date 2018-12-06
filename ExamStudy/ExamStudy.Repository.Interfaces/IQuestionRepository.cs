using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IQuestionRepository
    {
        Question AddQuestion(Question question);
        IList<Question> GetQuestions(int resourceId);
        Question GetQuestion(int questionId);
        bool DeleteQuestion(int questionId);
        bool UpdateQuestion(Question question);
    }
}
