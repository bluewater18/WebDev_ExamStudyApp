using System.Collections.Generic;

namespace ExamStudy.Entities
{
    public class Question
    {
        public int QuestionId { get; set; }
        public int ResourceId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserImageName { get; set; }
        public string QuestionType { get; set; }
        public string QuestionTitle { get; set; }
        public string QuestionText { get; set; }
        public string QuestionImageName { get; set; }
        public IList<Answer> QuestionAnswers { get; set; }
    }
}
