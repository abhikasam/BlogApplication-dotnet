using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using NuGet.Packaging;

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
            var xpagination = XPagination.GetXPagination(Request);
            var author = blogContext.Authors
                    .AsNoTracking()
                    .Include(i => i.Articles).ThenInclude(i => i.ArticleCategories).ThenInclude(i=>i.Category).DefaultIfEmpty()
                    .Where(i => i.AuthorId == id).FirstOrDefault();

            author.Articles=XPagination.GetPaginatedResult(author.Articles.AsQueryable(),xpagination).ToList();

            foreach(var article in author.Articles)
            {
                article.Author = new Author()
                {
                    AuthorId = author.AuthorId,
                    AuthorName = author.AuthorName
                };
            }

            xpagination.SetXPagination(Response);

            return author;
        }
    }
}
