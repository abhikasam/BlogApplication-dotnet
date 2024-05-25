using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthorController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public UserAuthorController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet]
        public IEnumerable<int> Get()
        {
            var userId = HttpContext.User.GetUserId();
            var userAuthors = blogContext.UserAuthors
                            .Where(i => i.UserId == userId)
                            .Select(i => i.UserId);
            return userAuthors;
        }

        [HttpPost("follow")]
        public JsonResult Follow([FromBody] UserAuthor userAuthor)
        {
            int userId = HttpContext.User.GetUserId();

            var dbUserAuthor = blogContext.UserAuthors.FirstOrDefault(i => i.UserId == userId && i.AuthorId == userAuthor.AuthorId);
            if (dbUserAuthor == null && userAuthor.IsFollowing)
            {
                userAuthor.UserId = userId;
                blogContext.UserAuthors.Add(userAuthor);
                blogContext.SaveChanges();
            }
            else if (dbUserAuthor != null && !userAuthor.IsFollowing)
            {
                blogContext.UserAuthors.Remove(dbUserAuthor);
                blogContext.SaveChanges();
            }

            var currentList = blogContext.UserAuthors.Where(i => i.UserId == userId).Select(i => i.AuthorId).ToList();
            return new JsonResult(currentList);
        }
    }
}
