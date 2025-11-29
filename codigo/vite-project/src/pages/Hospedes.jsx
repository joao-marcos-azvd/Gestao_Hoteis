export default function Hospedes() {
  const hospedes = [
    { 
      id: 1, 
      nome: 'José da Silva',
      cpf: '123.321.258-54',
      telefone: '(84) 96890-6238',
      email: 'silva.jose@gmail.com',
      endereco: 'Rua Qualquer Nº 999'
    },
    { 
      id: 2, 
      nome: 'Gustavo Henrique',
      cpf: '369.381.258-74',
      telefone: '(84) 94890-7338',
      email: 'gustavo@gmail.com',
      endereco: 'Rua Certa Nº 85'
    },
    { 
      id: 3, 
      nome: 'Pedro Antônio',
      cpf: '987.351.455-92',
      telefone: '(84) 96344-5937',
      email: 'peant@gmail.com',
      endereco: 'Rua das Pedras Nº 999'
    },
    { 
      id: 4, 
      nome: 'Fabrício Melo',
      cpf: '587.351.285-92',
      telefone: '(84) 93645-4938',
      email: 'fabmel@gmail.com',
      endereco: 'Rua S. Agostinho Nº 999'
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
            <a href="#" className="active">HÓSPEDES</a>
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
          <div className="actions-right">
            <button className="btn filter">Filtro ▾</button>
          </div>
        </section>

        <section className="table-card">
          <table className="guest-table">
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
              {hospedes.map((hospede) => (
                <tr key={hospede.id}>
                  <td>{hospede.id}</td>
                  <td>{hospede.nome}</td>
                  <td>{hospede.cpf}</td>
                  <td>{hospede.telefone}</td>
                  <td>{hospede.email}</td>
                  <td>{hospede.endereco}</td>
                  <td className="icons">
                    <button className="icon" title="Editar">✏️</button>
                    <button className="icon" title="Excluir">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
