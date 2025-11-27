<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Hóspedes — Checkin</title>
  <link rel="stylesheet" href="hospedes.css" />
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="logo">LOGO</div>
      <nav class="nav">
        <a href="#">HOME</a>
        <a href="#">QUARTOS</a>
        <a href="#" class="active">HÓSPEDES</a>
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

      <div class="actions-right">
        <button class="btn filter">Filtro ▾</button>
      </div>
    </section>

    <section class="table-card">
      <table class="guest-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>José da Silva</td>
            <td>123.321.258-54</td>
            <td>(84) 96890-6238</td>
            <td>silva.jose@gmail.com</td>
            <td>Rua Qualquer Nº 999</td>
            <td class="icons">
              <button class="icon" title="Editar">✏️</button>
              <button class="icon" title="Excluir">🗑️</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Gustavo Henrique</td>
            <td>369.381.258-74</td>
            <td>(84) 94890-7338</td>
            <td>gustavo@gmail.com</td>
            <td>Rua Certa Nº 85</td>
            <td class="icons">
              <button class="icon" title="Editar">✏️</button>
              <button class="icon" title="Excluir">🗑️</button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Pedro Antônio</td>
            <td>987.351.455-92</td>
            <td>(84) 96344-5937</td>
            <td>peant@gmail.com</td>
            <td>Rua das Pedras Nº 999</td>
            <td class="icons">
              <button class="icon" title="Editar">✏️</button>
              <button class="icon" title="Excluir">🗑️</button>
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Fabrício Melo</td>
            <td>587.351.285-92</td>
            <td>(84) 93645-4938</td>
            <td>fabmel@gmail.com</td>
            <td>Rua S. Agostinho Nº 999</td>
            <td class="icons">
              <button class="icon" title="Editar">✏️</button>
              <button class="icon" title="Excluir">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</body>
</html>
