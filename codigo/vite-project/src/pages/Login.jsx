// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const resp = await api.post("/usuarios/login", null, {
        params: { email, senha } // o backend espera query params neste projeto
      });
      const token = resp.data.access_token;
      localStorage.setItem("token", token);
      // opcional: salvar dados do usuário
      localStorage.setItem("user", JSON.stringify(resp.data.user));
      nav("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Erro ao logar");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha</label><br/>
          <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
        {error && <p style={{color:"red"}}>{error}</p>}
      </form>
    </div>
  );
}
