using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class UserCategory
    {
        [NotMapped]
        public bool Following { get; set; }
    }
}
