import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";

axios.defaults.baseURL       = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function Suscripciones() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  /* ─── carga inicial ─── */
  useEffect(() => {
    axios
      .get("Negocio_GetSubsActivas.php")   // ⬅️  PHP que ya creaste
      .then(r => {
        setRows(r.data.data ?? []);        // { status:'ok', data:[…] }
        setLoading(false);
      })
      .catch(e => {
        setError("No se pudieron cargar las suscripciones");
        console.error(e);
        setLoading(false);
      });
  }, []);

  /* ─── UI ─── */
  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Suscripciones activas</h2>

      {rows.length === 0 ? (
        <Alert variant="info">No hay suscripciones activas.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID sub</th>
              <th>ID usuario</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(s => (
              <tr key={s.ID_Suscripcion}>
                <td>{s.ID_Suscripcion}</td>
                <td>{s.ID_Usuario}</td>
                <td>{s.FechaInicio}</td>
                <td>{s.FechaFin}</td>
                <td>{s.Estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
