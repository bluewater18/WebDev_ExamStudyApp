using System.Collections.Generic;

namespace ExamStudy.Entities
{
    public class Resource
    {
        public int ResourceId { get; set; }
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public string ResourceName { get; set; }
        public string ResourceType { get; set; }
        public IList<Question> ResourceQuestions { get; set; }
    }
}
