using System;
using System.Collections.Generic;
using ExamStudy.Entities;
using System.Web;
using System.Threading.Tasks;

namespace ExamStudy.Business.Interfaces
{
    public interface IAuthManager
    {
        bool CheckGroupMember(int userId, int groupId);
        bool CheckGroupAdmin(int userId, int groupId);
        bool CheckGroupOwner(int userId, int groupId);
        bool CheckResourceOwner(int userId, int resourceId);
        bool CheckQuestionOwner(int userId, int questionId);
        bool CheckAnswerOwner(int userId, int answerId);
    }
}
