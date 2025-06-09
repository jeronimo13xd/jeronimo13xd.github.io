// src/Components/SidebarAdmin.js
import { NavLink }      from 'react-router-dom';
import { useContext }   from 'react';
import { AuthContext }  from './AuthContext';
import './AppSidebar.css';      // deja tu mismo css

/* ───── Menús mínimos por rol ───── */
const MENUS = {
  sistema: [
    { label:'Dashboard', to:'/dashboard/super', permiso:'dashboard:read' },
    { label:'Roles',     to:'/roles',           permiso:'roles:read'     },
    { label:'Usuarios',  to:'/usuarios',        permiso:'usuarios:read' }
  ],

  negocio: [
    { label:'Dashboard',      to:'/dashboard/negocio',  permiso:'dashboard:read'              },
    { label:'Aprobaciones',   to:'/contenido/pending',  permiso:'contenido:approve'          },
    { label:'Suscripciones',  to:'/suscripciones',      permiso:'suscripciones:read'         },
    { label:'Pagos',          to:'/pagos',              permiso:'pagos:read'                 }
  ],

  ventas: [
    { label:'Dashboard',     to:'/dashboard/ventas',   permiso:'dashboard:read'         },
    { label:'Alta Profes.',  to:'/profesionales/new',  permiso:'profesionales:create'   },
    { label:'KPIs',          to:'/kpi',                permiso:'reportes:read'          }
  ]
};

export default function SidebarAdmin(){
  const { user } = useContext(AuthContext);
  if (!user) return null;

  // “rol” viene de backend en minúsculas (“sistema”, “negocio”…)
  const items = MENUS[user.rol] ?? [];

  return (
    <aside className="sidebar bg-light p-3">
      <ul className="list-unstyled m-0">
        {items.map(i => (
          user.permisos.includes(i.permiso) && (
            <li key={i.to} className="mb-2">
              <NavLink to={i.to} className="text-decoration-none">
                {i.label}
              </NavLink>
            </li>
          )
        ))}
      </ul>
    </aside>
  );
}
