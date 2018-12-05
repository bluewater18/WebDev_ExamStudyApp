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

    }
}