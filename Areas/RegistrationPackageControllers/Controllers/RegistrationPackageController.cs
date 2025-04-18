using Microsoft.AspNetCore.Mvc;
using smart_parking_system.DTO;
using smart_parking_system.Models;

namespace smart_parking_system.Areas.RegistrationPackageControllers.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationPackageController : Controller
    {
        private readonly ILogger<RegistrationPackageController> _logger;

        private readonly AppDBContext _context;
        public RegistrationPackageController(ILogger<RegistrationPackageController> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Bạn đã vào Get");
            var registrationPackages = _context.RegistrationPackage.ToList();
            return Ok(registrationPackages);
        }
    }
}
