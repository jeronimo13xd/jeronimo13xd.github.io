// Pages/negocio/ProfesionalesNegocio.jsx
import React,{useEffect,useState} from 'react';
import api from '../../utils/apiNegocio';

export default function ProfesionalesNegocio(){
  const [rows,setRows]=useState([]);

  const load =()=> api.get('profesionales/read.php').then(r=>setRows(r.data));
  useEffect(load,[]);

  const toggle = (id,estado)=> api.post('profesionales/toggle.php',{id,estado}).then(load);

  return(
    <div className="container py-3">
      <h2>Profesionales</h2>
      <table className="table table-hover">
        <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Estado</th><th></th></tr></thead>
        <tbody>
        {rows.map(p=>
          <tr key={p.id}>
            <td>{p.id}</td><td>{p.nombre}</td><td>{p.email}</td><td>{p.estado}</td>
            <td>
              <button className="btn btn-sm btn-warning"
                onClick={()=>toggle(p.id, p.estado==='activo'?'suspendido':'activo')}>
                {p.estado==='activo'?'Suspender':'Activar'}
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
