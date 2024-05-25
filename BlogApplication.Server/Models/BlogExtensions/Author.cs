using BlogApplication.Server.Code;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Author
    {
        [NotMapped]
        public List<int> Users
        {
            get
            {
                if (UserAuthors != null)
                {
                    return UserAuthors.Select(i => i.UserId).ToList();
                }
                return new();
            }
        }
        [NotMapped]
        public virtual User User { get; set; }
    }
}
