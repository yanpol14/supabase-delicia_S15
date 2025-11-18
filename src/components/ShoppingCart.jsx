// Recibe los items y las funciones como props
function ShoppingCart({ cartItems, onRemoveItem, onChangeQuantity }) {

  // Calcula el total CADA VEZ que se renderiza
  const total = cartItems.reduce((acc, item) => {
    return acc + (item.precio * item.cantidad);
  }, 0);

  const handlePagar = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    // Aquí puedes usar SweetAlert2 si lo importas
    alert('Gracias por su compra!');
    // Idealmente, la función de limpiar el carrito debería estar en Productos.jsx
    // y pasarla como prop, pero por simplicidad lo dejamos así.
    // O mejor, podrías llamar a una prop: onCheckout();
  };

  return (
    <div className="carrito shadow-sm" style={{ position: 'sticky', top: '20px' }}>
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0"><i className="bi bi-cart-fill me-2"></i>Carrito de Compras</h4>
        </div>
        <div className="card-body carrito-items">
          {/* Si el carrito está vacío, muestra un mensaje */}
          {cartItems.length === 0 && (
            <p className="text-muted carrito-vacio">Tu carrito está vacío</p>
          )}

          {/* Mapea los items del carrito para mostrarlos */}
          {cartItems.map(item => (
            <div className="carrito-item d-flex align-items-center mb-3" key={item.id}>
              <img src={item.imagen} alt={item.nombre} width="80" className="img-fluid me-3 rounded" />
              <div className="flex-grow-1">
                <span className="carrito-item-titulo d-block fw-bold">{item.nombre}</span>
                <span className="carrito-item-precio d-block text-muted">${item.precio.toFixed(2)}</span>
                <input
                  className="form-control form-control-sm carrito-item-cantidad"
                  type="number"
                  value={item.cantidad}
                  onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                  style={{ width: '70px', marginTop: '5px' }}
                />
              </div>
              <button
                className="btn btn-outline-danger btn-sm bi bi-trash-fill btn-eliminar"
                onClick={() => onRemoveItem(item.id)}
              ></button>
            </div>
          ))}
        </div>
        
        {/* Total y botón de pagar */}
        <div className="card-footer carrito-total">
          <div className="fila d-flex justify-content-between align-items-center mb-3">
            <strong className="fs-5">Tu Total</strong>
            <span className="fs-5 fw-bold carrito-precio-total">${total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-success w-100 btn-pagar"
            onClick={handlePagar}
          >
            <i className="bi bi-credit-card-fill me-2"></i>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;