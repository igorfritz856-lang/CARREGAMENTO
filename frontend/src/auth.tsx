import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

import { api, setAuthorizationHeader } from './api'

type AuthContextData = {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  useMemo(() => setAuthorizationHeader(token), [token])

  async function login(username: string, password: string) {
    const body = new URLSearchParams({ username, password })
    const response = await api.post('/auth/token', body)
    const nextToken = response.data.access_token as string
    setToken(nextToken)
    setAuthorizationHeader(nextToken)
    localStorage.setItem('token', nextToken)
  }

  function logout() {
    setToken(null)
    setAuthorizationHeader(null)
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return ctx
}
