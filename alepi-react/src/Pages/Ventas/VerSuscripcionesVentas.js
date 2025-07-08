import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function VerSuscripcionesVentas() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('Ventas_VerSuscripciones.php')
      .then(res => setSubs(res.data))
      .finally(()=>setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container py-4">
      <h2>Suscripciones</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th><th>Profesional</th><th>Inicio</th><th>Fin</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s,i)=>(
            <tr key={s.ID_Suscripcion}>
              <td>{i+1}</td>
              <td>{s.Profesional}</td>
              <td>{s.FechaInicio}</td>
              <td>{s.FechaFin}</td>
              <td>{s.Estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
