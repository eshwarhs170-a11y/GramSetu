import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  Landmark, TrendingUp, Megaphone, ClipboardList, IndianRupee,
  Droplets, Zap, Route, GraduationCap, Activity, Sprout, Trash2, MapPin,
  Camera, Phone, Home, Map,
  Building2, Wheat, ArrowUp, ArrowDown, Minus,
  Bell, ShieldCheck, RefreshCw, Sparkles, CheckCircle2, Star,
  Cloud, CloudRain, Sun, Thermometer, Wind, ShieldAlert, AlertTriangle, Stethoscope, Clock, CheckCircle, Info, PhoneCall, FileText, PlayCircle, Volume2, Send, Bot, MessageCircle, AlertCircle
} from 'lucide-react'
import { db } from '../firebase'
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { fetchLivePrices, BASELINE_PRICES, clearPriceCache } from '../utils/fetchPrices'
import { districtsOfKarnataka } from '../data/karnatakaTaluks'
import { fetchWeatherForLocation, formatForecastData } from '../utils/fetchWeather'
import { kaSchemes } from '../data/schemesData'
import { districtCropsMap, cropImageMap } from '../data/districtCrops'
import cropInfoMap from '../data/cropInfo.json'
import districtPricesMap from '../data/districtPrices.json'

// ===================== KARNATAKA DATA =====================

// kaSchemes is now imported from src/data/schemesData.js

