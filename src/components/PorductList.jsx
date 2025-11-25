import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from './ProductCard';

function ProductList() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*');

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        setProductos(data);
      } catch (err) {
        console.error("Catch error:", err);
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    getProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{color:"red"}}>{error}</p>;

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {productos.map(product => (
        <ProductCard
          key={product.idproducto ?? product.id} 
          product={product}
          onAddToCart={() => console.log("Añadido:", product)}
        />
      ))}
    </div>
  );
}

export default ProductList;
