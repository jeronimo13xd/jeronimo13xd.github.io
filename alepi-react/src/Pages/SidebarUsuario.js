import React from 'react';
import { useUser } from './UserContext'; // Importa el contexto

const Sidebar = () => {
    const { userType } = useUser(); // Obtiene el tipo de usuario

    return (
        <div className="sidebar">
            <h3>Menú</h3>
            <ul>
                {userType === 'guest' && (
                    <>
                        <li><a href="/login">Iniciar Sesión</a></li>
                        <li><a href="/register">Registrarse</a></li>
                    </>
                )}
                {userType === 'user' && (
                    <>
                        <li><a href="/profile">Perfil</a></li>
                        <li><a href="/services">Mis Servicios</a></li>
                        <li><a href="/logout">Cerrar Sesión</a></li>
                    </>
                )}
                {userType === 'admin' && (
                    <>
                        <li><a href="/dashboard">Panel de Control</a></li>
                        <li><a href="/manage-users">Gestionar Usuarios</a></li>
                        <li><a href="/logout">Cerrar Sesión</a></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
