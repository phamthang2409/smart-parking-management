using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_parking_system.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePackage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RegistratioSnFees",
                table: "RegistrationPackage",
                newName: "RegistrationsFees");

            migrationBuilder.AlterColumn<int>(
                name: "Duration",
                table: "RegistrationPackage",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RegistrationsFees",
                table: "RegistrationPackage",
                newName: "RegistratioSnFees");

            migrationBuilder.AlterColumn<string>(
                name: "Duration",
                table: "RegistrationPackage",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
