import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import {
  Flame, Radio, Volume2, VolumeX, Maximize2, Minimize2,
  AlertTriangle, ShieldCheck, CheckCircle2, Clock, MapPin,
  Building2, Activity, Zap, Droplets, Route, RefreshCw, X, Sparkles, Filter
} from 'lucide-react';

// Karnataka 31 Districts divided into Administrative Regions
const REGIONS = [
  {
    name: 'Mysuru Division · ಮೈಸೂರು ವಿಭಾಗ',
    color: '#10b981',
    districts: ['Mysuru', 'Mandya', 'Hassan', 'Chamarajanagar', 'Kodagu', 'Chikkamagaluru', 'Dakshina Kannada', 'Udupi']
  },
  {
    name: 'Bengaluru Division · ಬೆಂಗಳೂರು ವಿಭಾಗ',
    color: '#3b82f6',
    districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Ramanagara', 'Kolar', 'Chikkaballapur', 'Tumakuru', 'Shivamogga', 'Chitradurga', 'Davanagere']
  },
  {
    name: 'Belagavi Division · ಬೆಳಗಾವಿ ವಿಭಾಗ',
    color: '#8b5cf6',
    districts: ['Belagavi', 'Bagalkot', 'Vijayapura', 'Dharwad', 'Gadag', 'Haveri', 'Uttara Kannada']
  },
  {
    name: 'Kalaburagi Division · ಕಲಬುರಗಿ ವಿಭಾಗ',
    color: '#f59e0b',
    districts: ['Kalaburagi', 'Bidar', 'Raichur', 'Koppal', 'Yadgir', 'Ballari', 'Vijayanagara']
  }
];

const INITIAL_MOCK_COMPLAINTS = [
  { id: 'GS-MYS-01', title: 'Hand Pump Leakage — Ward 3', district: 'Mysuru', taluk: 'Mysuru', category: 'Water Supply', status: 'pending', date: 'Just now', priority: 'high', submittedBy: 'Ramappa Gowda' },
  { id: 'GS-KOD-02', title: 'Broken Transformer — Madikeri Road', district: 'Kodagu', taluk: 'Madikeri', category: 'Electricity / BESCOM', status: 'inprogress', date: '5m ago', priority: 'medium', submittedBy: 'Kaveri Amma' },
  { id: 'GS-RAM-03', title: 'Pothole on Main Market Rd', district: 'Ramanagara', taluk: 'Ramanagara', category: 'Roads & Paths', status: 'resolved', date: '12m ago', priority: 'low', submittedBy: 'Basavaraj' },
  { id: 'GS-BLR-04', title: 'Drainage Overflow near School', district: 'Bengaluru Rural', taluk: 'Hosakote', category: 'Sanitation / BBMP', status: 'pending', date: '20m ago', priority: 'high', submittedBy: 'Suresh K' },
  { id: 'GS-BEL-05', title: 'Fertilizer Stock Depleted at RSK', district: 'Belagavi', taluk: 'Gokak', category: 'Agriculture / RSK', status: 'inprogress', date: '35m ago', priority: 'medium', submittedBy: 'Mantesh' },
  { id: 'GS-KAL-06', title: 'Solar Borewell Pump Stolen', district: 'Kalaburagi', taluk: 'Aland', category: 'Water Supply', status: 'pending', date: '1h ago', priority: 'high', submittedBy: 'Anand P' }
];

