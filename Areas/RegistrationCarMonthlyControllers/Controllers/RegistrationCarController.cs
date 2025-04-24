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
using smart_parking_system.DTO;

namespace smart_parking_system.Areas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationCarController : Controller
    {
        private readonly ILogger<RegistrationCarService> _logger;
        private readonly AppDBContext _context;
        

        public RegistrationCarController(ILogger<RegistrationCarService> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }
        //
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Bạn đã vào Get Registration list");
            var data = from rcm in _context.RegistrationCarMonthly
                       join rp in _context.RegistrationPackage on rcm.RegistrationPackageId equals rp.Id
                       join u in _context.User on rcm.UserId equals u.Id
                       select new RegistrationWithUserDto
                       {
                           Id = rcm.ID,
                           LicensePlate = rcm.LicensedPlate,
                           StartDate = rcm.StartDate,
                           EndDate = rcm.EndDate,
                           State = rcm.State,
                           PackageName = rp.PackageName,
                           CarName = rcm.CarName,
                           CustomerName = u.FullName
                       };
            //Check date expire
            foreach (var registrationCar in data)
            {
                if (DateTime.Now < registrationCar.EndDate)
                {
                    registrationCar.State = "Hiệu lực";
                }
                else
                {
                    registrationCar.State = "Hết hạn";
                }
            }
            _logger.LogInformation("Lấy danh sách đăng ký thành công");
            _logger.LogInformation("Có {count} bản ghi", data.Count());
            return Ok(data.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegistrationDto dto)
        {
            _logger.LogInformation("Bạn đã vào Post");
            _logger.LogInformation("Create a new registration package");
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var car = _context.Car.FirstOrDefault(c => c.Id == dto.VehicleType);
                var registrationPackage = _context.RegistrationPackage.FirstOrDefault(rp => rp.Id == dto.PlanId);
                // Tạo một gói đăng ký mới

                var newUser = new UserModel()
                {
                    FullName = dto.CustomerName,
                    Email = dto.CustomerEmail,
                    PhoneNumber = dto.CustomerPhone
                };
                // Lưu vào cơ sở dữ liệu
                await _context.User.AddAsync(newUser);
                await _context.SaveChangesAsync();

                var newRegistration = new RegistrationCarMonthly()
                {
                    LicensedPlate = dto.LicensePlate,
                    CarName = car.CarName,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(registrationPackage.Duration),
                    UserId = newUser.Id,
                    RegistrationPackageId = registrationPackage.Id
                };
                newRegistration.State = DateTime.Now < newRegistration.EndDate ? "Hiệu lực" : "Hết hạn";

                // Lưu vào cơ sở dữ liệu
                await _context.RegistrationCarMonthly.AddAsync(newRegistration);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return BadRequest(e.Message);
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogWarning($"ID: {id}");
            _logger.LogInformation("Bạn đã vào Delete");
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                _logger.LogInformation("Excute delete a user");
                var registrationCar = _context.RegistrationCarMonthly.FirstOrDefault(p => p.ID == id);
                var user = _context.User.FirstOrDefault(u => u.Id == registrationCar.UserId);
                _context.RegistrationCarMonthly.Remove(registrationCar);
                _context.User.Remove(user);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                _logger.LogInformation("Delete REGISTRATION CAR THANH CONG");
            }
            catch (Exception e)
            {
                transaction.Rollback();
                return BadRequest(e.Message);
            }     
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>PUT(int id, [FromBody] UpdateRegistrationDto dto)
        {
            _logger.LogInformation("Bạn đã vào Put");
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var registrationCar = _context.RegistrationCarMonthly.FirstOrDefault(p => p.ID == id);
                var registrationPackage = _context.RegistrationPackage.FirstOrDefault(rp => rp.PackageName == dto.PackageName);
                registrationCar.RegistrationPackageId = registrationPackage.Id;
                registrationCar.StartDate = dto.StartDate;
                registrationCar.EndDate = registrationCar.StartDate.AddDays(registrationPackage.Duration);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                _logger.LogInformation("Update REGISTRATION CAR THANH CONG");
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return BadRequest(e.Message);
            }
            return Ok();
        }
    }
}
