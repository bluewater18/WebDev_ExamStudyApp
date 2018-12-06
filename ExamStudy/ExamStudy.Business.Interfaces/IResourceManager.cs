using System;
using System.Collections.Generic;
using ExamStudy.Entities;

namespace ExamStudy.Business.Interfaces
{
    public interface IResourceManager
    {
        Resource AddResource(Resource resource);
        IList<Resource> GetGroupResources(int groupId);
        Resource GetResource(int resourceId);
        Resource UpdateResource(Resource resource);
        bool DeleteResource(int resourceId);
    }
}
