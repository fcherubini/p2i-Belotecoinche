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

        // Paramètres de bonus (ajuste-les à ta convenance)
        double bonusDuoFav = 5.0;
        double bonusSameFamily = 3.0;

        // --- Calcul de la mise à jour du PointsClassement pour chaque gagnant
        foreach (var gagnant in gagnants)
        {
            // Calcul standard Elo
            double gain = partie.PointsClassement * 
                          (1 - ExpectedScore(gagnant.PointsClassement, perdants.Average(p => p.PointsClassement)));

            // Calcul du bonus éventuel
            double bonus = 0;

            // On récupère l'autre gagnant pour vérifier duoFav / même Famille
            var autreGagnant = gagnants.FirstOrDefault(g => g.Id != gagnant.Id);
            if (autreGagnant != null)
            {
                // Bonus si le gagnant a l'autre gagnant comme duoFav
                // (si tu veux un vrai duo réciproque, vérifie aussi autreGagnant.DuoFavId == gagnant.Id)
                if (gagnant.DuoFavId.HasValue && gagnant.DuoFavId.Value == autreGagnant.Id)
                {
                    bonus += bonusDuoFav;
                }

                // Bonus si la Famille est identique
                if (gagnant.Famille == autreGagnant.Famille)
                {
                    bonus += bonusSameFamily;
                }
            }

            // Somme du gain + bonus
            double totalGain = gain + bonus;
            // On arrondit ce total
            double arrondiGain = Math.Round(totalGain);

            // Mise à jour du classement en arrondissant le nouveau total
            gagnant.PointsClassement = Math.Round(gagnant.PointsClassement + arrondiGain);

            // Victoire et total parties
            gagnant.Victoires++;
            gagnant.TotalParties++;
        }

        // --- Calcul de la perte Elo pour les perdants
        foreach (var perdant in perdants)
        {
            double perte = partie.PointsClassement * 
                           (0 - ExpectedScore(perdant.PointsClassement, gagnants.Average(g => g.PointsClassement)));

            double arrondiPerte = Math.Round(perte);

            perdant.PointsClassement = Math.Round(perdant.PointsClassement + arrondiPerte);
            perdant.TotalParties++;
        }

        // Sauvegarde de la partie
        _context.Parties.Add(partie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPartie), new { id = partie.Id }, new PartieDTO(partie));
    }

    // Méthode utilitaire de calcul Elo
    private double ExpectedScore(double playerRating, double opponentRating)
    {
        return 1 / (1 + Math.Pow(10, (opponentRating - playerRating) / 400));
    }
}
