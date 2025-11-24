// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./styles/Login.css"; // importa o CSS

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const resp = await api.post("/usuarios/login", null, {
        params: { email, senha }
      });
      const token = resp.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(resp.data.user));
      nav("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Erro ao logar");
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}