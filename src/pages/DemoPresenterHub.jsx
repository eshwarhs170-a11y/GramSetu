import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Activity, QrCode, Map, Play, ExternalLink,
  Volume2, Sun, Moon, Home, Lightbulb, Target, Sparkles
} from 'lucide-react';
import { playLoudNotificationChime } from '../utils/audioAlert';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Live Escalation Race (Big Screen Monitor)',
    route: '/demo/dashboard',
    icon: Activity,
    color: '#ef4444',
    badge: '2S AUDIO CHIME',
    desc: 'Live Firestore incident stream that triggers a 2.0-second loud harmonic chime and flashing card when complaints land.',
    talkingPoint: 'Have an audience member file a complaint on their phone and watch it ding live on your laptop screen.',
  },
  {
    phase: 'Phase 2',
    title: 'Magic QR Passes (Roleplay Generator)',
    route: '/demo/qr-cards',
    icon: QrCode,
    color: '#3b82f6',
    badge: 'PRINT-READY A4',
    desc: 'Printable badges for Ramappa Gowda (Mysuru), Kaveri Amma (Kodagu), and PDO Mysuru with OTP-bypass instant login.',
    talkingPoint: 'Audience scans QR with phone camera and is instantly logged in with zero typing.',
  },
  {
    phase: 'Phase 3',
    title: 'Karnataka State Incident Heatmap',
    route: '/demo/map',
    icon: Map,
    color: '#f59e0b',
    badge: 'TACTICAL RADAR',
    desc: 'Spatial grid of all 31 districts that pulses with crimson radar animations and sonar alerts as audience participates.',
    talkingPoint: 'Project on a TV to showcase district-level civic health monitoring in real-time.',
  },
];

