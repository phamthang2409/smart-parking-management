using System.ComponentModel.DataAnnotations;

namespace smart_parking_system.Models
{
    public class CheckInModel
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DataType("nvarchar(50)")]
        public string? FullName { get; set; }
        [Required]
        [DataType("nvarchar(50)")]
        public string? LicensePlate { get; set; }
        public int? Price { get; set; }

        [Required]
        [DataType("nvarchar(50)")]
        public string? CarType { get; set; }
        
        [DataType("nvarchar(255)")]
        public string? Checkin_images { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CheckInTime { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CheckOutTime { get; set; }
    }
}
