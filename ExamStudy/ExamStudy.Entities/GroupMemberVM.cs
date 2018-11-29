using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Entities
{
    public class GroupMemberVM
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string MemberType { get; set; }
        public string UserImageName { get; set; }
    }
}
