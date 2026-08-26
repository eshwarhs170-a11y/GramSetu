import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { AlertTriangle, Clock, MapPin, Tag, Zap, Wifi, Users, Activity, Bell } from 'lucide-react';

// Play a ding sound using Web Audio API (no MP3 file needed)
function playDing() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const gain = ctx.createGain();
    o1.connect(gain); o2.connect(gain); gain.connect(ctx.destination);
    o1.frequency.value = 880; o2.frequency.value = 1100;
    o1.type = 'sine'; o2.type = 'sine';
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    o1.start(ctx.currentTime); o2.start(ctx.currentTime + 0.05);
    o1.stop(ctx.currentTime + 1.2); o2.stop(ctx.currentTime + 1.2);
  } catch (e) { console.warn('Audio not available:', e); }
}

const CATEGORY_COLORS = {
  Water: '#3b82f6',
  Roads: '#f59e0b',
  Electricity: '#eab308',
  Agriculture: '#22c55e',
  Education: '#8b5cf6',
  Health: '#ef4444',
  Sanitation: '#06b6d4',
  default: '#64748b',
};

const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

function timeAgo(ts) {
  if (!ts) return 'Just now';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DemoEventDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [newIds, setNewIds] = useState(new Set());
  const [stats, setStats] = useState({ total: 0, pending: 0, inprogress: 0, resolved: 0 });
  const [isLive, setIsLive] = useState(false);
  const prevCountRef = useRef(0);
  const tickRef = useRef(null);
  const [tick, setTick] = useState(0);

  // Tick every second to keep "time ago" fresh
  useEffect(() => {
    tickRef.current = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(tickRef.current);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setIsLive(true);
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Detect new complaints vs previous render
      if (prevCountRef.current > 0 && docs.length > prevCountRef.current) {
        const newlyAdded = docs.slice(0, docs.length - prevCountRef.current);
        const newIdSet = new Set(newlyAdded.map(d => d.id));
        setNewIds(newIdSet);
        playDing();
        // Remove highlight after 4s
        setTimeout(() => setNewIds(new Set()), 4000);
      }
      prevCountRef.current = docs.length;

      setComplaints(docs.slice(0, 12)); // show latest 12
      setStats({
        total: docs.length,
        pending: docs.filter(d => d.status === 'pending').length,
        inprogress: docs.filter(d => d.status === 'inprogress').length,
        resolved: docs.filter(d => d.status === 'resolved').length,
      });
    });
    return () => unsub();
  }, []);

  const statCards = [
    { label: 'Total Complaints', value: stats.total, icon: <Activity size={22} />, color: '#6366f1' },
    { label: 'Pending', value: stats.pending, icon: <Clock size={22} />, color: '#ef4444' },
    { label: 'In Progress', value: stats.inprogress, icon: <Zap size={22} />, color: '#f59e0b' },
    { label: 'Resolved', value: stats.resolved, icon: <Bell size={22} />, color: '#22c55e' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 60%, #0a1628 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      padding: '24px',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={26} color="#22c55e" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GramSetu Live
            </h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              REAL-TIME COMPLAINT MONITOR · KARNATAKA
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Live badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: isLive ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)', border: `1px solid ${isLive ? 'rgba(34,197,94,0.4)' : 'rgba(100,116,139,0.3)'}`, borderRadius: 20, padding: '6px 14px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: isLive ? '#22c55e' : '#64748b', boxShadow: isLive ? '0 0 8px #22c55e' : 'none', animation: isLive ? 'livePulse 2s infinite' : 'none' }} />
            <Wifi size={14} color={isLive ? '#22c55e' : '#64748b'} />
            <span style={{ color: isLive ? '#22c55e' : '#64748b', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              {isLive ? 'LIVE' : 'CONNECTING...'}
            </span>
          </div>
          <div style={{ color: '#334155', fontSize: '0.8rem' }}>
            <Users size={14} style={{ display: 'inline', marginRight: 4 }} />
            Showing latest {complaints.length} complaints
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map(card => (
          <div key={card.label} style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: `1px solid ${card.color}22`,
            borderRadius: 16,
            padding: '20px 24px',
            backdropFilter: 'blur(12px)',
            boxShadow: `0 0 20px ${card.color}11`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{card.label}</div>
              <div style={{ color: card.color, opacity: 0.7 }}>{card.icon}</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Complaint Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {complaints.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#334155', padding: '80px 0', fontSize: '1.2rem' }}>
            <AlertTriangle size={48} style={{ display: 'block', margin: '0 auto 16px', opacity: 0.3 }} />
            No complaints yet. Have the audience submit one!
          </div>
        ) : complaints.map((c, i) => {
          const isNew = newIds.has(c.id);
          const catColor = CATEGORY_COLORS[c.category] || CATEGORY_COLORS.default;
          const priColor = PRIORITY_COLORS[c.priority] || '#64748b';
          return (
            <div key={c.id} style={{
              background: isNew ? 'rgba(239,68,68,0.08)' : 'rgba(15, 23, 42, 0.7)',
              border: `1px solid ${isNew ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 16,
              padding: '20px',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.5s ease',
              boxShadow: isNew ? '0 0 30px rgba(239,68,68,0.2), 0 0 0 2px rgba(239,68,68,0.3)' : 'none',
              animation: isNew ? 'flashIn 0.6s ease-out' : 'none',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {isNew && (
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '3px 8px', borderRadius: 20, letterSpacing: '0.1em', animation: 'flashIn 0.3s ease' }}>
                  🔴 NEW
                </div>
              )}

              {/* Left color stripe */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: '16px 0 0 16px', background: catColor }} />

              <div style={{ paddingLeft: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ background: `${catColor}22`, color: catColor, border: `1px solid ${catColor}44`, fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>
                    <Tag size={10} style={{ display: 'inline', marginRight: 4 }} />
                    {c.category || 'General'}
                  </span>
                  <span style={{ background: `${priColor}15`, color: priColor, fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 10, textTransform: 'uppercase' }}>
                    {c.priority || 'Normal'}
                  </span>
                  <span style={{ marginLeft: 'auto', color: '#475569', fontSize: '0.72rem' }}>
                    #{String(i + 1).padStart(3, '0')}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 10px', fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.4 }}>
                  {c.title || c.description?.slice(0, 60) || 'Untitled Complaint'}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  {c.village && (
                    <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} /> {c.village}
                    </span>
                  )}
                  <span style={{ color: '#475569', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                    <Clock size={12} /> {timeAgo(c.createdAt)}
                  </span>
                </div>

                {/* Status pill */}
                <div style={{ marginTop: 12 }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 10,
                    background: c.status === 'resolved' ? 'rgba(34,197,94,0.15)' : c.status === 'inprogress' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                    color: c.status === 'resolved' ? '#22c55e' : c.status === 'inprogress' ? '#f59e0b' : '#ef4444',
                  }}>
                    {c.status === 'resolved' ? '✓ RESOLVED' : c.status === 'inprogress' ? '⟳ IN PROGRESS' : '● PENDING'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes flashIn {
          0% { transform: scale(1.04); box-shadow: 0 0 60px rgba(239,68,68,0.4); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
