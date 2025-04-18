using System.ComponentModel.DataAnnotations;

namespace smart_parking_system.Models
{
    public class CarModel
    {
        [Key]
        public int Id { get; set; }

        [StringLength(20)]
        [Required]
        public string? CarName { get; set; }

    }
}
