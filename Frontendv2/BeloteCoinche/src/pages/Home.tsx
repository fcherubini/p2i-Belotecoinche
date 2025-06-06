// page d'accueil permettant à l'utilisateur de choisir un mode de jeu (belote ou coinche),
// puis de démarrer une nouvelle partie en le redirigeant vers l'écran de configuration

import { useState } from "react"
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Gamepad2, Sword } from "lucide-react"
import CustomMenubar from "@/components/custom/menubarcustom"
import { useNavigate } from "react-router-dom"

const Home: React.FC = () => {
  const [mode, setMode] = useState<"belote" | "coinche" | null>(null)

  const navigate = useNavigate()

  // démarre une nouvelle partie si un mode est sélectionné, en redirigeant vers la page de création
  const handleStartGame = () => {
    if (!mode) return
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
            {/* belote */}
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

            {/* coinche */}
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

      <CustomMenubar active="accueil" />
    </div>
  )
}

export default Home
