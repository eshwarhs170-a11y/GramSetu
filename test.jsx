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
  { crop: 'Ragi (ರಾಗಿ)', unit: 'per quintal', price: '₹4,050', change: '+₹64', trend: 'up', market: 'APMC Bengaluru', img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150&q=80' },
  // Arecanut Shimoga spot ~₹48,000-52,000 (2025-26 high demand)
  { crop: 'Areca Nut (ಅಡಿಕೆ)', unit: 'per quintal', price: '₹49,500', change: '+₹800', trend: 'up', market: 'APMC Shimoga', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80' },
  // Coffee Robusta Chikkamagaluru ~₹18,000-22,000/quintal
  { crop: 'Coffee (ಕಾಫಿ)', unit: 'per quintal', price: '₹20,500', change: '-₹300', trend: 'down', market: 'APMC Chikkamagaluru', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80' },
  // Silk Cocoon Ramanagara ~₹500-650/kg
  { crop: 'Silk Cocoon (ರೇಷ್ಮೆ)', unit: 'per kg', price: '₹580', change: '+₹15', trend: 'up', market: 'Silk Exchange, Ramanagara', img: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=150&q=80' },
  // MSP 2025-26: Jowar ₹3,371/quintal
  { crop: 'Jowar (ಜೋಳ)', unit: 'per quintal', price: '₹3,350', change: '-₹21', trend: 'down', market: 'APMC Dharwad', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&q=80' },
  // MSP 2025-26: Maize ₹2,225/quintal
  { crop: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', unit: 'per quintal', price: '₹2,280', change: '+₹55', trend: 'up', market: 'APMC Davangere', img: 'https://images.unsplash.com/photo-1551754626-78724e3960d7?w=150&q=80' },
  // Tomato Kolar APMC highly volatile; ~₹20-35/kg in Aug
  { crop: 'Tomato (ಟೊಮೇಟೊ)', unit: 'per kg', price: '₹28', change: '+₹6', trend: 'up', market: 'APMC Kolar', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80' },
  // Onion Gadag/Hubli APMC ~₹18-28/kg
  { crop: 'Onion (ಈರುಳ್ಳಿ)', unit: 'per kg', price: '₹22', change: '-₹3', trend: 'down', market: 'APMC Gadag', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=150&q=80' },
  // FRP Sugarcane Karnataka 2025-26: ₹3,150/tonne (state SAP ₹3,400)
  { crop: 'Sugarcane (ಕಬ್ಬು)', unit: 'per tonne', price: '₹3,400', change: '₹0', trend: 'neutral', market: 'APMC Mandya', img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=150&q=80' },
  // Turmeric Chamarajanagar/Mysuru ~₹12,000-15,000/quintal
  { crop: 'Turmeric (ಅರಿಶಿನ)', unit: 'per quintal', price: '₹13,800', change: '+₹300', trend: 'up', market: 'APMC Chamarajanagar', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80' },
  // Coconut Tumkuru ~₹1,800-2,200 per 100 nuts
  { crop: 'Coconut (ತೆಂಗಿನಕಾಯಿ)', unit: 'per 100 nuts', price: '₹2,050', change: '+₹80', trend: 'up', market: 'APMC Tumkuru', img: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=150&q=80' },
  // MSP 2025-26: Groundnut ₹6,783/quintal; market ~₹6,000-7,000
  { crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal', price: '₹6,650', change: '-₹130', trend: 'down', market: 'APMC Chitradurga', img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=150&q=80' },
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