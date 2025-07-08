import React, { useEffect, useState } from 'react';
import axios                        from 'axios';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import './DashboardNegocio.css';

/* ───────── helpers ───────── */
const money = (n) => `$${Number(n).toLocaleString('es-MX')}`;

/* ───────── componente ───────── */
export default function DashboardNegocio() {
  const [kpi, setKpi]   = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const { data } = await axios.get('Negocio_GetIngresosMes.php');
        if (isMounted && data) setKpi(data);
      } catch (e) {
        console.warn('Backend KPI offline, usando datos demo');
        if (isMounted) setKpi({
          activos      : 2,
          aprobPend    : 2,
          subsActivas  : 0,
          ingresosMes  : 5000
        });
      } finally { if (isMounted) setLoad(false); }
    })();

    return () => { isMounted = false; };
  }, []);

  /* spinner o valor */
  const V = (v) => load ? <Spinner animation="border" size="sm"/> : v;

  return (
    <div className="neg-dashboard container-fluid mt-4">
      <h2 className="mb-4 fw-bold text-center">
        Dashboard Administradora del Negocio
      </h2>

      <Row xs={1} md={2} xl={4} className="g-4">

        <Col>
          <Card className="kpi-card kpi-activos h-100 text-center">
            <Card.Body>
              <div className="kpi-title">Profesionales activos</div>
              <div className="kpi-value">{V(kpi?.activos)}</div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="kpi-card kpi-aprob h-100 text-center">
            <Card.Body>
              <div className="kpi-title">Aprobaciones pendientes</div>
              <div className="kpi-value">{V(kpi?.aprobPend)}</div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="kpi-card kpi-subs h-100 text-center">
            <Card.Body>
              <div className="kpi-title">Suscripciones activas</div>
              <div className="kpi-value">{V(kpi?.subsActivas)}</div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="kpi-card kpi-ingresos h-100 text-center">
            <Card.Body>
              <div className="kpi-title">Ingresos del mes</div>
              <div className="kpi-value">
                {V(kpi?.ingresosMes != null ? money(kpi.ingresosMes) : '-')}
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </div>
  );
}
