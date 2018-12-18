using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ExamStudy.API
{
    public class MailHandler
    {
        //helpful resource @ https://stackoverflow.com/questions/4677258/send-email-using-system-net-mail-through-gmail
        private readonly string FromMail = "auto.examstudy@gmail.com";
        private readonly string MailPass = "appleipodtouch1";
        private readonly string Host = "smtp.gmail.com";
        private readonly int Port = 587;

        public void SendRegistrationEmail(string emailTo, string name, string url)
        {
            string subject = "Registration To Exam Study!";
            string body = "Hi " + name + "! \nTo complete your registration please click on the link below \n" + url;

            SendEmail(subject, body, emailTo, name, url);
        }

        public void SendResetPasswordEmail(string emailTo, string name, string url)
        {
            string subject = "Password Reset for Exam Study!";
            string body = "Hi " + name + ", \nYou have recently requested a a passwor dreset for your account. Click the link below to reset it \n" + url + "\nIf you did not request a reset please ignore this email. This password reset will only be valid for X minutes";

            SendEmail(subject, body, emailTo, name, url);
        }

        private void SendEmail(string subject, string body, string emailTo, string name, string url)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient();

            SmtpServer.Port = Port;
            SmtpServer.EnableSsl = true;
            SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, MailPass);
            SmtpServer.Host = Host;

            mail.From = new MailAddress(FromMail);
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;

            SmtpServer.Send(mail);
        }
    }
}
