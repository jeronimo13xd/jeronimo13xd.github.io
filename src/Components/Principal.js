import React from 'react';
import './Princpal.css';
import emailIcon from '../assets/Mail.svg'; // Asegúrate de que estas rutas sean correctas
import whatsappIcon from '../assets/Whats.svg';
import starIcon from '../assets/EstrellaCompleta.svg';
import starHalfIcon from '../assets/EstrellaVacia.svg';
import './Footer.css';

const professionals = [
    {
        name: 'Nombre 1',
        specialty: 'Especialidad 1',
        emailLink: '#',
        whatsappLink: '#',
        rating: 4
    },
    {
        name: 'Nombre 2',
        specialty: 'Especialidad 2',
        emailLink: '#',
        whatsappLink: '#',
        rating: 3
    },
    {
        name: 'Nombre 3',
        specialty: 'Especialidad 3',
        emailLink: '#',
        whatsappLink: '#',
        rating: 2
    },
    {
        name: 'Nombre 4',
        specialty: 'Especialidad 4',
        emailLink: '#',
        whatsappLink: '#',
        rating: 3
    }
];

const Principal = () => {
    return (
        <div className="professionals-container">
            {professionals.map((professional, index) => (
                <div className="professional-card" key={index}>
                    <div className="professional-info">
                        <div className="professional-photo">
                            <img src={`https://via.placeholder.com/100?text=Foto+${index + 1}`} alt={`Foto ${professional.name}`} />
                        </div>
                        <div className="professional-details">
                            <h3>{professional.name.toUpperCase()}</h3>
                            <p>{professional.specialty.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="professional-contact">
                        <a href={professional.emailLink} className="contact-button">
                            <img src={emailIcon} alt="Correo" />
                            Contactar por correo
                        </a>
                        <a href={professional.whatsappLink} className="contact-button">
                            <img src={whatsappIcon} alt="WhatsApp" />
                            Contactar por WhatsApp
                        </a>
                    </div>
                    <div className="professional-rating">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                            <img
                                key={starIndex}
                                src={starIndex < professional.rating ? starIcon : starHalfIcon}
                                alt="Valoración"
                                className="rating-star"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Principal;
