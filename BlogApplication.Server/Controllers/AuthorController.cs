using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public AuthorController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet]
        public IEnumerable<Author> Get()
        {
            return blogContext.Authors;
        }

        [HttpGet("{id}")]
        public Author GetAuthor(int id)
        {
            var author= blogContext.Authors
                    .AsNoTracking()
                    .Include(i => i.Articles).ThenInclude(i => i.ArticleCategories).ThenInclude(i=>i.Category).DefaultIfEmpty()
                    .Where(i => i.AuthorId == id).FirstOrDefault();

            foreach(var article in author.Articles)
            {
                article.Author = new Author()
                {
                    AuthorId = author.AuthorId,
                    AuthorName = author.AuthorName
                };
            }

            return author;
        }
    }
}
