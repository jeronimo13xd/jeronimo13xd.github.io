/* ─────────  src/App.js  ───────── */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RutaProtegida from './Components/RutaProtegida';
import { useAuth } from './Components/AuthContext';

/* ----------  layout / genéricos  ---------- */
import TopSidebar from './Components/TopSidebar';
import Footer     from './Components/Footer';
import Login      from './Components/Login';

/* ----------  páginas utilitarias ---------- */
import SinAcceso from './Pages/SinAcceso';
import NotFound  from './Pages/NotFound';

/* ----------  PÁGINAS PÚBLICAS ---------- */
import Home        from './Components/Principal';
import Directorio  from './Pages/Directorio';
import Articulos   from './Components/Articulos';
import Videos      from './Components/Videos';
import PregFrec    from './Components/PregFrec';
import Suscripcion from './Pages/Suscripcion';
import Info        from './Components/Info';

/* ----------  PROFESIONAL / CLIENTE ---------- */
import Notificaciones from './Pages/Notificaciones';
import ArticulosU     from './Pages/ArticulosU';
import VideosU        from './Pages/VideosU';
import ConfiguracionU from './Pages/ConfiguracionU';

/* ----------  Páginas autenticadas genéricas ---------- */
import Perfil from './Pages/Perfil';

/* ----------  super-admin ---------- */
import AdminRoles         from './Pages/AdminRoles';
import SupAdSis_Dashboard from './Pages/SupAdSis_Dashboard';
import SuAd_Usuarios      from './Pages/SuAd_Usuarios';

/* ----------  negocio ---------- */
import DashboardNegocio from './Pages/Negocio/DashboardNegocio';
import Aprobaciones     from './Pages/Negocio/Aprobaciones';
import Suscripciones    from './Pages/Negocio/Suscripciones';
import Pagos            from './Pages/Negocio/Pagos';

/* ----------  ventas ---------- */
import DashboardVentas         from './Pages/Ventas/DashboardVentas';
import ListarUsuariosVentas    from './Pages/Ventas/ListarUsuariosVentas';
import AgregarUsuarioVentas    from './Pages/Ventas/AgregarUsuarioVentas';
import EditarUsuarioVentas     from './Pages/Ventas/EditarUsuarioVentas';
import CrearSuscripcionVentas  from './Pages/Ventas/CrearSuscripcionVentas';
import VerSuscripcionesVentas  from './Pages/Ventas/VerSuscripcionesVentas';
import PagosVentas             from './Pages/Ventas/PagosVentas';
import CuponesVentas           from './Pages/Ventas/CuponesVentas';
import ReportesVentas          from './Pages/Ventas/ReportesVentas';
import NotificacionNuevaVentas from './Pages/Ventas/NotificacionNuevaVentas';

function App() {
  const { user } = useAuth();

  return (
    <>
      <TopSidebar />

      <div className="main-content px-3">
        <Routes>

          {/* ----------  RUTAS PÚBLICAS  ---------- */}
          <Route path="/"            element={<Home />} />
          <Route path="/directorio"  element={<Directorio />} />
          <Route path="/articulos"   element={<Articulos />} />
          <Route path="/videos"      element={<Videos />} />
          <Route path="/pregfrec"    element={<PregFrec />} />
          <Route path="/suscripcion" element={<Suscripcion />} />
          <Route path="/info"        element={<Info />} />

          {/* ----------  LOGIN / ERROR ---------- */}
          <Route
            path="/login"
            element={ user ? <Navigate to="/dashboard/super" replace /> : <Login /> }
          />
          <Route path="/sin-acceso" element={<SinAcceso />} />

          {/* ----------  RUTAS PROTEGIDAS  ---------- */}

          {/* Perfil: cualquier usuario autenticado */}
          <Route
            path="/perfil"
            element={
              <RutaProtegida permisoRequerido={null}>
                <Perfil />
              </RutaProtegida>
            }
          />

          {/* ----- PROFESIONAL / CLIENTE ----- */}
          <Route
            path="/notificaciones"
            element={
              <RutaProtegida permisoRequerido={null}>
                <Notificaciones />
              </RutaProtegida>
            }
          />
          <Route
            path="/articulosu"
            element={
              <RutaProtegida permisoRequerido={null}>
                <ArticulosU />
              </RutaProtegida>
            }
          />
          <Route
            path="/videosu"
            element={
              <RutaProtegida permisoRequerido={null}>
                <VideosU />
              </RutaProtegida>
            }
          />
          <Route
            path="/configuracionu"
            element={
              <RutaProtegida permisoRequerido={null}>
                <ConfiguracionU />
              </RutaProtegida>
            }
          />

          {/* ----- SUPER-ADMIN ----- */}
          <Route
            path="/roles"
            element={
              <RutaProtegida permisoRequerido="roles:read">
                <AdminRoles />
              </RutaProtegida>
            }
          />
          <Route
            path="/dashboard/super"
            element={
              <RutaProtegida permisoRequerido="dashboard:read">
                <SupAdSis_Dashboard />
              </RutaProtegida>
            }
          />
          <Route
            path="/usuarios"
            element={
              <RutaProtegida permisoRequerido="usuarios:read">
                <SuAd_Usuarios />
              </RutaProtegida>
            }
          />

          {/* ----- NEGOCIO ----- */}
          <Route
            path="/dashboard/negocio"
            element={
              <RutaProtegida permisoRequerido="dashboardnegocio:read">
                <DashboardNegocio />
              </RutaProtegida>
            }
          />
          <Route
            path="/aprobaciones"
            element={
              <RutaProtegida permisoRequerido="aprobaciones:read">
                <Aprobaciones />
              </RutaProtegida>
            }
          />
          <Route
            path="/suscripciones"
            element={
              <RutaProtegida permisoRequerido="suscripciones:read">
                <Suscripciones />
              </RutaProtegida>
            }
          />
          <Route
            path="/pagos"
            element={
              <RutaProtegida permisoRequerido="pagos:read">
                <Pagos />
              </RutaProtegida>
            }
          />

          {/* ----- VENTAS ----- */}
          <Route
            path="/dashboard/ventas"
            element={
              <RutaProtegida permisoRequerido="dashboardventas:read">
                <DashboardVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/usuarios"
            element={
              <RutaProtegida permisoRequerido="ventas:read">
                <ListarUsuariosVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/usuarios/nuevo"
            element={
              <RutaProtegida permisoRequerido="ventas:create">
                <AgregarUsuarioVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/usuarios/:id/editar"
            element={
              <RutaProtegida permisoRequerido="ventas:update">
                <EditarUsuarioVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/suscripciones"
            element={
              <RutaProtegida permisoRequerido="ventas:read">
                <VerSuscripcionesVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/suscripciones/nuevo"
            element={
              <RutaProtegida permisoRequerido="ventas:create">
                <CrearSuscripcionVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/pagos"
            element={
              <RutaProtegida permisoRequerido="pagos:read">
                <PagosVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/cupones"
            element={
              <RutaProtegida permisoRequerido="cupones:read">
                <CuponesVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/reportes"
            element={
              <RutaProtegida permisoRequerido="reportes:read">
                <ReportesVentas />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas/notificacion/nueva"
            element={
              <RutaProtegida permisoRequerido="notificaciones:create">
                <NotificacionNuevaVentas />
              </RutaProtegida>
            }
          />

          {/* ----------  404 ---------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
