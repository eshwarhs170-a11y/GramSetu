import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize SpeechRecognition if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      // Set language based on context
      if (lang === 'kn') {
        rec.lang = 'kn-IN';
      } else if (lang === 'hi') {
        rec.lang = 'hi-IN';
      } else {
        rec.lang = 'en-IN';
      }

      rec.onstart = () => {
        setIsListening(true);
        setError('');
      };

      rec.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone permission denied. Please allow it in your browser settings.');
        } else if (event.error === 'no-speech') {
          setError('No speech detected. Please try again.');
        } else {
          setError('Error: ' + event.error);
        }
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
      setError("Speech Recognition is not supported in your browser.");
    }
  }, [lang]); // Reinitialize if language changes

  const startListening = useCallback(async () => {
    try {
      // Immediately stop any ongoing AI speech so the user can speak without interruption
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }

      // Force the browser to ask for microphone permission if not already granted
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // We just needed the permission, stop the stream tracks immediately
        stream.getTracks().forEach(track => track.stop());
      }
      
      if (recognition) {
        recognition.start();
      }
    } catch (e) {
      console.error("Microphone access denied or error:", e);
      setError(`Mic Error: ${e.name || e.message || 'Permission denied'}`);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis API is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      let targetVoice = null;
      let textToSpeak = text;

      if (lang === 'kn') {
        targetVoice = voices.find(v => v.lang.toLowerCase().includes('kn') && v.name.includes('Google'))
                   || voices.find(v => v.lang.toLowerCase().includes('kn'));
        
        if (!targetVoice) {
          // NO KANNADA VOICE (Windows Laptop) -> Fallback to English Voice & English Text
          targetVoice = voices.find(v => v.lang.toLowerCase().includes('en-in') && v.name.includes('Google'))
                     || voices.find(v => v.lang.toLowerCase().startsWith('en'));
          
          if (textToSpeak.includes('ಗ್ರಾಮ ಸೇತುಗೆ ಸ್ವಾಗತ')) {
             textToSpeak = 'Welcome to GramSetu. Here you can access government schemes, APMC market prices, and file complaints. Tap the microphone to talk to me anytime.';
          } else {
             textToSpeak = 'Kannada voice is not supported on this device. Please use English, or open this website on a mobile phone.';
          }
        }
      } else if (lang === 'hi') {
        targetVoice = voices.find(v => v.lang.toLowerCase().includes('hi') && v.name.includes('Google'))
                   || voices.find(v => v.lang.toLowerCase().includes('hi'));
      } else {
        targetVoice = voices.find(v => v.lang.toLowerCase().includes('en-in') && v.name.includes('Google'))
                   || voices.find(v => v.lang.toLowerCase().includes('en-gb') && v.name.includes('Google'))
                   || voices.find(v => v.lang.toLowerCase().startsWith('en') && v.name.includes('Google'));
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (targetVoice) {
        utterance.voice = targetVoice;
        utterance.lang = targetVoice.lang;
      } else {
        utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      }

      utterance.rate = 0.95;  // slightly slower for clarity
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    };

    // Voices may not be loaded yet — wait for them
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        doSpeak();
      };
    }
  }, [lang]);

  // Expose clear transcript to allow the widget to reset after processing
  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const value = {
    isListening,
    isSpeaking,
    transcript,
    error,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    clearTranscript
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}
