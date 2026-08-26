import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext';
import {
  Bell, Activity, Clock, ShieldAlert, CheckCircle2, AlertTriangle,
  TrendingUp, Radio, Volume2, VolumeX, Maximize2, Minimize2,
  ExternalLink, Sparkles, MapPin, User, Tag, Calendar, X, PlusCircle
} from 'lucide-react';
import DemoNavHeader from '../components/DemoNavHeader';
import { playLoudNotificationChime } from '../utils/audioAlert';

const INITIAL_MOCK_COMPLAINTS = [
  {
    id: 'GS-KA-0501',
    title: 'Hand Pump Broken — RSK Varuna',
    village: 'Varuna Village',
    district: 'Mysuru',
    taluk: 'Mysuru',
    status: 'pending',
    category: 'Water Supply',
    date: 'Just now',
    priority: 'high',
    submittedBy: 'Ramappa Gowda',
    submittedPhone: '+91 98451 23456',
  },
  {
    id: 'GS-KA-0498',
    title: 'Pothole on Main Road near Bus Stand',
    village: 'Murnad Village',
    district: 'Kodagu',
    taluk: 'Madikeri',
    status: 'inprogress',
    category: 'Roads & Paths',
    date: '4m ago',
    priority: 'medium',
    submittedBy: 'Kaveri Amma',
    submittedPhone: '+91 98459 87654',
  },
  {
    id: 'GS-KA-0489',
    title: 'Street Light Transformer Fuse Blown',
    village: 'Siddalingapura',
    district: 'Mysuru',
    taluk: 'Mysuru',
    status: 'pending',
    category: 'Electricity / BESCOM',
    date: '10m ago',
    priority: 'high',
    submittedBy: 'Nagaraj M',
    submittedPhone: '+91 94481 12233',
  },
];

