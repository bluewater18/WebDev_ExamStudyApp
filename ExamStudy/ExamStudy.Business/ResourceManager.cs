using System;
using System.Collections.Generic;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Business
{
    public class ResourceManager : IResourceManager
    {
        IResourceRepository _resourceRepository;
        Validator _validator;

        public ResourceManager(IResourceRepository resourceRepository)
        {
            _resourceRepository = resourceRepository;
            _validator = new Validator();
        }

        public Resource AddResource(Resource resource)
        {
            return _resourceRepository.AddResource(resource);
        }

        public bool DeleteResource(int resourceId)
        {
            return _resourceRepository.DeleteResource(resourceId);
        }

        public IList<Resource> GetGroupResources(int groupId)
        {
            return _resourceRepository.GetResources(groupId);
        }

        public Resource GetResource(int resourceId)
        {
            return _resourceRepository.GetResource(resourceId);
        }

        public Resource UpdateResource(Resource resource)
        {
            if (_resourceRepository.UpdateResource(resource))
                return _resourceRepository.GetResource(resource.ResourceId);
            throw new CustomDomainException("ERROR: Failed to update resource " + resource?.ResourceId);
        }
    }
}