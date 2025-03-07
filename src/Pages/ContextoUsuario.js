import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState("guest"); // guest, user, admin
    const [userData, setUserData] = useState(null); // Almacena datos del usuario

    return (
        <UserContext.Provider value={{ userType, setUserType, userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
