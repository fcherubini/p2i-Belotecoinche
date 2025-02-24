using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiCoinche.Migrations
{
    /// <inheritdoc />
    public partial class AddPointsClassement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PointClassement",
                table: "Profils",
                newName: "PointsClassement");

            migrationBuilder.AddColumn<int>(
                name: "PointsClassement",
                table: "Parties",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PointsClassement",
                table: "Parties");

            migrationBuilder.RenameColumn(
                name: "PointsClassement",
                table: "Profils",
                newName: "PointClassement");
        }
    }
}
