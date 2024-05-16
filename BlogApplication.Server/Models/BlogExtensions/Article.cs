using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Article
    {
        [NotMapped]
        public string[] Categories
        {
            get
            {
                if (ArticleCategories != null)
                {
                    if (ArticleCategories.All(i => i.Category != null))
                    {
                        return ArticleCategories.Select(i => i.Category.CategoryName).ToArray();    
                    }
                }
                return new string[0];
            }
        }
    }
}
