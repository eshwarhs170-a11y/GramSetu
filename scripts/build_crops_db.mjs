import fs from 'fs';
import path from 'path';

import { CEREALS_MILLETS } from './crops_data/cereals_millets.mjs';
import { PLANTATION_CASH } from './crops_data/plantation_cash.mjs';
import { HORTICULTURE_FRUITS } from './crops_data/horticulture_fruits.mjs';
import { PULSES_OILSEEDS } from './crops_data/pulses_oilseeds.mjs';

const allGroups = [
  ...CEREALS_MILLETS,
  ...PLANTATION_CASH,
  ...HORTICULTURE_FRUITS,
  ...PULSES_OILSEEDS
];

console.log(`Total crop categories loaded: ${allGroups.length}`);

// Flatten into flat CROP_DISEASES array
const CROP_DISEASES = [];
const cropsMap = {};

allGroups.forEach(cg => {
  if (!cropsMap[cg.crop]) {
    cropsMap[cg.crop] = 0;
  }
  cg.diseases.forEach(d => {
    cropsMap[cg.crop]++;
    CROP_DISEASES.push({
      crop: cg.crop,
      cropKn: cg.cropKn,
      cropHi: cg.cropHi,
      emoji: cg.emoji,
      disease: d.disease,
      diseaseKn: d.diseaseKn,
      diseaseHi: d.diseaseHi,
      severity: d.severity,
      remedy: d.remedy,
      remedyKn: d.remedyKn,
      remedyHi: d.remedyHi,
      prevention: d.prevention,
      preventionKn: d.preventionKn,
      preventionHi: d.preventionHi,
      organicTip: d.organicTip,
      organicTipKn: d.organicTipKn,
      organicTipHi: d.organicTipHi,
      fertilizer: d.fertilizer,
      fertilizerKn: d.fertilizerKn,
      fertilizerHi: d.fertilizerHi,
      scheme: d.scheme,
      schemeLink: d.schemeLink,
      color: d.color,
      keyTakeaways: d.keyTakeaways,
      keyTakeawaysKn: d.keyTakeawaysKn,
      keyTakeawaysHi: d.keyTakeawaysHi,
      products: d.products
    });
  });
});

console.log(`Total diseases flattened: ${CROP_DISEASES.length}`);
console.log('Diseases per crop:', cropsMap);

// Verify that every single crop has at least 5 diseases
let validationErrors = 0;
for (const [crop, count] of Object.entries(cropsMap)) {
  if (count < 5) {
    console.error(`ERROR: Crop "${crop}" has only ${count} diseases (< 5)!`);
    validationErrors++;
  }
}

if (validationErrors > 0) {
  console.error(`Validation failed with ${validationErrors} errors!`);
  process.exit(1);
}

