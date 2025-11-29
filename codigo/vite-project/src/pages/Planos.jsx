export default function Planos() {
  return (
    <div className="page">
      <section className="hero">
        <h2 className="hero-title">Planos e Preços</h2>
      </section>
      <section className="cards">
        <div className="plan plan--monthly">
          <div className="plan-inner">
            <h3 className="plan-title">Mensal <span>Ideal para testes</span></h3>
            <p className="plan-desc">Acesso completo por 30 dias</p>
            <div className="plan-price">
              <span className="price-label">R$</span>
              <span className="price-value">
                <strong>49</strong>/mês
              </span>
            </div>
            <button className="btn-cta">Escolher Plano</button>
          </div>
        </div>
        
        <div className="plan plan--annual">
          <div className="plan-inner">
            <h3 className="plan-title">Anual <span>Mais econômico</span></h3>
            <p className="plan-desc">Economize 20% com pagamento anual</p>
            <div className="plan-price">
              <span className="price-label">R$</span>
              <span className="price-value">
                <strong>399</strong>/ano
              </span>
            </div>
            <button className="btn-cta">Escolher Plano</button>
          </div>
        </div>
      </section>
    </div>
  );
}
