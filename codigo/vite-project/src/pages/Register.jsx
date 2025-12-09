// src/pages/Register.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./styles/cadastro.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    cpf: "",
    cnpj: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);

    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await api.post("/usuarios/register", {
        nome: form.email.split("@")[0], // nome padrão
        email: form.email,
        senha: form.senha,
        cnpj: form.cnpj,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Erro ao cadastrar");
    }
  }

  return (
    <div className="register-page">
      <section className="register-left">
        <div className="hero-overlay" />
      </section>

      <section className="register-right">
        <div className="register-container">
          <div className="register-card">
            <h1 className="register-title">Cadastro</h1>

            <form onSubmit={handleRegister}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF (opcional)</label>
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="Digite seu CPF"
                    value={form.cpf}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cnpj">CNPJ</label>
                  <input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    placeholder="Digite seu CNPJ"
                    value={form.cnpj}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="senha">SENHA</label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={form.senha}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmarSenha">CONFIRMAR SENHA</label>
                  <input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-register">
                CADASTRAR-SE
              </button>

              {error && <p className="register-error">{error}</p>}
            </form>

            <p className="login-link">
              Já tenho conta  
              <Link to="/login"> entrar</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}