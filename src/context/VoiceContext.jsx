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
    if ('speechSynthesis' in window) {
      // cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'kn') {
        utterance.lang = 'kn-IN';
      } else if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis API is not supported in this browser.");
    }
  }, [lang]);

  // Expose clear transcript to allow the widget to reset after processing
  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return (
    <VoiceContext.Provider value={{
      isListening,
      isSpeaking,
      transcript,
      startListening,
      stopListening,
      speak,
      clearTranscript,
      error
    }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}
