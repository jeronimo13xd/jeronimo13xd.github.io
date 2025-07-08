import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo   from '../assets/logo.svg';
import Sobre  from '../assets/Sobre.svg';
import IniSes from '../assets/IconIniSes.svg';
import Susc   from '../assets/Susc.svg';

import { AuthContext } from './AuthContext';
import './TopSidebar.css';

/* ----------  INVITADO  ---------- */
const SidebarGuest = () => (
  <>
    <Nav.Item>
      <Link to="/login" className="nav-link d-flex align-items-center gap-2">
        <img src={IniSes} alt="" className="nav-icon" />
        <span>Inicia Sesión</span>
      </Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/pregfrec" className="nav-link d-flex align-items-center gap-2">
        <img src={Sobre} alt="" className="nav-icon" />
        <span>Sobre la Página</span>
      </Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/suscripcion" className="nav-link d-flex align-items-center gap-2">
        <img src={Susc} alt="" className="nav-icon" />
        <span>Únete a ALEPI</span>
      </Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/info" className="nav-link d-flex align-items-center gap-2">
        <i className="bi bi-info-circle nav-icon" />
        <span>Conoce ALEPI</span>
      </Link>
    </Nav.Item>
  </>
);

/* ----------  PROFESIONAL / CLIENTE  ---------- */
const SidebarProfesional = ({ logout }) => (
  <>
    <Nav.Item><Link to="/perfil"           className="nav-link">Mi Perfil</Link></Nav.Item>
    <Nav.Item><Link to="/notificaciones"   className="nav-link">Notificaciones</Link></Nav.Item>
    <Nav.Item><Link to="/articulosu"       className="nav-link">Artículos</Link></Nav.Item>
    <Nav.Item><Link to="/videosu"          className="nav-link">Videos</Link></Nav.Item>
    <Nav.Item><Link to="/info"             className="nav-link">Sobre la página</Link></Nav.Item>
    <Nav.Item><Link to="/configuracionu"   className="nav-link">Configuración</Link></Nav.Item>
    <Nav.Item>
      <button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button>
    </Nav.Item>
  </>
);

/* ----------  SUPER-ADMIN / SISTEMA  ---------- */
const SidebarSuper = ({ logout }) => (
  <>
    <Nav.Item><Link to="/dashboard/super" className="nav-link">Dashboard</Link></Nav.Item>
    <Nav.Item><Link to="/roles"           className="nav-link">Roles</Link></Nav.Item>
    <Nav.Item><Link to="/usuarios"        className="nav-link">Usuarios</Link></Nav.Item>
    <Nav.Item>
      <button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button>
    </Nav.Item>
  </>
);

/* ----------  NEGOCIO  ---------- */
const SidebarNegocio = ({ logout }) => (
  <>
    <Nav.Item><Link to="/dashboard/negocio" className="nav-link">Dashboard</Link></Nav.Item>
    <Nav.Item><Link to="/aprobaciones"       className="nav-link">Aprobaciones</Link></Nav.Item>
    <Nav.Item><Link to="/suscripciones"      className="nav-link">Suscripciones</Link></Nav.Item>
    <Nav.Item><Link to="/pagos"              className="nav-link">Pagos</Link></Nav.Item>
    <Nav.Item>
      <button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button>
    </Nav.Item>
  </>
);

/* ----------  VENTAS  ---------- */
const SidebarVentas = ({ logout }) => (
  <>
    <Nav.Item><Link to="/dashboard/ventas" className="nav-link">Dashboard</Link></Nav.Item>

    <Nav.Item><Link to="/ventas/usuarios" className="nav-link">Profesionales</Link></Nav.Item>
    <Nav.Item className="ps-3"><Link to="/ventas/usuarios/nuevo" className="nav-link">➕ Alta profesional</Link></Nav.Item>

    <Nav.Item><Link to="/ventas/suscripciones" className="nav-link">Suscripciones</Link></Nav.Item>
    <Nav.Item className="ps-3"><Link to="/ventas/suscripciones/nuevo" className="nav-link">➕ Nueva suscripción</Link></Nav.Item>

    <Nav.Item><Link to="/ventas/pagos"    className="nav-link">Pagos</Link></Nav.Item>
    <Nav.Item><Link to="/ventas/cupones"  className="nav-link">Cupones</Link></Nav.Item>
    <Nav.Item><Link to="/ventas/reportes" className="nav-link">Reportes</Link></Nav.Item>
    <Nav.Item><Link to="/ventas/notificacion/nueva" className="nav-link">Nueva notificación</Link></Nav.Item>

    <Nav.Item>
      <button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button>
    </Nav.Item>
  </>
);

/* ----------  TOPBAR PRINCIPAL  ---------- */
export default function Topbar() {
  const { user, logout } = useContext(AuthContext);

  const renderSidebar = () => {
    if (!user) return <SidebarGuest />;

    /* normalizamos */
    const rol = (user.rol || user.TipoUsuario || '').toString().trim().toLowerCase();

    if (rol === 'sistema' || rol === 'superadmin') return <SidebarSuper  logout={logout} />;
    if (rol === 'negocio')                         return <SidebarNegocio logout={logout} />;
    if (rol === 'ventas')                          return <SidebarVentas  logout={logout} />;
    if (rol === 'cliente')                         return <SidebarProfesional logout={logout} />;

    /* fallback */
    return <SidebarGuest />;
  };

  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="ALEPI Logo" style={{ height: 40 }} />
        </Navbar.Brand>

        <Nav className="Arriba mx-auto custom-nav d-flex flex-row align-items-center">
          <Nav.Link as={Link} to="/directorio">Directorio</Nav.Link>
          <Nav.Link as={Link} to="/articulos">Artículos</Nav.Link>
          <Nav.Link as={Link} to="/videos">Videos</Nav.Link>
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
              {renderSidebar()}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
