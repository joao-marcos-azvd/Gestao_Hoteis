// src/pages/Login.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    try {
      const response = await api.post(
        "/usuarios/login",
        new URLSearchParams({
          username: email,
          password: senha,
        })
      );

      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (err) {
      setErro(err.response?.data?.detail || "Email ou senha incorretos");
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{color:"red"}}>{erro}</p>}
      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  );
}
