// Pages/negocio/Notificaciones.jsx
import React,{useState} from 'react';
import api from '../../utils/apiNegocio';

export default function Notificaciones(){
  const [msg,setMsg]=useState('');
  const [ok,setOk]  =useState(false);

  const send = e=>{
    e.preventDefault();
    api.post('notify.php',{mensaje:msg}).then(()=>{setOk(true);setMsg('');});
  };

  return(
    <div className="container py-3">
      <h2>Notificaciones</h2>
      {ok && <div className="alert alert-success">Enviado ✅</div>}
      <form onSubmit={send}>
        <textarea className="form-control mb-2" rows="4" required
          value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Mensaje a todos…"/>
        <button className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}
