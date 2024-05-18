using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using BlogApplication.Server.Models.BlogFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
                .AsNoTracking()
                .Include(i => i.ArticleCategories).ThenInclude(i => i.Category).DefaultIfEmpty()
                .Include(i => i.Author).DefaultIfEmpty();

            articles=XPagination.GetPaginatedResult(articles,xpagination);

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
                .AsNoTracking()
                .Include(i => i.ArticleCategories).ThenInclude(i => i.Category).DefaultIfEmpty()
                .Include(i => i.Author).DefaultIfEmpty()
                .Where(i => authorIds.Count() == 0 || authorIds.Contains(i.AuthorId))
                .Where(i => categoryIds.Count() == 0 || i.ArticleCategories.Select(i => i.CategoryId).Intersect(categoryIds).Count() > 0);

            articles = XPagination.GetPaginatedResult(articles,xpagination);
            xpagination.SetXPagination(Response);
            return articles;
        }
    }
}
