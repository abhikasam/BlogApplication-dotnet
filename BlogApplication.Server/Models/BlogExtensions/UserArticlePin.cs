using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class UserArticlePin
    {
        [NotMapped]
        public bool Pinned { get; set; } = true;
    }
}
