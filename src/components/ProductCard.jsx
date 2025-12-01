import React from 'react';

function ProductCard({ product, onAddToCart }) {
  
  // 1. Detectar si hay stock
  const sinStock = product.stock < 1;

  const handleAddClick = () => {
    // Solo permitimos agregar si hay stock
    if (!sinStock) {
        onAddToCart(product);
    }
  };

  return (
    <div className="col">
      {/* CORRECCIÓN: Agregadas comillas invertidas ` ` dentro de las llaves */}
      <div className={`card h-100 shadow-sm item ${sinStock ? 'border-danger opacity-75' : ''}`}>
        
        {/* Contenedor para imagen y etiqueta de agotado */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={product.imagen_url}
              className="card-img-top"
              alt={product.nombre}
              style={{ height: '200px', objectFit: 'cover', filter: sinStock ? 'grayscale(100%)' : 'none' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Sin+Imagen'}
            />
            
            {/* Etiqueta Visual de Agotado */}
            {sinStock && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <span className="badge bg-danger fs-5 shadow">AGOTADO</span>
                </div>
            )}
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title titulo-item">{product.nombre}</h5>
          
          <p className="card-text text-danger fw-bold precio-item">
            S/. {Number(product.precio).toFixed(2)}
          </p>
          
          {/* Mostramos el stock real - CORRECCIÓN: Agregadas comillas invertidas */}
          <p className={`text-muted small ${sinStock ? 'text-danger fw-bold' : ''}`}>
            Stock disponible: {product.stock}
          </p>
          
          {/* Descripción corta */}
          <p className="card-text small text-muted flex-grow-1">
              {product.descripcion ? product.descripcion.substring(0, 60) + (product.descripcion.length > 60 ? '...' : '') : ''}
          </p>

          {/* CORRECCIÓN: Agregadas comillas invertidas en el className del botón */}
          <button
            className={`btn mt-auto boton-item fw-bold w-100 ${sinStock ? 'btn-secondary' : 'btn-warning'}`}
            onClick={handleAddClick}
            disabled={sinStock}
          >
            {sinStock ? (
                <span><i className="bi bi-x-circle me-2"></i>Agotado</span>
            ) : (
                <span><i className="bi bi-cart-plus-fill me-2"></i>Añadir al Carrito</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;