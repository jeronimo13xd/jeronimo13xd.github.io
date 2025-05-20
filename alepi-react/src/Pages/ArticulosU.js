import { useState } from "react";
import "./ArticulosU.css";

const ArticulosU = () => {
    const [articulos, setArticulos] = useState([
        {
            id: 1,
            titulo: "Ciberseguridad Básica",
            resumen: "Aprende cómo proteger tu identidad en internet.",
            fecha: "28/09/2024",
            categorias: ["Ciberseguridad", "Privacidad"],
            autor: "Laura Méndez",
            valoracion: 5,
            tiempoLectura: "6 min",
            imagen: require("../assets/Articulos.png"),
        },
    ]);

    const [nuevoArticulo, setNuevoArticulo] = useState({
        titulo: "",
        resumen: "",
        fecha: "",
        categorias: "",
        autor: "",
        valoracion: "",
        tiempoLectura: "",
        pdf: null,
        imagen: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNuevoArticulo((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevo = {
            ...nuevoArticulo,
            id: articulos.length + 1,
            categorias: nuevoArticulo.categorias.split(",").map((c) => c.trim()),
            imagen: URL.createObjectURL(nuevoArticulo.imagen),
        };

        setArticulos([nuevo, ...articulos]);
        setNuevoArticulo({
            titulo: "",
            resumen: "",
            fecha: "",
            categorias: "",
            autor: "",
            valoracion: "",
            tiempoLectura: "",
            pdf: null,
            imagen: null,
        });
    };

    return (
        <div className="articulos-wrapper">
            <div className="articulos-background">
                <div className="articulos-container">
                    <form className="formulario-articulo" onSubmit={handleSubmit}>
                        <h2>Subir Nuevo Artículo</h2>
                        <input type="text" name="titulo" placeholder="Título del artículo" value={nuevoArticulo.titulo} onChange={handleInputChange} required />
                        <textarea name="resumen" placeholder="Resumen" value={nuevoArticulo.resumen} onChange={handleInputChange} required />
                        <input type="date" name="fecha" value={nuevoArticulo.fecha} onChange={handleInputChange} required />
                        <input type="text" name="categorias" placeholder="Categorías (separadas por coma)" value={nuevoArticulo.categorias} onChange={handleInputChange} required />
                        <input type="text" name="autor" placeholder="Autor" value={nuevoArticulo.autor} onChange={handleInputChange} required />

                        <input type="text" name="tiempoLectura" placeholder="Tiempo de lectura (Ej: 5 min)" value={nuevoArticulo.tiempoLectura} onChange={handleInputChange} required />

                        <label>Documento PDF</label>
                        <input type="file" name="pdf" onChange={handleInputChange} accept=".pdf" required />

                        <label>Imagen de Portada</label>
                        <input type="file" name="imagen" onChange={handleInputChange} accept="image/*" required />

                        <button type="submit">Subir Artículo</button>
                    </form>

                    <div className="articulos-listado">
                        <h3>Artículos Subidos</h3>
                        {articulos.map((articulo) => (
                            <div key={articulo.id} className="articulo-card">
                                <img src={articulo.imagen} alt="Portada" />
                                <div className="articulo-info">
                                    <h4>{articulo.titulo}</h4>
                                    <p><strong>Resumen:</strong> {articulo.resumen}</p>
                                    <p><strong>Autor:</strong> {articulo.autor}</p>
                                    <p><strong>Tiempo de lectura:</strong> {articulo.tiempoLectura}</p>
                                    <button>Leer más</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticulosU;
