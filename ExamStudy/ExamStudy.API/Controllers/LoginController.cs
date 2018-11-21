using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

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
            return Ok(returnableUser);
        }
    }
}