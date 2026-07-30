import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { Landmark, ClipboardList, Megaphone, BarChart3, Users, ArrowLeft } from 'lucide-react'

export default function OfficialLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [officerId, setOfficerId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [show2fa, setShow2fa] = useState(false)
  const [otp2fa, setOtp2fa] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setShow2fa(true) }, 1200)
  }

  const handle2fa = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard/official') }, 1500)
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
              <div style={{ width: 40, height: 40, background: '#3b82f6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContainer: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
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
            <h3>{show2fa ? t('officialLoginTitle2fa') : t('officialLoginTitle')}</h3>
            <p>{show2fa ? t('officer2faDesc') : t('officialLoginDesc')}</p>
          </div>

          {!show2fa ? (
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">{t('officerIdLabel')}</label>
                <input
                  className="form-input"
                  placeholder="e.g. KA-MYS-PDO-2024-001"
                  value={officerId}
                  onChange={e => setOfficerId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('passwordLabel')}</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                  <input type="checkbox" /> {t('rememberMe')}
                </label>
                <button type="button" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>
                  {t('forgotPwd')}
                </button>
              </div>
              <button
                className="btn w-full"
                style={{ justifyContent: 'center', padding: '14px', background: '#3b82f6', color: '#fff', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}
                type="submit"
                disabled={loading || !officerId || !password}
              >
                {loading ? t('authenticating') : t('secureLogin')}
              </button>
              <div className="otp-hint">{t('demoHint')}</div>
            </form>
          ) : (
            <form className="login-form" onSubmit={handle2fa}>
              <div className="form-group">
                <label className="form-label">6-Digit 2FA Code</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="123456"
                  value={otp2fa}
                  onChange={e => setOtp2fa(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ fontSize: 24, letterSpacing: 12, textAlign: 'center' }}
                  required
                />
                <div className="otp-hint">{t('otpHint')}</div>
              </div>
              <button
                className="btn w-full"
                style={{ justifyContent: 'center', padding: '14px', background: '#3b82f6', color: '#fff', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}
                type="submit"
                disabled={loading || otp2fa.length < 4}
              >
                {loading ? t('verifying') : t('verify2fa')}
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
