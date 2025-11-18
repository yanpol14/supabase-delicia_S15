import { Link } from 'react-router-dom'; // <-- ¡Paso 1: IMPORTARLO!

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-gradient navbar-dark shadow-sm">
      <div className="container">
        
        {/* ¡Este también debe ser un Link! */}
        <Link className="navbar-brand fw-bold" to="/" style={{color:"#fff;"}}>Panadería Delicia</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            {/* ¡Paso 2: USAR <Link> Y "to" en lugar de <a href="">! */}
            <li className="nav-item"><Link className="nav-link fw-bold" to="/" style={{color:"#fff;"}}>Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold" to="/productos" style={{color:"#fff;"}}>Productos</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold" to="/nosotros" style={{color:"#fff;"}}>Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold" to="/pedidos" style={{color:"#fff;"}}>Pedidos</Link></li>
          
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;