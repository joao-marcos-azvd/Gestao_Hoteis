// src/pages/ListarQuartos.jsx
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; 
import api from "../api/api"; // Assumindo que você tem um arquivo api.js/api.jsx configurado
import "./styles/listarquartos.css";
import logo from "../assets/logomarca(1).png"; // Ajuste o caminho conforme sua estrutura

export default function ListarQuartos() {
    const [quartos, setQuartos] = useState([]);
    const navigate = useNavigate();

    // Lógica do Menu
    const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

    const handleLogout = () => {
        // Limpa o token de autenticação
        localStorage.removeItem('authToken'); 
        // Redireciona o usuário para a tela de login
        navigate('/login'); 
    };

    // Lógica de Carregamento de Dados
    async function load() {
        try {
            const res = await api.get("/quartos");
            setQuartos(res.data);
        } catch (err) {
            console.error("Erro ao carregar quartos", err);
        }
    }

    useEffect(() => { load(); }, []);

    // Lógica de Exclusão
    async function handleDelete(id) {
        if (!confirm("Excluir este quarto?")) return;
        try {
            await api.delete(`/quartos/${id}`);
            setQuartos(quartos.filter(q => q.id !== id));
        } catch (err) {
            alert("Erro ao excluir quarto");
        }
    }

    return (
        <div className="dashboard-container">
            
            {/* Menu Lateral (Sidebar) */}
            <aside className="sidebar">
                <img src={logo} alt="Logo do Hotel" className="logo-img" />
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={getLinkClass}>Início</NavLink>
                        </li> 
                        <li>
                            <NavLink to="/quartos" className={getLinkClass}>Quartos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/quartos/cadastrar" className={getLinkClass}>Cadastrar Quarto</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hospedes" className={getLinkClass}>Hóspedes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hospedes/cadastrar" className={getLinkClass}>Cadastrar Hóspede</NavLink>
                        </li>
                        <li>
                            <NavLink to="/planos" className={getLinkClass}>Planos</NavLink>
                        </li>
                        {/* Item de Logout */}
                        
                    </ul>
                </nav>
            </aside>
            {/* Fim do Menu Lateral */}

            {/* Conteúdo Principal */}
            <main className="content">
                <h1>Quartos do Hotel</h1>
                <p className="subtitle">Gerencie a disponibilidade, detalhes e cadastro dos quartos.</p>

                <section className="controls">
                    <div className="search">
                        <input placeholder="Pesquisar por número, tipo ou status..." />
                    </div>
                    <button className="btn add" onClick={() => navigate("/quartos/cadastrar")}>+ NOVO QUARTO</button>
                </section>

                <section className="list">
                    {quartos.length === 0 ? (
                        <p className="empty-state">Nenhum quarto encontrado.</p>
                    ) : (
                        quartos.map((quarto) => (
                            <article key={quarto.id} className="card">
                                
                                <div className="card-body">
                                    <div className="card-header">
                                        <h3 className="room-title">Quarto {quarto.numero}</h3>
                                        <span className="room-type-tag">{quarto.tipo || 'Padrão'}</span>
                                    </div>
                                    
                                    <p className="room-desc">{quarto.recursos || "Nenhuma descrição ou recurso fornecido."}</p>
                                    
                                    <div className="card-footer">
                                        <div className="meta-row">
                                            <span className={`badge ${quarto.status?.toLowerCase()}`}>{quarto.status || 'Indefinido'}</span>
                                            
                                            <div className="price-display">
                                                <span>Diária</span> 
                                                <strong>R$ {quarto.preco_diaria?.toFixed(2) || '0.00'}</strong>
                                            </div>
                                        </div>

                                        <div className="card-actions">
                                            
                                            <div className="icons">
                                                <button className="icon" title="Excluir" onClick={() => handleDelete(quarto.id)}>🗑️</button>
                                                <button className="icon" title="Editar" onClick={() => navigate(`/quartos/editar/${quarto.id}`)}>✏️</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </main>
            {/* Fim do Conteúdo Principal */}
        </div>
    );
}