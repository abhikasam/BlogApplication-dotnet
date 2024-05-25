using BlogApplication.Server.Code;
using BlogApplication.Server.Models;
using BlogApplication.Server.Models.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly Microsoft.AspNetCore.Identity.SignInManager<ApplicationUser> signInManager;
        private readonly Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        public LoginController(IConfiguration configuration, Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager, Microsoft.AspNetCore.Identity.SignInManager<ApplicationUser> signInManager)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var authenticated = User.Identity.IsAuthenticated;
                if (!authenticated)
                {
                    return new JsonResult(new
                    {
                        Authenticated = false,
                        HasException = false
                    });
                }

                var id = User.GetUserId();
                var user = await userManager.FindByUserIdAsync(id);
                var claims = await userManager.GetClaimsAsync(user);
                var expiresAt = claims.Where(i => i.Type == "expires_at").FirstOrDefault();
                if (expiresAt == null)
                {
                    return new JsonResult(new
                    {
                        Authenticated = false,
                        HasException = false
                    });
                }

                var expiresIn = DateTime.Parse(expiresAt.Value);

                var expireTimeSpan = expiresIn.Subtract(DateTime.Now);

                if (expireTimeSpan.TotalSeconds <= 0)
                {
                    await userManager.RemoveClaimsAsync(user, claims.Where(i => i.Type == "expires_at"));

                    return new JsonResult(new
                    {
                        Authenticated = false,
                        HasException = false
                    });
                }

                return new JsonResult(new
                {
                    Authenticated = true,
                    ApplicationUser = UserDetails.GetDetails(claims.AsEnumerable()),
                    ExpiresIn = expireTimeSpan.TotalSeconds
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    Authenticated = false,
                    HasException = true,
                    ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody]Login login)
        {
            var message = new ResponseMessage();

            try
            {
 
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
                    var user = await userManager.FindByEmailAsync(login.Email);
                    if (user == null)
                    {
                        message.Message = "ApplicationUser not exists.";
                        message.StatusCode = ResponseStatus.ERROR;
                        return new JsonResult(message);
                    }

                    var claims = await userManager.GetClaimsAsync(user);
                    if (claims.Any(i => i.Type == "expires_at"))
                    {
                        await userManager.RemoveClaimsAsync(user, claims.Where(i => i.Type == "expires_at"));
                        await signInManager.SignOutAsync();
                    }

                    var result = await signInManager.PasswordSignInAsync(login.Email,
                                        login.Password,
                                        login.RememberMe,
                                        false);

                    if (result.Succeeded)
                    {
                        message.Message = "Login successful." + Environment.NewLine + "You will be redirected to Home Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;

                        var claim = new Claim("expires_at", DateTime.Now.AddMinutes(Startup.SessionExpireMinutes).ToString());

                        await userManager.AddClaimAsync(user, claim);
                        claims = await userManager.GetClaimsAsync(user);
                        var claimIdentity = new ClaimsIdentity(claims,Startup.AuthenticationType);
                        HttpContext.User=new ClaimsPrincipal(claimIdentity);
                        claims = await userManager.GetClaimsAsync(user);
                        message.Data = UserDetails.GetDetails(claims.AsEnumerable());
                    }
                    else
                    {
                        if (result.IsLockedOut)
                        {
                            message.Message = "You are locked out.";
                        }
                        else
                        {
                            message.Message = "Please check your credentials.";
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
