import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import NouvellePartie from './pages/NouvellePartie';
import Regles from './pages/Regles';
import Parametres from './pages/Parametres';
import Actualites from './pages/Actualites';
import Classement from './pages/Classement';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import Inscription from './pages/Inscription';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/classement" element={<Classement />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/nouvelle-partie" element={<NouvellePartie />} />
          <Route path="/regles" element={<Regles />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
