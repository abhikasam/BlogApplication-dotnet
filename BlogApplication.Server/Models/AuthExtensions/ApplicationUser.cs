using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace BlogApplication.Server.Models.Auth
{
    public partial class ApplicationUser : IdentityUser
    {
        [NotMapped]
        public List<IdentityUserClaim<string>> Claims { get; set; }
        [NotMapped]
        public List<IdentityUserRole<string>> Roles { get; set; }
    }
}
