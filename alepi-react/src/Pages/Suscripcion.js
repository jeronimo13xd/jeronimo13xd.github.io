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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  /* ───── estado global de los campos ───── */
  const [datos, setDatos] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
    idUsuario: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dia: '1',
    mes: '1',
    ano: '2000',
    genero: '',
    especialidades: '',
    profesion: '',
    idiomas: [],
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
      correo: datos.correo.trim(),
      contrasena: datos.contrasena,
      nombre: datos.nombre.trim(),
    };

    if (!body.correo || !body.contrasena || !body.nombre) {
      alert('Completa correo, contraseña y nombre');
      return;
    }

    console.log('📤 Enviando datos:', body);

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(
        '/RegistroUsuario.php',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
          withCredentials: false // ✅ IMPORTANTE: false cuando el servidor usa *
        }
      );

      console.log('✅ Respuesta del servidor:', response.data);

      if (response.data.status === 'success' && response.data.idUsuario) {
        localStorage.setItem('idUsuario', response.data.idUsuario);
        handleChange('idUsuario', response.data.idUsuario);
        nextStep();
      } else {
        setError(response.data.message || 'Error al registrar usuario');
        alert(response.data.message || 'Error al registrar usuario');
      }

    } catch (err) {
      console.error('❌ Error completo:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('El servidor tardó demasiado en responder');
        alert('Timeout: El servidor no respondió a tiempo');
      } else if (err.response) {
        // El servidor respondió con un error
        console.log('📊 Respuesta de error:', err.response.data);
        setError(err.response.data.message || `Error ${err.response.status}`);
        alert(err.response.data.message || `Error del servidor: ${err.response.status}`);
      } else if (err.request) {
        // No se recibió respuesta
        console.log('🔌 Sin respuesta del servidor');
        setError('Error de red: No se pudo conectar al servidor');
        alert('Error de red: Verifica que XAMPP esté ejecutándose');
      } else {
        // Error en la configuración
        setError('Error inesperado: ' + err.message);
        alert('Error inesperado: ' + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ───── Paso 5: registro profesional ───── */
const handleSubmitProfesional = async () => {
  if (!datos.idUsuario) {
    alert('Falta idUsuario. Vuelve al paso 1.');
    return;
  }

  setIsSubmitting(true);
  setError('');

  const carga = {
    ...datos,
    idUsuario: Number(datos.idUsuario),
    profesion: Number(datos.profesion || 0),
    especialidades: Number(datos.especialidades || 0),
    montoAsesoria: Number(datos.montoAsesoria || 0),
    fechaNacimiento: `${datos.ano}-${datos.mes}-${datos.dia}`
  };

  try {
    console.log('📤 Enviando datos profesionales:', carga);
    
    // ✅ CORREGIDO: URL sin duplicar alepirea
    const response = await axios.post(
      '/RegistroProfesional.php',
      carga,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
        withCredentials: false
      }
    );

    console.log('✅ Respuesta registro profesional:', response.data);

    if (response.data.status === 'success') {
      alert('¡Registro completado exitosamente!');
      navigate('/perfil');
    } else {
      setError(response.data.message);
      alert('Error: ' + response.data.message);
    }

  } catch (err) {
    console.error('❌ Error registro profesional:', err);
    
    if (err.code === 'ECONNABORTED') {
      setError('El servidor tardó demasiado en responder');
      alert('Timeout: El servidor no respondió a tiempo');
    } else if (err.response) {
      setError(err.response.data.message || `Error ${err.response.status}`);
      alert('Error del servidor: ' + (err.response.data.message || `Error ${err.response.status}`));
    } else if (err.request) {
      setError('No se pudo conectar al servidor');
      alert('Error de conexión: Verifica que XAMPP esté ejecutándose');
    } else {
      setError('Error inesperado: ' + err.message);
      alert('Error inesperado: ' + err.message);
    }
  } finally {
    setIsSubmitting(false);
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
          isSubmitting={isSubmitting}
          error={error}
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
          isSubmitting={isSubmitting}
          error={error}
        />
      );
    default:
      return null;
  }
};

export default Suscripcion;