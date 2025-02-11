import React from 'react';
import './Articulos.css';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import tiktokIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/tiktok.svg';
import xIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/x.svg'
import instagramIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/insta.svg'

const Articulos = () => {
    return (

        <>

            <div className="article-filter-container">
                <div className="filter-header">
                    <div className="filter-categories">
                        <span>Categoría</span>
                        <span>Fecha de Publicación</span>
                        <span>Autor</span>
                        <span>Valoración</span>
                        <span>Tiempo de Lectura</span>
                    </div>
                    <div className="filter-buttons">
                        <button className="apply-filters">Aplicar Filtros</button>
                        <button className="clear-filters">Limpiar Filtros</button>
                    </div>
                </div>

                <div className="article-card">
                    <div className="article-image">
                        <img src="https://via.placeholder.com/150" alt="Red doméstica" />
                    </div>
                    <div className="article-details">
                        <h3>Título del Artículo: "Cómo mejorar la seguridad de tu red doméstica"</h3>
                        <p>
                            <strong>Resumen:</strong> "Descubre las mejores prácticas para proteger tu red doméstica contra amenazas comunes y mantener tus dispositivos seguros."
                        </p>
                        <p><strong>Fecha de Publicación:</strong> Publicado el 12 de agosto de 2024</p>
                        <p><strong>Categorías:</strong> Seguridad, Redes</p>
                        <p><strong>Autor:</strong> Juan Pérez</p>
                        <p><strong>Valoraciones:</strong> ★★★★☆ (4/5)</p>
                        <p><strong>Tiempo de Lectura:</strong> 5 min</p>
                        <button className="read-more">Leer más</button>
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

export default Articulos;
