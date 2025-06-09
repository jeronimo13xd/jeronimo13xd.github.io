// src/Pages/SuAd_Usuarios.js

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuAd_Usuarios() {
  // 1) Estado para guardar usuarios, estado de carga y posibles errores
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2) Asegúrate de que esta URL sea exactamente la ruta a tu PHP:
    //    http://localhost/alepirea/GetUsuariosLista.php
    axios
      .get("http://localhost/alepirea/GetUsuariosLista.php")
      .then((res) => {
        // 3) el JSON devuelto debe ser algo como:
        //    [
        //      {
        //        "ID_Usuario": 13,
        //        "TipoUsuario": "sistema",
        //        "Correo": "AdmSis@Alepi.com",
        //        "Nombre": "Jerónimo",
        //        "FechaRegistro": "2025-05-21",
        //        "Estado": "Activo"
        //      },
        //      … 
        //    ]
        //    Entonces res.data es un arreglo con objetos que tienen esas propiedades.
        setUsuarios(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener usuarios:", err);
        setError("No se pudieron cargar los usuarios.");
        setCargando(false);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gestión de Usuarios</h2>
      <button className="btn btn-success mb-3">+ Crear usuario del sistema</button>

      {/* 4) Mensajes de carga o error */}
      {cargando && <p>Cargando usuarios…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 5) Si ya terminó de cargar y no hay error, mostramos la tabla */}
      {!cargando && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Fecha Registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.ID_Usuario}>
                  <td>{u.ID_Usuario}</td>
                  <td>{u.TipoUsuario}</td>
                  <td>{u.Correo}</td>
                  <td>{u.Nombre}</td>
                  <td>{u.FechaRegistro}</td>
                  <td>{u.Estado}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => console.log("Editar", u.ID_Usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => console.log("Borrar", u.ID_Usuario)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
