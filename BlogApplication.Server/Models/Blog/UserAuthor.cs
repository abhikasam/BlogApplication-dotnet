using System;
using System.Collections.Generic;

namespace BlogApplication.Server.Models.Blog;

public partial class UserAuthor
{
    public int UserAuthorId { get; set; }

    public int UserId { get; set; }

    public int AuthorId { get; set; }

    public virtual Author Author { get; set; }
}
