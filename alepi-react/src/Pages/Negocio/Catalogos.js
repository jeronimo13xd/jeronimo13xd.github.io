// Pages/negocio/Catalogos.jsx
import React,{useState,useEffect} from 'react';
import api from '../../utils/apiNegocio';

export default function Catalogos(){
  const [tab,setTab]=useState('profesiones');
  const [list,setList]=useState([]);
  const [value,setValue]=useState('');

  const load =()=> api.get(`${tab}/read.php`).then(r=>setList(r.data));
  useEffect(load,[tab]);

  const add = e=>{
    e.preventDefault();
    api.post(`${tab}/create.php`,{nombre:value}).then(()=>{setValue('');load();});
  };
  const del = id=> api.post(`${tab}/delete.php`,{id}).then(load);

  return(
    <div className="container py-3">
      <h2>Catálogos</h2>

      <ul className="nav nav-tabs mb-3">
        {['profesiones','especialidades','idiomas'].map(t=>
          <li key={t} className="nav-item">
            <button className={`nav-link ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          </li>)}
      </ul>

      <form className="d-flex mb-2" onSubmit={add}>
        <input className="form-control me-2" value={value} onChange={e=>setValue(e.target.value)} placeholder="Nuevo nombre" required/>
        <button className="btn btn-success">Agregar</button>
      </form>

      <ul className="list-group">
        {list.map(i=>
          <li key={i.id} className="list-group-item d-flex justify-content-between">
            {i.nombre}
            <button className="btn btn-sm btn-danger" onClick={()=>del(i.id)}>✕</button>
          </li>)}
      </ul>
    </div>
  );
}
