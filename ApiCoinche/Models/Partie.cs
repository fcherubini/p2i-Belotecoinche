public class Partie
{
    public int Id { get; set; }

    public List<int> JoueursIds { get; set; } = new List<int>();
    public List<int> GagnantsIds { get; set; } = new List<int>();
    public int PointsClassement { get; set; }
}
