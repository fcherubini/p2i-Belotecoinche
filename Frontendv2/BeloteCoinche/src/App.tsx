import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Connexion from './pages/Connexion';

import Profil from './pages/Profil';


import NouvellePartie from './pages/NouvellePartie';
import Regles from './pages/Regles';
import Parametres from './pages/Parametres';
import Actualites from './pages/Actualites';
import Classement from './pages/Classement';
import { Home } from 'lucide-react';


function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion accessible sur "/" */}
        <Route path="/" element={<Connexion />} />
        {/* Page d'accueil */}
        <Route path="/home" element={<Home />} />
        {/* Autres pages */}
        <Route path="/profil" element={<Profil />} />
        <Route path="/classement" element={<Classement />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/nouvelle-partie" element={<NouvellePartie />} />
        <Route path="/regles" element={<Regles />} />

        {/* Redirection pour toute route non reconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
