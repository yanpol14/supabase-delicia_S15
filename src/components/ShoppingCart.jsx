import Productos from "../pages/Productos";
import { supabase } from "../supabaseClient"; 

function ShoppingCart({ cartItems, onRemoveItem, onChangeQuantity }) {

  const total = cartItems.reduce((acc, item) => {
    return acc + (item.precio * item.cantidad);
  }, 0);

    const actualizarStock = async (productoId, nuevaCantidad) => {
    const { data, error } = await supabase
      .from("productos")
      .update({ stock: nuevaCantidad })
      .eq("id_producto", productoId);

    if (error) {
      console.error("Error actualizando el stock:", error);
    } else {
      console.log("Stock actualizado:", data);
    }
  };

  const handlePagar = async () => {
  if (cartItems.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Actualizar stock por cada producto del carrito
  for (const item of cartItems) {
    const nuevoStock = item.stock - item.cantidad;

    await actualizarStock(item.id_producto, nuevoStock);
  }

  alert('Gracias por su compra!');
};

  return (
    <div className="carrito shadow-sm" style={{ position: 'sticky', top: '20px' }}>
      <div className="card">

        {/* HEADER */}
        <div className="card-header bg-dark text-white text-center">
          <h4 className="mb-0">
            <i className="bi bi-cart-fill me-2"></i>Tu carrito
          </h4>
        </div>

        {/* ITEMS */}
        <div className="card-body carrito-items">
          {cartItems.length === 0 && (
            <p className="text-muted carrito-vacio">Tu carrito está vacío</p>
          )}

          {cartItems.map(item => (
            <div className="carrito-item d-flex align-items-center mb-3" key={item.id_producto}>
              
              {/* Imagen */}
              <img
                src={item.imagen_url}
                alt={item.nombre}
                width="80"
                className="img-fluid me-3 rounded"
              />

              {/* Info */}
              <div className="flex-grow-1">
                <span className="carrito-item-titulo d-block fw-bold text-uppercase">
                  {item.nombre}
                </span>

                <span className="carrito-item-precio d-block text-muted">
                  $ {item.precio.toFixed(2)}
                </span>

                {/* Controles de cantidad */}
                <div className="selector-cantidad mt-2 d-flex align-items-center">

                  {/* BOTÓN - */}
                  <i
                    className="bi-dash-circle"
                    style={{ fontSize: "22px", cursor: "pointer" }}
                    onClick={() => onChangeQuantity(item.id_producto, item.cantidad - 1)}
                  ></i>

                  {/* Cantidad */}
                  <span
                    className="mx-3 fw-bold"
                    style={{ fontSize: "18px", width: "25px", textAlign: "center" }}
                  >
                    {item.cantidad}
                  </span>

                  {/* BOTÓN + */}
                  <i
                    className="bi-plus-circle"
                    style={{ fontSize: "22px", cursor: "pointer" }}
                    onClick={() => onChangeQuantity(item.id_producto, item.cantidad + 1)}
                  ></i>
                </div>
              </div>

              {/* BOTÓN ELIMINAR */}
              <button
                className="btn btn-outline-danger bi-trash-fill  ms-2"
                onClick={() => onRemoveItem(item.id_producto)}
              ></button>

            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="card-footer carrito-total">
          <div className="fila d-flex justify-content-between align-items-center mb-3">
            <strong className="fs-5">Tu Total</strong>
            <span className="fs-5 fw-bold carrito-precio-total">
              $ {total.toFixed(2)}
            </span>
          </div>

          <button
            className="btn w-100 btn-pagar .btn-pagar"
            style={{ background: "#ffc107", fontWeight: 600 }}
            onClick={handlePagar}
          >
            <i className="bi bi-credit-card-fill me-2"></i> Pagar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ShoppingCart;
