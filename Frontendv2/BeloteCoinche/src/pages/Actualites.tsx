// page actualités affichant la dernière partie jouée, un aperçu du tournoi et une affiche à venir

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import CustomMenubar from "@/components/custom/menubarcustom"

// composant actualites : récupère la dernière partie jouée et affiche un résumé
const Actualites = () => {
  const [dernierMatch, setDernierMatch] = useState<string | null>(null)

  useEffect(() => {
    const fetchDernierePartie = async () => {
      try {
        const res = await fetch("http://localhost:5123/api/partie")
        const data = await res.json()

        if (data.length === 0) {
          setDernierMatch("Aucune partie jouée aujourd’hui.")
          return
        }

        const last = data[data.length - 1]

        const joueurs = await Promise.all(
          last.joueursIds.map(async (id: number) => {
            const r = await fetch(`http://localhost:5123/api/profil/${id}`)
            const d = await r.json()
            return { id, blaze: d.blaze }
          })
        )

        const gagnants = joueurs.filter((j) => last.gagnantsIds.includes(j.id))
        const perdants = joueurs.filter((j) => !last.gagnantsIds.includes(j.id))

        const phrase = `${gagnants[0].blaze} et ${gagnants[1].blaze} ont battu ${perdants[0].blaze} et ${perdants[1].blaze}`
        setDernierMatch(phrase)
      } catch (err) {
        console.error("erreur chargement actualités :", err)
        setDernierMatch("Erreur de chargement.")
      }
    }

    fetchDernierePartie()
  }, [])

  return (
    <div className="min-h-screen bg-teal-600 flex flex-col justify-between items-center px-6 pt-6 pb-2">
      <div className="flex justify-center items-start w-full max-w-6xl gap-12">
        <div className="flex flex-col justify-between gap-6 h-[360px]">
          <div>
            <h2 className="text-white text-lg font-bold mb-2">Récemment</h2>
            <Card className="bg-orange-100 border border-orange-300 text-gray-900 rounded-2xl shadow-xl h-[170px] w-[320px] flex items-center justify-center text-center font-semibold text-base">
              Vainqueur du tournoi : User1
            </Card>
          </div>

          <div>
            <h2 className="text-white text-lg font-bold mb-2">Aujourd’hui</h2>
            <Card className="bg-orange-100 border border-orange-300 text-gray-900 rounded-2xl shadow-xl h-[170px] w-[320px] flex items-center justify-center text-center font-semibold text-base px-4">
              {dernierMatch ?? "Chargement..."}
            </Card>
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <h2 className="text-white text-lg font-bold mb-2">À venir</h2>
          <Card className="bg-yellow-300 p-0 border-4 border-yellow-400 rounded-2xl shadow-xl w-[260px] h-[360px] overflow-hidden">
            <img
              src="/images/afficheTournoiCoinche.png"
              alt="Affiche tournoi Coinche ENSC"
              className="w-full h-full object-cover"
            />
          </Card>
        </div>
      </div>

      <CustomMenubar active="actualites" />
    </div>
  )
}

export default Actualites
