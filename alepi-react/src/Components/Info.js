import React from 'react';
import './Info.css';
import './Footer.css'
import { Link } from 'react-router-dom';
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import tiktokIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/tiktok.svg';
import xIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/x.svg'
import instagramIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/insta.svg'

const Info = () => {
    return (

        <>

            <div className="about-page-container">
                <div className="about-section">
                    <h2>¿QUÉ ES?</h2>
                    <p>
                        Lorem ipsum dolor sit amet. Et ducimus cumque in amet similique ab dolorem doloremque eum debitis tempora. Aut minima adipisci ut omnis sequi nam porro nobis! Est animi omnis non laudantium reprehenderit non blanditiis quae in commodi consequuntur.
                    </p>
                    <p>
                        Rem eveniet animi ex voluptatem eligendi hic laborum dolorem. At maxime quas rem consequatur consectetur sit dolores ipsum ut nemo exercitationem vel sapiente error sit harum assumenda.
                    </p>
                </div>

                <div className="about-video-section">
                    <div className="about-video">
                        <h2>CONÓCENOS</h2>
                        <div className="video-placeholder">
                            <img src="https://via.placeholder.com/150" alt="Video" />
                        </div>
                    </div>
                    <div className="transcription">
                        <h2>TRANSCRIPCIÓN</h2>
                        <p>
                            Lorem ipsum dolor sit amet. Et ducimus cumque in amet similique ab dolorem doloremque eum debitis tempora. Aut minima adipisci ut omnis sequi nam porro nobis! Est animi omnis non laudantium reprehenderit non blanditiis quae in commodi consequuntur.
                        </p>
                    </div>
                </div>

                <div className="plans-section">
                    <div className="plan basic">
                        <h3>BÁSICO</h3>
                        <ul>
                            <li>Detalle</li>
                            <li>Detalle</li>
                            <li>Detalle</li>
                            <li>Detalle</li>
                        </ul>
                    </div>
                    <div className="plan simple">
                        <h3>SENCILLO</h3>
                        <ul>
                            <li>Detalle</li>
                            <li>Detalle</li>
                            <li>Detalle</li>
                            <li>Detalle</li>
                        </ul>
                    </div>
                    <div className="plan premium">
                        <h3>PREMIUM</h3>
                        <ul>
                            <li>Detalle</li>
                            <li>Detalle</li>
                            <li>Detalle</li>
                            <li>Detalle</li>
                        </ul>
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

export default Info;
