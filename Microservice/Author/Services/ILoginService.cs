using Common.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Author.Services
{
    public interface ILoginService
    {
        IActionResult SignUp(User user);

        IActionResult Login(User user);

        IEnumerable<User> GetUsers();
    }
}
