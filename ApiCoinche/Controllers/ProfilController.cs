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

    // GET: api/profil
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProfilDTO>>> GetProfils()
    {
        var profils = await _context.Profils.ToListAsync();
        return profils.Select(p => new ProfilDTO(p)).ToList();
    }

    // GET: api/profil/2
    [HttpGet("{id}")]
    public async Task<ActionResult<ProfilDTO>> GetProfil(int id)
    {
        var profil = await _context.Profils.FindAsync(id);

        if (profil == null)
            return NotFound();

        return new ProfilDTO(profil);
    }

    // POST: api/profil
    [HttpPost]
    public async Task<ActionResult<ProfilDTO>> PostProfil(ProfilInputDTO input)
    {
        // Valider si DuoFavId est fourni et correspond à un profil existant
        if (input.DuoFavId.HasValue)
        {
            var duoFav = await _context.Profils.FindAsync(input.DuoFavId.Value);
            if (duoFav == null)
            {
                return BadRequest("Le duoFav spécifié n'existe pas.");
            }
        }

        var profil = new Profil
        {
            Blaze = input.Blaze,
            Mail = input.Mail,
            Mdp = input.Mdp,
            Famille = input.Famille,
            DuoFavId = input.DuoFavId,
            // Les autres propriétés (PointsClassement, PartiesJoueesIds, Victoires, TotalParties) seront initialisées par défaut
        };

        _context.Profils.Add(profil);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProfil), new { id = profil.Id }, new ProfilDTO(profil));
    }

    // PUT: api/profil/2
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProfil(int id, ProfilInputDTO input)
    {
        var profil = await _context.Profils.FindAsync(id);
        if (profil == null)
        {
            return NotFound();
        }

        // Valider si DuoFavId est fourni et correspond à un profil existant
        if (input.DuoFavId.HasValue)
        {
            var duoFav = await _context.Profils.FindAsync(input.DuoFavId.Value);
            if (duoFav == null)
            {
                return BadRequest("Le duoFav spécifié n'existe pas.");
            }
        }

        // Mise à jour des propriétés du profil avec les valeurs du DTO
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

    // DELETE: api/profil/2
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProfil(int id)
    {
        var profil = await _context.Profils.FindAsync(id);

        if (profil == null)
            return NotFound();

        _context.Profils.Remove(profil);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/profil/classement
    [HttpGet("classement")]
    public async Task<ActionResult<IEnumerable<ProfilDTO>>> GetClassement()
    {
        var profils = await _context.Profils
            .OrderByDescending(p => p.PointsClassement)
            .ToListAsync();

        return profils.Select(p => new ProfilDTO(p)).ToList();
    }
}
