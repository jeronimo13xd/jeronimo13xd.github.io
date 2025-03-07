import { useState } from "react";
import "./ArticulosU.css"; // Importamos los estilos

const ArticulosU = () => {
    const [articulos, setArticulos] = useState([
        {
            id: 1,
            titulo: "Cómo mejorar la seguridad de tu red doméstica",
            resumen: "Descubre las mejores prácticas para proteger tu red doméstica contra amenazas comunes y mantener tus dispositivos seguros.",
            fecha: "12 de agosto de 2024",
            categorias: ["Seguridad", "Redes"],
            autor: "Juan Pérez",
            valoracion: 4,
            tiempoLectura: "5 min",
            imagen: "https://via.placeholder.com/100", // Imagen de ejemplo
        },
    ]);

    const [nuevoArticulo, setNuevoArticulo] = useState({
        titulo: "",
        resumen: "",
        fecha: new Date().toISOString().split("T")[0],
        categorias: "",
        autor: "",
        valoracion: 5,
        tiempoLectura: "",
        imagen: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoArticulo({ ...nuevoArticulo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevo = { ...nuevoArticulo, id: Date.now(), categorias: nuevoArticulo.categorias.split(", ") };
        setArticulos([...articulos, nuevo]);
        setNuevoArticulo({ titulo: "", resumen: "", fecha: new Date().toISOString().split("T")[0], categorias: "", autor: "", valoracion: 5, tiempoLectura: "", imagen: "" });
    };

    return (
        <div className="container">
            {/* Formulario para subir artículos */}
            <div className="form-container">
                <h2>Subir Nuevo Artículo</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="titulo" placeholder="Título del artículo" value={nuevoArticulo.titulo} onChange={handleChange} required />
                    <textarea name="resumen" placeholder="Resumen" value={nuevoArticulo.resumen} onChange={handleChange} required />
                    <input type="text" name="categorias" placeholder="Categorías (separadas por coma)" value={nuevoArticulo.categorias} onChange={handleChange} required />
                    <input type="text" name="autor" placeholder="Autor" value={nuevoArticulo.autor} onChange={handleChange} required />
                    <input type="number" name="valoracion" placeholder="Valoración (1-5)" value={nuevoArticulo.valoracion} onChange={handleChange} min="1" max="5" required />
                    <input type="text" name="tiempoLectura" placeholder="Tiempo de lectura (Ej: 5 min)" value={nuevoArticulo.tiempoLectura} onChange={handleChange} required />
                    <input type="text" name="imagen" placeholder="URL de imagen (opcional)" value={nuevoArticulo.imagen} onChange={handleChange} />
                    <button type="submit">Subir Artículo</button>
                </form>
            </div>

            {/* Lista de artículos subidos */}
            <div className="articles-container">
                <h2>Artículos Publicados</h2>
                {articulos.map((articulo) => (
                    <div key={articulo.id} className="article">
                        {articulo.imagen && <img src={articulo.imagen} alt={articulo.titulo} />}
                        <div className="article-content">
                            <h3>{articulo.titulo}</h3>
                            <p><strong>Resumen:</strong> {articulo.resumen}</p>
                            <p><strong>Fecha de Publicación:</strong> {articulo.fecha}</p>
                            <p><strong>Categorías:</strong> {articulo.categorias.join(", ")}</p>
                            <p><strong>Autor:</strong> {articulo.autor}</p>
                            <p><strong>Valoración:</strong> {"⭐".repeat(articulo.valoracion)} ({articulo.valoracion}/5)</p>
                            <p><strong>Tiempo de Lectura:</strong> {articulo.tiempoLectura}</p>
                            <button className="read-more">Leer más</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticulosU;
