import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { districtData } from '../data/districtsData'
import { useLanguage } from '../context/LanguageContext'
import { useVoice } from '../context/VoiceContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import {
  ArrowRight, Wheat, Users, Star, MapPin, Landmark, Globe, MessageCircle, Share2, Mail, Phone, ExternalLink, Building2, GraduationCap, X
} from 'lucide-react'

// ── District Knowledge Base ──────────────────────────────────


const districtList = Object.keys(districtData).sort((a, b) => a.localeCompare(b))



const testimonials = [
  { name: 'ರಾಮಪ್ಪ ಗೌಡ', loc: 'Mysuru', text: 'GramSetu helped me apply for PM Kisan in minutes. I got ₹2,000 in 3 days!', avatar: 'ರ' },
  { name: 'Savitha Devi', loc: 'Mandya', text: 'My Gruha Lakshmi application was approved within a week. Very helpful.', avatar: 'S' },
  { name: 'Basappa K.', loc: 'Tumkuru', text: 'Checked APMC prices daily. Sold my ragi at the best rate this season.', avatar: 'B' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const { speak } = useVoice()
  const [selectedRole, setSelectedRole] = useState('farmer')
  const [newsletterPhone, setNewsletterPhone] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('Join') // 'Join' | 'Loading' | 'Joined'
  const [infoModal, setInfoModal] = useState({ isOpen: false, title: '', content: '' })

  const handleNewsletterJoin = async () => {
    if (!newsletterPhone || newsletterPhone.trim().length < 10) {
      alert(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಮಾನ್ಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid mobile number.')
      return
    }
    setNewsletterStatus('Loading')
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        phone: newsletterPhone.trim(),
        timestamp: serverTimestamp()
      })
      setNewsletterStatus('Joined')
    } catch (e) {
      console.error("Error saving subscriber:", e)
      alert(lang === 'kn' ? 'ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'An error occurred. Please try again.')
      setNewsletterStatus('Join')
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('official_id')) {
      navigate('/dashboard/official')
    } else if (window.localStorage.getItem('citizen_email') || window.localStorage.getItem('citizen_phone')) {
      navigate('/dashboard/villager')
    }
  }, [navigate])

  // Welcome message — fires on every page load and again on language switch
  // Welcome message — greets only once per session, but responds to manual language switches
  const prevLang = useRef(lang)
  useEffect(() => {
    const sessionWelcomed = sessionStorage.getItem('gramsetu_welcomed')
    const isLangChange = prevLang.current !== lang
    prevLang.current = lang

    // Skip greeting if already welcomed in this session and they didn't just click to change language
    if (sessionWelcomed && !isLangChange) {
      return
    }

    sessionStorage.setItem('gramsetu_welcomed', 'true')

    const welcomeMsg = lang === 'kn'
      ? 'ಗ್ರಾಮ ಸೇತುಗೆ ಸ್ವಾಗತ. ನೀವು ಇಲ್ಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆ ಮಾಹಿತಿ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆ, ಮತ್ತು ದೂರು ಸಲ್ಲಿಸಬಹುದು. ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ.'
      : lang === 'hi'
      ? 'ग्राम सेतु में आपका स्वागत है. यहाँ आप सरकारी योजनाएं, बाजार भाव और शिकायत सेवा पा सकते हैं. माइक दबाकर बात करें.'
      : 'Welcome to GramSetu. Here you can access government schemes, APMC market prices, and file complaints. Tap the microphone to talk to me anytime.'

    // Start speaking almost immediately (500ms) after the page loads
    const timer = setTimeout(() => speak(welcomeMsg), 500)
    return () => clearTimeout(timer)
  }, [lang, speak])

  return (
    <div style={{ fontFamily: "'Inter', 'Noto Sans Kannada', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes floatReverse {
          0% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: floatReverse 6s ease-in-out infinite;
        }
        .pulse-green {
          animation: pulseGlow 2s infinite;
        }
        .hover-lift {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important;
        }
      `}</style>



      {/* ── NAV ── */}
      <nav className="landing-top-nav" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)'
      }}>
        <div className="landing-nav-left" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
          }}>
            <Wheat size={20} color="#fff" strokeWidth={2} />
          </div>
          <div>
            <div className="landing-nav-title" style={{ fontWeight: 800, fontSize: 18, color: '#111827', lineHeight: 1.1 }}>{t('appName')}</div>
            <div className="landing-nav-subtitle" style={{ fontSize: 11, color: '#6b7280' }}>{t('appSubtitle')}</div>
          </div>
        </div>
        <div className="landing-nav-right" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LanguageSwitcher variant="topbar-style" />
          <ThemeToggle />
          <button
            onClick={() => navigate('/login/villager')}
            className="hover-lift"
            style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '10px 16px', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            Login →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="landing-hero-section" style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d4b2f 100%)',
        position: 'relative', overflow: 'hidden', padding: '60px 24px', gap: 32
      }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Left content */}
        <div className="animate-fade-in" style={{ flex: '1 1 280px', maxWidth: 580, position: 'relative', zIndex: 1 }}>
          <div className="pulse-green" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)',
            borderRadius: 50, padding: '6px 16px', marginBottom: 28
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
            <span style={{ color: '#86efac', fontSize: 13, fontWeight: 600 }}>{t('heroAvailable')}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(30px, 6vw, 52px)', fontWeight: 900, lineHeight: 1.12, color: '#fff', marginBottom: 16, letterSpacing: -1 }}>
            {t('heroTitle1')}{' '}
            <span style={{ background: 'linear-gradient(90deg, #4ade80, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('heroTitle2')}
            </span>{' '}
            {t('heroTitle3')}
          </h2>

          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 24, maxWidth: 460 }}>
            {t('heroDesc')}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
            {[
              { val: t('stat1Val'), label: t('stat1Label') },
              { val: t('stat2Val'), label: t('stat2Label') },
              { val: t('stat3Val'), label: t('stat3Label') },
            ].map((s, i) => (
              <div key={i} className="hover-lift" style={{ cursor: 'default' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Role Selector */}
          <div style={{
            display: 'inline-flex', background: 'rgba(255,255,255,0.08)',
            borderRadius: 14, padding: 4, marginBottom: 20,
            border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)'
          }}>
            {[
              { id: 'farmer',   Icon: Wheat,     label: 'Farmer / Student' },
              { id: 'official', Icon: Building2, label: 'Govt Employee' },
            ].map(role => {
              const RoleIcon = role.Icon
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    padding: '10px 22px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                    cursor: 'pointer', transition: 'all 0.25s ease', border: 'none',
                    display: 'flex', alignItems: 'center', gap: 7,
                    background: selectedRole === role.id
                      ? (role.id === 'farmer'
                          ? 'linear-gradient(135deg, #16a34a, #15803d)'
                          : 'linear-gradient(135deg, #3b82f6, #2563eb)')
                      : 'transparent',
                    color: selectedRole === role.id ? '#fff' : 'rgba(255,255,255,0.6)',
                    boxShadow: selectedRole === role.id ? '0 4px 16px rgba(0,0,0,0.3)' : 'none',
                    transform: selectedRole === role.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <RoleIcon size={15} strokeWidth={2} />
                  {role.label}
                </button>
              )
            })}
          </div>

          {/* CTA button */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(selectedRole === 'farmer' ? '/login/villager' : '/login/official')}
              className="hover-lift"
              style={{
                background: selectedRole === 'farmer'
                  ? 'linear-gradient(135deg, #16a34a, #15803d)'
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff', border: 'none', borderRadius: 12,
                padding: '14px 32px', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: selectedRole === 'farmer'
                  ? '0 8px 24px rgba(22,163,74,0.4)'
                  : '0 8px 24px rgba(59,130,246,0.4)'
              }}
            >
              {selectedRole === 'farmer' ? t('ctaVillager') : t('ctaOfficial')} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="hero-right-img animate-float" style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 300 }}>
          <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: 340, borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
              alt="Karnataka agricultural fields"
              style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', padding: '14px 18px' }}>
              <div style={{ color: '#4ade80', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✓ LIVE — Karnataka Portal</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>ಸಾವಿರಾರು ರೈತರು ಸಂಪರ್ಕಿತರು</div>
            </div>
          </div>

          {/* Floating stat card — users not scheme data */}
          <div className="animate-float-reverse" style={{
            position: 'absolute', left: 20, top: 40,
            background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 16, padding: '14px 18px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} color="#4ade80" />
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Active Community</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>Growing Daily</div>
                <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>↑ Citizens Online</div>
              </div>
            </div>
          </div>

          {/* Floating schemes card */}
          <div className="animate-float" style={{
            position: 'absolute', left: 0, bottom: 20,
            background: 'rgba(59,130,246,0.15)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 16, padding: '12px 16px', width: 210,
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Landmark size={20} color="#60a5fa" />
              <div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>30+ Active Schemes</div>
                <div style={{ color: '#93c5fd', fontSize: 11 }}>PM Kisan · Raitha Siri · Gruha Lakshmi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISTRICT EXPLORER ── */}
      <section className="district-explorer-section" id="district-explorer" style={{ background: '#0f172a', padding: '48px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(22,163,74,0.12)', color: '#4ade80',
            borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 700, marginBottom: 14,
            border: '1px solid rgba(22,163,74,0.25)'
          }}>
            <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            District Explorer — Karnataka
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 900, color: '#fff', marginBottom: 10, letterSpacing: -0.5 }}>
            Discover Your District
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
            Click any district to explore its culture, famous places, unique crops & history
          </p>
        </div>

        {/* District pill buttons in 3 lines max */}
        <div className="district-pill-grid" style={{ 
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', 
          maxWidth: 960, margin: '0 auto' 
        }}>
          {districtList.map(d => {
            const info = districtData[d] || { emoji: '📍', bg: '#333' }
            return (
              <Link
                key={d}
                to={`/district/${d}`}
                style={{
                  padding: '10px 22px', borderRadius: 30, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)', color: '#f1f5f9',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = info.bg;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = '#f1f5f9';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <MapPin size={13} style={{ opacity: 0.7, flexShrink: 0 }} /> {d}
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" style={{ background: '#fff', padding: '52px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-block', background: '#f0fdf4', color: '#16a34a',
            borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 700, marginBottom: 14
          }}>Core Features</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#0f172a', marginBottom: 12, letterSpacing: -0.5 }}>{t('featTitle')}</h2>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>{t('featSub')}</p>
        </div>

        <div className="features-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
          {[
            {
              id: 'schemes',
              img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=700&q=80',
              badge: '30+ Schemes',
              badgeColor: '#16a34a',
              title: 'Government Schemes & Scholarships',
              desc: 'Browse 30+ live schemes — PM Kisan, Raitha Siri, Gruha Lakshmi, Krishi Bhagya. Check eligibility in seconds and apply directly from your phone.',
              tag: '₹6,000 PM Kisan · Raitha Siri ₹10,000/ha'
            },
            {
              id: 'apmc',
              img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=700&q=80',
              badge: 'Live APMC Rates',
              badgeColor: '#0369a1',
              title: 'Real-Time Market Prices (APMC)',
              desc: 'Today\'s MSP and APMC rates for 20+ crops. Compare prices across markets — Bengaluru, Shimoga, Mysuru, Dharwad — and sell at the best rate.',
              tag: 'Ragi ₹3,846/qtl · Areca ₹42,000/qtl'
            },
            {
              id: 'alerts',
              img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80',
              badge: 'Govt Alerts',
              badgeColor: '#7c3aed',
              title: 'Announcements & Melas',
              desc: 'Get urgent government alerts — Ragi MSP procurement registration, free Krishi Melas, weather advisories, ration card renewals.',
              tag: 'SMS Alerts · Krishi Melas · MSP Notices'
            },
            {
              id: 'complaints',
              img: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=700&q=80',
              badge: 'Auto-Escalation',
              badgeColor: '#dc2626',
              title: 'Complaint Filing & Tracking',
              desc: 'File complaints with your phone camera for Water Supply, BESCOM electricity, Roads. Complaints auto-escalate to Taluk officials if unresolved.',
              tag: 'Taluk Auto-Escalation · 8 Categories'
            },
            {
              id: 'districts',
              img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80',
              badge: 'All 31 Districts',
              badgeColor: '#d97706',
              title: 'District Heritage Explorer',
              desc: 'Discover the rich cultural heritage, famous landmarks, GI-tagged products, major crops, and tourism highlights for all 31 districts of Karnataka.',
              tag: 'Mysuru · Kodagu · Belagavi · Ballari...'
            },
          ].map((f, i) => (
            <div
              key={i}
              onClick={() => navigate(`/feature/${f.id}`)}
              style={{
                borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                border: '1px solid #e5e7eb',
                background: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              {/* Real image */}
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: f.badgeColor, color: '#fff',
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>{f.badge}</div>
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(255,255,255,0.9)', color: '#0f172a',
                  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <ExternalLink size={14} />
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, margin: '0 0 14px 0' }}>{f.desc}</p>
                <div style={{ fontSize: 12, fontWeight: 700, color: f.badgeColor, background: `${f.badgeColor}15`, borderRadius: 8, padding: '6px 10px', display: 'inline-block' }}>{f.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" style={{ background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', padding: '48px 24px', borderTop: '1px solid #d1fae5' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>ರೈತರ ಮಾತು — What Farmers Say</h2>
          <p style={{ fontSize: 15, color: '#6b7280' }}>Real stories from Karnataka's rural communities</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {testimonials.map((t2, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20, padding: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #d1fae5'
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {[...Array(5)].map((_, si) => <Star key={si} size={14} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>"{t2.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', fontSize: 16, fontWeight: 700,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>{t2.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{t2.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{t2.loc}, Karnataka</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#0a0f1c', padding: '40px 24px 24px', color: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, maxWidth: 1200, margin: '0 auto', marginBottom: 32 }}>
          
          {/* Brand Col */}
          <div onClick={() => setInfoModal({
            isOpen: true,
            title: 'GramSetu',
            content: 'GramSetu is a unified digital gateway designed to connect rural citizens and farmers with Karnataka government services, APMC daily market prices, and secure grievance registration.'
          })} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #16a34a, #15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wheat size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{t('appName')}</div>
                <div style={{ color: '#4ade80', fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>KARNATAKA GOVT. INITIATIVE</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Empowering Karnataka's 6 crore rural citizens with seamless digital access to schemes, APMC prices, and civic services.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[Globe, MessageCircle, Share2].map((Icon, idx) => (
                <span key={idx} style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}>
                  <Icon size={20} />
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                Home
              </span>
              <span onClick={() => setInfoModal({
                isOpen: true,
                title: 'About GramSetu',
                content: 'GramSetu is a unified digital portal developed by the Government of Karnataka to bridge the gap between rural citizens and essential services. It simplifies access to agricultural schemes, crop market prices (APMC), and grievance redressal.'
              })} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                About GramSetu
              </span>
              <span onClick={() => navigate('/login/villager')} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                State Schemes
              </span>
              <span onClick={(e) => { e.preventDefault(); document.getElementById('district-explorer')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                District Explorer
              </span>
              <span onClick={() => navigate('/login/villager')} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                APMC Daily Rates
              </span>
            </div>
          </div>

          {/* Legal & Policies (replaces Contact Us) */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Legal & Policies</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span onClick={() => setInfoModal({
                isOpen: true,
                title: 'Privacy Policy',
                content: 'We value your privacy. GramSetu does not sell or share citizen data. All information submitted (such as complaints, phone numbers, and land details) is encrypted and processed securely through official government databases.'
              })} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                Privacy Policy
              </span>
              <span onClick={() => setInfoModal({
                isOpen: true,
                title: 'Terms of Use',
                content: 'By using GramSetu, you agree to access official government portals and services in accordance with fair-use guidelines. Misuse of the grievance system or submitting false complaints is subject to review by local officials.'
              })} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                Terms of Use
              </span>
              <span onClick={() => setInfoModal({
                isOpen: true,
                title: 'Accessibility Statement',
                content: 'GramSetu is built to be accessible to all, including users with visual or physical impairments. It features multilingual support, custom text-to-speech AI guidance, and optimized high-contrast components.'
              })} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ade80'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                Accessibility
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Stay Updated</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              Subscribe to SMS alerts for Krishi Melas and MSP procurement dates.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                type="text" 
                placeholder="Mobile Number" 
                value={newsletterPhone}
                onChange={e => setNewsletterPhone(e.target.value)}
                disabled={newsletterStatus === 'Joined' || newsletterStatus === 'Loading'}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: 8, color: '#fff', fontSize: 14, width: '100%', outline: 'none' }} 
              />
              <button 
                onClick={handleNewsletterJoin}
                disabled={newsletterStatus === 'Joined' || newsletterStatus === 'Loading'}
                style={{ 
                  background: newsletterStatus === 'Joined' ? '#15803d' : newsletterStatus === 'Loading' ? '#4b5563' : '#16a34a', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '10px 16px', 
                  borderRadius: 8, 
                  fontWeight: 600, 
                  cursor: newsletterStatus === 'Joined' ? 'default' : 'pointer',
                  minWidth: '80px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {newsletterStatus === 'Joined' ? (
                  <><span style={{ fontSize: 18 }}>✓</span><span>Subscribed</span></>
                ) : newsletterStatus === 'Loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center' }}>
            © {new Date().getFullYear()} Karnataka e-Governance Services Ltd. (KeGSL). All rights reserved.
          </div>
        </div>
      </footer>

      {/* ── INFO MODAL DIALOG ── */}
      {infoModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }} onClick={() => setInfoModal({ isOpen: false, title: '', content: '' })}>
          <div style={{
            background: '#fff',
            color: '#1e293b',
            padding: '28px',
            borderRadius: '20px',
            maxWidth: '450px',
            width: '100%',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setInfoModal({ isOpen: false, title: '', content: '' })}
              style={{
                position: 'absolute',
                top: 20, right: 20,
                background: '#f1f5f9',
                border: 'none',
                width: 32, height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
            >
              <X size={16} />
            </button>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', marginTop: 0 }}>
              {infoModal.title}
            </h3>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              {infoModal.content}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
