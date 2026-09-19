import fs from 'fs';

const filePath = 'src/components/CropScanner.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace imports and inlined CROP_DISEASES (from top to SEVERITY_CONFIG)
const topMarker = "import React, { useState, useEffect, useRef } from 'react';";
const endMarker = "const SEVERITY_CONFIG = {";

const startIndex = content.indexOf(topMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  throw new Error("Could not find import or SEVERITY_CONFIG markers");
}

const newTop = `import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, Info, Scan, Leaf, AlertCircle, Microscope, Droplets, FlaskConical, Sprout, ChevronRight, Upload, MessageCircle, Send, ImagePlus, ChevronsDown, Loader2, TriangleAlert, CircleCheck, ScanLine, Image, Crop, Layers, Bot, Pill, Building2, ListChecks, RefreshCw, ArrowRight, Wheat, Zap, Lightbulb, ExternalLink, ShoppingBag, Languages, Tag, IndianRupee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { callGemini, callGeminiVision, callGeminiTranslate } from '../utils/voiceCommands';
import { useNavigate } from 'react-router-dom';
import { CROP_DISEASES, UNIQUE_CROPS, demoCards as DEMO_CARDS_DATA, getAgriProductLink } from '../data/cropDiseasesData';

`;

content = newTop + content.substring(endIndex);

// 2. Add viewLang state inside CropScanner
const stateAnchor = "const [activeTab, setActiveTab] = useState('remedy');";
const stateReplacement = `const [activeTab, setActiveTab] = useState('remedy');
  const [viewLang, setViewLang] = useState('auto'); // 'auto' | 'all' | 'kn' | 'hi' | 'en'`;

if (!content.includes(stateAnchor)) {
  throw new Error("Could not find activeTab state anchor");
}
content = content.replace(stateAnchor, stateReplacement);

// 3. Update matchAiToDatabase to handle Hindi crop names as well
const matchAiAnchor = "const cropKeywords = [";
const matchAiEndAnchor = "let matchedCropName = null;";

const matchAiStartIndex = content.indexOf(matchAiAnchor);
const matchAiEndIndex = content.indexOf(matchAiEndAnchor);

if (matchAiStartIndex === -1 || matchAiEndIndex === -1) {
  throw new Error("Could not find matchAiToDatabase markers");
}

