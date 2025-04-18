using Microsoft.EntityFrameworkCore;

namespace smart_parking_system.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var entitytype in modelBuilder.Model.GetEntityTypes())
            {
                var tablename = entitytype.GetTableName();
                if (tablename.StartsWith("AspNet"))
                {
                    entitytype.SetTableName(tablename[6..]);
                }
            }

            modelBuilder.Entity<RegistrationCarMonthly>()
                //Mỗi bản ghi RegistrationCarMonthly chỉ thuộc về 1 RegistrationPackage (quan hệ 1 - nhiều).
                .HasOne(rcm => rcm.RegistrationPackage)
                //Một RegistrationPackage có thể có nhiều RegistrationCarMonthly liên kết với nó.
                .WithMany(rp => rp.RegistrationCarMonthlies)
                //Cột RegistrationPackageId trong bảng RegistrationCarMonthly là foreign key trỏ tới RegistrationPackage.Id.
                .HasForeignKey(rcm => rcm.RegistrationPackageId);
                
        }

        public DbSet<RegistrationCarMonthly> RegistrationCarMonthly { get; set; }
        public DbSet<RegistrationPackage> RegistrationPackage { get; set; }

        public DbSet<CarModel> Car { get; set; }

        public DbSet<UserModel> User { get; set; }
    }
}
