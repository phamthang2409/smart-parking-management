using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_parking_system.Migrations
{
    /// <inheritdoc />
    public partial class RegistrationPackageAndUpdateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegistrationPackage",
                table: "RegistrationCarMonthly");

            migrationBuilder.AddColumn<int>(
                name: "RegistrationPackageId",
                table: "RegistrationCarMonthly",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RegistrationPackage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PackageName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Duration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RegistratioSnFees = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationPackage", x => x.Id);
                });

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

            migrationBuilder.DropTable(
                name: "RegistrationPackage");

            migrationBuilder.DropIndex(
                name: "IX_RegistrationCarMonthly_RegistrationPackageId",
                table: "RegistrationCarMonthly");

            migrationBuilder.DropColumn(
                name: "RegistrationPackageId",
                table: "RegistrationCarMonthly");

            migrationBuilder.AddColumn<string>(
                name: "RegistrationPackage",
                table: "RegistrationCarMonthly",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
