using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IGroupManager
    {
        Group CreateGroup(Group group);
        Group UpdateGroup(Group group);
        bool DeleteGroup(int groupId);
        IList<Group> GetAllGroups();
        Group GetGroupById(int groupId);
        bool UpdateGroupPhoto(int id, string photoPath);
        string GetGroupPhotoPath(int groupId);
        bool AddUserToGroup(int groupId, int userId, string status);
        bool RemoveUserFromGroup(int groupId, int userId);
        IList<GroupMemberVM> GetGroupMembers(int id);
        int AddUserToGroupByCode(string code, int userId);
        IList<Group> GetUsersGroups(int userId);
    }
}
