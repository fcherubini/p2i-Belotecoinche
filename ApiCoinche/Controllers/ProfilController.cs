// gère toutes les opérations CRUD sur le profil d'un joueur

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiCoinche.Models;

namespace ApiCoinche.Controllers;

[ApiController]
[Route("api/profil")]
public class ProfilController : ControllerBase
{
    private readonly CoincheContext _context;

    public ProfilController(CoincheContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProfilDTO>>> GetProfils()
    {
        var profils = await _context.Profils.ToListAsync();
        return profils.Select(p => new ProfilDTO(p)).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProfilDTO>> GetProfil(int id)
    {
        var profil = await _context.Profils.FindAsync(id);
        if (profil == null) return NotFound();
        return new ProfilDTO(profil);
    }

    [HttpPost]
    public async Task<ActionResult<ProfilDTO>> PostProfil(ProfilInputDTO input)
    {
        if (input.DuoFavId.HasValue)
        {
            var duoFav = await _context.Profils.FindAsync(input.DuoFavId.Value);
            if (duoFav == null)
                return BadRequest("Le duoFav spécifié n'existe pas.");
        }

        var profil = new Profil
        {
            Blaze = input.Blaze,
            Mail = input.Mail,
            Mdp = input.Mdp,
            Famille = input.Famille,
            DuoFavId = input.DuoFavId
        };

        _context.Profils.Add(profil);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProfil), new { id = profil.Id }, new ProfilDTO(profil));
    }

    [HttpPut("{id}")]
public async Task<IActionResult> PutProfil(int id, ProfilInputDTO input)
{
    var profil = await _context.Profils.FindAsync(id);
    if (profil == null) return NotFound();

    // validation optionnelle (fréquence max 1 par mois)
    if (input.DuoFavId != profil.DuoFavId)
    {
        if (profil.DerniereModificationDuo.HasValue &&
            profil.DerniereModificationDuo.Value.AddMonths(1) > DateTime.Now)
        {
            return BadRequest("Vous ne pouvez changer votre duo qu'une fois par mois.");
        }

        profil.DerniereModificationDuo = DateTime.Now;
    }

    // mise à jour effective
    profil.Blaze = input.Blaze;
    profil.Mail = input.Mail;
    profil.Mdp = input.Mdp;
    profil.Famille = input.Famille;
    profil.DuoFavId = input.DuoFavId;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!_context.Profils.Any(p => p.Id == id))
            return NotFound();
        else
            throw;
    }

    return NoContent();
}


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProfil(int id)
    {
        var profil = await _context.Profils.FindAsync(id);
        if (profil == null) return NotFound();

        _context.Profils.Remove(profil);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("classement")]
    public async Task<ActionResult<IEnumerable<ProfilDTO>>> GetClassement()
    {
        var profils = await _context.Profils
            .OrderByDescending(p => p.PointsClassement)
            .ToListAsync();

        return profils.Select(p => new ProfilDTO(p)).ToList();
    }

    // vérifie l'existence d'un joueur (par mail/blaze) pour lancer une partie
    [HttpGet("/api/users")]
    public async Task<ActionResult<ProfilDTO>> GetUserByQuery([FromQuery] string query)
    {
        var profil = await _context.Profils
            .FirstOrDefaultAsync(p =>
                p.Blaze.ToLower() == query.ToLower() || p.Mail.ToLower() == query.ToLower());

        if (profil == null)
            return NotFound();

        return new ProfilDTO(profil);
    }
}
