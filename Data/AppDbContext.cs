using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using smart_parking_system.Models;

namespace ASPMVC.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext (DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<smart_parking_system.Models.RegistrationCarMonthly> RegistrationCarMonthly { get; set; } = default!;
    }
}
