// SUSCRIPCION (Padre)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paso0 from '../Components/Paso0';
import Paso1 from '../Components/Paso1';
import Paso2 from '../Components/Paso2';
import Paso3 from '../Components/Paso3';
import Paso4 from '../Components/Paso4';
import Paso5 from '../Components/Paso5';
import axios from 'axios';

const Suscripcion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  /* ───── estado global de los campos ───── */
  const [datos, setDatos] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
    idUsuario: '',               // se llenará tras Paso0
    apellidoPaterno: '',
    apellidoMaterno: '',
    dia: '1',
    mes: '1',
    ano: '2000',
    genero: '',
    especialidades: '',
    profesion: '',               // ID numérico en string
    idiomas: [],                 // array
    otrosIdiomas: '',
    cedulaProfesional: '',
    universidad: '',
    experienciaLaboral: '',
    montoAsesoria: '',
    telefono: '',
    calle: '',
    numero: '',
    interior: '',
    codigoPostal: '',
    alcaldia: '',
    estado: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    x: '',
    correoContacto: '',
    whatsapp: ''
  });

  /* ───── navegación del wizard ───── */
  const nextStep = () => { if (step < 5) setStep(s => s + 1); };
  const prevStep = () => { if (step > 0) setStep(s => s - 1); };

  /* ───── actualiza campos ───── */
  const handleChange = (campo, valor) => {
    setDatos(d => ({ ...d, [campo]: valor }));
  };

  /* ───── Paso 0: registra usuario y guarda idUsuario ───── */
  const handleRegisterUsuario = async () => {
    const body = {
      correo     : datos.correo.trim(),
      contrasena : datos.contrasena,
      nombre     : datos.nombre.trim(),
    };

    if (!body.correo || !body.contrasena || !body.nombre) {
      alert('Completa correo, contraseña y nombre');
      return;
    }

    try {
      const r = await axios.post('http://localhost/alepirea/RegistroUsuario.php', body);
      if (r.data.status === 'success' && r.data.idUsuario) {
        localStorage.setItem('idUsuario', r.data.idUsuario);
        handleChange('idUsuario', r.data.idUsuario);
        nextStep();
      } else {
        alert(r.data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red al registrar usuario');
    }
  };

  /* ───── Paso 5: registro profesional ───── */
  const handleSubmitProfesional = async () => {
    /* validación mínima */
    if (!datos.idUsuario) { alert('Falta idUsuario'); return; }
    if (!datos.profesion)  { alert('Falta profesión'); return; }
    if (!Array.isArray(datos.idiomas) || datos.idiomas.length === 0) {
      alert('Selecciona al menos un idioma'); return;
    }

    const carga = {
      ...datos,
      idUsuario     : Number(datos.idUsuario),
      profesion     : Number(datos.profesion),
      especialidades: Number(datos.especialidades || 0),
      montoAsesoria : Number(datos.montoAsesoria || 0),
      fechaNacimiento: `${datos.ano}-${datos.mes}-${datos.dia}`
    };

    try {
      console.log('Enviando datos:', carga);
      const r = await axios.post('http://localhost/alepirea/RegistroProfesional.php', carga);
      if (r.data.status === 'success') {
        alert('Registro completado exitosamente');
        navigate('/perfil');
      } else {
        alert(`Error: ${r.data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error de red al registrar profesional');
    }
  };

  /* ───── render según paso ───── */
  switch (step) {
    case 0:
      return (
        <Paso0
          registrarUsuario={handleRegisterUsuario}
          handleChange={handleChange}
          datos={datos}
        />
      );
    case 1:
      return (
        <Paso1
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          datos={datos}
        />
      );
    case 2:
      return (
        <Paso2
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          datos={datos}
        />
      );
    case 3:
      return (
        <Paso3
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          datos={datos}
        />
      );
    case 4:
      return (
        <Paso4
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          datos={datos}
        />
      );
    case 5:
      return (
        <Paso5
          prevStep={prevStep}
          handleSubmit={handleSubmitProfesional}
          datos={datos}
        />
      );
    default:
      return null;
  }
};

export default Suscripcion;
