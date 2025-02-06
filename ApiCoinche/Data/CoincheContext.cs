using Microsoft.EntityFrameworkCore;

public class CoincheContext : DbContext
{
    public DbSet<Profil> Profils { get; set; } = null!;
    public DbSet<Partie> Parties { get; set; } = null!;

    public string DbPath { get; private set; }

    // Le constructeur pour définir le chemin vers la base de données SQLite
    public CoincheContext()
    {
        // Le chemin vers la base de données SQLite (peut être ajusté)
        DbPath = "Coinche.db"; // Le fichier de la base de données SQLite
    }

    // Configurer la base de données SQLite et les options supplémentaires
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // Utiliser SQLite comme source de données
        options.UseSqlite($"Data Source={DbPath}");

        // Optionnel : loguer les requêtes SQL pour le débogage (peut être commenté si pas nécessaire)
        // options.LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information);
    }
}