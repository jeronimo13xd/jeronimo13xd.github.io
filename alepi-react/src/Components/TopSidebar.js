import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import logo from '../assets/logo.svg';
import { useAuth } from './AuthContext';
import './TopSidebar.css';

/* ----------  INVITADO - ELEGANTE ---------- */
const SidebarGuest = () => (
  <>
    <div className="welcome-section">
      <div className="welcome-icon">
        <i className="bi bi-emoji-smile"></i>
      </div>
      <div className="welcome-content">
        <h6>Bienvenido a ALEPI</h6>
        <p>Accede a tu cuenta para continuar</p>
      </div>
    </div>

    <Nav.Item>
      <Link to="/login" className="nav-link nav-item-elegant">
        <div className="nav-icon-container">
          <i className="bi bi-box-arrow-in-right"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Inicia Sesión</span>
          <span className="nav-subtitle">Accede a tu cuenta</span>
        </div>
        <i className="bi bi-chevron-right nav-arrow"></i>
      </Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/pregfrec" className="nav-link nav-item-elegant">
        <div className="nav-icon-container">
          <i className="bi bi-info-circle"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Sobre la Página</span>
          <span className="nav-subtitle">Conoce más sobre nosotros</span>
        </div>
      </Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/suscripcion" className="nav-link nav-item-elegant nav-item-premium">
        <div className="nav-icon-container">
          <i className="bi bi-star-fill"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Únete a ALEPI</span>
          <span className="nav-subtitle">Plan Premium</span>
        </div>
        <span className="premium-badge">PRO</span>
      </Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/info" className="nav-link nav-item-elegant">
        <div className="nav-icon-container">
          <i className="bi bi-building"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Conoce ALEPI</span>
          <span className="nav-subtitle">Nuestra misión y visión</span>
        </div>
      </Link>
    </Nav.Item>
  </>
);

/* ----------  PROFESIONAL / CLIENTE - ELEGANTE ---------- */
const SidebarProfesional = ({ logout }) => (
  <>
    <div className="user-profile-elegant">
      <div className="profile-avatar">
        <i className="bi bi-person-circle"></i>
        <div className="online-indicator"></div>
      </div>
      <div className="profile-details">
        <h6 className="profile-name">Mi Perfil</h6>
        <div className="profile-info">
          <span className="profile-role">Profesional</span>
          <span className="profile-status">Activo</span>
        </div>
      </div>
    </div>

    <div className="nav-section">
      <span className="section-title">Mi Cuenta</span>
      <Nav.Item>
        <Link to="/perfil" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-person"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Mi Perfil</span>
            <span className="nav-subtitle">Gestiona tu información</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/notificaciones" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-bell"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Notificaciones</span>
            <span className="nav-subtitle">Tus alertas importantes</span>
          </div>
          <span className="notification-counter">3</span>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-section">
      <span className="section-title">Mis Contenidos</span>
      <Nav.Item>
        <Link to="/articulosu" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-file-text"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Artículos</span>
            <span className="nav-subtitle">Gestiona tus publicaciones</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/videosu" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-play-circle"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Videos</span>
            <span className="nav-subtitle">Tus contenidos multimedia</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-section">
      <span className="section-title">Configuración</span>
      <Nav.Item>
        <Link to="/info" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-info-circle"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Sobre la página</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/configuracionu" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-gear"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Configuración</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-footer">
      <button onClick={logout} className="nav-link nav-item-elegant nav-item-logout">
        <div className="nav-icon-container">
          <i className="bi bi-box-arrow-right"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Cerrar Sesión</span>
          <span className="nav-subtitle">Finalizar sesión actual</span>
        </div>
      </button>
    </div>
  </>
);

/* ----------  SUPER-ADMIN / SISTEMA - ELEGANTE ---------- */
const SidebarSuper = ({ logout }) => (
  <>
    <div className="user-profile-elegant admin-profile">
      <div className="profile-avatar">
        <i className="bi bi-shield-shaded"></i>
        <div className="online-indicator"></div>
      </div>
      <div className="profile-details">
        <h6 className="profile-name">Administrador</h6>
        <div className="profile-info">
          <span className="profile-role">Super Admin</span>
          <span className="profile-status">Acceso Total</span>
        </div>
      </div>
    </div>

    <div className="nav-section">
      <span className="section-title">Administración</span>
      <Nav.Item>
        <Link to="/dashboard/super" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-speedometer2"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Dashboard</span>
            <span className="nav-subtitle">Panel de control</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/roles" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-person-badge"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Roles</span>
            <span className="nav-subtitle">Gestión de permisos</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/usuarios" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-people"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Usuarios</span>
            <span className="nav-subtitle">Gestión de usuarios</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-footer">
      <button onClick={logout} className="nav-link nav-item-elegant nav-item-logout">
        <div className="nav-icon-container">
          <i className="bi bi-box-arrow-right"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Cerrar Sesión</span>
        </div>
      </button>
    </div>
  </>
);

