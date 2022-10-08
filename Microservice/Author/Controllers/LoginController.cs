using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Author.Services;

namespace Author.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IAuthorService loginservice;
        public LoginController(IAuthorService _loginservice)
        {
            this.loginservice = _loginservice;
        }

        [HttpPost]
        [Route("signup")]
        public IActionResult SignUp(User user)
        {
            return loginservice.SignUp(user);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
            return loginservice.Login(user);
        }

        [HttpGet]
        public IEnumerable<User>Get()
        {
            return loginservice.GetUsers();
        }
    }
}
