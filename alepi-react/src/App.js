import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthProvider, { AuthContext } from './Components/AuthContext';
import { UserProvider } from './Pages/ContextoUsuario';

import Topbar        from './Components/TopSidebar';
import Footer        from './Components/Footer';
import RutaProtegida from './Components/RutaProtegida';

/*  Páginas  */
import Login           from './Components/Login';
import Acerca          from './Components/Acerca';
import AvisoPriv       from './Components/AvisoPriv';
import PregFrec        from './Components/PregFrec';
import Videos          from './Components/Videos';
import Articulos       from './Components/Articulos';
import Info            from './Components/Info';
import Principal       from './Components/Principal';
import Suscripcion     from './Pages/Suscripcion';
import Perfil          from './Pages/Perfil';
import Notificaciones  from './Pages/Notificaciones';
import ArticulosU      from './Pages/ArticulosU';
import ConfiguracionU  from './Pages/ConfiguracionU';
import VideosU         from './Pages/VideosU';
import Directorio      from './Pages/Directorio';
import SinAcceso       from './Pages/SinAcceso';

import './App.css';

/* ───────────────────────────────────────────────────── */

const AppContent = () => {
  const { user } = useContext(AuthContext);   // se mantiene por si lo necesitas

  return (
    <div className="app-wrapper">
      {/* Menú superior y off-canvas azul */}
      <Topbar />

      {/*  Rutas  */}
      <div className="main-content px-3">
        <Routes>
          {/* Públicas */}
          <Route path="/"            element={<Principal />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/Acerca"      element={<Acerca />} />
          <Route path="/AvisoPriv"   element={<AvisoPriv />} />
          <Route path="/PregFrec"    element={<PregFrec />} />
          <Route path="/Videos"      element={<Videos />} />
          <Route path="/Articulos"   element={<Articulos />} />
          <Route path="/Info"        element={<Info />} />
          <Route path="/Suscripcion" element={<Suscripcion />} />
          <Route path="/SinAcceso"   element={<SinAcceso />} />

          {/* Protegidas */}
          <Route path="/Perfil" element={
            <RutaProtegida permisoRequerido="usuarios:read">
              <Perfil />
            </RutaProtegida>
          }/>

          <Route path="/Notificaciones" element={
            <RutaProtegida permisoRequerido="notificaciones:create">
              <Notificaciones />
            </RutaProtegida>
          }/>

          <Route path="/ArticulosU" element={
            <RutaProtegida permisoRequerido="articulos:read">
              <ArticulosU />
            </RutaProtegida>
          }/>

          <Route path="/VideosU" element={
            <RutaProtegida permisoRequerido="videos:read">
              <VideosU />
            </RutaProtegida>
          }/>

          <Route path="/ConfiguracionU" element={
            <RutaProtegida permisoRequerido="configuracion:update">
              <ConfiguracionU />
            </RutaProtegida>
          }/>

          <Route path="/Directorio" element={
            <RutaProtegida permisoRequerido="usuarios:read">
              <Directorio />
            </RutaProtegida>
          }/>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

/* ───────────────────────────────────────────────────── */

const App = () => (
  <Router>
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  </Router>
);

export default App;
