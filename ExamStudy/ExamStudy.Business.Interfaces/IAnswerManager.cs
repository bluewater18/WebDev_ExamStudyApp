using System;
using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IAnswerManager
    {
        Answer AddAnswer(Answer answer);
        Answer GetAnswer(int answerId);
        Answer UpdateAnswer(Answer answer);
        bool DeleteAnswer(int answerId);
        bool UpdateAnswerPhoto(int answerId, string path);
        bool UpvoteAnswer(int answerId, int userId);
        bool DownvoteAnswer(int answerId, int userId);
    }
}
