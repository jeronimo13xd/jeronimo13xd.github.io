import React, { useState } from 'react';
import './Articulos.css';
import articulosImg from "../assets/Articulos.png";

const Articulos = () => {
    const [activeCategory, setActiveCategory] = useState('Todas');

    const articles = [
        {
            id: 1,
            title: "Cómo mejorar la seguridad de tu red doméstica",
            summary: "Descubre las mejores prácticas para proteger tu red doméstica contra amenazas comunes y mantener tus dispositivos seguros.",
            date: "12/08/2024",
            categories: ["Seguridad", "Redes"],
            author: "Juan Pérez",
            rating: 4,
            readTime: "5 min",
            isNew: true
        },
        {
            id: 2,
            title: "Ciberseguridad personal: protege tu identidad en línea",
            summary: "Aprende cómo crear contraseñas seguras, evitar fraudes y mantener tu información personal protegida mientras navegas por internet.",
            date: "28/09/2024",
            categories: ["Ciberseguridad", "Privacidad"],
            author: "Laura Méndez",
            rating: 5,
            readTime: "6 min",
            isNew: false
        },
        {
            id: 3,
            title: "Guía completa de privacidad digital",
            summary: "Protege tus datos personales y mantén el control sobre tu información en la era digital.",
            date: "15/09/2024",
            categories: ["Privacidad", "Seguridad"],
            author: "Carlos Rodríguez",
            rating: 4,
            readTime: "8 min",
            isNew: true
        },
        {
            id: 4,
            title: "Derechos digitales del consumidor",
            summary: "Conoce tus derechos al realizar compras y transacciones en línea de forma segura.",
            date: "05/09/2024",
            categories: ["Derecho", "Consumidor"],
            author: "Ana García",
            rating: 5,
            readTime: "7 min",
            isNew: false
        }
    ];

    const categories = ['Todas', 'Seguridad', 'Ciberseguridad', 'Privacidad', 'Redes', 'Derecho', 'Consumidor'];

    const filteredArticles = activeCategory === 'Todas' 
        ? articles 
        : articles.filter(article => article.categories.includes(activeCategory));

    return (
        <div className="articles-wrapper">
            <div className="articles-container">
                
                {/* Header Section */}
                <div className="articles-header">
                    <h1>Artículos Destacados</h1>
                    <p>Descubre contenido especializado en seguridad y tecnología</p>
                </div>

                {/* Filtros Mejorados */}
                <div className="filters-section">
                    <div className="filters-header">
                        <div className="filters-categories">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`filter-tag ${activeCategory === category ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="filters-actions">
                            <button className="filter-btn apply-btn">
                                <span>🔍</span>
                                Buscar
                            </button>
                            <button 
                                className="filter-btn clear-btn"
                                onClick={() => setActiveCategory('Todas')}
                            >
                                <span>🔄</span>
                                Limpiar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Artículos Grid */}
                <div className="articles-grid">
                    {filteredArticles.map((article) => (
                        <div key={article.id} className="article-card">
                            <div className="article-image">
                                <img src={articulosImg} alt={article.title} className="article-img" />
                                {article.isNew && <div className="new-badge">Nuevo</div>}
                                <div className="read-time">{article.readTime}</div>
                            </div>
                            
                            <div className="article-content">
                                <div className="article-meta">
                                    <span className="article-date">{article.date}</span>
                                    <div className="article-categories">
                                        {article.categories.map((cat, index) => (
                                            <span key={index} className="category">{cat}</span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-summary">{article.summary}</p>

                                <div className="article-footer">
                                    <div className="author-section">
                                        <span className="author">Por {article.author}</span>
                                        <div className="rating">
                                            {[...Array(5)].map((_, index) => (
                                                <span 
                                                    key={index} 
                                                    className={index < article.rating ? "star filled" : "star"}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span className="rating-text">({article.rating}/5)</span>
                                        </div>
                                    </div>
                                    <button className="read-more-btn">
                                        Leer más
                                        <span className="arrow">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Articulos;