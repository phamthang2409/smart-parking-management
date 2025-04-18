using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_parking_system.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_UserId",
                table: "RegistrationCarMonthly");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationCarMonthly_RegistrationPackageId",
                table: "RegistrationCarMonthly",
                column: "RegistrationPackageId");

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_RegistrationPackageId",
                table: "RegistrationCarMonthly",
                column: "RegistrationPackageId",
                principalTable: "RegistrationPackage",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_RegistrationPackageId",
                table: "RegistrationCarMonthly");

            migrationBuilder.DropIndex(
                name: "IX_RegistrationCarMonthly_RegistrationPackageId",
                table: "RegistrationCarMonthly");

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_UserId",
                table: "RegistrationCarMonthly",
                column: "UserId",
                principalTable: "RegistrationPackage",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
