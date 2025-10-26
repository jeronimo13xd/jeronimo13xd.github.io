import React, { useState } from 'react';
import './PregFrec.css';

export default function PregFrec() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            icon: 'bi bi-person-plus',
            question: "¿Cómo puedo crear mi cuenta en ALEPI?",
            answer: "Para crear tu cuenta, haz clic en 'Registrarse' en la esquina superior derecha, completa tu información profesional y verifica tu email. El proceso toma menos de 2 minutos."
        },
        {
            icon: 'bi bi-gem',
            question: "¿Qué tipos de suscripción ofrece ALEPI?",
            answer: "ALEPI ofrece tres planes: Básico (gratuito), Profesional y Premium. Cada plan incluye herramientas específicas para diferentes necesidades profesionales."
        },
        {
            icon: 'bi bi-shield-lock',
            question: "¿Cómo protege ALEPI mi información personal?",
            answer: "Utilizamos encriptación de grado empresarial y cumplimos con las normativas de protección de datos. Tu información nunca se comparte con terceros sin tu consentimiento."
        },
        {
            icon: 'bi bi-credit-card',
            question: "¿Puedo cancelar mi suscripción premium en cualquier momento?",
            answer: "Sí, puedes cancelar tu suscripción premium en cualquier momento desde la sección 'Configuración de Cuenta'. El acceso premium permanecerá activo hasta el final del ciclo de facturación."
        },
        {
            icon: 'bi bi-wallet2',
            question: "¿Qué métodos de pago aceptan?",
            answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), transferencias bancarias y PayPal."
        },
        {
            icon: 'bi bi-headset',
            question: "¿Cómo contacto al soporte técnico?",
            answer: "Puedes contactarnos por email a soporte@alepi.com, a través del chat en vivo en nuestro horario de atención (Lun-Vie 9:00-18:00) o programando una videollamada."
        }
    ];

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="pregfrec-premium-wrapper">
            {/* Background Elegance */}
            <div className="background-elements">
                <div className="bg-circle circle-1"></div>
                <div className="bg-circle circle-2"></div>
                <div className="bg-circle circle-3"></div>
            </div>

            <div className="pregfrec-premium-container">
                {/* Hero Section con Gradiente Premium */}
                <div className="premium-hero-section">
                    <div className="hero-content">
                        <div className="hero-icon">
                            <i className="bi bi-patch-question-fill"></i>
                        </div>
                        <h1 className="hero-title">
                            Centro de <span className="gradient-text">Ayuda</span> ALEPI
                        </h1>
                        <p className="hero-subtitle">
                            Encuentra respuestas rápidas y soluciones expertas para maximizar tu experiencia en nuestra plataforma profesional
                        </p>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Soporte Disponible</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Satisfacción</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">15min</div>
                        <div className="stat-label">Respuesta Media</div>
                    </div>
                </div>

                {/* FAQ Section Mejorada */}
                <div className="premium-faq-section">
                    <div className="section-header">
                        <h2>Preguntas Frecuentes</h2>
                        <p>Respuestas detalladas a las consultas más comunes de nuestra comunidad</p>
                    </div>

                    <div className="premium-faq-grid">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index}
                                className={`premium-faq-card ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="faq-card-header">
                                    <div className="faq-icon-container">
                                        <i className={faq.icon}></i>
                                    </div>
                                    <h3 className="faq-question">{faq.question}</h3>
                                    <div className="faq-indicator">
                                        <i className={`bi ${activeIndex === index ? 'bi-dash' : 'bi-plus'}`}></i>
                                    </div>
                                </div>
                                <div className="faq-card-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section Premium */}
                <div className="premium-contact-section">
                    <div className="contact-card">
                        <div className="contact-graphic">
                            <div className="graphic-circle">
                                <i className="bi bi-headset"></i>
                            </div>
                            <div className="graphic-rings">
                                <div className="ring ring-1"></div>
                                <div className="ring ring-2"></div>
                                <div className="ring ring-3"></div>
                            </div>
                        </div>
                        <div className="contact-content">
                            <div className="contact-badge">
                                <i className="bi bi-lightning-charge"></i>
                                Soporte Prioritario
                            </div>
                            <h3>¿Necesitas ayuda personalizada?</h3>
                            <p>Nuestro equipo de expertos está listo para brindarte asistencia especializada y resolver cualquier consulta técnica</p>
                            
                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>
                                    <div className="method-info">
                                        <strong>Correo Electrónico</strong>
                                        <span>soporte@alepi.com</span>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="bi bi-clock-fill"></i>
                                    </div>
                                    <div className="method-info">
                                        <strong>Horario de Atención</strong>
                                        <span>Lun - Vie: 9:00 - 18:00</span>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                    <div className="method-info">
                                        <strong>Respuesta Garantizada</strong>
                                        <span>En menos de 24 horas</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-actions">
                                <a href="mailto:soporte@alepi.com" className="premium-btn primary">
                                    <i className="bi bi-envelope"></i>
                                    Contactar por Email
                                </a>
                                <button className="premium-btn secondary">
                                    <i className="bi bi-chat"></i>
                                    Iniciar Chat en Vivo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="resources-section">
                    <h3>Recursos Adicionales</h3>
                    <div className="resources-grid">
                        <div className="resource-card">
                            <i className="bi bi-play-btn"></i>
                            <h4>Tutoriales en Video</h4>
                            <p>Guías visuales paso a paso</p>
                        </div>
                        <div className="resource-card">
                            <i className="bi bi-journal-text"></i>
                            <h4>Documentación</h4>
                            <p>Manuales técnicos completos</p>
                        </div>
                        <div className="resource-card">
                            <i className="bi bi-megaphone"></i>
                            <h4>Actualizaciones</h4>
                            <p>Novedades de la plataforma</p>
                        </div>
                        <div className="resource-card">
                            <i className="bi bi-people"></i>
                            <h4>Comunidad</h4>
                            <p>Foros de discusión</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}