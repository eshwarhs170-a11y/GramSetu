import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Mic, Activity, QrCode, Map, Play, ExternalLink,
  ShieldCheck, Volume2, Sparkles, Printer, ArrowRight,
  Sun, Moon, Home, Radio, HelpCircle, Lightbulb, Target
} from 'lucide-react';
import { playLoudNotificationChime } from '../utils/audioAlert';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Siri for Farmers (AI Voice Assistant)',
    route: '/demo/voice',
    icon: Mic,
    color: '#22c55e',
    badge: 'INTERACTIVE AUDIO',
    desc: 'Full-screen speech recognition in Kannada, English & Hindi with dynamic mirrored audio visualizer waves.',
    talkingPoint: 'Show judges hands-free voice commands ("What is GramSetu?", "ಇಂದು ತೆಂಗಿನ ಬೆಲೆ ಏನು?").',
  },
  {
    phase: 'Phase 2',
    title: 'Live Escalation Race (Big Screen Monitor)',
    route: '/demo/dashboard',
    icon: Activity,
    color: '#ef4444',
    badge: '2S AUDIO CHIME',
    desc: 'Live Firestore incident stream that triggers a 2.0-second loud harmonic chime and flashing card when complaints land.',
    talkingPoint: 'Have an audience member file a complaint on their phone and watch it ding live on your laptop screen.',
  },
  {
    phase: 'Phase 3',
    title: 'Magic QR Passes (Roleplay Generator)',
    route: '/demo/qr-cards',
    icon: QrCode,
    color: '#3b82f6',
    badge: 'PRINT-READY A4',
    desc: 'Printable badges for Ramappa Gowda (Mysuru), Kaveri Amma (Kodagu), and PDO Mysuru with OTP-bypass instant login.',
    talkingPoint: 'Audience scans QR with phone camera and is instantly logged in with zero typing.',
  },
  {
    phase: 'Phase 4',
    title: 'Karnataka State Incident Heatmap',
    route: '/demo/map',
    icon: Map,
    color: '#f59e0b',
    badge: 'TACTICAL RADAR',
    desc: 'Spatial grid of all 31 districts that pulses with crimson radar animations and sonar alerts as audience participates.',
    talkingPoint: 'Project on a TV to showcase district-level civic health monitoring in real-time.',
  },
];

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
        ? 'radial-gradient(ellipse at top, #0a0f1e 0%, #060913 100%)'
        : 'radial-gradient(ellipse at top, #f0fdf4 0%, #f8fafc 100%)',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: "'Inter', sans-serif",
      padding: '32px 20px',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 36,
          padding: '20px 24px',
          borderRadius: '24px',
          background: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(16px)',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 4px 18px rgba(34,197,94,0.3)',
            }}>
              GS
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '1.7rem',
                  fontWeight: 800,
                  background: isDark
                    ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Presenter Control Hub
                </h1>
                <span style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#22c55e',
                  borderRadius: 20,
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}>
                  CONFIDENTIAL · DEMO ONLY
                </span>
              </div>
              <p style={{ margin: '2px 0 0', color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.85rem' }}>
                Your private dashboard to control and launch all 4 Open Day demonstration phases
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={triggerMarketBoom}
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.3))',
                border: '1px solid rgba(245,158,11,0.5)',
                color: '#f59e0b',
                borderRadius: '12px',
                padding: '9px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Activity size={16} />
              <span>Mass Market Boom Alert</span>
            </button>
            <button
              onClick={playLoudNotificationChime}
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: isDark ? '#cbd5e1' : '#475569',
                borderRadius: '12px',
                padding: '9px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Volume2 size={16} color="#22c55e" />
              <span>Test 2s Chime</span>
            </button>

            <button
              onClick={toggleTheme}
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: isDark ? '#facc15' : '#f59e0b',
                borderRadius: '12px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="/"
              style={{
                background: '#22c55e',
                color: '#fff',
                borderRadius: '12px',
                padding: '9px 16px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Home size={15} />
              <span>Main Website</span>
            </a>
          </div>
        </div>

        {/* 4 Phases Master Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 36,
        }}>
          {PHASES.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.phase}
                style={{
                  background: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: 24,
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isDark
                    ? '0 10px 30px rgba(0,0,0,0.3)'
                    : '0 10px 25px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = p.color;
                  e.currentTarget.style.boxShadow = `0 14px 35px ${p.color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.04)';
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${p.color}18`,
                    border: `1px solid ${p.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: p.color,
                  }}>
                    <IconComp size={22} />
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: p.color,
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}33`,
                    borderRadius: 8,
                    padding: '3px 8px',
                    letterSpacing: '0.04em',
                  }}>
                    {p.badge}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: p.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {p.phase}
                </div>

                <h3 style={{ margin: '4px 0 8px', fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a' }}>
                  {p.title}
                </h3>

                <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.5 }}>
                  {p.desc}
                </p>

                {/* Talking Point Callout */}
                <div style={{
                  background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.8)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  marginBottom: 20,
                  fontSize: '0.78rem',
                  color: isDark ? '#cbd5e1' : '#334155',
                  lineHeight: 1.4,
                  borderLeft: `3px solid ${p.color}`,
                }}>
                  <Lightbulb size={14} style={{ display: 'inline', marginRight: 4, position: 'relative', top: 2 }} color={p.color} />
                  <strong>Demo Tip:</strong> {p.talkingPoint}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                  <a
                    href={p.route}
                    style={{
                      flex: 1,
                      background: p.color,
                      color: '#fff',
                      borderRadius: 12,
                      padding: '11px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: `0 4px 14px ${p.color}44`,
                    }}
                  >
                    <Play size={16} fill="#fff" />
                    <span>Launch</span>
                  </a>

                  <button
                    onClick={() => openInNewWindow(p.route)}
                    title="Open in Pop-out / Projector Window"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                      color: isDark ? '#cbd5e1' : '#475569',
                      borderRadius: 12,
                      padding: '11px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: '0.85rem',
                    }}
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Presenter Quick Cheat Sheet */}
        <div style={{
          background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.85)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          borderRadius: 24,
          padding: '24px 28px',
          backdropFilter: 'blur(12px)',
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={20} color="#3b82f6" />
            3-Minute Live Demo Walkthrough Formula
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
            {[
              { step: '1. Voice AI', action: 'Open /demo/voice and ask "ಇಂದು ತೆಂಗಿನ ಬೆಲೆ ಏನು?" — watch waves bounce and Kannada audio speak.' },
              { step: '2. Distribute QRs', action: 'Hand out the 3 printed QR cards to evaluators. One is Ramappa (Mysuru) and one is Kaveri (Kodagu).' },
              { step: '3. Submit & Chime', action: 'Have Ramappa submit a complaint on his phone. Your laptop on /demo/dashboard will loudly CHIME for 2s.' },
              { step: '4. State Heatmap', action: 'Show /demo/map on the big TV — Mysuru district will pulse red with radar sonar alerts.' },
            ].map(s => (
              <div key={s.step} style={{ background: isDark ? 'rgba(30,41,59,0.4)' : 'rgba(241,245,249,0.7)', padding: '14px', borderRadius: 14 }}>
                <div style={{ fontWeight: 800, color: '#22c55e', fontSize: '0.85rem', marginBottom: 4 }}>{s.step}</div>
                <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.4 }}>{s.action}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
