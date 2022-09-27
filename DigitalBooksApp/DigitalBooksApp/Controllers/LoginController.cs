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
using System.Security.Claims;

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
        [Route("singup")]
        public IActionResult SingUp(User user)
        {
            IActionResult response = Unauthorized();
            db.Users.Add(user);
            db.SaveChanges();
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
            DigitalbookDBContext dbContext = new DigitalbookDBContext();
            if (authenticateUser != null)
            {
                var tokenString = GenerateToken(authenticateUser);
                var entity = dbContext.Invoices.FirstOrDefault(i => i.ReaderId == authenticateUser.Id);
                response = Ok(new { token = tokenString, user = authenticateUser, showMybooks = (entity != null? true : false)});
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

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.RoleId.ToString())
               }),
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = credentials
            };
            var TokenHandler = new JwtSecurityTokenHandler();
            var tokenGenerated = TokenHandler.CreateToken(token);
            return TokenHandler.WriteToken(tokenGenerated).ToString();
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users;
        }
    }
}
