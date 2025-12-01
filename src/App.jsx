import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. IMPORTACIONES DE COMPONENTES
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';

// 2. IMPORTACIONES DE PÁGINAS
import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Pedidos from './pages/Pedidos.jsx'; 
import Login from './login.jsx'; 

// --- NUEVO: Importamos la página de confirmación ---
import ConfirmarPedido from './pages/ConfirmarPedido.jsx'; 

function App() {
  // 3. ESTADO GLOBAL DEL CARRITO
  const [cart, setCart] = useState([]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar siempre visible arriba */}
      <Navbar />
      
      {/* Contenedor principal */}
      <main className="flex-grow-1" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Ruta Inicio */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta Productos */}
          <Route 
            path="/productos" 
            element={<Productos cart={cart} setCart={setCart} />} 
          />
          
          {/* Ruta Nosotros */}
          <Route path="/nosotros" element={<Nosotros />} />
          
          {/* Rutas de Usuario */}
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta del Carrito */}
          <Route 
            path="/carrito" 
            element={<ShoppingCart cart={cart} setCart={setCart} />} 
          />

          {/* --- NUEVA RUTA: Confirmación de Pedido --- */}
          {/* Aquí es donde llega el usuario después de darle a "Continuar" en el carrito */}
          <Route 
            path="/confirmar-pedido" 
            element={<ConfirmarPedido cart={cart} setCart={setCart} />} 
          />

        </Routes>
      </main>

      {/* Footer siempre visible abajo */}
      <Footer />
    </div>
  );
}

export default App;