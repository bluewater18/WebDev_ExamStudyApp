using System;
using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IQuestionManager
    {
        Question AddQuestion(Question question);
        IList<Question> GetResourceQuestions(int resourceId);
        Question GetQuestion(int questionId);
        Question UpdateQuestion(Question question);
        bool DeleteQuestion(int questionId);
        bool UpdateQuestionPhoto(int questionId, string path);
    }
}
