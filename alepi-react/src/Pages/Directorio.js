import React, { useState } from "react";
import "./Directorio.css";
import emailIcon from "../assets/Mail.svg";
import whatsappIcon from "../assets/Whats.svg";
import userImage from "../assets/UsuarioH.png";

const allProfessionals = [
    { 
        name: "Dr. Carlos Mendoza", 
        specialty: "Derecho Penal", 
        category: "Abogados", 
        rating: 4, 
        image: userImage,
        experience: "12 años",
        price: "$500/h",
        verified: true
    },
    { 
        name: "Dra. Ana López", 
        specialty: "Terapia Familiar Sistémica", 
        category: "Psicólogos", 
        rating: 5, 
        image: userImage,
        experience: "8 años",
        price: "$350/h",
        verified: true
    },
    { 
        name: "Mtro. Roberto Silva", 
        specialty: "Criminalística Forense", 
        category: "Peritos", 
        rating: 4, 
        image: userImage,
        experience: "15 años",
        price: "$600/h",
        verified: true
    },
    { 
        name: "Lic. María González", 
        specialty: "Derecho Civil", 
        category: "Abogados", 
        rating: 5, 
        image: userImage,
        experience: "10 años",
        price: "$450/h",
        verified: true
    },
    { 
        name: "Dr. Javier Ruiz", 
        specialty: "Psicología Clínica", 
        category: "Psicólogos", 
        rating: 4, 
        image: userImage,
        experience: "6 años",
        price: "$300/h",
        verified: false
    },
    { 
        name: "Ing. Fernando Torres", 
        specialty: "Informática Forense", 
        category: "Peritos", 
        rating: 3, 
        image: userImage,
        experience: "7 años",
        price: "$550/h",
        verified: true
    }
];

const ProfessionalCard = ({ professional }) => (
    <div className="directorio-card">
        <div className="card-header">
            <div className="professional-avatar">
                <img src={professional.image} alt={professional.name} className="directorio-img" />
                {professional.verified && <div className="verified-badge">✓</div>}
            </div>
            <div className="professional-main-info">
                <div className="name-section">
                    <h2 className="directorio-name">{professional.name}</h2>
                    <span className="professional-category">{professional.category}</span>
                </div>
                <p className="directorio-specialty">{professional.specialty}</p>
                <div className="professional-meta">
                    <span className="experience">📅 {professional.experience}</span>
                    <span className="price">💰 {professional.price}</span>
                </div>
            </div>
        </div>

        <div className="card-content">
            <div className="directorio-rating">
                <div className="stars">
                    {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < professional.rating ? "star filled" : "star"}>
                            ★
                        </span>
                    ))}
                </div>
                <span className="rating-text">{professional.rating}/5</span>
            </div>

            <div className="directorio-buttons">
                <button className="btn-contact email">
                    <img src={emailIcon} alt="Correo" />
                    <span>Email</span>
                </button>
                <button className="btn-contact whatsapp">
                    <img src={whatsappIcon} alt="WhatsApp" />
                    <span>WhatsApp</span>
                </button>
                <button className="btn-profile">
                    Ver Perfil
                </button>
            </div>
        </div>
    </div>
);

const Directorio = () => {
    const [categoria, setCategoria] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [sortBy, setSortBy] = useState("rating");

    const filtered = allProfessionals
        .filter(prof =>
            (!categoria || prof.category === categoria) &&
            (!especialidad || prof.specialty.toLowerCase().includes(especialidad.toLowerCase()))
        )
        .sort((a, b) => {
            switch(sortBy) {
                case "rating": return b.rating - a.rating;
                case "experience": return parseInt(b.experience) - parseInt(a.experience);
                case "price": return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
                default: return 0;
            }
        });

    const categories = ["Abogados", "Psicólogos", "Peritos"];
    const specialties = [...new Set(allProfessionals.map(p => p.specialty))];

    return (
        <div className="espaciado-footer">
            <div className="directorio-container">
                {/* Header */}
                <div className="directorio-header">
                    <h1>Directorio de Profesionales</h1>
                    <p>Encuentra expertos verificados para tus necesidades legales</p>
                </div>

                {/* Filtros Mejorados */}
                <div className="buscador-container">
                    <div className="filter-group">
                        <label>Categoría</label>
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="">Todas las categorías</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Especialidad</label>
                        <input
                            type="text"
                            placeholder="Buscar especialidad..."
                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                            list="specialties"
                        />
                        <datalist id="specialties">
                            {specialties.map(spec => (
                                <option key={spec} value={spec} />
                            ))}
                        </datalist>
                    </div>

                    <div className="filter-group">
                        <label>Ordenar por</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="rating">Mejor valorados</option>
                            <option value="experience">Más experiencia</option>
                            <option value="price">Precio menor</option>
                        </select>
                    </div>

                    <div className="filter-actions">
                        <button 
                            className="btn-clear"
                            onClick={() => { setCategoria(""); setEspecialidad(""); setSortBy("rating"); }}
                        >
                            Limpiar Filtros
                        </button>
                        <span className="results-count">{filtered.length} profesionales</span>
                    </div>
                </div>

                {/* Lista de Profesionales */}
                <div className="professionals-grid">
                    {filtered.length > 0 ? (
                        filtered.map((prof, index) => (
                            <ProfessionalCard key={index} professional={prof} />
                        ))
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No se encontraron profesionales</h3>
                            <p>Intenta ajustar los filtros de búsqueda</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Directorio;