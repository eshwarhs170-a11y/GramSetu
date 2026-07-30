import { useState, useEffect } from 'react'
import VillagerSidebar from '../components/VillagerSidebar'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import {
  HomeScreen, SchemesScreen, MarketScreen, AnnouncementsScreen,
  ComplaintScreen, ComplaintStatusScreen, ProfileScreen,
} from '../components/VillagerScreens'
import { Menu, Search, Bell } from 'lucide-react'

export default function VillagerDashboard() {
  const [active, setActive] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { t } = useLanguage()

  const pageMeta = {
    home:          { titleKey: 'dashTitle',      subKey: 'dashSub' },
    schemes:       { titleKey: 'schemesTitle',   subKey: 'schemesSub' },
    market:        { titleKey: 'marketTitle',    subKey: 'marketSub' },
    announcements: { titleKey: 'announceTitle',  subKey: 'announceSub' },
    complaint:     { titleKey: 'complaintTitle', subKey: 'complaintSub' },
    status:        { titleKey: 'statusTitle',    subKey: 'statusSub' },
    profile:       { titleKey: 'profileTitle',   subKey: 'profileSub' },
  }
  const page = pageMeta[active] || pageMeta.home

  const renderScreen = () => {
    switch (active) {
      case 'home':          return <HomeScreen />
      case 'schemes':       return <SchemesScreen />
      case 'market':        return <MarketScreen />
      case 'announcements': return <AnnouncementsScreen />
      case 'complaint':     return <ComplaintScreen />
      case 'status':        return <ComplaintStatusScreen />
      case 'profile':       return <ProfileScreen />
      default:              return <HomeScreen />
    }
  }

  const [storedName, setStoredName] = useState(window.sessionStorage.getItem('citizen_name') || 'ರಾಮಪ್ಪ ಗೌಡ')

  useEffect(() => {
    const handleUpdate = () => {
      setStoredName(window.sessionStorage.getItem('citizen_name') || 'ರಾಮಪ್ಪ ಗೌಡ')
    }
    window.addEventListener('profileUpdate', handleUpdate)
    return () => window.removeEventListener('profileUpdate', handleUpdate)
  }, [])

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <VillagerSidebar
        active={active}
        setActive={(pageId) => { setActive(pageId); setSidebarOpen(false) }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Overlay to close drawer on mobile */}
      {sidebarOpen && <div className="sidebar-overlay-mobile" onClick={() => setSidebarOpen(false)} />}

      <div className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              <Menu size={22} strokeWidth={2} />
            </button>
            <div>
              <div className="topbar-title">{t(page.titleKey)}</div>
              <div className="topbar-subtitle">
                {active === 'home'
                  ? `${t('dashSub')} ${storedName}`
                  : t(page.subKey)}
              </div>
            </div>
          </div>

          <div className="topbar-right">
            <LanguageSwitcher variant="topbar-style" />
            <button className="topbar-icon-btn" title="Search">
              <Search size={18} strokeWidth={2} />
            </button>
            <button className="topbar-icon-btn" title="Notifications" style={{ position: 'relative' }}>
              <Bell size={18} strokeWidth={2} />
              <div className="notif-dot" />
            </button>
            <button className="topbar-icon-btn" onClick={() => setActive('profile')}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 13, boxShadow: '0 2px 8px rgba(22,101,52,0.3)'
              }}>
                {storedName.charAt(0)}
              </div>
            </button>
          </div>
        </header>

        <main className="page-content">
          {renderScreen()}
        </main>
      </div>
    </div>
  )
}
