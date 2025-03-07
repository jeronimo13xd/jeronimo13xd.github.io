import React from 'react';

const Paso0 = ({ nextStep, handleChange, datos }) => {
    const handleNextStep = () => {
        if (!datos.correo || !datos.contrasena || !datos.nombre) {
            alert("Error: Todos los campos son obligatorios.");
            return;
        }
        nextStep();
    };

    return (
        <div className="container mt-5">
            <h2 className="font-weight-bold">Registro de Usuario</h2>
            <hr style={{ border: "1px solid #007bff", width: "150px" }} />
            <form>
                <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="Correo Electrónico"
                        value={datos.correo}
                        onChange={(e) => handleChange('correo', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="contrasena"
                        placeholder="Contraseña"
                        value={datos.contrasena}
                        onChange={(e) => handleChange('contrasena', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Nombre Completo"
                        value={datos.nombre}
                        onChange={(e) => handleChange('nombre', e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                >
                    Siguiente &rarr;
                </button>
            </form>
        </div>
    );
};

export default Paso0;
