// Pages/negocio/UsuariosLectores.jsx
import React,{useEffect,useState} from 'react';
import api from '../../utils/apiNegocio';

export default function UsuariosLectores(){
  const [rows,setRows]=useState([]);
  useEffect(()=>{ api.get('lectores.php').then(r=>setRows(r.data)); },[]);

  return(
    <div className="container py-3">
      <h2>Usuarios Lectores</h2>
      <table className="table table-striped">
        <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Registrado</th></tr></thead>
        <tbody>
        {rows.map(u=>
          <tr key={u.id}>
            <td>{u.id}</td><td>{u.nombre}</td><td>{u.email}</td><td>{u.fecha}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
