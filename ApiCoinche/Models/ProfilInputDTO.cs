// permet de valider les entrées venant du frontEnd, 
// il reçoit les données lors de la création/modif d'un profil,
// contient donc les infos nécessaires à la création d'un profil

namespace ApiCoinche.Models
{
    public class ProfilInputDTO
    {
        public string Blaze { get; set; } = null!;
        public string Mail { get; set; } = null!;
        public string Mdp { get; set; } = null!;
        public Famille Famille { get; set; }
        public int? DuoFavId { get; set; }  // Optionnel, c'est ici que l'on passe l'ID du duoFav
    }
}
