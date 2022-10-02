using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Models;
using Reader.Services;

namespace Reader.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        IReaderService readerservice;

        public ReaderController(IReaderService _readerservice )
        {
            readerservice = _readerservice;
        }

        [HttpGet]
        [Route("ActiveBooks")]
        public IEnumerable<SearchBookDTO> GetAllActiveBooks()
        {
            return readerservice.GetAllActiveBooks();
        }

        [HttpGet]
        [Route("SearchBooks")]
        public IEnumerable<SearchBookDTO> GetSearchBooks(string author, string title, string category, string publisher)
        {
            return readerservice.GetSearchBooks(author, title, category, publisher);
        }

        [HttpGet]
        [Route("GetBook")]
        public BookDTO GetBook(int id)
        {
            return readerservice.GetBook(id);
        }

        [HttpPost]
        [Route("CreateInvoice")]
        public IActionResult CreateInvoice(Invoice invoice)
        {
            return readerservice.CreateInvoice(invoice);
        }

        [HttpGet]
        [Route("GetMyBooks")]
        public IEnumerable<SearchBookDTO> GetMyBooks(int id)
        {
            return readerservice.GetMyBooks(id);
        }

        [HttpGet]
        [Route("GetMyPayments")]
        public IEnumerable<InvoiceDTO> GetMyPayments(int id)
        {
            return readerservice.GetMyPayments(id);
        }
    }
}
