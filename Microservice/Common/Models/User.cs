using System;
using System.Collections.Generic;

#nullable disable

namespace Common.Models
{
    public partial class User
    {
        public User()
        {
            Books = new HashSet<Book>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}
