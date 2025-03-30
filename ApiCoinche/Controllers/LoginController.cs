using Microsoft.AspNetCore.Mvc;
using ApiCoinche.Models;
using Microsoft.EntityFrameworkCore; // Ajout de cette ligne

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

    public class LoginRequest
    {
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
    }
}
