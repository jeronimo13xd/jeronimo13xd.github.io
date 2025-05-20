import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pasos.css';
import { Link } from 'react-router-dom';
import './Footer.css'
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import tiktokIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/tiktok.svg';
import xIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/x.svg'
import instagramIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/insta.svg'

const Paso2 = ({ nextStep, prevStep, handleChange, datos }) => {
    const [especialidades, setEspecialidades] = useState([]); // Estado para las especialidades
    const [profesiones, setProfesiones] = useState([]); // Estado para las profesiones
    const [error, setError] = useState(''); // Mensaje de error

    // Obtener las especialidades desde el backend

    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                const response = await axios.get('http://localhost/alepirea/Cat_Especialidades.php');
                console.log('Respuesta completa:', response);
                console.log('Datos recibidos:', response.data);
                setEspecialidades(response.data);
            } catch (error) {
                console.error('Error al obtener las especialidades:', error);
            }
        };


        const fetchProfesiones = async () => {
            try {
                const response = await axios.get('http://localhost/alepirea/Cat_Profesiones.php'); // Endpoint para obtener las profesiones
                setProfesiones(response.data);
            } catch (error) {
                console.error('Error al obtener las profesiones:', error);
            }
        };



        fetchEspecialidades();
        fetchProfesiones();
    }, []);


    // función para validar las profesiones

    const validarProfesion = (carrera) => {
        // Busca si la carrera ingresada coincide con alguna profesión en la base de datos
        const profesionEncontrada = profesiones.find(
            (profesion) => profesion.Nombre.toLowerCase() === carrera.toLowerCase()
        );

        if (profesionEncontrada) {
            setError('');
            handleChange('profesion', profesionEncontrada.ID_Profesion); // Guarda el ID de la profesión
        } else {
            setError('La carrera ingresada no coincide con ninguna profesión válida.');
            handleChange('profesion', ''); // Limpia el ID de la profesión en el estado
        }
    };





    return (

        <>

            <div className='contenedorAzul'>

                <div class="importante">

                    <h2>¡IMPORTANTE!</h2>
                    <p>Si se ingresan datos falsos, no habrá devolución de dinero. Verifique su información antes de enviarla.</p>
                    <p>Gracias por su comprensión.ALEPI</p>

                </div>

                <div className="containerReg mt-5">
                    <h2 className="font-weight-bold">Datos Profesionales</h2>
                    <hr style={{ border: "1px solid #007bff", width: "150px" }} />
                    <form>
                        <div className="row">
                            {/* Estudios Superiores */}
                            <div className="col-md-4">
                                <h5>Estudios Superiores</h5>
                                <div className="form-group">
                                    <label htmlFor="universidad">Universidad</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="universidad"
                                        placeholder="Universidad"
                                        value={datos.universidad}
                                        onChange={(e) => handleChange('universidad', e.target.value)}
                                    />
                                </div>




                                <div className="form-group">
                                    <label htmlFor="licenciatura">Licenciatura</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="licenciatura"
                                        placeholder="Ejemplo: Psicología, Derecho, Perito"
                                        value={datos.licenciatura}
                                        onChange={(e) => {
                                            handleChange('licenciatura', e.target.value);
                                            validarProfesion(e.target.value);
                                        }}
                                    />
                                </div>
                                {error && (
                                    <p className="text-danger">{error}</p> // Mostrar mensaje de error si no coincide
                                )}






                                <div className="form-group">
                                    <label htmlFor="cedulaProfesional">Cédula Profesional</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cedulaProfesional"
                                        placeholder="Cédula Profesional"
                                        value={datos.cedulaProfesional}
                                        onChange={(e) => handleChange('cedulaProfesional', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Especialidades */}
                            <div className="col-md-4">
                                <h5>Especialidades</h5>
                                <div className="form-group">
                                    <label htmlFor="especialidades">Seleccione su especialidad</label>
                                    <select
                                        className="form-control"
                                        id="especialidades"
                                        value={datos.especialidades || ''} // Aquí almacena el ID
                                        onChange={(e) => handleChange('especialidades', e.target.value)} // Guarda el ID seleccionado
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {especialidades.map((especialidad) => (
                                            <option key={especialidad.ID_Especialidad} value={especialidad.ID_Especialidad}>
                                                {especialidad.Nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            {/* Certificaciones */}

                            <div className="col-md-4">
                                <h5>Certificaciones</h5>
                                <div className="form-group">
                                    <label htmlFor="certificaciones">Mencione su certificación(es)</label>
                                    <textarea
                                        className="form-control"
                                        id="certificaciones"
                                        rows="4"
                                        placeholder="Certificaciones"
                                        value={datos.certificaciones}
                                        onChange={(e) => handleChange('certificaciones', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>



                            {/* Idiomas */}
                            <div className="col-md-4">
                                <h5>Idiomas</h5>
                                <div className="form-group">
                                    <label>Seleccione los idiomas que habla</label>
                                    <div>
                                        {/* Lista de idiomas más comunes */}
                                        {[
                                            "Español", "Inglés", "Francés", "Alemán", "Italiano",
                                            "Portugués", "Chino", "Japonés", "Coreano", "Ruso",
                                            "Árabe", "Hindi", "Bengalí", "Turco", "Hebreo",
                                        ].map((idioma) => (
                                            <div key={idioma} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`idioma-${idioma}`}
                                                    value={idioma}
                                                    checked={datos.idiomas?.includes(idioma) || false}
                                                    onChange={(e) => {
                                                        const selectedIdiomas = datos.idiomas || [];
                                                        if (e.target.checked) {
                                                            handleChange('idiomas', [...selectedIdiomas, idioma]);
                                                        } else {
                                                            handleChange('idiomas', selectedIdiomas.filter((i) => i !== idioma));
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor={`idioma-${idioma}`}>
                                                    {idioma}
                                                </label>
                                            </div>
                                        ))}

                                        {/* Opción para "Otros" */}
                                        <div className="form-check mt-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="idioma-otros"
                                                value="Otros"
                                                checked={datos.idiomas?.includes("Otros") || false}
                                                onChange={(e) => {
                                                    const selectedIdiomas = datos.idiomas || [];
                                                    if (e.target.checked) {
                                                        handleChange('idiomas', [...selectedIdiomas, "Otros"]);
                                                    } else {
                                                        handleChange('idiomas', selectedIdiomas.filter((i) => i !== "Otros"));
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="idioma-otros">
                                                Otros
                                            </label>
                                        </div>

                                        {/* Campo para especificar "Otros" */}
                                        {datos.idiomas?.includes("Otros") && (
                                            <div className="mt-2">
                                                <label htmlFor="otrosIdiomas">Especifique los otros idiomas:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="otrosIdiomas"
                                                    placeholder="Especifique aquí"
                                                    value={datos.otrosIdiomas || ""}
                                                    onChange={(e) => handleChange("otrosIdiomas", e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>






                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>&larr; Anterior</button>
                            <button type="button" className="btn btn-primary" onClick={nextStep}>Siguiente &rarr;</button>
                        </div>
                    </form>
                </div >




            </div >


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

export default Paso2;