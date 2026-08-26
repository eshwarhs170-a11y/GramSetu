import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer } from 'lucide-react';

const CARDS = [
  {
    role: 'villager',
    name: 'Ramappa Gowda',
    district: 'Mysuru',
    label: 'Farmer · ರೈತ',
    emoji: '🌾',
    color: '#22c55e',
    bg: 'linear-gradient(135deg, #14532d, #166534)',
    desc: 'Scan to experience GramSetu as a farmer from Mysuru',
  },
  {
    role: 'villager',
    name: 'Kaveri Amma',
    district: 'Kodagu',
    label: 'Farmer · ರೈತ',
    emoji: '🌿',
    color: '#34d399',
    bg: 'linear-gradient(135deg, #064e3b, #065f46)',
    desc: 'Scan to experience GramSetu as a farmer from Kodagu',
  },
  {
    role: 'official',
    name: 'PDO Mysuru',
    district: 'Mysuru',
    label: 'Govt Official · ಅಧಿಕಾರಿ',
    emoji: '🏛️',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    desc: 'Scan to experience GramSetu as a Government Official',
  },
];

export default function GenerateQRCards() {
  const printRef = useRef();
  // Compute base URL here so it's always inside React's render cycle
  const BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? `http://10.202.247.12:${window.location.port || '5173'}`
    : window.location.origin;


  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>GramSetu QR Cards</title><style>
        body { margin: 0; background: #111; display: flex; flex-wrap: wrap; gap: 24px; padding: 24px; justify-content: center; }
        .card { border-radius: 20px; padding: 32px 24px; width: 280px; text-align: center; color: white; font-family: Inter, sans-serif; page-break-inside: avoid; }
        @media print { body { background: white; } }
      </style></head><body>
      ${printRef.current.innerHTML}
      </body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      padding: '32px 24px',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg,#fff,#22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🎫 Magic QR Cards
            </h1>
            <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              Print these cards and let the audience scan them to instantly experience GramSetu as different roles.
            </p>
          </div>
          <button
            onClick={handlePrint}
            style={{
              background: '#22c55e',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 20px rgba(34,197,94,0.3)',
            }}
          >
            <Printer size={18} /> Print All Cards
          </button>
        </div>

        {/* Instructions */}
        <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: '16px 24px', marginBottom: 40 }}>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <strong style={{ color: '#22c55e' }}>How to use at the event:</strong><br />
            1. Print these 3 cards and keep them on your table.<br />
            2. Ask audience to scan the QR code with their phone camera.<br />
            3. They are <strong style={{ color: '#fff' }}>instantly logged in</strong> — no OTP, no typing!<br />
            4. Farmers see the villager dashboard. Officials see the government dashboard.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={printRef} style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CARDS.map((card) => {
            const url = `${BASE_URL}/magic-login?role=${card.role}&name=${encodeURIComponent(card.name)}&district=${encodeURIComponent(card.district)}`;
            return (
              <div key={card.name} style={{
                background: card.bg,
                borderRadius: 24,
                padding: '32px 24px',
                width: 280,
                textAlign: 'center',
                border: `1px solid ${card.color}44`,
                boxShadow: `0 0 40px ${card.color}22, 0 8px 32px rgba(0,0,0,0.4)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                {/* Role badge */}
                <div style={{ fontSize: '2.5rem' }}>{card.emoji}</div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{card.name}</div>
                  <div style={{ fontSize: '0.8rem', color: card.color, fontWeight: 700, letterSpacing: '0.08em', marginTop: 4 }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                    📍 {card.district}, Karnataka
                  </div>
                </div>

                {/* QR Code */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: `0 0 20px ${card.color}44`,
                }}>
                  <QRCodeSVG
                    value={url}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="M"
                  />
                </div>

                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {card.desc}
                </div>

                {/* GramSetu branding */}
                <div style={{ borderTop: `1px solid ${card.color}33`, paddingTop: 12, width: '100%' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: card.color }}>GramSetu</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>ಗ್ರಾಮ ಸೇತು · Connecting Villages</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* URL preview */}
        <div style={{ marginTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}>
          <h3 style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', marginBottom: 16, letterSpacing: '0.08em' }}>
            GENERATED MAGIC LINKS
          </h3>
          {CARDS.map(card => {
            const url = `${BASE_URL}/magic-login?role=${card.role}&name=${encodeURIComponent(card.name)}&district=${encodeURIComponent(card.district)}`;
            return (
              <div key={card.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '1.2rem' }}>{card.emoji}</span>
                <span style={{ color: '#64748b', fontSize: '0.85rem', flex: 1, overflowWrap: 'anywhere' }}>{url}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(url)}
                  style={{ background: 'none', border: '1px solid #334155', borderRadius: 8, color: '#64748b', padding: '4px 10px', cursor: 'pointer', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                >
                  Copy
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
