import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Videos.css';

// Importación de imágenes
import abogadosImg from "../assets/abogados.png";
import psicologosImg from "../assets/psicologos.png";
import peritosImg from "../assets/peritos.png";

const categories = [
    {
        title: "Abogados",
        description: "Explora videos sobre derecho en áreas como Civil, Penal, Laboral y Corporativo.",
        image: abogadosImg,
        path: "/videos/abogados",
        videoCount: "120+ videos",
        specialties: ["Civil", "Penal", "Laboral", "Corporativo", "Familiar", "Tributario"],
        icon: "⚖️",
        color: "#1e40af",
        gradient: "linear-gradient(135deg, #1e40af 0%, #3730a3 100%)"
    },
    {
        title: "Psicólogos",
        description: "Videos especializados en terapia, salud mental y estrategias psicológicas impartidos por profesionales.",
        image: psicologosImg,
        path: "/videos/psicologos",
        videoCount: "85+ videos",
        specialties: ["Terapia", "Salud Mental", "Estrategias", "Clínica", "Educativa"],
        icon: "💭",
        color: "#7e22ce",
        gradient: "linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)"
    },
    {
        title: "Peritos",
        description: "Descubre contenido sobre criminalística, grafoscopía, dactiloscopía, valuación, informática y más.",
        image: peritosImg,
        path: "/videos/peritos",
        videoCount: "150+ videos",
        specialties: ["Criminalística", "Grafoscopía", "Informática", "Dactiloscopía", "Valuación"],
        icon: "🔍",
        color: "#059669",
        gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)"
    }
];

