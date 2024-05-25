
using BlogApplication.Server.Models.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BlogApplication.Server.Code
{
    public class UserAuthenticationMiddleware
    {
        private readonly RequestDelegate next;
        public UserAuthenticationMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
       {
            if (context.User.Identity.IsAuthenticated)
            {
                var id = context.User.GetUserId();
                var usersDictionary = AuthorizationCache.AuthUserCache;
                var user = usersDictionary.Where(i=>i.Key==id).FirstOrDefault().Value;
                var contextClaims = context.User.Claims.Select(i=>(i.Type,i.Value)).ToList();
                foreach(var claim in user.Claims)
                {
                    var contextClaim = contextClaims.FirstOrDefault(i => i.Type == claim.ClaimType);
                    if (contextClaim.Value!=null)
                    {
                        contextClaim.Value = claim.ClaimValue;
                    }
                    else
                    {
                        contextClaims.Add((claim.ClaimType, claim.ClaimValue));
                    }
                }
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(contextClaims.Select(i=> new Claim(i.Type,i.Value)), Startup.AuthenticationType);
                context.User=new ClaimsPrincipal(claimsIdentity);
                var expiresAtClaim = context.User.Claims.Where(i => i.Type == "expires_at").FirstOrDefault();
                if (expiresAtClaim != null)
                {
                    var claimValue = Convert.ToDateTime(expiresAtClaim.Value);
                    if (DateTime.Now>claimValue)
                    {
                        using(var authContext=new AuthContext(new DbContextOptionsBuilder<AuthContext>()
                            .UseSqlServer(Startup.AuthDbConnectionString).Options))
                        {
                            var removeClaims=authContext.UserClaims
                                            .Where(i=>i.UserId==user.Id)
                                            .Where(i=>i.ClaimType =="Authenticated" ||  i.ClaimType =="expires_at")
                                            .ToList();
                            authContext.UserClaims.RemoveRange(removeClaims);
                            authContext.SaveChanges();
                            await context.SignOutAsync(Startup.AuthenticationType);
                            if (context.Request.Path != "/api/login")
                            {
                                context.Response.StatusCode = StatusCodes.Status404NotFound;
                                return;
                            }
                        }
                    }
                }
                else
                {
                    await context.SignOutAsync(Startup.AuthenticationType);
                    if (context.Request.Path != "/api/login" && context.Request.Method!="post")
                    {
                        context.Response.StatusCode = StatusCodes.Status404NotFound;
                        return;
                    }
                }
                //var claims = await userManager.GetClaimsAsync(user);
                //var expiresAt = claims.Where(i => i.Type == "expires_at").FirstOrDefault();
            }
            await next(context);
        }
    }
    public static class UserAuthenticationMiddlewareExt
    {
        public static void UserAuthenticationMiddleware(this IApplicationBuilder application)
        {
            application.UseMiddleware<UserAuthenticationMiddleware>();
        }
    }
}
