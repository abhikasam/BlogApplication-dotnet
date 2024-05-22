namespace BlogApplication.Server
{
    public class Startup
    {
        private static IConfiguration configuration { get; set; }

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

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private static string _AuthDbConnectionString = null;
        public static string AuthDbConnectionString
        {
            get
            {
                if(_AuthDbConnectionString == null)
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
