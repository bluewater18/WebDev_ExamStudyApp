using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IGroupRepository
    {
        int AddGroup(Group group);
        bool UpdateGroup(Group group);
        bool DeleteGroup(int groupId);
        IList<Group> GetAllGroups();
        Group GetUserById(int groupId);
        bool UpdateGroupPhoto(int id, string photoPath);
        string GetGroupPhotoPath(int groupId);
    }
}
