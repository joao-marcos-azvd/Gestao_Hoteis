// src/pages/Login.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState(""); // opcional, não usado no login
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
          username: email, // backend exige username=email
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
    <div className="login-page">
      <section className="login-left">
        <div className="login-card">
          <h1 className="login-title">Login</h1>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                id="cnpj"
                type="text"
                placeholder="Digite seu CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">SENHA</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-login">
              ENTRAR
            </button>

            {erro && <p className="login-error">{erro}</p>}
          </form>

          <p className="signup-text">
            Não tem conta?  
            <Link to="/register"> cadastre-se</Link>
          </p>
        </div>
      </section>

      <section className="login-right">
        <div className="hero-overlay" />
      </section>
    </div>
  );
}
