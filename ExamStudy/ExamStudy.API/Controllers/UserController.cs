using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using Microsoft.AspNetCore.Authorization;

namespace ExamStudy.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        IUserManager _userManager;
        public UserController(IAuthManager authManager, IUserManager userManager) :  base(authManager)
        {
            _userManager = userManager;
        }

        // GET api/user
       [HttpGet]
       public IEnumerable<User> Get()
        {
            IList<User> users =  _userManager.GetAllUsers();
            foreach(User u in users)
            {
                u.UserPassword = null;
            }
            return users;
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            CheckUserAuth(id);
            return _userManager.GetUserById(id);
        }

        [HttpPatch("{id}")]
        public IActionResult Edit(int id, [FromBody] User user)
        {
            CheckUserAuth(id);
            User returnableUser = _userManager.UpdateUser(user);
            return Created("hidden", returnableUser);
        }

        // POST api/user
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            User returnableUser = _userManager.RegisterUser(user);
            return Created("hidden",returnableUser);
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            CheckUserAuth(id);
            _userManager.DeleteUser(id);
        }                
    }
}