// pages/Home.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      {/* Bouton Paramètres en haut à gauche */}
      <div className="p-4">
        <Button onClick={() => navigate('/parametres')}>Paramètres</Button>
      </div>

      {/* Zone centrale avec le bouton Nouvelle Partie */}
      <div className="flex justify-center">
        <Button onClick={() => navigate('/nouvelle-partie')}>
          Nouvelle Partie
        </Button>
      </div>

      {/* Barre de navigation en bas */}
      <div className="p-4 flex justify-around">
        <Button onClick={() => navigate('/profile')}>Profil</Button>
        <Button onClick={() => navigate('/classement')}>Classement</Button>
        <Button onClick={() => navigate('/actualites')}>Actualités</Button>
      </div>
    </div>
  );
};

export default Home;
