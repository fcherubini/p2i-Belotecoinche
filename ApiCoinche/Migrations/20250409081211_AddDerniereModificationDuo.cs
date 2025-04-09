using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiCoinche.Migrations
{
    /// <inheritdoc />
    public partial class AddDerniereModificationDuo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DerniereModificationDuo",
                table: "Profils",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DerniereModificationDuo",
                table: "Profils");
        }
    }
}