export const kaPrices = [
  // MSP 2025-26: Ragi ₹4,290/quintal; APMC Bengaluru spot ~₹3,900-4,100
  { crop: 'Ragi (ರಾಗಿ)', unit: 'per quintal', price: '₹4,050', change: '+₹64', trend: 'up', market: 'APMC Bengaluru', img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=150&q=80' },
  // Arecanut Shimoga spot ~₹48,000-52,000 (2025-26 high demand)
  { crop: 'Areca Nut (ಅಡಿಕೆ)', unit: 'per quintal', price: '₹49,500', change: '+₹800', trend: 'up', market: 'APMC Shimoga', img: 'https://images.unsplash.com/photo-1631377819268-d716cd610cd2?w=150&q=80' },
  // Coffee Robusta Chikkamagaluru ~₹18,000-22,000/quintal
  { crop: 'Coffee (ಕಾಫಿ)', unit: 'per quintal', price: '₹20,500', change: '-₹300', trend: 'down', market: 'APMC Chikkamagaluru', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&q=80' },
  // Silk Cocoon Ramanagara ~₹500-650/kg
  { crop: 'Silk Cocoon (ರೇಷ್ಮೆ)', unit: 'per kg', price: '₹580', change: '+₹15', trend: 'up', market: 'Silk Exchange, Ramanagara', img: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=150&q=80' },
  // MSP 2025-26: Jowar ₹3,371/quintal
  { crop: 'Jowar (ಜೋಳ)', unit: 'per quintal', price: '₹3,350', change: '-₹21', trend: 'down', market: 'APMC Dharwad', img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=150&q=80' },
  // MSP 2025-26: Maize ₹2,225/quintal
  { crop: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', unit: 'per quintal', price: '₹2,280', change: '+₹55', trend: 'up', market: 'APMC Davangere', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&q=80' },
  // Tomato Kolar APMC highly volatile; ~₹20-35/kg in Aug
  { crop: 'Tomato (ಟೊಮೇಟೊ)', unit: 'per kg', price: '₹28', change: '+₹6', trend: 'up', market: 'APMC Kolar', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80' },
  // Onion Gadag/Hubli APMC ~₹18-28/kg
  { crop: 'Onion (ಈರುಳ್ಳಿ)', unit: 'per kg', price: '₹22', change: '-₹3', trend: 'down', market: 'APMC Gadag', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=150&q=80' },
  // FRP Sugarcane Karnataka 2025-26: ₹3,150/tonne (state SAP ₹3,400)
  { crop: 'Sugarcane (ಕಬ್ಬು)', unit: 'per tonne', price: '₹3,400', change: '₹0', trend: 'neutral', market: 'APMC Mandya', img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=150&q=80' },
  // Turmeric Chamarajanagar/Mysuru ~₹12,000-15,000/quintal
  { crop: 'Turmeric (ಅರಿಶಿನ)', unit: 'per quintal', price: '₹13,800', change: '+₹300', trend: 'up', market: 'APMC Chamarajanagar', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80' },
  // Coconut Tumkuru ~₹1,800-2,200 per 100 nuts
  { crop: 'Coconut (ತೆಂಗಿನಕಾಯಿ)', unit: 'per 100 nuts', price: '₹2,050', change: '+₹80', trend: 'up', market: 'APMC Tumkuru', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&q=80' },
  // MSP 2025-26: Groundnut ₹6,783/quintal; market ~₹6,000-7,000
  { crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal', price: '₹6,650', change: '-₹130', trend: 'down', market: 'APMC Chitradurga', img: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=150&q=80' },
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

export function HomeScreen({ setActive }) {
  const { t, lang } = useLanguage()
  const [userName, setUserName] = useState('ರಾಮಪ್ಪ ಗೌಡ')
  const [userDistrict, setUserDistrict] = useState('Mysuru')
  const [userTaluk, setUserTaluk] = useState('Mysuru Taluk')
  const [roleMode, setRoleMode] = useState('farmer')
  const [livePrices, setLivePrices] = useState(BASELINE_PRICES)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [priceFlash, setPriceFlash] = useState({})
  const [priceSource, setPriceSource] = useState('baseline') // 'live' | 'baseline'
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
    if (forceApi) clearPriceCache()
    setLoadingPrices(true)
    const live = await fetchLivePrices()
    if (live && live.length) {
      setLivePrices(live)
      setPriceSource('live')
    } else {
      setPriceSource('baseline')
    }
    setLastUpdated(new Date())
    setLoadingPrices(false)
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
    if (sDist) setUserDistrict(sDist)
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
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
              🌾 {lang === 'kn' ? 'ರೈತ' : 'Farmer'}
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
              🎓 {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ' : 'Student'}
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
                  <img src={cropInfoMap[crop]?.image || cropImageMap[crop] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80'} alt={crop} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <span style={{ fontSize: 22 }}>🎓</span>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
                  🎓 Scholarships & Eligibility
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
              🎓 {lang === 'kn' ? 'ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View All Scholarships'} ➔
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
              }
            ].map((sch, sIdx) => (
              <div key={sIdx} style={{ background: 'var(--bg-main)', borderRadius: 12, padding: 16, border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div>
                  <h5 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-primary)', lineHeight: 1.3 }}>{sch.title}</h5>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 6px 0', fontWeight: 500 }}>
                    <strong>📚 Class:</strong> {sch.classReq}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 14px 0', fontWeight: 500 }}>
                    <strong>💰 Family Income Limit:</strong> {sch.incomeLimit}
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
          { Icon: Landmark,         labelKey: 'activeSchemes',    value: '6',      color: '#dbeafe', iconColor: '#1d4ed8', trend: '+1 Raitha Siri' },
          { Icon: ClipboardList,    labelKey: 'myComplaints',     value: String(globalComplaints.length), color: '#fee2e2', iconColor: '#dc2626', trend: `${globalComplaints.filter(c => c.status === 'resolved').length} resolved` },
          { Icon: Bell,             labelKey: 'newAlerts',        value: '4',      color: '#fef3c7', iconColor: '#d97706', trend: '2 urgent' },
          { Icon: IndianRupee,      labelKey: 'benefitsReceived', value: '₹6,000', color: '#d1fae5', iconColor: '#15803d', trend: 'PM Kisan 2026' },
        ].map((s, i) => (
          <div className="stat-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
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
            <h3>{t('todayPrices')} ({userDistrict} APMC)</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {loadingPrices ? (
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏳ Fetching...</span>
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
                  {(livePrices.filter(p => p.market.includes(userDistrict)).length > 0
                    ? livePrices.filter(p => p.market.includes(userDistrict))
                    : livePrices.slice(0, 5)).map((p, i) => (
                    <tr key={i} style={{
                      transition: 'background 0.5s',
                      background: priceFlash[i] === 'up' ? 'rgba(34,197,94,0.12)' : priceFlash[i] === 'down' ? 'rgba(239,68,68,0.1)' : ''
                    }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <img src={p.img} alt={p.crop} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} onError={e => { e.target.style.display='none' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.crop}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.market}</div>
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
              <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>View Full Market ↗</a>
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
              <div className="card" key={i} style={{ padding: 16, display: 'flex', gap: 14 }}>
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
            >✕</button>
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
              {selectedCropInfo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function SchemesScreen() {
  const { t, lang } = useLanguage()
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [schemes, setSchemes] = useState(kaSchemes)
  const [loadingSchemes, setLoadingSchemes] = useState(true)

  // Smart Scholarship Finder Form State
  const [filterClass, setFilterClass] = useState('')
  const [filterIncome, setFilterIncome] = useState('')
  const [scholarshipFormSubmitted, setScholarshipFormSubmitted] = useState(false)

  // Fetch from Firestore, fall back to static data
  useEffect(() => {
    const q = query(collection(db, 'schemes'))
    getDocs(q)
      .then(snap => {
        if (!snap.empty) {
          setSchemes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        }
      })
      .catch(() => {/* silent fallback to static data */})
      .finally(() => setLoadingSchemes(false))
  }, [])

  const categories = ['All', 'Agriculture', 'Finance', 'Health', 'Women', 'Scholarship']

  const getClassLabel = (val) => {
    if (val === '8') return 'Class 8th – 10th'
    if (val === '12') return 'Class 11th & 12th (PUC)'
    if (val === '14') return 'ITI / Diploma / Polytechnic'
    if (val === '16') return 'Undergraduate (BA, BSc, BE, MBBS)'
    if (val === '18') return 'Post Graduation (PG / PhD)'
    return 'All Classes'
  }

  const isEligibleForFilters = (scheme) => {
    if (scheme.category !== 'Scholarship') return true

    if (filterClass) {
      const clsVal = parseInt(filterClass)
      if (scheme.minClassLevel && clsVal < scheme.minClassLevel) return false
      if (scheme.maxClassLevel && clsVal > scheme.maxClassLevel) return false
    }

    if (filterIncome) {
      const incVal = parseInt(filterIncome)
      if (scheme.maxIncomeLimit && incVal > scheme.maxIncomeLimit) return false
    }

    return true
  }

  const categoryFiltered = categoryFilter === 'All' 
    ? schemes 
    : schemes.filter(s => s.category === categoryFilter)

  const filteredSchemes = categoryFiltered.filter(isEligibleForFilters)

  const getSchemePortalUrl = (scheme) => {
    if (!scheme) return 'https://sevasindhuservices.karnataka.gov.in/'
    if (scheme.applyLink) return scheme.applyLink
    
    // Mappings by scheme ID
    if (scheme.id === 'raitha-vidya-nidhi' || scheme.id === 'ssp-karnataka') return 'https://ssp.postmatric.karnataka.gov.in/'
    if (scheme.id === 'buddy4study-portal' || scheme.id === 'buddy4study') return 'https://www.buddy4study.com/'
    if (scheme.id === 'nsp-portal' || scheme.id === 'pm-scholarship' || scheme.id === 'nmmss' || scheme.id === 'pm-usp') return 'https://scholarships.gov.in/'
    if (scheme.id === 'bhoomi-rtc') return 'https://landrecords.karnataka.gov.in/'
    if (scheme.id === 'pm-kisan') return 'https://pmkisan.gov.in/'
    if (scheme.id === 'pmfby') return 'https://pmfby.gov.in/'
    if (scheme.id === 'gruha-lakshmi') return 'https://sevasindhuservices.karnataka.gov.in/'
    if (scheme.id === 'ayushman-bharat' || scheme.id === 'ayushman-arogya') return 'https://arogya.karnataka.gov.in/'
    if (scheme.id === 'raitha-siri') return 'https://raitamitra.karnataka.gov.in/'
    if (scheme.id === 'krishi-sinchai') return 'https://pmksy.gov.in/'
    
    if (scheme.category === 'Scholarship') return 'https://ssp.postmatric.karnataka.gov.in/'
    return 'https://sevasindhuservices.karnataka.gov.in/'
  }

  const applyQuickPreset = (cls, inc) => {
    setCategoryFilter('Scholarship')
    setFilterClass(cls)
    setFilterIncome(inc)
    setScholarshipFormSubmitted(true)
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700 }}>🏛️ {t('schemesTitle')}</h3>
        
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => {
                setCategoryFilter(cat)
                if (cat === 'Scholarship' && !filterClass && !filterIncome) {
                  setScholarshipFormSubmitted(false)
                }
              }}
            >
              {cat === 'Scholarship' ? '🎓 Scholarships' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Student Requirement Entry Form when Scholarship category is active and not submitted */}
      {categoryFilter === 'Scholarship' && !scholarshipFormSubmitted ? (
        <div className="card animate-fadeInUp" style={{
          maxWidth: 620,
          margin: '10px auto 30px auto',
          padding: '32px 28px',
          borderRadius: 20,
          border: '2px solid #2563eb',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.14)',
          background: 'var(--bg-card)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 44, display: 'inline-block', marginBottom: 8 }}>🎓</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಹತಾ ಪೋರ್ಟಲ್: ಮೊದಲಿಗೆ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ' : 'Student Setup: Enter Your Class & Family Income First'}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
              {lang === 'kn' ? 'ನಿಮ್ಮ ಅರ್ಹತೆಗೆ ಹೊಂದುವ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಮಾತ್ರ ವೀಕ್ಷಿಸಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ತರಗತಿ ಹಾಗೂ ಕುಟುಂಬದ ಆದಾಯವನ್ನು ಮೊದಲಿಗೆ ಆಯ್ಕೆ ಮಾಡಿ.' : 'To display only the scholarships you qualify for, please select your Class and Annual Family Income first.'}
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault()
            setScholarshipFormSubmitted(true)
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: 'var(--text-primary)' }}>
                  1️⃣ Select Your Current Class / Course / ತರಗತಿ (Required):
                </label>
                <select 
                  className="form-input" 
                  value={filterClass} 
                  onChange={e => setFilterClass(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', fontSize: 14, borderRadius: 10, border: '1.5px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                >
                  <option value="">-- Choose Education Level / ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ --</option>
                  <option value="8">Class 8th – 10th (High School / 8 - 10)</option>
                  <option value="12">Class 11th &amp; 12th (PUC / 10+2)</option>
                  <option value="14">ITI / Diploma / Polytechnic</option>
                  <option value="16">Undergraduate (BA, BSc, BCom, BE, MBBS)</option>
                  <option value="18">Post Graduation (MA, MSc, MCom, PhD)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: 'var(--text-primary)' }}>
                  2️⃣ Annual Family Income / ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ (Required):
                </label>
                <select
                  className="form-input"
                  value={filterIncome}
                  onChange={e => setFilterIncome(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', fontSize: 14, borderRadius: 10, border: '1.5px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                >
                  <option value="">-- Choose Income Range / ಆದಾಯ ಆಯ್ಕೆಮಾಡಿ --</option>
                  <option value="180000">Up to ₹1,80,000 / year (₹1.8 Lakh)</option>
                  <option value="250000">Up to ₹2,50,000 / year (₹2.5 Lakh)</option>
                  <option value="300000">Up to ₹3,00,000 / year (₹3.0 Lakh)</option>
                  <option value="450000">Up to ₹4,50,000 / year (₹4.5 Lakh)</option>
                  <option value="600000">Up to ₹6,00,000 / year (₹6.0 Lakh)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: 'var(--text-primary)' }}>
                  3️⃣ State / Location:
                </label>
                <input 
                  className="form-input" 
                  value="Karnataka (All 31 Districts)" 
                  readOnly 
                  style={{ width: '100%', padding: '12px 14px', fontSize: 14, borderRadius: 10, background: 'var(--bg-main)', color: 'var(--text-primary)', border: '1.5px solid var(--border-light)', cursor: 'not-allowed' }}
                />
              </div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>⚡ Quick Sample Presets (One Tap):</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm" 
                    onClick={() => applyQuickPreset('12', '180000')}
                    style={{ fontSize: 12, borderRadius: 8, borderColor: '#2563eb', color: '#2563eb', fontWeight: 600 }}
                  >
                    ⚡ Class 12th &amp; ₹1.8L Income
                  </button>
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm" 
                    onClick={() => applyQuickPreset('8', '250000')}
                    style={{ fontSize: 12, borderRadius: 8 }}
                  >
                    ⚡ Class 8th–10th &amp; ₹2.5L Income
                  </button>
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm" 
                    onClick={() => applyQuickPreset('16', '300000')}
                    style={{ fontSize: 12, borderRadius: 8 }}
                  >
                    ⚡ Degree (UG) &amp; ₹3.0L Income
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: 14, fontSize: 15, fontWeight: 700, borderRadius: 10, justifyContent: 'center', marginTop: 8 }}
              >
                🚀 {lang === 'kn' ? 'ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಪಡೆಯಿರಿ →' : 'Search & Find Eligible Scholarships →'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* STEP 2: Rendered Scholarship & Scheme Results */
        <>
          {categoryFilter === 'Scholarship' && (
            <div style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              borderRadius: 16,
              padding: '16px 20px',
              marginBottom: 24,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>
                  🎓 {filteredSchemes.filter(s => s.category === 'Scholarship').length} Scholarships Matching Your Profile
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>
                  Class: <strong>{getClassLabel(filterClass)}</strong> | Income Limit: <strong>₹{parseInt(filterIncome || 0).toLocaleString('en-IN')}/yr</strong> | Location: <strong>Karnataka</strong>
                </p>
              </div>

              <button
                className="btn btn-sm"
                onClick={() => setScholarshipFormSubmitted(false)}
                style={{ background: '#fff', color: '#1e3a8a', fontWeight: 700, border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}
              >
                ✏️ Edit Class &amp; Income
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filteredSchemes.map((s, i) => {
              const portalUrl = getSchemePortalUrl(s)
              return (
                <div className="scheme-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="scheme-card-img">
                    <img src={s.img} alt={s.title[lang] || s.title.en} />
                    <div className="scheme-card-img-overlay" />
                    <div className="scheme-card-overlay-badge">
                      <span className={`badge ${s.badgeClass || 'badge-success'}`}>{s.badge ? (s.badge[lang] || s.badge.en) : 'Active Portal'}</span>
                    </div>
                  </div>
                  <div className="scheme-card-body">
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{s.ministry[lang] || s.ministry.en}</div>
                    <h4>{s.title[lang] || s.title.en}</h4>
                    <p style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '0 0 8px 0' }}>{s.desc[lang] || s.desc.en}</p>

                    {s.category === 'Scholarship' && (
                      <div style={{ fontSize: 12, margin: '6px 0 10px 0', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--bg-main)', padding: 10, borderRadius: 8, border: '1px solid var(--border-light)' }}>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 600 }}>
                          <strong>📚 Class:</strong> {s.classRangeText ? (s.classRangeText[lang] || s.classRangeText.en) : (s.classRequired ? (s.classRequired[lang] || s.classRequired.en) : 'Class 8th–12th / UG / PG')}
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 600 }}>
                          <strong>💰 Income Limit:</strong> {s.incomeLimitText ? (s.incomeLimitText[lang] || s.incomeLimitText.en) : (s.incomeLimit ? (s.incomeLimit[lang] || s.incomeLimit.en) : 'Up to ₹2.5 Lakh/year')}
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 11 }}>
                          <strong>📍 Location:</strong> Karnataka (All Districts)
                        </p>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 12 }}>
                      <a
                        href={portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}
                      >
                        {s.category === 'Scholarship' ? 'Apply →' : 'Apply Online ↗'}
                      </a>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedScheme(s)}
                      >
                        {t('learnMore')}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {selectedScheme && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 550, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24, position: 'relative' }}>
            <button 
              onClick={() => setSelectedScheme(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold', background: 'none', border: 'none', color: 'var(--text-primary)' }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>{selectedScheme.title[lang] || selectedScheme.title.en}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{selectedScheme.ministry[lang] || selectedScheme.ministry.en}</p>
            
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Description / ವಿವರಣೆ</h5>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{selectedScheme.desc[lang] || selectedScheme.desc.en}</p>
            </div>

            {(selectedScheme.id === 'raitha-vidya-nidhi' || selectedScheme.category === 'Scholarship') && (
              <div style={{ marginBottom: 16, padding: 12, border: '1px solid #fed7aa', background: '#fff7ed', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ fontWeight: 600, fontSize: 13, color: '#c2410c', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  🎓 Course-wise Scholarship Rates (Annual) / ಕೋರ್ಸ್‌ವಾರು ವಿವರಗಳು
                </h5>
                <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #fdba74', color: '#c2410c', fontWeight: 600 }}>
                        <th style={{ padding: '6px 4px' }}>Course / ಕೋರ್ಸ್</th>
                        <th style={{ padding: '6px 4px' }}>Boys / ಬಾಲಕರು</th>
                        <th style={{ padding: '6px 4px' }}>Girls / ಬಾಲಕಿಯರು</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { course: 'Class 8 - 10 (Girls only)', boys: '-', girls: '₹2,500' },
                        { course: 'Class 11 & 12 (PUC)', boys: '₹2,500', girls: '₹3,000' },
                        { course: 'ITI / Diploma / Polytechnic', boys: '₹5,000', girls: '₹5,500' },
                        { course: 'General Degrees (BA, BSc, BCom)', boys: '₹5,000', girls: '₹5,500' },
                        { course: 'Professional Degrees (BE, MBBS, Law, Agri)', boys: '₹10,000', girls: '₹11,000' },
                        { course: 'Post Graduation (PG / PhD)', boys: '₹10,000', girls: '₹11,000' },
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #ffedd5' }}>
                          <td style={{ padding: '6px 4px', fontWeight: 500 }}>{item.course}</td>
                          <td style={{ padding: '6px 4px', color: '#ea580c' }}>{item.boys}</td>
                          <td style={{ padding: '6px 4px', color: '#ea580c', fontWeight: 600 }}>{item.girls}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: '#7c2d12', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ margin: 0 }}>
                    🌐 Official Karnataka Portal:{' '}
                    <a href="https://ssp.postmatric.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#c2410c', fontWeight: 700 }}>
                      SSP State Scholarship Portal ↗
                    </a>
                  </p>
                  <p style={{ margin: 0 }}>
                    📚 National &amp; Private Scholarships:{' '}
                    <a href="https://www.buddy4study.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#c2410c', fontWeight: 700 }}>
                      Buddy4Study Scholarship Portal ↗
                    </a>
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 16, padding: 12, background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <h5 style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary-dark)', marginBottom: 4 }}>Eligibility / ಅರ್ಹತೆ</h5>
              <p style={{ fontSize: 13 }}>{selectedScheme.eligibility[lang] || selectedScheme.eligibility.en}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h5 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Required Documents / ಅಗತ್ಯ ದಾಖಲೆಗಳು</h5>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedScheme.documents[lang] || selectedScheme.documents.en}</p>
            </div>

            {selectedScheme.category === 'Scholarship' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a 
                    href={selectedScheme.applyLink || 'https://ssp.postmatric.karnataka.gov.in/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary" 
                    style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                  >
                    🎓 Apply on SSP Karnataka Portal ↗
                  </a>
                  <a 
                    href="https://www.buddy4study.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline" 
                    style={{ flex: 1, justifyContent: 'center', textDecoration: 'none', borderColor: '#2563eb', color: '#2563eb' }}
                  >
                    📚 Apply on Buddy4Study ↗
                  </a>
                </div>
                <button className="btn btn-outline" style={{ marginTop: 4 }} onClick={() => setSelectedScheme(null)}>Close</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <a 
                  href={getSchemePortalUrl(selectedScheme)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                >
                  Apply Online on Official Portal ↗
                </a>
                <button className="btn btn-outline" onClick={() => setSelectedScheme(null)}>Close</button>
              </div>
            )}
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
  const [prices, setPrices] = useState(BASELINE_PRICES)
  const [loadingPrices, setLoadingPrices] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [priceSource, setPriceSource] = useState('baseline')

  // User's current district for filtering
  const userDistrict = window.localStorage.getItem('citizen_district') || 'Tumkuru'

  // Fetch live AGMARKNET prices, then try Firestore override
  useEffect(() => {
    const load = async () => {
      setLoadingPrices(true)
      const live = await fetchLivePrices()
      if (live && live.length) {
        setPrices(live)
        setPriceSource('live')
        setLastUpdated(new Date().toLocaleTimeString('en-IN'))
      } else {
        try {
          const snap = await getDocs(collection(db, 'prices'))
          if (!snap.empty) {
            setPrices(snap.docs.map(d => ({ ...d.data() })))
            setPriceSource('firestore')
            setLastUpdated(new Date().toLocaleTimeString('en-IN'))
          }
        } catch (_) {}
      }
      setLoadingPrices(false)
    }
    load()
  }, [])

  const filteredPrices = prices.filter(p => {
    const matchesSearch = p.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.market.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesRegion = true
    if (viewMode === 'district') {
      // If we know the districts for this crop, see if user's district is in there
      if (p.districts && Array.isArray(p.districts)) {
        matchesRegion = p.districts.includes(userDistrict)
      } else {
        // Fallback if no mapping exists, show all
        matchesRegion = true
      }
    }
    return matchesSearch && matchesRegion
  })

  const [landArea, setLandArea] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('Ragi (ರಾಗಿ)')
  const [calcResult, setCalcResult] = useState(null)

  const calculateEstimate = (e) => {
    e.preventDefault()
    if (!landArea || isNaN(landArea)) return
    const priceEntry = prices.find(p => p.crop === selectedCrop)
    const rawPrice = priceEntry ? parseFloat(String(priceEntry.price).replace(/[₹,]/g, '')) : 3000
    const yieldPerAcre = {
      'Ragi (ರಾಗಿ)': 12,
      'Areca Nut (ಅಡಿಕೆ)': 8,
      'Jowar (ಜೋಳ)': 15,
      'Maize (ಮೆಕ್ಕೆಜೋಳ)': 22,
      'Sugarcane (ಕಬ್ಬು)': 35,
    }[selectedCrop] || 10
    const estYield = (parseFloat(landArea) * yieldPerAcre).toFixed(1)
    const estRevenue = Math.round(estYield * rawPrice)
    setCalcResult({ yield: estYield, revenue: estRevenue.toLocaleString('en-IN'), priceUsed: priceEntry?.price || '₹3,000' })
  }

  return (
    <div className="animate-fadeInUp">
      
      {/* Top Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 24 }}>
        {(() => {
          const best = [...prices].sort((a, b) => {
            const aV = parseFloat(String(a.change).replace(/[+₹,-]/g,'')) * (a.trend === 'up' ? 1 : -1)
            const bV = parseFloat(String(b.change).replace(/[+₹,-]/g,'')) * (b.trend === 'up' ? 1 : -1)
            return bV - aV
          })
          const top = best[0]
          const drop = best[best.length - 1]
          return (
            <>
              <div className="card" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#065f46', fontWeight: 600, marginBottom: 4 }}>Top Gainer Today</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#064e3b' }}>{top?.crop?.split('(')[0].trim()} {top?.price}/{top?.unit?.split(' ').pop() || 'q'}</div>
                  <div style={{ fontSize: 13, color: '#047857', marginTop: 4 }}>↑ {top?.market}</div>
                </div>
                {top?.img && <img src={top.img} alt={top.crop} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '3px solid #6ee7b7' }}/>}
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)', border: 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#991b1b', fontWeight: 600, marginBottom: 4 }}>Biggest Drop Today</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#7f1d1d' }}>{drop?.crop?.split('(')[0].trim()} {drop?.change}</div>
                  <div style={{ fontSize: 13, color: '#b91c1c', marginTop: 4 }}>↓ {drop?.market}</div>
                </div>
                {drop?.img && <img src={drop.img} alt={drop.crop} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fca5a5' }}/>}
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 12, color: '#5b21b6', fontWeight: 600, marginBottom: 4 }}>Data Source</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#4c1d95' }}>
                  {loadingPrices ? '⏳ Fetching Data...' : priceSource === 'live' ? '🟢 AGMARKNET Live Data' : '📋 MSP Baseline 2025-26'}
                </div>
                <div style={{ fontSize: 11, color: '#6d28d9', marginTop: 4 }}>
                  {lastUpdated ? `Last updated: ${lastUpdated}` : 'Connecting to data.gov.in...'}
                </div>
                <button
                  onClick={async () => { clearPriceCache(); const l = await fetchLivePrices(); if (l) { setPrices(l); setPriceSource('live'); setLastUpdated(new Date().toLocaleTimeString('en-IN')); } }}
                  style={{ marginTop: 8, fontSize: 11, color: '#5b21b6', fontWeight: 700, border: '1px solid #c4b5fd', background: 'rgba(255,255,255,0.5)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', alignSelf: 'flex-start' }}
                >↻ Refresh Now</button>
              </div>
            </>
          )
        })()}
      </div>

      {/* Estimator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--primary)' }}>🧮 Crop Yield & Income Estimator</h4>
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
                {prices.map(p => <option key={p.crop}>{p.crop}</option>)}
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
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Live Crop Prices</div>
          
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
              My District ({userDistrict})
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
              <div key={i} style={{
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
                <div style={{ width: '100%', height: 160, position: 'relative' }}>
                  <img
                    src={p.img || 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80'}
                    alt={p.crop}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80' }}
                  />
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    background: p.trend === 'up' ? 'rgba(6, 95, 70, 0.9)' : p.trend === 'down' ? 'rgba(153, 27, 27, 0.9)' : 'rgba(75, 85, 99, 0.9)',
                    color: '#fff', padding: '4px 8px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: 4, backdropFilter: 'blur(4px)'
                  }}>
                    {p.trend === 'up' ? <ArrowUp size={12}/> : p.trend === 'down' ? <ArrowDown size={12}/> : <Minus size={12}/>}
                    {p.change}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 16 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{p.crop}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={14} style={{ opacity: 0.7 }} /> {p.market}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Live Price</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary-dark)' }}>{p.price}</div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, paddingBottom: 4 }}>
                      {p.unit}
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
          🔔 Subscribe to SMS Alerts
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
              ✕
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
              ✕
            </button>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>🔔 Get Local Alerts via SMS</h3>
            
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
                <span style={{ fontSize: 48 }}>✅</span>
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
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
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
                  📷 {t('attachPhoto')} / ಫೋಟೋ ತೆಗೆಯಿರಿ
                  <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>(Optional)</span>
                </label>

                {/* Guide steps */}
                {cameraMode === 'idle' && (
                  <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {/* Guide banner */}
                    <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', padding: '14px 18px', borderBottom: '1px solid #bbf7d0' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#15803d', marginBottom: 6 }}>📋 How to take a complaint photo / ಫೋಟೋ ಹೇಗೆ ತೆಗೆಯಬೇಕು:</p>
                      <ol style={{ fontSize: 12, color: '#166534', paddingLeft: 18, margin: 0, lineHeight: 2 }}>
                        <li>Click <strong>"Open Camera"</strong> — allow camera permission when browser asks</li>
                        <li>Point your camera at the <strong>problem area</strong> clearly</li>
                        <li>Click the <strong>📸 Capture</strong> button to take the photo</li>
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
                        📁 Upload File
                        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                )}

                {/* Requesting permission */}
                {cameraMode === 'requesting' && (
                  <div style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'center', background: 'var(--primary-glow)' }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>📡</div>
                    <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14 }}>Requesting camera permission...</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                      ✋ Your browser will ask for camera access — click <strong>"Allow"</strong> to continue
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
                        📸 Capture Photo / ಚಿತ್ರ ತೆಗೆಯಿರಿ
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
                      <span style={{ color: '#15803d', fontWeight: 700, fontSize: 13 }}>✅ Photo Captured Successfully!</span>
                      <button type="button" onClick={retakePhoto} style={{ marginLeft: 'auto', color: 'var(--primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none' }}>
                        🔄 Retake / ಮತ್ತೆ ತೆಗೆಯಿರಿ
                      </button>
                    </div>
                    <img src={photoUri} alt="Complaint evidence" style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '10px 14px', background: '#f9fafb', fontSize: 12, color: 'var(--text-muted)' }}>
                      📌 This photo will be attached to your complaint as evidence
                    </div>
                  </div>
                )}

                {/* Permission denied */}
                {(cameraMode === 'denied' || cameraMode === 'unsupported') && (
                  <div style={{ border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: 16, background: '#fff5f5' }}>
                    <p style={{ color: '#dc2626', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
                      {cameraMode === 'denied' ? '🚫 Camera Permission Denied' : '📵 Camera Not Available'}
                    </p>
                    <p style={{ color: '#7f1d1d', fontSize: 13, marginBottom: 14 }}>{cameraError}</p>
                    {cameraMode === 'denied' && (
                      <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#374151' }}>
                        <strong>How to allow camera in Chrome:</strong><br />
                        1. Click the 🔒 lock icon in the browser address bar<br />
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
                      📁 Upload Photo Instead
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
          <span>🔍</span>
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
                    <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>🎫 {c.id}</span>
                    <span className={`badge ${
                      c.status === 'resolved' ? 'badge-success'
                      : isEscalated ? 'badge-warning'
                      : c.status === 'inprogress' ? 'badge-info'
                      : 'badge-warning'}`} style={{ fontSize: 10 }}>
                      {c.status === 'resolved' ? '✅ ' + t('resolved')
                        : isEscalated ? '🔼 Escalated'
                        : c.status === 'inprogress' ? '🔄 ' + t('inProgress')
                        : '⏳ ' + t('pending')}
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{c.title}</h4>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span>📁 {c.category}</span>
                    <span>📅 {c.date}</span>
                    <span>🏛️ {c.assignedTo}</span>
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
                  <span style={{ fontSize: 16 }}>🔼</span>
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
                    📋 Official Responses ({c.responses.length})
                  </div>
                  {c.responses.map((r, ri) => (
                    <div key={ri} style={{
                      background: 'var(--bg-main)', borderRadius: 10, padding: '10px 14px',
                      marginBottom: 8, fontSize: 12,
                      borderLeft: `3px solid ${r.status === 'resolved' ? '#10b981' : r.status === 'escalated' ? '#f59e0b' : '#3b82f6'}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 13 }}>👮</span>
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
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--primary)' }}>✏️ Edit Profile Details</h3>
        
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
            <button className="btn btn-outline" onClick={startEditing} style={{ marginTop: 16 }}>✏️ {t('edit')}</button>
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
