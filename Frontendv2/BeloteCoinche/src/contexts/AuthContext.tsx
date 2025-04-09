import React, { createContext, useState, useEffect, useContext } from "react"

export interface User {
  id: number
  blaze: string
  mail: string
  famille: string
  duoFavId?: number | null
  victoires: number
  totalParties: number
  winRate: number
  pointsClassement: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  setUser: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5123/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data: User = await response.json()
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
      } else {
        throw new Error("Échec de la connexion")
      }
    } catch (error: any) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("storage"))
  }

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user")
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    window.addEventListener("storage", checkAuth)
    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
