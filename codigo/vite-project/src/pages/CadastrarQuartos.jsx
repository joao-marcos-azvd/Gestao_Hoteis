import "./styles/cadastrarquartos.css";  // ✅ CORRETO

export default function CadastrarQuartos() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">LOGO</div>
          <nav className="nav">
            <a href="#">HOME</a>
            <a href="#">QUARTOS</a>
            <a href="#">HÓSPEDES</a>
          </nav>
          <button className="btn small outline">ENTRAR</button>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <h2 className="hero-title">CABEÇALHO DE APRESENTAÇÃO DA PÁGINA</h2>
        </section>

        <section className="form-card">
          <div className="form-grid">
            {/* Foto / Upload */}
            <div className="photo-box">
              <div className="photo-inner">
                <img src="placeholder-photo.png" alt="Placeholder" />
                <div className="photo-text">FOTO</div>
              </div>
            </div>

            {/* Campos do formulário */}
            <div className="fields">
              <div className="row">
                <div className="field">
                  <label htmlFor="numero">Nº Quarto</label>
                  <input id="numero" type="number" placeholder="1" />
                </div>

                <div className="field">
                  <label htmlFor="tipo">Tipo</label>
                  <select id="tipo">
                    <option>Standard Individual</option>
                    <option>Standard Casal</option>
                    <option>Suíte Executiva</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="valor">Valor</label>
                  <div className="currency">
                    <span className="currency-symbol">R$</span>
                    <input id="valor" type="number" placeholder="150.00" step="0.01" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="status">Status</label>
                  <select id="status">
                    <option>Disponível</option>
                    <option>Ocupado</option>
                    <option>Manutenção</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <label htmlFor="descricao" className="label-full">Descrição</label>
                <textarea id="descricao" rows="5" placeholder="Descrição do quarto..."></textarea>
              </div>

              <div className="amenities">
                <label className="amenity">
                  <input type="checkbox" /> Café da manhã
                </label>
                <label className="amenity">
                  <input type="checkbox" /> WI-FI
                </label>
                <label className="amenity">
                  <input type="checkbox" /> Serviço de quarto
                </label>
                <label className="amenity">
                  <input type="checkbox" /> Frigobar
                </label>
                <label className="amenity">
                  <input type="checkbox" /> TV
                </label>
              </div>

              <div className="form-actions">
                <button className="btn add">Adicionar</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
