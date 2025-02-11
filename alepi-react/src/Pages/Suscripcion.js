import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para redirección
import Paso0 from '../Components/Paso0'; // Nuevo Paso 0
import Paso1 from '../Components/Paso1';
import Paso2 from '../Components/Paso2';
import Paso3 from '../Components/Paso3';
import Paso4 from '../Components/Paso4';
import Paso5 from '../Components/Paso5';
import axios from 'axios';

const Suscripcion = () => {
    const navigate = useNavigate(); // Hook para redirección

    const [step, setStep] = useState(0); // Comenzamos en el Paso 0

    // Estado con todos los datos que irás recopilando
    const [datos, setDatos] = useState({
        // Datos de usuario
        correo: '',
        contrasena: '',  // en lugar de "contraseña"
        nombre: '',
        idUsuario: '', // ID del usuario generado en el backend

        // Otros datos
        apellidoPaterno: '',
        apellidoMaterno: '',
        dia: '',
        mes: '',
        ano: '',
        genero: '',
        especialidades: '',
        profesion: '',
        idiomas: [],
        cedulaProfesional: '',
        universidad: '',
        experienciaLaboral: '',
        montoAsesoria: '',
    });

    // Avanzar de paso
    const nextStep = () => {
        if (step < 5) setStep(step + 1);
    };

    // Retroceder de paso
    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    // Actualizar estado al cambiar cualquier input
    const handleChange = (input, value) => {
        setDatos((prevDatos) => ({
            ...prevDatos,
            [input]: value,
        }));
    };

    /**
     * Registro de Usuario en Paso 0
     * Valida si el correo existe. Si existe, el servidor devuelve un error y no avanza.
     */
    const handleRegisterUsuario = async () => {
        const requestBody = {
            correo: datos.correo,
            contrasena: datos.contrasena,  // usar "contrasena"
            nombre: datos.nombre,
        };

        try {
            const response = await axios.post(
                'http://localhost/alepirea/RegistroUsuario.php',
                requestBody,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.status === 'success') {
                // Si se crea el usuario correctamente, guardamos el ID y avanzamos
                handleChange('idUsuario', response.data.idUsuario);
                nextStep();
            } else {
                // Si el correo existe o hay otro error, mostramos el mensaje del servidor
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un error al registrar al usuario.');
        }
    };

    /**
     * Registro de datos de profesional (último paso)
     */
    const handleSubmitProfesional = async () => {
        try {
            const response = await axios.post(
                'http://localhost/alepirea/RegistroProfesional.php',
                datos,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.status === 'success') {
                alert('Registro completado exitosamente');
                // Guardar el ID_Usuario en localStorage (o lo que necesites)
                localStorage.setItem('idUsuario', datos.idUsuario);
                // Redirigir al perfil del usuario
                navigate('/perfil');
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error al registrar profesional:', error);
            alert('Hubo un error al registrar los datos profesionales.');
        }
    };

    // Renderizado de componentes según el paso actual
    switch (step) {
        case 0:
            return (
                <Paso0
                    nextStep={handleRegisterUsuario}
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
