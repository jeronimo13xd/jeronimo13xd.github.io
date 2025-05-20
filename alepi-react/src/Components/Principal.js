import React from "react";
import "./Princpal.css";
import defaultProfilePic from "../assets/UsuarioH.png"; // Imagen de perfil por defecto

const professionals = [
    { name: "Nombre 1", specialty: "Perito", image: defaultProfilePic },
    { name: "Nombre 2", specialty: "Abogado", image: defaultProfilePic },
    { name: "Nombre 3", specialty: "Psicólogo", image: defaultProfilePic },
    { name: "Nombre 4", specialty: "Especialidad", image: defaultProfilePic }
];

const Principal = () => {
    return (
        <div className="principal-container">
            {/* Sección de búsqueda */}
            <div className="principal-search">
                <button className="ps-option">Perito</button>
                <button className="ps-option">Abogado</button>
                <button className="ps-option">Psicólogo</button>
                <button className="ps-search-btn">Buscar</button>
            </div>

            {/* Contenido central en dos columnas */}
            <div className="principal-content">
                {/* Columna izquierda: Lista de profesionales */}
                <div className="ps-professionals">
                    <h2 className="ps-title">Profesionales</h2>
                    <div className="ps-list">
                        {professionals.map((prof, index) => (
                            <div className="ps-card" key={index}>
                                <img src={prof.image} alt={`Foto de ${prof.name}`} className="ps-img" />
                                <div className="ps-info">
                                    <h3>{prof.name}</h3>
                                    <p>{prof.specialty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna derecha: Artículo y Video */}
                <div className="ps-articles-videos">
                    <div className="ps-article">
                        <h2 className="ps-title">Artículo</h2>
                        <p className="ps-author">Autor: Nombre del Autor</p>
                        <p className="ps-excerpt">
                            Este es un extracto del artículo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div className="ps-video">
                        <h2 className="ps-title">Video</h2>
                        <div className="ps-video-placeholder">
                            VIDEO
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Principal;
