import React from 'react';
import './PregFrec.css';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import tiktokIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/tiktok.svg';
import xIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/x.svg'
import instagramIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/insta.svg'


export default function PregFrec() {
    return (

        <>

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


    )
}
