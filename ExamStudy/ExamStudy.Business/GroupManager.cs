using System;
using System.Collections.Generic;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Business
{
    public class GroupManager : IGroupManager
    {
        IGroupRepository _groupRepository;
        Validator _validator;

        public GroupManager(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
            _validator = new Validator();
        }

        public bool AddUserToGroup(int groupId, int userId, string status)
        {
            throw new NotImplementedException();
        }

        public Group CreateGroup(Group group)
        {
            Group res = _groupRepository.AddGroup(group);
            return res;
        }

        public bool DeleteGroup(int groupId)
        {
            throw new NotImplementedException();
        }

        public IList<Group> GetAllGroups()
        {
            return _groupRepository.GetAllGroups();
        }

        public Group GetGroupById(int groupId)
        {
            return _groupRepository.GetGroupById(groupId);
        }

        public string GetGroupPhotoPath(int groupId)
        {
            throw new NotImplementedException();
        }

        public bool RemoveUserFromGroup(int groupId, int userId)
        {
            throw new NotImplementedException();
        }

        public bool UpdateGroup(Group group)
        {
            throw new NotImplementedException();
        }

        public bool UpdateGroupPhoto(int id, string photoPath)
        {
            return _groupRepository.UpdateGroupPhoto(id, photoPath);
        }

        public IList<GroupMemberVM> GetGroupMembers(int id)
        {
            return _groupRepository.GetGroupMembers(id);
        }
    }
}