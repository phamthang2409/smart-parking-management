namespace smart_parking_system.DTO
{
    public class RegistrationWithUserDto
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? LicensePlate { get; set; }
        public string? CarName { get; set; }
        public string? PackageName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? State { get; set; }
    }
}
