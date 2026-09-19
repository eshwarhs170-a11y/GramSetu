import fs from 'fs';

let content = fs.readFileSync('src/components/CropScanner.jsx', 'utf8');
const hadCRLF = content.includes('\r\n');
if (hadCRLF) {
  content = content.replace(/\r\n/g, '\n');
}

function doReplace(name, target, replacement) {
  if (!content.includes(target)) {
    console.error(`FAILED to find target for: ${name}`);
    return false;
  }
  content = content.replace(target, replacement);
  console.log(`SUCCESS: ${name}`);
  return true;
}

// 1. Remove viewLang state definition
doReplace(
  '1. viewLang state',
  `  const [viewLang, setViewLang] = useState('auto'); // 'auto' | 'all' | 'kn' | 'hi' | 'en'\n`,
  ''
);

// 2. Update toggleVoice
doReplace(
  '2. toggleVoice',
  `    const effectiveLang = viewLang === 'auto' ? lang : (viewLang === 'all' ? lang : viewLang);`,
  `    const effectiveLang = lang;`
);

// 3. Update cropKeywords in matchAiToDatabase
const oldCropKeywordsTarget = `    // Map AI crop names → our DB crop keys (partial match)
    const cropKeywords = [
      { keys: ['paddy', 'rice', 'ಭತ್ತ', 'धान', 'चावल'],               db: 'Paddy / Rice (ಭತ್ತ / धान)' },
      { keys: ['ragi', 'finger millet', 'ರಾಗಿ', 'रागी'],                db: 'Ragi / Finger Millet (ರಾಗಿ / रागी)' },
      { keys: ['maize', 'corn', 'ಜೋಳ', 'मक्का', 'भुट्टा'],              db: 'Maize / Corn (ಜೋಳ / मक्का)' },
      { keys: ['cotton', 'ಹತ್ತಿ', 'कपास'],                             db: 'Cotton (ಹತ್ತಿ / कपास)' },
      { keys: ['tomato', 'ಟೊಮೇಟೊ', 'ಟೊಮೆಟೊ', 'टमाटर'],                   db: 'Tomato (ಟೊಮೇಟೊ / टमाटर)' },
      { keys: ['potato', 'ಆಲೂ', 'ಆಲೂಗಡ್ಡೆ', 'आलू'],                    db: 'Potato (ಆಲೂಗಡ್ಡೆ / आलू)' },
      { keys: ['onion', 'ಈರುಳ್ಳಿ', 'प्याज'],                             db: 'Onion (ಈರುಳ್ಳಿ / प्याज)' },
      { keys: ['sugarcane', 'ಕಬ್ಬು', 'गन्ना'],                          db: 'Sugarcane (ಕಬ್ಬು / गन्ना)' },
      { keys: ['coconut', 'ತೆಂಗು', 'ತೆಂಗಿನಕಾಯಿ', 'नारियल'],              db: 'Coconut (ತೆಂಗು / नारियल)' },
      { keys: ['arecanut', 'areca', 'ಅಡಿಕೆ', 'सुಪಾರಿ'],                  db: 'Arecanut (ಅಡಿಕೆ / सुपारी)' },
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
    ];`;

