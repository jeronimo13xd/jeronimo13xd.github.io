import React from 'react';
import { Link } from 'react-router-dom';
import './Paso1.css';

const Paso1 = ({ nextStep, handleChange, datos, isSubmitting }) => {
    // Lista de códigos de área con su lugar de origen en México
    const codigosAreaMexico = [
        { codigo: "55", lugar: "Ciudad de México" },
        { codigo: "81", lugar: "Monterrey" },
        { codigo: "33", lugar: "Guadalajara" },
        { codigo: "998", lugar: "Cancún" },
        { codigo: "656", lugar: "Ciudad Juárez" },
        { codigo: "664", lugar: "Tijuana" },
        { codigo: "222", lugar: "Puebla" },
        { codigo: "442", lugar: "Querétaro" },
        { codigo: "999", lugar: "Mérida" },
        { codigo: "777", lugar: "Cuernavaca" },
        { codigo: "614", lugar: "Chihuahua" },
        { codigo: "618", lugar: "Durango" },
        { codigo: "229", lugar: "Veracruz" },
        { codigo: "871", lugar: "Torreón" },
        { codigo: "961", lugar: "Tuxtla Gutiérrez" },
        { codigo: "662", lugar: "Hermosillo" },
        { codigo: "744", lugar: "Acapulco" },
        { codigo: "998", lugar: "Quintana Roo" },
        { codigo: "833", lugar: "Tampico" },
        { codigo: "477", lugar: "León" },
        { codigo: "351", lugar: "Zamora" },
        { codigo: "867", lugar: "Nuevo Laredo" },
        { codigo: "828", lugar: "Cadereyta" },
        { codigo: "653", lugar: "Agua Prieta" },
        { codigo: "773", lugar: "Tulancingo" },
        { codigo: "771", lugar: "Pachuca" },
    ];

    return (
        <div className="paso1-wrapper">
            <div className="paso1-container">
                {/* Fondo azul */}
                <div className="azul-background"></div>
                
                {/* Contenido principal */}
                <div className="paso1-content">
                    
                    {/* Header */}
                    <div className="paso1-header">
                        <h2>DATOS PERSONALES</h2>
                        <p>Paso 2 de 6 - Complete su información personal</p>
                        
                        <div className="progress-container">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: '33%'}}></div>
                            </div>
                            <div className="progress-text">Progreso: 33%</div>
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
                        <form>
                            <div className="form-section">
                                <h5><i className="bi bi-person-badge"></i> Nombre Completo</h5>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre(s) *</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            placeholder="Nombre(s)"
                                            value={datos.nombre}
                                            onChange={(e) => handleChange('nombre', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="apellidoPaterno">Apellido Paterno *</label>
                                        <input
                                            type="text"
                                            id="apellidoPaterno"
                                            placeholder="Apellido Paterno"
                                            value={datos.apellidoPaterno}
                                            onChange={(e) => handleChange('apellidoPaterno', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="apellidoMaterno">Apellido Materno *</label>
                                        <input
                                            type="text"
                                            id="apellidoMaterno"
                                            placeholder="Apellido Materno"
                                            value={datos.apellidoMaterno}
                                            onChange={(e) => handleChange('apellidoMaterno', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h5><i className="bi bi-calendar-event"></i> Fecha de Nacimiento y Género</h5>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
                                        <input
                                            type="date"
                                            id="fechaNacimiento"
                                            value={datos.fechaNacimiento || ''}
                                            onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="genero">Género *</label>
                                        <select
                                            id="genero"
                                            value={datos.genero || ''}
                                            onChange={(e) => handleChange('genero', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Seleccione su género</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="No Binario">No Binario</option>
                                            <option value="Otro">Otro</option>
                                            <option value="Prefiero no decir">Prefiero no decir</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h5><i className="bi bi-telephone"></i> Número Telefónico</h5>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="codigoArea">Código de Área *</label>
                                        <select
                                            id="codigoArea"
                                            value={datos.codigoArea || ''}
                                            onChange={(e) => handleChange('codigoArea', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Seleccione código</option>
                                            {codigosAreaMexico.map(({ codigo, lugar }) => (
                                                <option key={codigo} value={codigo}>
                                                    {codigo} - {lugar}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telefono">Número *</label>
                                        <input
                                            type="text"
                                            id="telefono"
                                            placeholder="Número telefónico"
                                            maxLength="10"
                                            value={datos.telefono || ''}
                                            onChange={(e) => handleChange('telefono', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h5><i className="bi bi-geo-alt"></i> Dirección</h5>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="calle">Calle *</label>
                                        <input
                                            type="text"
                                            id="calle"
                                            placeholder="Calle"
                                            value={datos.calle}
                                            onChange={(e) => handleChange('calle', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="numero">Número *</label>
                                        <input
                                            type="text"
                                            id="numero"
                                            placeholder="Número"
                                            value={datos.numero}
                                            onChange={(e) => handleChange('numero', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="interior">Interior (Opcional)</label>
                                        <input
                                            type="text"
                                            id="interior"
                                            placeholder="Interior"
                                            value={datos.interior}
                                            onChange={(e) => handleChange('interior', e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="codigoPostal">Código Postal *</label>
                                        <input
                                            type="text"
                                            id="codigoPostal"
                                            placeholder="Código Postal"
                                            value={datos.codigoPostal}
                                            onChange={(e) => handleChange('codigoPostal', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="alcaldia">Alcaldía *</label>
                                        <input
                                            type="text"
                                            id="alcaldia"
                                            placeholder="Alcaldía"
                                            value={datos.alcaldia}
                                            onChange={(e) => handleChange('alcaldia', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="estado">Estado *</label>
                                        <input
                                            type="text"
                                            id="estado"
                                            placeholder="Estado"
                                            value={datos.estado}
                                            onChange={(e) => handleChange('estado', e.target.value)}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="button-container">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            <span>Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Siguiente</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer interno (sin incluir el footer global) */}
                    <div className="login-link">
                        ¿Necesitas ayuda? <a href="/ayuda">Contáctanos aquí</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paso1;