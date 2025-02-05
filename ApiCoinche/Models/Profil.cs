public class Profil
{
    public int Id { get; set; }
    public string Blaze { get; set; }= null!;
    public string Mail { get; set; }= null!;
    public string Mdp { get; set; }= null!;
    public Famille Famille { get; set; } 
    public Profil? DuoFav {get; set; }
    public double PointClassement { get; set; } = 1000; //Points avant première partie
       
    // Historique des parties jouées (stocke uniquement les IDs)
    public List<int> PartiesJoueesIds { get; set; } = new List<int>();

    public int Victoires { get; set; } = 0;
    public int TotalParties { get; set; } = 0;

    public double WinRate => TotalParties > 0 ? (double)Victoires / TotalParties * 100 : 0;
}
