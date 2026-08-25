import React, { useState, useEffect } from 'react'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Ban,
  Bell,
  BookOpen,
  Bot,
  Building2,
  Calculator,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  Clock,
  Cloud,
  CloudRain,
  CreditCard,
  Droplets,
  Edit3,
  FileText,
  Folder,
  Globe,
  GraduationCap,
  Hand,
  HelpCircle,
  Home,
  Hourglass,
  IndianRupee,
  Info,
  KeyRound,
  Landmark,
  Lock,
  Map,
  MapPin,
  Megaphone,
  MessageCircle,
  Minus,
  Phone,
  PhoneCall,
  PhoneOff,
  Pin,
  PlayCircle,
  Radio,
  RefreshCw,
  Route,
  Scale,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Stethoscope,
  Sun,
  Thermometer,
  Ticket,
  Trash2,
  TrendingUp,
  Volume2,
  Wheat,
  Wind,
  X,
  Zap
} from 'lucide-react'
import { useLanguage, Trans } from '../context/LanguageContext'

import { db } from '../firebase'
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { fetchLivePrices, BASELINE_PRICES, clearPriceCache } from '../utils/fetchPrices'
import { districtsOfKarnataka } from '../data/karnatakaTaluks'
import { fetchWeatherForLocation, formatForecastData } from '../utils/fetchWeather'
import {
  kaSchemes,
  agriFinancialAssistance,
  agriAdvisoryAndCenters,
  schemesSuccessStories,
  schemesImpactStats,
  schemesFaqs,
  grievanceHelpdesks
} from '../data/schemesData'
import { districtCropsMap, cropImageMap, cropMeta, formatCropLabel } from '../data/districtCrops'
import cropInfoMap from '../data/cropInfo.json'
import districtPricesMap from '../data/districtPrices.json'
import { karnatakaPopularCrops } from '../data/karnatakaPopularCrops'

// ===================== KARNATAKA DATA =====================

// kaSchemes is now imported from src/data/schemesData.js

