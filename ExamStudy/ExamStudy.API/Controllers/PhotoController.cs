using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamStudy.Business.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ExamStudy.API.Controllers
{
    [Route("api/Photos")]
    public class PhotoController : Controller
    {
        IImageHandler _imageHandler;
        IUserManager _userManager;
        IGroupManager _groupManager;
        IQuestionManager _questionManager;
        IAnswerManager _answerManager;

        public PhotoController(IImageHandler imageHandler, IUserManager userManager, IGroupManager groupManager, IQuestionManager questionManager, IAnswerManager answerManager)
        {
            _imageHandler = imageHandler;
            _userManager = userManager;
            _groupManager = groupManager;
            _questionManager = questionManager;
            _answerManager = answerManager;
        }


        [HttpPost("{id}")]
        public async Task<IActionResult> PostUserPhoto(int id, IFormFile image, string pathType)
        {
            if (pathType.Equals("user", StringComparison.InvariantCultureIgnoreCase))
            {
                var path = await _imageHandler.UploadImage(image);
                _userManager.UpdateUserPhoto(id, path);
                return Created(path, new JObject(new JProperty("UserPhotoPath", path)));
               
            }
            else if (pathType.Equals("group", StringComparison.InvariantCultureIgnoreCase))
            {
                var path = await _imageHandler.UploadImage(image);
                _groupManager.UpdateGroupPhoto(id, path);
                return Created(path, new JObject(new JProperty("GroupPhotoPath", path)));
            }
            else if(pathType.Equals("question", StringComparison.InvariantCultureIgnoreCase))
            {
                var path = await _imageHandler.UploadImage(image);
                _questionManager.UpdateQuestionPhoto(id, path);
                return Created(path, new JObject(new JProperty("QuestionPhotoPath", path)));
            }
            else if(pathType.Equals("answer", StringComparison.InvariantCultureIgnoreCase))
            {
                var path = await _imageHandler.UploadImage(image);
                _answerManager.UpdateAnswerPhoto(id, path);
                return Created(path, new JObject(new JProperty("AnswerPhotoPath", path)));
            }

            return NotFound("Invalid type");

        }
    }
}