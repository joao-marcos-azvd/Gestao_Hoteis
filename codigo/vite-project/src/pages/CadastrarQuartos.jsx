// src/pages/CadastrarQuartos.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./styles/cadastrarquartos.css";

export default function CadastrarQuartos() {
  const [dados, setDados] = useState({
    numero: "", capacidade: "", tipo: "", preco_diaria: "", status: "disponível", recursos: ""
  });
  const navigate = useNavigate();

  function handleChange(e) { setDados({ ...dados, [e.target.name]: e.target.value }); }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/quartos/", {
        numero: Number(dados.numero),
        capacidade: Number(dados.capacidade),
        tipo: dados.tipo,
        preco_diaria: Number(dados.preco_diaria),
        status: dados.status,
        recursos: dados.recursos,
      });
      alert("Quarto cadastrado!");
      navigate("/quartos");
    } catch (err) {
      alert("Erro ao cadastrar quarto: " + (err.response?.data?.detail || err.message));
    }
  }

  return (
    <div>
      <h1>Cadastrar Quarto</h1>
      <form onSubmit={handleSubmit}>
        <input name="numero" placeholder="Número" onChange={handleChange} required />
        <input name="capacidade" placeholder="Capacidade" onChange={handleChange} required />
        <input name="tipo" placeholder="Tipo" onChange={handleChange} required />
        <input name="preco_diaria" placeholder="Preço" onChange={handleChange} required />
        <input name="recursos" placeholder="Recursos" onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
