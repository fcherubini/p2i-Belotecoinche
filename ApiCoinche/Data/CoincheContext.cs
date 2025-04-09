// sert de passerelle avec la bdd et gère les intéractions backend/base

// classe du contexte EntityFrameWorkCore
using Microsoft.EntityFrameworkCore;

public class CoincheContext : DbContext
{
    public DbSet<Profil> Profils { get; set; } = null!;
    public DbSet<Partie> Parties { get; set; } = null!;

    public string DbPath { get; private set; }

    // Le constructeur pour définir le chemin vers la base de données SQLite
    public CoincheContext()
    {
        DbPath = "Coinche.db"; 
    }

    // Configure la base de données SQLite et les options supplémentaires
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
    }
}