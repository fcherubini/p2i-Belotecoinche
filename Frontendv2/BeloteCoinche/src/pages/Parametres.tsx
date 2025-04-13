// page paramètres contenant un simple bouton de retour vers l'accueil
// elle n'est là que pour indiquer que les paramètres de l'appli pourront être modifiés

import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

// composant parametres : affiche un titre et permet de retourner à la page d'accueil
const Parametres = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <Button onClick={() => navigate('/home')}>Retour Home</Button>
    </div>
  )
}

export default Parametres
