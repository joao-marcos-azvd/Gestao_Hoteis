// src/pages/CadastrarHospede.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate, NavLink } from "react-router-dom";
import "./styles/cadastrarhospede.css";
import logo from "../assets/logomarca(1).png"; 

export default function CadastrarHospede() {
    const [form, setForm] = useState({ nome: "", cpf: "", telefone: "", email: "", endereco: "" });
    const navigate = useNavigate();

    // Função para aplicar a classe 'active' dinamicamente
    const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

    function change(e) { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
    }

    async function submit(e) {
        e.preventDefault();
        try {
            await api.post("/hospede/", form);
            alert("Hóspede cadastrado com sucesso!");
            navigate("/hospedes");
        } catch (err) {
            alert("Erro ao cadastrar hóspede: " + (err.response?.data?.detail || err.message));
        }
    }

    return (
        <div className="dashboard-container">
            {/* 1. MENU LATERAL (SIDEBAR) - CORRIGIDO COM `end` */}
            <aside className="sidebar">
                <img src={logo} alt="Logo do Hotel" className="logo-img" />
                <nav>
                    <ul>
                        {/* Links que devem ter CORRESPONDÊNCIA EXATA (`end`) */}
                        <li><NavLink to="/" className={getLinkClass} end>Início</NavLink></li> 
                        <li><NavLink to="/quartos" className={getLinkClass} end>Quartos</NavLink></li>
                        
                        {/* Links que são SUB-ROTAS (sem `end`) */}
                        <li><NavLink to="/quartos/cadastrar" className={getLinkClass}>Cadastrar Quarto</NavLink></li>
                        
                        {/* Hóspedes: Adicionamos `end` */}
                        <li><NavLink to="/hospedes" className={getLinkClass} end>Hóspedes</NavLink></li>
                        
                        {/* Cadastrar Hóspede: Agora, este será o único ativo em /hospedes/cadastrar */}
                        <li><NavLink to="/hospedes/cadastrar" className={getLinkClass}>Cadastrar Hóspede</NavLink></li>
                        
                        <li><NavLink to="/planos" className={getLinkClass} end>Planos</NavLink></li>
                    </ul>
                </nav>
            </aside>

            {/* 2. CONTEÚDO PRINCIPAL COM FORMULÁRIO */}
            <main className="content">
                <header className="page-header">
                    <h1>Cadastro de Novo Hóspede</h1>
                    <p className="subtitle">Insira os dados pessoais e de contato do novo hóspede.</p>
                </header>
                
                <form onSubmit={submit} className="form-layout">
                    
                    <div className="fields">
                        <div className="row">
                            
                            {/* Nome */}
                            <div className="field">
                                <label htmlFor="nome">Nome Completo</label>
                                <input id="nome" name="nome" type="text" placeholder="João da Silva" onChange={change} required />
                            </div>
                            
                            {/* CPF */}
                            <div className="field">
                                <label htmlFor="cpf">CPF (apenas números)</label>
                                <input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" onChange={change} required />
                            </div>
                        </div> {/* Fim da Row */}

                        <div className="row">
                            
                            {/* Telefone */}
                            <div className="field">
                                <label htmlFor="telefone">Telefone</label>
                                <input id="telefone" name="telefone" type="text" placeholder="(99) 99999-9999" onChange={change} />
                            </div>

                            {/* E-mail */}
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input id="email" name="email" type="email" placeholder="email@exemplo.com" onChange={change} />
                            </div>
                        </div> {/* Fim da Row */}

                        {/* Endereço (Full Width) */}
                        <div className="field full-width">
                            <label htmlFor="endereco" className="label-full">Endereço Completo</label>
                            <textarea 
                                id="endereco" 
                                name="endereco" 
                                placeholder="Rua, número, bairro, cidade e estado." 
                                onChange={change}
                            />
                        </div>

                    </div> {/* Fim Fields */}
                    
                    {/* Ações do Formulário */}
                    <div className="form-actions">
                        <button type="submit" className="btn add">Cadastrar Hóspede</button>
                    </div>

                </form>
            </main>
        </div>
    );
}