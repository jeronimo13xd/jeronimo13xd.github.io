import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PerfilUsuario.css";

// Iconos de ejemplo (ajusta las rutas si lo necesitas)
import linkedinIcon from "../assets/Linkedin.svg";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/insta.svg";
import xIcon from "../assets/x.svg";
// Podrías usar estos si lo requieres:
import whatsappIcon from "../assets/Whats.svg";
import emailIcon from "../assets/Mail.svg";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Row, Col, Button } from 'react-bootstrap';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            const idUsuario = localStorage.getItem("idUsuario");
            if (!idUsuario) {
                alert("No se encontró el ID del usuario. Por favor, inicia sesión.");
                navigate("/"); // O la ruta que corresponda a tu login
                return;
            }

            try {
                // Hacemos POST a GetUsuario.php (en lugar de GET)
                const response = await axios.post(
                    "http://localhost/alepirea/GetUsuario.php",
                    { idUsuario }, // Enviamos el ID del usuario en el body
                    { headers: { "Content-Type": "application/json" } }
                );

                // Validamos la respuesta
                if (response.data && response.data.status === "success") {
                    setUsuario(response.data.data); // Guardar los datos en el estado
                } else {
                    alert(response.data.message || "No se encontraron datos para este usuario.");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
                alert("Hubo un problema al cargar los datos del perfil.");
                navigate("/");
            }
        };

        fetchUsuario();
    }, [navigate]);

    // Muestra "Cargando..." mientras no tengamos datos
    if (!usuario) {
        return <div className="loading">Cargando...</div>;
    }

    // Renderizamos el perfil
    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <img
                    src={usuario.imagenPerfil || "https://via.placeholder.com/150"}
                    alt={`${usuario.nombre || "Usuario"} ${usuario.apellidoPaterno || ""}`}
                    className="perfil-imagen"
                />
                <h2>
                    {usuario.nombre || "Sin nombre"} {usuario.apellidoPaterno || ""}{" "}
                    {usuario.apellidoMaterno || ""}
                </h2>
                <p className="perfil-profesion">
                    {usuario.profesion || "Profesión no especificada"}
                </p>
            </header>

            <div className="profile-container">
                <Row className="mb-4">
                    {/* Tarjeta de Datos de Contacto */}
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-uppercase">Datos de Contacto</Card.Title>
                                {/* Datos dummy, ajusta con los campos reales si los tienes en tu BD */}
                                <p><strong>Teléfono:</strong> +00 000 000</p>
                                <p><strong>Ubicación:</strong> {usuario.ubicacion || "No proporcionada"}</p>
                                <p><strong>Cédula Profesional:</strong> {usuario.cedulaProfesional || "No proporcionada"}</p>
                                <Button variant="outline-light" className="mb-2 w-100">
                                    <img src={emailIcon} alt="Correo" /> Contactar por correo
                                </Button>
                                <Button variant="outline-light" className="w-100">
                                    <img src={whatsappIcon} alt="WhatsApp" /> Contactar por WhatsApp
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Tarjeta combinada para Especialidades y Estudios */}
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    {/* Especialidades */}
                                    <Col md={6} className="border-right">
                                        <Card.Title className="text-uppercase">Especialidades</Card.Title>
                                        {/* Si tu "especialidad" viene en usuario.especialidad */}
                                        <p>{usuario.especialidad || "No especificada"}</p>
                                    </Col>
                                    {/* Estudios y Certificaciones */}
                                    <Col md={6}>
                                        <Card.Title className="text-uppercase">Estudios y Certificaciones</Card.Title>
                                        <p><strong>Universidad:</strong> {usuario.universidad || "No especificada"}</p>
                                        <p><strong>Idiomas:</strong> {
                                            Array.isArray(usuario.idiomas)
                                                ? usuario.idiomas.join(", ")
                                                : (usuario.idiomas || "No especificados")
                                        }</p>
                                        <p><strong>Certificaciones:</strong> {
                                            Array.isArray(usuario.certificaciones)
                                                ? usuario.certificaciones.join(", ")
                                                : (usuario.certificaciones || "No especificadas")
                                        }</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Sección detallada (puedes unificar con lo anterior) */}
            <div className="profile-container">
                <div className="profile-section contact-info">
                    <h3>Datos del Contacto</h3>
                    <p><strong>Correo:</strong> {usuario.correo || "No proporcionado"}</p>
                    <p><strong>Ubicación:</strong> {usuario.ubicacion || "No proporcionada"}</p>
                    <p><strong>Cédula Profesional:</strong> {usuario.cedulaProfesional || "No proporcionada"}</p>
                </div>

                <div className="profile-section specialties">
                    <h3>Especialidades</h3>
                    {/* Ajusta si tienes un array de especialidades, etc. */}
                    <p>{usuario.especialidad || "No especificada"}</p>
                </div>

                <div className="profile-section education">
                    <h3>Estudios y Certificaciones</h3>
                    <p><strong>Universidad:</strong> {usuario.universidad || "No especificado"}</p>
                    <p><strong>Idiomas:</strong> {
                        Array.isArray(usuario.idiomas)
                            ? usuario.idiomas.join(", ")
                            : (usuario.idiomas || "No especificados")
                    }</p>
                </div>

                <div className="profile-section work-experience">
                    <h3>Experiencia Laboral</h3>
                    <p>{usuario.experienciaLaboral || "No especificada"}</p>
                </div>

                <div className="profile-section fees">
                    <h3>Honorarios</h3>
                    <p>{usuario.honorarios ? `$${usuario.honorarios} MXN por hora` : "No especificados"}</p>
                </div>

                <div className="profile-section social-media">
                    <h3>Redes Sociales</h3>
                    <div className="social-icons">
                        {usuario.linkedin && <a href={usuario.linkedin}><img src={linkedinIcon} alt="LinkedIn" /></a>}
                        {usuario.facebook && <a href={usuario.facebook}><img src={facebookIcon} alt="Facebook" /></a>}
                        {usuario.instagram && <a href={usuario.instagram}><img src={instagramIcon} alt="Instagram" /></a>}
                        {usuario.x && <a href={usuario.x}><img src={xIcon} alt="X" /></a>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
