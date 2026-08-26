import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, Info, Maximize, Scan, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';

const CROP_DISEASES = [
  {
    crop: 'Arecanut (ಅಡಿಕೆ)',
    disease: 'Yellow Leaf Disease (ಹಳದಿ ಎಲೆ ರೋಗ)',
    remedy: 'Apply Bordeaux mixture (ಬೋರ್ಡೋ ದ್ರಾವಣ) 1% spray and ensure proper drainage.',
    fertilizer: 'Add 150g N, 60g P2O5, and 200g K2O per palm annually.',
    scheme: 'Horticulture Crop Insurance / State Subsidies',
    schemeLink: 'https://horticulturedir.karnataka.gov.in/',
    color: '#eab308',
  },
  {
    crop: 'Coffee (ಕಾಫಿ)',
    disease: 'White Stem Borer (ಬಿಳಿ ಕಾಂಡ ಕೊರಕ)',
    remedy: 'Uproot and burn affected plants. Wrap stems or use pheromone traps (ಫೆರೋಮೋನ್ ಬಲೆ).',
    fertilizer: 'Apply NPK 120:90:120 kg/ha in 3 split doses.',
    scheme: 'Coffee Board Subsidies / Krishi Bhagya',
    schemeLink: 'https://indiacoffee.org/schemes/',
    color: '#8b5cf6',
  },
  {
    crop: 'Ragi (ರಾಗಿ)',
    disease: 'Blast Disease (ಬೆಂಕಿ ರೋಗ)',
    remedy: 'Spray Tricyclazole (ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್) at 0.6g per litre of water.',
    fertilizer: 'Apply 50:40:25 kg NPK/ha for rainfed Ragi.',
    scheme: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ) - ₹10,000/hectare',
    schemeLink: 'https://raitamitra.karnataka.gov.in/',
    color: '#ef4444',
  },
  {
    crop: 'Tomato (ಟೊಮೇಟೊ)',
    disease: 'Late Blight (ಅಂಗಮಾರಿ ರೋಗ)',
    remedy: 'Spray Mancozeb (ಮ್ಯಾಂಕೋಜೆಬ್) 2g/litre immediately.',
    fertilizer: 'Ensure calcium supply to prevent blossom end rot.',
    scheme: 'PMFBY Crop Insurance (ಫಸಲ್ ಬಿಮಾ)',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#f97316',
  },
  {
    crop: 'Cotton (ಹತ್ತಿ)',
    disease: 'Pink Bollworm (ಗುಲಾಬಿ ಕಾಯಿಕೊರಕ)',
    remedy: 'Install 5 pheromone traps per acre. Spray Spinosad (ಸ್ಪಿನೋಸ್ಯಾಡ್).',
    fertilizer: 'Apply Zinc Sulphate 50 kg/ha if zinc deficient.',
    scheme: 'Cotton Corporation of India MSP',
    schemeLink: 'https://cotcorp.org.in/',
    color: '#ec4899',
  },
  {
    crop: 'Coconut (ತೆಂಗು)',
    disease: 'Rhinoceros Beetle (ಖಡ್ಗಮೃಗ ದುಂಬಿ)',
    remedy: 'Extract beetles using hooks. Apply Sevidol 8G inside leaf axils.',
    fertilizer: 'Apply 50 kg farm yard manure per tree/year.',
    scheme: 'Coconut Development Board Schemes',
    schemeLink: 'https://coconutboard.gov.in/',
    color: '#14b8a6',
  },
  {
    crop: 'Sugarcane (ಕಬ್ಬು)',
    disease: 'Red Rot (ಕೆಂಪು ಕೊಳೆ ರೋಗ)',
    remedy: 'Plant disease-free setts. Crop rotation with paddy.',
    fertilizer: 'Apply 250:100:125 kg NPK/ha.',
    scheme: 'FRP (Fair and Remunerative Price) Protection',
    schemeLink: 'https://sugarcane.kar.nic.in/',
    color: '#84cc16',
  }
];

