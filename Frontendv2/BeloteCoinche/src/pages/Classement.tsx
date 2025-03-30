import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import CustomMenubar from "@/components/custom/menubarcustom"
import { useAuth } from "../contexts/AuthContext"

interface Profil {
  id: number
  blaze: string
  famille: string
  pointsClassement: number
}

const familleColor: Record<string, string> = {
  Rouge: "bg-red-500",
  Bleu: "bg-blue-500",
  Jaune: "bg-yellow-400",
  Vert: "bg-green-500",
  Orange: "bg-orange-500",
}

const familleBgOpacity: Record<string, string> = {
  Rouge: "bg-red-100",
  Bleu: "bg-blue-100",
  Jaune: "bg-yellow-100",
  Vert: "bg-green-100",
  Orange: "bg-orange-100",
}

const Classement: React.FC = () => {
  const { user } = useAuth()
  const [joueurs, setJoueurs] = useState<Profil[]>([])

  useEffect(() => {
    const fetchClassement = async () => {
      try {
        const response = await fetch("http://localhost:5123/api/profil/classement")
        const data = await response.json()
        setJoueurs(data)
      } catch (error) {
        console.error("Erreur lors du chargement du classement :", error)
      }
    }

    fetchClassement()
  }, [])

  const podium = joueurs.slice(0, 3)
  const autres = joueurs.slice(3)

  return (
    <div className="min-h-screen flex flex-col bg-teal-600 text-white px-4 pt-2 pb-28">
      {/* Podium */}
      {podium.length === 3 && (
        <div className="relative h-44 flex justify-center items-end gap-10 mt-8 mb-4">
          {/* 2e */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-sm font-bold mb-1">2</span>
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarFallback>{podium[1].blaze.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className={`w-3 h-3 rounded-full border-2 border-white mt-1 ${familleColor[podium[1].famille]}`} />
            <p className="text-sm mt-1">{podium[1].blaze}</p>
            <p className="text-xs">{podium[1].pointsClassement} pts</p>
            <div className="w-14 h-2 mt-1 rounded-t-full bg-gray-200 shadow" />
          </div>

          {/* 1er */}
          <div className="flex flex-col items-center mb-10 scale-110">
            <span className="text-sm font-bold mb-1">1</span>
            <Avatar className="w-20 h-20 border-4 border-white">
              <AvatarFallback>{podium[0].blaze.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className={`w-4 h-4 rounded-full border-2 border-white mt-1 ${familleColor[podium[0].famille]}`} />
            <p className="text-base font-bold mt-1">{podium[0].blaze}</p>
            <p className="text-sm">{podium[0].pointsClassement} pts</p>
            <div className="w-16 h-2 mt-1 rounded-t-full bg-yellow-300 shadow-md" />
          </div>

          {/* 3e */}
          <div className="flex flex-col items-center mb-3">
            <span className="text-sm font-bold mb-1">3</span>
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarFallback>{podium[2].blaze.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className={`w-3 h-3 rounded-full border-2 border-white mt-1 ${familleColor[podium[2].famille]}`} />
            <p className="text-sm mt-1">{podium[2].blaze}</p>
            <p className="text-xs">{podium[2].pointsClassement} pts</p>
            <div className="w-12 h-2 mt-1 rounded-t-full bg-gray-300 shadow" />
          </div>
        </div>
      )}

      {/* Liste scrollable */}
      <div className="bg-white text-gray-800 rounded-xl p-4 shadow-inner">
        <ScrollArea className="h-52 pr-2">
          {autres.map((player, index) => {
            const rank = index + 4
            const isUser = user?.id === player.id
            const bgHighlight = isUser ? familleBgOpacity[player.famille] : ""

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between py-2 border-b border-gray-200 rounded-lg px-2 ${
                  isUser ? `${bgHighlight}` : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rang stylé */}
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center">
                    {rank}
                  </span>

                  {/* Avatar + nom */}
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage src="" />
                    <AvatarFallback>{player.blaze.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{player.blaze}</span>

                  {/* Pastille de famille */}
                  <span className={`w-3 h-3 rounded-full ${familleColor[player.famille]}`} />
                </div>
                <span className="font-mono text-sm">{player.pointsClassement} pts</span>
              </div>
            )
          })}
        </ScrollArea>
      </div>

      {/* Barre de navigation */}
      <CustomMenubar active="classement" />
    </div>
  )
}

export default Classement
