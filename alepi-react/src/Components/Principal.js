import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Princpal.css';

function Principal() {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  useEffect(() => {
    axios.get('http://localhost/alepirea/getProfesionales.php')
      .then(res => {
        setProfesionales(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener profesionales:', err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '👥' },
    { id: 'perito', name: 'Perito', icon: '🔍' },
    { id: 'abogado', name: 'Abogado', icon: '⚖️' },
    { id: 'psicologo', name: 'Psicólogo', icon: '💭' }
  ];

  const filteredProfesionales = profesionales.filter(pro => {
    const matchesSearch = pro.Nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pro.Especialidad?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || 
                           pro.Especialidad?.toLowerCase().includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const articles = [
    {
      title: "La Importancia de la Peritación en Procesos Legales",
      author: "Dr. Carlos Mendoza",
      excerpt: "Análisis sobre cómo los peritos contribuyen al sistema judicial moderno...",
      date: "15 Ene 2024",
      readTime: "5 min"
    },
    {
      title: "Nuevas Tendencias en Psicología Forense",
      author: "Dra. Ana López",
      excerpt: "Exploración de metodologías actuales en evaluación psicológica...",
      date: "12 Ene 2024",
      readTime: "7 min"
    }
  ];

  const videos = [
    {
      title: "Cómo Elegir el Profesional Adecuado",
      description: "Guía práctica para seleccionar expertos según tu caso",
      duration: "12:45",
      views: "1.2K"
    },
    {
      title: "Derechos del Ciudadano en Procesos Legales",
      description: "Conoce tus derechos y cómo ejercerlos efectivamente",
      duration: "18:30",
      views: "2.4K"
    }
  ];

  return (
    <div className="principal-container">
      {/* Header Section */}
      <div className="principal-header">
        <h1>Encuentra Profesionales Certificados</h1>
        <p>Conectamos expertos verificados con clientes que buscan soluciones confiables</p>
      </div>

      <div className="principal-top">
        {/* Search Block - Mejorado */}
        <div className="ps-search-block">
          <div className="search-header">
            <h3>Filtrar Búsqueda</h3>
            <div className="search-results">
              <span>{filteredProfesionales.length} profesionales encontrados</span>
            </div>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`ps-option ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="search-input-group">
            <input 
              type="text" 
              className="ps-input" 
              placeholder="Nombre, especialidad o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="ps-search-btn">
              <span className="search-icon">🔍</span>
              Buscar
            </button>
          </div>

          <div className="search-tips">
            <h4>Sugerencias de búsqueda:</h4>
            <div className="tips-list">
              <span>Perito financiero</span>
              <span>Abogado penalista</span>
              <span>Psicólogo forense</span>
            </div>
          </div>
        </div>

        {/* Professionals Block - Mejorado */}
        <div className="ps-professionals">
          <div className="professionals-header">
            <h2 className="ps-title">Profesionales Destacados</h2>
            <div className="sort-options">
              <select className="sort-select">
                <option>Ordenar por: Destacados</option>
                <option>Mejor valorados</option>
                <option>Más recientes</option>
              </select>
            </div>
          </div>

          <div className="ps-list">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Cargando profesionales...</p>
              </div>
            ) : filteredProfesionales.length > 0 ? (
              filteredProfesionales.map((pro, index) => (
                <div className="ps-card" key={index}>
                  <div className="card-avatar">
                    <img
                      className="ps-img"
                      src={pro.ImagenURL || "/default-avatar.png"}
                      alt={pro.Nombre}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiNlNmYyZmYiLz4KPHBhdGggZD0iTTMwIDM1QzMzLjg2NiAzNSAzNyAzMS44NjYgMzcgMjhDMzcgMjQuMTM0IDMzLjg2NiAyMSAzMCAyMUMyNi4xMzQgMjEgMjMgMjQuMTM0IDIzIDI4QzIzIDMxLjg2NiAyNi4xMzQgMzUgMzAgMzVaIiBmaWxsPSIjMDA1Yzk5Ii8+CjxwYXRoIGQ9Ik0yMiA0MkMyMiAzNy4wMDUgMjYuMDA1IDMzIDMxIDMzSDM5QzQzLjk5NSAzMyA0OCAzNy4wMDUgNDggNDJWNDVIMjJWNDJaIiBmaWxsPSIjMDA1Yzk5Ii8+Cjwvc3ZnPgo=';
                      }}
                    />
                    <div className="online-status"></div>
                  </div>
                  <div className="ps-info">
                    <h3>{pro.Nombre}</h3>
                    <p className="specialty">{pro.Especialidad || 'Especialidad no especificada'}</p>
                    <div className="professional-meta">
                      <span className="rating">⭐ 4.8 (24)</span>
                      <span className="experience">📅 5+ años</span>
                    </div>
                  </div>
                  <button className="contact-btn">
                    Contactar
                  </button>
                </div>
              ))
            ) : (
              <div className="ps-empty">
                <div className="empty-icon">🔍</div>
                <h3>No se encontraron profesionales</h3>
                <p>Intenta ajustar los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Mejorado */}
      <div className="principal-bottom">
        <div className="ps-article">
          <div className="article-header">
            <h3>Artículos Destacados</h3>
            <a href="#" className="view-all">Ver todos →</a>
          </div>
          <div className="articles-list">
            {articles.map((article, index) => (
              <div className="article-card" key={index}>
                <div className="article-content">
                  <h4>{article.title}</h4>
                  <p className="ps-author">Por {article.author}</p>
                  <p className="ps-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ps-video">
          <div className="video-header">
            <h3>Videos Educativos</h3>
            <a href="#" className="view-all">Ver todos →</a>
          </div>
          <div className="videos-list">
            {videos.map((video, index) => (
              <div className="video-card" key={index}>
                <div className="video-thumbnail">
                  <div className="play-button">▶</div>
                  <span className="video-duration">{video.duration}</span>
                </div>
                <div className="video-content">
                  <h4>{video.title}</h4>
                  <p>{video.description}</p>
                  <div className="video-meta">
                    <span>👁️ {video.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Principal;