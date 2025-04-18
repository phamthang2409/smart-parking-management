using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace smart_parking_system.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        [Column(TypeName = "nvarchar")]
        public string? FullName { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        public ICollection<RegistrationCarMonthly>? RegistrationCarMonthlies { get; set; }


    }
}
