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
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifExpanded, setNotifExpanded] = useState(null)
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
      case 'home':          return <HomeScreen setActive={setActive} />
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

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

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
              {notifOpen && (() => {
                const notifications = [
                  {
                    id: 1,
                    icon: <AlertTriangle size={16} color="#d97706" />,
                    iconBg: 'bg-warning',
                    title: 'Crop Alert: Heavy rain expected tomorrow in your district.',
                    detail: 'IMD has issued a yellow alert for heavy rainfall in your taluk tomorrow (07 Aug). Secure stored crops, avoid field operations. Visit KSNDMC for updates.',
                    time: '2 hours ago',
                    link: 'https://ksndmc.org/',
                    linkLabel: 'KSNDMC Weather ↗',
                    page: 'announcements',
                  },
                  {
                    id: 2,
                    icon: <IndianRupee size={16} color="#15803d" />,
                    iconBg: 'bg-success',
                    title: 'PM Kisan: ₹2,000 credited to your account ending in 4521.',
                    detail: 'PM Kisan Samman Nidhi 18th instalment of ₹2,000 has been credited on 5 Aug 2026. Check your Aadhaar-linked bank account. Next instalment expected in Dec 2026.',
                    time: '1 day ago',
                    link: 'https://pmkisan.gov.in/',
                    linkLabel: 'PM Kisan Portal ↗',
                    page: 'schemes',
                  },
                  {
                    id: 3,
                    icon: <AlertTriangle size={16} color="#dc2626" />,
                    iconBg: 'bg-danger',
                    title: 'Ragi MSP Procurement starts Aug 10 — Register now.',
                    detail: 'Karnataka Food Corporation begins Ragi MSP procurement at ₹3,846/quintal from 10 Aug. Bring Aadhaar, land RTC, and bank passbook to your nearest APMC centre.',
                    time: '2 days ago',
                    link: 'https://kfc.karnataka.gov.in/',
                    linkLabel: 'KFC Portal ↗',
                    page: 'market',
                  },
                ]
                const [expandedId, setExpandedId] = [notifExpanded, setNotifExpanded]
                return (
                  <div className="notif-dropdown animate-fadeInUp">
                    <div className="notif-header">
                      <h4>Notifications</h4>
                      <button onClick={() => setNotifOpen(false)}><X size={14} /></button>
                    </div>
                    <div className="notif-list">
                      {notifications.map(n => (
                        <div key={n.id}>
                          <div
                            className="notif-item unread"
                            style={{ cursor: 'pointer', flexDirection: 'column', gap: 0, padding: 0 }}
                            onClick={() => setNotifExpanded(notifExpanded === n.id ? null : n.id)}
                          >
                            <div style={{ display: 'flex', gap: 12, padding: '14px 16px' }}>
                              <div className={`notif-icon ${n.iconBg}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {n.icon}
                              </div>
                              <div style={{ flex: 1 }}>
                                <p style={{ margin: 0 }}>{n.title}</p>
                                <span>{n.time}</span>
                              </div>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center' }}>
                                {notifExpanded === n.id ? '▲' : '▼'}
                              </span>
                            </div>
                            {notifExpanded === n.id && (
                              <div style={{ padding: '0 16px 14px 16px', borderTop: '1px solid var(--border-light)', paddingTop: 10 }}>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.6 }}>{n.detail}</p>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <a
                                    href={n.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 6, padding: '3px 10px', textDecoration: 'none' }}
                                  >
                                    {n.linkLabel}
                                  </a>
                                  <button
                                    onClick={e => { e.stopPropagation(); setActive(n.page); setNotifOpen(false); setNotifExpanded(null); }}
                                    style={{ fontSize: 12, fontWeight: 600, color: '#fff', background: 'var(--primary)', border: 'none', borderRadius: 6, padding: '3px 10px', cursor: 'pointer' }}
                                  >
                                    View in App →
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="notif-view-all" onClick={() => { setActive('announcements'); setNotifOpen(false) }}>View All Alerts</button>
                  </div>
                )
              })()}

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
              <input 
                type="text" 
                placeholder="Search schemes, crops, or announcements..." 
                autoFocus 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = searchQuery.toLowerCase();
                    if (q.includes('ragi') || q.includes('market') || q.includes('price')) setActive('market');
                    else if (q.includes('alert') || q.includes('announcement')) setActive('announcements');
                    else setActive('schemes');
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 12 }}>Suggested</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['PM Kisan', 'Ragi Price', 'Rytha Vidyanidhi', 'Crop Insurance'].map(tag => (
                  <button 
                    key={tag} 
                    className="btn btn-outline btn-sm" 
                    onClick={() => {
                      if (tag === 'Ragi Price') setActive('market');
                      else setActive('schemes');
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
