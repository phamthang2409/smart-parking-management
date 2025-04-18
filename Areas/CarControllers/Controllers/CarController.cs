using Microsoft.AspNetCore.Mvc;
using smart_parking_system.Models;

namespace smart_parking_system.Areas.CarControllers.Controllers
{
    [Area("CarControllers")]
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : Controller
    {

        private readonly ILogger<CarController> _logger;
        private readonly AppDBContext _context;
        public CarController(ILogger<CarController> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Bạn đã vào Get");
            var cars = _context.Car.ToList();
            return Ok(cars);
        }
    }
}
