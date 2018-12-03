using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IGroupRepository
    {
        Group AddGroup(Group group);
        bool UpdateGroup(Group group);
        bool DeleteGroup(int groupId);
        IList<Group> GetAllGroups();
        Group GetGroupById(int groupId);
        bool UpdateGroupPhoto(int id, string photoPath);
        IList<User> GetAllUsersInGroup(int groupId);
        IList<GroupMemberVM> GetGroupMembers(int groupId);
        bool AddUserToGroup(int groupId, int userId, string role);
        bool RemoveUserFromGroup(int groupId, int userId);
        bool UpdateUserRoleInGroup(int groupId, int userId, string role);
        int GetGroupByCode(string code);
        IList<Group> GetUsersGroups(int userId);
    }
}
