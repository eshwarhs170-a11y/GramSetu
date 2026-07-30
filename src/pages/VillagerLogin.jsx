import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { Wheat, Landmark, TrendingUp, ClipboardList, ArrowLeft, AlertTriangle, MessageSquare, CheckCircle2, ShieldCheck, Settings } from 'lucide-react'

// ── SMS Gateway Helper ──
async function sendSmsOtp(phone, otpCode) {
  const gateway = localStorage.getItem('sms_gateway') || 'textbelt'
  const apiKey = localStorage.getItem('sms_api_key') || ''

  if (gateway === 'textbelt') {
    try {
      const res = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+91' + phone,
          message: `Your GramSetu OTP is: ${otpCode}. Do not share this code.`,
          key: apiKey || 'textbelt',  // 'textbelt' = 1 free SMS/day
        }),
      })
      const data = await res.json()
      return { success: data.success, message: data.success ? 'SMS sent via Textbelt' : (data.error || 'Textbelt limit reached. Falling back to demo mode.') }
    } catch (err) {
      return { success: false, message: 'Network error. Using demo OTP mode.' }
    }
  }

  if (gateway === 'fast2sms') {
    if (!apiKey) return { success: false, message: 'Fast2SMS API key not set. Using demo OTP mode.' }
    try {
      const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: { 'authorization': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variables_values: otpCode,
          route: 'otp',
          numbers: phone,
        }),
      })
      const data = await res.json()
      return { success: data.return, message: data.return ? 'SMS sent via Fast2SMS' : (data.message?.[0] || 'Fast2SMS failed. Using demo OTP mode.') }
    } catch (err) {
      return { success: false, message: 'Network error. Using demo OTP mode.' }
    }
  }

  return { success: false, message: 'Unknown gateway. Using demo OTP mode.' }
}

