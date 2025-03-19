import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Regles = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Règles</h1>
      <Button onClick={() => navigate('/nouvelle-partie')}>
        Retour Nouvelle Partie
      </Button>
    </div>
  );
};

export default Regles;