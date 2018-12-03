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
        public Group AddGroup(Group group)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupName", group.GroupName);
            parameters.Add("p_GroupType", group.GroupType);
            parameters.Add("p_GroupDesc", group.GroupDescription);
            parameters.Add("p_GroupOwnerId", group.GroupOwnerId);
            parameters.Add("p_GroupCode", group.GroupCode);

            return SqlMapper.Query<Group>(conn, "AddGroup", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool DeleteGroup(int groupId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", groupId);
            SqlMapper.Execute(conn, "DeleteGroup", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public IList<Group> GetAllGroups()
        {
            return SqlMapper.Query<Group>(conn, "GetAllGroups", commandType: StoredProcedure).ToList();     
        }

        public Group GetGroupById(int groupId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", groupId);
            return SqlMapper.Query<Group>(conn, "GetGroupById", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool UpdateGroup(Group group)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupName", group.GroupName);
            parameters.Add("p_GroupType", group.GroupType);
            parameters.Add("p_GroupImageName", group.GroupImageName);
            parameters.Add("p_GroupOwnerId", group.GroupOwnerId);

            SqlMapper.Execute(conn, "UpdateGroup", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool UpdateGroupPhoto(int id, string photoPath)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", id);
            parameters.Add("p_GroupImageName", photoPath);

            SqlMapper.Execute(conn, "UpdateGroupImage", param: parameters, commandType: StoredProcedure);
            return true;

        }

        public IList<User> GetAllUsersInGroup(int groupId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", groupId);
            //FIXME need to add MemberType field to user or create a view model that can store the info
            return SqlMapper.Query<User>(conn, "GetAllUsersInGroup", param: parameters, commandType: StoredProcedure).ToList();
        }

        public IList<GroupMemberVM> GetGroupMembers(int groupId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", groupId);
            return SqlMapper.Query<GroupMemberVM>(conn, "GetAllUsersInGroup", param: parameters, commandType: StoredProcedure).ToList();
        }

        public bool AddUserToGroup(int userId, int groupId, string memberType)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserId", userId);
            parameters.Add("p_GroupId", groupId);
            parameters.Add("p_MemberType", memberType);

            SqlMapper.Execute(conn, "AddUserToGroup", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool RemoveUserFromGroup(int groupId, int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserId", userId);
            parameters.Add("p_groupId", groupId);

            SqlMapper.Execute(conn, "RemoveUserFromGroup", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public bool UpdateUserRoleInGroup(int groupId, int userId, string role)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_UserId", userId);
            parameters.Add("p_GroupId", groupId);
            parameters.Add("p_MemberType", role);

            SqlMapper.Execute(conn, "UpdateUserRoleInGroup", param: parameters, commandType: StoredProcedure);
            return true;
        }


        public int GetGroupByCode(string code)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupCode", code);

            return SqlMapper.Query<int>(conn, "GetGroupByCode", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public IList<Group> GetUsersGroups(int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_userId", userId);
            return SqlMapper.Query<Group>(conn, "GetUsersGroups", param: parameters, commandType: StoredProcedure).ToList();
        }

        public IList<int> GetAdminMembers(int groupId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", groupId);
            return SqlMapper.Query<int>(conn, "GetAdminMembers", param: parameters, commandType: StoredProcedure).ToList();
        }
    }
}
