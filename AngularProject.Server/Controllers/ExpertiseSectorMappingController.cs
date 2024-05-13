using AngularProject.Server.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpertiseSectorMappingController : ControllerBase
    {
        private CommonContext commonContext;

        public ExpertiseSectorMappingController(CommonContext commonContext)
        {
            this.commonContext = commonContext;
        }

        [HttpGet(Name = "GetExpertiseSectorMapping")]
        public IEnumerable<ExpertiseSectorMapping> Get()
        {
            return commonContext.ExpertiseSectorMappings
                .Include(i=>i.ChildSector).DefaultIfEmpty()
                .Include(i=>i.Sector).DefaultIfEmpty()
                .ToList();
        }
    }
}
