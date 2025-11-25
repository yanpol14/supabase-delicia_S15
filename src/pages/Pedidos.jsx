import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function Pedidos() {
  // --- ESTADOS ---
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CARGAR HISTORIAL DESDE SUPABASE ---
  useEffect(() => {
    const fetchPedidos = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Consulta SQL: Trae el pedido, los detalles y el nombre del producto
        const { data, error } = await supabase
          .from('pedidos')
          .select(`
            *,
            detalles_pedido (
              cantidad,
              precio_unitario,
              productos ( nombre, imagen_url )
            )
          `)
          .eq('id_usuario', user.id) // Solo los pedidos de ESTE usuario
          .order('fecha_pedido', { ascending: false }); // Los más recientes primero

        if (error) {
          console.error("Error al cargar pedidos:", error);
        } else {
          setPedidos(data);
        }
      }
      setLoading(false);
    };

    fetchPedidos();
  }, []);

  // --- RENDERIZADO ---
  return (
    <>
      {/* === HEADER === */}
      <header className="header-bg" style={{ 
          height: '300px', 
          background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80') center/cover" 
        }}>
        <div className="header-content" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center text-white">
            <h2 className="display-4 fw-bold mb-3">Mis Pedidos</h2>
            <p className="lead">Historial de tus compras recientes</p>
          </div>
        </div>
      </header>

      {/* === MAIN CON EL HISTORIAL === */}
      <main className="container py-5">
        
        {loading ? (
           // SPINNER DE CARGA
           <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status" style={{width: '3rem', height: '3rem'}}></div>
              <p className="mt-3 text-muted">Cargando tu historial...</p>
           </div>

        ) : pedidos.length === 0 ? (
           // MENSAJE SI NO HAY PEDIDOS
           <div className="text-center p-5 border rounded shadow-sm bg-light">
              <h3 className="text-muted mb-3">Aún no has realizado ninguna compra.</h3>
              <p className="mb-4">¡Nuestros productos frescos te están esperando!</p>
              <Link to="/productos" className="btn btn-warning btn-lg fw-bold text-dark shadow-sm">
                 <i className="bi bi-basket me-2"></i>Ir a Comprar
              </Link>
           </div>

        ) : (
          // LISTA DE PEDIDOS (TARJETAS)
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {pedidos.map((pedido) => (
                <div key={pedido.id_pedido} className="card shadow border-0 mb-4 overflow-hidden">
                  
                  {/* Cabecera de la Tarjeta (Fecha y Estado) */}
                  <div className="card-header bg-warning bg-opacity-10 d-flex justify-content-between align-items-center py-3">
                    <div>
                        <span className="fw-bold text-dark d-block">
                           <i className="bi bi-calendar-check-fill me-2 text-warning"></i>
                           {new Date(pedido.fecha_pedido).toLocaleDateString()} 
                           <small className="text-muted ms-2">({new Date(pedido.fecha_pedido).toLocaleTimeString().slice(0,5)})</small>
                        </span>
                        <small className="text-muted text-uppercase" style={{fontSize: '0.75rem'}}>ID: {pedido.id_pedido.slice(0,8)}</small>
                    </div>
                    
                    {/* CORRECCIÓN AQUÍ: Se agregaron las comillas invertidas ` ` */}
                    <span className={`badge ${pedido.estado === 'Pagado' ? 'bg-success' : 'bg-secondary'} rounded-pill px-3 py-2`}>
                       {pedido.estado}
                    </span>
                  </div>

                  <div className="card-body">
                    {/* Tabla de productos dentro del pedido */}
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="text-secondary" style={{fontSize: '0.85rem'}}>
                          <tr>
                            <th scope="col">Producto</th>
                            <th scope="col" className="text-center">Cant.</th>
                            <th scope="col" className="text-end">Precio Unit.</th>
                            <th scope="col" className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pedido.detalles_pedido.map((detalle, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="d-flex align-items-center">
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

                  {/* Pie de la tarjeta (Total) */}
                  <div className="card-footer bg-white border-top-0 d-flex justify-content-end align-items-center py-3">
                    <span className="text-muted me-3">Total del pedido:</span>
                    <h4 className="mb-0 fw-bold text-success">
                       S/. {pedido.total.toFixed(2)}
                    </h4>
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