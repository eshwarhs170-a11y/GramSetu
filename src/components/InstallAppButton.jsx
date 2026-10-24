import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle2, X, Share } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function InstallAppButton({ variant = 'nav', style = {} }) {
  const { lang } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already installed in standalone mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.__gramSetuInstallPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.__gramSetuInstallPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
      return;
    }

    // Check if iOS
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    // Fallback info modal for desktop/Android if prompt wasn't captured yet
    alert(
      lang === 'kn'
        ? 'GramSetu ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು: ಬ್ರೌಸರ್‌ನ ಮೆನು (ಮೂರು ಚುಕ್ಕೆಗಳು ⋮) ಒತ್ತಿ "Add to Home Screen" ಅಥವಾ "Install App" ಆಯ್ಕೆಮಾಡಿ.'
        : 'To install GramSetu on your device: Tap your browser menu (⋮) and select "Add to Home Screen" or "Install App".'
    );
  };

  if (isInstalled) {
    return null;
  }

  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="hover-lift"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '14px 24px',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
            ...style
          }}
        >
          <Smartphone size={18} strokeWidth={2.4} />
          <span>{lang === 'kn' ? '📲 ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ (ಆಫ್‌ಲೈನ್ ಲಭ್ಯ)' : '📲 Install App (Works Offline)'}</span>
        </button>

        {showIosGuide && <IosInstallModal onClose={() => setShowIosGuide(false)} lang={lang} />}
      </>
    );
  }

  // Default 'nav' variant
  return (
    <>
      <button
        onClick={handleInstallClick}
        className="hover-lift install-app-btn-nav"
        title="Install GramSetu as an offline app"
        style={{
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          padding: '8px 12px',
          fontWeight: 800,
          fontSize: 13,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)',
          whiteSpace: 'nowrap',
          ...style
        }}
      >
        <Download size={15} strokeWidth={2.4} />
        <span className="install-app-btn-text">{lang === 'kn' ? 'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್' : 'Install App'}</span>
      </button>

      {showIosGuide && <IosInstallModal onClose={() => setShowIosGuide(false)} lang={lang} />}
    </>
  );
}

function IosInstallModal({ onClose, lang }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: 24, maxWidth: 360, width: '100%',
        color: '#0f172a', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ fontSize: 40, marginBottom: 10 }}>📲</div>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 10px 0' }}>
          {lang === 'kn' ? 'iPhone ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' : 'Install on iPhone / iPad'}
        </h3>
        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 16px 0' }}>
          1. Safari ಕೆಳಭಾಗದಲ್ಲಿರುವ <strong>Share</strong> ಬಟನ್ <Share size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> ಒತ್ತಿರಿ.<br/>
          2. ನಂತರ <strong>"Add to Home Screen"</strong> ಆಯ್ಕೆಮಾಡಿ.<br/>
          3. ಈಗ GramSetu ನೇರವಾಗಿ ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಆಗುತ್ತದೆ.
        </p>
        <button
          onClick={onClose}
          style={{
            background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10,
            padding: '10px 20px', fontWeight: 800, width: '100%', cursor: 'pointer'
          }}
        >
          OK, Got It
        </button>
      </div>
    </div>
  );
}
