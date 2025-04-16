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

        [DataType(DataType.Date)]
        public DateTime Duration { get; set; }

        [Required]
        public double RegistratioSnFees { get; set; }

        // Navigation property: 1 gói có nhiều đăng ký
        public ICollection<RegistrationCarMonthly>? RegistrationCarMonthlies { get; set; }
    }
}
