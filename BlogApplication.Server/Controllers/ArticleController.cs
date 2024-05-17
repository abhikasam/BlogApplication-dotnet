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
        public IEnumerable<Article> Get()
        {

            return blogContext.Articles
                //.AsSplitQuery()
                .AsNoTracking()
                .Include(i=>i.ArticleCategories).ThenInclude(i=>i.Category).DefaultIfEmpty()
                .Include(i=>i.Author).DefaultIfEmpty()
                .Take(100)
                .ToList();
        }

        [HttpGet("{authors}/{categories}")]
        public IEnumerable<Article> Get(string authors,string categories)
        {
            int[] authorIds = JsonConvert.DeserializeObject<string[]>(authors.ToString())
                            .Select(i=>Convert.ToInt32(i)).ToArray();
            int[] categoryIds = JsonConvert.DeserializeObject<string[]>(categories.ToString())
                            .Select(i=>Convert.ToInt32(i)).ToArray();

            return blogContext.Articles
                //.AsSplitQuery()
                .AsNoTracking()
                .Include(i => i.ArticleCategories).ThenInclude(i => i.Category).DefaultIfEmpty()
                .Include(i => i.Author).DefaultIfEmpty()
                .Where(i=> authorIds.Count()==0 || authorIds.Contains(i.AuthorId))
                .Where(i=> categoryIds.Count()==0 || i.ArticleCategories.Select(i=>i.CategoryId).Intersect(categoryIds).Count()>0)
                .Take(100)
                .ToList();
        }
    }
}
