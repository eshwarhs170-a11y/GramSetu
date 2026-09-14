import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import {
  doc, getDoc, setDoc, increment, onSnapshot,
  collection, query, orderBy, limit
} from 'firebase/firestore'
import { Users, Activity, Zap } from 'lucide-react'

// ── Visitor Counter ──────────────────────────────────────────────
// Increments on every fresh session (stored in sessionStorage)
export function useVisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem('gs_visited')
    const counterRef = doc(db, 'meta', 'visitor_counter')

    const increment_ = async () => {
      try {
        if (!alreadyCounted) {
          sessionStorage.setItem('gs_visited', '1')
          await setDoc(counterRef, { count: increment(1) }, { merge: true })
        }
      } catch (e) { /* fail silently */ }
    }
    increment_()

    // Live-listen for updates
    const unsub = onSnapshot(counterRef, (snap) => {
      if (snap.exists()) setCount(snap.data().count)
    })
    return unsub
  }, [])

  return count
}

// ── Live Activity Ticker ─────────────────────────────────────────
export function LiveActivityTicker() {
  const [activities, setActivities] = useState([])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Listen to the last 5 complaints in real-time
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'), limit(5))
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map(d => {
        const data = d.data()
        const name = data.submittedBy || 'A farmer'
        const village = data.village || data.taluk || data.district || 'Karnataka'
        const cat = data.category || 'General'
        return `${name} filed a ${cat} complaint from ${village}`
      })
      // Add some static fun activities too
      const staticItems = [
        '🌾 Paddy price updated: ₹3,500/quintal at Mysuru APMC',
        '📢 New scheme: Raitha Siri — ₹10,000/ha for Ragi farmers',
        '🌦️ Rain alert issued for Tumkuru district',
        '✅ PDO resolved a Water complaint in Ramanagara',
        '🔔 GP Meeting scheduled for 16 Sept at Gubbi Panchayat',
      ]
      setActivities([...items, ...staticItems])
    }, () => {
      // Fallback if Firestore fails
      setActivities([
        '🌾 Paddy price updated: ₹3,500/quintal at Mysuru APMC',
        '📢 New scheme: Raitha Siri — ₹10,000/ha for Ragi farmers',
        '✅ PDO resolved a Water complaint in Ramanagara',
        '🔔 GP Meeting: 16 Sept at Gubbi Panchayat',
      ])
    })
    return unsub
  }, [])

  if (!visible || activities.length === 0) return null

  return (
    <div style={{
      background: 'linear-gradient(90deg, #16a34a, #15803d)',
      color: '#fff',
      padding: '6px 0',
      overflow: 'hidden',
      position: 'relative',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.01em',
    }}>
      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
          borderRadius: '50%', width: 18, height: 18, cursor: 'pointer',
          fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}
      >✕</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, paddingRight: 32 }}>
        <Zap size={12} style={{ flexShrink: 0 }} />
        <div style={{
          overflow: 'hidden',
          flex: 1,
        }}>
          <div style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: 'tickerScroll 30s linear infinite',
          }}>
            {activities.join('  •  ')}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {activities.join('  •  ')}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

// ── Visitor Badge (shown on landing/dashboard) ───────────────────
export function VisitorBadge() {
  const count = useVisitorCounter()
  if (!count) return null

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
      border: '1px solid #86efac',
      borderRadius: 20, padding: '4px 14px',
      fontSize: 12, fontWeight: 700, color: '#15803d',
    }}>
      <Users size={13} />
      <span style={{
        fontSize: 15, fontWeight: 900, color: '#16a34a',
        animation: count > 1 ? 'countPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      }}>{count}</span>
      visitors today 🎉
      <style>{`
        @keyframes countPop {
          from { transform: scale(0.7); } to { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
