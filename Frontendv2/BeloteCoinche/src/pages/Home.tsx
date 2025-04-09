import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Gamepad2, Sword } from "lucide-react"
import CustomMenubar from "@/components/custom/menubarcustom"
import { Navigate, useNavigate } from "react-router-dom"

const Home: React.FC = () => {
  const [mode, setMode] = useState<"belote" | "coinche" | null>(null)

  const navigate = useNavigate()
  const handleStartGame = () => {
    if (!mode) return
    console.log("Mode choisi :", mode)
    navigate("/nouvelle-partie")
  }

  return (
    <div className="min-h-screen bg-teal-600 flex flex-col items-center justify-center text-white relative pb-28 px-4">
      <Card className="max-w-lg w-full bg-orange-100 text-gray-900 shadow-2xl rounded-2xl border border-orange-300">
        <CardHeader>
          <CardTitle className="text-2xl">Nouvelle Partie</CardTitle>
          <CardDescription>Choisissez votre mode de jeu :</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex space-x-4">
            {/* Belote */}
            <div
              onClick={() => setMode("belote")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                mode === "belote"
                  ? "bg-orange-200 border-orange-500"
                  : "bg-white border-gray-300"
              )}
            >
              <Gamepad2 className="h-8 w-8 text-orange-600 mb-2" />
              <span className="font-semibold">Belote</span>
            </div>

            {/* Coinche */}
            <div
              onClick={() => setMode("coinche")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                mode === "coinche"
                  ? "bg-orange-200 border-orange-500"
                  : "bg-white border-gray-300"
              )}
            >
              <Sword className="h-8 w-8 text-orange-600 mb-2" />
              <span className="font-semibold">Coinche</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleStartGame}
            disabled={!mode}
            className="mx-auto w-full bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            Démarrer la partie
          </Button>
        </CardFooter>
      </Card>

      {/* Menubar en bas */}
      <CustomMenubar active="accueil" />
    </div>
  )
}

export default Home
