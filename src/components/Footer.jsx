import { Link } from 'react-router-dom'; // Importa el componente Link

function Footer() {
  return (
    <footer className="footer text-light pt-5 pb-3 footer-gradient">
      <div className="container">
        <div className="row text-center text-md-start">
          
          <div className="col-md-4 mb-4">
            <h5><i className="bi bi-telephone-fill me-2"></i>Contacto</h5>
            <p><i className="bi bi-phone"></i> 987 654 321</p>
            <p><i className="bi bi-envelope"></i> panaderiadelicia@gmail.com</p>
          </div>

          <div className="col-md-4 mb-4">
            <h5><i className="bi bi-share-fill me-2"></i>Redes</h5>
            <p>
              {/* Los enlaces externos (a otras webs) sí pueden usar <a> */}
              <a href="#" className="text-light text-decoration-none me-2"><i className="bi bi-facebook"></i> Facebook</a>
              <a href="#" className="text-light text-decoration-none me-2"><i className="bi bi-instagram"></i> Instagram</a>
              <a href="#" className="text-light text-decoration-none"><i className="bi bi-whatsapp"></i> WhatsApp</a>
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5><i className="bi bi-compass me-2"></i>Explora</h5>
            <p>
              {/* Los enlaces internos DEBEN usar <Link> y "to" */}
              <Link to="/" className="text-light text-decoration-none me-2">Inicio</Link>
              <Link to="/productos" className="text-light text-decoration-none me-2">Productos</Link>
              <Link to="/nosotros" className="text-light text-decoration-none me-2">Nosotros</Link>
              <Link to="/pedidos" className="text-light text-decoration-none">Pedidos</Link>
            </p>
          </div>

        </div>

        {/* ¡AQUÍ ESTÁN LOS CAMBIOS! */}
        <hr className="border-light" /> 

        <p className="copy text-center mt-3 mb-0">&copy; 2025 Panadería Delicia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;