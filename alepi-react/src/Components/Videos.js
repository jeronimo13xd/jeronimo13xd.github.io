import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Videos.css';

// Importación de imágenes
import abogadosImg from "../assets/abogados.png";
import psicologosImg from "../assets/psicologos.png";
import peritosImg from "../assets/peritos.png";

const categories = [
    {
        title: "Abogados",
        description: "Explora videos sobre derecho en áreas como Civil, Penal, Laboral y Corporativo.",
        image: abogadosImg,
        path: "/videos/abogados"
    },
    {
        title: "Psicólogos",
        description: "Videos especializados en terapia, salud mental y estrategias psicológicas impartidos por profesionales.",
        image: psicologosImg,
        path: "/videos/psicologos"
    },
    {
        title: "Peritos",
        description: "Descubre contenido sobre criminalística, grafoscopía, dactiloscopía, valuación, informática y más.",
        image: peritosImg,
        path: "/videos/peritos"
    }
];

const Videos = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    const handleCategoryClick = (path) => {
        navigate(path);
    };

    return (
        <div className="espaciado-footer"> {/* ✅ Esta clase hace el trabajo */}
            <div className="video-library-container">
                <div className="video-library-header">
                    <p>
                        <strong>Bienvenido a la Videoteca de ALEPI.</strong> Aquí encontrarás videos organizados en tres categorías principales:
                        <strong> Abogados (Civil, Penal, Laboral, Corporativo), Psicólogos (Terapia) y Peritos </strong>
                        (Psicología, Criminalística, Idiomas, Dactiloscopia, Grafoscopía, Valuador, Informática).
                        Explora contenido especializado en cada área para aprender más sobre nuestros servicios y profesionales.
                    </p>
                </div>

                <div className="categories-section">
                    <h2>CATEGORÍAS</h2>
                    <div className="carousel">
                        <button className="carousel-arrow left" onClick={prevSlide}>❮</button>
                        <div className="category-card" onClick={() => handleCategoryClick(categories[currentIndex].path)}>
                            <img src={categories[currentIndex].image} alt={categories[currentIndex].title} className="category-img" />
                            <p><strong>{categories[currentIndex].title}:</strong> {categories[currentIndex].description}</p>
                        </div>
                        <button className="carousel-arrow right" onClick={nextSlide}>❯</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Videos;
