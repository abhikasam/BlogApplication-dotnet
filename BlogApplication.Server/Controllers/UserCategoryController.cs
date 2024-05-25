using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BlogApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCategoryController : ControllerBase
    {
        private readonly BlogContext blogContext;

        public UserCategoryController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet]
        public IEnumerable<int> Get()
        {
            var userId = HttpContext.User.GetUserId();
            var userCategories=blogContext.UserCategories
                            .Where(i=>i.UserId==userId)
                            .Select(i=>i.UserId);
            return userCategories;
        }

        [HttpPost("follow")]
        public JsonResult Follow([FromBody]UserCategory userCategory)
        {
            int userId = HttpContext.User.GetUserId();

            var dbUserCategory= blogContext.UserCategories.FirstOrDefault(i=>i.UserId==userId && i.CategoryId==userCategory.CategoryId);
            if(dbUserCategory==null && userCategory.IsFollowing)
            {
                userCategory.UserId = userId;
                blogContext.UserCategories.Add(userCategory);
                blogContext.SaveChanges();
            }
            else if(dbUserCategory!=null && !userCategory.IsFollowing)
            {
                blogContext.UserCategories.Remove(dbUserCategory);
                blogContext.SaveChanges();
            }

            var currentList=blogContext.UserCategories.Where(i=>i.UserId==userId).Select(i=>i.CategoryId).ToList();
            return new JsonResult(currentList);
        }

    }
}
