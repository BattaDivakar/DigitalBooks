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
    }
}
