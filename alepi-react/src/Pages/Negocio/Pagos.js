// src/Pages/Negocio/Pagos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function Pagos() {

  const [rows, setRows]   = useState([]);
  const [loading, setL]   = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {                       // ← carga inicial
    axios.get("Negocio_GetPagos.php")     // <<< NOMBRE EXACTO DEL PHP
      .then(r => { setRows(r.data.data ?? []); setL(false); })
      .catch(err => { console.error(err); setError("No se pudieron cargar los pagos"); setL(false); });
  }, []);

  if (loading)
    return <div className="text-center my-5"><Spinner animation="border" /></div>;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Pagos</h2>

      {rows.length === 0 ? (
        <Alert variant="secondary">No hay pagos registrados.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th><th>Usuario</th><th>Monto</th>
              <th>Fecha</th><th>Método</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.ID_Pago}>
                <td>{p.ID_Pago}</td>
                <td>{p.ID_Usuario}</td>
                <td>${p.Monto}</td>
                <td>{p.FechaPago}</td>
                <td>{p.Metodo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
