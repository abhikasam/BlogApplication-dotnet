using Microsoft.EntityFrameworkCore;

namespace BlogApplication.Server.Models.Blog
{
    public partial class BlogContext
    {
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x=>x.UserId);
            });

            modelBuilder.Entity<UserCategory>(entity =>
            {
                entity.HasOne(i => i.User)
                     .WithMany(i => i.UserCategories)
                     .HasForeignKey(i => i.UserId);
            });

            modelBuilder.Entity<UserAuthor>(entity =>
            {
                entity.HasOne(i=>i.User)
                    .WithMany(i=>i.UserAuthors)
                    .HasForeignKey(i => i.UserId);
            });

        }
    }
}
