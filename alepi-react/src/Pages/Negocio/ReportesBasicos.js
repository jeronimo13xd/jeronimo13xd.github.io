// Pages/negocio/ReportesBasicos.jsx
import React,{useEffect,useState} from 'react';
import api from '../../utils/apiNegocio';

export default function ReportesBasicos(){
  const [rep,setRep]=useState([]);

  useEffect(()=>{ api.get('reportes.php').then(r=>setRep(r.data)); },[]);

  return(
    <div className="container py-3">
      <h2>Reportes Básicos</h2>
      <table className="table">
        <thead><tr><th>Métrica</th><th>Valor</th></tr></thead>
        <tbody>
        {rep.map(r=><tr key={r.nombre}><td>{r.nombre}</td><td>{r.valor}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
