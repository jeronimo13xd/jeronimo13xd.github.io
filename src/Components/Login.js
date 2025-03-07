import React, { useState, useContext } from 'react'; // <--- Agrega useContext
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../assets/LogoLogin.svg';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { AuthContext } from '../Components/AuthContext'; // <--- Importar el AuthContext

function Login() {
    const [Correo, setCorreo] = useState('');
    const [Contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');

    // Hook de React Router para navegar programáticamente
    const navigate = useNavigate();

    // Acceder a la función login y user del AuthContext
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Voy a mandar:", { Correo, Contrasena });

        try {
            // Enviar datos al servidor (Login.php)
            const response = await axios.post(
                'http://localhost/alepirea/Login.php',
                { Correo, Contrasena },
                { headers: { "Content-Type": "application/json" } }
            );

            // Manejar la respuesta del servidor
            if (response.data.status === "success") {
                setMessage('Login exitoso');

                // Guardar el ID de usuario en localStorage si lo necesitas para otras cosas
                if (response.data.userID) {
                    localStorage.setItem('idUsuario', response.data.userID);
                }

                // *** Llamar a la función login(...) del AuthContext ***
                // Pasa un objeto con la info que necesites (id, correo, etc.)
                login({
                    idUsuario: response.data.userID, correo: Correo,
                    // O más campos si tu backend los devuelve
                });

                // Redirigir al perfil
                navigate('/perfil');
            } else {
                setMessage('Credenciales inválidas');
            }
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión:", error);
            setMessage('Error al intentar iniciar sesión');
        }
    };

    return (
        <>
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

            <footer className="footer mt-auto py-3">
                {/* Contenido del footer... */}
            </footer>
        </>
    );
}

export default Login;
