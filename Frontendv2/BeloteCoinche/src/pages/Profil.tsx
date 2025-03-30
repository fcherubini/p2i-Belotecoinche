import React, { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

// Fonction pour transformer l'ID enum famille en texte
const getFamilleLabel = (familleId: number) => {
  const labels = ["Rouge", "Bleu", "Jaune", "Vert", "Orange"]
  return labels[familleId] ?? "Inconnue"
}

// Fonction pour appliquer une couleur selon la famille
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

  const [duoBlaze, setDuoBlaze] = useState<string | null>(null)
  const [rang, setRang] = useState<number | null>(null)
  const [parties, setParties] = useState<any[]>([])

  // Récupération du blaze du duo favori
  useEffect(() => {
    const fetchDuoBlaze = async () => {
      if (user?.duoFavId) {
        try {
          const res = await fetch(`http://localhost:5123/api/profil/${user.duoFavId}`)
          const data = await res.json()
          setDuoBlaze(data.blaze)
        } catch (err) {
          console.error("Erreur récupération duo :", err)
        }
      }
    }

    fetchDuoBlaze()
  }, [user?.duoFavId])

  // Récupération du classement
  useEffect(() => {
    const fetchClassement = async () => {
      if (!user) return
      try {
        const res = await fetch("http://localhost:5123/api/profil/classement")
        const data = await res.json()
        const index = data.findIndex((p: any) => p.id === user.id)
        setRang(index + 1)
      } catch (err) {
        console.error("Erreur récupération classement :", err)
      }
    }

    fetchClassement()
  }, [user])

  // Récupération des parties jouées par le joueur
  useEffect(() => {
    const fetchParties = async () => {
      if (!user) return
      try {
        const res = await fetch(`http://localhost:5123/api/partie/by-user/${user.id}`)
        const data = await res.json()
        setParties(data)
      } catch (err) {
        console.error("Erreur chargement des parties :", err)
      }
    }

    fetchParties()
  }, [user])

  if (!user) return <p>Chargement...</p>

  const defaites = user.totalParties - user.victoires
  const winrate = user.winRate.toFixed(1)

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
        {/* Carte Profil principale */}
        <Card
          className={`col-span-1 sm:row-span-2 ${getFamilleColor(
            user.famille
          )} text-center flex flex-col items-center justify-center py-4 shadow-xl rounded-3xl text-white`}
        >
          <Avatar className="w-20 h-20 mb-2 border-4 border-white">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>{user.blaze.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{user.blaze}</h2>
          <p className="text-sm">Famille : {getFamilleLabel(user.famille)}</p>
          <div className="bg-white text-gray-800 rounded-xl px-4 py-2 shadow mt-2">
            <p className="text-sm font-semibold">Duo Favori</p>
            <p className="text-sm">{duoBlaze ?? "Aucun"}</p>
            <Button
              size="sm"
              className="mt-2 h-7 px-3 bg-teal-600 text-white hover:bg-teal-700 text-xs"
            >
              Modifier
            </Button>
          </div>
        </Card>

        {/* Points + Statistiques */}
        <Card className="col-span-1 bg-orange-100 shadow-xl rounded-3xl py-4">
          <CardHeader>
            <CardTitle className="text-base">Points & Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-800 space-y-2">
            <p className="text-2xl font-mono">{user.pointsClassement} pts</p>
            <p>Victoires : <span className="font-semibold">{user.victoires}</span></p>
            <p>Défaites : <span className="font-semibold">{defaites}</span></p>
            <p className="text-sm text-gray-700">
              Taux de victoire : <span className="font-medium">{winrate}%</span>
            </p>
          </CardContent>
        </Card>

        {/* Classement */}
        <Card className="col-span-1 bg-orange-100 shadow-xl rounded-3xl py-4 flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="text-base">Classement</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-800 space-y-1">
              <p>
                Rang :{" "}
                <Badge className="bg-teal-600 text-white text-sm">
                  {rang ? `#${rang}` : "?"}
                </Badge>
              </p>
              <p>Sur 4 joueurs</p>
            </CardContent>
          </div>
          <CardFooter>
            <Button
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => navigate("/classement")}
            >
              Voir plus
            </Button>
          </CardFooter>
        </Card>

        {/* Historique des parties */}
        <Card className="col-span-2 bg-orange-100 shadow-xl rounded-3xl py-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Historique des Parties</CardTitle>
          </CardHeader>
          <CardContent className="h-48 overflow-hidden pt-0">
            <ScrollArea className="h-full pr-2">
              {parties.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  Aucune partie jouée
                </p>
              ) : (
                <div className="space-y-2">
                  {parties.map((partie, index) => {
                    const victoire = partie.gagnantsIds.includes(user.id)
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg py-2 px-3 shadow flex justify-between items-center text-sm"
                      >
                        <p className="font-semibold">
                          {victoire ? "✅ Victoire" : "❌ Défaite"} – {partie.pointsClassement} pts
                        </p>
                        <p className="text-xs text-gray-500">
                          Partie #{partie.id}
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
