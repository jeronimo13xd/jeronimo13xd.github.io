import React from 'react';
import './Articulos.css';
import articulosImg from "../assets/Articulos.png";

const Articulos = () => {
    return (
        <div className="articles-wrapper">
            <div className="articles-container">
                {/* Filtros */}
                <div className="filters-section">
                    <div className="filters-header">
                        <div className="filters-categories">
                            {['Categoría', 'Fecha', 'Autor', 'Valoración', 'Tiempo'].map((item, index) => (
                                <span key={index} className="filter-tag">{item}</span>
                            ))}
                        </div>
                        <div className="filters-actions">
                            <button className="filter-btn apply-btn">Aplicar Filtros</button>
                            <button className="filter-btn clear-btn">Limpiar Filtros</button>
                        </div>
                    </div>
                </div>

                {/* Artículo 1 */}
                <div className="article-card">
                    <div className="article-image">
                        <img src={articulosImg} alt="Red doméstica" className="article-img" />
                    </div>
                    <div className="article-content">
                        <h3 className="article-title">Cómo mejorar la seguridad de tu red doméstica</h3>
                        <p className="article-summary">
                            Descubre las mejores prácticas para proteger tu red doméstica contra amenazas comunes y mantener tus dispositivos seguros.
                        </p>
                        <div className="article-meta">
                            <div className="meta-item"><span className="meta-label">Fecha:</span> <span className="meta-value">12/08/2024</span></div>
                            <div className="meta-item"><span className="meta-label">Categorías:</span> <span className="meta-value">Seguridad, Redes</span></div>
                            <div className="meta-item"><span className="meta-label">Autor:</span> <span className="meta-value">Juan Pérez</span></div>
                            <div className="meta-item"><span className="meta-label">Valoración:</span> <span className="meta-value">★★★★☆ (4/5)</span></div>
                            <div className="meta-item"><span className="meta-label">Tiempo:</span> <span className="meta-value">5 min</span></div>
                        </div>
                        <button className="read-more-btn">Leer más</button>
                    </div>
                </div>

                {/* Artículo 2 */}
                <div className="article-card">
                    <div className="article-image">
                        <img src={articulosImg} alt="Ciberseguridad personal" className="article-img" />
                    </div>
                    <div className="article-content">
                        <h3 className="article-title">Ciberseguridad personal: protege tu identidad en línea</h3>
                        <p className="article-summary">
                            Aprende cómo crear contraseñas seguras, evitar fraudes y mantener tu información personal protegida mientras navegas por internet.
                        </p>
                        <div className="article-meta">
                            <div className="meta-item"><span className="meta-label">Fecha:</span> <span className="meta-value">28/09/2024</span></div>
                            <div className="meta-item"><span className="meta-label">Categorías:</span> <span className="meta-value">Ciberseguridad, Privacidad</span></div>
                            <div className="meta-item"><span className="meta-label">Autor:</span> <span className="meta-value">Laura Méndez</span></div>
                            <div className="meta-item"><span className="meta-label">Valoración:</span> <span className="meta-value">★★★★★ (5/5)</span></div>
                            <div className="meta-item"><span className="meta-label">Tiempo:</span> <span className="meta-value">6 min</span></div>
                        </div>
                        <button className="read-more-btn">Leer más</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Articulos;
