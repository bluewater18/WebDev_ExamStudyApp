using System;

namespace ExamStudy.Entities
{
    public class Group { 
        public int GroupId { get; set; }
        public string GroupCode { get; set; }
        public string GroupName { get; set; }
        public string GroupDescription { get; set; }
        public string GroupType { get; set; }
        public int GroupOwnerId { get; set; }
        public string GroupOwnerName { get; set; }
        public string GroupImageName { get; set; }
        public string GroupMemberCount { get; set; }
    }
}
