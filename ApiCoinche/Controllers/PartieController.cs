using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using ApiCoinche.Models;

namespace ApiCoinche.Controllers;

[ApiController]
[Route("api/partie")]
public class PartieController : ControllerBase
{
    private readonly CoincheContext _context;

    public PartieController(CoincheContext context)
    {
        _context = context;
    }

    // GET: api/partie
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Partie>>> GetProfils()
    {
        // Get parties and related lists
        var parties = _context.Parties;
        return await parties.ToListAsync();
    }

    // GET: api/partie/2
    [HttpGet("{id}")]
    public async Task<ActionResult<Partie>> GetPartie(int id)
    {
        // Find profil and related list
        // SingleAsync() throws an exception if no profil is found (which is possible, depending on id)
        // SingleOrDefaultAsync() is a safer choice here
        var partie = await _context.Parties.SingleOrDefaultAsync(t => t.Id == id);

        if (partie == null)
            return NotFound();

        return partie;
    }

    // POST: api/partie
    [HttpPost]
    public async Task<ActionResult<Partie>> PostPartie(Partie partie)
    {
        _context.Parties.Add(partie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPartie), new { id = partie.Id }, partie);
    }

    // PUT: api/partie/2
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPartie(int id, Partie partie)
    {
        if (id != partie.Id)
            return BadRequest();

        _context.Entry(partie).State = EntityState.Modified;

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

    // DELETE: api/partie/2
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePartieItem(int id)
    {
        var partie = await _context.Parties.FindAsync(id);

        if (partie == null)
            return NotFound();

        _context.Parties.Remove(partie);
        await _context.SaveChangesAsync();

        return NoContent();
    } 
}