using System;
using System.Collections.Generic;

namespace BlogApplication.Server.Models.Blog;

public partial class UserArticlePin
{
    public int UserArticlePinId { get; set; }

    public int UserId { get; set; }

    public int ArticleId { get; set; }

    public int OrderId { get; set; }

    public virtual Article Article { get; set; }
}
