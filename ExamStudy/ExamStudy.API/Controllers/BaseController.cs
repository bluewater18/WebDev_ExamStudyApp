using System;
using System.Security.Claims;
using ExamStudy.Business;
using ExamStudy.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExamStudy.API.Controllers
{
    public class BaseController : Controller
    {
        protected IAuthManager _authManager;


        public BaseController(IAuthManager authManager)
        {
            _authManager = authManager;
        }

        private int GetUserId()
        {
            return Convert.ToInt32(((ClaimsIdentity)HttpContext.User.Identity).FindFirst(ClaimTypes.NameIdentifier).Value);
        }
        protected void CheckUserAuth(int userId)
        {
            if (userId != GetUserId())
                throw new InvalidAuthorizationException("Invalid User");
        }

        protected void CheckGroupMember(int groupId)
        {
            if(!_authManager.CheckGroupMember(GetUserId(), groupId))
                throw new InvalidAuthorizationException("User Does Not Belong To This Group");
        }

        protected void CheckGroupAdmin(int groupId)
        {
            if(!_authManager.CheckGroupAdmin(GetUserId(), groupId))
                throw new InvalidAuthorizationException("User Is Not An Admin Of This Group");

        }

        protected void CheckGroupOwner(int groupId)
        {
            if (!_authManager.CheckGroupOwner(GetUserId(), groupId))
                throw new InvalidAuthorizationException("User Is Not The Owner Of This Group");
        }

        protected void CheckResourceMember(int resourceId)
        {
            return;
        }

        protected void CheckResourceOwner(int resourceId)
        {
            if (!_authManager.CheckResourceOwner(GetUserId(), resourceId))
                throw new InvalidAuthorizationException("User Is Not The Owner Of This Resource");
        }

        protected void CheckQuestionOwner(int questionId)
        {
            if (!_authManager.CheckQuestionOwner(GetUserId(), questionId))
                throw new InvalidAuthorizationException("User Is Not The Owner Of This Question");
        }

        protected void CheckAnswerOwner(int answerId)
        {
            if (!_authManager.CheckAnswerOwner(GetUserId(), answerId))
                throw new InvalidAuthorizationException("User Is Not The Owner Of This Answer");
        }

    }
}