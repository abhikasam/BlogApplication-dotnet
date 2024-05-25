using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogoutController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly AuthContext authContext;

        public LogoutController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            AuthContext authContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.authContext = authContext;
        }

        [HttpPost]
        public JsonResult Get()
        {
            var userId = HttpContext.User.GetUserId();
            var user=authContext.Users.Where(i=>i.UserId == userId).FirstOrDefault();
            var userClaims = userManager.GetClaimsAsync(user);
            userClaims.Wait();
            this.userManager.RemoveClaimsAsync(user, userClaims.Result.Where(i => i.Type == "expires_at")).Wait();
            signInManager.SignOutAsync().Wait();
            return new JsonResult(true);
        }

    }
}
