import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Wheat, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

const featureContent = {
  schemes: {
    title: 'Government Schemes & Scholarships',
    desc: 'Access and apply for all Karnataka state government schemes like PM Kisan, Raitha Siri, and Gruha Lakshmi directly from your phone.',
    image: 'https://images.unsplash.com/photo-1544390041-3701389886db?w=1200&q=80',
    details: [
      'Apply for PM Kisan and receive ₹6,000 annually.',
      'Access Raitha Siri for ₹10,000/hectare assistance for minor millets.',
      'Track your Gruha Lakshmi applications in real-time.',
      'Apply for pre-matric and post-matric scholarships for SC/ST students.'
    ]
  },
  apmc: {
    title: 'Real-Time Market Prices (APMC)',
    desc: 'Get live daily market prices for all major crops across all APMC markets in Karnataka.',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80',
    details: [
      'Compare Ragi, Areca Nut, and Coffee prices across Mysuru, Shimoga, and Dharwad.',
      'Get notified when prices hit your target.',
      'Access historical price trends to make informed selling decisions.',
      'Direct links to nearest APMC market locations.'
    ]
  },
  alerts: {
    title: 'Announcements & Melas',
    desc: 'Never miss an important government deadline. Stay updated on MSP procurements and Krishi Melas.',
    image: 'https://images.unsplash.com/photo-1577563908411-50cb98976fea?w=1200&q=80',
    details: [
      'Instant SMS alerts for Ragi MSP procurement registration.',
      'Information and dates for upcoming Krishi Melas in your district.',
      'Weather advisories and extreme weather alerts.',
      'Reminders for ration card renewals and document submissions.'
    ]
  },
  complaints: {
    title: 'Complaint Filing & Tracking',
    desc: 'File civic complaints easily with photo evidence. Auto-escalation ensures your voice is heard.',
    image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=1200&q=80',
    details: [
      'Report issues with Water Supply, BESCOM, or Public Roads.',
      'Take a photo and upload it directly from your smartphone.',
      'Complaints unresolved after 7 days auto-escalate to Taluk level officials.',
      'Track the live status and resolution of your ticket.'
    ]
  },
  districts: {
    title: 'District Heritage Explorer',
    desc: 'Explore the rich culture, major crops, and famous landmarks of all 31 districts of Karnataka.',
    image: 'https://images.unsplash.com/photo-1596422846543-74c6eb24f6f8?w=1200&q=80',
    details: [
      'Discover GI-tagged products from your region.',
      'Find the best tourist spots and historical temples.',
      'Learn about the primary agriculture and cash crops for each district.',
      'Detailed guides to local arts, culture, and traditions.'
    ]
  }
}

export default function FeatureDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  
  const content = featureContent[id]

  if (!content) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
        <h2>Feature not found</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 20px', borderRadius: 8, background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Inter', 'Noto Sans Kannada', sans-serif", background: '#f8fafc', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 48px', background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontWeight: 600, marginRight: 16 }}>
            <ArrowLeft size={18} /> Back
          </button>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
          }}>
            <Wheat size={20} color="#fff" strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#111827', lineHeight: 1.1 }}>{t('appName')}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{t('appSubtitle')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <LanguageSwitcher variant="topbar-style" />
          <button
            onClick={() => navigate('/login/villager')}
            style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '10px 22px', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            Login →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative', height: 400, width: '100%',
        backgroundImage: `url(${content.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0f172a, rgba(15,23,42,0.2))'
        }}></div>
        <div style={{ position: 'absolute', bottom: 60, left: '10%', maxWidth: 800 }}>
          <div style={{ background: '#4ade80', color: '#064e3b', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
            Featured Service
          </div>
          <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 900, marginBottom: 16, lineHeight: 1.1, letterSpacing: -1 }}>
            {content.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, lineHeight: 1.6, maxWidth: 600 }}>
            {content.desc}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ maxWidth: 1000, margin: '-40px auto 60px', position: 'relative', zIndex: 10, padding: '0 24px' }}>
        <div style={{
          background: '#fff', borderRadius: 24, padding: 48,
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48
        }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>What you can do</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {content.details.map((detail, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2, background: '#f0fdf4', color: '#16a34a', padding: 6, borderRadius: '50%' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: 40 }}>
              <button onClick={() => navigate('/login/villager')} style={{
                background: '#0f172a', color: '#fff', border: 'none', padding: '16px 32px',
                borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 12,
                boxShadow: '0 8px 20px rgba(15,23,42,0.2)'
              }}>
                Access Service Now <TrendingUp size={18} />
              </button>
            </div>
          </div>
          
          <div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24 }}>
              <ShieldCheck size={32} color="#16a34a" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Secure & Verified</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                This service is directly integrated with the Government of Karnataka's digital infrastructure. Your data is encrypted and secure.
              </p>
              <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>
                KeGSL - Government of Karnataka
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
