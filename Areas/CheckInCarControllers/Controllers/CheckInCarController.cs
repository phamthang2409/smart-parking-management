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
            var checkInCarList = _context.CheckInCar.ToList();
            return Ok(checkInCarList);
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
                    CheckInTime = DateTime.Now,
                    Checkin_images = dto.Checkin_images,
                    AssignedSlot = dto.AssignedSlot,
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation("Bạn đã vào Delete CheckinCar");
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var checkInCar = await _context.CheckInCar.FindAsync(id);
                if (checkInCar == null)
                {
                    return NotFound("Không tìm thấy bản ghi nào với ID đã cho.");
                }
                _context.CheckInCar.Remove(checkInCar);
                await _context.CheckOutCar.AddAsync(new CheckOutModel()
                {
                    FullName = checkInCar.FullName,
                    LicensePlate = checkInCar.LicensePlate,
                    Price = checkInCar.Price,
                    CarType = checkInCar.CarType,
                    CheckOutTime = DateTime.Now,
                });
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok(new { message = "Xóa thành công!" });
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"Lỗi khi thực hiện xóa: {e.Message}");
                return BadRequest(new { message = "Lỗi khi thực hiện xóa", error = e.Message });
            }
            
            
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("Không có file ảnh nào được gửi.");
            }

            // Đặt đường dẫn để lưu ảnh
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

            // Tạo thư mục nếu chưa tồn tại
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Tạo tên tệp tin duy nhất
            var fileName = Path.GetFileName(imageFile.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            // Lưu ảnh vào server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            // Trả về thông báo thành công với tên file đã lưu
            return Ok(new { message = "Ảnh đã được tải lên thành công.", filePath });
        }
    }
}
