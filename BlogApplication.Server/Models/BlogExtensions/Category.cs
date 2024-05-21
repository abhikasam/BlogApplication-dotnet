using BlogApplication.Server.Code;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Category
    {
        [NotMapped]
        public List<Article> Articles
        {
            get
            {
                if (ArticleCategories != null)
                {
                    return ArticleCategories.Select(i=>i.Article).ToList();
                }
                return new List<Article>();
            }
        }
    }
}
