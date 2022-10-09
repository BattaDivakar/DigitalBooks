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
using Azure.Storage.Blobs;

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
        public async Task<IActionResult> upload()
        {
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var _filename = Path.GetFileNameWithoutExtension(fileName);
                fileName = _filename + DateTime.Now.ToString("yyyyMMddHHmmss") + ".jpg";
                var dbPath =  fileName;
                string connectionstring = "DefaultEndpointsProtocol=https;AccountName=cogdotnet1709;AccountKey=/GWEZ+To7rSNMRaD6jJ/WSoYwRrt31ALkYUUiBoklLe1m9VZnm/1vTap1WBeom5X05QtJbUFiQ0V+AStZF6Amw==;EndpointSuffix=core.windows.net";
                string containerName = "images";
                BlobContainerClient container = new BlobContainerClient(connectionstring, containerName);
                var blob = container.GetBlobClient(fileName);
                var blobstream = file.OpenReadStream();
                await blob.UploadAsync(blobstream);
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