export default function LiveHeatmap() {
  const [complaints, setComplaints] = useState(INITIAL_MOCK_COMPLAINTS);
  const [latestComplaint, setLatestComplaint] = useState(null);
  const [activeDistrictModal, setActiveDistrictModal] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [simulating, setSimulating] = useState(false);
  const isFirstLoad = useRef(true);

  // Synthesize Sonar / Tactical Radar Ping with Web Audio API
  const playTacticalChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High A5
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35); // Drop to A4

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('Audio Context init warning:', e);
    }
  };

  // Real-time Firestore sync listener
  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.data().id || doc.id,
          _docId: doc.id
        }));

        // Merge live Firestore with initial baseline
        const merged = [...fetched, ...INITIAL_MOCK_COMPLAINTS].filter(
          (v, i, a) => a.findIndex(t => t.id === v.id) === i
        );

        setComplaints(merged);

        // If a new complaint arrives after initial mount, trigger the alert!
        if (!isFirstLoad.current && fetched.length > 0) {
          const newest = fetched[0];
          setLatestComplaint(newest);
          playTacticalChime();

          // Clear highlight after 12 seconds
          const timer = setTimeout(() => setLatestComplaint(null), 12000);
          return () => clearTimeout(timer);
        }
        isFirstLoad.current = false;
      }
    }, (err) => {
      console.warn('Firestore live heatmap snapshot error:', err);
    });

    return () => unsubscribe();
  }, [soundEnabled]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Simulate a live complaint from audience (for live demo testing)
  const handleSimulateIncident = async () => {
    setSimulating(true);
    const demoDistricts = ['Mysuru', 'Kodagu', 'Mandya', 'Belagavi', 'Kalaburagi', 'Shivamogga'];
    const demoCategories = ['Water Supply', 'Electricity / BESCOM', 'Roads & Paths', 'Agriculture / RSK'];
    const randomDist = demoDistricts[Math.floor(Math.random() * demoDistricts.length)];
    const randomCat = demoCategories[Math.floor(Math.random() * demoCategories.length)];
    const randomId = 'GS-LIVE-' + Math.floor(100 + Math.random() * 900);

    const newMock = {
      id: randomId,
      title: `Emergency: ${randomCat} Outage — Main Sector`,
      district: randomDist,
      taluk: `${randomDist} Taluk`,
      category: randomCat,
      status: 'pending',
      date: 'Just now',
      priority: 'high',
      submittedBy: 'Audience Participant (Mobile QR)',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'complaints'), newMock);
    } catch (e) {
      // If offline/no network, push directly to local state to showcase animation
      setComplaints(prev => [newMock, ...prev]);
      setLatestComplaint(newMock);
      playTacticalChime();
    } finally {
      setTimeout(() => setSimulating(false), 800);
    }
  };

  // Helper: Count complaints for a given district
  const getDistrictStats = (districtName) => {
    const dLower = districtName.toLowerCase();
    const matches = complaints.filter(c => {
      const cDist = (c.district || c.village || '').toLowerCase();
      return cDist.includes(dLower) || dLower.includes(cDist);
    });

    const pending = matches.filter(c => c.status === 'pending').length;
    const inprogress = matches.filter(c => c.status === 'inprogress').length;
    const resolved = matches.filter(c => c.status === 'resolved').length;
    const total = matches.length;

    // Intensity Level: 0 (Normal), 1-2 (Elevated), 3+ (Critical Hotspot)
    let intensity = 'low';
    if (total >= 3) intensity = 'critical';
    else if (total > 0) intensity = 'medium';

    return { total, pending, inprogress, resolved, intensity, matches };
  };

  // Metrics summary
  const totalComplaintsCount = complaints.length;
  const pendingTotal = complaints.filter(c => c.status === 'pending').length;
  const resolvedTotal = complaints.filter(c => c.status === 'resolved').length;
  const activeEscalated = complaints.filter(c => (c.escalationLevel ?? 0) > 0 || c.status === 'escalated').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #060913 100%)',
      color: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
      padding: '24px',
      boxSizing: 'border-box',
    }}>
      
      {/* ─── MISSION CONTROL HEADER ─── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        paddingBottom: 20,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 24,
      }}>
        {/* Branding & Live Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.1))',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
          }}>
            <Radio className="radar-pulse-icon" size={26} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 style={{
                margin: 0,
                fontSize: '1.75rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Karnataka State Incident Heatmap
              </h1>
              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: 20,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#22c55e',
                letterSpacing: '0.05em',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                FIRESTORE LIVE
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 2 }}>
              GramSetu Real-Time Grievance & Escalation Command Center · 31 Districts
            </div>
          </div>
        </div>

        {/* Global Controls & Simulator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handleSimulateIncident}
            disabled={simulating}
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.3))',
              border: '1px solid rgba(239,68,68,0.5)',
              color: '#f87171',
              borderRadius: 12,
              padding: '10px 16px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: simulating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease',
            }}
          >
            <Flame size={16} />
            {simulating ? 'Broadcasting...' : 'Simulate Incident'}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: soundEnabled ? '#22c55e' : '#64748b',
              borderRadius: 12,
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
            title={soundEnabled ? 'Mute Sonar Alert' : 'Enable Sonar Alert'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            {soundEnabled ? 'Sonar ON' : 'Muted'}
          </button>

          <button
            onClick={toggleFullscreen}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
              borderRadius: 12,
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            {isFullscreen ? 'Exit' : 'Big Screen'}
          </button>
        </div>
      </div>

      {/* ─── METRICS HUD ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}>
        {[
          { label: 'Total Grievances', value: totalComplaintsCount, color: '#38bdf8', icon: Activity, sub: 'Across 31 Districts' },
          { label: 'Action Required', value: pendingTotal, color: '#f59e0b', icon: Clock, sub: 'Pending Line Officer' },
          { label: 'Active Escalations', value: activeEscalated, color: '#ef4444', icon: AlertTriangle, sub: 'Tier-2+ SLA Threshold' },
          { label: 'Resolved Cases', value: resolvedTotal, color: '#22c55e', icon: CheckCircle2, sub: `${Math.round((resolvedTotal / (totalComplaintsCount || 1)) * 100)}% Resolution Rate` },
        ].map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(10px)',
            }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                  {stat.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color, marginTop: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>
                  {stat.sub}
                </div>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${stat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color,
              }}>
                <IconComp size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── LIVE INCIDENT ALERT TOAST (When latest arrives) ─── */}
      {latestComplaint && (
        <div className="incident-alert-banner" style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(185, 28, 28, 0.95))',
          borderRadius: 16,
          padding: '16px 24px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
          animation: 'pulseGlow 2s infinite',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: '1.8rem' }}>🚨</span>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', color: '#fef2f2', textTransform: 'uppercase' }}>
                LIVE INCOMING INCIDENT DETECTED · {latestComplaint.district}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                {latestComplaint.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>
                Submitted by <strong>{latestComplaint.submittedBy || 'Citizen'}</strong> · Category: {latestComplaint.category}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveDistrictModal(latestComplaint.district)}
            style={{
              background: '#ffffff',
              color: '#991b1b',
              border: 'none',
              borderRadius: 10,
              padding: '10px 18px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            Inspect District
          </button>
        </div>
      )}

      {/* ─── MAIN SPATIAL GRID & INCIDENT FEED ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: 24,
      }}>
        
        {/* Left: Administrative Divisions Heatmap Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {REGIONS.map(region => (
            <div key={region.name} style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
              padding: '20px',
              backdropFilter: 'blur(10px)',
            }}>
              {/* Region Label */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: region.color }} />
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0' }}>
                    {region.name}
                  </h3>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {region.districts.length} Districts
                </div>
              </div>

              {/* District Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                gap: 12,
              }}>
                {region.districts.map(distName => {
                  const stats = getDistrictStats(distName);
                  const isHot = latestComplaint && (
                    latestComplaint.district?.toLowerCase().includes(distName.toLowerCase()) ||
                    distName.toLowerCase().includes(latestComplaint.district?.toLowerCase())
                  );

                  // Intensity styling
                  let cardBg = 'rgba(30, 41, 59, 0.4)';
                  let cardBorder = 'rgba(255,255,255,0.05)';
                  let countColor = '#64748b';
                  let glowStyle = 'none';

                  if (stats.intensity === 'critical') {
                    cardBg = 'rgba(239, 68, 68, 0.15)';
                    cardBorder = 'rgba(239, 68, 68, 0.5)';
                    countColor = '#ef4444';
                    glowStyle = '0 0 20px rgba(239, 68, 68, 0.2)';
                  } else if (stats.intensity === 'medium') {
                    cardBg = 'rgba(245, 158, 11, 0.12)';
                    cardBorder = 'rgba(245, 158, 11, 0.35)';
                    countColor = '#f59e0b';
                    glowStyle = '0 0 15px rgba(245, 158, 11, 0.15)';
                  }

                  if (isHot) {
                    cardBg = 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(220,38,38,0.4))';
                    cardBorder = '#ef4444';
                    glowStyle = '0 0 30px rgba(239, 68, 68, 0.7)';
                  }

                  return (
                    <div
                      key={distName}
                      onClick={() => setActiveDistrictModal(distName)}
                      style={{
                        background: cardBg,
                        border: `1.5px solid ${cardBorder}`,
                        borderRadius: 14,
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: glowStyle,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = region.color;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = cardBorder;
                      }}
                    >
                      {isHot && (
                        <div style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#ef4444',
                          animation: 'ping 1s infinite',
                        }} />
                      )}

                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9' }}>
                        {distName}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {stats.total === 0 ? 'Normal' : `${stats.total} Incidents`}
                        </span>
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: countColor,
                          background: `${countColor}15`,
                          padding: '2px 8px',
                          borderRadius: 8,
                        }}>
                          {stats.total}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Live Chronological Incident Stream */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          padding: '20px',
          height: 'calc(100vh - 200px)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Radio size={18} color="#ef4444" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                Live Incident Feed
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {complaints.length} Total
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
            {complaints.slice(0, 15).map(c => (
              <div
                key={c.id}
                onClick={() => setActiveDistrictModal(c.district)}
                style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 14,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: c.status === 'resolved' ? '#22c55e' : '#f59e0b',
                    background: c.status === 'resolved' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                    padding: '2px 6px',
                    borderRadius: 6,
                    textTransform: 'uppercase',
                  }}>
                    {c.status || 'pending'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {c.date || 'Today'}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.3 }}>
                  {c.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>📍 {c.district}</span>
                  <span style={{ color: '#64748b' }}>{c.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── DISTRICT INSPECTOR MODAL ─── */}
      {activeDistrictModal && (() => {
        const stats = getDistrictStats(activeDistrictModal);
        return (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}>
            <div style={{
              background: '#0f172a',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 24,
              width: '100%',
              maxWidth: 640,
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              {/* Close Button */}
              <button
                onClick={() => setActiveDistrictModal(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  color: '#94a3b8',
                  borderRadius: 10,
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>

              {/* Title Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'rgba(34, 197, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22c55e',
                }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                    {activeDistrictModal} District
                  </h2>
                  <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                    Grievance Health & Line Department Resolution Audit
                  </p>
                </div>
              </div>

              {/* District Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>TOTAL FILED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: 2 }}>{stats.total}</div>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>ACTION PENDING</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b', marginTop: 2 }}>{stats.pending}</div>
                </div>
                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '12px', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#22c55e' }}>RESOLVED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#22c55e', marginTop: 2 }}>{stats.resolved}</div>
                </div>
              </div>

              {/* District Complaints List */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>
                Grievances Logged ({stats.matches.length})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 300, overflowY: 'auto' }}>
                {stats.matches.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b', fontSize: '0.9rem' }}>
                    ✅ No active incidents reported in {activeDistrictModal}. All systems operational!
                  </div>
                ) : (
                  stats.matches.map(c => (
                    <div key={c.id} style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12,
                      padding: '12px 16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                          {c.title}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: c.status === 'resolved' ? '#22c55e' : '#f59e0b',
                        }}>
                          {(c.status || 'pending').toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Taluk: <strong>{c.taluk || activeDistrictModal}</strong> · Category: <strong>{c.category}</strong>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── STYLES & RADAR ANIMATIONS ─── */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 60px rgba(239, 68, 68, 0.8); }
        }
        .radar-pulse-icon {
          animation: radarSweep 3s infinite linear;
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
