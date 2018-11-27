using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

//Reference: https://www.codeproject.com/Articles/1256591/Upload-Image-to-NET-Core-2-1-API
namespace ExamStudy.API
{
    public interface IImageWriter
    {
        Task<string> UploadImage(IFormFile file);
    }
}
