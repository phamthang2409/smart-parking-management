using Microsoft.EntityFrameworkCore;
using smart_parking_system.Models;
using Microsoft.Extensions.DependencyInjection;
using ASPMVC.Models;
using smart_parking_system.Services;

namespace smart_parking_system
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("AppDbContext") ?? throw new InvalidOperationException("Connection string 'AppDbContext' not found.")));

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            //Đăng ký DBContext
            builder.Services.AddDbContext<AppDBContext>(options =>
            {
                //Đọc chuỗi kết nối
                string conn = builder.Configuration.GetConnectionString("DBContext");
                options.UseSqlServer(conn);
            });

            //Register Service
            builder.Services.AddTransient<RegistrationCarService>();

            //Add Cors để cấu hình nhúng nextjs 
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowNextJs", policy =>
                {
                    policy.WithOrigins("http://localhost:3000") // Port chạy frontend
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //
            app.UseCors("AllowNextJs");
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
