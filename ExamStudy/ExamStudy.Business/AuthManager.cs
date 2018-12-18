using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;
using System.Collections.Generic;

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
            Answer answer = _answerRepository.GetAnswer(answerId);
            if (answer.UserId == userId)
                return true;
            return false;
        }

        public bool CheckGroupAdmin(int userId, int groupId)
        {
            IList<int> admins = _groupRepository.GetAdminMembers(groupId);
            if (admins.Contains(userId))
                return true;
            return false;
        }

        public bool CheckGroupMember(int userId, int groupId)
        {
            IList<GroupMemberVM> members = _groupRepository.GetGroupMembers(groupId);
            foreach(GroupMemberVM g in members)
                if (g.UserId == userId)
                    return true;
            return false;
        }

        public bool CheckGroupOwner(int userId, int groupId)
        {
            Group group = _groupRepository.GetGroupById(groupId);
            if (group.GroupOwnerId == userId)
                return true;
            return false;
        }

        public bool CheckQuestionOwner(int userId, int questionId)
        {
            Question question = _questionRepository.GetQuestion(questionId);
            if (question.UserId == userId)
                return true;
            return false;
        }

        public bool CheckResourceOwner(int userId, int resourceId)
        {
            Resource resource = _resourceRepository.GetResource(resourceId);
            if (resource.UserId == userId)
                return true;
            return false;
        }
    }
}
