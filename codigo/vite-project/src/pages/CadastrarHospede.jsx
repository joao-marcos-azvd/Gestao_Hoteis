// src/pages/CadastrarHospede.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./styles/cadastro.css";

export default function CadastrarHospede() {
  const [form, setForm] = useState({ nome: "", cpf: "", telefone: "", email: "", endereco: "" });
  const navigate = useNavigate();

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/hospede/", form);
      alert("Hóspede cadastrado");
      navigate("/hospedes");
    } catch (err) {
      alert("Erro ao cadastrar hóspede");
    }
  }

  return (
    <div>
      <h1>Cadastrar Hóspede</h1>
      <form onSubmit={submit}>
        <input name="nome" placeholder="Nome Completo" onChange={change} required />
        <input name="cpf" placeholder="CPF" onChange={change} required />
        <input name="telefone" placeholder="Telefone" onChange={change} />
        <input name="email" placeholder="E-mail" onChange={change} />
        <textarea name="endereco" placeholder="Endereço" onChange={change} />
        <button type="submit">Cadastrar Hóspede</button>
      </form>
    </div>
  );
}
