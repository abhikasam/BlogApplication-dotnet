using BlogApplication.Server.Code;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Category
    {
        [NotMapped]
        public XPagination XPagination { get; set; }=new XPagination();
    }
}
