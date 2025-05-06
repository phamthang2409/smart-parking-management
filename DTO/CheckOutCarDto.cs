namespace smart_parking_system.DTO
{
    public class CheckOutCarDto
    {
        public int ID { get; set; }
        public string? FullName { get; set; }
        public string? LicensePlate { get; set; }
        public int? Price { get; set; }
        public string? CarType { get; set; }

        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }

       
    }
}
