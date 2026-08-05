import { useState, useEffect } from 'react'
import VillagerSidebar from '../components/VillagerSidebar'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import { useLanguage } from '../context/LanguageContext'
import {
  HomeScreen, SchemesScreen, MarketScreen, AnnouncementsScreen,
  ComplaintScreen, ComplaintStatusScreen, ProfileScreen,
} from '../components/VillagerScreens'
import { Menu, Search, Bell, X, AlertTriangle, IndianRupee } from 'lucide-react'

export default function VillagerDashboard() {
  const [active, setActive] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
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

  const [storedName, setStoredName] = useState(window.localStorage.getItem('citizen_name') || 'ರಾಮಪ್ಪ ಗೌಡ')

  useEffect(() => {
    const handleUpdate = () => {
      setStoredName(window.localStorage.getItem('citizen_name') || 'ರಾಮಪ್ಪ ಗೌಡ')
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
            <ThemeToggle />
            <button className="topbar-icon-btn" title="Search" onClick={() => setSearchOpen(true)}>
              <Search size={18} strokeWidth={2} />
            </button>
            <div style={{ position: 'relative' }}>
              <button className="topbar-icon-btn" title="Notifications" onClick={() => setNotifOpen(!notifOpen)}>
                <Bell size={18} strokeWidth={2} />
                <div className="notif-dot" />
              </button>
              {notifOpen && (
                <div className="notif-dropdown animate-fadeInUp">
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <button onClick={() => setNotifOpen(false)}><X size={14} /></button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <div className="notif-icon bg-warning" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AlertTriangle size={16} color="#d97706" />
                      </div>
                      <div>
                        <p>Crop Alert: Heavy rain expected tomorrow in your district.</p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-icon bg-success" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IndianRupee size={16} color="#15803d" />
                      </div>
                      <div>
                        <p>PM Kisan: ₹2,000 credited to your account ending in 4521.</p>
                        <span>1 day ago</span>
                      </div>
                    </div>
                  </div>
                  <button className="notif-view-all" onClick={() => { setActive('announcements'); setNotifOpen(false) }}>View All Alerts</button>
                </div>
              )}
            </div>
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

      {/* Search Modal */}
      {searchOpen && (
        <div className="modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="modal-content animate-fadeInUp" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Search</h3>
              <button onClick={() => setSearchOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <div className="input-group">
              <Search size={18} className="input-icon" />
              <input type="text" placeholder="Search schemes, crops, or announcements..." autoFocus />
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 12 }}>Suggested</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['PM Kisan', 'Ragi Price', 'Rytha Vidyanidhi', 'Crop Insurance'].map(tag => (
                  <button key={tag} className="btn btn-outline btn-sm" onClick={() => setSearchOpen(false)}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
