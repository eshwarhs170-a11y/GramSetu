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
  Star, Tag, Calendar, Menu, X
} from 'lucide-react'

import { db } from '../firebase'
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore'

export const getSessionData = () => {
  const name = window.localStorage.getItem('official_name') || ''
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

const allDistricts = [
  'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
  'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga',
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri',
  'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur',
  'Ramanagara', 'Shivamogga', 'Tumkuru', 'Udupi', 'Uttara Kannada', 'Vijayapura',
  'Vijayanagara', 'Yadgir'
]

// ===== Sidebar =====
function OfficialSidebar({ active, setActive, sidebarOpen, setSidebarOpen, sessionData }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const navItems = [
    { id: 'overview',   icon: LayoutDashboard, labelKey: 'sNavOverview',      badge: null },
    { id: 'complaints', icon: ClipboardList,   labelKey: 'sNavNewComplaints',  badge: '28' },
    { id: 'resolved',   icon: CheckCircle2,    labelKey: 'sNavResolved',       badge: null },
    { id: 'state',      icon: Map,             labelKey: 'State Overview',     badge: null },
    { id: 'announcements', icon: ClipboardList, labelKey: 'Announcements', badge: null },
    { id: 'announce', icon: Megaphone, labelKey: 'sNavPublish', badge: null },
    { id: 'analytics',  icon: BarChart3,       labelKey: 'sNavAnalytics',      badge: null },
    { id: 'citizens',   icon: Users,           labelKey: 'sNavCitizens',       badge: null },
    { id: 'settings',   icon: Settings,        labelKey: 'sNavSettings',       badge: null },
  ]

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ background: '#0f172a' }}>
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
        <button
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-user-avatar" style={{ background: '#3b82f6', fontSize: 13, fontWeight: 750 }}>
          {sessionData.initial}
        </div>
        <div className="sidebar-user-info">
          <p>{sessionData.name}</p>
          <p>{sessionData.department}</p>
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
function OverviewScreen({ onPendingClick, onResolvedClick, sessionData, pendingCount, resolvedCount }) {
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
            <span className="badge badge-danger" onClick={onPendingClick} style={{ cursor: 'pointer' }}>{pendingCount} {t('pendingComplaints')}</span>
            <span className="badge badge-success" onClick={onResolvedClick} style={{ cursor: 'pointer' }}>{resolvedCount} {t('resolvedComplaints')} This Week</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{sessionData.district} District</span>
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

    </div>
  )
}

