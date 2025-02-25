import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

export default function Connexion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ blaze: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-cream px-8">
      <div className="p-8 bg-white rounded-2xl shadow-lg text-center w-96">
        <h2 className="text-2xl font-bold text-green mb-6">Connexion</h2>
        <InputField type="text" name="blaze" placeholder="Nom d'utilisateur" onChange={handleChange} />
        <InputField type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
        <button 
          className="w-full bg-green text-white py-3 rounded-lg mb-3 font-bold text-lg hover:bg-darkGreen"
          onClick={() => navigate('/home')}
        >Se connecter</button>
        <button 
          className="w-full bg-gray-300 py-3 rounded-lg font-bold text-lg hover:bg-gray-400"
          onClick={() => navigate('/inscription')}
        >Je n'ai pas encore de compte</button>
      </div>
    </div>
  );
}
