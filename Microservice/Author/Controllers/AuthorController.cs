using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Models;
using System.IO;
using System.Net.Http.Headers;
using Author.Services;
using MassTransit;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Author.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class AuthorController : ControllerBase
    {
        IAuthorService authorservice;
        IBus bus;

        public AuthorController(IAuthorService _authorService, IBus _bus)
        {
            authorservice = _authorService;
            bus = _bus;
        }
        
        [HttpPost]
        [Route("book")]
        public IActionResult Book(Book book)
        {
            return authorservice.Book(book);
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
                fileName = DateTime.Now.ToFileTime() + "_" + fileName;
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
        [Route("GetAuthorBooks")]
        public IEnumerable<Book>Get(int id)
        {
            return authorservice.GetAuthorBooks(id);
        }

        [HttpGet]
        [Route("getUpdateBook")]
        public IActionResult GetUpdateBook(int id)
        {
            return authorservice.GetUpdateBookDetails(id);
        }

        [HttpPut]
        [Route("UpdateBook")]
        public IActionResult UpdateBook(Book book)
        {
            IActionResult response = Unauthorized();
            authorservice.UpdateBook(book);
            if(!book.Active)
            {
              BlockedBook(book).Wait();
            }
            return response = Ok(new { msg = "success" });
        }

        [HttpGet]
        [Route("BlockedBook")]
        public async Task<IActionResult> BlockedBook(Book book)
        {
            if(book != null)
            {
                Uri uri = new Uri("rabbitmq:localhost/NotificationBlockedBookQueue");
                var endpoint = await bus.GetSendEndpoint(uri);
                await endpoint.Send(book);
                return Ok(new { status = "Your request has been recived" });
            }
            return BadRequest();
        }
      
    }
}
