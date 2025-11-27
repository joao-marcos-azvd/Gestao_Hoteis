<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Cadastro de Quarto — Checkin</title>
  <link rel="stylesheet" href="cadastrarquantos.css" />
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

    <section class="form-card">
      <div class="form-grid">
        <!-- Foto / Upload -->
        <div class="photo-box">
          <div class="photo-inner">
            <img src="placeholder-photo.png" alt="Placeholder" />
            <div class="photo-text">FOTO</div>
          
          </div>
        </div>

        <!-- Campos do formulário -->
        <div class="fields">
          <div class="row">
            <div class="field">
              <label for="numero">Nº Quarto</label>
              <input id="numero" type="number" placeholder="1" />
            </div>

            <div class="field">
              <label for="tipo">Tipo</label>
              <select id="tipo">
                <option>Standard Individual</option>
                <option>Standard Casal</option>
                <option>Suíte Executiva</option>
              </select>
            </div>

            <div class="field">
              <label for="valor">Valor</label>
              <div class="currency">
                <span class="currency-symbol">R$</span>
                <input id="valor" type="number" placeholder="150.00" step="0.01" />
              </div>
            </div>

            <div class="field">
              <label for="status">Status</label>
              <select id="status">
                <option>Disponível</option>
                <option>Ocupado</option>
                <option>Manutenção</option>
              </select>
            </div>
          </div>

          <div class="row">
            <label for="descricao" class="label-full">Descrição</label>
            <textarea id="descricao" rows="5" placeholder="Descrição do quarto..."></textarea>
          </div>

          <div class="amenities">
            <label class="amenity">
              <input type="checkbox" /> Café da manhã
            </label>
            <label class="amenity">
              <input type="checkbox" /> WI-FI
            </label>
            <label class="amenity">
              <input type="checkbox" /> Serviço de quarto
            </label>
            <label class="amenity">
              <input type="checkbox" /> Frigobar
            </label>
            <label class="amenity">
              <input type="checkbox" /> TV
            </label>
          </div>

          <div class="form-actions">
            <button class="btn add">Adicionar</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
