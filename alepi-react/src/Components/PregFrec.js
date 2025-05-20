import React from 'react';
import './PregFrec.css';
import { Link } from 'react-router-dom';
import './Footer.css';

import logo from '../assets/logo.svg';
import linkedinIcon from '../assets/Linkedin.svg';
import youtubeIcon from '../assets/youtube.svg';
import facebookIcon from '../assets/facebook.svg';
import tiktokIcon from '../assets/tiktok.svg';
import xIcon from '../assets/x.svg';
import instagramIcon from '../assets/insta.svg';

export default function PregFrec() {
    return (
        <div className="espaciado-footer"> {/* ✅ Aquí aplicamos el espacio con App.css */}
            <div className="faq-support-container">
                <div className="faq-header">
                    <p>
                        En ALEPI, estamos comprometidos a brindarte el mejor soporte para que aproveches al máximo nuestros productos y servicios. En esta sección, encontrarás una serie de tutoriales detallados que te guiarán paso a paso en el uso de nuestras soluciones, así como respuestas a las preguntas más frecuentes.
                    </p>
                    <p>
                        Ya sea que estés empezando o necesites resolver una duda específica, estamos aquí para ayudarte. Si no encuentras lo que buscas, no dudes en contactarnos. ¡Nuestro equipo de soporte está listo para asistirte en todo momento!
                    </p>
                </div>

                <div className="faq-section">
                    <h2>Preguntas Frecuentes</h2>
                    <div className="faq-items">
                        <div className="faq-item">
                            <img src="https://via.placeholder.com/150" alt="FAQ 1" />
                            <h3>Título</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                        <div className="faq-item">
                            <img src="https://via.placeholder.com/150" alt="FAQ 2" />
                            <h3>Título</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                        <div className="faq-item">
                            <img src="https://via.placeholder.com/150" alt="FAQ 3" />
                            <h3>Título</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                    </div>
                </div>

                <div className="support-section">
                    <h2>Soporte Técnico</h2>
                    <p>¿Necesitas Ayuda?</p>
                    <p>
                        Si tienes problemas técnicos o dudas, estamos aquí para ayudarte.
                        <br />
                        <a href="mailto:soporte@alepi.com">Haz clic aquí para contactar a soporte técnico</a> y obtener asistencia personalizada.
                    </p>
                </div>
            </div>
        </div>
    );
}
