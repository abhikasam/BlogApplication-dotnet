using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class User
    {
        [NotMapped]
        public virtual ICollection<UserCategory> UserCategories { get; set; }
        [NotMapped]
        public virtual ICollection<UserAuthor> UserAuthors { get; set; }
    }
}
