import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Home from "./pages/Home";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
