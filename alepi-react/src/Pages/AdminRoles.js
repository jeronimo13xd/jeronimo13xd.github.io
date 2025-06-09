// src/Pages/AdminRoles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';

const api = 'http://localhost/alepirea/';

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [perms, setPerms] = useState([]);
  const [show, setShow]   = useState(false);

  // El formulario mantiene id, nombre y permisos (IDs en forma de string)
  const [form, setForm] = useState({
    id: 0,
    nombre: '',
    permisos: []
  });

  // ➊ Cargar roles y catálogo de permisos en el montaje
  useEffect(() => {
    axios
      .get(api + 'roles_get.php')
      .then(response => {
        setRoles(response.data);
      })
      .catch(err => {
        console.error("Error al obtener roles:", err);
      });

    axios
      .get(api + 'roles_get.php', { params: { cat: 'perms' } })
      .then(response => {
        setPerms(response.data);
      })
      .catch(err => {
        console.error("Error al obtener permisos:", err);
      });
  }, []);

  // ➋ Abrir modal en blanco para “Nuevo rol”
  const openNew = () => {
    setForm({ id: 0, nombre: '', permisos: [] });
    setShow(true);
  };

  // ➌ Abrir modal con datos de un rol existente
  const openEdit = (r) => {
    // r.permisos viene como cadena: "modulo:accion, modulo2:accion2"
    const permisosArray = r.permisos
      ? r.permisos.split(',').map(p => p.trim())
      : [];

    // Convertimos cada "modulo:accion" al ID correspondiente (string)
    const permisosIdsStr = permisosArray.reduce((acc, tag) => {
      const encontrado = perms.find(x => (x.Modulo + ':' + x.Accion) === tag);
      if (encontrado) {
        acc.push(String(encontrado.ID_Permiso));
      }
      return acc;
    }, []);

    setForm({
      id: r.ID_Rol,
      nombre: r.NombreRol,
      permisos: permisosIdsStr
    });
    setShow(true);
  };

  // ➍ Alternar selección de permiso en el formulario
  const togglePerm = (pid) => {
    setForm(f => {
      const newPerms = f.permisos.includes(pid)
        ? f.permisos.filter(p => p !== pid)
        : [...f.permisos, pid];
      return { ...f, permisos: newPerms };
    });
  };

  // ➎ Guardar (POST a roles_save.php)
  const saveRole = () => {
    const payload = {
      id: form.id,
      nombre: form.nombre.trim(),
      permisos: form.permisos.map(Number) // convertimos a número
    };

    axios
      .post(api + 'roles_save.php', payload)
      .then(() => {
        // Una vez guardado, recargamos los roles
        return axios.get(api + 'roles_get.php');
      })
      .then(r2 => {
        setRoles(r2.data);
        setShow(false);
      })
      .catch(err => {
        console.error("Error al guardar rol:", err);
        alert("Ocurrió un error al guardar el rol. Ver consola.");
      });
  };

  // ➏ Eliminar un rol
  const delRole = (id) => {
    if (!window.confirm('¿Eliminar rol?')) return;

    axios
      .get(api + 'roles_delete.php', { params: { id } })
      .then(() => {
        setRoles(old => old.filter(x => x.ID_Rol !== id));
      })
      .catch(err => {
        console.error("Error al eliminar rol:", err);
        alert("Ocurrió un error al eliminar el rol. Ver consola.");
      });
  };

  return (
    <div className="container mt-4">
      <h3>Gestión de Roles</h3>
      <Button size="sm" onClick={openNew}>
        + Nuevo rol
      </Button>

      <Table striped bordered size="sm" className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Permisos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map(r => (
            <tr key={r.ID_Rol}>
              <td>{r.ID_Rol}</td>
              <td>{r.NombreRol}</td>
              <td>
                {r.permisos &&
                  r.permisos.split(',').map(p => (
                    <Badge bg="secondary" className="me-1 mb-1" key={p}>
                      {p.trim()}
                    </Badge>
                  ))}
              </td>
              <td width={130}>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => openEdit(r)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => delRole(r.ID_Rol)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ───── Modal para Nuevo/Editar Rol ───── */}
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {form.id ? `Editar rol (ID: ${form.id})` : 'Nuevo rol'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del rol</Form.Label>
            <Form.Control
              type="text"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              placeholder="Ingresa nombre de rol"
            />
          </Form.Group>

          <h6>Permisos</h6>
          <div className="d-flex flex-wrap">
            {perms.map(p => {
              const tag = `${p.Modulo}:${p.Accion}`;
              return (
                <Form.Check
                  key={p.ID_Permiso}
                  type="checkbox"
                  id={'p' + p.ID_Permiso}
                  label={tag}
                  className="me-3 mb-2"
                  checked={form.permisos.includes(String(p.ID_Permiso))}
                  onChange={() => togglePerm(String(p.ID_Permiso))}
                />
              );
            })}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveRole}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