export default function CropScanner({ onClose }) {
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [targetIndex, setTargetIndex] = useState(0); // For demo purposes, let presenter choose the target
  const videoRef = useRef(null);
  const { lang } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

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
        console.error("Camera access denied or unavailable, trying fallback:", err);
        try {
          // Fallback to any camera if environment not found (like laptops)
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
          activeStream = fallbackStream;
          setStream(fallbackStream);
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
          }
        } catch (err2) {
          console.error("Total camera failure:", err2);
          setCameraError(true);
        }
      }
    };
    startCamera();

    return () => {
      stopSpeaking();
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [stopSpeaking]);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      // Pick the disease the presenter pre-selected for the demo
      setResult(CROP_DISEASES[targetIndex]);
    }, 2500);
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      if (!result) return;
      const textToSpeak = lang === 'kn' 
        ? `ರೋಗ ಪತ್ತೆಯಾಗಿದೆ: ${result.disease}. ಪರಿಹಾರ: ${result.remedy}. ಸೂಕ್ತವಾದ ಯೋಜನೆ: ${result.scheme}.`
        : `Disease detected: ${result.disease}. Remedy: ${result.remedy}. Applicable scheme: ${result.scheme}.`;
      speak(textToSpeak);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: '#000',
        width: '100%', maxWidth: '500px',
        height: '100%', maxHeight: '850px',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)'
      }}>
        
        {/* Header (Glassmorphic) */}
        <div style={{
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50
        }}>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            <Scan size={24} color="#22c55e" />
            {lang === 'kn' ? 'ಬೆಳೆ ವೈದ್ಯ (AR)' : 'Crop Doctor AR'}
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'background 0.2s'
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Presenter Target Crop Selector (Hidden unless looking closely) */}
        {!result && !scanning && (
          <div style={{ position: 'absolute', top: 70, right: 20, zIndex: 60 }}>
             <select 
               value={targetIndex} 
               onChange={(e) => setTargetIndex(parseInt(e.target.value))}
               style={{ 
                 background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', 
                 padding: '6px 10px', borderRadius: 8, fontSize: 11, backdropFilter: 'blur(4px)', outline: 'none'
               }}
             >
               {CROP_DISEASES.map((d, i) => (
                 <option key={i} value={i} style={{ color: '#000' }}>Demo: {d.crop.split(' ')[0]}</option>
               ))}
             </select>
          </div>
        )}

        {/* Camera / Simulated View */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#111' }}>
          {cameraError ? (
            <div style={{
              width: '100%', height: '100%',
              background: 'url(https://images.unsplash.com/photo-1599818451877-2fb0fae4de4b?w=800&q=80) center/cover',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              filter: scanning ? 'brightness(0.7) sepia(0.3) hue-rotate(90deg)' : 'brightness(0.8)',
              transition: 'filter 0.5s'
            }}>
              <div style={{
                position: 'absolute', top: 120, background: 'rgba(239,68,68,0.8)', color: '#fff',
                padding: '6px 16px', borderRadius: 12, fontSize: 12, fontWeight: 700, backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                SIMULATED CAMERA (DEV MODE)
              </div>
            </div>
          ) : (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ 
                width: '100%', height: '100%', objectFit: 'cover',
                filter: scanning ? 'brightness(0.7)' : 'brightness(1)', transition: 'filter 0.3s'
              }} 
            />
          )}

          {/* AR UI Elements */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15%'
          }}>
            {/* Corner Brackets */}
            <div style={{
              position: 'relative', width: '100%', height: '60%',
              border: `2px solid ${scanning ? '#22c55e' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: 20, transition: 'border-color 0.3s',
              boxShadow: scanning ? '0 0 30px rgba(34, 197, 94, 0.2) inset' : 'none',
              overflow: 'hidden'
            }}>
              {/* Corner Accents */}
              <div style={{ position: 'absolute', top: -2, left: -2, width: 30, height: 30, borderTop: '4px solid #22c55e', borderLeft: '4px solid #22c55e', borderTopLeftRadius: 20 }} />
              <div style={{ position: 'absolute', top: -2, right: -2, width: 30, height: 30, borderTop: '4px solid #22c55e', borderRight: '4px solid #22c55e', borderTopRightRadius: 20 }} />
              <div style={{ position: 'absolute', bottom: -2, left: -2, width: 30, height: 30, borderBottom: '4px solid #22c55e', borderLeft: '4px solid #22c55e', borderBottomLeftRadius: 20 }} />
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 30, height: 30, borderBottom: '4px solid #22c55e', borderRight: '4px solid #22c55e', borderBottomRightRadius: 20 }} />

              {/* Scanning Laser */}
              {scanning && (
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: 3,
                  background: '#22c55e', boxShadow: '0 0 20px 4px rgba(34, 197, 94, 0.7)',
                  animation: 'arScan 2s infinite linear'
                }} />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Panel */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)',
          borderTopLeftRadius: 32, borderTopRightRadius: 32,
          padding: '24px', minHeight: 220, zIndex: 60,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          transform: result ? 'translateY(0)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {!result ? (
            <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 4, background: '#cbd5e1', borderRadius: 4, margin: '0 auto 20px' }} />
              <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                {lang === 'kn' ? 'ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Analyze Crop Health'}
              </h3>
              <p style={{ margin: '0 0 24px', color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                {lang === 'kn' ? 'ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಪರಿಹಾರ ಪಡೆಯಲು ಎಲೆಯನ್ನು ಫ್ರೇಮ್‌ನಲ್ಲಿ ಇರಿಸಿ.' : 'Point camera at the affected leaf to identify diseases, get remedies, and find govt schemes.'}
              </p>
              <button
                onClick={handleScan}
                disabled={scanning}
                style={{
                  background: scanning ? '#94a3b8' : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: '#fff', border: 'none', borderRadius: 16,
                  padding: '16px 32px', fontSize: 18, fontWeight: 800,
                  width: '100%', cursor: scanning ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  boxShadow: scanning ? 'none' : '0 12px 30px rgba(22, 163, 74, 0.35)',
                  transition: 'all 0.2s', transform: scanning ? 'scale(0.98)' : 'scale(1)'
                }}
              >
                {scanning ? (
                  <>
                    <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s infinite linear' }} />
                    {lang === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'AI is Analyzing...'}
                  </>
                ) : (
                  <>
                    <Scan size={24} />
                    {lang === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ' : 'Start Scan'}
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="animate-fadeInUp" style={{ paddingBottom: 10 }}>
              <div style={{ width: 40, height: 4, background: '#cbd5e1', borderRadius: 4, margin: '0 auto 16px' }} />
              
              {/* Result Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 20, background: `${result.color}20`,
                  color: result.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 8px 20px ${result.color}30`
                }}>
                  <AlertTriangle size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>{result.disease}</h3>
                  <span style={{ fontSize: 13, color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Leaf size={14} /> Detected on: {result.crop}
                  </span>
                </div>
              </div>

              {/* Remedy & Fertilizer Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>
                    {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರ' : 'Chemical Remedy'}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                    {result.remedy}
                  </div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>
                    {lang === 'kn' ? 'ರಸಗೊಬ್ಬರ' : 'Fertilizer Mgmt'}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                    {result.fertilizer}
                  </div>
                </div>
              </div>

              {/* Scheme Highlight */}
              <a 
                href={result.schemeLink || '#'} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 14, 
                  background: 'linear-gradient(90deg, #f0fdf4 0%, #ecfdf5 100%)', 
                  border: '1px solid #bbf7d0', borderRadius: 16, padding: '16px', 
                  marginBottom: 24, boxShadow: '0 4px 12px rgba(22, 163, 74, 0.05)',
                  textDecoration: 'none', cursor: 'pointer', transition: 'transform 0.1s'
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ background: '#16a34a', borderRadius: '50%', padding: 8, color: '#fff' }}>
                  <ShieldCheck size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
                    {lang === 'kn' ? 'ಸೂಕ್ತವಾದ ಯೋಜನೆ (ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ)' : 'Eligible Govt Scheme (Click to Apply)'}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#14532d' }}>
                    {result.scheme}
                  </div>
                </div>
                <div style={{ color: '#16a34a', opacity: 0.8 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </div>
              </a>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={toggleVoice}
                  style={{
                    flex: 1, background: isSpeaking ? '#ef4444' : '#1e293b', color: '#fff', border: 'none', borderRadius: 16,
                    padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: isSpeaking ? '0 8px 20px rgba(239, 68, 68, 0.3)' : '0 8px 20px rgba(30, 41, 59, 0.3)', transition: 'all 0.2s'
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Volume2 size={20} />
                  {isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸು' : 'Stop Voice') : (lang === 'kn' ? 'ಓದಿ ಹೇಳಿ' : 'Read Aloud')}
                </button>
                <button
                  onClick={() => { stopSpeaking(); setResult(null); }}
                  style={{
                    background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 16,
                    padding: '16px 24px', fontSize: 16, fontWeight: 800, cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
                >
                  {lang === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್' : 'Scan Again'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes arScan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
