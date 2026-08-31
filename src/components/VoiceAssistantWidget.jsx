import React, { useEffect, useState, useRef } from 'react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import { processVoiceCommand } from '../utils/voiceCommands';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Loader2, Square, Sparkles, X, ChevronDown } from 'lucide-react';

const UI_TEXT = {
  en: {
    title: 'GramSetu AI',
    listening: 'Listening… speak now',
    thinking: 'Thinking…',
    speaking: 'Speaking…',
    idle: 'Tap 🎙️ and ask anything about crops, schemes, or prices!',
    close: 'Close',
    examples: ['Ragi blast disease?', 'PM Kisan scheme?', 'Tomato price today?'],
    examplesLabel: 'Try asking:',
    tapHint: 'Tap mic to start',
  },
  kn: {
    title: 'ಗ್ರಾಮಸೇತು AI',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ… ಮಾತನಾಡಿ',
    thinking: 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ…',
    speaking: 'ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ…',
    idle: '🎙️ ಅನ್ನು ಒತ್ತಿ ಬೆಳೆ ರೋಗ, ಯೋಜನೆ, ಅಥವಾ ಬೆಲೆ ಬಗ್ಗೆ ಕೇಳಿ!',
    close: 'ಮುಚ್ಚು',
    examples: ['ರಾಗಿ ಬೆಂಕಿ ರೋಗ?', 'PM ಕಿಸಾನ್ ಯೋಜನೆ?', 'ಇಂದು ಟೊಮೇಟೊ ಬೆಲೆ?'],
    examplesLabel: 'ಹೀಗೆ ಕೇಳಿ:',
    tapHint: 'ಮೈಕ್ ಒತ್ತಿ ಪ್ರಾರಂಭಿಸಿ',
  },
  hi: {
    title: 'ग्रामसेतु AI',
    listening: 'सुन रहा हूँ… बोलिए',
    thinking: 'सोच रहा हूँ…',
    speaking: 'बोल रहा हूँ…',
    idle: '🎙️ दबाएं और फसल, योजना, या भाव के बारे में पूछें!',
    close: 'बंद करें',
    examples: ['रागी ब्लास्ट रोग?', 'PM किसान योजना?', 'आज टमाटर का भाव?'],
    examplesLabel: 'पूछें:',
    tapHint: 'माइक दबाएं',
  },
};

