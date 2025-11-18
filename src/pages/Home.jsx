import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- DATOS DE PRODUCTOS DESTACADOS (De tu <script>) ---
// ¡Con rutas de imagen corregidas!
const productsByCategory = {
  panes: [
    { name: "Pan Artesanal", image: "/img/pan.jpg", price: "S/4.00" },
    { name: "Pan Francés", image: "/img/Panfrances.jpg", price: "S/3.50" },
    { name: "Pan Ciabatta", image: "/img/Ciabatta.png", price: "S/2.50" }
  ],
  pizzas: [
    { name: "Pizza Americana", image: "/img/pizzascaseras.jpg", price: "S/30.00" },
    { name: "Pizza Pepperoni", image: "/img/pepe.jpg", price: "S/32.00" },
    { name: "Pizza Hawaiana", image: "/img/hawa.avif", price: "S/38.00" }
  ],
  piononos: [
    { name: "Pionono de Manjar", image: "/img/pionono.jpg", price: "S/12.00" },
    { name: "Pionono de Chocolate", image: "/img/chocolate.avif", price: "S/15.00" },
    { name: "Pionono de Fresa", image: "/img/fresa.jpg", price: "S/15.00" }
  ],
  tortas: [
    { name: "Torta de Chocolate", image: "/img/tortachocolate.jpg", price: "S/32.00" },
    { name: "Torta Selva Negra", image: "/img/selva.webp", price: "S/34.00" },
    { name: "Torta Tres Leches", image: "/img/3leches.jpg", price: "S/35.00" }
  ],
  postres: [
    { name: "Pye de Manzana", image: "/img/piedemanzana.jpg", price: "S/10.00" },
    { name: "Picarones", image: "/img/picarones.jpg", price: "S/6.50" },
    { name: "Mazamorra Morada", image: "/img/morada.jpg", price: "S/7.00" }
  ],
  bizcochos: [
    { name: "Queque de Vainilla", image: "/img/keke.jpg", price: "S/7.00" },
    { name: "Queque de Zanahoria", image: "/img/zana.jpg", price: "S/7.50" },
    { name: "Queque de Naranja", image: "/img/naran.jpg", price: "S/7.50" }
  ]
};

