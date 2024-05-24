using BlogApplication.Server;
using BlogApplication.Server.Code;
using BlogApplication.Server.Models.Auth;
using BlogApplication.Server.Models.Blog;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Configuration;

namespace BlogApplication
{
    public class Startup
    {
        private static IConfiguration configuration;
        private readonly IWebHostEnvironment environment;

        public static IConfiguration Configuration
        {
            get
            {
                return configuration;
            }
            set
            {
                configuration = value;
            }
        }

        public Startup(IConfiguration configuration,IWebHostEnvironment environment)
        {
            Configuration = configuration;
            this.environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                opt.SerializerSettings.ContractResolver = new DefaultContractResolver()
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                };
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<BlogContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("BlogDbConnectionString"));
            });

            services.AddDbContext<AuthContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("AuthDbConnectionString"));
            });

            services.AddIdentity<ApplicationUser, IdentityRole>()
                        .AddEntityFrameworkStores<AuthContext>()
                        .AddDefaultTokenProviders();


            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredUniqueChars = 6;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                options.SignIn.RequireConfirmedEmail = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
                options.SlidingExpiration = true;
            });

            services.AddMemoryCache();

        }

        public void Configure(IApplicationBuilder app,IMemoryCache memoryCache,ILoggerFactory loggerFactory)
        {
            _MemoryCache = memoryCache;

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UserAuthenticationMiddleware();
            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToFile("/index.html");
            });
        }

        private static IMemoryCache _MemoryCache { get; set; }
        public static IMemoryCache MemoryCache { get { return _MemoryCache; } }

        public static int GenericCacheMinutes { get { return configuration.GetValue<int>("GenericCacheMinutes", 5); } }


        private static string _AuthDbConnectionString = null;
        public static string AuthDbConnectionString
        {
            get
            {
                if (_AuthDbConnectionString == null)
                {
                    _AuthDbConnectionString = configuration.GetConnectionString("AuthDbConnectionString");
                }
                return _AuthDbConnectionString;
            }
        }
        private static string _BlogDbConnectionString = null;
        public static string BlogDbConnectionString
        {
            get
            {
                if (_BlogDbConnectionString == null)
                {
                    _BlogDbConnectionString = configuration.GetConnectionString("BlogDbConnectionString");
                }
                return _BlogDbConnectionString;
            }
        }

    }
}

