using Microsoft.AspNetCore.Mvc;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Business;
using System;

namespace ExamStudy.API.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly string clientLink = "http://localhost:3000/reset-password/";
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
            } catch (InvalidAuthorizationException)
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

        [HttpPost("reset-password")]
        public IActionResult RequestResetPassword(string email)
        {
            User user = _userManager.GetUserByEmail(email);
            string key = _userManager.CreateUserResetPasswordKey(user.UserId);
            MailHandler mail = new MailHandler();

            //user.UserEmail = "morganenglish@rocketmail.com"; //For testing purposes
            mail.SendRegistrationEmail(user.UserEmail, user.UserName, clientLink+key);
            return Ok();
        }

        [HttpPut("reset-password")]
        public IActionResult ResetPassword([FromBody] UserReset userReset)
        {
            Console.WriteLine("!@#$%^&*()"+ userReset.UrlKey);
            Console.WriteLine("!@#$%^&*()"+ userReset.Password);

            int userId = _userManager.ConfirmUserResetPassword(userReset.UrlKey);
            if (userId < 0)
                throw new CustomNotFoundException("could not find user associated with key");
            _userManager.UpdateUserPassword(userId, userReset.Password);
            return Ok();
        }
    }
}