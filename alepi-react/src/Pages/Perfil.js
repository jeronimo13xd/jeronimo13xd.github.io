// src/Pages/Perfil.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios           from "axios";
import "./PerfilUsuario.css";

import linkedinIcon  from "../assets/Linkedin.svg";
import facebookIcon  from "../assets/facebook.svg";
import instagramIcon from "../assets/insta.svg";
import xIcon         from "../assets/x.svg";
import whatsappIcon  from "../assets/Whats.svg";
import emailIcon     from "../assets/Mail.svg";

import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "../Components/AuthContext";

/* ------------- CONFIG AXIOS ------------- */
axios.defaults.baseURL        = "http://localhost/alepirea/";
axios.defaults.withCredentials = true;

export default function Perfil() {
  const navigate          = useNavigate();
  const { user }          = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Cargar perfil al montar ---------- */
  useEffect(() => {
    const id = user?.ID_Usuario || localStorage.getItem("idUsuario");
    if (!id) {
      alert("No se encontró un usuario válido. Inicia sesión.");
      navigate("/");
      return;
    }

    axios.get("GetUsuario.php?id=" + id)
      .then(r => {
        if (r.data.status === "success") {
          setPerfil(r.data.data);
        } else {
          alert(r.data.message || "No se encontraron datos.");
          navigate("/");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error al cargar el perfil.");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height:"50vh"}}>
        <Spinner animation="border" />
      </div>
    );

  if (!perfil) return null;   // ya se manejó el error arriba

  /* ---------- Helpers ---------- */
  const imgURL = perfil.imagenPerfil || "";
  const fullName = `${perfil.nombreVisible || perfil.nombreCuenta || ""} ${perfil.apellidoP || ""} ${perfil.apellidoM || ""}`;
  const idiomas  = Array.isArray(perfil.Idiomas) ? perfil.Idiomas.join(", ") : (perfil.Idiomas || "No especificados");
  const certific = Array.isArray(perfil.Certificaciones) ? perfil.Certificaciones.join(", ") : (perfil.Certificaciones || "No especificadas");

  return (
    <div className="perfil-container">
      {/* ---------- Encabezado ---------- */}
      <header className="perfil-header">
        <img src={imgURL} alt={fullName} className="perfil-imagen"/>
        <h2>{fullName.trim() || "Sin nombre"}</h2>
        <p className="perfil-profesion">{perfil.profesion || "Profesión no especificada"}</p>
      </header>

      {/* ---------- Tarjetas principales ---------- */}
      <div className="profile-container">
        <Row className="mb-4">
          {/* Contacto */}
          <Col md={4}>
            <Card>
              <Card.Body className="contact-info">
                <Card.Title className="text-uppercase">Datos de Contacto</Card.Title>

                <p><strong>Teléfono:</strong> {perfil.telefono || "No proporcionado"}</p>
                <p><strong>Ubicación:</strong> {perfil.Ubicacion || "No proporcionada"}</p>
                <p><strong>Cédula profesional:</strong> {perfil.CedulaProfesional || "No proporcionada"}</p>

                <Button variant="outline-light" className="mb-2 w-100">
                  <img src={emailIcon} alt="Correo"/>  Contactar por correo
                </Button>
                <Button variant="outline-light" className="w-100">
                  <img src={whatsappIcon} alt="WhatsApp"/>  Contactar por WhatsApp
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Especialidad + Estudios */}
          <Col md={8}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} className="border-right">
                    <Card.Title className="text-uppercase">Especialidades</Card.Title>
                    <p>{perfil.especialidad || "No especificada"}</p>
                  </Col>
                  <Col md={6}>
                    <Card.Title className="text-uppercase">Estudios y Certificaciones</Card.Title>
                    <p><strong>Universidad:</strong> {perfil.UniversidadEgreso || "No especificada"}</p>
                    <p><strong>Idiomas:</strong> {idiomas}</p>
                    <p><strong>Certificaciones:</strong> {certific}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* ---------- Secciones adicionales ---------- */}
      <Section title="Experiencia laboral">{perfil.ExperienciaLaboral || "No especificada"}</Section>

      <Section title="Honorarios">
        {perfil.Honorarios ? `$${perfil.Honorarios} MXN por hora` : "No especificados"}
      </Section>

      <Section title="Redes sociales">
        <div className="social-icons">
          {perfil.linkedin  && <a href={perfil.linkedin}><img src={linkedinIcon}  alt="LinkedIn"/></a>}
          {perfil.facebook  && <a href={perfil.facebook}><img src={facebookIcon}  alt="Facebook"/></a>}
          {perfil.instagram && <a href={perfil.instagram}><img src={instagramIcon} alt="Instagram"/></a>}
          {perfil.x         && <a href={perfil.x}><img src={xIcon}         alt="X"/></a>}
        </div>
      </Section>

      {/* Ejemplo de valoraciones dummy (puedes conectar a BD después) */}
      <Section title="Valoraciones">
        {[
          { nombre:"Ernesto Vega", fecha:"02/07/24", comentario:"Servicio excepcional.", estrellas:5 },
          { nombre:"Anónimo",      fecha:"02/07/24", comentario:"Muy profesional.",       estrellas:4 }
        ].map((rev,i)=>(
          <Card key={i} className="review-card mb-2">
            <Card.Body>
              <h5>{rev.nombre} - {rev.fecha}</h5>
              <p>{rev.comentario}</p>
              <div className="stars">{"⭐".repeat(rev.estrellas)}</div>
            </Card.Body>
          </Card>
        ))}
      </Section>
    </div>
  );
}

/* ---------- Tiny helper component ---------- */
function Section({ title, children }) {
  return (
    <div className="profile-section my-3">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
