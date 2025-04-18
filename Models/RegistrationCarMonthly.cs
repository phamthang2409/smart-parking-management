using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace smart_parking_system.Models
{
    public class RegistrationCarMonthly
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50)]
        [Column(TypeName = "nvarchar")]
        [Required]
        public string? LicensedPlate { get; set; }

        [StringLength(50)]
        [Required]
        public string? CarName {  get; set; }

        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(20)]
        public string? State { get; set; }

        //ForeignKey Navigation
        [Required]
        public int RegistrationPackageId { get; set; }
        [ForeignKey("RegistrationPackageId")]
        public RegistrationPackage? RegistrationPackage { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public UserModel? User { get; set; }


    }
}
