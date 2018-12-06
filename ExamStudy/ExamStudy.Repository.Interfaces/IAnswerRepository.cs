using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IAnswerRepository
    {
        Answer AddAnser(Answer answer);
        IList<Answer> GetAnswers(int questionId);
        Answer GetAnswer(int answerId);
        bool DeleteAnswer(int answerId);
        bool UpdateAnswer(Answer answer);
    }
}
