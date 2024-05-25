using System;
using System.Collections.Generic;

namespace BlogApplication.Server.Models.Blog;

public partial class UserArticleLike
{
    public int UserArticleLikeId { get; set; }

    public int UserId { get; set; }

    public int ArticleId { get; set; }

    public virtual Article Article { get; set; }
}
