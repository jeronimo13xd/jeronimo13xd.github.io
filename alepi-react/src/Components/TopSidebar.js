import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container   from 'react-bootstrap/Container';
import Nav         from 'react-bootstrap/Nav';
import Navbar      from 'react-bootstrap/Navbar';
import Offcanvas   from 'react-bootstrap/Offcanvas';
import logo        from '../assets/logo.svg';
import Sobre       from '../assets/Sobre.svg';
import IniSes      from '../assets/IconIniSes.svg';
import Susc        from '../assets/Susc.svg';

import { AuthContext } from '../Components/AuthContext';
import './TopSidebar.css';

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.permisos?.includes('configuracion:update');      // 👈 permiso “signo” de admin

  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="ALEPI Logo" style={{ height: 40 }} />
        </Navbar.Brand>

        <Nav className="Arriba mx-auto custom-nav d-flex flex-row align-items-center">
          <Nav.Link as={Link} to="/Directorio">Directorio</Nav.Link>
          <Nav.Link as={Link} to="/Articulos">Artículos</Nav.Link>
          <Nav.Link as={Link} to="/Videos">Videos</Nav.Link>
        </Nav>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <img src={logo} alt="ALEPI Logo" style={{ height: 40 }} />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-column pe-3">

              {/* 1. Visitante (sin login) */}
              {!user && (
                <>
                  <Nav.Item className="InicSes">
                    <img src={IniSes} alt="" className="nav-icon" />
                    <Link to="/login"  className="nav-link">Inicia Sesión</Link>
                  </Nav.Item>

                  <Nav.Item className="SobrePag">
                    <img src={Sobre} alt="" className="nav-icon" />
                    <Link to="/PregFrec" className="nav-link">Sobre la Página</Link>
                  </Nav.Item>

                  <Nav.Item className="Susc">
                    <img src={Susc} alt="" className="nav-icon" />
                    <Link to="/Suscripcion" className="nav-link">Únete a ALEPI</Link>
                  </Nav.Item>

                  <Nav.Item><Link to="/Info" className="nav-link">Conoce ALEPI</Link></Nav.Item>
                </>
              )}

              {/* 2. Admin interno (superadmin / negocio / ventas) */}
              {user && isAdmin && (
                <>
                  <Nav.Item><Link to="/dashboard"      className="nav-link">Dashboard</Link></Nav.Item>
                  <Nav.Item><Link to="/usuarios"       className="nav-link">Usuarios</Link></Nav.Item>
                  <Nav.Item><Link to="/profesionales"  className="nav-link">Profesionales</Link></Nav.Item>
                  <Nav.Item><Link to="/articulos"      className="nav-link">Artículos CMS</Link></Nav.Item>
                  <Nav.Item><Link to="/videos"         className="nav-link">Videos CMS</Link></Nav.Item>
                  <Nav.Item><Link to="/suscripciones"  className="nav-link">Suscripciones</Link></Nav.Item>
                  <Nav.Item><Link to="/pagos"          className="nav-link">Pagos & Facturas</Link></Nav.Item>
                  <Nav.Item><Link to="/cupones"        className="nav-link">Cupones</Link></Nav.Item>
                  <Nav.Item><Link to="/config"         className="nav-link">Configuración</Link></Nav.Item>
                  <Nav.Item>
                    <button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button>
                  </Nav.Item>
                </>
              )}

              {/* 3. Usuario normal logeado (no admin) */}
              {user && !isAdmin && (
                <>
                  <Nav.Item><Link to="/perfil"          className="nav-link">Mi Perfil</Link></Nav.Item>
                  <Nav.Item><Link to="/Notificaciones" className="nav-link">Notificaciones</Link></Nav.Item>
                  <Nav.Item><Link to="/ArticulosU"     className="nav-link">Artículos</Link></Nav.Item>
                  <Nav.Item><Link to="/VideosU"        className="nav-link">Videos</Link></Nav.Item>
                  <Nav.Item><Link to="/Info"           className="nav-link">Sobre la página</Link></Nav.Item>
                  <Nav.Item><Link to="/ConfiguracionU" className="nav-link">Configuración</Link></Nav.Item>
                  <Nav.Item>
                    <button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button>
                  </Nav.Item>
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
