using Dapper;
using ExamStudy.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using static System.Data.CommandType;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Repository
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public int AddGroup(Group group)
        {
            throw new NotImplementedException();
        }

        public bool DeleteGroup(int groupId)
        {
            throw new NotImplementedException();
        }

        public IList<Group> GetAllGroups()
        {
            throw new NotImplementedException();
        }

        public string GetGroupPhotoPath(int groupId)
        {
            throw new NotImplementedException();
        }

        public Group GetUserById(int groupId)
        {
            throw new NotImplementedException();
        }

        public bool UpdateGroup(Group group)
        {
            throw new NotImplementedException();
        }

        public bool UpdateGroupPhoto(int id, string photoPath)
        {
            throw new NotImplementedException();
        }
    }
}
