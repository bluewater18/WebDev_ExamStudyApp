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
    public class UserController : Controller
    {
        IUserManager _userManager;
        public UserController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        // GET api/user
       [HttpGet]
       public IEnumerable<User> Get()
        {
            return _userManager.GetAllUsers();
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userManager.GetUserById(id);
        }

        [HttpPatch("{id}")]
        public IActionResult Edit(int id, [FromBody] User user)
        {
            User returnableUser = _userManager.UpdateUser(user);
            return Created("hidden", returnableUser);
        }

        // POST api/user
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            User returnableUser = _userManager.RegisterUser(user);
            return Created("hidden",returnableUser);
        }

        // PUT api/user/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            _userManager.UpdateUser(user);
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _userManager.DeleteUser(id);
        }                
    }
}