import React from 'react';

function Nosotros() {
  return (
    <>
      {/* ¡AÑADIMOS DE VUELTA EL HEADER ÚNICO DE ESTA PÁGINA! */}
      {/* Esto aplica el fondo de imagen (.header-bg) */}
      <header className="header-bg" style={{ height: '400px' }}>
        <div className="header-overlay"></div>
        <div className="header-content" style={{ height: '100%', position: 'relative', zIndex: 2 }}>
          
          {/* El <nav> NO va aquí (ya está en App.jsx) */}
          
          {/* ¡ESTA ES LA PARTE QUE FALTABA! (Tu código traducido a JSX) */}
          <div className="d-flex align-items-center justify-content-center" style={{ height: '320px' }}>
            <div className="text-center text-white w-100">
              <h2 className="display-4 fw-bold mb-3">Sobre Nosotros</h2>
              <p className="lead mb-4">Conoce nuestra historia y lo que nos impulsa a seguir adelante</p>
            </div>
          </div>
          {/* Fin de la parte que faltaba */}

        </div>
      </header>

      {/* El <main> que ya tenías (y que está bien) */}
      <main className="container py-5">
        <div className="row text-center mb-5">
          <h2 className="display-4 fw-bold pb-3 border-bottom border-danger text-danger">Sobre Nosotros</h2>
          <p className="lead text-warning">Conoce nuestra historia y lo que nos impulsa a seguir adelante.</p>
        </div>
        <div className="row text-center mb-5 py-4">
          <div className="col-md-6 mb-4">
            <h3 className="fw-bold text-warning">Misión</h3>
            <p className="px-md-5">
              Elaborar productos de panificación que, a partir de la calidad y valor nutricional, lleven el mensaje de compartir a todas las familias. Estamos convencidos que cuando compartimos somos más felices.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="fw-bold text-danger">Visión</h3>
            <p className="px-md-5">
              Ser la panadería líder en la región, reconocida por la excelencia en nuestros productos, la innovación constante y el compromiso con la satisfacción de nuestros clientes, expandiendo la tradición familiar con cada bocado.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <h3 className="fw-bold text-warning">Nosotros</h3>
            <div className="p-4 rounded-3 bg-light">
              <p>
                En Dulce Encanto, creemos que cada momento especial merece un sabor inolvidable.
                Somos una pastelería artesanal dedicada a crear postres que combinan ingredientes frescos, recetas tradicionales y un toque de creatividad que los hace únicos.
              </p>
              <p>
                Nuestro equipo de reposteros trabaja con pasión para elaborar tortas, cupcakes, galletas y postres personalizados que no solo conquistan el paladar, sino también la vista. Cada creación está hecha a mano, cuidando cada detalle para que disfrutes una experiencia dulce desde el primer vistazo hasta el último bocado.
              </p>
              <p>
                Ya sea que busques celebrar un cumpleaños, un aniversario o simplemente darte un gustito, en Dulce Encanto encontrarás el postre perfecto para cada ocasión.
                Porque para nosotros, cada día es una oportunidad para endulzar tu vida.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Nosotros;