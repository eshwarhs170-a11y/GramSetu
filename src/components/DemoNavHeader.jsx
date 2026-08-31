import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Mic, Activity, QrCode, Map, Home, Sun, Moon,
  Volume2, ChevronLeft, LayoutDashboard, ChevronDown
} from 'lucide-react';
import { playLoudNotificationChime } from '../utils/audioAlert';

const PHASES = [
  { to: '/demo/voice',     label: 'Phase 1 · Voice AI',       shortLabel: '1. Voice AI',    icon: Mic,      color: '#22c55e' },
  { to: '/demo/dashboard', label: 'Phase 2 · Live Monitor',    shortLabel: '2. Monitor',     icon: Activity, color: '#ef4444' },
  { to: '/demo/qr-cards',  label: 'Phase 3 · Magic QR Passes', shortLabel: '3. QR Passes',   icon: QrCode,   color: '#3b82f6' },
  { to: '/demo/map',       label: 'Phase 4 · State Heatmap',   shortLabel: '4. Heatmap',     icon: Map,      color: '#f59e0b' },
];

export default function DemoNavHeader() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const currentPath = window.location.pathname;
  const currentPhase = PHASES.find(p => currentPath === p.to || currentPath.startsWith(p.to)) || PHASES[0];

  const barBg = isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.95)';
  const barBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  return (
    <header className="no-print" style={{ width: '100%', maxWidth: 1200, margin: '0 auto 20px', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Row 1: Brand | Utilities ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 16px',
        background: barBg,
        border: `1px solid ${barBorder}`,
        borderRadius: '18px 18px 0 0',
        backdropFilter: 'blur(16px)',
        boxShadow: isDark ? '0 6px 24px rgba(0,0,0,0.4)' : '0 6px 24px rgba(0,0,0,0.05)',
      }}>

        {/* Brand */}
        <a href="/demo" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: '0.85rem',
            boxShadow: '0 4px 12px rgba(34,197,94,0.35)',
          }}>GS</div>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: isDark ? '#fff' : '#0f172a' }}>GramSetu</span>
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em',
            background: 'rgba(34,197,94,0.15)', color: '#22c55e',
            border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '2px 7px',
          }}>DEMO</span>
        </a>

        {/* Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {/* Chime */}
          <button
            onClick={playLoudNotificationChime}
            title="Test 2s Chime"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 11px', borderRadius: 10, cursor: 'pointer',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${barBorder}`,
              color: isDark ? '#94a3b8' : '#64748b',
              fontSize: '0.78rem', fontWeight: 700,
            }}
          >
            <Volume2 size={14} color="#22c55e" />
            <span className="hide-xs">Test Chime</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            style={{
              width: 34, height: 34, borderRadius: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${barBorder}`,
              color: isDark ? '#facc15' : '#f59e0b',
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Exit Demo */}
          <a
            href="/"
            title="Exit Demo — Go to Main Website"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 12px', borderRadius: 10, cursor: 'pointer',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
            }}
          >
            <Home size={14} />
            <span className="hide-xs">Exit Demo</span>
          </a>
        </div>
      </div>

      {/* ── Row 2: Phase tabs ── */}
      <div style={{
        background: isDark ? 'rgba(15,23,42,0.75)' : 'rgba(248,250,252,0.95)',
        border: `1px solid ${barBorder}`,
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)',
        borderRadius: '0 0 18px 18px',
        padding: '8px 12px',
        backdropFilter: 'blur(10px)',
      }}>

        {/* Scrollable phase tabs row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 2,
        }}>
          {/* Back to hub */}
          <a
            href="/demo"
            style={{
              display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
              padding: '6px 12px', borderRadius: 10, textDecoration: 'none',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)',
              border: `1px solid ${barBorder}`,
              color: isDark ? '#94a3b8' : '#64748b',
              fontSize: '0.78rem', fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            <LayoutDashboard size={13} />
            <span>Hub</span>
          </a>

          {/* Divider */}
          <div style={{ width: 1, height: 24, background: barBorder, flexShrink: 0 }} />

          {/* Phase tabs */}
          {PHASES.map((phase) => {
            const IconComp = phase.icon;
            const isActive = currentPath === phase.to || currentPath.startsWith(phase.to);
            return (
              <a
                key={phase.to}
                href={phase.to}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                  padding: '7px 14px', borderRadius: 12, textDecoration: 'none',
                  background: isActive
                    ? (isDark ? `${phase.color}22` : `${phase.color}15`)
                    : 'transparent',
                  border: isActive
                    ? `1px solid ${phase.color}55`
                    : '1px solid transparent',
                  color: isActive ? phase.color : (isDark ? '#64748b' : '#94a3b8'),
                  fontSize: '0.82rem', fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? `0 0 10px ${phase.color}22` : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconComp size={14} />
                <span>{phase.shortLabel}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Hide "hide-xs" text on very small screens */}
      <style>{`
        @media (max-width: 420px) { .hide-xs { display: none !important; } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </header>
  );
}
