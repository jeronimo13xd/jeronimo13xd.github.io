import React from 'react'
import { Link } from 'react-router-dom';
import './acerca.css'
import './Footer.css'
import logo from '../assets/logo.svg';
import linkedinIcon from '../assets/Linkedin.svg';
import youtubeIcon from '../assets/youtube.svg';
import facebookIcon from '../assets/facebook.svg';
import tiktokIcon from '../assets/tiktok.svg';
import xIcon from '../assets/x.svg'
import instagramIcon from '../assets/insta.svg'

export default function Acerca() {
    return (

        <>

            <div className='azul container'>

                <section>
                    <br></br>
                    <h2>Acerca de ALEPI</h2>
                    <br></br>
                    <p>
                        En ALEPI, nos especializamos en conectar a profesionales del ámbito legal y pericial con personas que necesitan asesoría experta. Nuestra plataforma ofrece un servicio de suscripción que permite a peritos, abogados, y psicólogos ofrecer sus conocimientos y servicios de manera efectiva y accesible, facilitando el acceso a soluciones personalizadas para nuestros clientes.
                    </p>
                    <p>
                        Nuestra misión es proporcionar una plataforma confiable y segura donde profesionales altamente cualificados puedan ofrecer sus servicios de asesoría y peritaje, ayudando a resolver los casos más complejos con el mayor nivel de profesionalismo. En ALEPI, creemos firmemente en el valor de la experiencia, la ética y la precisión en cada uno de los casos que atendemos.
                    </p>
                    <br></br>
                    <h3>¿Por qué elegir ALEPI?</h3>
                    <br></br>
                    <ul>
                        <li>
                            <strong>Red de expertos:</strong> Contamos con una amplia red de profesionales certificados en diversas áreas, listos para ofrecer asesoría personalizada en temas legales, psicológicos y periciales.
                        </li>
                        <li>
                            <strong>Servicio accesible:</strong> Nuestra plataforma de suscripción simplifica el proceso de encontrar el profesional adecuado para cada necesidad, eliminando barreras y facilitando la comunicación directa entre cliente y experto.
                        </li>
                        <li>
                            <strong>Confidencialidad y confianza:</strong> Entendemos la importancia de la privacidad y manejamos cada caso con la más estricta confidencialidad y profesionalismo.
                        </li>
                        <li>
                            <strong>Soluciones personalizadas:</strong> Ofrecemos asesoría hecha a la medida, asegurando que nuestros clientes reciban el apoyo específico que necesitan para cada situación.
                        </li>
                    </ul>
                    <p>
                        <br></br>
                        En ALEPI, nos comprometemos a ser un puente entre los expertos y quienes buscan soluciones legales y periciales precisas, apoyando tanto a los profesionales en su crecimiento como a los clientes en la resolución de sus casos.
                    </p>
                    <p>
                        Gracias por confiar en ALEPI para tus necesidades de asesoría y peritaje. Estamos aquí para brindarte el soporte que necesitas, cuando lo necesites.
                    </p>
                </section>
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
