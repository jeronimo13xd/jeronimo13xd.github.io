import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CrearSuscripcionVentas() {
  const nav = useNavigate();
  const [profesionales, setProfesionales] = useState([]);
  const [form, setForm] = useState({ usuario:'', mesesPromo:3 });
  const [msg, setMsg] = useState(null);

  useEffect(()=>{
    axios.get('Ventas_GetUsuarios.php').then(res=>setProfesionales(res.data));
  },[]);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    axios.post('Ventas_CrearSuscripcion.php', form)
      .then(()=>{ setMsg({ ok:true, txt:'Suscripción creada' });
                  setTimeout(()=>nav('/ventas/suscripciones'),1000); })
      .catch(err=>setMsg({ ok:false, txt:err.response?.data?.error||'Error' }));
  };

  if (!profesionales.length) return <Spinner animation="border" />;

  return (
    <div className="container py-4">
      <h2>Nueva Suscripción</h2>
      {msg && <Alert variant={msg.ok?'success':'danger'}>{msg.txt}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Profesional</Form.Label>
          <Form.Select name="usuario" required onChange={handle}>
            <option value="">Seleccione…</option>
            {profesionales.map(p=>(
              <option key={p.ID_Usuario} value={p.ID_Usuario}>{p.Nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Meses con 50 % descuento</Form.Label>
          <Form.Control type="number" name="mesesPromo" min="0" max="3"
                        value={form.mesesPromo} onChange={handle}/>
        </Form.Group>
        <Button type="submit">Crear suscripción</Button>
      </Form>
    </div>
  );
}
