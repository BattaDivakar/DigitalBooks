using Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Author.Services
{
    public interface IAuthorService : ILoginService
    {
        IActionResult Book(Book book);

        //IActionResult Upload(FormFile file);

        IEnumerable<Book> GetAuthorBooks(int id);

        IActionResult GetUpdateBookDetails(int id);

        IActionResult UpdateBook(Book book);
   
    }
}
