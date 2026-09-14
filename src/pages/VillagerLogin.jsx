import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import { Wheat, Landmark, TrendingUp, ClipboardList, ArrowLeft, AlertTriangle, CheckCircle2, Mail, Send, ShieldCheck, Building2, TreePine, MapPin, MapPinOff, HelpCircle, Edit3 } from 'lucide-react'
import { sendOtpEmail } from '../utils/sendOtp'
import { db, auth } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { districtsOfKarnataka } from '../data/karnatakaTaluks'
import talukToGps from '../data/talukToGps'
import villageData from '../data/karnatakVillages'
import karnatakaUrbanData from '../data/karnatakaUrbanData'
import FarmerInquiryModal from '../components/FarmerInquiryModal'

export default function VillagerLogin() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()

  useEffect(() => {
    // Only auto-redirect if logged in AND didn't explicitly log out
    const isLoggedOut = window.localStorage.getItem('citizen_logged_out') === 'true'
    if (!isLoggedOut && (window.localStorage.getItem('citizen_email') || window.localStorage.getItem('citizen_phone'))) {
      navigate('/dashboard/villager')
    }
  }, [navigate])

  // Pre-fill from previous session if user came back after logout
  const prevEmail    = window.localStorage.getItem('citizen_email')    || ''
  const prevPhone    = window.localStorage.getItem('citizen_phone')    || ''
  const prevName     = window.localStorage.getItem('citizen_name')     || ''
  const prevDistrict = window.localStorage.getItem('citizen_district') || ''
  const prevTaluk    = window.localStorage.getItem('citizen_taluk')    || ''

  // Check if this is a returning user (previously logged out)
  const isReturningUser = window.localStorage.getItem('citizen_logged_out') === 'true' && prevName && prevEmail

  const [step, setStep] = useState(isReturningUser ? 0 : 1) // 0 = welcome-back, 1 = form, 2 = otp
  const [email, setEmail] = useState(prevEmail)
  const [phone, setPhone] = useState(prevPhone)
  const [name, setName] = useState(prevName)
  const [district, setDistrict] = useState(prevDistrict)
  const [taluk, setTaluk] = useState(prevTaluk)
  const [areaType, setAreaType] = useState(window.localStorage.getItem('citizen_area_type') || '')  // 'rural' | 'urban'
  const [gp, setGp] = useState(window.localStorage.getItem('citizen_gp') || '')
  const [village, setVillage] = useState(window.localStorage.getItem('citizen_village') || '')
  const [isOtherVillage, setIsOtherVillage] = useState(false)
  // Urban fields
  const [urbanBody, setUrbanBody] = useState(window.localStorage.getItem('citizen_area_type') === 'urban' ? (window.localStorage.getItem('citizen_gp') || '') : '')
  const [ward, setWard] = useState(window.localStorage.getItem('citizen_area_type') === 'urban' ? (window.localStorage.getItem('citizen_village') || '') : '')
  const [otp, setOtp] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [inquiryCategory, setInquiryCategory] = useState('missing_village')

  // ── Cascading helpers ──────────────────────────────────────────
  const activeDistrictObj = useMemo(
    () => districtsOfKarnataka.find(d => d.name === district) || null,
    [district]
  )
  const activeTalukObj = useMemo(
    () => activeDistrictObj?.taluks.find(t => t.name === taluk) || null,
    [activeDistrictObj, taluk]
  )
  
  const talukKey = district && taluk ? `${district}|${taluk}` : ''
  const availableGps = useMemo(
    () => (talukKey ? (talukToGps[talukKey] || []) : []),
    [talukKey]
  )

  const villageKey = district && taluk && gp ? `${district}|${taluk}|${gp}` : ''
  const availableVillages = useMemo(
    () => (villageKey ? (villageData[villageKey] || []) : []),
    [villageKey]
  )

  // ── Cascade resets ──────────────────────────────────────────────
  const handleDistrictChange = (d) => {
    setDistrict(d)
    setTaluk('')
    setAreaType('')
    setGp('')
    setVillage('')
    setIsOtherVillage(false)
    setUrbanBody('')
    setWard('')
  }
  const handleTalukChange = (t) => {
    setTaluk(t)
    setAreaType('')
    setGp('')
    setVillage('')
    setIsOtherVillage(false)
    setUrbanBody('')
    setWard('')
  }
  const handleAreaTypeChange = (type) => {
    setAreaType(type)
    setGp('')
    setVillage('')
    setIsOtherVillage(false)
    setUrbanBody('')
    setWard('')
  }
  const handleGpChange = (g) => {
    setGp(g)
    setVillage('')
    setIsOtherVillage(false)
  }
  const handleVillageChange = (v) => {
    if (v === 'OTHER') {
      setIsOtherVillage(true)
      setVillage('')
    } else {
      setIsOtherVillage(false)
      setVillage(v)
    }
  }

  // Urban bodies and wards — look up real data first, then fall back
  const urbanEntry = useMemo(() => {
    if (!district || !taluk) return null
    // Try exact key match
    const key = `${district}|${taluk}`
    if (karnatakaUrbanData[key]) return karnatakaUrbanData[key]
    // Try partial taluk name match
    const found = Object.entries(karnatakaUrbanData).find(([k]) => {
      const [kDist, kTaluk] = k.split('|')
      return kDist.toLowerCase() === district.toLowerCase() &&
             (kTaluk.toLowerCase().includes(taluk.toLowerCase()) || taluk.toLowerCase().includes(kTaluk.toLowerCase()))
    })
    return found ? found[1] : null
  }, [district, taluk])

  const urbanBodiesForTaluk = useMemo(() => {
    if (urbanEntry) return [urbanEntry.ulb]
    if (!taluk) return []
    return [`${taluk} Town Municipal Council`]
  }, [urbanEntry, taluk])

  const wardsForUrbanBody = useMemo(() => {
    if (!urbanBody) return []
    // If we have real data, use it
    if (urbanEntry && urbanEntry.wards && urbanEntry.wards.length > 0) return urbanEntry.wards
    // Fallback: numbered wards
    const wardCount = urbanBody.includes('Corporation') ? 60 : urbanBody.includes('BBMP') ? 198 : 35
    return Array.from({ length: wardCount }, (_, i) => `Ward ${i + 1}`)
  }, [urbanBody, urbanEntry])

  // Determine the final address for OTP validation
  const finalAddress = areaType === 'urban' ? ward : village

  // ── Welcome-back quick OTP (step 0) ────────────────────────────
  const handleQuickLogin = async () => {
    setLoading(true)
    setErrorMsg('')
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    try {
      await sendOtpEmail(email, newOtp)
      setOtpSentAlert(true)
      setStep(2)
    } catch (error) {
      setErrorMsg('Failed to send OTP. Please check your email address.')
    } finally {
      setLoading(false)
    }
  }

  // ── OTP send ───────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault()
    const ruralOk = areaType === 'rural' && gp && village
    const urbanOk = areaType === 'urban' && urbanBody && ward
    if (!name.trim() || !phone || !district || !taluk || !areaType || (!ruralOk && !urbanOk)) {
      setErrorMsg('Please fill in all required fields including your location.')
      return
    }
    setLoading(true)
    setErrorMsg('')
    
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    
    try {
      await sendOtpEmail(email, newOtp)
      setOtpSentAlert(true)
      setStep(2)
    } catch (error) {
      console.error('OTP send error in background:', error)
      setErrorMsg('Failed to send OTP: ' + (error.message || 'Please check your connection and email address.'))
    } finally {
      setLoading(false)
    }
  }

  // ── OTP verify ─────────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp !== generatedOtp) {
      setErrorMsg('Invalid OTP. Please enter the correct 6-digit code sent to your email.')
      return
    }
    setLoading(true)
    setErrorMsg('')
    try {
      const resolvedGp = areaType === 'urban' ? urbanBody : gp
      const resolvedVillage = areaType === 'urban' ? ward : village

      // Save to localStorage immediately — this is instant
      window.localStorage.setItem('citizen_name', name)
      window.localStorage.setItem('citizen_email', email)
      window.localStorage.setItem('citizen_district', district)
      window.localStorage.setItem('citizen_taluk', taluk)
      window.localStorage.setItem('citizen_gp', resolvedGp)
      window.localStorage.setItem('citizen_village', resolvedVillage)
      window.localStorage.setItem('citizen_area_type', areaType)
      window.localStorage.setItem('citizen_phone', phone)
      window.localStorage.removeItem('citizen_logged_out') // clear logout flag

      // Navigate immediately — don't wait for Firebase
      navigate('/dashboard/villager')

      // Run Firebase operations in background (non-blocking)
      const dummyPassword = email + "GramSetu!2026";
      signInWithEmailAndPassword(auth, email, dummyPassword).catch(async (authErr) => {
        if (authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential' || authErr.code === 'auth/invalid-login-credentials') {
          createUserWithEmailAndPassword(auth, email, dummyPassword).catch(e => console.warn('Auth create:', e))
        }
      })
      const uid = 'user-' + email.replace(/[^a-z0-9]/gi, '-')
      setDoc(doc(db, 'users', uid), {
        uid, name, email, phone,
        district, taluk,
        areaType,
        gp: resolvedGp,
        village: resolvedVillage,
        role: 'villager',
        lastLoginAt: serverTimestamp()
      }, { merge: true }).catch(e => console.warn('Firestore sync:', e))

    } catch (error) {
      console.error('Login error:', error)
      setErrorMsg('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const selStyle = (disabled) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? 'var(--bg-main)' : undefined,
  })

  return (
    <div className="login-page">
      <div className="login-visual">
        <img src="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=900&q=80" alt="Karnataka village" />
        <div className="login-visual-overlay">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div className="landing-logo-icon" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wheat size={22} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 18 }}>{t('appName')}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Karnataka | ಕರ್ನಾಟಕ</div>
              </div>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 10 }}>ರೈತ ಮತ್ತು ಗ್ರಾಮಸ್ಥರ ಸೇವೆ</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>Farmer &amp; Villager Services — ಕರ್ನಾಟಕ ಸರ್ಕಾರ</p>
            <div className="login-visual-features">
              {[ [Landmark, 'Raitha Siri / ರೈತ ಸಿರಿ'], [Wheat, 'Krishi Bhagya / ಕೃಷಿ ಭಾಗ್ಯ'], [TrendingUp, 'APMC Karnataka Live Prices'], [ClipboardList, 'Complaint → Taluk Auto-Escalation'] ].map(([Icon, text]) => (
                <div className="login-visual-feature" key={text}>
                  <Icon size={16} strokeWidth={2} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-form-card animate-fadeInUp">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <button className="login-back" onClick={() => navigate('/')} style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={14} strokeWidth={2.5} />
              {t('backToHome')}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LanguageSwitcher variant="topbar-style" />
              <ThemeToggle />
            </div>
          </div>

          <div className="login-form-header">
            <h3>{step === 0 ? 'Welcome Back! 👋' : step === 1 ? 'Raita / Villager Login' : 'Verify Your Email OTP'}</h3>
            <p>{step === 0 ? `Good to see you again, ${prevName.split(' ')[0]}` : step === 1 ? 'Enter your details to receive a one-time password' : `We sent a 6-digit OTP to ${email}`}</p>
          </div>

          {errorMsg && (
            <div style={{ padding: 12, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              {errorMsg}
            </div>
          )}

          {otpSentAlert && step === 2 && (
            <div className="success-alert animate-fadeInUp" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', padding: 16, borderRadius: 'var(--radius-md)', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: '1.4' }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <div><strong>OTP sent successfully to {email}!</strong></div>
            </div>
          )}

          {/* ── STEP 0: Welcome Back Screen ── */}
          {step === 0 && (
            <div className="animate-fadeInUp">
              {/* Avatar + Name Card */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                border: '2px solid #86efac',
                borderRadius: 20,
                padding: '24px 20px',
                textAlign: 'center',
                marginBottom: 20,
              }}>
                <div style={{
                  width: 72, height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: 28,
                  margin: '0 auto 12px',
                  boxShadow: '0 8px 20px rgba(22,163,74,0.35)',
                  border: '3px solid #fff',
                }}>
                  {prevName.charAt(0).toUpperCase()}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#14532d', marginBottom: 4 }}>{prevName}</div>
                <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <MapPin size={13} />
                  {prevTaluk && prevDistrict ? `${prevTaluk}, ${prevDistrict}` : prevDistrict || 'Karnataka'}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>{prevEmail}</div>
              </div>

              {errorMsg && (
                <div style={{ padding: 12, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertTriangle size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {errorMsg}
                </div>
              )}

              {/* Quick Login Button */}
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: 16, fontWeight: 700, borderRadius: 14, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                onClick={handleQuickLogin}
                disabled={loading}
              >
                {loading ? (
                  <><span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Sending OTP…</>
                ) : (
                  <><Send size={18} /> Send OTP to {prevEmail.split('@')[0]}@… &amp; Login</>
                )}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
              </div>

              {/* Edit / Switch user */}
              <button
                type="button"
                className="btn btn-outline"
                style={{ width: '100%', padding: '12px', fontSize: 14, fontWeight: 600, borderRadius: 12, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onClick={() => setStep(1)}
              >
                <Edit3 size={15} /> Edit My Details
              </button>

              <button
                type="button"
                style={{ width: '100%', padding: '10px', fontSize: 13, color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => {
                  // Clear all saved data and start fresh
                  window.localStorage.clear()
                  setName(''); setEmail(''); setPhone(''); setDistrict(''); setTaluk('')
                  setAreaType(''); setGp(''); setVillage(''); setUrbanBody(''); setWard('')
                  setStep(1)
                }}
              >
                Not {prevName.split(' ')[0]}? Login as someone else →
              </button>
            </div>
          )}

          {/* ── STEP 1: Full Form ── */}
          {step === 1 && (
            <form className="login-form" onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">Full Name / ಪೂರ್ಣ ಹೆಸರು *</label>
                <input className="form-input" type="text" placeholder="e.g. Ramappa Gowda" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address / ಇಮೇಲ್ *</label>
                <input className="form-input" type="email" placeholder="yourname@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" style={{ width: 60, flexShrink: 0 }} value="+91" readOnly />
                  <input className="form-input" type="tel" placeholder="9876543210" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">District / ಜಿಲ್ಲೆ *</label>
                  <select className="form-input custom-select" value={district} onChange={e => handleDistrictChange(e.target.value)} required>
                    <option value="" disabled>Select District</option>
                    {districtsOfKarnataka.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Taluk / ತಾಲೂಕು *</label>
                  <select className="form-input custom-select" value={taluk} onChange={e => handleTalukChange(e.target.value)} required disabled={!district} style={selStyle(!district)}>
                    <option value="" disabled>Select Taluk</option>
                    {(activeDistrictObj?.taluks || []).map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Area Type / ಪ್ರದೇಶದ ಪ್ರಕಾರ *</label>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {[ { value: 'rural', icon: <TreePine size={18} />, label: 'Rural / ಗ್ರಾಮೀಣ' }, { value: 'urban', icon: <Building2 size={18} />, label: 'Urban / ನಗರ' } ].map(opt => (
                    <button key={opt.value} type="button" onClick={() => handleAreaTypeChange(opt.value)} style={{ flex: 1, padding: '10px 8px', borderRadius: 'var(--radius-md)', border: `2px solid ${areaType === opt.value ? 'var(--primary)' : 'var(--border)'}`, background: areaType === opt.value ? 'var(--primary-light)' : 'var(--bg-card)', color: areaType === opt.value ? 'var(--primary-dark)' : 'var(--text-secondary)', fontWeight: areaType === opt.value ? 700 : 500, fontSize: 13, cursor: !taluk ? 'not-allowed' : 'pointer', opacity: !taluk ? 0.45 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} disabled={!taluk}>
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {areaType === 'rural' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Gram Panchayat / ಗ್ರಾ.ಪಂ *</label>
                    <select className="form-input custom-select" value={gp} onChange={e => handleGpChange(e.target.value)} required>
                      <option value="" disabled>Select Gram Panchayat</option>
                      {availableGps.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Village / ಗ್ರಾಮ *</label>
                    {!isOtherVillage ? (
                      <select className="form-input custom-select" value={village} onChange={e => handleVillageChange(e.target.value)} required disabled={!gp} style={selStyle(!gp)}>
                        <option value="" disabled>{!gp ? 'Select Panchayat first' : 'Select Village'}</option>
                        {availableVillages.map(v => <option key={v} value={v}>{v}</option>)}
                        {gp && <option value="OTHER">Other / My village is not listed</option>}
                      </select>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <input className="form-input" type="text" placeholder="Enter your village or hamlet name" value={village} onChange={e => setVillage(e.target.value)} required autoFocus />
                        <button type="button" className="btn-ghost w-full" onClick={() => { setIsOtherVillage(false); setVillage('') }} style={{ marginTop: 12, justifyContent: 'center', color: '#64748b' }}>Cancel</button>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                      <button
                        type="button"
                        onClick={() => { setInquiryCategory('missing_village'); setInquiryModalOpen(true) }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#16a34a',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '2px 0'
                        }}
                      >
                        <MapPinOff size={13} strokeWidth={2.2} />
                        <span>{lang === 'kn' ? 'ಗ್ರಾಮ ಕಾಣಿಸುತ್ತಿಲ್ಲವೇ? ಡೇಟಾಬೇಸ್‌ಗೆ ಸೇರಿಸಲು ವರದಿ ಮಾಡಿ' : "Can't find your village? Report to database"}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {areaType === 'urban' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Urban Local Body / ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ *</label>
                    <select className="form-input custom-select" value={urbanBody} onChange={e => { setUrbanBody(e.target.value); setWard('') }} required>
                      <option value="" disabled>Select Urban Local Body</option>
                      {urbanBodiesForTaluk.map(ub => <option key={ub} value={ub}>{ub}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ward / ವಾರ್ಡ್ *</label>
                    <select className="form-input custom-select" value={ward} onChange={e => setWard(e.target.value)} required disabled={!urbanBody} style={selStyle(!urbanBody)}>
                      <option value="" disabled>Select Ward</option>
                      {wardsForUrbanBody.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                </>
              )}

              <button className="btn w-full" type="submit" disabled={loading || !name || !email || !phone} style={{ background: '#16a34a', color: '#fff', padding: '14px', justifyContent: 'center' }}>
                {loading ? 'Sending OTP...' : 'Send OTP to Email'}
              </button>
            </form>
          )}

          {/* ── STEP 2: OTP Verification ── */}
          {step === 2 && (
            <form className="login-form" onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label className="form-label">6-digit OTP / 6 ಅಂಕಿ OTP</label>
                <input className="form-input" type="text" placeholder="123456" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} style={{ fontSize: 24, letterSpacing: 12, textAlign: 'center' }} required autoFocus />
                <div className="otp-hint" style={{ color: '#065f46', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div>OTP expires in 10 minutes</div>
                  <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <AlertTriangle size={12} /> Note: The OTP email might go to your Spam/Junk folder
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || otp.length < 6}
              >
                {loading ? 'Verifying...' : <><ShieldCheck size={15} style={{ marginRight: 6 }} />Verify & Login</>}
              </button>
              <button
                type="button"
                style={{ textAlign: 'center', color: 'var(--primary)', fontSize: 14, fontWeight: 600, display: 'block', width: '100%', marginTop: 12, background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => { setStep(1); setOtpSentAlert(false); setOtp(''); }}
              >
                <ArrowLeft size={14} style={{ marginRight: 4 }} /> Change Details
              </button>
            </form>
          )}

          <div style={{ marginTop: 20, padding: 14, background: 'rgba(22, 163, 74, 0.08)', border: '1.5px dashed rgba(22, 163, 74, 0.3)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HelpCircle size={16} strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>
                  {lang === 'kn' ? 'ಪ್ರಶ್ನೆ ಅಥವಾ ಕಾಣೆಯಾದ ವಿವರಗಳಿವೆಯೇ?' : 'Have questions or missing details?'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {lang === 'kn' ? 'ನೇರವಾಗಿ ನಮ್ಮ ಡೇಟಾಬೇಸ್‌ಗೆ ಕಳುಹಿಸಿ' : 'Send directly to database for resolution'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setInquiryCategory('question'); setInquiryModalOpen(true) }}
              style={{
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '7px 12px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)'
              }}
            >
              {lang === 'kn' ? 'ಸಹಾಯವಾಣಿ' : 'Helpdesk'}
            </button>
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t('officialQ')}</p>
            <button
              style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginTop: 4, background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/login/official')}
            >
              {t('officialLink')}
            </button>
          </div>
        </div>
      </div>

      <FarmerInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultCategory={inquiryCategory}
        prefillDistrict={district}
        prefillTaluk={taluk}
        prefillVillage={village}
      />
    </div>
  )
}
