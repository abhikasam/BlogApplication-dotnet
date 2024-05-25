using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserArticlePinController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public UserArticlePinController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet("user")]
        public IEnumerable<Article> GetUserLikes()
        {
            int userId = HttpContext.User.GetUserId();
            var articles = blogContext.UserArticlePins
                            .Include(i => i.Article).ThenInclude(i => i.Author).DefaultIfEmpty()
                            .Include(i => i.Article).ThenInclude(i => i.ArticleCategories).ThenInclude(i => i.Category).DefaultIfEmpty()
                            .Include(i=>i.Article).ThenInclude(i=>i.UserArticleLikes).DefaultIfEmpty()
                            .Where(i => i.UserId == userId)
                            .Select(i => i.Article);

            return articles;
        }

        [HttpPost("changeOrder")]
        public JsonResult ChangeOrder([FromBody] object obj)
        {
            int userId = HttpContext.User.GetUserId();
            FromTo fromto = JsonConvert.DeserializeObject<FromTo>(obj.ToString());
            int from = fromto.from+1;
            int to = fromto.to+1;

            var newIds = new List<int>();
            if (from < to)
            {
                var previousArticles = blogContext.UserArticlePins
                        .Where(i=>i.UserId==userId)
                        .Where(i => i.OrderId >= from && i.OrderId <= to);
                var articleIds = previousArticles.Select(i => i.ArticleId).ToList();
                var rearranged=articleIds.Skip(1).ToList();
                rearranged.Add(articleIds.First());
                int id = 0;
                foreach(var item in previousArticles)
                {
                    item.ArticleId = rearranged[id++];
                }
            }
            else
            {
                var previousArticles = blogContext.UserArticlePins
                        .Where(i=>i.UserId==userId)
                        .Where(i => i.OrderId >= to && i.OrderId <= from);
                var articleIds = previousArticles.Select(i => i.ArticleId).ToList();
                var rearranged=new List<int>();
                rearranged.Add(articleIds.Last());
                rearranged.AddRange(articleIds.SkipLast(1));
                int id = 0;
                foreach (var item in previousArticles)
                {
                    item.ArticleId = rearranged[id++];
                }
            }

            blogContext.SaveChanges();
            return new JsonResult(new ResponseMessage()
            {
                StatusCode=ResponseStatus.SUCCESS
            });
        } 
    }
}


class FromTo
{
    public int from;
    public int to;
}
