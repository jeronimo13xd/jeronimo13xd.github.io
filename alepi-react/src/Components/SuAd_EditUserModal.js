import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditUserModal({ id, onClose, onSaved }) {
  const [form, setForm] = useState(null);

  /* ────────── cargar datos del usuario ────────── */
  useEffect(() => {
    axios
      .get(`http://localhost/alepirea/SupAdmSis_GetUsuarioSimple.php?id=${id}`)
      .then(r => {
        const u = r.data.data ?? r.data;            // según tu endpoint
        setForm({
          Nombre      : u.Nombre  ?? "",
          Correo      : u.Correo  ?? "",
          TipoUsuario : (u.TipoUsuario ?? "").toLowerCase(), // ↓ minúsculas
          Estado      : u.Estado  ?? "Activo"
        });
      })
      .catch(err => {
        console.error(err);
        alert("No se pudo cargar el usuario");
        onClose();
      });
  }, [id, onClose]);

  /* ────────── handlers ────────── */
  const handle = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async e => {
    e.preventDefault();

    /* cuerpo que espera SupAdmSis_UpdateUsuario.php    *
     * (las claves son: id, nombre, correo, tipo, estado) */
    const body = {
      id,
      nombre : form.Nombre.trim(),
      correo : form.Correo.trim(),
      tipo   : form.TipoUsuario.toLowerCase(),
      estado : form.Estado
    };

    try {
      await axios.post(
        "http://localhost/alepirea/SupAdmSis_UpdateUsuario.php",
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      onSaved();               // refresca lista
      onClose();               // cierra modal
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  if (!form) return null;      // mientras carga

  /* ────────── UI ────────── */
  return (
    <div className="modal-backdrop">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <h4>{`Editar usuario #${id}`}</h4>

          <form onSubmit={save}>
            <input
              name="Nombre"
              className="form-control my-1"
              value={form.Nombre}
              onChange={handle}
              required
              placeholder="Nombre"
            />

            <input
              name="Correo"
              type="email"
              className="form-control my-1"
              value={form.Correo}
              onChange={handle}
              required
              placeholder="Correo"
            />

            <select
              name="TipoUsuario"
              className="form-select my-1"
              value={form.TipoUsuario}
              onChange={handle}
            >
              <option value="cliente">Cliente</option>
              <option value="negocio">Administradora de negocio</option>
              <option value="ventas">Administradora de ventas</option>
              <option value="sistema">Sistema</option>
            </select>

            <select
              name="Estado"
              className="form-select my-1"
              value={form.Estado}
              onChange={handle}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <button className="btn btn-primary mt-2">Guardar</button>
            <button
              type="button"
              className="btn btn-secondary mt-2 ms-2"
              onClick={onClose}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
