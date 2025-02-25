export default function InputField({ type, name, placeholder, onChange }) {
    return (
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        className="w-full p-3 mb-3 border rounded text-lg" 
        onChange={onChange} 
      />
    );
  }
  