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
import CropScanner from './components/CropScanner'
import OfflineIndicator from './components/OfflineIndicator'

function App() {
  const navigate = useNavigate()

  // Secret shortcuts for presenter:
  // 1) Ctrl + Shift + A (or O) -> Direct instant login to Admin / Official Dashboard (/dashboard/official)
  // 2) Ctrl + Shift + D -> Jumps to Presenter Demo Hub (/demo)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Admin / Official shortcut: Ctrl + Shift + A or Ctrl + Shift + O
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'O' || e.key === 'o')) {
        e.preventDefault()
        window.localStorage.setItem('official_name', 'S. R. Patil')
        window.localStorage.setItem('official_district', 'Mysuru')
        window.localStorage.setItem('official_taluk', 'Mysuru')
        window.localStorage.setItem('official_gp', 'Varuna')
        window.localStorage.setItem('official_department', 'Rural Development & Panchayat Raj')
        window.localStorage.setItem('official_email', 'pdo.mysuru@karnataka.gov.in')
        window.localStorage.setItem('official_id', 'KA-MYS-PDO-2026-042')
        window.localStorage.setItem('official_phone', '9845123456')
        window.localStorage.setItem('official_loggedIn', 'true')
        window.dispatchEvent(new Event('profileUpdate'))
        window.location.replace('/dashboard/official')
        return
      }

      // Demo Hub shortcut: Ctrl + Shift + D
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
      <OfflineIndicator />
      <VoiceAssistantWidget />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/district/:id" element={<DistrictPage />} />
        <Route path="/login/villager" element={<VillagerLogin />} />
        <Route path="/login/official" element={<OfficialLogin />} />
        <Route path="/dashboard/villager/*" element={<VillagerDashboard />} />
        <Route path="/dashboard/official/*" element={<OfficialDashboard />} />
        <Route path="/feature/:id" element={<FeatureDetails />} />
        <Route path="/crop-doctor" element={<VillagerDashboard defaultTab="crop-doctor" />} />
        <Route path="/soil-health" element={<VillagerDashboard defaultTab="soil-health" />} />
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
