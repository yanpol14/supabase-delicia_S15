import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';

// --- TUS DATOS DE PRODUCTOS ---
const allProducts = [
  // Panes
  { id: 1, categoria: 'pan', nombre: 'Pan de Yema', precio: 0.50, imagen: '/img/pan.jpg' },
  { id: 2, categoria: 'pan', nombre: 'Pan Francés', precio: 0.40, imagen: '/img/pan_frances.jpg' },
  { id: 3, categoria: 'pan', nombre: 'Pan Ciabatta', precio: 0.60, imagen: '/img/ciabatta.webp' },
  // Pasteles
  { id: 4, categoria: 'pastel', nombre: 'Pastel de Chocolate', precio: 25.00, imagen: '/img/torta_chocolate.jpg' },
  { id: 5, categoria: 'pastel', nombre: 'Pastel de Fresa', precio: 22.00, imagen: '/img/torta_fresa.jpg' },
  { id: 6, categoria: 'pastel', nombre: 'Torta 3 Leches', precio: 28.00, imagen: '/img/torta_3leches.jpg' },
  // Postres
  { id: 7, categoria: 'postre', nombre: 'Cheesecake de Maracuyá', precio: 15.00, imagen: '/img/cheesecake.webp' },
  { id: 8, categoria: 'postre', nombre: 'Muffin de Arándanos', precio: 5.00, imagen: '/img/muffin_arandanos.jpg' },
  { id: 9, categoria: 'postre', nombre: 'Galletas de Avena', precio: 2.50, imagen: '/img/galletas_avena.jpg' },
];

// --- EL COMPONENTE ---
function Productos() {
  // --- ESTADOS (Tu lógica) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);

  // --- LÓGICA DE FILTRADO (Tu lógica) ---
  const filteredProducts = allProducts.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const panes = filteredProducts.filter(p => p.categoria === 'pan');
  const pasteles = filteredProducts.filter(p => p.categoria === 'pastel');
  const postres = filteredProducts.filter(p => p.categoria === 'postre');

  // --- FUNCIONES DEL CARRITO (Tu lógica) ---
  const handleAddToCart = (productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productToAdd.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...productToAdd, cantidad: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleChangeQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, cantidad: newQuantity } : item
      ));
    }
  };


  // --- RENDERIZADO (FUSIONADO) ---
  return (
    <> {/* <-- Añadimos un Fragment para envolver todo */}
      
      {/* === 1. EL HEADER QUE FALTABA (Traducido a JSX) === */}
      {/* (Sin el <nav>, que ya está en App.jsx) */}
      <header className="header-bg" style={{ height: '400px' }}>
        <div className="header-overlay"></div>
        <div className="header-content" style={{ height: '100%', position: 'relative', zIndex: 2 }}>
          
          {/* El Título único de la página "Productos" */}
          <div className="d-flex align-items-center justify-content-center" style={{ height: '320px' }}>
            <div className="text-center text-white w-100">
              <h2 className="display-4 fw-bold mb-3">Nuestros Productos</h2>
              <p className="lead mb-4">Elige entre panes, pizzas, piononos, tortas, postres y bizcochos</p>
            </div>
          </div>

        </div>
      </header>
      
      {/* === 2. EL MAIN CON LOS PRODUCTOS (Tu código de lógica) === */}
      <div className="container mt-5">
        <div className="row">
          
          {/* Columna de Productos (8 columnas) */}
          <div className="col-lg-8">
            <h2 className="mb-4">Nuestros Productos</h2>

            {/* Barra de Búsqueda */}
            <form className="d-flex mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar producto..."
                aria-label="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {/* Sección de Panes */}
            {panes.length > 0 && (
              <>
                <h4 className="border-bottom pb-2 mb-3">Panes</h4>
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                  {panes.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Sección de Pasteles */}
            {pasteles.length > 0 && (
              <>
                <h4 className="border-bottom pb-2 mb-3">Pasteles</h4>
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                  {pasteles.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Sección de Postres */}
            {postres.length > 0 && (
              <>
                <h4 className="border-bottom pb-2 mb-3">Postres</h4>
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                  {postres.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Mensaje si no hay resultados */}
            {filteredProducts.length === 0 && (
              <p className="text-muted">No se encontraron productos que coincidan con tu búsqueda.</p>
            )}
          </div>

          {/* Columna del Carrito (4 columnas) */}
          <div className="col-lg-4">
            <ShoppingCart
              cartItems={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onChangeQuantity={handleChangeQuantity}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Productos;