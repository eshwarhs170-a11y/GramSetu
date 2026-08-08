import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { Landmark, ClipboardList, Megaphone, BarChart3, Users, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { db } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

// ── EmailJS Config ────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_yupzec9'
const EMAILJS_TEMPLATE_ID = 'template_iiz68fd'
const EMAILJS_PUBLIC_KEY  = 'WxFna4OMAj2w50yJk'

export default function OfficialLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Initialize EmailJS once
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('official_id')) {
      navigate('/dashboard/official')
    }
  }, [navigate])
  
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [officerId, setOfficerId] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('Agriculture (RSK)')
  const [district, setDistrict] = useState('')
  const [taluk, setTaluk] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)

  const departments = [
    'Agriculture (RSK)',
    'Gram Panchayat / PDO',
    'Electricity / BESCOM',
    'Water Supply',
    'Revenue Department',
    'Health / PHC',
    'Education / DDPI',
  ]

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
    { name: 'Vijayanagara', taluks: ['Harapanahalli', 'Hoovina Hadagali', 'Hospet', 'Hagari Bommanahalli', 'Kotturu', 'Kudligi'] },
    { name: 'Yadgir', taluks: ['Shahapur', 'Shorapur', 'Yadgir'] },
  ]

  const handleDistrictChange = (distName) => {
    setDistrict(distName)
    const found = districtsOfKarnataka.find(d => d.name === distName)
    if (found && found.taluks.length > 0) setTaluk(found.taluks[0])
  }

  const activeDistrictObj = districtsOfKarnataka.find(d => d.name === district) || districtsOfKarnataka[0]

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!name.trim() || !officerId.trim() || !email.includes('@') || !district || !taluk) {
      setErrorMsg('Please enter all required fields.')
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
      const uid = 'official-' + email.replace(/[^a-z0-9]/gi, '-')
      try {
        await setDoc(doc(db, 'users', uid), {
          uid, name, officerId, email, department, district, taluk,
          role: 'official',
          createdAt: serverTimestamp()
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
            <h3>{step === 1 ? 'Official Login' : 'Verify OTP'}</h3>
            <p>{step === 1 ? 'Enter your official email to receive a one-time password' : 'Enter the 6-digit code sent to your email'}</p>
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
                <div style={{ fontSize: 12, marginTop: 6, opacity: 0.9 }}>
                  <strong>Note:</strong> You will <em>not</em> receive a push notification. Please manually open your email app and check your <strong>Inbox</strong> or <strong>Spam</strong> folder.
                </div>
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
                  <select className="form-input custom-select" value={taluk} onChange={e => setTaluk(e.target.value)} required>
                    <option value="" disabled>Select Taluk</option>
                    {activeDistrictObj.taluks.map(tOption => (
                      <option key={tOption} value={tOption}>{tOption}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="btn w-full"
                type="submit"
                disabled={loading || !name || !officerId || !email}
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
                <div className="otp-hint">OTP expires in 15 minutes</div>
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
