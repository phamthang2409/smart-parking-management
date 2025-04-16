using smart_parking_system.Models;

namespace smart_parking_system.Services
{
    public class RegistrationCarService : List<RegistrationCarMonthly>
    {
        public RegistrationCarService() {
            this.AddRange(new RegistrationCarMonthly[] {
                new RegistrationCarMonthly()
                {
                    ID = 1,
                    CarName = "Xe máy",
                    LicensedPlate = "99A-327.80",
                    RegistrationPackageId = 1,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(5),
                    State = "Hiệu lực"
                }
            });
        }
    }
}
