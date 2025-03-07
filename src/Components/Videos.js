import React from 'react';
import './Videos.css';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import tiktokIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/tiktok.svg';
import xIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/x.svg'
import instagramIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/insta.svg'

const Videos = () => {
    return (
        <>


            <div className="video-library-container">
                <div className="video-library-header">
                    <p>
                        Bienvenido a la Videoteca de ALEPI. Aquí encontrarás videos organizados en tres categorías principales:
                        Abogados (Civil, Penal, Laboral, Corporativo), Psicólogos (Terapia), y Peritos (Psicología, Criminalística,
                        Idiomas, Dactiloscopia, Grafoscopia, Valuador, Informática). Explora contenido especializado en cada área
                        para aprender más sobre nuestros servicios y profesionales.
                    </p>
                </div>

                <div className="categories-section">
                    <h2>Categorías</h2>
                    <div className="category-card">
                        <img
                            src="https://via.placeholder.com/800x300"
                            alt="Abogados - Categoría"
                        />
                        <p>
                            Abogados: En esta categoría encontrarás videos que abordan temas de derecho en diversas áreas,
                            como Civil, Penal, Laboral y Corporativo, donde nuestros expertos te explicarán cómo pueden asistirte
                            en cada campo legal.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="footer  py-5">
                <div className="container">
                    <div className="row">
                        {/* Logo y Acerca de */}
                        <div className="col-md-3 text-center">
                            <img src={logo} className='LogoFooter' alt="ALEPI Logo" style={{ height: '60px' }} />
                        </div>

                        {/* Acerca de */}
                        <div className="col-md-2 text-center">
                            <h5>Acerca de</h5>
                            <Link to="/Acerca" className='acerca text-light'>
                                Detalles
                            </Link>
                        </div>

                        {/* Contacto */}
                        <div className="col-md-3 text-center">
                            <h5>Contacto</h5>
                            <p><strong>Teléfono:</strong> 000-000-000</p>
                            <p><strong>Correo:</strong> <a href="mailto:correoAlepi@Alepi.com" className="text-light">correoAlepi@Alepi.com</a></p>
                            <p><strong>Dirección:</strong> Empresa S.A. de C.V., Av. Insurgentes Sur 123, Piso 5, Colonia Roma, Ciudad de México, CDMX 06700, México</p>
                        </div>

                        {/* Redes Sociales */}
                        <div className="col-md-2 text-center">
                            <h5>Redes Sociales</h5>
                            <div className="redes-iconos">
                                {/* Primera Fila de Iconos */}
                                <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
                                <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
                                <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
                            </div>
                            <div className="redes-iconos segunda-fila">
                                {/* Segunda Fila de Iconos */}
                                <a href="#"><img src={tiktokIcon} alt="TikTok" /></a>
                                <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                                <a href="#"><img src={xIcon} alt="x" /></a>
                            </div>
                        </div>


                        {/* Información Adicional */}
                        <div className="col-md-2 text-center">
                            <h5>Información Adicional</h5>
                            <p><a href="#" className="text-light">Términos y Condiciones</a></p>
                            <p><a href="#" className="text-light">Aviso de Privacidad</a></p>
                        </div>
                    </div>
                </div>
            </footer >


        </>


    );
};

export default Videos;
