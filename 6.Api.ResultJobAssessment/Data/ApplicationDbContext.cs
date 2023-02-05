using Microsoft.EntityFrameworkCore;
public class ApplicationDbContext : DbContext
{
    public DbSet<OpenedResult>? OpenedResult { get; set; }
    public DbSet<ClosedResult>? ClosedResult { get; set; }
    public DbSet<ClosedEvidences>? ClosedEvidences { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}