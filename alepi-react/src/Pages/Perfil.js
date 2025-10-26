import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PerfilUsuario.css";

import linkedinIcon from "../assets/Linkedin.svg";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/insta.svg";
import xIcon from "../assets/x.svg";
import whatsappIcon from "../assets/Whats.svg";
import emailIcon from "../assets/Mail.svg";

import { AuthContext } from "../Components/AuthContext";

axios.defaults.baseURL = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function Perfil() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("informacion");
  const [imageVersion, setImageVersion] = useState(Date.now());
  const fileInputRef = useRef(null);

  // ---------------- Obtener ID del usuario ----------------
  const getUserId = () => {
    // Verificar todas las posibles fuentes del ID
    const idFromContext = user?.ID_Usuario;
    const idFromLocalStorage = localStorage.getItem("idUsuario");
    const idFromSessionStorage = sessionStorage.getItem("idUsuario");
    
    console.log("🔍 Buscando ID del usuario:");
    console.log("   - Contexto:", idFromContext);
    console.log("   - LocalStorage:", idFromLocalStorage);
    console.log("   - SessionStorage:", idFromSessionStorage);
    
    const finalId = idFromContext || idFromLocalStorage || idFromSessionStorage;
    
    if (!finalId) {
      console.error("❌ No se pudo encontrar el ID del usuario en ninguna fuente");
      return null;
    }
    
    console.log("✅ ID encontrado:", finalId);
    return finalId;
  };

  // ---------------- Cargar perfil ----------------
  const cargarPerfil = async () => {
    const id = getUserId();
    if (!id) {
      alert("No se encontró un usuario válido. Inicia sesión.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(`GetUsuario.php?id=${id}`);
      if (response.data.status === "success") {
        console.log("✅ Perfil cargado:", response.data.data);
        setPerfil(response.data.data);
      } else {
        alert(response.data.message || "No se encontraron datos.");
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Error cargando perfil:", err);
      alert("Error al cargar el perfil.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, [user, navigate]);

  // --------------- Subir nueva imagen ----------------
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Obtener ID ANTES de cualquier operación
    const id = getUserId();
    if (!id) {
      alert("No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    console.log("📤 Preparando subida de imagen para usuario ID:", id);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecciona una imagen válida (JPEG, PNG, GIF, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. El tamaño máximo permitido es 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append("idUsuario", id);
    formData.append("imagen", file);

    // Verificar que el FormData tenga los datos correctos
    console.log("📦 FormData contenido:");
    for (let [key, value] of formData.entries()) {
      console.log(`   ${key}:`, value);
    }

    try {
      console.log("🚀 Enviando imagen al servidor...");
      const response = await axios.post("UploadPerfil.php", formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("📥 Respuesta del servidor:", response.data);

      if (response.data.status === "success") {
        // Forzar recarga completa
        setImageVersion(Date.now());
        
        // Recargar el perfil después de 1 segundo
        setTimeout(() => {
          cargarPerfil();
        }, 1000);
        
        alert("✅ Imagen de perfil actualizada correctamente.");
        
      } else {
        alert("❌ " + (response.data.message || "Error al subir la imagen."));
      }

    } catch (err) {
      console.error('❌ Error completo:', err);
      if (err.response) {
        console.error('❌ Respuesta de error del servidor:', err.response.data);
        console.error('❌ Status code:', err.response.status);
        alert(`❌ Error del servidor: ${err.response.data.message || 'Error desconocido'}`);
      } else if (err.request) {
        console.error('❌ No hubo respuesta del servidor');
        alert("❌ No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error('❌ Error en la configuración de la petición:', err.message);
        alert("❌ Error inesperado: " + err.message);
      }
    }
  };

  // --------------- Eliminar imagen ----------------
  const handleDeleteImage = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu imagen de perfil?")) {
      return;
    }

    const id = getUserId();
    if (!id) {
      alert("No se pudo identificar al usuario.");
      return;
    }

    try {
      const response = await axios.post("DeleteImagenPerfil.php", { idUsuario: id });
      
      if (response.data.status === "success") {
        setImageVersion(Date.now());
        setTimeout(() => {
          cargarPerfil();
        }, 500);
        alert("✅ Imagen de perfil eliminada correctamente.");
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (err) {
      console.error('❌ Error eliminando imagen:', err);
      alert("❌ Error al eliminar la imagen.");
    }
  };

  if (loading) {
    return (
      <div className="perfil-loading">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!perfil) return null;

  // ---------------- URL DE IMAGEN CORREGIDA ----------------
  const getImageUrl = () => {
    // Si no hay imagen de perfil, usar icono por defecto
    if (!perfil.imagenPerfil || perfil.imagenPerfil === "null" || perfil.imagenPerfil === null) {
      return `https://via.placeholder.com/150x150/6c757d/ffffff?text=👤&v=${imageVersion}`;
    }
    
    // Si ya es una URL completa
    if (perfil.imagenPerfil.startsWith("http")) {
      return `${perfil.imagenPerfil}?v=${imageVersion}`;
    }
    
    // Si es una ruta relativa - construir URL completa
    return `http://localhost/alepirea/${perfil.imagenPerfil}?v=${imageVersion}`;
  };

  const imgURL = getImageUrl();
  const hasImage = perfil.imagenPerfil && perfil.imagenPerfil !== "null" && perfil.imagenPerfil !== null;

  const fullName = `${perfil.nombreVisible || perfil.nombreCuenta || ""} ${perfil.apellidoP || ""} ${perfil.apellidoM || ""}`.trim() || "Sin nombre";

  const idiomas = Array.isArray(perfil.Idiomas) ? perfil.Idiomas.join(", ") : (perfil.Idiomas || "No especificados");
  const certific = Array.isArray(perfil.Certificaciones) ? perfil.Certificaciones.join(", ") : (perfil.Certificaciones || "No especificadas");

  const valoraciones = [
    { nombre: "Ernesto Vega", fecha: "02/07/24", comentario: "Servicio excepcional, muy profesional y atento a los detalles.", estrellas: 5 },
    { nombre: "María González", fecha: "15/06/24", comentario: "Excelente trabajo, cumplió con todas las expectativas.", estrellas: 4 },
    { nombre: "Carlos López", fecha: "28/05/24", comentario: "Muy recomendable, gran experiencia de trabajo.", estrellas: 5 }
  ];
  const promedioEstrellas = valoraciones.reduce((acc, curr) => acc + curr.estrellas, 0) / valoraciones.length;

  const handleContact = (type) => {
    if (type === 'whatsapp') {
      const phone = perfil.telefono?.replace(/\D/g, '');
      if (phone) window.open(`https://wa.me/${phone}`, '_blank');
      else alert('Número de teléfono no disponible');
    } else if (type === 'email') {
      const email = perfil.correo;
      if (email) window.location.href = `mailto:${email}`;
      else alert('Correo electrónico no disponible');
    }
  };

  return (
    <div className="perfil-pro-container">
      <div className="perfil-pro-header">
        <div className="perfil-pro-avatar-section">
          <div className="perfil-pro-avatar-container">
            <div className="perfil-pro-avatar-wrapper" onClick={handleImageClick} style={{ cursor: "pointer" }}>
              <img 
                src={imgURL} 
                alt={fullName} 
                className="perfil-pro-avatar" 
                onError={(e) => { 
                  console.error("❌ Error cargando imagen:", imgURL);
                  e.target.src = `https://via.placeholder.com/150x150/dc3545/ffffff?text=❌&v=${imageVersion}`;
                }} 
                onLoad={() => console.log("✅ Imagen cargada exitosamente:", imgURL)}
              />
              <div className="perfil-pro-avatar-overlay">
                <span>{hasImage ? "Cambiar foto" : "Subir foto"}</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
            
            {hasImage && (
              <button className="btn-delete-image" onClick={handleDeleteImage} title="Eliminar imagen">
                <i className="bi bi-trash"></i>
              </button>
            )}
          </div>
          
          <div className="perfil-pro-info">
            <h1>{fullName}</h1>
            <p className="perfil-pro-profesion">{perfil.profesion || "Profesional"}</p>
            <div className="perfil-pro-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(promedioEstrellas) ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <span className="rating-text">({valoraciones.length} valoraciones)</span>
            </div>
          </div>
        </div>

        <div className="perfil-pro-actions">
          <button className="btn-pro-primary" onClick={() => handleContact('whatsapp')}>
            <img src={whatsappIcon} alt="WhatsApp" /> Contactar
          </button>
          <button className="btn-pro-secondary" onClick={() => handleContact('email')}>
            <img src={emailIcon} alt="Email" /> Enviar mensaje
          </button>
        </div>
      </div>
      {/* El resto de tu código permanece igual */}
      <div className="perfil-pro-tabs">
        <button className={`tab-btn ${activeTab === "informacion" ? "active" : ""}`} onClick={() => setActiveTab("informacion")}>
          <i className="bi bi-person-fill"></i>
          Información
        </button>
        <button className={`tab-btn ${activeTab === "experiencia" ? "active" : ""}`} onClick={() => setActiveTab("experiencia")}>
          <i className="bi bi-briefcase-fill"></i>
          Experiencia
        </button>
        <button className={`tab-btn ${activeTab === "valoraciones" ? "active" : ""}`} onClick={() => setActiveTab("valoraciones")}>
          <i className="bi bi-star-fill"></i>
          Valoraciones
        </button>
      </div>

      <div className="perfil-pro-content">
        {activeTab === "informacion" && (
          <div className="tab-content">
            <div className="info-grid">
              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-telephone-fill"></i>
                  <h3>Información de Contacto</h3>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <span className="info-label">
                      <i className="bi bi-phone"></i>
                      Teléfono
                    </span>
                    <span className="info-value">{perfil.telefono || "No proporcionado"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="bi bi-geo-alt"></i>
                      Ubicación
                    </span>
                    <span className="info-value">{perfil.Ubicacion || "No proporcionada"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="bi bi-envelope"></i>
                      Email
                    </span>
                    <span className="info-value">{perfil.correo || "No proporcionado"}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-award-fill"></i>
                  <h3>Especialidades</h3>
                </div>
                <div className="card-body">
                  <div className="specialties">
                    {(perfil.especialidad ? perfil.especialidad.split(",") : ["No especificadas"]).map((especialidad, index) => (
                      <span key={index} className="specialty-tag">{especialidad.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-mortarboard-fill"></i>
                  <h3>Educación</h3>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <span className="info-label">Universidad</span>
                    <span className="info-value">{perfil.UniversidadEgreso || "No especificada"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Cédula profesional</span>
                    <span className="info-value">{perfil.CedulaProfesional || "No proporcionada"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Certificaciones</span>
                    <span className="info-value">{certific}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-translate"></i>
                  <h3>Idiomas</h3>
                </div>
                <div className="card-body">
                  <div className="languages">
                    {idiomas !== "No especificados" ? idiomas.split(", ").map((idioma, index) => (
                      <div key={index} className="language-item">
                        <span className="language-name">{idioma}</span>
                        <div className="language-level">
                          <div className="level-bar">
                            <div className="level-fill" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <span className="no-data">No especificados</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experiencia" && (
          <div className="tab-content">
            <div className="experience-card">
              <div className="card-header">
                <i className="bi bi-briefcase-fill"></i>
                <h3>Experiencia Laboral</h3>
              </div>
              <div className="card-body">
                <div className="experience-content">
                  {perfil.ExperienciaLaboral ? (
                    <div className="experience-text">
                      <p>{perfil.ExperienciaLaboral}</p>
                    </div>
                  ) : (
                    <p className="no-data">No se ha proporcionado información sobre experiencia laboral.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="experience-card">
              <div className="card-header">
                <i className="bi bi-currency-dollar"></i>
                <h3>Honorarios</h3>
              </div>
              <div className="card-body">
                <div className="pricing-info">
                  {perfil.Honorarios ? (
                    <>
                      <div className="hourly-rate">
                        <span className="rate-amount">${perfil.Honorarios} MXN</span>
                        <span className="rate-period">por hora</span>
                      </div>
                      <p className="rate-description">Precio base por servicios profesionales</p>
                    </>
                  ) : (
                    <p className="no-data">Honorarios no especificados</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "valoraciones" && (
          <div className="tab-content">
            <div className="reviews-summary">
              <div className="rating-overview">
                <div className="average-rating">
                  <span className="rating-number">{promedioEstrellas.toFixed(1)}</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.round(promedioEstrellas) ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="total-reviews">{valoraciones.length} valoraciones</span>
                </div>
              </div>
            </div>

            <div className="reviews-list">
              {valoraciones.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <span className="reviewer-name">{review.nombre}</span>
                      <span className="review-date">{review.fecha}</span>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.estrellas ? "star filled" : "star"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="review-content">
                    <p>{review.comentario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="perfil-pro-social">
        <h3><i className="bi bi-share-fill"></i> Conecta conmigo</h3>
        <div className="social-links">
          {perfil.linkedin && (
            <a href={perfil.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          )}
          {perfil.facebook && (
            <a href={perfil.facebook} className="social-link" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          )}
          {perfil.instagram && (
            <a href={perfil.instagram} className="social-link" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
          )}
          {perfil.x && (
            <a href={perfil.x} className="social-link" target="_blank" rel="noopener noreferrer">
              <img src={xIcon} alt="X" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
