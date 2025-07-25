import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RutaProtegida({ permisoRequerido, children }) {
  const { user } = useAuth();

  // Verificar los permisos del usuario
  console.log("Permisos del usuario:", user?.permisos); // Este log nos mostrará los permisos del usuario

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si no se exige permiso, simplemente se permite
  if (!permisoRequerido) {
    return children;
  }

  // Comprobamos si el array `user.permisos` incluye el permiso
  const tienePermiso =
    Array.isArray(user.permisos) && user.permisos.includes(permisoRequerido);

  // Si no tiene el permiso, redirige a /sin-acceso
  if (!tienePermiso) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return children;
}
