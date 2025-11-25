import React from 'react';
import { supabase } from '../supabaseClient'; // Ajusta la ruta: desde src/components subir 1 nivel a src
import { useNavigate } from 'react-router-dom';

// Recibimos 'cart' y 'setCart' desde App.jsx
function ShoppingCart({ cart, setCart }) {
  const navigate = useNavigate();

  // Alias para usar tu nomenclatura
  const cartItems = cart;

  // --- LÓGICA DE MANEJO DE ESTADO (Para que funcionen los botones +/-/Eliminar) ---
  const onRemoveItem = (id) => {
    const nuevoCarrito = cart.filter(item => item.id_producto !== id);
    setCart(nuevoCarrito);
  };

  const onChangeQuantity = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; // No permitir 0 o negativos
    
    // Verificamos que no exceda el stock (Opcional pero recomendado)
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
  // -------------------------------------------------------------------------------

  const total = cartItems.reduce((acc, item) => {
    return acc + (item.precio * item.cantidad);
  }, 0);

  const handlePagar = async () => {
    // 1. Validar si hay usuario logueado
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Para procesar la compra, necesitas iniciar sesión.");
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const confirmacion = window.confirm(`¿Confirmar el pago por S/. ${total.toFixed(2)}?`);

    if (!confirmacion) return;

    try {
      // 2. Crear el Pedido (Cabecera) en Supabase
      const { data: pedidoData, error: errorPedido } = await supabase
        .from('pedidos')
        .insert([{
            id_usuario: user.id,
            total: total,
            estado: 'Pagado',
            fecha_pedido: new Date()
        }])
        .select()
        .single();

      if (errorPedido) throw errorPedido;

      const idPedidoNuevo = pedidoData.id_pedido;

      // 3. Procesar cada producto (Detalles y Stock)
      for (const item of cartItems) {
        
        // A. Insertar Detalle
        const { error: errorDetalle } = await supabase
          .from('detalles_pedido')
          .insert({
             id_pedido: idPedidoNuevo,
             id_producto: item.id_producto,
             cantidad: item.cantidad,
             precio_unitario: item.precio
          });
        
        if (errorDetalle) throw errorDetalle;

        // B. Actualizar Stock
        // Intentamos usar la función segura RPC primero
        const { error: errorRPC } = await supabase
          .rpc('restar_stock', {
            p_id: item.id_producto,
            p_cantidad: item.cantidad
          });
        
        // Si falla el RPC (o no existe), usamos el método directo como respaldo
        if (errorRPC) {
            console.warn("Usando método directo para stock...", errorRPC);
            const nuevoStock = item.stock - item.cantidad;
            await supabase
              .from("productos")
              .update({ stock: nuevoStock })
              .eq("id_producto", item.id_producto);
        }
      }

      // 4. Éxito
      alert('¡Gracias por su compra! Su pedido ha sido registrado.');
      setCart([]); // Vaciamos el carrito
      navigate('/pedidos'); // Redirigimos al historial

    } catch (error) {
      console.error("Error en el pago:", error);
      alert("Ocurrió un error al procesar la compra: " + error.message);
    }
  };

  return (
    <div className="container mt-4 mb-5"> {/* Agregué container para centrar */}
      <div className="carrito shadow-sm" style={{ position: 'sticky', top: '20px' }}>
        <div className="card">

          {/* HEADER */}
          <div className="card-header bg-dark text-white text-center">
            <h4 className="mb-0">
              <i className="bi bi-cart-fill me-2"></i>Tu carrito
            </h4>
          </div>

          {/* ITEMS */}
          <div className="card-body carrito-items" style={{maxHeight: '60vh', overflowY: 'auto'}}>
            {cartItems.length === 0 && (
              <div className="text-center py-4">
                 <p className="text-muted fs-5">Tu carrito está vacío</p>
                 <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/productos')}>Ver Productos</button>
              </div>
            )}

            {cartItems.map(item => (
              <div className="carrito-item d-flex align-items-center mb-3 pb-3 border-bottom" key={item.id_producto}>
                
                {/* Imagen */}
                <img
                  src={item.imagen_url}
                  alt={item.nombre}
                  width="80"
                  height="80"
                  className="img-fluid me-3 rounded shadow-sm"
                  style={{objectFit: 'cover'}}
                />

                {/* Info */}
                <div className="flex-grow-1">
                  <span className="carrito-item-titulo d-block fw-bold text-uppercase text-dark">
                    {item.nombre}
                  </span>

                  <span className="carrito-item-precio d-block text-muted">
                    S/. {Number(item.precio).toFixed(2)}
                  </span>

                  {/* Controles de cantidad */}
                  <div className="selector-cantidad mt-2 d-flex align-items-center bg-light rounded p-1" style={{width: 'fit-content'}}>
                    {/* BOTÓN - */}
                    <i
                      className="bi bi-dash-circle-fill text-secondary"
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => onChangeQuantity(item.id_producto, item.cantidad - 1)}
                    ></i>

                    {/* Cantidad */}
                    <span
                      className="mx-3 fw-bold"
                      style={{ fontSize: "16px", minWidth: "20px", textAlign: "center" }}
                    >
                      {item.cantidad}
                    </span>

                    {/* BOTÓN + */}
                    <i
                      className="bi bi-plus-circle-fill text-success"
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => onChangeQuantity(item.id_producto, item.cantidad + 1)}
                    ></i>
                  </div>
                </div>

                {/* BOTÓN ELIMINAR */}
                <button
                  className="btn btn-outline-danger btn-sm ms-3"
                  title="Eliminar producto"
                  onClick={() => onRemoveItem(item.id_producto)}
                >
                    <i className="bi bi-trash-fill"></i>
                </button>

              </div>
            ))}
          </div>

          {/* FOOTER */}
          {cartItems.length > 0 && (
            <div className="card-footer carrito-total bg-light">
              <div className="fila d-flex justify-content-between align-items-center mb-3">
                <strong className="fs-5">Total a Pagar</strong>
                <span className="fs-4 fw-bold text-success">
                  S/. {total.toFixed(2)}
                </span>
              </div>

              <button
                className="btn w-100 btn-lg shadow"
                style={{ background: "#ffc107", fontWeight: "bold", color: "#333" }}
                onClick={handlePagar}
              >
                <i className="bi bi-credit-card-fill me-2"></i> FINALIZAR COMPRA
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;