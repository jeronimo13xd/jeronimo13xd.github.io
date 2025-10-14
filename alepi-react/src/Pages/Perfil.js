// src/Pages/Perfil.jsx
import React, { useEffect, useState, useContext } from "react";
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

/* ------------- CONFIG AXIOS ------------- */
axios.defaults.baseURL = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function Perfil() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("informacion");

  /* ---------- Cargar perfil al montar ---------- */
  useEffect(() => {
    const id = user?.ID_Usuario || localStorage.getItem("idUsuario");
    if (!id) {
      alert("No se encontró un usuario válido. Inicia sesión.");
      navigate("/");
      return;
    }

    axios.get("GetUsuario.php?id=" + id)
      .then(r => {
        if (r.data.status === "success") {
          setPerfil(r.data.data);
        } else {
          alert(r.data.message || "No se encontraron datos.");
          navigate("/");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error al cargar el perfil.");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="perfil-loading">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!perfil) return null;

  /* ---------- Helpers ---------- */
  const imgURL = perfil.imagenPerfil || "/default-avatar.png";
  const fullName = `${perfil.nombreVisible || perfil.nombreCuenta || ""} ${perfil.apellidoP || ""} ${perfil.apellidoM || ""}`.trim() || "Sin nombre";
  const idiomas = Array.isArray(perfil.Idiomas) ? perfil.Idiomas.join(", ") : (perfil.Idiomas || "No especificados");
  const certific = Array.isArray(perfil.Certificaciones) ? perfil.Certificaciones.join(", ") : (perfil.Certificaciones || "No especificadas");

  const valoraciones = [
    { nombre: "Ernesto Vega", fecha: "02/07/24", comentario: "Servicio excepcional, muy profesional y atento a los detalles.", estrellas: 5 },
    { nombre: "María González", fecha: "15/06/24", comentario: "Excelente trabajo, cumplió con todas las expectativas.", estrellas: 4 },
    { nombre: "Carlos López", fecha: "28/05/24", comentario: "Muy recomendable, gran experiencia de trabajo.", estrellas: 5 }
  ];

  const promedioEstrellas = valoraciones.reduce((acc, curr) => acc + curr.estrellas, 0) / valoraciones.length;

  // Función para manejar el contacto
  const handleContact = (type) => {
    if (type === 'whatsapp') {
      const phone = perfil.telefono?.replace(/\D/g, '');
      if (phone) {
        window.open(`https://wa.me/${phone}`, '_blank');
      } else {
        alert('Número de teléfono no disponible');
      }
    } else if (type === 'email') {
      const email = perfil.correo;
      if (email) {
        window.location.href = `mailto:${email}`;
      } else {
        alert('Correo electrónico no disponible');
      }
    }
  };

  return (
    <div className="perfil-pro-container">
      {/* Header del perfil */}
      <div className="perfil-pro-header">
        <div className="perfil-pro-avatar-section">
          <div className="perfil-pro-avatar-container">
            <img src={imgURL} alt={fullName} className="perfil-pro-avatar" onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiNlNmYyZmYiLz4KPHBhdGggZD0iTTQ1IDUwQzQ1IDUzLjg2NiA0OC4xMzQgNTcgNTIgNTdDNTUuODY2IDU3IDU5IDUzLjg2NiA1OSA1MEM1OSA0Ni4xMzQgNTUuODY2IDQzIDUyIDQzQzQ4LjEzNCA0MyA0NSA0Ni4xMzQgNDUgNTBaTTcyIDUwQzcyIDUzLjg2NiA3NS4xMzQgNTcgNzkgNTdDODIuODY2IDU3IDg2IDUzLjg2NiA4NiA1MEM4NiA0Ni4xMzQgODIuODY2IDQzIDc5IDQzQzc1LjEzNCA0MyA3MiA0Ni4xMzQgNzIgNTBaTTMwIDg0QzMwIDc0IDM4IDY2IDQ4IDY2SDcyQzgyIDY2IDkwIDc0IDkwIDg0Vjg3SDMwVjg0WiIgZmlsbD0iIzAwNWM5OSIvPgo8L3N2Zz4K';
            }} />
            <div className="perfil-pro-status"></div>
          </div>
          <div className="perfil-pro-info">
            <h1>{fullName}</h1>
            <p className="perfil-pro-profesion">{perfil.profesion || "Profesional"}</p>
            <div className="perfil-pro-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(promedioEstrellas) ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">({valoraciones.length} valoraciones)</span>
            </div>
          </div>
        </div>
        
        <div className="perfil-pro-actions">
          <button className="btn-pro-primary" onClick={() => handleContact('whatsapp')}>
            <img src={whatsappIcon} alt="WhatsApp" />
            Contactar
          </button>
          <button className="btn-pro-secondary" onClick={() => handleContact('email')}>
            <img src={emailIcon} alt="Email" />
            Enviar mensaje
          </button>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="perfil-pro-tabs">
        <button 
          className={`tab-btn ${activeTab === "informacion" ? "active" : ""}`}
          onClick={() => setActiveTab("informacion")}
        >
          <i className="bi bi-person-fill"></i>
          Información
        </button>
        <button 
          className={`tab-btn ${activeTab === "experiencia" ? "active" : ""}`}
          onClick={() => setActiveTab("experiencia")}
        >
          <i className="bi bi-briefcase-fill"></i>
          Experiencia
        </button>
        <button 
          className={`tab-btn ${activeTab === "valoraciones" ? "active" : ""}`}
          onClick={() => setActiveTab("valoraciones")}
        >
          <i className="bi bi-star-fill"></i>
          Valoraciones
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="perfil-pro-content">
        {activeTab === "informacion" && (
          <div className="tab-content">
            <div className="info-grid">
              {/* Información de contacto */}
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

              {/* Especialidades */}
              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-award-fill"></i>
                  <h3>Especialidades</h3>
                </div>
                <div className="card-body">
                  <div className="specialties">
                    {(perfil.especialidad ? perfil.especialidad.split(',') : ['No especificadas']).map((especialidad, index) => (
                      <span key={index} className="specialty-tag">{especialidad.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Educación y Certificaciones */}
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

              {/* Idiomas */}
              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-translate"></i>
                  <h3>Idiomas</h3>
                </div>
                <div className="card-body">
                  <div className="languages">
                    {idiomas !== "No especificados" ? idiomas.split(', ').map((idioma, index) => (
                      <div key={index} className="language-item">
                        <span className="language-name">{idioma}</span>
                        <div className="language-level">
                          <div className="level-bar">
                            <div className="level-fill" style={{width: `${Math.random() * 30 + 70}%`}}></div>
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

      {/* Redes Sociales */}
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