export default function VillagerLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('ರಾಮಪ್ಪ ಗೌಡ')
  const [district, setDistrict] = useState('Mysuru')
  const [taluk, setTaluk] = useState('Mysuru Taluk')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)
  const [smsMode, setSmsMode] = useState('real')  // 'real' or 'mock'
  const [smsStatusMsg, setSmsStatusMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // SMS Settings modal
  const [showSettings, setShowSettings] = useState(false)
  const [settingsGateway, setSettingsGateway] = useState(localStorage.getItem('sms_gateway') || 'textbelt')
  const [settingsApiKey, setSettingsApiKey] = useState(localStorage.getItem('sms_api_key') || '')

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

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (phone.length === 10 && name.trim().length > 0) {
      setLoading(true)
      setErrorMsg('')
      setSmsStatusMsg('')
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(mockOtp)

      // Try sending real SMS
      const result = await sendSmsOtp(phone, mockOtp)

      setLoading(false)
      if (result.success) {
        setSmsMode('real')
        setSmsStatusMsg('✅ ' + result.message)
      } else {
        setSmsMode('mock')
        setSmsStatusMsg('⚠️ ' + result.message)
      }
      setOtpSentAlert(true)
      setStep(2)
    } else {
      setErrorMsg('Please enter a valid name and 10-digit mobile number')
    }
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setTimeout(() => {
      setLoading(false)
      if (otp === generatedOtp) {
        window.sessionStorage.setItem('citizen_name', name)
        window.sessionStorage.setItem('citizen_district', district)
        window.sessionStorage.setItem('citizen_taluk', taluk)
        window.sessionStorage.setItem('citizen_phone', phone)
        navigate('/dashboard/villager')
      } else {
        setErrorMsg('Invalid OTP. Please enter the correct OTP sent to your phone.')
      }
    }, 1200)
  }

  const saveSettings = () => {
    localStorage.setItem('sms_gateway', settingsGateway)
    localStorage.setItem('sms_api_key', settingsApiKey)
    setShowSettings(false)
  }

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
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s'
                }}
                title="SMS Gateway Settings"
              >
                <Settings size={16} strokeWidth={2} />
              </button>
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
            <>
              {smsStatusMsg && (
                <div style={{
                  padding: 12, borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500, marginBottom: 12,
                  background: smsMode === 'real' ? '#d1fae5' : '#fef3c7',
                  color: smsMode === 'real' ? '#065f46' : '#92400e',
                  border: smsMode === 'real' ? '1px solid #6ee7b7' : '1px solid #fcd34d'
                }}>
                  {smsStatusMsg}
                </div>
              )}
              {smsMode === 'mock' && (
                <div style={{ padding: 16, background: '#e0f2fe', border: '1px solid #7dd3fc', color: '#0369a1', borderRadius: 'var(--radius-md)', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
                  <MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  <strong style={{ color: '#0284c7' }}>Demo OTP (SMS gateway unavailable):</strong><br />
                  Your OTP is <strong style={{ fontSize: 20, color: '#0369a1', letterSpacing: 4, display: 'inline-block', marginTop: 6 }}>{generatedOtp}</strong>
                </div>
              )}
              {smsMode === 'real' && (
                <div style={{ padding: 16, background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', borderRadius: 'var(--radius-md)', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
                  <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  <strong>Real SMS sent to +91 {phone}!</strong><br />
                  <span style={{ fontSize: 12 }}>Check your phone for the 6-digit OTP.</span>
                </div>
              )}
            </>
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
                {smsMode === 'real' && (
                  <div className="otp-hint" style={{ color: '#065f46' }}>📱 Enter the OTP sent to your phone via SMS</div>
                )}
                {smsMode === 'mock' && (
                  <div className="otp-hint">💡 Enter the demo OTP shown above</div>
                )}
              </div>
              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || otp.length < 4}
              >
                {loading ? t('verifying') : t('verifyLogin')}
              </button>
              <button
                type="button"
                style={{ textAlign: 'center', color: 'var(--primary)', fontSize: 14, fontWeight: 600 }}
                onClick={() => { setStep(1); setOtpSentAlert(false); }}
              >
                {t('changeNumber')}
              </button>
            </form>
          )}

          <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t('officialQ')}</p>
            <button
              style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginTop: 4 }}
              onClick={() => navigate('/login/official')}
            >
              {t('officialLink')}
            </button>
          </div>
        </div>
      </div>

      {/* SMS Settings Modal */}
      {showSettings && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 460, width: '100%', padding: 24, position: 'relative' }}>
            <button
              onClick={() => setShowSettings(false)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >✕</button>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, color: 'var(--primary)' }}>⚙️ SMS Gateway Settings</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Configure how OTPs are sent to real phone numbers.</p>

            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Gateway Provider</label>
              <select
                className="form-input"
                value={settingsGateway}
                onChange={e => setSettingsGateway(e.target.value)}
              >
                <option value="textbelt">Textbelt (1 free SMS/day, no sign-up)</option>
                <option value="fast2sms">Fast2SMS (free trial, needs API key)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">API Key {settingsGateway === 'textbelt' ? '(optional — leave blank for free tier)' : '(required)'}</label>
              <input
                className="form-input"
                type="text"
                placeholder={settingsGateway === 'textbelt' ? 'Leave blank for 1 free SMS/day' : 'Paste your Fast2SMS API key'}
                value={settingsApiKey}
                onChange={e => setSettingsApiKey(e.target.value)}
              />
            </div>

            <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 'var(--radius-sm)', fontSize: 12, color: '#065f46', marginBottom: 20 }}>
              <strong>How it works:</strong><br />
              • <strong>Textbelt:</strong> Free 1 SMS/day without API key. Get more at textbelt.com.<br />
              • <strong>Fast2SMS:</strong> Sign up at fast2sms.com to get a free API key with test credits.<br />
              • If the SMS fails, the app falls back to demo OTP mode automatically.
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={saveSettings}>
                Save Settings
              </button>
              <button className="btn btn-outline" onClick={() => setShowSettings(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
