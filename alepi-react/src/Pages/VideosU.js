import React, { useState } from 'react';
import './VideosU.css';

const VideosU = () => {
    const [videos, setVideos] = useState([]);
    const [videoPreview, setVideoPreview] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        categoria: '',
        subcategoria: '',
        descripcion: '',
        duracion: '',
        fechaPublicacion: '',
        ponente: '',
        tags: '',
        enlace: '',
        videoURL: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoPreview(videoURL);
            setFormData({ ...formData, videoURL });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.videoURL) {
            alert('Por favor, selecciona un video antes de subirlo.');
            return;
        }

        setVideos([formData, ...videos]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);

        setFormData({
            titulo: '',
            categoria: '',
            subcategoria: '',
            descripcion: '',
            duracion: '',
            fechaPublicacion: '',
            ponente: '',
            tags: '',
            enlace: '',
            videoURL: null,
        });
        setVideoPreview(null);
    };

    return (
        <div className="videosU-wrapper">
            <div className="videosU-container">
                <h2>🎥 Subir Video</h2>
                {uploadSuccess && <div className="success-message">✅ Video subido exitosamente</div>}

                <form className="video-form" onSubmit={handleSubmit}>
                    <input type="text" name="titulo" placeholder="Título del Video" value={formData.titulo} onChange={handleChange} required />

                    <div className="select-group">
                        <select name="categoria" value={formData.categoria} onChange={handleChange} required>
                            <option value="">Selecciona una Categoría</option>
                            <option value="Civil">Civil</option>
                            <option value="Penal">Penal</option>
                            <option value="Laboral">Laboral</option>
                            <option value="Corporativo">Corporativo</option>
                        </select>
                        <input type="text" name="subcategoria" placeholder="Subcategoría" value={formData.subcategoria} onChange={handleChange} required />
                    </div>

                    <textarea name="descripcion" placeholder="Descripción breve" value={formData.descripcion} onChange={handleChange} required />
                    <input type="text" name="duracion" placeholder="Duración (Ej: 15 min)" value={formData.duracion} onChange={handleChange} required />
                    <input type="date" name="fechaPublicacion" value={formData.fechaPublicacion} onChange={handleChange} required />
                    <input type="text" name="ponente" placeholder="Ponente" value={formData.ponente} onChange={handleChange} required />
                    <input type="text" name="tags" placeholder="Tags o Palabras Clave" value={formData.tags} onChange={handleChange} required />
                    <input type="text" name="enlace" placeholder="Enlace a más información (opcional)" value={formData.enlace} onChange={handleChange} />

                    <label className="upload-label">Seleccionar Video
                        <input type="file" className="upload-input" accept="video/*" onChange={handleVideoUpload} />
                    </label>

                    {videoPreview && (
                        <div className="video-preview">
                            <h3>Vista previa:</h3>
                            <video controls>
                                <source src={videoPreview} type="video/mp4" />
                                Tu navegador no soporta videos.
                            </video>
                        </div>
                    )}

                    <button type="submit" className="upload-button">Subir Video</button>
                </form>

                <h2 className="subidos-titulo">📂 Videos Subidos</h2>
                <div className="video-list">
                    {videos.map((video, index) => (
                        <div key={index} className="video-item">
                            <h3>{video.titulo}</h3>
                            <p><strong>Categoría:</strong> {video.categoria} - {video.subcategoria}</p>
                            <p><strong>Descripción:</strong> {video.descripcion}</p>
                            <p><strong>Duración:</strong> {video.duracion}</p>
                            <p><strong>Fecha:</strong> {video.fechaPublicacion}</p>
                            <p><strong>Ponente:</strong> {video.ponente}</p>
                            <p><strong>Tags:</strong> {video.tags}</p>
                            {video.enlace && (
                                <p><strong>Más info:</strong> <a href={video.enlace} target="_blank" rel="noreferrer">Ver aquí</a></p>
                            )}
                            <video controls>
                                <source src={video.videoURL} type="video/mp4" />
                                Tu navegador no soporta video.
                            </video>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideosU;
