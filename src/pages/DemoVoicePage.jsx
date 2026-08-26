import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { processVoiceCommand } from '../utils/voiceCommands';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mic, MicOff, Square, AlertCircle, Sparkles, Volume2,
  Wheat, Sprout, ClipboardList, HelpCircle, ArrowRight, ExternalLink
} from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import DemoNavHeader from '../components/DemoNavHeader';
import { playLoudNotificationChime } from '../utils/audioAlert';

export default function DemoVoicePage() {
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, stopSpeaking, clearTranscript, error } = useVoice();
  const { lang, t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [lastResponse, setLastResponse] = useState('');
  const [micError, setMicError] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | listening | thinking | speaking
  const [cooldown, setCooldown] = useState(0);

  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  const streamRef = useRef(null);

  // Sync status with voice context state
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

  // Clickable question handlers (bypasses microphone for rapid evaluator testing)
  const handleHintClick = async (text) => {
    if (status === 'thinking' || status === 'listening' || cooldown > 0) return;
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
    } finally {
      let secs = 6;
      setCooldown(secs);
      const interval = setInterval(() => {
        secs -= 1;
        setCooldown(secs);
        if (secs <= 0) clearInterval(interval);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isSpeaking && status === 'speaking') {
      setStatus('idle');
    }
  }, [isSpeaking, status]);

  // Draw smooth idle sine wave
  const drawIdleWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let t = 0;

    const animate = () => {
      if (analyserRef.current) return;
      requestRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      t += 0.04;

      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const amp = 12 + w * 4;
        const freq = 0.025 - w * 0.005;
        const speed = t * (1 - w * 0.2);
        const alpha = isDark ? (0.18 + w * 0.12) : (0.3 + w * 0.15);
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
  }, [isDark]);

  // Visualizer Logic
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
        ? 'Microphone access denied. Please click the clickable question chips below instead!'
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

  const quickQuestions = [
    { label: 'What is GramSetu?', sub: 'Explain platform', icon: Sparkles, color: '#22c55e' },
    { label: 'ಇಂದು ತೆಂಗಿನ ಬೆಲೆ ಏನು?', sub: 'Copra Market Price', icon: Wheat, color: '#10b981' },
    { label: 'How to file a complaint?', sub: 'Complaint Steps', icon: ClipboardList, color: '#3b82f6' },
    { label: 'What are the govt schemes?', sub: 'Browse Schemes', icon: Sprout, color: '#f59e0b' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'radial-gradient(ellipse at top, #0a0f1e 0%, #060913 100%)'
        : 'radial-gradient(ellipse at top, #f0fdf4 0%, #f8fafc 100%)',
      color: isDark ? '#fff' : '#0f172a',
      padding: '24px 16px',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflowX: 'hidden',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      {/* Shared Navigation Header */}
      <DemoNavHeader currentPhase="voice" />

      {/* Decorative background glows */}
      <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-120px', right: '-120px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Main Glassmorphic AI Box */}
        <div style={{
          background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(24px)',
          borderRadius: '32px',
          padding: '40px 32px',
          border: isDark ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(34, 197, 94, 0.3)',
          boxShadow: isDark
            ? '0 0 60px rgba(34, 197, 94, 0.08), 0 25px 50px rgba(0,0,0,0.5)'
            : '0 20px 45px rgba(34, 197, 94, 0.12), 0 4px 16px rgba(0,0,0,0.04)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          boxSizing: 'border-box',
        }}>
          
          {/* Top Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: 'rgba(34,197,94,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(34,197,94,0.3)',
              color: '#22c55e',
            }}>
              <Sparkles size={24} />
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              margin: 0,
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 0%, #22c55e 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #16a34a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              GramSetu AI
            </h1>
          </div>

          <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.85rem', marginBottom: 28, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
            Phase 1 · Multilingual Voice Assistant · ಧ್ವನಿ ಸಹಾಯಕ
          </p>

          {/* Visualizer Canvas */}
          <div style={{
            width: '100%',
            background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(240, 253, 244, 0.7)',
            borderRadius: 20,
            padding: '16px',
            marginBottom: 28,
            border: `1.5px solid ${status === 'listening' ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.2)'}`,
            boxShadow: status === 'listening' ? '0 0 25px rgba(239,68,68,0.15) inset' : 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            boxSizing: 'border-box',
          }}>
            <canvas ref={canvasRef} width={740} height={90} style={{ display: 'block', width: '100%' }} />

            <div style={{ position: 'absolute', top: 10, right: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: btnColor, boxShadow: `0 0 8px ${btnColor}`, animation: status === 'listening' ? 'pulse 1s infinite' : 'none' }} />
              <span style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#475569', fontWeight: 700, letterSpacing: '0.08em' }}>
                {status === 'listening' ? 'LISTENING' : 'AUDIO READY'}
              </span>
            </div>
          </div>

          {/* Speech Response Speech Bubble */}
          <div style={{
            minHeight: 80,
            width: '100%',
            textAlign: 'center',
            marginBottom: 32,
            padding: '0 12px',
          }}>
            {micError ? (
              <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.95rem', background: 'rgba(239,68,68,0.08)', padding: '14px 20px', borderRadius: 14, border: '1px solid rgba(239,68,68,0.25)' }}>
                <AlertCircle size={20} /> {micError}
              </div>
            ) : error ? (
              <div style={{ color: '#ef4444', fontSize: '0.95rem' }}>{error}</div>
            ) : status === 'listening' ? (
              <div style={{ fontStyle: 'italic', color: '#22c55e', fontSize: '1.25rem', fontWeight: 600 }}>
                "{transcript || 'Listening to your voice...'}"
              </div>
            ) : status === 'thinking' ? (
              <div style={{ color: '#a855f7', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Thinking in real-time...
              </div>
            ) : status === 'speaking' ? (
              <div style={{
                color: isDark ? '#f8fafc' : '#0f172a',
                fontSize: '1.15rem',
                fontWeight: 600,
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                background: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 16,
                padding: '14px 20px',
              }}>
                <Volume2 size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span>{lastResponse}</span>
              </div>
            ) : (
              <div style={{ color: lastResponse ? (isDark ? '#e2e8f0' : '#1e293b') : (isDark ? '#475569' : '#94a3b8'), fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.5 }}>
                {lastResponse || 'Speak or click any question below to experience real-time multilingual AI voice interaction!'}
              </div>
            )}
          </div>

          {/* Glowing Animated Mic Button */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            {status === 'listening' && (
              <>
                <div style={{ position: 'absolute', inset: '-18px', borderRadius: '50%', border: '2px solid rgba(239,68,68,0.4)', animation: 'ringPing 1.5s ease-out infinite' }} />
                <div style={{ position: 'absolute', inset: '-36px', borderRadius: '50%', border: '1px solid rgba(239,68,68,0.2)', animation: 'ringPing 1.5s ease-out 0.5s infinite' }} />
              </>
            )}
            {status === 'speaking' && (
              <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', border: '2px solid rgba(245,158,11,0.5)', animation: 'ringPing 2s ease-out infinite' }} />
            )}

            <button
              onClick={toggleListening}
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${btnColor}ee, ${btnColor}aa)`,
                color: '#fff',
                border: `3px solid ${btnColor}88`,
                boxShadow: `0 0 35px ${btnColor}55, 0 10px 30px rgba(0,0,0,0.3)`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: status === 'listening' ? 'scale(1.1)' : 'scale(1)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {status === 'speaking' ? <Square size={36} fill="currentColor" />
                : status === 'listening' ? <MicOff size={40} />
                : <Mic size={40} />}
            </button>
          </div>

          <div style={{ color: btnColor, fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.85rem', textShadow: `0 0 12px ${btnColor}55`, marginBottom: 28 }}>
            {statusLabels[status]}
          </div>

          {/* Clickable Evaluator Questions (Grid Layout) */}
          <div style={{ width: '100%', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)', paddingTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', letterSpacing: '0.05em' }}>
                CLICKABLE QUESTIONS (CLICK TO ASK DIRECTLY)
              </div>
              {cooldown > 0 && (
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: 8 }}>
                  ⏱ Cooldown ({cooldown}s)
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {quickQuestions.map((q) => {
                const IconComp = q.icon;
                const isDisabled = status === 'thinking' || status === 'listening' || cooldown > 0;
                return (
                  <button
                    key={q.label}
                    onClick={() => handleHintClick(q.label)}
                    disabled={isDisabled}
                    style={{
                      background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(240, 253, 244, 0.8)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(34,197,94,0.25)',
                      borderRadius: 16,
                      padding: '12px 14px',
                      textAlign: 'left',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      opacity: isDisabled ? 0.6 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      if (!isDisabled) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = q.color;
                        e.currentTarget.style.boxShadow = `0 6px 20px ${q.color}22`;
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(34,197,94,0.25)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `${q.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: q.color, flexShrink: 0 }}>
                      <IconComp size={18} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#0f172a', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        "{q.label}"
                      </div>
                      <div style={{ fontSize: '0.7rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                        {q.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

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
