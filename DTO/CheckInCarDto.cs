namespace smart_parking_system.DTO
{
    public class CheckInCarDto
    {
        public string? FullName { get; set; }
        public string? LicensePlate { get; set; }
        public int Price { get; set; }
        public string? CarType { get; set; }

        public string? Checkin_images { get; set; }
    }
}
