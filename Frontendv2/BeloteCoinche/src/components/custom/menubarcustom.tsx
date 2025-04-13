// composant de barre de navigation fixe en bas de l'écran, avec indication de la page active

import { useNavigate } from "react-router-dom"
import {
  Menubar, MenubarMenu, MenubarTrigger
} from "@/components/ui/menubar"
import {
  Avatar, AvatarImage, AvatarFallback
} from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { Trophy, Newspaper, Book, Settings, Home } from "lucide-react"

interface CustomMenubarProps {
  active?: "classement" | "actualites" | "regles" | "parametres" | "accueil"
}

// composant custommenubar : affiche une barre avec navigation et avatar, et gère la mise en évidence de la page active
const CustomMenubar: React.FC<CustomMenubarProps> = ({ active }) => {
  const navigate = useNavigate()

  return (
    <Menubar className="fixed bottom-4 left-4 right-4 z-50 h-20 flex items-center justify-between px-6 bg-teal-500 text-white rounded-xl shadow-xl border border-white/10">
      <div className="flex items-center space-x-6">
        <MenubarMenu>
          <MenubarTrigger
            className="cursor-pointer focus:outline-none"
            onClick={() => navigate("/profil")}
          >
            <Avatar className="w-16 h-16 transition duration-200 hover:scale-105 hover:ring-2 hover:ring-white">
              <AvatarImage
                src="https://cdn.pixabay.com/photo/2023/04/20/20/53/ai-generated-7939816_960_720.png"
                alt="avatar"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
        </MenubarMenu>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/home")}
            className={`hover:bg-teal-600 flex items-center gap-2 font-semibold ${
              active === "accueil" ? "bg-white text-teal-700" : "text-white"
            }`}
          >
            <Home size={18} />
            Accueil
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/classement")}
            className={`hover:bg-teal-600 flex items-center gap-2 font-semibold ${
              active === "classement" ? "bg-white text-teal-700" : "text-white"
            }`}
          >
            <Trophy size={18} />
            Classement
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/actualites")}
            className={`hover:bg-teal-600 flex items-center gap-2 font-semibold ${
              active === "actualites" ? "bg-white text-teal-700" : "text-white"
            }`}
          >
            <Newspaper size={18} />
            Actualités
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/regles")}
            className={`hover:bg-teal-600 flex items-center gap-2 font-semibold ${
              active === "regles" ? "bg-white text-teal-700" : "text-white"
            }`}
          >
            <Book size={18} />
            Règles
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate("/parametres")}
        className={`hover:bg-teal-600 flex items-center gap-2 font-semibold ${
          active === "parametres" ? "bg-white text-teal-700" : "text-white"
        }`}
      >
        <Settings size={18} />
        Paramètres
      </Button>
    </Menubar>
  )
}

export default CustomMenubar
