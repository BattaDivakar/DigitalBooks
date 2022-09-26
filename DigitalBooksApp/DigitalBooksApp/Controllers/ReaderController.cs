using DigitalBooksApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DigitalBooksApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        DigitalbookDBContext db = new DigitalbookDBContext();

        [HttpGet]
        [Route("activeBooks")]
        public dynamic GetAllActiveBooks()
        {
            return (from b in db.Books
                    join u in db.Users on b.AuthorId equals u.Id
                    where b.Active == true
                    orderby b.Id
                    select new
                    {
                        b.Title,
                        b.Category,
                        b.Content,
                        b.FilePath,
                        b.Price,
                        u.UserName,
                    }).ToList();

            //return db.Books.Include(e => e.Author).Select(e => new Book
            // {
            //     Title = e.Title,
            //     Category = e.Category,
            //     Content = e.Content,
            //     Author = new User
            //     {
            //         UserName = e.Author.UserName,
            //     }
            // }).ToList();
        }
    }
}
