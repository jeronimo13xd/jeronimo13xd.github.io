import { useState } from "react";
import "./Notificaciones.css"; // Importamos el archivo de estilos

const Notificaciones = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Nuevo archivo subido a Google Drive." },
        { id: 2, message: "Autenticación 2FA requerida para acceso." },
        { id: 3, message: "Sesión cerrada por inactividad." },
    ]);

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    return (
        <div className="notificaciones-container">
            <div className="notificaciones-card">
                <h2 className="notificaciones-header">📢 Notificaciones</h2>
                <div className="notificaciones-content">
                    {notifications.length === 0 ? (
                        <p className="notificaciones-empty">No hay notificaciones nuevas.</p>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif.id} className="notificacion">
                                <p>{notif.message}</p>
                                <button onClick={() => removeNotification(notif.id)}>✖</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notificaciones;
