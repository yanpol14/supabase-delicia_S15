import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
// Ajuste de rutas según tu estructura de carpetas
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';

// Recibimos 'cart' y 'setCart' desde App.jsx
function Productos({ cart, setCart }) {

  // --- ESTADOS ---
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Nota: Ya no necesitamos 'cartItems' local, usamos 'cart' global

  // --- OBTENER PRODUCTOS ---
  useEffect(() => {
    const getProductos = async () => {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .order('nombre', { ascending: true }); // Ordenar alfabéticamente opcional

        if (error) throw error;

        setProductos(data);
      } catch (err) {
        console.error("Supabase Error:", err);
        setError("Error al cargar productos.");
      } finally {
        setLoading(false);
      }
    };

    getProductos();
  }, []);

  // --- FILTRO ---
  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorias = [...new Set(filtered.map(p => p.categoria))]; // Quité el toLowerCase para respetar mayúsculas de BD

  // --- AGREGAR AL CARRITO GLOBAL ---
  const handleAddToCart = (productToAdd) => {
    // 1. Verificar si ya existe en el carrito
    const existingItem = cart.find(
      item => item.id_producto === productToAdd.id_producto
    );

    if (existingItem) {
      // 2. Verificar Stock
      if (existingItem.cantidad + 1 > productToAdd.stock) {
        alert(`Stock insuficiente. Solo quedan ${productToAdd.stock} unidades.`);
        return;
      }

      // 3. Actualizar cantidad
      const newCart = cart.map(item =>
        item.id_producto === productToAdd.id_producto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCart(newCart);

    } else {
      // 4. Agregar nuevo item
      if (productToAdd.stock < 1) {
        alert("Este producto está agotado.");
        return;
      }
      setCart([...cart, { ...productToAdd, cantidad: 1 }]);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-dark text-white text-center py-5 mb-5" style={{ 
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80') center/cover no-repeat" 
        }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Nuestros Productos</h1>
          <p className="lead mb-0">Del horno a tu mesa con el mejor sabor</p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container">
        <div className="row">

          {/* COL IZQUIERDA: Productos */}
          <div className="col-lg-8 mb-5">

            {/* BUSCADOR */}
            <div className="mb-4">
                <input
                className="form-control form-control-lg shadow-sm"
                type="search"
                placeholder="🔍 Buscar pan, pasteles, postres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* LOADING / ERROR */}
            {loading && <div className="text-center py-5"><div className="spinner-border text-warning" role="status"></div></div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* RESULTADOS */}
            {!loading && !error && (
              <>
                {categorias.length > 0 ? (
                  categorias.map(cat => (
                    <div key={cat} className="mb-5">
                      <h3 className="border-bottom pb-2 mb-4 text-warning fw-bold text-uppercase" style={{textShadow: '1px 1px 2px #ccc'}}>
                        {cat}
                      </h3>

                      <div className="row row-cols-1 row-cols-md-2 g-4">
                        {filtered
                          .filter(p => p.categoria === cat)
                          .map(product => (
                             // Asegúrate de que ProductCard acepte 'onAddToCart'
                            <ProductCard
                              key={product.id_producto}
                              product={product}
                              onAddToCart={handleAddToCart}
                            />
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h4>No encontramos productos con ese nombre.</h4>
                    <button className="btn btn-outline-dark mt-3" onClick={() => setSearchTerm("")}>Ver todo</button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* COL DERECHA: Carrito Lateral */}
          <div className="col-lg-4">
            {/* Reutilizamos el componente ShoppingCart.
                Al pasarle cart y setCart, él gestiona la eliminación, 
                cantidades y el pago automáticamente.
            */}
            <div className="sticky-top" style={{top: '20px', zIndex: 100}}>
                <ShoppingCart 
                    cart={cart} 
                    setCart={setCart} 
                />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Productos;