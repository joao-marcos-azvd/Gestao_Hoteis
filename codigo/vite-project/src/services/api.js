// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // ajuste se seu FastAPI roda em outra porta
});

// Interceptor para adicionar token automaticamente (se existir)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
