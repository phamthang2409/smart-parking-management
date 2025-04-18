using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_parking_system.Migrations
{
    /// <inheritdoc />
    public partial class AddUserDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_RegistrationPackageId",
                table: "RegistrationCarMonthly");

            migrationBuilder.DropIndex(
                name: "IX_RegistrationCarMonthly_RegistrationPackageId",
                table: "RegistrationCarMonthly");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "RegistrationCarMonthly",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationCarMonthly_UserId",
                table: "RegistrationCarMonthly",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_UserId",
                table: "RegistrationCarMonthly",
                column: "UserId",
                principalTable: "RegistrationPackage",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationCarMonthly_User_UserId",
                table: "RegistrationCarMonthly",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationCarMonthly_RegistrationPackage_UserId",
                table: "RegistrationCarMonthly");

            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationCarMonthly_User_UserId",
                table: "RegistrationCarMonthly");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropIndex(
                name: "IX_RegistrationCarMonthly_UserId",
                table: "RegistrationCarMonthly");

            migrationBuilder.DropColumn(
                name: "UserId",
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
    }
}
