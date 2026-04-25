import { FormEvent, useState } from 'react'

import { useAuth } from '../auth'

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    try {
      await login(email, password)
    } catch {
      setError('Falha no login. Verifique credenciais e tente novamente.')
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Sistema de Carregamento</h1>
        <p>Acesse com sua conta para continuar.</p>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Senha
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error ? <span className="error">{error}</span> : null}
          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  )
}
