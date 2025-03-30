using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiCoinche.Models;

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

    // GET: api/partie/2
    [HttpGet("{id}")]
    public async Task<ActionResult<PartieDTO>> GetPartie(int id)
    {
        var partie = await _context.Parties.FindAsync(id);

        if (partie == null)
            return NotFound();

        return new PartieDTO(partie);
    }

    // ✅ NOUVEAU : GET parties jouées par un utilisateur
    // GET: api/partie/by-user/3
    [HttpGet("by-user/{userId}")]
    public async Task<ActionResult<IEnumerable<PartieDTO>>> GetPartiesByUser(int userId)
    {
        var parties = await _context.Parties
            .Where(p => p.JoueursIds.Contains(userId))
            .OrderByDescending(p => p.Id)
            .ToListAsync();

        return parties.Select(p => new PartieDTO(p)).ToList();
    }

    // POST: api/partie
    [HttpPost]
    public async Task<ActionResult<PartieDTO>> PostPartie(Partie partie)
    {
        if (partie.JoueursIds.Count != 4 || partie.GagnantsIds.Count != 2)
            return BadRequest("Une partie doit avoir 4 joueurs et exactement 2 gagnants.");

        // Récupération des profils des joueurs
        var joueurs = await _context.Profils
            .Where(p => partie.JoueursIds.Contains(p.Id))
            .ToListAsync();

        if (joueurs.Count != 4)
            return BadRequest("Certains joueurs n'existent pas.");

        // Séparation des gagnants et perdants
        var gagnants = joueurs.Where(j => partie.GagnantsIds.Contains(j.Id)).ToList();
        var perdants = joueurs.Where(j => !partie.GagnantsIds.Contains(j.Id)).ToList();

        double bonusDuoFav = 5.0;
        double bonusSameFamily = 3.0;

        foreach (var gagnant in gagnants)
        {
            double gain = partie.PointsClassement *
                          (1 - ExpectedScore(gagnant.PointsClassement, perdants.Average(p => p.PointsClassement)));

            double bonus = 0;
            var autreGagnant = gagnants.FirstOrDefault(g => g.Id != gagnant.Id);
            if (autreGagnant != null)
            {
                if (gagnant.DuoFavId.HasValue && gagnant.DuoFavId.Value == autreGagnant.Id)
                    bonus += bonusDuoFav;

                if (gagnant.Famille == autreGagnant.Famille)
                    bonus += bonusSameFamily;
            }

            double totalGain = gain + bonus;
            double arrondiGain = Math.Round(totalGain);
            gagnant.PointsClassement = Math.Round(gagnant.PointsClassement + arrondiGain);
            gagnant.Victoires++;
            gagnant.TotalParties++;
        }

        foreach (var perdant in perdants)
        {
            double perte = partie.PointsClassement *
                           (0 - ExpectedScore(perdant.PointsClassement, gagnants.Average(g => g.PointsClassement)));

            double arrondiPerte = Math.Round(perte);
            perdant.PointsClassement = Math.Round(perdant.PointsClassement + arrondiPerte);
            perdant.TotalParties++;
        }

        _context.Parties.Add(partie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPartie), new { id = partie.Id }, new PartieDTO(partie));
    }

    // Méthode utilitaire Elo
    private double ExpectedScore(double playerRating, double opponentRating)
    {
        return 1 / (1 + Math.Pow(10, (opponentRating - playerRating) / 400));
    }
}
