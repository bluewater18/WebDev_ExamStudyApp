using System;
using ExamStudy.Entities;
using System.Collections.Generic;

namespace ExamStudy.Repository.Interfaces
{
    public interface IResourceRepository
    {
        Resource AddResource(Resource resource);
        IList<Resource> GetResources(int groupId);
        Resource GetResource(int resourceId);
        bool DeleteResource(int resourceId);
        bool UpdateResource(Resource resource);

    }
}
