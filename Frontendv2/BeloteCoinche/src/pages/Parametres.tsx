import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Parametres = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <Button onClick={() => navigate('/home')}>Retour Home</Button>
    </div>
  );
};

export default Parametres;