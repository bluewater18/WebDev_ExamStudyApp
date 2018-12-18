namespace ExamStudy.Entities
{
    public class Answer { 
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserImageName { get; set; }
        public int AnswerUpvotes { get; set; }
        public int AnswerDownvotes { get; set; }
        public string AnswerType { get; set; }
        public string AnswerTitle { get; set; }
        public string AnswerText { get; set; }
        public string AnswerImageName { get; set; }
    }
}
