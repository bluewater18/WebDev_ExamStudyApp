using Microsoft.AspNetCore.Mvc;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using Microsoft.AspNetCore.Authorization;

namespace ExamStudy.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ResourceController : BaseController
    {
        IResourceManager _resourceManager;
        IQuestionManager _questionManager;
        IAnswerManager _answerManager;
        public ResourceController(IAuthManager authManager, IResourceManager resourceManager, IQuestionManager questionManager, IAnswerManager answerManager): base(authManager)
        {
            _resourceManager = resourceManager;
            _questionManager = questionManager;
            _answerManager = answerManager;
        }

        [HttpGet()]
        public IActionResult GetGroupResources(int groupId)
        {
            CheckGroupMember(groupId);
            return new ObjectResult(_resourceManager.GetGroupResources(groupId)) { StatusCode = 200 };
        }

        // GET api/resource/5
        [HttpGet("{id}")]
        [ActionName("index")]
        public IActionResult Get(int id)
        {
            //NOT TOO SURE HOW TO HANDLE AUTH FOR RESOURCES -- through group?
            //CheckResourceMember(id);
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

        // PUT api/resource/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Resource resource)
        {
            CheckResourceOwner(id);
            return new ObjectResult(_resourceManager.UpdateResource(resource)) { StatusCode = 200 };
        }

        // DELETE api/resource/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CheckResourceOwner(id);
            if (_resourceManager.DeleteResource(id))
                return Ok();
            return new ObjectResult("Error Deleting Resource") { StatusCode = 500 };
        }

        [HttpPost("{id}/question")]
        public IActionResult PostQuestion(int id, [FromBody] Question question)
        {
            return new ObjectResult(_questionManager.AddQuestion(question)) { StatusCode = 201 };
        }

        // PUT api/resource/5
        [HttpPut("question/{id}")]
        public IActionResult UpdateQuestion(int id, [FromBody] Question question)
        {
            CheckQuestionOwner(id);
            return new ObjectResult(_questionManager.UpdateQuestion(question)) { StatusCode = 200 };
        }

        // DELETE api/resource/5
        [HttpDelete("question/{id}")]
        public IActionResult DeleteQuestion(int id)
        {
            CheckQuestionOwner(id);
            if (_questionManager.DeleteQuestion(id))
                return Ok();
            return new ObjectResult("Error Deleting Resource") { StatusCode = 500 };
        }


        [HttpPost("question/{id}/answer")]
        public IActionResult PostAnswer(int id, [FromBody] Answer answer)
        {
            return new ObjectResult(_answerManager.AddAnswer(answer)) { StatusCode = 201 };
        }

        // PUT api/resource/5
        [HttpPut("question/answer/{id}")]
        public IActionResult UpdateAnswer(int id, [FromBody] Answer answer)
        {
            CheckAnswerOwner(id);
            return new ObjectResult(_answerManager.UpdateAnswer(answer)) { StatusCode = 200 };
        }

        // DELETE api/resource/5
        [HttpDelete("question/answer/{id}")]
        public IActionResult DeleteAnswer(int id)
        {
            CheckAnswerOwner(id);
            if (_answerManager.DeleteAnswer(id))
                return Ok();
            return new ObjectResult("Error Deleting Resource") { StatusCode = 500 };
        }

        // PUT api/resource/5
        [HttpPut("question/answer/{id}/upvote")]
        public IActionResult UpvoteAnswer(int id, int userId)
        {
            return new ObjectResult(_answerManager.UpvoteAnswer(id, userId)) { StatusCode = 200 };
        }

        // PUT api/resource/5
        [HttpPut("question/answer/{id}/downvote")]
        public IActionResult DownvoteAnswer(int id, int userId)
        {
            return new ObjectResult(_answerManager.DownvoteAnswer(id, userId)) { StatusCode = 200 };
        }

    }
}