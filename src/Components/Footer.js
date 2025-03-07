import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import logo from '../assets/logo.svg';
import linkedinIcon from '../assets/Linkedin.svg';
import youtubeIcon from '../assets/youtube.svg';
import facebookIcon from '../assets/facebook.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid"> {/* Cambiado a container-fluid */}
        <div className="row justify-content-center align-items-center">

          {/* Logo y Acerca de */}
          <div className="col-md-3 text-center">
            <img src={logo} alt="ALEPI Logo" className="logoFooter" />
          </div>

          {/* Acerca de */}
          <div className="col-md-2 text-center">
            <h5>Acerca de</h5>
            <Link to="/Acerca.js" className="acerca">Detalles</Link>
          </div>

          {/* Contacto */}
          <div className="col-md-3 text-center">
            <h5>Contacto</h5>
            <p><strong>Teléfono:</strong> 000-000-000</p>
            <p><strong>Correo:</strong> <a href="mailto:correoAlepi@Alepi.com">correoAlepi@Alepi.com</a></p>
            <p><strong>Dirección:</strong> Empresa S.A. de C.V., Av. Insurgentes Sur 123, Piso 5, Colonia Roma, CDMX</p>
          </div>

          {/* Redes Sociales */}
          <div className="col-md-2 text-center">
            <h5>Redes Sociales</h5>
            <div className="redes-iconos">
              <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
              <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
              <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="col-md-2 text-center">
            <h5>Información Adicional</h5>
            <p><a href="#">Términos y Condiciones</a></p>
            <Link to="/AvisoPriv.js" className="acerca">Detalles</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
