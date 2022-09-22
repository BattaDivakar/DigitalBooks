using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalBooksApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace DigitalBooksApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        DigitalbookDBContext db = new DigitalbookDBContext();

        private IConfiguration config;
        public LoginController(IConfiguration config)
        {
            this.config = config;
        }

        [HttpPost]
        public IActionResult SingUp(User user)
        {
            IActionResult response = Unauthorized();
            db.Users.Add(user);
            if (user != null)
            {
                var tokenString = GenerateToken(user);
                response = Ok(new { token = tokenString });
            }
            return response;
        }


        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
            IActionResult response = Unauthorized();
            var authenticateUser = AuthenticateUser(user);
            if (authenticateUser != null)
            {
                var tokenString = GenerateToken(authenticateUser);
                response = Ok(new { token = tokenString });
            }
            return response;
        }

        private User AuthenticateUser(User user)
        {
            if (db.Users.Any(x => x.Email == user.Email && x.Password == user.Password))
            {
                return db.Users.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
            }
            else
            {
                return null;
            }
        }

        private string GenerateToken(User login)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(config["jwt:Issuer"],
                config["jwt:Audience"],
                null,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            
            return db.Users;
        }
    }
}
