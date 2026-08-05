import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import {
  LayoutDashboard, ClipboardList, CheckCircle2, Megaphone,
  BarChart3, Users, Settings, Landmark, LogOut, ArrowRight,
  TrendingUp, Clock, RefreshCw, CheckCircle, Bell, Search,
  Droplets, Zap, Route, GraduationCap, Activity, Sprout, Trash2,
  MapPin, Phone, Home, ShieldCheck, Mail, Map, Building2, User,
  Star, Tag, Calendar
} from 'lucide-react'

import { db } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export const getSessionData = () => {
  const name = window.localStorage.getItem('official_name') || 'ಶ್ರೀನಿವಾಸ ಕುಮಾರ್'
  const initial = name.charAt(0).toUpperCase()
  return {
    name,
    initial,
    id: window.localStorage.getItem('official_id') || 'KA-MYS-PDO-2024-001',
    email: window.localStorage.getItem('official_email') || 'pdo.mysuru@karnataka.gov.in',
    department: window.localStorage.getItem('official_department') || 'Rural Development & Panchayat Raj',
    district: window.localStorage.getItem('official_district') || 'Mysuru',
    designation: 'Panchayat Development Officer (PDO)',
  }
}

// ===== Karnataka Official Data =====
const kaNewComplaints = [
  { id: 'GS-KA-0501', title: 'No Water for 3 Days — Ward 5', village: 'Ramanagara', status: 'pending', category: 'Water', date: '5 Aug', priority: 'high' },
  { id: 'GS-KA-0498', title: 'Pothole on NH 275 near GKVK', village: 'Mysuru', status: 'inprogress', category: 'Roads', date: '4 Aug', priority: 'medium' },
  { id: 'GS-KA-0489', title: 'FPS Giving Less Ration — Mandya', village: 'Mandya', status: 'pending', category: 'Ration/PDS', date: '3 Aug', priority: 'high' },
  { id: 'GS-KA-0476', title: 'BESCOM Street Lights Not Working', village: 'Channapatna', status: 'inprogress', category: 'Electricity', date: '2 Aug', priority: 'low' },
  { id: 'GS-KA-0456', title: 'Borewell Hand Pump Broken — RSK Ramanagar', village: 'Ramanagara', status: 'pending', category: 'Water', date: '1 Aug', priority: 'high' },
  { id: 'GS-KA-0445', title: 'APMC Weighing Scale Faulty', village: 'Tumkuru', status: 'pending', category: 'Agriculture', date: '30 Jul', priority: 'medium' },
]

const kaResolvedComplaints = [
  { id: 'GS-KA-0389', title: 'BESCOM Street Light Fixed — Mysuru Rd', village: 'Mysuru', resolvedDate: '28 Jul', resolvedBy: 'BESCOM Mysuru Division', rating: 4 },
  { id: 'GS-KA-0312', title: 'Blocked Drainage Cleared — Ward 2', village: 'Ramanagara', resolvedDate: '25 Jul', resolvedBy: 'Gram Panchayat Sanitation', rating: 5 },
  { id: 'GS-KA-0290', title: 'Village Road Pothole Repaired', village: 'Channapatna', resolvedDate: '20 Jul', resolvedBy: 'PWD Karnataka', rating: 3 },
  { id: 'GS-KA-0278', title: 'Raitha Siri Seeds Not Distributed', village: 'Mandya', resolvedDate: '15 Jul', resolvedBy: 'Dept of Agriculture, Mandya', rating: 5 },
]

const kaVillages = ['ರಾಮನಗರ', 'ಮೈಸೂರು', 'ಮಂಡ್ಯ', 'ಚನ್ನಪಟ್ಟಣ', 'ತುಮಕೂರು']
const kaVillagesEn = ['Ramanagara', 'Mysuru', 'Mandya', 'Channapatna', 'Tumkuru']

