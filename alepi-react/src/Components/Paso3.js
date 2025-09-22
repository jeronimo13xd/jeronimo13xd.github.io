import React from 'react';
import './Paso3.css';

const Paso3 = ({ prevStep, nextStep, handleChange, datos, isSubmitting }) => {
    return (
        <div className="paso3-wrapper">
            <div className="paso3-container">
                {/* Fondo azul */}
                <div className="azul-background"></div>
                
                {/* Contenido principal */}
                <div className="paso3-content">
                    
                    {/* Header */}
                    <div className="paso3-header">
                        <h2>DATOS LABORALES</h2>
                        <p>Paso 4 de 6 - Complete su información laboral</p>
                        
                        <div className="progress-container">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: '66%'}}></div>
                            </div>
                            <div className="progress-text">Progreso: 66%</div>
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
                            <div className="form-sections-row">
                                {/* Experiencia Laboral */}
                                <div className="form-section-expanded">
                                    <h5><i className="bi bi-briefcase"></i> Experiencia Laboral</h5>
                                    <div className="form-group">
                                        <label htmlFor="experienciaLaboral">Describa su experiencia laboral *</label>
                                        <textarea
                                            id="experienciaLaboral"
                                            rows="5"
                                            placeholder="Describa sus roles anteriores, responsabilidades, logros y años de experiencia en su campo profesional..."
                                            value={datos.experienciaLaboral || ''}
                                            onChange={(e) => handleChange('experienciaLaboral', e.target.value)}
                                            disabled={isSubmitting}
                                        ></textarea>
                                        <div className="form-text">
                                            <i className="bi bi-info-circle"></i>
                                            Incluya detalles relevantes sobre su experiencia profesional
                                        </div>
                                    </div>
                                </div>

                                {/* Monto de la Asesoría */}
                                <div className="form-section-compact">
                                    <h5><i className="bi bi-cash-coin"></i> Monto de la Asesoría</h5>
                                    <div className="form-group">
                                        <label htmlFor="montoAsesoria">Ingrese el monto de la asesoría *</label>
                                        <div className="input-group-currency">
                                            <span className="currency-symbol">$</span>
                                            <input
                                                type="text"
                                                id="montoAsesoria"
                                                placeholder="Ej: 500, 1500, 2500..."
                                                value={datos.montoAsesoria || ''}
                                                onChange={(e) => handleChange('montoAsesoria', e.target.value)}
                                                disabled={isSubmitting}
                                            />
                                            <span className="currency-code">MXN</span>
                                        </div>
                                        <div className="form-text">
                                            <i className="bi bi-lightbulb"></i>
                                            Rango sugerido: (gratis) (500-3000) (3000+)
                                        </div>
                                        
                                        {/* Indicadores de rango de precios */}
                                        <div className="price-range-indicators">
                                            <div className="price-range">
                                                <span className="price-label">Básico</span>
                                                <div className="price-bar">
                                                    <div className="price-fill" style={{width: '33%'}}></div>
                                                </div>
                                                <span className="price-amount">$0 - $500</span>
                                            </div>
                                            <div className="price-range">
                                                <span className="price-label">Intermedio</span>
                                                <div className="price-bar">
                                                    <div className="price-fill" style={{width: '66%'}}></div>
                                                </div>
                                                <span className="price-amount">$500 - $3000</span>
                                            </div>
                                            <div className="price-range">
                                                <span className="price-label">Avanzado</span>
                                                <div className="price-bar">
                                                    <div className="price-fill" style={{width: '100%'}}></div>
                                                </div>
                                                <span className="price-amount">$3000+</span>
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
                        ¿Necesitas ayuda con los montos? <a href="/ayuda-precios">Consulta nuestra guía</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paso3;