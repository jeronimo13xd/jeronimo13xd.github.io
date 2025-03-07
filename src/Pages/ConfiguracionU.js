import { useState } from "react";
import { Tabs, Tab, Card, Form, Button, Container, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConfiguracionU.css";

const ConfiguracionU = () => {
    const [key, setKey] = useState("perfil");
    return (
        <Container className="config-container mt-5 d-flex justify-content-center">
            <Card className="config-card shadow-lg p-4 text-white rounded">
                <h2 className="text-center mb-4">Configuración</h2>
                <Tabs id="config-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="config-tabs mb-3" variant="pills">
                    {/* Pestaña PERFIL */}
                    <Tab eventKey="perfil" title="PERFIL">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Datos Personales</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="text" placeholder="Tu nombre" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido Paterno</Form.Label>
                                            <Form.Control type="text" placeholder="Apellido Paterno" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido Materno</Form.Label>
                                            <Form.Control type="text" placeholder="Apellido Materno" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ubicación</Form.Label>
                                            <Form.Control type="text" placeholder="Ingresa tu ubicación" />
                                        </Form.Group>
                                        <Button variant="primary">Guardar Cambios</Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Datos del Contacto</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control type="text" placeholder="+00 00-00-00-00" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>WhatsApp</Form.Label>
                                            <Form.Control type="text" placeholder="Número de WhatsApp" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Correo</Form.Label>
                                            <Form.Control type="email" placeholder="tucorreo@ejemplo.com" />
                                        </Form.Group>
                                        <Button variant="primary">Guardar Cambios</Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Especialidades</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Control as="textarea" placeholder="Actualiza tus especialidades" />
                                        </Form.Group>
                                        <Button variant="primary">Guardar Cambios</Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Datos Profesionales</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Idiomas</Form.Label>
                                            <Form.Control as="textarea" placeholder="Actualiza los idiomas que hablas" />
                                            <Form.Label>Certificaciones</Form.Label>
                                            <Form.Control as="textarea" placeholder="Actualiza tus certficaciones" />
                                            <Form.Label>Experiencia Laboral</Form.Label>
                                            <Form.Control as="textarea" placeholder="Actualiza tu experiencia laboral" />
                                        </Form.Group>
                                        <Button variant="primary">Guardar Cambios</Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Redes Sociales</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Linkedin</Form.Label>
                                            <Form.Control type="text" placeholder="Ingresa el Link de tu pefil de Linkedin" />
                                            <Form.Label>Facebook</Form.Label>
                                            <Form.Control type="text" placeholder="Ingresa el Link de tu pefil de Facebook" />
                                            <Form.Label>Instagram</Form.Label>
                                            <Form.Control type="text" placeholder="Ingresa el Link de tu pefil de Instagram" />
                                            <Form.Label>X (Antes Twitter)</Form.Label>
                                            <Form.Control type="text" placeholder="Ingresa el Link de tu pefil de X" />
                                            <Form.Label>Tik Tok</Form.Label>
                                            <Form.Control type="text" placeholder="Ingresa el Link de tu pefil de Tik Tok" />
                                        </Form.Group>
                                        <Button variant="primary">Guardar Cambios</Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Tab>
                    {/* Pestaña SEGURIDAD */}
                    <Tab eventKey="seguridad" title="SEGURIDAD">
                        <Card.Body className="bg-light rounded p-4">
                            <h5>Cambiar Contraseña</h5>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña Actual</Form.Label>
                                    <Form.Control type="password" placeholder="••••••" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nueva Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Nueva contraseña" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirma la Contraseña Nueva</Form.Label>
                                    <Form.Control type="password" placeholder="Nueva contraseña" />
                                </Form.Group>
                                <Button variant="danger">Actualizar Contraseña</Button>
                            </Form>
                        </Card.Body>
                    </Tab>
                    {/* Pestaña CUENTA */}
                    <Tab eventKey="cuenta" title="CUENTA">
                        <Card.Body className="bg-light rounded p-4">
                            <h5>Administrar Cuenta</h5>
                            <Button variant="warning">Desactivar Cuenta</Button>
                            <Button variant="danger" className="ms-2">Eliminar Cuenta</Button>
                        </Card.Body>
                    </Tab>
                    {/* Pestaña SUSCRIPCIÓN */}
                    <Tab eventKey="suscripcion" title="SUSCRIPCIÓN">
                        <Card.Body className="bg-light rounded p-4">
                            <h5>Detalles de Suscripción</h5>
                            <p>Actualmente estás en el plan <strong>Gratuito</strong>.</p>
                            <Button variant="success">Actualizar Plan</Button>
                        </Card.Body>
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    );
};

export default ConfiguracionU;
