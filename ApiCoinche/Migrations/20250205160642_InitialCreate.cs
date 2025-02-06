using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiCoinche.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    JoueursIds = table.Column<string>(type: "TEXT", nullable: false),
                    GagnantsIds = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Profils",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Blaze = table.Column<string>(type: "TEXT", nullable: false),
                    Mail = table.Column<string>(type: "TEXT", nullable: false),
                    Mdp = table.Column<string>(type: "TEXT", nullable: false),
                    Famille = table.Column<int>(type: "INTEGER", nullable: false),
                    DuoFavId = table.Column<int>(type: "INTEGER", nullable: true),
                    PointClassement = table.Column<double>(type: "REAL", nullable: false),
                    PartiesJoueesIds = table.Column<string>(type: "TEXT", nullable: false),
                    Victoires = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalParties = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profils", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profils_Profils_DuoFavId",
                        column: x => x.DuoFavId,
                        principalTable: "Profils",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Profils_DuoFavId",
                table: "Profils",
                column: "DuoFavId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parties");

            migrationBuilder.DropTable(
                name: "Profils");
        }
    }
}
