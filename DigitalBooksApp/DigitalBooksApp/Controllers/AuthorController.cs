using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalBooksApp.Models;
using System.IO;
using System.Net.Http.Headers;

namespace DigitalBooksApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        DigitalbookDBContext db = new DigitalbookDBContext();

        [HttpPost]
        [Route("book")]
        public IActionResult Book(Book book)
        {
            
            IActionResult response = Unauthorized();
            db.Books.Add(book);
            db.SaveChanges();
            return response = Ok(new { text ="success"});
        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public IActionResult upload()
        {
            var file = Request.Form.Files[0];
            var foldername = "Images";
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                fileName = DateTime.Now.ToFileTime()+"_"+fileName ;
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(foldername, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        public IEnumerable<Book> Get(int id)
        {
            return db.Books == null ? null :  db.Books.Where(x => x.AuthorId == id);
        }

        [HttpGet]
        [Route("getUpdateBook")]
        public IActionResult GetUpdateBook(int id)
        {
            IActionResult response = Unauthorized();
            Book book = db.Books.Find(id);
            //return db.Books == null ? null : db.Books.Where(x => x.Id == id);
           return response = Ok(new {book = book });
        }

        [HttpPut]
        [Route("UpdateBook")]
        public IActionResult UpdateBook(Book book)
        {
            using(DigitalbookDBContext dbContext = new DigitalbookDBContext())
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
                if(!string.IsNullOrWhiteSpace(filepath))
                {
                    Remove(filepath);
                }
            }
            IActionResult response = Unauthorized();
            return response = Ok(new { text = "success" });
        }

        private void Remove(string filepath)
        {
            if (System.IO.File.Exists(Path.Combine(Directory.GetCurrentDirectory(), filepath)))
            {
                System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), filepath));
            }
        }

    }
}
