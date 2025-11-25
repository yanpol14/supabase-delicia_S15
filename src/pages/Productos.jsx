import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';

function Productos() {

  // --- ESTADOS ---
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // --- OBTENER PRODUCTOS ---
  useEffect(() => {
    const getProductos = async () => {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*");

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

  const categorias = [...new Set(filtered.map(p => p.categoria?.toLowerCase()))];

  // --- CARRITO ---
  const handleAddToCart = (productToAdd) => {
    const existingItem = cartItems.find(
      item => item.id_producto === productToAdd.id_producto
    );

    if (existingItem) {
      if (existingItem.cantidad + 1 > productToAdd.stock) {
        alert("No hay suficiente stock disponible.");
        return;
      }

      setCartItems(cartItems.map(item =>
        item.id_producto === productToAdd.id_producto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));

    } else {
      if (productToAdd.stock < 1) {
        alert("Este producto está agotado.");
        return;
      }

      setCartItems([...cartItems, { ...productToAdd, cantidad: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id_producto !== productId));
  };

  const handleChangeQuantity = (productId, newQuantity) => {
    const product = productos.find(p => p.id_producto === productId);

    if (!product) return;

    if (newQuantity > product.stock) {
      alert("No puedes superar el stock disponible.");
      return;
    }

    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id_producto === productId
        ? { ...item, cantidad: newQuantity }
        : item
    ));
  };

  const handlePurchase = async () => {
    try {
      for (const item of cartItems) {
        const { error } = await supabase
          .from("productos")
          .update({
            stock: item.stock - item.cantidad
          })
          .eq("id_producto", item.id_producto);

        if (error) throw error;
      }

      alert("Compra realizada con éxito");
      setCartItems([]);
    } catch (err) {
      console.error("Error en la compra:", err);
      alert("Ocurrió un error al procesar la compra.");
    }
  };

  return (
    <>
      {/* HEADER SIEMPRE PRESENTE */}
      <header className="header-bg" style={{ height: "400px" }}>
        <div className="header-overlay"></div>
        <div className="header-content">
          <div className="d-flex align-items-center justify-content-center" style={{ height: '320px' }}>
            <div className="text-center text-white w-100">
              <h2 className="display-4 fw-bold mb-3">Nuestros Productos</h2>
              <p className="lead mb-4">Elige entre todas nuestras categorías</p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-5">
        <div className="row">

          {/* COL IZQUIERDA: Productos */}
          <div className="col-lg-8">

            {/* BUSCADOR */}
            <input
              className="form-control mb-4"
              type="search"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* LOADING */}
            {loading && <p>Cargando productos...</p>}

            {/* ERROR */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* RESULTADOS */}
            {!loading && !error && (
              <>
                {categorias.length > 0 ? (
                  categorias.map(cat => (
                    <div key={cat}>
                      <h4 className="border-bottom pb-2 mb-3 text-capitalize">{cat}</h4>

                      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                        {filtered
                          .filter(p => p.categoria?.toLowerCase() === cat)
                          .map(product => (
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
                  <p>No se encontraron productos.</p>
                )}
              </>
            )}
          </div>

          {/* COL DERECHA: Carrito */}
          <div className="col-lg-4">
            <ShoppingCart
              cartItems={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onChangeQuantity={handleChangeQuantity}
              onPurchase={handlePurchase}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Productos;
