using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_parking_system.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCheckInDBv21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedSlot",
                table: "CheckInCar",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedSlot",
                table: "CheckInCar");
        }
    }
}
