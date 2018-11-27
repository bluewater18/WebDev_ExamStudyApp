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
    }
}
