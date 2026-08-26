import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Mic, Activity, QrCode, Map, Home, Sun, Moon,
  Volume2, ChevronLeft, LayoutDashboard
} from 'lucide-react';
import { playLoudNotificationChime } from '../utils/audioAlert';

export default function DemoNavHeader({ currentPhase = 'voice' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const navLinks = [
    { to: '/demo/voice',     label: '1. Voice AI',        icon: Mic,      color: '#22c55e' },
    { to: '/demo/dashboard', label: '2. Live Monitor',     icon: Activity, color: '#ef4444' },
    { to: '/demo/qr-cards',  label: '3. Magic QR Passes',  icon: QrCode,   color: '#3b82f6' },
    { to: '/demo/map',       label: '4. State Heatmap',    icon: Map,      color: '#f59e0b' },
  ];

  const card = isDark
    ? { bg: 'rgba(15, 23, 42, 0.82)', border: 'rgba(255,255,255,0.1)', shadow: '0 10px 30px rgba(0,0,0,0.4)' }
    : { bg: 'rgba(255, 255, 255, 0.92)', border: 'rgba(0,0,0,0.08)', shadow: '0 10px 30px rgba(0,0,0,0.06)' };

  const mutedBtn = {
    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    transition: 'all 0.15s ease',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <header
      className="no-print"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* ── Row 1: Brand / Phase tabs / Utilities ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        padding: '11px 18px',
        borderRadius: '20px 20px 0 0',
        background: card.bg,
        border: `1px solid ${card.border}`,
        borderBottom: 'none',
        backdropFilter: 'blur(16px)',
        boxShadow: card.shadow,
      }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/demo"
            title="Back to Presenter Control Hub"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              color: isDark ? '#fff' : '#0f172a',
              fontWeight: 800,
              fontSize: '1.05rem',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#22c55e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: '0.9rem',
            }}>
              GS
            </div>
            <span>GramSetu</span>
          </Link>

          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            background: 'rgba(34,197,94,0.15)',
            color: '#22c55e',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 12, padding: '2px 8px', letterSpacing: '0.04em',
          }}>
            OPEN DAY SUITE
          </span>
        </div>

        {/* Phase tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {navLinks.map((item) => {
            const IconComp = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 13px', borderRadius: '12px',
                  textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: isActive
                    ? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)')
                    : 'transparent',
                  color: isActive ? item.color : (isDark ? '#94a3b8' : '#64748b'),
                  border: isActive ? `1px solid ${item.color}55` : '1px solid transparent',
                  boxShadow: isActive ? `0 0 12px ${item.color}22` : 'none',
                })}
              >
                <IconComp size={15} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Chime tester */}
          <button
            onClick={playLoudNotificationChime}
            title="Play 2-Second Loud Chime"
            style={{ ...mutedBtn, color: isDark ? '#cbd5e1' : '#475569', padding: '7px 11px', fontSize: '0.78rem', fontWeight: 700 }}
          >
            <Volume2 size={14} color="#22c55e" />
            <span>Test 2s Chime</span>
          </button>

          {/* Dark / Light toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            style={{ ...mutedBtn, color: isDark ? '#facc15' : '#f59e0b', width: 34, height: 34, justifyContent: 'center', padding: 0 }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Exit Demo → goes to normal website */}
          <Link
            to="/"
            title="Exit Demo — Open Normal GramSetu Website"
            style={{
              ...mutedBtn,
              background: isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              padding: '7px 12px',
              textDecoration: 'none',
              fontSize: '0.78rem', fontWeight: 700,
            }}
          >
            <Home size={14} />
            <span>Exit Demo</span>
          </Link>
        </div>
      </div>

      {/* ── Row 2: "← Back to Demo Hub" breadcrumb bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 20px',
        borderRadius: '0 0 20px 20px',
        background: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.9)',
        border: `1px solid ${card.border}`,
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Back to Hub button */}
        <button
          onClick={() => navigate('/demo')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.06)',
            border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(15,23,42,0.1)',
            borderRadius: 10,
            color: isDark ? '#94a3b8' : '#475569',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#22c55e';
            e.currentTarget.style.borderColor = '#22c55e55';
            e.currentTarget.style.background = 'rgba(34,197,94,0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = isDark ? '#94a3b8' : '#475569';
            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.1)';
            e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.06)';
          }}
        >
          <ChevronLeft size={15} />
          <span>Back to Demo Hub</span>
          <LayoutDashboard size={13} style={{ marginLeft: 2, opacity: 0.7 }} />
        </button>

        {/* Breadcrumb label showing current phase */}
        <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8', fontWeight: 600 }}>
          {navLinks.find(l => {
            const p = window.location.pathname;
            return p === l.to || p.startsWith(l.to);
          })?.label || 'Demo Suite'}
          {' '}· Click any phase tab above to switch instantly
        </div>
      </div>
    </header>
  );
}
