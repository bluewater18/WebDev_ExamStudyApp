using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;


namespace ExamStudy.API.Controllers
{
    [Route("api/[controller]")]
    public class ResourceController : Controller
    {
        IResourceManager _resourceManager;
        IQuestionManager _questionManager;
        public ResourceController(IResourceManager resourceManager, IQuestionManager questionManager)
        {
            _resourceManager = resourceManager;
            _questionManager = questionManager;
        }

        [HttpGet()]
        public IActionResult GetGroupResources(int groupId)
        {
            Console.WriteLine("!@#$%^&* Getting GROUP Resources");
            return new ObjectResult(_resourceManager.GetGroupResources(groupId)) { StatusCode = 200 };
        }

        // GET api/resource/5
        [HttpGet("{id}")]
        [ActionName("index")]
        public IActionResult Get(int id)
        {
            Console.WriteLine("!@#$%^&* Getting SINGLE Resource");
            Resource resource = _resourceManager.GetResource(id);
            resource.ResourceQuestions = _questionManager.GetResourceQuestions(resource.ResourceId);
            return new ObjectResult(resource) { StatusCode = 200};
        }

        // POST api/resource
        [HttpPost]
        public IActionResult Post([FromBody] Resource resource)
        {
            return new ObjectResult(_resourceManager.AddResource(resource)) { StatusCode = 201 };
        }

        [HttpPost("{id}/question")]
        public IActionResult Post(int id, [FromBody] Question question)
        {
            return new ObjectResult(_questionManager.AddQuestion(question)) { StatusCode = 201 };
        }

        // PUT api/resource/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Resource resource)
        {
            return new ObjectResult(_resourceManager.UpdateResource(resource)) { StatusCode = 200 };
        }

        // DELETE api/resource/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_resourceManager.DeleteResource(id))
                return Ok();
            return new ObjectResult("Error Deleting Resource") { StatusCode = 500 };
        }
    }
}