using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public RegisterController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        [HttpGet]
        public bool Get(string email="")
        {
            return userManager.Users.Any(i => i.Email.Equals(email));
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody]Register register)
        {
            ResponseMessage message = new ResponseMessage();
            try
            {
                if (register.Password != register.ConfirmPassword)
                {
                    ModelState.AddModelError("ConfirmPassword", "Password doesn't match");
                }
                if (string.IsNullOrWhiteSpace(register.FirstName))
                {
                    ModelState.AddModelError("FirstName", "First Name is invalid");
                }

                if (string.IsNullOrWhiteSpace(register.LastName))
                {
                    ModelState.AddModelError("LastName", "Last Name is invalid");
                }

                if (!ModelState.IsValid)
                {
                    message.Message = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage));
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {
                    var userId = userManager.Users.Any() ? userManager.Users.Select(i => i.UserId).Max(i => i + 1) : 1;
                    var user = new ApplicationUser()
                    {
                        UserName = register.Email,
                        Email = register.Email,
                        EmailConfirmed = true,
                        FirstName = register.FirstName,
                        LastName = register.LastName,
                        UserId = userId
                    };

                    var result = await userManager.CreateAsync(user, register.Password);

                    if (result.Succeeded)
                    {
                        var claims = new List<Claim>()
                        {
                            new Claim("FirstName", register.FirstName),
                            new Claim("LastName", register.LastName),
                            new Claim("FullName", register.FirstName + " " + register.LastName),
                            new Claim("Email",register.Email),
                            new Claim("Id",user.Id.ToString()),
                            new Claim("UserId",userId.ToString())
                        };

                        claims.Add(new Claim("Authenticated", "true"));

                        await userManager.AddClaimsAsync(user, claims);

                        message.Message = "Registration successful." + Environment.NewLine + "You will be redirected to Login Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            message.Message += error.Description + Environment.NewLine;
                        }
                        message.StatusCode = ResponseStatus.ERROR;
                    }

                }
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

    }
}
