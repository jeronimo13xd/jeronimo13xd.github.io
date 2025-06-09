// src/Components/TopSidebar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logo   from "../assets/logo.svg";
import Sobre  from "../assets/Sobre.svg";
import IniSes from "../assets/IconIniSes.svg";
import Susc   from "../assets/Susc.svg";

import { AuthContext } from "./AuthContext";
import "./TopSidebar.css";

/* ─────────────────────────  Sidebars por rol  ───────────────────────── */

const SidebarGuest = () => (
  <>
    <Nav.Item className="InicSes">
      <img src={IniSes} alt="" className="nav-icon" />
      <Link to="/login" className="nav-link">Inicia Sesión</Link>
    </Nav.Item>

    <Nav.Item className="SobrePag">
      <img src={Sobre} alt="" className="nav-icon" />
      <Link to="/PregFrec" className="nav-link">Sobre la Página</Link>
    </Nav.Item>

    <Nav.Item className="Susc">
      <img src={Susc} alt="" className="nav-icon" />
      <Link to="/Suscripcion" className="nav-link">Únete a ALEPI</Link>
    </Nav.Item>

    <Nav.Item>
      <Link to="/Info" className="nav-link">Conoce ALEPI</Link>
    </Nav.Item>
  </>
);

/* ───── SUPERADMIN / SISTEMA ───── */
const SidebarSuper = ({ logout }) => (
  <>
    <Nav.Item><Link to="/dashboard/super" className="nav-link">Dashboard</Link></Nav.Item>
    <Nav.Item><Link to="/roles"           className="nav-link">Roles</Link></Nav.Item>
    <Nav.Item><Link to="/usuarios"        className="nav-link">Usuarios</Link></Nav.Item>
    <Nav.Item><button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button></Nav.Item>
  </>
);

/* ───── NEGOCIO ───── */
const SidebarNegocio = ({ logout }) => (
  <>
    <Nav.Item><Link to="/dashboard/negocio" className="nav-link">Dashboard</Link></Nav.Item>
    {/* Ruta al listado de aprobaciones */}
    <Nav.Item><Link to="/aprobaciones"       className="nav-link">Aprobaciones</Link></Nav.Item>
    <Nav.Item><Link to="/suscripciones"      className="nav-link">Suscripciones</Link></Nav.Item>
    <Nav.Item><Link to="/pagos"              className="nav-link">Pagos</Link></Nav.Item>
    <Nav.Item><button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button></Nav.Item>
  </>
);

/* ───── VENTAS ───── */
const SidebarVentas = ({ logout }) => (
  <>
    <Nav.Item><Link to="/dashboard/ventas"  className="nav-link">Dashboard</Link></Nav.Item>
    <Nav.Item><Link to="/profesionales/new" className="nav-link">Alta Profesionales</Link></Nav.Item>
    <Nav.Item><Link to="/kpi"               className="nav-link">KPIs</Link></Nav.Item>
    <Nav.Item><button onClick={logout} className="nav-link btn btn-link">Cerrar Sesión</button></Nav.Item>
  </>
);

/* ─────────────────────────  Topbar principal  ───────────────────────── */

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);

  const renderSidebar = () => {
    if (!user) return <SidebarGuest />;

    // Normalizamos el nombre del rol
    const rol = (user.rol || "").toString().trim().toLowerCase();

    if (rol === "sistema" || rol === "superadmin") return <SidebarSuper  logout={logout} />;
    if (rol === "negocio")                         return <SidebarNegocio logout={logout} />;
    if (rol === "ventas")                          return <SidebarVentas  logout={logout} />;

    return <SidebarGuest />;
  };

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
              {renderSidebar()}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
