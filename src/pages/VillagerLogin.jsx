import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { Wheat, Landmark, TrendingUp, ClipboardList, ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { auth, db } from '../firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export default function VillagerLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('ರಾಮಪ್ಪ ಗೌಡ')
  const [district, setDistrict] = useState('Mysuru')
  const [taluk, setTaluk] = useState('Mysuru Taluk')
  const [otp, setOtp] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const districtsOfKarnataka = [
    { name: 'Mysuru', taluks: ['Mysuru Taluk', 'Nanjangud Taluk', 'Hunsur Taluk', 'T.Narasipura Taluk'] },
    { name: 'Ramanagara', taluks: ['Ramanagara Taluk', 'Channapatna Taluk', 'Kanakapura Taluk', 'Magadi Taluk'] },
    { name: 'Mandya', taluks: ['Mandya Taluk', 'Maddur Taluk', 'Malavalli Taluk', 'Srirangapatna Taluk'] },
    { name: 'Tumkuru', taluks: ['Tumkuru Taluk', 'Sira Taluk', 'Tiptur Taluk', 'Madhugiri Taluk'] },
    { name: 'Belagavi', taluks: ['Belagavi Taluk', 'Gokak Taluk', 'Athani Taluk', 'Chikodi Taluk'] },
  ]

  const handleDistrictChange = (distName) => {
    setDistrict(distName)
    const found = districtsOfKarnataka.find(d => d.name === distName)
    if (found && found.taluks.length > 0) {
      setTaluk(found.taluks[0])
    }
  }

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      })
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (phone.length === 10 && name.trim().length > 0) {
      setLoading(true)
      setErrorMsg('')
      
      try {
        setupRecaptcha()
        const appVerifier = window.recaptchaVerifier
        const phoneNumber = '+91' + phone
        
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        window.confirmationResult = confirmationResult
        
        setOtpSentAlert(true)
        setStep(2)
      } catch (error) {
        console.error("Error sending OTP:", error)
        setErrorMsg(error.message || 'Failed to send OTP. Please try again.')
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear()
          window.recaptchaVerifier = null
        }
      } finally {
        setLoading(false)
      }
    } else {
      setErrorMsg('Please enter a valid name and 10-digit mobile number')
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    try {
      const result = await window.confirmationResult.confirm(otp)
      const user = result.user

      // Save user profile to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        phone: user.phoneNumber,
        district,
        taluk,
        role: 'villager',
        createdAt: serverTimestamp()
      }, { merge: true })

      // Save session info
      window.sessionStorage.setItem('citizen_name', name)
      window.sessionStorage.setItem('citizen_district', district)
      window.sessionStorage.setItem('citizen_taluk', taluk)
      window.sessionStorage.setItem('citizen_phone', user.phoneNumber)
      
      navigate('/dashboard/villager')
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setErrorMsg('Invalid OTP. Please enter the correct OTP sent to your phone.')
    } finally {
      setLoading(false)
    }
  }

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    }
  }, [])

  const activeDistrictObj = districtsOfKarnataka.find(d => d.name === district) || districtsOfKarnataka[0]

  return (
    <div className="login-page">
      {/* Left Visual */}
      <div className="login-visual">
        <img
          src="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=900&q=80"
          alt="Karnataka village"
        />
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
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              ರೈತ ಮತ್ತು ಗ್ರಾಮಸ್ಥರ ಸೇವೆ
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>
              Farmer &amp; Villager Services — ಕರ್ನಾಟಕ ಸರ್ಕಾರ
            </p>
            <div className="login-visual-features">
              {[
                [Landmark,      'Raitha Siri / ರೈತ ಸಿರಿ'],
                [Wheat,         'Krishi Bhagya / ಕೃಷಿ ಭಾಗ್ಯ'],
                [TrendingUp,    'APMC Karnataka Live Prices'],
                [ClipboardList, 'Complaint → Taluk Auto-Escalation'],
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

      {/* Right Form */}
      <div className="login-form-side">
        <div className="login-form-card animate-fadeInUp">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <button className="login-back" onClick={() => navigate('/')} style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={14} strokeWidth={2.5} />
              {t('backToHome')}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LanguageSwitcher variant="topbar-style" />
            </div>
          </div>

          <div className="login-form-header">
            <h3>{step === 1 ? t('villagerLoginTitle') : t('villagerLoginOtp')}</h3>
            <p>
              {step === 1
                ? t('villagerLoginDesc')
                : `${t('villagerLoginOtpDesc')} ${phone}`}
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: 12, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              {errorMsg}
            </div>
          )}

          {otpSentAlert && step === 2 && (
            <div style={{ padding: 16, background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', borderRadius: 'var(--radius-md)', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
              <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              <strong>Official OTP sent via Firebase to +91 {phone}!</strong><br />
              <span style={{ fontSize: 12 }}>Check your phone for the 6-digit code.</span>
            </div>
          )}

          {step === 1 ? (
            <form className="login-form" onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">Full Name / ಪೂರ್ಣ ಹೆಸರು *</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ramappa Gowda"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('mobileLabel')}</label>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">District / ಜಿಲ್ಲೆ *</label>
                  <select 
                    className="form-input"
                    value={district}
                    onChange={e => handleDistrictChange(e.target.value)}
                    required
                  >
                    {districtsOfKarnataka.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Taluk / ತಾಲೂಕು *</label>
                  <select 
                    className="form-input"
                    value={taluk}
                    onChange={e => setTaluk(e.target.value)}
                    required
                  >
                    {activeDistrictObj.taluks.map(tOption => (
                      <option key={tOption} value={tOption}>{tOption}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('aadhaarLabel')}</label>
                <input className="form-input" type="text" placeholder="XXXX XXXX XXXX" maxLength={12} />
              </div>
              <div id="recaptcha-container"></div>
              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || phone.length < 10 || !name.trim()}
              >
                {loading ? t('sendingOtp') : t('sendOtp')}
              </button>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label className="form-label">6-digit OTP / 6 ಅಂಕಿ OTP</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ fontSize: 24, letterSpacing: 12, textAlign: 'center' }}
                  required
                />
                <div className="otp-hint" style={{ color: '#065f46' }}>📱 Enter the OTP sent to your phone</div>
              </div>
              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || otp.length < 6}
              >
                {loading ? t('verifying') : t('verifyLogin')}
              </button>
              <button
                type="button"
                style={{ textAlign: 'center', color: 'var(--primary)', fontSize: 14, fontWeight: 600, display: 'block', width: '100%', marginTop: 12 }}
                onClick={() => { setStep(1); setOtpSentAlert(false); setOtp(''); }}
              >
                {t('changeNumber')}
              </button>
            </form>
          )}

          <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
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
    </div>
  )
}
