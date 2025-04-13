// page d'inscription permettant à un utilisateur de créer un compte et de choisir sa famille

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from '@/components/ui/select'

// composant inscription : envoie les infos du formulaire à l'api pour créer un compte
const Inscription = () => {
  const navigate = useNavigate()
  const [blaze, setBlaze] = useState('')
  const [mail, setMail] = useState('')
  const [mdp, setMdp] = useState('')
  const [famille, setFamille] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('http://localhost:5123/api/profil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blaze,
          mail,
          mdp,
          famille: parseInt(famille),
          duoFavId: null,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => navigate('/connexion'), 1500)
      } else {
        const msg = await response.text()
        setError(msg || "Erreur lors de la création du compte")
      }
    } catch (err) {
      setError("Erreur serveur")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-600 px-4">
      <Card className="w-full max-w-md bg-orange-100 shadow-2xl rounded-2xl border border-orange-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Inscription</CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="text-red-500 font-semibold text-sm mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-600 font-semibold text-sm mb-4">
              Compte créé ! Redirection en cours...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="blaze" className="text-gray-800">Blaze</Label>
              <Input
                id="blaze"
                type="text"
                placeholder="Pseudo"
                value={blaze}
                onChange={(e) => setBlaze(e.target.value)}
                className="mt-1 bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div>
              <Label htmlFor="mail" className="text-gray-800">Email</Label>
              <Input
                id="mail"
                type="email"
                placeholder="votre@email.com"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="mt-1 bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div>
              <Label htmlFor="mdp" className="text-gray-800">Mot de passe</Label>
              <Input
                id="mdp"
                type="password"
                placeholder="********"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                className="mt-1 bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div>
              <Label htmlFor="famille" className="text-gray-800">Famille</Label>
              <Select value={famille} onValueChange={(value) => setFamille(value)}>
                <SelectTrigger className="mt-1 bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Choisissez votre famille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Rouge</SelectItem>
                  <SelectItem value="1">Bleu</SelectItem>
                  <SelectItem value="2">Jaune</SelectItem>
                  <SelectItem value="3">Vert</SelectItem>
                  <SelectItem value="4">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CardFooter className="px-0">
              <Button
                type="submit"
                className="w-full bg-teal-600 text-white hover:bg-teal-700 transition font-semibold"
              >
                Créer mon compte
              </Button>
            </CardFooter>

            <p className="text-center text-sm text-gray-700 mt-4">
              Déjà un compte ?{' '}
              <button
                onClick={() => navigate('/connexion')}
                className="text-teal-700 font-semibold hover:underline"
              >
                Se connecter
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inscription
