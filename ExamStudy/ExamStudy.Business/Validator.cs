using ExamStudy.Entities;

namespace ExamStudy.Business
{
    class Validator
    {

        public void ValidateUserRegister(User user)
        {
             if(ValidateName(user.UserName) && ValidateEmail(user.UserEmail) && ValidatePassword(user.UserPassword))
                return;
            throw new InvalidObjectException("Invalid User Object");
        }


        public void ValidateUserLogin(User user)
        {
            if (ValidateEmail(user.UserEmail) && ValidatePassword(user.UserPassword))
                return;
            throw new InvalidObjectException("Invalid Login Request");
        }

        private bool ValidateName(string name)
        {
            if (name != null && name.Length > 2)
                return true;
            return false;
        }

        private bool ValidateEmail(string email)
        {
            if (email != null && email.Contains("@") && email.Length > 4)
                return true;
            return false;
        }

        private bool ValidatePassword(string password)
        {
            if (password != null && password.Length > 5)
                return true;
            return false;
        }

        public bool IsNullOrEmpty(string str)
        {
            return str == null || str == ""; 
        }
    }
}
