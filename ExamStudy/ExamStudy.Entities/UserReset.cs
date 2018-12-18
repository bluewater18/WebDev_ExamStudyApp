namespace ExamStudy.Entities
{
    public class UserReset
    {
        public int UserId { get; set; }
        public long TimeCreated { get; set; }
        public string UrlKey { get; set; }
        public string Password { get; set; }
    }
}
