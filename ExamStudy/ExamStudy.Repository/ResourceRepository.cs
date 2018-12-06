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
    public class ResourceRepository : BaseRepository, IResourceRepository
    {
        public Resource AddResource(Resource resource)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_ResourceName", resource.ResourceName);
            parameters.Add("p_ResourceType", resource.ResourceType);
            parameters.Add("p_GroupId", resource.GroupId);
            
            return SqlMapper.Query<Resource>(conn, "AddResource", param: parameters, commandType: StoredProcedure).FirstOrDefault();
        }

        public bool DeleteResource(int resourceId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_ResourceId", resourceId);

            SqlMapper.Execute(conn, "DeleteResource", param: parameters, commandType: StoredProcedure);
            return true;
        }

        public Resource GetResource(int resourceId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_ResourceId", resourceId);

            return SqlMapper.Query<Resource>(conn, "GetResource", param: parameters, commandType: StoredProcedure).FirstOrDefault();
            
        }

        public IList<Resource> GetResources(int groupId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_GroupId", groupId);

            return SqlMapper.Query<Resource>(conn, "GetResources", param: parameters, commandType: StoredProcedure).ToList();
        }

        public bool UpdateResource(Resource resource)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("p_ResourceName", resource.ResourceName);
            parameters.Add("p_ResourceType", resource.ResourceType);
            parameters.Add("p_ResourceId", resource.ResourceId);

            SqlMapper.Execute(conn, "AddResource", param: parameters, commandType: StoredProcedure);
            return true;
        }
    }
}
