// src/pages/Regles.tsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import CustomMenubar from "@/components/custom/menubarcustom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const Regles = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-teal-600">
      {/* Carousel de règles */}
      <div className="flex-1 flex items-center justify-center px-4 mt-8 mb-20">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent>
            {/* Carte Belote */}
            <CarouselItem>
              <Card className="bg-orange-100 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Règles de la Belote</h2>
                <p className="leading-relaxed space-y-2 text-justify">
                  La Belote se joue à 4 joueurs en deux équipes de 2. On utilise un jeu de 32 cartes.
                  Chaque joueur reçoit 5 cartes, puis une carte est retournée au milieu.
                  Les joueurs décident s’ils veulent prendre cette carte comme atout. Si personne ne prend,
                  un second tour permet de choisir un autre atout. Celui qui prend reçoit la carte retournée
                  et complète sa main à 8 cartes. L’ordre des cartes change selon qu’elles sont atout ou non.
                  Les plis sont gagnés en suivant la couleur demandée ou en coupant avec l’atout.
                  L’équipe preneuse doit faire plus de points que l’autre pour gagner le contrat.
                  La Belote-Rebelote (roi + dame d’atout) donne 20 points bonus.
                </p>
              </Card>
            </CarouselItem>

            {/* Carte Coinche */}
            <CarouselItem>
              <Card className="bg-orange-100 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Règles de la Coinche</h2>
                <p className="leading-relaxed space-y-2 text-justify">
                  La Coinche est une variante de la Belote Contrée. Elle se joue aussi à 4 joueurs en 2 équipes.
                  On commence par une phase d’enchères où chaque joueur peut passer, miser (de 80 à 160 points),
                  ou coincher (contrer l’adversaire). Le partenaire peut surcoincher.
                  L’équipe preneuse doit atteindre ou dépasser la mise, sinon elle perd tous les points.
                  Il est aussi possible d’annoncer des contrats spéciaux : Capot (tous les plis),
                  Générale, ou Sans Atout / Tout Atout. Les règles de jeu sont les mêmes que la Belote,
                  mais les scores sont plus techniques. Un bon jeu de Coinche repose autant sur le jeu
                  que sur les annonces stratégiques.
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
