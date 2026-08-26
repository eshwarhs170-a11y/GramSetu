import React, { useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { useTheme } from '../context/ThemeContext';
import {
  Printer, Globe, Copy, Check, Download,
  Wheat, Sprout, Landmark, Sparkles, ExternalLink, ArrowUpRight
} from 'lucide-react';
import DemoNavHeader from '../components/DemoNavHeader';

const CARDS = [
  {
    id: 'ramappa',
    role: 'villager',
    name: 'Ramappa Gowda',
    district: 'Mysuru',
    taluk: 'Mysuru',
    gp: 'Varuna',
    village: 'Varuna Village',
    phone: '9845123456',
    email: 'ramappa.gowda@gramsetu.in',
    areaType: 'rural',
    label: 'Farmer · ರೈತ',
    kannadaName: 'ರಾಮಪ್ಪ ಗೌಡ',
    icon: Wheat,
    themeColor: '#16a34a',
    accentColor: '#22c55e',
    borderColor: '#4ade80',
    desc: 'Scan to experience GramSetu as a farmer from Varuna, Mysuru',
  },
  {
    id: 'kaveri',
    role: 'villager',
    name: 'Kaveri Amma',
    district: 'Kodagu',
    taluk: 'Madikeri',
    gp: 'Suntikoppa',
    village: 'Murnad Village',
    phone: '9845987654',
    email: 'kaveri.amma@gramsetu.in',
    areaType: 'rural',
    label: 'Farmer · ರೈತ',
    kannadaName: 'ಕಾವೇರಿ ಅಮ್ಮ',
    icon: Sprout,
    themeColor: '#0d9488',
    accentColor: '#14b8a6',
    borderColor: '#2dd4bf',
    desc: 'Scan to experience GramSetu as a farmer from Madikeri, Kodagu',
  },
  {
    id: 'pdo',
    role: 'official',
    name: 'S. R. Patil (PDO Mysuru)',
    district: 'Mysuru',
    taluk: 'Mysuru',
    gp: '',
    department: 'Rural Development & Panchayat Raj',
    email: 'pdo.mysuru@karnataka.gov.in',
    idNum: 'KA-MYS-PDO-2026-042',
    phone: '9448012345',
    label: 'Govt Official · ಅಧಿಕಾರಿ',
    kannadaName: 'ಎಸ್. ಆರ್. ಪಾಟೀಲ್ (ಪಿಡಿಒ ಮೈಸೂರು)',
    icon: Landmark,
    themeColor: '#4f46e5',
    accentColor: '#6366f1',
    borderColor: '#818cf8',
    desc: 'Scan to experience GramSetu as PDO Mysuru (Govt Official)',
  },
];

export const getCardUrl = (card, baseUrl) => {
  const params = new URLSearchParams();
  params.set('role', card.role);
  params.set('name', card.name);
  params.set('district', card.district);
  if (card.taluk) params.set('taluk', card.taluk);
  if (card.gp) params.set('gp', card.gp);
  if (card.village) params.set('village', card.village);
  if (card.phone) params.set('phone', card.phone);
  if (card.email) params.set('email', card.email);
  if (card.areaType) params.set('areaType', card.areaType);
  if (card.department) params.set('department', card.department);
  if (card.idNum) params.set('id', card.idNum);
  return `${baseUrl.replace(/\/$/, '')}/magic-login?${params.toString()}`;
};

export default function GenerateQRCards() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [publicDomain, setPublicDomain] = useState(
    window.location.hostname.includes('vercel.app')
      ? window.location.origin
      : 'https://gram-setu-one.vercel.app'
  );
  const [copiedId, setCopiedId] = useState(null);
  const [printTarget, setPrintTarget] = useState('all');

  const handlePrint = (targetId) => {
    setPrintTarget(targetId);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const copyLink = (card) => {
    const url = getCardUrl(card, publicDomain);
    navigator.clipboard.writeText(url);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadQrPng = (card) => {
    const canvas = document.getElementById(`qr-canvas-${card.id}`);
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `GramSetu-QR-${card.name.replace(/\s+/g, '-')}.png`;
    link.click();
  };

  const openMagicLoginNewTab = (card) => {
    const url = getCardUrl(card, window.location.origin);
    window.open(url, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'radial-gradient(ellipse at top, #0a0f1e 0%, #060913 100%)'
        : 'radial-gradient(ellipse at top, #f0fdf4 0%, #f8fafc 100%)',
      color: isDark ? '#fff' : '#0f172a',
      fontFamily: "'Inter', sans-serif",
      padding: '24px 16px',
      boxSizing: 'border-box',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      {/* Shared Nav Header */}
      <DemoNavHeader currentPhase="qr" />

      {/* ─── SCREEN VIEW (Hidden when printing) ─── */}
      <div className="no-print" style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
                <Sparkles size={24} />
              </div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, background: isDark ? 'linear-gradient(135deg, #fff, #38bdf8)' : 'linear-gradient(135deg, #0f172a, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Public Magic QR Passes
              </h1>
            </div>
            <p style={{ margin: '6px 0 0', color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.95rem' }}>
              Phase 3 · Scan with smartphone camera OR click "Open in New Tab" to test instantly without OTP!
            </p>
          </div>

          <button
            onClick={() => handlePrint('all')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            <Printer size={20} /> Print All 3 Cards (A4 Sheet)
          </button>
        </div>

        {/* Public Domain Selector */}
        <div style={{
          background: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.85)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 20,
          padding: '20px 24px',
          marginBottom: 36,
          backdropFilter: 'blur(12px)',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Globe size={20} color="#3b82f6" />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  Target Website URL
                </div>
                <div style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                  The QR codes will encode this URL so any phone on 4G/5G data can open it.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { label: '🌐 Live Production (Vercel)', url: 'https://gram-setu-one.vercel.app' },
                { label: '⚡ Preview Branch', url: 'https://gram-setu-git-marvel-open-day-eshwarhs170-a11ys-projects.vercel.app' },
                { label: '💻 Localhost', url: window.location.origin },
              ].map(opt => (
                <button
                  key={opt.url}
                  onClick={() => setPublicDomain(opt.url)}
                  style={{
                    background: publicDomain === opt.url
                      ? (isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.15)')
                      : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                    border: `1px solid ${publicDomain === opt.url ? '#3b82f6' : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)')}`,
                    borderRadius: 10,
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    color: publicDomain === opt.url ? '#3b82f6' : (isDark ? '#94a3b8' : '#64748b'),
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <input
              type="text"
              value={publicDomain}
              onChange={e => setPublicDomain(e.target.value)}
              style={{
                width: '100%',
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: 10,
                padding: '10px 14px',
                color: isDark ? '#38bdf8' : '#0284c7',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="https://your-public-url.vercel.app"
            />
          </div>
        </div>

        {/* 3 Interactive Cards on Screen */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
          {CARDS.map(card => {
            const url = getCardUrl(card, publicDomain);
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                style={{
                  background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                  border: `2px solid ${card.borderColor}55`,
                  borderRadius: 28,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: isDark
                    ? `0 12px 36px ${card.themeColor}22`
                    : `0 12px 30px rgba(0,0,0,0.06)`,
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 18px 40px ${card.themeColor}33`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDark ? `0 12px 36px ${card.themeColor}22` : `0 12px 30px rgba(0,0,0,0.06)`;
                }}
              >
                {/* Header Tag */}
                <div style={{
                  background: `${card.themeColor}18`,
                  border: `1px solid ${card.borderColor}66`,
                  color: card.accentColor,
                  borderRadius: 20,
                  padding: '4px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                }}>
                  {card.label}
                </div>

                {/* Lucide Icon & Name */}
                <div style={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  background: `${card.themeColor}20`,
                  border: `1px solid ${card.borderColor}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  color: card.accentColor,
                }}>
                  <IconComp size={34} strokeWidth={2} />
                </div>

                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a' }}>{card.name}</h3>
                <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.85rem', fontWeight: 600, marginTop: 2 }}>{card.kannadaName}</div>
                <div style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.8rem', marginTop: 4 }}>
                  📍 {card.village ? `${card.village}, ` : ''}{card.district} District
                </div>

                {/* Visible QR Code (SVG) */}
                <div style={{
                  margin: '20px 0',
                  padding: 16,
                  background: '#ffffff',
                  borderRadius: 20,
                  boxShadow: `0 0 30px ${card.themeColor}33`,
                  border: `2px dashed ${card.themeColor}66`,
                }}>
                  <QRCodeSVG
                    value={url}
                    size={180}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                  />
                  <div style={{ display: 'none' }}>
                    <QRCodeCanvas
                      id={`qr-canvas-${card.id}`}
                      value={url}
                      size={400}
                      level="H"
                    />
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', marginBottom: 20, lineHeight: 1.4 }}>
                  {card.desc}
                </div>

                {/* Clickable Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginTop: 'auto' }}>
                  {/* Click to open direct in browser tab */}
                  <button
                    onClick={() => openMagicLoginNewTab(card)}
                    style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      color: '#3b82f6',
                      borderRadius: 12,
                      padding: '10px 14px',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <ArrowUpRight size={16} />
                    Open Dashboard in New Tab
                  </button>

                  <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                    <button
                      onClick={() => handlePrint(card.id)}
                      style={{
                        flex: 1,
                        background: card.themeColor,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        padding: '10px 14px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        boxShadow: `0 4px 14px ${card.themeColor}44`,
                      }}
                    >
                      <Printer size={16} /> Print Card
                    </button>

                    <button
                      onClick={() => downloadQrPng(card)}
                      title="Download PNG QR Code"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                        border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
                        color: isDark ? '#cbd5e1' : '#475569',
                        borderRadius: 12,
                        padding: '10px 12px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Download size={16} />
                    </button>

                    <button
                      onClick={() => copyLink(card)}
                      title="Copy Magic Link"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                        border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
                        color: copiedId === card.id ? '#22c55e' : (isDark ? '#cbd5e1' : '#475569'),
                        borderRadius: 12,
                        padding: '10px 14px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {copiedId === card.id ? <Check size={16} /> : <Copy size={16} />}
                      {copiedId === card.id ? 'Copied' : 'Link'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ─── DEDICATED NATIVE PRINT CONTAINER ─── */}
      <div id="print-sheet" className="print-only">
        <div className={`print-grid ${printTarget === 'all' ? 'print-all-layout' : 'print-single-layout'}`}>
          {CARDS.filter(c => printTarget === 'all' || printTarget === c.id).map(card => {
            const url = getCardUrl(card, publicDomain);
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                className="print-card"
                style={{
                  borderColor: card.themeColor,
                }}
              >
                <div
                  className="print-header-bar"
                  style={{
                    backgroundColor: card.themeColor,
                  }}
                >
                  {card.role === 'official' ? '🏛️ GOVERNMENT OF KARNATAKA' : '🌾 GRAMSETU DEMO PASS'}
                </div>

                <div
                  className="print-icon-circle"
                  style={{
                    backgroundColor: `${card.themeColor}18`,
                    color: card.themeColor,
                  }}
                >
                  <IconComp size={printTarget === 'all' ? 28 : 38} strokeWidth={2.2} />
                </div>

                <div className="print-name">{card.name}</div>
                <div className="print-kn-name">{card.kannadaName}</div>
                <div className="print-meta">📍 {card.village ? `${card.village}, ` : ''}{card.district} District</div>

                <div className="print-qr-box" style={{ borderColor: card.themeColor }}>
                  <QRCodeSVG
                    value={url}
                    size={printTarget === 'all' ? 150 : 210}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>

                <div className="print-instructions">
                  📷 Scan with Phone Camera to Login Instantly
                </div>
                <div className="print-sub-inst">
                  Bypasses OTP · Automatically loads {card.name}'s profile & complaints
                </div>

                <div className="print-footer">
                  GramSetu · ಗ್ರಾಮೀಣ ಸೇತು ಕರ್ನಾಟಕ · Open Day Demo
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .print-only {
          display: none;
        }

        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
            width: 100% !important;
            margin: 0 auto !important;
            padding: 10mm 5mm !important;
            box-sizing: border-box !important;
          }

          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          .print-grid {
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            gap: 16px !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
          }

          .print-all-layout .print-card {
            width: 31% !important;
            max-width: 320px !important;
            border: 2.5px solid #000000 !important;
            border-radius: 18px !important;
            padding: 14px 10px !important;
            text-align: center !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
          }

          .print-single-layout {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            min-height: 85vh !important;
          }

          .print-single-layout .print-card {
            width: 440px !important;
            border: 3.5px solid #000000 !important;
            border-radius: 24px !important;
            padding: 24px 20px !important;
            text-align: center !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
          }

          .print-header-bar {
            color: #ffffff !important;
            padding: 8px 12px !important;
            border-radius: 8px !important;
            font-weight: 800 !important;
            font-size: 11px !important;
            letter-spacing: 0.05em !important;
            margin-bottom: 8px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-single-layout .print-header-bar {
            font-size: 15px !important;
            padding: 10px 16px !important;
            margin-bottom: 14px !important;
          }

          .print-icon-circle {
            width: 44px !important;
            height: 44px !important;
            border-radius: 50% !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-bottom: 6px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-single-layout .print-icon-circle {
            width: 60px !important;
            height: 60px !important;
            margin-bottom: 10px !important;
          }

          .print-name {
            font-size: 16px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin-bottom: 2px !important;
          }

          .print-single-layout .print-name {
            font-size: 22px !important;
          }

          .print-kn-name {
            font-size: 12px !important;
            color: #475569 !important;
            font-weight: 700 !important;
            margin-bottom: 4px !important;
          }

          .print-single-layout .print-kn-name {
            font-size: 15px !important;
            margin-bottom: 6px !important;
          }

          .print-meta {
            font-size: 11px !important;
            color: #64748b !important;
            margin-bottom: 10px !important;
            font-weight: 600 !important;
          }

          .print-single-layout .print-meta {
            font-size: 13px !important;
            margin-bottom: 16px !important;
          }

          .print-qr-box {
            display: inline-block !important;
            padding: 8px !important;
            background: #ffffff !important;
            border: 2px dashed #000000 !important;
            border-radius: 12px !important;
            margin-bottom: 8px !important;
          }

          .print-single-layout .print-qr-box {
            padding: 14px !important;
            border-radius: 16px !important;
            margin-bottom: 14px !important;
          }

          .print-qr-box svg {
            display: block !important;
            margin: 0 auto !important;
          }

          .print-instructions {
            font-size: 11px !important;
            color: #000000 !important;
            font-weight: 800 !important;
            margin-bottom: 2px !important;
          }

          .print-single-layout .print-instructions {
            font-size: 14px !important;
            margin-bottom: 4px !important;
          }

          .print-sub-inst {
            font-size: 9px !important;
            color: #64748b !important;
            margin-bottom: 8px !important;
          }

          .print-single-layout .print-sub-inst {
            font-size: 11px !important;
            margin-bottom: 12px !important;
          }

          .print-footer {
            border-top: 1px solid #cbd5e1 !important;
            padding-top: 6px !important;
            font-size: 8px !important;
            color: #94a3b8 !important;
            font-weight: 600 !important;
          }

          .print-single-layout .print-footer {
            font-size: 10px !important;
            padding-top: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
