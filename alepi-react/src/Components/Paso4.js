import React from 'react';
import './Pasos.css';
import { Link } from 'react-router-dom';
import './Footer.css'
import logo from '../assets/logo.svg';
import linkedinIcon from '../assets/Linkedin.svg';
import youtubeIcon from '../assets/youtube.svg';
import facebookIcon from '../assets/facebook.svg';
import tiktokIcon from '../assets/tiktok.svg';
import xIcon from '../assets/x.svg'
import instagramIcon from '../assets/insta.svg'

const Paso4 = ({ prevStep, nextStep, handleChange, datos }) => {
    return (
        <>

            <div className='contenedorAzul'>

                <div class="importante">

                    <h2>¡IMPORTANTE!</h2>
                    <p>Si se ingresan datos falsos, no habrá devolución de dinero. Verifique su información antes de enviarla.</p>
                    <p>Gracias por su comprensión.ALEPI</p>

                </div>

                <div className="containerReg mt-5">
                    <h2 className="font-weight-bold">Datos de Contacto</h2>
                    <hr style={{ border: "1px solid #007bff", width: "200px" }} />
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            {/* Redes Sociales */}
                            <div className="col-md-6">
                                <h5>Redes sociales (Opcionales)</h5>
                                <div className="form-group">
                                    <label htmlFor="linkedin">Link de tu perfil de LinkedIn</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="linkedin"
                                        placeholder="Link de tu perfil de LinkedIn"
                                        value={datos.linkedin}
                                        onChange={(e) => handleChange('linkedin', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="facebook">Link de tu perfil de Facebook</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="facebook"
                                        placeholder="Link de tu perfil de Facebook"
                                        value={datos.facebook}
                                        onChange={(e) => handleChange('facebook', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="instagram">Link de tu perfil de Instagram</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="instagram"
                                        placeholder="Link de tu perfil de Instagram"
                                        value={datos.instagram}
                                        onChange={(e) => handleChange('instagram', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="x">Link de tu perfil de X</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="x"
                                        placeholder="Link de tu perfil de X"
                                        value={datos.x}
                                        onChange={(e) => handleChange('x', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Correo Electrónico de Contacto y Whatsapp */}
                            <div className="col-md-6">
                                <h5>Correo electrónico de contacto</h5>
                                <div className="form-group">
                                    <label htmlFor="correoContacto">Ingresa el correo electrónico para que te contacten</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="correoContacto"
                                        placeholder="Correo electrónico de contacto"
                                        value={datos.correoContacto}
                                        onChange={(e) => handleChange('correoContacto', e.target.value)}
                                    />
                                </div>

                                <h5>Whatsapp</h5>
                                <div className="form-group">
                                    <label htmlFor="whatsapp">Ingresa el número de Whatsapp para que te contacten</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="whatsapp"
                                        placeholder="Número de Whatsapp"
                                        value={datos.whatsapp}
                                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>&larr; Anterior</button>
                            <button type="button" className="btn btn-primary" onClick={nextStep}>Siguiente &rarr;</button>
                        </div>
                    </form>
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

export default Paso4;
