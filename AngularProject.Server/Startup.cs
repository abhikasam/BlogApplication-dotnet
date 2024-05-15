namespace AngularProject.Server
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

        private static string _CommonDbConnectionString = null;
        public static string CommonDbConnectionString
        {
            get
            {
                if(_CommonDbConnectionString == null)
                {
                    _CommonDbConnectionString = configuration.GetConnectionString("CommonDbConnectionString");
                }
                return _CommonDbConnectionString;
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
