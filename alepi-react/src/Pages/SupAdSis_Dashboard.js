// src/Pages/SupAdSis_Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

// Configuración global de axios para que apunte a tu carpeta PHP
axios.defaults.baseURL = 'http://localhost/alepirea/';
axios.defaults.withCredentials = true;

export default function SupAdSis_Dashboard() {
  // 1) Estado para estadísiticas y loading
  const [stats, setStats] = useState({
    usuarios: null,
    roles: null,
    subscripciones: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2) Al montar, hacemos las tres llamadas en paralelo
    //    - GetUsuariosLista.php: lista completa de usuarios
    //    - roles_get.php     : lista de todos los roles
    //    - getSubsNew.php    : total nuevas suscripciones (ejemplo)

    const pUsuarios       = axios.get('GetUsuariosLista.php');
    const pRoles          = axios.get('roles_get.php');
    const pSubscripciones = axios.get('getSubsNew.php');

    Promise.all([pUsuarios, pRoles, pSubscripciones])
      .then(([rUsuarios, rRoles, rSubs]) => {
        // 3) Contamos longitudes o tomamos propiedad numérica de cada respuesta.

        // Usuarios:
        const countUsuarios = Array.isArray(rUsuarios.data)
          ? rUsuarios.data.length
          : 0;

        // Roles:
        // roles_get.php devuelve un array de objetos { ID_Rol, NombreRol, permisos }
        const countRoles = Array.isArray(rRoles.data)
          ? rRoles.data.length
          : 0;

        // Subscripciones:
        // Supongamos que getSubsNew.php retorna algo como { total: 12, hoy: 3, ... }
        const countSubscripciones = (rSubs.data && typeof rSubs.data.total === 'number')
          ? rSubs.data.total
          : 0;

        // 4) Actualizamos el estado y desactivamos loading
        setStats({
          usuarios: countUsuarios,
          roles: countRoles,
          subscripciones: countSubscripciones
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener estadísticas:', err);
        setLoading(false);
      });
  }, []);

  // 5) Mientras carga, mostramos un spinner centrado verticalmente
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  // 6) Una vez cargados los datos, mostramos las tarjetas con los conteos
  return (
    <div className="container my-4">
      <h2 className="mb-4">Dashboard Super Admin</h2>

      <Row className="gy-3">
        {/* Total de Usuarios */}
        <Col xs={12} md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Total de Usuarios</Card.Title>
              <h1 style={{ fontSize: '3rem' }}>{stats.usuarios}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Total de Roles */}
        <Col xs={12} md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Total de Roles</Card.Title>
              <h1 style={{ fontSize: '3rem' }}>{stats.roles}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Subscripciones Nuevas */}
        <Col xs={12} md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Subscripciones Nuevas</Card.Title>
              <h1 style={{ fontSize: '3rem' }}>{stats.subscripciones}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
