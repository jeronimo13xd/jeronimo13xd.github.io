import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../assets/LogoLogin.svg';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { AuthContext } from '../Components/AuthContext';

function Login() {
    const [Correo, setCorreo] = useState('');
    const [Contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/alepirea/Login.php',
                { Correo, Contrasena },
                { headers: { "Content-Type": "application/json" } }
            );

            const res = response.data;

            if (res.status === "success" && res.usuario) {
                // Guardar en localStorage y contexto global
                login({
                    id: res.usuario.id,
                    nombre: res.usuario.nombre,
                    correo: res.usuario.correo,
                    permisos: res.usuario.permisos // 👈 aquí se guardan
                });

                setMessage('Login exitoso');
                navigate('/perfil'); // Redirige a donde necesites
            } else {
                setMessage(res.message || 'Credenciales inválidas');
            }
        } catch (error) {
            console.error("Error en login:", error);
            setMessage('Error de conexión o servidor');
        }
    };

    return (
        <div className='contorno'>
            <Form className="login-form p-4 rounded shadow" onSubmit={handleLogin}>
                <img src={Logo} className='Logs' alt='LogoLogin' />

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='textoLogin'>Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        className="border-primary input-white"
                        value={Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='textoLogin'>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="border-danger input-white"
                        value={Contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3 form-check">
                    <Form.Check type="checkbox" label="Recordar" className="textoLogin" />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 custom-button">
                    Entrar
                </Button>
            </Form>

            {message && <p className="mt-3 text-center">{message}</p>}
        </div>
    );
}

export default Login;
