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

    public virtual DbSet<ExpertiseSectorMapping> ExpertiseSectorMappings { get; set; }

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

        modelBuilder.Entity<ExpertiseSectorMapping>(entity =>
        {
            entity.ToTable("ExpertiseSectorMapping");

            entity.HasIndex(e => new { e.ChildSectorId, e.SectorId }, "IX_ExpertiseSectorMapping")
                .IsUnique()
                .HasFillFactor(100);

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.UpdatedOn).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.ChildSector).WithMany(p => p.ExpertiseSectorMappingChildSectors)
                .HasForeignKey(d => d.ChildSectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpertiseSectorMapping_ExpertiseSector");

            entity.HasOne(d => d.Sector).WithMany(p => p.ExpertiseSectorMappingSectors)
                .HasForeignKey(d => d.SectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpertiseSectorMapping_ExpertiseSector1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
