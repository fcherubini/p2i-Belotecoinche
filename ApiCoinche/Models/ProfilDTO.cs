namespace ApiCoinche.Models;

public class ProfilDTO
{
    public int Id { get; set; }
    public string Blaze { get; set; } = null!;
    public string Mail { get; set; } = null!;
    public Famille Famille { get; set; }
    public int? DuoFavId { get; set; }
    
    public double PointsClassement { get; set; }  // Classement Elo
    public List<int> PartiesJoueesIds { get; set; } = new List<int>();
    public int Victoires { get; set; }
    public int TotalParties { get; set; }
    public double WinRate => TotalParties > 0 ? (double)Victoires / TotalParties * 100 : 0;

    public ProfilDTO() { }

    public ProfilDTO(Profil profil)
    {
        Id = profil.Id;
        Blaze = profil.Blaze;
        Mail = profil.Mail;
        Famille = profil.Famille;
        DuoFavId = profil.DuoFav?.Id;
        PointsClassement = profil.PointsClassement;
        PartiesJoueesIds = profil.PartiesJoueesIds;
        Victoires = profil.Victoires;
        TotalParties = profil.TotalParties;
    }
}
