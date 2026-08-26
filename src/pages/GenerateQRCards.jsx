import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Globe, Copy, Check, Download, Sparkles, ExternalLink } from 'lucide-react';

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
    emoji: '🌾',
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
    emoji: '🌿',
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
    emoji: '🏛️',
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
  const [publicDomain, setPublicDomain] = useState(
    window.location.hostname.includes('vercel.app')
      ? window.location.origin
      : 'https://gram-setu-one.vercel.app'
  );
  const [copiedId, setCopiedId] = useState(null);

  const printSingleCard = (card) => {
    const url = getCardUrl(card, publicDomain);
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>GramSetu QR Card - ${card.name}</title>
        <style>
          @page { size: A5 landscape; margin: 10mm; }
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #fff;
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 90vh;
          }
          .card-badge {
            width: 440px;
            border: 3px solid ${card.themeColor};
            border-radius: 24px;
            padding: 28px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            page-break-inside: avoid;
            background: #ffffff;
          }
          .header-bar {
            background: ${card.themeColor};
            color: #ffffff;
            padding: 10px 16px;
            border-radius: 12px;
            font-weight: 800;
            font-size: 16px;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
          }
          .avatar { font-size: 44px; margin-bottom: 4px; }
          .name { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
          .kn-name { font-size: 16px; color: #475569; font-weight: 600; margin-bottom: 6px; }
          .meta { font-size: 14px; color: #64748b; margin-bottom: 16px; font-weight: 500; }
          .qr-box {
            display: inline-block;
            padding: 14px;
            background: #ffffff;
            border: 2px dashed ${card.themeColor};
            border-radius: 16px;
            margin-bottom: 14px;
          }
          .instructions {
            font-size: 13px;
            color: #1e293b;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .sub-inst { font-size: 11px; color: #64748b; margin-bottom: 12px; }
          .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            font-size: 11px;
            color: #94a3b8;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="card-badge">
          <div class="header-bar">
            ${card.role === 'official' ? '🏛️ GOVERNMENT OF KARNATAKA' : '🌾 GRAMSETU DEMO PASS'}
          </div>
          <div class="avatar">${card.emoji}</div>
          <div class="name">${card.name}</div>
          <div class="kn-name">${card.kannadaName}</div>
          <div class="meta">📍 ${card.village ? `${card.village}, ` : ''}${card.district} District</div>
          <div class="qr-box">
            <svg id="qr-target" width="220" height="220"></svg>
          </div>
          <div class="instructions">📷 Scan with Phone Camera to Login Instantly</div>
          <div class="sub-inst">Bypasses OTP · Automatically loads user profile & complaints</div>
          <div class="footer">GramSetu · ಗ್ರಾಮೀಣ ಸೇತು ಕರ್ನಾಟಕ · Open Day Demo</div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
        <script>
          QRCode.toCanvas(document.createElement('canvas'), "${url}", { width: 220, margin: 1 }, function (error, canvas) {
            if (!error) {
              const svg = document.getElementById('qr-target');
              svg.parentNode.replaceChild(canvas, svg);
              setTimeout(() => { window.print(); }, 400);
            }
          });
        </script>
      </body>
      </html>
    `);
    win.document.close();
  };

  const printAllCards = () => {
    const win = window.open('', '_blank');
    const cardsHtml = CARDS.map(card => {
      const url = getCardUrl(card, publicDomain);
      return `
        <div class="card-badge" style="border-color: ${card.themeColor};">
          <div class="header-bar" style="background: ${card.themeColor};">
            ${card.role === 'official' ? '🏛️ GOVERNMENT OF KARNATAKA' : '🌾 GRAMSETU DEMO PASS'}
          </div>
          <div class="avatar">${card.emoji}</div>
          <div class="name">${card.name}</div>
          <div class="kn-name">${card.kannadaName}</div>
          <div class="meta">📍 ${card.village ? `${card.village}, ` : ''}${card.district} District</div>
          <div class="qr-box" style="border-color: ${card.themeColor};">
            <canvas id="qr-${card.id}" width="180" height="180"></canvas>
          </div>
          <div class="instructions">📷 Scan with Phone Camera to Login Instantly</div>
          <div class="sub-inst">Bypasses OTP · Loads profile & complaints</div>
          <div class="footer">GramSetu · Open Day Demo</div>
        </div>
      `;
    }).join('');

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>GramSetu - All 3 Magic QR Cards</title>
        <style>
          @page { size: A4 landscape; margin: 8mm; }
          body {
            margin: 0;
            padding: 10px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #fff;
            color: #0f172a;
          }
          .grid-container {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
          }
          .card-badge {
            width: 290px;
            border: 2px solid #000;
            border-radius: 18px;
            padding: 18px 14px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            page-break-inside: avoid;
            background: #ffffff;
            box-sizing: border-box;
          }
          .header-bar {
            color: #ffffff;
            padding: 6px 10px;
            border-radius: 8px;
            font-weight: 800;
            font-size: 11px;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
          }
          .avatar { font-size: 32px; margin-bottom: 2px; }
          .name { font-size: 17px; font-weight: 800; color: #0f172a; }
          .kn-name { font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px; }
          .meta { font-size: 11px; color: #64748b; margin-bottom: 10px; }
          .qr-box {
            display: inline-block;
            padding: 8px;
            background: #ffffff;
            border: 1.5px dashed #64748b;
            border-radius: 12px;
            margin-bottom: 8px;
          }
          .instructions { font-size: 11px; color: #1e293b; font-weight: 700; }
          .sub-inst { font-size: 9px; color: #64748b; margin-bottom: 8px; }
          .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 6px;
            font-size: 9px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="grid-container">
          ${cardsHtml}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
        <script>
          const cards = ${JSON.stringify(CARDS)};
          const domain = "${publicDomain.replace(/\/$/, '')}";
          let done = 0;
          cards.forEach(card => {
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
            const url = domain + '/magic-login?' + params.toString();

            const canvas = document.getElementById('qr-' + card.id);
            QRCode.toCanvas(canvas, url, { width: 170, margin: 1 }, function() {
              done++;
              if (done === cards.length) {
                setTimeout(() => window.print(), 500);
              }
            });
          });
        </script>
      </body>
      </html>
    `);
    win.document.close();
  };

  const copyLink = (card) => {
    const url = getCardUrl(card, publicDomain);
    navigator.clipboard.writeText(url);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      padding: '32px 24px',
    }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.8rem' }}>🎫</span>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Public Magic QR Cards
              </h1>
            </div>
            <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '0.95rem' }}>
              Print these 3 individual cards. Anyone scanning them from any phone/network will instantly log in without OTP!
            </p>
          </div>

          <button
            onClick={printAllCards}
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
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
              boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            <Printer size={20} /> Print All 3 Cards (A4 Sheet)
          </button>
        </div>

        {/* Public Domain Selector */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: '20px 24px',
          marginBottom: 36,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Globe size={20} color="#22c55e" />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                  Target Public Website Domain
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  QR codes will encode this URL so any phone on 4G/5G can open it worldwide.
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
                    background: publicDomain === opt.url ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${publicDomain === opt.url ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 10,
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    color: publicDomain === opt.url ? '#22c55e' : '#94a3b8',
                    fontWeight: 600,
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
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: 10,
                padding: '10px 14px',
                color: '#22c55e',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="https://your-public-url.vercel.app"
            />
          </div>
        </div>

        {/* 3 Separate Print-Ready Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
          {CARDS.map(card => {
            const url = getCardUrl(card, publicDomain);
            return (
              <div
                key={card.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: `2px solid ${card.borderColor}44`,
                  borderRadius: 28,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: `0 12px 36px ${card.themeColor}22`,
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Header Tag */}
                <div style={{
                  background: `${card.themeColor}22`,
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

                {/* Avatar & Name */}
                <div style={{ fontSize: '3rem', marginBottom: 4 }}>{card.emoji}</div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>{card.name}</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginTop: 2 }}>{card.kannadaName}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 4 }}>
                  📍 {card.village ? `${card.village}, ` : ''}{card.district} District
                </div>

                {/* QR Code Container */}
                <div style={{
                  margin: '20px 0',
                  padding: 16,
                  background: '#ffffff',
                  borderRadius: 20,
                  boxShadow: `0 0 30px ${card.themeColor}33`,
                }}>
                  <QRCodeSVG
                    value={url}
                    size={180}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                  />
                </div>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 20, lineHeight: 1.4 }}>
                  {card.desc}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 'auto' }}>
                  <button
                    onClick={() => printSingleCard(card)}
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
                    onClick={() => copyLink(card)}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: copiedId === card.id ? '#22c55e' : '#cbd5e1',
                      borderRadius: 12,
                      padding: '10px 14px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {copiedId === card.id ? <Check size={16} /> : <Copy size={16} />}
                    {copiedId === card.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
