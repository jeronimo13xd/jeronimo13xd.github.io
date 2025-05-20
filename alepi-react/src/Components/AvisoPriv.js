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

export default function AvisoPriv() {
    return (

        <>

            <div className='azul container'>

                <section>
                    <h2>Aviso de Privacidad</h2>
                    <p>
                        <strong>Última actualización:</strong> [Fecha]
                    </p>
                    <p>
                        En ALEPI nos comprometemos a proteger y respetar tu privacidad. Este Aviso de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando accedes a nuestra plataforma y utilizas nuestros servicios.
                    </p>
                    <h3>1. Responsable del tratamiento de los datos personales</h3>
                    <p>
                        ALEPI - Asesoría Legal y Pericial<br />
                        [Dirección de la empresa]<br />
                        [Correo electrónico de contacto]<br />
                        [Número de teléfono de contacto]
                    </p>
                    <h3>2. Datos personales que recopilamos</h3>
                    <p>
                        Podemos recopilar los siguientes datos personales de nuestros Usuarios (incluyendo Profesionales y Clientes):
                    </p>
                    <ul>
                        <li><strong>Datos de identificación personal:</strong> Nombre, apellidos, dirección de correo electrónico, teléfono, dirección física.</li>
                        <li><strong>Datos laborales y profesionales:</strong> En el caso de los Profesionales, recopilamos información relacionada con su profesión, certificaciones y licencias para ofrecer sus servicios en nuestra plataforma.</li>
                        <li><strong>Datos de facturación:</strong> Información necesaria para procesar pagos, como información bancaria y de facturación.</li>
                        <li><strong>Datos de navegación:</strong> Información sobre el uso que haces de nuestra plataforma, como la dirección IP, navegador, dispositivo, e historial de navegación.</li>
                    </ul>
                    <h3>3. Finalidades del tratamiento de los datos personales</h3>
                    <p>
                        Los datos personales que recopilamos serán utilizados para las siguientes finalidades:
                    </p>
                    <ul>
                        <li><strong>Prestación del servicio:</strong> Para gestionar tu cuenta en nuestra plataforma y permitir la conexión entre Clientes y Profesionales.</li>
                        <li><strong>Facturación y pagos:</strong> Para procesar los pagos de las suscripciones y servicios contratados.</li>
                        <li><strong>Comunicación:</strong> Para enviarte notificaciones, actualizaciones sobre nuestros servicios, y responder a tus preguntas o solicitudes.</li>
                        <li><strong>Mejora de servicios:</strong> Para analizar cómo los usuarios utilizan la plataforma y mejorar nuestros servicios.</li>
                        <li><strong>Cumplimiento de obligaciones legales:</strong> Para cumplir con las normativas y regulaciones aplicables en materia de protección de datos y servicios profesionales.</li>
                    </ul>
                    <h3>4. Transferencia de datos personales</h3>
                    <p>
                        Tus datos personales no serán transferidos a terceros sin tu consentimiento, salvo en los siguientes casos:
                    </p>
                    <ul>
                        <li>Cuando sea necesario para cumplir con obligaciones legales.</li>
                        <li>En el caso de que sea requerido por autoridades competentes en el ejercicio de sus funciones.</li>
                        <li>Cuando sea necesario para la prestación de los servicios en la plataforma (por ejemplo, cuando el Cliente contrata un Profesional, se comparten datos relevantes entre ambos).</li>
                    </ul>
                    <h3>5. Seguridad de los datos personales</h3>
                    <p>
                        ALEPI implementa medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra pérdida, robo, uso indebido, acceso no autorizado, divulgación, alteración y destrucción.<br />
                        No obstante, debes tener en cuenta que ningún método de transmisión por internet o almacenamiento electrónico es completamente seguro. Aunque hacemos nuestro mejor esfuerzo para proteger tus datos personales, no podemos garantizar su seguridad absoluta.
                    </p>
                    <h3>6. Derechos del titular de los datos personales</h3>
                    <p>
                        Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales (conocidos como Derechos ARCO). Si deseas ejercer cualquiera de estos derechos, puedes contactarnos a través de:
                    </p>
                    <p>
                        Correo electrónico: [correo electrónico de contacto]<br />
                        Teléfono: [número de contacto]
                    </p>
                    <p>
                        Es posible que te pidamos documentación para verificar tu identidad antes de procesar tu solicitud.
                    </p>
                    <h3>7. Uso de cookies</h3>
                    <p>
                        Nuestra plataforma utiliza cookies y tecnologías similares para mejorar la experiencia de usuario y analizar el tráfico de la web. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestra plataforma. Puedes configurar tu navegador para que rechace algunas o todas las cookies, aunque esto puede afectar el funcionamiento de la plataforma.
                    </p>
                    <h3>8. Conservación de los datos personales</h3>
                    <p>
                        Conservaremos tus datos personales solo durante el tiempo que sea necesario para cumplir con las finalidades establecidas en este Aviso de Privacidad, o mientras mantengas una cuenta activa en nuestra plataforma. Una vez que ya no sea necesario conservar tus datos, los eliminaremos o anonimizaremos de manera segura.
                    </p>
                    <h3>9. Modificaciones al Aviso de Privacidad</h3>
                    <p>
                        Nos reservamos el derecho de modificar este Aviso de Privacidad en cualquier momento. Las modificaciones serán publicadas en nuestra plataforma con la fecha de actualización correspondiente. Te recomendamos revisar periódicamente este documento para estar informado sobre cómo protegemos tu información.
                    </p>
                    <h3>10. Contacto</h3>
                    <p>
                        Si tienes preguntas o inquietudes sobre este Aviso de Privacidad, o si deseas ejercer tus derechos como titular de los datos personales, por favor contáctanos:
                    </p>
                    <p>
                        Correo electrónico: [correo electrónico de contacto]<br />
                        Teléfono: [número de contacto]
                    </p>
                    <p>
                        ALEPI - Asesoría Legal y Pericial<br />
                        [Dirección de la empresa]<br />
                        [Correo electrónico]<br />
                        [Número de teléfono]
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
                                <a href="https://web.facebook.com/?locale=es_LA&_rdc=1&_rdr"><img src={facebookIcon} alt="Facebook" /></a>
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
