import React from 'react';
import { Link } from 'react-router-dom';
import './SinAcceso.css'; // Crea el archivo con estilos si quieres

const SinAcceso = () => {
  return (
    <div className="text-center mt-5 p-4">
      <h1 className="display-4 text-danger">⛔ Acceso Denegado</h1>
      <p className="lead">No tienes los permisos necesarios para ver esta sección del sistema.</p>
      <p>Si crees que esto es un error, contacta al administrador del sistema.</p>
      <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
    </div>
  );
};

export default SinAcceso;
