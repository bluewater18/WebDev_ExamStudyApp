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
        IQuestionRepository _questionRepository;
        Validator _validator;

        public ResourceManager(IResourceRepository resourceRepository, IQuestionRepository questionRepository)
        {
            _resourceRepository = resourceRepository;
            _questionRepository = questionRepository;
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
            Resource resource = _resourceRepository.GetResource(resourceId);
            resource.ResourceQuestions = _questionRepository.GetQuestions(resource.ResourceId);
            return resource;
        }

        public Resource UpdateResource(Resource resource)
        {
            resource.ResourceType = "Q&A";
            if (_resourceRepository.UpdateResource(resource))
                return _resourceRepository.GetResource(resource.ResourceId);
            throw new CustomDomainException("ERROR: Failed to update resource " + resource?.ResourceId);
        }
    }
}