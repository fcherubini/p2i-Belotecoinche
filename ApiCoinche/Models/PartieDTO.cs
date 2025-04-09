// DTO utilisé pour envoyer les infos d'une partie au frontEnd

namespace ApiCoinche.Models;

public class PartieDTO
{
    public int Id { get; set; }
    public List<int> JoueursIds { get; set; } = new List<int>();
    public List<int> GagnantsIds { get; set; } = new List<int>();
    public int PointsClassement { get; set; }

    public PartieDTO() { }

    public PartieDTO(Partie partie)
    {
        Id = partie.Id;
        JoueursIds = partie.JoueursIds;
        GagnantsIds = partie.GagnantsIds;
        PointsClassement = partie.PointsClassement;
    }
}
