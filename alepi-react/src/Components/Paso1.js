import React from 'react';
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

const Paso1 = ({ nextStep, handleChange, datos }) => {
    // Lista de códigos de área con su lugar de origen en México
    const codigosAreaMexico = [
        { codigo: "55", lugar: "Ciudad de México" },
        { codigo: "81", lugar: "Monterrey" },
        { codigo: "33", lugar: "Guadalajara" },
        { codigo: "998", lugar: "Cancún" },
        { codigo: "656", lugar: "Ciudad Juárez" },
        { codigo: "664", lugar: "Tijuana" },
        { codigo: "222", lugar: "Puebla" },
        { codigo: "442", lugar: "Querétaro" },
        { codigo: "999", lugar: "Mérida" },
        { codigo: "777", lugar: "Cuernavaca" },
        { codigo: "614", lugar: "Chihuahua" },
        { codigo: "618", lugar: "Durango" },
        { codigo: "229", lugar: "Veracruz" },
        { codigo: "871", lugar: "Torreón" },
        { codigo: "961", lugar: "Tuxtla Gutiérrez" },
        { codigo: "662", lugar: "Hermosillo" },
        { codigo: "744", lugar: "Acapulco" },
        { codigo: "998", lugar: "Quintana Roo" },
        { codigo: "833", lugar: "Tampico" },
        { codigo: "477", lugar: "León" },
        { codigo: "351", lugar: "Zamora" },
        { codigo: "867", lugar: "Nuevo Laredo" },
        { codigo: "828", lugar: "Cadereyta" },
        { codigo: "653", lugar: "Agua Prieta" },
        { codigo: "773", lugar: "Tulancingo" },
        { codigo: "771", lugar: "Pachuca" },
    ]; // Puedes agregar más códigos y regiones según sea necesario.

    return (

        <>

            <div className='contenedorAzul'>


                <div class="importante">

                    <h2>¡IMPORTANTE!</h2>
                    <p>Si se ingresan datos falsos, no habrá devolución de dinero. Verifique su información antes de enviarla.</p>
                    <p>Gracias por su comprensión.ALEPI</p>

                </div>



                <div className="containerReg mt-5">
                    <h2 className="font-weight-bold">DATOS PERSONALES</h2>
                    <hr style={{ border: "1px solid #000000", width: "100px" }} />
                    <form>
                        <div className="row">
                            {/* Nombre Completo */}
                            <div className="col-md-4">
                                <h5>Nombre Completo</h5>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre(s)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Nombre(s)"
                                        value={datos.nombre}
                                        onChange={(e) => handleChange('nombre', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellidoPaterno"
                                        placeholder="Apellido Paterno"
                                        value={datos.apellidoPaterno}
                                        onChange={(e) => handleChange('apellidoPaterno', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellidoMaterno">Apellido Materno</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellidoMaterno"
                                        placeholder="Apellido Materno"
                                        value={datos.apellidoMaterno}
                                        onChange={(e) => handleChange('apellidoMaterno', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Fecha de Nacimiento y Género */}
                            <div className="col-md-4">
                                <h5>Fecha de nacimiento</h5>
                                <div className="form-group">
                                    <label htmlFor="fechaNacimiento">Seleccione su fecha de nacimiento</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fechaNacimiento"
                                        value={datos.fechaNacimiento || ''}
                                        onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="genero">Género</label>
                                    <select
                                        className="form-control"
                                        id="genero"
                                        value={datos.genero || ''}
                                        onChange={(e) => handleChange('genero', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccione su género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="No Binario">No Binario</option>
                                        <option value="Otro">Otro</option>
                                        <option value="Prefiero no decir">Prefiero no decir</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telefono">Número telefónico</label>
                                    <div className="form-row">
                                        {/* Código de Área */}
                                        <div className="col">
                                            <label htmlFor="codigoArea">Código de área</label>
                                            <select
                                                className="form-control"
                                                id="codigoArea"
                                                value={datos.codigoArea || ''}
                                                onChange={(e) => handleChange('codigoArea', e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccione</option>
                                                {codigosAreaMexico.map(({ codigo, lugar }) => (
                                                    <option key={codigo} value={codigo}>
                                                        {codigo} - {lugar}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Número Telefónico */}
                                        <div className="col">
                                            <label htmlFor="telefonoNumero">Número</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="telefonoNumero"
                                                placeholder="Teléfono"
                                                maxLength="10"
                                                value={datos.telefono || ''}
                                                onChange={(e) => handleChange('telefono', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="col-md-4">
                                <h5>Dirección</h5>
                                <div className="form-group">
                                    <label htmlFor="calle">Calle</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="calle"
                                        placeholder="Calle"
                                        value={datos.calle}
                                        onChange={(e) => handleChange('calle', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numero">Número</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="numero"
                                        placeholder="Número"
                                        value={datos.numero}
                                        onChange={(e) => handleChange('numero', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="interior">Interior (Opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="interior"
                                        placeholder="Interior"
                                        value={datos.interior}
                                        onChange={(e) => handleChange('interior', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="codigoPostal">Código postal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="codigoPostal"
                                        placeholder="Código postal"
                                        value={datos.codigoPostal}
                                        onChange={(e) => handleChange('codigoPostal', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alcaldia">Alcaldía</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="alcaldia"
                                        placeholder="Alcaldía"
                                        value={datos.alcaldia}
                                        onChange={(e) => handleChange('alcaldia', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="estado">Estado</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="estado"
                                        placeholder="Estado"
                                        value={datos.estado}
                                        onChange={(e) => handleChange('estado', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="btn btn-primary" onClick={nextStep}>&rarr; Siguiente</button>
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

export default Paso1;
