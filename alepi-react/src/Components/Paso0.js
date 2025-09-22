import React from 'react';
import './Paso0.css';

const Paso0 = ({ registrarUsuario, handleChange, datos, isSubmitting, error }) => {
  const camposLlenos = datos.correo.trim() && datos.contrasena.trim() && datos.nombre.trim();

  return (
    <div className="paso0-wrapper">
      <div className="paso0-container">
        {/* Fondo azul marino */}
        <div className="azul-background"></div>
        
        {/* Contenido principal */}
        <div className="paso0-content">
          
          {/* Header */}
          <div className="paso0-header">
            <h2>Crear Cuenta</h2>
            <p>Comienza tu registro ingresando tus datos básicos</p>
            
            <div className="progress-container">
              <div className="progress">
                <div className="progress-bar" role="progressbar"></div>
              </div>
              <div className="progress-text">Paso 1 de 6</div>
            </div>
          </div>

          {/* Card azul claro para el formulario */}
          <div className="form-card-light-blue">
            {error && (
              <div className="alert-alepi">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <div>
                  <strong>Error:</strong> {error}
                </div>
                <button type="button" className="btn-close"></button>
              </div>
            )}

            <form>
              {/* Campo Email */}
              <div className="form-group">
                <label htmlFor="correo">
                  <i className="bi bi-envelope-fill"></i>
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="correo"
                  placeholder="tu@email.com"
                  value={datos.correo}
                  onChange={(e) => handleChange('correo', e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Campo Contraseña */}
              <div className="form-group">
                <label htmlFor="contrasena">
                  <i className="bi bi-lock-fill"></i>
                  Contraseña *
                </label>
                <input
                  type="password"
                  id="contrasena"
                  placeholder="Mínimo 8 caracteres"
                  value={datos.contrasena}
                  onChange={(e) => handleChange('contrasena', e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <div className="form-text">
                  <i className="bi bi-info-circle"></i>
                  Usa una combinación de letras, números y símbolos
                </div>
              </div>

              {/* Campo Nombre */}
              <div className="form-group">
                <label htmlFor="nombre">
                  <i className="bi bi-person-fill"></i>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre y apellidos"
                  value={datos.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Botón de acción */}
              <div className="button-container">
                <button
                  type="button"
                  onClick={registrarUsuario}
                  disabled={!camposLlenos || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      <span>Registrando...</span>
                    </>
                  ) : (
                    <>
                      <span>Siguiente</span>
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>

              {isSubmitting && (
                <div className="loading-text">
                  <span className="spinner-small"></span>
                  <span>Registrando usuario, por favor espere...</span>
                </div>
              )}

              {/* Información adicional */}
              <div className="security-note">
                <i className="bi bi-shield-check"></i>
                <div>
                  <strong>Datos protegidos:</strong> Tu información está segura con nosotros
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="login-link">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paso0;