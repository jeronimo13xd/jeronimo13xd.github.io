import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './Components/AuthContext'; // Proveedor de autenticación
import { UserProvider } from './Pages/ContextoUsuario'; // Proveedor de usuario
import Topbar from './Components/TopSidebar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Acerca from './Components/Acerca';
import AvisoPriv from './Components/AvisoPriv';
import PregFrec from './Components/PregFrec';
import Videos from './Components/Videos';
import Articulos from './Components/Articulos';
import Info from './Components/Info';
import Principal from './Components/Principal';
import Suscripcion from './Pages/Suscripcion';
import Perfil from './Pages/Perfil';
import Notificaciones from './Pages/Notificaciones';
import ArticulosU from './Pages/ArticulosU';
import ConfiguracionU from './Pages/ConfiguracionU';
import './App.css';
import VideosU from './Pages/VideosU';
import Directorio from './Pages/Directorio';

const App = () => {
  return (
    <Router>
      <AuthProvider>  {/* Mueve AuthProvider dentro de Router */}
        <UserProvider>
          <div className="App">
            <Topbar />
            <Routes>
              <Route path="/" element={<Principal />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Acerca" element={<Acerca />} />
              <Route path="/AvisoPriv" element={<AvisoPriv />} />
              <Route path="/PregFrec" element={<PregFrec />} />
              <Route path="/Videos" element={<Videos />} />
              <Route path="/Articulos" element={<Articulos />} />
              <Route path="/Info" element={<Info />} />
              <Route path="/Suscripcion" element={<Suscripcion />} />
              <Route path="/Perfil" element={<Perfil />} />
              <Route path="/Notificaciones" element={<Notificaciones />} />
              <Route path="/ArticulosU" element={<ArticulosU />} />
              <Route path="/VideosU" element={<VideosU />} />
              <Route path="/ConfiguracionU" element={<ConfiguracionU />} />
              <Route path="/Directorio" element={<Directorio />} />
            </Routes>
            <Footer />
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
