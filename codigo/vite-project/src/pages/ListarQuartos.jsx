<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Lista de Quartos — Checkin</title>
  <link rel="stylesheet" href="listaquartos.css" />
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="logo">LOGO</div>
      <nav class="nav">
        <a href="#">HOME</a>
        <a href="#">QUARTOS</a>
        <a href="#">HÓSPEDES</a>
      </nav>
      <button class="btn small outline">ENTRAR</button>
    </div>
  </header>

  <main class="page">
    <section class="hero">
      <h2 class="hero-title">CABEÇALHO DE APRESENTAÇÃO DA PÁGINA</h2>
    </section>

    <section class="controls">
      <div class="search">
        <input type="search" placeholder="Pesquisar" aria-label="Pesquisar" />
        <button class="search-btn" aria-label="Pesquisar">🔍</button>
      </div>
      <button class="btn new">+ NOVO</button>
    </section>

    <section class="list">
      <!-- Card 1 -->
      <article class="card">
        <div class="card-photo">FOTO</div>
        <div class="card-body">
          <div class="card-info">
            <h3 class="room-title">Quarto 105 – Standard Individual</h3>
            <p class="room-desc">
              Aconchegante, com cama de solteiro, ar-condicionado, Wi-Fi gratuito e mesa de trabalho. Ideal para estadias rápidas.
            </p>
            <div class="meta-row">
              <div class="status"><span class="badge occupied">Ocupado</span></div>
              <div class="price">Preço: <strong>R$ 150,00 / diária</strong></div>
            </div>
          </div>

          <div class="card-actions">
            <div class="icons">
              <button class="icon" title="Excluir">🗑️</button>
              <button class="icon" title="Editar">✏️</button>
            </div>
            <button class="btn outline details">DETALHES</button>
          </div>
        </div>
      </article>

      <!-- Card 2 -->
      <article class="card">
        <div class="card-photo">FOTO</div>
        <div class="card-body">
          <div class="card-info">
            <h3 class="room-title">Quarto 203 – Suíte Executiva Casal</h3>
            <p class="room-desc">
              Amplo e confortável, com cama queen-size, ar-condicionado, Wi-Fi, TV a cabo e frigobar. Ideal para estadias de negócios ou lazer.
            </p>
            <div class="meta-row">
              <div class="status"><span class="badge available">Disponível</span></div>
              <div class="price">Preço: <strong>R$ 280,00 / diária</strong></div>
            </div>
          </div>

          <div class="card-actions">
            <div class="icons">
              <button class="icon" title="Excluir">🗑️</button>
              <button class="icon" title="Editar">✏️</button>
            </div>
            <button class="btn outline details">DETALHES</button>
          </div>
        </div>
      </article>

      <!-- Repita os cards conforme necessário -->
    </section>
  </main>
</body>
</html>
