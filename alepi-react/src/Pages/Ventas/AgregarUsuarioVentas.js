import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AgregarUsuarioVentas() {
  const [form, setForm] = useState({ nombre:'', correo:'', especialidad:'', password:'' });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    axios.post('Ventas_AgregarUsuario.php', form)
      .then(() => { setMsg({ ok:true, txt:'Profesional agregado' });
                    setTimeout(()=>nav('/ventas/usuarios'),1000); })
      .catch(err => setMsg({ ok:false, txt:err.response?.data?.error || 'Error' }));
  };

  return (
    <div className="container py-4">
      <h2>Alta de Profesional</h2>
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
        <Form.Group className="mb-3">
          <Form.Label>Contraseña inicial</Form.Label>
          <Form.Control type="password" name="password" required value={form.password} onChange={handle}/>
        </Form.Group>

        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
}
