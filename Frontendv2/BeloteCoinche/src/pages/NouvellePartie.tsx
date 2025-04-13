// page de création d'une nouvelle partie : saisie des joueurs, suivi du score, détection des bonus et validation finale

import { useEffect, useState } from "react"
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

// composant nouvellepartie : permet de lancer une partie, gérer les scores et valider les résultats
const NouvellePartie = () => {
  const [joueurs, setJoueurs] = useState(["", "", "", ""])
  const [profils, setProfils] = useState<(any | null)[]>([null, null, null, null])
  const [pointsCible, setPointsCible] = useState("500")
  const [partieLancee, setPartieLancee] = useState(false)
  const [gagnant, setGagnant] = useState<number | null>(null)
  const [scores, setScores] = useState([{ teamA: 0, teamB: 0 }])
  const [ptsA, setPtsA] = useState("")
  const [ptsB, setPtsB] = useState("")
  const [valide, setValide] = useState(false)
  const navigate = useNavigate()

  const fetchUser = async (query: string, index: number) => {
    try {
      const res = await fetch(`http://localhost:5123/api/users?query=${query}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      const newProfils = [...profils]
      newProfils[index] = data
      setProfils(newProfils)
    } catch {
      const newProfils = [...profils]
      newProfils[index] = null
      setProfils(newProfils)
    }
  }

  const tousValides = profils.every((p) => p !== null)

  const bonusEquipe = (i1: number, i2: number) => {
    const p1 = profils[i1]
    const p2 = profils[i2]
    if (!p1 || !p2) return ""
    const duo = p1.duoFavId === p2.id || p2.duoFavId === p1.id
    const sameFam = p1.famille === p2.famille
    const bonus = []
    if (duo) bonus.push("💞 DuoFav")
    if (sameFam) bonus.push("👨‍👩‍👧‍👦 Même famille")
    return bonus.join(" + ")
  }

  const ajouterScore = () => {
    const last = scores[scores.length - 1]
    const a = parseInt(ptsA) || 0
    const b = parseInt(ptsB) || 0
    const nouveau = { teamA: last.teamA + a, teamB: last.teamB + b }
    setScores([...scores, nouveau])
    setPtsA("")
    setPtsB("")
    if (nouveau.teamA >= parseInt(pointsCible)) setGagnant(0)
    if (nouveau.teamB >= parseInt(pointsCible)) setGagnant(1)
  }

  const validerPartie = async () => {
    if (!tousValides || gagnant === null) return

    const joueursIds = profils.map((p) => p.id)
    const gagnantsIds =
      gagnant === 0
        ? [profils[0]?.id, profils[2]?.id]
        : [profils[1]?.id, profils[3]?.id]

    const body = {
      joueursIds,
      gagnantsIds,
      scoreFinal: scores[scores.length - 1],
      pointsClassement: 50,
    }

    const res = await fetch("http://localhost:5123/api/partie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) setValide(true)
    else alert("Erreur lors de l'enregistrement")
  }

  return (
    <div className="min-h-screen bg-teal-700 flex flex-col justify-between p-6">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <Card className="bg-[#fce7c7] w-full max-w-md">
          <CardHeader>
            <CardTitle>Paramètres partie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {joueurs.map((j, i) => (
                <div key={i} className="relative">
                  <Input
                    placeholder={`user${i + 1}`}
                    value={j}
                    onChange={(e) => {
                      const newJ = [...joueurs]
                      newJ[i] = e.target.value
                      setJoueurs(newJ)
                      fetchUser(e.target.value, i)
                    }}
                    className={`${
                      i === 0 || i === 2 ? "bg-red-100" : "bg-blue-100"
                    } font-semibold pr-8`}
                  />
                  <span className="absolute top-2 right-2 text-lg">
                    {profils[i] ? "✅" : "❌"}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Jusqu'à :</span>
              <Select value={pointsCible} onValueChange={setPointsCible}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 pts</SelectItem>
                  <SelectItem value="700">700 pts</SelectItem>
                  <SelectItem value="1000">1000 pts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {tousValides && (
              <div className="text-sm text-green-700 space-y-1">
                <p>🟥 Équipe 1 : {bonusEquipe(0, 2)}</p>
                <p>🟦 Équipe 2 : {bonusEquipe(1, 3)}</p>
              </div>
            )}

            <Button
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => setPartieLancee(true)}
              disabled={!tousValides}
            >
              Lancer la partie
            </Button>
          </CardContent>
        </Card>

        {partieLancee && (
          <div className="flex-1 flex flex-col gap-4">
            <Card className="bg-neutral-100 flex-1">
              <CardHeader>
                <CardTitle>Tableau de score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-semibold text-red-600">
                    Équipe 1 : {joueurs[0]} & {joueurs[2]}
                  </p>
                  <p className="font-semibold text-blue-600">
                    Équipe 2 : {joueurs[1]} & {joueurs[3]}
                  </p>
                </div>

                <table className="w-full text-center text-sm bg-white rounded overflow-hidden border">
                  <thead className="bg-neutral-300">
                    <tr>
                      <th>Tour</th>
                      <th className="text-red-600">Équipe 1</th>
                      <th className="text-blue-600">Équipe 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((s, i) => (
                      <tr key={i} className="border-t">
                        <td className="font-semibold">{i}</td>
                        <td>{s.teamA}</td>
                        <td>{s.teamB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex gap-2 mt-4">
                  <Input
                    type="number"
                    placeholder="pts Équipe 1"
                    value={ptsA}
                    onChange={(e) => setPtsA(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="pts Équipe 2"
                    value={ptsB}
                    onChange={(e) => setPtsB(e.target.value)}
                  />
                  <Button onClick={ajouterScore}>Ajouter</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-300 p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold">
                  {gagnant !== null
                    ? `Victoire de ${
                        gagnant === 0
                          ? `${joueurs[0]} et ${joueurs[2]}`
                          : `${joueurs[1]} et ${joueurs[3]}`
                      }`
                    : "La partie continue..."}
                </span>
                <Button
                  className="bg-pink-300 text-black hover:bg-pink-400"
                  disabled={gagnant === null}
                  onClick={validerPartie}
                >
                  Valider
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {valide && (
        <div className="bg-green-600 text-white p-4 mt-4 rounded-md flex justify-between items-center">
          <span>🎉 Partie enregistrée, classement mis à jour</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white text-green-700 hover:bg-gray-100 px-3"
              onClick={() => navigate("/classement")}
            >
              Classement
            </Button>
            <Button
              variant="outline"
              className="bg-white text-green-700 hover:bg-gray-100 px-3"
              onClick={() => navigate("/home")}
            >
              ❌
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NouvellePartie