const newCropKeywords = `const cropKeywords = [
      { keys: ['paddy', 'rice', 'ಭತ್ತ', 'धान', 'चावल'],               db: 'Paddy / Rice (ಭತ್ತ / धान)' },
      { keys: ['ragi', 'finger millet', 'ರಾಗಿ', 'रागी'],                db: 'Ragi / Finger Millet (ರಾಗಿ / रागी)' },
      { keys: ['maize', 'corn', 'ಜೋಳ', 'मक्का', 'भुट्टा'],              db: 'Maize / Corn (ಜೋಳ / मक्का)' },
      { keys: ['cotton', 'ಹತ್ತಿ', 'कपास'],                             db: 'Cotton (ಹತ್ತಿ / कपास)' },
      { keys: ['tomato', 'ಟೊಮೇಟೊ', 'ಟೊಮೆಟೊ', 'टमाटर'],                   db: 'Tomato (ಟೊಮೇಟೊ / टमाटर)' },
      { keys: ['potato', 'ಆಲೂ', 'ಆಲೂಗಡ್ಡೆ', 'आलू'],                    db: 'Potato (ಆಲೂಗಡ್ಡೆ / आलू)' },
      { keys: ['onion', 'ಈರುಳ್ಳಿ', 'प्याज'],                             db: 'Onion (ಈರುಳ್ಳಿ / प्याज)' },
      { keys: ['sugarcane', 'ಕಬ್ಬು', 'गन्ना'],                          db: 'Sugarcane (ಕಬ್ಬು / गन्ना)' },
      { keys: ['coconut', 'ತೆಂಗು', 'ತೆಂಗಿನಕಾಯಿ', 'नारियल'],              db: 'Coconut (ತೆಂಗು / नारियल)' },
      { keys: ['arecanut', 'areca', 'ಅಡಿಕೆ', 'सुपारी'],                  db: 'Arecanut (ಅಡಿಕೆ / सुपारी)' },
      { keys: ['coffee', 'ಕಾಫಿ', 'कॉफी'],                              db: 'Coffee (ಕಾಫಿ / कॉफी)' },
      { keys: ['banana', 'ಬಾಳೆ', 'ಬಾಳೆಹಣ್ಣು', 'केला'],                  db: 'Banana (ಬಾಳೆ / केला)' },
      { keys: ['mango', 'ಮಾವು', 'ಮಾವಿನಕಾಯಿ', 'आम'],                     db: 'Mango (ಮಾವು / आम)' },
      { keys: ['groundnut', 'peanut', 'ಕಡಲೆಕಾಯಿ', 'मूंगफली'],           db: 'Groundnut (ಕಡಲೆಕಾಯಿ / मूंगफली)' },
      { keys: ['sunflower', 'ಸೂರ್ಯಕಾಂತಿ', 'सूरजमुखी'],                  db: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ / सूरजमुखी)' },
      { keys: ['soybean', 'soya', 'ಸೋಯಾ', 'ಸೋಯಾಬೀನ್', 'सोयाबीन'],       db: 'Soybean (ಸೋಯಾಬೀನ್ / सोयाबीन)' },
      { keys: ['wheat', 'ಗೋಧಿ', 'गेहूं'],                              db: 'Wheat (ಗೋಧಿ / गेहूं)' },
      { keys: ['jowar', 'sorghum', 'ಜೋಳ', 'ज्वार'],                     db: 'Jowar / Sorghum (ಜೋಳ / ज्वार)' },
      { keys: ['chickpea', 'bengal gram', 'ಕಡಲೆ', 'चना'],             db: 'Chickpea / Bengal Gram (ಕಡಲೆ / चना)' },
      { keys: ['chilli', 'chili', 'ಮೆಣಸಿನಕಾಯಿ', 'मिर्च'],              db: 'Chilli (ಮೆಣಸಿನಕಾಯಿ / मिर्च)' },
      { keys: ['mung', 'green gram', 'ಹೆಸರು', 'ಹೆಸರುಕಾಳು', 'मूंग'],    db: 'Mung Bean / Green Gram (ಹೆಸರುಕಾಳು / मूंग)' },
      { keys: ['pepper', 'black pepper', 'ಮೆಣಸು', 'ಕರಿಮೆಣಸು', 'काली मिर्च'], db: 'Black Pepper (ಕರಿಮೆಣಸು / काली मिर्च)' },
    ];

    `;

content = content.substring(0, matchAiStartIndex) + newCropKeywords + content.substring(matchAiEndIndex);

// 4. Update toggleVoice
const voiceAnchor = "const toggleVoice = () => {";
const voiceEndAnchor = "const handleImageUpload = (e) => {";

const voiceStartIndex = content.indexOf(voiceAnchor);
const voiceEndIndex = content.indexOf(voiceEndAnchor);

if (voiceStartIndex === -1 || voiceEndIndex === -1) {
  throw new Error("Could not find toggleVoice markers");
}

const newToggleVoice = `const toggleVoice = () => {
    if (!result || result === 'NO_CROP') return;
    if (isSpeaking) { stopSpeaking(); return; }

    const effectiveLang = viewLang === 'auto' ? lang : (viewLang === 'all' ? lang : viewLang);
    let text = '';

    if (effectiveLang === 'kn') {
      const diseasePart = result.diseaseKn || result.disease;
      const remedyPart = result.remedyKn || translatedRemedy || result.remedy;
      text = \`ರೋಗ: \${diseasePart}. ಬೆಳೆ: \${result.cropKn || result.crop}. ಪರಿಹಾರ: \${remedyPart}. \${result.scheme ? \`ಅರ್ಹ ಯೋಜನೆ: \${result.scheme}\` : 'ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ ಇಲ್ಲ. ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ ಅಥವಾ KVK ಸಂಪರ್ಕಿಸಿ.'}\`;
    } else if (effectiveLang === 'hi') {
      const diseasePart = result.diseaseHi || result.disease;
      const remedyPart = result.remedyHi || result.remedy;
      text = \`रोग: \${diseasePart}. फसल: \${result.cropHi || result.crop}. उपचार: \${remedyPart}. \${result.scheme ? \`योजना: \${result.scheme}\` : 'कोई विशिष्ट सरकारी योजना नहीं है। स्थानीय कृषि विज्ञान केंद्र से संपर्क करें।'}\`;
    } else {
      text = \`Disease detected: \${result.disease} on \${result.crop}. Severity: \${result.severity}. Treatment: \${result.remedy}. \${result.scheme ? \`Eligible scheme: \${result.scheme}\` : 'No specific government scheme. Contact your local Krishi Vigyan Kendra for support.'}\`;
    }
    speak(text);
  };

  `;

