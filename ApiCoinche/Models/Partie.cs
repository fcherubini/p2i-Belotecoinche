public class Partie
{
    public int Id { get; set; }

    // Liste des joueurs (4 IDs)
    public List<int> JoueursIds { get; set; } = new List<int>();

    // Liste des gagnants (2 IDs)
    public List<int> GagnantsIds { get; set; } = new List<int>();

    // Score attribué aux gagnants (variable selon la partie)
    public int PointsClassement { get; set; }
}
