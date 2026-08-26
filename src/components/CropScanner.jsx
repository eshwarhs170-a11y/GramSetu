import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';

const CROP_DISEASES = [
  {
    crop: 'Arecanut (ಅಡಿಕೆ)',
    disease: 'Yellow Leaf Disease (ಹಳದಿ ಎಲೆ ರೋಗ)',
    remedy: 'Apply Bordeaux mixture (ಬೋರ್ಡೋ ದ್ರಾವಣ) 1% spray and ensure proper drainage.',
    scheme: 'Horticulture Crop Insurance / State Subsidies',
    color: '#eab308',
  },
  {
    crop: 'Coffee (ಕಾಫಿ)',
    disease: 'White Stem Borer (ಬಿಳಿ ಕಾಂಡ ಕೊರಕ)',
    remedy: 'Uproot and burn affected plants. Use pheromone traps (ಫೆರೋಮೋನ್ ಬಲೆ).',
    scheme: 'Coffee Board Subsidies',
    color: '#8b5cf6',
  },
  {
    crop: 'Ragi (ರಾಗಿ)',
    disease: 'Blast Disease (ಬೆಂಕಿ ರೋಗ)',
    remedy: 'Spray Tricyclazole (ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್) at 0.6g per litre of water.',
    scheme: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ)',
    color: '#ef4444',
  },
  {
    crop: 'Tomato (ಟೊಮೇಟೊ)',
    disease: 'Late Blight (ಅಂಗಮಾರಿ ರೋಗ)',
    remedy: 'Spray Mancozeb (ಮ್ಯಾಂಕೋಜೆಬ್) 2g/litre immediately.',
    scheme: 'PMFBY Crop Insurance (ಫಸಲ್ ಬಿಮಾ)',
    color: '#f97316',
  }
];

export default function CropScanner({ onClose }) {
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const { lang } = useLanguage();
  const { speak } = useVoice();

  useEffect(() => {
    let activeStream = null;
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        activeStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };
    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      // Randomly pick a disease for demo purposes
      const randomDisease = CROP_DISEASES[Math.floor(Math.random() * CROP_DISEASES.length)];
      setResult(randomDisease);
    }, 3000);
  };

  const handleReadAloud = () => {
    if (!result) return;
    const textToSpeak = lang === 'kn' 
      ? `ರೋಗ ಪತ್ತೆಯಾಗಿದೆ: ${result.disease}. ಪರಿಹಾರ: ${result.remedy}. ಸೂಕ್ತವಾದ ಯೋಜನೆ: ${result.scheme}.`
      : `Disease detected: ${result.disease}. Remedy: ${result.remedy}. Applicable scheme: ${result.scheme}.`;
    speak(textToSpeak);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000', display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10
      }}>
        <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Camera size={20} />
          {lang === 'kn' ? 'ಬೆಳೆ ವೈದ್ಯ (AR)' : 'Crop Doctor (AR)'}
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', cursor: 'pointer'
        }}>
          <X size={20} />
        </button>
      </div>

      {/* Camera View */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#111' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />

        {/* AR Overlay Guides */}
        {!result && (
          <div style={{
            position: 'absolute', inset: '20% 10%', border: '2px dashed rgba(255,255,255,0.5)',
            borderRadius: 24, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {scanning && (
              <div style={{
                width: '100%', height: 4, background: '#22c55e',
                boxShadow: '0 0 15px #22c55e',
                animation: 'scanAnim 1.5s infinite alternate ease-in-out'
              }} />
            )}
          </div>
        )}
      </div>

      {/* Bottom Panel */}
      <div style={{
        background: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32,
        padding: '24px 20px', minHeight: 220, position: 'relative', zIndex: 20
      }}>
        {!result ? (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800 }}>
              {lang === 'kn' ? 'ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Point camera at affected crop'}
            </h3>
            <p style={{ margin: '0 0 24px', color: '#64748b', fontSize: 14 }}>
              {lang === 'kn' ? 'ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಪರಿಹಾರ ಪಡೆಯಲು ಎಲೆಯನ್ನು ಫ್ರೇಮ್‌ನಲ್ಲಿ ಇರಿಸಿ.' : 'Keep the leaf in frame to identify diseases and get remedies.'}
            </p>
            <button
              onClick={handleScan}
              disabled={scanning || !stream}
              style={{
                background: scanning ? '#94a3b8' : '#16a34a',
                color: '#fff', border: 'none', borderRadius: 16,
                padding: '16px 32px', fontSize: 18, fontWeight: 700,
                width: '100%', cursor: scanning ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: scanning ? 'none' : '0 10px 25px rgba(22, 163, 74, 0.3)'
              }}
            >
              {scanning ? (
                <>
                  <div style={{ width: 20, height: 20, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s infinite linear' }} />
                  {lang === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Analyzing Image...'}
                </>
              ) : (
                <>
                  <Camera size={22} />
                  {lang === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan Crop'}
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="animate-fadeInUp">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 16, background: `${result.color}20`,
                color: result.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{result.disease}</h3>
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Detected on: {result.crop}</span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
                {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರ' : 'Recommended Remedy'}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>
                {result.remedy}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '12px 16px', marginBottom: 20 }}>
              <ShieldCheck size={20} color="#16a34a" />
              <div>
                <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>
                  {lang === 'kn' ? 'ಸೂಕ್ತವಾದ ಯೋಜನೆ' : 'Applicable Scheme'}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#14532d' }}>
                  {result.scheme}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleReadAloud}
                style={{
                  flex: 1, background: '#1e293b', color: '#fff', border: 'none', borderRadius: 12,
                  padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                <Volume2 size={18} />
                {lang === 'kn' ? 'ಓದಿ ಹೇಳಿ' : 'Read Aloud'}
              </button>
              <button
                onClick={() => setResult(null)}
                style={{
                  background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 12,
                  padding: '14px 20px', fontSize: 15, fontWeight: 700, cursor: 'pointer'
                }}
              >
                {lang === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್' : 'Scan Again'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanAnim {
          0% { transform: translateY(-150px); }
          100% { transform: translateY(150px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
