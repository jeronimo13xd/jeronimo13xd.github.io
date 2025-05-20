import React from 'react';
import './Pasos.css';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import tiktokIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/tiktok.svg';
import xIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/x.svg';
import instagramIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/insta.svg';

const Paso5 = ({ prevStep, handleSubmit, datos }) => {
    return (
        <>
            <div className='contenedorAzul'>
                <div className="importante">
                    <h2>¡IMPORTANTE!</h2>
                    <p>Si se ingresan datos falsos, no habrá devolución de dinero. Verifique su información antes de enviarla.</p>
                    <p>Gracias por su comprensión. ALEPI</p>
                </div>

                <div className="containerReg mt-5">
                    <h2 className="font-weight-bold">Confirmar Datos</h2>
                    <hr style={{ border: "1px solid #007bff", width: "150px" }} />
                    <div className="datos-confirmacion">
                        <h4>Datos Personales:</h4>
                        <p><strong>Nombre(s):</strong> {datos.nombre || 'No proporcionado'}</p>
                        <p><strong>Apellido Paterno:</strong> {datos.apellidoPaterno || 'No proporcionado'}</p>
                        <p><strong>Apellido Materno:</strong> {datos.apellidoMaterno || 'No proporcionado'}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {`${datos.dia || 'D'}/${datos.mes || 'M'}/${datos.ano || 'A'}`}</p>
                        <p><strong>Género:</strong> {datos.genero || 'No proporcionado'}</p>
                        <p><strong>Teléfono:</strong> {`(${datos.codigoArea || 'XXX'}) ${datos.telefono || 'XXXXXXXXXX'}`}</p>
                        <p><strong>Dirección:</strong> {`${datos.calle || 'No proporcionado'}, Número ${datos.numero || 'No proporcionado'}, Interior: ${datos.interior || 'No proporcionado'}, CP: ${datos.codigoPostal || 'No proporcionado'}, Alcaldía: ${datos.alcaldia || 'No proporcionado'}, Estado: ${datos.estado || 'No proporcionado'}`}</p>

                        <h4>Datos Profesionales:</h4>
                        <p><strong>Universidad:</strong> {datos.universidad || 'No proporcionado'}</p>
                        <p><strong>Licenciatura:</strong> {datos.licenciatura || 'No proporcionado'}</p>
                        <p><strong>Cédula Profesional:</strong> {datos.cedulaProfesional || 'No proporcionado'}</p>
                        <p><strong>Especialidades:</strong> {datos.especialidades || 'No proporcionado'}</p>
                        <p><strong>Certificaciones:</strong> {datos.certificaciones || 'No proporcionado'}</p>

                        <h4>Datos Laborales:</h4>
                        <p><strong>Experiencia Laboral:</strong> {datos.experienciaLaboral || 'No proporcionado'}</p>
                        <p><strong>Monto de Asesoría:</strong> {datos.montoAsesoria || 'No proporcionado'} MXN</p>

                        <h4>Idiomas:</h4>
                        {datos.idiomas && datos.idiomas.length > 0 ? (
                            <ul>
                                {datos.idiomas.map((idioma, index) => (
                                    <li key={index}>{idioma}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No se seleccionaron idiomas.</p>
                        )}

                        {datos.idiomas && datos.idiomas.includes("Otros") && (
                            <p><strong>Otros Idiomas:</strong> {datos.otrosIdiomas || 'No especificado'}</p>
                        )}

                        <h4>Datos de Contacto:</h4>
                        <p><strong>LinkedIn:</strong> {datos.linkedin || 'No proporcionado'}</p>
                        <p><strong>Facebook:</strong> {datos.facebook || 'No proporcionado'}</p>
                        <p><strong>Instagram:</strong> {datos.instagram || 'No proporcionado'}</p>
                        <p><strong>X:</strong> {datos.x || 'No proporcionado'}</p>
                        <p><strong>Correo Electrónico de Contacto:</strong> {datos.correoContacto || 'No proporcionado'}</p>
                        <p><strong>WhatsApp:</strong> {datos.whatsapp || 'No proporcionado'}</p>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                            &larr; Anterior
                        </button>
                        <button type="button" className="btn btn-success" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            Confirmar y Finalizar
                        </button>
                    </div>
                </div>
            </div>

            <footer className="footer  py-5">
                {/* Footer */}
                <div className="container">
                    {/* Resto del contenido del footer */}
                </div>
            </footer>
        </>
    );
};

export default Paso5;