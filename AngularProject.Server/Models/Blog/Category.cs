using System;
using System.Collections.Generic;

namespace BlogApplication.Server.Models.Blog;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; }

    public virtual ICollection<ArticleCategory> ArticleCategories { get; set; } = new List<ArticleCategory>();
}