/* ----------  NEGOCIO - ELEGANTE ---------- */
const SidebarNegocio = ({ logout }) => (
  <>
    <div className="user-profile-elegant business-profile">
      <div className="profile-avatar">
        <i className="bi bi-building"></i>
        <div className="online-indicator"></div>
      </div>
      <div className="profile-details">
        <h6 className="profile-name">Negocio</h6>
        <div className="profile-info">
          <span className="profile-role">Gestión</span>
          <span className="profile-status">Operaciones</span>
        </div>
      </div>
    </div>

    <div className="nav-section">
      <span className="section-title">Operaciones</span>
      <Nav.Item>
        <Link to="/dashboard/negocio" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-speedometer2"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Dashboard</span>
            <span className="nav-subtitle">Panel de control</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/aprobaciones" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-check-circle"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Aprobaciones</span>
            <span className="nav-subtitle">Gestionar solicitudes</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/suscripciones" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-credit-card"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Suscripciones</span>
            <span className="nav-subtitle">Gestión de membresías</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/pagos" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-cash-coin"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Pagos</span>
            <span className="nav-subtitle">Control de pagos</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-footer">
      <button onClick={logout} className="nav-link nav-item-elegant nav-item-logout">
        <div className="nav-icon-container">
          <i className="bi bi-box-arrow-right"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Cerrar Sesión</span>
        </div>
      </button>
    </div>
  </>
);

/* ----------  VENTAS - ELEGANTE ---------- */
const SidebarVentas = ({ logout }) => (
  <>
    <div className="user-profile-elegant sales-profile">
      <div className="profile-avatar">
        <i className="bi bi-graph-up"></i>
        <div className="online-indicator"></div>
      </div>
      <div className="profile-details">
        <h6 className="profile-name">Ventas</h6>
        <div className="profile-info">
          <span className="profile-role">Comercial</span>
          <span className="profile-status">Ventas & Marketing</span>
        </div>
      </div>
    </div>

    <div className="nav-section">
      <span className="section-title">Dashboard</span>
      <Nav.Item>
        <Link to="/dashboard/ventas" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-speedometer2"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Dashboard</span>
            <span className="nav-subtitle">Panel de ventas</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-section">
      <span className="section-title">Profesionales</span>
      <Nav.Item>
        <Link to="/ventas/usuarios" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-people"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Profesionales</span>
            <span className="nav-subtitle">Gestión de usuarios</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item className="nav-subitem">
        <Link to="/ventas/usuarios/nuevo" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-plus-circle"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Alta profesional</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-section">
      <span className="section-title">Suscripciones</span>
      <Nav.Item>
        <Link to="/ventas/suscripciones" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-credit-card"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Suscripciones</span>
            <span className="nav-subtitle">Gestión de planes</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item className="nav-subitem">
        <Link to="/ventas/suscripciones/nuevo" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-plus-circle"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Nueva suscripción</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-section">
      <span className="section-title">Gestión</span>
      <Nav.Item>
        <Link to="/ventas/pagos" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-cash-coin"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Pagos</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/ventas/cupones" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-tag"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Cupones</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/ventas/reportes" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-graph-up"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Reportes</span>
          </div>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/ventas/notificacion/nueva" className="nav-link nav-item-elegant">
          <div className="nav-icon-container">
            <i className="bi bi-bell"></i>
          </div>
          <div className="nav-text">
            <span className="nav-title">Nueva notificación</span>
          </div>
        </Link>
      </Nav.Item>
    </div>

    <div className="nav-footer">
      <button onClick={logout} className="nav-link nav-item-elegant nav-item-logout">
        <div className="nav-icon-container">
          <i className="bi bi-box-arrow-right"></i>
        </div>
        <div className="nav-text">
          <span className="nav-title">Cerrar Sesión</span>
        </div>
      </button>
    </div>
  </>
);

/* ----------  TOPBAR PRINCIPAL - ELEGANTE ---------- */
export default function Topbar() {
  const { user, logout } = useAuth();

  const renderSidebar = () => {
    if (!user) return <SidebarGuest />;

    const rol = (user.rol || user.TipoUsuario || '').toString().trim().toLowerCase();

    if (rol === 'sistema' || rol === 'superadmin') return <SidebarSuper logout={logout} />;
    if (rol === 'negocio') return <SidebarNegocio logout={logout} />;
    if (rol === 'ventas') return <SidebarVentas logout={logout} />;
    if (rol === 'cliente') return <SidebarProfesional logout={logout} />;

    return <SidebarGuest />;
  };

  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3 alepi-navbar-elegant">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-elegant">
          <img src={logo} alt="ALEPI Logo" className="brand-logo-elegant" />
        </Navbar.Brand>

        <Nav className="Arriba mx-auto custom-nav-elegant d-flex flex-row align-items-center">
          <Nav.Link as={Link} to="/directorio" className="nav-link topbar-link-elegant">
            <i className="bi bi-search me-2"></i>
            Directorio
          </Nav.Link>
          <Nav.Link as={Link} to="/articulos" className="nav-link topbar-link-elegant">
            <i className="bi bi-file-text me-2"></i>
            Artículos
          </Nav.Link>
          <Nav.Link as={Link} to="/videos" className="nav-link topbar-link-elegant">
            <i className="bi bi-play-circle me-2"></i>
            Videos
          </Nav.Link>
        </Nav>

        <Navbar.Toggle aria-controls="offcanvasNavbar" className="navbar-toggler-elegant">
          <span className="toggler-bar toggler-bar-1"></span>
          <span className="toggler-bar toggler-bar-2"></span>
          <span className="toggler-bar toggler-bar-3"></span>
        </Navbar.Toggle>

        <Navbar.Offcanvas 
          id="offcanvasNavbar" 
          placement="end" 
          className="alepi-offcanvas-elegant"
        >
          <Offcanvas.Header closeButton className="offcanvas-header-elegant">
            <Offcanvas.Title className="offcanvas-title-elegant">
              <img src={logo} alt="ALEPI Logo" className="offcanvas-logo-elegant" />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="offcanvas-body-elegant">
            <Nav className="flex-column">
              {renderSidebar()}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}