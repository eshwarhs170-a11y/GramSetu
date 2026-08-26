import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Mic, Activity, QrCode, Map, Home, Sun, Moon,
  Volume2, Sparkles, ExternalLink
} from 'lucide-react';
import { playLoudNotificationChime } from '../utils/audioAlert';

export default function DemoNavHeader({ currentPhase = 'voice' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const navLinks = [
    { to: '/demo/voice', label: '1. Voice AI', icon: Mic, color: '#22c55e' },
    { to: '/demo/dashboard', label: '2. Live Monitor', icon: Activity, color: '#ef4444' },
    { to: '/demo/qr-cards', label: '3. Magic QR Passes', icon: QrCode, color: '#3b82f6' },
    { to: '/demo/map', label: '4. State Heatmap', icon: Map, color: '#f59e0b' },
  ];

  return (
    <header className="no-print" style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      padding: '12px 18px',
      borderRadius: '20px',
      background: isDark
        ? 'rgba(15, 23, 42, 0.75)'
        : 'rgba(255, 255, 255, 0.85)',
      border: isDark
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(16px)',
      boxShadow: isDark
        ? '0 10px 30px rgba(0, 0, 0, 0.4)'
        : '0 10px 30px rgba(0, 0, 0, 0.06)',
      boxSizing: 'border-box',
    }}>
      {/* Brand & Main App Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link
          to="/"
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
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 900,
            fontSize: '0.9rem',
          }}>
            GS
          </div>
          <span>GramSetu</span>
        </Link>

        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          background: 'rgba(34, 197, 94, 0.15)',
          color: '#22c55e',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: 12,
          padding: '2px 8px',
          letterSpacing: '0.04em',
        }}>
          OPEN DAY SUITE
        </span>
      </div>

      {/* 4 Phases Navigation Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap',
      }}>
        {navLinks.map((item) => {
          const IconComp = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
                background: isActive
                  ? (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.08)')
                  : 'transparent',
                color: isActive
                  ? item.color
                  : (isDark ? '#94a3b8' : '#64748b'),
                border: isActive
                  ? `1px solid ${item.color}55`
                  : '1px solid transparent',
                boxShadow: isActive ? `0 0 12px ${item.color}22` : 'none',
              })}
            >
              <IconComp size={15} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Utilities: Sound Tester & Theme Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={playLoudNotificationChime}
          title="Play 2-Second Loud Chime"
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            color: isDark ? '#cbd5e1' : '#475569',
            borderRadius: '10px',
            padding: '7px 11px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.15s ease',
          }}
        >
          <Volume2 size={14} color="#22c55e" />
          <span>Test 2s Chime</span>
        </button>

        <button
          onClick={toggleTheme}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            color: isDark ? '#facc15' : '#f59e0b',
            borderRadius: '10px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <Link
          to="/"
          title="Open Main Platform in New Page"
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            color: isDark ? '#94a3b8' : '#64748b',
            borderRadius: '10px',
            padding: '7px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
          }}
        >
          <Home size={14} />
          <span>Exit Demo</span>
        </Link>
      </div>
    </header>
  );
}