// 3 Trilingual Demo Cards for the Home Screen
const demoCards = [
  {
    crop: 'Paddy / Rice (ಭತ್ತ / धान)',
    cropKn: 'ಭತ್ತ',
    cropHi: 'धान (चावल)',
    disease: 'Blast Disease (Pyricularia oryzae)',
    diseaseKn: 'ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)',
    diseaseHi: 'ब्लास्ट रोग (झोंका रोग)',
    severity: 'High',
    image: '/crops/paddy_blast.png',
    fallbackImage: '/crops/Paddy.jpg',
    remedy: 'Spray Tricyclazole 75 WP @ 0.6 g/L or Carbendazim 50 WP @ 1 g/L at tillering stage.',
    remedyKn: 'ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ Tricyclazole 75 WP @ 0.6 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅನ್ನು ಸಿಂಪಡಿಸಿ.',
    remedyHi: 'कल्ले फूटने की अवस्था में Tricyclazole 75 WP @ 0.6 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।',
    fertilizer: 'Apply 120:60:60 kg NPK/ha in split doses. Avoid excess N during cloudy weather.',
    fertilizerKn: 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 120:60:60 kg NPK ಗೊಬ್ಬರವನ್ನು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.',
    fertilizerHi: 'प्रति हेक्टेयर 120:60:60 kg NPK उर्वरक विभाजित मात्रा में दें।',
    prevention: 'Maintain proper water level (2-5 cm). Burn or bury infected crop straw.',
    preventionKn: 'ಗದ್ದೆಯಲ್ಲಿ 2-5 cm ನೀರಿನ ಮಟ್ಟ ಕಾಯ್ದುಕೊಳ್ಳಿ. ಸೋಂಕಿತ ಹುಲ್ಲನ್ನು ನಾಶಮಾಡಿ.',
    preventionHi: 'खेत में 2-5 cm पानी रखें। संक्रमित पुआल को जलाएं।',
    organicTip: 'Spray Pseudomonas fluorescens @ 2.5 kg/ha as foliar spray early morning.',
    organicTipKn: 'ಬೆಳಗಿನ ಜಾವ 2.5 kg/ha ನಂತೆ Pseudomonas fluorescens ಸಿಂಪಡಿಸಿ.',
    organicTipHi: 'सुबह के समय Pseudomonas fluorescens @ 2.5 kg/ha का छिड़काव करें।',
    scheme: 'PMFBY Pradhan Mantri Fasal Bima Yojana',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#f59e0b',
    keyTakeaways: [
      'Affects leaves, neck, and panicles causing spindle-shaped lesions',
      'High humidity (>90%) and cool night temperatures trigger severe outbreaks',
      'Use resistant varieties like BPT 5204 or KMP 101'
    ],
    keyTakeawaysKn: [
      'ಎಲೆಗಳು, ಕುತ್ತಿಗೆ ಮತ್ತು ತೆನೆಯ ಮೇಲೆ ಕದಿರಿನ ಆಕಾರದ ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ',
      'ಶೇ. 90ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು ತಂಪಾದ ರಾತ್ರಿಗಳು ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ',
      'BPT 5204 ಅಥವಾ KMP 101 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ'
    ],
    keyTakeawaysHi: [
      'पत्तियों, तने और बालियों पर नाव के आकार के धब्बे बनते हैं',
      '90% से अधिक आर्द्रता और ठंडी रातें इस बीमारी को तेजी से फैलाती हैं',
      'BPT 5204 या KMP 101 जैसी रोग प्रतिरोधी किस्मों की बुवाई करें'
    ],
    products: [
      { name: 'Tricyclazole 75 WP', type: 'chemical', brand: 'Beam / Baan / Dhanuka', price: '₹450 – ₹650 / 250g', query: 'Tricyclazole 75 WP' },
      { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin / Dhanustin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' },
      { name: 'Pseudomonas fluorescens', type: 'organic', brand: 'Bio-Fungicide', price: '₹180 – ₹240 / 1kg', query: 'Pseudomonas fluorescens 1kg' },
      { name: 'NPK 120:60:60 (DAP + MOP + Urea)', type: 'fertilizer', brand: 'IFFCO / KRIBHCO', price: '₹1,350 / 50kg DAP, ₹267 / 45kg Urea', query: 'DAP fertilizer 50kg' }
    ]
  },
  {
    crop: 'Tomato (ಟೊಮೇಟೊ / टमाटर)',
    cropKn: 'ಟೊಮೇಟೊ',
    cropHi: 'टमाटर',
    disease: 'Late Blight (Phytophthora infestans)',
    diseaseKn: 'ಲೇಟ್ ಬ್ಲೈಟ್ ಅಂಗಮಾರಿ ರೋಗ',
    diseaseHi: 'टमाटर लेट ब्लाइट (पछेती अंगमारी)',
    severity: 'High',
    image: '/crops/tomato_late_blight.png',
    fallbackImage: '/crops/Tomato.jpg',
    remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at 7-day intervals during wet weather.',
    remedyKn: 'ಮಳೆಗಾಲದಲ್ಲಿ ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಸಿಂಪಡಿಸಿ.',
    remedyHi: 'गीले मौसम में हर 7 दिन के अंतराल पर Mancozeb 75 WP @ 2 g/L या Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L का छिड़काव करें।',
    fertilizer: 'Apply Calcium Nitrate @ 5 kg/acre to strengthen cell wall structure against fungal penetration.',
    fertilizerKn: 'ಕೋಶಭಿತ್ತಿ ಬಲಪಡಿಸಲು ಮತ್ತು ಶಿಲೀಂಧ್ರ ಪ್ರವೇಶ ತಡೆಯಲು ಎಕರೆಗೆ Calcium Nitrate @ 5 kg ನೀಡಿ.',
    fertilizerHi: 'फफूंद के हमले से बचाव हेतु कोशिका संरचना मजबूत करने के लिए Calcium Nitrate @ 5 kg/एकड़ दें।',
    prevention: 'Ensure wider plant spacing for air ventilation. Use drip irrigation instead of sprinkler. Destroy lower infected leaves.',
    preventionKn: 'ಉತ್ತಮ ಗಾಳಿಯಾಡುವಂತೆ ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ. ಸ್ಪ್ರಿಂಕ್ಲರ್ ಬದಲಿಗೆ ಹನಿ ನೀರಾವರಿ ಬಳಸಿ.',
    preventionHi: 'हवा के संचार के लिए पौधों में उचित दूरी रखें। फव्वारे के बजाय ड्रिप सिंचाई अपनाएं।',
    organicTip: 'Spray Trichoderma viride @ 5 g/L + Copper Oxychloride @ 2 g/L early morning.',
    organicTipKn: 'ಬೆಳಗಿನ ಜಾವ Trichoderma viride @ 5 g/L ಅಥವಾ Copper Oxychloride @ 2 g/L ಸಿಂಪಡಿಸಿ.',
    organicTipHi: 'सुबह के समय Trichoderma viride @ 5 g/L या Copper Oxychloride @ 2 g/L का छिड़काव करें।',
    scheme: 'Mission for Integrated Development of Horticulture (MIDH)',
    schemeLink: 'https://midh.gov.in/',
    color: '#dc2626',
    keyTakeaways: [
      'Causes dark, water-soaked lesions on leaves and white fungal bloom underneath in humid conditions',
      'Can destroy an entire tomato crop within 7 to 10 days if left unmanaged',
      'Practice strict crop rotation with non-solanaceous crops'
    ],
    keyTakeawaysKn: [
      'ತೇವಾಂಶದ ವಾತಾವರಣದಲ್ಲಿ ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಮತ್ತು ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಉಂಟಾಗುತ್ತದೆ',
      'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ನಿಯಂತ್ರಿಸದಿದ್ದರೆ 7 ರಿಂದ 10 ದಿನಗಳಲ್ಲಿ ಇಡೀ ಬೆಳೆಯನ್ನು ನಾಶಮಾಡುತ್ತದೆ',
      'ಟೊಮೇಟೊ ಬೆಳೆದ ಜಾಗದಲ್ಲಿ ಕಡ್ಡಾಯವಾಗಿ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ'
    ],
    keyTakeawaysHi: [
      'पत्तियों पर गहरे पानीदार धब्बे और नीचे सफेद फफूंद की परत बन जाती है',
      'समय पर नियंत्रण न करने पर 7 से 10 दिनों में पूरी टमाटर की फसल नष्ट हो सकती है',
      'टमाटर के बाद अन्य कुल की फसलों के साथ सख्त फसल चक्र अपनाएं'
    ],
    products: [
      { name: 'Metalaxyl + Mancozeb (Ridomil Gold)', type: 'chemical', brand: 'Syngenta Ridomil Gold', price: '₹480 – ₹680 / 500g', query: 'Metalaxyl Mancozeb 72 WP' },
      { name: 'Mancozeb 75 WP (Dithane M-45)', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
      { name: 'Calcium Nitrate Fertilizer', type: 'fertilizer', brand: 'YaraLiva / IFFCO', price: '₹850 – ₹1,200 / 25kg', query: 'Calcium Nitrate fertilizer 25kg' },
      { name: 'Copper Oxychloride 50 WP', type: 'chemical', brand: 'Blitox', price: '₹280 – ₹390 / 500g', query: 'Copper Oxychloride 50 WP' }
    ]
  }
];

// Generate output file content
const output = `// ─────────────────────────────────────────────────────────────────
// COMPREHENSIVE KARNATAKA CROP DISEASE DATABASE (TRILINGUAL + PRODUCT LINKS)
// 24 Major Crops × 5 Major Diseases Each = 120 Total Diseases
// Languages: English (en), Kannada (kn), Hindi (hi)
// In kn/hi: Native sentences, with chemical formulations & numbers in English.
// Products: Direct IndiaMART search links with estimated price (₹).
// ─────────────────────────────────────────────────────────────────

export function getAgriProductLink(query) {
  return \`https://dir.indiamart.com/search.mp?ss=\${encodeURIComponent(query)}\`;
}

export const CROP_DISEASES = ${JSON.stringify(CROP_DISEASES, null, 2)};

export const demoCards = ${JSON.stringify(demoCards, null, 2)};

export const UNIQUE_CROPS = [...new Set(CROP_DISEASES.map(d => d.crop))];
`;

fs.writeFileSync('src/data/cropDiseasesData.js', output, 'utf8');
console.log('Successfully written src/data/cropDiseasesData.js with 120 diseases across 24 crops!');
