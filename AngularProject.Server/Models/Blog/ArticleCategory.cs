using System;
using System.Collections.Generic;

namespace BlogApplication.Server.Models.Blog;

public partial class ArticleCategory
{
    public int ArticleCategoryId { get; set; }

    public int ArticleId { get; set; }

    public int CategoryId { get; set; }

    public virtual Article Article { get; set; }

    public virtual Category Category { get; set; }
}
