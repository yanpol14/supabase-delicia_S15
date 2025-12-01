import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

function ShoppingCart({ cart, setCart }) {
  const navigate = useNavigate();

  // --- LÓGICA DE CARRITO (Sumar, Restar, Eliminar) ---
  const onRemoveItem = (id) => {
    const nuevoCarrito = cart.filter(item => item.id_producto !== id);
    setCart(nuevoCarrito);
  };

  const onChangeQuantity = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; 
    const producto = cart.find(item => item.id_producto === id);
    if (producto && nuevaCantidad > producto.stock) {
      alert(`Solo quedan ${producto.stock} unidades de este producto.`);
      return;
    }
    const nuevoCarrito = cart.map(item => 
      item.id_producto === id ? { ...item, cantidad: nuevaCantidad } : item
    );
    setCart(nuevoCarrito);
  };

  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // --- LÓGICA DE NAVEGACIÓN ---
  const handleIrAPagar = async () => {
    // 1. Validar usuario antes de ir a confirmar
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Para continuar, necesitas iniciar sesión.");
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 2. Si todo está bien, mandamos a la página de Confirmación
    navigate('/confirmar-pedido'); 
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h4 className="mb-0"><i className="bi bi-cart-fill me-2"></i>Tu carrito</h4>
        </div>

        <div className="card-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {cart.length === 0 ? (
             <div className="text-center py-4">
               <p className="text-muted">Tu carrito está vacío</p>
               <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/productos')}>Ver Productos</button>
             </div>
          ) : (
             cart.map(item => (
               <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2" key={item.id_producto}>
                 <div className="d-flex align-items-center">
                    <img src={item.imagen_url} alt={item.nombre} width="60" className="rounded me-3" />
                    <div>
                      <h6 className="mb-0">{item.nombre}</h6>
                      <small className="text-muted">S/. {Number(item.precio).toFixed(2)}</small>
                    </div>
                 </div>
                 <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-light mx-1" onClick={() => onChangeQuantity(item.id_producto, item.cantidad - 1)}>-</button>
                    <span className="fw-bold mx-2">{item.cantidad}</span>
                    <button className="btn btn-sm btn-light mx-1" onClick={() => onChangeQuantity(item.id_producto, item.cantidad + 1)}>+</button>
                    <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => onRemoveItem(item.id_producto)}>🗑️</button>
                 </div>
               </div>
             ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="card-footer bg-light">
             <div className="d-flex justify-content-between mb-3">
               <strong>Total:</strong>
               <span className="text-success fw-bold">S/. {total.toFixed(2)}</span>
             </div>
             {/* ESTE BOTÓN AHORA SOLO REDIRIGE */}
             <button className="btn btn-warning w-100 fw-bold" onClick={handleIrAPagar}>
               CONTINUAR A CONFIRMACIÓN →
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;