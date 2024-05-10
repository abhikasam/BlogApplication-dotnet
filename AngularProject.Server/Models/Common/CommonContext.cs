using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AngularProject.Server.Models.Common;

public partial class CommonContext : DbContext
{
    public CommonContext()
    {
    }

    public CommonContext(DbContextOptions<CommonContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ExpertiseSector> ExpertiseSectors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=CommonDbConnectionString");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ExpertiseSector>(entity =>
        {
            entity.ToTable("ExpertiseSector");

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.EmailId)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.GraphId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MalingListDisplayName)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.ParentDLDisplayName)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.ParentDLEmailId)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.SectorDescription)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.SectorName)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SectorType)
                .IsRequired()
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedOn).HasDefaultValueSql("(getdate())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