export default function DemoEventDashboard() {
  const [complaints, setComplaints] = useState(INITIAL_MOCK_COMPLAINTS);
  const [newestId, setNewestId] = useState(null);
  const [activeComplaintModal, setActiveComplaintModal] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'inprogress' | 'resolved'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isFirstLoad = useRef(true);

  // Trigger loud 2-second chime
  const playChime = () => {
    if (!soundEnabled) return;
    playLoudNotificationChime();
  };

  // Real-time Firestore sync
  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.data().id || doc.id,
          _docId: doc.id,
        }));

        const merged = [...fetched, ...INITIAL_MOCK_COMPLAINTS].filter(
          (v, i, a) => a.findIndex(t => t.id === v.id) === i
        );

        setComplaints(merged);

        if (!isFirstLoad.current && fetched.length > 0) {
          const newest = fetched[0];
          setNewestId(newest.id);
          playChime();

          const timer = setTimeout(() => setNewestId(null), 15000);
          return () => clearTimeout(timer);
        }
        isFirstLoad.current = false;
      }
    }, (err) => {
      console.warn('Firestore live listener error:', err);
    });

    return () => unsubscribe();
  }, [soundEnabled]);

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Simulate complaint from audience
  const handleSimulate = async () => {
    const randomId = 'GS-LIVE-' + Math.floor(100 + Math.random() * 900);
    const mock = {
      id: randomId,
      title: 'Water Pipeline Burst near Gram Panchayat',
      village: 'Varuna Village',
      district: 'Mysuru',
      taluk: 'Mysuru',
      status: 'pending',
      category: 'Water Supply',
      date: 'Just now',
      priority: 'high',
      submittedBy: 'Audience Participant',
      submittedPhone: '+91 98450 00111',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'complaints'), mock);
    } catch (e) {
      setComplaints(prev => [mock, ...prev]);
      setNewestId(mock.id);
      playChime();
    }
  };

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inprogressCount = complaints.filter(c => c.status === 'inprogress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'radial-gradient(ellipse at top, #0a0f1e 0%, #060913 100%)'
        : 'radial-gradient(ellipse at top, #f0fdf4 0%, #f8fafc 100%)',
      color: isDark ? '#f8fafc' : '#0f172a',
      padding: '24px 16px',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      {/* Shared Nav Header */}
      <DemoNavHeader currentPhase="dashboard" />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Mission Control Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
          padding: '20px 24px',
          borderRadius: '24px',
          background: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          backdropFilter: 'blur(16px)',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
            }}>
              <Activity size={26} />
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
                  Live Escalation Race
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'ping 1.5s infinite' }} />
                  2s CHIME ACTIVE
                </span>
              </div>
              <p style={{ margin: '2px 0 0', color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.82rem' }}>
                Phase 2 · Big Screen Real-Time Complaint Escalation Monitor
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={handleSimulate}
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.3))',
                border: '1px solid rgba(239,68,68,0.5)',
                color: '#f87171',
                borderRadius: 12,
                padding: '10px 16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <PlusCircle size={16} />
              Simulate Mobile Complaint
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
              {soundEnabled ? '2s Chime ON' : 'Muted'}
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
              {isFullscreen ? 'Exit Fullscreen' : 'Big Screen'}
            </button>
          </div>
        </div>

        {/* Clickable Stat Counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}>
          {[
            { id: 'all', label: 'TOTAL GRIEVANCES', subtext: 'Across 31 Districts', count: complaints.length, color: '#3b82f6', icon: Activity },
            { id: 'pending', label: 'ACTION REQUIRED', subtext: 'Pending Line Officer', count: pendingCount, color: '#f59e0b', icon: Clock },
            { id: 'inprogress', label: 'ACTIVE ESCALATIONS', subtext: 'Tier-2+ SLA Threshold', count: inprogressCount, color: '#ef4444', icon: AlertTriangle },
            { id: 'resolved', label: 'RESOLVED CASES', subtext: '17% Resolution Rate', count: resolvedCount, color: '#22c55e', icon: CheckCircle2 },

          ].map(stat => {
            const IconComp = stat.icon;
            const isSelected = filter === stat.id;
            return (
              <div
                key={stat.id}
                onClick={() => setFilter(stat.id)}
                style={{
                  background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                  border: isSelected
                    ? `2px solid ${stat.color}`
                    : (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'),
                  borderRadius: 18,
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 0 20px ${stat.color}33` : 'none',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isDark ? '#64748b' : '#94a3b8', letterSpacing: '0.04em' }}>
                    {stat.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color, marginTop: 4 }}>
                    {stat.count}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: isSelected ? stat.color : (isDark ? '#475569' : '#94a3b8'), fontWeight: 600 }}>
                    {stat.subtext}
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

        {/* Complaints Grid (Clickable Cards) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}>
          {filteredComplaints.map(c => {
            const isNew = c.id === newestId;
            let statusColor = '#f59e0b';
            if (c.status === 'resolved') statusColor = '#22c55e';
            else if (c.status === 'pending') statusColor = '#ef4444';

            return (
              <div
                key={c.id}
                onClick={() => setActiveComplaintModal(c)}
                style={{
                  background: isNew
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.15))'
                    : (isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)'),
                  border: isNew
                    ? '2px solid #ef4444'
                    : (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'),
                  borderRadius: 20,
                  padding: '20px',
                  cursor: 'pointer',
                  boxShadow: isNew
                    ? '0 0 35px rgba(239, 68, 68, 0.5)'
                    : (isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.04)'),
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = statusColor;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isNew ? '#ef4444' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)');
                }}
              >
                {/* Header Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: statusColor,
                      background: `${statusColor}18`,
                      border: `1px solid ${statusColor}33`,
                      borderRadius: 8,
                      padding: '3px 8px',
                      textTransform: 'uppercase',
                    }}>
                      {c.status || 'pending'}
                    </span>
                    {isNew && (
                      <span style={{
                        background: '#ef4444',
                        color: '#fff',
                        borderRadius: 8,
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        animation: 'pulse 1s infinite',
                      }}>
                        ⚡ NEW LIVE
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8', fontWeight: 600 }}>
                    {c.date || 'Today'}
                  </span>
                </div>

                <h3 style={{
                  margin: '0 0 10px',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: isDark ? '#f8fafc' : '#0f172a',
                  lineHeight: 1.4,
                }}>
                  {c.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={14} color="#3b82f6" />
                    <span>{c.village ? `${c.village}, ` : ''}{c.district} ({c.taluk || c.district})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} color="#22c55e" />
                    <span>Submitted by: <strong>{c.submittedBy || 'Citizen'}</strong></span>
                  </div>
                </div>

                <div style={{
                  marginTop: 14,
                  paddingTop: 10,
                  borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: '#3b82f6',
                  fontWeight: 700,
                }}>
                  <span>Inspect SLA & Response Details</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ─── CLICKABLE COMPLAINT INSPECTOR MODAL ─── */}
      {activeComplaintModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
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
            maxWidth: 600,
            padding: '28px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            position: 'relative',
            color: isDark ? '#fff' : '#0f172a',
          }}>
            <button
              onClick={() => setActiveComplaintModal(null)}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#22c55e',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 800,
              }}>
                ID: {activeComplaintModal.id}
              </span>
              <span style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                {activeComplaintModal.category}
              </span>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 16px' }}>
              {activeComplaintModal.title}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.8)', padding: '12px', borderRadius: 12 }}>
                <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>SUBMITTED BY</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: 2 }}>{activeComplaintModal.submittedBy || 'Citizen'}</div>
                <div style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: 2 }}>{activeComplaintModal.submittedPhone || '—'}</div>
              </div>

              <div style={{ background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.8)', padding: '12px', borderRadius: 12 }}>
                <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>LOCATION</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: 2 }}>{activeComplaintModal.district} District</div>
                <div style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 2 }}>{activeComplaintModal.taluk || 'Taluk'}</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: 14,
              padding: '14px 18px',
              marginBottom: 20,
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', marginBottom: 4 }}>
                ⚡ 4-TIER AUTO-ESCALATION STATUS:
              </div>
              <div style={{ fontSize: '0.85rem', color: isDark ? '#e2e8f0' : '#334155' }}>
                Assigned to <strong>PDO ({activeComplaintModal.district})</strong>. 7-Day SLA active. If unresolved, automatically escalates to Taluk Panchayat Executive Officer.
              </div>
            </div>

            <button
              onClick={() => setActiveComplaintModal(null)}
              style={{
                width: '100%',
                background: '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
