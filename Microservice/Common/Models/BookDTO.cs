using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Models
{
   public class BookDTO
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Content { get; set; }
        public string Publisher { get; set; }
        public DateTime PublisherDate { get; set; }
        public string Chapters { get; set; }
        public string FilePath { get; set; }
        public bool Active { get; set; }
        public string AuthorName { get; set; }
    }

    public class SearchBookDTO
    {
        public string AuthorName { get; set; }
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string FilePath { get; set; }
        public string Publisher { get; set; }

    }

}