const getDistrictFarmers = (district) => {
  const baseNames = ['ರಾಮಪ್ಪ ಗೌಡ (Ramappa Gowda)', 'ಸಿದ್ದಮ್ಮ ದೇವಿ (Siddamma Devi)', 'ಮಹೇಶ ನಾಯಕ (Mahesha Nayaka)', 'ಕಾವೇರಿ ಅಮ್ಮ (Kaveri Amma)', 'ಬಸವರಾಜ ಹೆಗಡೆ (Basavaraja Hegde)', 'ಮಂಜುನಾಥ (Manjunatha)', 'ಸುನೀತಾ (Suneetha)']
  const villages = ['Halli', 'Koppal', 'Palya', 'Nagara', 'Kere']
  return Array.from({length: 8}).map((_, i) => [
    baseNames[i % baseNames.length],
    `${villages[i % villages.length]}, ${district}`,
    `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
    Math.random() > 0.2 ? 'Verified' : 'Pending',
    Math.floor(Math.random() * 5) + 1
  ])
}

// ===== Sidebar =====
function OfficialSidebar({ active, setActive }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const navItems = [
    { id: 'overview',   icon: LayoutDashboard, labelKey: 'sNavOverview',      badge: null },
    { id: 'complaints', icon: ClipboardList,   labelKey: 'sNavNewComplaints',  badge: '28' },
    { id: 'resolved',   icon: CheckCircle2,    labelKey: 'sNavResolved',       badge: null },
    { id: 'state',      icon: Map,             labelKey: 'State Overview',     badge: null },
    { id: 'announce',   icon: Megaphone,       labelKey: 'sNavPublish',        badge: null },
    { id: 'analytics',  icon: BarChart3,       labelKey: 'sNavAnalytics',      badge: null },
    { id: 'citizens',   icon: Users,           labelKey: 'sNavCitizens',       badge: null },
    { id: 'settings',   icon: Settings,        labelKey: 'sNavSettings',       badge: null },
  ]

  return (
    <div className="sidebar" style={{ background: '#0f172a' }}>
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="sidebar-logo-icon" style={{ background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Landmark size={20} strokeWidth={2} />
          </div>
          <div className="sidebar-logo-text">
            <h2>{t('appName')}</h2>
            <p>ಅಧಿಕಾರಿ ಪೋರ್ಟಲ್</p>
          </div>
        </div>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-user-avatar" style={{ background: '#3b82f6', fontSize: 13, fontWeight: 750 }}>
          {getSessionData().initial}
        </div>
        <div className="sidebar-user-info">
          <p>{getSessionData().name}</p>
          <p>{getSessionData().department}</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">ಅಧಿಕಾರಿ ಮೆನು / Officer Menu</div>
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              style={active === item.id ? { background: '#3b82f6' } : {}}
              onClick={() => setActive(item.id)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{t(item.labelKey)}</span>
              {item.badge && <span className="nav-badge" style={{ background: '#ef4444' }}>{item.badge}</span>}
            </div>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => {
          window.localStorage.removeItem('official_name')
          window.localStorage.removeItem('official_id')
          window.localStorage.removeItem('official_email')
          window.localStorage.removeItem('official_department')
          window.localStorage.removeItem('official_district')
          navigate('/')
        }}>
          <LogOut size={16} strokeWidth={2} />
          {t('logout')}
        </button>
      </div>
    </div>
  )
}

// ===== Overview =====
function OverviewScreen() {
  const { t } = useLanguage()
  return (
    <div className="animate-fadeInUp">
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)' }}>
        <div className="welcome-banner-bg" />
        <div className="welcome-banner-bg2" />
        <div className="welcome-banner-text">
          <h2>{t('officerWelcome')}</h2>
          <p>{t('officerLocation')}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <span className="badge badge-danger">28 {t('pendingComplaints')}</span>
            <span className="badge badge-success">15 {t('resolvedComplaints')} This Week</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{getSessionData().district} District</span>
          </div>
        </div>
        <div className="welcome-banner-img">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80" alt="" style={{ borderRadius: 12, height: 110, objectFit: 'cover' }} />
        </div>
      </div>

      <div className="analytics-grid">
        {[
          { Icon: ClipboardList, labelKey: 'totalComplaints', value: '186', color: '#fee2e2', iconColor: '#ef4444', sub: '+18 today' },
          { Icon: Clock,         labelKey: 'pendingComplaints', value: '28', color: '#fef3c7', iconColor: '#f59e0b', sub: '7 high priority' },
          { Icon: RefreshCw,     labelKey: 'inProgressComplaints', value: '22', color: '#dbeafe', iconColor: '#3b82f6', sub: '4 escalated' },
          { Icon: CheckCircle,   labelKey: 'resolvedComplaints', value: '136', color: '#d1fae5', iconColor: '#10b981', sub: '97% rate' },
          { Icon: Users,         labelKey: 'registeredCitizens', value: '5,210', color: '#ede9fe', iconColor: '#8b5cf6', sub: '+82 this month' },
          { Icon: Megaphone,     labelKey: 'announcements', value: '6', color: '#fce7f3', iconColor: '#ec4899', sub: 'This month' },
        ].map((s, i) => (
          <div className="stat-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="stat-icon" style={{ background: s.color, color: s.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="stat-info">
              <p>{t(s.labelKey)}</p>
              <p>{s.value}</p>
              <span style={{ color: 'var(--text-muted)' }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('weeklyComplaints')}</h3>
          <div className="bar-chart">
            {[
              { day: 'Mon', val: 10 }, { day: 'Tue', val: 16 }, { day: 'Wed', val: 8 },
              { day: 'Thu', val: 20 }, { day: 'Fri', val: 12 }, { day: 'Sat', val: 6 }, { day: 'Sun', val: 3 },
            ].map((b, i) => (
              <div className="bar" key={i}>
                <div className="bar-value">{b.val}</div>
                <div className="bar-fill" style={{ height: `${b.val * 5}px`, background: '#3b82f6', opacity: 0.85 }} />
                <div className="bar-label">{b.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('villageBreakdown')}</h3>
          {[
            ['Ramanagara', 22, '#ef4444'],
            ['Mysuru', 18, '#f59e0b'],
            ['Mandya', 14, '#3b82f6'],
            ['Channapatna', 8, '#10b981'],
            ['Tumkuru', 6, '#8b5cf6'],
          ].map(([village, count, color]) => (
            <div key={village} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                <span>{village}</span>
                <span>{count} complaints</span>
              </div>
              <div style={{ background: 'var(--bg-main)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${(count / 22) * 100}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown summary */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📊 Complaints by Category</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          {[
            { cat: 'Water', count: 32, color: '#3b82f6', Icon: Droplets },
            { cat: 'Electricity', count: 28, color: '#f59e0b', Icon: Zap },
            { cat: 'Roads', count: 24, color: '#ef4444', Icon: Route },
            { cat: 'Ration/PDS', count: 18, color: '#10b981', Icon: ClipboardList },
            { cat: 'Agriculture', count: 15, color: '#8b5cf6', Icon: Sprout },
            { cat: 'Health/PHC', count: 12, color: '#ec4899', Icon: Activity },
          ].map(s => (
            <div key={s.cat} style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', padding: 14, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6, color: s.color }}>
                <s.Icon size={24} strokeWidth={1.8} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 20, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{s.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== Complaints =====
function ComplaintsScreen({ resolved, stateOverview }) {
  const { t } = useLanguage()
  const [liveComplaints, setLiveComplaints] = useState(kaNewComplaints)

  useEffect(() => {
    if (resolved) return // Only fetch for pending/new
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id || doc.id }))
      // Merge with hardcoded to ensure table is never empty during demo
      const merged = [...fetched, ...kaNewComplaints].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
      setLiveComplaints(merged)
    }, (error) => {
      console.warn("Error fetching complaints, using local state", error)
    })
    return () => unsubscribe && unsubscribe()
  }, [resolved])

  const displayedComplaints = stateOverview 
    ? liveComplaints 
    : liveComplaints.filter(c => {
        const loc = (c.district || c.taluk || c.village || '').toLowerCase()
        return loc.includes(getSessionData().district.toLowerCase())
      })

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input style={{ border: 'none', outline: 'none', width: '100%' }} placeholder={t('search')} />
        </div>
        <select className="form-input" style={{ width: 160 }}>
          <option>{t('allCategories')}</option>
          <option>Water / ನೀರು</option>
          <option>Electricity / ವಿದ್ಯುತ್</option>
          <option>Roads / ರಸ್ತೆ</option>
          <option>Agriculture / ಕೃಷಿ</option>
          <option>Health / ಆರೋಗ್ಯ</option>
          <option>Ration/PDS</option>
        </select>
        <select className="form-input" style={{ width: 150 }}>
          <option>{t('allPriority')}</option>
          <option>{t('high')}</option>
          <option>{t('medium')}</option>
          <option>{t('low')}</option>
        </select>
      </div>

      {!resolved ? (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="market-table" style={{ width: '100%', minWidth: 600 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Complaint / ದೂರು</th>
                <th>Village / ಗ್ರಾಮ</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedComplaints.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{c.id}</td>
                  <td style={{ fontWeight: 600, maxWidth: 180, fontSize: 13 }}>
                    {c.title}
                    {c.photo && (
                      <div style={{ marginTop: 6 }}>
                        <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: 10 }}>📷 Has Image</span>
                      </div>
                    )}
                  </td>
                  <td>{c.village || c.taluk || c.district}</td>
                  <td><span className="badge badge-primary" style={{ fontSize: 11 }}>{c.category}</span></td>
                  <td>
                    <span className={`badge ${c.priority === 'high' ? 'badge-danger' : c.priority === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                      {t(c.priority)}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${c.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>
                      {c.status === 'pending' ? t('pending') : t('inProgress')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => alert(`✅ Assigned complaint ${c.id} to your department.`)}>{t('assign')}</button>
                      <button className="btn btn-outline btn-sm" onClick={() => alert(`📄 Viewing details for ${c.id}:\n\nTitle: ${c.title}\nCategory: ${c.category}\n\nThis will open a full modal in a future update.`)}>{t('view')}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {kaResolvedComplaints.map((c, i) => (
            <div className="complaint-status-card" key={i}>
              <div className="complaint-status-indicator resolved" />
              <div className="complaint-status-content">
                <h4>{c.title}</h4>
                <p>{c.village} — Resolved by: {c.resolvedBy}</p>
                <div className="complaint-status-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Tag size={12} /> {c.id}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={12} /> {c.resolvedDate}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        size={13}
                        fill={si < c.rating ? '#fbbf24' : 'none'}
                        color={si < c.rating ? '#fbbf24' : '#d1d5db'}
                      />
                    ))}
                  </span>
                  <span className="badge badge-success">{t('resolved')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ===== Announce =====
function AnnounceScreen() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }} className="animate-fadeInUp">
        <div style={{ fontSize: 72, marginBottom: 20 }}>📢</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t('announcePublished')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>{t('announceMsg')}</p>
        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>{t('publishAnother')}</button>
      </div>
    )
  }
  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 700 }}>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('announceFormTitle')}</h3>
        <div className="login-form" style={{ gap: 18 }}>
          <div className="form-group">
            <label className="form-label">{t('announceLabel')}</label>
            <input className="form-input" placeholder={t('announcePlaceholder')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">{t('categoryLabel')}</label>
              <select className="form-input">
                <option>Agriculture / ಕೃಷಿ</option>
                <option>Health / ಆರೋಗ್ಯ</option>
                <option>Infrastructure / ಮೂಲಸೌಕರ್ಯ</option>
                <option>Government / ಸರ್ಕಾರ</option>
                <option>Raitha Samparka Kendra</option>
                <option>APMC / ಕೃಷಿ ಉಪಜ ಮಾರುಕಟ್ಟೆ</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('priorityLevel')}</label>
              <select className="form-input">
                <option>{t('normal')}</option>
                <option>{t('urgent')}</option>
                <option>Emergency / ತುರ್ತು</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('messageLabel')}</label>
            <textarea className="form-input" rows={5} placeholder={t('messagePlaceholder')} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">{t('targetVillages')}</label>
              <select className="form-input">
                <option>{t('allVillages')}</option>
                {kaVillages.map((v, i) => (
                  <option key={i}>{v} ({kaVillagesEn[i]})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Language / ಭಾಷೆ</label>
              <select className="form-input">
                <option>All (EN + ಕನ್ನಡ + hi)</option>
                <option>ಕನ್ನಡ Only</option>
                <option>English Only</option>
                <option>हिन्दी Only</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Attach Image (Optional)</label>
            <div style={{ position: 'relative', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'center', background: 'var(--bg-main)', overflow: 'hidden' }}>
              <input type="file" accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} onChange={(e) => {
                if(e.target.files && e.target.files[0]) {
                  const reader = new FileReader()
                  reader.onload = (ev) => {
                    e.target.parentElement.style.backgroundImage = `url(${ev.target.result})`
                    e.target.parentElement.style.backgroundSize = 'cover'
                    e.target.parentElement.style.backgroundPosition = 'center'
                    e.target.nextSibling.style.opacity = 0
                  }
                  reader.readAsDataURL(e.target.files[0])
                }
              }} />
              <div style={{ pointerEvents: 'none', transition: 'opacity 0.2s' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Click to upload image or drag & drop</p>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ padding: '14px 24px' }} onClick={() => setSubmitted(true)}>
            {t('publishBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== Citizens =====
function CitizensScreen() {
  const { t } = useLanguage()
  const districtFarmers = getDistrictFarmers(getSessionData().district)
  
  return (
    <div className="animate-fadeInUp">
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          { Icon: Users,        labelKey: 'totalCitizens',  value: '5,210', color: '#dbeafe', iconColor: '#1d4ed8' },
          { Icon: ShieldCheck,  labelKey: 'aadhaarVerified', value: '4,890', color: '#d1fae5', iconColor: '#10b981' },
          { Icon: Landmark,     labelKey: 'schemeEnrolled',  value: '3,640', color: '#ede9fe', iconColor: '#8b5cf6' },
          { Icon: Phone,        labelKey: 'appUsers',        value: '1,820', color: '#fef3c7', iconColor: '#d97706' },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.color, color: s.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="stat-info">
              <p>{t(s.labelKey)}</p>
              <p>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{t('allFarmers')}</h3>
          <button className="btn btn-primary btn-sm">{t('export')}</button>
        </div>
        <table className="market-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name / ಹೆಸರು</th>
              <th>Village / ಗ್ರಾಮ</th>
              <th>Mobile / ಮೊಬೈಲ್</th>
              <th>Aadhaar</th>
              <th>Schemes / ಯೋಜನೆ</th>
            </tr>
          </thead>
          <tbody>
            {districtFarmers.map(([name, village, mobile, aadhaar, schemes], i) => (
              <tr key={i}>
                <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{name}</td>
                <td>{village}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{mobile}</td>
                <td><span className={`badge ${aadhaar === 'Verified' ? 'badge-success' : 'badge-warning'}`}>{aadhaar}</span></td>
                <td><span className="badge badge-primary">{schemes} Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ===== Settings =====
function SettingsScreen() {
  const { t } = useLanguage()

  // Profile fields state
  const [editingProfile, setEditingProfile] = useState(false)
  const [profile, setProfile] = useState({
    fullName:    getSessionData().name,
    designation: getSessionData().designation,
    taluk:       getSessionData().district + ' District',
    officerId:   getSessionData().id,
    department:  getSessionData().department,
  })
  const [draftProfile, setDraftProfile] = useState({ ...profile })

  const saveProfile = () => {
    localStorage.setItem('officer_name',  draftProfile.fullName)
    localStorage.setItem('officer_desig', draftProfile.designation)
    localStorage.setItem('officer_taluk', draftProfile.taluk)
    localStorage.setItem('officer_id',    draftProfile.officerId)
    localStorage.setItem('officer_dept',  draftProfile.department)
    setProfile({ ...draftProfile })
    setEditingProfile(false)
  }

  // Notification toggles
  const defaultToggles = {
    highPriority: true,
    dailyDigest: true,
    escalations: true,
    apmcAlerts: true,
    farmerReg: false,
  }
  const [notifs, setNotifs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('officer_notifs')) || defaultToggles } 
    catch { return defaultToggles }
  })
  const setNotif = (key, val) => {
    const next = { ...notifs, [key]: val }
    setNotifs(next)
    localStorage.setItem('officer_notifs', JSON.stringify(next))
  }

  const profileRows = [
    { key: 'fullName',    label: 'Full Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'taluk',       label: 'Taluk / District' },
    { key: 'officerId',   label: 'Officer ID' },
    { key: 'department',  label: 'Department' },
  ]

  const notifRows = [
    { key: 'highPriority', label: 'High Priority Complaint Alerts' },
    { key: 'dailyDigest',  label: 'Daily Digest (Kannada)' },
    { key: 'escalations',  label: 'Escalation Notifications' },
    { key: 'apmcAlerts',   label: 'APMC Price Alerts' },
    { key: 'farmerReg',    label: 'New Farmer Registrations' },
  ]

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 700 }}>
      {/* Profile Card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={18} color="var(--primary)" />
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>👤 Officer Profile / ಅಧಿಕಾರಿ ಪ್ರೊಫೈಲ್</h4>
          </div>
          {editingProfile ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={saveProfile}>Save ✓</button>
              <button className="btn btn-outline btn-sm" onClick={() => { setDraftProfile({ ...profile }); setEditingProfile(false) }}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-outline btn-sm" onClick={() => { setDraftProfile({ ...profile }); setEditingProfile(true) }}>
              {t('edit')} ✏️
            </button>
          )}
        </div>
        {profileRows.map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)', fontSize: 14, gap: 16 }}>
            <span style={{ color: 'var(--text-secondary)', flexShrink: 0, minWidth: 120 }}>{label}</span>
            {editingProfile ? (
              <input
                className="form-input"
                style={{ flex: 1, padding: '6px 10px', fontSize: 13 }}
                value={draftProfile[key]}
                onChange={e => setDraftProfile(prev => ({ ...prev, [key]: e.target.value }))}
              />
            ) : (
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{profile[key]}</span>
            )}
          </div>
        ))}
      </div>

      {/* Notification Preferences Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Bell size={18} color="var(--primary)" />
          <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>🔔 Notification Preferences / ಅಧಿಸೂಚನೆ</h4>
        </div>
        {notifRows.map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)', fontSize: 14 }}>
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <button
              onClick={() => setNotif(key, !notifs[key])}
              style={{
                width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: notifs[key] ? 'var(--primary)' : '#d1d5db',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0
              }}
              title={notifs[key] ? 'Enabled — click to disable' : 'Disabled — click to enable'}
            >
              <span style={{
                position: 'absolute', top: 3, left: notifs[key] ? 23 : 3,
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s'
              }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


// ===== Page meta =====
const pageMeta = {
  overview:   { titleKey: 'sNavOverview',      subKey: 'officerLocation' },
  complaints: { titleKey: 'sNavNewComplaints', subKey: 'complaintSub' },
  resolved:   { titleKey: 'sNavResolved',      subKey: 'statusSub' },
  state:      { titleKey: 'State Overview',    subKey: 'All Karnataka Districts' },
  announce:   { titleKey: 'sNavPublish',       subKey: 'announceSub' },
  analytics:  { titleKey: 'sNavAnalytics',     subKey: 'officerLocation' },
  citizens:   { titleKey: 'sNavCitizens',      subKey: 'schemesSub' },
  settings:   { titleKey: 'sNavSettings',      subKey: 'profileSub' },
}

// ===== Main Dashboard =====
export default function OfficialDashboard() {
  const [active, setActive] = useState('overview')
  const { t } = useLanguage()
  const page = pageMeta[active] || pageMeta.overview

  const renderScreen = () => {
    switch (active) {
      case 'overview':   return <OverviewScreen />
      case 'complaints': return <ComplaintsScreen resolved={false} />
      case 'resolved':   return <ComplaintsScreen resolved={true} />
      case 'state':      return <ComplaintsScreen resolved={false} stateOverview={true} />
      case 'announce':   return <AnnounceScreen />
      case 'analytics':  return <OverviewScreen />
      case 'citizens':   return <CitizensScreen />
      case 'settings':   return <SettingsScreen />
      default:           return <OverviewScreen />
    }
  }

  return (
    <div className="app-layout">
      <OfficialSidebar active={active} setActive={setActive} />
      <div className="main-content">
        <header className="topbar">
          <div>
            <div className="topbar-title">{t(page.titleKey) || page.titleKey}</div>
            <div className="topbar-subtitle">{getSessionData().district} District, Karnataka — {getSessionData().department}</div>
          </div>
          <div className="topbar-right">
            <LanguageSwitcher variant="topbar-style" />
            <ThemeToggle />
            <button className="topbar-icon-btn" onClick={() => alert('Search functionality coming soon')}>
              <Search size={18} strokeWidth={2} />
            </button>
            <button className="topbar-icon-btn" style={{ position: 'relative' }} onClick={() => alert('You have 3 new notifications')}>
              <Bell size={18} strokeWidth={2} />
              <div className="notif-dot" />
            </button>
            <button className="topbar-icon-btn" onClick={() => setActive('settings')}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>
                {getSessionData().initial}
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
