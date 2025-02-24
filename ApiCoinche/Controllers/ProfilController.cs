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
    public async Task<ActionResult<ProfilDTO>> PostProfil(Profil profil)
    {
        _context.Profils.Add(profil);
        await _context.SaveChangesAsync();

        var profilDTO = new ProfilDTO(profil);
        return CreatedAtAction(nameof(GetProfil), new { id = profil.Id }, profilDTO);
    }

    // PUT: api/profil/2
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProfil(int id, Profil profil)
    {
        if (id != profil.Id)
            return BadRequest("L'ID dans l'URL ne correspond pas à l'ID du profil.");

        _context.Entry(profil).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Profils.Any(m => m.Id == id))
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
