import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ permisoRequerido, children }) => {
  const { user } = useContext(AuthContext);

  // Si no hay sesión, manda a login
  if (!user) return <Navigate to="/login" replace />;

  // Si no tiene el permiso requerido, redirige a /SinAcceso
  if (permisoRequerido && !user.permisos.includes(permisoRequerido)) {
    return <Navigate to="/SinAcceso" replace />;
  }

  // Tiene permiso → renderiza la ruta protegida
  return children;
};

export default RutaProtegida;
