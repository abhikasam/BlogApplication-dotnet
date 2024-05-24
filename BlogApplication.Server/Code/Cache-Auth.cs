using BlogApplication.Server.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BlogApplication.Server.Code
{
    public static class AuthorizationCache
    {
        private static readonly object _lock=new object();
        private static string _cacheKey { get { return "Auth"; } }
        public static void EmptyCache() { Startup.MemoryCache.Remove(_cacheKey); }

        public static Dictionary<int,ApplicationUser> AuthUserCache
        {
            get
            {
                lock (_lock)
                {
                    try
                    {
                        return Startup.MemoryCache.GetOrCreate(
                                _cacheKey,
                                entry =>
                                {
                                    entry.AbsoluteExpiration = DateTime.Now.AddMinutes(Startup.GenericCacheMinutes);
                                    using (var context = new AuthContext(new DbContextOptionsBuilder<AuthContext>()
                                        .UseSqlServer(Startup.AuthDbConnectionString)
                                        .Options))
                                    {
                                        var items = context.Users;
                                        foreach(var item in items){
                                            item.Claims=(from uc in context.UserClaims
                                                         where uc.UserId==item.Id
                                                         select uc).ToList();
                                            item.Roles = (from ur in context.UserRoles
                                                          where ur.UserId == item.Id
                                                          select ur).ToList();
                                        }
                                        var cacheEntryOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(Startup.GenericCacheMinutes));
                                        var dictionary = items.ToDictionary(i => i.UserId);
                                        Startup.MemoryCache.Set(_cacheKey, dictionary, cacheEntryOptions);
                                        return dictionary;
                                    }
                                }
                            );
                    }
                    catch(Exception ex)
                    {
                        return new Dictionary<int,ApplicationUser>();
                    }
                }
            }
        }

    }
}