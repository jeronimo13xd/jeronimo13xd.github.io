import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';

export default function DashboardVentas() {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('Ventas_VerDashboard.php')
      .then(res => { setKpi(res.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard de Ventas</h2>
      <div className="row g-3">
        <Card className="col-md-3 text-center p-3">
          <Card.Body>
            <Card.Title>Profesionales activos</Card.Title>
            <h3>{kpi.activos}</h3>
          </Card.Body>
        </Card>
        <Card className="col-md-3 text-center p-3">
          <Card.Body>
            <Card.Title>Ingresos mes</Card.Title>
            <h3>${kpi.ingresosMes}</h3>
          </Card.Body>
        </Card>
        <Card className="col-md-3 text-center p-3">
          <Card.Body>
            <Card.Title>Suscripciones vigentes</Card.Title>
            <h3>{kpi.suscripciones}</h3>
          </Card.Body>
        </Card>
        <Card className="col-md-3 text-center p-3">
          <Card.Body>
            <Card.Title>Morosos &gt;5 días</Card.Title>
            <h3>{kpi.morosos}</h3>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
