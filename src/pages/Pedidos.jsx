import React, { useState } from 'react'; // ¡Importa useState!

function Pedidos() {
  // --- ESTADOS (Tu lógica de formulario) ---
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);

  // --- MANEJADOR DEL ENVÍO (Tu lógica de formulario) ---
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene que la página se recargue
    const pedido = {
      nombre: nombre,
      producto: producto,
      cantidad: cantidad,
    };
    console.log('¡Pedido Enviado!', pedido);
    alert(`¡Gracias ${nombre}! Hemos recibido tu pedido de ${cantidad} x ${producto}.`);
    // Limpiamos el formulario
    setNombre('');
    setProducto('');
    setCantidad(1);
  };

  // --- RENDERIZADO (La Fusión) ---
  return (
    <>
      {/* === 1. EL HEADER QUE FALTABA (Traducido a JSX) === */}
      {/* (Sin el <nav>, que ya está en App.jsx) */}
      <header className="header-bg" style={{ height: '400px' }}>
        <div className="header-overlay"></div>
        <div className="header-content" style={{ height: '100%', position: 'relative', zIndex: 2 }}>
          
          {/* El Título único de la página "Pedidos" */}
          <div className="d-flex align-items-center justify-content-center" style={{ height: '320px' }}>
            <div className="text-center text-white w-100">
              <h2 className="display-4 fw-bold mb-3">Haz tu Pedido</h2>
              <p className="lead mb-4">Solicita tus productos favoritos aquí</p>
            </div>
          </div>

        </div>
      </header>

      {/* === 2. EL MAIN CON EL FORMULARIO (Tu lógica de formulario) === */}
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-lg border-warning">
              <div className="card-body">
                <h2 className="text-center mb-4 fw-bold text-danger">Haz tu Pedido</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label text-warning fw-bold">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control border-danger"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="producto" className="form-label text-warning fw-bold">Producto:</label>
                    <input
                      type="text"
                      id="producto"
                      className="form-control border-danger"
                      required
                      value={producto}
                      onChange={(e) => setProducto(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label text-warning fw-bold">Cantidad:</label>
                    <input
                      type="number"
                      id="cantidad"
                      className="form-control border-danger"
                      min="1"
                      required
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-panaderia w-100 fw-bold">Enviar Pedido</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Pedidos;