// ===== Analytics =====
function AnalyticsScreen({ sessionData, pendingCount, resolvedCount }) {
  const { t } = useLanguage()
  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>📈 Analytics & Reports</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Performance and trends for {sessionData.district} District</p>
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
            ['Taluk HQ', 22, '#ef4444'],
            ['North Zone', 18, '#f59e0b'],
            ['South Zone', 14, '#3b82f6'],
            ['East Zone', 8, '#10b981'],
            ['West Zone', 6, '#8b5cf6'],
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
            { cat: 'Water', count: Math.floor((pendingCount+resolvedCount)*0.3) || 32, color: '#3b82f6', Icon: Droplets },
            { cat: 'Electricity', count: Math.floor((pendingCount+resolvedCount)*0.25) || 28, color: '#f59e0b', Icon: Zap },
            { cat: 'Roads', count: Math.floor((pendingCount+resolvedCount)*0.2) || 24, color: '#ef4444', Icon: Route },
            { cat: 'Ration/PDS', count: Math.floor((pendingCount+resolvedCount)*0.1) || 18, color: '#10b981', Icon: ClipboardList },
            { cat: 'Agriculture', count: Math.floor((pendingCount+resolvedCount)*0.1) || 15, color: '#8b5cf6', Icon: Sprout },
            { cat: 'Health/PHC', count: Math.floor((pendingCount+resolvedCount)*0.05) || 12, color: '#ec4899', Icon: Activity },
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
function ComplaintsScreen({ resolved, stateOverview, filter }) {
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
        const statusMatch = filter ? (c.status && c.status === filter) : true
        return loc.includes(getSessionData().district.toLowerCase()) && statusMatch
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

// ===== Official Announcements =====
function OfficialAnnouncements({ onEdit }) {
  const { t } = useLanguage()
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await deleteDoc(doc(db, 'announcements', id))
    }
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h3>📢 {t('Announcements')}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage official government notices.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        {announcements.length === 0 ? (
          <p style={{ padding: 20 }}>No recent announcements.</p>
        ) : (
          <table className="market-table" style={{ width: '100%', minWidth: 600 }}>
            <thead>
              <tr>
                <th>Title / ಶೀರ್ಷಿಕೆ</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Target</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td><span className="badge badge-primary">{a.category}</span></td>
                  <td><span className={`badge ${a.priority === 'Emergency / ತುರ್ತು' || a.priority === 'Urgent' ? 'badge-danger' : 'badge-info'}`}>{a.priority}</span></td>
                  <td>{a.target}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon" onClick={() => onEdit(a)} style={{ color: '#3b82f6' }} title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="btn-icon" onClick={() => handleDelete(a.id)} style={{ color: '#ef4444' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ===== Announce =====
function AnnounceScreen({ editMode, editingAnnouncement }) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [title, setTitle] = useState(editMode && editingAnnouncement ? editingAnnouncement.title : '')
  const [category, setCategory] = useState(editMode && editingAnnouncement ? editingAnnouncement.category : 'Government / ಸರ್ಕಾರ')
  const [priority, setPriority] = useState(editMode && editingAnnouncement ? editingAnnouncement.priority : 'Normal')
  const [message, setMessage] = useState(editMode && editingAnnouncement ? editingAnnouncement.message : '')
  const [target, setTarget] = useState(editMode && editingAnnouncement ? editingAnnouncement.target : 'All Districts')

  const handlePublish = async () => {
    if (!title || !message) return alert('Please fill required fields')
    if (editMode) {
      await setDoc(doc(db, 'announcements', editingAnnouncement.id), {
        title, category, priority, message, target,
        publishedBy: editingAnnouncement.publishedBy || getSessionData().name,
        createdAt: editingAnnouncement.createdAt
      })
      setSubmitted(true)
    } else {
      await addDoc(collection(db, 'announcements'), {
        title,
        category,
        priority,
        message,
        target,
        publishedBy: getSessionData().name,
        createdAt: serverTimestamp()
      })
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }} className="animate-fadeInUp">
        <div style={{ fontSize: 72, marginBottom: 20 }}>📢</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t('announcePublished')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>{t('announceMsg')}</p>
        <button className="btn btn-primary" onClick={() => { setSubmitted(false); setTitle(''); setMessage(''); }}>{t('publishAnother')}</button>
      </div>
    )
  }
  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 700 }}>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{editMode ? 'Edit Announcement' : t('announceFormTitle')}</h3>
        <div className="login-form" style={{ gap: 18 }}>
          <div className="form-group">
            <label className="form-label">{t('announceLabel')}</label>
            <input className="form-input" placeholder={t('announcePlaceholder')} value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">{t('categoryLabel')}</label>
              <select className="form-input" value={category} onChange={e => setCategory(e.target.value)}>
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
              <select className="form-input" value={priority} onChange={e => setPriority(e.target.value)}>
                <option>Normal</option>
                <option>Urgent</option>
                <option>Emergency / ತುರ್ತು</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('messageLabel')}</label>
            <textarea className="form-input" rows={5} placeholder={t('messagePlaceholder')} style={{ resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">{t('targetVillages')}</label>
              <select className="form-input" value={target} onChange={e => setTarget(e.target.value)}>
                <option>All Districts</option>
                {allDistricts.map((d, i) => (
                  <option key={i}>{d}</option>
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
          <button className="btn btn-primary" style={{ padding: '14px 24px' }} onClick={handlePublish}>
            {editMode ? 'Update Announcement' : t('publishBtn')}
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
    localStorage.setItem('official_name',  draftProfile.fullName)
    localStorage.setItem('official_desig', draftProfile.designation)
    localStorage.setItem('official_taluk', draftProfile.taluk)
    localStorage.setItem('official_id',    draftProfile.officerId)
    localStorage.setItem('official_department',  draftProfile.department)
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
  announcements: { titleKey: 'Announcements', subKey: 'View Notices' },
  analytics:  { titleKey: 'sNavAnalytics',     subKey: 'officerLocation' },
  citizens:   { titleKey: 'sNavCitizens',      subKey: 'schemesSub' },
  settings:   { titleKey: 'sNavSettings',      subKey: 'profileSub' },
}

// ===== Main Dashboard =====
export default function OfficialDashboard() {
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)

  const handleEditAnnouncement = (announcement) => {
    setEditMode(true)
    setEditingAnnouncement(announcement)
    setActive('announce')
  }
  const [sessionData, setSessionData] = useState(getSessionData())
  const [pendingCount, setPendingCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)

  useEffect(() => {
    const handleProfileUpdate = () => {
      setSessionData(getSessionData())
    }
    window.addEventListener('profileUpdate', handleProfileUpdate)
    return () => window.removeEventListener('profileUpdate', handleProfileUpdate)
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id || doc.id }))
      const merged = [...fetched, ...kaNewComplaints, ...kaResolvedComplaints.map(c => ({...c, status: 'resolved'}))].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
      
      const districtDocs = merged.filter(c => {
        const loc = (c.district || c.taluk || c.village || '').toLowerCase()
        return loc.includes(sessionData.district.toLowerCase())
      })
      setPendingCount(districtDocs.filter(c => c.status === 'pending').length)
      setResolvedCount(districtDocs.filter(c => c.status === 'resolved').length)
    })
    return () => unsubscribe()
  }, [sessionData.district])

  const [complaintFilter, setComplaintFilter] = useState(null) // 'pending' | null
  const handlePendingClick = () => {
    setComplaintFilter('pending')
    setActive('complaints')
  }
  const handleResolvedClick = () => {
    setActive('resolved')
  }
  const { t } = useLanguage()
  const page = pageMeta[active] || pageMeta.overview

  const renderScreen = () => {
    switch (active) {
      case 'overview':   return <OverviewScreen onPendingClick={handlePendingClick} onResolvedClick={handleResolvedClick} sessionData={sessionData} pendingCount={pendingCount} resolvedCount={resolvedCount} />
      case 'complaints': return <ComplaintsScreen resolved={false} filter={complaintFilter} />
      case 'resolved':   return <ComplaintsScreen resolved={true} />
      case 'state':      return <ComplaintsScreen resolved={false} stateOverview={true} />
      case 'announcements': return <OfficialAnnouncements onEdit={handleEditAnnouncement} />
      case 'announce':   return <AnnounceScreen editMode={editMode} editingAnnouncement={editingAnnouncement} />
      case 'analytics':  return <AnalyticsScreen sessionData={sessionData} pendingCount={pendingCount} resolvedCount={resolvedCount} />
      case 'citizens':   return <CitizensScreen />
      case 'settings':   return <SettingsScreen />
      default:           return <OverviewScreen sessionData={sessionData} pendingCount={pendingCount} resolvedCount={resolvedCount} />
    }
  }

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)

  const renderModals = () => {
    return (
      <>
        {searchOpen && (
          <div className="modal-overlay" onClick={() => setSearchOpen(false)}>
            <div className="modal-content animate-fadeInUp" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, padding: '20px 24px', zIndex: 100 }}>
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
                  placeholder="Search complaints, citizens, or announcements..." 
                  autoFocus 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const q = searchQuery.toLowerCase();
                      if (q.includes('farmer') || q.includes('citizen')) setActive('citizens');
                      else if (q.includes('announce')) setActive('announcements');
                      else setActive('complaints');
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <OfficialSidebar 
        active={active} 
        setActive={(id) => { setActive(id); setSidebarOpen(false); }} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sessionData={sessionData}
      />
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
              <div className="topbar-title">{t(page.titleKey) || page.titleKey}</div>
              <div className="topbar-subtitle">{sessionData.district} District, Karnataka — {sessionData.department}</div>
            </div>
          </div>
          <div className="topbar-right">
            <LanguageSwitcher variant="topbar-style" />
            <ThemeToggle />
            <button className="topbar-icon-btn" onClick={() => setSearchOpen(true)}>
              <Search size={18} strokeWidth={2} />
            </button>
            <div style={{ position: 'relative' }}>
              <button className="topbar-icon-btn" title="Notifications" onClick={() => setNotifOpen(!notifOpen)}>
                <Bell size={18} strokeWidth={2} />
                <div className="notif-dot" />
              </button>
              {notifOpen && (
                <div className="notif-dropdown animate-fadeInUp" style={{ right: 0 }}>
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <button onClick={() => setNotifOpen(false)}><X size={14} /></button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread" onClick={() => { setActive('complaints'); setNotifOpen(false) }} style={{ cursor: 'pointer' }}>
                      <div className="notif-icon bg-warning"><ClipboardList size={16} /></div>
                      <div>
                        <p>5 new water complaints in your taluk.</p>
                        <span>10 mins ago</span>
                      </div>
                    </div>
                    <div className="notif-item" onClick={() => { setActive('citizens'); setNotifOpen(false) }} style={{ cursor: 'pointer' }}>
                      <div className="notif-icon bg-success"><Users size={16} /></div>
                      <div>
                        <p>12 new farmer registrations today.</p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="topbar-icon-btn" onClick={() => setActive('settings')}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>
                {sessionData.initial}
              </div>
            </button>
          </div>
        </header>
        <main className="page-content">
          {renderScreen()}
        </main>
      </div>
      {renderModals()}
    </div>
  )
}
