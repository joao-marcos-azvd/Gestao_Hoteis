import "./styles/cadastro.css";  // ✅ CORRETO

export default function Cadastro() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">LOGO</div>
          <nav className="nav">
            <a href="#">HOME</a>
            <a href="#">QUARTOS</a>
            <a href="#" className="active">HÓSPEDES</a>
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
            {/* Foto do Hóspede */}
            <div className="photo-box">
              <div className="photo-inner">
                <img src="placeholder-photo.png" alt="Foto do hóspede" />
                <div className="photo-text">FOTO</div>
                <label className="upload-btn" htmlFor="foto-hospede">
                  <input id="foto-hospede" type="file" accept="image/*" style={{display: 'none'}} />
                  ⤓
                </label>
              </div>
            </div>

            {/* Campos do formulário */}
            <div className="fields">
              <div className="row">
                <div className="field">
                  <label htmlFor="nome">Nome Completo</label>
                  <input id="nome" type="text" placeholder="José da Silva" />
                </div>

                <div className="field">
                  <label htmlFor="cpf">CPF</label>
                  <input id="cpf" type="text" placeholder="123.456.789-00" />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label htmlFor="telefone">Telefone</label>
                  <input id="telefone" type="tel" placeholder="(84) 99999-9999" />
                </div>

                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" placeholder="exemplo@email.com" />
                </div>
              </div>

              <div className="row">
                <label htmlFor="endereco" className="label-full">Endereço Completo</label>
                <textarea id="endereco" rows="3" placeholder="Rua Exemplo, N° 123, Bairro..."></textarea>
              </div>

              <div className="form-actions">
                <button className="btn add">Cadastrar Hóspede</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
