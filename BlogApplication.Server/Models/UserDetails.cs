using System.Security.Claims;

namespace BlogApplication.Server.Models
{
    public class UserDetails
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string UserId { get; set; }
        public List<string> Claims { get; set; } = new();
        public List<string> Roles { get; set; } = new();
        public static UserDetails GetDetails(IEnumerable<Claim> claims,IList<string> roles)
        {
            var claimtypes = claims.Select(i => i.Type).ToList();
            return new UserDetails()
            {
                FirstName = claims.FirstOrDefault(i => i.Type == "FirstName")?.Value,
                LastName = claims.FirstOrDefault(i => i.Type == "LastName")?.Value,
                FullName = claims.FirstOrDefault(i => i.Type == "FullName")?.Value,
                Email = claims.FirstOrDefault(i => i.Type == "Email")?.Value,
                UserId = claims.FirstOrDefault(i => i.Type == "UserId")?.Value,
                Claims = claimtypes,
                Roles = roles.ToList()
            };
        }
    }
}
