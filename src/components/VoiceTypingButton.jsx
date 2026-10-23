import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Check, Loader2, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftMicBeep } from '../utils/audioAlert';

export default function VoiceTypingButton({
  onTranscript,
  value = '',
  compact = false,
  inline = false,
  title,
  fieldLabel = '',
  style = {}
}) {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const baseValueRef = useRef(value);

  useEffect(() => {
    baseValueRef.current = value;
  }, [value]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* ignore */ }
      }
    };
  }, []);

  const stopTyping = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
    setIsListening(false);
  };

  const startTyping = () => {
    if (isListening) {
      stopTyping();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        lang === 'kn'
          ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಗೂಗಲ್ ಕ್ರೋಮ್ ಬಳಸಿ.'
          : 'Speech recognition is not supported in this browser. Please use Chrome on Android or Safari on iOS.'
      );
      return;
    }

    // Stop browser TTS if speaking
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    try {
      playSoftMicBeep(true);
      if (navigator.vibrate) navigator.vibrate(40);
    } catch { /* ignore */ }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    // Set speech language based on app language
    rec.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

    const initialText = baseValueRef.current || '';

    rec.onstart = () => {
      setIsListening(true);
      setError('');
    };

    rec.onresult = (e) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const text = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      const spoken = finalTranscript || interimTranscript;
      if (spoken) {
        const separator = initialText && !initialText.endsWith(' ') ? ' ' : '';
        const newText = initialText ? `${initialText}${separator}${spoken}` : spoken;
        if (onTranscript) {
          onTranscript(newText);
        }
      }
    };

    rec.onerror = (e) => {
      console.warn('Voice typing error:', e.error);
      setIsListening(false);
      if (e.error === 'not-allowed') {
        alert(
          lang === 'kn'
            ? 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಮೈಕ್ ಆನ್ ಮಾಡಿ.'
            : 'Microphone permission denied. Please allow microphone access in browser settings.'
        );
      }
    };

    rec.onend = () => {
      setIsListening(false);
      try {
        playSoftMicBeep(false);
      } catch { /* ignore */ }
      setShowDone(true);
      setTimeout(() => setShowDone(false), 1400);
    };

    recognitionRef.current = rec;
    try {
      rec.start();
    } catch (err) {
      console.warn('Could not start recognition:', err);
      setIsListening(false);
    }
  };

  const tooltipText = title || (
    lang === 'kn'
      ? (isListening ? 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ಮುಗಿಸಲು ಒತ್ತಿ' : 'ಧ್ವನಿ ಮೂಲಕ ಬರೆಯಿರಿ (ಕನ್ನಡ/English)')
      : (isListening ? 'Listening... tap to stop' : 'Voice Type (Speak in Kannada or English)')
  );

  // Compact inline button (ideal inside input boxes or next to small inputs)
  if (compact || inline) {
    return (
      <button
        type="button"
        onClick={startTyping}
        title={tooltipText}
        aria-label={tooltipText}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          padding: inline ? '6px 8px' : '4px 8px',
          borderRadius: 8,
          border: isListening
            ? '1.5px solid #ef4444'
            : showDone
            ? '1.5px solid #16a34a'
            : '1px solid rgba(22, 163, 74, 0.3)',
          background: isListening
            ? 'rgba(239, 68, 68, 0.12)'
            : showDone
            ? 'rgba(22, 163, 74, 0.15)'
            : 'rgba(22, 163, 74, 0.08)',
          color: isListening ? '#dc2626' : showDone ? '#15803d' : '#16a34a',
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: isListening ? '0 0 0 3px rgba(239, 68, 68, 0.25)' : 'none',
          animation: isListening ? 'voicePulse 1.2s infinite' : 'none',
          ...style
        }}
      >
        {isListening ? (
          <>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            <MicOff size={14} />
            <span style={{ fontSize: 10, fontWeight: 800 }}>
              {lang === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop'}
            </span>
          </>
        ) : showDone ? (
          <>
            <Check size={13} strokeWidth={3} />
            <span style={{ fontSize: 10 }}>{lang === 'kn' ? 'ಆಗಿದೆ' : 'Done'}</span>
          </>
        ) : (
          <>
            <Mic size={14} strokeWidth={2.4} />
            <span style={{ fontSize: 10.5, fontWeight: 700 }}>
              {lang === 'kn' ? 'ಮಾತನಾಡಿ' : 'Voice'}
            </span>
          </>
        )}
      </button>
    );
  }

  // Full Badge Button (placed next to form labels)
  return (
    <button
      type="button"
      onClick={startTyping}
      title={tooltipText}
      aria-label={tooltipText}
      className="voice-typing-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 9px',
        borderRadius: 20,
        border: isListening
          ? '1.5px solid #ef4444'
          : showDone
          ? '1.5px solid #16a34a'
          : '1.5px solid rgba(22, 163, 74, 0.35)',
        background: isListening
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.2))'
          : showDone
          ? 'rgba(22, 163, 74, 0.15)'
          : 'rgba(22, 163, 74, 0.08)',
        color: isListening ? '#b91c1c' : showDone ? '#15803d' : '#15803d',
        fontSize: 11,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isListening ? '0 0 0 3px rgba(239, 68, 68, 0.25)' : 'none',
        animation: isListening ? 'voicePulse 1.2s infinite' : 'none',
        ...style
      }}
    >
      {isListening ? (
        <>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
          <MicOff size={13} color="#ef4444" />
          <span>{lang === 'kn' ? 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...' : 'Listening...'}</span>
        </>
      ) : showDone ? (
        <>
          <Check size={13} strokeWidth={3} color="#16a34a" />
          <span>{lang === 'kn' ? 'ಸೇರಿಸಲಾಗಿದೆ' : 'Added!'}</span>
        </>
      ) : (
        <>
          <Mic size={13} strokeWidth={2.4} color="#16a34a" />
          <span>{lang === 'kn' ? 'ಧ್ವನಿ ಟೈಪಿಂಗ್' : 'Voice Type'}</span>
        </>
      )}
    </button>
  );
}