export const kaPrices = [
  // MSP 2025-26: Ragi ₹4,290/quintal; APMC Bengaluru spot ~₹3,900-4,100
  { crop: 'Ragi (ರಾಗಿ)', unit: 'per quintal', price: '₹4,050', change: '+₹64', trend: 'up', market: 'APMC Bengaluru', img: '/crops/Ragi.jpg' },
  // Arecanut Shimoga spot ~₹48,000-52,000 (2025-26 high demand)
  { crop: 'Areca Nut (ಅಡಿಕೆ)', unit: 'per quintal', price: '₹49,500', change: '+₹800', trend: 'up', market: 'APMC Shimoga', img: '/crops/Arecanut.jpg' },
  // Coffee Robusta Chikkamagaluru ~₹18,000-22,000/quintal
  { crop: 'Coffee (ಕಾಫಿ)', unit: 'per quintal', price: '₹20,500', change: '-₹300', trend: 'down', market: 'APMC Chikkamagaluru', img: '/crops/Coffee.jpg' },
  // Silk Cocoon Ramanagara ~₹500-650/kg
  { crop: 'Silk Cocoon (ರೇಷ್ಮೆ)', unit: 'per kg', price: '₹580', change: '+₹15', trend: 'up', market: 'Silk Exchange, Ramanagara', img: '/crops/Silk_Cocoon.jpg' },
  // MSP 2025-26: Jowar ₹3,371/quintal
  { crop: 'Jowar (ಜೋಳ)', unit: 'per quintal', price: '₹3,350', change: '-₹21', trend: 'down', market: 'APMC Dharwad', img: '/crops/Jowar.jpg' },
  // MSP 2025-26: Maize ₹2,225/quintal
  { crop: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', unit: 'per quintal', price: '₹2,280', change: '+₹55', trend: 'up', market: 'APMC Davangere', img: '/crops/Maize.jpg' },
  // Tomato Kolar APMC highly volatile; ~₹20-35/kg in Aug
  { crop: 'Tomato (ಟೊಮೇಟೊ)', unit: 'per kg', price: '₹28', change: '+₹6', trend: 'up', market: 'APMC Kolar', img: '/crops/Tomato.jpg' },
  // Onion Gadag/Hubli APMC ~₹18-28/kg
  { crop: 'Onion (ಈರುಳ್ಳಿ)', unit: 'per kg', price: '₹22', change: '-₹3', trend: 'down', market: 'APMC Gadag', img: '/crops/Onion.jpg' },
  // FRP Sugarcane Karnataka 2025-26: ₹3,150/tonne (state SAP ₹3,400)
  { crop: 'Sugarcane (ಕಬ್ಬು)', unit: 'per tonne', price: '₹3,400', change: '₹0', trend: 'neutral', market: 'APMC Mandya', img: '/crops/Sugarcane.jpg' },
  // Turmeric Chamarajanagar/Mysuru ~₹12,000-15,000/quintal
  { crop: 'Turmeric (ಅರಿಶಿನ)', unit: 'per quintal', price: '₹13,800', change: '+₹300', trend: 'up', market: 'APMC Chamarajanagar', img: '/crops/Turmeric.jpg' },
  // Coconut Tumkuru ~₹1,800-2,200 per 100 nuts
  { crop: 'Coconut (ತೆಂಗಿನಕಾಯಿ)', unit: 'per 100 nuts', price: '₹2,050', change: '+₹80', trend: 'up', market: 'APMC Tumkuru', img: '/crops/Coconut.jpg' },
  // MSP 2025-26: Groundnut ₹6,783/quintal; market ~₹6,000-7,000
  { crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal', price: '₹6,650', change: '-₹130', trend: 'down', market: 'APMC Chitradurga', img: '/crops/Groundnut.jpg' },
]

export const kaAnnouncements = [
  {
    id: 1,
    title: { en: 'Free Krishi Mela — Mysuru GKVK', kn: 'ಉಚಿತ ಕೃಷಿ ಮೇಳ — ಮೈಸೂರು GKVK', hi: 'मुफ्त कृषि मेला — मैसूर GKVK' },
    date: '10 Aug 2026', category: 'Agriculture',
    desc: { 
      en: 'UAS Dharwad is organizing a free agriculture exhibition at GKVK Mysuru. Featuring high-yield seeds demonstration, organic farming tutorials, pesticide guidance, and free soil testing camps.', 
      kn: 'ಯುಎಎಸ್ ಧಾರವಾಡ ಮೈಸೂರು ಜಿಕೆವಿಕೆಯಲ್ಲಿ ಉಚಿತ ಬೃಹತ್ ಕೃಷಿ ಮೇಳವನ್ನು ಆಯೋಜಿಸುತ್ತಿದೆ. ಸುಧಾರಿತ ಬೀಜಗಳು, ಸಾವಯವ ಕೃಷಿ ಪದ್ಧತಿ ಮತ್ತು ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಶಿಬಿರ ಇರಲಿವೆ.', 
      hi: 'UAS धारवाड़ मैसूर GKVK में मुफ्त कृषि मेला आयोजित करेगा। बीज, कीटनाशक मार्गदर्शन, मिट्टी परीक्षण।' 
    },
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    urgent: true,
  },
  {
    id: 2,
    title: { en: 'Ragi MSP Procurement Registration Begins', kn: 'ರಾಗಿ MSP ಖರೀದಿ ನೋಂದಣಿ ಆರಂಭ', hi: 'रागी MSP खरीद शुरू' },
    date: '08 Aug 2026', category: 'Agriculture',
    desc: { 
      en: 'Karnataka Food Corporation begins MSP procurement registration of Ragi at ₹3,846 per quintal. Bring Aadhaar, bank passbook, and land records to the nearest APMC registration counter.', 
      kn: 'ಕರ್ನಾಟಕ ಆಹಾರ ನಿಗಮವು ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಯೋಜನೆಯಡಿ ₹3,846 ಕ್ವಿಂಟಾಲ್‌ ದರದಲ್ಲಿ ರಾಗಿ ಖರೀದಿಸಲು ನೋಂದಣಿ ಆರಂಭಿಸಿದೆ. ಹತ್ತಿರದ ಎಪಿಎಂಸಿಗೆ ಆಧಾರ್ ಹಾಗೂ ಜಮೀನು ದಾಖಲೆ ತನ್ನಿ.', 
      hi: 'कर्नाटक खाद्य निगम ₹3,846/क्विंतल पर रागी खरीद शुरू। आधार और भूमि रिकॉर्ड लाएं।' 
    },
    img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80',
    urgent: true,
  },
]

export const initialComplaints = [
  { id: 'GS-KA-0456', title: 'Hand Pump Not Working — Ward 3', status: 'inprogress', date: '2 Aug 2026', category: 'Water Supply', assignedTo: 'Gram Panchayat, Ramanagar', lastUpdate: 'Inspection scheduled for 10 Aug by AEE', photo: null },
  { id: 'GS-KA-0389', title: 'Street Light Broken — Mysuru Road', status: 'resolved', date: '20 Jul 2026', category: 'Electricity / BESCOM', assignedTo: 'BESCOM', lastUpdate: 'Resolved on 28 Jul 2026', photo: null },
  { id: 'GS-KA-0312', title: 'School Building Roof Leaking — GPS Ramanagar', status: 'pending', date: '15 Jul 2026', category: 'Schools / DDPI', assignedTo: 'DDPI Office, Mysuru', lastUpdate: 'Pending review', photo: null },
]

const kaComplaintCategories = [
  [Droplets,      { en: 'Water Supply', kn: 'ನೀರು ಸರಬರಾಜು', hi: 'जल आपूर्ति' }],
  [Zap,           { en: 'Electricity / BESCOM', kn: 'ವಿದ್ಯುತ್ / BESCOM', hi: 'बिजली / BESCOM' }],
  [Route,         { en: 'Roads & Paths', kn: 'ರಸ್ತೆ ಮತ್ತು ದಾರಿ', hi: 'सड़क और रास्ते' }],
  [GraduationCap, { en: 'Schools / DDPI', kn: 'ಶಾಲೆ / DDPI', hi: 'स्कूल / DDPI' }],
  [Activity,      { en: 'PHC / Health', kn: 'PHC / ಆರೋಗ್ಯ', hi: 'PHC / स्वास्थ्य' }],
  [Sprout,        { en: 'Agriculture / RSK', kn: 'ಕೃಷಿ / RSK', hi: 'कृषि / RSK' }],
  [Trash2,        { en: 'Sanitation / BBMP', kn: 'ಸ್ವಚ್ಛತೆ', hi: 'स्वच्छता' }],
  [MapPin,        { en: 'Bhoomi / Land Records', kn: 'ಭೂಮಿ / ಭೂ ದಾಖಲೆ', hi: 'भूमि रिकॉर्ड' }],
]

let globalComplaints = [...initialComplaints]
const notifyComplaintListeners = () => {
  if (window.onComplaintsUpdated) {
    window.onComplaintsUpdated([...globalComplaints])
  }
}

const normalizeDistrict = (d) => {
  const aliases = {
    'Chikkaballapura': 'Chikkaballapur', 'Bengaluru': 'Bengaluru Urban',
    'Davangere': 'Davanagere', 'Dharwar': 'Dharwad', 'Gulbarga': 'Kalaburagi',
    'Bijapur': 'Vijayapura', 'Bellary': 'Ballari', 'Belgaum': 'Belagavi',
    'Shimoga': 'Shivamogga', 'Tumkur': 'Tumakuru', 'Dakshin Kannada': 'Dakshina Kannada',
  }
  return aliases[d] || d
}

export function HomeScreen({ setActive }) {
  const { t, lang } = useLanguage()
  const [userName, setUserName] = useState('ರಾಮಪ್ಪ ಗೌಡ')
  const [userDistrict, setUserDistrict] = useState('Mysuru')
  const [userTaluk, setUserTaluk] = useState('Mysuru Taluk')
  const [roleMode, setRoleMode] = useState('farmer')
  const [livePrices, setLivePrices] = useState(districtPricesMap['Mysuru'] || BASELINE_PRICES)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [priceFlash, setPriceFlash] = useState({})
  const [priceSource, setPriceSource] = useState('district') // 'live' | 'baseline' | 'district'
  const [loadingPrices, setLoadingPrices] = useState(true)
  const [selectedCropInfo, setSelectedCropInfo] = useState(null)

  // Flash a row green/red when its price changes
  const flashRow = (idx, trend) => {
    setPriceFlash(f => ({ ...f, [idx]: trend }))
    setTimeout(() => setPriceFlash(f => ({ ...f, [idx]: null })), 1200)
  }

  // Intra-day micro-tick: tiny ±0.3% fluctuation on current prices (simulates live feed)
  const applyMicroTick = (base) => {
    return base.map((p, idx) => {
      const raw = parseFloat(String(p.price).replace(/[₹,]/g, ''))
      if (!raw) return p
      const delta = Math.round((Math.random() - 0.49) * raw * 0.003)
      if (delta === 0) return p
      const newRaw = raw + delta
      const isUp = delta > 0
      const fmtR = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
      flashRow(idx, isUp ? 'up' : 'down')
      return {
        ...p,
        price: fmtR(newRaw),
        change: (isUp ? '+' : '') + fmtR(delta),
        trend: isUp ? 'up' : 'down',
      }
    })
  }

  // Fetch real AGMARKNET prices on mount, then apply micro-tick every 60s
  const refreshPrices = async (forceApi = false) => {
    setLoadingPrices(true)
    const distData = districtPricesMap[normalizeDistrict(userDistrict)] || districtPricesMap['Mysuru'] || BASELINE_PRICES
    setLivePrices(distData)
    setPriceSource('district')
    setLastUpdated(new Date())
    setTimeout(() => setLoadingPrices(false), 400)
  }

  useEffect(() => {
    refreshPrices()
    // Micro-tick every 60s for intra-session feel
    const tick = setInterval(() => {
      setLivePrices(prev => applyMicroTick(prev))
      setLastUpdated(new Date())
    }, 60000)
    return () => clearInterval(tick)
  }, [])


  const loadProfile = () => {
    const sName = window.localStorage.getItem('citizen_name')
    const sDist = window.localStorage.getItem('citizen_district')
    const sTaluk = window.localStorage.getItem('citizen_taluk')
    if (sName) setUserName(sName)
    if (sDist) {
      setUserDistrict(sDist)
      setLivePrices(districtPricesMap[normalizeDistrict(sDist)] || districtPricesMap['Mysuru'])
    }
    if (sTaluk) setUserTaluk(sTaluk)
  }

  useEffect(() => {
    loadProfile()
    window.addEventListener('profileUpdate', loadProfile)
    return () => window.removeEventListener('profileUpdate', loadProfile)
  }, [])

  return (
    <div className="animate-fadeInUp">
      <div className="welcome-banner">
        <div className="welcome-banner-bg" />
        <div className="welcome-banner-bg2" />
        <div className="welcome-banner-text">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {lang === 'kn' ? `${userName} ಅವರಿಗೆ ಸ್ವಾಗತ!` : `Welcome, ${userName}!`}
            <Sparkles size={20} style={{ color: '#fbbf24', flexShrink: 0 }} />
          </h2>
          <p>{userTaluk}, {userDistrict} District, Karnataka</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setActive && setActive('schemes')}>
              <CheckCircle2 size={12} />PM Kisan Active
            </span>
            <span className="badge badge-warning" style={{ cursor: 'pointer' }} onClick={() => setActive && setActive('market')}>ರಾಗಿ MSP ಖರೀದಿ ಶುರು</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer' }} onClick={() => setActive && setActive('announcements')}>1 {t('newAlerts')}</span>
          </div>
        </div>
        <div className="welcome-banner-img">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80"
            alt="Karnataka farmer"
            style={{ borderRadius: 12, height: 110, objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Dynamic Profile Selector in Home Screen */}
      <div className="card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              {lang === 'kn' ? 'ನಿಮ್ಮ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ:' : 'Select Your Category:'}
            </h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
              {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ ರೈತ ಅಥವಾ ವಿದ್ಯಾರ್ಥಿ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ' : 'Select Farmer or Student mode to customize your view'}
            </p>
          </div>
          <div style={{ display: 'inline-flex', background: 'var(--bg-main)', padding: 4, borderRadius: 10, border: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setRoleMode('farmer')}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: roleMode === 'farmer' ? 'var(--primary)' : 'transparent',
                color: roleMode === 'farmer' ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >
              <Sprout className="inline mr-1 text-emerald-500" size={16} /> {lang === 'kn' ? 'ರೈತ' : 'Farmer'}
            </button>
            <button
              onClick={() => setRoleMode('student')}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: roleMode === 'student' ? 'var(--primary)' : 'transparent',
                color: roleMode === 'student' ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >
              <GraduationCap className="inline mr-1 text-purple-500" size={16} /> {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ' : 'Student'}
            </button>
          </div>
        </div>
      </div>

      
      {roleMode === 'farmer' && districtCropsMap[userDistrict] && (
        <div className="animate-fadeInUp card" style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sprout size={18} style={{ color: 'var(--primary)' }} />
                {lang === 'kn' ? `${userDistrict} ಜಿಲ್ಲೆಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳು` : `Suitable Crops for ${userDistrict}`}
              </h4>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                {lang === 'kn' ? 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಬೆಳೆಯಬಹುದಾದ ಪ್ರಮುಖ 10 ಬೆಳೆಗಳು' : 'Top 10 major crops suitable for your district'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', padding: '16px 20px', gap: 16, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {districtCropsMap[userDistrict].map((crop, idx) => (
              
              <div 
                key={idx} 
                style={{ minWidth: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => setSelectedCropInfo(cropInfoMap[crop])}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >

                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '3px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <img src={cropImageMap[crop] || cropInfoMap[crop]?.image || `/crops/${crop.replace(/\s+/g, '_')}.jpg`} alt={crop} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, textAlign: 'center', color: 'var(--text-main)' }}>{crop}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {roleMode === 'student' && (
        <div className="animate-fadeInUp card" style={{ marginBottom: 20, border: '1.5px solid var(--primary-light)', background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}><GraduationCap className="inline mr-1 text-purple-500" size={16} /></span>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
                  <GraduationCap className="inline mr-1 text-purple-500" size={16} /> Scholarships & Eligibility
                </h4>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                  {lang === 'kn'
                    ? 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಸುಲಭವಾಗಿ ಹೋಲಿಸಿ ಮತ್ತು ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ'
                    : 'Quickly compare scholarships and view application details'}
                </p>
              </div>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActive && setActive('schemes')}
              style={{ fontSize: 12 }}
            >
              <GraduationCap className="inline mr-1 text-purple-500" size={16} /> {lang === 'kn' ? 'ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View All Scholarships'} <ArrowRight className="inline ml-1" size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {[
              {
                title: lang === 'kn' ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ (SSP)' : 'Karnataka SSP Scholarships (SC/ST/OBC/Farmers)',
                classReq: lang === 'kn' ? '೮ ರಿಂದ ೧೨ನೇ / ಪದವಿ / ಪಿಜಿ' : '8th–12th / UG / PG',
                incomeLimit: lang === 'kn' ? '₹2.5 ಲಕ್ಷ/ವರ್ಷ' : '₹2.5 Lakh/year',
                link: 'https://ssp.postmatric.karnataka.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ರಾಷ್ಟ್ರೀಯ ಮೀನ್ಸ್-ಕಮ್-ಮೆರಿಟ್ (NMMSS)' : 'National Means-cum-Merit (NMMSS)',
                classReq: lang === 'kn' ? '೮ ರಿಂದ ೧೨ನೇ ತರಗತಿ' : '8th–12th Class',
                incomeLimit: lang === 'kn' ? '₹3.5 ಲಕ್ಷ/ವರ್ಷ' : '₹3.5 Lakh/year',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಎಐಸಿಟಿಇ ಪ್ರಗತಿ ಹೆಣ್ಣುಮಕ್ಕಳ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'AICTE Pragati Scholarship for Girls',
                classReq: lang === 'kn' ? 'ಡಿಪ್ಲೊಮಾ / ತಾಂತ್ರಿಕ ಪದವಿ (BE)' : 'Diploma / UG (Technical)',
                incomeLimit: lang === 'kn' ? '₹8.0 ಲಕ್ಷ/ವರ್ಷ' : '₹8.0 Lakh/year',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಪಿಎಂ-ಯಶಸ್ವಿ ಯೋಜನೆ (PM-YASASVI)' : 'PM-YASASVI Scholarship Scheme',
                classReq: lang === 'kn' ? '೯ ರಿಂದ ೧೨ನೇ / ಪದವಿ' : '9th–12th / UG',
                incomeLimit: lang === 'kn' ? '₹2.5 ಲಕ್ಷ/ವರ್ಷ' : '₹2.5 Lakh/year',
                link: 'https://yet.nta.ac.in/'
              },
              {
                title: lang === 'kn' ? 'ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ಸೆಂಟ್ರಲ್ ಸೆಕ್ಟರ್ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'PM-USP Central Sector Scholarship',
                classReq: lang === 'kn' ? '೧೨ನೇ ಉತ್ತೀರ್ಣ / ಪದವಿ / ಪಿಜಿ' : '12th Pass / UG / PG',
                incomeLimit: lang === 'kn' ? '₹4.5 ಲಕ್ಷ/ವರ್ಷ' : '₹4.5 Lakh/year',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಪಿಎಂ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಯೋಜನೆ (PMSS)' : 'PM Scholarship Scheme (PMSS)',
                classReq: lang === 'kn' ? 'ವೃತ್ತಿಪರ ಪದವಿಗಳು (BE, MBBS)' : 'Professional UG (BE, MBBS)',
                incomeLimit: lang === 'kn' ? 'ಮಾಜಿ ಸೈನಿಕರ ಮಕ್ಕಳಿಗೆ' : 'Ex-Servicemen Wards',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಮೆಟ್ರಿಕ್ ನಂತರದ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'Post-Matric SC/ST Scholarship',
                classReq: lang === 'kn' ? '೧೧ನೇ / ೧೨ನೇ / ಪದವಿ / ಪಿಜಿ' : '11th / 12th / UG / PG',
                incomeLimit: lang === 'kn' ? '₹೨.೫ ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ (Below ₹2.5L)' : 'Below ₹2.5 Lakh/year',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ರಿಲಯನ್ಸ್ ಫೌಂಡೇಶನ್ / AICTE ಸ್ವನಾಥ್ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'Reliance Foundation / AICTE Swanath Scheme',
                classReq: lang === 'kn' ? 'ಪದವಿ / ಡಿಪ್ಲೊಮಾ / ಎಂಜಿನಿಯರಿಂಗ್' : 'UG Degree / Diploma / Tech',
                incomeLimit: lang === 'kn' ? '₹೮.೦ ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು/ಯಾವುದೇ ಆದಾಯ ಮಿತಿಯಿಲ್ಲ (Above ₹8.0L / Open)' : 'Above ₹8.0 Lakh / Open to All',
                link: 'https://www.reliancefoundation.org/'
              }
            ].map((sch, sIdx) => (
              <div key={sIdx} style={{ background: 'var(--bg-main)', borderRadius: 12, padding: 16, border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div>
                  <h5 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-primary)', lineHeight: 1.3 }}>{sch.title}</h5>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 6px 0', fontWeight: 500 }}>
                    <strong><BookOpen className="inline mr-1 text-blue-500" size={16} /> Class:</strong> {sch.classReq}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 14px 0', fontWeight: 500 }}>
                    <strong><IndianRupee className="inline mr-1 text-emerald-500" size={16} /> Family Income Limit:</strong> {sch.incomeLimit}
                  </p>
                </div>
                <a
                  href={sch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '8px 12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, borderRadius: 8 }}
                >
                  View Scholarship →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="stats-grid">
        {[
          { Icon: Landmark,         labelKey: 'activeSchemes',    value: '6',      color: '#dbeafe', iconColor: '#1d4ed8', trend: '+1 Raitha Siri', pageId: 'schemes' },
          { Icon: ClipboardList,    labelKey: 'myComplaints',     value: String(globalComplaints.length), color: '#fee2e2', iconColor: '#dc2626', trend: `${globalComplaints.filter(c => c.status === 'resolved').length} resolved`, pageId: 'complaints' },
          { Icon: Bell,             labelKey: 'newAlerts',        value: '4',      color: '#fef3c7', iconColor: '#d97706', trend: '2 urgent', pageId: 'announcements' }
        ].map((s, i) => (
          <div 
            className="stat-card animate-fadeInUp" 
            key={i} 
            style={{ animationDelay: `${i * 0.1}s`, cursor: 'pointer' }}
            onClick={() => setActive(s.pageId)}
          >
            <div className="stat-icon" style={{ background: s.color, color: s.iconColor }}>
              <s.Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="stat-info">
              <p>{t(s.labelKey)}</p>
              <p>{s.value}</p>
              <span>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div>
          <div className="section-title">
            <h3>{t('todayPrices')} ({userDistrict})</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {loadingPrices ? (
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}><Hourglass className="inline mr-1 text-amber-500" size={16} /> Fetching...</span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: priceSource === 'live' ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: priceSource === 'live' ? 'var(--success)' : '#aaa', display: 'inline-block', animation: priceSource === 'live' ? 'pulse 1.5s infinite' : 'none' }} />
                  {priceSource === 'live' ? 'LIVE · AGMARKNET' : 'MSP Baseline'}
                </span>
              )}
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                onClick={() => refreshPrices(true)}
                disabled={loadingPrices}
                style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: '2px 8px', borderRadius: 6, border: '1px solid var(--border-light)', background: 'var(--bg-card)', opacity: loadingPrices ? 0.5 : 1 }}
              >↻ Refresh</button>
            </div>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="market-table">
                <thead><tr><th>{t('cropCol')}</th><th>{t('priceCol')}</th><th>{t('changeCol')}</th></tr></thead>
                <tbody>
                  {livePrices.slice(0, 5).map((p, i) => (
                    <tr key={i} style={{
                      transition: 'background 0.5s',
                      background: priceFlash[i] === 'up' ? 'rgba(34,197,94,0.12)' : priceFlash[i] === 'down' ? 'rgba(239,68,68,0.1)' : ''
                    }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <img src={p.img} alt={p.crop} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} onError={e => { e.target.style.display='none' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.crop}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{userDistrict} APMC</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700 }}>{p.price}</td>
                      <td className={p.trend === 'up' ? 'price-up' : p.trend === 'down' ? 'price-down' : 'price-neutral'}>
                        <span style={{ display:'flex', alignItems:'center', gap: 3 }}>
                          {p.trend === 'up' ? <ArrowUp size={12}/> : p.trend === 'down' ? <ArrowDown size={12}/> : <Minus size={12}/>} {p.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '8px 16px', fontSize: 10, color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Source: AGMARKNET / data.gov.in</span>
              <a onClick={() => setActive('market')} style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>View Full Market ↗</a>
            </div>
          </div>
        </div>


        <div>
          <div className="section-title">
            <h3>{t('recentAnnounce')} {lang === 'kn' ? `(${userDistrict})` : `(${userDistrict})`}</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(kaAnnouncements.filter(a => a.targetDistrict === userDistrict || a.targetDistrict === 'All' || !a.targetDistrict).length > 0
              ? kaAnnouncements.filter(a => a.targetDistrict === userDistrict || a.targetDistrict === 'All' || !a.targetDistrict).slice(0, 2)
              : kaAnnouncements.slice(0, 2)).map((a, i) => (
              <div className="card" key={i} style={{ padding: 16, display: 'flex', gap: 14, cursor: 'pointer' }} onClick={() => setActive('announcements')}>
                <img src={a.img} alt="" style={{ width: 80, height: 60, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {a.urgent && <span className="badge badge-danger" style={{ fontSize: 10 }}>{t('urgent')}</span>}
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.date}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title[lang] || a.title.en}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{(a.desc[lang] || a.desc.en).slice(0, 80)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crop Info Modal */}
      {selectedCropInfo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }} onClick={() => setSelectedCropInfo(null)}>
          <div className="animate-fadeInUp" style={{
            background: 'var(--bg-card)', borderRadius: 16, padding: 24, maxWidth: 400, width: '100%',
            position: 'relative', border: '1px solid var(--border-light)'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCropInfo(null)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'var(--bg-main)', border: 'none', width: 32, height: 32, borderRadius: 16, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
            ><X className="inline" size={16} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                <img src={selectedCropInfo.image} alt={selectedCropInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{selectedCropInfo.name}</h3>
                <span className="badge badge-success">Major Crop</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
              {typeof selectedCropInfo.description === 'string' ? selectedCropInfo.description : (selectedCropInfo.description[lang] || selectedCropInfo.description.en)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function SchemesScreen() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('directory') // 'directory' | 'loans' | 'advisory' | 'stories' | 'grievance'
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Filtering States
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All') // 'All' | 'Central' | 'State'
  const [beneficiaryFilter, setBeneficiaryFilter] = useState('All')
  const [objectiveFilter, setObjectiveFilter] = useState('All')
  const [stageFilter, setStageFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  // Smart Scholarship Finder Form State
  const [filterClass, setFilterClass] = useState('')
  const [filterIncome, setFilterIncome] = useState('')
  const [scholarshipFormSubmitted, setScholarshipFormSubmitted] = useState(false)

  const [schemes, setSchemes] = useState(kaSchemes)
  const [loadingSchemes, setLoadingSchemes] = useState(true)

  // Fetch from Firestore and merge cleanly with local kaSchemes
  useEffect(() => {
    const q = query(collection(db, 'schemes'))
    getDocs(q)
      .then(snap => {
        if (!snap.empty) {
          const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          const merged = [...fetched]
          kaSchemes.forEach(local => {
            if (!merged.some(m => m.id === local.id)) {
              merged.push(local)
            }
          })
          setSchemes(merged)
        }
      })
      .catch(() => {/* silent fallback */})
      .finally(() => setLoadingSchemes(false))
  }, [])

  // Text to Speech for Accessibility
  const handleToggleVoice = (scheme) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.')
      return
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    const textToRead = `${scheme.title[lang] || scheme.title.en}. ${scheme.desc[lang] || scheme.desc.en}. Eligibility: ${scheme.eligibility[lang] || scheme.eligibility.en}.`
    const utterance = new SpeechSynthesisUtterance(textToRead)
    if (lang === 'kn') utterance.lang = 'kn-IN'
    else if (lang === 'hi') utterance.lang = 'hi-IN'
    else utterance.lang = 'en-IN'
    
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  const categories = ['All', 'Agriculture', 'Finance', 'Health', 'Women', 'Scholarship']
  const beneficiaryOptions = [
    { value: 'All', label: t('filterBeneficiaryAll') },
    { value: 'Small/Marginal Farmers', label: t('filterBeneficiarySmall') },
    { value: 'Large Landholders', label: t('filterBeneficiaryLarge') },
    { value: 'Women Farmers', label: t('filterBeneficiaryWomen') },
    { value: 'Youth/Agri-Startups', label: t('filterBeneficiaryYouth') },
    { value: 'FPOs', label: t('filterBeneficiaryFPO') }
  ]

  const objectiveOptions = [
    { value: 'All', label: t('filterObjectiveAll') },
    { value: 'Income Support', label: t('filterObjectiveIncome') },
    { value: 'Water Conservation', label: t('filterObjectiveWater') },
    { value: 'Soil Health', label: t('filterObjectiveSoil') },
    { value: 'Crop Insurance', label: t('filterObjectiveInsurance') },
    { value: 'Mechanization', label: t('filterObjectiveMechanization') },
    { value: 'Organic Farming', label: t('filterObjectiveOrganic') },
    { value: 'Post-Harvest', label: t('filterObjectivePostHarvest') },
    { value: 'Export Promotion', label: t('filterObjectiveExport') }
  ]

  const stageOptions = [
    { value: 'All', label: t('filterStageAll') },
    { value: 'Pre-Harvest', label: t('filterStagePre') },
    { value: 'Harvesting', label: t('filterStageHarvest') },
    { value: 'Post-Harvest', label: t('filterStagePost') },
    { value: 'Marketing', label: t('filterStageMarketing') }
  ]

  // Synonym maps for flexible matching
  const stageSynonyms = {
    'post-harvest': ['post-harvest', 'post harvest', 'storage', 'post-harvest & storage', 'processing'],
    'marketing': ['marketing', 'export', 'marketing & export', 'trade', 'market'],
    'pre-harvest': ['pre-harvest', 'pre harvest', 'seeds', 'inputs'],
    'harvesting': ['harvesting', 'harvest', 'cutting']
  }

  const objectiveSynonyms = {
    'post-harvest': ['post-harvest', 'post harvest', 'storage', 'processing', 'cold chain'],
    'export promotion': ['export', 'trade', 'export promotion', 'kappec'],
    'organic farming': ['organic', 'millet', 'raitha siri'],
    'water conservation': ['water', 'irrigation', 'drip', 'borewell', 'kusum'],
    'crop insurance': ['insurance', 'bima', 'samrakshane'],
    'income support': ['income', 'dbt', 'grant', 'cash', 'support'],
    'mechanization': ['mechanization', 'tractor', 'machinery', 'solar', 'pump']
  }

  // Robust flexible matcher function
  const matchesFilter = (schemeVal, filterVal, synonyms = {}) => {
    if (!filterVal || filterVal === 'All') return true
    if (!schemeVal) return false

    const fLower = String(filterVal).toLowerCase().trim()
    const schemeList = Array.isArray(schemeVal)
      ? schemeVal.map(v => String(v).toLowerCase().trim())
      : [String(schemeVal).toLowerCase().trim()]

    return schemeList.some(sVal => {
      if (sVal === fLower) return true
      if (sVal === 'all-season' || sVal === 'all') return true

      // Substring match in either direction
      if (sVal.includes(fLower) || fLower.includes(sVal)) return true

      // Synonym mapping
      const filterSyns = synonyms[fLower] || []
      return filterSyns.some(syn => sVal.includes(syn) || syn.includes(sVal))
    })
  }

  // Filter schemes based on multi-dimensional filters
  const filteredSchemes = schemes.filter(scheme => {
    // Category
    if (!matchesFilter(scheme.category, categoryFilter)) return false
    
    // Level: Central vs State
    if (!matchesFilter(scheme.level, levelFilter)) return false

    // Beneficiary
    if (!matchesFilter(scheme.beneficiary, beneficiaryFilter)) return false

    // Objective
    if (!matchesFilter(scheme.objective, objectiveFilter, objectiveSynonyms)) return false

    // Stage
    if (!matchesFilter(scheme.stage, stageFilter, stageSynonyms)) return false

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const titleStr = typeof scheme.title === 'string' ? scheme.title : `${scheme.title?.en || ''} ${scheme.title?.kn || ''} ${scheme.title?.hi || ''}`
      const descStr = typeof scheme.desc === 'string' ? scheme.desc : `${scheme.desc?.en || ''} ${scheme.desc?.kn || ''} ${scheme.desc?.hi || ''}`
      const objStr = typeof scheme.objective === 'string' ? scheme.objective : ''
      const stgStr = typeof scheme.stage === 'string' ? scheme.stage : ''
      if (!titleStr.toLowerCase().includes(q) && !descStr.toLowerCase().includes(q) && !objStr.toLowerCase().includes(q) && !stgStr.toLowerCase().includes(q)) {
        return false
      }
    }

    // Scholarship specific filters
    if (scheme.category === 'Scholarship') {
      if (filterClass) {
        const clsVal = parseInt(filterClass)
        if (scheme.minClassLevel && clsVal < scheme.minClassLevel) return false
        if (scheme.maxClassLevel && clsVal > scheme.maxClassLevel) return false
      }
      if (filterIncome) {
        const incVal = parseInt(filterIncome)
        if (scheme.maxIncomeLimit && incVal > scheme.maxIncomeLimit) return false
      }
    }

    return true
  })

  // Helper for multi-lang text safely
  const getLangText = (field) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[lang] || field.en || field.kn || field.hi || ''
  }

  return (
    <div className="animate-fadeInUp" style={{ paddingBottom: 40 }}>
      {/* Top Banner with Quick Actions & Stats */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
        borderRadius: 20,
        padding: '24px 28px',
        color: '#fff',
        marginBottom: 24,
        boxShadow: '0 10px 25px rgba(5, 150, 105, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.15, fontSize: 160 }}>
          <Sprout className="inline mr-1 text-emerald-500" size={16} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginBottom: 8, padding: '4px 10px', fontSize: 12 }}>
                <Landmark className="inline mr-1 text-blue-500" size={16} /> Karnataka &amp; Central Agri Portal
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '4px 0 8px 0', color: '#fff' }}>
                {t('schemesTitle') || 'Government Schemes'}
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.9)', maxWidth: 620 }}>
                {t('schemesSub') || 'Explore central and state farmer schemes, subsidies, and scholarships'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="https://fruits.karnataka.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                  fontWeight: 600,
                  borderRadius: 12,
                  padding: '10px 16px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Sprout className="inline mr-1 text-emerald-500" size={16} /> FRUITS Karnataka ↗
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 12,
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fef08a' }}>{schemesImpactStats?.totalBeneficiaries || '12.8M+'}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Beneficiaries Covered</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fef08a' }}>{schemesImpactStats?.totalDisbursed || '₹18,400+ Cr'}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Funds Disbursed</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fef08a' }}>{schemesImpactStats?.solarPumpsInstalled || '85,000+'}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Solar Pumps Installed</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fef08a' }}>{schemesImpactStats?.activeFPOs || '1,240+'}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Active Agri FPOs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 8,
        marginBottom: 20,
        borderBottom: '1px solid var(--border-light)'
      }}>
        {[
          { id: 'directory', label: t('tabAllSchemes') || 'All Schemes' },
          { id: 'loans', label: t('tabLoansInsurance') || 'Loans & Insurance' },
          { id: 'advisory', label: t('tabAdvisoryKVK') || 'Advisory & KVK' },
          { id: 'stories', label: t('tabSuccessStories') || 'Success Stories' },
          { id: 'grievance', label: t('tabGrievanceFAQ') || 'Grievance & Help' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.25)' : 'none',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-light)'
            }}
          >
            {(() => {
              const tabIconMap = {
                directory: Landmark,
                loans: CreditCard,
                advisory: Sprout,
                stories: Star,
                grievance: Scale
              };
              const TabIcon = tabIconMap[tab.id] || MapPin;
              return (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <TabIcon size={14} />
                  <Trans k={tab.labelKey} />
                </span>
              );
            })()}
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: SCHEMES DIRECTORY WITH MULTI-DIMENSIONAL FILTERS */}
      {/* ============================================================ */}
      {activeTab === 'directory' && (
        <>
            {/* Search Input, Category & Government Level Filter */}
          <div className="card" style={{ padding: '18px 20px', marginBottom: 24, borderRadius: 16 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                <input
                  type="text"
                  placeholder={lang === 'kn' ? 'ಯೋಜನೆ ಅಥವಾ ಕೀವರ್ಡ್ ಹುಡುಕಿ...' : lang === 'hi' ? 'योजना खोजें...' : 'Search scheme by name, subsidy, or keyword...'}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: 10 }}
                />
                <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
              </div>

              <div style={{ minWidth: 160 }}>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="form-input"
                  style={{ width: '100%', padding: '9px 12px', fontSize: 13, borderRadius: 10 }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat === 'Scholarship' ? 'Scholarships' : cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  { id: 'All', label: t('filterLevelAll') || 'All Governments' },
                  { id: 'Central', label: t('filterLevelCentral') || 'Central' },
                  { id: 'State', label: t('filterLevelState') || 'Karnataka State' }
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setLevelFilter(lvl.id)}
                    className={`btn btn-sm ${levelFilter === lvl.id ? 'btn-primary' : 'btn-outline'}`}
                    style={{ borderRadius: 8, fontSize: 12 }}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Reset */}
            {(levelFilter !== 'All' || categoryFilter !== 'All' || searchQuery) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
                <span>Showing <strong>{filteredSchemes.length}</strong> matching schemes</span>
                <button
                  onClick={() => {
                    setLevelFilter('All')
                    setCategoryFilter('All')
                    setSearchQuery('')
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
                >
                  ↺ Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Scheme Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {filteredSchemes.map((s, idx) => (
              <div
                className="scheme-card animate-fadeInUp"
                key={s.id || idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <img
                    src={s.img || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'}
                    alt={getLangText(s.title)}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    display: 'flex',
                    gap: 6
                  }}>
                    {s.level && (
                      <span className="badge" style={{ background: s.level === 'Central' ? '#1e3a8a' : '#c2410c', color: '#fff', fontSize: 11 }}>
                        {s.level === 'Central' ? 'Central' : 'Karnataka'}
                      </span>
                    )}
                    {s.badge && (
                      <span className={`badge ${s.badgeClass || 'badge-success'}`} style={{ fontSize: 11 }}>
                        {getLangText(s.badge)}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>
                    {getLangText(s.ministry)}
                  </div>

                  <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {getLangText(s.title)}
                  </h4>

                  <p style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: 12
                  }}>
                    {getLangText(s.desc)}
                  </p>

                  {/* Highlights Pill Box */}
                  {s.benefits && (
                    <div style={{
                      background: 'var(--bg-main)',
                      padding: '8px 12px',
                      borderRadius: 10,
                      border: '1px solid var(--border-light)',
                      marginBottom: 14,
                      fontSize: 12
                    }}>
                      <div style={{ color: 'var(--primary-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span><IndianRupee className="inline mr-1 text-emerald-500" size={16} /> {s.benefits.subsidyPercent || s.benefits.maxLimit}</span>
                      </div>
                      {s.benefits.mode && (
                        <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 2 }}>
                          Mode: {s.benefits.mode}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <a
                      href={s.applyLink || 'https://sevasindhuservices.karnataka.gov.in/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', fontSize: 13 }}
                    >
                      {t('directApply') || 'Apply ↗'}
                    </a>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedScheme(s)}
                      style={{ fontSize: 13 }}
                    >
                      {t('learnMore') || 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: 44, display: 'block', marginBottom: 12 }}><Search className="inline mr-1 text-blue-500" size={16} /></span>
              <h3>No matching schemes found</h3>
              <p>Try resetting filters or searching with a different term.</p>
            </div>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* TAB 2: FINANCIAL ASSISTANCE, CROP LOANS & INSURANCE */}
      {/* ============================================================ */}
      {activeTab === 'loans' && (
        <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: '20px 24px', background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
              <CreditCard className="inline mr-1 text-indigo-500" size={16} /> Agricultural Credit, Kisan Credit Cards (KCC) &amp; Crop Insurance
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Transparent interest rates, scale of finance limits, moratorium periods, and claim guidelines for Karnataka farmers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {agriFinancialAssistance.map((fin, i) => (
              <div className="card" key={i} style={{ padding: 22, display: 'flex', flexDirection: 'column', border: '1.5px solid var(--border-light)' }}>
                {fin.img && (
                  <div style={{ height: 140, borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
                    <img
                      src={fin.img}
                      alt={getLangText(fin.title)}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span className="badge badge-primary">{fin.category}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{fin.interestRate}</span>
                </div>

                <h4 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
                  {getLangText(fin.title)}
                </h4>

                <div style={{ background: 'var(--bg-main)', padding: 12, borderRadius: 10, marginBottom: 14, fontSize: 13 }}>
                  <p style={{ margin: '0 0 4px 0' }}><strong>Limit / ಮೊತ್ತ:</strong> {fin.limit}</p>
                  <p style={{ margin: 0 }}><strong>Moratorium / ಮರುಪಾವತಿ:</strong> {fin.moratorium}</p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <h5 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Key Features:</h5>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {fin.features.map((feat, fIdx) => (
                      <li key={fIdx}>{getLangText(feat)}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
                    Partner Banks: {fin.bankPartners?.join(', ')}
                  </div>
                  <a
                    href={fin.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}
                  >
                    Apply on JanSamarth / Samrakshane ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: TECHNICAL ADVISORY & RSK/KVK DIRECTORY */}
      {/* ============================================================ */}
      {activeTab === 'advisory' && (
        <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              <Sprout className="inline mr-1 text-emerald-500" size={16} /> Agri-Advisory, Soil Testing &amp; KVK Training Centers
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
              Connect with 745+ Raitha Samparka Kendras (RSK), 33+ ICAR Krishi Vigyan Kendras, and 24x7 Weather Advisories across Karnataka.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {agriAdvisoryAndCenters.map((adv, idx) => (
              <div className="card" key={idx} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {adv.img && (
                  <div style={{ height: 140, borderRadius: 10, overflow: 'hidden', marginBottom: 4 }}>
                    <img
                      src={adv.img}
                      alt={getLangText(adv.title)}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}><Landmark className="inline mr-1 text-blue-500" size={16} /></span>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                    {getLangText(adv.title)}
                  </h4>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {getLangText(adv.desc)}
                </p>

                <div style={{ background: 'var(--bg-main)', padding: 10, borderRadius: 8, fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Phone className="inline mr-1 text-emerald-500" size={16} /> {adv.contact}
                </div>

                <a
                  href={adv.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ textDecoration: 'none', justifyContent: 'center', marginTop: 'auto' }}
                >
                  {getLangText(adv.actionText)} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: SUCCESS STORIES & IMPACT DATA */}
      {/* ============================================================ */}
      {activeTab === 'stories' && (
        <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              <Star className="inline mr-1 text-amber-500" size={16} /> Real Beneficiary Success Stories &amp; Ground Impact
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
              Inspiring real experiences of Karnataka farmers transforming their livelihoods with government schemes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {schemesSuccessStories.map(story => (
              <div className="card" key={story.id} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {story.bannerImage && (
                  <div style={{ height: 130, borderRadius: 10, overflow: 'hidden', marginBottom: 2 }}>
                    <img
                      src={story.bannerImage}
                      alt={story.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <img
                    src={story.image}
                    alt={story.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'; }}
                    style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', flexShrink: 0 }}
                  />
                  <div>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{story.name}</h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'var(--text-muted)' }}><MapPin className="inline mr-1 text-red-500" size={16} /> {story.village}</p>
                    <span className="badge badge-success" style={{ marginTop: 4, fontSize: 10 }}>{story.stat}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-main)', padding: '10px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--primary-dark)' }}>
                  <Sprout className="inline mr-1 text-emerald-500" size={16} /> {story.scheme}: {story.benefitReceived}
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                  “{getLangText(story.quote)}”
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: GRIEVANCE REDRESSAL & FAQS */}
      {/* ============================================================ */}
      {activeTab === 'grievance' && (
        <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Helpdesk Contacts */}
          <div className="card" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
              <Scale className="inline mr-1 text-blue-500" size={16} /> Official Grievance Portals &amp; 24x7 Helplines
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {grievanceHelpdesks.map((desk, idx) => (
                <div key={idx} style={{ background: 'var(--bg-main)', padding: 14, borderRadius: 12, border: '1px solid var(--border-light)' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 14, fontWeight: 700 }}>{desk.name}</h4>
                  <p style={{ margin: '0 0 4px 0', fontSize: 13, color: 'var(--primary)', fontWeight: 700 }}><Phone className="inline mr-1 text-emerald-500" size={16} /> {desk.tollFree}</p>
                  <p style={{ margin: '0 0 10px 0', fontSize: 11, color: 'var(--text-muted)' }}><Clock className="inline mr-1 text-slate-500" size={16} /> {desk.timings}</p>
                  <a
                    href={desk.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ textDecoration: 'none', display: 'inline-block', fontSize: 12 }}
                  >
                    File Grievance ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="card" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>
              <HelpCircle className="inline mr-1 text-blue-500" size={16} /> Frequently Asked Questions (FAQs)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {schemesFaqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    border: '1px solid var(--border-light)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'var(--bg-main)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{getLangText(faq.q)}</span>
                    <span style={{ fontSize: 18, color: 'var(--primary)', marginLeft: 8 }}>
                      {openFaq === fIdx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === fIdx && (
                    <div style={{ padding: '0 16px 14px 16px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {getLangText(faq.a)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DETAILED SCHEME VIEW MODAL */}
      {/* ============================================================ */}
      {selectedScheme && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: 16,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            className="card animate-fadeInUp"
            style={{
              maxWidth: 680,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px 28px',
              position: 'relative',
              borderRadius: 20
            }}
          >
            <button
              onClick={() => {
                if (isSpeaking) {
                  window.speechSynthesis.cancel()
                  setIsSpeaking(false)
                }
                setSelectedScheme(null)
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'var(--bg-main)',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                fontSize: 16,
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'var(--text-primary)'
              }}
            >
              <X className="inline" size={16} />
            </button>

            {/* Scheme Image Banner */}
            <div style={{ height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
              <img
                src={selectedScheme.img || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'}
                alt={getLangText(selectedScheme.title)}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Scheme Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="badge badge-primary">{selectedScheme.level || 'Central/State'}</span>
              <span className="badge badge-info">{selectedScheme.category}</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
              {getLangText(selectedScheme.title)}
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
              {getLangText(selectedScheme.ministry)}
            </p>

            {/* Accessibility Audio TTS Readout */}
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleToggleVoice(selectedScheme)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16, borderRadius: 8, fontSize: 12 }}
            >
              <Volume2 size={14} />
              {isSpeaking ? t('stopAudio') || 'Stop Audio' : t('voiceReadout') || 'Listen'}
            </button>

            {/* Section 1: Overview */}
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Description / ವಿವರಣೆ</h5>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {getLangText(selectedScheme.desc)}
              </p>
            </div>

            {/* Section 2: Benefit Details & Subsidy Structure */}
            {selectedScheme.benefits && (
              <div style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                padding: 16,
                borderRadius: 12,
                border: '1px solid #a7f3d0',
                marginBottom: 16
              }}>
                <h5 style={{ color: '#065f46', fontWeight: 800, fontSize: 14, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IndianRupee className="inline mr-1 text-emerald-500" size={16} /> {t('benefitDetails') || 'Benefit & Subsidy Structure'}
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, fontSize: 12, color: '#064e3b' }}>
                  <div><strong>Subsidy Percentage:</strong> {selectedScheme.benefits.subsidyPercent || 'N/A'}</div>
                  <div><strong>Maximum Limit:</strong> {selectedScheme.benefits.maxLimit || 'N/A'}</div>
                  <div><strong>Payment Mode:</strong> {selectedScheme.benefits.mode || 'DBT'}</div>
                  <div><strong>Interest Subvention:</strong> {selectedScheme.benefits.interestSubvention || 'N/A'}</div>
                </div>
              </div>
            )}

            {/* Section 3: Eligibility Criteria */}
            <div style={{ background: 'var(--bg-main)', padding: 14, borderRadius: 12, marginBottom: 14, border: '1px solid var(--border-light)' }}>
              <h5 style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', margin: '0 0 4px 0' }}>
                {t('eligibilityCriteria') || 'Eligibility Criteria'}
              </h5>
              <p style={{ fontSize: 13, margin: 0, color: 'var(--text-primary)' }}>
                {getLangText(selectedScheme.eligibility)}
              </p>
            </div>

            {/* Section 4: Exclusions */}
            {selectedScheme.exclusions && (
              <div style={{ background: '#fef2f2', padding: 14, borderRadius: 12, marginBottom: 14, border: '1px solid #fecaca' }}>
                <h5 style={{ fontWeight: 700, fontSize: 13, color: '#991b1b', margin: '0 0 4px 0' }}>
                  {t('exclusionsTitle') || 'Exclusions'}
                </h5>
                <p style={{ fontSize: 12, margin: 0, color: '#7f1d1d' }}>
                  {getLangText(selectedScheme.exclusions)}
                </p>
              </div>
            )}

            {/* Section 5: Required Documents */}
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                {t('requiredDocs') || 'Required Documents'}
              </h5>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                {getLangText(selectedScheme.documents)}
              </p>
            </div>

            {/* Section 6: Application Process & Steps */}
            {selectedScheme.processSteps && (
              <div style={{ marginBottom: 16 }}>
                <h5 style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
                  {t('stepByStepProcess') || 'Application Process'}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selectedScheme.processSteps.map(st => (
                    <div key={st.step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {st.step}
                      </span>
                      <div style={{ fontSize: 13 }}>
                        <strong>{getLangText(st.title)}: </strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{getLangText(st.desc)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 7: Timeline */}
            {selectedScheme.timeline && (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{t('expectedTimeline') || 'Processing Timeline'}: <strong>{selectedScheme.timeline}</strong></span>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={selectedScheme.applyLink || 'https://sevasindhuservices.karnataka.gov.in/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', fontWeight: 700 }}
              >
                {t('directApply') || 'Apply Online ↗'}
              </a>
              {selectedScheme.trackerUrl && (
                <a
                  href={selectedScheme.trackerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ textDecoration: 'none', justifyContent: 'center' }}
                >
                  Track Portal Status ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



export function MarketScreen() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('district') // 'district' or 'all'

  const userDistrict = window.localStorage.getItem('citizen_district') || 'Mysuru'

  const getCropLocalImage = (cropName) => {
    const english = cropName.split('(')[0].trim()
    if (english === 'Silk Cocoon') return '/crops/Silk_Cocoon.jpg'
    return cropImageMap[english] || `/crops/${english.replace(/\s+/g, '_')}.jpg`
  }

  // Unsplash image fallback URLs for crops that may not have local images
  const cropUnsplashFallback = {
    'Ragi': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    'Paddy': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80',
    'Chilli': 'https://images.unsplash.com/photo-1563399652-cf0cd2c6db66?w=800&q=80',
    'Cotton': 'https://images.unsplash.com/photo-1599419014917-9df3a24dcf82?w=800&q=80',
    'Coconut': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80',
    'Banana': 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800&q=80',
    'Bengal gram': 'https://images.unsplash.com/photo-1616179282965-f9edce48c5c0?w=800&q=80',
    'Cardamom': 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800&q=80',
    'Turmeric': 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&q=80',
    'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
    'Cashew': 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=800&q=80',
    'Lime': 'https://images.unsplash.com/photo-1587714371705-c893dd3bbecd?w=800&q=80',
    'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',
    'Dry chilli': 'https://images.unsplash.com/photo-1563399652-cf0cd2c6db66?w=800&q=80',
    'Green chilli': 'https://images.unsplash.com/photo-1588169770729-cb26b830ba50?w=800&q=80',
    'Mulberry': 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&q=80',
    'Pineapple': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80',
    'Sugarcane': 'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&q=80',
    'Black gram': 'https://images.unsplash.com/photo-1616179282965-f9edce48c5c0?w=800&q=80',
    'Finger millet': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    'Rice': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80',
    'Silk Cocoon': 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&q=80',
  }

  const normalizePriceRow = (p) => {
    const english = p.crop?.split('(')[0].trim() || p.crop
    const localImg = p.img || getCropLocalImage(p.crop)
    const fallbackImg = cropUnsplashFallback[english] || cropUnsplashFallback[p.crop] || '/crops/Maize.jpg'
    return {
      ...p,
      cropKey: p.crop,
      crop: formatCropLabel(p.crop),
      img: localImg,
      fallbackImg,
      unit: p.unit || cropMeta[p.crop]?.unit || 'per quintal',
      change: p.change || '-',
      trend: p.trend || 'stable',
    }
  }

  // District name aliases (handles spelling variants from login data)
  // normalizeDistrict is now at the top of the file

  // My District: 10 crops from PDF dataset | All Karnataka: famous state-wide crops
  const sourcePrices = viewMode === 'district'
    ? (districtPricesMap[normalizeDistrict(userDistrict)] || districtPricesMap['Mysuru'] || [])
    : karnatakaPopularCrops


  const filteredPrices = sourcePrices
    .map(normalizePriceRow)
    .filter(p =>
      p.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.market.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const highlightPrices = viewMode === 'all' ? karnatakaPopularCrops : sourcePrices

  const [landArea, setLandArea] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('')
  const [calcResult, setCalcResult] = useState(null)

  useEffect(() => {
    const rows = sourcePrices.map(normalizePriceRow)
    if (rows.length) setSelectedCrop(rows[0].crop)
  }, [viewMode, userDistrict])

  const calculateEstimate = (e) => {
    e.preventDefault()
    if (!landArea || isNaN(landArea)) return
    const priceEntry = filteredPrices.find(p => p.crop === selectedCrop)
    const rawPrice = priceEntry ? parseFloat(String(priceEntry.price).replace(/[₹,]/g, '')) : 3000
    const cropKey = priceEntry?.cropKey || selectedCrop.split('(')[0].trim()
    const yieldPerAcre = {
      'Ragi': 12, 'Arecanut': 8, 'Jowar': 15, 'Maize': 22, 'Sugarcane': 35,
      'Paddy': 18, 'Coffee': 6, 'Tomato': 80, 'Groundnut': 10, 'Tur': 8,
    }[cropKey] || 10
    const estYield = (parseFloat(landArea) * yieldPerAcre).toFixed(1)
    const estRevenue = Math.round(estYield * rawPrice)
    setCalcResult({ yield: estYield, revenue: estRevenue.toLocaleString('en-IN'), priceUsed: priceEntry?.price || '₹3,000' })
  }

  return (
    <div className="animate-fadeInUp">
      
      {/* Top Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 24 }}>
        {(() => {
          const best = highlightPrices.map(p => normalizePriceRow(p))
          const top = [...best].sort((a, b) => parseFloat(String(b.price).replace(/[₹,]/g, '')) - parseFloat(String(a.price).replace(/[₹,]/g, '')))[0]
          const gainers = [...best].filter(p => p.trend === 'up' && p.change && p.change !== '-')
          const topGainer = gainers.sort((a, b) =>
            parseFloat(String(b.change).replace(/[+₹,-]/g, '')) - parseFloat(String(a.change).replace(/[+₹,-]/g, ''))
          )[0] || top
          return (
            <>
              <div className="card" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#065f46', fontWeight: 600, marginBottom: 4 }}>Top Value Crop</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#064e3b' }}>{top?.crop?.split('(')[0].trim()} {top?.price}</div>
                  <div style={{ fontSize: 13, color: '#047857', marginTop: 4 }}>{top?.market}</div>
                </div>
                {top?.img && <img src={top.img} alt={top.crop} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid #6ee7b7', flexShrink: 0 }} onError={e => { e.target.src = '/crops/Maize.jpg' }}/>}
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#92400e', fontWeight: 600, marginBottom: 4 }}>Top Gainer</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#78350f' }}>{topGainer?.crop?.split('(')[0].trim()} {topGainer?.change}</div>
                  <div style={{ fontSize: 13, color: '#b45309', marginTop: 4 }}>{topGainer?.market}</div>
                </div>
                {topGainer?.img && <img src={topGainer.img} alt={topGainer.crop} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fcd34d', flexShrink: 0 }} onError={e => { e.target.src = '/crops/Maize.jpg' }}/>}
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 12, color: '#5b21b6', fontWeight: 600, marginBottom: 4 }}>Data Source</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#4c1d95' }}>
                  <ClipboardList className="inline mr-1 text-indigo-500" size={16} /> Karnataka APMC Price Sheet
                </div>
                <div style={{ fontSize: 11, color: '#6d28d9', marginTop: 4 }}>
                  31 districts × 10 crops · Modal prices · Aug 2026
                </div>
                <div style={{ fontSize: 11, color: '#6d28d9', marginTop: 2 }}>
                  {viewMode === 'district' ? `Showing: ${userDistrict} district crops` : 'Showing: Famous Karnataka crops'}
                </div>
              </div>
            </>
          )
        })()}
      </div>

      {/* Estimator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--primary)' }}><Calculator className="inline mr-1 text-blue-500" size={16} /> Crop Yield & Income Estimator</h4>
          <form onSubmit={calculateEstimate} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 150 }}>
              <label className="form-label" style={{ fontSize: 12 }}>Land Size (Acres) / ಜಮೀನು (ಎಕರೆ)</label>
              <input 
                type="number" 
                step="0.1" 
                className="form-input" 
                placeholder="e.g. 2.5" 
                value={landArea}
                onChange={e => setLandArea(e.target.value)}
                required 
              />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 180 }}>
              <label className="form-label" style={{ fontSize: 12 }}>Select Crop / ಬೆಳೆ ಆಯ್ಕೆ</label>
              <select 
                className="form-input custom-select"
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
              >
                {filteredPrices.map(p => <option key={p.crop} value={p.crop}>{p.crop}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ height: 44 }}>Estimate / ಲೆಕ್ಕಾಚಾರ</button>
          </form>

          {calcResult && (
            <div style={{ marginTop: 16, padding: 14, background: 'var(--primary-glow)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Estimated Harvest Yield:</span>
                <p style={{ fontSize: 16, fontWeight: 700 }}>{calcResult.yield} Quintals/Tonnes</p>
              </div>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Approx. APMC Value (at {calcResult.priceUsed}/unit):</span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary-dark)' }}>₹{calcResult.revenue}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid View */}
      <div className="card" style={{ padding: '20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
            {viewMode === 'district' ? `${normalizeDistrict(userDistrict)} District Crops` : 'Famous Karnataka Crops'}
          </div>
          
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-card-alt)', borderRadius: 'var(--radius-md)', padding: 4, border: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setViewMode('district')}
              style={{
                padding: '8px 16px', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s',
                background: viewMode === 'district' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'district' ? '#fff' : 'var(--text-secondary)',
                boxShadow: viewMode === 'district' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              My District ({normalizeDistrict(userDistrict)})
            </button>
            <button
              onClick={() => setViewMode('all')}
              style={{
                padding: '8px 16px', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s',
                background: viewMode === 'all' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'all' ? '#fff' : 'var(--text-secondary)',
                boxShadow: viewMode === 'all' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              All Karnataka Crops
            </button>
          </div>

          <input 
            type="text" 
            className="form-input" 
            placeholder="Search crop or APMC..." 
            style={{ maxWidth: 260, padding: '8px 14px', fontSize: 14 }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CROP GRID */}
        {filteredPrices.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            <IndianRupee size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p style={{ fontWeight: 600 }}>No crops found for the selected view.</p>
            {viewMode === 'district' && <p style={{ fontSize: 13, marginTop: 4 }}>Try switching to "All Karnataka Crops" or double-check your district mapping.</p>}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20
          }}>
            {filteredPrices.map((p, i) => (
              <div key={`${p.cropKey || p.crop}-${i}`} style={{
                background: 'var(--bg-card-alt)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                {/* Large Crop Image */}
                <div style={{ width: '100%', height: 185, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={p.img}
                    alt={p.crop}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                    onError={e => {
                      if (e.target.dataset.fallbackTried) return
                      e.target.dataset.fallbackTried = '1'
                      e.target.src = p.fallbackImg || cropImageMap[p.cropKey] || 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80'
                    }}
                  />
                  {/* Price badge overlaid on image */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    padding: '20px 12px 10px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
                  }}>
                    <div style={{ color: '#fff', fontSize: 18, fontWeight: 800, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      {p.price}
                    </div>
                    <div style={{
                      background: p.trend === 'up' ? 'rgba(6, 95, 70, 0.92)' : p.trend === 'down' ? 'rgba(153, 27, 27, 0.92)' : 'rgba(75, 85, 99, 0.85)',
                      color: '#fff', padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: 3, backdropFilter: 'blur(4px)'
                    }}>
                      {p.trend === 'up' ? <ArrowUp size={11}/> : p.trend === 'down' ? <ArrowDown size={11}/> : <Minus size={11}/>}
                      {p.change}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <h3 style={{ margin: '0 0 3px 0', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{p.crop}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} style={{ opacity: 0.7, flexShrink: 0 }} /> 
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.market}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Modal Price</div>
                      <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--primary-dark)' }}>{p.price}</div>
                      {p.min && p.max && (
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                          {p.min} – {p.max}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, paddingBottom: 4 }}>
                        {p.unit}
                      </div>
                      {p.status && (
                        <div style={{
                          fontSize: 10, fontWeight: 700,
                          color: p.status === 'ACTUAL' ? '#059669' : '#6b7280',
                          background: p.status === 'ACTUAL' ? '#f0fdf4' : '#f9fafb',
                          border: `1px solid ${p.status === 'ACTUAL' ? '#bbf7d0' : '#e5e7eb'}`,
                          borderRadius: 6, padding: '2px 6px'
                        }}>
                          {p.status === 'ACTUAL' ? '<Check className="inline mr-1 text-emerald-500" size={16} /> Verified' : '~ Estimated'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


export function AnnouncementsScreen() {
  const { t, lang } = useLanguage()
  const filters = ['filterAll', 'filterUrgent', 'filterAgriculture', 'filterGovt']
  const [active, setActiveF] = useState('filterAll')
  const [selectedAnnounce, setSelectedAnnounce] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [phoneSub, setPhoneSub] = useState('')
  const [announcements, setAnnouncements] = useState(kaAnnouncements)

  // Fetch live announcements from Firestore, fall back to static
  useEffect(() => {
    const sDistrict = window.localStorage.getItem('citizen_district') || 'Mysuru'
    const sTaluk = window.localStorage.getItem('citizen_taluk') || 'Mysuru Taluk'
    
    getDocs(collection(db, 'announcements'))
      .then(snap => {
        if (!snap.empty) {
          const fetched = snap.docs.map(d => {
            const data = d.data()
            return {
              id: d.id,
              category: data.category?.split(' /')[0] || 'Government',
              urgent: data.priority === 'Urgent' || data.priority === 'Emergency / ತುರ್ತು',
              date: data.createdAt ? new Date(data.createdAt.toMillis()).toLocaleDateString() : 'Just now',
              title: { en: data.title, kn: data.title },
              desc: { en: data.message, kn: data.message },
              img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80',
              target: data.target,
              taluk: data.taluk,
              gp: data.gp
            }
          })
          
          const sGp = window.localStorage.getItem('citizen_gp') || ''
          const relevant = fetched.filter(a => {
            if (a.target === 'All Villages' || a.target === 'All Districts') return true
            if (a.target.includes(sDistrict) || a.target.includes(sTaluk)) return true
            // Announcement scoped to a specific taluk/gp from an official
            if (a.taluk) {
              if (a.taluk !== sTaluk) return false
              if (a.gp && sGp && a.gp !== sGp) return false
              return true
            }
            return false
          })
          
          setAnnouncements([...relevant, ...kaAnnouncements])
        }
      })
      .catch(() => {})
  }, [])

  const getFilteredAnnouncements = () => {
    if (active === 'filterUrgent') return announcements.filter(a => a.urgent)
    if (active === 'filterAgriculture') return announcements.filter(a => a.category === 'Agriculture')
    if (active === 'filterGovt') return announcements.filter(a => a.category === 'Government')
    return announcements
  }

  const handleSubscribeSubmit = (e) => {
    e.preventDefault()
    if (phoneSub.length === 10) {
      setIsSubscribed(true)
    }
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              className={`btn btn-sm ${active === f ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveF(f)}
            >
              {t(f)}
            </button>
          ))}
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={() => setSelectedAnnounce({ id: 'subscribe-widget' })}
        >
          <Bell className="inline mr-1 text-amber-500" size={16} /> Subscribe to SMS Alerts
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {getFilteredAnnouncements().map((a, i) => (
          <div className="announcement-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
            <div className="announcement-card-img">
              <img src={a.img} alt="" />
              <div className="announcement-card-img-overlay" />
            </div>
            <div className="announcement-card-body" style={{ flexGrow: 1 }}>
              <div className="meta">
                {a.urgent && <span className="badge badge-danger" style={{ fontSize: 10 }}>{t('urgent')}</span>}
                <span className="badge badge-primary" style={{ fontSize: 10 }}>{a.category}</span>
                <span>{a.date}</span>
              </div>
              <h4>{a.title[lang] || a.title.en}</h4>
              <p style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc[lang] || a.desc.en}</p>
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-light)' }}>
              <button 
                className="btn btn-sm btn-outline w-full" 
                style={{ justifyContent: 'center' }}
                onClick={() => setSelectedAnnounce(a)}
              >
                {t('readMore')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAnnounce && selectedAnnounce.id !== 'subscribe-widget' && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 500, width: '100%', padding: 24, position: 'relative' }}>
            <button 
              onClick={() => setSelectedAnnounce(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >
              <X className="inline" size={16} />
            </button>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              {selectedAnnounce.urgent && <span className="badge badge-danger">{t('urgent')}</span>}
              <span className="badge badge-primary">{selectedAnnounce.category}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selectedAnnounce.date}</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{selectedAnnounce.title[lang] || selectedAnnounce.title.en}</h3>
            <img src={selectedAnnounce.img} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>{selectedAnnounce.desc[lang] || selectedAnnounce.desc.en}</p>
            <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => setSelectedAnnounce(null)}>Close</button>
          </div>
        </div>
      )}

      {selectedAnnounce && selectedAnnounce.id === 'subscribe-widget' && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 420, width: '100%', padding: 24, position: 'relative' }}>
            <button 
              onClick={() => setSelectedAnnounce(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >
              <X className="inline" size={16} />
            </button>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}><Bell className="inline mr-1 text-amber-500" size={16} /> Get Local Alerts via SMS</h3>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribeSubmit} className="login-form">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  Receive instant announcements regarding MSP crop procurement rates, Gram Panchayat meetings and weather warnings.
                </p>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Mobile Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="9876543210" 
                    value={phoneSub}
                    onChange={e => setPhoneSub(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Subscribe
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: 48 }}><CheckCircle2 className="inline mr-1 text-emerald-500" size={16} /></span>
                <h4 style={{ fontWeight: 700, marginTop: 8 }}>Subscribed Successfully!</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>You will now receive village alerts on +91 {phoneSub}</p>
                <button className="btn btn-outline w-full" style={{ marginTop: 20, justifyContent: 'center' }} onClick={() => { setSelectedAnnounce(null); setIsSubscribed(false); setPhoneSub(''); }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function ComplaintScreen() {
  const { t, lang } = useLanguage()
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [newComplaintId, setNewComplaintId] = useState('')

  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [taluk, setTaluk] = useState('Mysuru Taluk')
  const [photoUri, setPhotoUri] = useState(null)
  const [userName, setUserName] = useState('')
  const [userDistrict, setUserDistrict] = useState('Mysuru')

  // Camera states
  const [cameraMode, setCameraMode] = useState('idle') // idle | requesting | live | captured | denied | unsupported | file
  const [cameraError, setCameraError] = useState('')
  const videoRef = React.useRef(null)
  const canvasRef = React.useRef(null)
  const streamRef = React.useRef(null)

  useEffect(() => {
    const sName = window.localStorage.getItem('citizen_name')
    const sDist = window.localStorage.getItem('citizen_district')
    const sTaluk = window.localStorage.getItem('citizen_taluk')
    if (sName) setUserName(sName)
    if (sDist) setUserDistrict(sDist)
    if (sTaluk) { setTaluk(sTaluk); setLocation(sTaluk.replace(' Taluk', '') + ' Village') }
    return () => stopCamera()
  }, [])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }

  const openCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraMode('unsupported')
      return
    }
    setCameraMode('requesting')
    setCameraError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      streamRef.current = stream
      setCameraMode('live')
      // Attach stream to video element after render
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      }, 100)
    } catch (err) {
      stopCamera()
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraMode('denied')
        setCameraError('Camera permission was denied. Please allow camera access in your browser settings and try again.')
      } else if (err.name === 'NotFoundError') {
        setCameraMode('unsupported')
        setCameraError('No camera found on this device. Use file upload instead.')
      } else {
        setCameraMode('unsupported')
        setCameraError('Could not open camera: ' + err.message)
      }
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    setPhotoUri(dataUrl)
    stopCamera()
    setCameraMode('captured')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB allowed.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoUri(ev.target.result)
      setCameraMode('captured')
    }
    reader.readAsDataURL(file)
  }

  const retakePhoto = () => {
    setPhotoUri(null)
    stopCamera()
    setCameraMode('idle')
  }

  const handleComplaintSubmit = async (e) => {
    e.preventDefault()
    if (!selected || !subject || !description) return

    const randomId = 'GS-KA-0' + Math.floor(500 + Math.random() * 500)
    const newComplaintObj = {
      id: randomId,
      title: `${subject} — ${location}`,
      status: 'pending',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: selected,
      assignedTo: `Taluk Office, ${taluk}`,
      lastUpdate: 'Assigned to nodal officer',
      submittedBy: userName || 'Anonymous',
      district: userDistrict,
      taluk,
      gp: window.localStorage.getItem('citizen_gp') || '',
      createdAt: serverTimestamp()
    }

    // Save to Firestore (skip photo as it's base64 and too large)
    try {
      await addDoc(collection(db, 'complaints'), { ...newComplaintObj, photo: null })
    } catch (err) {
      console.warn('Firestore write failed, saving locally:', err)
    }

    // Also update local state
    globalComplaints = [{ ...newComplaintObj, photo: photoUri }, ...globalComplaints]
    notifyComplaintListeners()
    stopCamera()
    setNewComplaintId(randomId)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelected(''); setSubject(''); setDescription('')
    setPhotoUri(null); stopCamera(); setCameraMode('idle'); setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}><CheckCircle2 className="inline mr-1 text-emerald-500" size={16} /></div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t('complaintSubmitted')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
          {t('complaintId')}: <strong>{newComplaintId}</strong>
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 420, marginBottom: 24 }}>
          {t('complaintMsg')}
        </p>
        <button className="btn btn-primary" onClick={handleReset}>{t('fileAnother')}</button>
      </div>
    )
  }

  return (
    <div className="animate-fadeInUp">
      <div className="complaint-form">
        {/* Step 1: Category */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('step1')}</h3>
          <div className="complaint-category-grid">
            {kaComplaintCategories.map(([IconComp, labels]) => {
              const label = labels[lang] || labels.en
              return (
                <button
                  type="button"
                  key={label}
                  className={`complaint-category-btn ${selected === label ? 'selected' : ''}`}
                  onClick={() => setSelected(label)}
                >
                  <IconComp size={20} strokeWidth={1.8} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: Details form */}
        {selected && (
          <form className="card animate-fadeInUp" style={{ marginBottom: 20 }} onSubmit={handleComplaintSubmit}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('step2')}</h3>
            <div className="login-form" style={{ gap: 16 }}>

              {/* Auto-filled from login */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Applicant Name / ಅರ್ಜಿದಾರರ ಹೆಸರು</label>
                  <input className="form-input" value={userName || 'Enter your name'} readOnly style={{ background: 'var(--bg-main)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">District / ಜಿಲ್ಲೆ</label>
                  <input className="form-input" value={userDistrict} readOnly style={{ background: 'var(--bg-main)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('complaintSubject')} / ವಿಷಯ *</label>
                <input
                  className="form-input"
                  placeholder={`Describe your ${selected} issue briefly`}
                  value={subject} onChange={e => setSubject(e.target.value)} required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('complaintDesc')} / ವಿವರಣೆ *</label>
                <textarea
                  className="form-input" rows={4}
                  placeholder="ವಿಸ್ತೃತ ವಿವರಣೆ / Detailed description..."
                  style={{ resize: 'vertical' }}
                  value={description} onChange={e => setDescription(e.target.value)} required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">{t('complaintLocation')} / ಸ್ಥಳ</label>
                  <input className="form-input" placeholder="ಉದಾ: ವಾರ್ಡ್ 3"
                    value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">ತಾಲೂಕು / Taluk</label>
                  <input className="form-input" value={taluk} readOnly style={{ background: 'var(--bg-main)' }} />
                </div>
              </div>

              {/* ── REAL CAMERA SECTION ── */}
              <div className="form-group">
                <label className="form-label">
                  <Camera className="inline mr-1 text-blue-500" size={16} /> {t('attachPhoto')} / ಫೋಟೋ ತೆಗೆಯಿರಿ
                  <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>(Optional)</span>
                </label>

                {/* Guide steps */}
                {cameraMode === 'idle' && (
                  <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {/* Guide banner */}
                    <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', padding: '14px 18px', borderBottom: '1px solid #bbf7d0' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#15803d', marginBottom: 6 }}><ClipboardList className="inline mr-1 text-indigo-500" size={16} /> How to take a complaint photo / ಫೋಟೋ ಹೇಗೆ ತೆಗೆಯಬೇಕು:</p>
                      <ol style={{ fontSize: 12, color: '#166534', paddingLeft: 18, margin: 0, lineHeight: 2 }}>
                        <li>Click <strong>"Open Camera"</strong> — allow camera permission when browser asks</li>
                        <li>Point your camera at the <strong>problem area</strong> clearly</li>
                        <li>Click the <strong><Camera className="inline mr-1 text-blue-500" size={16} /> Capture</strong> button to take the photo</li>
                        <li>Review the photo — retake if needed</li>
                      </ol>
                    </div>
                    <div style={{ padding: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}
                        onClick={openCamera}
                      >
                        <Camera size={16} strokeWidth={2} style={{ marginRight: 6 }} />
                        Open Camera / ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ
                      </button>
                      <label
                        style={{
                          flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 6, padding: '10px 16px', border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 14,
                          fontWeight: 600, color: 'var(--text-secondary)', background: '#fff', transition: 'all 0.2s'
                        }}
                      >
                        <Folder className="inline mr-1 text-blue-500" size={16} /> Upload File
                        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                )}

                {/* Requesting permission */}
                {cameraMode === 'requesting' && (
                  <div style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'center', background: 'var(--primary-glow)' }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}><Radio className="inline mr-1 text-amber-500" size={16} /></div>
                    <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14 }}>Requesting camera permission...</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                      <Hand className="inline mr-1 text-amber-500" size={16} /> Your browser will ask for camera access — click <strong>"Allow"</strong> to continue
                    </p>
                  </div>
                )}

                {/* Live camera preview */}
                {cameraMode === 'live' && (
                  <div style={{ border: '2px solid var(--primary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000' }}>
                    <div style={{ background: '#111', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444', animation: 'pulse 1.5s ease infinite' }} />
                      <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Camera Live — Point at problem area</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginLeft: 'auto' }}>ಸಮಸ್ಯೆ ಇರುವ ಸ್ಥಳಕ್ಕೆ ಕ್ಯಾಮೆರಾ ತೋರಿಸಿ</span>
                    </div>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: '100%', maxHeight: 320, display: 'block', objectFit: 'cover' }}
                    />
                    <div style={{ background: '#111', padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ flex: 1, justifyContent: 'center', maxWidth: 200 }}
                        onClick={capturePhoto}
                      >
                        <Camera className="inline mr-1 text-blue-500" size={16} /> Capture Photo / ಚಿತ್ರ ತೆಗೆಯಿರಿ
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                        onClick={retakePhoto}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />

                {/* Photo captured */}
                {cameraMode === 'captured' && photoUri && (
                  <div style={{ border: '2px solid var(--success)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <div style={{ background: '#f0fdf4', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #bbf7d0' }}>
                      <span style={{ color: '#15803d', fontWeight: 700, fontSize: 13 }}><CheckCircle2 className="inline mr-1 text-emerald-500" size={16} /> Photo Captured Successfully!</span>
                      <button type="button" onClick={retakePhoto} style={{ marginLeft: 'auto', color: 'var(--primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none' }}>
                        <RefreshCw className="inline mr-1 text-blue-500" size={16} /> Retake / ಮತ್ತೆ ತೆಗೆಯಿರಿ
                      </button>
                    </div>
                    <img src={photoUri} alt="Complaint evidence" style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '10px 14px', background: '#f9fafb', fontSize: 12, color: 'var(--text-muted)' }}>
                      <Pin className="inline mr-1 text-red-500" size={16} /> This photo will be attached to your complaint as evidence
                    </div>
                  </div>
                )}

                {/* Permission denied */}
                {(cameraMode === 'denied' || cameraMode === 'unsupported') && (
                  <div style={{ border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: 16, background: '#fff5f5' }}>
                    <p style={{ color: '#dc2626', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
                      {cameraMode === 'denied' ? '<Ban className="inline mr-1 text-red-500" size={16} /> Camera Permission Denied' : '<PhoneOff className="inline mr-1 text-red-500" size={16} /> Camera Not Available'}
                    </p>
                    <p style={{ color: '#7f1d1d', fontSize: 13, marginBottom: 14 }}>{cameraError}</p>
                    {cameraMode === 'denied' && (
                      <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#374151' }}>
                        <strong>How to allow camera in Chrome:</strong><br />
                        1. Click the <Lock className="inline mr-1 text-red-500" size={16} /> lock icon in the browser address bar<br />
                        2. Find "Camera" → select "Allow"<br />
                        3. Refresh the page and try again
                      </div>
                    )}
                    <label style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '10px 18px', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 14,
                      fontWeight: 600, background: '#fff', color: 'var(--primary)'
                    }}>
                      <Folder className="inline mr-1 text-blue-500" size={16} /> Upload Photo Instead
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                )}
              </div>

              <div className="otp-hint">{t('escalationNote')}</div>
              <button type="submit" className="btn btn-primary" style={{ padding: '14px 24px', justifyContent: 'center' }}>
                {t('submitComplaint')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export function ComplaintStatusScreen() {
  const { t } = useLanguage()
  const [complaints, setComplaints] = useState([...globalComplaints])
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Listen to Firestore complaints in real-time
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const firestoreComplaints = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        // Merge with local (local ones have photos which are not stored in Firestore)
        const localIds = new Set(firestoreComplaints.map(c => c.id))
        const localOnly = globalComplaints.filter(c => !localIds.has(c.id))
        setComplaints([...localOnly, ...firestoreComplaints])
      }
    }, () => {
      // On error, just show local complaints
      setComplaints([...globalComplaints])
    })

    // Also listen to local updates
    window.onComplaintsUpdated = (updatedList) => {
      setComplaints(prev => {
        const fsIds = new Set(prev.filter(c => c.createdAt).map(c => c.id))
        const newLocal = updatedList.filter(c => !fsIds.has(c.id))
        return [...newLocal, ...prev.filter(c => c.createdAt)]
      })
    }

    return () => {
      unsubscribe()
      window.onComplaintsUpdated = null
    }
  }, [])

  const myTaluk = window.localStorage.getItem('citizen_taluk') || ''
  const filteredComplaints = complaints.filter(c => {
    const searchMatch = c.title?.toLowerCase().includes(search.toLowerCase()) ||
                        c.id?.toLowerCase().includes(search.toLowerCase()) ||
                        c.category?.toLowerCase().includes(search.toLowerCase())
    // Only show complaints from the same taluk as the logged-in villager
    const talukMatch = myTaluk ? (c.taluk === myTaluk) : true
    return searchMatch && talukMatch
  })

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 20 }}>
        <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
          <span><Search className="inline mr-1 text-blue-500" size={16} /></span>
          <input 
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 15 }} 
            placeholder={t('searchComplaint')} 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredComplaints.map((c, i) => {
          const hasResponse = c.responses && c.responses.length > 0
          const lastResp = hasResponse ? c.responses[c.responses.length - 1] : null
          const isEscalated = c.status === 'escalated' || (c.escalationLevel && c.escalationLevel > 0)

          return (
            <div className="complaint-status-card animate-fadeInUp" key={i}
              style={{
                animationDelay: `${i * 0.1}s`,
                borderLeft: `4px solid ${
                  c.status === 'resolved' ? '#10b981'
                  : isEscalated ? '#f59e0b'
                  : c.status === 'inprogress' ? '#3b82f6'
                  : '#e5e7eb'
                }`,
                padding: '14px 16px'
              }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}><Ticket className="inline mr-1 text-pink-500" size={16} /> {c.id}</span>
                    <span className={`badge ${
                      c.status === 'resolved' ? 'badge-success'
                      : isEscalated ? 'badge-warning'
                      : c.status === 'inprogress' ? 'badge-info'
                      : 'badge-warning'}`} style={{ fontSize: 10 }}>
                      {c.status === 'resolved' ? '<CheckCircle2 className="inline mr-1 text-emerald-500" size={16} /> ' + t('resolved')
                        : isEscalated ? '<ArrowUp className="inline mr-1 text-emerald-500" size={16} /> Escalated'
                        : c.status === 'inprogress' ? '<RefreshCw className="inline mr-1 text-blue-500" size={16} /> ' + t('inProgress')
                        : '<Hourglass className="inline mr-1 text-amber-500" size={16} /> ' + t('pending')}
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{c.title}</h4>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span><Folder className="inline mr-1 text-blue-500" size={16} /> {c.category}</span>
                    <span><Calendar className="inline mr-1 text-blue-500" size={16} /> {c.date}</span>
                    <span><Landmark className="inline mr-1 text-blue-500" size={16} /> {c.assignedTo}</span>
                  </div>
                </div>
              </div>

              {/* Escalation notice */}
              {isEscalated && (
                <div style={{
                  marginTop: 10, padding: '8px 12px', borderRadius: 8,
                  background: '#fef3c7', border: '1px solid #fcd34d',
                  fontSize: 12, color: '#92400e', display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span style={{ fontSize: 16 }}><ArrowUp className="inline mr-1 text-emerald-500" size={16} /></span>
                  <div>
                    <strong>Complaint Escalated</strong>
                    <p style={{ margin: 0 }}>
                      This complaint was not resolved within 7 days by the Gram Panchayat PDO and has been escalated to a higher officer as per Karnataka RDPR norms.
                    </p>
                  </div>
                </div>
              )}

              {/* Official response thread */}
              {hasResponse ? (
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--border-light)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
                    <ClipboardList className="inline mr-1 text-indigo-500" size={16} /> Official Responses ({c.responses.length})
                  </div>
                  {c.responses.map((r, ri) => (
                    <div key={ri} style={{
                      background: 'var(--bg-main)', borderRadius: 10, padding: '10px 14px',
                      marginBottom: 8, fontSize: 12,
                      borderLeft: `3px solid ${r.status === 'resolved' ? '#10b981' : r.status === 'escalated' ? '#f59e0b' : '#3b82f6'}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 13 }}><ShieldAlert className="inline mr-1 text-blue-500" size={16} /></span>
                          <strong style={{ fontSize: 12 }}>{r.respondedBy}</strong>
                          {r.role && <span style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '1px 6px', borderRadius: 4 }}>{r.role}</span>}
                        </div>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{new Date(r.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <p style={{ margin: '0 0 4px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{r.message}</p>
                      {r.etaDays && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#2563eb', background: '#dbeafe', padding: '2px 8px', borderRadius: 6 }}>
                          ⏱️ Expected in {r.etaDays} day{r.etaDays > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {c.lastUpdate || 'Awaiting official response...'}
                </div>
              )}
            </div>
          )
        })}
        {filteredComplaints.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
            No complaints found.
          </div>
        )}
      </div>
    </div>
  )
}

export function ProfileScreen() {
  const { t, lang } = useLanguage()
  const [userName, setUserName] = useState('')
  const [userDistrict, setUserDistrict] = useState('')
  const [userTaluk, setUserTaluk] = useState('')
  const [userGp, setUserGp] = useState('')
  const [userVillage, setUserVillage] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editDistrict, setEditDistrict] = useState('')
  const [editTaluk, setEditTaluk] = useState('')
  const [editGp, setEditGp] = useState('')
  const [editVillage, setEditVillage] = useState('')
  const [editPhone, setEditPhone] = useState('')

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
    { name: 'Tumakuru', taluks: ['Chiknayakanhalli', 'Gubbi', 'Koratagere', 'Kunigal', 'Madhugiri', 'Pavagada', 'Sira', 'Tiptur', 'Tumakuru', 'Turuvekere'] },
    { name: 'Udupi', taluks: ['Karkala', 'Kundapur', 'Udupi'] },
    { name: 'Uttara Kannada', taluks: ['Ankola', 'Bhatkal', 'Dandeli', 'Haliyal', 'Honavar', 'Joida', 'Karwar', 'Kumta', 'Mundgod', 'Siddapur', 'Yellapur'] },
    { name: 'Vijayapura', taluks: ['Basavana Bagewadi', 'Indi', 'Muddebihal', 'Sindagi', 'Vijayapura'] },
    { name: 'Vijayanagara', taluks: ['Harapanahalli', 'Hoovina Hadagali', 'Hospet', 'Hagari Bommanahalli', 'Kotturu', 'Kudligi'] },
    { name: 'Yadgir', taluks: ['Shahapur', 'Shorapur', 'Yadgir'] },
  ]

  const handleDistrictChange = (distName) => {
    setEditDistrict(distName)
    const found = districtsOfKarnataka.find(d => d.name === distName)
    if (found && found.taluks.length > 0) {
      setEditTaluk(found.taluks[0])
    }
  }

  useEffect(() => {
    const sName = window.localStorage.getItem('citizen_name')
    const sDist = window.localStorage.getItem('citizen_district')
    const sTaluk = window.localStorage.getItem('citizen_taluk')
    const sGp = window.localStorage.getItem('citizen_gp')
    const sVillage = window.localStorage.getItem('citizen_village')
    const sPhone = window.localStorage.getItem('citizen_phone')

    if (sName) setUserName(sName)
    if (sDist) setUserDistrict(sDist)
    if (sTaluk) setUserTaluk(sTaluk)
    if (sGp) setUserGp(sGp)
    if (sVillage) setUserVillage(sVillage)
    if (sPhone) setUserPhone(sPhone.startsWith('+91') ? sPhone : '+91 ' + sPhone.slice(0, 5) + ' ' + sPhone.slice(5))
  }, [])

  const startEditing = () => {
    setEditName(userName)
    setEditDistrict(userDistrict)
    setEditTaluk(userTaluk)
    setEditGp(userGp)
    setEditVillage(userVillage)
    setEditPhone(userPhone.replace('+91 ', '').replace(/\s+/g, ''))
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    
    window.localStorage.setItem('citizen_name', editName)
    window.localStorage.setItem('citizen_district', editDistrict)
    window.localStorage.setItem('citizen_taluk', editTaluk)
    window.localStorage.setItem('citizen_gp', editGp)
    window.localStorage.setItem('citizen_village', editVillage)
    window.localStorage.setItem('citizen_phone', editPhone)

    setUserName(editName)
    setUserDistrict(editDistrict)
    setUserTaluk(editTaluk)
    setUserGp(editGp)
    setUserVillage(editVillage)
    setUserPhone('+91 ' + editPhone.slice(0, 5) + ' ' + editPhone.slice(5))

    setIsEditing(false)

    window.dispatchEvent(new Event('profileUpdate'))
  }

  if (isEditing) {
    const activeDistrictObj = districtsOfKarnataka.find(d => d.name === editDistrict) || districtsOfKarnataka[0]
    return (
      <form onSubmit={handleSave} className="animate-fadeInUp card" style={{ maxWidth: 650, margin: '0 auto', padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--primary)' }}><Edit3 className="inline mr-1 text-blue-500" size={16} /> Edit Profile Details</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Name / ಪೂರ್ಣ ಹೆಸರು</label>
            <input 
              type="text" 
              className="form-input" 
              value={editName} 
              onChange={e => setEditName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-input" style={{ width: 60, flexShrink: 0 }} value="+91" readOnly />
              <input 
                type="tel" 
                className="form-input" 
                value={editPhone} 
                onChange={e => setEditPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                required 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">District / ಜಿಲ್ಲೆ</label>
            <select 
              className="form-input" 
              value={editDistrict} 
              onChange={e => handleDistrictChange(e.target.value)} 
              required
            >
              {districtsOfKarnataka.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Taluk / ತಾಲೂಕು</label>
            <select 
              className="form-input" 
              value={editTaluk} 
              onChange={e => setEditTaluk(e.target.value)} 
              required
            >
              {activeDistrictObj.taluks.map(tOption => (
                <option key={tOption} value={tOption}>{tOption}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Gram Panchayat / ಗ್ರಾಮ ಪಂಚಾಯತಿ</label>
            <input 
              type="text" 
              className="form-input" 
              value={editGp} 
              onChange={e => setEditGp(e.target.value)} 
              placeholder="Your Gram Panchayat"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Village / ಹಳ್ಳಿ</label>
            <input 
              type="text" 
              className="form-input" 
              value={editVillage} 
              onChange={e => setEditVillage(e.target.value)} 
              placeholder="Your Village"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    )
  }

  return (
    <div className="animate-fadeInUp">
      <div className="content-grid">
        <div>
          <div className="card" style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff', margin: '0 auto 16px', fontWeight: 700 }}>
              {userName.charAt(0) || '?'}
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>{userName || 'Villager'}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>{userVillage}{userVillage && userGp ? ', ' : ''}{userGp && `${userGp} GP`}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 2 }}>{userTaluk}{userTaluk && ', '}{userDistrict}{userDistrict && ', Karnataka'}</p>
            <button className="btn btn-outline" onClick={startEditing} style={{ marginTop: 16 }}><Edit3 className="inline mr-1 text-blue-500" size={16} /> {t('edit')}</button>
          </div>
          <div className="card">
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('personalDetails')}</h4>
            {[
              [Phone,     t('mobile'),                    userPhone || '—'],
              [Home,      'Village / ಹಳ್ಳಿ',              userVillage || '—'],
              [Building2, 'Gram Panchayat / ಗ್ರಾ.ಪಂ.',     userGp || '—'],
              [Map,       t('taluk'),                     userTaluk || '—'],
              [Building2, t('district'),                  userDistrict ? userDistrict + ', Karnataka' : '—'],
            ].map(([Icon, label, val]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={17} strokeWidth={1.8} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('activeSchemesList')}</h4>
            {[
              { name: 'PM Kisan Samman Nidhi', status: 'Active', next: 'Next instalment: Dec 2026' },
              { name: 'Raitha Siri', status: 'Active', next: 'Seeds & tools received 2026' },
              { name: 'Krishi Bhagya', status: 'Applied', next: 'Drip irrigation subsidy applied' },
              { name: 'Ayushman Arogya Karnataka', status: 'Active', next: 'Card valid till 2028' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.next}</p>
                </div>
                <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function WeatherScreen() {
  const { t, lang } = useLanguage()
  const district = window.localStorage.getItem('citizen_district') || 'Mysuru'
  const defaultTaluk = window.localStorage.getItem('citizen_taluk') || ''
  
  const [selectedTaluk, setSelectedTaluk] = React.useState(defaultTaluk)
  const [weather, setWeather] = React.useState(null)
  const [forecast, setForecast] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [locationName, setLocationName] = React.useState(district)

  // Find taluks for this district to populate the dropdown
  const districtData = districtsOfKarnataka.find(d => d.name === district)
  const availableTaluks = districtData ? districtData.taluks : []

  React.useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoading(true)
      try {
        const data = await fetchWeatherForLocation(selectedTaluk, district)
        if (isMounted && data) {
          setWeather(data)
          setForecast(formatForecastData(data))
          if (data.resolvedLocation) setLocationName(data.resolvedLocation)
        }
      } catch (err) {
        console.error("Failed to load weather:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadWeather()
    return () => { isMounted = false }
  }, [district, selectedTaluk])

  const getIconForType = (type) => {
    switch (type) {
      case 'sunny': return Sun;
      case 'cloudy': return Cloud;
      case 'rain': return CloudRain;
      case 'snow': return CloudRain; // default to rain if snow icon isn't there
      default: return Cloud;
    }
  }

  const getConditionColor = (type) => {
    switch (type) {
      case 'sunny': return '#eab308';
      case 'rain': return '#3b82f6';
      case 'cloudy': return '#9ca3af';
      case 'snow': return '#a5f3fc';
      default: return '#9ca3af';
    }
  }

  if (loading) {
    return (
      <div className="card animate-fadeInUp" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ color: 'var(--primary)', marginBottom: 12 }}>
           <Cloud size={40} className="animate-pulse" />
        </div>
        <p style={{ fontWeight: 600 }}>Fetching live weather for {district}...</p>
      </div>
    )
  }

  if (!weather || forecast.length === 0) {
    return (
      <div className="card animate-fadeInUp" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Failed to load weather data for {district}. Please try again later.</p>
      </div>
    )
  }

  // Get current weather derived from utility
  let currentTemp = '--'
  let currentHumidity = '--'
  let currentWind = '--'
  let currentConditionStr = 'Unknown'
  let CurrentConditionIcon = Cloud

  if (weather.current) {
    currentTemp = Math.round(weather.current.temperature_2m)
    currentHumidity = weather.current.relative_humidity_2m
    currentWind = Math.round(weather.current.wind_speed_10m)
  }
  
  // Use today's forecast for current condition if available
  const todayForecast = forecast[0]
  if (todayForecast) {
    currentConditionStr = todayForecast.condition
    CurrentConditionIcon = getIconForType(todayForecast.type)
  }

  return (
    <div className="animate-fadeInUp">
      <div className="card" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', color: '#fff', padding: '24px', marginBottom: 20 }}>
        
        {availableTaluks.length > 0 && (
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <select
              value={selectedTaluk}
              onChange={(e) => setSelectedTaluk(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="" style={{ color: '#000' }}>Select Taluk</option>
              {availableTaluks.map(tObj => (
                <option key={tObj.name} value={tObj.name} style={{ color: '#000' }}>{tObj.name}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px 0' }}>{locationName}, Karnataka</h2>
            <div style={{ fontSize: 48, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12 }}>
              {currentTemp}°C <CurrentConditionIcon size={40} />
            </div>
            <p style={{ fontSize: 16, opacity: 0.9, marginTop: 4 }}>
              {todayForecast?.rain && parseInt(todayForecast.rain) > 50 ? 'Heavy rain expected.' : currentConditionStr}
            </p>
          </div>
          <div style={{ textAlign: 'right', opacity: 0.9 }}>
            <p style={{ margin: '4px 0' }}><Thermometer size={16} style={{ verticalAlign: 'middle', marginRight: 4 }}/> Humidity: {currentHumidity}%</p>
            <p style={{ margin: '4px 0' }}><Wind size={16} style={{ verticalAlign: 'middle', marginRight: 4 }}/> Wind: {currentWind} km/h</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>7-Day Forecast</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {forecast.map((f, i) => {
            const Icon = getIconForType(f.type)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <span style={{ width: 80, fontWeight: 600 }}>{f.day}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: getConditionColor(f.type) }} />
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{f.rain}</span>
                </div>
                <div style={{ width: 80, textAlign: 'right' }}>
                  <span style={{ fontWeight: 700 }}>{f.high}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{f.low}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function EmergencySOSScreen() {
  const { t, lang } = useLanguage()
  const district = window.localStorage.getItem('citizen_district') || 'Mysuru'

  const helplines = [
    { title: 'Ambulance / Medical', num: '108', icon: PhoneCall, color: '#dc2626' },
    { title: 'Police / Law & Order', num: '100', icon: ShieldAlert, color: '#1d4ed8' },
    { title: 'Fire & Rescue', num: '101', icon: AlertTriangle, color: '#ea580c' },
    { title: 'Women Helpline', num: '1091', icon: PhoneCall, color: '#db2777' },
    { title: 'Kisan Call Center', num: '1551', icon: PhoneCall, color: '#16a34a' },
    { title: 'Poison Information', num: '1066', icon: PhoneCall, color: '#9333ea' }
  ]

  return (
    <div className="animate-fadeInUp">
      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '24px', borderRadius: '12px', textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{ color: '#dc2626', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>EMERGENCY SOS</h2>
        <p style={{ color: '#991b1b', fontSize: 14, marginBottom: 20 }}>Tap the button below to immediately dial the national emergency number (112).</p>
        <a href="tel:112" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#dc2626', color: '#fff', width: 120, height: 120, borderRadius: '50%', textDecoration: 'none', boxShadow: '0 10px 25px rgba(220,38,38,0.4)', transition: 'transform 0.2s' }} onMouseDown={e => e.currentTarget.style.transform='scale(0.95)'} onMouseUp={e => e.currentTarget.style.transform='scale(1)'}>
          <Phone size={48} fill="currentColor" />
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {helplines.map((h, i) => (
          <a key={i} href={`tel:${h.num}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: 'inherit', padding: '16px', transition: 'transform 0.2s' }}>
            <div style={{ background: h.color + '20', color: h.color, padding: '12px', borderRadius: '50%' }}>
              <h.icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{h.title}</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{h.num}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'flex-start', background: '#f0f9ff', borderColor: '#bae6fd' }}>
        <Info size={24} color="#0369a1" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: '#0369a1', fontSize: 14, fontWeight: 700 }}>Location Sharing</h4>
          <p style={{ margin: 0, color: '#0c4a6e', fontSize: 12 }}>When you call 112 from a smartphone, your approximate location ({district}) is automatically shared with the emergency response center in Karnataka.</p>
        </div>
      </div>
    </div>
  )
}

export function TutorialsScreen() {
  const { t, lang } = useLanguage()
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState({}) // { tutorialId: [ {role: 'user'|'ai', text: ''} ] }
  const [inputVal, setInputVal] = useState('')

  // Real YouTube video IDs per language per topic
  const tutorials = [
    {
      id: 'upi',
      icon: IndianRupee,
      color: '#7c3aed',
      title: lang === 'kn' ? '\u0CAB\u0CCB\u0CA8\u0CCD\u200C\u0CAA\u0CC7 / GPay \u0CAC\u0CB3\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0CB9\u0CC7\u0C97\u0CC6?' : lang === 'hi' ? '\u092B\u094B\u0928\u092A\u0947 / GPay \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902?' : 'How to use PhonePe / Google Pay?',
      desc: lang === 'kn' ? 'UPI \u0CAE\u0CC2\u0CB2\u0C95 \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF \u0CB9\u0CA3 \u0C95\u0CB3\u0CC1\u0CB9\u0CBF\u0CB8\u0CBF' : lang === 'hi' ? 'UPI \u0938\u0947 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u0948\u0938\u0947 \u092D\u0947\u091C\u0947\u0902' : 'Send money securely via UPI',
      videoId: lang === 'kn' ? 'VIMM_NwaSag' : lang === 'hi' ? 'T8BJag0KzOM' : 'EsmAFKKfwDQ'
    },
    {
      id: 'sir',
      icon: FileText,
      color: '#0369a1',
      title: lang === 'kn' ? '\u0C9A\u0CC1\u0CA8\u0CBE\u0CB5\u0CA3\u0CBE \u0C86\u0CAF\u0CCB\u0C97\u0CA6 SIR \u0CAB\u0CBE\u0CB0\u0CCD\u0CAE\u0CCD' : lang === 'hi' ? '\u091A\u0941\u0928\u093E\u0935 \u0906\u092F\u094B\u0917 SIR \u092B\u0949\u0930\u094D\u092E' : 'Election Commission SIR Form',
      desc: lang === 'kn' ? 'SIR (Voter) \u0CAB\u0CBE\u0CB0\u0CCD\u0CAE\u0CCD \u0CA4\u0CC1\u0C82\u0CAC\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0CB9\u0CC7\u0C97\u0CC6' : lang === 'hi' ? 'SIR (Voter) \u092B\u0949\u0930\u094D\u092E \u0915\u0948\u0938\u0947 \u092D\u0930\u0947\u0902' : 'How to fill the Enumeration (SIR) form',
      videoId: lang === 'kn' ? 'r17iw80YRog' : lang === 'hi' ? 'OMtQPtYFBfQ' : '517So_qusUE'
    },
    {
      id: 'market',
      icon: TrendingUp,
      color: '#16a34a',
      title: lang === 'kn' ? '\u0CAE\u0CBE\u0CB0\u0CC1\u0C95\u0C9F\u0CCD\u0C9F\u0CC6 \u0CAC\u0CC6\u0CB2\u0CC6 \u0CA8\u0CCB\u0CA1\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1' : lang === 'hi' ? '\u092C\u093E\u091C\u093E\u0930 \u092D\u093E\u0935 \u0915\u0948\u0938\u0947 \u0926\u0947\u0916\u0947\u0902' : 'Check Market Prices (APMC)',
      desc: lang === 'kn' ? 'APMC \u0CAC\u0CC6\u0CB3\u0CC6 \u0CAC\u0CC6\u0CB2\u0CC6 \u0CA8\u0CCB\u0CA1\u0CBF' : lang === 'hi' ? 'APMC \u092B\u0938\u0932 \u0915\u0940\u092E\u0924 \u0926\u0947\u0916\u0947\u0902' : 'Check daily APMC crop prices',
      videoId: lang === 'kn' ? '-nxLVO4ZQRw' : lang === 'hi' ? 'uBYy1SoeP9o' : '6-dpn_sUQ1U'
    }
  ]

  const getAiResponse = (q) => {
    if (lang === 'kn') return "\u0C87\u0CA6\u0CC1 \u0CB8\u0CC1\u0CB2\u0CAD! \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAC\u0CCD\u0CAF\u0CBE\u0C82\u0C95\u0CCD \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C9C\u0CCB\u0CA1\u0CBF\u0CB8\u0CBF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 QR \u0C95\u0CCB\u0CA1\u0CCD \u0CB8\u0CCD\u0C95\u0CCD\u0CAF\u0CBE\u0CA8\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF\u0CB8\u0CBF. \u0CB5\u0CC0\u0CA1\u0CBF\u0CAF\u0CCB\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF 2:15 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0C82\u0CA4\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CCB\u0CA1\u0CBF."
    if (lang === 'hi') return "\u092F\u0939 \u0906\u0938\u093E\u0928 \u0939\u0948! \u0905\u092A\u0928\u093E \u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u091C\u094B\u0921\u093C\u0947\u0902 \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F QR \u0915\u094B\u0921 \u0938\u094D\u0915\u0948\u0928 \u0915\u0930\u0947\u0902\u0964 \u0935\u0940\u0921\u093F\u092F\u094B \u092E\u0947\u0902 2:15 \u092E\u093F\u0928\u091F \u092A\u0930 \u0926\u0947\u0916\u0947\u0902\u0964"
    return "It's easy! Just link your bank account and scan the QR code to pay. Check the video at 2:15 for exact steps."
  }

  const handleSend = (tutId) => {
    if (!inputVal.trim()) return
    const newChat = { role: 'user', text: inputVal }
    setChatHistory(prev => ({
      ...prev,
      [tutId]: [...(prev[tutId] || []), newChat]
    }))
    setInputVal('')
    setIsTyping(true)
    
    setTimeout(() => {
      const aiReply = { role: 'ai', text: getAiResponse(inputVal) }
      setChatHistory(prev => ({
        ...prev,
        [tutId]: [...(prev[tutId] || []), aiReply]
      }))
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px 0' }}>{t('tutorialTitle')}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>{t('tutorialSub')}</p>
        
        {/* Helper Note for the blocked issue */}
        <div style={{ background: '#fef3c7', color: '#b45309', padding: '12px', borderRadius: 8, marginTop: 12, fontSize: 13, border: '1px solid #fde68a', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <AlertCircle size={16} style={{ marginTop: 2, flexShrink: 0 }} />
          <span>If videos say "Content is blocked", please <b>restart your development server</b> in the terminal (press Ctrl+C, then run <code>npm run dev</code>). The security policy needs a restart to apply.</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {tutorials.map(tut => {
          const Icon = tut.icon
          const isActive = activeQuestion === tut.id
          const history = chatHistory[tut.id] || []
          
          return (
          <div key={tut.id + lang} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: tut.color + '12', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ background: tut.color, color: '#fff', padding: 10, borderRadius: '50%' }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{tut.title}</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'var(--text-muted)' }}>{tut.desc}</p>
              </div>
            </div>

            {/* YouTube Embed */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
              <iframe
                key={tut.videoId}
                src={`https://www.youtube.com/embed/${tut.videoId}?rel=0`}
                title={tut.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
            
            {/* AI Doubt Solver Section */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', background: '#f8fafc' }}>
              {!isActive && history.length === 0 ? (
                <button 
                  onClick={() => setActiveQuestion(tut.id)}
                  style={{ width: '100%', background: '#fff', border: '1px solid #cbd5e1', padding: '12px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  <MessageCircle size={16} />
                  {lang === 'kn' ? '\u0C88 \u0CB5\u0CC0\u0CA1\u0CBF\u0CAF\u0CCB \u0CAC\u0C97\u0CCD\u0C97\u0CC6 \u0CAA\u0CCD\u0CB0\u0CB6\u0CCD\u0CA8\u0CC6\u0C97\u0CB3\u0CBF\u0CB5\u0CC6\u0CAF\u0CC7? AI \u0C95\u0CC7\u0CB3\u0CBF' : lang === 'hi' ? '\u0907\u0938 \u0935\u0940\u0921\u093F\u092F\u094B \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u0915\u094B\u0908 \u0938\u0935\u093E\u0932? AI \u0938\u0947 \u092A\u0942\u091B\u0947\u0902' : 'Have a doubt about this video? Ask AI'}
                </button>
              ) : (
                <div className="animate-fadeInUp" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: tut.color, fontWeight: 700, fontSize: 13 }}>
                    <Bot size={18} />
                    <span>{lang === 'kn' ? 'AI \u0CB8\u0CB9\u0CBE\u0CAF\u0C95' : lang === 'hi' ? 'AI \u0938\u0939\u093E\u092F\u0915' : 'AI Assistant'}</span>
                  </div>
                  
                  {/* Chat History */}
                  <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {history.length === 0 && (
                      <div style={{ fontSize: 13, color: '#64748b', textAlign: 'center', padding: '10px' }}>
                        {lang === 'kn' ? '\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAA\u0CCD\u0CB0\u0CB6\u0CCD\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0CC6\u0CB3\u0C97\u0CC6 \u0C9F\u0CC8\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF...' : lang === 'hi' ? '\u0905\u092A\u0928\u093E \u0938\u0935\u093E\u0932 \u0928\u0940\u091A\u0947 \u091F\u093E\u0907\u092A \u0915\u0930\u0947\u0902...' : 'Type your question below...'}
                      </div>
                    )}
                    {history.map((msg, i) => (
                      <div key={i} style={{ 
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.role === 'user' ? tut.color : '#f1f5f9',
                        color: msg.role === 'user' ? '#fff' : '#334155',
                        padding: '8px 12px',
                        borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                        fontSize: 13,
                        maxWidth: '85%'
                      }}>
                        {msg.text}
                      </div>
                    ))}
                    {isTyping && (
                      <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '8px 12px', borderRadius: '12px 12px 12px 0', fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>
                        Typing...
                      </div>
                    )}
                  </div>
                  
                  {/* Input Field */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input 
                      type="text" 
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend(tut.id)}
                      placeholder={lang === 'kn' ? '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CCD\u0CB2\u0CBF\u0C95\u0CCD \u0CAE\u0CBE\u0CA1\u0CAC\u0CC7\u0C95\u0CC1?' : lang === 'hi' ? '\u0915\u0939\u093E\u0901 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0928\u093E \u0939\u0948?' : 'Where should I click?'}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}
                    />
                    <button 
                      onClick={() => handleSend(tut.id)}
                      disabled={isTyping}
                      style={{ background: tut.color, color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', cursor: isTyping ? 'not-allowed' : 'pointer', opacity: isTyping ? 0.7 : 1 }}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
