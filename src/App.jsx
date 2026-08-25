import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DistrictPage from './pages/DistrictPage'
import VillagerLogin from './pages/VillagerLogin'
import OfficialLogin from './pages/OfficialLogin'
import VillagerDashboard from './pages/VillagerDashboard'
import OfficialDashboard from './pages/OfficialDashboard'
import FeatureDetails from './pages/FeatureDetails'
import { VoiceProvider } from './context/VoiceContext'
import VoiceAssistantWidget from './components/VoiceAssistantWidget'

function App() {
  return (
    <VoiceProvider>
      <VoiceAssistantWidget />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/district/:id" element={<DistrictPage />} />
        <Route path="/login/villager" element={<VillagerLogin />} />
        <Route path="/login/official" element={<OfficialLogin />} />
        <Route path="/dashboard/villager/*" element={<VillagerDashboard />} />
        <Route path="/dashboard/official/*" element={<OfficialDashboard />} />
        <Route path="/feature/:id" element={<FeatureDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </VoiceProvider>
  )
}

export default App
