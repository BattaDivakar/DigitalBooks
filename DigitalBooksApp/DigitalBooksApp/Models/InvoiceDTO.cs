using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBooksApp.Models
{
    public class InvoiceDTO
    {
        public int InvoiceId { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
     

    }
}
