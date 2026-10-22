import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OfflineIndicator() {
  const { lang } = useLanguage();
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showRestored) return null;

  return (
    <aside aria-label="Network status" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999999,
      background: !isOnline
        ? 'linear-gradient(135deg, #b45309 0%, #92400e 100%)'
        : 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
      color: '#fff',
      padding: '8px 16px',
      fontSize: 12,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      animation: 'fadeInDown 0.3s ease'
    }}>
      {!isOnline ? (
        <>
          <WifiOff size={16} color="#fde047" />
          <span>
            {lang === 'kn'
              ? '📶 ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ · ಉಳಿಸಿದ ಯೋಜನೆಗಳು, ಮಣ್ಣಿನ NPK ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್ ಮತ್ತು RSK ಫೋನ್ ಸಂಖ್ಯೆಗಳು ಲಭ್ಯವಿದೆ.'
              : '📶 Offline Mode Active · You can still browse cached schemes, calculate NPK fertilizer, and view RSK phone numbers.'}
          </span>
        </>
      ) : (
        <>
          <CheckCircle2 size={16} color="#86efac" />
          <span>
            {lang === 'kn'
              ? '✅ ಇಂಟರ್ನೆಟ್ ಮರಳಿ ಬಂದಿದೆ · ಲೈವ್ ದರಗಳು ಮತ್ತು ಸಿಂಕ್ ಸಕ್ರಿಯವಾಗಿದೆ.'
              : '✅ Back Online · Real-time market prices and sync restored.'}
          </span>
        </>
      )}
    </aside>
  );
}
