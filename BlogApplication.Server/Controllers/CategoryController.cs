using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public CategoryController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }
        [HttpGet(Name ="GetCategories")]
        public IEnumerable<Category> GetCategories()
        {
            return blogContext.Categories;
        }

        [HttpGet("{id}/{pageSize}/{pageNumber}")]
        public Category GetCategory(int id,int pageSize,int pageNumber)
        {
            var category=blogContext.Categories
                        .AsNoTracking()
                        .Include(i=>i.ArticleCategories).DefaultIfEmpty()    
                        .Where(i=>i.CategoryId==id).FirstOrDefault();

            var articleIds = category.ArticleCategories.Select(i=>i.ArticleId).ToList().AsQueryable();

            var paginatedArticleIds = PaginationResult<int>.GetPaginatedResult(articleIds, pageSize, pageNumber);

            category.ArticleCategories.Clear();
            category.PaginationParams = paginatedArticleIds.PaginationParams;
            foreach(var articleId in paginatedArticleIds.Data)
            {
                var article=blogContext.Articles
                                .AsNoTracking()
                                .Include(i=>i.ArticleCategories).ThenInclude(i=>i.Category).DefaultIfEmpty()
                                .Include(i=>i.Author).DefaultIfEmpty()
                                .Where(i=>i.ArticleId==articleId).FirstOrDefault();
                category.ArticleCategories.Add(new ArticleCategory()
                {
                    Article=article,
                    CategoryId=category.CategoryId,
                    ArticleId=articleId
                });
            }

            return category;
        }
    }
}
