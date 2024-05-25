using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BlogApplication.Server.Models.Blog;

public partial class BlogContext : DbContext
{
    public BlogContext()
    {
    }

    public BlogContext(DbContextOptions<BlogContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<ArticleCategory> ArticleCategories { get; set; }

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<UserArticleLike> UserArticleLikes { get; set; }

    public virtual DbSet<UserArticlePin> UserArticlePins { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=BlogDbConnectionString");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(entity =>
        {
            entity.ToTable("Article");

            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.Url).IsRequired();

            entity.HasOne(d => d.Author).WithMany(p => p.Articles)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Article_Author");
        });

        modelBuilder.Entity<ArticleCategory>(entity =>
        {
            entity.ToTable("ArticleCategory");

            entity.HasOne(d => d.Article).WithMany(p => p.ArticleCategories)
                .HasForeignKey(d => d.ArticleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArticleCategory_Article");

            entity.HasOne(d => d.Category).WithMany(p => p.ArticleCategories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArticleCategory_Category");
        });

        modelBuilder.Entity<Author>(entity =>
        {
            entity.ToTable("Author");

            entity.Property(e => e.AuthorName).IsRequired();
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.Property(e => e.CategoryName).IsRequired();
        });

        modelBuilder.Entity<UserArticleLike>(entity =>
        {
            entity.ToTable("UserArticleLike");

            entity.HasOne(d => d.Article).WithMany(p => p.UserArticleLikes)
                .HasForeignKey(d => d.ArticleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserArticleLike_Article");
        });

        modelBuilder.Entity<UserArticlePin>(entity =>
        {
            entity.ToTable("UserArticlePin");

            entity.HasOne(d => d.Article).WithMany(p => p.UserArticlePins)
                .HasForeignKey(d => d.ArticleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserArticlePin_Article");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
