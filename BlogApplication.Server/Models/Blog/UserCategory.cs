using System;
using System.Collections.Generic;

namespace BlogApplication.Server.Models.Blog;

public partial class UserCategory
{
    public int UserCategoryId { get; set; }

    public int UserId { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; }
}
