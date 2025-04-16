using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_parking_system.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBRegistrationCar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RegistrationCarMonthly",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LicensedPlate = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CarName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RegistrationPackage = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    State = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationCarMonthly", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RegistrationCarMonthly");
        }
    }
}
