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

        [HttpPost("follow")]
        public JsonResult Follow([FromBody]object obj)
        {
            int userId = HttpContext.User.GetUserId();
            var userCategory = JsonConvert.DeserializeObject<UserCategory>(obj.ToString());

            var dbUserCategory= blogContext.UserCategories.FirstOrDefault(i=>i.UserId==userId && i.CategoryId==userCategory.CategoryId);
            if(dbUserCategory==null && userCategory.Following)
            {
                userCategory.UserId = userId;
                blogContext.UserCategories.Add(userCategory);
                blogContext.SaveChanges();
            }
            else if(dbUserCategory!=null && !userCategory.Following)
            {
                blogContext.UserCategories.Remove(dbUserCategory);
            }

            return new JsonResult(true);
        }

    }
}
