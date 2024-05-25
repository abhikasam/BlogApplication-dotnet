using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Auth;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserArticleLikeController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public UserArticleLikeController(
            BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet("user")]
        public IEnumerable<Article> GetUserLikes()
        {
            int userId=HttpContext.User.GetUserId();
            var xpagination = XPagination.GetXPagination(Request);
            var articles = blogContext.UserArticleLikes
                            .Include(i=>i.Article).ThenInclude(i=>i.Author).DefaultIfEmpty()
                            .Include(i=>i.Article).ThenInclude(i=>i.ArticleCategories).ThenInclude(i=>i.Category).DefaultIfEmpty()
                            .Include(i=>i.Article).ThenInclude(i=>i.UserArticlePins).DefaultIfEmpty()
                            .Where(i => i.UserId == userId)
                            .Select(i=>i.Article)
                            .Paginate(xpagination);

            xpagination.SetXPagination(Response);
            return articles;
        }
    }
}
