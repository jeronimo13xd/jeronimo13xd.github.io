import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import logo from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/logo.svg';
import linkedinIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/Linkedin.svg';
import youtubeIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/youtube.svg';
import facebookIcon from 'C:/xampp/htdocs/alepirea/alepi-react/src/assets/facebook.svg';
import NavLink from 'react-bootstrap/esm/NavLink';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row">
          {/* Logo y Acerca de */}
          <div className="logoFoot col-md-3 text-center">
            <img src={logo} alt="ALEPI Logo" style={{ height: '60px' }} />
          </div>

          {/* Acerca de */}
          <div className="col-md-2 text-center">
            <h5>Acerca de</h5>
            <NavLink to="/Acerca.js" className='acerca text-light'>Detalles</NavLink>
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
              <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
              <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
              <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="col-md-2 text-center">
            <h5>Información Adicional</h5>
            <p><a href="#" className="text-light">Términos y Condiciones</a></p>
            <NavLink to="/AvisoPriv.js" className='acerca text-light'>Detalles</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
