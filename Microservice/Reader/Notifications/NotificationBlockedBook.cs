using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Common.Models;
using MassTransit;

namespace Reader.Notifications
{
    public class NotificationBlockedBook : IConsumer<Book>
    {
        DigitalbookDBContext DBContext;
        public NotificationBlockedBook(DigitalbookDBContext _db)
        {
            DBContext = _db;
        }
        public Task Consume(ConsumeContext<Book> context)
        {
            List<Invoice> lstReaders = new List<Invoice>();
            var data = context.Message;
            lstReaders = DBContext.Invoices.Where(x => x.BookId == data.Id).ToList();
            foreach( var reader in lstReaders)
            {
                User user = new User();
                user = DBContext.Users.Where(x => x.Id == reader.ReaderId).FirstOrDefault();
                Email(reader, user, data);
            }

            return Task.CompletedTask;
        }
        public static void Email(Invoice reader, User user, Book book)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress("divakar.batta@gmail.com");
            message.To.Add( new MailAddress(user.Email));
            message.Subject = "Notification";
            message.IsBodyHtml = true;
            message.Body = "Dear " + user.UserName + "<br/>";
            message.Body += "<b>"+book.Title  + "</b>"+ " is currently unavailable. <br/>";
            message.Body += "<p>We have processed your refund, and you should expect to see the amount credited to your account in about 1 to 2 business days.</p><br>";
            message.Body += "<p>If you have any other questions or concerns, just reply to this email, we will be here to help you in any way we can.</p><br>";
            smtp.Port = 587;
            smtp.Host = "smtp.gmail.com";
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("divakar.batta@gmail.com", "zKoyfznxtqnyicni");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Send(message);
        }
    }
}
