import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListarUsuariosVentas() {
  const [profs, setProfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('Ventas_GetUsuarios.php')
      .then(res => setProfs(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Profesionales registrados</h2>

      <Link className="btn btn-primary mb-3" to="/ventas/usuarios/nuevo">➕ Alta profesional</Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th><th>Nombre</th><th>Especialidad</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profs.map((p, i) => (
            <tr key={p.ID_Usuario}>
              <td>{i + 1}</td>
              <td>{p.Nombre}</td>
              <td>{p.Especialidad}</td>
              <td>{p.Estado}</td>
              <td>
                <Link className="btn btn-sm btn-warning me-2"
                      to={`/ventas/usuarios/${p.ID_Usuario}/editar`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
