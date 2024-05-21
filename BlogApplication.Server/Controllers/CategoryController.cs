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
            var categories = blogContext.Categories;
            return categories;
        }

        [HttpGet("{id}")]
        public Category GetCategory(int id)
        {
            var xpagination = XPagination.GetXPagination(Request);

            var category =blogContext.Categories
                        .Include(i=>i.ArticleCategories).ThenInclude(i=>i.Article).ThenInclude(i=>i.Author).DefaultIfEmpty()
                        .Where(i=>i.CategoryId==id)
                        .FirstOrDefault();

            category.ArticleCategories = XPagination.GetPaginatedResult(category.ArticleCategories.AsQueryable()
                            ,xpagination)
                            .ToList();

            var result = new Category()
            {
                CategoryId=category.CategoryId,
                CategoryName=category.CategoryName
            };

            foreach (var item in category.ArticleCategories)
            {
                result.ArticleCategories.Add(new ArticleCategory()
                {
                    CategoryId = item.CategoryId,
                    ArticleCategoryId=item.ArticleCategoryId,
                    ArticleId=item.ArticleId,
                    Article=new Article()
                    {
                        ArticleId=item.ArticleId,
                        Author=new Author()
                        {
                            AuthorId=item.Article.AuthorId,
                            AuthorName=item.Article.Author.AuthorName
                        },
                        Content=item.Article.Content,
                        Title=item.Article.Title,
                        Url=item.Article.Url,
                        PublishedOn=item.Article.PublishedOn,
                        AuthorId=item.Article.AuthorId,
                        ArticleCategories=item.Article.ArticleCategories.Select(j=>new ArticleCategory()
                        {
                            ArticleCategoryId = j.ArticleCategoryId,
                            ArticleId=j.ArticleId,
                            CategoryId=j.CategoryId,
                            Category=new Category()
                            {
                                CategoryId=j.CategoryId,
                                CategoryName=j.Category.CategoryName
                            }
                        }).ToList()
                    }
                });
            }

            xpagination.SetXPagination(Response);

            return result;
        }
    }
}
