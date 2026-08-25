import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { Landmark, ClipboardList, Megaphone, BarChart3, Users, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react'
import { db, auth } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { districtsOfKarnataka } from '../data/karnatakaTaluks'
import talukToGps from '../data/talukToGps'
import { sendOtpEmail } from '../utils/sendOtp'

export default function OfficialLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  useEffect(() => {
    if (window.localStorage.getItem('official_id')) {
      navigate('/dashboard/official')
    }
  }, [navigate])
  
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [officerId, setOfficerId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('Agriculture (RSK)')
  const [district, setDistrict] = useState('')
  const [taluk, setTaluk] = useState('')
  const [gp, setGp] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)

  useEffect(() => {
    if (department !== 'Gram Panchayat / PDO') {
      setGp('')
    }
  }, [department])

  const departments = [
    'Gram Panchayat / PDO',
    'Agriculture (RSK)',
    'Electricity / BESCOM',
    'Water Supply',
    'Revenue Department',
    'Health / PHC',
    'Education / DDPI',
    'Taluk Panchayat (EO)',
    'Zilla Panchayat (CEO)',
    'RDPR Commissioner Office',
  ]



  const handleDistrictChange = (distName) => {
    setDistrict(distName)
    setTaluk('')
    setGp('')
  }
  const handleTalukChange = (t) => {
    setTaluk(t)
    setGp('')
  }

  const activeDistrictObj = districtsOfKarnataka.find(d => d.name === district) || null
  const activeTalukObj = activeDistrictObj?.taluks.find(t => t.name === taluk) || null
  
  const talukKey = district && taluk ? `${district}|${taluk}` : ''
  const availableGps = (talukKey ? (talukToGps[talukKey] || []) : [])

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!name.trim() || !officerId.trim() || !email.includes('@') || !phone || !district || !taluk) {
      setErrorMsg('Please enter all required fields.')
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
      console.error('OTP send error:', error)
      setErrorMsg(error.message || 'Failed to send OTP to email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp !== generatedOtp) {
      setErrorMsg('Invalid OTP. Please enter the correct 6-digit code sent to your email.')
      return
    }
    setLoading(true)
    setErrorMsg('')

    try {
      // Sync user with Firebase Authentication so they appear in the Auth dashboard
      const dummyPassword = email + "GramSetu!2026";
      try {
        await signInWithEmailAndPassword(auth, email, dummyPassword);
      } catch (authErr) {
        if (authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential' || authErr.code === 'auth/invalid-login-credentials') {
          try {
            await createUserWithEmailAndPassword(auth, email, dummyPassword);
          } catch (createErr) {
            console.error("Firebase Auth creation error:", createErr);
          }
        } else {
          console.error("Firebase Auth sign-in error:", authErr);
        }
      }

      const uid = 'official-' + email.replace(/[^a-z0-9]/gi, '-')
      try {
        await setDoc(doc(db, 'users', uid), {
          uid, name, officerId, email, phone, department, district, taluk, gp,
          role: 'official',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp()
        }, { merge: true })
      } catch (fsErr) {
        console.warn('Firestore save failed, continuing...', fsErr)
      }

      window.localStorage.setItem('official_name', name)
      window.localStorage.setItem('official_id', officerId)
      window.localStorage.setItem('official_email', email)
      window.localStorage.setItem('official_department', department)
      window.localStorage.setItem('official_district', district)
      window.localStorage.setItem('official_taluk', taluk)
      window.localStorage.setItem('official_gp', gp)
      window.localStorage.setItem('official_phone', phone)

      navigate('/dashboard/official')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-visual">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80"
          alt="Government office Karnataka"
        />
        <div className="login-visual-overlay" style={{ background: 'linear-gradient(135deg, rgba(10,20,50,0.92) 0%, rgba(26,60,140,0.75) 100%)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: '#3b82f6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Landmark size={20} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 18 }}>{t('appName')}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>ಅಧಿಕಾರಿ ಪೋರ್ಟಲ್ — Official Portal</div>
              </div>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              ಕರ್ನಾಟಕ ಸರ್ಕಾರ<br />ಅಧಿಕಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>
              Government of Karnataka — Officer Dashboard
            </p>
            <div className="login-visual-features">
              {[
                [ClipboardList, 'Manage Taluk complaints'],
                [Megaphone,     'ಗ್ರಾಮ ಪ್ರಕಟಣೆ — Village Announcements'],
                [BarChart3,     'District Analytics & Reports'],
                [Users,         'Farmer & Citizen Management'],
              ].map(([Icon, text]) => (
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
            <LanguageSwitcher variant="topbar-style" />
          </div>

          <div className="login-form-header">
            <h3>{step === 1 ? 'Official Login' : 'Verify Email OTP'}</h3>
            <p>{step === 1 ? 'Enter your details to receive an Email OTP' : `Enter the 6-digit code sent to ${email}`}</p>
          </div>

          {errorMsg && (
            <div className="error-alert">
              <ShieldAlert size={16} />
              {errorMsg}
            </div>
          )}

          {otpSentAlert && (
            <div className="success-alert animate-fadeInUp" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', alignItems: 'flex-start', lineHeight: '1.4' }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <strong>OTP sent successfully to {email}!</strong>
              </div>
            </div>
          )}

          {step === 1 ? (
            <form className="login-form" onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">Full Name / ಪೂರ್ಣ ಹೆಸರು *</label>
                <input
                  className="form-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Govt ID / ಅಧಿಕಾರಿ ಗುರುತಿನ ಚೀಟಿ *</label>
                <input
                  className="form-input"
                  placeholder="e.g. KA-GOV-2026-001"
                  value={officerId}
                  onChange={e => setOfficerId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Email / ಇಮೇಲ್ *</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="official@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" style={{ width: 60, flexShrink: 0 }} value="+91" readOnly />
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Department / ಇಲಾಖೆ *</label>
                <div className="custom-select-wrapper">
                  <select
                    className="form-input custom-select"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">District / ಜಿಲ್ಲೆ *</label>
                  <select className="form-input custom-select" value={district} onChange={e => handleDistrictChange(e.target.value)} required>
                    <option value="" disabled>Select District</option>
                    {districtsOfKarnataka.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Taluk / ತಾಲೂಕು *</label>
                  <select
                    className="form-input custom-select"
                    value={taluk}
                    onChange={e => handleTalukChange(e.target.value)}
                    required
                    disabled={!district}
                  >
                    <option value="" disabled>Select Taluk</option>
                    {(activeDistrictObj?.taluks || []).map(t => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Gram Panchayat</label>
                  {department === 'Gram Panchayat / PDO' ? (
                    <select
                      className="form-input custom-select"
                      value={gp}
                      onChange={e => setGp(e.target.value)}
                      disabled={!taluk}
                      style={{ opacity: !taluk ? 0.5 : 1, cursor: !taluk ? 'not-allowed' : 'pointer' }}
                    >
                      <option value="" disabled>{!taluk ? 'Select Taluk first' : 'Select Panchayat'}</option>
                      <option value="">-- All Panchayats --</option>
                      {availableGps.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="form-input"
                      value="Not Applicable (Taluk / District level)"
                      disabled
                      style={{ background: 'var(--bg-main)', cursor: 'not-allowed', color: 'var(--text-muted)' }}
                    />
                  )}
                </div>
              </div>
              
              <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} /> Jurisdiction: {gp ? `${gp} GP, ` : ''}{taluk} Taluk, {district}
              </div>

              <button
                className="btn w-full"
                type="submit"
                disabled={loading || !name || !officerId || !email || !phone}
                style={{ background: '#3b82f6', color: '#fff', padding: '14px', justifyContent: 'center' }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP to Email'}
              </button>
            </form>
          ) : (
            <form className="login-form animate-fadeInRight" onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label className="form-label">6-Digit OTP</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ fontSize: 24, letterSpacing: 12, textAlign: 'center' }}
                  required
                />
                <div className="otp-hint" style={{ color: '#065f46', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div>OTP expires in 10 minutes</div>
                  <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <AlertTriangle size={12} /> Note: The OTP email might go to your Spam/Junk folder
                  </div>
                </div>
              </div>

              <button
                className="btn w-full"
                type="submit"
                disabled={loading || otp.length < 6}
                style={{ background: '#3b82f6', color: '#fff', padding: '14px', justifyContent: 'center' }}
              >
                {loading ? 'Verifying...' : 'Verify OTP & Login'}
              </button>

              <button
                type="button"
                className="btn-ghost w-full"
                onClick={() => { setStep(1); setOtp(''); setOtpSentAlert(false); setErrorMsg(''); }}
                style={{ marginTop: 12, justifyContent: 'center', color: '#64748b' }}
                disabled={loading}
              >
                Go Back & Change Details
              </button>
            </form>
          )}

          <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t('villagerQ')}</p>
            <button style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginTop: 4 }} onClick={() => navigate('/login/villager')}>
              {t('villagerLink')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
