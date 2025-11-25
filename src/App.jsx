import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. IMPORTACIONES DE COMPONENTES
// (Asegúrate de que estas rutas coincidan con tus carpetas)
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';

// 2. IMPORTACIONES DE PÁGINAS
import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Pedidos from './pages/Pedidos.jsx'; // Tu historial de compras
import Login from './login.jsx'; // Tu login (que está en la raíz de src)

function App() {
  // 3. ESTADO GLOBAL DEL CARRITO
  // Lo definimos aquí para que NO se borre al cambiar de página
  const [cart, setCart] = useState([]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar siempre visible arriba */}
      <Navbar />
      
      {/* Contenedor principal que cambia según la ruta */}
      <main className="flex-grow-1" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Ruta Inicio */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta Productos: Le pasamos 'cart' y 'setCart' para poder AGREGAR items */}
          <Route 
            path="/productos" 
            element={<Productos cart={cart} setCart={setCart} />} 
          />
          
          {/* Ruta Nosotros */}
          <Route path="/nosotros" element={<Nosotros />} />
          
          {/* Rutas de Usuario (Base de Datos) */}
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta del Carrito: Le pasamos 'setCart' para poder vaciarlo al pagar */}
          <Route 
            path="/carrito" 
            element={<ShoppingCart cart={cart} setCart={setCart} />} 
          />
        </Routes>
      </main>

      {/* Footer siempre visible abajo */}
      <Footer />
    </div>
  );
}

export default App;