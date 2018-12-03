﻿using System;
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
    public class GroupController : Controller
    {
        IUserManager _userManager;
        IGroupManager _groupManager;
        public GroupController(IUserManager userManager, IGroupManager groupManager)
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
        public void Put(int id, [FromBody] Group group)
        {
            _groupManager.UpdateGroup(group);
        }

        // DELETE api/group/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _groupManager.DeleteGroup(id);
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
            if (_groupManager.AddUserToGroupByCode(code, userId))
                return Ok();
            return new ObjectResult("Issue joining Group")
            { StatusCode = 500 };
        }
    }
}