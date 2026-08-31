import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import {
  LayoutDashboard, Landmark, TrendingUp, Megaphone,
  ClipboardList, SearchCheck, UserCircle, Wheat,
  X, LogOut, ChevronRight, Cloud, ShieldAlert, PlayCircle, Camera
} from 'lucide-react'

export default function VillagerSidebar({ active, setActive, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Reactive profile state — updates whenever user saves profile
  const [storedName,     setStoredName]     = useState(window.localStorage.getItem('citizen_name')     || 'ರಾಮಪ್ಪ ಗೌಡ')
  const [storedDistrict, setStoredDistrict] = useState(window.localStorage.getItem('citizen_district') || 'Mysuru')
  const [storedTaluk,    setStoredTaluk]    = useState(window.localStorage.getItem('citizen_taluk')    || 'Mysuru Taluk')

  // Listen to the profileUpdate event dispatched by ProfileScreen on save
  useEffect(() => {
    const refresh = () => {
      setStoredName(    window.localStorage.getItem('citizen_name')     || 'ರಾಮಪ್ಪ ಗೌಡ')
      setStoredDistrict(window.localStorage.getItem('citizen_district') || 'Mysuru')
      setStoredTaluk(   window.localStorage.getItem('citizen_taluk')    || 'Mysuru Taluk')
    }
    window.addEventListener('profileUpdate', refresh)
    return () => window.removeEventListener('profileUpdate', refresh)
  }, [])

  const logoTapCount = useRef(0)
  const logoTapTimer = useRef(null)

  const handleLogoSecretTap = () => {
    logoTapCount.current += 1
    if (logoTapTimer.current) clearTimeout(logoTapTimer.current)
    if (logoTapCount.current >= 3) {
      logoTapCount.current = 0
      window.location.href = '/demo'
      return
    }
    logoTapTimer.current = setTimeout(() => {
      logoTapCount.current = 0
    }, 1200)
  }

  const navItems = [
    { id: 'home',          icon: LayoutDashboard, labelKey: 'sNavDashboard' },
    { id: 'schemes',       icon: Landmark,        labelKey: 'sNavSchemes' },
    { id: 'market',        icon: TrendingUp,      labelKey: 'sNavMarket' },
    { id: 'weather',       icon: Cloud,           labelKey: 'sNavWeather' },
    { id: 'crop-doctor',   icon: Camera,          labelKey: 'sNavCropDoctor' },
    { id: 'sos',           icon: ShieldAlert,     labelKey: 'sNavSOS' },
    { id: 'tutorials',     icon: PlayCircle,      labelKey: 'sNavTutorials' },
    { id: 'announcements', icon: Megaphone,        labelKey: 'sNavAnnounce' },
    { id: 'complaint',     icon: ClipboardList,   labelKey: 'sNavComplaint' },
    { id: 'status',        icon: SearchCheck,     labelKey: 'sNavStatus' },
    { id: 'profile',       icon: UserCircle,      labelKey: 'sNavProfile' },
  ]

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div 
          onClick={handleLogoSecretTap}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
          title="Triple tap for Demo Hub"
        >
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
              <span>{t(item.labelKey) || (item.id === 'crop-doctor' ? 'Crop Doctor (AR)' : item.labelKey)}</span>
              {item.badge && (
                <span style={{ marginLeft: 6, background: '#16a34a', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 6, letterSpacing: '0.05em', flexShrink: 0 }}>
                  {item.badge}
                </span>
              )}
              {active === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.7 }} />}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => {
          window.localStorage.removeItem('citizen_name')
          window.localStorage.removeItem('citizen_email')
          window.localStorage.removeItem('citizen_district')
          window.localStorage.removeItem('citizen_taluk')
          window.localStorage.removeItem('citizen_phone')
          navigate('/')
        }}>
          <LogOut size={16} strokeWidth={2} />
          {t('logout')}
        </button>
      </div>
    </div>
  )
}
