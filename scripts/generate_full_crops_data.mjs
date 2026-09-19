import fs from 'fs';
import path from 'path';

// Helper to generate verified IndiaMART search link
function getAgriProductLink(query) {
  return `https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(query)}`;
}

// 24 Crops x 5 Major Diseases = 120 Total Disease Entries
const CROPS_DATA = [
  // ── 1. PADDY / RICE ──
  {
    crop: 'Paddy / Rice (ಭತ್ತ)',
    cropKn: 'ಭತ್ತ',
    cropHi: 'धान (चावल)',
    emoji: '🌾',
    diseases: [
      {
        disease: 'Blast Disease (Pyricularia oryzae)',
        diseaseKn: 'ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)',
        diseaseHi: 'ब्लास्ट रोग (झोंका रोग)',
        severity: 'High',
        remedy: 'Spray Tricyclazole 75 WP @ 0.6 g/L or Carbendazim 50 WP @ 1 g/L at tillering stage. Avoid excess nitrogen.',
        remedyKn: 'ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ Tricyclazole 75 WP @ 0.6 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅನ್ನು ಸಿಂಪಡಿಸಿ. ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.',
        remedyHi: 'कल्ले फूटने की अवस्था में Tricyclazole 75 WP @ 0.6 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें। अत्यधिक नाइट्रोजन से बचें।',
        prevention: 'Maintain proper water level (2-5 cm). Burn or bury infected crop straw after harvest.',
        preventionKn: 'ಗದ್ದೆಯಲ್ಲಿ 2-5 cm ನೀರಿನ ಮಟ್ಟವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಿ. ಕಟಾವಿನ ನಂತರ ರೋಗಪೀಡಿತ ಹುಲ್ಲು ಮತ್ತು ಕಳೆಗಳನ್ನು ಸುಟ್ಟು ಅಥವಾ ಮಣ್ಣಿನಲ್ಲಿ ಹೂತುಹಾಕಿ.',
        preventionHi: 'खेत में 2-5 cm पानी का स्तर बनाए रखें। कटाई के बाद संक्रमित पुआल को जलाएं या मिट्टी में दबा दें।',
        organicTip: 'Spray Pseudomonas fluorescens @ 2.5 kg/ha as foliar spray early morning.',
        organicTipKn: 'ಬೆಳಗಿನ ಜಾವ 2.5 kg/ha ನಂತೆ Pseudomonas fluorescens ಅನ್ನು ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'सुबह के समय Pseudomonas fluorescens @ 2.5 kg/ha का पत्तियों पर छिड़काव करें।',
        fertilizer: 'Apply 120:60:60 kg NPK/ha in split doses. Avoid excess N during cloudy weather.',
        fertilizerKn: 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 120:60:60 kg NPK ಗೊಬ್ಬರವನ್ನು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ. ಮೋಡ ಕವಿದ ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ (N) ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 120:60:60 kg NPK उर्वरक विभाजित मात्रा में दें। बादल वाले मौसम में अधिक नाइट्रोजन (N) से बचें।',
        scheme: 'PMFBY Pradhan Mantri Fasal Bima Yojana',
        schemeLink: 'https://pmfby.gov.in/',
        color: '#f59e0b',
        keyTakeaways: [
          'Affects leaves, neck, and panicles causing spindle-shaped lesions',
          'High humidity (>90%) and cool night temperatures trigger severe outbreaks',
          'Use resistant cultivars like BPT 5204, IR-64 or KMP-101'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು, ಕುತ್ತಿಗೆ ಮತ್ತು ತೆನೆಯ ಮೇಲೆ ಕದಿರಿನ ಆಕಾರದ ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ',
          'ಶೇ. 90ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ತಂಪಾದ ರಾತ್ರಿಗಳು ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ',
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
        disease: 'Brown Plant Hopper (Nilaparvata lugens)',
        diseaseKn: 'ಕಂದು ಎಲೆ ಜಿಗಿಹುಳು (BPH)',
        diseaseHi: 'भूरा पौधा फुदका (BPH)',
        severity: 'High',
        remedy: 'Apply Imidacloprid 17.8 SL @ 0.5 mL/L or Buprofezin 25 SC @ 1.25 mL/L directed to base. Drain water for 3–4 days.',
        remedyKn: 'ಕಾಂಡದ ಬುಡಕ್ಕೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Buprofezin 25 SC @ 1.25 mL/L ಅನ್ನು ಸಿಂಪಡಿಸಿ. ಗದ್ದೆಯ ನೀರನ್ನು 3–4 ದಿನಗಳ ಕಾಲ ಹೊರಹಾಕಿ.',
        remedyHi: 'पौधों के आधार पर Imidacloprid 17.8 SL @ 0.5 mL/L या Buprofezin 25 SC @ 1.25 mL/L का छिड़काव करें। 3–4 दिनों के लिए खेत का पानी निकाल दें।',
        prevention: 'Avoid dense planting; provide 30 cm alleyways every 2 meters for aeration.',
        preventionKn: 'ದಟ್ಟವಾಗಿ ನಾಟಿ ಮಾಡಬೇಡಿ; ಉತ್ತಮ ಗಾಳಿಯಾಡಲು ಪ್ರತಿ 2 ಮೀಟರ್‌ಗೆ 30 cm ಅಂತರದ ದಾರಿಗಳನ್ನು (ಪಥ) ಬಿಡಿ.',
        preventionHi: 'घनी रोपाई से बचें; हवा के संचार के लिए हर 2 मीटर पर 30 cm की जगह छोड़ें।',
        organicTip: 'Spray NSKE 5% (Neem Seed Kernel Extract) at initial pest appearance.',
        organicTipKn: 'ಕೀಟಗಳ ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE 5%) ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'शुरुआती अवस्था में 5% नीम के बीज का अर्क (NSKE 5%) का छिड़काव करें।',
        fertilizer: 'Reduce Nitrogen application; avoid excessive tillering.',
        fertilizerKn: 'ಸಾರಜನಕ (N) ಬಳಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸಿ; ಅತಿಯಾದ ಕವಲೊಡೆಯುವಿಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ.',
        fertilizerHi: 'नाइट्रोजन का प्रयोग कम करें; अत्यधिक कल्ले फूटने पर नियंत्रण रखें।',
        scheme: 'Raitha Samparka Kendra Pest Alert',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#d97706',
        keyTakeaways: [
          'Causes "hopperburn" — circular dried patches in field',
          'Vector for Grassy Stunt and Ragged Stunt viruses',
          'Avoid dense transplanting and excess urea'
        ],
        keyTakeawaysKn: [
          'ಹೊಲದಲ್ಲಿ ವೃತ್ತಾಕಾರವಾಗಿ ಒಣಗುವ "ಹಾಪರ್‌ಬರ್ನ್" ರೋಗಲಕ್ಷಣವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ',
          'ಗ್ರಾಸಿ ಸ್ಟಂಟ್ ಮತ್ತು ರಾಗ್ಡ್ ಸ್ಟಂಟ್ ವೈರಸ್‌ಗಳನ್ನು ಹರಡುತ್ತದೆ',
          'ದಟ್ಟ ನಾಟಿ ಮತ್ತು ಅತಿಯಾದ ಯೂರಿಯಾ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ'
        ],
        keyTakeawaysHi: [
          'खेत में गोल सूखे पैच यानी "हॉपरबर्न" पैदा करता है',
          'ग्रैसी स्टंट और रैग्ड स्टंट वायरस का वाहक है',
          'घनी रोपाई और अत्यधिक यूरिया के प्रयोग से बचें'
        ],
        products: [
          { name: 'Imidacloprid 17.8 SL', type: 'chemical', brand: 'Confidor / Tata Mida', price: '₹240 – ₹380 / 100mL', query: 'Imidacloprid 17.8 SL' },
          { name: 'Buprofezin 25 SC', type: 'chemical', brand: 'Applaud / Rallis', price: '₹420 – ₹580 / 500mL', query: 'Buprofezin 25 SC' },
          { name: 'Neem Oil 10000 PPM', type: 'organic', brand: 'Eco-Neem', price: '₹220 – ₹350 / 1L', query: 'Neem oil agriculture 10000 ppm' }
        ]
      },
      {
        disease: 'Sheath Blight (Rhizoctonia solani)',
        diseaseKn: 'ತೊಗಟೆ ಅಂಗಮಾರಿ ರೋಗ',
        diseaseHi: 'शीथ ब्लाइट (पर्णच्छद अंगमारी)',
        severity: 'Medium',
        remedy: 'Spray Validamycin 3 SL @ 2 mL/L or Hexaconazole 5 EC @ 1 mL/L. Improve air circulation.',
        remedyKn: 'Validamycin 3 SL @ 2 mL/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಅನ್ನು ಕಾಂಡ ಮತ್ತು ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸಿ. ಉತ್ತಮ ಗಾಳಿಯಾಡುವಂತೆ ಮಾಡಿ.',
        remedyHi: 'Validamycin 3 SL @ 2 mL/L या Hexaconazole 5 EC @ 1 mL/L का छिड़काव करें। खेत में हवा का संचार सुधारें।',
        prevention: 'Remove infected weeds around bunds. Avoid water movement from diseased to healthy fields.',
        preventionKn: 'ಬದುಗಳಲ್ಲಿರುವ ಕಳೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ರೋಗಪೀಡಿತ ಗದ್ದೆಯಿಂದ ಆರೋಗ್ಯಕರ ಗದ್ದೆಗೆ ನೀರು ಹರಿಯದಂತೆ ತಡೆಯಿರಿ.',
        preventionHi: 'मेड़ों पर खरपतवार नष्ट करें। संक्रमित खेत से स्वस्थ खेत में पानी के बहाव को रोकें।',
        organicTip: 'Apply Trichoderma viride 1% WP @ 4 kg/ha enriched in farmyard manure at tillering.',
        organicTipKn: 'ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿದ Trichoderma viride 1% WP @ 4 kg/ha ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.',
        organicTipHi: 'कल्ले फूटते समय गोबर की खाद में मिलाकर Trichoderma viride 1% WP @ 4 kg/ha डालें।',
        fertilizer: 'Apply Potash (MOP) in 2 splits — 50% basal, 50% panicle initiation.',
        fertilizerKn: 'ಪೊಟ್ಯಾಶ್ (MOP) ಗೊಬ್ಬರವನ್ನು ಎರಡು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ — 50% ಬಿತ್ತನೆ ವೇಳೆ, 50% ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ.',
        fertilizerHi: 'पोटाश (MOP) 2 किस्तों में दें — 50% बुवाई पर, 50% बाली निकलने के समय।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#0284c7',
        keyTakeaways: [
          'Snake-skin like greenish-grey lesions on leaf sheaths near water line',
          'Sclerotia float in standing irrigation water spreading infection',
          'High plant density and heavy nitrogen trigger severity'
        ],
        keyTakeawaysKn: [
          'ನೀರಿನ ಮಟ್ಟದ ಬಳಿಯ ಎಲೆಯ ತೊಗಟೆಯ ಮೇಲೆ ಹಾವಿನ ಚರ್ಮದಂತಹ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ಶಿಲೀಂಧ್ರದ ಬೀಜಗಳು ನೀರಿನಲ್ಲಿ ತೇಲುತ್ತಾ ಇಡೀ ಗದ್ದೆಗೆ ರೋಗವನ್ನು ಹರಡುತ್ತವೆ',
          'ದಟ್ಟ ನಾಟಿ ಮತ್ತು ಅತಿಯಾದ ಸಾರಜನಕ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ'
        ],
        keyTakeawaysHi: [
          'पानी की सतह के पास तने पर सांप की केंचुली जैसे भूरे धब्बे बनते हैं',
          'खेत में भरे पानी के साथ फफूंद तैरकर दूसरे पौधों में फैलती है',
          'अधिक नाइट्रोजन और घने पौधों से यह बीमारी बहुत तेजी से बढ़ती है'
        ],
        products: [
          { name: 'Validamycin 3 SL', type: 'chemical', brand: 'Sheathmar / Valida', price: '₹220 – ₹340 / 500mL', query: 'Validamycin 3 SL' },
          { name: 'Hexaconazole 5 EC', type: 'chemical', brand: 'Contaf Plus / Sitara', price: '₹280 – ₹420 / 500mL', query: 'Hexaconazole 5 EC' },
          { name: 'MOP Muriate of Potash', type: 'fertilizer', brand: 'IFFCO / IPL Potash', price: '₹1,650 – ₹1,800 / 50kg', query: 'MOP Potash fertilizer 50kg' }
        ]
      },
      {
        disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        diseaseKn: 'ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಎಲೆ ಅಂಗಮಾರಿ (BLB)',
        diseaseHi: 'जीवाणु पत्ती झुलसा रोग (BLB)',
        severity: 'High',
        remedy: 'Spray Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L twice at 10-day intervals.',
        remedyKn: 'Copper Oxychloride 50 WP @ 2.5 g/L ಜೊತೆಗೆ Streptocycline @ 0.1 g/L ಬೆರೆಸಿ 10 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಎರಡು ಬಾರಿ ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L मिलाकर 10 दिन के अंतराल पर 2 बार छिड़काव करें।',
        prevention: 'Drain excess water from field. Avoid clipping of seedling tips during transplanting.',
        preventionKn: 'ಗದ್ದೆಯಿಂದ ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ಹೊರಹಾಕಿ. ನಾಟಿ ಮಾಡುವಾಗ ಸಸಿಗಳ ತುದಿಯನ್ನು ಕತ್ತರಿಸಬೇಡಿ.',
        preventionHi: 'खेत से अतिरिक्त पानी निकाल दें। रोपाई के समय पौध की ऊपरी पत्तियों को न काटें।',
        organicTip: 'Foliar spray of fresh cow dung slurry supernatant (20%) + Bleaching Powder @ 5 kg/ha.',
        organicTipKn: 'ಹಸುವಿನ ಸಗಣಿ ತಿಳಿ ನೀರು (20%) ಸಿಂಪಡಿಸಿ ಮತ್ತು ಎಕರೆಗೆ Bleaching Powder @ 2 kg ನೀರಿಗೆ ಸೇರಿಸಿ.',
        organicTipHi: 'ताजा गाय के गोबर का 20% घोल का छिड़काव करें और खेत के पानी में Bleaching Powder डालें।',
        fertilizer: 'Postpone nitrogen top-dressing until disease symptoms subside.',
        fertilizerKn: 'ರೋಗದ ಲಕ್ಷಣಗಳು ಕಡಿಮೆಯಾಗುವವರೆಗೆ ಸಾರಜನಕ (ಯೂರಿಯಾ) ಮೇಲುಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ಮುಂದೂಡಿ.',
        fertilizerHi: 'रोग नियंत्रित होने तक यूरिया का ऊपरी छिड़काव पूरी तरह रोक दें।',
        scheme: 'PMFBY Crop Insurance',
        schemeLink: 'https://pmfby.gov.in/',
        color: '#b91c1c',
        keyTakeaways: [
          'Translucent wavy yellow-to-white lesions starting from leaf tips and margins',
          'Bacterial milky ooze seen on early mornings during warm rainy days',
          'Do not apply urea when leaves show bacterial water-soaking'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಯ ತುದಿ ಮತ್ತು ಅಂಚುಗಳಿಂದ ಹಳದಿಯಾಗಿ ಒಣಗುವ ಅಲೆಗಳಂತಹ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ಮಳೆಗಾಲದ ಮುಂಜಾನೆ ಎಲೆಯ ಮೇಲೆ ಹಾಲಿನಂತಹ ಬ್ಯಾಕ್ಟೀರಿಯಾ ದ್ರವ ಕಾಣಬಹುದು',
          'ಎಲೆಗಳು ಒಣಗುತ್ತಿರುವಾಗ ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಯೂರಿಯಾ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियों के किनारों से लहरदार पीले-सफेद सूखने वाले धब्बे शुरू होते हैं',
          'सुबह के समय पत्तियों पर बैक्टीरिया की सफेद बूंदें (ऊज़) दिखाई देती हैं',
          'रोग दिखने पर किसी भी स्थिति में यूरिया का इस्तेमाल न करें'
        ],
        products: [
          { name: 'Copper Oxychloride 50 WP', type: 'chemical', brand: 'Blitox / Cupramar', price: '₹280 – ₹420 / 500g', query: 'Copper Oxychloride 50 WP' },
          { name: 'Streptocycline (Streptomycin + Tetracycline)', type: 'chemical', brand: 'Hindustan Antibiotics', price: '₹45 – ₹70 / 6g pouch', query: 'Streptocycline 6g' },
          { name: 'Bleaching Powder (Chlorinated Lime)', type: 'chemical', brand: 'Agri Grade', price: '₹60 – ₹100 / 1kg', query: 'Bleaching Powder agriculture' }
        ]
      },
      {
        disease: 'Yellow Stem Borer (Scirpophaga incertulas)',
        diseaseKn: 'ಹಳದಿ ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು',
        diseaseHi: 'पीला तना छेदक (येलो स्टेम बोरर)',
        severity: 'High',
        remedy: 'Apply Chlorantraniliprole 18.5 SC @ 0.3 mL/L or Cartap Hydrochloride 4G granules @ 10 kg/acre in standing water.',
        remedyKn: 'Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಸಿಂಪಡಿಸಿ ಅಥವಾ Cartap Hydrochloride 4G ಹರಳುಗಳನ್ನು ಎಕರೆಗೆ 10 kg ಯಂತೆ ಗದ್ದೆಯ ನೀರಿನಲ್ಲಿ ಹರಡಿ.',
        remedyHi: 'Chlorantraniliprole 18.5 SC @ 0.3 mL/L का छिड़काव करें या खड़े पानी में Cartap Hydrochloride 4G दाने @ 10 kg/एकड़ डालें।',
        prevention: 'Clip seedling tips before transplanting to destroy egg masses. Set up pheromone traps @ 8/acre.',
        preventionKn: 'ನಾಟಿ ಮಾಡುವ ಮುನ್ನ ಸಸಿಗಳ ತುದಿಯನ್ನು ಕತ್ತರಿಸಿ ಮೊಟ್ಟೆಗಳನ್ನು ನಾಶಮಾಡಿ. ಎಕರೆಗೆ 8 ಮೋಹಕ ಬಲೆಗಳನ್ನು (ಫೆರೋಮೊನ್ ಟ್ರ್ಯಾಪ್) ಅಳವಡಿಸಿ.',
        preventionHi: 'रोपाई से पहले पौध की नोक काटें ताकि अंडों के गुच्छे नष्ट हों। 8 फेरोमोन ट्रैप प्रति एकड़ लगाएं।',
        organicTip: 'Release Trichogramma japonicum egg parasitoid cards @ 1,00,000 parasitoids/ha weekly 3 times.',
        organicTipKn: 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 1,00,000 Trichogramma japonicum ಪರಾವಲಂಬಿ ಕೀಟ ಕಾರ್ಡ್‌ಗಳನ್ನು ವಾರಕ್ಕೊಮ್ಮೆ 3 ಬಾರಿ ಬಿಡಿ.',
        organicTipHi: 'प्रति हेक्टेयर 1 लाख Trichogramma japonicum ट्राइकोगार्ड कार्ड साप्ताहिक रूप से 3 बार लगाएं।',
        fertilizer: 'Apply balanced NPK with Zinc Sulphate @ 10 kg/acre to strengthen tillers.',
        fertilizerKn: 'ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಸಮತೋಲಿತ NPK ಜೊತೆಗೆ Zinc Sulphate @ 10 kg/acre ಮಣ್ಣಿಗೆ ನೀಡಿ.',
        fertilizerHi: 'कल्लों को मजबूत करने के लिए संतुलित NPK के साथ Zinc Sulphate @ 10 kg/एकड़ दें।',
        scheme: 'Raitha Sanjeevini Pest Management Support',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Causes "dead heart" in vegetative stage and white chaffy earheads ("white ear") at panicle stage',
          'Egg masses covered with buff-colored hairs on upper leaf surfaces',
          'Install yellow stem borer pheromone lures early in the season'
        ],
        keyTakeawaysKn: [
          'ಬೆಳವಣಿಗೆ ಹಂತದಲ್ಲಿ ಒಣಗಿದ ಸುಳಿ ಮತ್ತು ತೆನೆ ಹಂತದಲ್ಲಿ ಬಿಳಿ ಕಾಳುಗಳಿಲ್ಲದ ತೆನೆಗಳನ್ನು ("ಬೆಳ್ಳಗಾದ ತೆನೆ") ಉಂಟುಮಾಡುತ್ತದೆ',
          'ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ಕೂದಲುಗಳಿಂದ ಆವೃತವಾದ ಮೊಟ್ಟೆಗಳ ಗುಚ್ಛಗಳು ಕಾಣುತ್ತವೆ',
          'ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ಫೆರೋಮೊನ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಗದ್ದೆಯಲ್ಲಿ ಅಳವಡಿಸಿ'
        ],
        keyTakeawaysHi: [
          'वानस्पतिक अवस्था में "डेड हार्ट" (सूखा तना) और बाली आने पर सफेद बालियां (व्हाइट इयर) पैदा करता है',
          'पत्तियों पर रोएंदार भूरे रंग के अंडों के गुच्छे दिखाई देते हैं',
          'शुरुआत में ही खेत में तना छेदक के फेरोमोन ल्यूर ट्रैप अवश्य लगाएं'
        ],
        products: [
          { name: 'Chlorantraniliprole 18.5 SC (Coragen)', type: 'chemical', brand: 'FMC Coragen', price: '₹850 – ₹1,150 / 60mL', query: 'Chlorantraniliprole 18.5 SC' },
          { name: 'Cartap Hydrochloride 4G', type: 'chemical', brand: 'Padan / Caldan 4G', price: '₹480 – ₹620 / 5kg', query: 'Cartap Hydrochloride 4G' },
          { name: 'Pheromone Trap + Lure (Rice Stem Borer)', type: 'organic', brand: 'Pest Phero Lures', price: '₹120 – ₹180 / unit', query: 'Yellow stem borer pheromone lure' }
        ]
      }
    ]
  },

  // ── 2. RAGI / FINGER MILLET ──
  {
    crop: 'Ragi / Finger Millet (ರಾಗಿ)',
    cropKn: 'ರಾಗಿ',
    cropHi: 'रागी (मडुआ)',
    emoji: '🌾',
    diseases: [
      {
        disease: 'Ragi Blast (Pyricularia grisea)',
        diseaseKn: 'ರಾಗಿ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)',
        diseaseHi: 'रागी ब्लास्ट रोग (झोंका रोग)',
        severity: 'High',
        remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Kitazin 48 EC @ 1 mL/L or Carbendazim 50 WP @ 1 g/L at seedling and earhead emergence stages.',
        remedyKn: 'ಸಸಿ ಮಡಿ ಮತ್ತು ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Kitazin 48 EC @ 1 mL/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'नर्सरी तथा बाली निकलते समय Mancozeb 75 WP @ 2 g/L या Kitazin 48 EC @ 1 mL/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।',
        prevention: 'Treat seeds with Carbendazim @ 2 g/kg before sowing. Avoid late sowing in Kharif season.',
        preventionKn: 'ಬಿತ್ತನೆ ಮುನ್ನ ಬೀಜಗಳಿಗೆ Carbendazim @ 2 g/kg ಉಪಚರಿಸಿ. ತಡವಾಗಿ ಬಿತ್ತನೆ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.',
        preventionHi: 'बुवाई से पहले बीजों को Carbendazim @ 2 g/kg से उपचारित करें। देर से बुवाई न करें।',
        organicTip: 'Seed treatment with Trichoderma harzianum @ 5 g/kg seed + foliar spray of Panchagavya 3%.',
        organicTipKn: 'Trichoderma harzianum @ 5 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು 3% ಪಂಚಗವ್ಯ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'Trichoderma harzianum @ 5 g/kg से बीजोपचार करें एवं 3% पंचगव्य का छिड़काव करें।',
        fertilizer: 'Apply 50:40:25 kg NPK/ha. Supplement with Farmyard Manure @ 10 t/ha.',
        fertilizerKn: 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 50:40:25 kg NPK ಗೊಬ್ಬರ ಮತ್ತು 10 ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಮಣ್ಣಿಗೆ ನೀಡಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 50:40:25 kg NPK और 10 टन गोबर की सड़ी खाद खेत में डालें।',
        scheme: 'Karnataka Raitha Siri Scheme (Millets Support)',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Affects leaves, neck, and finger spikelets turning grains black and chaffy',
          'Major yield threat in dryland rainfed areas under high rainfall breaks',
          'Grow resistant varieties: GPU-28, ML-365, or GPU-48'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು, ಕುತ್ತಿಗೆ ಮತ್ತು ರಾಗಿ ಬೆರಳುಗಳ ತೆನೆಯ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗಿ ಕಾಳು ಕಟ್ಟುವುದಿಲ್ಲ',
          'ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಾದಾಗ ತೀವ್ರ ನಷ್ಟ ಉಂಟುಮಾಡುತ್ತದೆ',
          'GPU-28, ML-365 ಅಥವಾ GPU-48 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियों, तने की गर्दन और उंगलियों जैसी बालियों पर काले धब्बे बनते हैं और दाने नहीं भरते',
          'शुष्क एवं वर्षा आधारित क्षेत्रों में आर्द्रता बढ़ने पर यह भारी नुकसान पहुंचाता है',
          'GPU-28, ML-365 या GPU-48 जैसी प्रतिरोधी किस्मों की खेती करें'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Kitazin 48 EC', type: 'chemical', brand: 'Iprobenfos (Kitazin)', price: '₹340 – ₹490 / 500mL', query: 'Kitazin 48 EC' },
          { name: 'Trichoderma harzianum', type: 'organic', brand: 'Bio-Fungicide', price: '₹170 – ₹250 / 1kg', query: 'Trichoderma harzianum 1kg' }
        ]
      },
      {
        disease: 'Foot Rot / Seedling Blight (Cochliobolus miyabeanus)',
        diseaseKn: 'ರಾಗಿ ಬುಡ ಕೊಳೆ ರೋಗ',
        diseaseHi: 'रागी जड़ विगलन रोग (पाद विगलन)',
        severity: 'Medium',
        remedy: 'Drench root zone with Captan 50 WP @ 2.5 g/L or Copper Oxychloride 50 WP @ 3 g/L.',
        remedyKn: 'ಸಸಿಗಳ ಬುಡಕ್ಕೆ Captan 50 WP @ 2.5 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ದ್ರಾವಣವನ್ನು ಸುರಿಯಿರಿ (ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ).',
        remedyHi: 'पौधों की जड़ों में Captan 50 WP @ 2.5 g/L या Copper Oxychloride 50 WP @ 3 g/L का घोल डालें।',
        prevention: 'Ensure proper drainage in nursery beds. Avoid water stagnation around roots.',
        preventionKn: 'ಸಸಿ ಮಡಿಗಳಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬಸಿಗಾಲುವೆ ಮಾಡಿ. ಬುಡದಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        preventionHi: 'नर्सरी में जल निकासी की अच्छी व्यवस्था करें। जड़ों के पास पानी न जमने दें।',
        organicTip: 'Soil application of Trichoderma viride @ 2.5 kg/acre enriched with 100 kg compost.',
        organicTipKn: '100 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ Trichoderma viride @ 2.5 kg ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.',
        organicTipHi: '100 kg सड़ी खाद में Trichoderma viride @ 2.5 kg मिलाकर खेत की मिट्टी में मिलाएं।',
        fertilizer: 'Apply balanced basal fertilizer; avoid excessive ammonium nitrogen in seedling stage.',
        fertilizerKn: 'ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ನೀಡಿ; ಸಸಿ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಹಾಕಬೇಡಿ.',
        fertilizerHi: 'शुरुआती अवस्था में संतुलित खाद दें; अत्यधिक अमोनियम खाद से बचें।',
        scheme: 'National Food Security Mission - Nutri Cereals',
        schemeLink: 'https://nfsm.gov.in/',
        color: '#b45309',
        keyTakeaways: [
          'Causes rotting of collar region and wilting of young seedlings',
          'Spreads rapidly in poorly drained soil during continuous drizzles',
          'Always use certified seed treated with bioagents or fungicides'
        ],
        keyTakeawaysKn: [
          'ಸಸಿಗಳ ಬುಡದ ಕಾಂಡ ಕೊಳೆತು ಒಣಗಿ ಸಾಯುತ್ತವೆ',
          'ನೀರು ನಿಲ್ಲುವ ಗದ್ದೆಗಳಲ್ಲಿ ತುಂತುರು ಮಳೆಯ ನಂತರ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ',
          'ಯಾವಾಗಲೂ ಪ್ರಮಾಣೀಕೃತ ಮತ್ತು ಬೀಜೋಪಚಾರ ಮಾಡಿದ ಬೀಜಗಳನ್ನೇ ಬಿತ್ತನೆ ಮಾಡಿ'
        ],
        keyTakeawaysHi: [
          'पौधों के तने का निचला हिस्सा सड़ जाता है और छोटे पौधे सूखने लगते हैं',
          'जलभराव वाली मिट्टी में लगातार रिमझिम बारिश के बाद यह तेजी से फैलता है',
          'हमेशा उपचारित एवं प्रमाणित बीजों का ही उपयोग करें'
        ],
        products: [
          { name: 'Captan 50 WP', type: 'chemical', brand: 'Captaf / Dhanuka', price: '₹320 – ₹450 / 500g', query: 'Captan 50 WP' },
          { name: 'Copper Oxychloride 50 WP', type: 'chemical', brand: 'Blitox', price: '₹280 – ₹390 / 500g', query: 'Copper Oxychloride 50 WP' },
          { name: 'Trichoderma viride 1% WP', type: 'organic', brand: 'Bio-Fungicide', price: '₹160 – ₹230 / 1kg', query: 'Trichoderma viride 1kg' }
        ]
      },
      {
        disease: 'Ragi Smut (Melanopsichium eleusinis)',
        diseaseKn: 'ರಾಗಿ ಮಸಿ ರೋಗ (ಸ್ಮಟ್)',
        diseaseHi: 'रागी कंडुआ रोग (स्मट)',
        severity: 'Medium',
        remedy: 'Spray Carboxin 37.5% + Thiram 37.5% DS @ 2 g/kg seed or spray Hexaconazole 5 SC @ 2 mL/L at 50% flowering.',
        remedyKn: 'ಬಿತ್ತನೆ ಮುನ್ನ Carboxin + Thiram @ 2 g/kg ಬೀಜೋಪಚಾರ ಮಾಡಿ ಅಥವಾ ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ Hexaconazole 5 SC @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'Carboxin + Thiram @ 2 g/kg से बीजोपचार करें या 50% फूल आने पर Hexaconazole 5 SC @ 2 mL/L का छिड़काव करें।',
        prevention: 'Collect and burn smutted earheads in plastic bags to avoid airborne spore dispersion.',
        preventionKn: 'ರೋಗಪೀಡಿತ ತೆನೆಗಳನ್ನು ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲದಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ ಸುಟ್ಟುಹಾಕಿ, ಬೀಜಾಣುಗಳು ಗಾಳಿಯಲ್ಲಿ ಹರಡುವುದನ್ನು ತಡೆಯಿರಿ.',
        preventionHi: 'संक्रमित बालियों को थैली में इकट्ठा करके जलाएं ताकि हवा में फफूंद के कण न फैलें।',
        organicTip: 'Soak seeds in 10% cow urine solution for 30 minutes before shade drying and sowing.',
        organicTipKn: 'ಬಿತ್ತನೆ ಮಾಡುವ ಮುನ್ನ ಬೀಜಗಳನ್ನು 10% ಗೋಮೂತ್ರದ ದ್ರಾವಣದಲ್ಲಿ 30 ನಿಮಿಷ ನೆನೆಸಿ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ.',
        organicTipHi: 'बुवाई से पहले बीजों को 10% गोमूत्र के घोल में 30 मिनट भिगोकर छाया में सुखाएं।',
        fertilizer: 'Do not overdose urea at panicle emergence stage.',
        fertilizerKn: 'ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ಅತಿಯಾಗಿ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡಬೇಡಿ.',
        fertilizerHi: 'बाली निकलने के समय अतिरिक्त यूरिया का प्रयोग न करें।',
        scheme: 'Raitha Sanjeevini Crop Advisory',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#475569',
        keyTakeaways: [
          'Individual grains in earheads transform into large green-to-black smut sori containing soot-like powder',
          'Infection occurs at flowering through stigma',
          'Deep summer ploughing destroys overwintering spores in soil'
        ],
        keyTakeawaysKn: [
          'ತೆನೆಯಲ್ಲಿನ ರಾಗಿ ಕಾಳುಗಳು ದಪ್ಪಗಾಗಿ ಹಸಿರು-ಕಪ್ಪು ಮಸಿ ಪುಡಿಯಾಗಿ ಬದಲಾಗುತ್ತವೆ',
          'ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಗಾಳಿಯ ಮೂಲಕ ಪರಾಗಸ್ಪರ್ಶ ಕಾಲದಲ್ಲಿ ಸೋಂಕು ತಗುಲುತ್ತದೆ',
          'ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡುವುದರಿಂದ ಮಣ್ಣಿನಲ್ಲಿರುವ ಶಿಲೀಂಧ್ರ ನಾಶವಾಗುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'बालियों के दाने बड़े होकर हरे-काले चूर्ण जैसी गांठों में बदल जाते हैं',
          'फूल आने के समय हवा के माध्यम से यह संक्रमण फैलता है',
          'गर्मियों में गहरी जुताई करने से मिट्टी में दबे फफूंद नष्ट हो जाते हैं'
        ],
        products: [
          { name: 'Carboxin 37.5% + Thiram 37.5% DS', type: 'chemical', brand: 'Vitavax Power', price: '₹420 – ₹580 / 500g', query: 'Carboxin Thiram Vitavax Power' },
          { name: 'Hexaconazole 5 SC', type: 'chemical', brand: 'Contaf Plus', price: '₹280 – ₹420 / 500mL', query: 'Hexaconazole 5 SC' }
        ]
      },
      {
        disease: 'Downy Mildew / Green Ear (Sclerophthora macrospora)',
        diseaseKn: 'ರಾಗಿ ಬೂದಿ ರೋಗ / ಹಸಿರು ತೆನೆ ರೋಗ',
        diseaseHi: 'रागी डाउनी मिल्ड्यू / हरित बाली रोग',
        severity: 'High',
        remedy: 'Foliar spray with Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2 g/L upon noticing yellowing.',
        remedyKn: 'ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು ಕಂಡ ತಕ್ಷಣ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'पत्तियों पर पीलापन दिखते ही Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L का छिड़काव करें।',
        prevention: 'Rogue out and destroy infected malformed plants immediately. Do not collect seeds from infected crop.',
        preventionKn: 'ವಿಕಾರಗೊಂಡ ಮತ್ತು ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ನಾಶಮಾಡಿ. ರೋಗಪೀಡಿತ ಬೆಳೆಯನ್ನು ಬೀಜಕ್ಕೆ ಬಳಸಬೇಡಿ.',
        preventionHi: 'संक्रमित पौधों को तुरंत उखाड़कर नष्ट करें। रोगग्रस्त फसल से कभी बीज न लें।',
        organicTip: 'Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed.',
        organicTipKn: 'Pseudomonas fluorescens @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.',
        organicTipHi: 'Pseudomonas fluorescens @ 10 g/kg से बीजोपचार करें।',
        fertilizer: 'Apply balanced Micronutrient mixture (Zinc + Boron) @ 5 kg/acre to boost plant vigor.',
        fertilizerKn: 'ಗಿಡದ ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಮಿಶ್ರಣ (Zinc + Boron) @ 5 kg/acre ನೀಡಿ.',
        fertilizerHi: 'पौधों की प्रतिरोधक क्षमता बढ़ाने के लिए सूक्ष्म पोषक तत्व (Zinc + Boron) @ 5 kg/एकड़ दें।',
        scheme: 'Millets Mission Karnataka',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#16a34a',
        keyTakeaways: [
          'Floral parts transform into leafy leafy malformations giving a "witch broom" or "green ear" appearance',
          'Downy white fungal growth visible on leaf undersides in high humidity',
          'Use certified disease-free seeds from Govt seed centers'
        ],
        keyTakeawaysKn: [
          'ರಾಗಿ ತೆನೆಯ ಹೂವುಗಳು ಎಲೆಯಂತೆ ವಿಕಾರಗೊಂಡು "ಹಸಿರು ಪೊರಕೆ"ಯಂತೆ ಕಾಣುತ್ತವೆ',
          'ಹೆಚ್ಚಿನ ತೇವಾಂಶವಿದ್ದಾಗ ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಬೆಳೆಯುತ್ತದೆ',
          'ಸರ್ಕಾರಿ ಬೀಜ ಕೇಂದ್ರಗಳಿಂದ ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜಗಳನ್ನು ಪಡೆಯಿರಿ'
        ],
        keyTakeawaysHi: [
          'बालियों के फूलों की जगह विकृत हरी पत्तियां उग आती हैं जो हरी झाड़ू जैसी दिखती हैं',
          'अधिक नमी होने पर पत्तियों की निचली सतह पर सफेद फफूंद जम जाती है',
          'सरकारी बीज केंद्रों से ही प्रमाणित रोगमुक्त बीज खरीदें'
        ],
        products: [
          { name: 'Metalaxyl 8% + Mancozeb 64% WP', type: 'chemical', brand: 'Ridomil Gold', price: '₹480 – ₹680 / 500g', query: 'Metalaxyl Mancozeb 72 WP' },
          { name: 'Micronutrient Mixture for Millets', type: 'fertilizer', brand: 'Multiplex / Aries', price: '₹350 – ₹480 / 5kg', query: 'Millets micronutrient mixture' }
        ]
      },
      {
        disease: 'Helminthosporium Leaf Spot (Helminthosporium nodulosum)',
        diseaseKn: 'ರಾಗಿ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ',
        diseaseHi: 'रागी पर्ण चित्ती रोग (हेल्मिन्थोस्पोरियम लीफ स्पॉट)',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Zineb 75 WP @ 2 g/L at first appearance of spots.',
        remedyKn: 'ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Zineb 75 WP @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'धब्बे दिखाई देते ही Mancozeb 75 WP @ 2 g/L या Zineb 75 WP @ 2 g/L का छिड़काव करें।',
        prevention: 'Crop rotation with pulses like Redgram or Cowpea. Avoid continuous ragi cultivation on same plot.',
        preventionKn: 'ತೊಗರಿ ಅಥವಾ ಅಲಸಂದೆ ಕಾಳು ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಒಂದೇ ಜಮೀನಿನಲ್ಲಿ ನಿರಂತರ ರಾಗಿ ಬೆಳೆಯಬೇಡಿ.',
        preventionHi: 'अरहर या लोबिया जैसी दलहनी फसलों के साथ फसल चक्र अपनाएं। लगातार एक ही खेत में रागी न लगाएं।',
        organicTip: 'Foliar spray of 5% Neem seed kernel extract (NSKE) + Cow urine 5%.',
        organicTipKn: '5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '5% नीम के बीज का अर्क और 5% गोमूत्र मिलाकर पत्तियों पर छिड़कें।',
        fertilizer: 'Apply recommended Potash (MOP) to enhance foliar resistance against leaf spots.',
        fertilizerKn: 'ಎಲೆ ಚುಕ್ಕೆ ರೋಗ ತಡೆಯಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ (MOP) ಗೊಬ್ಬರವನ್ನು ತಪ್ಪದೇ ನೀಡಿ.',
        fertilizerHi: 'पत्तियों की प्रतिरोधक क्षमता बढ़ाने के लिए अनुशंसित पोटाश (MOP) अवश्य डालें।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#854d0e',
        keyTakeaways: [
          'Small oval to cylindrical brown spots on leaves that coalesce to dry out leaf blades',
          'Affects both seedlings and mature plants leading to poor grain filling',
          'Early intervention with protective fungicide prevents yield loss'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಅಂಡಾಕಾರದ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗಿ ಎಲೆಗಳು ಒಣಗುತ್ತವೆ',
          'ಸಸಿಗಳು ಮತ್ತು ಬೆಳೆದ ಗಿಡಗಳೆರಡಕ್ಕೂ ಬಾಧಿಸಿ ಕಾಳು ತೂಕ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವಾಗುತ್ತದೆ',
          'ರೋಗದ ಆರಂಭದಲ್ಲೇ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿದರೆ ಇಳುವರಿ ನಷ್ಟ ತಪ್ಪಿಸಬಹುದು'
        ],
        keyTakeawaysHi: [
          'पत्तियों पर अंडाकार भूरे धब्बे बनते हैं जो मिलकर पूरी पत्ती को सुखा देते हैं',
          'छोटे पौधों और पकी फसल दोनों को प्रभावित करता है जिससे दाना कमजोर रह जाता है',
          'शुरुआत में फफूंदनाशक का छिड़काव फसल को भारी नुकसान से बचाता है'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Dithane M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Zineb 75 WP', type: 'chemical', brand: 'Indofil Z-78', price: '₹280 – ₹410 / 500g', query: 'Zineb 75 WP' }
        ]
      }
    ]
  }
];

// Let's create the full 24 crops dataset script and write it out!
console.log('Starter template ready. Will assemble all 24 crops x 5 diseases = 120 diseases.');