// Interactive 3D Glow Card Component
const GlowingCard = ({ children, color, isDark }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="demo-phase-card"
      style={{
        position: 'relative',
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: 24,
        padding: '26px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark
          ? '0 10px 40px -10px rgba(0,0,0,0.5)'
          : '0 10px 40px -10px rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
        zIndex: 1,
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 25px 50px -12px ${color}44`;
        e.currentTarget.style.borderColor = `${color}88`;
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 10px 40px -10px rgba(0,0,0,0.5)'
          : '0 10px 40px -10px rgba(31, 38, 135, 0.1)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)';
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${color}25 0%, transparent 50%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: opacity,
          transition: 'opacity 0.3s ease',
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
};

export default function DemoPresenterHub() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const openInNewWindow = (route) => {
    window.open(route, '_blank', 'width=1280,height=800');
  };

  const triggerMarketBoom = async () => {
    try {
      await addDoc(collection(db, 'demoAlerts'), {
        type: 'MARKET_BOOM',
        title: '🚨 Market Spike Alert!',
        message: 'Tomato prices in Kolar just spiked by ₹20/kg! Sell now for maximum profit.',
        createdAt: serverTimestamp(),
      });
      playLoudNotificationChime();
    } catch (e) {
      console.error('Error triggering market boom:', e);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #0a0f1e 0%, #171026 50%, #060913 100%)'
        : 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #f8fafc 100%)',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: "'Inter', sans-serif",
      padding: '20px 16px',
      boxSizing: 'border-box',
      transition: 'background 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background Orbs */}
      <div className="bg-orb orb-1" style={{ background: '#22c55e' }}></div>
      <div className="bg-orb orb-2" style={{ background: '#3b82f6' }}></div>
      <div className="bg-orb orb-3" style={{ background: '#ef4444' }}></div>

      <style>
        {`
          @keyframes float1 {
            0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            33% { transform: translate(30px, -50px) scale(1.2); opacity: 0.5; }
            66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.3; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          }
          @keyframes float2 {
            0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
            50% { transform: translate(-40px, 40px) scale(1.1); opacity: 0.4; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .bg-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            pointer-events: none;
          }
          .orb-1 { top: -10%; left: -10%; width: 400px; height: 400px; animation: float1 15s infinite ease-in-out; }
          .orb-2 { bottom: 10%; right: -5%; width: 500px; height: 500px; animation: float2 20s infinite ease-in-out reverse; }
          .orb-3 { top: 40%; left: 40%; width: 300px; height: 300px; animation: float1 18s infinite ease-in-out 2s; }
          
          .animate-in {
            animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .delay-1 { animation-delay: 0.1s; }
          .delay-2 { animation-delay: 0.2s; }
          .delay-3 { animation-delay: 0.3s; }
          .delay-4 { animation-delay: 0.4s; }

          .shimmer-text {
            background: ${isDark ? 'linear-gradient(90deg, #fff 0%, #94a3b8 50%, #fff 100%)' : 'linear-gradient(90deg, #0f172a 0%, #64748b 50%, #0f172a 100%)'};
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            animation: shimmer 4s linear infinite;
          }

          .btn-hover-fx {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .btn-hover-fx:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.2);
          }
          .btn-hover-fx::after {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
            transform: skewX(-20deg);
            transition: all 0.5s ease;
          }
          .btn-hover-fx:hover::after {
            left: 150%;
          }

          @media (max-width: 768px) {
            .demo-header-container { flex-direction: column; align-items: flex-start !important; }
            .demo-header-left { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
            .demo-header-title { font-size: 1.4rem !important; flex-wrap: wrap; }
            .demo-header-buttons { flex-wrap: wrap; width: 100%; margin-top: 10px; }
            .demo-action-btn { flex: 1 1 calc(50% - 10px); justify-content: center; padding: 10px !important; }
            .demo-grid-container { grid-template-columns: 1fr !important; }
            .demo-phase-card { padding: 20px !important; }
            .demo-cheatsheet-grid { grid-template-columns: 1fr !important; }
            .bg-orb { filter: blur(50px); }
          }
        `}
      </style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Header Bar */}
        <div className="demo-header-container animate-in" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 36,
          padding: '20px',
          borderRadius: '24px',
          background: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.6)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(31, 38, 135, 0.05)',
        }}>
          <div className="demo-header-left" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 50,
              height: 50,
              minWidth: 50,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
              position: 'relative',
            }}>
              GS
              <Sparkles size={14} color="#fff" style={{ position: 'absolute', top: -5, right: -5, animation: 'shimmer 2s infinite' }} />
            </div>

            <div>
              <div className="demo-header-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 className="shimmer-text" style={{
                  margin: 0,
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                }}>
                  Presenter Control Hub
                </h1>
                <span style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#22c55e',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  boxShadow: '0 0 15px rgba(34,197,94,0.2)',
                }}>
                  CONFIDENTIAL · DEMO ONLY
                </span>
              </div>
              <p style={{ margin: '6px 0 0', color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.9rem', lineHeight: 1.4, fontWeight: 500 }}>
                Your private dashboard to control and launch all 3 Open Day demonstration phases
              </p>
            </div>
          </div>

          <div className="demo-header-buttons" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={triggerMarketBoom}
              className="demo-action-btn btn-hover-fx"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.25))',
                border: '1px solid rgba(245,158,11,0.5)',
                color: '#f59e0b',
                borderRadius: '14px',
                padding: '10px 16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Activity size={16} />
              <span>Market Alert</span>
            </button>
            <button
              onClick={playLoudNotificationChime}
              className="demo-action-btn btn-hover-fx"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: isDark ? '#e2e8f0' : '#475569',
                borderRadius: '14px',
                padding: '10px 16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Volume2 size={16} color="#22c55e" />
              <span>Test Chime</span>
            </button>

            <button
              onClick={toggleTheme}
              className="btn-hover-fx"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: isDark ? '#facc15' : '#f59e0b',
                borderRadius: '14px',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                backdropFilter: 'blur(10px)',
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="/"
              className="demo-action-btn btn-hover-fx"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#fff',
                borderRadius: '14px',
                padding: '10px 18px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 15px rgba(34,197,94,0.3)',
              }}
            >
              <Home size={15} />
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* 3 Phases Master Cards Grid */}
        <div className="demo-grid-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 36,
        }}>
          {PHASES.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div key={p.phase} className={`animate-in delay-${idx + 1}`}>
                <GlowingCard color={p.color} isDark={isDark}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `${p.color}18`,
                      border: `1px solid ${p.color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: p.color,
                      boxShadow: `0 4px 15px ${p.color}22`,
                    }}>
                      <IconComp size={24} />
                    </div>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: p.color,
                      background: `${p.color}15`,
                      border: `1px solid ${p.color}44`,
                      borderRadius: 8,
                      padding: '4px 10px',
                      letterSpacing: '0.06em',
                      boxShadow: `0 0 10px ${p.color}15`,
                    }}>
                      {p.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: p.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {p.phase}
                  </div>

                  <h3 style={{ margin: '6px 0 12px', fontSize: '1.3rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {p.title}
                  </h3>

                  <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>

                  {/* Talking Point Callout */}
                  <div style={{
                    background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
                    borderRadius: 14,
                    padding: '12px 14px',
                    marginBottom: 24,
                    fontSize: '0.8rem',
                    color: isDark ? '#cbd5e1' : '#334155',
                    lineHeight: 1.5,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    borderLeft: `4px solid ${p.color}`,
                    backdropFilter: 'blur(5px)',
                  }}>
                    <Lightbulb size={16} style={{ display: 'inline', marginRight: 6, position: 'relative', top: 3 }} color={p.color} />
                    <strong style={{ color: isDark ? '#fff' : '#000' }}>Demo Tip:</strong> {p.talkingPoint}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                    <a
                      href={p.route}
                      className="btn-hover-fx"
                      style={{
                        flex: 1,
                        background: p.color,
                        color: '#fff',
                        borderRadius: 14,
                        padding: '12px',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        boxShadow: `0 6px 20px ${p.color}55`,
                      }}
                    >
                      <Play size={18} fill="#fff" />
                      <span>Launch</span>
                    </a>

                    <button
                      onClick={() => openInNewWindow(p.route)}
                      title="Open in Pop-out / Projector Window"
                      className="btn-hover-fx"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                        color: isDark ? '#cbd5e1' : '#475569',
                        borderRadius: 14,
                        padding: '12px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </GlowingCard>
              </div>
            );
          })}
        </div>

        {/* Presenter Quick Cheat Sheet */}
        <div className="animate-in delay-4" style={{
          background: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.6)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.8)',
          borderRadius: 24,
          padding: '28px',
          backdropFilter: 'blur(20px)',
          boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(31, 38, 135, 0.05)',
        }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '6px', borderRadius: '10px', display: 'flex' }}>
              <Target size={20} color="#3b82f6" />
            </div>
            3-Minute Live Demo Walkthrough Formula
          </h3>

          <div className="demo-cheatsheet-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {[
              { step: '1. Distribute QRs', action: 'Hand out the 3 printed QR cards to evaluators. One is Ramappa (Mysuru) and one is Kaveri (Kodagu).' },
              { step: '2. Submit & Chime', action: 'Have Ramappa submit a complaint on his phone. Your laptop on /demo/dashboard will loudly CHIME for 2s.' },
              { step: '3. State Heatmap', action: 'Show /demo/map on the big TV — Mysuru district will pulse red with radar sonar alerts.' },
            ].map((s, idx) => (
              <div key={s.step} style={{ 
                background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)', 
                border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)',
                padding: '18px', 
                borderRadius: 16,
                transition: 'transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ background: '#22c55e', color: '#fff', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontWeight: 800, color: isDark ? '#fff' : '#0f172a', fontSize: '0.95rem' }}>
                    {s.step.split('. ')[1]}
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.6, paddingLeft: 32 }}>
                  {s.action}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
