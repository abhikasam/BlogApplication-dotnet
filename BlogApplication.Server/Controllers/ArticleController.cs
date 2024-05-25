using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using BlogApplication.Server.Models.BlogFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ArticleController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public ArticleController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }
        [HttpGet]
        public IEnumerable<Article> Get()
        {
            var xpagination = XPagination.GetXPagination(Request);

            var articles = blogContext.Articles
                .Include(i=>i.ArticleCategories).ThenInclude(i=>i.Category).ThenInclude(i=>i.UserCategories).ThenInclude(i=>i.User).DefaultIfEmpty()
                .Include(i => i.Author).DefaultIfEmpty()
                .Include(i=>i.UserArticleLikes).DefaultIfEmpty()
                .Include(i=>i.UserArticlePins).DefaultIfEmpty()
                .Paginate(xpagination);

            xpagination.SetXPagination(Response);
            return articles;
        }

        [HttpGet("{authors}/{categories}")]
        public IEnumerable<Article> Get(string authors,string categories)
        {
            var xpagination=XPagination.GetXPagination(Request);

            int[] authorIds = JsonConvert.DeserializeObject<string[]>(authors.ToString())
                            .Select(i=>Convert.ToInt32(i)).ToArray();
            int[] categoryIds = JsonConvert.DeserializeObject<string[]>(categories.ToString())
                            .Select(i=>Convert.ToInt32(i)).ToArray();

            var articles = blogContext.Articles
                //.AsSplitQuery()
                .Include(i => i.ArticleCategories).ThenInclude(i => i.Category).ThenInclude(i=>i.UserCategories).ThenInclude(i=>i.User).DefaultIfEmpty()
                .Include(i => i.Author).DefaultIfEmpty()
                .Where(i => authorIds.Count() == 0 || authorIds.Contains(i.AuthorId))
                .Where(i => categoryIds.Count() == 0 || i.ArticleCategories.Select(i => i.CategoryId).Intersect(categoryIds).Count() > 0)
                .Paginate(xpagination);

            xpagination.SetXPagination(Response);
            return articles;
        }


        [HttpPost("like")]
        public JsonResult LikeArticle([FromBody]UserArticleLike userArticleLike)
        {
            var userLiked = blogContext.UserArticleLikes.FirstOrDefault(i=>i.UserId== userArticleLike.UserId && i.ArticleId== userArticleLike.ArticleId);
            if(userLiked == null && userArticleLike.Liked)
            {
                blogContext.UserArticleLikes.Add(new UserArticleLike()
                {
                    ArticleId = userArticleLike.ArticleId,
                    UserId = userArticleLike.UserId
                });
                blogContext.SaveChanges();
            }
            if(userArticleLike!=null && !userArticleLike.Liked) 
            {
                blogContext.UserArticleLikes.Remove(userLiked);
                blogContext.SaveChanges();
            }
            return new JsonResult(new ResponseMessage()
            {
                StatusCode=ResponseStatus.SUCCESS
            });
        }

        [HttpPost("pin")]
        public JsonResult PinArticle([FromBody] UserArticlePin userArticlePin)
        {
            var userPinnedArticles= blogContext.UserArticlePins.Where(i => i.UserId == userArticlePin.UserId);
            var currentArticle=userPinnedArticles.Where(i=>i.ArticleId==userArticlePin.ArticleId).FirstOrDefault();
            if(currentArticle==null && userArticlePin.Pinned)
            {
                userArticlePin.OrderId=userPinnedArticles.Count()+1;
                blogContext.UserArticlePins.Add(userArticlePin);
                blogContext.SaveChanges();
            }
            else if(currentArticle!=null && !userArticlePin.Pinned)
            {
                blogContext.UserArticlePins.Remove(currentArticle);
                blogContext.SaveChanges();
            }


            return new JsonResult(new ResponseMessage() { 
                StatusCode=ResponseStatus.SUCCESS
            });
        }

    }
}
