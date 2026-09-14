import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useVoice } from '../context/VoiceContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import {
  LayoutDashboard, ClipboardList, CheckCircle2, Megaphone,
  BarChart3, Users, Settings, Landmark, LogOut, ArrowRight,
  TrendingUp, Clock, RefreshCw, CheckCircle, Bell, Search,
  Droplets, Zap, Route, GraduationCap, Activity, Sprout, Trash2,
  MapPin, Phone, Home, ShieldCheck, Mail, Map, Building2, User,
  Star, Tag, Calendar, Menu, X, Hourglass, Folder, FileText, AlertTriangle, Send, ArrowUp, Check, Edit3,
  HelpCircle, MapPinOff, MessageSquarePlus
} from 'lucide-react'
import * as Icons from 'lucide-react'

import { db } from '../firebase'
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, addDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { ESCALATION_LEVELS, isOverdue, getCurrentLevel, getNextLevel, daysSince } from '../utils/escalation'

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
    taluk: window.localStorage.getItem('official_taluk') || 'Mysuru Taluk',
    gp: window.localStorage.getItem('official_gp') || '',
    designation: 'Panchayat Development Officer (PDO)',
  }
}

// ===== Karnataka Official Data =====
const kaNewComplaints = [
  { id: 'GS-KA-0501', title: 'No Water for 3 Days — Ward 5', village: 'Ramanagara', status: 'pending', category: 'Water', date: '5 Aug', priority: 'high' },
  { id: 'GS-KA-0498', title: 'Pothole on NH 275 near GKVK', village: 'Mysuru', status: 'inprogress', category: 'Roads', date: '4 Aug', priority: 'medium' },
  { id: 'GS-KA-0489', title: 'FPS Giving Less Ration — Mandya', village: 'Mandya', status: 'pending', category: 'Ration/PDS', date: '3 Aug', priority: 'high' },
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
function OfficialSidebar({ active, setActive, sidebarOpen, setSidebarOpen, sessionData, pendingInquiryCount = 0 }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
    setActive('overview')
    setSidebarOpen(false)
    logoTapTimer.current = setTimeout(() => {
      logoTapCount.current = 0
    }, 1200)
  }

  const navItems = [
    { id: 'overview',        icon: LayoutDashboard,    labelKey: 'sNavOverview',       badge: null },
    { id: 'complaints',      icon: ClipboardList,      labelKey: 'sNavNewComplaints',  badge: '28' },
    { id: 'resolved',        icon: CheckCircle2,       labelKey: 'sNavResolved',       badge: null },
    { id: 'inquiries',       icon: HelpCircle,         labelKey: 'sNavInquiries',      badge: pendingInquiryCount > 0 ? String(pendingInquiryCount) : null },
    { id: 'state',           icon: Map,                labelKey: 'State Overview',     badge: null },
    { id: 'announcements',   icon: ClipboardList,      labelKey: 'Announcements',      badge: null },
    { id: 'announce',        icon: Megaphone,          labelKey: 'sNavPublish',        badge: null },
    { id: 'analytics',       icon: BarChart3,          labelKey: 'sNavAnalytics',      badge: null },
    { id: 'citizens',        icon: Users,              labelKey: 'sNavCitizens',       badge: null },
    { id: 'settings',        icon: Settings,           labelKey: 'sNavSettings',       badge: null },
  ]

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ background: '#0f172a' }}>
      <div className="sidebar-logo">
        <div 
          onClick={handleLogoSecretTap}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
          title="Triple tap for Demo Hub"
        >
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
          <p>
            {sessionData.taluk && `${sessionData.taluk}, `}{sessionData.district} District
            {sessionData.gp && ` — GP: ${sessionData.gp}`}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <span className="badge badge-danger" onClick={onPendingClick} style={{ cursor: 'pointer' }}>{pendingCount} {t('pendingComplaints')}</span>
            <span className="badge badge-success" onClick={onResolvedClick} style={{ cursor: 'pointer' }}>{resolvedCount} {t('resolvedComplaints')} This Week</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{sessionData.district} District</span>
            {sessionData.taluk && <span className="badge" style={{ background: 'rgba(255,255,255,0.12)', color: '#93c5fd', display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {sessionData.taluk}</span>}
            {sessionData.gp && <span className="badge" style={{ background: 'rgba(255,255,255,0.10)', color: '#bbf7d0', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Home size={12} /> {sessionData.gp}</span>}
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
        <h2 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={24} style={{ color: '#22c55e' }} /> Analytics & Reports
        </h2>
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
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <BarChart3 size={18} style={{ color: '#6366f1' }} /> Complaints by Category
        </h3>
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

// ===== Respond Modal =====
// Rendered via React Portal so position:fixed covers the full viewport
// regardless of parent overflow / transform stacking contexts.
function RespondModal({ complaint, onClose, onSaved }) {
  const session = getSessionData()
  const [responseText, setResponseText] = useState('')
  const [newStatus, setNewStatus] = useState(complaint.status || 'pending')
  const [etaDays, setEtaDays] = useState('')
  const [saving, setSaving] = useState(false)

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSave = async () => {
    if (!responseText.trim()) return
    setSaving(true)
    const responseObj = {
      message: responseText,
      status: newStatus,
      etaDays: etaDays ? Number(etaDays) : null,
      respondedBy: session.name || 'Official',
      role: session.department,
      escalationLevel: complaint.escalationLevel ?? 0,
      timestamp: new Date().toISOString(),
    }
    try {
      if (complaint._docId) {
        await updateDoc(doc(db, complaint._collection || 'complaints', complaint._docId), {
          status: newStatus,
          lastUpdate: responseText,
          lastRespondedAt: serverTimestamp(),
          responses: arrayUnion(responseObj),
        })
      }
      // Also add to the new official_responses collection for visibility
      try {
        await addDoc(collection(db, 'official_responses'), {
          ...responseObj,
          complaintRefId: complaint._docId || complaint.id,
          complaintTitle: complaint.title || '',
        })
      } catch (addError) {
        console.warn('Failed to add to official_responses collection (check rules):', addError)
      }
      onSaved(responseObj)
    } catch (e) {
      console.warn('Firestore update failed', e)
      onSaved(responseObj)
    }
    setSaving(false)
    onClose()
  }

  const statusColor = newStatus === 'resolved' ? '#10b981' : newStatus === 'inprogress' ? '#3b82f6' : '#f59e0b'

  return createPortal(
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="animate-fadeInUp"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 20,
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          width: '100%',
          maxWidth: 540,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 32px)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ background: '#6366f120', borderRadius: 8, padding: '6px', display: 'flex' }}>
                <ClipboardList size={16} style={{ color: '#6366f1' }} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 16, margin: 0, color: 'var(--text-primary)' }}>
                Official Response
              </h3>
            </div>
            <p style={{
              fontSize: 12, color: 'var(--text-muted)', margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              <span style={{ fontFamily: 'monospace', color: '#6366f1' }}>{complaint.id}</span>
              {' — '}{complaint.title}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-main)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '6px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>

          {/* Status selector */}
          <div style={{ marginBottom: 16 }}>
            <label className="form-label" style={{ marginBottom: 8 }}>Update Status / ಸ್ಥಿತಿ</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { value: 'pending',    label: 'Pending',     color: '#f59e0b', bg: '#fef3c7' },
                { value: 'inprogress', label: 'In Progress', color: '#3b82f6', bg: '#dbeafe' },
                { value: 'resolved',   label: 'Resolved',    color: '#10b981', bg: '#d1fae5' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setNewStatus(opt.value)}
                  style={{
                    padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.15s',
                    border: newStatus === opt.value ? `2px solid ${opt.color}` : '2px solid var(--border)',
                    background: newStatus === opt.value ? opt.bg : 'var(--bg-main)',
                    color: newStatus === opt.value ? opt.color : 'var(--text-muted)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ETA */}
          {(newStatus === 'pending' || newStatus === 'inprogress') && (
            <div style={{ marginBottom: 16 }}>
              <label className="form-label" style={{ marginBottom: 8 }}>
                Expected Resolution (Days) / ನಿರೀಕ್ಷಿತ ದಿನಗಳು
              </label>
              <input
                type="number" min="1" max="365"
                className="form-input"
                placeholder="e.g. 7"
                value={etaDays}
                onChange={e => setEtaDays(e.target.value)}
              />
            </div>
          )}

          {/* Response textarea */}
          <div style={{ marginBottom: 16 }}>
            <label className="form-label" style={{ marginBottom: 8 }}>
              Your Response / ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ *
            </label>
            <textarea
              className="form-input"
              rows={5}
              placeholder="e.g. Inspection has been scheduled for 20 Aug. The water pump will be repaired within 5 working days..."
              value={responseText}
              onChange={e => setResponseText(e.target.value)}
              style={{ resize: 'vertical', minHeight: 110 }}
            />
          </div>

          {/* Officer info chip */}
          <div style={{
            background: 'var(--bg-main)', borderRadius: 10,
            padding: '10px 14px', fontSize: 12,
            color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--border)',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: `${statusColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: statusColor }}>
                {(session.name || 'O')[0].toUpperCase()}
              </span>
            </div>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{session.name || 'You'}</span>
              <span style={{ color: 'var(--text-muted)' }}> • {session.department}</span>
              {(session.taluk || session.district) && (
                <span style={{ color: 'var(--text-muted)' }}> • {session.taluk || session.district}</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex', gap: 10, flexShrink: 0,
          background: 'var(--bg-card)',
        }}>
          <button
            onClick={handleSave}
            disabled={saving || !responseText.trim()}
            style={{
              flex: 1, padding: '12px 20px', borderRadius: 12,
              background: responseText.trim() ? '#6366f1' : 'var(--bg-main)',
              color: responseText.trim() ? '#fff' : 'var(--text-muted)',
              border: 'none', cursor: responseText.trim() ? 'pointer' : 'not-allowed',
              fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8, transition: 'all 0.2s',
            }}
          >
            {saving
              ? <><RefreshCw size={14} className="animate-spin" /> Saving...</>
              : <><Send size={14} /> Submit Response</>
            }
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 20px', borderRadius: 12,
              background: 'var(--bg-main)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', cursor: 'pointer',
              fontWeight: 600, fontSize: 14,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}


// ===== Escalation badge =====
function EscalationBadge({ complaint }) {
  const level = complaint.escalationLevel ?? 0
  const info = ESCALATION_LEVELS[level]
  const days = Math.floor(daysSince(complaint.lastRespondedAt || complaint.createdAt))
  const overdue = isOverdue(complaint)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700,
        padding: '2px 7px', borderRadius: 6,
        background: level === 0 ? '#dbeafe' : level === 1 ? '#fef3c7' : level === 2 ? '#fee2e2' : '#fce7f3',
        color: level === 0 ? '#1d4ed8' : level === 1 ? '#92400e' : level === 2 ? '#991b1b' : '#9d174d',
      }}>
        {(() => {
          const IconComp = Icons[info.icon] || MapPin;
          return <IconComp size={10} />;
        })()}
        <span>{info.role.split('/')[0].trim()}</span>
      </span>
      {overdue ? (
        <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
          <AlertTriangle size={10} /> {days}d overdue
        </span>
      ) : (
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{days}d / {info.slaDays ?? '—'}d SLA</span>
      )}
    </div>
  )
}

// ===== Complaints =====
function ComplaintsScreen({ resolved, stateOverview, filter }) {
  const { t } = useLanguage()
  const [liveComplaints, setLiveComplaints] = useState(kaNewComplaints)
  const [respondingTo, setRespondingTo] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [submitterFilter, setSubmitterFilter] = useState('all') // 'all' | 'farmer'
  const [collectionFilter, setCollectionFilter] = useState('all') // 'all' | 'complaints' | 'feedback' | 'district_complaints'
  const session = getSessionData()

  useEffect(() => {
    if (resolved) return
    const qComplaints = collection(db, 'complaints')
    const qFeedback = collection(db, 'feedback')
    const qDistrict = collection(db, 'district_complaints')
    
    let docsMap = { complaints: [], feedback: [], district_complaints: [] }

    const updateLiveComplaints = () => {
      const allFetched = [...docsMap.complaints, ...docsMap.feedback, ...docsMap.district_complaints]
      const merged = [...allFetched, ...kaNewComplaints].filter((v, i, a) => a.findIndex(x => x.id === v.id) === i)
      merged.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : Date.parse(a.date) || 0
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : Date.parse(b.date) || 0
        return timeB - timeA
      })
      setLiveComplaints(merged)
    }

    const unsubC = onSnapshot(qComplaints, (snap) => {
      docsMap.complaints = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id, _docId: d.id, _collection: 'complaints' }))
      updateLiveComplaints()
    }, () => {})
    
    const unsubF = onSnapshot(qFeedback, (snap) => {
      docsMap.feedback = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id, _docId: d.id, _collection: 'feedback' }))
      updateLiveComplaints()
    }, () => {})

    const unsubD = onSnapshot(qDistrict, (snap) => {
      docsMap.district_complaints = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id, _docId: d.id, _collection: 'district_complaints' }))
      updateLiveComplaints()
    }, () => {})

    return () => { unsubC(); unsubF(); unsubD(); }
  }, [resolved])

  // Auto-escalation: if overdue and has a Firestore doc ID, escalate
  const handleAutoEscalate = async (complaint) => {
    const next = getNextLevel(complaint)
    if (!next || !complaint._docId) return
    const esc = {
      message: `Auto-escalated after ${Math.floor(daysSince(complaint.lastRespondedAt || complaint.createdAt))} days with no response from ${getCurrentLevel(complaint).role}.`,
      respondedBy: 'System (Auto-Escalation)',
      role: 'GramSetu Platform',
      escalationLevel: complaint.escalationLevel ?? 0,
      timestamp: new Date().toISOString(),
      status: 'escalated',
    }
    try {
      await updateDoc(doc(db, complaint._collection || 'complaints', complaint._docId), {
        escalationLevel: (complaint.escalationLevel ?? 0) + 1,
        status: 'escalated',
        lastUpdate: `Escalated to ${next.role} due to no response.`,
        responses: arrayUnion(esc),
        escalatedAt: serverTimestamp(),
      })
    } catch (e) { console.warn('Escalation failed', e) }
  }

  const displayedComplaints = (() => {
    let list = stateOverview ? liveComplaints : liveComplaints.filter(c => {
      const distMatch = session.district ? (
        (c.district || c.village || '').toLowerCase().includes(session.district.toLowerCase()) ||
        session.district.toLowerCase().includes((c.district || '').toLowerCase())
      ) : true
      const sTalukClean = (session.taluk || '').replace(/ taluk/i, '').trim().toLowerCase()
      const cTalukClean = (c.taluk || '').replace(/ taluk/i, '').trim().toLowerCase()
      const talukMatch = sTalukClean ? (
        !cTalukClean || cTalukClean.includes(sTalukClean) || sTalukClean.includes(cTalukClean)
      ) : true
      const gpMatch = session.gp ? (c.gp || '').toLowerCase() === session.gp.toLowerCase() : true
      const statusMatch = filter ? (c.status === filter) : true
      // Also show escalated complaints that reached this level
      const escLevel = c.escalationLevel ?? 0
      const myLevel = session.department?.includes('Taluk Panchayat') ? 1
        : session.department?.includes('Zilla') || session.department?.includes('CEO') ? 2
        : session.department?.includes('RDPR') || session.department?.includes('Commissioner') ? 3
        : 0
      const levelMatch = stateOverview ? true : escLevel >= myLevel

      // Specific department category filter
      const getEligibleCategories = (dept) => {
        if (!dept) return null
        const d = dept.toLowerCase()
        if (d.includes('agriculture')) return ['Agriculture / RSK', 'ಕೃಷಿ / RSK', 'Agriculture']
        if (d.includes('electricity') || d.includes('bescom')) return ['Electricity / BESCOM', 'ವಿದ್ಯುತ್ / BESCOM', 'Electricity']
        if (d.includes('water')) return ['Water Supply', 'ನೀರು ಸರಬರಾಜು', 'Water']
        if (d.includes('revenue')) return ['Bhoomi / Land Records', 'ಭೂಮಿ / ಭೂ ದಾಖಲೆ', 'Ration/PDS']
        if (d.includes('health') || d.includes('phc')) return ['PHC / Health', 'PHC / ಆರೋಗ್ಯ', 'PHC / स्वास्थ्य']
        if (d.includes('education') || d.includes('ddpi')) return ['Schools / DDPI', 'ಶಾಲೆ / DDPI']
        if (d.includes('panchayat') || d.includes('pdo')) return ['Roads & Paths', 'Sanitation / BBMP', 'ರಸ್ತೆ ಮತ್ತು ದಾರಿ', 'ಸ್ವಚ್ಛತೆ', 'Sanitation', 'Roads']
        return null // General administrative depts see all categories
      }

      const eligibleCats = getEligibleCategories(session.department)
      const deptCatMatch = eligibleCats ? eligibleCats.includes(c.category) : true

      return distMatch && talukMatch && gpMatch && statusMatch && levelMatch && deptCatMatch
    })

    // Search: covers title, id, district, taluk, description, submittedBy
    if (searchText) list = list.filter(c =>
      (c.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (c.id || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (c.district || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (c.taluk || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (c.description || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (c.submittedBy || '').toLowerCase().includes(searchText.toLowerCase())
    )

    if (catFilter !== 'All') list = list.filter(c => c.category === catFilter)
    // Submitter type filter: 'farmer' = only citizen-submitted; 'all' = everything
    if (submitterFilter === 'farmer') list = list.filter(c => c.submitterType === 'farmer' || !c.submitterType)
    // Collection / Submission type filter: 'complaints' | 'feedback' | 'district_complaints'
    if (collectionFilter !== 'all') list = list.filter(c => (c._collection || 'complaints') === collectionFilter)
    return list
  })()

  const overdueCount = displayedComplaints.filter(c => c.status !== 'resolved' && isOverdue(c)).length

  return (
    <div className="animate-fadeInUp">
      {/* Escalation info banner */}
      {overdueCount > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', border: '1px solid #fecaca',
          borderRadius: 12, padding: '12px 16px', marginBottom: 18,
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <AlertTriangle size={22} className="text-red-500" />
          <div>
            <strong style={{ color: '#991b1b', fontSize: 14 }}>{overdueCount} complaint(s) past SLA deadline!</strong>
            <p style={{ margin: 0, fontSize: 12, color: '#b91c1c' }}>
              As per Karnataka RDPR circular, unresolved complaints are auto-escalated after 7 days. Click "Escalate" to forward to the next officer.
            </p>
          </div>
        </div>
      )}

      {/* Escalation hierarchy reference */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {ESCALATION_LEVELS.map(lvl => (
          <div key={lvl.level} style={{
            display: 'flex', alignItems: 'center', gap: 5, fontSize: 11,
            padding: '4px 10px', borderRadius: 8,
            background: lvl.level === 0 ? '#dbeafe' : lvl.level === 1 ? '#fef3c7' : lvl.level === 2 ? '#fee2e2' : '#fce7f3',
            color: lvl.level === 0 ? '#1d4ed8' : lvl.level === 1 ? '#92400e' : lvl.level === 2 ? '#991b1b' : '#9d174d',
            fontWeight: 700
          }}>
            {(() => {
              const IconComp = Icons[lvl.icon] || Landmark;
              return <IconComp size={12} />;
            })()} L{lvl.level}: {lvl.role.split('/')[0].trim()}
            {lvl.slaDays && <span style={{ fontWeight: 400, opacity: 0.7 }}>({lvl.slaDays}d)</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13 }}
            placeholder="Search by title, ID, district, taluk, description, name..."
            value={searchText} onChange={e => setSearchText(e.target.value)} />
        </div>
        <select className="form-input" style={{ width: 150, fontSize: 13 }}
          value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="All">{t('allCategories')}</option>
          <option value="Water Supply">Water</option>
          <option value="Electricity / BESCOM">Electricity</option>
          <option value="Roads & Paths">Roads</option>
          <option value="Agriculture / RSK">Agriculture</option>
          <option value="PHC / Health">Health</option>
        </select>
        {/* Collection / Type Filter (All / Panchayat / Feedback / District) */}
        <div style={{ display: 'flex', background: 'var(--bg-main)', borderRadius: 10, padding: 3, border: '1px solid var(--border-light)', gap: 2, flexWrap: 'wrap' }}>
          {[
            ['all', 'All'],
            ['complaints', '📋 Panchayat'],
            ['feedback', '💬 Feedback'],
            ['district_complaints', '🏛️ District']
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setCollectionFilter(val)}
              style={{
                padding: '6px 11px', fontSize: 12, fontWeight: 600, border: 'none',
                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                background: collectionFilter === val ? 'var(--primary)' : 'transparent',
                color: collectionFilter === val ? '#fff' : 'var(--text-secondary)'
              }}
            >{label}</button>
          ))}
        </div>
        {/* Farmer vs All submitter filter */}
        <div style={{ display: 'flex', background: 'var(--bg-main)', borderRadius: 10, padding: 3, border: '1px solid var(--border-light)', gap: 2 }}>
          {[['all', 'All Submissions'], ['farmer', '🌾 Farmer']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSubmitterFilter(val)}
              style={{
                padding: '6px 12px', fontSize: 12, fontWeight: 600, border: 'none',
                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                background: submitterFilter === val ? 'var(--primary)' : 'transparent',
                color: submitterFilter === val ? '#fff' : 'var(--text-secondary)'
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {!resolved ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {displayedComplaints.map((c, i) => {
            const overdue = isOverdue(c)
            const next = getNextLevel(c)
            const lastResponse = c.responses?.[c.responses.length - 1]
            return (
              <div key={i} className="complaint-status-card animate-fadeInUp"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  borderLeft: `4px solid ${overdue ? '#ef4444' : c.status === 'resolved' ? '#10b981' : c.status === 'escalated' ? '#f59e0b' : '#3b82f6'}`,
                  padding: '16px 18px',
                  flexDirection: 'column',
                }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{c.id}</span>
                      {c._collection === 'feedback' && <span className="badge" style={{ background: '#f59e0b', color: '#fff', fontSize: 10 }}>FEEDBACK</span>}
                      {c._collection === 'district_complaints' && <span className="badge" style={{ background: '#8b5cf6', color: '#fff', fontSize: 10 }}>DISTRICT</span>}
                      <span className={`badge ${
                        c.status === 'resolved' ? 'badge-success'
                        : c.status === 'escalated' ? 'badge-warning'
                        : c.status === 'inprogress' ? 'badge-info'
                        : 'badge-warning'}`} style={{ fontSize: 10 }}>
                        {(() => {
                          if (c.status === 'resolved') {
                            return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><CheckCircle2 size={12} /> Resolved</span>;
                          }
                          if (c.status === 'escalated') {
                            return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><ArrowUp size={12} /> Escalated</span>;
                          }
                          if (c.status === 'inprogress') {
                            return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><RefreshCw size={12} className="animate-spin" /> In Progress</span>;
                          }
                          return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Hourglass size={12} /> Pending</span>;
                        })()}
                      </span>
                      {overdue && <span className="badge badge-danger" style={{ fontSize: 10, display: 'inline-flex', alignItems: 'center', gap: 3 }}><AlertTriangle size={10} /> OVERDUE</span>}
                      {c.status === 'escalated' && (
                        <span style={{ fontSize: 10, color: '#92400e', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <ArrowRight size={10} /> {ESCALATION_LEVELS[c.escalationLevel ?? 0]?.role}
                        </span>
                      )}
                    </div>
                    <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{c.title}</h4>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Folder size={12} /> {c.category}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {c.village || c.taluk || c.district}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {c.date || (c.createdAt?.toDate?.()?.toLocaleDateString()) || 'Unknown'}</span>
                      {c.submittedBy && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><User size={12} /> {c.submittedBy}</span>}
                    </div>
                    {c.photo && (
                      <div style={{ marginTop: 12 }}>
                        <img src={c.photo} alt="Complaint Attachment" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border-light)' }} />
                      </div>
                    )}
                  </div>
                  <EscalationBadge complaint={c} />
                </div>

                {/* Official response thread */}
                {c.responses && c.responses.length > 0 && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}><FileText size={12} /> Response History</div>
                    {c.responses.map((r, ri) => (
                      <div key={ri} style={{
                        background: 'var(--bg-main)', borderRadius: 8, padding: '8px 12px',
                        marginBottom: 6, fontSize: 12,
                        borderLeft: `3px solid ${r.status === 'resolved' ? '#10b981' : r.status === 'escalated' ? '#f59e0b' : '#3b82f6'}`
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <strong style={{ fontSize: 11 }}>{r.respondedBy} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>• {r.role}</span></strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{new Date(r.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-primary)' }}>{r.message}</p>
                        {r.etaDays && <span style={{ fontSize: 10, color: '#3b82f6', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Clock size={10} /> ETA: {r.etaDays} days</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Last response summary if no thread shown */}
                {(!c.responses || c.responses.length === 0) && c.lastUpdate && (
                  <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><AlertTriangle size={12} className="text-amber-500" /> {c.lastUpdate}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setRespondingTo(c)}
                    style={{ fontSize: 12 }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Send size={12} /> Respond / ಉತ್ತರ</span>
                  </button>
                  {overdue && next && (
                    <button
                      className="btn btn-sm"
                      style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', fontSize: 12 }}
                      onClick={() => {
                        if (window.confirm(`Escalate this complaint to ${next.role}? This cannot be undone.`)) {
                          handleAutoEscalate(c)
                        }
                      }}
                    >
                      {(() => {
                        const IconComp = Icons[next.icon] || Landmark;
                        return (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <ArrowUp size={12} /> Escalate to <IconComp size={12} /> {next.role.split('/')[0].trim()}
                          </span>
                        );
                      })()}
                    </button>
                  )}
                  {c.status === 'escalated' && (
                    <span style={{ fontSize: 11, color: '#92400e', alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ArrowUp size={12} /> Now with {ESCALATION_LEVELS[c.escalationLevel ?? 0]?.role}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
          {displayedComplaints.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
              No complaints found for your jurisdiction.
            </div>
          )}
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
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Tag size={12} /> {c.id}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {c.resolvedDate}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={13} fill={si < c.rating ? '#fbbf24' : 'none'} color={si < c.rating ? '#fbbf24' : '#d1d5db'} />
                    ))}
                  </span>
                  <span className="badge badge-success">{t('resolved')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Respond Modal */}
      {respondingTo && (
        <RespondModal
          complaint={respondingTo}
          onClose={() => setRespondingTo(null)}
          onSaved={(resp) => {
            setLiveComplaints(prev => prev.map(c =>
              c.id === respondingTo.id
                ? { ...c, status: resp.status, lastUpdate: resp.message, responses: [...(c.responses || []), resp] }
                : c
            ))
          }}
        />
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
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Megaphone size={18} className="text-pink-500" /> {t('Announcements')}</h3>
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
  // Default target: official's own Taluk
  const session = getSessionData()
  const defaultTarget = session.taluk ? session.taluk : 'All Districts'
  const [target, setTarget] = useState(editMode && editingAnnouncement ? editingAnnouncement.target : defaultTarget)

  const handlePublish = async () => {
    if (!title || !message) return alert('Please fill required fields')
    if (editMode) {
      await updateDoc(doc(db, 'announcements', editingAnnouncement.id), {
        title, category, priority, message, target,
        district: getSessionData().district,
        taluk: getSessionData().taluk,
        gp: getSessionData().gp,
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
        district: getSessionData().district,
        taluk: getSessionData().taluk,
        gp: getSessionData().gp,
        publishedBy: getSessionData().name,
        createdAt: serverTimestamp()
      })
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }} className="animate-fadeInUp">
        <div style={{ marginBottom: 20 }}><Megaphone size={72} className="text-pink-500" /></div>
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
              <label className="form-label">{t('targetVillages')} / ಗುರಿ ಪ್ರದೇಶ</label>
              <select className="form-input" value={target} onChange={e => setTarget(e.target.value)}>
                {/* Smart: official's own jurisdiction first */}
                {session.gp && <option value={session.gp}>My GP: {session.gp}</option>}
                {session.taluk && <option value={session.taluk}>My Taluk: {session.taluk}</option>}
                {session.district && <option value={session.district}>My District: {session.district}</option>}
                <option value="All Districts">All Districts (State-wide)</option>
                <option value="All Villages">All Villages</option>
                <option disabled>──────────────</option>
                {allDistricts.map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
              {session.taluk && (
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  ℹ️ Recommended: Select "My Taluk" or "My GP" to send only to your jurisdiction.
                </p>
              )}
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
  
  const handleExport = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Registered Farmers List', 14, 22)
    
    const tableColumn = ["#", "Name", "Village", "Mobile", "Aadhaar", "Schemes"]
    const tableRows = []
    
    districtFarmers.forEach(([name, village, mobile, aadhaar, schemes], i) => {
      const rowData = [
        i + 1,
        name, // The names include Kannada characters, but standard jsPDF default font might not render them well without custom fonts. 
              // For a simple robust export, we include it, it might fallback or drop complex chars unless configured.
        village,
        mobile,
        aadhaar,
        `${schemes} Active`
      ]
      tableRows.push(rowData)
    })
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    })
    
    doc.save(`Registered_Farmers_${getSessionData().district}.pdf`)
  }

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
          <button className="btn btn-primary btn-sm" onClick={handleExport}>{t('export')}</button>
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
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Officer Profile / ಅಧಿಕಾರಿ ಪ್ರೊಫೈಲ್</h4>
          </div>
          {editingProfile ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={saveProfile} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Check size={14} /> Save</button>
              <button className="btn btn-outline btn-sm" onClick={() => { setDraftProfile({ ...profile }); setEditingProfile(false) }}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-outline btn-sm" onClick={() => { setDraftProfile({ ...profile }); setEditingProfile(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {t('edit')} <Edit3 size={12} />
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
          <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Notification Preferences / ಅಧಿಸೂಚನೆ</h4>
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


// ===== Farmer Inquiries & Missing Data =====
export const initialSampleInquiries = [
  {
    ticketId: 'GS-INQ-948102',
    category: 'missing_village',
    name: 'ರಾಮೇಗೌಡ (Ramegowda)',
    phone: '9845123980',
    email: 'ramegowda.mys@gmail.com',
    district: 'Mysuru',
    taluk: 'Hunsur',
    gp: 'Biligere GP',
    villageName: 'ಕಲ್ಲಹಳ್ಳಿ ಕೊಪ್ಪಲು (Kallahalli Koppalu)',
    subject: 'Add Kallahalli Koppalu hamlet under Biligere GP',
    description: 'Our hamlet has 85 farmer families but is missing from the GramSetu village selection list. Kindly add it to the revenue records list.',
    status: 'pending',
    dateStr: '2 Aug 2026',
    resolutionNotes: '',
    resolvedBy: '',
  },
  {
    ticketId: 'GS-INQ-831745',
    category: 'question',
    name: 'ಮಂಜುಳಾ ದೇವಿ (Manjula Devi)',
    phone: '9448109823',
    email: '',
    district: 'Mandya',
    taluk: 'Pandavapura',
    gp: 'Chinya GP',
    villageName: 'Chinya',
    subject: 'Query on Krishi Bhagya farm pond subsidy timeline',
    description: 'We applied for farm pond (Krishi Honda) under Krishi Bhagya 2 weeks ago. When will the RSK inspection team visit our land?',
    status: 'in_progress',
    dateStr: '1 Aug 2026',
    resolutionNotes: 'Assigned to Assistant Agricultural Officer (AAO) Pandavapura for field inspection on 12 Aug.',
    resolvedBy: 'Panchayat Development Officer',
  },
  {
    ticketId: 'GS-INQ-719324',
    category: 'data_correction',
    name: 'ಚನ್ನಬಸಪ್ಪ (Channabasappa)',
    phone: '9731245890',
    email: '',
    district: 'Shivamogga',
    taluk: 'Shikaripura',
    gp: 'Hosur GP',
    villageName: 'Hosur',
    subject: 'Update APMC Arecanut Rashi procurement rate',
    description: 'The displayed price is for Chali arecanut. Please add separate daily quotation for Red Rashi Supari.',
    status: 'resolved',
    dateStr: '28 Jul 2026',
    resolutionNotes: 'Updated APMC Shimoga commodity ticker to include Red Rashi Arecanut grade prices.',
    resolvedBy: 'Agriculture Marketing Officer',
  }
]

function InquiryResolveModal({ inquiry, onClose, onSaved, sessionData }) {
  const { lang } = useLanguage()
  const [status, setStatus] = useState(inquiry?.status || 'resolved')
  const [notes, setNotes] = useState(inquiry?.resolutionNotes || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const officerName = sessionData?.name || 'Panchayat Development Officer'
    const resolvedAt = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

    // Update in Firestore if _docId is present
    if (inquiry._docId) {
      try {
        await updateDoc(doc(db, 'farmer_inquiries', inquiry._docId), {
          status,
          resolutionNotes: notes,
          resolvedBy: officerName,
          resolvedAt: serverTimestamp()
        })
      } catch (err) {
        console.warn('Firestore update failed:', err)
      }
    }

    // Update in localStorage
    try {
      const local = JSON.parse(window.localStorage.getItem('gramsetu_farmer_inquiries') || '[]')
      const updated = local.map(item => {
        if ((item.ticketId || item.id) === (inquiry.ticketId || inquiry.id)) {
          return { ...item, status, resolutionNotes: notes, resolvedBy: officerName, resolvedAt }
        }
        return item
      })
      window.localStorage.setItem('gramsetu_farmer_inquiries', JSON.stringify(updated))
    } catch (_) {}

    onSaved({
      ...inquiry,
      status,
      resolutionNotes: notes,
      resolvedBy: officerName,
      resolvedAt
    })
    setSaving(false)
    onClose()
  }

  return (
    <div
      className="modal-overlay animate-fadeInUp"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: 'var(--bg-card, #ffffff)', color: 'var(--text-main, #0f172a)',
          borderRadius: 20, maxWidth: 540, width: '100%', padding: 0,
          border: '1px solid var(--border-light, #e2e8f0)', overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          padding: '18px 24px', background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>
              {lang === 'kn' ? 'ವಿಚಾರಣೆ / ಕೋರಿಕೆ ಪರಿಹಾರ' : 'Resolve Farmer Inquiry'}
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, opacity: 0.85 }}>
              Ticket: {inquiry.ticketId || inquiry.id}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: 24 }}>
          {/* Inquiry summary box */}
          <div style={{ background: 'var(--bg-main, #f8fafc)', borderRadius: 12, padding: 14, marginBottom: 18, fontSize: 13, lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <strong>Farmer:</strong> <span>{inquiry.name} ({inquiry.phone})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <strong>Location:</strong> <span>{inquiry.villageName ? `${inquiry.villageName}, ` : ''}{inquiry.taluk || ''} ({inquiry.district})</span>
            </div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed var(--border, #e2e8f0)' }}>
              <strong>Description:</strong> {inquiry.description}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
              {lang === 'kn' ? 'ಸ್ಥಿತಿ ಆಯ್ಕೆಮಾಡಿ *' : 'Update Status *'}
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 10,
                border: '1.5px solid var(--border, #cbd5e1)', background: 'var(--bg-main, #f8fafc)',
                color: 'var(--text-main, #0f172a)', fontSize: 14, outline: 'none'
              }}
            >
              <option value="pending">Pending Review / ಬಾಕಿ ಇದೆ</option>
              <option value="in_progress">In Progress / ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ</option>
              <option value="resolved">Resolved / ಪರಿಹರಿಸಲಾಗಿದೆ</option>
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
              {lang === 'kn' ? 'ಅಧಿಕೃತ ಪರಿಹಾರ ಟಿಪ್ಪಣಿ / Remarks *' : 'Official Resolution Notes / Remarks *'}
            </label>
            <textarea
              required
              rows={3}
              placeholder={lang === 'kn' ? 'ಉದಾ: ಗ್ರಾಮವನ್ನು ಬಿಳಿಕೆರೆ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಗೆ ಸೇರಿಸಲಾಗಿದೆ...' : 'e.g. Verified with revenue records. Village added to master list under Taluk office...'}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 10,
                border: '1.5px solid var(--border, #cbd5e1)', background: 'var(--bg-main, #f8fafc)',
                color: 'var(--text-main, #0f172a)', fontSize: 13, outline: 'none',
                fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent', border: 'none', padding: '10px 16px',
                borderRadius: 10, color: 'var(--text-muted, #64748b)', fontWeight: 600,
                fontSize: 13, cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px',
                borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              {saving ? 'Saving...' : (status === 'resolved' ? 'Confirm Resolution' : 'Update Status')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FarmerInquiriesScreen({ sessionData }) {
  const { lang } = useLanguage()
  const [inquiries, setInquiries] = useState([])
  const [searchText, setSearchText] = useState('')
  // 'missing_village' tab shows only missing village reports; 'questions' shows farmer questions
  const [activeTab, setActiveTab] = useState('missing_village') // 'missing_village' | 'questions'
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'pending' | 'in_progress' | 'resolved'
  const [districtFilter, setDistrictFilter] = useState(sessionData?.district || 'all')
  const [selectedForResolve, setSelectedForResolve] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'farmer_inquiries'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(d => ({
        ...d.data(),
        id: d.data().ticketId || d.id,
        _docId: d.id
      }))
      const local = JSON.parse(window.localStorage.getItem('gramsetu_farmer_inquiries') || '[]')
      const merged = [...fetched, ...local, ...initialSampleInquiries].filter(
        (v, i, a) => a.findIndex(x => (x.ticketId || x.id) === (v.ticketId || v.id)) === i
      )
      setInquiries(merged)
    }, (err) => {
      console.warn('Firestore snapshot error, loading local and sample:', err)
      const local = JSON.parse(window.localStorage.getItem('gramsetu_farmer_inquiries') || '[]')
      const merged = [...local, ...initialSampleInquiries].filter(
        (v, i, a) => a.findIndex(x => (x.ticketId || x.id) === (v.ticketId || v.id)) === i
      )
      setInquiries(merged)
    })
    return () => unsubscribe()
  }, [])

  // Handle local state update after modal resolution
  const handleInquiryUpdated = (updated) => {
    setInquiries(prev => prev.map(item => (
      (item.ticketId || item.id) === (updated.ticketId || updated.id) ? updated : item
    )))
  }

  // Tab-based category: missing_village tab shows missing_village only; questions tab shows question + data_correction + other
  const tabCategoryMatch = (item) => {
    if (activeTab === 'missing_village') return item.category === 'missing_village'
    return item.category !== 'missing_village'
  }

  // Filter inquiries — with district filter + tab filter + status filter + search
  const filtered = inquiries.filter(item => {
    // District filter (officer's district or 'all')
    const districtMatch = districtFilter === 'all' ||
      (item.district || '').toLowerCase() === districtFilter.toLowerCase()

    // Tab-based category filter
    const tabMatch = tabCategoryMatch(item)

    // Status filter
    const statusMatch = statusFilter === 'all' || item.status === statusFilter

    // Search text
    const searchMatch = !searchText.trim() || [
      item.ticketId, item.name, item.phone, item.villageName,
      item.district, item.taluk, item.subject, item.description
    ].some(field => (field || '').toLowerCase().includes(searchText.toLowerCase()))

    return districtMatch && tabMatch && statusMatch && searchMatch
  })

  // Counters (district-filtered)
  const districtInquiries = districtFilter === 'all' ? inquiries :
    inquiries.filter(i => (i.district || '').toLowerCase() === districtFilter.toLowerCase())
  const totalCount = districtInquiries.length
  const pendingCount = districtInquiries.filter(i => i.status === 'pending' || i.status === 'in_progress').length
  const missingVillageCount = districtInquiries.filter(i => i.category === 'missing_village').length
  const resolvedCount = districtInquiries.filter(i => i.status === 'resolved').length
  const questionsCount = districtInquiries.filter(i => i.category !== 'missing_village').length

  const getCatLabel = (cat) => {
    switch (cat) {
      case 'missing_village': return lang === 'kn' ? 'ಕಾಣೆಯಾದ ಗ್ರಾಮ' : 'Missing Village'
      case 'question': return lang === 'kn' ? 'ರೈತ ಪ್ರಶ್ನೆ' : 'Farmer Query'
      case 'data_correction': return lang === 'kn' ? 'ಮಾಹಿತಿ ತಿದ್ದುಪಡಿ' : 'Data Correction'
      default: return lang === 'kn' ? 'ಇತರ ನೆರವು' : 'General Help'
    }
  }

  const getCatIcon = (cat) => {
    switch (cat) {
      case 'missing_village': return MapPinOff
      case 'question': return HelpCircle
      case 'data_correction': return FileText
      default: return MessageSquarePlus
    }
  }

  return (
    <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)',
        borderRadius: 20, padding: '24px 28px', color: '#fff',
        boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.3)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
            <HelpCircle size={14} />
            <span>{lang === 'kn' ? 'ರೈತ ಸಹಾಯವಾಣಿ & ಡೇಟಾಬೇಸ್ ನಿರ್ವಹಣೆ' : 'Citizen Assistance & Database Updates'}</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>
            {lang === 'kn' ? 'ರೈತರ ವಿಚಾರಣೆಗಳು ಮತ್ತು ಕಾಣೆಯಾದ ಮಾಹಿತಿ' : 'Farmer Inquiries & Missing Data Portal'}
          </h2>
          <p style={{ fontSize: 13, opacity: 0.85, margin: '6px 0 0 0' }}>
            {lang === 'kn'
              ? 'ರೈತರು ಕಳುಹಿಸಿದ ಕಾಣೆಯಾದ ಗ್ರಾಮಗಳ ಹೆಸರುಗಳು, ಪ್ರಶ್ನೆಗಳು ಹಾಗೂ ತಿದ್ದುಪಡಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಪರಿಹರಿಸಿ.'
              : 'Review submitted missing village names, agricultural questions, and portal correction requests.'}
          </p>
        </div>
        {/* District + Pending badge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 14, padding: '12px 18px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#fef08a' }}>{pendingCount}</div>
            <div style={{ fontSize: 11, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              {lang === 'kn' ? 'ಬಾಕಿ ಇರುವ ಕೋರಿಕೆಗಳು' : 'Pending Resolution'}
            </div>
          </div>
          {/* District Filter */}
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            style={{
              padding: '7px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, fontWeight: 700,
              outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="all" style={{ color: '#0f172a' }}>{lang === 'kn' ? 'ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು' : 'All Districts'}</option>
            {allDistricts.map(d => (
              <option key={d} value={d} style={{ color: '#0f172a' }}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TAB SWITCHER — Missing Villages vs Farmer Questions */}
      <div style={{ display: 'flex', gap: 0, background: 'var(--bg-main, #f1f5f9)', borderRadius: 14, padding: 4, border: '1px solid var(--border-light, #e2e8f0)', alignSelf: 'flex-start' }}>
        <button
          onClick={() => setActiveTab('missing_village')}
          style={{
            padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            background: activeTab === 'missing_village' ? '#16a34a' : 'transparent',
            color: activeTab === 'missing_village' ? '#fff' : 'var(--text-secondary, #64748b)',
            boxShadow: activeTab === 'missing_village' ? '0 4px 12px rgba(22,163,74,0.25)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <MapPinOff size={15} />
          {lang === 'kn' ? 'ಕಾಣೆಯಾದ ಗ್ರಾಮಗಳು' : 'Missing Villages'}
          <span style={{ background: activeTab === 'missing_village' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', color: activeTab === 'missing_village' ? '#fff' : '#64748b', borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 800 }}>
            {missingVillageCount}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          style={{
            padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            background: activeTab === 'questions' ? '#3b82f6' : 'transparent',
            color: activeTab === 'questions' ? '#fff' : 'var(--text-secondary, #64748b)',
            boxShadow: activeTab === 'questions' ? '0 4px 12px rgba(59,130,246,0.25)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <HelpCircle size={15} />
          {lang === 'kn' ? 'ರೈತರ ಪ್ರಶ್ನೆಗಳು' : 'Farmer Questions'}
          <span style={{ background: activeTab === 'questions' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', color: activeTab === 'questions' ? '#fff' : '#64748b', borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 800 }}>
            {questionsCount}
          </span>
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{totalCount}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lang === 'kn' ? 'ಒಟ್ಟು ಸಲ್ಲಿಕೆಗಳು' : 'Total Inquiries'}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{pendingCount}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lang === 'kn' ? 'ಪರಿಶೀಲನೆಯಲ್ಲಿವೆ' : 'Pending Action'}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPinOff size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{missingVillageCount}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lang === 'kn' ? 'ಕಾಣೆಯಾದ ಗ್ರಾಮಗಳು' : 'Missing Villages'}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{resolvedCount}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lang === 'kn' ? 'ಪರಿಹರಿಸಲಾಗಿದೆ' : 'Resolved'}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 400 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={lang === 'kn' ? 'ರೈತ, ಗ್ರಾಮ, ಫೋನ್ ಅಥವಾ ಟಿಕೆಟ್ ಐಡಿ ಹುಡುಕಿ...' : 'Search by farmer, village, phone, or ticket ID...'}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{
                width: '100%', padding: '9px 12px 9px 36px', borderRadius: 10,
                border: '1.5px solid var(--border, #cbd5e1)', background: 'var(--bg-main, #f8fafc)',
                color: 'var(--text-main, #0f172a)', fontSize: 13, outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Status Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-main, #f1f5f9)', padding: 3, borderRadius: 10, gap: 4 }}>
            {[
              { id: 'all', label: lang === 'kn' ? 'ಎಲ್ಲಾ' : 'All' },
              { id: 'pending', label: lang === 'kn' ? 'ಬಾಕಿ' : 'Pending' },
              { id: 'in_progress', label: lang === 'kn' ? 'ಪ್ರಕ್ರಿಯೆ' : 'In Progress' },
              { id: 'resolved', label: lang === 'kn' ? 'ಪರಿಹರಿಸಲಾಗಿದೆ' : 'Resolved' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  background: statusFilter === tab.id ? '#ffffff' : 'transparent',
                  color: statusFilter === tab.id ? '#0f172a' : '#64748b',
                  border: 'none', borderRadius: 8, padding: '6px 12px',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  boxShadow: statusFilter === tab.id ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry List */}
      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-main, #f1f5f9)', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            {activeTab === 'missing_village' ? <MapPinOff size={28} /> : <HelpCircle size={28} />}
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>
            {activeTab === 'missing_village'
              ? (lang === 'kn' ? 'ಯಾವುದೇ ಕಾಣೆಯಾದ ಗ್ರಾಮ ವರದಿಗಳಿಲ್ಲ' : 'No Missing Village Reports Found')
              : (lang === 'kn' ? 'ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No Farmer Questions Found')}
          </h4>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            {lang === 'kn' ? 'ಫಿಲ್ಟರ್ ಅಥವಾ ಹುಡುಕಾಟ ಬದಲಾಯಿಸಿ ನೋಡಿ' : 'Try adjusting your search terms or district filter'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {filtered.map(item => {
            const CatIcon = getCatIcon(item.category)
            const isResolved = item.status === 'resolved'
            const isInProgress = item.status === 'in_progress'

            return (
              <div
                key={item.ticketId || item.id}
                className="card"
                style={{
                  padding: 20,
                  borderLeft: item.category === 'missing_village'
                    ? '4px solid #16a34a'
                    : isResolved
                    ? '4px solid #10b981'
                    : '4px solid #3b82f6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted, #64748b)', letterSpacing: '0.04em' }}>
                      {item.ticketId || item.id}
                    </span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: item.category === 'missing_village' ? 'rgba(22, 163, 74, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                      color: item.category === 'missing_village' ? '#15803d' : '#1d4ed8'
                    }}>
                      <CatIcon size={12} />
                      <span>{getCatLabel(item.category)}</span>
                    </span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: isResolved ? 'rgba(16, 185, 129, 0.12)' : isInProgress ? 'rgba(59, 130, 246, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      color: isResolved ? '#059669' : isInProgress ? '#2563eb' : '#d97706'
                    }}>
                      {isResolved ? 'Resolved' : isInProgress ? 'In Progress' : 'Pending Review'}
                    </span>
                  </div>

                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {item.dateStr || 'Recent'}
                  </span>
                </div>

                {/* Farmer & Location Info */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, background: 'var(--bg-main, #f8fafc)', padding: '10px 14px', borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} style={{ color: '#64748b' }} />
                    <strong>{item.name}</strong>
                  </div>
                  {item.phone && (
                    <a
                      href={`tel:${item.phone}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <Phone size={14} />
                      <span>{item.phone}</span>
                    </a>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                    <MapPin size={14} style={{ color: '#64748b' }} />
                    <span>
                      {item.taluk ? `${item.taluk}, ` : ''}{item.district}
                      {item.gp ? ` (GP: ${item.gp})` : ''}
                    </span>
                  </div>
                </div>

                {/* Special Village Highlight if Missing Village */}
                {item.villageName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>
                      {lang === 'kn' ? 'ಸೇರಿಸಬೇಕಾದ ಗ್ರಾಮ:' : 'Reported Village / Area:'}
                    </span>
                    <span style={{
                      background: 'rgba(22, 163, 74, 0.12)',
                      color: '#15803d',
                      padding: '4px 12px',
                      borderRadius: 8,
                      fontWeight: 800,
                      fontSize: 13
                    }}>
                      {item.villageName}
                    </span>
                  </div>
                )}

                {/* Subject & Description */}
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.subject}
                  </h4>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>

                {/* Resolution Notes Box if already resolved */}
                {item.resolutionNotes && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 12,
                    color: '#065f46',
                    lineHeight: 1.5
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 2 }}>
                      <CheckCircle2 size={13} />
                      <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಪರಿಹಾರ ವಿವರ' : 'Official Resolution'}</span>
                      {item.resolvedBy && <span style={{ opacity: 0.7 }}>· By {item.resolvedBy}</span>}
                    </div>
                    <div>{item.resolutionNotes}</div>
                  </div>
                )}

                {/* Resolve Action Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 6 }}>
                  <button
                    onClick={() => setSelectedForResolve(item)}
                    style={{
                      background: isResolved ? 'transparent' : '#3b82f6',
                      color: isResolved ? '#2563eb' : '#fff',
                      border: isResolved ? '1.5px solid #3b82f6' : 'none',
                      borderRadius: 8,
                      padding: '7px 16px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: isResolved ? 'none' : '0 2px 6px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <CheckCircle2 size={14} />
                    <span>{isResolved ? (lang === 'kn' ? 'ಟಿಪ್ಪಣಿ ತಿದ್ದುಪಡಿ' : 'Edit Resolution') : (lang === 'kn' ? 'ಪರಿಹರಿಸಿ / Update' : 'Resolve / Update')}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Resolution Modal */}
      {selectedForResolve && (
        <InquiryResolveModal
          inquiry={selectedForResolve}
          sessionData={sessionData}
          onClose={() => setSelectedForResolve(null)}
          onSaved={handleInquiryUpdated}
        />
      )}
    </div>
  )
}

// ===== Page meta =====
const pageMeta = {
  overview:   { titleKey: 'sNavOverview',      subKey: 'officerLocation' },
  complaints: { titleKey: 'sNavNewComplaints', subKey: 'complaintSub' },
  resolved:   { titleKey: 'sNavResolved',      subKey: 'statusSub' },
  inquiries:  { titleKey: 'inquiriesTitle',    subKey: 'inquiriesSub' },
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
  const { speak } = useVoice()

  useEffect(() => {
    if (!window.sessionStorage.getItem('official_welcomed')) {
      window.sessionStorage.setItem('official_welcomed', 'true')
      const name = window.localStorage.getItem('official_name') || 'Official'
      const timer = setTimeout(() => {
        speak(`Namaskara ${name}`)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [speak])

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
    const qComplaints = collection(db, 'complaints')
    const qFeedback = collection(db, 'feedback')
    const qDistrict = collection(db, 'district_complaints')
    
    let docsMap = { complaints: [], feedback: [], district_complaints: [] }

    const updateCounts = () => {
      const allFetched = [...docsMap.complaints, ...docsMap.feedback, ...docsMap.district_complaints]
      const merged = [...allFetched, ...kaNewComplaints, ...kaResolvedComplaints.map(c => ({...c, status: 'resolved'}))].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
      
      const districtDocs = merged.filter(c => {
        const loc = (c.district || c.taluk || c.village || '').toLowerCase()
        return loc.includes(sessionData.district.toLowerCase())
      })
      setPendingCount(districtDocs.filter(c => c.status === 'pending').length)
      setResolvedCount(districtDocs.filter(c => c.status === 'resolved').length)
    }

    const unsubC = onSnapshot(qComplaints, (snap) => {
      docsMap.complaints = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id }))
      updateCounts()
    }, () => {})
    
    const unsubF = onSnapshot(qFeedback, (snap) => {
      docsMap.feedback = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id }))
      updateCounts()
    }, () => {})

    const unsubD = onSnapshot(qDistrict, (snap) => {
      docsMap.district_complaints = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id }))
      updateCounts()
    }, () => {})

    return () => { unsubC(); unsubF(); unsubD(); }
  }, [sessionData.district])

  const [pendingInquiriesCount, setPendingInquiriesCount] = useState(0)
  useEffect(() => {
    const q = query(collection(db, 'farmer_inquiries'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ ...d.data(), id: d.data().ticketId || d.id }))
      const local = JSON.parse(window.localStorage.getItem('gramsetu_farmer_inquiries') || '[]')
      const all = [...docs, ...local, ...initialSampleInquiries].filter((v, i, a) => a.findIndex(t => (t.ticketId || t.id) === (v.ticketId || v.id)) === i)
      const pending = all.filter(item => item.status === 'pending' || item.status === 'in_progress').length
      setPendingInquiriesCount(pending)
    }, () => {
      const local = JSON.parse(window.localStorage.getItem('gramsetu_farmer_inquiries') || '[]')
      const all = [...local, ...initialSampleInquiries].filter((v, i, a) => a.findIndex(t => (t.ticketId || t.id) === (v.ticketId || v.id)) === i)
      const pending = all.filter(item => item.status === 'pending' || item.status === 'in_progress').length
      setPendingInquiriesCount(pending)
    })
    return () => unsub()
  }, [])

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
      case 'inquiries':  return <FarmerInquiriesScreen sessionData={sessionData} />
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
        pendingInquiryCount={pendingInquiriesCount}
      />
      {sidebarOpen && <div className="sidebar-overlay-mobile" onClick={() => setSidebarOpen(false)} />}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              <Menu size={22} strokeWidth={2} />
            </button>
            <div style={{ minWidth: 0 }}>
              <div className="topbar-title">{t(page.titleKey) || page.titleKey}</div>
              <div className="topbar-subtitle">{sessionData.district} District, Karnataka — {sessionData.department}</div>
            </div>
          </div>
          <div className="topbar-actions">
            <LanguageSwitcher variant="topbar-style" />
            <ThemeToggle />
            <button className="topbar-icon-btn" onClick={() => setSearchOpen(true)}>
              <Search size={18} strokeWidth={2} />
            </button>
            <div style={{ position: 'relative' }}>
              <button type="button" className="topbar-icon-btn" title="Notifications" onClick={() => setNotifOpen(!notifOpen)}>
                <Bell size={18} strokeWidth={2} />
                <div className="notif-dot" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold', color: '#fff' }}>2</div>
              </button>
              {notifOpen && (
                <div className="notif-dropdown animate-fadeInUp" style={{ right: 0 }}>
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setNotifOpen(false); }}><X size={14} /></button>
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
