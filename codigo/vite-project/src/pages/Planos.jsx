// src/pages/Planos.jsx
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/home.css";     // mesmo CSS do layout
import "./styles/planos.css";   // CSS específico dos cards de planos
import logo from "../assets/logomarca(1).png";

const PLANO_MENSAL = { id: "mensal", preco: 49.99, descricao: "Plano Mensal" };
const PLANO_ANUAL  = { id: "anual",  preco: 499.99, descricao: "Plano Anual" };

export default function Planos() {
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  function handleAssinar(plano) {
    localStorage.setItem("plano_escolhido", JSON.stringify(plano));
    // ajuste depois para a rota real de checkout
    navigate("/checkout");
  }

  return (
    <div className="dashboard-container">
      {/* Menu lateral */}
      <aside className="sidebar">
        <img src={logo} alt="Logo do Hotel" className="logo-img" />
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={getLinkClass}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/quartos" className={getLinkClass}>
                Quartos
              </NavLink>
            </li>
            <li>
              <NavLink to="/quartos/cadastrar" className={getLinkClass}>
                Cadastrar Quarto
              </NavLink>
            </li>
            <li>
              <NavLink to="/hospedes" className={getLinkClass}>
                Hóspedes
              </NavLink>
            </li>
            <li>
              <NavLink to="/hospedes/cadastrar" className={getLinkClass}>
                Cadastrar Hóspede
              </NavLink>
            </li>
            <li>
              <NavLink to="/planos" className={getLinkClass}>
                Planos
              </NavLink>
            </li>
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

      {/* Conteúdo da página de Planos */}
      <main className="content">
        <h1>Planos e Preços</h1>
        <p className="subtitle">
          Escolha o plano que melhor se adapta ao seu hotel para utilizar o sistema de gestão.
        </p>

        <div className="page">
          <div className="frame">
            <section className="cards">
              {/* PLANO MENSAL */}
              <article className="plan plan--monthly">
                <div className="plan-inner">
                  <header>
                    <h3 className="plan-title">Plano Mensal</h3>
                    <p className="plan-sub">
                      Duração: <strong>30 Dias</strong>
                    </p>
                  </header>

                  <p className="plan-desc">
                    Ideal para quem quer testar o sistema sem compromisso.
                    Acesse todas as funcionalidades de gestão, reservas,
                    relatórios e suporte técnico.
                  </p>

                  <div className="plan-price">
                    <span className="price-label">Valor:</span>
                    <span className="price-value">
                      R$ <strong>49,99</strong> / Mês
                    </span>
                  </div>

                  <button
                    className="btn-cta"
                    onClick={() => handleAssinar(PLANO_MENSAL)}
                  >
                    ASSINAR
                  </button>
                </div>
              </article>

              {/* PLANO ANUAL */}
              <article className="plan plan--annual">
                <div className="plan-inner">
                  <header>
                    <h3 className="plan-title">Plano Anual</h3>
                    <p className="plan-sub">
                      Duração: <strong>1 Ano</strong>
                    </p>
                  </header>

                  <p className="plan-desc">
                    Economize com o plano anual! Tenha acesso completo ao sistema,
                    atualizações contínuas, suporte prioritário e benefícios
                    exclusivos.
                  </p>

                  <div className="plan-price">
                    <span className="price-label">Valor:</span>
                    <span className="price-value">
                      R$ <strong>499,99</strong> / Ano
                    </span>
                  </div>

                  <button
                    className="btn-cta"
                    onClick={() => handleAssinar(PLANO_ANUAL)}
                  >
                    ASSINAR
                  </button>
                </div>
              </article>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
