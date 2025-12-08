import { NavLink, useNavigate } from "react-router-dom"; // Importa NavLink e useNavigate
import "./styles/home.css";
import logo from "../assets/logomarca(1).png"; 

export default function Home() {
    // Hook para navegação programática
    const navigate = useNavigate(); 
    
    // Função para aplicar a classe 'active' dinamicamente
    const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

    // Função para realizar o Logout
    const handleLogout = () => {
        // 1. Limpa o token de autenticação (Chave 'authToken' é um exemplo comum)
        localStorage.removeItem('authToken'); 
        
        // 2. Redireciona o usuário para a tela de login/inicial
        navigate('/login'); // Ajuste o caminho para a sua rota de Login
    };

    return (
        <div className="dashboard-container">

            {/* Menu lateral */}
            <aside className="sidebar">
                <img src={logo} alt="Logo do Hotel" className="logo-img" />
                <nav>
                    <ul>
                        <li>
                            {/* Início */}
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
                       
                        {/* NOVO: Item de Logout */}
                        <li>
                            <button 
                                className="link-item logout-link"
                                onClick={handleLogout}
                                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                            >
                                Sair
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Conteúdo */}
            <main className="content">
                
                <h1>Painel de Gestão</h1>
                <p className="subtitle">Visão geral das operações do hotel. Escolha uma área para começar.</p>

                <div className="cards">
                    
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
                    
                  
                    
                </div>
            </main>
        </div>
    );
}