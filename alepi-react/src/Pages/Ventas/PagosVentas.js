import { useEffect, useState } from "react";
import axios            from "axios";
import { useAuth }      from "../../Components/AuthContext";

export default function PagosVentas() {
  const { user } = useAuth();
  const puedeEditar = user?.permisos?.includes("pagos:update");

  const [pagos,  setPagos]  = useState([]);
  const [filtro, setFiltro] = useState("");

  const cargarPagos = () =>
    axios.get("Ventas_VerPagos.php", { withCredentials: true })
         .then(r => setPagos(r.data || []));

  /* ⚠️ Ajuste: usamos función wrapper para que el efecto NO devuelva la Promise */
  useEffect(() => { cargarPagos(); }, []);

  const cambiarEstado = (id, estado) => {
    if (!window.confirm(`¿Seguro de marcar ${estado} el pago ${id}?`)) return;
    axios.post("Ventas_ActualizarPago.php",
               { id, estado },
               { withCredentials: true })
         .then(cargarPagos);
  };

  const lista = pagos.filter(p =>
    p.Profesional.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-3">Pagos</h2>

      <input
        className="form-control mb-3"
        placeholder="Buscar profesional…"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th>ID</th><th>Profesional</th><th>Monto</th><th>Fecha</th>
            <th>Método</th><th>Estado</th>{puedeEditar && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {lista.map(p => (
            <tr key={p.ID_Pago}>
              <td>{p.ID_Pago}</td>
              <td>{p.Profesional}</td>
              <td>${Number(p.Monto).toFixed(2)}</td>
              <td>{p.FechaPago?.slice(0,10)}</td>
              <td>{p.Metodo}</td>
              <td>
                <span className={
                  p.Estado === "confirmado"
                    ? "badge bg-success"
                    : "badge bg-warning text-dark"
                }>
                  {p.Estado}
                </span>
              </td>
              {puedeEditar && (
                <td>
                  {p.Estado !== "confirmado" && (
                    <button
                      className="btn btn-sm btn-outline-success me-1"
                      onClick={() => cambiarEstado(p.ID_Pago,"confirmado")}
                    >
                      Confirmar
                    </button>
                  )}
                  {p.Estado !== "reembolsado" && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => cambiarEstado(p.ID_Pago,"reembolsado")}
                    >
                      Reembolsar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
          {!lista.length && (
            <tr><td colSpan={puedeEditar?7:6} className="text-center">
              Sin pagos registrados.
            </td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
