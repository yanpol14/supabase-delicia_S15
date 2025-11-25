import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Ajustado a tu estructura
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState(''); // Solo para registro
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Switch entre Login y Registro
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        // REGISTRO
        result = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: nombre } } 
        });
      } else {
        // LOGIN
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      const { error } = result;
      if (error) throw error;

      if (isSignUp) {
        alert('Registro exitoso. Revisa tu correo o inicia sesión.');
        setIsSignUp(false);
      } else {
        // Redirigir al Home o al Carrito
        navigate('/'); 
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleAuth}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
          />
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px' }}>
          {loading ? 'Procesando...' : (isSignUp ? 'Registrarse' : 'Ingresar')}
        </button>
      </form>
      
      <p style={{ marginTop: '20px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
      </p>
    </div>
  );
};

export default Login;