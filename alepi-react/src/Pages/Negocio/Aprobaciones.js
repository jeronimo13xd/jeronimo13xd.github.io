// src/Pages/Negocio/Aprobaciones.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function Aprobaciones() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  /* ─── carga inicial ─── */
  useEffect(fetchPendientes, []);

  function fetchPendientes() {
    setLoading(true);
    axios
      .get("Negocio_GetPendientes.php")     // ✅ nombre correcto
      .then(r => {
        setRows(r.data.data ?? []);
        setLoading(false);
      })
      .catch(e => {
        setError("No se pudieron cargar los pendientes");
        console.error(e);
        setLoading(false);
      });
  }

  function aprobar(id) {
    axios
      .post("Negocio_AprobarContenido.php", { id }) // ✅ nombre correcto
      .then(fetchPendientes)
      .catch(e => alert("Error al aprobar: " + e.message));
  }

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
      <h2 className="mb-4">Aprobaciones de Contenido</h2>

      {rows.length === 0 ? (
        <Alert variant="success">No hay pendientes 🎉</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(r => (
              <tr key={r.ID_Contenido}>
                <td>{r.ID_Contenido}</td>
                <td>{r.Titulo}</td>
                <td>{r.Descripcion}</td>
                <td>{r.Estado}</td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => aprobar(r.ID_Contenido)}
                  >
                    Aprobar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
