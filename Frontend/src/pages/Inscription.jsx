import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

export default function Inscription() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ blaze: '', email: '', famille: '', duo: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-cream px-8">
      <div className="p-8 bg-white rounded-2xl shadow-lg text-center w-96">
        <h2 className="text-2xl font-bold text-green mb-6">Inscription</h2>
        <InputField type="email" name="email" placeholder="Email" onChange={handleChange} />
        <InputField type="text" name="blaze" placeholder="Nom d'utilisateur" onChange={handleChange} />
        <InputField type="text" name="famille" placeholder="Famille" onChange={handleChange} />
        <InputField type="text" name="duo" placeholder="Duo Favori" onChange={handleChange} />
        <InputField type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
        <InputField type="password" name="confirmPassword" placeholder="Confirmer mot de passe" onChange={handleChange} />
        <button 
          className="w-full bg-green text-white py-3 rounded-lg font-bold text-lg hover:bg-darkGreen"
          onClick={() => navigate('/home')}
        >Créer mon compte</button>
      </div>
    </div>
  );
}
