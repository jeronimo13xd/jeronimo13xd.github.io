import { useState } from "react";
import dayjs         from "dayjs";               // (ya incluido en CRA)

export default function ReportesVentas() {
  const hoy   = dayjs().format("YYYY-MM-DD");
  const inicioMes = dayjs().startOf("month").format("YYYY-MM-DD");

  const [tipo,  setTipo]  = useState("ingresos");
  const [desde, setDesde] = useState(inicioMes);
  const [hasta, setHasta] = useState(hoy);

  const descargar = () => {
    const params = new URLSearchParams({ tipo, desde, hasta }).toString();
    window.open(`http://localhost/alepirea/Ventas_GenerarReporte.php?${params}`,
                "_blank");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Reportes</h2>

      {/* Filtros */}
      <div className="row g-3 align-items-end mb-4">
        <div className="col-md-3">
          <label className="form-label">Tipo de reporte</label>
          <select className="form-select" value={tipo}
                  onChange={e=>setTipo(e.target.value)}>
            <option value="ingresos">Ingresos confirmados</option>
            <option value="morosos">Profesionales morosos</option>
            <option value="metricas">Métricas (KPI)</option>
          </select>
        </div>

        {tipo !== "morosos" && (
          <>
            <div className="col-md-3">
              <label className="form-label">Desde</label>
              <input type="date" className="form-control"
                     value={desde}
                     onChange={e=>setDesde(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Hasta</label>
              <input type="date" className="form-control"
                     value={hasta}
                     onChange={e=>setHasta(e.target.value)} />
            </div>
          </>
        )}

        <div className="col-md-3 d-grid">
          <button className="btn btn-success" onClick={descargar}>
            Descargar CSV
          </button>
        </div>
      </div>

      <p className="text-muted">
        El archivo se descargará en una nueva pestaña. ¡Abrelo con Excel o Google Sheets!
      </p>
    </div>
  );
}
