using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.ResultJobAssessment.Migrations
{
    public partial class Closed_Evidences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClosedEvidences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    CountIsClosed = table.Column<int>(type: "int", nullable: false),
                    ActualStatus = table.Column<int>(type: "int", nullable: false),
                    PossiblyClosed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClosedEvidences", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClosedEvidences");
        }
    }
}
