export const CEREALS_MILLETS = [
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
  },

  // ── 3. MAIZE / CORN ──
  {
    crop: 'Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)',
    cropKn: 'ಮೆಕ್ಕೆಜೋಳ',
    cropHi: 'मक्का (भुट्टा)',
    emoji: '🌽',
    diseases: [
      {
        disease: 'Fall Armyworm (Spodoptera frugiperda)',
        diseaseKn: 'ಕತ್ತರಿ ಹುಳು (ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್)',
        diseaseHi: 'फॉल आर्मीवर्म (सैनिक कीट)',
        severity: 'High',
        remedy: 'Apply Emamectin Benzoate 5 SG @ 0.4 g/L or Spinetoram 11.7 SC @ 0.5 mL/L directed into plant whorls. Poison baiting with jaggery + rice bran + Thiodicarb.',
        remedyKn: 'ಸುಳಿಯೊಳಗೆ Emamectin Benzoate 5 SG @ 0.4 g/L ಅಥವಾ Spinetoram 11.7 SC @ 0.5 mL/L ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ. ಬೆಲ್ಲ + ತೌಡು + Thiodicarb ವಿಷಪಾಶ ತಯಾರಿಸಿ ಸುಳಿಗೆ ಹಾಕಿ.',
        remedyHi: 'पौधों के पोंगे (भंवर) में Emamectin Benzoate 5 SG @ 0.4 g/L या Spinetoram 11.7 SC @ 0.5 mL/L का छिड़काव करें। गुड़ + चोकर + Thiodicarb का विष चुग्गा डालें।',
        prevention: 'Deep summer ploughing. Synchronized community sowing. Install pheromone traps @ 5/acre.',
        preventionKn: 'ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ. ಇಡೀ ಪ್ರದೇಶದಲ್ಲಿ ಏಕಕಾಲಕ್ಕೆ ಬಿತ್ತನೆ ಮಾಡಿ. ಎಕರೆಗೆ 5 ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
        preventionHi: 'गर्मियों में गहरी जुताई करें। एक साथ पूरे क्षेत्र में बुवाई करें। 5 फेरोमोन ट्रैप प्रति एकड़ लगाएं।',
        organicTip: 'Release egg parasitoids Trichogramma pretiosum @ 50,000/acre. Spray Bacillus thuringiensis (Bt) @ 2 g/L.',
        organicTipKn: 'ಎಕರೆಗೆ Trichogramma pretiosum ಪರಾವಲಂಬಿಗಳನ್ನು ಬಿಡಿ. Bacillus thuringiensis (Bt) @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'प्रति एकड़ Trichogramma pretiosum छोड़ें और Bacillus thuringiensis (Bt) @ 2 g/L का छिड़काव करें।',
        fertilizer: 'Apply 150:75:40 kg NPK/ha. Avoid excess early nitrogen that stimulates lush tender foliage.',
        fertilizerKn: 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 150:75:40 kg NPK ಗೊಬ್ಬರ ನೀಡಿ. ಸಸಿ ಹಂತದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ನೀಡಬೇಡಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 150:75:40 kg NPK दें। शुरुआती अवस्था में ज्यादा यूरिया न डालें।',
        scheme: 'Special FAW Emergency Control Contingency Plan',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Voracious whorl feeder leaving ragged "shot-hole" leaves and large sawdust-like fecal matter',
          'Caterpillar has an inverted white "Y" on head and 4 square spots on 8th abdominal segment',
          'Target young larvae at 1st-2nd instar before they bore deep inside whorl'
        ],
        keyTakeawaysKn: [
          'ಸುಳಿಯೊಳಗಿನ ಎಲೆಗಳನ್ನು ತಿಂದು ಜರಡಿಯಂತೆ ತೂತು ಮಾಡಿ ಮರದ ಪುಡಿಯಂತಹ ಹಿಕ್ಕೆಯನ್ನು ಬಿಡುತ್ತದೆ',
          'ಹುಳುವಿನ ತಲೆಯ ಮೇಲೆ ತಿರುಗುಮುರುಗಾದ ಬಿಳಿ "Y" ಆಕಾರ ಮತ್ತು 8ನೇ ಖಂಡದಲ್ಲಿ 4 ಚೌಕಾಕಾರದ ಚುಕ್ಕೆಗಳಿರುತ್ತವೆ',
          'ಸುಳಿಯೊಳಗೆ ಹೊಗುವ ಮುನ್ನ ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ನಿಯಂತ್ರಣ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ'
        ],
        keyTakeawaysHi: [
          'पोंगे की पत्तियों को खाकर छलनी बना देता है और बुरादे जैसा मल छोड़ता है',
          'कीट के सिर पर उल्टे "Y" का निशान और पेट के 8वें खंड पर 4 चौकोर काले धब्बे होते हैं',
          'शुरुआती 1-2 अवस्था में ही छिड़काव करें जब तक कीट अंदर न घुसे'
        ],
        products: [
          { name: 'Emamectin Benzoate 5 SG', type: 'chemical', brand: 'Proclaim / Missile', price: '₹420 – ₹590 / 100g', query: 'Emamectin Benzoate 5 SG' },
          { name: 'Spinetoram 11.7 SC', type: 'chemical', brand: 'Delegate (Corteva)', price: '₹950 – ₹1,350 / 100mL', query: 'Spinetoram 11.7 SC Delegate' },
          { name: 'Bacillus thuringiensis (Bt)', type: 'organic', brand: 'Bio-Insecticide', price: '₹220 – ₹320 / 500g', query: 'Bacillus thuringiensis insecticide' },
          { name: 'FAW Pheromone Traps & Lures', type: 'organic', brand: 'Agri Trap System', price: '₹140 – ₹200 / unit', query: 'Fall armyworm pheromone trap lure' }
        ]
      },
      {
        disease: 'Turcicum Leaf Blight (Exserohilum turcicum)',
        diseaseKn: 'ಟರ್ಸಿಕಮ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ',
        diseaseHi: 'तुर्सिकम लीफ ब्लाइट (मक्का झुलसा)',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L upon noticing lower leaf lesions.',
        remedyKn: 'ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Azoxystrobin + Difenoconazole @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'निचली पत्तियों पर लक्षण दिखते ही Mancozeb 75 WP @ 2.5 g/L या Azoxystrobin + Difenoconazole @ 1 mL/L का छिड़काव करें।',
        prevention: 'Plant tolerant maize hybrids (e.g., CP-818, PAC-751). Incorporate crop debris into soil after harvest.',
        preventionKn: 'ರೋಗ ಸಹಿಷ್ಣು ಮೆಕ್ಕೆಜೋಳ ಹೈಬ್ರಿಡ್‌ಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ. ಕಟಾವಿನ ನಂತರ ಬೆಳೆಯ ತ್ಯಾಜ್ಯವನ್ನು ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.',
        preventionHi: 'रोग रोधी मक्का संकर किस्मों की बुवाई करें। कटाई के बाद अवशेषों को मिट्टी में दबा दें।',
        organicTip: 'Foliar spray of Pseudomonas fluorescens @ 2 g/L combined with 5% cow urine.',
        organicTipKn: 'Pseudomonas fluorescens @ 2 g/L ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'Pseudomonas fluorescens @ 2 g/L के साथ 5% गोमूत्र मिलाकर पत्तियों पर छिड़कें।',
        fertilizer: 'Ensure adequate Potassium (K) application; Potassium enhances maize stalk and leaf cell thickness.',
        fertilizerKn: 'ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ಇದು ಎಲೆ ಮತ್ತು ಕಾಂಡಗಳನ್ನು ಗಟ್ಟಿಗೊಳಿಸಿ ರೋಗ ತಡೆಯುತ್ತದೆ.',
        fertilizerHi: 'पर्याप्त पोटाश खाद डालें; पोटाश तने और पत्तियों की कोशिका भित्ति को मजबूत बनाता है।',
        scheme: 'National Food Security Mission - Coarse Cereals',
        schemeLink: 'https://nfsm.gov.in/',
        color: '#f97316',
        keyTakeaways: [
          'Long, elliptical, grayish-green or tan lesions (cigar-shaped) developing on leaves',
          'Heavy incidence during cool humid weather blights the entire photosynthetic canopy',
          'Begin protective spraying from bottom leaves upwards'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಮೇಲೆ ಉದ್ದವಾದ, ಸಿಗಾರ್ ಆಕಾರದ ಬೂದು-ಹಸಿರು ಅಥವಾ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ',
          'ಮೋಡ ಕವಿದ ಮತ್ತು ತೇವಾಂಶದ ಹವಾಮಾನದಲ್ಲಿ ಇಡೀ ಎಲೆಗಳು ಒಣಗಿ ಇಳುವರಿ ಕುಸಿಯುತ್ತದೆ',
          'ಕೆಳಗಿನ ಎಲೆಗಳಿಂದ ಆರಂಭಿಸಿ ಮೇಲಿನವರೆಗೆ ರೋಗ ಹರಡದಂತೆ ಸಿಂಪಡಣೆ ಮಾಡಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियों पर सिगार के आकार के लंबे, धूसर-हरे या भूरे धब्बे बनते हैं',
          'नम और ठंडे मौसम में पूरी पत्तियां झुलस जाती हैं जिससे दाना नहीं भर पाता',
          'निचली पत्तियों से ऊपर की ओर संक्रमण रोकने के लिए समय पर स्प्रे करें'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC', type: 'chemical', brand: 'Amistar Top (Syngenta)', price: '₹850 – ₹1,200 / 200mL', query: 'Azoxystrobin Difenoconazole Amistar Top' }
        ]
      },
      {
        disease: 'Maydis Leaf Blight (Bipolaris maydis)',
        diseaseKn: 'ಮೇಡಿಸ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ',
        diseaseHi: 'मेडिस लीफ ब्लाइट (मईडिस झुलसा)',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L at first appearance of spots.',
        remedyKn: 'ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'शुरुआती लक्षण पर Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।',
        prevention: 'Use certified clean seeds. Follow crop rotation with non-graminaceous crops like legumes.',
        preventionKn: 'ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಬಳಸಿ. ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.',
        preventionHi: 'प्रमाणित बीजों का उपयोग करें। दलहनी फसलों के साथ फसल चक्र अपनाएं।',
        organicTip: 'Foliar spray of Trichoderma viride @ 5 g/L at early vegetative stage.',
        organicTipKn: 'ಸಸಿ ಹಂತದಲ್ಲಿ Trichoderma viride @ 5 g/L ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'वानस्पतिक अवस्था में Trichoderma viride @ 5 g/L का पत्तियों पर छिड़काव करें।',
        fertilizer: 'Avoid excessive nitrogen fertilization during warm, rainy periods.',
        fertilizerKn: 'ಉಷ್ಣ ಮತ್ತು ಮಳೆಗಾಲದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.',
        fertilizerHi: 'गर्म एवं बरसात के मौसम में अत्यधिक यूरिया खाद देने से बचें।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#ca8a04',
        keyTakeaways: [
          'Small, rectangular, parallel-sided lesions restricted between veins',
          'Favored by warm temperatures (20–30°C) and high relative humidity',
          'Timely fungicide spray protects cob filling'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಯ ನರಗಳ ನಡುವೆ ಆಯತಾಕಾರದ ಸಣ್ಣ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ',
          '20–30°C ಉಷ್ಣತೆ ಮತ್ತು ಹೆಚ್ಚಿನ ಗಾಳಿಯ ತೇವಾಂಶವಿದ್ದಾಗ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ',
          'ಸಕಾಲಿಕ ಔಷಧ ಸಿಂಪಡಣೆ ತೆನೆಯಲ್ಲಿ ಕಾಳು ಗಟ್ಟಿಯಾಗಲು ಸಹಕಾರಿಯಾಗಿದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की नसों के बीच छोटे, आयताकार भूरे धब्बे बनते हैं',
          'गर्म तापमान (20–30°C) और उच्च आर्द्रता में यह बीमारी तेजी से फैलती है',
          'समय पर फफूंदनाशक का छिड़काव भुट्टे में दानों के भराव की रक्षा करता है'
        ],
        products: [
          { name: 'Propiconazole 25 EC', type: 'chemical', brand: 'Tilt / Dhanuka Result', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC Tilt' },
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Dithane M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' }
        ]
      },
      {
        disease: 'Common Rust (Puccinia sorghi)',
        diseaseKn: 'ಮೆಕ್ಕೆಜೋಳದ ತುಕ್ಕು ರೋಗ',
        diseaseHi: 'मक्का रतुआ रोग (कॉमन रस्ट)',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Zineb 75 WP @ 2 g/L or Propiconazole 25 EC @ 1 mL/L upon noticing pustules.',
        remedyKn: 'ಎಲೆಗಳ ಮೇಲೆ ತುಕ್ಕು ಬಣ್ಣದ ಬೊಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'पत्तियों पर रतुआ के फफोले दिखते ही Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।',
        prevention: 'Eradicate oxalis and alternate weed hosts around the field perimeter.',
        preventionKn: 'ಹೊಲದ ಸುತ್ತಮುತ್ತಲಿರುವ ಕಳೆಗಳು ಮತ್ತು ಆಕ್ಸಾಲಿಸ್ ಗಿಡಗಳನ್ನು ನಾಶಮಾಡಿ.',
        preventionHi: 'खेत की मेड़ों से खरपतवार और वैकल्पिक मेजबान पौधों को नष्ट करें।',
        organicTip: 'Spray wettable sulfur 80 WP @ 3 g/L early in morning.',
        organicTipKn: 'ಬೆಳಗಿನ ಜಾವ ಕರಗುವ ಗಂಧಕ (Wettable Sulphur 80 WP) @ 3 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'सुबह के समय घुलनशील सल्फर (Wettable Sulphur 80 WP) @ 3 g/L का छिड़काव करें।',
        fertilizer: 'Avoid late top-dressing with nitrogen which delays maturity and increases susceptibility.',
        fertilizerKn: 'ತಡವಾಗಿ ಸಾರಜನಕ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ; ಇದು ಬೆಳೆ ಮಾಗುವುದನ್ನು ನಿಧಾನಗೊಳಿಸಿ ರೋಗ ಹೆಚ್ಚಿಸುತ್ತದೆ.',
        fertilizerHi: 'देर से यूरिया डालने से बचें; इससे फसल देर से पकती है और रतुआ का खतरा बढ़ता है।',
        scheme: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        schemeLink: 'https://pmfby.gov.in/',
        color: '#b45309',
        keyTakeaways: [
          'Golden-brown to cinnamon-brown powdery pustules on both leaf surfaces',
          'In cool weather, pustules rupture the epidermis releasing powdery urediniospores',
          'Plant resistant varieties in rust-prone highland areas'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಚಿನ್ನದ ಕಂದು ಅಥವಾ ಇಟ್ಟಿಗೆ ಕೆಂಪು ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಏಳುತ್ತವೆ',
          'ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಬೊಕ್ಕೆಗಳು ಒಡೆದು ಗಾಳಿಯಲ್ಲಿ ಕೆಂಪು ಪುಡಿಯಂತಹ ಬೀಜಾಣುಗಳು ಹರಡುತ್ತವೆ',
          'ತುಕ್ಕು ಪೀಡಿತ ಮಲೆನಾಡು ಹಾಗೂ ಗುಡ್ಡಗಾಡು ಪ್ರದೇಶಗಳಲ್ಲಿ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की दोनों सतहों पर सुनहरे-भूरे रंग के चूर्ण भरे फफोले बन जाते हैं',
          'ठंडे मौसम में फफोले फटकर हवा में लाल-भूरे रंग का पाउडर छोड़ते हैं',
          'रतुआ प्रभावित क्षेत्रों में रोग प्रतिरोधी किस्मों की ही बुवाई करें'
        ],
        products: [
          { name: 'Wettable Sulphur 80 WP', type: 'chemical', brand: 'Sulfex / Thiovit', price: '₹180 – ₹260 / 1kg', query: 'Wettable Sulphur 80 WP' },
          { name: 'Propiconazole 25 EC', type: 'chemical', brand: 'Tilt / Bumper', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC' }
        ]
      },
      {
        disease: 'Post-flowering Stalk Rot (Macrophomina phaseolina)',
        diseaseKn: 'ಮೆಕ್ಕೆಜೋಳದ ಕಾಂಡ ಕೊಳೆ ರೋಗ',
        diseaseHi: 'मक्का तना सड़न रोग (पोस्ट-फ्लावरिंग स्टालक रॉट)',
        severity: 'High',
        remedy: 'Drench base with Carbendazim 50 WP @ 1 g/L or Thiram 75 WP @ 2 g/L. Avoid moisture stress during grain filling.',
        remedyKn: 'ಗಿಡದ ಬುಡಕ್ಕೆ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Thiram 75 WP @ 2 g/L ದ್ರಾವಣವನ್ನು ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ. ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ನೀರಾವರಿ ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        remedyHi: 'पौधों की जड़ पर Carbendazim 50 WP @ 1 g/L या Thiram 75 WP @ 2 g/L का घोल डालें। दाना भरते समय पानी की कमी न होने दें।',
        prevention: 'Avoid water deficit at flowering and grain-filling stages. Maintain optimum plant population (65,000/ha).',
        preventionKn: 'ಹೂವಾಡುವ ಮತ್ತು ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ನೀರಿನ ಕೊರತೆ ಉಂಟಾಗದಂತೆ ಸಕಾಲಕ್ಕೆ ನೀರು ಹಾಯಿಸಿ. ಹೆಕ್ಟೇರ್‌ಗೆ ಸೂಕ್ತ ಗಿಡಗಳ ಸಾಂದ್ರತೆ ಕಾಪಾಡಿ.',
        preventionHi: 'फूल आते और दाना बनते समय सिंचाई अवश्य करें। प्रति हेक्टेयर उचित पौध संख्या बनाए रखें।',
        organicTip: 'Seed treatment with Trichoderma viride @ 4 g/kg seed + soil application of Trichoderma @ 2 kg/acre in FYM.',
        organicTipKn: 'Trichoderma viride @ 4 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ನೀಡಿ.',
        organicTipHi: 'Trichoderma viride @ 4 g/kg से बीजोपचार करें और गोबर की खाद में मिलाकर खेत में डालें।',
        fertilizer: 'Apply Potash (MOP) @ 40 kg/ha to strengthen maize rind and vascular bundles.',
        fertilizerKn: 'ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಹೆಕ್ಟೇರ್‌ಗೆ 40 kg ಪೊಟ್ಯಾಶ್ (MOP) ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'मक्के के तने को मजबूत करने के लिए 40 kg/हेक्टेयर पोटाश (MOP) का प्रयोग करें।',
        scheme: 'Raitha Samparka Kendra Soil Health Program',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#7f1d1d',
        keyTakeaways: [
          'Lower internodes become soft, spongy, discolored and hollow, leading to premature lodging',
          'Moisture stress after flowering triggers charcoal rot and Fusarium stalk rots',
          'Never skip irrigation during tasseling and silking stages'
        ],
        keyTakeawaysKn: [
          'ಕೆಳಗಿನ ಗೆಣ್ಣುಗಳು ಮೆದುವಾಗಿ, ಪೊಳ್ಳಾಗಿ ಬಣ್ಣಗೆಟ್ಟು ಗಾಳಿಗೆ ಗಿಡಗಳು ಸುಲಭವಾಗಿ ಮುರಿದು ಬೀಳುತ್ತವೆ',
          'ಹೂವಾಡುವ ನಂತರ ನೀರಿನ ಕೊರತೆಯಾದರೆ ಈ ಕಾಂಡ ಕೊಳೆ ರೋಗ ತೀವ್ರಗೊಳ್ಳುತ್ತದೆ',
          'ತುರಾಯಿ ಮತ್ತು ಜೊಂಡಿ ಬರುವ ಹಂತದಲ್ಲಿ ನೀರು ಹಾಯಿಸುವುದನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ತಪ್ಪಿಸಬೇಡಿ'
        ],
        keyTakeawaysHi: [
          'निचली पोरियां अंदर से मुलायम, खोखली और बदरंग हो जाती हैं जिससे पौधे गिर जाते हैं',
          'फूल आने के बाद खेत सूखने से चारकोल रॉट और तना सड़न बहुत तेजी से फैलती है',
          'मूंछें और भुट्टा बनते समय खेत में सिंचाई कभी न छोड़ें'
        ],
        products: [
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' },
          { name: 'MOP Potash Fertilizer', type: 'fertilizer', brand: 'IFFCO MOP', price: '₹1,650 – ₹1,800 / 50kg', query: 'MOP Potash fertilizer 50kg' },
          { name: 'Trichoderma viride 1% WP', type: 'organic', brand: 'Bio-Fungicide', price: '₹160 – ₹230 / 1kg', query: 'Trichoderma viride 1kg' }
        ]
      }
    ]
  },

  // ── 4. WHEAT ──
  {
    crop: 'Wheat (ಗೋಧಿ)',
    cropKn: 'ಗೋಧಿ',
    cropHi: 'गेहूं',
    emoji: '🌾',
    diseases: [
      {
        disease: 'Yellow / Stripe Rust (Puccinia striiformis)',
        diseaseKn: 'ಗೋಧಿ ಹಳದಿ ಪಟ್ಟಿ ತುಕ್ಕು ರೋಗ',
        diseaseHi: 'गेहूं पीला रतुआ (स्ट्राइप रस्ट)',
        severity: 'High',
        remedy: 'Spray Propiconazole 25 EC (Tilt) @ 1 mL/L or Tebuconazole 25.9 EC @ 1 mL/L at the very first stripe appearance.',
        remedyKn: 'ಹಳದಿ ಪಟ್ಟಿಗಳು ಕಂಡ ತಕ್ಷಣ Propiconazole 25 EC (Tilt) @ 1 mL/L ಅಥವಾ Tebuconazole 25.9 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'पत्तियों पर पीली धारियां दिखते ही Propiconazole 25 EC (Tilt) @ 1 mL/L या Tebuconazole 25.9 EC @ 1 mL/L का छिड़काव करें।',
        prevention: 'Sow resistant varieties like DBW 187, HD 3086, PBW 550. Avoid late sowing after November.',
        preventionKn: 'DBW 187, HD 3086 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ. ನವೆಂಬರ್ ನಂತರ ತಡವಾಗಿ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ.',
        preventionHi: 'DBW 187, HD 3086 जैसी प्रतिरोधी किस्मों की बुवाई करें। नवंबर के बाद देर से बुवाई न करें।',
        organicTip: 'Foliar spray of fermented cow urine 10% + sour buttermilk spray @ 50 mL/L.',
        organicTipKn: '10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಮತ್ತು ಗೋಮೂತ್ರ ಮಿಶ್ರಣವನ್ನು ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '10% खट्टी छाछ और गोमूत्र का पत्तियों पर छिड़काव करें।',
        fertilizer: 'Balance NPK (120:60:40 kg/ha); avoid excess nitrogenous fertilization which promotes succulent growth.',
        fertilizerKn: 'ಸಮತೋಲಿತ NPK (120:60:40 kg/ha) ನೀಡಿ; ಅತಿಯಾದ ಯೂರಿಯಾ ಬಳಕೆ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತದೆ.',
        fertilizerHi: 'संतुलित NPK (120:60:40 kg/हेक्टेयर) डालें; अत्यधिक यूरिया से पौधे कोमल होते हैं और रतुआ बढ़ता है।',
        scheme: 'PMFBY Rabi Wheat Protection Scheme',
        schemeLink: 'https://pmfby.gov.in/',
        color: '#eab308',
        keyTakeaways: [
          'Yellow uredinial pustules arranged in distinct linear stripes along leaf veins',
          'Pustules leave yellow powder on clothes/fingers when touched',
          'Prompt single spray of triazole fungicide halts epidemic completely'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ನರಗಳ ಉದ್ದಕ್ಕೂ ಸಾಲಾಗಿ ಜೋಡಿಸಿದ ಹಳದಿ ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ಬೆರಳುಗಳಿಂದ ಮುಟ್ಟಿದಾಗ ಹಳದಿ ಬಣ್ಣದ ಪುಡಿ ಬೆರಳುಗಳಿಗೆ ಅಂಟಿಕೊಳ್ಳುತ್ತದೆ',
          'ಟ್ರಯಾಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕದ ಒಂದು ಸರಿಯಾದ ಸಿಂಪಡಣೆ ರೋಗ ಹರಡುವಿಕೆಯನ್ನು ಸಂಪೂರ್ಣ ತಡೆಯುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की नसों के समानांतर कतारों में पीले रंग के चूर्ण भरे फफोले बनते हैं',
          'हाथ लगाने पर उंगलियों और कपड़ों पर पीला पाउडर लग जाता है',
          'ट्राईजोल फफूंदनाशक का एक समयबद्ध छिड़काव इस महामारी को पूरी तरह रोक देता है'
        ],
        products: [
          { name: 'Propiconazole 25 EC (Tilt)', type: 'chemical', brand: 'Syngenta Tilt / Dhanuka Result', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC Tilt' },
          { name: 'Tebuconazole 25.9 EC', type: 'chemical', brand: 'Folicur (Bayer)', price: '₹480 – ₹690 / 250mL', query: 'Tebuconazole 25.9 EC Folicur' }
        ]
      },
      {
        disease: 'Brown / Leaf Rust (Puccinia triticina)',
        diseaseKn: 'ಗೋಧಿ ಕಂದು ಎಲೆ ತುಕ್ಕು ರೋಗ',
        diseaseHi: 'गेहूं भूरा रतुआ (पर्ण रतुआ)',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L upon noticing scattered brown pustules.',
        remedyKn: 'ಕಂದು ಬಣ್ಣದ ಬೊಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'पत्तियों पर भूरे फफोले दिखते ही Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।',
        prevention: 'Cultivate recommended regional rust-resistant genotypes. Timely sowing in early November.',
        preventionKn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಸ್ಥಳೀಯ ತುಕ್ಕು ನಿರೋಧಕ ತಳಿಗಳನ್ನು ನವೆಂಬರ್ ಆರಂಭದಲ್ಲೇ ಬಿತ್ತನೆ ಮಾಡಿ.',
        preventionHi: 'क्षेत्र के लिए अनुशंसित रतुआ रोधी किस्मों की नवंबर की शुरुआत में समय पर बुवाई करें।',
        organicTip: 'Foliar spray of 5% Neem oil emulsion early in the season.',
        organicTipKn: 'ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಎಣ್ಣೆಯ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'मौसम की शुरुआत में 5% नीम के तेल के घोल का छिड़काव करें।',
        fertilizer: 'Apply adequate Potash (MOP) to enhance foliar disease tolerance.',
        fertilizerKn: 'ಎಲೆಗಳ ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'पत्तियों की रोग सहनशीलता बढ़ाने के लिए पर्याप्त पोटाश डालें।',
        scheme: 'National Food Security Mission - Wheat',
        schemeLink: 'https://nfsm.gov.in/',
        color: '#9a3412',
        keyTakeaways: [
          'Small, round-to-oval orange-brown pustules scattered randomly across upper leaf blade',
          'Favored by warm humid days (20–25°C) and cool nights',
          'Unlike yellow rust, pustules are randomly scattered rather than in linear stripes'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಯಾದೃಚ್ಛಿಕವಾಗಿ ಹರಡಿದ ಸಣ್ಣ ದುಂಡಗಿನ ಕಿತ್ತಳೆ-ಕಂದು ಬಣ್ಣದ ಬೊಕ್ಕೆಗಳು ಕಾಣುತ್ತವೆ',
          'ಬೆಚ್ಚನೆಯ ತೇವಾಂಶದ ಹಗಲು (20–25°C) ಮತ್ತು ತಂಪಾದ ರಾತ್ರಿಗಳಲ್ಲಿ ವೇಗವಾಗಿ ಹೆಚ್ಚುತ್ತದೆ',
          'ಹಳದಿ ತುಕ್ಕಿನಂತೆ ಗೆರೆಗಳಾಗಿರದೆ, ಇಡೀ ಎಲೆಯ ಮೇಲೆ ಎಲ್ಲೆಂದರಲ್ಲಿ ಹರಡಿಕೊಂಡಿರುತ್ತವೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की ऊपरी सतह पर छोटे गोल नारंगी-भूरे फफोले बेतरतीब बिखरे होते हैं',
          'गर्म दिन (20–25°C) और ठंडी रातें इस बीमारी के फैलाव में सहायक होती हैं',
          'पीले रतुआ की तरह यह धारियों में न होकर पूरी पत्ती पर बिखरा रहता है'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Propiconazole 25 EC', type: 'chemical', brand: 'Tilt / Bumper', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC' }
        ]
      },
      {
        disease: 'Karnal Bunt (Tilletia indica)',
        diseaseKn: 'ಕರ್ನಾಲ್ ಬಂಟ್ ರೋಗ',
        diseaseHi: 'गेहूं करनाल बंट रोग',
        severity: 'High',
        remedy: 'Single spray of Propiconazole 25 EC @ 1 mL/L at ear emergence (50% boot leaf stage).',
        remedyKn: 'ಗೋಧಿ ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ (ಶೇ. 50 ಬೂಟ್ ಲೀಫ್ ಹಂತ) Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'बाली निकलने की अवस्था (50% बूट लीफ स्टेज) पर Propiconazole 25 EC @ 1 mL/L का एक स्प्रे करें।',
        prevention: 'Strict quarantine and seed certification. Avoid irrigation during anthesis / flowering.',
        preventionKn: 'ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ. ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ ಅತಿಯಾದ ನೀರಾವರಿ ಮಾಡಬೇಡಿ.',
        preventionHi: 'प्रमाणित रोगमुक्त बीज ही बोएं। फूल आने के समय अतिरिक्त सिंचाई से बचें।',
        organicTip: 'Seed treatment with bioagent Trichoderma viride @ 5 g/kg seed.',
        organicTipKn: 'Trichoderma viride @ 5 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಬಿತ್ತನೆ ಮಾಡಿ.',
        organicTipHi: 'Trichoderma viride @ 5 g/kg से बीजोपचार करके ही बुवाई करें।',
        fertilizer: 'Avoid heavy doses of nitrogenous fertilizers which extend flowering window.',
        fertilizerKn: 'ಹೂವಾಡುವ ಅವಧಿಯನ್ನು ವಿಸ್ತರಿಸುವ ಅತಿಯಾದ ಯೂರಿಯಾ ಗೊಬ್ಬರ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.',
        fertilizerHi: 'अत्यधिक यूरिया न डालें जिससे फूल आने की अवधि लंबी खिंचती है।',
        scheme: 'Wheat Quality Assurance and Export Quarantine Support',
        schemeLink: 'https://agricoop.nic.in/',
        color: '#1e293b',
        keyTakeaways: [
          'Grains partially converted into black powdery teliospore masses giving a rotten-fish odor',
          'Infection happens precisely at flowering by airborne secondary sporidia',
          'Severely degrades flour baking quality and export value'
        ],
        keyTakeawaysKn: [
          'ಗೋಧಿ ಕಾಳುಗಳು ಭಾಗಶಃ ಕಪ್ಪು ಪುಡಿಯಾಗಿ ಬದಲಾಗಿ ಕೊಳೆತ ಮೀನಿನ ವಾಸನೆ ಬೀರುತ್ತವೆ',
          'ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ ಗಾಳಿಯಲ್ಲಿ ಬರುವ ಶಿಲೀಂಧ್ರಾಣುಗಳಿಂದ ಸೋಂಕು ಉಂಟಾಗುತ್ತದೆ',
          'ಹಿಟ್ಟಿನ ಗುಣಮಟ್ಟವನ್ನು ಹಾಳುಮಾಡಿ ರಫ್ತು ಮೌಲ್ಯವನ್ನು ಕುಗ್ಗಿಸುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'गेहूं के दाने आंशिक रूप से काले चूर्ण में बदल जाते हैं और सड़ी मछली जैसी दुर्गंध आती है',
          'फूल आने के समय हवा के द्वारा इस फफूंद का संक्रमण होता है',
          'आटे की गुणवत्ता खराब होती है और बाजार में इसका भाव गिर जाता है'
        ],
        products: [
          { name: 'Propiconazole 25 EC', type: 'chemical', brand: 'Tilt / Result', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC Tilt' },
          { name: 'Trichoderma viride 1% WP', type: 'organic', brand: 'Bio-Fungicide', price: '₹160 – ₹230 / 1kg', query: 'Trichoderma viride 1kg' }
        ]
      },
      {
        disease: 'Loose Smut (Ustilago tritici)',
        diseaseKn: 'ಗೋಧಿ ತೆನೆ ಮಸಿ ರೋಗ (ಲೂಸ್ ಸ್ಮಟ್)',
        diseaseHi: 'गेहूं अनावृत कंडुआ (लूज स्मट)',
        severity: 'Medium',
        remedy: 'Compulsory seed treatment with Carboxin 37.5% + Thiram 37.5% (Vitavax Power) @ 2.5 g/kg or Tebuconazole 2 DS @ 1.5 g/kg seed.',
        remedyKn: 'ಬಿತ್ತನೆ ಮುನ್ನ Vitavax Power (Carboxin + Thiram) @ 2.5 g/kg ಅಥವಾ Tebuconazole 2 DS @ 1.5 g/kg ನೊಂದಿಗೆ ಕಡ್ಡಾಯ ಬೀಜೋಪಚಾರ ಮಾಡಿ.',
        remedyHi: 'बुवाई से पहले Vitavax Power (Carboxin + Thiram) @ 2.5 g/kg या Tebuconazole 2 DS @ 1.5 g/kg से अनिवार्य बीजोपचार करें।',
        prevention: 'Solar heat treatment: Soak seed in water for 4–5 hours in May-June, then dry under blazing sun for 4 hours.',
        preventionKn: 'ಸೌರ ಶಾಖೋಪಚಾರ: ಮೇ-ಜೂನ್ ಬಿಸಿಲಿನಲ್ಲಿ ಬೀಜಗಳನ್ನು 4-5 ಗಂಟೆ ನೀರಿನಲ್ಲಿ ನೆನೆಸಿ, ನಂತರ ತೀವ್ರ ಬಿಸಿಲಿನಲ್ಲಿ 4 ಗಂಟೆ ಒಣಗಿಸಿ.',
        preventionHi: 'सोलर हीट ट्रीटमेंट: मई-जून में बीजों को 4 घंटे पानी में भिगोकर तेज धूप में 4 घंटे सुखाएं।',
        organicTip: 'Hot water seed treatment at 52°C for exactly 10 minutes to kill internal dormant mycelium.',
        organicTipKn: 'ಬೀಜದೊಳಗಿನ ಶಿಲೀಂಧ್ರ ಕೊಲ್ಲಲು 52°C ಬಿಸಿ ನೀರಿನಲ್ಲಿ ನಿಖರವಾಗಿ 10 ನಿಮಿಷಗಳ ಕಾಲ ಬೀಜಗಳನ್ನು ಮುಳುಗಿಸಿ.',
        organicTipHi: 'अंदर छिपी फफूंद को खत्म करने के लिए बीजों को 52°C गर्म पानी में ठीक 10 मिनट रखें।',
        fertilizer: 'Apply balanced basal nutrition to ensure uniform flowering and tiller development.',
        fertilizerKn: 'ಏಕಕಾಲಕ್ಕೆ ತೆನೆಗಳು ಹೊರಬರಲು ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'समान बालियां निकलने के लिए संतुलित आधार खाद दें।',
        scheme: 'Seed Village Programme (Subsidized Certified Wheat Seeds)',
        schemeLink: 'https://seednet.gov.in/',
        color: '#334155',
        keyTakeaways: [
          'Entire spike converted into a black powdery mass of spores leaving only naked rachis behind',
          'Internally seed-borne disease that cannot be cured by foliar sprays after emergence',
          'Seed treatment before sowing is 100% effective and mandatory'
        ],
        keyTakeawaysKn: [
          'ಇಡೀ ಗೋಧಿ ತೆನೆಯು ಕಪ್ಪು ಮಸಿ ಪುಡಿಯಾಗಿ ಬದಲಾಗಿ ಕೇವಲ ಬರಿಯ ಕಡ್ಡಿ ಮಾತ್ರ ಉಳಿಯುತ್ತದೆ',
          'ಇದು ಬೀಜದೊಳಗೇ ಸುಪ್ತವಾಗಿರುವ ರೋಗವಾಗಿದ್ದು, ತೆನೆ ಬಂದ ಮೇಲೆ ಸಿಂಪಡಣೆ ಮಾಡಿದರೆ ಪ್ರಯೋಜನವಿಲ್ಲ',
          'ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಮಾಡುವ ಬೀಜೋಪಚಾರವು ಶೇ. 100ರಷ್ಟು ಪರಿಣಾಮಕಾರಿ'
        ],
        keyTakeawaysHi: [
          'पूरी बाली काले चूर्ण में बदल जाती है और केवल नंगी डंडी ही बची रह जाती है',
          'यह आंतरिक रूप से बीज जनित रोग है, बाली निकलने के बाद स्प्रे से ठीक नहीं होता',
          'बुवाई से पहले बीजोपचार ही इसका एकमात्र और 100% अचूक उपाय है'
        ],
        products: [
          { name: 'Carboxin + Thiram (Vitavax Power)', type: 'chemical', brand: 'Vitavax Power (Dhanuka)', price: '₹420 – ₹580 / 500g', query: 'Carboxin Thiram Vitavax Power' },
          { name: 'Tebuconazole 2 DS', type: 'chemical', brand: 'Raxil (Bayer)', price: '₹220 – ₹340 / 100g', query: 'Tebuconazole 2 DS Raxil' }
        ]
      },
      {
        disease: 'Powdery Mildew (Blumeria graminis f.sp. tritici)',
        diseaseKn: 'ಗೋಧಿ ಬೂದಿ ರೋಗ',
        diseaseHi: 'गेहूं चूर्णिल आसिता (पाउडरी मिल्ड्यू)',
        severity: 'Low',
        remedy: 'Spray Wettable Sulphur 80 WP @ 3 g/L or Propiconazole 25 EC @ 1 mL/L upon noticing white powdery patches.',
        remedyKn: 'ಬಿಳಿ ಬೂಷ್ಟು ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'सफेद पाउडर जैसे धब्बे दिखते ही Wettable Sulphur 80 WP @ 3 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।',
        prevention: 'Avoid excessive seed rate and overly dense crop stand. Ensure proper sunlight penetration.',
        preventionKn: 'ಅತಿಯಾದ ಬೀಜ ಪ್ರಮಾಣ ಮತ್ತು ದಟ್ಟ ಬಿತ್ತನೆಯನ್ನು ತಪ್ಪಿಸಿ. ಸೂರ್ಯನ ಬೆಳಕು ಸರಾಗವಾಗಿ ಬೀಳುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        preventionHi: 'घनी बुवाई से बचें। पौधों तक पर्याप्त धूप पहुंचने की व्यवस्था रखें।',
        organicTip: 'Foliar spray of 10% cow milk or baking soda (Sodium Bicarbonate @ 3 g/L).',
        organicTipKn: '10% ಹಸುವಿನ ಹಾಲು ಅಥವಾ ಅಡುಗೆ ಸೋಡಾ (Sodium Bicarbonate @ 3 g/L) ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '10% गाय के दूध या बेकिंग सोडा (3 g/L) का पत्तियों पर छिड़काव करें।',
        fertilizer: 'Avoid excess nitrogen which leads to rank growth and high canopy humidity.',
        fertilizerKn: 'ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ, ಇದು ಎಲೆಗಳನ್ನು ದಟ್ಟವಾಗಿಸಿ ರೋಗ ಹರಡಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ.',
        fertilizerHi: 'अत्यधिक नाइट्रोजन न दें जिससे पत्ते ज्यादा घने होकर फफूंद को बढ़ावा देते हैं।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#64748b',
        keyTakeaways: [
          'White fluffy talcum-powder like fungal patches covering upper leaf surfaces and stems',
          'Later turns grayish with tiny black cleistothecia embedded inside',
          'Favored by cool, dry, cloudy conditions with high relative humidity'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡದ ಮೇಲೆ ಬಿಳಿ ಟಾಲ್ಕಮ್ ಪೌಡರ್‌ನಂತಹ ಬೂಷ್ಟು ಕಲೆಗಳು ಆವರಿಸುತ್ತವೆ',
          'ನಂತರ ಕಲೆಯು ಬೂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಸಣ್ಣ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ಮೋಡ ಕವಿದ ಮತ್ತು ತೇವಾಂಶಭರಿತ ವಾತಾವರಣದಲ್ಲಿ ರೋಗವು ಉಲ್ಬಣಗೊಳ್ಳುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों और तनों पर सफेद पाउडर जैसे रुई के धब्बे जम जाते हैं',
          'बाद में यह धब्बे भूरे हो जाते हैं और इनमें छोटे काले दाने दिखाई देते हैं',
          'बादल वाले और ठंडे मौसम में उच्च आर्द्रता के कारण यह तेजी से फैलता है'
        ],
        products: [
          { name: 'Wettable Sulphur 80 WP', type: 'chemical', brand: 'Sulfex / Thiovit', price: '₹180 – ₹260 / 1kg', query: 'Wettable Sulphur 80 WP' },
          { name: 'Propiconazole 25 EC', type: 'chemical', brand: 'Tilt', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC' }
        ]
      }
    ]
  },

  // ── 5. JOWAR / SORGHUM ──
  {
    crop: 'Jowar / Sorghum (ಜೋಳ)',
    cropKn: 'ಜೋಳ',
    cropHi: 'ज्वार (सोरघम)',
    emoji: '🌾',
    diseases: [
      {
        disease: 'Grain Mold (Curvularia lunata)',
        diseaseKn: 'ಜೋಳದ ಕಾಳು ಬೂಷ್ಟು ರೋಗ',
        diseaseHi: 'ज्वार दाना फफूंद रोग (ग्रेन मोल्ड)',
        severity: 'High',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L at 50% flowering and repeat 10 days later.',
        remedyKn: 'ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ, 10 ದಿನಗಳ ನಂತರ ಪುನರಾವರ್ತಿಸಿ.',
        remedyHi: '50% फूल आने पर Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें और 10 दिन बाद दोहराएं।',
        prevention: 'Adjust sowing dates so that grain maturation does not coincide with heavy monsoon rains. Harvest immediately at physiological maturity.',
        preventionKn: 'ಕಾಳು ಬಲಿಯುವ ಸಮಯದಲ್ಲಿ ಭಾರಿ ಮಳೆ ಬೀಳದಂತೆ ಬಿತ್ತನೆ ಸಮಯವನ್ನು ಸರಿಹೊಂದಿಸಿ. ತೆನೆ ಮಾಗಿದ ತಕ್ಷಣ ಕಟಾವು ಮಾಡಿ.',
        preventionHi: 'बुवाई का समय ऐसा रखें कि दाना पकते समय भारी बारिश न हो। पकते ही तुरंत कटाई करें।',
        organicTip: 'Foliar spray of Pseudomonas fluorescens @ 2 g/L during anthesis.',
        organicTipKn: 'ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ Pseudomonas fluorescens @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'फूल आते समय Pseudomonas fluorescens @ 2 g/L का छिड़काव करें।',
        fertilizer: 'Apply adequate Potassium and Phosphorus to produce hard, dense grains resistant to fungal penetration.',
        fertilizerKn: 'ಕಾಳುಗಳು ಗಟ್ಟಿಯಾಗಿ ಬೆಳೆಯಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ ಮತ್ತು ರಂಜಕ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'दानों को कठोर और चमकदार बनाने के लिए पर्याप्त पोटाश और फास्फोरस दें।',
        scheme: 'Karnataka Raitha Siri Coarse Millets Scheme',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Pink, black or white discoloration and superficial fungal crusting on grains inside earhead',
          'Causes severe reduction in seed germination, grain hardness, and market value',
          'Grow mold-tolerant varieties like CSV 15 or CSV 20'
        ],
        keyTakeawaysKn: [
          'ತೆನೆಯೊಳಗಿನ ಕಾಳುಗಳ ಮೇಲೆ ಗುಲಾಬಿ, ಕಪ್ಪು ಅಥವಾ ಬಿಳಿ ಬೂಷ್ಟು ಆವರಿಸಿ ಕಾಳು ಬಣ್ಣಗೆಡುತ್ತದೆ',
          'ಬೀಜದ ಮೊಳಕೆ ಸಾಮರ್ಥ್ಯ, ಕಾಳಿನ ಗಟ್ಟಿತನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಧಾರಣೆಯನ್ನು ತೀವ್ರವಾಗಿ ಕುಗ್ಗಿಸುತ್ತದೆ',
          'CSV 15 ಅಥವಾ CSV 20 ರಂತಹ ಬೂಷ್ಟು ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ'
        ],
        keyTakeawaysHi: [
          'बालियों के दानों पर गुलाबी, काली या सफेद फफूंद जम जाती है जिससे दाना बदरंग हो जाता है',
          'बीज के अंकुरण, दाने के वजन और बाजार भाव में भारी गिरावट आती है',
          'CSV 15 या CSV 20 जैसी फफूंद सहनशील किस्मों की खेती करें'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' }
        ]
      },
      {
        disease: 'Anthracnose & Red Rot (Colletotrichum sublineolum)',
        diseaseKn: 'ಜೋಳದ ಆಂಥ್ರಾಕ್ನೋಸ್ & ಕೆಂಪು ಕೊಳೆ ರೋಗ',
        diseaseHi: 'ज्वार एन्थ्रेक्नोज एवं लाल सड़न रोग',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L when foliar spots first appear.',
        remedyKn: 'ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'पत्तियों पर धब्बे दिखते ही Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।',
        prevention: 'Seed treatment with Thiram @ 3 g/kg. Burn crop stubble after harvest to eradicate inoculum.',
        preventionKn: 'Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಕಟಾವಿನ ನಂತರ ಗೂಟಗಳನ್ನು ಸುಟ್ಟುಹಾಕಿ.',
        preventionHi: 'Thiram @ 3 g/kg से बीजोपचार करें। कटाई के बाद ठूंठों को नष्ट करें।',
        organicTip: 'Spray Trichoderma viride @ 5 g/L + Panchagavya 3% at boot leaf stage.',
        organicTipKn: 'ಬೂಟ್ ಲೀಫ್ ಹಂತದಲ್ಲಿ Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 3% ಪಂಚಗವ್ಯ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'बूट लीफ स्टेज पर Trichoderma viride @ 5 g/L और 3% पंचगव्य का छिड़काव करें।',
        fertilizer: 'Apply balanced NPK (80:40:40 kg/ha); avoid excess nitrogen which aggravates leaf lesions.',
        fertilizerKn: 'ಸಮತೋಲಿತ NPK (80:40:40 kg/ha) ನೀಡಿ; ಅತಿಯಾದ ಯೂರಿಯಾ ರೋಗವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
        fertilizerHi: 'संतुलित NPK (80:40:40 kg/हेक्टेयर) दें; अत्यधिक यूरिया से रोग बढ़ता है।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#b91c1c',
        keyTakeaways: [
          'Circular to elliptical red/purple leaf spots with straw-colored centers containing black fruiting dots',
          'Internal stalk discoloration turns pith into a bright red or brownish-red color',
          'Practice crop rotation with non-host legume crops'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಮೇಲೆ ಮಧ್ಯದಲ್ಲಿ ಒಣಗಿದ ಬೂದು ಮತ್ತು ಅಂಚಿನಲ್ಲಿ ಕೆಂಪು/ನೇರಳೆ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ಕಾಂಡದ ಒಳಗಿನ ತಿರುಳು ಗಾಢ ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಒಣಗುತ್ತದೆ',
          'ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियों पर लाल-बैंगनी किनारे और बीच में सूखे भूरे धब्बे बनते हैं',
          'तने का भीतरी भाग गहरा लाल होकर सड़ने लगता है',
          'दलहनी फसलों के साथ नियमित फसल चक्र अपनाएं'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Dithane M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Thiram 75 WP', type: 'chemical', brand: 'Thiride', price: '₹210 – ₹320 / 500g', query: 'Thiram 75 WP' }
        ]
      },
      {
        disease: 'Sorghum Downy Mildew (Peronosclerospora sorghi)',
        diseaseKn: 'ಜೋಳದ ಬೂದಿ ರೋಗ (ಡೌನಿ ಮಿಲ್ಡ್ಯೂ)',
        diseaseHi: 'ज्वार डाउनी मिल्ड्यू (मृदुरोमिल आसिता)',
        severity: 'High',
        remedy: 'Seed treatment with Metalaxyl 35 WS @ 4 g/kg seed + foliar spray of Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at 20 days after emergence.',
        remedyKn: 'Metalaxyl 35 WS @ 4 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಮೊಳಕೆಯೊಡೆದ 20 ದಿನಗಳಲ್ಲಿ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'Metalaxyl 35 WS @ 4 g/kg से बीजोपचार करें एवं उगने के 20 दिन बाद Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L का छिड़काव करें।',
        prevention: 'Rogue out chlorotic and downy-mildewed seedlings within 30 days of sowing. Deep summer ploughing.',
        preventionKn: 'ಬಿತ್ತನೆಯ 30 ದಿನಗಳೊಳಗೆ ಹಳದಿಯಾದ ರೋಗಪೀಡಿತ ಸಸಿಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ.',
        preventionHi: 'बुवाई के 30 दिनों के भीतर पीले संक्रमित पौधों को उखाड़कर नष्ट करें। गर्मियों में गहरी जुताई करें।',
        organicTip: 'Seed coating with Pseudomonas fluorescens @ 10 g/kg seed.',
        organicTipKn: 'Pseudomonas fluorescens @ 10 g/kg ನೊಂದಿಗೆ ಬೀಜ ಲೇಪನ ಮಾಡಿ.',
        organicTipHi: 'Pseudomonas fluorescens @ 10 g/kg से बीज उपचारित करें।',
        fertilizer: 'Apply balanced basal nutrition; avoid water stagnation in early stages.',
        fertilizerKn: 'ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'शुरुआत में जलभराव न होने दें और संतुलित खाद दें।',
        scheme: 'National Mission on Oilseeds and Oil Palm / Coarse Grains',
        schemeLink: 'https://nmoop.gov.in/',
        color: '#15803d',
        keyTakeaways: [
          'Vivid pale-yellow striping on leaves followed by white downy growth on lower surface in morning',
          'Later leaves shred into ribbons ("leaf shredding") releasing millions of resting oospores',
          'Seed dressing with systemic Metalaxyl provides foolproof early protection'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಮೇಲೆ ಎದ್ದು ಕಾಣುವ ಹಳದಿ ಪಟ್ಟಿಗಳು ಮತ್ತು ಮುಂಜಾನೆ ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಕಾಣಿಸುತ್ತದೆ',
          'ನಂತರ ಎಲೆಗಳು ಉದ್ದುದ್ದಕ್ಕೆ ನಾರಿನಂತೆ ಸೀಳಿ ಹೋಗುತ್ತವೆ (ಲೀಫ್ ಶ್ರೆಡ್ಡಿಂಗ್)',
          'ಸಿಸ್ಟಮಿಕ್ ಮೆಟಲಾಕ್ಸಿಲ್ ಬೀಜೋಪಚಾರವು ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ರೋಗ ಬರದಂತೆ ಶೇ. 100ರಷ್ಟು ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों पर स्पष्ट पीली धारियां बनती हैं और सुबह निचली सतह पर सफेद फफूंद दिखती है',
          'बाद में पत्तियां धागों की तरह फटकर चीर-चीर हो जाती हैं',
          'मेटालेक्सिल से बीजोपचार करने से शुरुआती अवस्था में पूरी सुरक्षा मिलती है'
        ],
        products: [
          { name: 'Metalaxyl 35 WS', type: 'chemical', brand: 'Apron 35 SD (Syngenta)', price: '₹380 – ₹520 / 100g', query: 'Metalaxyl 35 WS' },
          { name: 'Metalaxyl 8% + Mancozeb 64% WP', type: 'chemical', brand: 'Ridomil Gold', price: '₹480 – ₹680 / 500g', query: 'Metalaxyl Mancozeb 72 WP' }
        ]
      },
      {
        disease: 'Sorghum Shoot Fly (Atherigona soccata)',
        diseaseKn: 'ಜೋಳದ ಸುಳಿ ನೊಣ',
        diseaseHi: 'ज्वार प्ररोह मक्खी (शूट फ्लाई)',
        severity: 'High',
        remedy: 'Seed treatment with Imidacloprid 70 WS @ 5 g/kg seed or Thiamethoxam 30 FS @ 10 mL/kg seed. Spray Chlorpyrifos 20 EC @ 2 mL/L at 7–10 days after germination.',
        remedyKn: 'Imidacloprid 70 WS @ 5 g/kg ಅಥವಾ Thiamethoxam 30 FS @ 10 mL/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಮೊಳಕೆಯೊಡೆದ 7–10 ದಿನಗಳಲ್ಲಿ Chlorpyrifos 20 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'Imidacloprid 70 WS @ 5 g/kg या Thiamethoxam 30 FS @ 10 mL/kg से बीजोपचार करें। उगने के 7-10 दिन बाद Chlorpyrifos 20 EC @ 2 mL/L का छिड़काव करें।',
        prevention: 'Early and synchronous sowing immediately after onset of monsoon. Increase seed rate by 20% to rogue dead hearts.',
        preventionKn: 'ಮುಂಗಾರು ಮಳೆ ಆರಂಭವಾದ ತಕ್ಷಣ ಎಲ್ಲರೂ ಒಟ್ಟಾಗಿ ಬೇಗನೆ ಬಿತ್ತನೆ ಮಾಡಿ. ರೋಗಪೀಡಿತ ಒಣಗಿದ ಸುಳಿಗಳನ್ನು ಕಿತ್ತುಹಾಕಲು ಶೇ. 20ರಷ್ಟು ಹೆಚ್ಚಿನ ಬೀಜ ಬಳಸಿ.',
        preventionHi: 'मानसून आते ही तुरंत और एक साथ बुवाई करें। 20% अधिक बीज दर रखें ताकि सूखे पौधों को उखाड़ा जा सके।',
        organicTip: 'Install fish meal traps @ 12/acre to attract and destroy adult shoot flies.',
        organicTipKn: 'ವಯಸ್ಕ ಸುಳಿ ನೊಣಗಳನ್ನು ಆಕರ್ಷಿಸಿ ಕೊಲ್ಲಲು ಎಕರೆಗೆ 12 ಒಣಮೀನಿನ ಬಲೆಗಳನ್ನು (ಫಿಶ್ ಮೀಲ್ ಟ್ರ್ಯಾಪ್) ಅಳವಡಿಸಿ.',
        organicTipHi: 'वयस्क मक्खियों को आकर्षित कर नष्ट करने के लिए 12 फिश मील ट्रैप प्रति एकड़ लगाएं।',
        fertilizer: 'Apply basal fertilizer with P and K to accelerate early seedling vigor and escape fly window.',
        fertilizerKn: 'ಸಸಿಗಳು ಬೇಗನೆ ಬೆಳೆದು ಗಟ್ಟಿಯಾಗಲು ಬಿತ್ತನೆ ವೇಳೆ ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'शुरुआती बढ़त तेज करने के लिए बुवाई पर फास्फोरस और पोटाश खाद अवश्य दें।',
        scheme: 'Raitha Sanjeevini Pest Management Support',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#d97706',
        keyTakeaways: [
          'Causes rotting and wilting of central growing shoot producing "dead heart" within 3–4 weeks of germination',
          'Dead heart emits a pungent rotting odor when pulled out',
          'Attacks only young seedlings up to 30 days old; seed treatment is the key defense'
        ],
        keyTakeawaysKn: [
          'ಮೊಳಕೆಯೊಡೆದ 3-4 ವಾರಗಳಲ್ಲಿ ನಡುಸುಳಿಯು ಕೊಳೆತು ಒಣಗಿ "ಡೆಡ್ ಹಾರ್ಟ್" ಉಂಟಾಗುತ್ತದೆ',
          'ಒಣಗಿದ ಸುಳಿಯನ್ನು ಎಳೆದಾಗ ದುರ್ವಾಸನೆ ಬರುತ್ತದೆ',
          '30 ದಿನಗಳೊಳಗಿನ ಎಳೆ ಸಸಿಗಳಿಗೆ ಮಾತ್ರ ಕಾಡುವ ಕೀಟ; ಬೀಜೋಪಚಾರವೇ ಇದಕ್ಕೆ ಮುಖ್ಯ ರಕ್ಷಣೆ'
        ],
        keyTakeawaysHi: [
          'उगने के 3-4 हफ्तों में बीच की मुख्य कली सड़कर सूख जाती है जिसे "डेड हार्ट" कहते हैं',
          'सूखे तने को खींचने पर सड़ी हुई दुर्गंध आती है',
          'यह केवल 30 दिन तक के छोटे पौधों पर हमला करती है; बीजोपचार ही सबसे पक्का बचाव है'
        ],
        products: [
          { name: 'Thiamethoxam 30 FS', type: 'chemical', brand: 'Cruiser (Syngenta)', price: '₹420 – ₹580 / 100mL', query: 'Thiamethoxam 30 FS' },
          { name: 'Chlorpyrifos 20 EC', type: 'chemical', brand: 'Dursban / Classic', price: '₹260 – ₹380 / 1L', query: 'Chlorpyrifos 20 EC' }
        ]
      },
      {
        disease: 'Ergot / Sugary Disease (Sphacelia sorghi)',
        diseaseKn: 'ಜೋಳದ ಸಿಹಿ ಅಂಟು ರೋಗ (ಎರ್ಗಾಟ್)',
        diseaseHi: 'ज्वार चेपा रोग (अर्गट / शुगरी डिजीज)',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Ziram 80 WP @ 2 g/L at time of 50% flowering before honeydew secretion.',
        remedyKn: 'ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಅಂಟು ಸ್ರವಿಸುವ ಮುನ್ನ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Ziram 80 WP @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: '50% फूल आने पर चिपचिपा रस निकलने से पहले Mancozeb 75 WP @ 2.5 g/L या Ziram 80 WP @ 2 g/L का छिड़काव करें।',
        prevention: 'Soak seeds in 2% common salt solution (brine); sclerotia will float and can be skimmed off and discarded.',
        preventionKn: 'ಉಪ್ಪುನೀರಿನ (ಶೇ. 2 ಉಪ್ಪು) ದ್ರಾವಣದಲ್ಲಿ ಬೀಜಗಳನ್ನು ಮುಳುಗಿಸಿ; ತೇಲುವ ರೋಗಪೀಡಿತ ಬೀಜಗಳನ್ನು ಹೊರತೆಗೆದು ನಾಶಮಾಡಿ.',
        preventionHi: 'बीजों को 2% नमक के पानी में डालें; ऊपर तैरने वाले फफूंद के दानों को छानकर फेंक दें।',
        organicTip: 'Foliar spray of 5% neem seed kernel extract (NSKE) at panicle emergence.',
        organicTipKn: 'ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'बाली निकलते समय 5% नीम के अर्क का छिड़काव करें।',
        fertilizer: 'Avoid imbalanced fertilization that prolongs flowering during overcast weather.',
        fertilizerKn: 'ಮೋಡ ಕವಿದ ವಾತಾವರಣದಲ್ಲಿ ಹೂವಾಡುವ ಅವಧಿ ದೀರ್ಘವಾಗದಂತೆ ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'फूल आने की अवधि लंबी न हो, इसके लिए संतुलित खाद का ही प्रयोग करें।',
        scheme: 'Raitha Samparka Kendra Extension Support',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#ca8a04',
        keyTakeaways: [
          'Droplets of sweet pink-to-amber sticky honeydew ooze out of spikelets attracting flies',
          'Later hard, dark horn-like sclerotia develop in place of grains',
          'Grains contaminated with ergot sclerotia are toxic to humans and cattle'
        ],
        keyTakeawaysKn: [
          'ತೆನೆಯ ಹೂವುಗಳಿಂದ ಗುಲಾಬಿ-ಜೇನಿನಂತಹ ಸಿಹಿ ಜಿಗುಟಾದ ದ್ರವ ತೊಟ್ಟಿಕ್ಕಿ ನೊಣಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ',
          'ನಂತರ ಕಾಳುಗಳ ಜಾಗದಲ್ಲಿ ಕೊಂಬಿನಂತಹ ಗಟ್ಟಿಯಾದ ಕಪ್ಪು ಶಿಲೀಂಧ್ರ ಉಂಡೆಗಳು (ಸ್ಕ್ಲಿರೋಶಿಯಾ) ಬೆಳೆಯುತ್ತವೆ',
          'ಈ ರೋಗಪೀಡಿತ ಕಾಳುಗಳು ಮನುಷ್ಯರಿಗೆ ಮತ್ತು ಜಾನುವಾರುಗಳಿಗೆ ವಿಷಕಾರಿಯಾಗಿವೆ'
        ],
        keyTakeawaysHi: [
          'बालियों से मीठा, चिपचिपा, शहद जैसा गाढ़ा रस टपकता है जिस पर मक्खियां भिनभिनाती हैं',
          'बाद में दानों की जगह सींग जैसी कठोर काली गांठें बन जाती हैं',
          'इस बीमारी से प्रभावित दाने इंसानों और मवेशियों दोनों के लिए जहरीले होते हैं'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Ziram 80 WP', type: 'chemical', brand: 'Cuman L / Dhanuka', price: '₹280 – ₹410 / 500g', query: 'Ziram 80 WP' }
        ]
      }
    ]
  }
];
