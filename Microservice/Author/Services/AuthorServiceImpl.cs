using Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Author.Services
{
    public class AuthorServiceImpl : ControllerBase, IAuthorService
    {
        DigitalbookDBContext db = new DigitalbookDBContext();

        private IConfiguration config;
        public AuthorServiceImpl(IConfiguration config)
        {
            this.config = config;
        }

        public IActionResult Book(Book book)
        {
            IActionResult response = Unauthorized();
            db.Books.Add(book);
            db.SaveChanges();
            return response = Ok(new { text = "success" });
        }

        public IEnumerable<Book> GetAuthorBooks(int id)
        {
            return db.Books == null ? null : db.Books.Where(x => x.AuthorId == id);
        }

        public IActionResult GetUpdateBookDetails(int id)
        {
            IActionResult response = Unauthorized();
            Book book = db.Books.Find(id);
            return response = Ok(new { book = book });
        }

        public IActionResult Login(User user)
        {
            IActionResult response = Unauthorized();
            var authenticateUser = AuthenticateUser(user);
            DigitalbookDBContext dbContext = new DigitalbookDBContext();
            if (authenticateUser != null)
            {
                var tokenString = GenerateToken(authenticateUser);
                var entity = dbContext.Invoices.FirstOrDefault(i => i.ReaderId == authenticateUser.Id);
                response = Ok(new { token = tokenString, user = authenticateUser, showMybooks = (entity != null ? true : false) });
            }
            return response;
        }

        public IActionResult SignUp(User user)
        {
            IActionResult response = Unauthorized();
            db.Users.Add(user);
            db.SaveChanges();
            return response = Ok(new { msg = "success" });
        }

        public IActionResult UpdateBook(Book book)
        {
            IActionResult response = Unauthorized();
            using (DigitalbookDBContext dbContext = new DigitalbookDBContext())
            {
                var entity = dbContext.Books.FirstOrDefault(b => b.Id == book.Id);
                string filepath = entity.FilePath != book.FilePath ? entity.FilePath : string.Empty;
                entity.Title = book.Title;
                entity.Category = book.Category;
                entity.Price = book.Price;
                entity.Content = book.Content;
                entity.Publisher = book.Publisher;
                entity.PublisherDate = book.PublisherDate;
                entity.Chapters = book.Chapters;
                entity.Active = book.Active;
                entity.FilePath = book.FilePath;
                dbContext.SaveChanges();
                if (!string.IsNullOrWhiteSpace(filepath))
                {
                    Remove(filepath);
                }
            }
            return response = Ok(new { text = "success" });
        }

        //public IActionResult Upload(IFormFile file)
        //{
        //    var foldername = "Images";
        //    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);
        //    if (file.Length > 0)
        //    {
        //        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //        fileName = DateTime.Now.ToFileTime() + "_" + fileName;
        //        var fullPath = Path.Combine(pathToSave, fileName);
        //        var dbPath = Path.Combine(foldername, fileName);
        //        using (var stream = new FileStream(fullPath, FileMode.Create))
        //        {
        //            file.CopyTo(stream);
        //        }
        //        return Ok(new { dbPath });
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //}

        private void Remove(string filepath)
        {
            if (System.IO.File.Exists(Path.Combine(Directory.GetCurrentDirectory(), filepath)))
            {
                System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), filepath));
            }
        }

        private User AuthenticateUser(User user)
        {
            if (db.Users.Any(x => x.Email == user.Email && x.Password == user.Password))
            {
                return db.Users.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
            }
            else
            {
                return null;
            }
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.RoleId.ToString())
               }),
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = credentials
            };
            var TokenHandler = new JwtSecurityTokenHandler();
            var tokenGenerated = TokenHandler.CreateToken(token);
            return TokenHandler.WriteToken(tokenGenerated).ToString();
        }

        public IEnumerable<User> GetUsers()
        {
            return db.Users;
        }
    }
}
