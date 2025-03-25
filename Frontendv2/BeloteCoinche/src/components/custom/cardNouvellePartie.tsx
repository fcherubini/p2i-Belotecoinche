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

const CardNouvellePartieV2: React.FC = () => {
  const [mode, setMode] = useState<"belote" | "coinche" | null>(null)

  const handleStartGame = () => {
    if (!mode) return
    console.log("Mode choisi :", mode)
  }

  return (
    <Card className="max-w-lg w-full bg-gray-100 text-gray-900 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Nouvelle Partie</CardTitle>
        <CardDescription>
          Choisissez votre mode de jeu :
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex space-x-4">
          {/* Bloc Belote */}
          <div
            onClick={() => setMode("belote")}
            className={cn(
              "flex-1 flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer",
              mode === "belote" ? "bg-teal-200 border-teal-600" : "border-gray-300"
            )}
          >
            <img
              src="/images/belote-icon.png"
              alt="Belote"
              className="h-12 w-12 mb-2"
            />
            <span className="font-semibold">Belote</span>
          </div>

          {/* Bloc Coinche */}
          <div
            onClick={() => setMode("coinche")}
            className={cn(
              "flex-1 flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer",
              mode === "coinche" ? "bg-teal-200 border-teal-600" : "border-gray-300"
            )}
          >
            <img
              src="/images/coinche-icon.png"
              alt="Coinche"
              className="h-12 w-12 mb-2"
            />
            <span className="font-semibold">Coinche</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleStartGame}
          className="mx-auto w-full bg-teal-600 text-white hover:bg-teal-700"
        >
          Démarrer la partie
        </Button>
      </CardFooter>

    </Card>
  )
}

export default CardNouvellePartieV2
