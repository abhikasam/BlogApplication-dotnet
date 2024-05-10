using System;
using System.Collections.Generic;

namespace AngularProject.Server.Models.Common;

public partial class ExpertiseSector
{
    public int ID { get; set; }

    public string SectorName { get; set; }

    public string SectorDescription { get; set; }

    public bool IsActive { get; set; }

    public string SectorType { get; set; }

    public int Depth { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime UpdatedOn { get; set; }

    public int UpdatedByUser { get; set; }

    public int ExpertiseGroupId { get; set; }

    public string MalingListDisplayName { get; set; }

    public string GraphId { get; set; }

    public string EmailId { get; set; }

    public string ParentDLDisplayName { get; set; }

    public string ParentDLEmailId { get; set; }
}
