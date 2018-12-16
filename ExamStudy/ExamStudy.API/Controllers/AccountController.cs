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
using ExamStudy.Business;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;


namespace ExamStudy.API.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        IUserManager _userManager;
        public AccountController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        // Post api/login
        [HttpPost("login")]
        public IActionResult Login([FromBody]User user)
        {
            try
            {
                User returnableUser = _userManager.LoginUser(user);
                return Ok(returnableUser);
            } catch(InvalidAuthorizationException)
            {
                return StatusCode(401, "{'reason':'Invalid Credentials'}");
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout(int id)
        {

            if (_userManager.LogoutUser(id))
                return Ok();
            return StatusCode(400, "{'reason':'could not logout'}");
        }
    }
}