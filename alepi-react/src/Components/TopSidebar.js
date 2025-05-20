import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './TopSidebar.css';
import logo from '../assets/logo.svg';
import Sobre from '../assets/Sobre.svg';
import IniSes from '../assets/IconIniSes.svg';
import Susc from '../assets/Susc.svg';
import { AuthContext } from '../Components/AuthContext'; // Importar AuthContext

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("Estado de user en Topbar:", user);

  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="ALEPI Logo" style={{ height: '40px' }} />
        </Navbar.Brand>

        <Nav className="Arriba mx-auto custom-nav d-flex flex-row align-items-center">
          <Nav.Link href="/Directorio">Directorio</Nav.Link>
          <Nav.Link href="/Articulos">Artículos</Nav.Link>
          <Nav.Link href="/Videos">Videos</Nav.Link>
        </Nav>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <img src={logo} alt="ALEPI Logo" style={{ height: '40px' }} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!user ? ( // Si el usuario NO está autenticado
                <>
                  <div className="InicSes">
                    <img src={IniSes} alt="icon" className="nav-icon" />
                    <Link to="/login" className="nav-link">
                      Inicia Sesión
                    </Link>
                  </div>
                  <div className="SobrePag">
                    <img src={Sobre} alt="icon" className="nav-icon" />
                    <Link to="/PregFrec" className="nav-link">
                      Sobre la Página
                    </Link>
                  </div>
                  <div className="Susc">
                    <img src={Susc} alt="icon" className="nav-icon" />
                    <Link to="/Suscripcion" className="nav-link">
                      Únete a ALEPI
                    </Link>
                  </div>
                  <div className="Info">
                    <Link to="/Info" className="nav-link">
                      Conoce ALEPI
                    </Link>
                  </div>
                </>
              ) : ( // Si el usuario ESTÁ autenticado
                <>
                  <div className="perfil">
                    <Link to="/perfil" className="nav-link">
                      Mi Perfil
                    </Link>
                  </div>
                  <div className="Notificaciones">
                    <Link to="/Notificaciones" className="nav-link">
                      Notificaciones
                    </Link>
                  </div>
                  <div className="ArticulosU">
                    <Link to="/ArticulosU" className="nav-link">
                      Artículos
                    </Link>
                  </div>
                  <div className="Videos">
                    <Link to="/VideosU" className="nav-link">
                      Videos
                    </Link>
                  </div>
                  <div className="SobrePagina">
                    <Link to="/Info" className="nav-link">
                      Sobre la página
                    </Link>
                  </div>
                  <div className="Configuracion">
                    <Link to="/ConfiguracionU" className="nav-link">
                      Configuración
                    </Link>
                  </div>
                  <div className="logout">
                    <button
                      onClick={() => {
                        logout(); // Cerrar sesión
                      }}
                      className="nav-link btn btn-link"
                      style={{ textDecoration: 'none' }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Topbar;
