using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet(Name ="GetArticles")]
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
    }
}