const VideosEnhanced = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleCategoryClick = (path) => {
        navigate(path);
    };

    const filteredCategories = categories.filter(category => 
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.specialties.some(spec => 
            spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="videos-content-wrapper">
            {/* Hero Section */}
            <div className="video-hero-enhanced">
                <div className="hero-background">
                    <div className="hero-particles">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                animationDelay: `${i * 0.2}s`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}></div>
                        ))}
                    </div>
                </div>
                <div className="hero-content-enhanced">
                    <div className="hero-badge">
                        <span>✨ Nueva Experiencia</span>
                    </div>
                    <h1>
                        <span className="hero-title-main">Videoteca</span>
                        <span className="hero-title-accent">ALEPI</span>
                    </h1>
                    <p className="hero-subtitle-enhanced">
                        Conocimiento especializado en formato video
                    </p>
                    <p className="hero-description-enhanced">
                        Accede a nuestra colección exclusiva de videos organizados por categorías profesionales. 
                        Aprende de los mejores expertos en derecho, psicología y peritajes.
                    </p>
                    
                    <div className="hero-stats-enhanced">
                        <div className="stat-enhanced">
                            <div className="stat-icon">📹</div>
                            <div>
                                <span className="stat-number">355+</span>
                                <span className="stat-label">Videos Profesionales</span>
                            </div>
                        </div>
                        <div className="stat-enhanced">
                            <div className="stat-icon">👨‍💼</div>
                            <div>
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Expertos Certificados</span>
                            </div>
                        </div>
                        <div className="stat-enhanced">
                            <div className="stat-icon">📚</div>
                            <div>
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Especialidades</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="search-section">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Buscar categorías o especialidades..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </div>
            </div>

            {/* Search Results Indicator */}
            {searchQuery && (
                <div className="search-results-indicator">
                    <span>
                        {filteredCategories.length} categoría(s) encontrada(s) para "{searchQuery}"
                    </span>
                    <button onClick={() => setSearchQuery("")}>Limpiar</button>
                </div>
            )}

            {/* Category Navigation */}
            <div className="category-navigation-enhanced">
                <div className="nav-header">
                    <h2>Explora por Categoría</h2>
                    <div className="nav-controls">
                        <button className="nav-control prev" 
                                onClick={() => setActiveCategory((activeCategory - 1 + categories.length) % categories.length)}>
                            ‹
                        </button>
                        <button className="nav-control next"
                                onClick={() => setActiveCategory((activeCategory + 1) % categories.length)}>
                            ›
                        </button>
                    </div>
                </div>
                
                <div className="category-indicators">
                    {categories.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${activeCategory === index ? 'active' : ''}`}
                            onClick={() => setActiveCategory(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Featured Category */}
            <div className="featured-category">
                <div className="featured-background" style={{
                    background: categories[activeCategory].gradient
                }}></div>
                
                <div className="featured-content">
                    <div className="featured-info">
                        <div className="category-meta">
                            <span className="category-icon">{categories[activeCategory].icon}</span>
                            <span className="category-badge-enhanced">{categories[activeCategory].videoCount}</span>
                        </div>
                        <h3>{categories[activeCategory].title}</h3>
                        <p>{categories[activeCategory].description}</p>
                        
                        <div className="specialties-grid">
                            {categories[activeCategory].specialties.map((specialty, idx) => (
                                <div key={idx} className="specialty-tag">
                                    {specialty}
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className="cta-button-enhanced"
                            onClick={() => handleCategoryClick(categories[activeCategory].path)}
                        >
                            <span>Explorar Videos</span>
                            <div className="button-arrow">
                                <span>→</span>
                            </div>
                        </button>
                    </div>
                    
                    <div className="featured-visual">
                        <div className="visual-container">
                            <img 
                                src={categories[activeCategory].image} 
                                alt={categories[activeCategory].title}
                            />
                            <div className="visual-overlay">
                                <div className="play-indicator">
                                    <span>▶</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Categories Grid */}
            <div className="all-categories-enhanced">
                <div className="section-header">
                    <h2>Todas las Categorías</h2>
                    <p>Descubre nuestra completa biblioteca de contenido especializado</p>
                </div>
                
                <div className="categories-grid-enhanced">
                    {filteredCategories.map((category, index) => (
                        <div 
                            key={index}
                            className={`category-card-enhanced ${activeCategory === index ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category.path)}
                            style={{ '--category-color': category.color }}
                        >
                            <div className="card-header-enhanced">
                                <span className="card-icon-enhanced">{category.icon}</span>
                                <span className="card-badge-enhanced">{category.videoCount}</span>
                            </div>
                            
                            <div className="card-image-enhanced">
                                <img src={category.image} alt={category.title} />
                                <div className="card-overlay">
                                    <span>Ver categoría</span>
                                </div>
                            </div>
                            
                            <div className="card-content-enhanced">
                                <h4>{category.title}</h4>
                                <p>{category.description}</p>
                                
                                <div className="progress-indicator">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{
                                            width: `${Math.min(category.specialties.length * 15, 100)}%`
                                        }}></div>
                                    </div>
                                    <span>{category.specialties.length} especialidades</span>
                                </div>
                            </div>
                            
                            <div className="card-footer-enhanced">
                                <button className="card-button-enhanced">
                                    <span>Explorar</span>
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section-enhanced">
                <div className="features-background"></div>
                
                <div className="features-content">
                    <div className="section-header">
                        <h2>¿Por qué elegir nuestra videoteca?</h2>
                        <p>Ventajas exclusivas para tu desarrollo profesional</p>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <span>🎯</span>
                            </div>
                            <h4>Contenido Especializado</h4>
                            <p>Videos creados y revisados por profesionales certificados en cada área de expertise.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <span>📊</span>
                            </div>
                            <h4>Actualización Constante</h4>
                            <p>Nuevo contenido agregado semanalmente para mantenerte al día con las últimas tendencias.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <span>⚡</span>
                            </div>
                            <h4>Acceso Multiplataforma</h4>
                            <p>Disponible 24/7 desde cualquier dispositivo: computadora, tablet o smartphone.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <span>👥</span>
                            </div>
                            <h4>Comunidad Profesional</h4>
                            <p>Conecta con otros profesionales y comparte conocimientos en nuestra plataforma.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideosEnhanced;