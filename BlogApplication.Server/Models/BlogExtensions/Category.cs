using BlogApplication.Server.Code;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Category
    {
        [NotMapped]
        public PaginationParams PaginationParams { get; set; }=new PaginationParams();
    }
}
