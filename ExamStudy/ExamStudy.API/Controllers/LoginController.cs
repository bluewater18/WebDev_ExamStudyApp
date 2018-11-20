using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;

namespace ExamStudy.API.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        IUserManager _userManager;
        public LoginController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        // Post api/login
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            User returnableUser = _userManager.LoginUser(user);
            var result = new ObjectResult(returnableUser)
            { StatusCode = 200 };
            Request.HttpContext.Response.Headers.Add("X-Authorization", returnableUser.UserToken);
            return result;

        }
    }
}