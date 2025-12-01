import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function ConfirmarPedido({ cart, setCart }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  useEffect(() => {
    // Verificar sesión al cargar
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/login');
      setUser(user);
    };
    getUser();
    
    // Si recargan la página y no hay carrito, volver al inicio
    if (cart.length === 0) navigate('/productos');
  }, [cart, navigate]);

  const handleFinalizarCompra = async () => {
    if (!window.confirm(`¿Confirmar compra por S/. ${total.toFixed(2)}?`)) return;

    try {
      // 1. Crear Pedido (Con estado 'En revisión' para que la BD no falle)
      const { data: pedidoData, error: errorPedido } = await supabase
        .from('pedidos')
        .insert([{
            id_usuario: user.id,
            total: total,
            estado: 'En revisión', // CORREGIDO: Coincide con tu BD
            fecha_pedido: new Date()
        }])
        .select()
        .single();

      if (errorPedido) throw errorPedido;

      const idPedidoNuevo = pedidoData.id_pedido;

      // 2. Insertar Detalles
      for (const item of cart) {
        const { error: errorDetalle } = await supabase
          .from('detalle_pedidos') 
          .insert({
             id_pedido: idPedidoNuevo,
             id_producto: item.id_producto,
             cantidad: item.cantidad,
             precio_unitario: item.precio
          });
        
        if (errorDetalle) throw errorDetalle;

        // 3. Restar Stock (Intentamos RPC, si no update normal)
        const { error: errorRPC } = await supabase.rpc('restar_stock', {
            p_id: item.id_producto,
            p_cantidad: item.cantidad
        });

        if (errorRPC) {
            const nuevoStock = item.stock - item.cantidad;
            await supabase.from("productos").update({ stock: nuevoStock }).eq("id_producto", item.id_producto);
        }
      }

      alert('¡Pedido registrado correctamente! Espera la aprobación del administrador.');
      setCart([]); // Limpiar carrito
      navigate('/pedidos'); // Ir al historial

    } catch (error) {
      console.error(error);
      alert("Error al procesar: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
       <h2 className="text-center mb-4">Resumen de tu Pedido</h2>
       
       <div className="row justify-content-center">
         <div className="col-md-8">
           <div className="card shadow">
             <div className="card-body">
               <h5 className="card-title border-bottom pb-2">Productos</h5>
               <ul className="list-group list-group-flush mb-3">
                 {cart.map((item) => (
                   <li key={item.id_producto} className="list-group-item d-flex justify-content-between align-items-center">
                     <div>
                       <span className="fw-bold">{item.nombre}</span> <br/>
                       <small className="text-muted">Cant: {item.cantidad} x S/. {item.precio}</small>
                     </div>
                     <span>S/. {(item.cantidad * item.precio).toFixed(2)}</span>
                   </li>
                 ))}
               </ul>
               
               <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <h4>Total a Pagar:</h4>
                  <h3 className="text-success fw-bold">S/. {total.toFixed(2)}</h3>
               </div>
             </div>
             
             <div className="card-footer text-end">
               <button className="btn btn-secondary me-2" onClick={() => navigate('/carrito')}>Volver al Carrito</button>
               <button className="btn btn-success fw-bold" onClick={handleFinalizarCompra}>✅ CONFIRMAR Y PAGAR</button>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}

export default ConfirmarPedido;