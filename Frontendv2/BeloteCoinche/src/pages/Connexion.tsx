import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Connexion = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/home')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-600 px-4">
      <Card className="w-full max-w-md bg-orange-100 shadow-2xl rounded-2xl border border-orange-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Connexion</CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="text-red-500 font-semibold text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-800">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-white border-gray-300 text-gray-900"
              />
            </div>

            <CardFooter className="px-0">
              <Button
                type="submit"
                className="w-full bg-teal-600 text-white hover:bg-teal-700 transition font-semibold"
              >
                Se connecter
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Connexion
