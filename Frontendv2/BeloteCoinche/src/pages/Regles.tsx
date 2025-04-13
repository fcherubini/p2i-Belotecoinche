// page règles affichant un carousel avec les règles de la belote et de la coinche, y compris les systèmes de comptage des points

import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import CustomMenubar from "@/components/custom/menubarcustom"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

const Regles = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-teal-600">
      <div className="flex-1 flex items-center justify-center px-4 mt-8 mb-20">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent>
            {/* Carte Belote */}
            <CarouselItem>
              <Card className="bg-orange-100 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Règles de la Belote</h2>
                <p className="leading-relaxed text-justify">
                  La Belote se joue à 4 joueurs répartis en 2 équipes. On utilise un jeu de 32 cartes.
                  Après une première distribution de 5 cartes, une carte est retournée au centre pour proposer un atout.
                  Si un joueur prend, il reçoit la carte et complète sa main à 8 cartes. Sinon, un second tour permet de choisir un autre atout.
                  Les plis se font en suivant la couleur demandée ou en coupant avec l’atout.
                  L’équipe preneuse doit faire plus de points que l’adverse pour réussir le contrat.
                  Le roi et la dame d’atout donnent un bonus de 20 points (belote-rebelote).
                  Le système de points est classique : les cartes valent entre 0 et 14 points, selon leur ordre et qu’elles soient à l’atout ou non.
                </p>
              </Card>
            </CarouselItem>

            {/* Carte Coinche */}
            <CarouselItem>
              <Card className="bg-orange-100 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Règles de la Coinche</h2>
                <p className="leading-relaxed text-justify">
                  La Coinche est une variante stratégique de la Belote. Elle se joue aussi à 4 joueurs en 2 équipes.
                  Les joueurs misent des contrats de 80 à 160 points, ou passent. On peut aussi coincher pour contrer l’adversaire, voire surcoincher.
                  L’équipe preneuse doit atteindre ou dépasser son contrat, sinon elle perd tous les points.
                  On peut jouer en Tout Atout (toutes les couleurs ont les valeurs d’un atout) ou Sans Atout (aucun bonus d’atout).
                  Le comptage des points dépend du mode : en tout atout, les cartes valent comme à l’atout (Valet : 20, 9 : 14...), 
                  en sans atout, les valeurs sont classiques mais le 10 vaut plus que le roi.
                  Des annonces spéciales comme Capot (faire tous les plis) ou Générale (contrat + capot) ajoutent de la complexité.
                </p>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <CustomMenubar active="regles" />
    </div>
  )
}

export default Regles
