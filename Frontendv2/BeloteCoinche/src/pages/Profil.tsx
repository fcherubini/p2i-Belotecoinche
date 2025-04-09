import React, { useEffect, useState } from "react"
import {
  Card, CardHeader, CardContent, CardFooter, CardTitle,
} from "@/components/ui/card"
import {
  Avatar, AvatarImage, AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const getFamilleLabel = (familleId: number) => {
  const labels = ["Rouge", "Bleu", "Jaune", "Vert", "Orange"]
  return labels[familleId] ?? "Inconnue"
}

const getFamilleColor = (familleId: number) => {
  switch (familleId) {
    case 0: return "bg-red-500"
    case 1: return "bg-blue-500"
    case 2: return "bg-yellow-400"
    case 3: return "bg-green-500"
    case 4: return "bg-orange-500"
    default: return "bg-gray-400"
  }
}

const Profil = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [updatedUser, setUpdatedUser] = useState(user)
  const [duoBlaze, setDuoBlaze] = useState<string | null>(null)
  const [rang, setRang] = useState<number | null>(null)
  const [parties, setParties] = useState<any[]>([])
  const [joueursMap, setJoueursMap] = useState<Record<number, string>>({})
  const [totalUsers, setTotalUsers] = useState<number>(4)
  const [newDuoInput, setNewDuoInput] = useState("")
  const [messageDuo, setMessageDuo] = useState<string | null>(null)
  const { logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)


  useEffect(() => {
    const fetchAll = async () => {
      if (!user) return

      try {
        const [resUser, resParties, resAllUsers] = await Promise.all([
          fetch(`http://localhost:5123/api/profil/${user.id}`),
          fetch(`http://localhost:5123/api/partie/by-user/${user.id}`),
          fetch("http://localhost:5123/api/profil"),
        ])

        const newUser = await resUser.json()
        setUpdatedUser(newUser)
        setTotalUsers((await resAllUsers.json()).length)

        const partiesData = await resParties.json()
        setParties(partiesData)

        const ids = [...new Set(partiesData.flatMap((p: any) => p.joueursIds))]
        ids.push(newUser.id) // ajouter soi-même pour éviter le "?"

        const map: Record<number, string> = {}
        await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`http://localhost:5123/api/profil/${id}`)
            const data = await res.json()
            map[id] = data.blaze
          })
        )
        setJoueursMap(map)

        if (newUser.duoFavId) {
          const resDuo = await fetch(`http://localhost:5123/api/profil/${newUser.duoFavId}`)
          const duo = await resDuo.json()
          setDuoBlaze(duo.blaze)
        } else {
          setDuoBlaze(null)
        }
      } catch (err) {
        console.error("Erreur fetch profil/parties :", err)
      }
    }

    fetchAll()
  }, [user])

  useEffect(() => {
    const fetchClassement = async () => {
      if (!user) return
      try {
        const res = await fetch("http://localhost:5123/api/profil/classement")
        const data = await res.json()
        const index = data.findIndex((p: any) => p.id === user.id)
        setRang(index + 1)
      } catch (err) {
        console.error("Erreur classement :", err)
      }
    }
    fetchClassement()
  }, [user])

  if (!updatedUser) return <p>Chargement...</p>

  const totalParties = parties.length
  const totalVictoires = parties.filter((p) => p.gagnantsIds.includes(updatedUser.id)).length
  const totalDefaites = totalParties - totalVictoires
  const winrate = totalParties > 0 ? ((totalVictoires / totalParties) * 100).toFixed(1) : "0"

  return (
    <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      <Button
        variant="ghost"
        className="absolute top-4 right-4 rounded-full bg-white text-gray-800 hover:bg-gray-200"
        onClick={() => navigate("/home")}
      >
        <X className="w-5 h-5" />
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-5xl w-full max-h-[90vh]">
        {/* Profil */}
        <Card className={`col-span-1 sm:row-span-2 ${getFamilleColor(updatedUser.famille)} text-center flex flex-col items-center justify-center py-4 shadow-xl rounded-3xl text-white`}>
          <Avatar className="w-20 h-20 mb-2 border-4 border-white">
            <AvatarImage src="" />
            <AvatarFallback>{updatedUser.blaze.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{updatedUser.blaze}</h2>
          <p className="text-sm">Famille : {getFamilleLabel(updatedUser.famille)}</p>

          <div className="bg-white text-gray-800 rounded-xl px-4 py-2 shadow mt-4 w-[80%]">
            <p className="text-sm font-semibold">Duo Favori</p>
            <p className="text-sm mb-2">{duoBlaze ?? "Aucun"}</p>
            <input
              type="text"
              placeholder="Blaze ou mail"
              value={newDuoInput}
              onChange={(e) => setNewDuoInput(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-2"
            />
            <Button
              size="sm"
              className="h-7 px-3 bg-teal-600 text-white hover:bg-teal-700 text-xs w-full"
              onClick={async () => {
                if (!newDuoInput || !updatedUser) return

                try {
                  const res = await fetch(`http://localhost:5123/api/users?query=${encodeURIComponent(newDuoInput)}`)
                  if (!res.ok) {
                    setMessageDuo("Utilisateur introuvable.")
                    return
                  }
                  const profilTrouve = await res.json()

                  const resUpdate = await fetch(`http://localhost:5123/api/profil/${updatedUser.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      blaze: updatedUser.blaze,
                      mail: updatedUser.mail,
                      famille: updatedUser.famille,
                      duoFavId: profilTrouve.id
                    }),
                  })

                  if (resUpdate.ok) {
                    setMessageDuo("Duo favori mis à jour 🎉")
                    setDuoBlaze(profilTrouve.blaze)
                    setNewDuoInput("")
                  } else {
                    const msg = await resUpdate.text()
                    setMessageDuo(msg || "Erreur mise à jour.")
                  }
                } catch (err) {
                  console.error(err)
                  setMessageDuo("Erreur serveur.")
                }
              }}
            >
              Modifier
            </Button>
            {messageDuo && <p className="text-xs text-center mt-1">{messageDuo}</p>}
          </div>
          {/* Bouton Déconnexion avec confirmation */}
{showLogoutConfirm ? (
  <div className="mt-4 text-sm text-white space-y-2">
    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
    <div className="flex justify-center gap-3">
      <Button
        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
        onClick={() => {
          logout()
          navigate("/connexion")
        }}
      >
        Oui
      </Button>
      <Button
        className="bg-white text-gray-700 hover:bg-gray-100 text-xs px-3 py-1"
        onClick={() => setShowLogoutConfirm(false)}
      >
        Non
      </Button>
    </div>
  </div>
) : (
  <Button
    size="sm"
    variant="outline"
    className="mt-4 bg-white text-red-600 border-red-500 hover:bg-red-100 text-xs"
    onClick={() => setShowLogoutConfirm(true)}
  >
    Déconnexion
  </Button>
)}

        </Card>

        {/* Statistiques */}
        <Card className="col-span-1 bg-orange-100 shadow-xl rounded-3xl py-4">
          <CardHeader>
            <CardTitle className="text-base">Points & Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-800 space-y-2">
            <p className="text-2xl font-mono">{updatedUser.pointsClassement} pts</p>
            <p>Victoires : <span className="font-semibold">{totalVictoires}</span></p>
            <p>Défaites : <span className="font-semibold">{totalDefaites}</span></p>
            <p className="text-sm text-gray-700">
              Taux de victoire : <span className="font-medium">{winrate}%</span>
            </p>
          </CardContent>
        </Card>

        {/* Classement */}
        <Card className="col-span-1 bg-orange-100 shadow-xl rounded-3xl py-4 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base">Classement</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-800 space-y-1">
            <p>Rang : <Badge className="bg-teal-600 text-white text-sm">{rang ? `#${rang}` : "?"}</Badge></p>
            <p>Sur {totalUsers} joueurs</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-teal-600 text-white hover:bg-teal-700" onClick={() => navigate("/classement")}>
              Voir plus
            </Button>
          </CardFooter>
        </Card>

        {/* Historique */}
        <Card className="col-span-2 bg-orange-100 shadow-xl rounded-3xl py-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Historique des Parties</CardTitle>
          </CardHeader>
          <CardContent className="h-48 overflow-hidden pt-0">
            <ScrollArea className="h-full pr-2">
              {parties.length === 0 ? (
                <p className="text-center text-sm text-gray-500">Aucune partie jouée</p>
              ) : (
                <div className="space-y-2">
                  {parties.map((partie, index) => {
                    const victoire = partie.gagnantsIds.includes(updatedUser.id)
                    const couleurFond = victoire ? "bg-green-100" : "bg-red-100"
                    const indexUser = partie.joueursIds.indexOf(updatedUser.id)
                    const partenaireId = indexUser % 2 === 0 ? partie.joueursIds[indexUser + 2] : partie.joueursIds[indexUser - 2]
                    const adversairesIds = partie.joueursIds.filter((id: number) => id !== updatedUser.id && id !== partenaireId)
                    const partenaire = joueursMap[partenaireId] ?? "?"
                    const adversaires = adversairesIds.map((id: number) => joueursMap[id] ?? "?").join(" & ")
                    const points = victoire ? `+${partie.pointsClassement}` : `-${partie.pointsClassement}`

                    return (
                      <div key={index} className={`${couleurFond} rounded-lg py-2 px-3 shadow flex flex-col text-sm`}>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{victoire ? "✅ Victoire" : "❌ Défaite"} {points}</p>
                          <p className="text-xs text-gray-500">Partie #{partie.id}</p>
                        </div>
                        <p className="text-xs mt-1 text-gray-700">
                          Partenaire : {partenaire} | Adversaires : {adversaires}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profil
