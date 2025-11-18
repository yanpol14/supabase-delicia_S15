// Este componente recibe 'product' y 'onAddToCart' como "props"
// desde Productos.jsx
function ProductCard({ product, onAddToCart }) {
  
  // Función local que llama a la función del padre
  const handleAddClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm item">
        <img src={product.imagen} className="card-img-top" alt={product.nombre} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title titulo-item">{product.nombre}</h5>
          <p className="card-text text-danger fw-bold precio-item">${product.precio.toFixed(2)}</p>
          <button
            className="btn btn-warning mt-auto boton-item"
            onClick={handleAddClick} // Llama a la función al hacer clic
          >
            <i className="bi bi-cart-plus-fill me-2"></i>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;