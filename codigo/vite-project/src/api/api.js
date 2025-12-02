// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // ajuste se necessário
});

// Interceptor adiciona o Authorization automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
