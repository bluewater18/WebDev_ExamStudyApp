﻿using System;
using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IGroupManager
    {
        Group CreateGroup(Group group);
        bool UpdateGroup(Group group);
        bool DeleteGroup(int groupId);
        IList<Group> GetAllGroups();
        Group GetGroupById(int groupId);
        string UpdateGroupPhoto(int id, string photoPath);
        string GetGroupPhotoPath(int groupId);
        bool AddUserToGroup(int groupId, int userId, string status);
        bool RemoveUserFromGroup(int groupId, int userId);
    }
}
