using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using ApiCoinche.Models;

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
    public async Task<ActionResult<IEnumerable<Profil>>> GetProfils()
    {
        // Get profils and related lists
        var profils = _context.Profils;
        return await profils.ToListAsync();
    }

    // GET: api/profil/2
    [HttpGet("{id}")]
    public async Task<ActionResult<Profil>> GetProfil(int id)
    {
        // Find profil and related list
        // SingleAsync() throws an exception if no profil is found (which is possible, depending on id)
        // SingleOrDefaultAsync() is a safer choice here
        var profil = await _context.Profils.SingleOrDefaultAsync(t => t.Id == id);

        if (profil == null)
            return NotFound();

        return profil;
    }

    // POST: api/profil
    [HttpPost]
    public async Task<ActionResult<Profil>> PostProfil(Profil profil)
    {
        _context.Profils.Add(profil);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProfil), new { id = profil.Id }, profil);
    }

    // PUT: api/profil/2
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProfil(int id, Profil profil)
    {
        if (id != profil.Id)
            return BadRequest();

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
    public async Task<IActionResult> DeleteProfilItem(int id)
    {
        var profil = await _context.Profils.FindAsync(id);

        if (profil == null)
            return NotFound();

        _context.Profils.Remove(profil);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}