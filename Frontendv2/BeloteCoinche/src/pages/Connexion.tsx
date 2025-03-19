// pages/Connexion.jsx
import React from 'react';
import { Card } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter votre logique de connexion si besoin
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6 shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Votre email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Votre mot de passe"
            />
          </div>
          <Button type="submit">Se connecter</Button>
        </form>
      </Card>
    </div>
  );
};

export default Connexion;
