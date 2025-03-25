import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CustomMenubar from '@/components/custom/menubarcustom';
import CardNouvellePartieV2 from '@/components/custom/cardnouvellepartie';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-teal-600">
      <div className="min-h-screen bg-teal-600 flex items-center justify-center">
      <CardNouvellePartieV2 />
      </div>
      {/* Bouton Paramètres en haut à gauche */}
      <div className="p-4">
        <Button onClick={() => navigate('/parametres')}>Paramètres</Button>
      </div>
      <CustomMenubar/>
    </div>
    
  );
};

export default Home;
