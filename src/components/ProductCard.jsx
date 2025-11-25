import React from 'react';

function ProductCard({ product, onAddToCart }) {

  const handleAddClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm item">
        <img
          src={product.imagen_url}
          className="card-img-top"
          alt={product.nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title titulo-item">{product.nombre}</h5>
          <p className="card-text text-danger fw-bold precio-item">
            S/. {product.precio.toFixed(2)}
          </p>
          <p className="text-muted">Stock: {product.stock}</p>
          <p>{product.descripcion}</p>
          <button
            className="btn btn-warning mt-auto boton-item"
            onClick={handleAddClick}
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
