// src/utils/apiNegocio.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/alepirea/api/negocio/',
  withCredentials: true          // cookies / sesión si las usas
});

export default api;
