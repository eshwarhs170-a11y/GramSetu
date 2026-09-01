import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from './LanguageContext';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState('');
  const voicesRef = useRef([]);
  const voicesLoadedRef = useRef(false);

  // Pre-load voices as early as possible
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis?.getVoices() || [];
      voicesLoadedRef.current = voicesRef.current.length > 0;
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // ── Auto-unlock Audio Context on first user touch / click for mobile Chrome/Safari ──
  useEffect(() => {
    const unlockAudio = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
        const dummy = new SpeechSynthesisUtterance('');
        dummy.volume = 0;
        window.speechSynthesis.speak(dummy);
      }
    };
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('click', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, []);

  // ── Keep Android Chrome TTS from pausing on long text ──
  useEffect(() => {
    let interval;
    if (isSpeaking) {
      interval = setInterval(() => {
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
          window.speechSynthesis.resume();
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech Recognition is not supported in your browser.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;

    // ── Language mapping ──
    rec.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

    rec.onstart  = () => { setIsListening(true); setError(''); };
    rec.onend    = () => setIsListening(false);
    rec.onerror  = (ev) => {
      setIsListening(false);
      if (ev.error === 'not-allowed') setError('Microphone permission denied.');
      else if (ev.error === 'no-speech') setError('No speech detected. Try again.');
      else setError('Error: ' + ev.error);
    };
    rec.onresult = (ev) => {
      let finalT = '', interimT = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) finalT += t;
        else interimT += t;
      }
      setTranscript(finalT || interimT);
    };

    setRecognition(rec);
  }, [lang]);

  const startListening = useCallback(() => {
    if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
    setError('');
    if (recognition) {
      try { recognition.start(); } catch { /* already started */ }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) recognition.stop();
  }, [recognition]);

  // ─────────────────────────────────────────────────────────────
  // speak() — fully language-aware, with audio resume & mobile support
  // ─────────────────────────────────────────────────────────────
  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window) || !text) return;
    
    // Force resume and clear queue
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      voicesRef.current = voices;

      let targetVoice = null;
      let textToSpeak = text;
      let langCode = 'en-IN';

      if (lang === 'kn') {
        targetVoice =
          voices.find(v => v.lang === 'kn-IN' || v.lang === 'kn_IN') ||
          voices.find(v => v.lang.startsWith('kn'));

        if (targetVoice) {
          langCode = 'kn-IN';
        } else {
          targetVoice =
            voices.find(v => v.lang.startsWith('en-IN') && v.name.toLowerCase().includes('google')) ||
            voices.find(v => v.lang.startsWith('en-IN')) ||
            voices.find(v => v.lang.startsWith('en'));
          langCode = targetVoice?.lang || 'en-IN';

          if (/[\u0C80-\u0CFF]/.test(text)) {
            textToSpeak = kannadaToEnglishTTS(text);
          }
        }
      } else if (lang === 'hi') {
        targetVoice =
          voices.find(v => v.lang === 'hi-IN' || v.lang === 'hi_IN') ||
          voices.find(v => v.lang.startsWith('hi'));
        langCode = 'hi-IN';
      } else {
        targetVoice =
          voices.find(v => v.lang.startsWith('en-IN') && v.name.toLowerCase().includes('google')) ||
          voices.find(v => v.lang.startsWith('en-GB') && v.name.toLowerCase().includes('google')) ||
          voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google')) ||
          voices.find(v => v.lang.startsWith('en'));
        langCode = 'en-IN';
      }

      const utt = new SpeechSynthesisUtterance(textToSpeak);
      if (targetVoice) {
        utt.voice = targetVoice;
        utt.lang = targetVoice.lang;
      } else {
        utt.lang = langCode;
      }

      utt.rate   = 0.95;
      utt.pitch  = 1.0;
      utt.volume = 1.0;

      utt.onstart = () => setIsSpeaking(true);
      utt.onend   = () => setIsSpeaking(false);
      utt.onerror = (err) => {
        console.warn('TTS error:', err);
        setIsSpeaking(false);
      };

      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utt);
    };

    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        doSpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          doSpeak();
        };
        doSpeak();
      }
    }, 60);
  }, [lang]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
  }, []);

  const clearTranscript = useCallback(() => setTranscript(''), []);

  return (
    <VoiceContext.Provider value={{ isListening, isSpeaking, transcript, error, startListening, stopListening, speak, stopSpeaking, clearTranscript }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}

// ─────────────────────────────────────────────────────────────────────
// Kannada → English TTS fallback mapper
// Used when no Kannada TTS voice is available on the device
// ─────────────────────────────────────────────────────────────────────
function kannadaToEnglishTTS(kannadaText) {
  const map = [
    // Greetings & Common
    ['ನಮಸ್ಕಾರ', 'Namaskara'],
    ['ಸ್ವಾಗತ', 'Swagata'],
    ['ಧನ್ಯವಾದ', 'Dhanyavada'],
    ['ಕ್ಷಮಿಸಿ', 'Ksamisi'],
    ['ಹೌದು', 'Haudu'],
    ['ಇಲ್ಲ', 'Illa'],
    // GramSetu
    ['ಗ್ರಾಮಸೇತು', 'GramSetu'],
    ['ಡ್ಯಾಶ್ಬೋರ್ಡ್', 'Dashboard'],
    ['ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'Dashboard'],
    // Crops
    ['ರಾಗಿ', 'Ragi'],
    ['ಭತ್ತ', 'Bhatta'],
    ['ತೊಗರಿ', 'Togari'],
    ['ತೆಂಗು', 'Tengu'],
    ['ಅಡಿಕೆ', 'Adike'],
    ['ಕಾಫಿ', 'Coffee'],
    ['ಕಬ್ಬು', 'Kabbu'],
    ['ಟೊಮೇಟೊ', 'Tomato'],
    ['ಮಾವು', 'Mavu'],
    ['ಬಾಳೆ', 'Bale'],
    ['ಈರುಳ್ಳಿ', 'Eerulli'],
    ['ಹತ್ತಿ', 'Hatti'],
    ['ಜೋಳ', 'Jola'],
    ['ಗೋಧಿ', 'Godhi'],
    // Diseases
    ['ಬೆಂಕಿ ರೋಗ', 'Benki roga or Blast disease'],
    ['ಅಂಗಮಾರಿ', 'Angamari or Blight disease'],
    ['ತುಕ್ಕು', 'Tukku or Rust disease'],
    ['ಸೊರಗು', 'Soragu or Wilt disease'],
    ['ರೋಗ', 'disease'],
    // Schemes
    ['ಯೋಜನೆ', 'scheme'],
    ['ಸರ್ಕಾರಿ', 'government'],
    ['ರೈತ', 'farmer'],
    ['ಕ್ಷಮಿಸಿ', 'Sorry'],
    // Actions
    ['ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ', 'Analyzing'],
    ['ಸ್ಕ್ಯಾನ್', 'Scan'],
    ['ಪ್ರಾರಂಭಿಸಿ', 'start'],
    ['ಮತ್ತೆ', 'again'],
    ['ಓದಿ ಹೇಳಿ', 'Read aloud'],
    ['ನಿಲ್ಲಿಸು', 'Stop'],
    ['ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ', 'Thinking'],
    ['ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ', 'Listening'],
    // Misc
    ['ಮನೆ', 'Home'],
    ['ಮುಖಪುಟ', 'Home page'],
    ['ದೂರು', 'complaint'],
    ['ಬೆಲೆ', 'price'],
    ['ಮಾರುಕಟ್ಟೆ', 'market'],
  ];

  let result = kannadaText;
  for (const [kn, en] of map) {
    result = result.replaceAll(kn, en);
  }

  // Remove remaining untranslated Kannada chars gracefully
  return result.replace(/[\u0C80-\u0CFF]/g, ' ').replace(/\s{2,}/g, ' ').trim();
}
