// src/components/CustomMenubar.tsx
import React from "react"
import { useNavigate } from "react-router-dom"

// Imports shadcn UI Menubar
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar"

// Imports shadcn UI Avatar
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar"
import { Button } from "../ui/button"

const CustomMenubar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Menubar className= "fixed bottom-4 left-4 right-4 z-50 h-14 flex items-center px-6 space-x-6 bg-teal-500 text-white rounded-t-lg shadow-lg">
      {/* 1) Avatar à gauche, cliquable vers /profil */}
      <MenubarMenu>
  <MenubarTrigger
    className="cursor-pointer select-none focus:outline-none"
    onClick={() => navigate("/profil")}
  >
    <Avatar className="w-16 h-16 -mb-4 transition duration-200 hover:scale-105 hover:ring-2 hover:ring-teal-400">
      <AvatarImage src="https://github.com/shadcn.png" alt="Mon avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  </MenubarTrigger>
</MenubarMenu>



      {/* 2) Classement */}
      <MenubarMenu>
        <MenubarTrigger
          className="cursor-pointer select-none focus:outline-none"
          onClick={() => navigate("/classement")}
        >
          <Button
          onClick={() => navigate("/classement")}
          className="mx-auto w-full bg-teal-500 text-white hover:bg-teal-600"
        >
          Classement
        </Button>
        </MenubarTrigger>
      </MenubarMenu>

      {/* 3) Actualités */}
      <MenubarMenu>
        <MenubarTrigger
          className="cursor-pointer select-none focus:outline-none"
          onClick={() => navigate("/actualites")}
        >
          <Button
          onClick={() => navigate("/actualites")}
          className="mx-auto w-full bg-teal-500 text-white hover:bg-teal-600"
        >
          Actualités
        </Button>
        </MenubarTrigger>
      </MenubarMenu>

      {/* 4) Nouvelle Partie */}
      <MenubarMenu>
        <MenubarTrigger
          className="cursor-pointer select-none focus:outline-none"
          onClick={() => navigate("/nouvelle-partie")}
        >
          <Button
          onClick={() => navigate("/classement")}
          className="mx-auto w-full bg-teal-500 text-white hover:bg-teal-600"
        >
          Règles
        </Button>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}

export default CustomMenubar