const newCropKeywords = `    // Map AI crop names → our DB crop keys (partial match)
    const cropKeywords = [
      { keys: ['paddy', 'rice', 'ಭತ್ತ', 'धान', 'चावल'],               db: 'Paddy / Rice (ಭತ್ತ / धान)' },
      { keys: ['ragi', 'finger millet', 'ರಾಗಿ', 'रागी', 'मडुआ'],       db: 'Ragi / Finger Millet (ರಾಗಿ / मडुआ)' },
      { keys: ['maize', 'corn', 'ಮೆಕ್ಕೆಜೋಳ', 'मक्का', 'भुट्टा'],       db: 'Maize / Corn (ಮೆಕ್ಕೆಜೋಳ / मक्का)' },
      { keys: ['wheat', 'ಗೋಧಿ', 'गेहूं'],                              db: 'Wheat (ಗೋಧಿ / गेहूं)' },
      { keys: ['jowar', 'sorghum', 'ಜೋಳ', 'ज्वार'],                     db: 'Jowar / Sorghum (ಜೋಳ / ज्वार)' },
      { keys: ['cotton', 'ಹತ್ತಿ', 'कपास'],                             db: 'Cotton (ಹತ್ತಿ / कपास)' },
      { keys: ['sugarcane', 'ಕಬ್ಬು', 'गन्ना', 'ईख'],                    db: 'Sugarcane (ಕಬ್ಬು / गन्ना)' },
      { keys: ['coconut', 'ತೆಂಗು', 'ತೆಂಗಿನಕಾಯಿ', 'नारियल'],              db: 'Coconut (ತೆಂಗು / नारियल)' },
      { keys: ['arecanut', 'areca', 'ಅಡಿಕೆ', 'सुಪಾರಿ'],                  db: 'Arecanut (ಅಡಿಕೆ / सुपारी)' },
      { keys: ['coffee', 'ಕಾಫಿ', 'कॉफी'],                              db: 'Coffee (ಕಾಫಿ / कॉफी)' },
      { keys: ['pepper', 'black pepper', 'ಮೆಣಸು', 'ಕರಿಮೆಣಸು', 'काली मिर्च'], db: 'Black Pepper (ಕರಿಮೆಣಸು / काली मिर्च)' },
      { keys: ['tomato', 'ಟೊಮೇಟೊ', 'ಟೊಮೆಟೊ', 'टमाटर'],                   db: 'Tomato (ಟೊಮೇಟೊ / टमाटर)' },
      { keys: ['potato', 'ಆಲೂ', 'ಆಲೂಗಡ್ಡೆ', 'आलू'],                    db: 'Potato (ಆಲೂಗಡ್ಡೆ / आलू)' },
      { keys: ['onion', 'ಈರುಳ್ಳಿ', 'प्याज'],                             db: 'Onion (ಈರುಳ್ಳಿ / प्याज)' },
      { keys: ['chilli', 'chili', 'ಮೆಣಸಿನಕಾಯಿ', 'मिर्च'],              db: 'Chilli (ಮೆಣಸಿನಕಾಯಿ / मिर्च)' },
      { keys: ['brinjal', 'eggplant', 'aubergine', 'ಬದನೆ', 'ಬದನೆಕಾಯಿ', 'बैंगन'], db: 'Brinjal / Eggplant (ಬದನೆಕಾಯಿ / बैंगन)' },
      { keys: ['banana', 'ಬಾಳೆ', 'ಬಾಳೆಹಣ್ಣು', 'केला'],                  db: 'Banana (ಬಾಳೆ / केला)' },
      { keys: ['mango', 'ಮಾವು', 'ಮಾವಿನಕಾಯಿ', 'आम'],                     db: 'Mango (ಮಾವು / आम)' },
      { keys: ['pomegranate', 'ದಾಳಿಂಬೆ', 'ದಾಳಿಂಬೆಕಾಯಿ', 'अनार'],        db: 'Pomegranate (ದಾಳಿಂಬೆ / अनार)' },
      { keys: ['groundnut', 'peanut', 'ಕಡಲೆಕಾಯಿ', 'मूंगफली'],           db: 'Groundnut (ಕಡಲೆಕಾಯಿ / मूंगफली)' },
      { keys: ['sunflower', 'ಸೂರ್ಯಕಾಂತಿ', 'सूरजमुखी'],                  db: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ / सूरजमुखी)' },
      { keys: ['soybean', 'soya', 'ಸೋಯಾ', 'ಸೋಯಾಬೀನ್', 'सोयाबीन'],       db: 'Soybean (ಸೋಯಾಬೀನ್ / सोयाबीन)' },
      { keys: ['chickpea', 'bengal gram', 'ಕಡಲೆ', 'चना'],             db: 'Chickpea / Bengal Gram (ಕಡಲೆ / चना)' },
      { keys: ['mung', 'green gram', 'ಹೆಸರು', 'ಹೆಸರುಕಾಳು', 'मूंग'],    db: 'Mung Bean / Green Gram (ಹೆಸರುಕಾಳು / मूंग)' },
    ];`;

doReplace('3. cropKeywords', oldCropKeywordsTarget, newCropKeywords);

// 4. Update demoCards rendering in home screen
const oldDemoCardsRender = `                    <div style={{ fontSize: 14, fontWeight: 900, color: '#1a2e1f', marginBottom: 2, lineHeight: 1.3 }}>
                      {lang === 'hi' ? (d.diseaseHi || d.disease) : d.disease}
                    </div>
                    <div style={{ fontSize: 11, color: '#4b7a5c', fontWeight: 600, marginBottom: 8 }}>
                      {lang === 'hi' ? (d.diseaseHi || d.diseaseKn) : d.diseaseKn}
                    </div>`;

const newDemoCardsRender = `                    <div style={{ fontSize: 14, fontWeight: 900, color: '#1a2e1f', marginBottom: 2, lineHeight: 1.3 }}>
                      {lang === 'kn' ? (d.diseaseKn || d.disease) : lang === 'hi' ? (d.diseaseHi || d.disease) : d.disease}
                    </div>
                    <div style={{ fontSize: 11, color: '#4b7a5c', fontWeight: 600, marginBottom: 8 }}>
                      {lang === 'kn' || lang === 'hi' ? d.disease : (d.diseaseKn || d.diseaseHi || '')}
                    </div>`;

doReplace('4. demoCards', oldDemoCardsRender, newDemoCardsRender);

