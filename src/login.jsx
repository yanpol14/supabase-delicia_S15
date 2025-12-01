import React, { useState } from 'react';
import { supabase } from './supabaseClient'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState(''); // Solo se usa al registrarse
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Switch: true = Registro, false = Login
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;

      if (isSignUp) {
        // ==========================================
        // LÓGICA DE REGISTRO
        // ==========================================
        // Enviamos full_name para que el Trigger de SQL lo guarde en la tabla perfiles
        result = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: nombre } } 
        });
        
        const { error } = result;
        if (error) throw error;

        alert('Registro exitoso. ¡Ahora puedes iniciar sesión!');
        setIsSignUp(false); // Cambiamos automáticamente a la vista de Login

      } else {
        // ==========================================
        // LÓGICA DE INICIO DE SESIÓN
        // ==========================================
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        const { data, error } = result;
        if (error) throw error;

        // Login correcto. Ahora verificamos el ROL.
        const userId = data.user.id;
        
        // Consultamos la tabla 'perfiles'. 
        // Usamos .maybeSingle() para que NO falle si el usuario no tiene perfil creado.
        const { data: perfil, error: perfilError } = await supabase
          .from('perfiles')
          .select('rol')
          .eq('id', userId)
          .maybeSingle(); 

        if (perfilError) {
          console.error("Error al buscar perfil:", perfilError);
          // No detenemos el login, solo avisamos en consola
        }

        // Si perfil existe, usamos su rol. Si es null, forzamos 'usuario'.
        const rolUsuario = perfil ? perfil.rol : 'usuario';

        // Guardamos el rol para usarlo en el Navbar
        localStorage.setItem('userRole', rolUsuario);

        console.log("Bienvenido. Tu rol es:", rolUsuario);

        // Redirección según rol
        if (rolUsuario === 'administrador') {
            navigate('/pedidos'); // Admin va a su panel
        } else {
            navigate('/'); // Usuario va al inicio
        }
      }

    } catch (error) {
      console.error("Error completo:", error);
      
      // Mensaje amigable si es el error de "Email signups disabled"
      if (error.message.includes("Email signups are disabled")) {
        alert("Error de Configuración en Supabase: Debes habilitar el proveedor de Email en Authentication > Providers.");
      } else if (error.message.includes("Invalid login credentials")) {
        alert("Correo o contraseña incorrectos.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333' }}>{isSignUp ? 'Crear Cuenta Nueva' : 'Iniciar Sesión'}</h2>
      
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Campo Nombre: Solo visible en Registro */}
        {isSignUp && (
          <input
            type="text"
            placeholder="Tu Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required={isSignUp} // Solo requerido si es registro
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />

        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            padding: '12px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            background: isSignUp ? '#28a745' : '#ff9800', // Verde para registro, Naranja para login
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Cargando...' : (isSignUp ? 'Registrarse' : 'Ingresar')}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        {isSignUp ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}
        <br/>
        <span 
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }} 
          onClick={() => {
            setIsSignUp(!isSignUp);
            setEmail('');
            setPassword('');
            setNombre('');
          }}
        >
          {isSignUp ? 'Inicia sesión aquí' : 'Regístrate aquí'}
        </span>
      </div>
    </div>
  );
};

export default Login;