import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { ArrowLeft, MapPin, Sprout, X } from 'lucide-react'
import * as Icons from 'lucide-react'
import { districtData } from '../data/districtsData'
import districtImages from '../data/districtImages.json'
import { districtCropsMap, cropImageMap } from '../data/districtCrops'
import cropInfoMap from '../data/cropInfo.json'

// Helper function to map icons to rich Unsplash images
const getTopicImage = (iconName) => {
  const mapping = {
    // Religion & Monuments
    Landmark: 'https://images.unsplash.com/photo-1621588698506-6966144e5cc5?w=800&q=80', // temple/mosque/shrine
    Castle: 'https://images.unsplash.com/photo-1592631526484-90a427cebf04?w=800&q=80', // fort/palace
    Church: 'https://images.unsplash.com/photo-1548625361-b4fceae761f0?w=800&q=80', // church
    Milestone: 'https://images.unsplash.com/photo-1610410425316-db50672e1281?w=800&q=80', // carving
    
    // Nature & Water
    Droplet: 'https://images.unsplash.com/photo-1549479361-ec236b2839dc?w=800&q=80', // waterfall
    Droplets: 'https://images.unsplash.com/photo-1549479361-ec236b2839dc?w=800&q=80',
    Waves: 'https://images.unsplash.com/photo-1600208537475-680ef0a3240e?w=800&q=80', // river
    Umbrella: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80', // beach
    
    // Mountains & Landscape
    Mountain: 'https://images.unsplash.com/photo-1602490538962-d9f2c3d520be?w=800&q=80', // hills/monolith
    SunDim: 'https://images.unsplash.com/photo-1588661858000-880ea77f52a7?w=800&q=80', // sunrise
    
    // Agriculture & Flora
    Sprout: 'https://images.unsplash.com/photo-1598284614138-0c3024c03b1f?w=800&q=80', // paddy
    Leaf: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80', // forest/spices
    Trees: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    Nut: 'https://images.unsplash.com/photo-1571168233519-79a0ebf350c3?w=800&q=80', // coconut
    Apple: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80', // mango/fruit
    Citrus: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=800&q=80', // lemon
    Flower: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=800&q=80', // flowers
    Flower2: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80', // sunflower
    Flame: 'https://images.unsplash.com/photo-1588079032607-bb53198de7e5?w=800&q=80', // pepper
    Coffee: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80', // coffee
    
    // Wildlife
    Bird: 'https://images.unsplash.com/photo-1611086208572-c23d069b3f46?w=800&q=80',
    PawPrint: 'https://images.unsplash.com/photo-1585250495393-272e50dcff8e?w=800&q=80', // elephant/wildlife
    Bug: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80', // silkworm
    
    // Industry & Art
    Sparkles: 'https://images.unsplash.com/photo-1584988698160-f4f7d7301c36?w=800&q=80', // silk
    Hammer: 'https://images.unsplash.com/photo-1587393437505-88debeec674b?w=800&q=80', // mining
    Zap: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', // power
    Factory: 'https://images.unsplash.com/photo-1539186634563-39846de6bc38?w=800&q=80', // industry
    Plane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', // airport
    Laptop: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', // tech
    Rocket: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80', // space
    Shirt: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80', // garments
    Utensils: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80', // pottery/cooking
    Smile: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=800&q=80', // toys/health
    Printer: 'https://images.unsplash.com/photo-1563604018260-1d89f8d951df?w=800&q=80', // printing
    Wind: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80', // wind
    
    // Culture & Food
    Palette: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80', // culture/festivals
    Drama: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?w=800&q=80', // dance
    Film: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', // movies
    Music: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', // music
    BookOpen: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80', // literature
    Book: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
    GraduationCap: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', // university
    Sword: 'https://images.unsplash.com/photo-1580130601254-05fa235abeab?w=800&q=80', // sword
    Shield: 'https://images.unsplash.com/photo-1590081273919-4cb5038c3c13?w=800&q=80', // shield
    Cookie: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', // sweets
    Shell: 'https://images.unsplash.com/photo-1597555027581-2c0623d2cb7c?w=800&q=80', // seafood
    GlassWater: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80', // milk
    Gem: 'https://images.unsplash.com/photo-1614081699925-50284ab91ed0?w=800&q=80', // wealth
    Image: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&q=80',
    MapPin: 'https://images.unsplash.com/photo-1516483638261-f40889223023?w=800&q=80',
    Sun: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80'
  };

  return mapping[iconName] || 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&q=80';
}