content = content.substring(0, voiceStartIndex) + newToggleVoice + content.substring(voiceEndIndex);

// 5. Update demoCards on home screen
const demoCardsStartAnchor = "if (page === 'home') {";
const demoCardsArrayStart = "const demoCards = [";
const demoCardsArrayEnd = "return (";

const homePageIdx = content.indexOf(demoCardsStartAnchor);
const demoStartIdx = content.indexOf(demoCardsArrayStart, homePageIdx);
const demoEndIdx = content.indexOf(demoCardsArrayEnd, demoStartIdx);

if (homePageIdx === -1 || demoStartIdx === -1 || demoEndIdx === -1) {
  throw new Error("Could not find demoCards in home page");
}

const newDemoCardsAssign = `const demoCards = DEMO_CARDS_DATA.map(d => ({
      ...d,
      icon: d.crop.includes('Rice') || d.crop.includes('Paddy')
        ? <Wheat size={13} color="#fff" />
        : <Sprout size={13} color="#fff" />
    }));

    `;

content = content.substring(0, demoStartIdx) + newDemoCardsAssign + content.substring(demoEndIdx);

// Update demoCards card rendering preview text in home page
const demoPreviewAnchor = "<span style={{ fontWeight: 800, color: '#1a7c4a' }}>Treatment: </span>";
if (content.includes(demoPreviewAnchor)) {
  const oldDemoPreviewBlock = `<span style={{ fontWeight: 800, color: '#1a7c4a' }}>Treatment: </span>
                        {d.remedy.slice(0, 48)}…`;
  const newDemoPreviewBlock = `<span style={{ fontWeight: 800, color: '#1a7c4a' }}>
                          {lang === 'kn' ? 'ಪರಿಹಾರ: ' : lang === 'hi' ? 'उपचार: ' : 'Treatment: '}
                        </span>
                        {lang === 'kn' ? (d.remedyKn || d.remedy).slice(0, 52) : lang === 'hi' ? (d.remedyHi || d.remedy).slice(0, 52) : d.remedy.slice(0, 52)}…`;
  content = content.replace(oldDemoPreviewBlock, newDemoPreviewBlock);
}

// 6. Update Result View Tabs and Product links
const resultActionButtonsAnchor = "{/* Action buttons */}";
const resultActionButtonsIdx = content.indexOf(resultActionButtonsAnchor);

const resultEndAnchor = "{/* AI Q&A — opens as separate page */}";
const resultEndIdx = content.indexOf(resultEndAnchor);

if (resultActionButtonsIdx === -1 || resultEndIdx === -1) {
  throw new Error("Could not find Result View tabs/content markers");
}

