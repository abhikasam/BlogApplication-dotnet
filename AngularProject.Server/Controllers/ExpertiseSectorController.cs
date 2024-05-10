using AngularProject.Server.Models.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpertiseSectorController : ControllerBase
    {
        private CommonContext commonContext;

        public ExpertiseSectorController(CommonContext commonContext)
        {
            this.commonContext = commonContext;
        }

        [HttpGet(Name = "GetExpertiseSector")]
        public IEnumerable<ExpertiseSector> Get()
        {
            return commonContext.ExpertiseSectors.ToList();
        }
    }
}
