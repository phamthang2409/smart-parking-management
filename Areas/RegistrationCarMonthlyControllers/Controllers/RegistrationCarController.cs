using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ASPMVC.Models;
using smart_parking_system.Models;
using smart_parking_system.Services;

namespace smart_parking_system.Areas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationCarController : Controller
    {
        private readonly ILogger<RegistrationCarService> _logger;
        private readonly RegistrationCarService _registrationCarService;
        private readonly AppDBContext _context;
        

        public RegistrationCarController(ILogger<RegistrationCarService> logger, RegistrationCarService registrationCarService, AppDBContext context)
        {
            _logger = logger;
            _registrationCarService = registrationCarService;
            _context = context;
        }
        //
        List<RegistrationCarMonthly> registrationList;

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Bạn đã vào Get");
            registrationList = _context.RegistrationCarMonthly.ToList();
            return Ok(registrationList);
        }

        [HttpPost]
        public IActionResult Post([FromBody] RegistrationCarMonthly registrationCar)
        {
            _logger.LogInformation("Bạn đã vào Post");
            //product.Id = products.Any() ? products.Max(p => p.Id) + 1 : 1;
            _context.RegistrationCarMonthly.Add(registrationCar);
            _context.SaveChanges();
            return Ok(registrationCar);
        }

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody] ProductModel product)
        //{
        //    _logger.LogInformation("Bạn đã vào Put");
        //    var p = Products.FirstOrDefault(p => p.Id == id);
        //    if (p == null) return NotFound();
        //    p.Name = product.Name;
        //    return Ok(p);
        //}

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Bạn đã vào Delete");
            var registrationList = _context.RegistrationCarMonthly.ToList();
            var registrationCar = registrationList.FirstOrDefault(p => p.ID == id);
            if (registrationCar == null)
            {
                _logger.LogError("Không tìm thấy product");
                return NotFound();
            }
            ;
            _context.RegistrationCarMonthly.Remove(registrationCar);
            _context.SaveChanges();
            _logger.LogInformation("Delete thành công");
            return Ok();
        }
    }
}
