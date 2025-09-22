import React from 'react';
import './Paso5.css';

const Paso5 = ({ prevStep, handleSubmit, datos, isSubmitting }) => {
    return (
        <div className="paso5-wrapper">
            <div className="paso5-container">
                {/* Fondo azul */}
                <div className="azul-background"></div>
                
                {/* Contenido principal */}
                <div className="paso5-content">
                    
                    {/* Header */}
                    <div className="paso5-header">
                        <h2>CONFIRMAR DATOS</h2>
                        <p>Paso 6 de 6 - Revise y confirme su información</p>
                        
                        <div className="progress-container">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                            </div>
                            <div className="progress-text">Progreso: 100%</div>
                        </div>
                    </div>

                    {/* Alerta importante */}
                    <div className="alert-important">
                        <i className="bi bi-exclamation-circle-fill"></i>
                        <div>
                            <h4>¡REVISE ATENTAMENTE!</h4>
                            <p>Si se ingresan datos falsos, no habrá devolución de dinero. Verifique su información antes de confirmar.</p>
                            <p>Gracias por su comprensión. ALEPI</p>
                        </div>
                    </div>

                    {/* Resumen de datos */}
                    <div className="confirmation-card">
                        <div className="confirmation-sections">
                            {/* Datos Personales */}
                            <div className="confirmation-section">
                                <h5><i className="bi bi-person-badge"></i> Datos Personales</h5>
                                <div className="data-grid">
                                    <div className="data-item">
                                        <span className="data-label">Nombre completo:</span>
                                        <span className="data-value">{datos.nombre || 'No proporcionado'} {datos.apellidoPaterno || ''} {datos.apellidoMaterno || ''}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Fecha de nacimiento:</span>
                                        <span className="data-value">{datos.fechaNacimiento || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Género:</span>
                                        <span className="data-value">{datos.genero || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Teléfono:</span>
                                        <span className="data-value">{datos.codigoArea ? `(${datos.codigoArea}) ` : ''}{datos.telefono || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item full-width">
                                        <span className="data-label">Dirección:</span>
                                        <span className="data-value">
                                            {datos.calle || 'No proporcionado'} {datos.numero || ''} {datos.interior ? `Int. ${datos.interior}` : ''}, 
                                            CP: {datos.codigoPostal || 'N/A'}, {datos.alcaldia || 'N/A'}, {datos.estado || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Datos Profesionales */}
                            <div className="confirmation-section">
                                <h5><i className="bi bi-mortarboard"></i> Datos Profesionales</h5>
                                <div className="data-grid">
                                    <div className="data-item">
                                        <span className="data-label">Universidad:</span>
                                        <span className="data-value">{datos.universidad || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Licenciatura:</span>
                                        <span className="data-value">{datos.licenciatura || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Cédula profesional:</span>
                                        <span className="data-value">{datos.cedulaProfesional || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Especialidad:</span>
                                        <span className="data-value">{datos.especialidades || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item full-width">
                                        <span className="data-label">Certificaciones:</span>
                                        <span className="data-value">{datos.certificaciones || 'No proporcionado'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Datos Laborales */}
                            <div className="confirmation-section">
                                <h5><i className="bi bi-briefcase"></i> Datos Laborales</h5>
                                <div className="data-grid">
                                    <div className="data-item full-width">
                                        <span className="data-label">Experiencia laboral:</span>
                                        <span className="data-value">{datos.experienciaLaboral || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Monto de asesoría:</span>
                                        <span className="data-value price">{datos.montoAsesoria ? `$${datos.montoAsesoria} MXN` : 'No proporcionado'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Idiomas */}
                            <div className="confirmation-section">
                                <h5><i className="bi bi-translate"></i> Idiomas</h5>
                                <div className="data-grid">
                                    <div className="data-item full-width">
                                        <span className="data-label">Idiomas que habla:</span>
                                        <span className="data-value">
                                            {datos.idiomas && datos.idiomas.length > 0 ? (
                                                <span className="languages-list">
                                                    {datos.idiomas.filter(idioma => idioma !== "Otros").join(', ')}
                                                    {datos.idiomas.includes("Otros") && datos.otrosIdiomas && `, ${datos.otrosIdiomas}`}
                                                </span>
                                            ) : (
                                                'No se seleccionaron idiomas'
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Datos de Contacto */}
                            <div className="confirmation-section">
                                <h5><i className="bi bi-chat-dots"></i> Datos de Contacto</h5>
                                <div className="data-grid">
                                    <div className="data-item">
                                        <span className="data-label">Correo electrónico:</span>
                                        <span className="data-value">{datos.correoContacto || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">WhatsApp:</span>
                                        <span className="data-value">{datos.whatsapp || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">LinkedIn:</span>
                                        <span className="data-value link">{datos.linkedin || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Facebook:</span>
                                        <span className="data-value link">{datos.facebook || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">Instagram:</span>
                                        <span className="data-value link">{datos.instagram || 'No proporcionado'}</span>
                                    </div>
                                    <div className="data-item">
                                        <span className="data-label">X (Twitter):</span>
                                        <span className="data-value link">{datos.x || 'No proporcionado'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="confirmation-actions">
                            <div className="terms-agreement">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="termsAgreement" required />
                                    <label className="form-check-label" htmlFor="termsAgreement">
                                        He revisado y confirmo que toda la información proporcionada es verídica y acepto los 
                                        <a href="/terminos" target="_blank"> términos y condiciones</a> y el 
                                        <a href="/privacidad" target="_blank"> aviso de privacidad</a>.
                                    </label>
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
                                    <span>Volver a editar</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="btn-success"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            <span>Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle"></i>
                                            <span>Confirmar y Finalizar</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer interno */}
                    <div className="login-link">
                        <i className="bi bi-shield-lock"></i>
                        Sus datos están protegidos y serán utilizados únicamente para fines de contacto
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paso5;