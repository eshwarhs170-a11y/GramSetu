import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import { Wheat, Landmark, TrendingUp, ClipboardList, ArrowLeft, AlertTriangle, CheckCircle2, Mail, Send, ShieldCheck, Building2, TreePine, MapPin } from 'lucide-react'
import { db, auth } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { districtsOfKarnataka } from '../data/karnatakaTaluks'
import talukToGps from '../data/talukToGps'
import villageData from '../data/karnatakVillages'
import karnatakaUrbanData from '../data/karnatakaUrbanData'
import { sendOtpEmail } from '../utils/sendOtp'

export default function VillagerLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
  const [areaType, setAreaType] = useState('')  // 'rural' | 'urban'
  const [gp, setGp] = useState('')
  const [village, setVillage] = useState('')
  const [isOtherVillage, setIsOtherVillage] = useState(false)
  // Urban fields
  const [urbanBody, setUrbanBody] = useState('')
  const [ward, setWard] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpSentAlert, setOtpSentAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [gpsLoading, setGpsLoading] = useState(false)

  const handleGpsAutoLogin = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || phone.length < 10) {
      setErrorMsg('Please enter your Name, Email, and a valid 10-digit Mobile Number first.')
      return
    }

    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.')
      return
    }
    setGpsLoading(true)
    setErrorMsg('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // zoom=18 gives hamlet/neighbourhood level precision
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
            headers: { 'Accept-Language': 'en' }
          })
          const data = await res.json()
          
          let detectedDistrict = 'Tumkuru'
          let detectedTaluk = 'Gubbi'
          let detectedVillageRaw = ''
          const candidateNames = []

          if (data && data.address) {
            const addr = data.address
            const rawDist = addr.county || addr.district || addr.state_district || ''
            if (rawDist) detectedDistrict = rawDist.replace('District', '').replace('district', '').trim()

            const rawTaluk = addr.suburb || addr.municipality || addr.taluk || addr.city || addr.town || addr.village_hq || ''
            if (rawTaluk) detectedTaluk = rawTaluk.replace('Taluk', '').replace('taluk', '').trim()

            // Collect ALL possible village names from the address in order of precision
            if (addr.hamlet) candidateNames.push(addr.hamlet)
            if (addr.neighbourhood) candidateNames.push(addr.neighbourhood)
            if (addr.village) candidateNames.push(addr.village)
            if (addr.suburb) candidateNames.push(addr.suburb)
            if (addr.town) candidateNames.push(addr.town)
            // Also use the display name parts
            if (data.display_name) {
              const parts = data.display_name.split(',').map(s => s.trim())
              parts.slice(0, 3).forEach(p => {
                if (p && !candidateNames.includes(p)) candidateNames.push(p)
              })
            }
            detectedVillageRaw = candidateNames[0] || 'Main Village'
          }

          // Boundary checks for Karnataka mapping
          const inKarnataka = (latitude >= 11.5 && latitude <= 18.5) && (longitude >= 74.0 && longitude <= 78.5)
          if (!inKarnataka) {
            detectedDistrict = 'Tumkuru'
            detectedTaluk = 'Gubbi'
          }

          // Match district
          const distObj = districtsOfKarnataka.find(d => d.name.toLowerCase() === detectedDistrict.toLowerCase()) || districtsOfKarnataka.find(d => d.name === 'Tumkuru')
          // Match taluk (Fallback safely if distObj is somehow missing, though we mock Tumkuru if out of bounds)
          let talObj = { name: detectedTaluk }
          if (distObj && distObj.taluks) {
            talObj = distObj.taluks.find(t => t.name.toLowerCase() === detectedTaluk.toLowerCase()) || distObj.taluks[0]
          }

          const distName = distObj ? distObj.name : detectedDistrict
          const talName = talObj ? talObj.name : detectedTaluk

          const tKey = `${distName}|${talName}`
          const gpList = talukToGps[tKey] || []

          // Search ALL villages across ALL GPs in this taluk for a fuzzy match
          let matchedGp = gpList[0] || 'Main GP'
          let matchedVillage = 'Main Village'
          let bestScore = 0

          const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

          for (const gpName of gpList) {
            const gKey = `${distName}|${talName}|${gpName}`
            const villages = villageData[gKey] || []
            for (const v of villages) {
              const vNorm = normalize(v)
              for (const candidate of candidateNames) {
                const cNorm = normalize(candidate)
                // Exact match = highest score
                if (vNorm === cNorm) {
                  matchedGp = gpName
                  matchedVillage = v
                  bestScore = 100
                  break
                }
                // Substring match
                if (vNorm.includes(cNorm) || cNorm.includes(vNorm)) {
                  const score = Math.min(vNorm.length, cNorm.length) / Math.max(vNorm.length, cNorm.length) * 80
                  if (score > bestScore) {
                    bestScore = score
                    matchedGp = gpName
                    matchedVillage = v
                  }
                }
              }
              if (bestScore >= 100) break
            }
            if (bestScore >= 100) break
          }

          // If no match found, use first GP and first village, or just fallback to detected string
          if (bestScore === 0) {
            matchedGp = gpList[0] || 'Main GP'
            const gKey = `${distName}|${talName}|${matchedGp}`
            const vList = villageData[gKey] || []
            matchedVillage = vList.length > 0 ? vList[0] : (detectedVillageRaw || 'Main Village')
          }

          // Auto Login directly with entered values + detected location
          window.localStorage.setItem('citizen_name', name.trim())
          window.localStorage.setItem('citizen_email', email.trim())
          window.localStorage.setItem('citizen_district', distName)
          window.localStorage.setItem('citizen_taluk', talName)
          window.localStorage.setItem('citizen_gp', matchedGp)
          window.localStorage.setItem('citizen_village', matchedVillage)
          window.localStorage.setItem('citizen_area_type', 'rural')
          window.localStorage.setItem('citizen_phone', phone.trim())

          // Sync with Firestore so they have an actual user record
          const cleanEmail = email.trim()
          const uid = 'user-' + cleanEmail.replace(/[^a-z0-9]/gi, '-')
          try {
            await setDoc(doc(db, 'users', uid), {
              uid, name: name.trim(), email: cleanEmail, phone: phone.trim(),
              district: distName, taluk: talName,
              areaType: 'rural', gp: matchedGp, village: matchedVillage,
              role: 'villager',
              createdAt: serverTimestamp(),
              lastLoginAt: serverTimestamp()
            }, { merge: true })
          } catch (_) {}

          setGpsLoading(false)
          navigate('/dashboard/villager')
        } catch (err) {
          console.warn('GPS geocoding err:', err)
          // Direct fallback login with Gubbi Tumakuru
          const mockName = name.trim() || 'GPS Auto User'
          const mockEmail = email.trim() || 'gpsuser@gramsetu.gov.in'
          const mockPhone = phone.trim() || '9988776655'

          window.localStorage.setItem('citizen_name', mockName)
          window.localStorage.setItem('citizen_email', mockEmail)
          window.localStorage.setItem('citizen_district', 'Tumkuru')
          window.localStorage.setItem('citizen_taluk', 'Gubbi')
          window.localStorage.setItem('citizen_gp', 'Gubbi')
          window.localStorage.setItem('citizen_village', 'Gubbi Village')
          window.localStorage.setItem('citizen_area_type', 'rural')
          window.localStorage.setItem('citizen_phone', mockPhone)

          setGpsLoading(false)
          navigate('/dashboard/villager')
        }
      },
      (error) => {
        console.warn('Geolocation error code:', error.code)
        // Direct fallback login with Gubbi Tumakuru
        const mockName = name.trim() || 'GPS Auto User'
        const mockEmail = email.trim() || 'gpsuser@gramsetu.gov.in'
        const mockPhone = phone.trim() || '9988776655'

        window.localStorage.setItem('citizen_name', mockName)
        window.localStorage.setItem('citizen_email', mockEmail)
        window.localStorage.setItem('citizen_district', 'Tumkuru')
        window.localStorage.setItem('citizen_taluk', 'Gubbi')
        window.localStorage.setItem('citizen_gp', 'Gubbi')
        window.localStorage.setItem('citizen_village', 'Gubbi Village')
        window.localStorage.setItem('citizen_area_type', 'rural')
        window.localStorage.setItem('citizen_phone', mockPhone)

        setGpsLoading(false)
        navigate('/dashboard/villager')
      },
      { enableHighAccuracy: true, timeout: 6000 }
    )
  }

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

  // ── OTP send ───────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault()
    const ruralOk = areaType === 'rural' && gp && village
    const urbanOk = areaType === 'urban' && urbanBody && ward
    if (!name.trim() || !email.includes('@') || !district || !taluk || !areaType || (!ruralOk && !urbanOk)) {
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
      console.error('OTP send error:', error)
      setErrorMsg(error.message || 'Failed to send OTP. Please try again.')
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
      const dummyPassword = email + 'GramSetu!2026'
      try {
        await signInWithEmailAndPassword(auth, email, dummyPassword)
      } catch (authErr) {
        if (['auth/user-not-found', 'auth/invalid-credential', 'auth/invalid-login-credentials'].includes(authErr.code)) {
          try { await createUserWithEmailAndPassword(auth, email, dummyPassword) } catch (_) {}
        }
      }

      const uid = 'user-' + email.replace(/[^a-z0-9]/gi, '-')
      const resolvedGp = areaType === 'urban' ? urbanBody : gp
      const resolvedVillage = areaType === 'urban' ? ward : village
      try {
        await setDoc(doc(db, 'users', uid), {
          uid, name, email, phone,
          district, taluk,
          areaType,
          gp: resolvedGp,
          village: resolvedVillage,
          role: 'villager',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp()
        }, { merge: true })
      } catch (_) {}

      window.localStorage.setItem('citizen_name', name)
      window.localStorage.setItem('citizen_email', email)
      window.localStorage.setItem('citizen_district', district)
      window.localStorage.setItem('citizen_taluk', taluk)
      window.localStorage.setItem('citizen_gp', resolvedGp)
      window.localStorage.setItem('citizen_village', resolvedVillage)
      window.localStorage.setItem('citizen_area_type', areaType)
      window.localStorage.setItem('citizen_phone', phone)

      navigate('/dashboard/villager')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Select style helper ────────────────────────────────────────
  const selStyle = (disabled) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? 'var(--bg-main)' : undefined,
  })

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
                [Landmark, 'Raitha Siri / ರೈತ ಸಿರಿ'],
                [Wheat, 'Krishi Bhagya / ಕೃಷಿ ಭಾಗ್ಯ'],
                [TrendingUp, 'APMC Karnataka Live Prices'],
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
            <div style={{ padding: 16, background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', borderRadius: 'var(--radius-md)', fontSize: 14, marginBottom: 16, textAlign: 'center', lineHeight: '1.4' }}>
              <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              <strong>OTP sent to {email}!</strong>
            </div>
          )}

          {step === 1 ? (
            <form className="login-form" onSubmit={handleSendOtp}>
              {/* Name */}
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* GPS Auto Login Button */}
              <button
                type="button"
                className="btn"
                onClick={handleGpsAutoLogin}
                disabled={gpsLoading}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px 16px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  border: 'none', color: '#fff', fontWeight: 700, fontSize: 14,
                  borderRadius: 'var(--radius-md)', cursor: 'pointer', width: '100%',
                  marginBottom: 16, transition: 'all 0.2s',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.25)'
                }}
              >
                <MapPin size={18} strokeWidth={2.5} />
                {gpsLoading ? 'Detecting Location...' : 'GPS Quick Auto-Fill & Login'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 16px 0' }}>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-light)' }} />
                <span style={{ padding: '0 10px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>OR CHOOSE MANUALLY / ಅಥವಾ ಕೈಯಾರೆ ಆಯ್ಕೆಮಾಡಿ</span>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-light)' }} />
              </div>

              {/* District + Taluk */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">District / ಜಿಲ್ಲೆ *</label>
                  <select
                    className="form-input custom-select"
                    value={district}
                    onChange={e => handleDistrictChange(e.target.value)}
                    required
                  >
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
                    style={selStyle(!district)}
                  >
                    <option value="" disabled>Select Taluk</option>
                    {(activeDistrictObj?.taluks || []).map(t => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ── Area Type ── */}
              <div className="form-group">
                <label className="form-label">Area Type / ಪ್ರದೇಶದ ಪ್ರಕಾರ *</label>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {[
                    { value: 'rural', icon: <TreePine size={18} />, label: 'Rural / ಗ್ರಾಮೀಣ' },
                    { value: 'urban', icon: <Building2 size={18} />, label: 'Urban / ನಗರ' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleAreaTypeChange(opt.value)}
                      style={{
                        flex: 1,
                        padding: '10px 8px',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${areaType === opt.value ? 'var(--primary)' : 'var(--border)'}`,
                        background: areaType === opt.value ? 'var(--primary-light, #d1fae5)' : 'var(--bg-card)',
                        color: areaType === opt.value ? 'var(--primary-dark, #065f46)' : 'var(--text-secondary)',
                        fontWeight: areaType === opt.value ? 700 : 500,
                        fontSize: 13,
                        cursor: !taluk ? 'not-allowed' : 'pointer',
                        opacity: !taluk ? 0.45 : 1,
                        transition: 'all 0.18s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}
                      disabled={!taluk}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
                {!taluk && <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Select a Taluk first</p>}
              </div>

              {/* ── RURAL FIELDS ── */}
              {areaType === 'rural' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Gram Panchayat / ಗ್ರಾ.ಪಂ *</label>
                    <select
                      className="form-input custom-select"
                      value={gp}
                      onChange={e => handleGpChange(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Gram Panchayat</option>
                      {availableGps.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Village / ಗ್ರಾಮ *</label>
                    {!isOtherVillage ? (
                      <select
                        className="form-input custom-select"
                        value={village}
                        onChange={e => handleVillageChange(e.target.value)}
                        required
                        disabled={!gp}
                        style={selStyle(!gp)}
                      >
                        <option value="" disabled>
                          {!gp ? 'Select Panchayat first' : availableVillages.length === 0 ? 'Type your village ↓' : 'Select Village'}
                        </option>
                        {availableVillages.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                        {gp && <option value="OTHER">Other / My village is not listed</option>}
                      </select>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Enter your village or hamlet name"
                          value={village}
                          onChange={e => setVillage(e.target.value)}
                          required
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => { setIsOtherVillage(false); setVillage('') }}
                          style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {village && (
                    <div style={{ padding: '10px 14px', background: 'var(--primary-light, #d1fae5)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--primary-dark, #065f46)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      📍 {village} → {gp} GP → {taluk} → {district}
                    </div>
                  )}
                </>
              )}

              {/* ── URBAN FIELDS ── */}
              {areaType === 'urban' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Urban Local Body / ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ *</label>
                    <select
                      className="form-input custom-select"
                      value={urbanBody}
                      onChange={e => { setUrbanBody(e.target.value); setWard('') }}
                      required
                    >
                      <option value="" disabled>Select Urban Local Body</option>
                      {urbanBodiesForTaluk.map(ub => (
                        <option key={ub} value={ub}>{ub}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ward / ವಾರ್ಡ್ *</label>
                    <select
                      className="form-input custom-select"
                      value={ward}
                      onChange={e => setWard(e.target.value)}
                      required
                      disabled={!urbanBody}
                      style={selStyle(!urbanBody)}
                    >
                      <option value="" disabled>
                        {!urbanBody ? 'Select Urban Local Body first' : 'Select Ward'}
                      </option>
                      {wardsForUrbanBody.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  {ward && (
                    <div style={{ padding: '10px 14px', background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: '#4c1d95', display: 'flex', alignItems: 'center', gap: 6 }}>
                      🏙️ {ward} → {urbanBody} → {taluk} → {district}
                    </div>
                  )}
                </>
              )}

              <button
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center', padding: '14px' }}
                type="submit"
                disabled={loading || !email.includes('@') || !name.trim() || !areaType || (areaType === 'rural' ? !village : !ward)}
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
                onClick={() => { setStep(1); setOtpSentAlert(false); setOtp(''); setGeneratedOtp('') }}
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
