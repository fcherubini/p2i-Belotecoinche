import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NouvellePartie = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Nouvelle Partie</h1>
      <Button onClick={() => navigate('/regles')}>Règles</Button>
      <Button onClick={() => navigate('/home')} className="mt-4">
        Retour Home
      </Button>
    </div>
  );
};

export default NouvellePartie;