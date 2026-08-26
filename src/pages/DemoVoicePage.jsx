import React, { useEffect, useRef, useState } from 'react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import { processVoiceCommand } from '../utils/voiceCommands';
import { Mic, MicOff, Square, Activity, AlertCircle } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function DemoVoicePage() {
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, stopSpeaking, clearTranscript, error } = useVoice();
  const { lang } = useLanguage();
  const [lastResponse, setLastResponse] = useState('');
  const [micError, setMicError] = useState(null);
  
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (transcript && !isListening) {
      const processCommand = async () => {
        setLastResponse(lang === 'kn' ? 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...' : 'Thinking...');
        try {
          const action = await processVoiceCommand(transcript, lang);
          if (action && action.response) {
            setLastResponse(action.response);
            speak(action.response);
          }
        } catch (err) {
          console.error(err);
        } finally {
          clearTranscript();
        }
      };
      processCommand();
    }
  }, [transcript, isListening, speak, clearTranscript, lang]);

  // Audio Visualizer Logic
  useEffect(() => {
    if (isListening) {
      startVisualizer();
    } else {
      stopVisualizer();
    }
    return () => stopVisualizer();
  }, [isListening]);

  const startVisualizer = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      
      const draw = () => {
        if (!isListening) return;
        requestRef.current = requestAnimationFrame(draw);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for(let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          // Gradient for bars
          const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, 0);
          gradient.addColorStop(0, '#22c55e');
          gradient.addColorStop(1, '#86efac');
          
          canvasCtx.fillStyle = gradient;
          // Smooth rounded corners approximation
          canvasCtx.beginPath();
          canvasCtx.roundRect(x, canvas.height - barHeight / 1.5, barWidth - 2, barHeight / 1.5, 4);
          canvasCtx.fill();
          
          x += barWidth;
        }
      };
      draw();
    } catch (err) {
      console.error("Mic access denied or error:", err);
      setMicError(err.name === 'NotAllowedError' 
        ? 'Microphone access denied. Please click the padlock icon in your browser address bar and allow microphone access.' 
        : err.message);
    }
  };

  const stopVisualizer = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close();
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.beginPath();
      ctx.roundRect(0, canvas.height / 2 - 2, canvas.width, 4, 2);
      ctx.fill();
    }
  };

  const toggleListening = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (isListening) {
      stopListening();
    } else {
      startListening();
      setLastResponse('');
      setMicError(null);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <LanguageSwitcher />
      </div>

      <div style={{ 
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: 16, textShadow: '0 0 20px rgba(34,197,94,0.4)' }}>
          <Activity size={48} color="#22c55e" /> GramSetu <span style={{ color: '#22c55e' }}>AI</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px', textAlign: 'center' }}>
          Interactive Voice Assistant Demo
        </p>

        {/* Visualizer Canvas */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          borderRadius: '16px', 
          padding: '24px', 
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.05)', 
          boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)', 
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <canvas ref={canvasRef} width="600" height="120" style={{ display: 'block', width: '100%', maxWidth: '600px' }}></canvas>
        </div>

        {/* Chat History Area */}
        <div style={{ 
          minHeight: '100px', 
          width: '100%', 
          textAlign: 'center', 
          marginBottom: '40px', 
          fontSize: '1.5rem',
          lineHeight: '1.4',
          fontWeight: 500
        }}>
          {micError ? (
            <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.2rem' }}>
              <AlertCircle size={24} /> {micError}
            </div>
          ) : error ? (
            <div style={{ color: '#ef4444' }}>{error}</div>
          ) : isListening ? (
            <div style={{ fontStyle: 'italic', color: '#94a3b8' }}>"{transcript || 'Listening to your voice...'}"</div>
          ) : isSpeaking ? (
            <div style={{ color: '#fff' }}>{lastResponse}</div>
          ) : (
            <div style={{ color: '#64748b' }}>{lastResponse || 'Ready.'}</div>
          )}
        </div>

        {/* Big Mic Button */}
        <div style={{ position: 'relative' }}>
          {isListening && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: '#ef4444',
              opacity: 0.3,
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
            }} />
          )}
          <button 
            onClick={toggleListening}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: isSpeaking ? '#f59e0b' : isListening ? '#ef4444' : '#22c55e',
              color: '#fff',
              border: 'none',
              boxShadow: isListening 
                ? '0 0 40px rgba(239, 68, 68, 0.6)' 
                : '0 10px 30px rgba(34, 197, 94, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isListening ? 'scale(1.1)' : 'scale(1)',
              position: 'relative',
              zIndex: 2
            }}
          >
            {isSpeaking ? <Square size={36} fill="currentColor" /> : isListening ? <MicOff size={40} /> : <Mic size={40} />}
          </button>
        </div>
        <div style={{ marginTop: '24px', color: '#64748b', fontWeight: 600, letterSpacing: '2px', fontSize: '0.9rem' }}>
          {isSpeaking ? 'TAP TO STOP' : isListening ? 'LISTENING...' : 'TAP TO SPEAK'}
        </div>
      </div>
      
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