export default function DistrictPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const [selectedCropInfo, setSelectedCropInfo] = useState(null)
  
  const district = districtData[id]

  if (!district) {
    return (
      <div style={{ padding: 100, textAlign: 'center', color: '#fff', background: '#0f172a', minHeight: '100vh' }}>
        <h2>District not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    )
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .district-content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .district-page-hero {
          background: ${district.bg};
          padding: 80px 48px;
          position: relative;
          overflow: hidden;
          color: #fff;
        }
        .district-hero-inner {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .district-info-tape {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 48px;
          display: flex;
          gap: 40px;
        }
        .crops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 24px;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }

        @media (max-width: 768px) {
          .district-content-container {
            padding: 0 16px !important;
          }
          .district-page-hero {
            padding: 40px 16px !important;
          }
          .district-hero-inner {
            flex-direction: column !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .district-info-tape {
            padding: 16px !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .crops-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) !important;
            gap: 12px !important;
          }
          .crop-card-img {
            width: 60px !important;
            height: 60px !important;
          }
          .highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
      
      {/* ── HERO SECTION ── */}
      <div className="district-page-hero">
        {/* Subtle patterned overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
 
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <button
            onClick={() => navigate('/')}
            style={{ 
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 30, 
              padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
              marginBottom: 40, transition: 'background 0.2s', backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <ArrowLeft size={16} /> Back to Map
          </button>
 
          <div className="district-hero-inner">
            <div className="district-hero-emoji" style={{ 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: 24, width: 120, height: 120, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
              flexShrink: 0
            }}>
              {(() => {
                const IconComponent = Icons[district.emoji] || MapPin;
                return <IconComponent size={64} style={{ color: '#fff' }} />;
              })()}
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                <MapPin size={14} /> Karnataka State
              </div>
              <h1 style={{ fontSize: 48, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-1px' }}>
                {id} District
              </h1>
              <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', margin: 0, fontWeight: 500 }}>
                {district.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* ── INFO TAPE ── */}
      <div style={{ background: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="district-info-tape">
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Primary Agriculture</div>
            <div style={{ fontSize: 16, color: '#4ade80', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sprout size={18} /> {district.crop}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Famous For</div>
            <div style={{ fontSize: 16, color: '#f1f5f9', fontWeight: 700 }}>{district.tagline.split('—')[0].trim()}</div>
          </div>
        </div>
      </div>
 
      {/* ── MAJOR CROPS SECTION ── */}
      {districtCropsMap[id] && (
        <div className="district-content-container" style={{ marginTop: 64 }}>
          <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Major Crops in {id}</h2>
          <div className="crops-grid">
            {districtCropsMap[id].map((crop, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16, padding: 16, textAlign: 'center', cursor: 'pointer',
                  transition: 'transform 0.2s, background 0.2s'
                }}
                onClick={() => setSelectedCropInfo(cropInfoMap[crop])}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div className="crop-card-img" style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', transition: 'all 0.2s ease' }}>
                  <img 
                    src={cropImageMap[crop] || cropInfoMap[crop]?.image || `/crops/${crop.replace(/\s+/g, '_')}.jpg`} 
                    alt={crop} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{crop}</div>
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* ── HIGHLIGHTS GRID ── */}
      <div className="district-content-container" style={{ marginTop: 64, marginBottom: 64 }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Explore {id}</h2>
        
        <div className="highlights-grid">
          {district.highlights.map((h, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: 24, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.4)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            }}>
              {/* Productive Real Image mapped from icon */}
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={(districtImages[id] && districtImages[id][h.title]) || getTopicImage(h.icon)} 
                  alt={h.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = getTopicImage(h.icon); }}
                />
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                  borderRadius: '50%', width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  {(() => {
                    const IconComp = Icons[h.icon] || MapPin;
                    return <IconComp size={22} style={{ color: '#eab308' }} />;
                  })()}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 28 }}>
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 12px 0' }}>{h.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Spacer */}
      <div style={{ height: 64 }}></div>

      {/* Crop Info Modal */}
      {selectedCropInfo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(4px)'
        }} onClick={() => setSelectedCropInfo(null)}>
          <div style={{
            background: '#1e293b', borderRadius: 20, padding: 32, maxWidth: 450, width: '100%',
            position: 'relative', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCropInfo(null)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', width: 32, height: 32, borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
            ><X size={16} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '3px solid #4ade80' }}>
                <img src={selectedCropInfo.image} alt={selectedCropInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 6px 0' }}>{selectedCropInfo.name}</h3>
                <span style={{ background: '#064e3b', color: '#34d399', padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>Major Crop</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
              {typeof selectedCropInfo.description === 'string' ? selectedCropInfo.description : (selectedCropInfo.description[lang] || selectedCropInfo.description.en)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
