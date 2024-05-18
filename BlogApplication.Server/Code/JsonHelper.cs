using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BlogApplication.Server.Code
{
    public class JsonHelper
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings()
        {
            ContractResolver = new DefaultContractResolver()
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        };
        public static string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj,Settings);
        }
        
        public static T Deserialize<T>(string str)
        {
            return JsonConvert.DeserializeObject<T>(str, Settings);
        }

    }
}
