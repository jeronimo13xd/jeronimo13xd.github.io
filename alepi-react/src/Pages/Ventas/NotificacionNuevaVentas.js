import { useState, useEffect } from "react";
import axios                from "axios";

export default function NotificacionNuevaVentas() {
  /* ---- estado formulario ---- */
  const [idUsuario, setIdUsuario] = useState(null);
  const [nombreSel, setNombreSel] = useState("");
  const [titulo,    setTitulo]    = useState("");
  const [mensaje,   setMensaje]   = useState("");

  /* ---- autocomplete ---- */
  const [q, setQ] = useState("");
  const [sugs,setSugs]=useState([]);

  useEffect(() => {
    if(q.length < 2){ setSugs([]); return; }
    const cancel = new AbortController();
    axios.get("Ventas_BuscarProfesionales.php",
              { params:{q}, signal:cancel.signal, withCredentials:true })
         .then(r=>setSugs(r.data || []))
         .catch(()=>{});
    return () => cancel.abort();
  }, [q]);

  const elegir = (u) => {
    setIdUsuario(u.ID_Usuario);
    setNombreSel(u.Nombre);
    setQ("");
    setSugs([]);
  };

  const reset = () => {
    setIdUsuario(null); setNombreSel(""); setTitulo(""); setMensaje("");
  };

  /* ---- enviar ---- */
  const enviar = (e) => {
    e.preventDefault();
    if(!titulo || !mensaje){ alert("Título y mensaje son obligatorios"); return; }
    axios.post("Ventas_CrearNotificacion.php",
       { idUsuario, titulo, mensaje },
       { withCredentials:true })
       .then(()=>{ alert("Notificación enviada"); reset(); })
       .catch(()=>alert("Error al enviar"));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Nueva notificación</h2>

      <form className="card card-body" onSubmit={enviar}>

        {/* destinatario */}
        <div className="mb-3">
          <label className="form-label">Destinatario</label>

          {/* Toggle broadcast */}
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox"
              id="chkAll" checked={idUsuario===null}
              onChange={e=>{
                if(e.target.checked){ setIdUsuario(null); setNombreSel(""); }
              }} />
            <label className="form-check-label" htmlFor="chkAll">
              Todos los profesionales
            </label>
          </div>

          {/* Auto-complete, solo si NO es broadcast */}
          {idUsuario!==null && (
            <>
              <input className="form-control"
                placeholder="Buscar nombre…"
                value={q}
                onChange={e=>setQ(e.target.value)} />

              {sugs.length>0 && (
                <ul className="list-group position-absolute" style={{zIndex:5,maxHeight:150,overflowY:"auto"}}>
                  {sugs.map(u=>(
                    <li key={u.ID_Usuario}
                        className="list-group-item list-group-item-action"
                        onClick={()=>elegir(u)}>
                      {u.Nombre}
                    </li>
                  ))}
                </ul>
              )}

              {nombreSel && (
                <div className="mt-2">
                  <span className="badge bg-info text-dark">{nombreSel}</span>
                  <button type="button" className="btn-close ms-2"
                          aria-label="remove"
                          onClick={()=>{ setIdUsuario(0); setNombreSel(""); }}/>
                </div>
              )}
            </>
          )}
        </div>

        {/* título */}
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control"
                 value={titulo}
                 onChange={e=>setTitulo(e.target.value)} />
        </div>

        {/* mensaje */}
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows="4"
                    value={mensaje}
                    onChange={e=>setMensaje(e.target.value)} />
        </div>

        <button className="btn btn-primary">Enviar notificación</button>
      </form>
    </div>
  );
}
