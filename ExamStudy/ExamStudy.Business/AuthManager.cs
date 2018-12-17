using ExamStudy.Business.Interfaces;
using ExamStudy.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Business
{
    public class AuthManager : IAuthManager
    {
        IUserRepository _userRepository;
        IGroupRepository _groupRepository;
        IResourceRepository _resourceRepository;
        IQuestionRepository _questionRepository;
        IAnswerRepository _answerRepository;

        public AuthManager(IUserRepository userRepository, IGroupRepository groupRepository, IResourceRepository resourceRepository, IQuestionRepository questionRepository, IAnswerRepository answerRepository)
        {
            _userRepository = userRepository;
            _groupRepository = groupRepository;
            _resourceRepository = resourceRepository;
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
        }
        public bool CheckAnswerOwner(int userId, int answerId)
        {
            return true;
        }

        public bool CheckGroupAdmin(int userId, int groupId)
        {
            return true;
        }

        public bool CheckGroupMember(int userId, int groupId)
        {
            return true;
        }

        public bool CheckGroupOwner(int userId, int groupId)
        {
            return true;
        }

        public bool CheckQuestionOwner(int userId, int questionId)
        {
            return true;
        }

        public bool CheckResourceOwner(int userId, int resourceId)
        {
            return true;
        }
    }
}
