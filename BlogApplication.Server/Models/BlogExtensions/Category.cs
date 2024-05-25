using BlogApplication.Server.Code;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Category
    {
        [NotMapped]
        public List<int> Users
        {
            get
            {
                if (UserCategories != null)
                {
                    return UserCategories.Select(i=>i.UserId).ToList();
                }
                return new();
            }
        }
    }
}
