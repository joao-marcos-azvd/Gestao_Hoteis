// src/pages/Home.jsx
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/home.css";
import logo from "../assets/logomarca(1).png";

export default function Home() {
    const navigate = useNavigate();

    const getLinkClass = ({ isActive }) =>
        isActive ? "link-item active" : "link-item";

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">

            {/* MENU LATERAL */}
            <aside className="sidebar">
                <img src={logo} alt="Logo do Hotel" className="logo-img" />

                <nav>
                    <ul>

                        {/* Início */}
                        <li>
                            <NavLink to="/" className={getLinkClass}>
                                Início
                            </NavLink>
                        </li>

                        {/* QUARTOS */}
                        <li>
                            <NavLink to="/quartos" className={getLinkClass}>
                                Quartos
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/quartos/cadastrar"
                                className={getLinkClass}
                            >
                                Cadastrar Quarto
                            </NavLink>
                        </li>

                        {/* HÓSPEDES */}
                        <li>
                            <NavLink to="/hospedes" className={getLinkClass}>
                                Hóspedes
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/hospedes/cadastrar"
                                className={getLinkClass}
                            >
                                Cadastrar Hóspede
                            </NavLink>
                        </li>

                        {/* RESERVAS */}
                        <li>
                            <NavLink to="/reservas" className={getLinkClass}>
                                Reservas
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/reservas/cadastrar"
                                className={getLinkClass}
                            >
                                Cadastrar Reserva
                            </NavLink>
                        </li>


                        {/* SAIR */}
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

            {/* CONTEÚDO PRINCIPAL */}
            <main className="content">
                <h1>Painel de Gestão</h1>
                <p className="subtitle">
                    Visão geral das operações do hotel. Escolha uma área para
                    começar.
                </p>

                <div className="cards">

                    <NavLink to="/quartos" className="card">
                        <span className="card-title">Gerenciar Quartos</span>
                        <span className="card-subtitle">
                            Cadastre, edite e acompanhe a disponibilidade de
                            todos os quartos do hotel.
                        </span>
                        <span className="card-link-text">
                            Acessar Quartos →
                        </span>
                    </NavLink>

                    <NavLink to="/hospedes" className="card">
                        <span className="card-title">Gerenciar Hóspedes</span>
                        <span className="card-subtitle">
                            Visualize o cadastro completo de hóspedes e o
                            histórico de hospedagens.
                        </span>
                        <span className="card-link-text">
                            Acessar Hóspedes →
                        </span>
                    </NavLink>

                    <NavLink to="/reservas" className="card">
                        <span className="card-title">Gerenciar Reservas</span>
                        <span className="card-subtitle">
                            Confira, registre e acompanhe as reservas do hotel.
                        </span>
                        <span className="card-link-text">
                            Acessar Reservas →
                        </span>
                    </NavLink>

                </div>
            </main>
        </div>
    );
}
