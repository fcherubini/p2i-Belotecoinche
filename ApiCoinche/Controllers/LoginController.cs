// gère l'authentification des profils
// utilisé pour la connexion, il ne gère pas les tokens

using Microsoft.AspNetCore.Mvc;
using ApiCoinche.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiCoinche.Controllers
{
    [ApiController]
    [Route("api")]
    public class LoginController : ControllerBase
    {
        private readonly CoincheContext _context;

        public LoginController(CoincheContext context)
        {
            _context = context;
        }

        [HttpPost("login")]

        //  cherche dans la bdd un profil qui correspond au LoginRequest (mail + mdp)
        // retourne error 401 unauthorized si incompatible ou renvoie le ProfilDTO correspondant
        public async Task<ActionResult<ProfilDTO>> Login([FromBody] LoginRequest request)
        {
            // Exemple de validation simple
            var profil = await _context.Profils.FirstOrDefaultAsync(p => p.Mail == request.email && p.Mdp == request.password);
            if (profil == null)
            {
                return Unauthorized("Identifiants invalides");
            }

            return new ProfilDTO(profil);
        }
    }

    // reçoit une requête de connexion via email et mdp
    public class LoginRequest
    {
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
    }
}
