import "./styles/inicial.css";

export default function Inicial() {
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

        <section className="initial-grid">
          {/* FOTO */}
          <div className="photo-box">
            <div className="photo-inner">
              <img
                src="https://via.placeholder.com/120x80?text=Placeholder"
                alt="Placeholder"
              />
              <div className="photo-text">FOTO</div>
              <label className="upload-btn">
                <input type="file" accept="image/*" style={{ display: "none" }} />
                ⤓
              </label>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <div className="initial-fields">
            <div className="row">
              <div className="field">
                <label htmlFor="numero">Nº Quarto</label>
                <input id="numero" type="number" placeholder="1" defaultValue="1" />
              </div>

              <div className="field">
                <label htmlFor="tipo">Tipo</label>
                <select id="tipo" defaultValue="Standard Casal">
                  <option>Standard Casal</option>
                  <option>Standard Individual</option>
                  <option>Suíte Executiva</option>
                </select>
              </div>

              <div className="field valor">
                <label htmlFor="valor">Valor</label>
                <div className="currency">
                  <span className="currency-symbol">R$</span>
                  <input
                    id="valor"
                    type="number"
                    placeholder="150.00"
                    defaultValue="150.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="status">Status</label>
                <select id="status" defaultValue="Disponível">
                  <option>Disponível</option>
                  <option>Ocupado</option>
                  <option>Manutenção</option>
                </select>
              </div>
            </div>

            <div className="row">
              <label htmlFor="descricao" className="label-full">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows="5"
                placeholder="Descrição do quarto..."
              ></textarea>
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
              <button className="btn add">Alterar</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
