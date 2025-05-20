import React, { useState } from "react";
import "./Directorio.css";
import emailIcon from "../assets/Mail.svg";
import whatsappIcon from "../assets/Whats.svg";
import userImage from "../assets/UsuarioH.png";

const allProfessionals = [
    { name: "Nombre 1", specialty: "Penal", category: "Abogados", rating: 4, image: userImage },
    { name: "Nombre 2", specialty: "Terapia Familiar", category: "Psicólogos", rating: 3, image: userImage },
    { name: "Nombre 3", specialty: "Criminalística", category: "Peritos", rating: 2, image: userImage },
    { name: "Nombre 4", specialty: "Civil", category: "Abogados", rating: 5, image: userImage },
];

const ProfessionalCard = ({ professional }) => (
    <div className="directorio-card">
        <img src={professional.image} alt="Foto de Profesional" className="directorio-img" />
        <div className="directorio-info">
            <h2 className="directorio-name">{professional.name}</h2>
            <p className="directorio-specialty">{professional.specialty}</p>
        </div>
        <div className="directorio-buttons">
            <button>
                <img src={emailIcon} alt="Correo" />
                Contactar por correo
            </button>
            <button>
                <img src={whatsappIcon} alt="WhatsApp" />
                Contactar por WhatsApp
            </button>
        </div>
        <div className="directorio-rating">
            {[...Array(5)].map((_, index) => (
                <span key={index} className={index < professional.rating ? "directorio-star filled" : "directorio-star"}>
                    ★
                </span>
            ))}
        </div>
    </div>
);

const Directorio = () => {
    const [categoria, setCategoria] = useState("");
    const [especialidad, setEspecialidad] = useState("");

    const filtered = allProfessionals.filter(prof =>
        (!categoria || prof.category === categoria) &&
        (!especialidad || prof.specialty.toLowerCase().includes(especialidad.toLowerCase()))
    );

    return (
        <div className="espaciado-footer">
            <div className="directorio-container">

                <div className="buscador-container">
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Todas las Categorías</option>
                        <option value="Abogados">Abogados</option>
                        <option value="Psicólogos">Psicólogos</option>
                        <option value="Peritos">Peritos</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Buscar especialidad..."
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                    />

                    <button onClick={() => { setCategoria(""); setEspecialidad(""); }}>
                        Limpiar Filtros
                    </button>
                </div>

                {filtered.map((prof, index) => (
                    <ProfessionalCard key={index} professional={prof} />
                ))}
            </div>
        </div>
    );
};

export default Directorio;
