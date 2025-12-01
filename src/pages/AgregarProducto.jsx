import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function AgregarProducto() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Pan', 
    precio: '',
    stock: '',
    imagen_url: '' 
  });

  // 1. VERIFICAR SI ES ADMIN (Seguridad)
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const rol = localStorage.getItem('userRole');
      
      if (!user || rol !== 'administrador') {
        alert("Acceso denegado. Solo administradores.");
        navigate('/');
      }
    };
    checkAdmin();
  }, [navigate]);

  // 2. MANEJAR CAMBIOS EN LOS INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. ENVIAR DATOS A SUPABASE (Lógica Inteligente)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validaciones
      if (!formData.nombre || !formData.precio || !formData.stock) {
        alert("Por favor completa los campos obligatorios.");
        setLoading(false);
        return;
      }

      // PASO A: Verificar si el producto YA existe
      // Usamos .maybeSingle() para que no de error si no encuentra nada
      const { data: productoExistente, error: errorBusqueda } = await supabase
        .from('productos')
        .select('id_producto, nombre')
        .ilike('nombre', formData.nombre) // 'ilike' ignora mayúsculas/minúsculas (ej: Pan = pan)
        .maybeSingle();

      if (errorBusqueda) throw errorBusqueda;

      if (productoExistente) {
        // --- ESCENARIO 1: ACTUALIZAR PRODUCTO EXISTENTE ---
        const confirmar = window.confirm(
          `El producto "${productoExistente.nombre}" ya existe.\n¿Quieres ACTUALIZAR sus datos (precio, stock, etc.) en lugar de crear uno nuevo?`
        );

        if (!confirmar) {
          setLoading(false);
          return; // Cancelamos si el usuario no quiere sobrescribir
        }

        const { error: errorUpdate } = await supabase
          .from('productos')
          .update({
            descripcion: formData.descripcion,
            categoria: formData.categoria,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock), // Esto reemplaza el stock.
            imagen_url: formData.imagen_url
          })
          .eq('id_producto', productoExistente.id_producto);

        if (errorUpdate) throw errorUpdate;
        alert("¡Producto actualizado correctamente!");

      } else {
        // --- ESCENARIO 2: CREAR NUEVO PRODUCTO ---
        const { error: errorInsert } = await supabase
          .from('productos')
          .insert([{
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            categoria: formData.categoria,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock),
            imagen_url: formData.imagen_url
          }]);

        if (errorInsert) throw errorInsert;
        alert("¡Producto nuevo creado exitosamente!");
      }

      navigate('/productos'); 

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-dark text-white text-center">
              <h3 className="mb-0 fw-bold">
                🍞 Gestionar Producto
              </h3>
            </div>
            
            <div className="card-body p-4">
              <div className="alert alert-info small mb-3">
                <i className="bi bi-info-circle me-2"></i>
                Si el producto ya existe, se actualizarán sus datos automáticamente.
              </div>

              <form onSubmit={handleSubmit}>
                
                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre del Producto</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: Torta de Chocolate"
                  />
                </div>

                {/* Categoría */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Categoría</label>
                  <select 
                    className="form-select" 
                    name="categoria" 
                    value={formData.categoria} 
                    onChange={handleChange}
                  >
                    <option value="Pan">Pan</option>
                    <option value="Pizzas">Pizzas</option>
                    <option value="Piononos">Piononos</option>
                    <option value="Tortas">Tortas</option>
                    <option value="Postres">Postres</option>
                    <option value="Bizcochos">Bizcochos</option>
                  </select>
                </div>

                {/* Precio y Stock */}
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label fw-bold">Precio (S/.)</label>
                    <input 
                      type="number" 
                      step="0.10" 
                      className="form-control" 
                      name="precio" 
                      value={formData.precio} 
                      onChange={handleChange} 
                      required 
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label fw-bold">Stock</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="stock" 
                      value={formData.stock} 
                      onChange={handleChange} 
                      required 
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* URL Imagen */}
                <div className="mb-3">
                  <label className="form-label fw-bold">URL de la Imagen</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="imagen_url" 
                    value={formData.imagen_url} 
                    onChange={handleChange} 
                    placeholder="https://..."
                  />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Descripción</label>
                  <textarea 
                    className="form-control" 
                    name="descripcion" 
                    rows="3" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                  ></textarea>
                </div>

                {/* Botón Guardar */}
                <button 
                  type="submit" 
                  className="btn btn-warning w-100 fw-bold py-2" 
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : '💾 GUARDAR / ACTUALIZAR'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgregarProducto;