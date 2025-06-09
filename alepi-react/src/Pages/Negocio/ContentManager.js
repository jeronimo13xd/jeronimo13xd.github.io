// Pages/negocio/ContentManager.jsx
import React, { useEffect, useState } from 'react';
import api from '../../utils/apiNegocio';

export default function ContentManager(){
  const [tab,setTab]       = useState('articulos');
  const [data,setData]     = useState([]);
  const [form,setForm]     = useState(null);

  const load =()=> api.get(`${tab}/read.php`).then(r=>setData(r.data));

  useEffect(load,[tab]);

  const save = e=>{
    e.preventDefault();
    const fileInput = document.querySelector('#file');   // para videos ó imágenes
    const fd = new FormData(e.target);
    if(fileInput?.files[0]) fd.append('file',fileInput.files[0]);

    api.post(`${tab}/save.php`, fd).then(()=>{ setForm(null); load(); });
  };

  const remove = id=>{
    if(window.confirm('¿Borrar?'))
      api.post(`${tab}/delete.php`,{id}).then(load);
  };

  return(
    <div className="container py-3">
      <h2>Gestor de Contenido</h2>

      <ul className="nav nav-tabs mb-3">
        {['articulos','videos','faqs','landing'].map(t=>
          <li className="nav-item" key={t}>
            <button className={`nav-link ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          </li>)}
      </ul>

      <button className="btn btn-success mb-2" onClick={()=>setForm({})}>+ Nuevo</button>

      {/* Tabla */}
      <table className="table table-striped">
        <thead><tr><th>#</th><th>Título</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {data.map(r=>
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.titulo}</td><td>{r.estado}</td>
              <td>
                <button className="btn btn-sm btn-primary me-1" onClick={()=>setForm(r)}>Editar</button>
                <button className="btn btn-sm btn-danger"       onClick={()=>remove(r.id)}>Borrar</button>
              </td>
            </tr>)}
        </tbody>
      </table>

      {/* Modal simple */}
      {form!==null &&
        <div className="modal d-block" tabIndex="-1" style={{background:'#0006'}}>
          <div className="modal-dialog modal-lg">
            <form className="modal-content" onSubmit={save}>
              <div className="modal-header">
                <h5 className="modal-title">{form.id?'Editar':'Nuevo'} {tab}</h5>
                <button type="button" className="btn-close" onClick={()=>setForm(null)}></button>
              </div>
              <div className="modal-body">
                <input name="id" hidden defaultValue={form.id||''}/>
                <div className="mb-2">
                  <label className="form-label">Título</label>
                  <input name="titulo" defaultValue={form.titulo||''} className="form-control" required/>
                </div>
                <div className="mb-2">
                  <label className="form-label">Contenido</label>
                  <textarea name="contenido" defaultValue={form.contenido||''} rows="6" className="form-control" required/>
                </div>
                {(tab==='videos'||tab==='landing')&&
                  <div className="mb-2">
                    <label className="form-label">Archivo</label>
                    <input type="file"    name="file" id="file" className="form-control"/>
                  </div>}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>}
    </div>
  );
}
