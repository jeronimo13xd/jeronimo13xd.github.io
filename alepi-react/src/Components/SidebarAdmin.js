import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './AppSidebar.css';   // debe apuntar a este archivo


const menuConfig = [
  { label:'Dashboard',           to:'/dashboard',     permiso:'reportes:read' },
  { label:'Usuarios',            to:'/usuarios',      permiso:'usuarios:read' },
  { label:'Profesionales',       to:'/profesionales', permiso:'profesionales:read' },
  { label:'Artículos',           to:'/articulos',     permiso:'articulos:read' },
  { label:'Videos',              to:'/videos',        permiso:'videos:read' },
  { label:'Suscripciones',       to:'/suscripciones', permiso:'suscripciones:read' },
  { label:'Pagos & Facturas',    to:'/pagos',         permiso:'pagos:read' },
  { label:'Cupones',             to:'/cupones',       permiso:'cupones:read' },
  { label:'Configuración',       to:'/config',        permiso:'configuracion:update' }
];

export default function SidebarAdmin(){
  const { user } = useContext(AuthContext);
  if (!user || !user.permisos) return null;

  return (
    <aside className="sidebar bg-light p-3">
      <ul className="list-unstyled">
        {menuConfig.map(item => (
          user.permisos.includes(item.permiso) && (
            <li key={item.to} className="mb-2">
              <NavLink to={item.to} className="text-decoration-none">
                {item.label}
              </NavLink>
            </li>
          )
        ))}
      </ul>
    </aside>
  );
}
