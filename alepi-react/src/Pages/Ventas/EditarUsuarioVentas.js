import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditarUsuarioVentas() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    axios.get(`Ventas_GetUsuario.php?id=${id}`)
      .then(res => setForm(res.data))
      .catch(()=>setMsg({ ok:false, txt:'No encontrado' }));
  }, [id]);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    axios.post('Ventas_EditarUsuario.php', { id, ...form })
      .then(()=>{ setMsg({ ok:true, txt:'Actualizado' });
                  setTimeout(()=>nav('/ventas/usuarios'),1000); })
      .catch(err=>setMsg({ ok:false, txt:err.response?.data?.error||'Error' }));
  };

  if (!form) return <Spinner animation="border" />;

  return (
    <div className="container py-4">
      <h2>Editar Profesional</h2>
      {msg && <Alert variant={msg.ok?'success':'danger'}>{msg.txt}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control name="nombre" required value={form.nombre} onChange={handle}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" name="correo" required value={form.correo} onChange={handle}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control name="especialidad" required value={form.especialidad} onChange={handle}/>
        </Form.Group>
        <Button type="submit">Guardar cambios</Button>
      </Form>
    </div>
  );
}
