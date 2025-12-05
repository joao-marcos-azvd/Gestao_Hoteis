import { NavLink } from "react-router-dom"; // 👈 MUDANÇA: Troca de Link por NavLink
import "./styles/home.css";
import logo from "../assets/logomarca(1).png"; 

export default function Home() {
    // Função para aplicar a classe 'active' dinamicamente
    const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

    return (
        <div className="dashboard-container">

            {/* Menu lateral */}
            <aside className="sidebar">
                <img src={logo} alt="Logo do Hotel" className="logo-img" />
                <nav>
                    <ul>
                        <li>
                            {/* Início: Se a rota for "/", a classe 'active' será adicionada */}
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
                    </ul>
                </nav>
            </aside>

            {/* Conteúdo */}
            <main className="content">
                
                {/* NOME MELHORADO: Painel de Gestão */}
                <h1>Painel de Gestão</h1>
                <p className="subtitle">Visão geral das operações do hotel. Escolha uma área para começar.</p>

                <div className="cards">
                    
                    {/* Os cards de navegação continuam usando Link para a navegação interna */}
                    <NavLink to="/quartos" className="card">
                        <span className="card-title">Gerenciar Quartos</span>
                        <span className="card-subtitle">Cadastre, edite e acompanhe a disponibilidade de todos os quartos do hotel.</span>
                        <span className="card-link-text">Acessar Quartos →</span>
                    </NavLink>
                    
                    <NavLink to="/hospedes" className="card">
                        <span className="card-title">Gerenciar Hóspedes</span>
                        <span className="card-subtitle">Visualize o cadastro completo de hóspedes e o histórico de hospedagens.</span>
                        <span className="card-link-text">Acessar Hóspedes →</span>
                    </NavLink>
                    
                    <NavLink to="/planos" className="card">
                        <span className="card-title">Planos e Serviços</span>
                        <span className="card-subtitle">Configure planos de tarifas e adicione novos serviços para os hóspedes.</span>
                        <span className="card-link-text">Acessar Planos →</span>
                    </NavLink>
                    
                </div>
            </main>
        </div>
    );
}