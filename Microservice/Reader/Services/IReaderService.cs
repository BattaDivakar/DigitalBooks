using Common.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reader.Services
{
    public interface IReaderService
    {
        IEnumerable<SearchBookDTO> GetAllActiveBooks();

        IEnumerable<SearchBookDTO> GetSearchBooks(string author, string title, string category, string publisher);

        BookDTO GetBook(int id);

        IActionResult CreateInvoice(Invoice invoice);

        IEnumerable<SearchBookDTO> GetMyBooks(int id);

        IEnumerable<InvoiceDTO> GetMyPayments(int id);
    }
}
