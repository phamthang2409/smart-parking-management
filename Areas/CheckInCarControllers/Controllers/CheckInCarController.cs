using Microsoft.AspNetCore.Mvc;
using smart_parking_system.DTO;
using smart_parking_system.Models;
using smart_parking_system.Services;

namespace smart_parking_system.Areas.CheckInCarControllers.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckInCarController : Controller
    {
        private readonly ILogger<CheckInCarController> _logger;
        private readonly AppDBContext _context;

        public CheckInCarController(ILogger<CheckInCarController> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Bạn đã vào Get CheckinCar");
            var registrationPackages = _context.CheckInCar.ToList();
            return Ok(registrationPackages);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CheckInCarDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            _logger.LogInformation("Bạn đã vào Post CheckinCar");
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var newCheckInUser = new CheckInModel()
                {
                    FullName = dto.FullName,
                    LicensePlate = dto.LicensePlate,
                    Price = dto.Price,
                    CarType = dto.CarType,
                    CheckInTime = DateTime.Now
                };

                // Thêm mới đối tượng vào cơ sở dữ liệu
                await _context.AddAsync(newCheckInUser);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Check-in thành công!" });
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"Lỗi khi thực hiện check-in: {e.Message}");
                return BadRequest(new { message = "Lỗi khi thực hiện check-in", error = e.Message });
            }
        }
    }
}
