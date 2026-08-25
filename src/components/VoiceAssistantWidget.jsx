import React, { useEffect, useState } from 'react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import { processVoiceCommand } from '../utils/voiceCommands';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export default function VoiceAssistantWidget() {
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, clearTranscript, error } = useVoice();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  useEffect(() => {
    if (transcript && !isListening) {
      const processCommand = async () => {
        // Show loading state while AI thinks
        setLastResponse(lang === 'kn' ? 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...' : 'Thinking...');
        
        try {
          const action = await processVoiceCommand(transcript, lang);
          if (action) {
            if (action.response) {
              setLastResponse(action.response);
              speak(action.response);
            }
            if (action.type === 'navigate' && action.payload) {
              navigate(action.payload);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          clearTranscript();
        }
      };
      processCommand();
    }
  }, [transcript, isListening, navigate, speak, clearTranscript, lang]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setIsOpen(true);
      setLastResponse('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px'
    }}>
      {/* Tooltip / Chat bubble */}
      {isOpen && (
        <div style={{
          background: 'var(--bg-card, #fff)',
          padding: '16px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid var(--border, #e2e8f0)',
          maxWidth: '300px',
          minWidth: '200px',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary, #16a34a)', marginBottom: '8px' }}>
            Voice Assistant
          </div>
          
          <div style={{ fontSize: '14px', color: 'var(--text-main, #1e293b)' }}>
            {error ? (
              <span style={{ color: '#ef4444', fontWeight: 500 }}>{error}</span>
            ) : isListening ? (
              <span style={{ fontStyle: 'italic', color: 'var(--text-muted, #64748b)' }}>
                {transcript || 'Listening...'}
              </span>
            ) : isSpeaking ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="spin" /> Speaking...
              </span>
            ) : (
              <span>{lastResponse || 'Tap the mic and say something!'}</span>
            )}
          </div>
          
          <button 
            onClick={() => setIsOpen(false)} 
            style={{ 
              marginTop: '12px', 
              fontSize: '12px', 
              color: 'var(--text-muted, #64748b)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={toggleListening}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: isListening ? '#ef4444' : 'var(--primary, #16a34a)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