const newResultSection = `{/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <button onClick={toggleVoice} style={{ flex: 1, padding: '13px', borderRadius: 12, border: 'none', background: isSpeaking ? '#ef4444' : '#1a2e1f', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
                <Volume2 size={18} />{isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸು' : lang === 'hi' ? 'रोकें' : 'Stop') : (lang === 'kn' ? 'ಓದಿ ಹೇಳಿ' : lang === 'hi' ? 'सुनें (बोलकर बताएं)' : 'Read Aloud')}
              </button>
              <button onClick={handleReset} style={{ padding: '13px 16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1a7c4a,#145f38)', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(26,124,74,0.2)' }}>
                <RefreshCw size={15} />{lang === 'kn' ? 'ಮತ್ತೆ' : lang === 'hi' ? 'फिर से' : 'Rescan'}
              </button>
            </div>

            {/* Trilingual Language Selector Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#ffffff',
              border: '1px solid #d1e8db',
              borderRadius: 14,
              padding: '6px 10px',
              marginBottom: 14,
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#1a7c4a' }}>
                <Languages size={15} color="#1a7c4a" />
                <span>{lang === 'kn' ? 'ಭಾಷೆ / Language:' : lang === 'hi' ? 'भाषा / Language:' : 'Language:'}</span>
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: '🌐 All 3 (ಎಲ್ಲವೂ / सभी)' },
                  { id: 'kn', label: 'ಕನ್ನಡ' },
                  { id: 'hi', label: 'हिन्दी' },
                  { id: 'en', label: 'English' }
                ].map(opt => {
                  const isActive = (viewLang === opt.id) || (viewLang === 'auto' && (opt.id === lang || (opt.id === 'en' && lang !== 'kn' && lang !== 'hi')));
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setViewLang(opt.id)}
                      style={{
                        padding: '5px 11px',
                        borderRadius: 9,
                        border: isActive ? '1.5px solid #1a7c4a' : '1px solid #e2e8f0',
                        background: isActive ? '#1a7c4a' : '#f8fafc',
                        color: isActive ? '#ffffff' : '#334155',
                        fontSize: 12,
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, background: '#ffffff', border: '1px solid #d1e8db', borderRadius: 12, padding: 4 }}>
              {[
                { key: 'remedy', icon: <Pill size={13} />, label: lang === 'kn' ? 'ಪರಿಹಾರ & ತಡೆ' : lang === 'hi' ? 'उपचार एवं रोकथाम' : 'Treatment & Control' },
                { key: 'fertilizer', icon: <Sprout size={13} />, label: lang === 'kn' ? 'ಗೊಬ್ಬರ' : lang === 'hi' ? 'पोषण एवं उर्वरक' : 'Nutrition' },
                { key: 'tips', icon: <Lightbulb size={13} />, label: lang === 'kn' ? 'ಸಲಹೆ' : lang === 'hi' ? 'मुख्य बिंदु' : 'Key Takeaways' }
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, padding: '9px 4px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: activeTab === tab.key ? '#f0f7f3' : 'transparent', color: activeTab === tab.key ? '#1a7c4a' : '#64748b', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ background: '#fff', border: '1px solid #d1e8db', borderRadius: 16, padding: 18, marginBottom: 14 }}>
              {activeTab === 'remedy' && (
                <div>
                  {/* Chemical Treatment Section */}
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Pill size={14} color="#1a7c4a" />
                      {lang === 'kn' ? 'ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ (Chemical Treatment)' : lang === 'hi' ? 'रासायनिक उपचार (Chemical Treatment)' : 'Chemical Treatment'}
                    </p>
                    {isTranslating && lang === 'kn' && !result.remedyKn && (
                      <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>
                    )}

                    {/* Trilingual Render */}
                    {(() => {
                      const eff = viewLang === 'auto' ? lang : viewLang;
                      if (eff === 'kn') {
                        return <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>{result.remedyKn || translatedRemedy || result.remedy}</p>;
                      }
                      if (eff === 'hi') {
                        return <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>{result.remedyHi || result.remedy}</p>;
                      }
                      if (eff === 'en') {
                        return <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>{result.remedy}</p>;
                      }
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ padding: '8px 12px', background: '#fffbeb', borderRadius: 10, border: '1px solid #fef3c7' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#b45309', marginBottom: 3 }}>🟡 ಕನ್ನಡ (Kannada)</div>
                            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.remedyKn || translatedRemedy || result.remedy}</p>
                          </div>
                          <div style={{ padding: '8px 12px', background: '#f0fdf4', borderRadius: 10, border: '1px solid #dcfce7' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#15803d', marginBottom: 3 }}>🔵 हिन्दी (Hindi)</div>
                            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.remedyHi || result.remedy}</p>
                          </div>
                          <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', marginBottom: 3 }}>🟢 English</div>
                            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.remedy}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Prevention & Cultural Control */}
                  {result.prevention && (
                    <div style={{ marginBottom: 16, background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: 11, color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <ShieldCheck size={14} color="#0369a1" />
                        {lang === 'kn' ? 'ತಡೆಗಟ್ಟುವಿಕೆ & ಕೃಷಿ ಪದ್ಧತಿ' : lang === 'hi' ? 'रोकथाम एवं कृषि प्रबंधन' : 'Prevention & Cultural Control'}
                      </p>
                      {(() => {
                        const eff = viewLang === 'auto' ? lang : viewLang;
                        if (eff === 'kn') {
                          return <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.55 }}>{result.preventionKn || translatedPrevention || result.prevention}</p>;
                        }
                        if (eff === 'hi') {
                          return <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.55 }}>{result.preventionHi || result.prevention}</p>;
                        }
                        if (eff === 'en') {
                          return <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.55 }}>{result.prevention}</p>;
                        }
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.5 }}><strong style={{ color: '#0284c7' }}>ಕನ್ನಡ:</strong> {result.preventionKn || result.prevention}</p>
                            <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.5 }}><strong style={{ color: '#16a34a' }}>हिन्दी:</strong> {result.preventionHi || result.prevention}</p>
                            <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.5 }}><strong style={{ color: '#475569' }}>English:</strong> {result.prevention}</p>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Organic Alternative */}
                  {result.organicTip && (
                    <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '12px 14px', border: '1px solid #bbf7d0', marginBottom: 16 }}>
                      <p style={{ fontSize: 11, fontWeight: 800, color: '#15803d', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Leaf size={14} color="#15803d" />
                        {lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ' : lang === 'hi' ? 'जैविक विकल्प' : 'Organic Alternative'}
                      </p>
                      {(() => {
                        const eff = viewLang === 'auto' ? lang : viewLang;
                        if (eff === 'kn') {
                          return <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>{result.organicTipKn || translatedOrganicTip || result.organicTip}</p>;
                        }
                        if (eff === 'hi') {
                          return <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>{result.organicTipHi || result.organicTip}</p>;
                        }
                        if (eff === 'en') {
                          return <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>{result.organicTip}</p>;
                        }
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}><strong style={{ color: '#15803d' }}>ಕನ್ನಡ:</strong> {result.organicTipKn || result.organicTip}</p>
                            <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}><strong style={{ color: '#15803d' }}>हिन्दी:</strong> {result.organicTipHi || result.organicTip}</p>
                            <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}><strong style={{ color: '#15803d' }}>English:</strong> {result.organicTip}</p>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Verified Chemical & Organic Product Links with Pricing */}
                  {result.products && result.products.filter(p => p.type === 'chemical' || p.type === 'organic').length > 0 && (
                    <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <p style={{ fontSize: 12, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ShoppingBag size={15} color="#1a7c4a" />
                          {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಗಳು & ಬೆಲೆಗಳು' : lang === 'hi' ? 'अनुशंसित दवाएं एवं उत्पाद लिंक' : 'Recommended Medicines & Product Links'}
                        </p>
                        <span style={{ fontSize: 10, color: '#15803d', background: '#dcfce7', fontWeight: 800, padding: '3px 8px', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                          {lang === 'kn' ? 'ಖರೀದಿ & ದರ' : lang === 'hi' ? 'कीमत और विवरण' : 'Live Prices & Specs'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                        {result.products.filter(p => p.type === 'chemical' || p.type === 'organic').map((prod, idx) => (
                          <div key={idx} style={{
                            background: '#ffffff',
                            border: '1.5px solid #d1e8db',
                            borderRadius: 12,
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                          }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
                                <span style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '2px 7px',
                                  borderRadius: 6,
                                  background: prod.type === 'organic' ? '#dcfce7' : '#fee2e2',
                                  color: prod.type === 'organic' ? '#15803d' : '#b91c1c'
                                }}>
                                  {prod.type === 'organic' ? '🌿 Bio / Organic' : '🧪 Chemical Formulation'}
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', background: '#f0fdf4', padding: '2px 8px', borderRadius: 6, border: '1px solid #bbf7d0', whiteSpace: 'nowrap' }}>
                                  {prod.price}
                                </span>
                              </div>
                              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
                                {prod.name}
                              </div>
                              {prod.brand && (
                                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
                                  {lang === 'kn' ? 'ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : lang === 'hi' ? 'ब्रांड्स' : 'Brands'}: <strong style={{ color: '#334155' }}>{prod.brand}</strong>
                                </div>
                              )}
                            </div>

                            <a
                              href={getAgriProductLink(prod.query || prod.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                background: 'linear-gradient(135deg, #1a7c4a, #145f38)',
                                color: '#ffffff',
                                padding: '8px 12px',
                                borderRadius: 9,
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 2px 6px rgba(26, 124, 74, 0.25)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span>{lang === 'kn' ? 'ಉತ್ಪನ್ನ ವಿವರ & ಬೆಲೆ ಪರಿಶೀಲಿಸಿ' : lang === 'hi' ? 'उत्पाद विवरण एवं कीमत देखें' : 'View Product Details & Price'}</span>
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'fertilizer' && (
                <div>
                  <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Sprout size={14} color="#1a7c4a" />
                    {lang === 'kn' ? 'ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ (Nutrition Management)' : lang === 'hi' ? 'पोषण एवं उर्वरक प्रबंधन' : 'Nutrition Management'}
                  </p>
                  {isTranslating && lang === 'kn' && !result.fertilizerKn && (
                    <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>
                  )}

                  {/* Trilingual Fertilizer Guidance */}
                  {(() => {
                    const eff = viewLang === 'auto' ? lang : viewLang;
                    if (eff === 'kn') {
                      return <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>{result.fertilizerKn || translatedFertilizer || result.fertilizer}</p>;
                    }
                    if (eff === 'hi') {
                      return <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>{result.fertilizerHi || result.fertilizer}</p>;
                    }
                    if (eff === 'en') {
                      return <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>{result.fertilizer}</p>;
                    }
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ padding: '8px 12px', background: '#fffbeb', borderRadius: 10, border: '1px solid #fef3c7' }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#b45309', marginBottom: 3 }}>🟡 ಕನ್ನಡ (Kannada)</div>
                          <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.fertilizerKn || translatedFertilizer || result.fertilizer}</p>
                        </div>
                        <div style={{ padding: '8px 12px', background: '#f0fdf4', borderRadius: 10, border: '1px solid #dcfce7' }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#15803d', marginBottom: 3 }}>🔵 हिन्दी (Hindi)</div>
                          <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.fertilizerHi || result.fertilizer}</p>
                        </div>
                        <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', marginBottom: 3 }}>🟢 English</div>
                          <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.fertilizer}</p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Verified Fertilizer Product Links with Pricing */}
                  {result.products && result.products.filter(p => p.type === 'fertilizer').length > 0 && (
                    <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <p style={{ fontSize: 12, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Sprout size={15} color="#1a7c4a" />
                          {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ರಸಗೊಬ್ಬರಗಳು & ದರ' : lang === 'hi' ? 'अनुशंसित उर्वरक एवं उत्पाद लिंक' : 'Recommended Fertilizers & Product Links'}
                        </p>
                        <span style={{ fontSize: 10, color: '#15803d', background: '#dcfce7', fontWeight: 800, padding: '3px 8px', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                          {lang === 'kn' ? 'ಬೆಲೆ & ಪ್ಯಾಕಿಂಗ್' : lang === 'hi' ? 'सरकारी / बाजार दर' : 'Govt / Market Rates'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                        {result.products.filter(p => p.type === 'fertilizer').map((prod, idx) => (
                          <div key={idx} style={{
                            background: '#f0fdf4',
                            border: '1.5px solid #bbf7d0',
                            borderRadius: 12,
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                          }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
                                <span style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '2px 7px',
                                  borderRadius: 6,
                                  background: '#dcfce7',
                                  color: '#15803d'
                                }}>
                                  🌱 Fertilizer / Nutrient
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', background: '#ffffff', padding: '2px 8px', borderRadius: 6, border: '1px solid #86efac', whiteSpace: 'nowrap' }}>
                                  {prod.price}
                                </span>
                              </div>
                              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
                                {prod.name}
                              </div>
                              {prod.brand && (
                                <div style={{ fontSize: 11, color: '#4b7a5c', fontWeight: 500 }}>
                                  {lang === 'kn' ? 'ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : lang === 'hi' ? 'निर्माता / ब्रांड' : 'Brands'}: <strong style={{ color: '#14532d' }}>{prod.brand}</strong>
                                </div>
                              )}
                            </div>

                            <a
                              href={getAgriProductLink(prod.query || prod.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                background: 'linear-gradient(135deg, #15803d, #14532d)',
                                color: '#ffffff',
                                padding: '8px 12px',
                                borderRadius: 9,
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span>{lang === 'kn' ? 'ಗೊಬ್ಬರ ವಿವರ & ಬೆಲೆ ಪರಿಶೀಲಿಸಿ' : lang === 'hi' ? 'उर्वरक विवरण एवं कीमत देखें' : 'View Fertilizer Details & Price'}</span>
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'tips' && result.keyTakeaways && (
                <div>
                  <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Lightbulb size={14} color="#1a7c4a" />
                    {lang === 'kn' ? 'ಪ್ರಮುಖ ಅಂಶಗಳು (Key Takeaways)' : lang === 'hi' ? 'मुख्य बिंदु (Key Takeaways)' : 'Key Takeaways'}
                  </p>
                  {isTranslating && lang === 'kn' && !result.keyTakeawaysKn && (
                    <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>
                  )}

                  {(() => {
                    const eff = viewLang === 'auto' ? lang : viewLang;
                    const takeawaysList = eff === 'kn'
                      ? (result.keyTakeawaysKn || translatedKeyTakeaways || result.keyTakeaways)
                      : eff === 'hi'
                      ? (result.keyTakeawaysHi || result.keyTakeaways)
                      : eff === 'en'
                      ? result.keyTakeaways
                      : null;

                    if (takeawaysList) {
                      return takeawaysList.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 9 }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: (result.color || '#1a7c4a') + '20', color: result.color || '#1a7c4a', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            {i + 1}
                          </div>
                          <p style={{ margin: 0, fontSize: 13.5, color: '#334155', lineHeight: 1.55, fontWeight: 500 }}>
                            {tip}
                          </p>
                        </div>
                      ));
                    }

                    // 'all' view: show points with Kannada, Hindi, and English sub-lines
                    return result.keyTakeaways.map((enTip, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12, paddingBottom: 10, borderBottom: i < result.keyTakeaways.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1a7c4a20', color: '#1a7c4a', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          {i + 1}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {result.keyTakeawaysKn?.[i] && (
                            <p style={{ margin: 0, fontSize: 13, color: '#1e293b', lineHeight: 1.45 }}>
                              <strong style={{ color: '#b45309' }}>🟡 ಕನ್ನಡ:</strong> {result.keyTakeawaysKn[i]}
                            </p>
                          )}
                          {result.keyTakeawaysHi?.[i] && (
                            <p style={{ margin: 0, fontSize: 13, color: '#1e293b', lineHeight: 1.45 }}>
                              <strong style={{ color: '#15803d' }}>🔵 हिन्दी:</strong> {result.keyTakeawaysHi[i]}
                            </p>
                          )}
                          <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.45 }}>
                            <strong style={{ color: '#64748b' }}>🟢 English:</strong> {enTip}
                          </p>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>

            {/* Scheme */}
            {result.scheme ? (
              <a href={result.schemeLink || '#'} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff', border: '1px solid #86efac', borderRadius: 16, padding: '14px 16px', marginBottom: 16, textDecoration: 'none', boxShadow: '0 2px 8px rgba(22,163,74,0.08)' }}>
                <div style={{ background: '#16a34a', borderRadius: 10, padding: 10, color: '#fff', flexShrink: 0 }}><ShieldCheck size={20} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 10, color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Building2 size={12} color="#15803d" /> {lang === 'kn' ? 'ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆ — ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : lang === 'hi' ? 'पात्र सरकारी योजना — आवेदन करें' : 'Eligible Govt Scheme — Tap to Apply'}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#14532d' }}>{result.scheme}</p>
                </div>
                <ChevronRight size={18} color="#16a34a" />
              </a>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
                <Info size={16} color="#94a3b8" /><p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{lang === 'kn' ? 'ಈ ರೋಗಕ್ಕೆ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ ಇಲ್ಲ. ಸ್ಥಳೀಯ KVK ಸಂಪರ್ಕಿಸಿ.' : lang === 'hi' ? 'इस रोग हेतु कोई विशेष सरकारी योजना नहीं है। स्थानीय केवीके (KVK) से संपर्क करें।' : 'No specific govt scheme. Contact your local Krishi Vigyan Kendra (KVK).'}</p>
              </div>
            )}

            `;

content = content.substring(0, resultActionButtonsIdx) + newResultSection + content.substring(resultEndIdx);

// Also in the Result Header card (lines around result.diseaseKn):
const headerDiseaseAnchor = "{result.diseaseKn && <p style={{ margin: '0 0 4px', fontSize: 13, color: '#4b7a5c', fontWeight: 600 }}>{result.diseaseKn}</p>}";
if (content.includes(headerDiseaseAnchor)) {
  const newHeaderDiseaseBlock = `{result.diseaseKn && (
                    <p style={{ margin: '0 0 2px', fontSize: 13, color: '#4b7a5c', fontWeight: 700 }}>
                      {viewLang === 'hi' ? (result.diseaseHi || result.diseaseKn) : result.diseaseKn}
                    </p>
                  )}
                  {result.diseaseHi && (viewLang === 'all' || viewLang === 'hi') && (
                    <p style={{ margin: '0 0 4px', fontSize: 12.5, color: '#15803d', fontWeight: 600 }}>
                      🇮🇳 {result.diseaseHi}
                    </p>
                  )}`;
  content = content.replace(headerDiseaseAnchor, newHeaderDiseaseBlock);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated CropScanner.jsx!');
