import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function Pedidos() {
  // --- ESTADOS ---
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rol, setRol] = useState('usuario');

  // --- CARGAR DATOS ---
  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return; 

      const storedRole = localStorage.getItem('userRole');
      setRol(storedRole || 'usuario');

      // 2. Preparamos la consulta base
      // CORRECCIÓN AQUÍ: Cambiamos 'detalles_pedido' por 'detalle_pedidos' (el nombre real de tu tabla)
      let query = supabase
        .from('pedidos')
        .select(`
          *,
          detalle_pedidos (
            cantidad,
            precio_unitario,
            productos ( nombre, imagen_url )
          ),
          perfiles ( nombre, email ) 
        `)
        .order('fecha_pedido', { ascending: false });

      // 3. Si NO es admin, filtramos solo sus pedidos
      if (storedRole !== 'administrador') {
        query = query.eq('id_usuario', user.id);
      }

      const { data, error } = await query;

      if (error) {
          console.error("Error de Supabase:", error.message);
          throw error;
      }
      
      setPedidos(data);

    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // --- FUNCIÓN DE ADMIN: CAMBIAR ESTADO ---
  const handleCambiarEstado = async (idPedido, nuevoEstado) => {
    if (!window.confirm(`¿Estás seguro de cambiar el estado a "${nuevoEstado}"?`)) return;

    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ estado: nuevoEstado })
        .eq('id_pedido', idPedido);

      if (error) throw error;

      alert(`Pedido ${nuevoEstado} correctamente.`);
      fetchPedidos(); 

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el pedido.');
    }
  };

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'Aceptado': return 'bg-success'; 
      case 'Rechazado': return 'bg-danger'; 
      case 'En revisión': return 'bg-warning text-dark'; 
      default: return 'bg-secondary';
    }
  };

  // --- RENDERIZADO ---
  return (
    <>
      {/* === HEADER === */}
      <header className="header-bg" style={{ 
          height: '250px', 
          background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80') center/cover" 
        }}>
        <div className="header-content" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center text-white">
            <h2 className="display-4 fw-bold mb-3">
              {rol === 'administrador' ? '🛡️ Gestión de Pedidos' : 'Mis Pedidos'}
            </h2>
            <p className="lead">
              {rol === 'administrador' ? 'Administra las compras de todos los clientes' : 'Historial de tus compras recientes'}
            </p>
          </div>
        </div>
      </header>

      {/* === MAIN === */}
      <main className="container py-5">
        
        {loading ? (
           <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status" style={{width: '3rem', height: '3rem'}}></div>
              <p className="mt-3 text-muted">Cargando...</p>
           </div>

        ) : pedidos.length === 0 ? (
           <div className="text-center p-5 border rounded shadow-sm bg-light">
              <h3 className="text-muted mb-3">No hay pedidos registrados.</h3>
              {rol !== 'administrador' && (
                <Link to="/productos" className="btn btn-warning btn-lg fw-bold text-dark shadow-sm">
                   <i className="bi bi-basket me-2"></i>Ir a Comprar
                </Link>
              )}
           </div>

        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {pedidos.map((pedido) => (
                <div key={pedido.id_pedido} className="card shadow border-0 mb-4 overflow-hidden">
                  
                  {/* CABECERA TARJETA */}
                  <div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center py-3">
                    <div>
                        <span className="fw-bold text-dark d-block mb-1">
                           <i className="bi bi-calendar-event me-2 text-warning"></i>
                           {new Date(pedido.fecha_pedido).toLocaleDateString()} 
                           <small className="text-muted ms-2">({new Date(pedido.fecha_pedido).toLocaleTimeString().slice(0,5)})</small>
                        </span>
                        
                        {/* Datos del cliente (Solo Admin) */}
                        {rol === 'administrador' && pedido.perfiles && (
                          <div className="text-primary fw-bold small">
                            👤 Cliente: {pedido.perfiles.nombre || pedido.perfiles.email || 'Anónimo'}
                          </div>
                        )}
                        
                        <small className="text-muted text-uppercase" style={{fontSize: '0.75rem'}}>ID: {pedido.id_pedido.slice(0,8)}</small>
                    </div>
                    
                    <span className={`badge ${getBadgeColor(pedido.estado)} rounded-pill px-3 py-2 fs-6`}>
                        {pedido.estado}
                    </span>
                  </div>

                  <div className="card-body">
                    {/* Tabla de productos (Usamos detalle_pedidos) */}
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="text-secondary small">
                          <tr>
                            <th scope="col">Producto</th>
                            <th scope="col" className="text-center">Cant.</th>
                            <th scope="col" className="text-end">Precio</th>
                            <th scope="col" className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* OJO: Aquí también debe coincidir con el nombre de la tabla */}
                          {pedido.detalle_pedidos && pedido.detalle_pedidos.map((detalle, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="d-flex align-items-center">
                                    {detalle.productos?.imagen_url && (
                                      <img src={detalle.productos.imagen_url} alt="img" className="rounded-circle me-2" style={{width:'30px', height:'30px', objectFit:'cover'}} />
                                    )}
                                    <span className="fw-500">{detalle.productos?.nombre || 'Producto eliminado'}</span>
                                </div>
                              </td>
                              <td className="text-center fw-bold">{detalle.cantidad}</td>
                              <td className="text-end text-muted">S/. {detalle.precio_unitario}</td>
                              <td className="text-end fw-bold">S/. {(detalle.precio_unitario * detalle.cantidad).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card-footer bg-white d-flex flex-wrap justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                        <span className="text-muted me-2">Total:</span>
                        <h4 className="mb-0 fw-bold text-success">S/. {pedido.total.toFixed(2)}</h4>
                    </div>

                    {rol === 'administrador' && pedido.estado === 'En revisión' && (
                      <div className="d-flex gap-2 mt-2 mt-sm-0">
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCambiarEstado(pedido.id_pedido, 'Rechazado')}
                        >
                          ✕ Rechazar
                        </button>
                        <button 
                          className="btn btn-success btn-sm fw-bold"
                          onClick={() => handleCambiarEstado(pedido.id_pedido, 'Aceptado')}
                        >
                          ✓ Aceptar Pedido
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Pedidos;