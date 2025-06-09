// src/Pages/Negocio/DashboardNegocio.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Spinner } from "react-bootstrap";

// ← la raíz donde están los PHP
axios.defaults.baseURL = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function DashboardNegocio() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("Negocio_GetProfesionalesActivos.php"),
      axios.get("Negocio_GetContenidoPendiente.php"),
      axios.get("Negocio_GetSubsActivas.php"),
      axios.get("Negocio_GetIngresosMes.php")
    ])
      .then(([p, c, s, i]) => {
        setStats({
          profesionales : p.data?.total ?? 0,
          pendientes    : c.data?.total ?? 0,
          suscripciones : s.data?.total ?? 0,
          ingresos      : i.data?.total ?? 0
        });
      })
      .catch(err => {
        console.error("DashboardNegocio →", err);
        // evitamos spinner infinito
        setStats({
          profesionales : 0,
          pendientes    : 0,
          suscripciones : 0,
          ingresos      : 0
        });
      });
  }, []);

  if (!stats) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Dashboard Administradora del Negocio</h2>
      <Row className="gy-3">
        <InfoCard title="Profesionales activos"   value={stats.profesionales} />
        <InfoCard title="Aprobaciones pendientes" value={stats.pendientes} />
        <InfoCard title="Suscripciones activas"   value={stats.suscripciones} />
        <InfoCard title="Ingresos del mes"        value={`$${stats.ingresos}`} />
      </Row>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <Col xs={12} md={3}>
      <Card className="shadow-sm h-100">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <h6 className="text-uppercase mb-1">{title}</h6>
          <h2>{value}</h2>
        </Card.Body>
      </Card>
    </Col>
  );
}
