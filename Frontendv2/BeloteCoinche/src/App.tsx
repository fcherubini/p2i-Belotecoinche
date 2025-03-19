import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connexion from './pages/Connexion';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        {/* Vous pourrez ajouter d’autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
