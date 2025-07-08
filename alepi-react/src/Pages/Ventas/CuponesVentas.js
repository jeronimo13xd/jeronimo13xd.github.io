import { useEffect, useState } from "react";
import axios            from "axios";
import { useAuth }      from "../../Components/AuthContext";

export default function CuponesVentas() {
  const { user } = useAuth();
  const puedeCrear  = user?.permisos?.includes("cupones:create");
  const puedeEditar = user?.permisos?.includes("cupones:update");

  const [cupones, setCupones] = useState([]);
  const [filtro,  setFiltro]  = useState("");
  const [form, setForm] = useState({
    ID_Cupon:null, Codigo:"", Descuento:10, Vigencia:"", Activo:1
  });

  const cargar = () =>
    axios.get("Ventas_VerCupones.php",{withCredentials:true})
         .then(r=>setCupones(r.data||[]));

  /* ⚠️ Ajuste wrapper */
  useEffect(() => { cargar(); }, []);

  const reset = () =>
    setForm({ID_Cupon:null,Codigo:"",Descuento:10,Vigencia:"",Activo:1});

  const guardar = e => {
    e.preventDefault();
    axios.post("Ventas_GuardarCupon.php", form, {withCredentials:true})
         .then(() => { reset(); cargar(); })
         .catch(err => alert(err.response?.data?.error || "Error"));
  };

  const borrar = id => {
    if(!window.confirm("¿Eliminar cupón?")) return;
    axios.post("Ventas_BorrarCupon.php", {id}, {withCredentials:true})
         .then(cargar);
  };

  const lista = cupones.filter(c =>
    c.Codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-3">Cupones</h2>

      <input className="form-control mb-3"
             placeholder="Buscar por código…"
             value={filtro}
             onChange={e=>setFiltro(e.target.value)} />

      {puedeCrear && (
        <form className="row g-2 mb-4" onSubmit={guardar}>
          <div className="col-md-3">
            <input required className="form-control text-uppercase"
              value={form.Codigo}
              placeholder="CÓDIGO"
              onChange={e=>setForm({...form,Codigo:e.target.value.toUpperCase()})}/>
          </div>
          <div className="col-md-2">
            <input required type="number" min={1} max={100}
              className="form-control" value={form.Descuento}
              onChange={e=>setForm({...form,Descuento:e.target.value})}/>
          </div>
          <div className="col-md-3">
            <input required type="date" className="form-control"
              value={form.Vigencia}
              onChange={e=>setForm({...form,Vigencia:e.target.value})}/>
          </div>
          <div className="col-md-2">
            <select className="form-select"
              value={form.Activo}
              onChange={e=>setForm({...form,Activo:e.target.value})}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {form.ID_Cupon? "Actualizar":"Crear"}
            </button>
          </div>
        </form>
      )}

      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th>ID</th><th>Código</th><th>%</th><th>Vigencia</th><th>Activo</th>
            {puedeEditar && <th></th>}
          </tr>
        </thead>
        <tbody>
          {lista.map(c=>(
            <tr key={c.ID_Cupon}>
              <td>{c.ID_Cupon}</td>
              <td>{c.Codigo}</td>
              <td>{c.Descuento}</td>
              <td>{c.Vigencia}</td>
              <td>{c.Activo? "✔":"✖"}</td>
              {puedeEditar && (
                <td>
                  <button className="btn btn-sm btn-outline-secondary me-1"
                    onClick={()=>setForm({...c})}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger"
                    onClick={()=>borrar(c.ID_Cupon)}>X</button>
                </td>
              )}
            </tr>
          ))}
          {!lista.length && (
            <tr><td colSpan={puedeEditar?6:5} className="text-center">
              Sin cupones
            </td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
