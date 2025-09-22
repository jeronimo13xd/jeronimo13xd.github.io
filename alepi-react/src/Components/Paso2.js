import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Paso2.css';

const Paso2 = ({ nextStep, prevStep, handleChange, datos, isSubmitting }) => {
    const [especialidades, setEspecialidades] = useState([]);
    const [profesiones, setProfesiones] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Obtener las especialidades y profesiones desde el backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const [especialidadesRes, profesionesRes] = await Promise.all([
                    axios.get('/Cat_Especialidades.php', {
                        withCredentials: false,
                        timeout: 10000
                    }),
                    axios.get('/Cat_Profesiones.php', {
                        withCredentials: false,
                        timeout: 10000
                    })
                ]);

                setEspecialidades(especialidadesRes.data);
                setProfesiones(profesionesRes.data);

            } catch (error) {
                console.error('Error al obtener datos:', error);
                setError('Error al cargar los datos. Por favor, intente nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // función para validar las profesiones
    const validarProfesion = (carrera) => {
        if (!carrera.trim()) {
            setError('');
            handleChange('profesion', '');
            return;
        }

        const profesionEncontrada = profesiones.find(
            (profesion) => profesion.Nombre.toLowerCase() === carrera.toLowerCase()
        );

        if (profesionEncontrada) {
            setError('');
            handleChange('profesion', profesionEncontrada.ID_Profesion);
        } else {
            setError('La carrera ingresada no coincide con ninguna profesión válida.');
            handleChange('profesion', '');
        }
    };

    // Manejo de idiomas
    const handleIdiomaChange = (idioma, isChecked) => {
        const currentIdiomas = datos.idiomas || [];
        let nuevosIdiomas;
        
        if (isChecked) {
            nuevosIdiomas = [...currentIdiomas, idioma];
        } else {
            nuevosIdiomas = currentIdiomas.filter(i => i !== idioma);
        }
        
        handleChange('idiomas', nuevosIdiomas);
    };

    if (loading) {
        return (
            <div className="paso2-wrapper">
                <div className="paso2-container">
                    <div className="azul-background"></div>
                    <div className="paso2-content">
                        <div className="loading-container">
                            <div className="spinner-large"></div>
                            <p>Cargando datos profesionales...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="paso2-wrapper">
            <div className="paso2-container">
                {/* Fondo azul */}
                <div className="azul-background"></div>
                
                {/* Contenido principal */}
                <div className="paso2-content">
                    
                    {/* Header */}
                    <div className="paso2-header">
                        <h2>DATOS PROFESIONALES</h2>
                        <p>Paso 3 de 6 - Complete su información profesional</p>
                        
                        <div className="progress-container">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: '50%'}}></div>
                            </div>
                            <div className="progress-text">Progreso: 50%</div>
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
                        {error && (
                            <div className="alert-error">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>{error}</div>
                            </div>
                        )}

                        <form>
                            <div className="form-section">
                                <h5><i className="bi bi-mortarboard"></i> Estudios Superiores</h5>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="universidad">Universidad</label>
                                        <input
                                            type="text"
                                            id="universidad"
                                            placeholder="Nombre de la universidad"
                                            value={datos.universidad || ''}
                                            onChange={(e) => handleChange('universidad', e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="licenciatura">Licenciatura *</label>
                                        <input
                                            type="text"
                                            id="licenciatura"
                                            placeholder="Ej: Psicología, Derecho, Medicina"
                                            value={datos.licenciatura || ''}
                                            onChange={(e) => {
                                                handleChange('licenciatura', e.target.value);
                                                validarProfesion(e.target.value);
                                            }}
                                            disabled={isSubmitting}
                                            list="profesionesList"
                                        />
                                        <datalist id="profesionesList">
                                            {profesiones.map((profesion) => (
                                                <option key={profesion.ID_Profesion} value={profesion.Nombre} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cedulaProfesional">Cédula Profesional</label>
                                        <input
                                            type="text"
                                            id="cedulaProfesional"
                                            placeholder="Número de cédula"
                                            value={datos.cedulaProfesional || ''}
                                            onChange={(e) => handleChange('cedulaProfesional', e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h5><i className="bi bi-award"></i> Especialidades</h5>
                                <div className="form-group">
                                    <label htmlFor="especialidades">Seleccione su especialidad *</label>
                                    <select
                                        id="especialidades"
                                        value={datos.especialidades || ''}
                                        onChange={(e) => handleChange('especialidades', e.target.value)}
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Seleccione una especialidad</option>
                                        {especialidades.map((especialidad) => (
                                            <option key={especialidad.ID_Especialidad} value={especialidad.ID_Especialidad}>
                                                {especialidad.Nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-section">
                                <h5><i className="bi bi-patch-check"></i> Certificaciones</h5>
                                <div className="form-group">
                                    <label htmlFor="certificaciones">Mencione su(s) certificación(es)</label>
                                    <textarea
                                        id="certificaciones"
                                        rows="3"
                                        placeholder="Lista de certificaciones profesionales"
                                        value={datos.certificaciones || ''}
                                        onChange={(e) => handleChange('certificaciones', e.target.value)}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-section">
                                <h5><i className="bi bi-translate"></i> Idiomas</h5>
                                <div className="form-group">
                                    <label>Seleccione los idiomas que habla *</label>
                                    <div className="idiomas-container">
                                        {[
                                            "Español", "Inglés", "Francés", "Alemán", "Italiano",
                                            "Portugués", "Chino", "Japonés", "Coreano", "Ruso",
                                            "Árabe", "Hindi", "Bengalí", "Turco", "Hebreo",
                                        ].map((idioma) => (
                                            <div key={idioma} className="checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    id={`idioma-${idioma}`}
                                                    checked={(datos.idiomas || []).includes(idioma)}
                                                    onChange={(e) => handleIdiomaChange(idioma, e.target.checked)}
                                                    disabled={isSubmitting}
                                                />
                                                <label htmlFor={`idioma-${idioma}`}>
                                                    {idioma}
                                                </label>
                                            </div>
                                        ))}

                                        <div className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id="idioma-otros"
                                                checked={(datos.idiomas || []).includes("Otros")}
                                                onChange={(e) => handleIdiomaChange("Otros", e.target.checked)}
                                                disabled={isSubmitting}
                                            />
                                            <label htmlFor="idioma-otros">
                                                Otros
                                            </label>
                                        </div>
                                    </div>

                                    {(datos.idiomas || []).includes("Otros") && (
                                        <div className="otros-idiomas">
                                            <label htmlFor="otrosIdiomas">Especifique otros idiomas:</label>
                                            <input
                                                type="text"
                                                id="otrosIdiomas"
                                                placeholder="Ej: Sueco, Holandés, Griego..."
                                                value={datos.otrosIdiomas || ""}
                                                onChange={(e) => handleChange("otrosIdiomas", e.target.value)}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    )}
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
                        ¿Necesitas ayuda? <a href="/ayuda">Contáctanos aquí</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paso2;