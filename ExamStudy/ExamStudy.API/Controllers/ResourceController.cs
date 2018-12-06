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
        public ResourceController( IResourceManager resourceManager)
        {
            _resourceManager = resourceManager;
        }

        [HttpGet()]
        public IActionResult GetGroupResources(int groupId)
        {
            return new ObjectResult(_resourceManager.GetGroupResources(groupId)) { StatusCode = 200 };
        }

        // GET api/resource/5
        [HttpGet("{id}")]
        [ActionName("index")]
        public IActionResult Get(int resourceId)
        {
            return new ObjectResult(_resourceManager.GetResource(resourceId)) { StatusCode = 200};
        }

        // POST api/resource
        [HttpPost]
        public IActionResult Post([FromBody] Resource resource)
        {
            return new ObjectResult(_resourceManager.AddResource(resource)) { StatusCode = 201 };
        }

        // PUT api/resource/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Resource resource)
        {
            return new ObjectResult(_resourceManager.UpdateResource(resource)) { StatusCode = 200 };
        }

        // DELETE api/resource/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int resourceId)
        {
            if (_resourceManager.DeleteResource(resourceId))
                return Ok();
            return new ObjectResult("Error Deleting Resource") { StatusCode = 500 };
        }
    }
}