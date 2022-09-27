using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBooksApp.Models
{
    public partial class Invoice
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; }
        public int BookId { get; set; }
        public int ReaderId { get; set; }
        public int AuthorId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Amount { get; set; }
        public int Status { get; set; }
        public string Comments { get; set; }
    }
}
