using AngularProject.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularProject.Server.Controllers
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
                .Include(i=>i.ArticleCategories).DefaultIfEmpty()
                .Take(20)
                .ToList();
        }
    }
}
