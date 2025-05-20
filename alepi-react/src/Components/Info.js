import React from 'react';
import './Info.css';
import './Footer.css';
import susBas from '../assets/SusBas.png';
import susAva from '../assets/PlanAva.png';

const Info = () => {
    return (
        <div className="espaciado-footer">
            <div className="about-page-container">

                {/* Sección: ¿QUÉ ES? */}
                <div className="about-section">
                    <h2>¿QUÉ ES?</h2>
                    <p>
                        ALEPI es una plataforma digital que conecta a profesionales con personas que necesitan sus servicios, de forma rápida, ética y segura.
                    </p>
                    <p>
                        Ofrecemos un espacio donde terapeutas, instructores, consultores y especialistas pueden ofrecer sus conocimientos a través de una red confiable y moderna.
                    </p>
                </div>

                {/* Sección: Conócenos + Transcripción */}
                <div className="about-video-section">
                    <div className="about-video">
                        <h2>CONÓCENOS</h2>
                        <div className="video-placeholder">
                            <div className="responsive-video">
                                <iframe
                                    src="https://www.youtube-nocookie.com/embed/ot9jr05ZljM?si=49sPDwfsr6JYnw58"
                                    title="Conócenos ALEPI"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Sección: Planes */}
                <div className="plans-section">
                    <a href="https://buy.stripe.com/test_bIYcNxcRC3oIdBC3cc" target="_blank" rel="noopener noreferrer" className="plan-card basic">
                        <div className="plan-content">
                            <img src={susBas} alt="Básico" className="plan-image-wide" />
                            <h3>BÁSICO</h3>
                            <ul>
                            </ul>
                        </div>
                    </a>

                    <a href="https://buy.stripe.com/test_00g5l518UcZigNO6op" target="_blank" rel="noopener noreferrer" className="plan-card premium">
                        <div className="plan-content">
                            <img src={susAva} alt="Básico" className="plan-image-wide" />
                            <h3>AVANZADO</h3>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Info;
