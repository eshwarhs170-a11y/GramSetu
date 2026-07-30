import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import VillagerLogin from './pages/VillagerLogin'
import OfficialLogin from './pages/OfficialLogin'
import VillagerDashboard from './pages/VillagerDashboard'
import OfficialDashboard from './pages/OfficialDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/villager" element={<VillagerLogin />} />
      <Route path="/login/official" element={<OfficialLogin />} />
      <Route path="/dashboard/villager/*" element={<VillagerDashboard />} />
      <Route path="/dashboard/official/*" element={<OfficialDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
