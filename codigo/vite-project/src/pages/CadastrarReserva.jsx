// src/pages/CadastrarReserva.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./styles/reservas.css";
import logo from "../assets/logomarca(1).png";

export default function CadastrarReserva() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        hospede_id: "",
        quarto_id: "",
        data_entrada: "",
        data_saida: "",
    });

    const getLinkClass = ({ isActive }) =>
        isActive ? "link-item active" : "link-item";

    // ====== FUNÇÃO DE LOGOUT PADRÃO ======
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    function change(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function submit(e) {
        e.preventDefault();

        try {
            await api.post("/reservas/", form);
            alert("Reserva cadastrada com sucesso!");
            navigate("/reservas");
        } catch (error) {
            alert("Erro ao cadastrar reserva.");
        }
    }

    return (
        <div className="dashboard-container">

            {/* 1. MENU LATERAL - PADRÃO */}
            <aside className="sidebar">
                <img src={logo} className="logo-img" alt="Logo" />
                <nav>
                    <ul>
                        {/* Links que devem ter CORRESPONDÊNCIA EXATA (`end`) */}
                        <li><NavLink to="/" className={getLinkClass} end>Início</NavLink></li>
                        
                        <li><NavLink to="/quartos" className={getLinkClass} end>Quartos</NavLink></li>
                        {/* Links que são SUB-ROTAS (sem `end`) */}
                        <li><NavLink to="/quartos/cadastrar" className={getLinkClass}>Cadastrar Quarto</NavLink></li>

                        <li><NavLink to="/hospedes" className={getLinkClass} end>Hóspedes</NavLink></li>
                        <li><NavLink to="/hospedes/cadastrar" className={getLinkClass}>Cadastrar Hóspede</NavLink></li>

                        <li><NavLink to="/reservas" className={getLinkClass} end>Reservas</NavLink></li>
                        <li><NavLink to="/reservas/cadastrar" className={getLinkClass}>Cadastrar Reserva</NavLink></li>

                        {/* Sair - mantém o mesmo estilo */}
                        <li>
                            <button
                                className="link-item logout-link"
                                onClick={handleLogout}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                }}
                            >
                                Sair
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* 2. CONTEÚDO PRINCIPAL */}
            <main className="content">
                <header className="page-header">
                    <h1>Cadastrar Reserva</h1>
                    <p className="subtitle">Informe os dados necessários para registrar a reserva.</p>
                </header>

                <form className="form-layout" onSubmit={submit}>

                    <div className="fields">

                        {/* HÓSPEDE E QUARTO */}
                        <div className="row">
                            <div className="field">
                                <label htmlFor="hospede_id">ID do Hóspede</label>
                                <input
                                    type="number"
                                    id="hospede_id"
                                    name="hospede_id"
                                    placeholder="Ex: 1"
                                    value={form.hospede_id}
                                    onChange={change}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="quarto_id">ID do Quarto</label>
                                <input
                                    type="number"
                                    id="quarto_id"
                                    name="quarto_id"
                                    placeholder="Ex: 101"
                                    value={form.quarto_id}
                                    onChange={change}
                                    required
                                />
                            </div>
                        </div>

                        {/* DATAS MELHORADAS */}
                        <div className="row">
                            <div className="field">
                                <label htmlFor="data_entrada">Data de Entrada</label>
                                <div className="date-wrapper">
                                    <input
                                        type="date"
                                        id="data_entrada"
                                        name="data_entrada"
                                        value={form.data_entrada}
                                        onChange={change}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="data_saida">Data de Saída</label>
                                <div className="date-wrapper">
                                    <input
                                        type="date"
                                        id="data_saida"
                                        name="data_saida"
                                        value={form.data_saida}
                                        onChange={change}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn add">Cadastrar Reserva</button>
                    </div>
                </form>

            </main>
        </div>
    );
}