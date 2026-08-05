import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import { Wheat, Landmark, TrendingUp, ClipboardList, ArrowLeft, AlertTriangle, CheckCircle2, Mail, Send, ShieldCheck } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { db } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

// ── EmailJS Config ────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_yupzec9'
const EMAILJS_TEMPLATE_ID = 'template_iiz68fd'
const EMAILJS_PUBLIC_KEY  = 'WxFna4OMAj2w50yJk'

export default function VillagerLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Initialize EmailJS once
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('citizen_email') || window.localStorage.getItem('citizen_phone')) {
      navigate('/dashboard/villager')
    }
  }, [navigate])
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [taluk, setTaluk] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const districtsOfKarnataka = [
    { name: 'Bagalkot', taluks: ['Bagalkot', 'Badami', 'Bilagi', 'Hungund', 'Jamkhandi', 'Mudhol'] },
    { name: 'Ballari', taluks: ['Ballari', 'Hadagali', 'Hagaribommanahalli', 'Hospet', 'Kudligi', 'Sandur', 'Siruguppa'] },
    { name: 'Belagavi', taluks: ['Belagavi', 'Athani', 'Bailhongal', 'Chikodi', 'Gokak', 'Hukkeri', 'Khanapur', 'Raibag', 'Ramdurg', 'Savadatti', 'Soundatti'] },
    { name: 'Bengaluru Rural', taluks: ['Devanahalli', 'Doddaballapur', 'Hosakote', 'Nelamangala'] },
    { name: 'Bengaluru Urban', taluks: ['Anekal', 'Bengaluru East', 'Bengaluru North', 'Bengaluru South', 'Bengaluru West', 'Yelahanka'] },
    { name: 'Bidar', taluks: ['Aurad', 'Basavakalyan', 'Bhalki', 'Bidar', 'Humnabad'] },
    { name: 'Chamarajanagar', taluks: ['Chamarajanagar', 'Gundlupet', 'Kollegal', 'Yelandur'] },
    { name: 'Chikkaballapur', taluks: ['Bagepalli', 'Chikkaballapur', 'Chintamani', 'Gauribidanur', 'Gudibande', 'Sidlaghatta'] },
    { name: 'Chikkamagaluru', taluks: ['Birur', 'Chikkamagaluru', 'Kadur', 'Koppa', 'Mudigere', 'N.R.Pura', 'Sringeri', 'Tarikere'] },
    { name: 'Chitradurga', taluks: ['Challakere', 'Chitradurga', 'Hiriyur', 'Holalkere', 'Hosadurga', 'Molakalmuru'] },
    { name: 'Dakshina Kannada', taluks: ['Bantval', 'Belthangady', 'Mangaluru', 'Puttur', 'Sullia'] },
    { name: 'Davanagere', taluks: ['Channagiri', 'Davanagere', 'Harihara', 'Honnali', 'Jagalur', 'Nyamathi'] },
    { name: 'Dharwad', taluks: ['Dharwad', 'Hubli', 'Kalghatgi', 'Kundgol', 'Navalgund'] },
    { name: 'Gadag', taluks: ['Gadag', 'Mundaragi', 'Nargund', 'Ron', 'Shirahatti'] },
    { name: 'Hassan', taluks: ['Alur', 'Arakalagudu', 'Arkalgud', 'Belur', 'Channarayapatna', 'Hassan', 'Holenarasipura', 'Sakleshpur'] },
    { name: 'Haveri', taluks: ['Byadagi', 'Hanagal', 'Haveri', 'Hirekerur', 'Ranebennur', 'Savanur', 'Shiggaon'] },
    { name: 'Kalaburagi', taluks: ['Afzalpur', 'Aland', 'Chincholi', 'Chittapur', 'Kalaburagi', 'Jevargi', 'Sedam'] },
    { name: 'Kodagu', taluks: ['Madikeri', 'Somwarpet', 'Virajpet'] },
    { name: 'Kolar', taluks: ['Bangarpet', 'Kolar', 'Malur', 'Mulbagal', 'Srinivaspur'] },
    { name: 'Koppal', taluks: ['Gangavathi', 'Koppal', 'Kushtagi', 'Yelburga'] },
    { name: 'Mandya', taluks: ['K.R.Pet', 'Kirugavalu', 'Maddur', 'Malavalli', 'Mandya', 'Nagamangala', 'Pandavapura', 'Srirangapatna'] },
    { name: 'Mysuru', taluks: ['Heggadadevankote', 'Hunsur', 'K.R.Nagar', 'Mysuru', 'Nanjangud', 'Periyapatna', 'T.Narasipura'] },
    { name: 'Raichur', taluks: ['Devadurga', 'Lingsugur', 'Manvi', 'Raichur', 'Sindhanur'] },
    { name: 'Ramanagara', taluks: ['Channapatna', 'Kanakapura', 'Magadi', 'Ramanagara'] },
    { name: 'Shivamogga', taluks: ['Bhadravati', 'Hosanagara', 'Sagar', 'Shikaripura', 'Shivamogga', 'Soraba', 'Thirthahalli'] },
    { name: 'Tumkuru', taluks: ['Chiknayakanhalli', 'Gubbi', 'Koratagere', 'Kunigal', 'Madhugiri', 'Pavagada', 'Sira', 'Tiptur', 'Tumkuru', 'Turuvekere'] },
    { name: 'Udupi', taluks: ['Karkala', 'Kundapur', 'Udupi'] },
    { name: 'Uttara Kannada', taluks: ['Ankola', 'Bhatkal', 'Dandeli', 'Haliyal', 'Honavar', 'Joida', 'Karwar', 'Kumta', 'Mundgod', 'Siddapur', 'Yellapur'] },
    { name: 'Vijayapura', taluks: ['Basavana Bagewadi', 'Indi', 'Muddebihal', 'Sindagi', 'Vijayapura'] },
    { name: 'Yadgir', taluks: ['Shahapur', 'Shorapur', 'Yadgir'] },
  ]

  const handleDistrictChange = (distName) => {
    setDistrict(distName)
    const found = districtsOfKarnataka.find(d => d.name === distName)
    if (found && found.taluks.length > 0) setTaluk(found.taluks[0])
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.includes('@') || !district || !taluk) {
      setErrorMsg('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setErrorMsg('')

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          email: email,
          passcode: newOtp,
          time: new Date(Date.now() + 10 * 60000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        }
      )
      setOtpSentAlert(true)
      setStep(2)
    } catch (error) {
      console.error('EmailJS error full:', JSON.stringify(error), error)
      setErrorMsg(`Failed to send OTP: ${error?.text || error?.message || 'Unknown error'}. Check console for details.`)
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
      const uid = 'user-' + email.replace(/[^a-z0-9]/gi, '-')
      try {
        await setDoc(doc(db, 'users', uid), {
          uid, name, email, phone, district, taluk,
          role: 'villager',
          createdAt: serverTimestamp()
        }, { merge: true })
      } catch (fsErr) {
        console.warn('Firestore save failed, continuing...', fsErr)
      }

      window.localStorage.setItem('citizen_name', name)
      window.localStorage.setItem('citizen_email', email)
      window.localStorage.setItem('citizen_district', district)
      window.localStorage.setItem('citizen_taluk', taluk)
      window.localStorage.setItem('citizen_phone', phone)

      navigate('/dashboard/villager')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
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
              <ThemeToggle />
            </div>
          </div>

          <div className="login-form-header">
            <h3>{step === 1 ? 'Raita / Villager Login' : 'Verify Your Email OTP'}</h3>
            <p>
              {step === 1
                ? 'Enter your details to receive a one-time password'
                : `We sent a 6-digit OTP to ${email}`}
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
              <strong>OTP sent to {email}!</strong><br />
              <span style={{ fontSize: 12 }}>Check your inbox (and spam folder) for the 6-digit code.</span>
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
                <label className="form-label">Email Address / ಇಮೇಲ್ *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input
                    className="form-input"
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ paddingLeft: 36 }}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number (Optional)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" style={{ width: 60, flexShrink: 0 }} value="+91" readOnly />
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
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
                  <select className="form-input custom-select" value={taluk} onChange={e => setTaluk(e.target.value)} required>
                    <option value="" disabled>Select Taluk</option>
                    {activeDistrictObj.taluks.map(tOption => (
                      <option key={tOption} value={tOption}>{tOption}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || !email.includes('@') || !name.trim()}
              >
                {loading
                  ? 'Sending OTP...'
                  : <><Send size={15} style={{ marginRight: 6 }} />Send OTP to Email</>}
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
                  autoFocus
                />
                <div className="otp-hint" style={{ color: '#065f46', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={13} />
                  Enter the OTP sent to your email
                </div>
              </div>
              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || otp.length < 6}
              >
                {loading
                  ? 'Verifying...'
                  : <><ShieldCheck size={15} style={{ marginRight: 6 }} />Verify &amp; Login</>}
              </button>
              <button
                type="button"
                style={{ textAlign: 'center', color: 'var(--primary)', fontSize: 14, fontWeight: 600, display: 'block', width: '100%', marginTop: 12, background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => { setStep(1); setOtpSentAlert(false); setOtp(''); setGeneratedOtp(''); }}
              >
                <ArrowLeft size={14} style={{ marginRight: 4 }} /> Change Email
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
