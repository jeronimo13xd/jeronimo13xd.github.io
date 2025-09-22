import React from 'react';
import './Paso4.css';

const Paso4 = ({ prevStep, nextStep, handleChange, datos, isSubmitting }) => {
    return (
        <div className="paso4-wrapper">
            <div className="paso4-container">
                {/* Fondo azul */}
                <div className="azul-background"></div>
                
                {/* Contenido principal */}
                <div className="paso4-content">
                    
                    {/* Header */}
                    <div className="paso4-header">
                        <h2>DATOS DE CONTACTO</h2>
                        <p>Paso 5 de 6 - Complete su información de contacto</p>
                        
                        <div className="progress-container">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: '83%'}}></div>
                            </div>
                            <div className="progress-text">Progreso: 83%</div>
                        </div>
                    </div>

                    {/* Alerta importante */}
                    <div className="alert-important">
                        <i className="bi bi-exclamation-circle-fill"></i>
                        <div>
                            <h4>¡IMPORTANTE!</h4>
                            <p>Si se ingresan datos falsos, no habrá devolución de dinero. Verifique su información antes de enviarla.</p>
                            <p>Gracias por su comprensión. ALEPI</p>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="form-card-large">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-sections-contact">
                                {/* Redes Sociales */}
                                <div className="form-section-social">
                                    <h5><i className="bi bi-share"></i> Redes Sociales (Opcionales)</h5>
                                    <div className="social-inputs">
                                        <div className="form-group-social">
                                            <label htmlFor="linkedin">
                                                <i className="bi bi-linkedin"></i>
                                                LinkedIn
                                            </label>
                                            <div className="input-with-icon">
                                                <span className="input-prefix">linkedin.com/in/</span>
                                                <input
                                                    type="text"
                                                    id="linkedin"
                                                    placeholder="tu-perfil"
                                                    value={datos.linkedin || ''}
                                                    onChange={(e) => handleChange('linkedin', e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-social">
                                            <label htmlFor="facebook">
                                                <i className="bi bi-facebook"></i>
                                                Facebook
                                            </label>
                                            <div className="input-with-icon">
                                                <span className="input-prefix">facebook.com/</span>
                                                <input
                                                    type="text"
                                                    id="facebook"
                                                    placeholder="tu-perfil"
                                                    value={datos.facebook || ''}
                                                    onChange={(e) => handleChange('facebook', e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-social">
                                            <label htmlFor="instagram">
                                                <i className="bi bi-instagram"></i>
                                                Instagram
                                            </label>
                                            <div className="input-with-icon">
                                                <span className="input-prefix">instagram.com/</span>
                                                <input
                                                    type="text"
                                                    id="instagram"
                                                    placeholder="tu-perfil"
                                                    value={datos.instagram || ''}
                                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-social">
                                            <label htmlFor="x">
                                                <i className="bi bi-twitter-x"></i>
                                                X (Twitter)
                                            </label>
                                            <div className="input-with-icon">
                                                <span className="input-prefix">x.com/</span>
                                                <input
                                                    type="text"
                                                    id="x"
                                                    placeholder="tu-perfil"
                                                    value={datos.x || ''}
                                                    onChange={(e) => handleChange('x', e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contacto Directo */}
                                <div className="form-section-contact">
                                    <h5><i className="bi bi-chat-dots"></i> Contacto Directo</h5>
                                    <div className="contact-inputs">
                                        <div className="form-group">
                                            <label htmlFor="correoContacto">
                                                <i className="bi bi-envelope"></i>
                                                Correo electrónico de contacto *
                                            </label>
                                            <input
                                                type="email"
                                                id="correoContacto"
                                                placeholder="correo@ejemplo.com"
                                                value={datos.correoContacto || ''}
                                                onChange={(e) => handleChange('correoContacto', e.target.value)}
                                                disabled={isSubmitting}
                                                required
                                            />
                                            <div className="form-text">
                                                <i className="bi bi-info-circle"></i>
                                                Este será el correo donde recibirás notificaciones
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="whatsapp">
                                                <i className="bi bi-whatsapp"></i>
                                                WhatsApp *
                                            </label>
                                            <div className="input-with-flag">
                                                <span className="country-flag">🇲🇽 +52</span>
                                                <input
                                                    type="tel"
                                                    id="whatsapp"
                                                    placeholder="123 456 7890"
                                                    value={datos.whatsapp || ''}
                                                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                                                    disabled={isSubmitting}
                                                    required
                                                />
                                            </div>
                                            <div className="form-text">
                                                <i className="bi bi-info-circle"></i>
                                                Incluye solo números, sin espacios ni guiones
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="button-container-dual">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={isSubmitting}
                                    className="btn-secondary"
                                >
                                    <i className="bi bi-arrow-left"></i>
                                    <span>Anterior</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={isSubmitting}
                                    className="btn-primary"
                                >
                                    <span>Siguiente</span>
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer interno */}
                    <div className="login-link">
                        <i className="bi bi-shield-check"></i>
                        Tu información de contacto es confidencial y está protegida
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paso4;