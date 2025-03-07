import React, { createContext, useState, useEffect } from "react";

// Crear y exportar el contexto de autenticación
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Cargar usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("🔄 Usuario cargado desde localStorage:", JSON.parse(storedUser));
        }
    }, [user]);  // <-- Agregamos user como dependencia para asegurarnos que reaccione a cambios

    // Función para iniciar sesión
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage")); // <-- Forzar actualización en otros componentes
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        console.log("Cerrando sesión...");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
