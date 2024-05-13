using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AngularProject.Server.Models.Common;

public partial class ExpertiseSectorMapping
{
    public int ID { get; set; }

    public int SectorId { get; set; }

    public int ChildSectorId { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime UpdatedOn { get; set; }

    public int UpdatedByUser { get; set; }
    public virtual ExpertiseSector ChildSector { get; set; }
    public virtual ExpertiseSector Sector { get; set; }
}
