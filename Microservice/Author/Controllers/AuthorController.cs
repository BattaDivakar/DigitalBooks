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

namespace Author.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            return authorservice.Upload();
        }

        [HttpGet]
        public IEnumerable<Book> Get(int id)
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
            return authorservice.UpdateBook(book);
        }

        public async Task<IActionResult> BlockedBook(int bookid)
        {
            if(bookid > 0)
            {
                Uri uri = new Uri("rabbitmq:localhost/NotificationBlockedBookQueue");
                var endpoint = await bus.GetSendEndpoint(uri);
                await endpoint.Send(bookid);
                return Ok(new { status = "Your request has been recived" });
            }
            return BadRequest();
        }
      
    }
}
