using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplication.Server.Models.Blog
{
    public partial class Article
    {
        [NotMapped]
        [Newtonsoft.Json.JsonIgnore]
        public int[] CategoryIds
        {
            get
            {
                if (ArticleCategories != null)
                {
                    if (ArticleCategories.All(i => i.Category != null))
                    {
                        return ArticleCategories.Select(i => i.CategoryId).ToArray();    
                    }
                }
                return new int[0];
            }
        }

        [NotMapped]
        public List<Category> Categories
        {
            get
            {
                if (ArticleCategories != null && ArticleCategories.All(i=>i.Category!=null))
                {
                    return ArticleCategories.Select(i=>new Category()
                    {
                        CategoryId=i.CategoryId,
                        CategoryName=i.Category.CategoryName
                    }).ToList();
                }
                return new List<Category>();
            }
        }

        [NotMapped]
        public List<int> LikedUsers
        {
            get
            {
                if (UserArticleLikes != null)
                {
                    return UserArticleLikes.Select(i => i.UserId).ToList();
                }
                return new List<int>();
            }
        }

        [NotMapped]
        public List<int> PinnedUsers
        {
            get
            {
                if (UserArticlePins != null)
                {
                    return UserArticlePins.Select(i=>i.UserId).ToList();
                }
                return new();
            }
        }
    }
}
