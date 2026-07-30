import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { districtData } from '../data/districtsData'

// Helper function to map icons to rich Unsplash images
const getTopicImage = (icon) => {
  const mapping = {
    // Religion & Monuments
    '🛕': 'https://images.unsplash.com/photo-1621588698506-6966144e5cc5?w=800&q=80', // temple
    '⛩️': 'https://images.unsplash.com/photo-1600082226252-4ce084610114?w=800&q=80', // architecture
    '🕌': 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80', // mosque
    '⛪': 'https://images.unsplash.com/photo-1548625361-b4fceae761f0?w=800&q=80', // church
    '🏛️': 'https://images.unsplash.com/photo-1560613280-7b56088d5e0d?w=800&q=80', // ancient ruins
    '🏰': 'https://images.unsplash.com/photo-1592631526484-90a427cebf04?w=800&q=80', // fort
    '🗿': 'https://images.unsplash.com/photo-1610410425316-db50672e1281?w=800&q=80', // statue/carving
    '🕍': 'https://images.unsplash.com/photo-1567156972051-91a97d10e53a?w=800&q=80', // shrine
    
    // Nature & Water
    '💧': 'https://images.unsplash.com/photo-1549479361-ec236b2839dc?w=800&q=80', // waterfall
    '🌊': 'https://images.unsplash.com/photo-1600208537475-680ef0a3240e?w=800&q=80', // river/beach
    '💦': 'https://images.unsplash.com/photo-1549479361-ec236b2839dc?w=800&q=80', // waterfall
    '🏖️': 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80', // beach
    
    // Mountains & Landscape
    '🏔️': 'https://images.unsplash.com/photo-1602490538962-d9f2c3d520be?w=800&q=80', // hills
    '🌄': 'https://images.unsplash.com/photo-1588661858000-880ea77f52a7?w=800&q=80', // sunrise hills
    '⛰️': 'https://images.unsplash.com/photo-1602490538962-d9f2c3d520be?w=800&q=80', // hills
    '🪨': 'https://images.unsplash.com/photo-1516483638261-f40889223023?w=800&q=80', // rocks
    
    // Agriculture & Flora
    '🌾': 'https://images.unsplash.com/photo-1598284614138-0c3024c03b1f?w=800&q=80', // paddy
    '🌿': 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80', // forest/spices
    '🌴': 'https://images.unsplash.com/photo-1601002220464-96f7c32fa1d5?w=800&q=80', // trees
    '🌳': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80', // nature
    '🥥': 'https://images.unsplash.com/photo-1571168233519-79a0ebf350c3?w=800&q=80', // coconut
    '🥭': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80', // mango
    '🍇': 'https://images.unsplash.com/photo-1596356501170-657738f61539?w=800&q=80', // grapes
    '🍋': 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=800&q=80', // lemon
    '🍅': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80', // pomegranate/red fruit
    '🥔': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80', // potatoes
    '🧅': 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=800&q=80', // onions
    '🍌': 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80', // banana
    '🌻': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80', // sunflower
    '🌺': 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=800&q=80', // flowers
    '🌶️': 'https://images.unsplash.com/photo-1588079032607-bb53198de7e5?w=800&q=80', // spices
    '☕': 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80', // coffee
    
    // Wildlife
    '🐅': 'https://images.unsplash.com/photo-1577789311090-bdf14fb15530?w=800&q=80', // tiger
    '🐘': 'https://images.unsplash.com/photo-1585250495393-272e50dcff8e?w=800&q=80', // elephant
    '🐻': 'https://images.unsplash.com/photo-1589656966895-2f332cb74041?w=800&q=80', // bear
    '🐊': 'https://images.unsplash.com/photo-1519089069695-1f19f187a544?w=800&q=80', // croc
    '🦅': 'https://images.unsplash.com/photo-1611086208572-c23d069b3f46?w=800&q=80', // bird
    '🦟': 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80', // bird sanctuary
    
    // Industry & Art
    '🧵': 'https://images.unsplash.com/photo-1584988698160-f4f7d7301c36?w=800&q=80', // silk/textile
    '🐛': 'https://images.unsplash.com/photo-1555577626-4447ef1fcf84?w=800&q=80', // silkworm/nature
    '⛏️': 'https://images.unsplash.com/photo-1587393437505-88debeec674b?w=800&q=80', // mining
    '⚡': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', // dam/power
    '🏭': 'https://images.unsplash.com/photo-1539186634563-39846de6bc38?w=800&q=80', // industry
    '✈️': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', // airport
    '💻': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', // tech
    '🚀': 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80', // space
    '👖': 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80', // garments
    '🏺': 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80', // pottery/art
    '🧸': 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=800&q=80', // toys
    '🖨️': 'https://images.unsplash.com/photo-1563604018260-1d89f8d951df?w=800&q=80', // printing
    '🌬️': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80', // wind farm
    
    // Culture & Food
    '🎨': 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80', // festival/culture
    '🎭': 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?w=800&q=80', // dance
    '🎬': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', // movies/hills
    '🎵': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', // music
    '📖': 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80', // literature
    '📚': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', // madrasa/library
    '🎓': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', // university
    '⚔️': 'https://images.unsplash.com/photo-1580130601254-05fa235abeab?w=800&q=80', // fort/sword
    '🛡️': 'https://images.unsplash.com/photo-1590081273919-4cb5038c3c13?w=800&q=80', // fort/defense
    '🍬': 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', // sweets
    '🥞': 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=800&q=80', // dosa
    '🍛': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80', // cuisine
    '🍲': 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?w=800&q=80', // dal/food
    '🦀': 'https://images.unsplash.com/photo-1597555027581-2c0623d2cb7c?w=800&q=80', // seafood
    '🥛': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80', // milk/dairy
    '🥜': 'https://images.unsplash.com/photo-1574895000570-07e05eb4bb34?w=800&q=80', // nuts/cashew
    '💎': 'https://images.unsplash.com/photo-1614081699925-50284ab91ed0?w=800&q=80', // cotton/groundnut
  };

  // Fallback beautiful Karnataka generic image
  return mapping[icon] || 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&q=80';
}

export default function DistrictPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
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
      
      {/* ── HERO SECTION ── */}
      <div className="district-page-hero" style={{ 
        background: district.bg, 
        padding: '80px 48px', 
        position: 'relative',
        overflow: 'hidden',
        color: '#fff'
      }}>
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

          <div className="district-hero-inner" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div className="district-hero-emoji" style={{ 
              fontSize: 72, background: 'rgba(255,255,255,0.15)', 
              borderRadius: 24, width: 120, height: 120, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)'
            }}>
              {district.emoji}
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
        <div className="district-info-tape" style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 48px', display: 'flex', gap: 40 }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Primary Agriculture</div>
            <div style={{ fontSize: 16, color: '#4ade80', fontWeight: 700 }}>🌿 {district.crop}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Famous For</div>
            <div style={{ fontSize: 16, color: '#f1f5f9', fontWeight: 700 }}>{district.tagline.split('—')[0].trim()}</div>
          </div>
        </div>
      </div>

      {/* ── HIGHLIGHTS GRID ── */}
      <div className="district-highlights-container" style={{ maxWidth: 1200, margin: '64px auto', padding: '0 48px' }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Explore {id}</h2>
        
        <div className="district-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
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
                  src={getTopicImage(h.icon)} 
                  alt={h.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                  borderRadius: '50%', width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  {h.icon}
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
    </div>
  )
}
