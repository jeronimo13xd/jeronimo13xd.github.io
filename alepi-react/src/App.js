import React                    from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RutaProtegida            from './Components/RutaProtegida';
import { useAuth }              from './Components/AuthContext';

/* ----------  layout / genéricos  ---------- */
import TopSidebar   from './Components/TopSidebar';
import Footer       from './Components/Footer';
import Login        from './Components/Login';

/* ----------  páginas “utilitarias”  ---------- */
import SinAcceso    from './Pages/SinAcceso';
import NotFound     from './Pages/NotFound';

/* ----------  páginas de usuario  ---------- */
import Perfil       from './Pages/Perfil';

/* ----------  páginas de super-admin  ---------- */
import AdminRoles           from './Pages/AdminRoles';
import SupAdSis_Dashboard   from './Pages/SupAdSis_Dashboard';
import SuAd_Usuarios        from './Pages/SuAd_Usuarios';

/* ----------  páginas NEGOCIO  ---------- */
import DashboardNegocio     from './Pages/Negocio/DashboardNegocio';
import Aprobaciones         from './Pages/Negocio/Aprobaciones';
import Suscripciones from './Pages/Negocio/Suscripciones';
import Pagos from './Pages/Negocio/Pagos';

/* ----------  páginas VENTAS  ---------- */
import DashboardVentas      from './Pages/Ventas/DashboardVentas';

function App() {
  const { user } = useAuth();

  return (
    <>
      <TopSidebar />

      {/* ----------  CONTENIDO PRINCIPAL  ---------- */}
      <div className="main-content px-3">
        <Routes>

          {/* ───── RUTAS PÚBLICAS ───── */}
          <Route
            path="/login"
            element={
              user
                ? <Navigate to="/dashboard/super" replace />
                : <Login />
            }
          />
          <Route path="/sin-acceso" element={<SinAcceso />} />

          {/* ───── RUTAS PROTEGIDAS ───── */}
          {/* Perfil: cualquier usuario autenticado */}
          <Route
            path="/perfil"
            element={
              <RutaProtegida permisoRequerido={null}>
                <Perfil />
              </RutaProtegida>
            }
          />

          {/* ----- Super-admin ----- */}
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

          {/* ───── CATCH-ALL 404 ───── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
