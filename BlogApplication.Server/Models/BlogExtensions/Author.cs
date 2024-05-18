using BlogApplication.Server.Code;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Author
    {
        [NotMapped]
        public XPagination XPagination { get; set; }=new XPagination();
    }
}
