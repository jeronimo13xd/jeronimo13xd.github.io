import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import Logo from '../assets/LogoLogin.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Configuración de axios
  axios.defaults.baseURL = 'http://localhost/alepirea/';
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    try {
      const { data: res } = await axios.post('Login.php', { 
        Correo: email, 
        Contrasena: password 
      });

      if (res.status === 'success') {
        const u = {
          id: res.usuario.id,
          nombre: res.usuario.nombre,
          correo: res.usuario.correo,
          rol: res.usuario.rol,
          permisos: res.usuario.permisos
        };
        login(u);

        // Redirección según rol
        if (u.rol === 'negocio') navigate('/dashboard-negocio');
        else if (u.rol === 'ventas') navigate('/dashboard-ventas');
        else if (u.rol === 'superadmin') navigate('/dashboard');
        else navigate('/perfil');
      } else {
        setError(res.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error en login:', err);
      if (err.response?.status === 400) setError('Faltan campos obligatorios');
      else if (err.response?.status === 401) setError('Credenciales incorrectas');
      else setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-pro-wrapper">
      <div className="login-pro-container">
        {/* Fondo con formas abstractas */}
        <div className="pro-background">
          <div className="pro-background-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        {/* Card principal */}
        <div className="login-pro-card">
          {/* Header con logo */}
          <div className="login-pro-header">
            <div className="pro-logo-container">
              <img src={Logo} alt="ALEPI Logo" className="pro-logo" />
            </div>
            <h1>Bienvenido</h1>
            <p>Ingresa a tu cuenta para continuar</p>
          </div>

          {/* Formulario */}
          <form className="login-pro-form" onSubmit={handleSubmit}>
            {error && (
              <div className="pro-error">
                <i className="bi bi-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <div className="pro-input-group">
              <label htmlFor="email" className="pro-input-label">
                <i className="bi bi-envelope pro-label-icon"></i>
                Correo electrónico
              </label>
              <div className="pro-input-container">
                <input
                  type="email"
                  id="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pro-input"
                />
              </div>
            </div>

            <div className="pro-input-group">
              <label htmlFor="password" className="pro-input-label">
                <i className="bi bi-lock pro-label-icon"></i>
                Contraseña
              </label>
              <div className="pro-input-container">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pro-input"
                />
              </div>
            </div>

            <div className="pro-options">
              <label className="pro-checkbox">
                <input type="checkbox" id="remember" disabled={isLoading} />
                <span className="pro-checkmark"></span>
                Recordar sesión
              </label>
              <a href="/olvide-contrasena" className="pro-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button 
              type="submit" 
              className="pro-login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="pro-btn-loading">
                  <div className="pro-btn-spinner"></div>
                  Iniciando sesión...
                </div>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          <div className="pro-footer">
            <p>¿No tienes cuenta? <a href="/registro" className="pro-link">Crear cuenta</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}