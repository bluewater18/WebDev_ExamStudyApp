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
            return _groupRepository.AddUserToGroup(groupId, userId, status);
        }

        public Group CreateGroup(Group group)
        {
            group.GroupCode = new RandomGenerator().RandomGroupCode();
            Group res = _groupRepository.AddGroup(group);
            return res;
        }

        public bool DeleteGroup(int groupId)
        {
            return _groupRepository.DeleteGroup(groupId);
                
        }

        public IList<Group> GetAllGroups()
        {
            return _groupRepository.GetAllGroups();
        }

        public Group GetGroupById(int groupId)
        {
            Group group = _groupRepository.GetGroupById(groupId);
            group.GroupAdminIds = _groupRepository.GetAdminMembers(groupId);
            return group;
        }

        public string GetGroupPhotoPath(int groupId)
        {
            throw new NotImplementedException();
        }

        public bool RemoveUserFromGroup(int groupId, int userId)
        {
            return _groupRepository.RemoveUserFromGroup(groupId, userId);
        }

        public Group UpdateGroup(Group group)
        {
            Group oldGroup = _groupRepository.GetGroupById(group.GroupId);

            if (_validator.IsNullOrEmpty(group.GroupName))
                group.GroupName = oldGroup.GroupName;

            if (_validator.IsNullOrEmpty(group.GroupType))
                group.GroupType = oldGroup.GroupType;

            if (_validator.IsNullOrEmpty(group.GroupDescription))
                group.GroupDescription = oldGroup.GroupDescription;

            if (_groupRepository.UpdateGroup(group))
                return GetGroupById(group.GroupId);
            return null;
        }

        public bool UpdateGroupPhoto(int id, string photoPath)
        {
            return _groupRepository.UpdateGroupPhoto(id, photoPath);
        }

        public IList<GroupMemberVM> GetGroupMembers(int id)
        {
            return _groupRepository.GetGroupMembers(id);
        }


        public int AddUserToGroupByCode(string code, int userId)
        {
            int groupId = _groupRepository.GetGroupByCode(code);
            if(_groupRepository.AddUserToGroup(userId, groupId, "MEMBER"))
            {
                return groupId;
            }
            return -1;

               
        }

        public IList<Group> GetUsersGroups(int userId)
        {
            return _groupRepository.GetUsersGroups(userId);
        }
    }
}