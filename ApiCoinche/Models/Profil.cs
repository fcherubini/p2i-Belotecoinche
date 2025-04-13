// représente la structure de données principales d'un joueur dans la bdd

public class Profil
{
    public int Id { get; set; }
    public string Blaze { get; set; } = null!;
    public string Mail { get; set; } = null!;
    public string? Mdp { get; set; } = null!;
    public Famille Famille { get; set; }

    public int? DuoFavId { get; set; } //clé étrangère optionnelle
    public Profil? DuoFav { get; set; } //référence vers le profil du duoFav
    public DateTime? DerniereModificationDuo { get; set; } //pour vérifier que la dernière modif remonte à plus d'un mois

    public double PointsClassement { get; set; } = 1000; // 1000 est le score de départ pour tous les joueurs

    public List<int> PartiesJoueesIds { get; set; } = new List<int>();
    public int Victoires { get; set; } = 0;
    public int TotalParties { get; set; } = 0;
    public double WinRate => TotalParties > 0 ? (double)Victoires / TotalParties * 100 : 0;
}
