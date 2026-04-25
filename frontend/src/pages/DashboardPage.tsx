import { useAuth } from '../auth'

export function DashboardPage() {
  const { logout } = useAuth()

  return (
    <main className="container">
      <section className="card">
        <h1>Painel Operacional</h1>
        <p>Esqueleto inicial pronto: API, autenticação e estrutura de módulos.</p>
        <ul>
          <li>Módulo de cadastro de entidades</li>
          <li>Módulo de workflow de aprovação</li>
          <li>Relatórios e indicadores</li>
        </ul>
        <button onClick={logout}>Sair</button>
      </section>
    </main>
  )
}
