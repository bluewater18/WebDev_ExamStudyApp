﻿using System;

namespace ExamStudy.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserToken { get; set; }
        public string UserImageName { get; set; }
    }
}
