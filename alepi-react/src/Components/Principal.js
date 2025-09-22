import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Princpal.css'; // Asegúrate de tener los estilos

function Principal() {
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/alepirea/getProfesionales.php')
      .then(res => setProfesionales(res.data))
      .catch(err => console.error('Error al obtener profesionales:', err));
  }, []);

  return (
    <div className="principal-container">
      <div className="principal-top">
        <div className="ps-search-block">
          <button className="ps-option">Perito</button>
          <button className="ps-option">Abogado</button>
          <button className="ps-option">Psicologo</button>
          <input type="text" className="ps-input" placeholder="Nombre o palabra clave" />
          <button className="ps-search-btn">Buscar</button>
        </div>

        <div className="ps-professionals">
          <h2 className="ps-title">Profesionales</h2>
          <div className="ps-list">
            {profesionales.length > 0 ? (
              profesionales.map((pro, index) => (
                <div className="ps-card" key={index}>
                  <img
                    className="ps-img"
                    src={pro.ImagenURL || "http://localhost/alepirea/default.jpg"}
                    alt={pro.Nombre}
                  />
                  <div className="ps-info">
                    <h3>{pro.Nombre}</h3>
                    <p>Especialidad: {pro.Especialidad || 'Sin definir'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="ps-empty">No hay profesionales disponibles.</div>
            )}
          </div>
        </div>
      </div>

      <div className="principal-bottom">
        <div className="ps-article">
          <h3>Título</h3>
          <p className="ps-author">Nombre del Autor</p>
          <p className="ps-excerpt">
            Este es un extracto del artículo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="ps-video">
          <h3>Video</h3>
          <div className="ps-video-placeholder">VIDEO</div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
