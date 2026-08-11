const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/components/VillagerScreens.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Inject the import
const importStr = "import { districtCropsMap, cropImageMap } from '../data/districtCrops'";
if (!content.includes(importStr)) {
  content = content.replace(
    "import { kaSchemes } from '../data/schemesData'",
    "import { kaSchemes } from '../data/schemesData'\n" + importStr
  );
}

// 2. Inject the UI block
const uiBlock = `
      {roleMode === 'farmer' && districtCropsMap[userDistrict] && (
        <div className="animate-fadeInUp card" style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sprout size={18} style={{ color: 'var(--primary)' }} />
                {lang === 'kn' ? \`\${userDistrict} ಜಿಲ್ಲೆಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳು\` : \`Suitable Crops for \${userDistrict}\`}
              </h4>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                {lang === 'kn' ? 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಬೆಳೆಯಬಹುದಾದ ಪ್ರಮುಖ 10 ಬೆಳೆಗಳು' : 'Top 10 major crops suitable for your district'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', padding: '16px 20px', gap: 16, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {districtCropsMap[userDistrict].map((crop, idx) => (
              <div key={idx} style={{ minWidth: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '3px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <img src={cropImageMap[crop] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80'} alt={crop} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, textAlign: 'center', color: 'var(--text-main)' }}>{crop}</span>
              </div>
            ))}
          </div>
        </div>
      )}
`;

const anchor = "{roleMode === 'student' && (";
if (!content.includes("Suitable Crops for")) {
  content = content.replace(anchor, uiBlock + '\n      ' + anchor);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Injection successful');
