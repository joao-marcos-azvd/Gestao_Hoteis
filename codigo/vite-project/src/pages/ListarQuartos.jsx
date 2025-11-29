// ✅ IMPORT CSS NO INÍCIO (NO TOPO do arquivo)
import "./styles/listarquartos.css";

export default function ListarQuartos() {
  const quartos = [
    { 
      id: 1, 
      numero: '105', 
      tipo: 'Standard Individual',
      desc: 'Aconchegante, com cama de solteiro, ar-condicionado, Wi-Fi gratuito e mesa de trabalho. Ideal para estadias rápidas.',
      status: 'occupied',
      preco: '150,00'
    },
    { 
      id: 2, 
      numero: '203', 
      tipo: 'Suíte Executiva Casal',
      desc: 'Amplo e confortável, com cama queen-size, ar-condicionado, Wi-Fi, TV a cabo e frigobar. Ideal para estadias de negócios ou lazer.',
      status: 'available',
      preco: '280,00'
    }
  ];

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

        <section className="controls">
          <div className="search">
            <input type="search" placeholder="Pesquisar" aria-label="Pesquisar" />
            <button className="search-btn" aria-label="Pesquisar">🔍</button>
          </div>
          <button className="btn new">+ NOVO</button>
        </section>

        <section className="list">
          {quartos.map((quarto) => (
            <article key={quarto.id} className="card">
              <div className="card-photo">FOTO</div>
              <div className="card-body">
                <div className="card-info">
                  <h3 className="room-title">Quarto {quarto.numero} – {quarto.tipo}</h3>
                  <p className="room-desc">{quarto.desc}</p>
                  <div className="meta-row">
                    <div className="status">
                      <span className={`badge ${quarto.status}`}>
                        {quarto.status === 'occupied' ? 'Ocupado' : 'Disponível'}
                      </span>
                    </div>
                    <div className="price">
                      Preço: <strong>R$ {quarto.preco} / diária</strong>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <div className="icons">
                    <button className="icon" title="Excluir">🗑️</button>
                    <button className="icon" title="Editar">✏️</button>
                  </div>
                  <button className="btn outline details">DETALHES</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
