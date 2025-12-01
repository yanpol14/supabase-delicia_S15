import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 

function Navbar() {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Ver si ya hay sesión al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      const storedRole = localStorage.getItem('userRole');
      if (session && storedRole) {
        setRol(storedRole);
      }
    });

    // 2. Escuchar cambios en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN') {
        setRol(localStorage.getItem('userRole'));
      } else if (event === 'SIGNED_OUT') {
        setRol(null);
        localStorage.removeItem('userRole');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userRole');
    setRol(null);
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-gradient navbar-dark shadow-sm" style={{background: 'linear-gradient(90deg, #d35400 0%, #e67e22 100%)'}}> 
      <div className="container">
        
        <Link className="navbar-brand fw-bold" to="/" style={{color:"#fff"}}>Panadería Delicia</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            
            {/* Enlaces Públicos */}
            <li className="nav-item"><Link className="nav-link fw-bold" to="/" style={{color:"#fff"}}>Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold" to="/productos" style={{color:"#fff"}}>Productos</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold" to="/nosotros" style={{color:"#fff"}}>Nosotros</Link></li>

            {/* Lógica Condicional de Usuario/Admin */}
            {user ? (
              <>
                {/* SI ES ADMIN */}
                {rol === 'administrador' ? (
                   <>
                     {/* Botón Gestión Pedidos */}
                     <li className="nav-item">
                       <Link className="nav-link fw-bold" to="/pedidos" style={{color:"#FFD700", borderBottom: '1px solid #FFD700'}}>
                         ⚠️ GESTIONAR PEDIDOS
                       </Link>
                     </li>

                     {/* NUEVO: Botón Agregar Producto (Solo Admin) */}
                     <li className="nav-item ms-lg-2">
                       <Link className="btn btn-light btn-sm fw-bold text-dark mt-2 mt-lg-0" to="/agregar-producto">
                         + Nuevo Producto
                       </Link>
                     </li>
                   </>
                ) : (
                   /* SI ES USUARIO */
                   <li className="nav-item">
                     <Link className="nav-link fw-bold" to="/pedidos" style={{color:"#fff"}}>
                       Mis Pedidos
                     </Link>
                   </li>
                )}
                
                <li className="nav-item ms-2">
                  <span className="fw-bold" style={{color:"#eef", fontSize: '0.9rem'}}>
                    Hola, {user.user_metadata.full_name?.split(' ')[0] || 'Cliente'}
                  </span>
                </li>

                <li className="nav-item ms-2">
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-sm btn-outline-light" 
                    style={{border: '1px solid #fff'}}
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/login" style={{color:"#fff", textDecoration: 'underline'}}>Ingresar</Link>
              </li>
            )}
            
             {/* Icono del Carrito */}
             <li className="nav-item ms-3">
               <Link to="/carrito" className="nav-link" style={{color:"#fff", fontSize: '1.2rem'}}>
                 🛒
               </Link>
             </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;