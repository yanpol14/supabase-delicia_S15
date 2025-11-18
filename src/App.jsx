// 1. Importa todo lo necesario
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Pedidos from './pages/Pedidos';

// 2. BORRA la importación de './App.css'
// import './App.css'; // <- ¡Borra esta línea!

function App() {
  // 3. Dibuja tu estructura
  return (
    <>
      {/* El Navbar va arriba */}
      <Navbar />
      
      {/* El "main" contiene las rutas que cambian */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </main>

      {/* El Footer va abajo */}
      <Footer />
    </>
  );
}

export default App;