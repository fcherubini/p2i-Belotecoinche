namespace ApiCoinche.Models
{
    public class PartieInputDTO
    {
        public List<int> JoueursIds { get; set; } = new List<int>();
        public List<int> GagnantsIds { get; set; } = new List<int>();
        public int PointsClassement { get; set; }
    }
}
