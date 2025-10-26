import React from 'react';
import './Info.css';
import susBas from '../assets/SusBas.png';
import susAva from '../assets/PlanAva.png';

const Info = () => {
    return (
        <div className="espaciado-footer">
            <div className="info-premium-container">
                {/* Hero Section */}
                <div className="info-hero-section">
                    <div className="hero-background">
                        <div className="bg-shape shape-1"></div>
                        <div className="bg-shape shape-2"></div>
                        <div className="bg-shape shape-3"></div>
                    </div>
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Descubre <span className="gradient-text">ALEPI</span>
                        </h1>
                        <p className="hero-subtitle">
                            La plataforma que transforma la conexión entre profesionales y clientes
                        </p>
                    </div>
                </div>

                {/* Qué es ALEPI */}
                <div className="about-section-premium">
                    <div className="section-header">
                        <div className="section-icon">
                            <i className="bi bi-rocket-takeoff"></i>
                        </div>
                        <h2>¿QUÉ ES ALEPI?</h2>
                        <p>Conoce nuestra misión y visión</p>
                    </div>
                    
                    <div className="about-content">
                        <div className="about-text">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Plataforma Confiable</h3>
                                    <p>
                                        ALEPI es una plataforma digital que conecta a profesionales con personas 
                                        que necesitan sus servicios, de forma rápida, ética y segura.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-people"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Comunidad Especializada</h3>
                                    <p>
                                        Ofrecemos un espacio donde terapeutas, instructores, consultores y 
                                        especialistas pueden ofrecer sus conocimientos a través de una red 
                                        confiable y moderna.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-graph-up"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Crecimiento Profesional</h3>
                                    <p>
                                        Potenciamos tu carrera profesional proporcionándote las herramientas 
                                        y visibilidad necesarias para alcanzar nuevos clientes y oportunidades.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="about-stats">
                            <div className="stat-card">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Seguro</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Disponible</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">500+</div>
                                <div className="stat-label">Profesionales</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Section */}
                <div className="video-section-premium">
                    <div className="video-container">
                        <div className="video-header">
                            <div className="video-icon">
                                <i className="bi bi-play-circle"></i>
                            </div>
                            <h2>CONÓCENOS</h2>
                            <p>Mira nuestro video corporativo y descubre todo lo que ALEPI puede ofrecerte</p>
                        </div>
                        
                        <div className="video-wrapper">
                            <div className="responsive-video">
                                <iframe
                                    src="https://www.youtube-nocookie.com/embed/ot9jr05ZljM?si=49sPDwfsr6JYnw58"
                                    title="Conócenos ALEPI"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plans Section */}
                <div className="plans-section-premium">
                    <div className="section-header">
                        <div className="section-icon">
                            <i className="bi bi-gem"></i>
                        </div>
                        <h2>ELIGE TU PLAN</h2>
                        <p>Selecciona el plan que mejor se adapte a tus necesidades profesionales</p>
                    </div>

                    <div className="plans-grid">
                        <a href="https://buy.stripe.com/test_bIYcNxcRC3oIdBC3cc" target="_blank" rel="noopener noreferrer" className="plan-card premium-basic">
                            <div className="plan-badge">Popular</div>
                            <div className="plan-content">
                                <div className="plan-image-container">
                                    <img src={susBas} alt="Plan Básico" className="plan-image" />
                                </div>
                                <div className="plan-details">
                                    <h3>BÁSICO</h3>
                                    <div className="plan-features">
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Perfil profesional básico</span>
                                        </div>
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Acceso a la comunidad</span>
                                        </div>
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Soporte por email</span>
                                        </div>
                                    </div>
                                    <div className="plan-action">
                                        <span className="plan-cta">Comenzar Ahora</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="https://buy.stripe.com/test_00g5l518UcZigNO6op" target="_blank" rel="noopener noreferrer" className="plan-card premium-advanced">
                            <div className="plan-badge featured">Recomendado</div>
                            <div className="plan-content">
                                <div className="plan-image-container">
                                    <img src={susAva} alt="Plan Avanzado" className="plan-image" />
                                </div>
                                <div className="plan-details">
                                    <h3>AVANZADO</h3>
                                    <div className="plan-features">
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Todo lo del plan Básico</span>
                                        </div>
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Perfil destacado</span>
                                        </div>
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Analíticas avanzadas</span>
                                        </div>
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Soporte prioritario 24/7</span>
                                        </div>
                                        <div className="feature">
                                            <i className="bi bi-check-circle"></i>
                                            <span>Herramientas premium</span>
                                        </div>
                                    </div>
                                    <div className="plan-action">
                                        <span className="plan-cta">Upgrade Premium</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="cta-section">
                    <div className="cta-content">
                        <h3>¿Listo para unirte a nuestra comunidad?</h3>
                        <p>Comienza hoy mismo y lleva tu carrera profesional al siguiente nivel</p>
                        <div className="cta-actions">
                            <a href="https://buy.stripe.com/test_bIYcNxcRC3oIdBC3cc" className="cta-btn primary">
                                <i className="bi bi-rocket-takeoff"></i>
                                Comenzar Gratis
                            </a>
                            <a href="https://buy.stripe.com/test_00g5l518UcZigNO6op" className="cta-btn secondary">
                                <i className="bi bi-gem"></i>
                                Ver Plan Premium
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;