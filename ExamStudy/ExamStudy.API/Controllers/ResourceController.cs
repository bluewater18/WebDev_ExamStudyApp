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
        IUserManager _userManager;
        IGroupManager _groupManager;
        public ResourceController(IUserManager userManager, IGroupManager groupManager)
        {
            _userManager = userManager;
            _groupManager = groupManager;
        }

        // GET api/group
       [HttpGet]
       public IEnumerable<Group> Get()
        {
            return _groupManager.GetAllGroups();
        }

        [HttpGet("joined")]
        public IActionResult GetUsersGroups(int userId)
        {
            return new ObjectResult(_groupManager.GetUsersGroups(userId)) { StatusCode = 200 };
        }

        // GET api/group/5
        [HttpGet("{id}")]
        [ActionName("index")]
        public Group Get(int id)
        {
            return _groupManager.GetGroupById(id);
        }

        //[HttpPatch("{id}")]
        //public IActionResult Edit(int id, [FromBody] Group user)
        //{
        //    Group returnableGroup = _userManager.UpdateGroup(group);
        //    return Created("hidden", returnableGroup);
        //}

        // POST api/user
        [HttpPost]
        public IActionResult Post([FromBody] Group group)
        {
            Group returnableGroup = _groupManager.CreateGroup(group);
            return Created("hidden",returnableGroup);
        }

        // PUT api/group/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Group group)
        {
            return new ObjectResult(_groupManager.UpdateGroup(group)) { StatusCode = 200 };
        }

        // DELETE api/group/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_groupManager.DeleteGroup(id))
                return Ok();
            return new ObjectResult("Error Deleting Group") { StatusCode = 500 };
        }
        
        [HttpGet("members/{id}")]
        public IActionResult GetMembers (int id) {
            
            return new ObjectResult(_groupManager.GetGroupMembers(id));
        }

        [HttpPost("members/join")]
        public IActionResult AddUserToGroup (int groupId, int userId, string type)
        {
            if(_groupManager.AddUserToGroup(groupId, userId, type)){
                return Ok();
            }
            return new ObjectResult("User Not Added")
            { StatusCode = 500 };
        }

        [HttpPost("members/leave")]
        public IActionResult LeaveGroup (int groupId, int userId)
        {
            if (_groupManager.RemoveUserFromGroup(groupId, userId))
                return Ok();
            return new ObjectResult("Issue removing user from group") { StatusCode = 500 };
        }

        [HttpPut("member/join")]
        public IActionResult AddUserToGroupByCode (string code, int userId)
        {
            int groupId = _groupManager.AddUserToGroupByCode(code, userId);
            if(groupId > 0)
            {
                Group g = new Group();
                g.GroupId = groupId;
                return new ObjectResult(g) { StatusCode = 200 };
            }
                
            return new ObjectResult("Issue joining Group")
            { StatusCode = 500 };
        }
    }
}