// --- COMPONENTE HOME ---
function Home() {
  // --- LÓGICA DE PESTAÑAS (Reemplaza tu JS) ---
  const [activeCategory, setActiveCategory] = useState('panes');
  const products = productsByCategory[activeCategory] || [];

  return (
    <>
      {/* === 1. HEADER (Traducido de tu HTML, sin <nav>) === */}
      <header className="header-bg" style={{ height: '400px' }}>
        <div className="header-overlay"></div>
        <div className="header-content" style={{ height: '100%', position: 'relative', zIndex: 2 }}>
          
          {/* Título de la página Home */}
          <div className="d-flex align-items-center justify-content-center" style={{ height: '320px' }}>
            <div className="text-center text-white w-100">
              <h2 className="display-4 fw-bold mb-3">Bienvenido a Panadería Delicia</h2>
              <p className="lead mb-4">Delicias horneadas con amor cada día</p>
              {/* Esto es un ancla (scroll), por eso se queda como <a> */}
              <a className="btn btn-panaderia btn-lg fw-bold shadow" href="#prod">Ver productos</a>
            </div>
          </div>
        </div>
      </header>

      {/* === 2. MAIN (Traducido de tu HTML) === */}
      <main className="container py-5">
        
        {/* Bienvenida y valores */}
        <section className="mb-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="fw-bold text-danger mb-3">¡Bienvenido!</h1>
              <p className="lead text-warning mb-4">
                Descubre el sabor auténtico de nuestra panadería. Productos frescos, artesanales y hechos con pasión.
              </p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Ingredientes naturales y frescos</li>
                <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Recetas tradicionales y modernas</li>
                <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Atención personalizada</li>
                <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Promociones exclusivas cada semana</li>
              </ul>
              <Link to="/productos" className="btn btn-panaderia btn-lg fw-bold">Explora nuestros productos</Link>
            </div>
            <div className="col-lg-6 text-center">
              <img src="/img/fondo.jpg" className="img-fluid rounded shadow" alt="Panadería Delicia" />
            </div>
          </div>
        </section>

        {/* Promoción especial */}
        <section className="promo text-center py-5 bg-light rounded mb-5">
          <h2 className="fw-bold text-danger">20% de descuento en tu primer pedido</h2>
          <p className="lead text-warning">¡Aprovecha nuestra promoción especial!</p>
          <Link className="btn btn-panaderia btn-lg fw-bold shadow" to="/pedidos">Pedir ahora</Link>
        </section>

        {/* Categorías con botones y productos destacados */}
        <section className="mb-5" id="prod">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-danger">Productos Destacados</h2>
            <p className="text-muted">Elige una categoría para ver nuestros favoritos</p>
          </div>
          
          {/* --- Lógica de Pestañas (Botones) --- */}
          <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
            {/* Usamos onClick para cambiar el 'activeCategory' */}
            <button 
              className={`category-btn btn btn-outline-warning fw-bold ${activeCategory === 'panes' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('panes')}>Panes</button>
            <button 
              className={`category-btn btn btn-outline-warning fw-bold ${activeCategory === 'pizzas' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('pizzas')}>Pizzas</button>
            <button 
              className={`category-btn btn btn-outline-warning fw-bold ${activeCategory === 'piononos' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('piononos')}>Piononos</button>
            <button 
              className={`category-btn btn btn-outline-warning fw-bold ${activeCategory === 'tortas' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('tortas')}>Tortas</button>
            <button 
              className={`category-btn btn btn-outline-warning fw-bold ${activeCategory === 'postres' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('postres')}>Postres</button>
            <button 
              className={`category-btn btn btn-outline-warning fw-bold ${activeCategory === 'bizcochos' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('bizcochos')}>Bizcochos</button>
          </div>
          
          {/* --- Lógica de Pestañas (Grid de Productos) --- */}
          <div className="row g-4" id="products-grid">
            {/* Mapeamos el array 'products' que cambia según el estado */}
            {products.map((product, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid #ffc107', borderRadius: '0.25rem', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem' }} />
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h5 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{product.name}</h5>
                    <span style={{ fontWeight: 'bold', color: '#dc3545', marginBottom: '0.5rem' }}>{product.price}</span>
                    <Link to="/productos" style={{ marginTop: 'auto', padding: '0.5rem 1rem', textAlign: 'center', textDecoration: 'none', borderRadius: '0.25rem', backgroundColor: '#ffc107', color: '#212529', fontWeight: 'bold' }}>Comprar</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Misión, visión y valores */}
        <section className="mb-5">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card border-warning h-100">
                <div className="card-body">
                  <h3 className="fw-bold text-warning"><i className="bi bi-star-fill"></i> Misión</h3>
                  <p>
                    Elaborar productos de panificación que, a partir de la calidad y valor nutricional, lleven el mensaje de compartir a todas las familias. Estamos convencidos que cuando compartimos somos más felices.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-danger h-100">
                <div className="card-body">
                  <h3 className="fw-bold text-danger"><i className="bi bi-eye-fill"></i> Visión</h3>
                  <p>
                    Ser la panadería líder en la región, reconocida por la excelencia en nuestros productos, la innovación constante y el compromiso con la satisfacción de nuestros clientes, expandiendo la tradición familiar con cada bocado.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-success h-100">
                <div className="card-body">
                  <h3 className="fw-bold text-success"><i className="bi bi-heart-fill"></i> Valores</h3>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-lg"></i> Calidad</li>
                    <li><i className="bi bi-check-lg"></i> Honestidad</li>
                    <li><i className="bi bi-check-lg"></i> Tradición</li>
                    <li><i className="bi bi-check-lg"></i> Innovación</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios de clientes */}
        <section className="mb-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-danger">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="card border-warning shadow-sm">
                <div className="card-body">
                  <p className="fst-italic">"El pan artesanal es delicioso y siempre fresco. ¡Recomiendo la pizza americana!"</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <img src="/img/pmujer.png" alt="Cliente 1" className="rounded-circle me-2" width="40" height="40" />
                    <span className="fw-bold">María G.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-danger shadow-sm">
                <div className="card-body">
                  <p className="fst-italic">"La atención es excelente y los piononos son los mejores que he probado."</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <img src="/img/phombre.png" alt="Cliente 2" className="rounded-circle me-2" width="40" height="40" />
                    <span className="fw-bold">Carlos P.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-success shadow-sm">
                <div className="card-body">
                  <p className="fst-italic">"Me encanta la variedad de postres y bizcochos. ¡Siempre vuelvo por más!"</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <img src="/img/pmujer.png" alt="Cliente 3" className="rounded-circle me-2" width="40" height="40" />
                    <span className="fw-bold">Lucía R.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;