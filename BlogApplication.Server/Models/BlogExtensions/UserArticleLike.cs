using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class UserArticleLike
    {
        [NotMapped]
        public bool Liked { get; set; } = true;
    }
}
