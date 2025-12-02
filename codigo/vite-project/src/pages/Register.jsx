// src/pages/Register.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/usuarios/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Erro ao cadastrar");
    }
  }

  return (
    <div>
      <h1>Criar Conta</h1>
      <form onSubmit={handleRegister}>
        <input name="nome" placeholder="Nome" onChange={handleChange} required/>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required/>
        <input name="senha" placeholder="Senha" type="password" onChange={handleChange} required/>
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p>Já tem conta? <Link to="/login">Entrar</Link></p>
    </div>
  );
}
