import React from "react";
import "./Directorio.css"; // Importa el archivo de estilos

const professionals = [
    { name: "Nombre", specialty: "Especialidad", rating: 4, image: "#" },
    { name: "Nombre", specialty: "Especialidad", rating: 3, image: "#" },
    { name: "Nombre", specialty: "Especialidad", rating: 2, image: "#" },
    { name: "Nombre", specialty: "Especialidad", rating: 1, image: "#" },
];

const ProfessionalCard = ({ professional }) => {
    return (
        <div className="professional-card">
            <img src={professional.image} alt="Foto" className="profile-img" />
            <div className="info">
                <h2 className="name"> {professional.name} </h2>
                <p className="specialty"> {professional.specialty} </p>
            </div>
            <div className="contact-buttons">
                <button className="email-btn">✉️ Contactar por correo</button>
                <button className="whatsapp-btn">✅ Contactar por WhatsApp</button>
            </div>
            <div className="rating">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < professional.rating ? "star filled" : "star"}>★</span>
                ))}
            </div>
        </div>
    );
};

const Directorio = () => {
    return (
        <div className="directorio">
            {professionals.map((prof, index) => (
                <ProfessionalCard key={index} professional={prof} />
            ))}
        </div>
    );
};

export default Directorio;