// 5. Update result card header
const oldResultHeader = `                  <h2 style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 900, color: '#1a2e1f', lineHeight: 1.25 }}>{result.disease}</h2>
                  {result.diseaseKn && (
                    <p style={{ margin: '0 0 2px', fontSize: 13, color: '#4b7a5c', fontWeight: 700 }}>
                      {viewLang === 'hi' ? (result.diseaseHi || result.diseaseKn) : result.diseaseKn}
                    </p>
                  )}
                  {result.diseaseHi && (viewLang === 'all' || viewLang === 'hi') && (
                    <p style={{ margin: '0 0 4px', fontSize: 12.5, color: '#15803d', fontWeight: 600 }}>
                      🇮🇳 {result.diseaseHi}
                    </p>
                  )}
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Leaf size={12} />{lang === 'kn' ? 'ಬೆಳೆ' : 'Crop'}: {result.crop}
                  </div>`;

const newResultHeader = `                  <h2 style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 900, color: '#1a2e1f', lineHeight: 1.25 }}>
                    {lang === 'kn' ? (result.diseaseKn || result.disease) : lang === 'hi' ? (result.diseaseHi || result.disease) : result.disease}
                  </h2>
                  {(lang === 'kn' || lang === 'hi') && (
                    <p style={{ margin: '0 0 3px', fontSize: 13, color: '#4b7a5c', fontWeight: 700 }}>
                      {result.disease}
                    </p>
                  )}
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Leaf size={12} />{lang === 'kn' ? 'ಬೆಳೆ' : lang === 'hi' ? 'फसल' : 'Crop'}: {lang === 'kn' ? (result.cropKn || result.crop) : lang === 'hi' ? (result.cropHi || result.crop) : result.crop}
                  </div>`;

doReplace('5. resultHeader', oldResultHeader, newResultHeader);

// 6. Remove Trilingual Language Selector Bar
const oldLangBar = `            {/* Trilingual Language Selector Bar */}
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
            </div>\n\n`;

doReplace('6. langBar', oldLangBar, '');

// 7. Update Remedy block
const oldRemedyBlock = `                    {/* Trilingual Render */}
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
                    })()}`;

const newRemedyBlock = `                    {/* Direct Language Render */}
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>
                      {lang === 'kn'
                        ? (result.remedyKn || translatedRemedy || result.remedy)
                        : lang === 'hi'
                        ? (result.remedyHi || result.remedy)
                        : result.remedy}
                    </p>`;

doReplace('7. remedyBlock', oldRemedyBlock, newRemedyBlock);

// 8. Update Prevention block
const oldPreventionBlock = `                      {(() => {
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
                      })()}`;

const newPreventionBlock = `                      <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.55 }}>
                        {lang === 'kn'
                          ? (result.preventionKn || translatedPrevention || result.prevention)
                          : lang === 'hi'
                          ? (result.preventionHi || result.prevention)
                          : result.prevention}
                      </p>`;

doReplace('8. preventionBlock', oldPreventionBlock, newPreventionBlock);

// 9. Update Organic Tip block
const oldOrganicBlock = `                      {(() => {
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
                      })()}`;

const newOrganicBlock = `                      <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
                        {lang === 'kn'
                          ? (result.organicTipKn || translatedOrganicTip || result.organicTip)
                          : lang === 'hi'
                          ? (result.organicTipHi || result.organicTip)
                          : result.organicTip}
                      </p>`;

doReplace('9. organicBlock', oldOrganicBlock, newOrganicBlock);

// 10. Update Fertilizer block
const oldFertilizerBlock = `                  {/* Trilingual Fertilizer Guidance */}
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
                  })()}`;

const newFertilizerBlock = `                  {/* Direct Language Fertilizer Guidance */}
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>
                    {lang === 'kn'
                      ? (result.fertilizerKn || translatedFertilizer || result.fertilizer)
                      : lang === 'hi'
                      ? (result.fertilizerHi || result.fertilizer)
                      : result.fertilizer}
                  </p>`;

doReplace('10. fertilizerBlock', oldFertilizerBlock, newFertilizerBlock);

// 11. Update Key Takeaways block
const oldTakeawaysBlock = `                  {(() => {
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
                  })()}`;

const newTakeawaysBlock = `                  {(() => {
                    const takeawaysList = lang === 'kn'
                      ? (result.keyTakeawaysKn || translatedKeyTakeaways || result.keyTakeaways)
                      : lang === 'hi'
                      ? (result.keyTakeawaysHi || result.keyTakeaways)
                      : result.keyTakeaways;

                    return (takeawaysList || []).map((tip, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 9 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: (result.color || '#1a7c4a') + '20', color: result.color || '#1a7c4a', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          {i + 1}
                        </div>
                        <p style={{ margin: 0, fontSize: 13.5, color: '#334155', lineHeight: 1.55, fontWeight: 500 }}>
                          {tip}
                        </p>
                      </div>
                    ));
                  })()}`;

doReplace('11. takeawaysBlock', oldTakeawaysBlock, newTakeawaysBlock);

if (hadCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync('src/components/CropScanner.jsx', content, 'utf8');
console.log('All replacements completed!');
