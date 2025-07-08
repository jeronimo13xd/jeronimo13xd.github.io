// src/Components/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ① Cargar de localStorage en la *creación* del estado (lazy init)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("alepi_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
 });


  function login(u) {
    setUser(u);
    localStorage.setItem("alepi_user", JSON.stringify(u));
    localStorage.setItem("idUsuario", u.id); 
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("alepi_user");
    localStorage.removeItem("idUsuario");
  }

  const ctxValue = { user, login, logout };
  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
