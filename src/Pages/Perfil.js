import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PerfilUsuario.css";
import linkedinIcon from "../assets/Linkedin.svg";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/insta.svg";
import xIcon from "../assets/x.svg";
import whatsappIcon from "../assets/Whats.svg";
import emailIcon from "../assets/Mail.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Card, Row, Col, Button } from "react-bootstrap";

const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            const idUsuario = localStorage.getItem("idUsuario");
            if (!idUsuario) {
                alert("No se encontró el ID del usuario. Por favor, inicia sesión.");
                navigate("/");
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost/alepirea/GetUsuario.php",
                    { idUsuario },
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.data?.status === "success" && response.data.data) {
                    setUsuario(prevState =>
                        JSON.stringify(prevState) !== JSON.stringify(response.data.data)
                            ? response.data.data
                            : prevState
                    );
                } else {
                    alert(response.data?.message || "No se encontraron datos para este usuario.");
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

    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <img
                    src={usuario.imagenPerfil || ""}
                    alt={`${usuario.nombre || "Usuario"} ${usuario.apellidoPaterno || ""}`}
                    className="perfil-imagen"
                />
                <h2>
                    {usuario.nombre || "Sin nombre"} {usuario.apellidoPaterno || ""} {usuario.apellidoMaterno || ""}
                </h2>
                <p className="perfil-profesion">{usuario.profesion || "Profesión no especificada"}</p>
            </header>

            <div className="profile-container">
                <Row className="mb-4">
                    <Col md={4}>
                        <Card>
                            <Card.Body className="contact-info">
                                <Card.Title className="text-uppercase">Datos de Contacto</Card.Title>
                                <p><strong>Teléfono:</strong> {usuario.telefono || "No proporcionado"}</p>
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
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={6} className="border-right">
                                        <Card.Title className="text-uppercase">Especialidades</Card.Title>
                                        <p>{usuario.especialidad || "No especificada"}</p>
                                    </Col>
                                    <Col className="pip" md={6}>
                                        <Card.Title className="text-uppercase">Estudios y Certificaciones</Card.Title>
                                        <p><strong>Universidad:</strong> {usuario.universidad || "No especificada"}</p>
                                        <p><strong>Idiomas:</strong> {Array.isArray(usuario.idiomas) ? usuario.idiomas.join(", ") : usuario.idiomas || "No especificados"}</p>
                                        <p><strong>Certificaciones:</strong> {Array.isArray(usuario.certificaciones) ? usuario.certificaciones.join(", ") : usuario.certificaciones || "No especificadas"}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
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

            <div className="profile-section reviews">
                <h3>Valoraciones</h3>
                {[{ nombre: "Ernesto Vega", fecha: "02/07/24", comentario: "Emiliano es un abogado excepcional, muy comprometido y con amplios conocimientos en su área.", estrellas: 5 },
                { nombre: "Anónimo", fecha: "02/07/24", comentario: "Gracias a Emiliano, nuestra empresa ha resuelto todos sus problemas legales de manera eficiente.", estrellas: 4 }]
                    .map((review, index) => (
                        <Card key={index} className="review-card">
                            <Card.Body>
                                <h5>{review.nombre} - {review.fecha}</h5>
                                <p>{review.comentario}</p>
                                <div className="stars">{"⭐".repeat(review.estrellas)}</div>
                            </Card.Body>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default Perfil;
