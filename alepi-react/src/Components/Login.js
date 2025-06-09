// src/Components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import Logo from '../assets/LogoLogin.svg'; // pon tu logo en /src/assets
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
  const [Correo, setCorreo] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si tu backend corre en http://localhost/alepirea, configura baseURL:
  axios.defaults.baseURL = 'http://localhost/alepirea/';
  axios.defaults.withCredentials = true; // si usas sesiones

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data: res } = await axios.post(
        'Login.php',
        { Correo, Contrasena }
      );

      if (res.status === 'success') {
        const u = {
          id: res.usuario.id,          // coincide con Login.php → "id"
          nombre: res.usuario.nombre,
          correo: res.usuario.correo,
          rol: res.usuario.rol,
          permisos: res.usuario.permisos
        };
        login(u);

        // Redirige según rol
        if (u.rol === 'negocio') navigate('/dashboard-negocio');
        else if (u.rol === 'ventas') navigate('/dashboard-ventas');
        else if (u.rol === 'superadmin') navigate('/dashboard');
        else navigate('/perfil');
      } else {
        setError(res.message);
      }
    } catch (err) {
      if (err.response?.status === 400) setError('Faltan campos');
      else if (err.response?.status === 401) setError('Credenciales inválidas');
      else setError('Error de conexión');
    }
  };

  return (
    <div className="contorno">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={Logo} alt="logo" className="Logs" />
        {error && <div className="alert alert-danger">{error}</div>}

        <label>Correo Electrónico</label>
        <input
          type="email"
          className="form-control input-white"
          value={Correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          className="form-control input-white"
          value={Contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <div className="form-check my-2">
          <input id="check" type="checkbox" className="form-check-input" />
          <label htmlFor="check" className="form-check-label">
            Recordar
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100 custom-button">
          Entrar
        </button>
      </form>
    </div>
  );
}
