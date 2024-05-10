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
    }
}
