using System.ComponentModel.DataAnnotations;

namespace smart_parking_system.Models
{
    public class RegistrationPackage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? PackageName { get; set; }

        [StringLength(20)]
        [Required]
        public string? Duration { get; set; }

        [Required]
        public double RegistratioSnFees { get; set; }

        [Required]
        [StringLength(100)]
        public string? Description { get; set; }

        // Navigation property: 1 gói có nhiều đăng ký
        public ICollection<RegistrationCarMonthly>? RegistrationCarMonthlies { get; set; }
    }
}
