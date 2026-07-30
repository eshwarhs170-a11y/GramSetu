import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import {
  LayoutDashboard, Landmark, TrendingUp, Megaphone,
  ClipboardList, SearchCheck, UserCircle, Wheat,
  X, LogOut, ChevronRight
} from 'lucide-react'

export default function VillagerSidebar({ active, setActive, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Reactive profile state — updates whenever user saves profile
  const [storedName,     setStoredName]     = useState(window.sessionStorage.getItem('citizen_name')     || 'ರಾಮಪ್ಪ ಗೌಡ')
  const [storedDistrict, setStoredDistrict] = useState(window.sessionStorage.getItem('citizen_district') || 'Mysuru')
  const [storedTaluk,    setStoredTaluk]    = useState(window.sessionStorage.getItem('citizen_taluk')    || 'Mysuru Taluk')

  // Listen to the profileUpdate event dispatched by ProfileScreen on save
  useEffect(() => {
    const refresh = () => {
      setStoredName(    window.sessionStorage.getItem('citizen_name')     || 'ರಾಮಪ್ಪ ಗೌಡ')
      setStoredDistrict(window.sessionStorage.getItem('citizen_district') || 'Mysuru')
      setStoredTaluk(   window.sessionStorage.getItem('citizen_taluk')    || 'Mysuru Taluk')
    }
    window.addEventListener('profileUpdate', refresh)
    return () => window.removeEventListener('profileUpdate', refresh)
  }, [])

  const navItems = [
    { id: 'home',          icon: LayoutDashboard, labelKey: 'sNavDashboard' },
    { id: 'schemes',       icon: Landmark,        labelKey: 'sNavSchemes' },
    { id: 'market',        icon: TrendingUp,      labelKey: 'sNavMarket' },
    { id: 'announcements', icon: Megaphone,        labelKey: 'sNavAnnounce' },
    { id: 'complaint',     icon: ClipboardList,   labelKey: 'sNavComplaint' },
    { id: 'status',        icon: SearchCheck,     labelKey: 'sNavStatus' },
    { id: 'profile',       icon: UserCircle,      labelKey: 'sNavProfile' },
  ]

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="sidebar-logo-icon">
            <Wheat size={22} strokeWidth={2} />
          </div>
          <div className="sidebar-logo-text">
            <h2>{t('appName')}</h2>
            <p>ಕರ್ನಾಟಕ ಸರ್ಕಾರ</p>
          </div>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">{storedName.charAt(0)}</div>
        <div className="sidebar-user-info">
          <p>{storedName}</p>
          <p>{storedTaluk}, {storedDistrict}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Menu / ಮೆನು</div>
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <Icon size={18} strokeWidth={1.8} style={{ flexShrink: 0 }} />
              <span>{t(item.labelKey)}</span>
              {active === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.7 }} />}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => navigate('/')}>
          <LogOut size={16} strokeWidth={2} />
          {t('logout')}
        </button>
      </div>
    </div>
  )
}