export default function VoiceAssistantWidget() {
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, stopSpeaking, clearTranscript, error } = useVoice();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [lastResponse, setLastResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const ui = UI_TEXT[lang] || UI_TEXT.en;

  // Hide on demo / map pages
  if (location.pathname.startsWith('/demo') || location.pathname === '/live-map' || location.pathname === '/magic-login') return null;

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isProcessing]);

  // Process transcript when speech ends
  useEffect(() => {
    if (!transcript || isListening) return;

    const processCommand = async () => {
      const userMsg = transcript.trim();
      if (!userMsg) return;

      // Add user message to chat
      setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
      clearTranscript();
      setIsProcessing(true);
      setLastResponse('');

      try {
        const action = await processVoiceCommand(userMsg, lang);
        if (action?.response) {
          setLastResponse(action.response);
          setChatHistory(prev => [...prev, { role: 'ai', text: action.response }]);
          speak(action.response);
        }
        if (action?.type === 'navigate' && action.payload) {
          setTimeout(() => navigate(action.payload), 1200);
        }
      } catch (err) {
        console.error(err);
        const errMsg = ui.thinking.replace('…', '');
        setChatHistory(prev => [...prev, { role: 'ai', text: lang === 'kn' ? 'ದೋಷ ಉಂಟಾಗಿದೆ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.' : 'An error occurred. Please try again.' }]);
      } finally {
        setIsProcessing(false);
      }
    };

    processCommand();
  }, [transcript, isListening]);

  const toggleListening = () => {
    if (isSpeaking) { stopSpeaking(); return; }
    if (isListening) { stopListening(); return; }
    setIsOpen(true);
    startListening();
  };

  const handleExampleClick = async (example) => {
    setChatHistory(prev => [...prev, { role: 'user', text: example }]);
    setIsProcessing(true);
    try {
      const action = await processVoiceCommand(example, lang);
      if (action?.response) {
        setChatHistory(prev => [...prev, { role: 'ai', text: action.response }]);
        speak(action.response);
      }
    } catch { /* ignore */ }
    finally { setIsProcessing(false); }
  };

  const pulseStyle = isListening
    ? { boxShadow: '0 0 0 8px rgba(239,68,68,0.2), 0 0 0 16px rgba(239,68,68,0.08)', animation: 'voicePulse 1.2s ease-out infinite' }
    : isSpeaking
    ? { boxShadow: '0 0 0 8px rgba(245,158,11,0.2)', animation: 'voicePulse 1.5s ease-out infinite' }
    : { boxShadow: '0 4px 16px rgba(22,163,74,0.3)' };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div style={{
          background: 'var(--bg-card, #fff)',
          borderRadius: 20, width: 300, maxHeight: 440,
          boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(22,163,74,0.1)',
          border: '1px solid var(--border-light, #e2e8f0)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', animation: 'voiceFadeIn 0.25s ease-out',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={16} color="#86efac" />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{ui.title}</span>
            </div>
            <button onClick={() => { setIsOpen(false); stopSpeaking(); }} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <X size={14} />
            </button>
          </div>

          {/* Status bar */}
          <div style={{ background: isListening ? '#fee2e2' : isSpeaking ? '#fef9c3' : isProcessing ? '#eff6ff' : '#f0fdf4', padding: '6px 14px', fontSize: 12, fontWeight: 600, color: isListening ? '#b91c1c' : isSpeaking ? '#854d0e' : isProcessing ? '#1d4ed8' : '#15803d', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--border-light, #e2e8f0)' }}>
            {isListening && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'voicePulse 0.8s infinite' }} />}
            {isSpeaking && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', animation: 'voicePulse 1s infinite' }} />}
            {isProcessing && <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />}
            {error ? <span style={{ color: '#ef4444' }}>{error}</span>
              : isListening ? ui.listening
              : isProcessing ? ui.thinking
              : isSpeaking ? ui.speaking
              : chatHistory.length === 0 ? ui.tapHint
              : '✓ ' + (lang === 'kn' ? 'ಸಿದ್ಧ' : lang === 'hi' ? 'तैयार' : 'Ready')}
          </div>

          {/* Chat area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 4px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 120, maxHeight: 220 }}>
            {chatHistory.length === 0 ? (
              /* Welcome + suggestions */
              <div>
                <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--text-secondary, #475569)', lineHeight: 1.5 }}>{ui.idle}</p>
                <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ui.examplesLabel}</p>
                {ui.examples.map((ex, i) => (
                  <button key={i} onClick={() => handleExampleClick(ex)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'var(--bg-main, #f8fafc)', border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 10, padding: '7px 10px', fontSize: 12, color: 'var(--text-primary, #0f172a)', cursor: 'pointer', marginBottom: 5, fontWeight: 500, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-main, #f8fafc)'}
                  >
                    💬 {ex}
                  </button>
                ))}
              </div>
            ) : (
              chatHistory.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '82%', padding: '8px 12px', borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'var(--bg-main, #f1f5f9)',
                    color: msg.role === 'user' ? '#fff' : 'var(--text-primary, #1e293b)',
                    fontSize: 13, lineHeight: 1.5, fontWeight: msg.role === 'user' ? 600 : 500,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {isProcessing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'var(--bg-main, #f1f5f9)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: `typingDot 1.2s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            {/* Live transcript */}
            {isListening && transcript && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ maxWidth: '82%', padding: '8px 12px', borderRadius: '14px 14px 4px 14px', background: 'rgba(22,163,74,0.12)', border: '1.5px dashed #16a34a', fontSize: 13, color: '#15803d', fontStyle: 'italic' }}>
                  {transcript}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Clear chat */}
          {chatHistory.length > 0 && (
            <div style={{ padding: '6px 12px 10px', borderTop: '1px solid var(--border-light, #e2e8f0)' }}>
              <button onClick={() => setChatHistory([])} style={{ width: '100%', background: 'none', border: 'none', fontSize: 11, color: 'var(--text-muted, #94a3b8)', cursor: 'pointer', fontWeight: 600 }}>
                {lang === 'kn' ? '↺ ಹೊಸ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ' : lang === 'hi' ? '↺ नई बातचीत शुरू करें' : '↺ Start new conversation'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── FAB Button ── */}
      <button
        onClick={toggleListening}
        title={ui.tapHint}
        style={{
          width: 58, height: 58, borderRadius: '50%',
          background: isSpeaking ? 'linear-gradient(135deg, #f59e0b, #d97706)'
            : isListening ? 'linear-gradient(135deg, #ef4444, #b91c1c)'
            : 'linear-gradient(135deg, #16a34a, #15803d)',
          color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease',
          ...pulseStyle,
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isSpeaking ? <Square size={22} fill="currentColor" />
          : isListening ? <MicOff size={24} />
          : <Mic size={24} />}
      </button>

      {/* Show open button if closed */}
      {!isOpen && !isListening && !isSpeaking && (
        <button onClick={() => setIsOpen(true)} style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#15803d', cursor: 'pointer' }}>
          {lang === 'kn' ? 'AI ಸಹಾಯ' : lang === 'hi' ? 'AI मदद' : 'AI Help'}
        </button>
      )}

      <style>{`
        @keyframes voiceFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes voicePulse {
          0%   { opacity: 1; }
          50%  { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-5px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
