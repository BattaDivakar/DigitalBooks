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
        public IEnumerable<SearchBookDTO> GetAllActiveBooks()
        {
            return (from b in db.Books
                    join u in db.Users on b.AuthorId equals u.Id
                    where b.Active == true
                    orderby b.Id
                    select new SearchBookDTO
                    {
                        BookId = b.Id,
                        Title = b.Title,
                        Category = b.Category,
                        Publisher = b.Publisher,
                        FilePath = b.FilePath,
                        Price = b.Price,
                        AuthorName = u.UserName,
                    }).ToList();
        }

        [HttpGet]
        [Route("searchBooks")]
        public IEnumerable<SearchBookDTO> GetSearchBooks(string author, string title, string category, string publisher)
        {
            return (from b in db.Books
                    join u in db.Users on b.AuthorId equals u.Id
                    where (u.UserName.Contains(author) 
                           || b.Title.Contains(title)
                           || b.Category.Contains(category)
                           || b.Publisher.Contains(publisher)
                           ) && b.Active == true
                    orderby b.Id
                    select new SearchBookDTO
                    {
                        BookId = b.Id,
                        Title = b.Title,
                        Category = b.Category,
                        Publisher = b.Publisher,
                        FilePath = b.FilePath,
                        Price = b.Price,
                        AuthorName = u.UserName,
                    }).ToList();
        }

        [HttpGet]
        [Route("GetBook")]
        public BookDTO GetBook(int id)
        {
            return (from b in db.Books
                    join u in db.Users on b.AuthorId equals u.Id
                    where b.Id == id && b.Active == true
                    orderby b.Id
                    select new BookDTO
                    {
                        Id = b.Id,
                        Title = b.Title,
                        Category = b.Category,
                        Publisher = b.Publisher,
                        FilePath = b.FilePath,
                        Price = b.Price,
                        AuthorName = u.UserName,
                        PublisherDate = b.PublisherDate,
                        Chapters = b.Chapters,
                        Content = b.Content 
                    }).FirstOrDefault();
        }

        [HttpPost]
        [Route("CreateInvoice")]
        public IActionResult CreateInvoice(Invoice invoice)
        {
            IActionResult response = Unauthorized();
            DigitalbookDBContext dbContext = new DigitalbookDBContext();
            var entity = dbContext.Books.FirstOrDefault(b => b.Id == invoice.BookId);
            invoice.AuthorId = entity.AuthorId;
            invoice.Amount = entity.Price;
            db.Invoices.Add(invoice);
            db.SaveChanges();
            return response = Ok(new { msg = "success" });
        }

        [HttpGet]
        [Route("GetMyBooks")]
        public IEnumerable<SearchBookDTO> GetMyBooks(int id)
        {
            return (from b in db.Books
                    join u in db.Users on b.AuthorId equals u.Id
                    join i in db.Invoices on id equals i.ReaderId
                    where b.Active == true && i.ReaderId == id && i.BookId == b.Id && i.Status == 1
                    orderby b.Id
                    select new SearchBookDTO
                    {
                        BookId = b.Id,
                        Title = b.Title,
                        Category = b.Category,
                        Publisher = b.Publisher,
                        FilePath = b.FilePath,
                        Price = b.Price,
                        AuthorName = u.UserName,
                    }).ToList();
        }

        [HttpGet]
        [Route("GetMyPayments")]
        public IEnumerable<InvoiceDTO> GetMyPayments(int id)
        {
            return (from b in db.Books
                    join u in db.Users on b.AuthorId equals u.Id
                    join i in db.Invoices on id equals i.ReaderId
                    join s in db.InvoiceStatuses on i.Status equals s.Id
                    where b.Active == true && i.ReaderId == id && i.BookId == b.Id
                    orderby b.Id
                    select new InvoiceDTO
                    {
                        InvoiceId = i.Id,
                        Title = b.Title,
                        AuthorName = u.UserName,
                        InvoiceNumber = i.InvoiceNumber,
                        InvoiceDate = i.InvoiceDate,
                        Amount = i.Amount,
                        Status = s.Status
                    }).ToList();
        }


    }
}