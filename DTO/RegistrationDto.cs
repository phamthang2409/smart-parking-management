namespace smart_parking_system.DTO
{
    public class RegistrationDto
    {
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerEmail { get; set; }
        public string? LicensePlate { get; set; }
        public int VehicleType { get; set; }
        public int PlanId { get; set; }
    }

}
