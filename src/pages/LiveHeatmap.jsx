import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext';
import {
  Flame, Radio, Volume2, VolumeX, Maximize2, Minimize2,
  AlertTriangle, ShieldCheck, CheckCircle2, Clock, MapPin,
  Building2, Activity, Zap, Droplets, Route, RefreshCw, X, Sparkles, Filter, ExternalLink
} from 'lucide-react';
import DemoNavHeader from '../components/DemoNavHeader';
import { playTacticalRadarChime } from '../utils/audioAlert';

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
  const [simulating, setSimulating] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isFirstLoad = useRef(true);

  // Play loud 2.0s tactical sonar chime
  const playTacticalChime = () => {
    if (!soundEnabled) return;
    playTacticalRadarChime();
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

        const merged = [...fetched, ...INITIAL_MOCK_COMPLAINTS].filter(
          (v, i, a) => a.findIndex(t => t.id === v.id) === i
        );

        setComplaints(merged);

        if (!isFirstLoad.current && fetched.length > 0) {
          const newest = fetched[0];
          setLatestComplaint(newest);
          playTacticalChime();

          const timer = setTimeout(() => setLatestComplaint(null), 15000);
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

    let intensity = 'low';
    if (total >= 3) intensity = 'critical';
    else if (total > 0) intensity = 'medium';

    return { total, pending, inprogress, resolved, intensity, matches };
  };

  const totalComplaintsCount = complaints.length;
  const pendingTotal = complaints.filter(c => c.status === 'pending').length;
  const resolvedTotal = complaints.filter(c => c.status === 'resolved').length;
  const activeEscalated = complaints.filter(c => (c.escalationLevel ?? 0) > 0 || c.status === 'escalated').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'radial-gradient(ellipse at top, #0f172a 0%, #060913 100%)'
        : 'radial-gradient(ellipse at top, #f0fdf4 0%, #f8fafc 100%)',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: "'Inter', sans-serif",
      padding: '24px 16px',
      boxSizing: 'border-box',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      {/* Shared Nav Header */}
      <DemoNavHeader currentPhase="map" />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Mission Control Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          padding: '20px 24px',
          borderRadius: '24px',
          background: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          backdropFilter: 'blur(16px)',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.05)',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  background: isDark
                    ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  State Incident Heatmap
                </h1>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  borderRadius: 20,
                  padding: '3px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#22c55e',
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'ping 1.5s infinite' }} />
                  2s SONAR ACTIVE
                </div>
              </div>
              <div style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.82rem', marginTop: 2 }}>
                Phase 4 · Karnataka 31-District Spatial Heat Grid & Escalation Center
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
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
              }}
            >
              <Flame size={16} />
              {simulating ? 'Broadcasting...' : 'Simulate Incident'}
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: soundEnabled ? '#22c55e' : '#64748b',
                borderRadius: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
              {soundEnabled ? 'Sonar ON' : 'Muted'}
            </button>

            <button
              onClick={toggleFullscreen}
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: isDark ? '#cbd5e1' : '#475569',
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
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
              {isFullscreen ? 'Exit' : 'Big Screen'}
            </button>
          </div>
        </div>

        {/* Metrics HUD */}
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
                background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                borderRadius: 18,
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
              }}>
                <div>
                  <div style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {stat.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color, marginTop: 4 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: isDark ? '#475569' : '#94a3b8', marginTop: 2 }}>
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

        {/* Live Incident Alert Toast */}
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

        {/* Spatial Grid & Live Incident Feed */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: 24,
        }}>
          {/* Heatmap Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {REGIONS.map(region => (
              <div key={region.name} style={{
                background: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.85)',
                border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                borderRadius: 20,
                padding: '20px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: region.color }} />
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isDark ? '#e2e8f0' : '#0f172a' }}>
                      {region.name}
                    </h3>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                    {region.districts.length} Districts
                  </div>
                </div>

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

                    let cardBg = isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(248, 250, 252, 0.9)';
                    let cardBorder = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
                    let countColor = isDark ? '#64748b' : '#94a3b8';
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

                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#0f172a' }}>
                          {distName}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                          <span style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                            {stats.total === 0 ? 'Normal' : `${stats.total} Cases`}
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
            background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.85)',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
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
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a' }}>
                  Live Incident Feed
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                {complaints.length} Total
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
              {complaints.slice(0, 15).map(c => (
                <div
                  key={c.id}
                  onClick={() => setActiveDistrictModal(c.district)}
                  style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.7)',
                    border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                    borderRadius: 14,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
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
                    <span style={{ fontSize: '0.72rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                      {c.date || 'Today'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', lineHeight: 1.3 }}>
                    {c.title}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    <span>📍 {c.district}</span>
                    <span style={{ color: isDark ? '#64748b' : '#94a3b8' }}>{c.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* District Inspector Modal */}
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
              background: isDark ? '#0f172a' : '#ffffff',
              border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
              borderRadius: 24,
              width: '100%',
              maxWidth: 640,
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              position: 'relative',
              color: isDark ? '#fff' : '#0f172a',
            }}>
              <button
                onClick={() => setActiveDistrictModal(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  border: 'none',
                  color: isDark ? '#94a3b8' : '#64748b',
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
                  <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
                    {activeDistrictModal} District
                  </h2>
                  <p style={{ margin: '2px 0 0', color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.85rem' }}>
                    Grievance Health & Line Department Resolution Audit
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                <div style={{ background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.8)', padding: '12px', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>TOTAL FILED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: 2 }}>{stats.total}</div>
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

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>
                Grievances Logged ({stats.matches.length})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 300, overflowY: 'auto' }}>
                {stats.matches.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 16px', color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.9rem' }}>
                    ✅ No active incidents reported in {activeDistrictModal}. All systems operational!
                  </div>
                ) : (
                  stats.matches.map(c => (
                    <div key={c.id} style={{
                      background: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.7)',
                      border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                      borderRadius: 12,
                      padding: '12px 16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
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
                      <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
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

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
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
