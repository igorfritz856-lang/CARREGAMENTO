import { useAuth } from './auth'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  const { token } = useAuth()

  if (!token) {
    return <LoginPage />
  }

  return <DashboardPage />
}
