using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using smart_parking_system.Models;

namespace smart_parking_system.Areas.CheckOutCarControllers.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckOutCarController : Controller
    {
        private readonly ILogger<CheckOutCarController> _logger;
        private readonly AppDBContext _context;
        public CheckOutCarController(ILogger<CheckOutCarController> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Bạn đã vào Get CheckOutCar");
            var checkOutCarList = _context.CheckOutCar.ToList();
            return Ok(checkOutCarList);
        }
    }
}
