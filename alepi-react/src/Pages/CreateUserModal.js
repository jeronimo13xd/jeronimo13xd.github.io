import React, { useState } from "react";
import axios from "axios";

export default function CreateUserModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "", correo: "", password: "", tipo: "negocio"
  });

  const handle = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async e => {
    e.preventDefault();
    await axios.post(
      "http://localhost/alepirea/SupAdmSis_CrearUsuarioSistema.php",
      form
    );
    onSuccess();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <h4>Nuevo usuario del sistema</h4>
          <form onSubmit={save}>
            <input
              name="nombre"
              className="form-control my-1"
              placeholder="Nombre"
              onChange={handle}
              required
            />
            <input
              name="correo"
              type="email"
              className="form-control my-1"
              placeholder="Correo"
              onChange={handle}
              required
            />
            <input
              name="password"
              className="form-control my-1"
              placeholder="Contraseña temporal"
              onChange={handle}
              required
            />
            <select
            name="tipo"
            className="form-select my-1"
            value={form.tipo}
            onChange={handle}
            >
            <option value="negocio">Administradora de negocio</option>
            <option value="ventas">Administradora de ventas</option>
            <option value="staff">Administrador del sistema</option>
            </select>


            <button className="btn btn-success mt-2">Crear</button>
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
