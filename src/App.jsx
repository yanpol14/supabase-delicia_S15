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
import ConfirmarPedido from './pages/ConfirmarPedido.jsx'; 

// --- NUEVO: Importamos la página para agregar productos ---
import AgregarProducto from './pages/AgregarProducto.jsx'; 

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

          {/* Ruta de Confirmación de Pedido */}
          <Route 
            path="/confirmar-pedido" 
            element={<ConfirmarPedido cart={cart} setCart={setCart} />} 
          />

          {/* --- NUEVA RUTA: Agregar Producto (Solo Admin) --- */}
          <Route path="/agregar-producto" element={<AgregarProducto />} />

        </Routes>
      </main>

      {/* Footer siempre visible abajo */}
      <Footer />
    </div>
  );
}

export default App;