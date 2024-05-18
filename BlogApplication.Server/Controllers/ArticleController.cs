using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using BlogApplication.Server.Models.BlogFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public PaginatedResult<Article> Get()
        {
            var articles = blogContext.Articles
                //.AsSplitQuery()
                .AsNoTracking()
                .Include(i => i.ArticleCategories).ThenInclude(i => i.Category).DefaultIfEmpty()
                .Include(i => i.Author).DefaultIfEmpty();
            var paginatedArticles=PaginationResult<Article>.GetPaginatedResult(articles);
            return paginatedArticles;
        }

        [HttpGet("{authors}/{categories}/{pageSize}/{pageNumber}")]
        public PaginatedResult<Article> Get(string authors,string categories,int pageSize,int pageNumber)
        {
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

            var paginatedArticles = PaginationResult<Article>.GetPaginatedResult(articles,pageNumber,pageSize);

            return paginatedArticles;
        }
    }
}
