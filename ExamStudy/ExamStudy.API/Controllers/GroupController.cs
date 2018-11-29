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

        // GET api/group/5
        [HttpGet("{id}")]
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
    }
}