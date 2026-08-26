import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import { processVoiceCommand } from '../utils/voiceCommands';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Square, AlertCircle, Sparkles, Volume2 } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function DemoVoicePage() {
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, stopSpeaking, clearTranscript, error } = useVoice();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [lastResponse, setLastResponse] = useState('');
  const [micError, setMicError] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | listening | thinking | speaking
  
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  const streamRef = useRef(null);

  // Sync status with voice state
  useEffect(() => {
    if (isListening) setStatus('listening');
    else if (isSpeaking) setStatus('speaking');
  }, [isListening, isSpeaking]);

  useEffect(() => {
    if (transcript && !isListening) {
      const processCommand = async () => {
        setStatus('thinking');
        setLastResponse(lang === 'kn' ? 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...' : 'Thinking...');
        try {
          const action = await processVoiceCommand(transcript, lang);
          if (action) {
            if (action.response) {
              setLastResponse(action.response);
              setStatus('speaking');
              speak(action.response);
            }
            // FIX: Actually navigate when AI returns a navigate action
            if (action.type === 'navigate' && action.payload) {
              setTimeout(() => navigate(action.payload), 1500);
            }
          }
        } catch (err) {
          console.error(err);
          setStatus('idle');
        } finally {
          clearTranscript();
        }
      };
      processCommand();
    }
  }, [transcript, isListening, speak, clearTranscript, lang, navigate]);

  // Handle clicking a hint chip — send directly to AI without mic
  const handleHintClick = async (text) => {
    if (status === 'thinking' || status === 'listening') return;
    if (isSpeaking) stopSpeaking();
    setLastResponse('');
    setMicError(null);
    setStatus('thinking');
    setLastResponse(lang === 'kn' ? 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...' : 'Thinking...');
    try {
      const action = await processVoiceCommand(text, lang);
      if (action) {
        if (action.response) {
          setLastResponse(action.response);
          setStatus('speaking');
          speak(action.response);
        }
        if (action.type === 'navigate' && action.payload) {
          setTimeout(() => navigate(action.payload), 1500);
        }
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (!isSpeaking && status === 'speaking') {
      setStatus('idle');
    }
  }, [isSpeaking, status]);

  // Draw idle animated wave
  const drawIdleWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let t = 0;
    
    const animate = () => {
      if (analyserRef.current) return; // stop if real audio takes over
      requestRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      t += 0.04;
      
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const amp = 12 + w * 4;
        const freq = 0.025 - w * 0.005;
        const speed = t * (1 - w * 0.2);
        const alpha = 0.15 + w * 0.1;
        ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.lineWidth = 2 + w;
        
        for (let x = 0; x <= W; x++) {
          const y = H / 2 + amp * Math.sin(x * freq + speed) * Math.cos(x * freq * 0.5 + speed * 0.7);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };
    animate();
  }, []);

  // Audio Visualizer Logic
  useEffect(() => {
    if (isListening) {
      startVisualizer();
    } else {
      stopVisualizer();
      drawIdleWave();
    }
    return () => stopVisualizer();
  }, [isListening, drawIdleWave]);

  useEffect(() => {
    drawIdleWave();
  }, [drawIdleWave]);

  const startVisualizer = async () => {
    setMicError(null);
    // Cancel idle animation
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 128;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const W = canvas.width;
      const H = canvas.height;
      
      const draw = () => {
        if (!analyserRef.current) return;
        requestRef.current = requestAnimationFrame(draw);
        analyserRef.current.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, W, H);
        
        // Draw mirrored bars from center for a beautiful symmetric visualizer
        const totalBars = 40;
        const barW = (W / 2) / totalBars - 2;
        
        for (let i = 0; i < totalBars; i++) {
          const value = dataArray[Math.floor(i * bufferLength / totalBars / 2)];
          const barH = Math.max(4, (value / 255) * H * 0.9);
          
          const gradient = ctx.createLinearGradient(0, H, 0, 0);
          gradient.addColorStop(0, '#16a34a');
          gradient.addColorStop(0.5, '#22c55e');
          gradient.addColorStop(1, '#86efac');
          ctx.fillStyle = gradient;
          
          const glow = ctx.createLinearGradient(0, H, 0, 0);
          glow.addColorStop(0, 'rgba(34,197,94,0.3)');
          glow.addColorStop(1, 'rgba(134,239,172,0.1)');
          
          // Right side
          const xRight = W / 2 + i * (barW + 2);
          ctx.beginPath();
          ctx.roundRect(xRight, (H - barH) / 2, barW, barH, 3);
          ctx.fill();
          
          // Left side (mirrored)
          const xLeft = W / 2 - (i + 1) * (barW + 2);
          ctx.beginPath();
          ctx.roundRect(xLeft, (H - barH) / 2, barW, barH, 3);
          ctx.fill();
        }
      };
      draw();
    } catch (err) {
      console.error('Mic error:', err);
      setMicError(err.name === 'NotAllowedError'
        ? 'Microphone access denied. Please allow microphone in your browser settings.'
        : err.message);
    }
  };

  const stopVisualizer = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    analyserRef.current = null;
    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const toggleListening = () => {
    if (isSpeaking) {
      stopSpeaking();
      setStatus('idle');
    } else if (isListening) {
      stopListening();
    } else {
      startListening();
      setLastResponse('');
      setMicError(null);
    }
  };

  const statusColors = {
    idle: '#22c55e',
    listening: '#ef4444',
    thinking: '#a855f7',
    speaking: '#f59e0b',
  };

  const statusLabels = {
    idle: 'TAP TO SPEAK',
    listening: 'LISTENING...',
    thinking: 'THINKING...',
    speaking: 'TAP TO STOP',
  };

  const btnColor = statusColors[status];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a1628 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative background glows */}
      <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <LanguageSwitcher />
      </div>

      {/* Main Card */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(24px)',
        borderRadius: '32px',
        padding: '48px 40px',
        border: '1px solid rgba(34, 197, 94, 0.15)',
        boxShadow: '0 0 60px rgba(34, 197, 94, 0.05), 0 25px 50px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '820px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(34,197,94,0.3)' }}>
            <Sparkles size={24} color="#22c55e" />
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #ffffff 0%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            GramSetu AI
          </h1>
        </div>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: 40, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          Voice Assistant · ಧ್ವನಿ ಸಹಾಯಕ
        </p>

        {/* Visualizer Canvas */}
        <div style={{
          width: '100%',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 20,
          padding: '20px 16px',
          marginBottom: 36,
          border: `1px solid ${status === 'listening' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.1)'}`,
          boxShadow: status === 'listening' ? '0 0 20px rgba(239,68,68,0.1) inset' : 'none',
          transition: 'all 0.4s ease',
          position: 'relative',
        }}>
          <canvas ref={canvasRef} width={740} height={100} style={{ display: 'block', width: '100%' }} />
          
          {/* Status dot in canvas */}
          <div style={{ position: 'absolute', top: 12, right: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: btnColor, boxShadow: `0 0 8px ${btnColor}`, animation: status === 'listening' ? 'pulse 1s infinite' : 'none' }} />
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.1em' }}>
              {status === 'listening' ? 'LIVE' : 'READY'}
            </span>
          </div>
        </div>

        {/* Response Area */}
        <div style={{
          minHeight: 90,
          width: '100%',
          textAlign: 'center',
          marginBottom: 40,
          padding: '0 16px',
        }}>
          {micError ? (
            <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '1rem', background: 'rgba(239,68,68,0.08)', padding: '16px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle size={20} /> {micError}
            </div>
          ) : error ? (
            <div style={{ color: '#ef4444', fontSize: '1rem' }}>{error}</div>
          ) : status === 'listening' ? (
            <div style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '1.3rem', fontWeight: 500 }}>
              "{transcript || 'Listening to your voice...'}"
            </div>
          ) : status === 'thinking' ? (
            <div style={{ color: '#a855f7', fontSize: '1.3rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Thinking...
            </div>
          ) : status === 'speaking' ? (
            <div style={{ color: '#e2e8f0', fontSize: '1.3rem', fontWeight: 500, lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 8 }}>
              <Volume2 size={20} color="#f59e0b" style={{ marginTop: 4, flexShrink: 0 }} />
              {lastResponse}
            </div>
          ) : (
            <div style={{ color: lastResponse ? '#cbd5e1' : '#334155', fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.5 }}>
              {lastResponse || 'Ask me about crop prices, government schemes, or say "take me to login".'}
            </div>
          )}
        </div>

        {/* Big Mic Button */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          {/* Outer ring */}
          {status === 'listening' && (
            <>
              <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '2px solid rgba(239,68,68,0.3)', animation: 'ringPing 1.5s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: '-40px', borderRadius: '50%', border: '1px solid rgba(239,68,68,0.15)', animation: 'ringPing 1.5s ease-out 0.5s infinite' }} />
            </>
          )}
          {status === 'speaking' && (
            <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', border: '2px solid rgba(245,158,11,0.4)', animation: 'ringPing 2s ease-out infinite' }} />
          )}
          <button
            onClick={toggleListening}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${btnColor}dd, ${btnColor}99)`,
              color: '#fff',
              border: `2px solid ${btnColor}66`,
              boxShadow: `0 0 30px ${btnColor}44, 0 8px 32px rgba(0,0,0,0.4)`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: status === 'listening' ? 'scale(1.08)' : 'scale(1)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {status === 'speaking' ? <Square size={38} fill="currentColor" />
              : status === 'listening' ? <MicOff size={42} />
              : <Mic size={42} />}
          </button>
        </div>

        <div style={{ color: btnColor, fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.85rem', opacity: 0.9, textShadow: `0 0 10px ${btnColor}66` }}>
          {statusLabels[status]}
        </div>

        {/* Clickable hint chips */}
        <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'What is GramSetu?', icon: '🌾' },
            { label: 'ಇಂದು ತೆಂಗಿನ ಬೆಲೆ ಏನು?', icon: '💰' },
            { label: 'How to file a complaint?', icon: '📋' },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => handleHintClick(label)}
              disabled={status === 'thinking' || status === 'listening'}
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 24,
                padding: '10px 18px',
                fontSize: '0.85rem',
                color: '#94a3b8',
                cursor: (status === 'thinking' || status === 'listening') ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
                outline: 'none',
                fontFamily: "'Inter', sans-serif",
                opacity: (status === 'thinking' || status === 'listening') ? 0.5 : 1,
              }}
              onMouseEnter={e => {
                if (status !== 'thinking' && status !== 'listening') {
                  e.currentTarget.style.background = 'rgba(34,197,94,0.18)';
                  e.currentTarget.style.color = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(34,197,94,0.2)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>{icon}</span>
              <span>"{label}"</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ringPing {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
