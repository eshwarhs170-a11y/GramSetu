import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DistrictPage from './pages/DistrictPage'
import VillagerLogin from './pages/VillagerLogin'
import OfficialLogin from './pages/OfficialLogin'
import VillagerDashboard from './pages/VillagerDashboard'
import OfficialDashboard from './pages/OfficialDashboard'
import FeatureDetails from './pages/FeatureDetails'
import { VoiceProvider } from './context/VoiceContext'
import VoiceAssistantWidget from './components/VoiceAssistantWidget'
import DemoVoicePage from './pages/DemoVoicePage'
import DemoEventDashboard from './pages/DemoEventDashboard'
import MagicLogin from './pages/MagicLogin'
import GenerateQRCards from './pages/GenerateQRCards'
import LiveHeatmap from './pages/LiveHeatmap'
import DemoPresenterHub from './pages/DemoPresenterHub'

function App() {
  const navigate = useNavigate()

  // Secret shortcut for presenter: Ctrl + Shift + D jumps to /demo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault()
        navigate('/demo')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

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
        <Route path="/demo" element={<DemoPresenterHub />} />
        <Route path="/demo/voice" element={<DemoVoicePage />} />
        <Route path="/demo/dashboard" element={<DemoEventDashboard />} />
        <Route path="/demo/qr-cards" element={<GenerateQRCards />} />
        <Route path="/demo/map" element={<LiveHeatmap />} />
        <Route path="/live-map" element={<LiveHeatmap />} />
        <Route path="/magic-login" element={<MagicLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </VoiceProvider>
  )
}

export default App
