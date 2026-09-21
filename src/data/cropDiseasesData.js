// ─────────────────────────────────────────────────────────────────
// COMPREHENSIVE KARNATAKA CROP DISEASE DATABASE (TRILINGUAL + PRODUCT LINKS)
// 24 Major Crops × 5 Major Diseases Each = 120 Total Diseases
// Languages: English (en), Kannada (kn), Hindi (hi)
// In kn/hi: Native sentences, with chemical formulations & numbers in English.
// Products: Direct IndiaMART search links with estimated price (₹).
// ─────────────────────────────────────────────────────────────────

export function getAgriProductLink(query) {
  return `https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(query)}`;
}

export const CROP_DISEASES = [
  {
    "crop": "Paddy / Rice (ಭತ್ತ)",
    "cropKn": "ಭತ್ತ",
    "cropHi": "धान (चावल)",
    "emoji": "🌾",
    "disease": "Blast Disease (Pyricularia oryzae)",
    "diseaseKn": "ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    "diseaseHi": "ब्लास्ट रोग (झोंका रोग)",
    "severity": "High",
    "remedy": "Spray Tricyclazole 75 WP @ 0.6 g/L or Carbendazim 50 WP @ 1 g/L at tillering stage. Avoid excess nitrogen.",
    "remedyKn": "ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ Tricyclazole 75 WP @ 0.6 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅನ್ನು ಸಿಂಪಡಿಸಿ. ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.",
    "remedyHi": "कल्ले फूटने की अवस्था में Tricyclazole 75 WP @ 0.6 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें। अत्यधिक नाइट्रोजन से बचें।",
    "prevention": "Maintain proper water level (2-5 cm). Burn or bury infected crop straw after harvest.",
    "preventionKn": "ಗದ್ದೆಯಲ್ಲಿ 2-5 cm ನೀರಿನ ಮಟ್ಟವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಿ. ಕಟಾವಿನ ನಂತರ ರೋಗಪೀಡಿತ ಹುಲ್ಲು ಮತ್ತು ಕಳೆಗಳನ್ನು ಸುಟ್ಟು ಅಥವಾ ಮಣ್ಣಿನಲ್ಲಿ ಹೂತುಹಾಕಿ.",
    "preventionHi": "खेत में 2-5 cm पानी का स्तर बनाए रखें। कटाई के बाद संक्रमित पुआल को जलाएं या मिट्टी में दबा दें।",
    "organicTip": "Spray Pseudomonas fluorescens @ 2.5 kg/ha as foliar spray early morning.",
    "organicTipKn": "ಬೆಳಗಿನ ಜಾವ 2.5 kg/ha ನಂತೆ Pseudomonas fluorescens ಅನ್ನು ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "सुबह के समय Pseudomonas fluorescens @ 2.5 kg/ha का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply 120:60:60 kg NPK/ha in split doses. Avoid excess N during cloudy weather.",
    "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 120:60:60 kg NPK ಗೊಬ್ಬರವನ್ನು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ. ಮೋಡ ಕವಿದ ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ (N) ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 120:60:60 kg NPK उर्वरक विभाजित मात्रा में दें। बादल वाले मौसम में अधिक नाइट्रोजन (N) से बचें।",
    "scheme": "PMFBY Pradhan Mantri Fasal Bima Yojana",
    "schemeLink": "https://pmfby.gov.in/",
    "color": "#f59e0b",
    "keyTakeaways": [
      "Affects leaves, neck, and panicles causing spindle-shaped lesions",
      "High humidity (>90%) and cool night temperatures trigger severe outbreaks",
      "Use resistant cultivars like BPT 5204, IR-64 or KMP-101"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ಕುತ್ತಿಗೆ ಮತ್ತು ತೆನೆಯ ಮೇಲೆ ಕದಿರಿನ ಆಕಾರದ ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಶೇ. 90ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ತಂಪಾದ ರಾತ್ರಿಗಳು ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ",
      "BPT 5204 ಅಥವಾ KMP 101 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों, तने और बालियों पर नाव के आकार के धब्बे बनते हैं",
      "90% से अधिक आर्द्रता और ठंडी रातें इस बीमारी को तेजी से फैलाती हैं",
      "BPT 5204 या KMP 101 जैसी रोग प्रतिरोधी किस्मों की बुवाई करें"
    ],
    "products": [
      {
        "name": "Tricyclazole 75 WP",
        "type": "chemical",
        "brand": "Beam / Baan / Dhanuka",
        "price": "₹450 – ₹650 / 250g",
        "query": "Tricyclazole 75 WP"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin / Dhanustin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Pseudomonas fluorescens",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹180 – ₹240 / 1kg",
        "query": "Pseudomonas fluorescens 1kg"
      },
      {
        "name": "NPK 120:60:60 (DAP + MOP + Urea)",
        "type": "fertilizer",
        "brand": "IFFCO / KRIBHCO",
        "price": "₹1,350 / 50kg DAP, ₹267 / 45kg Urea",
        "query": "DAP fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Paddy / Rice (ಭತ್ತ)",
    "cropKn": "ಭತ್ತ",
    "cropHi": "धान (चावल)",
    "emoji": "🌾",
    "disease": "Brown Plant Hopper (Nilaparvata lugens)",
    "diseaseKn": "ಕಂದು ಎಲೆ ಜಿಗಿಹುಳು (BPH)",
    "diseaseHi": "भूरा पौधा फुदका (BPH)",
    "severity": "High",
    "remedy": "Apply Imidacloprid 17.8 SL @ 0.5 mL/L or Buprofezin 25 SC @ 1.25 mL/L directed to base. Drain water for 3–4 days.",
    "remedyKn": "ಕಾಂಡದ ಬುಡಕ್ಕೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Buprofezin 25 SC @ 1.25 mL/L ಅನ್ನು ಸಿಂಪಡಿಸಿ. ಗದ್ದೆಯ ನೀರನ್ನು 3–4 ದಿನಗಳ ಕಾಲ ಹೊರಹಾಕಿ.",
    "remedyHi": "पौधों के आधार पर Imidacloprid 17.8 SL @ 0.5 mL/L या Buprofezin 25 SC @ 1.25 mL/L का छिड़काव करें। 3–4 दिनों के लिए खेत का पानी निकाल दें।",
    "prevention": "Avoid dense planting; provide 30 cm alleyways every 2 meters for aeration.",
    "preventionKn": "ದಟ್ಟವಾಗಿ ನಾಟಿ ಮಾಡಬೇಡಿ; ಉತ್ತಮ ಗಾಳಿಯಾಡಲು ಪ್ರತಿ 2 ಮೀಟರ್‌ಗೆ 30 cm ಅಂತರದ ದಾರಿಗಳನ್ನು (ಪಥ) ಬಿಡಿ.",
    "preventionHi": "घनी रोपाई से बचें; हवा के संचार के लिए हर 2 मीटर पर 30 cm की जगह छोड़ें।",
    "organicTip": "Spray NSKE 5% (Neem Seed Kernel Extract) at initial pest appearance.",
    "organicTipKn": "ಕೀಟಗಳ ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE 5%) ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "शुरुआती अवस्था में 5% नीम के बीज का अर्क (NSKE 5%) का छिड़काव करें।",
    "fertilizer": "Reduce Nitrogen application; avoid excessive tillering.",
    "fertilizerKn": "ಸಾರಜನಕ (N) ಬಳಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸಿ; ಅತಿಯಾದ ಕವಲೊಡೆಯುವಿಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ.",
    "fertilizerHi": "नाइट्रोजन का प्रयोग कम करें; अत्यधिक कल्ले फूटने पर नियंत्रण रखें।",
    "scheme": "Raitha Samparka Kendra Pest Alert",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#d97706",
    "keyTakeaways": [
      "Causes \"hopperburn\" — circular dried patches in field",
      "Vector for Grassy Stunt and Ragged Stunt viruses",
      "Avoid dense transplanting and excess urea"
    ],
    "keyTakeawaysKn": [
      "ಹೊಲದಲ್ಲಿ ವೃತ್ತಾಕಾರವಾಗಿ ಒಣಗುವ \"ಹಾಪರ್‌ಬರ್ನ್\" ರೋಗಲಕ್ಷಣವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ",
      "ಗ್ರಾಸಿ ಸ್ಟಂಟ್ ಮತ್ತು ರಾಗ್ಡ್ ಸ್ಟಂಟ್ ವೈರಸ್‌ಗಳನ್ನು ಹರಡುತ್ತದೆ",
      "ದಟ್ಟ ನಾಟಿ ಮತ್ತು ಅತಿಯಾದ ಯೂರಿಯಾ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ"
    ],
    "keyTakeawaysHi": [
      "खेत में गोल सूखे पैच यानी \"हॉपरबर्न\" पैदा करता है",
      "ग्रैसी स्टंट और रैग्ड स्टंट वायरस का वाहक है",
      "घनी रोपाई और अत्यधिक यूरिया के प्रयोग से बचें"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor / Tata Mida",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Buprofezin 25 SC",
        "type": "chemical",
        "brand": "Applaud / Rallis",
        "price": "₹420 – ₹580 / 500mL",
        "query": "Buprofezin 25 SC"
      },
      {
        "name": "Neem Oil 10000 PPM",
        "type": "organic",
        "brand": "Eco-Neem",
        "price": "₹220 – ₹350 / 1L",
        "query": "Neem oil agriculture 10000 ppm"
      }
    ]
  },
  {
    "crop": "Paddy / Rice (ಭತ್ತ)",
    "cropKn": "ಭತ್ತ",
    "cropHi": "धान (चावल)",
    "emoji": "🌾",
    "disease": "Sheath Blight (Rhizoctonia solani)",
    "diseaseKn": "ತೊಗಟೆ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "शीथ ब्लाइट (पर्णच्छद अंगमारी)",
    "severity": "Medium",
    "remedy": "Spray Validamycin 3 SL @ 2 mL/L or Hexaconazole 5 EC @ 1 mL/L. Improve air circulation.",
    "remedyKn": "Validamycin 3 SL @ 2 mL/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಅನ್ನು ಕಾಂಡ ಮತ್ತು ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸಿ. ಉತ್ತಮ ಗಾಳಿಯಾಡುವಂತೆ ಮಾಡಿ.",
    "remedyHi": "Validamycin 3 SL @ 2 mL/L या Hexaconazole 5 EC @ 1 mL/L का छिड़काव करें। खेत में हवा का संचार सुधारें।",
    "prevention": "Remove infected weeds around bunds. Avoid water movement from diseased to healthy fields.",
    "preventionKn": "ಬದುಗಳಲ್ಲಿರುವ ಕಳೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ರೋಗಪೀಡಿತ ಗದ್ದೆಯಿಂದ ಆರೋಗ್ಯಕರ ಗದ್ದೆಗೆ ನೀರು ಹರಿಯದಂತೆ ತಡೆಯಿರಿ.",
    "preventionHi": "मेड़ों पर खरपतवार नष्ट करें। संक्रमित खेत से स्वस्थ खेत में पानी के बहाव को रोकें।",
    "organicTip": "Apply Trichoderma viride 1% WP @ 4 kg/ha enriched in farmyard manure at tillering.",
    "organicTipKn": "ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿದ Trichoderma viride 1% WP @ 4 kg/ha ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "कल्ले फूटते समय गोबर की खाद में मिलाकर Trichoderma viride 1% WP @ 4 kg/ha डालें।",
    "fertilizer": "Apply Potash (MOP) in 2 splits — 50% basal, 50% panicle initiation.",
    "fertilizerKn": "ಪೊಟ್ಯಾಶ್ (MOP) ಗೊಬ್ಬರವನ್ನು ಎರಡು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ — 50% ಬಿತ್ತನೆ ವೇಳೆ, 50% ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ.",
    "fertilizerHi": "पोटाश (MOP) 2 किस्तों में दें — 50% बुवाई पर, 50% बाली निकलने के समय।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#0284c7",
    "keyTakeaways": [
      "Snake-skin like greenish-grey lesions on leaf sheaths near water line",
      "Sclerotia float in standing irrigation water spreading infection",
      "High plant density and heavy nitrogen trigger severity"
    ],
    "keyTakeawaysKn": [
      "ನೀರಿನ ಮಟ್ಟದ ಬಳಿಯ ಎಲೆಯ ತೊಗಟೆಯ ಮೇಲೆ ಹಾವಿನ ಚರ್ಮದಂತಹ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಶಿಲೀಂಧ್ರದ ಬೀಜಗಳು ನೀರಿನಲ್ಲಿ ತೇಲುತ್ತಾ ಇಡೀ ಗದ್ದೆಗೆ ರೋಗವನ್ನು ಹರಡುತ್ತವೆ",
      "ದಟ್ಟ ನಾಟಿ ಮತ್ತು ಅತಿಯಾದ ಸಾರಜನಕ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "पानी की सतह के पास तने पर सांप की केंचुली जैसे भूरे धब्बे बनते हैं",
      "खेत में भरे पानी के साथ फफूंद तैरकर दूसरे पौधों में फैलती है",
      "अधिक नाइट्रोजन और घने पौधों से यह बीमारी बहुत तेजी से बढ़ती है"
    ],
    "products": [
      {
        "name": "Validamycin 3 SL",
        "type": "chemical",
        "brand": "Sheathmar / Valida",
        "price": "₹220 – ₹340 / 500mL",
        "query": "Validamycin 3 SL"
      },
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus / Sitara",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC"
      },
      {
        "name": "MOP Muriate of Potash",
        "type": "fertilizer",
        "brand": "IFFCO / IPL Potash",
        "price": "₹1,650 – ₹1,800 / 50kg",
        "query": "MOP Potash fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Paddy / Rice (ಭತ್ತ)",
    "cropKn": "ಭತ್ತ",
    "cropHi": "धान (चावल)",
    "emoji": "🌾",
    "disease": "Bacterial Leaf Blight (Xanthomonas oryzae)",
    "diseaseKn": "ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಎಲೆ ಅಂಗಮಾರಿ (BLB)",
    "diseaseHi": "जीवाणु पत्ती झुलसा रोग (BLB)",
    "severity": "High",
    "remedy": "Spray Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L twice at 10-day intervals.",
    "remedyKn": "Copper Oxychloride 50 WP @ 2.5 g/L ಜೊತೆಗೆ Streptocycline @ 0.1 g/L ಬೆರೆಸಿ 10 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಎರಡು ಬಾರಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L मिलाकर 10 दिन के अंतराल पर 2 बार छिड़काव करें।",
    "prevention": "Drain excess water from field. Avoid clipping of seedling tips during transplanting.",
    "preventionKn": "ಗದ್ದೆಯಿಂದ ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ಹೊರಹಾಕಿ. ನಾಟಿ ಮಾಡುವಾಗ ಸಸಿಗಳ ತುದಿಯನ್ನು ಕತ್ತರಿಸಬೇಡಿ.",
    "preventionHi": "खेत से अतिरिक्त पानी निकाल दें। रोपाई के समय पौध की ऊपरी पत्तियों को न काटें।",
    "organicTip": "Foliar spray of fresh cow dung slurry supernatant (20%) + Bleaching Powder @ 5 kg/ha.",
    "organicTipKn": "ಹಸುವಿನ ಸಗಣಿ ತಿಳಿ ನೀರು (20%) ಸಿಂಪಡಿಸಿ ಮತ್ತು ಎಕರೆಗೆ Bleaching Powder @ 2 kg ನೀರಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "ताजा गाय के गोबर का 20% घोल का छिड़काव करें और खेत के पानी में Bleaching Powder डालें।",
    "fertilizer": "Postpone nitrogen top-dressing until disease symptoms subside.",
    "fertilizerKn": "ರೋಗದ ಲಕ್ಷಣಗಳು ಕಡಿಮೆಯಾಗುವವರೆಗೆ ಸಾರಜನಕ (ಯೂರಿಯಾ) ಮೇಲುಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ಮುಂದೂಡಿ.",
    "fertilizerHi": "रोग नियंत्रित होने तक यूरिया का ऊपरी छिड़काव पूरी तरह रोक दें।",
    "scheme": "PMFBY Crop Insurance",
    "schemeLink": "https://pmfby.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Translucent wavy yellow-to-white lesions starting from leaf tips and margins",
      "Bacterial milky ooze seen on early mornings during warm rainy days",
      "Do not apply urea when leaves show bacterial water-soaking"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಯ ತುದಿ ಮತ್ತು ಅಂಚುಗಳಿಂದ ಹಳದಿಯಾಗಿ ಒಣಗುವ ಅಲೆಗಳಂತಹ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಮಳೆಗಾಲದ ಮುಂಜಾನೆ ಎಲೆಯ ಮೇಲೆ ಹಾಲಿನಂತಹ ಬ್ಯಾಕ್ಟೀರಿಯಾ ದ್ರವ ಕಾಣಬಹುದು",
      "ಎಲೆಗಳು ಒಣಗುತ್ತಿರುವಾಗ ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಯೂರಿಯಾ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों के किनारों से लहरदार पीले-सफेद सूखने वाले धब्बे शुरू होते हैं",
      "सुबह के समय पत्तियों पर बैक्टीरिया की सफेद बूंदें (ऊज़) दिखाई देती हैं",
      "रोग दिखने पर किसी भी स्थिति में यूरिया का इस्तेमाल न करें"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox / Cupramar",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Streptocycline (Streptomycin + Tetracycline)",
        "type": "chemical",
        "brand": "Hindustan Antibiotics",
        "price": "₹45 – ₹70 / 6g pouch",
        "query": "Streptocycline 6g"
      },
      {
        "name": "Bleaching Powder (Chlorinated Lime)",
        "type": "chemical",
        "brand": "Agri Grade",
        "price": "₹60 – ₹100 / 1kg",
        "query": "Bleaching Powder agriculture"
      }
    ]
  },
  {
    "crop": "Paddy / Rice (ಭತ್ತ)",
    "cropKn": "ಭತ್ತ",
    "cropHi": "धान (चावल)",
    "emoji": "🌾",
    "disease": "Yellow Stem Borer (Scirpophaga incertulas)",
    "diseaseKn": "ಹಳದಿ ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು",
    "diseaseHi": "पीला तना छेदक (येलो स्टेम बोरर)",
    "severity": "High",
    "remedy": "Apply Chlorantraniliprole 18.5 SC @ 0.3 mL/L or Cartap Hydrochloride 4G granules @ 10 kg/acre in standing water.",
    "remedyKn": "Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಸಿಂಪಡಿಸಿ ಅಥವಾ Cartap Hydrochloride 4G ಹರಳುಗಳನ್ನು ಎಕರೆಗೆ 10 kg ಯಂತೆ ಗದ್ದೆಯ ನೀರಿನಲ್ಲಿ ಹರಡಿ.",
    "remedyHi": "Chlorantraniliprole 18.5 SC @ 0.3 mL/L का छिड़काव करें या खड़े पानी में Cartap Hydrochloride 4G दाने @ 10 kg/एकड़ डालें।",
    "prevention": "Clip seedling tips before transplanting to destroy egg masses. Set up pheromone traps @ 8/acre.",
    "preventionKn": "ನಾಟಿ ಮಾಡುವ ಮುನ್ನ ಸಸಿಗಳ ತುದಿಯನ್ನು ಕತ್ತರಿಸಿ ಮೊಟ್ಟೆಗಳನ್ನು ನಾಶಮಾಡಿ. ಎಕರೆಗೆ 8 ಮೋಹಕ ಬಲೆಗಳನ್ನು (ಫೆರೋಮೊನ್ ಟ್ರ್ಯಾಪ್) ಅಳವಡಿಸಿ.",
    "preventionHi": "रोपाई से पहले पौध की नोक काटें ताकि अंडों के गुच्छे नष्ट हों। 8 फेरोमोन ट्रैप प्रति एकड़ लगाएं।",
    "organicTip": "Release Trichogramma japonicum egg parasitoid cards @ 1,00,000 parasitoids/ha weekly 3 times.",
    "organicTipKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 1,00,000 Trichogramma japonicum ಪರಾವಲಂಬಿ ಕೀಟ ಕಾರ್ಡ್‌ಗಳನ್ನು ವಾರಕ್ಕೊಮ್ಮೆ 3 ಬಾರಿ ಬಿಡಿ.",
    "organicTipHi": "प्रति हेक्टेयर 1 लाख Trichogramma japonicum ट्राइकोगार्ड कार्ड साप्ताहिक रूप से 3 बार लगाएं।",
    "fertilizer": "Apply balanced NPK with Zinc Sulphate @ 10 kg/acre to strengthen tillers.",
    "fertilizerKn": "ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಸಮತೋಲಿತ NPK ಜೊತೆಗೆ Zinc Sulphate @ 10 kg/acre ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "fertilizerHi": "कल्लों को मजबूत करने के लिए संतुलित NPK के साथ Zinc Sulphate @ 10 kg/एकड़ दें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Causes \"dead heart\" in vegetative stage and white chaffy earheads (\"white ear\") at panicle stage",
      "Egg masses covered with buff-colored hairs on upper leaf surfaces",
      "Install yellow stem borer pheromone lures early in the season"
    ],
    "keyTakeawaysKn": [
      "ಬೆಳವಣಿಗೆ ಹಂತದಲ್ಲಿ ಒಣಗಿದ ಸುಳಿ ಮತ್ತು ತೆನೆ ಹಂತದಲ್ಲಿ ಬಿಳಿ ಕಾಳುಗಳಿಲ್ಲದ ತೆನೆಗಳನ್ನು (\"ಬೆಳ್ಳಗಾದ ತೆನೆ\") ಉಂಟುಮಾಡುತ್ತದೆ",
      "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ಕೂದಲುಗಳಿಂದ ಆವೃತವಾದ ಮೊಟ್ಟೆಗಳ ಗುಚ್ಛಗಳು ಕಾಣುತ್ತವೆ",
      "ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ಫೆರೋಮೊನ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಗದ್ದೆಯಲ್ಲಿ ಅಳವಡಿಸಿ"
    ],
    "keyTakeawaysHi": [
      "वानस्पतिक अवस्था में \"डेड हार्ट\" (सूखा तना) और बाली आने पर सफेद बालियां (व्हाइट इयर) पैदा करता है",
      "पत्तियों पर रोएंदार भूरे रंग के अंडों के गुच्छे दिखाई देते हैं",
      "शुरुआत में ही खेत में तना छेदक के फेरोमोन ल्यूर ट्रैप अवश्य लगाएं"
    ],
    "products": [
      {
        "name": "Chlorantraniliprole 18.5 SC (Coragen)",
        "type": "chemical",
        "brand": "FMC Coragen",
        "price": "₹850 – ₹1,150 / 60mL",
        "query": "Chlorantraniliprole 18.5 SC"
      },
      {
        "name": "Cartap Hydrochloride 4G",
        "type": "chemical",
        "brand": "Padan / Caldan 4G",
        "price": "₹480 – ₹620 / 5kg",
        "query": "Cartap Hydrochloride 4G"
      },
      {
        "name": "Pheromone Trap + Lure (Rice Stem Borer)",
        "type": "organic",
        "brand": "Pest Phero Lures",
        "price": "₹120 – ₹180 / unit",
        "query": "Yellow stem borer pheromone lure"
      }
    ]
  },
  {
    "crop": "Ragi / Finger Millet (ರಾಗಿ)",
    "cropKn": "ರಾಗಿ",
    "cropHi": "रागी (मडुआ)",
    "emoji": "🌾",
    "disease": "Ragi Blast (Pyricularia grisea)",
    "diseaseKn": "ರಾಗಿ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    "diseaseHi": "रागी ब्लास्ट रोग (झोंका रोग)",
    "severity": "High",
    "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Kitazin 48 EC @ 1 mL/L or Carbendazim 50 WP @ 1 g/L at seedling and earhead emergence stages.",
    "remedyKn": "ಸಸಿ ಮಡಿ ಮತ್ತು ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Kitazin 48 EC @ 1 mL/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "नर्सरी तथा बाली निकलते समय Mancozeb 75 WP @ 2 g/L या Kitazin 48 EC @ 1 mL/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Treat seeds with Carbendazim @ 2 g/kg before sowing. Avoid late sowing in Kharif season.",
    "preventionKn": "ಬಿತ್ತನೆ ಮುನ್ನ ಬೀಜಗಳಿಗೆ Carbendazim @ 2 g/kg ಉಪಚರಿಸಿ. ತಡವಾಗಿ ಬಿತ್ತನೆ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    "preventionHi": "बुवाई से पहले बीजों को Carbendazim @ 2 g/kg से उपचारित करें। देर से बुवाई न करें।",
    "organicTip": "Seed treatment with Trichoderma harzianum @ 5 g/kg seed + foliar spray of Panchagavya 3%.",
    "organicTipKn": "Trichoderma harzianum @ 5 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು 3% ಪಂಚಗವ್ಯ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma harzianum @ 5 g/kg से बीजोपचार करें एवं 3% पंचगव्य का छिड़काव करें।",
    "fertilizer": "Apply 50:40:25 kg NPK/ha. Supplement with Farmyard Manure @ 10 t/ha.",
    "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 50:40:25 kg NPK ಗೊಬ್ಬರ ಮತ್ತು 10 ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 50:40:25 kg NPK और 10 टन गोबर की सड़ी खाद खेत में डालें।",
    "scheme": "Karnataka Raitha Siri Scheme (Millets Support)",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Affects leaves, neck, and finger spikelets turning grains black and chaffy",
      "Major yield threat in dryland rainfed areas under high rainfall breaks",
      "Grow resistant varieties: GPU-28, ML-365, or GPU-48"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ಕುತ್ತಿಗೆ ಮತ್ತು ರಾಗಿ ಬೆರಳುಗಳ ತೆನೆಯ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗಿ ಕಾಳು ಕಟ್ಟುವುದಿಲ್ಲ",
      "ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಾದಾಗ ತೀವ್ರ ನಷ್ಟ ಉಂಟುಮಾಡುತ್ತದೆ",
      "GPU-28, ML-365 ಅಥವಾ GPU-48 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों, तने की गर्दन और उंगलियों जैसी बालियों पर काले धब्बे बनते हैं और दाने नहीं भरते",
      "शुष्क एवं वर्षा आधारित क्षेत्रों में आर्द्रता बढ़ने पर यह भारी नुकसान पहुंचाता है",
      "GPU-28, ML-365 या GPU-48 जैसी प्रतिरोधी किस्मों की खेती करें"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Kitazin 48 EC",
        "type": "chemical",
        "brand": "Iprobenfos (Kitazin)",
        "price": "₹340 – ₹490 / 500mL",
        "query": "Kitazin 48 EC"
      },
      {
        "name": "Trichoderma harzianum",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹170 – ₹250 / 1kg",
        "query": "Trichoderma harzianum 1kg"
      }
    ]
  },
  {
    "crop": "Ragi / Finger Millet (ರಾಗಿ)",
    "cropKn": "ರಾಗಿ",
    "cropHi": "रागी (मडुआ)",
    "emoji": "🌾",
    "disease": "Foot Rot / Seedling Blight (Cochliobolus miyabeanus)",
    "diseaseKn": "ರಾಗಿ ಬುಡ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "रागी जड़ विगलन रोग (पाद विगलन)",
    "severity": "Medium",
    "remedy": "Drench root zone with Captan 50 WP @ 2.5 g/L or Copper Oxychloride 50 WP @ 3 g/L.",
    "remedyKn": "ಸಸಿಗಳ ಬುಡಕ್ಕೆ Captan 50 WP @ 2.5 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ದ್ರಾವಣವನ್ನು ಸುರಿಯಿರಿ (ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ).",
    "remedyHi": "पौधों की जड़ों में Captan 50 WP @ 2.5 g/L या Copper Oxychloride 50 WP @ 3 g/L का घोल डालें।",
    "prevention": "Ensure proper drainage in nursery beds. Avoid water stagnation around roots.",
    "preventionKn": "ಸಸಿ ಮಡಿಗಳಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬಸಿಗಾಲುವೆ ಮಾಡಿ. ಬುಡದಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "preventionHi": "नर्सरी में जल निकासी की अच्छी व्यवस्था करें। जड़ों के पास पानी न जमने दें।",
    "organicTip": "Soil application of Trichoderma viride @ 2.5 kg/acre enriched with 100 kg compost.",
    "organicTipKn": "100 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ Trichoderma viride @ 2.5 kg ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "100 kg सड़ी खाद में Trichoderma viride @ 2.5 kg मिलाकर खेत की मिट्टी में मिलाएं।",
    "fertilizer": "Apply balanced basal fertilizer; avoid excessive ammonium nitrogen in seedling stage.",
    "fertilizerKn": "ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ನೀಡಿ; ಸಸಿ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "शुरुआती अवस्था में संतुलित खाद दें; अत्यधिक अमोनियम खाद से बचें।",
    "scheme": "National Food Security Mission - Nutri Cereals",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Causes rotting of collar region and wilting of young seedlings",
      "Spreads rapidly in poorly drained soil during continuous drizzles",
      "Always use certified seed treated with bioagents or fungicides"
    ],
    "keyTakeawaysKn": [
      "ಸಸಿಗಳ ಬುಡದ ಕಾಂಡ ಕೊಳೆತು ಒಣಗಿ ಸಾಯುತ್ತವೆ",
      "ನೀರು ನಿಲ್ಲುವ ಗದ್ದೆಗಳಲ್ಲಿ ತುಂತುರು ಮಳೆಯ ನಂತರ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ",
      "ಯಾವಾಗಲೂ ಪ್ರಮಾಣೀಕೃತ ಮತ್ತು ಬೀಜೋಪಚಾರ ಮಾಡಿದ ಬೀಜಗಳನ್ನೇ ಬಿತ್ತನೆ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पौधों के तने का निचला हिस्सा सड़ जाता है और छोटे पौधे सूखने लगते हैं",
      "जलभराव वाली मिट्टी में लगातार रिमझिम बारिश के बाद यह तेजी से फैलता है",
      "हमेशा उपचारित एवं प्रमाणित बीजों का ही उपयोग करें"
    ],
    "products": [
      {
        "name": "Captan 50 WP",
        "type": "chemical",
        "brand": "Captaf / Dhanuka",
        "price": "₹320 – ₹450 / 500g",
        "query": "Captan 50 WP"
      },
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹390 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Ragi / Finger Millet (ರಾಗಿ)",
    "cropKn": "ರಾಗಿ",
    "cropHi": "रागी (मडुआ)",
    "emoji": "🌾",
    "disease": "Ragi Smut (Melanopsichium eleusinis)",
    "diseaseKn": "ರಾಗಿ ಮಸಿ ರೋಗ (ಸ್ಮಟ್)",
    "diseaseHi": "रागी कंडुआ रोग (स्मट)",
    "severity": "Medium",
    "remedy": "Spray Carboxin 37.5% + Thiram 37.5% DS @ 2 g/kg seed or spray Hexaconazole 5 SC @ 2 mL/L at 50% flowering.",
    "remedyKn": "ಬಿತ್ತನೆ ಮುನ್ನ Carboxin + Thiram @ 2 g/kg ಬೀಜೋಪಚಾರ ಮಾಡಿ ಅಥವಾ ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ Hexaconazole 5 SC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Carboxin + Thiram @ 2 g/kg से बीजोपचार करें या 50% फूल आने पर Hexaconazole 5 SC @ 2 mL/L का छिड़काव करें।",
    "prevention": "Collect and burn smutted earheads in plastic bags to avoid airborne spore dispersion.",
    "preventionKn": "ರೋಗಪೀಡಿತ ತೆನೆಗಳನ್ನು ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲದಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ ಸುಟ್ಟುಹಾಕಿ, ಬೀಜಾಣುಗಳು ಗಾಳಿಯಲ್ಲಿ ಹರಡುವುದನ್ನು ತಡೆಯಿರಿ.",
    "preventionHi": "संक्रमित बालियों को थैली में इकट्ठा करके जलाएं ताकि हवा में फफूंद के कण न फैलें।",
    "organicTip": "Soak seeds in 10% cow urine solution for 30 minutes before shade drying and sowing.",
    "organicTipKn": "ಬಿತ್ತನೆ ಮಾಡುವ ಮುನ್ನ ಬೀಜಗಳನ್ನು 10% ಗೋಮೂತ್ರದ ದ್ರಾವಣದಲ್ಲಿ 30 ನಿಮಿಷ ನೆನೆಸಿ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ.",
    "organicTipHi": "बुवाई से पहले बीजों को 10% गोमूत्र के घोल में 30 मिनट भिगोकर छाया में सुखाएं।",
    "fertilizer": "Do not overdose urea at panicle emergence stage.",
    "fertilizerKn": "ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ಅತಿಯಾಗಿ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡಬೇಡಿ.",
    "fertilizerHi": "बाली निकलने के समय अतिरिक्त यूरिया का प्रयोग न करें।",
    "scheme": "Raitha Sanjeevini Crop Advisory",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#475569",
    "keyTakeaways": [
      "Individual grains in earheads transform into large green-to-black smut sori containing soot-like powder",
      "Infection occurs at flowering through stigma",
      "Deep summer ploughing destroys overwintering spores in soil"
    ],
    "keyTakeawaysKn": [
      "ತೆನೆಯಲ್ಲಿನ ರಾಗಿ ಕಾಳುಗಳು ದಪ್ಪಗಾಗಿ ಹಸಿರು-ಕಪ್ಪು ಮಸಿ ಪುಡಿಯಾಗಿ ಬದಲಾಗುತ್ತವೆ",
      "ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಗಾಳಿಯ ಮೂಲಕ ಪರಾಗಸ್ಪರ್ಶ ಕಾಲದಲ್ಲಿ ಸೋಂಕು ತಗುಲುತ್ತದೆ",
      "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡುವುದರಿಂದ ಮಣ್ಣಿನಲ್ಲಿರುವ ಶಿಲೀಂಧ್ರ ನಾಶವಾಗುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "बालियों के दाने बड़े होकर हरे-काले चूर्ण जैसी गांठों में बदल जाते हैं",
      "फूल आने के समय हवा के माध्यम से यह संक्रमण फैलता है",
      "गर्मियों में गहरी जुताई करने से मिट्टी में दबे फफूंद नष्ट हो जाते हैं"
    ],
    "products": [
      {
        "name": "Carboxin 37.5% + Thiram 37.5% DS",
        "type": "chemical",
        "brand": "Vitavax Power",
        "price": "₹420 – ₹580 / 500g",
        "query": "Carboxin Thiram Vitavax Power"
      },
      {
        "name": "Hexaconazole 5 SC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 SC"
      }
    ]
  },
  {
    "crop": "Ragi / Finger Millet (ರಾಗಿ)",
    "cropKn": "ರಾಗಿ",
    "cropHi": "रागी (मडुआ)",
    "emoji": "🌾",
    "disease": "Downy Mildew / Green Ear (Sclerophthora macrospora)",
    "diseaseKn": "ರಾಗಿ ಬೂದಿ ರೋಗ / ಹಸಿರು ತೆನೆ ರೋಗ",
    "diseaseHi": "रागी डाउनी मिल्ड्यू / हरित बाली रोग",
    "severity": "High",
    "remedy": "Foliar spray with Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2 g/L upon noticing yellowing.",
    "remedyKn": "ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು ಕಂಡ ತಕ್ಷಣ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों पर पीलापन दिखते ही Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L का छिड़काव करें।",
    "prevention": "Rogue out and destroy infected malformed plants immediately. Do not collect seeds from infected crop.",
    "preventionKn": "ವಿಕಾರಗೊಂಡ ಮತ್ತು ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ನಾಶಮಾಡಿ. ರೋಗಪೀಡಿತ ಬೆಳೆಯನ್ನು ಬೀಜಕ್ಕೆ ಬಳಸಬೇಡಿ.",
    "preventionHi": "संक्रमित पौधों को तुरंत उखाड़कर नष्ट करें। रोगग्रस्त फसल से कभी बीज न लें।",
    "organicTip": "Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed.",
    "organicTipKn": "Pseudomonas fluorescens @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 10 g/kg से बीजोपचार करें।",
    "fertilizer": "Apply balanced Micronutrient mixture (Zinc + Boron) @ 5 kg/acre to boost plant vigor.",
    "fertilizerKn": "ಗಿಡದ ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಮಿಶ್ರಣ (Zinc + Boron) @ 5 kg/acre ನೀಡಿ.",
    "fertilizerHi": "पौधों की प्रतिरोधक क्षमता बढ़ाने के लिए सूक्ष्म पोषक तत्व (Zinc + Boron) @ 5 kg/एकड़ दें।",
    "scheme": "Millets Mission Karnataka",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#16a34a",
    "keyTakeaways": [
      "Floral parts transform into leafy leafy malformations giving a \"witch broom\" or \"green ear\" appearance",
      "Downy white fungal growth visible on leaf undersides in high humidity",
      "Use certified disease-free seeds from Govt seed centers"
    ],
    "keyTakeawaysKn": [
      "ರಾಗಿ ತೆನೆಯ ಹೂವುಗಳು ಎಲೆಯಂತೆ ವಿಕಾರಗೊಂಡು \"ಹಸಿರು ಪೊರಕೆ\"ಯಂತೆ ಕಾಣುತ್ತವೆ",
      "ಹೆಚ್ಚಿನ ತೇವಾಂಶವಿದ್ದಾಗ ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಬೆಳೆಯುತ್ತದೆ",
      "ಸರ್ಕಾರಿ ಬೀಜ ಕೇಂದ್ರಗಳಿಂದ ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜಗಳನ್ನು ಪಡೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "बालियों के फूलों की जगह विकृत हरी पत्तियां उग आती हैं जो हरी झाड़ू जैसी दिखती हैं",
      "अधिक नमी होने पर पत्तियों की निचली सतह पर सफेद फफूंद जम जाती है",
      "सरकारी बीज केंद्रों से ही प्रमाणित रोगमुक्त बीज खरीदें"
    ],
    "products": [
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      },
      {
        "name": "Micronutrient Mixture for Millets",
        "type": "fertilizer",
        "brand": "Multiplex / Aries",
        "price": "₹350 – ₹480 / 5kg",
        "query": "Millets micronutrient mixture"
      }
    ]
  },
  {
    "crop": "Ragi / Finger Millet (ರಾಗಿ)",
    "cropKn": "ರಾಗಿ",
    "cropHi": "रागी (मडुआ)",
    "emoji": "🌾",
    "disease": "Helminthosporium Leaf Spot (Helminthosporium nodulosum)",
    "diseaseKn": "ರಾಗಿ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "रागी पर्ण चित्ती रोग (हेल्मिन्थोस्पोरियम लीफ स्पॉट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Zineb 75 WP @ 2 g/L at first appearance of spots.",
    "remedyKn": "ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Zineb 75 WP @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "धब्बे दिखाई देते ही Mancozeb 75 WP @ 2 g/L या Zineb 75 WP @ 2 g/L का छिड़काव करें।",
    "prevention": "Crop rotation with pulses like Redgram or Cowpea. Avoid continuous ragi cultivation on same plot.",
    "preventionKn": "ತೊಗರಿ ಅಥವಾ ಅಲಸಂದೆ ಕಾಳು ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಒಂದೇ ಜಮೀನಿನಲ್ಲಿ ನಿರಂತರ ರಾಗಿ ಬೆಳೆಯಬೇಡಿ.",
    "preventionHi": "अरहर या लोबिया जैसी दलहनी फसलों के साथ फसल चक्र अपनाएं। लगातार एक ही खेत में रागी न लगाएं।",
    "organicTip": "Foliar spray of 5% Neem seed kernel extract (NSKE) + Cow urine 5%.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के बीज का अर्क और 5% गोमूत्र मिलाकर पत्तियों पर छिड़कें।",
    "fertilizer": "Apply recommended Potash (MOP) to enhance foliar resistance against leaf spots.",
    "fertilizerKn": "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ ತಡೆಯಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ (MOP) ಗೊಬ್ಬರವನ್ನು ತಪ್ಪದೇ ನೀಡಿ.",
    "fertilizerHi": "पत्तियों की प्रतिरोधक क्षमता बढ़ाने के लिए अनुशंसित पोटाश (MOP) अवश्य डालें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#854d0e",
    "keyTakeaways": [
      "Small oval to cylindrical brown spots on leaves that coalesce to dry out leaf blades",
      "Affects both seedlings and mature plants leading to poor grain filling",
      "Early intervention with protective fungicide prevents yield loss"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಅಂಡಾಕಾರದ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗಿ ಎಲೆಗಳು ಒಣಗುತ್ತವೆ",
      "ಸಸಿಗಳು ಮತ್ತು ಬೆಳೆದ ಗಿಡಗಳೆರಡಕ್ಕೂ ಬಾಧಿಸಿ ಕಾಳು ತೂಕ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವಾಗುತ್ತದೆ",
      "ರೋಗದ ಆರಂಭದಲ್ಲೇ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿದರೆ ಇಳುವರಿ ನಷ್ಟ ತಪ್ಪಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर अंडाकार भूरे धब्बे बनते हैं जो मिलकर पूरी पत्ती को सुखा देते हैं",
      "छोटे पौधों और पकी फसल दोनों को प्रभावित करता है जिससे दाना कमजोर रह जाता है",
      "शुरुआत में फफूंदनाशक का छिड़काव फसल को भारी नुकसान से बचाता है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Zineb 75 WP",
        "type": "chemical",
        "brand": "Indofil Z-78",
        "price": "₹280 – ₹410 / 500g",
        "query": "Zineb 75 WP"
      }
    ]
  },
  {
    "crop": "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    "cropKn": "ಮೆಕ್ಕೆಜೋಳ",
    "cropHi": "मक्का (भुट्टा)",
    "emoji": "🌽",
    "disease": "Fall Armyworm (Spodoptera frugiperda)",
    "diseaseKn": "ಕತ್ತರಿ ಹುಳು (ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್)",
    "diseaseHi": "फॉल आर्मीवर्म (सैनिक कीट)",
    "severity": "High",
    "remedy": "Apply Emamectin Benzoate 5 SG @ 0.4 g/L or Spinetoram 11.7 SC @ 0.5 mL/L directed into plant whorls. Poison baiting with jaggery + rice bran + Thiodicarb.",
    "remedyKn": "ಸುಳಿಯೊಳಗೆ Emamectin Benzoate 5 SG @ 0.4 g/L ಅಥವಾ Spinetoram 11.7 SC @ 0.5 mL/L ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ. ಬೆಲ್ಲ + ತೌಡು + Thiodicarb ವಿಷಪಾಶ ತಯಾರಿಸಿ ಸುಳಿಗೆ ಹಾಕಿ.",
    "remedyHi": "पौधों के पोंगे (भंवर) में Emamectin Benzoate 5 SG @ 0.4 g/L या Spinetoram 11.7 SC @ 0.5 mL/L का छिड़काव करें। गुड़ + चोकर + Thiodicarb का विष चुग्गा डालें।",
    "prevention": "Deep summer ploughing. Synchronized community sowing. Install pheromone traps @ 5/acre.",
    "preventionKn": "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ. ಇಡೀ ಪ್ರದೇಶದಲ್ಲಿ ಏಕಕಾಲಕ್ಕೆ ಬಿತ್ತನೆ ಮಾಡಿ. ಎಕರೆಗೆ 5 ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "preventionHi": "गर्मियों में गहरी जुताई करें। एक साथ पूरे क्षेत्र में बुवाई करें। 5 फेरोमोन ट्रैप प्रति एकड़ लगाएं।",
    "organicTip": "Release egg parasitoids Trichogramma pretiosum @ 50,000/acre. Spray Bacillus thuringiensis (Bt) @ 2 g/L.",
    "organicTipKn": "ಎಕರೆಗೆ Trichogramma pretiosum ಪರಾವಲಂಬಿಗಳನ್ನು ಬಿಡಿ. Bacillus thuringiensis (Bt) @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "प्रति एकड़ Trichogramma pretiosum छोड़ें और Bacillus thuringiensis (Bt) @ 2 g/L का छिड़काव करें।",
    "fertilizer": "Apply 150:75:40 kg NPK/ha. Avoid excess early nitrogen that stimulates lush tender foliage.",
    "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 150:75:40 kg NPK ಗೊಬ್ಬರ ನೀಡಿ. ಸಸಿ ಹಂತದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ನೀಡಬೇಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 150:75:40 kg NPK दें। शुरुआती अवस्था में ज्यादा यूरिया न डालें।",
    "scheme": "Special FAW Emergency Control Contingency Plan",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Voracious whorl feeder leaving ragged \"shot-hole\" leaves and large sawdust-like fecal matter",
      "Caterpillar has an inverted white \"Y\" on head and 4 square spots on 8th abdominal segment",
      "Target young larvae at 1st-2nd instar before they bore deep inside whorl"
    ],
    "keyTakeawaysKn": [
      "ಸುಳಿಯೊಳಗಿನ ಎಲೆಗಳನ್ನು ತಿಂದು ಜರಡಿಯಂತೆ ತೂತು ಮಾಡಿ ಮರದ ಪುಡಿಯಂತಹ ಹಿಕ್ಕೆಯನ್ನು ಬಿಡುತ್ತದೆ",
      "ಹುಳುವಿನ ತಲೆಯ ಮೇಲೆ ತಿರುಗುಮುರುಗಾದ ಬಿಳಿ \"Y\" ಆಕಾರ ಮತ್ತು 8ನೇ ಖಂಡದಲ್ಲಿ 4 ಚೌಕಾಕಾರದ ಚುಕ್ಕೆಗಳಿರುತ್ತವೆ",
      "ಸುಳಿಯೊಳಗೆ ಹೊಗುವ ಮುನ್ನ ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ನಿಯಂತ್ರಣ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ"
    ],
    "keyTakeawaysHi": [
      "पोंगे की पत्तियों को खाकर छलनी बना देता है और बुरादे जैसा मल छोड़ता है",
      "कीट के सिर पर उल्टे \"Y\" का निशान और पेट के 8वें खंड पर 4 चौकोर काले धब्बे होते हैं",
      "शुरुआती 1-2 अवस्था में ही छिड़काव करें जब तक कीट अंदर न घुसे"
    ],
    "products": [
      {
        "name": "Emamectin Benzoate 5 SG",
        "type": "chemical",
        "brand": "Proclaim / Missile",
        "price": "₹420 – ₹590 / 100g",
        "query": "Emamectin Benzoate 5 SG"
      },
      {
        "name": "Spinetoram 11.7 SC",
        "type": "chemical",
        "brand": "Delegate (Corteva)",
        "price": "₹950 – ₹1,350 / 100mL",
        "query": "Spinetoram 11.7 SC Delegate"
      },
      {
        "name": "Bacillus thuringiensis (Bt)",
        "type": "organic",
        "brand": "Bio-Insecticide",
        "price": "₹220 – ₹320 / 500g",
        "query": "Bacillus thuringiensis insecticide"
      },
      {
        "name": "FAW Pheromone Traps & Lures",
        "type": "organic",
        "brand": "Agri Trap System",
        "price": "₹140 – ₹200 / unit",
        "query": "Fall armyworm pheromone trap lure"
      }
    ]
  },
  {
    "crop": "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    "cropKn": "ಮೆಕ್ಕೆಜೋಳ",
    "cropHi": "मक्का (भुट्टा)",
    "emoji": "🌽",
    "disease": "Turcicum Leaf Blight (Exserohilum turcicum)",
    "diseaseKn": "ಟರ್ಸಿಕಮ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "तुर्सिकम लीफ ब्लाइट (मक्का झुलसा)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L upon noticing lower leaf lesions.",
    "remedyKn": "ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Azoxystrobin + Difenoconazole @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "निचली पत्तियों पर लक्षण दिखते ही Mancozeb 75 WP @ 2.5 g/L या Azoxystrobin + Difenoconazole @ 1 mL/L का छिड़काव करें।",
    "prevention": "Plant tolerant maize hybrids (e.g., CP-818, PAC-751). Incorporate crop debris into soil after harvest.",
    "preventionKn": "ರೋಗ ಸಹಿಷ್ಣು ಮೆಕ್ಕೆಜೋಳ ಹೈಬ್ರಿಡ್‌ಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ. ಕಟಾವಿನ ನಂತರ ಬೆಳೆಯ ತ್ಯಾಜ್ಯವನ್ನು ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "preventionHi": "रोग रोधी मक्का संकर किस्मों की बुवाई करें। कटाई के बाद अवशेषों को मिट्टी में दबा दें।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 2 g/L combined with 5% cow urine.",
    "organicTipKn": "Pseudomonas fluorescens @ 2 g/L ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 2 g/L के साथ 5% गोमूत्र मिलाकर पत्तियों पर छिड़कें।",
    "fertilizer": "Ensure adequate Potassium (K) application; Potassium enhances maize stalk and leaf cell thickness.",
    "fertilizerKn": "ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ಇದು ಎಲೆ ಮತ್ತು ಕಾಂಡಗಳನ್ನು ಗಟ್ಟಿಗೊಳಿಸಿ ರೋಗ ತಡೆಯುತ್ತದೆ.",
    "fertilizerHi": "पर्याप्त पोटाश खाद डालें; पोटाश तने और पत्तियों की कोशिका भित्ति को मजबूत बनाता है।",
    "scheme": "National Food Security Mission - Coarse Cereals",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#f97316",
    "keyTakeaways": [
      "Long, elliptical, grayish-green or tan lesions (cigar-shaped) developing on leaves",
      "Heavy incidence during cool humid weather blights the entire photosynthetic canopy",
      "Begin protective spraying from bottom leaves upwards"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಉದ್ದವಾದ, ಸಿಗಾರ್ ಆಕಾರದ ಬೂದು-ಹಸಿರು ಅಥವಾ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಮೋಡ ಕವಿದ ಮತ್ತು ತೇವಾಂಶದ ಹವಾಮಾನದಲ್ಲಿ ಇಡೀ ಎಲೆಗಳು ಒಣಗಿ ಇಳುವರಿ ಕುಸಿಯುತ್ತದೆ",
      "ಕೆಳಗಿನ ಎಲೆಗಳಿಂದ ಆರಂಭಿಸಿ ಮೇಲಿನವರೆಗೆ ರೋಗ ಹರಡದಂತೆ ಸಿಂಪಡಣೆ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर सिगार के आकार के लंबे, धूसर-हरे या भूरे धब्बे बनते हैं",
      "नम और ठंडे मौसम में पूरी पत्तियां झुलस जाती हैं जिससे दाना नहीं भर पाता",
      "निचली पत्तियों से ऊपर की ओर संक्रमण रोकने के लिए समय पर स्प्रे करें"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
        "type": "chemical",
        "brand": "Amistar Top (Syngenta)",
        "price": "₹850 – ₹1,200 / 200mL",
        "query": "Azoxystrobin Difenoconazole Amistar Top"
      }
    ]
  },
  {
    "crop": "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    "cropKn": "ಮೆಕ್ಕೆಜೋಳ",
    "cropHi": "मक्का (भुट्टा)",
    "emoji": "🌽",
    "disease": "Maydis Leaf Blight (Bipolaris maydis)",
    "diseaseKn": "ಮೇಡಿಸ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "मेडिस लीफ ब्लाइट (मईडिस झुलसा)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L at first appearance of spots.",
    "remedyKn": "ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "शुरुआती लक्षण पर Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Use certified clean seeds. Follow crop rotation with non-graminaceous crops like legumes.",
    "preventionKn": "ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಬಳಸಿ. ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "प्रमाणित बीजों का उपयोग करें। दलहनी फसलों के साथ फसल चक्र अपनाएं।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L at early vegetative stage.",
    "organicTipKn": "ಸಸಿ ಹಂತದಲ್ಲಿ Trichoderma viride @ 5 g/L ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "वानस्पतिक अवस्था में Trichoderma viride @ 5 g/L का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Avoid excessive nitrogen fertilization during warm, rainy periods.",
    "fertilizerKn": "ಉಷ್ಣ ಮತ್ತು ಮಳೆಗಾಲದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "गर्म एवं बरसात के मौसम में अत्यधिक यूरिया खाद देने से बचें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Small, rectangular, parallel-sided lesions restricted between veins",
      "Favored by warm temperatures (20–30°C) and high relative humidity",
      "Timely fungicide spray protects cob filling"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಯ ನರಗಳ ನಡುವೆ ಆಯತಾಕಾರದ ಸಣ್ಣ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "20–30°C ಉಷ್ಣತೆ ಮತ್ತು ಹೆಚ್ಚಿನ ಗಾಳಿಯ ತೇವಾಂಶವಿದ್ದಾಗ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ",
      "ಸಕಾಲಿಕ ಔಷಧ ಸಿಂಪಡಣೆ ತೆನೆಯಲ್ಲಿ ಕಾಳು ಗಟ್ಟಿಯಾಗಲು ಸಹಕಾರಿಯಾಗಿದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की नसों के बीच छोटे, आयताकार भूरे धब्बे बनते हैं",
      "गर्म तापमान (20–30°C) और उच्च आर्द्रता में यह बीमारी तेजी से फैलती है",
      "समय पर फफूंदनाशक का छिड़काव भुट्टे में दानों के भराव की रक्षा करता है"
    ],
    "products": [
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt / Dhanuka Result",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    "cropKn": "ಮೆಕ್ಕೆಜೋಳ",
    "cropHi": "मक्का (भुट्टा)",
    "emoji": "🌽",
    "disease": "Common Rust (Puccinia sorghi)",
    "diseaseKn": "ಮೆಕ್ಕೆಜೋಳದ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "मक्का रतुआ रोग (कॉमन रस्ट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Zineb 75 WP @ 2 g/L or Propiconazole 25 EC @ 1 mL/L upon noticing pustules.",
    "remedyKn": "ಎಲೆಗಳ ಮೇಲೆ ತುಕ್ಕು ಬಣ್ಣದ ಬೊಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों पर रतुआ के फफोले दिखते ही Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Eradicate oxalis and alternate weed hosts around the field perimeter.",
    "preventionKn": "ಹೊಲದ ಸುತ್ತಮುತ್ತಲಿರುವ ಕಳೆಗಳು ಮತ್ತು ಆಕ್ಸಾಲಿಸ್ ಗಿಡಗಳನ್ನು ನಾಶಮಾಡಿ.",
    "preventionHi": "खेत की मेड़ों से खरपतवार और वैकल्पिक मेजबान पौधों को नष्ट करें।",
    "organicTip": "Spray wettable sulfur 80 WP @ 3 g/L early in morning.",
    "organicTipKn": "ಬೆಳಗಿನ ಜಾವ ಕರಗುವ ಗಂಧಕ (Wettable Sulphur 80 WP) @ 3 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "सुबह के समय घुलनशील सल्फर (Wettable Sulphur 80 WP) @ 3 g/L का छिड़काव करें।",
    "fertilizer": "Avoid late top-dressing with nitrogen which delays maturity and increases susceptibility.",
    "fertilizerKn": "ತಡವಾಗಿ ಸಾರಜನಕ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ; ಇದು ಬೆಳೆ ಮಾಗುವುದನ್ನು ನಿಧಾನಗೊಳಿಸಿ ರೋಗ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    "fertilizerHi": "देर से यूरिया डालने से बचें; इससे फसल देर से पकती है और रतुआ का खतरा बढ़ता है।",
    "scheme": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "schemeLink": "https://pmfby.gov.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Golden-brown to cinnamon-brown powdery pustules on both leaf surfaces",
      "In cool weather, pustules rupture the epidermis releasing powdery urediniospores",
      "Plant resistant varieties in rust-prone highland areas"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಚಿನ್ನದ ಕಂದು ಅಥವಾ ಇಟ್ಟಿಗೆ ಕೆಂಪು ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಏಳುತ್ತವೆ",
      "ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಬೊಕ್ಕೆಗಳು ಒಡೆದು ಗಾಳಿಯಲ್ಲಿ ಕೆಂಪು ಪುಡಿಯಂತಹ ಬೀಜಾಣುಗಳು ಹರಡುತ್ತವೆ",
      "ತುಕ್ಕು ಪೀಡಿತ ಮಲೆನಾಡು ಹಾಗೂ ಗುಡ್ಡಗಾಡು ಪ್ರದೇಶಗಳಲ್ಲಿ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की दोनों सतहों पर सुनहरे-भूरे रंग के चूर्ण भरे फफोले बन जाते हैं",
      "ठंडे मौसम में फफोले फटकर हवा में लाल-भूरे रंग का पाउडर छोड़ते हैं",
      "रतुआ प्रभावित क्षेत्रों में रोग प्रतिरोधी किस्मों की ही बुवाई करें"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex / Thiovit",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt / Bumper",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC"
      }
    ]
  },
  {
    "crop": "Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)",
    "cropKn": "ಮೆಕ್ಕೆಜೋಳ",
    "cropHi": "मक्का (भुट्टा)",
    "emoji": "🌽",
    "disease": "Post-flowering Stalk Rot (Macrophomina phaseolina)",
    "diseaseKn": "ಮೆಕ್ಕೆಜೋಳದ ಕಾಂಡ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "मक्का तना सड़न रोग (पोस्ट-फ्लावरिंग स्टालक रॉट)",
    "severity": "High",
    "remedy": "Drench base with Carbendazim 50 WP @ 1 g/L or Thiram 75 WP @ 2 g/L. Avoid moisture stress during grain filling.",
    "remedyKn": "ಗಿಡದ ಬುಡಕ್ಕೆ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Thiram 75 WP @ 2 g/L ದ್ರಾವಣವನ್ನು ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ. ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ನೀರಾವರಿ ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "remedyHi": "पौधों की जड़ पर Carbendazim 50 WP @ 1 g/L या Thiram 75 WP @ 2 g/L का घोल डालें। दाना भरते समय पानी की कमी न होने दें।",
    "prevention": "Avoid water deficit at flowering and grain-filling stages. Maintain optimum plant population (65,000/ha).",
    "preventionKn": "ಹೂವಾಡುವ ಮತ್ತು ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ನೀರಿನ ಕೊರತೆ ಉಂಟಾಗದಂತೆ ಸಕಾಲಕ್ಕೆ ನೀರು ಹಾಯಿಸಿ. ಹೆಕ್ಟೇರ್‌ಗೆ ಸೂಕ್ತ ಗಿಡಗಳ ಸಾಂದ್ರತೆ ಕಾಪಾಡಿ.",
    "preventionHi": "फूल आते और दाना बनते समय सिंचाई अवश्य करें। प्रति हेक्टेयर उचित पौध संख्या बनाए रखें।",
    "organicTip": "Seed treatment with Trichoderma viride @ 4 g/kg seed + soil application of Trichoderma @ 2 kg/acre in FYM.",
    "organicTipKn": "Trichoderma viride @ 4 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "Trichoderma viride @ 4 g/kg से बीजोपचार करें और गोबर की खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Apply Potash (MOP) @ 40 kg/ha to strengthen maize rind and vascular bundles.",
    "fertilizerKn": "ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಹೆಕ್ಟೇರ್‌ಗೆ 40 kg ಪೊಟ್ಯಾಶ್ (MOP) ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "मक्के के तने को मजबूत करने के लिए 40 kg/हेक्टेयर पोटाश (MOP) का प्रयोग करें।",
    "scheme": "Raitha Samparka Kendra Soil Health Program",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Lower internodes become soft, spongy, discolored and hollow, leading to premature lodging",
      "Moisture stress after flowering triggers charcoal rot and Fusarium stalk rots",
      "Never skip irrigation during tasseling and silking stages"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಗೆಣ್ಣುಗಳು ಮೆದುವಾಗಿ, ಪೊಳ್ಳಾಗಿ ಬಣ್ಣಗೆಟ್ಟು ಗಾಳಿಗೆ ಗಿಡಗಳು ಸುಲಭವಾಗಿ ಮುರಿದು ಬೀಳುತ್ತವೆ",
      "ಹೂವಾಡುವ ನಂತರ ನೀರಿನ ಕೊರತೆಯಾದರೆ ಈ ಕಾಂಡ ಕೊಳೆ ರೋಗ ತೀವ್ರಗೊಳ್ಳುತ್ತದೆ",
      "ತುರಾಯಿ ಮತ್ತು ಜೊಂಡಿ ಬರುವ ಹಂತದಲ್ಲಿ ನೀರು ಹಾಯಿಸುವುದನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ತಪ್ಪಿಸಬೇಡಿ"
    ],
    "keyTakeawaysHi": [
      "निचली पोरियां अंदर से मुलायम, खोखली और बदरंग हो जाती हैं जिससे पौधे गिर जाते हैं",
      "फूल आने के बाद खेत सूखने से चारकोल रॉट और तना सड़न बहुत तेजी से फैलती है",
      "मूंछें और भुट्टा बनते समय खेत में सिंचाई कभी न छोड़ें"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "MOP Potash Fertilizer",
        "type": "fertilizer",
        "brand": "IFFCO MOP",
        "price": "₹1,650 – ₹1,800 / 50kg",
        "query": "MOP Potash fertilizer 50kg"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Wheat (ಗೋಧಿ)",
    "cropKn": "ಗೋಧಿ",
    "cropHi": "गेहूं",
    "emoji": "🌾",
    "disease": "Yellow / Stripe Rust (Puccinia striiformis)",
    "diseaseKn": "ಗೋಧಿ ಹಳದಿ ಪಟ್ಟಿ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "गेहूं पीला रतुआ (स्ट्राइप रस्ट)",
    "severity": "High",
    "remedy": "Spray Propiconazole 25 EC (Tilt) @ 1 mL/L or Tebuconazole 25.9 EC @ 1 mL/L at the very first stripe appearance.",
    "remedyKn": "ಹಳದಿ ಪಟ್ಟಿಗಳು ಕಂಡ ತಕ್ಷಣ Propiconazole 25 EC (Tilt) @ 1 mL/L ಅಥವಾ Tebuconazole 25.9 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों पर पीली धारियां दिखते ही Propiconazole 25 EC (Tilt) @ 1 mL/L या Tebuconazole 25.9 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Sow resistant varieties like DBW 187, HD 3086, PBW 550. Avoid late sowing after November.",
    "preventionKn": "DBW 187, HD 3086 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ. ನವೆಂಬರ್ ನಂತರ ತಡವಾಗಿ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ.",
    "preventionHi": "DBW 187, HD 3086 जैसी प्रतिरोधी किस्मों की बुवाई करें। नवंबर के बाद देर से बुवाई न करें।",
    "organicTip": "Foliar spray of fermented cow urine 10% + sour buttermilk spray @ 50 mL/L.",
    "organicTipKn": "10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಮತ್ತು ಗೋಮೂತ್ರ ಮಿಶ್ರಣವನ್ನು ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% खट्टी छाछ और गोमूत्र का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Balance NPK (120:60:40 kg/ha); avoid excess nitrogenous fertilization which promotes succulent growth.",
    "fertilizerKn": "ಸಮತೋಲಿತ NPK (120:60:40 kg/ha) ನೀಡಿ; ಅತಿಯಾದ ಯೂರಿಯಾ ಬಳಕೆ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತದೆ.",
    "fertilizerHi": "संतुलित NPK (120:60:40 kg/हेक्टेयर) डालें; अत्यधिक यूरिया से पौधे कोमल होते हैं और रतुआ बढ़ता है।",
    "scheme": "PMFBY Rabi Wheat Protection Scheme",
    "schemeLink": "https://pmfby.gov.in/",
    "color": "#eab308",
    "keyTakeaways": [
      "Yellow uredinial pustules arranged in distinct linear stripes along leaf veins",
      "Pustules leave yellow powder on clothes/fingers when touched",
      "Prompt single spray of triazole fungicide halts epidemic completely"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ನರಗಳ ಉದ್ದಕ್ಕೂ ಸಾಲಾಗಿ ಜೋಡಿಸಿದ ಹಳದಿ ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಬೆರಳುಗಳಿಂದ ಮುಟ್ಟಿದಾಗ ಹಳದಿ ಬಣ್ಣದ ಪುಡಿ ಬೆರಳುಗಳಿಗೆ ಅಂಟಿಕೊಳ್ಳುತ್ತದೆ",
      "ಟ್ರಯಾಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕದ ಒಂದು ಸರಿಯಾದ ಸಿಂಪಡಣೆ ರೋಗ ಹರಡುವಿಕೆಯನ್ನು ಸಂಪೂರ್ಣ ತಡೆಯುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की नसों के समानांतर कतारों में पीले रंग के चूर्ण भरे फफोले बनते हैं",
      "हाथ लगाने पर उंगलियों और कपड़ों पर पीला पाउडर लग जाता है",
      "ट्राईजोल फफूंदनाशक का एक समयबद्ध छिड़काव इस महामारी को पूरी तरह रोक देता है"
    ],
    "products": [
      {
        "name": "Propiconazole 25 EC (Tilt)",
        "type": "chemical",
        "brand": "Syngenta Tilt / Dhanuka Result",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      },
      {
        "name": "Tebuconazole 25.9 EC",
        "type": "chemical",
        "brand": "Folicur (Bayer)",
        "price": "₹480 – ₹690 / 250mL",
        "query": "Tebuconazole 25.9 EC Folicur"
      }
    ]
  },
  {
    "crop": "Wheat (ಗೋಧಿ)",
    "cropKn": "ಗೋಧಿ",
    "cropHi": "गेहूं",
    "emoji": "🌾",
    "disease": "Brown / Leaf Rust (Puccinia triticina)",
    "diseaseKn": "ಗೋಧಿ ಕಂದು ಎಲೆ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "गेहूं भूरा रतुआ (पर्ण रतुआ)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L upon noticing scattered brown pustules.",
    "remedyKn": "ಕಂದು ಬಣ್ಣದ ಬೊಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों पर भूरे फफोले दिखते ही Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Cultivate recommended regional rust-resistant genotypes. Timely sowing in early November.",
    "preventionKn": "ಶಿಫಾರಸು ಮಾಡಿದ ಸ್ಥಳೀಯ ತುಕ್ಕು ನಿರೋಧಕ ತಳಿಗಳನ್ನು ನವೆಂಬರ್ ಆರಂಭದಲ್ಲೇ ಬಿತ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "क्षेत्र के लिए अनुशंसित रतुआ रोधी किस्मों की नवंबर की शुरुआत में समय पर बुवाई करें।",
    "organicTip": "Foliar spray of 5% Neem oil emulsion early in the season.",
    "organicTipKn": "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಎಣ್ಣೆಯ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "मौसम की शुरुआत में 5% नीम के तेल के घोल का छिड़काव करें।",
    "fertilizer": "Apply adequate Potash (MOP) to enhance foliar disease tolerance.",
    "fertilizerKn": "ಎಲೆಗಳ ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "पत्तियों की रोग सहनशीलता बढ़ाने के लिए पर्याप्त पोटाश डालें।",
    "scheme": "National Food Security Mission - Wheat",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#9a3412",
    "keyTakeaways": [
      "Small, round-to-oval orange-brown pustules scattered randomly across upper leaf blade",
      "Favored by warm humid days (20–25°C) and cool nights",
      "Unlike yellow rust, pustules are randomly scattered rather than in linear stripes"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಯಾದೃಚ್ಛಿಕವಾಗಿ ಹರಡಿದ ಸಣ್ಣ ದುಂಡಗಿನ ಕಿತ್ತಳೆ-ಕಂದು ಬಣ್ಣದ ಬೊಕ್ಕೆಗಳು ಕಾಣುತ್ತವೆ",
      "ಬೆಚ್ಚನೆಯ ತೇವಾಂಶದ ಹಗಲು (20–25°C) ಮತ್ತು ತಂಪಾದ ರಾತ್ರಿಗಳಲ್ಲಿ ವೇಗವಾಗಿ ಹೆಚ್ಚುತ್ತದೆ",
      "ಹಳದಿ ತುಕ್ಕಿನಂತೆ ಗೆರೆಗಳಾಗಿರದೆ, ಇಡೀ ಎಲೆಯ ಮೇಲೆ ಎಲ್ಲೆಂದರಲ್ಲಿ ಹರಡಿಕೊಂಡಿರುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की ऊपरी सतह पर छोटे गोल नारंगी-भूरे फफोले बेतरतीब बिखरे होते हैं",
      "गर्म दिन (20–25°C) और ठंडी रातें इस बीमारी के फैलाव में सहायक होती हैं",
      "पीले रतुआ की तरह यह धारियों में न होकर पूरी पत्ती पर बिखरा रहता है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt / Bumper",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC"
      }
    ]
  },
  {
    "crop": "Wheat (ಗೋಧಿ)",
    "cropKn": "ಗೋಧಿ",
    "cropHi": "गेहूं",
    "emoji": "🌾",
    "disease": "Karnal Bunt (Tilletia indica)",
    "diseaseKn": "ಕರ್ನಾಲ್ ಬಂಟ್ ರೋಗ",
    "diseaseHi": "गेहूं करनाल बंट रोग",
    "severity": "High",
    "remedy": "Single spray of Propiconazole 25 EC @ 1 mL/L at ear emergence (50% boot leaf stage).",
    "remedyKn": "ಗೋಧಿ ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ (ಶೇ. 50 ಬೂಟ್ ಲೀಫ್ ಹಂತ) Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "बाली निकलने की अवस्था (50% बूट लीफ स्टेज) पर Propiconazole 25 EC @ 1 mL/L का एक स्प्रे करें।",
    "prevention": "Strict quarantine and seed certification. Avoid irrigation during anthesis / flowering.",
    "preventionKn": "ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ. ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ ಅತಿಯಾದ ನೀರಾವರಿ ಮಾಡಬೇಡಿ.",
    "preventionHi": "प्रमाणित रोगमुक्त बीज ही बोएं। फूल आने के समय अतिरिक्त सिंचाई से बचें।",
    "organicTip": "Seed treatment with bioagent Trichoderma viride @ 5 g/kg seed.",
    "organicTipKn": "Trichoderma viride @ 5 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಬಿತ್ತನೆ ಮಾಡಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/kg से बीजोपचार करके ही बुवाई करें।",
    "fertilizer": "Avoid heavy doses of nitrogenous fertilizers which extend flowering window.",
    "fertilizerKn": "ಹೂವಾಡುವ ಅವಧಿಯನ್ನು ವಿಸ್ತರಿಸುವ ಅತಿಯಾದ ಯೂರಿಯಾ ಗೊಬ್ಬರ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "अत्यधिक यूरिया न डालें जिससे फूल आने की अवधि लंबी खिंचती है।",
    "scheme": "Wheat Quality Assurance and Export Quarantine Support",
    "schemeLink": "https://agricoop.nic.in/",
    "color": "#1e293b",
    "keyTakeaways": [
      "Grains partially converted into black powdery teliospore masses giving a rotten-fish odor",
      "Infection happens precisely at flowering by airborne secondary sporidia",
      "Severely degrades flour baking quality and export value"
    ],
    "keyTakeawaysKn": [
      "ಗೋಧಿ ಕಾಳುಗಳು ಭಾಗಶಃ ಕಪ್ಪು ಪುಡಿಯಾಗಿ ಬದಲಾಗಿ ಕೊಳೆತ ಮೀನಿನ ವಾಸನೆ ಬೀರುತ್ತವೆ",
      "ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ ಗಾಳಿಯಲ್ಲಿ ಬರುವ ಶಿಲೀಂಧ್ರಾಣುಗಳಿಂದ ಸೋಂಕು ಉಂಟಾಗುತ್ತದೆ",
      "ಹಿಟ್ಟಿನ ಗುಣಮಟ್ಟವನ್ನು ಹಾಳುಮಾಡಿ ರಫ್ತು ಮೌಲ್ಯವನ್ನು ಕುಗ್ಗಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "गेहूं के दाने आंशिक रूप से काले चूर्ण में बदल जाते हैं और सड़ी मछली जैसी दुर्गंध आती है",
      "फूल आने के समय हवा के द्वारा इस फफूंद का संक्रमण होता है",
      "आटे की गुणवत्ता खराब होती है और बाजार में इसका भाव गिर जाता है"
    ],
    "products": [
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt / Result",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Wheat (ಗೋಧಿ)",
    "cropKn": "ಗೋಧಿ",
    "cropHi": "गेहूं",
    "emoji": "🌾",
    "disease": "Loose Smut (Ustilago tritici)",
    "diseaseKn": "ಗೋಧಿ ತೆನೆ ಮಸಿ ರೋಗ (ಲೂಸ್ ಸ್ಮಟ್)",
    "diseaseHi": "गेहूं अनावृत कंडुआ (लूज स्मट)",
    "severity": "Medium",
    "remedy": "Compulsory seed treatment with Carboxin 37.5% + Thiram 37.5% (Vitavax Power) @ 2.5 g/kg or Tebuconazole 2 DS @ 1.5 g/kg seed.",
    "remedyKn": "ಬಿತ್ತನೆ ಮುನ್ನ Vitavax Power (Carboxin + Thiram) @ 2.5 g/kg ಅಥವಾ Tebuconazole 2 DS @ 1.5 g/kg ನೊಂದಿಗೆ ಕಡ್ಡಾಯ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "remedyHi": "बुवाई से पहले Vitavax Power (Carboxin + Thiram) @ 2.5 g/kg या Tebuconazole 2 DS @ 1.5 g/kg से अनिवार्य बीजोपचार करें।",
    "prevention": "Solar heat treatment: Soak seed in water for 4–5 hours in May-June, then dry under blazing sun for 4 hours.",
    "preventionKn": "ಸೌರ ಶಾಖೋಪಚಾರ: ಮೇ-ಜೂನ್ ಬಿಸಿಲಿನಲ್ಲಿ ಬೀಜಗಳನ್ನು 4-5 ಗಂಟೆ ನೀರಿನಲ್ಲಿ ನೆನೆಸಿ, ನಂತರ ತೀವ್ರ ಬಿಸಿಲಿನಲ್ಲಿ 4 ಗಂಟೆ ಒಣಗಿಸಿ.",
    "preventionHi": "सोलर हीट ट्रीटमेंट: मई-जून में बीजों को 4 घंटे पानी में भिगोकर तेज धूप में 4 घंटे सुखाएं।",
    "organicTip": "Hot water seed treatment at 52°C for exactly 10 minutes to kill internal dormant mycelium.",
    "organicTipKn": "ಬೀಜದೊಳಗಿನ ಶಿಲೀಂಧ್ರ ಕೊಲ್ಲಲು 52°C ಬಿಸಿ ನೀರಿನಲ್ಲಿ ನಿಖರವಾಗಿ 10 ನಿಮಿಷಗಳ ಕಾಲ ಬೀಜಗಳನ್ನು ಮುಳುಗಿಸಿ.",
    "organicTipHi": "अंदर छिपी फफूंद को खत्म करने के लिए बीजों को 52°C गर्म पानी में ठीक 10 मिनट रखें।",
    "fertilizer": "Apply balanced basal nutrition to ensure uniform flowering and tiller development.",
    "fertilizerKn": "ಏಕಕಾಲಕ್ಕೆ ತೆನೆಗಳು ಹೊರಬರಲು ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "समान बालियां निकलने के लिए संतुलित आधार खाद दें।",
    "scheme": "Seed Village Programme (Subsidized Certified Wheat Seeds)",
    "schemeLink": "https://seednet.gov.in/",
    "color": "#334155",
    "keyTakeaways": [
      "Entire spike converted into a black powdery mass of spores leaving only naked rachis behind",
      "Internally seed-borne disease that cannot be cured by foliar sprays after emergence",
      "Seed treatment before sowing is 100% effective and mandatory"
    ],
    "keyTakeawaysKn": [
      "ಇಡೀ ಗೋಧಿ ತೆನೆಯು ಕಪ್ಪು ಮಸಿ ಪುಡಿಯಾಗಿ ಬದಲಾಗಿ ಕೇವಲ ಬರಿಯ ಕಡ್ಡಿ ಮಾತ್ರ ಉಳಿಯುತ್ತದೆ",
      "ಇದು ಬೀಜದೊಳಗೇ ಸುಪ್ತವಾಗಿರುವ ರೋಗವಾಗಿದ್ದು, ತೆನೆ ಬಂದ ಮೇಲೆ ಸಿಂಪಡಣೆ ಮಾಡಿದರೆ ಪ್ರಯೋಜನವಿಲ್ಲ",
      "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಮಾಡುವ ಬೀಜೋಪಚಾರವು ಶೇ. 100ರಷ್ಟು ಪರಿಣಾಮಕಾರಿ"
    ],
    "keyTakeawaysHi": [
      "पूरी बाली काले चूर्ण में बदल जाती है और केवल नंगी डंडी ही बची रह जाती है",
      "यह आंतरिक रूप से बीज जनित रोग है, बाली निकलने के बाद स्प्रे से ठीक नहीं होता",
      "बुवाई से पहले बीजोपचार ही इसका एकमात्र और 100% अचूक उपाय है"
    ],
    "products": [
      {
        "name": "Carboxin + Thiram (Vitavax Power)",
        "type": "chemical",
        "brand": "Vitavax Power (Dhanuka)",
        "price": "₹420 – ₹580 / 500g",
        "query": "Carboxin Thiram Vitavax Power"
      },
      {
        "name": "Tebuconazole 2 DS",
        "type": "chemical",
        "brand": "Raxil (Bayer)",
        "price": "₹220 – ₹340 / 100g",
        "query": "Tebuconazole 2 DS Raxil"
      }
    ]
  },
  {
    "crop": "Wheat (ಗೋಧಿ)",
    "cropKn": "ಗೋಧಿ",
    "cropHi": "गेहूं",
    "emoji": "🌾",
    "disease": "Powdery Mildew (Blumeria graminis f.sp. tritici)",
    "diseaseKn": "ಗೋಧಿ ಬೂದಿ ರೋಗ",
    "diseaseHi": "गेहूं चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
    "severity": "Low",
    "remedy": "Spray Wettable Sulphur 80 WP @ 3 g/L or Propiconazole 25 EC @ 1 mL/L upon noticing white powdery patches.",
    "remedyKn": "ಬಿಳಿ ಬೂಷ್ಟು ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "सफेद पाउडर जैसे धब्बे दिखते ही Wettable Sulphur 80 WP @ 3 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Avoid excessive seed rate and overly dense crop stand. Ensure proper sunlight penetration.",
    "preventionKn": "ಅತಿಯಾದ ಬೀಜ ಪ್ರಮಾಣ ಮತ್ತು ದಟ್ಟ ಬಿತ್ತನೆಯನ್ನು ತಪ್ಪಿಸಿ. ಸೂರ್ಯನ ಬೆಳಕು ಸರಾಗವಾಗಿ ಬೀಳುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "preventionHi": "घनी बुवाई से बचें। पौधों तक पर्याप्त धूप पहुंचने की व्यवस्था रखें।",
    "organicTip": "Foliar spray of 10% cow milk or baking soda (Sodium Bicarbonate @ 3 g/L).",
    "organicTipKn": "10% ಹಸುವಿನ ಹಾಲು ಅಥವಾ ಅಡುಗೆ ಸೋಡಾ (Sodium Bicarbonate @ 3 g/L) ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% गाय के दूध या बेकिंग सोडा (3 g/L) का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Avoid excess nitrogen which leads to rank growth and high canopy humidity.",
    "fertilizerKn": "ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ, ಇದು ಎಲೆಗಳನ್ನು ದಟ್ಟವಾಗಿಸಿ ರೋಗ ಹರಡಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ.",
    "fertilizerHi": "अत्यधिक नाइट्रोजन न दें जिससे पत्ते ज्यादा घने होकर फफूंद को बढ़ावा देते हैं।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#64748b",
    "keyTakeaways": [
      "White fluffy talcum-powder like fungal patches covering upper leaf surfaces and stems",
      "Later turns grayish with tiny black cleistothecia embedded inside",
      "Favored by cool, dry, cloudy conditions with high relative humidity"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡದ ಮೇಲೆ ಬಿಳಿ ಟಾಲ್ಕಮ್ ಪೌಡರ್‌ನಂತಹ ಬೂಷ್ಟು ಕಲೆಗಳು ಆವರಿಸುತ್ತವೆ",
      "ನಂತರ ಕಲೆಯು ಬೂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಸಣ್ಣ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಮೋಡ ಕವಿದ ಮತ್ತು ತೇವಾಂಶಭರಿತ ವಾತಾವರಣದಲ್ಲಿ ರೋಗವು ಉಲ್ಬಣಗೊಳ್ಳುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों और तनों पर सफेद पाउडर जैसे रुई के धब्बे जम जाते हैं",
      "बाद में यह धब्बे भूरे हो जाते हैं और इनमें छोटे काले दाने दिखाई देते हैं",
      "बादल वाले और ठंडे मौसम में उच्च आर्द्रता के कारण यह तेजी से फैलता है"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex / Thiovit",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC"
      }
    ]
  },
  {
    "crop": "Jowar / Sorghum (ಜೋಳ)",
    "cropKn": "ಜೋಳ",
    "cropHi": "ज्वार (सोरघम)",
    "emoji": "🌾",
    "disease": "Grain Mold (Curvularia lunata)",
    "diseaseKn": "ಜೋಳದ ಕಾಳು ಬೂಷ್ಟು ರೋಗ",
    "diseaseHi": "ज्वार दाना फफूंद रोग (ग्रेन मोल्ड)",
    "severity": "High",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L at 50% flowering and repeat 10 days later.",
    "remedyKn": "ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ, 10 ದಿನಗಳ ನಂತರ ಪುನರಾವರ್ತಿಸಿ.",
    "remedyHi": "50% फूल आने पर Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें और 10 दिन बाद दोहराएं।",
    "prevention": "Adjust sowing dates so that grain maturation does not coincide with heavy monsoon rains. Harvest immediately at physiological maturity.",
    "preventionKn": "ಕಾಳು ಬಲಿಯುವ ಸಮಯದಲ್ಲಿ ಭಾರಿ ಮಳೆ ಬೀಳದಂತೆ ಬಿತ್ತನೆ ಸಮಯವನ್ನು ಸರಿಹೊಂದಿಸಿ. ತೆನೆ ಮಾಗಿದ ತಕ್ಷಣ ಕಟಾವು ಮಾಡಿ.",
    "preventionHi": "बुवाई का समय ऐसा रखें कि दाना पकते समय भारी बारिश न हो। पकते ही तुरंत कटाई करें।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 2 g/L during anthesis.",
    "organicTipKn": "ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ Pseudomonas fluorescens @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "फूल आते समय Pseudomonas fluorescens @ 2 g/L का छिड़काव करें।",
    "fertilizer": "Apply adequate Potassium and Phosphorus to produce hard, dense grains resistant to fungal penetration.",
    "fertilizerKn": "ಕಾಳುಗಳು ಗಟ್ಟಿಯಾಗಿ ಬೆಳೆಯಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ ಮತ್ತು ರಂಜಕ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "दानों को कठोर और चमकदार बनाने के लिए पर्याप्त पोटाश और फास्फोरस दें।",
    "scheme": "Karnataka Raitha Siri Coarse Millets Scheme",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Pink, black or white discoloration and superficial fungal crusting on grains inside earhead",
      "Causes severe reduction in seed germination, grain hardness, and market value",
      "Grow mold-tolerant varieties like CSV 15 or CSV 20"
    ],
    "keyTakeawaysKn": [
      "ತೆನೆಯೊಳಗಿನ ಕಾಳುಗಳ ಮೇಲೆ ಗುಲಾಬಿ, ಕಪ್ಪು ಅಥವಾ ಬಿಳಿ ಬೂಷ್ಟು ಆವರಿಸಿ ಕಾಳು ಬಣ್ಣಗೆಡುತ್ತದೆ",
      "ಬೀಜದ ಮೊಳಕೆ ಸಾಮರ್ಥ್ಯ, ಕಾಳಿನ ಗಟ್ಟಿತನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಧಾರಣೆಯನ್ನು ತೀವ್ರವಾಗಿ ಕುಗ್ಗಿಸುತ್ತದೆ",
      "CSV 15 ಅಥವಾ CSV 20 ರಂತಹ ಬೂಷ್ಟು ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "बालियों के दानों पर गुलाबी, काली या सफेद फफूंद जम जाती है जिससे दाना बदरंग हो जाता है",
      "बीज के अंकुरण, दाने के वजन और बाजार भाव में भारी गिरावट आती है",
      "CSV 15 या CSV 20 जैसी फफूंद सहनशील किस्मों की खेती करें"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Jowar / Sorghum (ಜೋಳ)",
    "cropKn": "ಜೋಳ",
    "cropHi": "ज्वार (सोरघम)",
    "emoji": "🌾",
    "disease": "Anthracnose & Red Rot (Colletotrichum sublineolum)",
    "diseaseKn": "ಜೋಳದ ಆಂಥ್ರಾಕ್ನೋಸ್ & ಕೆಂಪು ಕೊಳೆ ರೋಗ",
    "diseaseHi": "ज्वार एन्थ्रेक्नोज एवं लाल सड़न रोग",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L when foliar spots first appear.",
    "remedyKn": "ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों पर धब्बे दिखते ही Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Seed treatment with Thiram @ 3 g/kg. Burn crop stubble after harvest to eradicate inoculum.",
    "preventionKn": "Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಕಟಾವಿನ ನಂತರ ಗೂಟಗಳನ್ನು ಸುಟ್ಟುಹಾಕಿ.",
    "preventionHi": "Thiram @ 3 g/kg से बीजोपचार करें। कटाई के बाद ठूंठों को नष्ट करें।",
    "organicTip": "Spray Trichoderma viride @ 5 g/L + Panchagavya 3% at boot leaf stage.",
    "organicTipKn": "ಬೂಟ್ ಲೀಫ್ ಹಂತದಲ್ಲಿ Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 3% ಪಂಚಗವ್ಯ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "बूट लीफ स्टेज पर Trichoderma viride @ 5 g/L और 3% पंचगव्य का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK (80:40:40 kg/ha); avoid excess nitrogen which aggravates leaf lesions.",
    "fertilizerKn": "ಸಮತೋಲಿತ NPK (80:40:40 kg/ha) ನೀಡಿ; ಅತಿಯಾದ ಯೂರಿಯಾ ರೋಗವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    "fertilizerHi": "संतुलित NPK (80:40:40 kg/हेक्टेयर) दें; अत्यधिक यूरिया से रोग बढ़ता है।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Circular to elliptical red/purple leaf spots with straw-colored centers containing black fruiting dots",
      "Internal stalk discoloration turns pith into a bright red or brownish-red color",
      "Practice crop rotation with non-host legume crops"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಮಧ್ಯದಲ್ಲಿ ಒಣಗಿದ ಬೂದು ಮತ್ತು ಅಂಚಿನಲ್ಲಿ ಕೆಂಪು/ನೇರಳೆ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಕಾಂಡದ ಒಳಗಿನ ತಿರುಳು ಗಾಢ ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಒಣಗುತ್ತದೆ",
      "ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर लाल-बैंगनी किनारे और बीच में सूखे भूरे धब्बे बनते हैं",
      "तने का भीतरी भाग गहरा लाल होकर सड़ने लगता है",
      "दलहनी फसलों के साथ नियमित फसल चक्र अपनाएं"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Thiram 75 WP",
        "type": "chemical",
        "brand": "Thiride",
        "price": "₹210 – ₹320 / 500g",
        "query": "Thiram 75 WP"
      }
    ]
  },
  {
    "crop": "Jowar / Sorghum (ಜೋಳ)",
    "cropKn": "ಜೋಳ",
    "cropHi": "ज्वार (सोरघम)",
    "emoji": "🌾",
    "disease": "Sorghum Downy Mildew (Peronosclerospora sorghi)",
    "diseaseKn": "ಜೋಳದ ಬೂದಿ ರೋಗ (ಡೌನಿ ಮಿಲ್ಡ್ಯೂ)",
    "diseaseHi": "ज्वार डाउनी मिल्ड्यू (मृदुरोमिल आसिता)",
    "severity": "High",
    "remedy": "Seed treatment with Metalaxyl 35 WS @ 4 g/kg seed + foliar spray of Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at 20 days after emergence.",
    "remedyKn": "Metalaxyl 35 WS @ 4 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಮೊಳಕೆಯೊಡೆದ 20 ದಿನಗಳಲ್ಲಿ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Metalaxyl 35 WS @ 4 g/kg से बीजोपचार करें एवं उगने के 20 दिन बाद Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L का छिड़काव करें।",
    "prevention": "Rogue out chlorotic and downy-mildewed seedlings within 30 days of sowing. Deep summer ploughing.",
    "preventionKn": "ಬಿತ್ತನೆಯ 30 ದಿನಗಳೊಳಗೆ ಹಳದಿಯಾದ ರೋಗಪೀಡಿತ ಸಸಿಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ.",
    "preventionHi": "बुवाई के 30 दिनों के भीतर पीले संक्रमित पौधों को उखाड़कर नष्ट करें। गर्मियों में गहरी जुताई करें।",
    "organicTip": "Seed coating with Pseudomonas fluorescens @ 10 g/kg seed.",
    "organicTipKn": "Pseudomonas fluorescens @ 10 g/kg ನೊಂದಿಗೆ ಬೀಜ ಲೇಪನ ಮಾಡಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 10 g/kg से बीज उपचारित करें।",
    "fertilizer": "Apply balanced basal nutrition; avoid water stagnation in early stages.",
    "fertilizerKn": "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "शुरुआत में जलभराव न होने दें और संतुलित खाद दें।",
    "scheme": "National Mission on Oilseeds and Oil Palm / Coarse Grains",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#15803d",
    "keyTakeaways": [
      "Vivid pale-yellow striping on leaves followed by white downy growth on lower surface in morning",
      "Later leaves shred into ribbons (\"leaf shredding\") releasing millions of resting oospores",
      "Seed dressing with systemic Metalaxyl provides foolproof early protection"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಎದ್ದು ಕಾಣುವ ಹಳದಿ ಪಟ್ಟಿಗಳು ಮತ್ತು ಮುಂಜಾನೆ ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಕಾಣಿಸುತ್ತದೆ",
      "ನಂತರ ಎಲೆಗಳು ಉದ್ದುದ್ದಕ್ಕೆ ನಾರಿನಂತೆ ಸೀಳಿ ಹೋಗುತ್ತವೆ (ಲೀಫ್ ಶ್ರೆಡ್ಡಿಂಗ್)",
      "ಸಿಸ್ಟಮಿಕ್ ಮೆಟಲಾಕ್ಸಿಲ್ ಬೀಜೋಪಚಾರವು ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ರೋಗ ಬರದಂತೆ ಶೇ. 100ರಷ್ಟು ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर स्पष्ट पीली धारियां बनती हैं और सुबह निचली सतह पर सफेद फफूंद दिखती है",
      "बाद में पत्तियां धागों की तरह फटकर चीर-चीर हो जाती हैं",
      "मेटालेक्सिल से बीजोपचार करने से शुरुआती अवस्था में पूरी सुरक्षा मिलती है"
    ],
    "products": [
      {
        "name": "Metalaxyl 35 WS",
        "type": "chemical",
        "brand": "Apron 35 SD (Syngenta)",
        "price": "₹380 – ₹520 / 100g",
        "query": "Metalaxyl 35 WS"
      },
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      }
    ]
  },
  {
    "crop": "Jowar / Sorghum (ಜೋಳ)",
    "cropKn": "ಜೋಳ",
    "cropHi": "ज्वार (सोरघम)",
    "emoji": "🌾",
    "disease": "Sorghum Shoot Fly (Atherigona soccata)",
    "diseaseKn": "ಜೋಳದ ಸುಳಿ ನೊಣ",
    "diseaseHi": "ज्वार प्ररोह मक्खी (शूट फ्लाई)",
    "severity": "High",
    "remedy": "Seed treatment with Imidacloprid 70 WS @ 5 g/kg seed or Thiamethoxam 30 FS @ 10 mL/kg seed. Spray Chlorpyrifos 20 EC @ 2 mL/L at 7–10 days after germination.",
    "remedyKn": "Imidacloprid 70 WS @ 5 g/kg ಅಥವಾ Thiamethoxam 30 FS @ 10 mL/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಮೊಳಕೆಯೊಡೆದ 7–10 ದಿನಗಳಲ್ಲಿ Chlorpyrifos 20 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Imidacloprid 70 WS @ 5 g/kg या Thiamethoxam 30 FS @ 10 mL/kg से बीजोपचार करें। उगने के 7-10 दिन बाद Chlorpyrifos 20 EC @ 2 mL/L का छिड़काव करें।",
    "prevention": "Early and synchronous sowing immediately after onset of monsoon. Increase seed rate by 20% to rogue dead hearts.",
    "preventionKn": "ಮುಂಗಾರು ಮಳೆ ಆರಂಭವಾದ ತಕ್ಷಣ ಎಲ್ಲರೂ ಒಟ್ಟಾಗಿ ಬೇಗನೆ ಬಿತ್ತನೆ ಮಾಡಿ. ರೋಗಪೀಡಿತ ಒಣಗಿದ ಸುಳಿಗಳನ್ನು ಕಿತ್ತುಹಾಕಲು ಶೇ. 20ರಷ್ಟು ಹೆಚ್ಚಿನ ಬೀಜ ಬಳಸಿ.",
    "preventionHi": "मानसून आते ही तुरंत और एक साथ बुवाई करें। 20% अधिक बीज दर रखें ताकि सूखे पौधों को उखाड़ा जा सके।",
    "organicTip": "Install fish meal traps @ 12/acre to attract and destroy adult shoot flies.",
    "organicTipKn": "ವಯಸ್ಕ ಸುಳಿ ನೊಣಗಳನ್ನು ಆಕರ್ಷಿಸಿ ಕೊಲ್ಲಲು ಎಕರೆಗೆ 12 ಒಣಮೀನಿನ ಬಲೆಗಳನ್ನು (ಫಿಶ್ ಮೀಲ್ ಟ್ರ್ಯಾಪ್) ಅಳವಡಿಸಿ.",
    "organicTipHi": "वयस्क मक्खियों को आकर्षित कर नष्ट करने के लिए 12 फिश मील ट्रैप प्रति एकड़ लगाएं।",
    "fertilizer": "Apply basal fertilizer with P and K to accelerate early seedling vigor and escape fly window.",
    "fertilizerKn": "ಸಸಿಗಳು ಬೇಗನೆ ಬೆಳೆದು ಗಟ್ಟಿಯಾಗಲು ಬಿತ್ತನೆ ವೇಳೆ ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "शुरुआती बढ़त तेज करने के लिए बुवाई पर फास्फोरस और पोटाश खाद अवश्य दें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#d97706",
    "keyTakeaways": [
      "Causes rotting and wilting of central growing shoot producing \"dead heart\" within 3–4 weeks of germination",
      "Dead heart emits a pungent rotting odor when pulled out",
      "Attacks only young seedlings up to 30 days old; seed treatment is the key defense"
    ],
    "keyTakeawaysKn": [
      "ಮೊಳಕೆಯೊಡೆದ 3-4 ವಾರಗಳಲ್ಲಿ ನಡುಸುಳಿಯು ಕೊಳೆತು ಒಣಗಿ \"ಡೆಡ್ ಹಾರ್ಟ್\" ಉಂಟಾಗುತ್ತದೆ",
      "ಒಣಗಿದ ಸುಳಿಯನ್ನು ಎಳೆದಾಗ ದುರ್ವಾಸನೆ ಬರುತ್ತದೆ",
      "30 ದಿನಗಳೊಳಗಿನ ಎಳೆ ಸಸಿಗಳಿಗೆ ಮಾತ್ರ ಕಾಡುವ ಕೀಟ; ಬೀಜೋಪಚಾರವೇ ಇದಕ್ಕೆ ಮುಖ್ಯ ರಕ್ಷಣೆ"
    ],
    "keyTakeawaysHi": [
      "उगने के 3-4 हफ्तों में बीच की मुख्य कली सड़कर सूख जाती है जिसे \"डेड हार्ट\" कहते हैं",
      "सूखे तने को खींचने पर सड़ी हुई दुर्गंध आती है",
      "यह केवल 30 दिन तक के छोटे पौधों पर हमला करती है; बीजोपचार ही सबसे पक्का बचाव है"
    ],
    "products": [
      {
        "name": "Thiamethoxam 30 FS",
        "type": "chemical",
        "brand": "Cruiser (Syngenta)",
        "price": "₹420 – ₹580 / 100mL",
        "query": "Thiamethoxam 30 FS"
      },
      {
        "name": "Chlorpyrifos 20 EC",
        "type": "chemical",
        "brand": "Dursban / Classic",
        "price": "₹260 – ₹380 / 1L",
        "query": "Chlorpyrifos 20 EC"
      }
    ]
  },
  {
    "crop": "Jowar / Sorghum (ಜೋಳ)",
    "cropKn": "ಜೋಳ",
    "cropHi": "ज्वार (सोरघम)",
    "emoji": "🌾",
    "disease": "Ergot / Sugary Disease (Sphacelia sorghi)",
    "diseaseKn": "ಜೋಳದ ಸಿಹಿ ಅಂಟು ರೋಗ (ಎರ್ಗಾಟ್)",
    "diseaseHi": "ज्वार चेपा रोग (अर्गट / शुगरी डिजीज)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Ziram 80 WP @ 2 g/L at time of 50% flowering before honeydew secretion.",
    "remedyKn": "ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಅಂಟು ಸ್ರವಿಸುವ ಮುನ್ನ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Ziram 80 WP @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "50% फूल आने पर चिपचिपा रस निकलने से पहले Mancozeb 75 WP @ 2.5 g/L या Ziram 80 WP @ 2 g/L का छिड़काव करें।",
    "prevention": "Soak seeds in 2% common salt solution (brine); sclerotia will float and can be skimmed off and discarded.",
    "preventionKn": "ಉಪ್ಪುನೀರಿನ (ಶೇ. 2 ಉಪ್ಪು) ದ್ರಾವಣದಲ್ಲಿ ಬೀಜಗಳನ್ನು ಮುಳುಗಿಸಿ; ತೇಲುವ ರೋಗಪೀಡಿತ ಬೀಜಗಳನ್ನು ಹೊರತೆಗೆದು ನಾಶಮಾಡಿ.",
    "preventionHi": "बीजों को 2% नमक के पानी में डालें; ऊपर तैरने वाले फफूंद के दानों को छानकर फेंक दें।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) at panicle emergence.",
    "organicTipKn": "ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "बाली निकलते समय 5% नीम के अर्क का छिड़काव करें।",
    "fertilizer": "Avoid imbalanced fertilization that prolongs flowering during overcast weather.",
    "fertilizerKn": "ಮೋಡ ಕವಿದ ವಾತಾವರಣದಲ್ಲಿ ಹೂವಾಡುವ ಅವಧಿ ದೀರ್ಘವಾಗದಂತೆ ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "फूल आने की अवधि लंबी न हो, इसके लिए संतुलित खाद का ही प्रयोग करें।",
    "scheme": "Raitha Samparka Kendra Extension Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Droplets of sweet pink-to-amber sticky honeydew ooze out of spikelets attracting flies",
      "Later hard, dark horn-like sclerotia develop in place of grains",
      "Grains contaminated with ergot sclerotia are toxic to humans and cattle"
    ],
    "keyTakeawaysKn": [
      "ತೆನೆಯ ಹೂವುಗಳಿಂದ ಗುಲಾಬಿ-ಜೇನಿನಂತಹ ಸಿಹಿ ಜಿಗುಟಾದ ದ್ರವ ತೊಟ್ಟಿಕ್ಕಿ ನೊಣಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ",
      "ನಂತರ ಕಾಳುಗಳ ಜಾಗದಲ್ಲಿ ಕೊಂಬಿನಂತಹ ಗಟ್ಟಿಯಾದ ಕಪ್ಪು ಶಿಲೀಂಧ್ರ ಉಂಡೆಗಳು (ಸ್ಕ್ಲಿರೋಶಿಯಾ) ಬೆಳೆಯುತ್ತವೆ",
      "ಈ ರೋಗಪೀಡಿತ ಕಾಳುಗಳು ಮನುಷ್ಯರಿಗೆ ಮತ್ತು ಜಾನುವಾರುಗಳಿಗೆ ವಿಷಕಾರಿಯಾಗಿವೆ"
    ],
    "keyTakeawaysHi": [
      "बालियों से मीठा, चिपचिपा, शहद जैसा गाढ़ा रस टपकता है जिस पर मक्खियां भिनभिनाती हैं",
      "बाद में दानों की जगह सींग जैसी कठोर काली गांठें बन जाती हैं",
      "इस बीमारी से प्रभावित दाने इंसानों और मवेशियों दोनों के लिए जहरीले होते हैं"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Ziram 80 WP",
        "type": "chemical",
        "brand": "Cuman L / Dhanuka",
        "price": "₹280 – ₹410 / 500g",
        "query": "Ziram 80 WP"
      }
    ]
  },
  {
    "crop": "Cotton (ಹತ್ತಿ)",
    "cropKn": "ಹತ್ತಿ",
    "cropHi": "कपास (कॉटन)",
    "emoji": "🌱",
    "disease": "Pink Bollworm (Pectinophora gossypiella)",
    "diseaseKn": "ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು",
    "diseaseHi": "गुलाबी सुंडी (पिंक बॉलवर्म)",
    "severity": "High",
    "remedy": "Install pheromone traps (Pectino-Lure) @ 8/acre. Spray Profenofos 50 EC @ 2 mL/L or Emamectin Benzoate 5 SG @ 0.4 g/L or Chlorantraniliprole 18.5 SC @ 0.3 mL/L at ETL (8 moths/trap/day).",
    "remedyKn": "ಎಕರೆಗೆ 8 ಪೆಕ್ಟಿನೋ-ಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಕೀಟ ಬಾಧೆ ಮಿತಿ ಮೀರಿದಾಗ Profenofos 50 EC @ 2 mL/L ಅಥವಾ Emamectin Benzoate 5 SG @ 0.4 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "खेत में 8 पेक्टिनो-ल्यूर फेरोमोन ट्रैप प्रति एकड़ लगाएं। कीट दिखने पर Profenofos 50 EC @ 2 mL/L या Emamectin Benzoate 5 SG @ 0.4 g/L का छिड़काव करें।",
    "prevention": "Avoid ratoon cotton crop. Terminate crop by December-January to break pest life cycle. Shred and deep plough stalks.",
    "preventionKn": "ಹತ್ತಿ ಕೂಳೆ ಬೆಳೆಯನ್ನು ಇಡಬೇಡಿ. ಡಿಸೆಂಬರ್-ಜನವರಿ ವೇಳೆಗೆ ಬೆಳೆಯನ್ನು ಮುಕ್ತಾಯಗೊಳಿಸಿ ಕೀಟದ ಜೀವನ ಚಕ್ರವನ್ನು ತುಂಡರಿಸಿ.",
    "preventionHi": "कपास की पेड़ी (रतून) फसल न लें। दिसंबर-जनवरी तक फसल खत्म करके डंठलों को नष्ट करें ताकि कीट का जीवन चक्र टूटे।",
    "organicTip": "Release Trichogramma bactrae egg parasitoid @ 60,000/acre at weekly intervals 4–5 times from flowering.",
    "organicTipKn": "ಹೂವಾಡುವ ಹಂತದಿಂದ ವಾರಕ್ಕೊಮ್ಮೆ Trichogramma bactrae ಪರಾವಲಂಬಿಗಳನ್ನು ಎಕರೆಗೆ 60,000 ದಂತೆ 4–5 ಬಾರಿ ಬಿಡಿ.",
    "organicTipHi": "फूल आने पर साप्ताहिक रूप से Trichogramma bactrae @ 60,000/एकड़ की दर से 4-5 बार छोड़ें।",
    "fertilizer": "Apply 150:75:75 kg NPK/ha. Avoid late excess nitrogen which promotes tender green squares.",
    "fertilizerKn": "ಹೆಕ್ಟೇರ್‌ಗೆ 150:75:75 kg NPK ಗೊಬ್ಬರ ನೀಡಿ. ತಡವಾಗಿ ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 150:75:75 kg NPK दें। देर से ज्यादा यूरिया देने से बचें।",
    "scheme": "Special Pink Bollworm Management Programme (CICR Nagpur)",
    "schemeLink": "https://cicr.org.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Larvae bore inside bolls through tiny pinholes and seal the entry, feeding on developing seeds",
      "Causes \"rosette flowers\", stained damaged lint, and premature boll opening",
      "Install PBW pheromone traps within 45 days of sowing"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುಗಳು ಕಾಯಿಯೊಳಗೆ ನುಗ್ಗಿ ರಂಧ್ರವನ್ನು ಮುಚ್ಚಿಕೊಂಡು ಬೀಜಗಳನ್ನು ತಿನ್ನುತ್ತವೆ",
      "ಗುಲಾಬಿ ಬಣ್ಣದ ಹೂವುಗಳು ಮುದುಡಿ \"ರೊಸೆಟ್ ಹೂವು\"ಗಳಾಗುತ್ತವೆ ಮತ್ತು ಹತ್ತಿಯ ಗುಣಮಟ್ಟ ಹಾಳಾಗುತ್ತದೆ",
      "ಬಿತ್ತನೆಯ 45 ದಿನಗಳ ಒಳಗಾಗಿಯೇ ಫೆರೋಮೊನ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಹೊಲದಲ್ಲಿ ಅಳವಡಿಸಿ"
    ],
    "keyTakeawaysHi": [
      "सुंडी छोटे छेद से गूलर में घुसकर छेद बंद कर लेती है और अंदर के बीजों को खाती है",
      "फूल \"गुलाब के फूल\" जैसे मुड़ जाते हैं और रुई खराब व दागदार हो जाती है",
      "बुवाई के 45 दिनों के भीतर ही फेरोमोन ट्रैप खेत में लगा दें"
    ],
    "products": [
      {
        "name": "Profenofos 50 EC",
        "type": "chemical",
        "brand": "Curacron (Syngenta) / Carina",
        "price": "₹480 – ₹680 / 500mL",
        "query": "Profenofos 50 EC"
      },
      {
        "name": "Emamectin Benzoate 5 SG",
        "type": "chemical",
        "brand": "Proclaim",
        "price": "₹420 – ₹590 / 100g",
        "query": "Emamectin Benzoate 5 SG"
      },
      {
        "name": "Pink Bollworm Pheromone Trap (Pectino-Lure)",
        "type": "organic",
        "brand": "PCI / Agri Lures",
        "price": "₹130 – ₹190 / trap",
        "query": "Pink bollworm pheromone trap lure"
      }
    ]
  },
  {
    "crop": "Cotton (ಹತ್ತಿ)",
    "cropKn": "ಹತ್ತಿ",
    "cropHi": "कपास (कॉटन)",
    "emoji": "🌱",
    "disease": "Bacterial Blight / Black Arm (Xanthomonas citri pv. malvacearum)",
    "diseaseKn": "ಕಪ್ಪು ತೋಳು ರೋಗ (ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್)",
    "diseaseHi": "कपास जीवाणु झुलसा (ब्लैक आर्म रोग)",
    "severity": "High",
    "remedy": "Spray Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L at first notice of angular spots.",
    "remedyKn": "ಕೋನಾಕಾರದ ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Copper Oxychloride 50 WP @ 2.5 g/L ಜೊತೆಗೆ Streptocycline @ 0.1 g/L ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "कोणीय धब्बे दिखते ही Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L मिलाकर छिड़काव करें।",
    "prevention": "Delinting seeds with concentrated Sulphuric Acid (100 mL/kg seed) followed by seed treatment.",
    "preventionKn": "ಬೀಜಗಳಿಗೆ ಸಾರಗುಂದಿದ ಗಂಧಕಾಮ್ಲದಿಂದ ರೋಮ ನಿವಾರಣೆ (ಡಿಲಿಂಟಿಂಗ್) ಮಾಡಿ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "preventionHi": "सल्फ्यूरिक एसिड से बीजों की रुई हटाकर (डिलिंटिंग) उपचारित करें।",
    "organicTip": "Foliar spray of fresh cow dung extract 5% + Copper Hydroxide @ 1.5 g/L.",
    "organicTipKn": "5% ಹಸುವಿನ ಸಗಣಿ ತಿಳಿ ನೀರು ಅಥವಾ Copper Hydroxide @ 1.5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% ताजा गाय के गोबर का अर्क या Copper Hydroxide @ 1.5 g/L का छिड़काव करें।",
    "fertilizer": "Apply adequate Potassium (MOP); Potash enhances plant vascular wall resistance.",
    "fertilizerKn": "ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ಇದು ಗಿಡದ ನರಗಳನ್ನು ಗಟ್ಟಿಗೊಳಿಸಿ ರೋಗ ತಡೆಯುತ್ತದೆ.",
    "fertilizerHi": "पर्याप्त पोटाश डालें; पोटाश तने की नसों को मजबूत बनाकर रोग से बचाता है।",
    "scheme": "Technology Mission on Cotton (TMC)",
    "schemeLink": "https://ministryoftextiles.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Angular water-soaked spots on leaves bounded by veinlets, later turning dark reddish-brown",
      "Elongated black lesions on stems and branches causing \"black arm\" dieback and breakage",
      "Acid delinting destroys seed-borne bacteria completely"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ನರಗಳ ನಡುವೆ ಕೋನಾಕಾರದ ನೀರಿನಂತಹ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ನಂತರ ಕಪ್ಪು-ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ",
      "ಕಾಂಡ ಮತ್ತು ರೆಂಬೆಗಳ ಮೇಲೆ ಉದ್ದನೆಯ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗಿ ರೆಂಬೆಗಳು ಮುರಿದು ಬೀಳುತ್ತವೆ (\"ಕಪ್ಪು ತೋಳು\")",
      "ಆಸಿಡ್ ಡಿಲಿಂಟಿಂಗ್ ಬೀಜದಲ್ಲಿರುವ ಬ್ಯಾಕ್ಟೀರಿಯಾವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಾಶಮಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की नसों के बीच कोणीय पानीदार धब्बे बनते हैं जो बाद में काले-लाल हो जाते हैं",
      "तनों और शाखाओं पर लंबे काले घाव बनते हैं जिससे शाखाएं टूट जाती हैं (ब्लैक आर्म)",
      "एसिड डिलिंटिंग से बीज जनित बैक्टीरिया पूरी तरह खत्म हो जाता है"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox 50",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Streptocycline",
        "type": "chemical",
        "brand": "Hindustan Antibiotics",
        "price": "₹45 – ₹70 / 6g",
        "query": "Streptocycline 6g"
      }
    ]
  },
  {
    "crop": "Cotton (ಹತ್ತಿ)",
    "cropKn": "ಹತ್ತಿ",
    "cropHi": "कपास (कॉटन)",
    "emoji": "🌱",
    "disease": "Grey Mildew / Dahiya (Ramularia areola)",
    "diseaseKn": "ಹತ್ತಿ ಬೂದಿ ರೋಗ (ದಹಿಯಾ)",
    "diseaseHi": "कपास धहिया रोग (ग्रे मिल्ड्यू)",
    "severity": "Medium",
    "remedy": "Spray Wettable Sulphur 80 WP @ 3 g/L or Carbendazim 50 WP @ 1 g/L or Kresoxim-methyl 44.3 SC @ 1 mL/L.",
    "remedyKn": "Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Kresoxim-methyl 44.3 SC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Wettable Sulphur 80 WP @ 3 g/L या Carbendazim 50 WP @ 1 g/L या Kresoxim-methyl 44.3 SC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Wider row spacing (90x60 cm or 120x60 cm) for air circulation. Avoid dense canopy.",
    "preventionKn": "ಸಾಲುಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ (90x60 cm) ಕಾಯ್ದುಕೊಳ್ಳಿ. ಗಾಳಿಯಾಡುವಂತೆ ಮಾಡಿ.",
    "preventionHi": "कतारों में उचित दूरी (90x60 cm) रखें ताकि धूप और हवा मिल सके।",
    "organicTip": "Foliar spray of 10% sour buttermilk or fermented bio-wash.",
    "organicTipKn": "10% ಹುಳಿ ಮಜ್ಜಿಗೆಯ ತಿಳಿ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% खट्टी छाछ के घोल का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Avoid excess nitrogen in late season that stimulates excessive leafy canopy.",
    "fertilizerKn": "ಹಿಂಗಾರು ಹಂತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "फसल के अंतिम चरण में अत्यधिक यूरिया न दें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#64748b",
    "keyTakeaways": [
      "Pale, angular, translucent spots on upper leaf surface with powdery white-gray frost on underside",
      "Causes severe premature defoliation and reduction in boll size",
      "Common in late Kharif when nights are cool and humid"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ತಿಳಿ ಕೋನಾಕಾರದ ಕಲೆಗಳು ಮತ್ತು ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಮಂಜಿನಂತಹ ಬೂಷ್ಟು ಕಾಣಿಸುತ್ತದೆ",
      "ಕಾಯಿಗಳು ಕಟ್ಟುವುದು ಕಡಿಮೆಯಾಗಿ ಎಲೆಗಳು ಅಕಾಲಿಕವಾಗಿ ಉದುರಿಹೋಗುತ್ತವೆ",
      "ತಂಪಾದ ರಾತ್ರಿಗಳು ಮತ್ತು ತೇವಾಂಶವಿರುವ ನವೆಂಬರ್-ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ಹೆಚ್ಚು ಕಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की ऊपरी सतह पर हल्के धब्बे और निचली सतह पर सफेद-धूसर पाउडर जैसी फफूंद जमती है",
      "पत्तियां समय से पहले झड़ जाती हैं और गूलर का आकार छोटा रह जाता है",
      "ठंडी रातों और नम मौसम में यह बीमारी बहुत तेजी से फैलती है"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Kresoxim-methyl 44.3 SC",
        "type": "chemical",
        "brand": "Ergon / Stroby",
        "price": "₹750 – ₹1,050 / 250mL",
        "query": "Kresoxim-methyl 44.3 SC"
      }
    ]
  },
  {
    "crop": "Cotton (ಹತ್ತಿ)",
    "cropKn": "ಹತ್ತಿ",
    "cropHi": "कपास (कॉटन)",
    "emoji": "🌱",
    "disease": "Fusarium Wilt (Fusarium oxysporum f.sp. vasinfectum)",
    "diseaseKn": "ಹತ್ತಿ ಸೊರಗು ರೋಗ (ಫ್ಯುಸಾರಿಯಂ ವಿಲ್ಟ್)",
    "diseaseHi": "कपास उकठा रोग (फ्यूजेरियम विल्ट)",
    "severity": "High",
    "remedy": "Spot drench affected and surrounding plants with Carbendazim 50 WP @ 1.5 g/L or Copper Oxychloride 50 WP @ 3 g/L.",
    "remedyKn": "ಸೊರಗಿದ ಗಿಡಗಳ ಬುಡಕ್ಕೆ Carbendazim 50 WP @ 1.5 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ದ್ರಾವಣದಿಂದ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "प्रभावित और आसपास के पौधों की जड़ों में Carbendazim 50 WP @ 1.5 g/L या Copper Oxychloride 50 WP @ 3 g/L का घोल डालें।",
    "prevention": "Grow wilt-resistant varieties. Follow crop rotation with sorghum or millets for 2–3 seasons.",
    "preventionKn": "ಸೊರಗು ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಜೋಳ ಅಥವಾ ರಾಗಿ ಬೆಳೆಗಳೊಂದಿಗೆ 2-3 ವರ್ಷ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "उकठा रोधी किस्में लगाएं। ज्वार या बाजरे के साथ 2-3 साल का फसल चक्र अपनाएं।",
    "organicTip": "Apply Trichoderma viride @ 2.5 kg/acre mixed in 200 kg neem cake and FYM at sowing.",
    "organicTipKn": "ಬಿತ್ತನೆ ವೇಳೆ ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿದ Trichoderma viride @ 2.5 kg ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "बुवाई के समय नीम की खली और सड़ी खाद में मिलाकर Trichoderma viride @ 2.5 kg प्रति एकड़ डालें।",
    "fertilizer": "Apply Potash (MOP) @ 50 kg/ha to mitigate vascular wilting stress.",
    "fertilizerKn": "ಹೆಕ್ಟೇರ್‌ಗೆ 50 kg ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 50 kg पोटाश खाद डालें।",
    "scheme": "Raitha Sanjeevini Soil Health Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Yellowing, loss of turgidity, drooping, and drying of leaves starting from bottom to top",
      "Characteristic dark brown to black vascular browning visible when stem is split open",
      "Soil-borne fungus; biological soil enrichment is the best preventive method"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಎಲೆಗಳಿಂದ ಆರಂಭವಾಗಿ ಮೇಲಿನವರೆಗೆ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಬಾಡಿ ಒಣಗಿಹೋಗುತ್ತವೆ",
      "ಕಾಂಡವನ್ನು ಸೀಳಿ ನೋಡಿದಾಗ ಒಳಗಿನ ನರಗಳು ಕಂದು-ಕಪ್ಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುತ್ತವೆ",
      "ಮಣ್ಣಿನ ಮೂಲಕ ಹರಡುವ ರೋಗ; ಜೈವಿಕ ಗೊಬ್ಬರ ಹಾಗೂ ಬೇವಿನ ಹಿಂಡಿ ಬಳಕೆ ಅತ್ಯುತ್ತಮ ಪರಿಹಾರ"
    ],
    "keyTakeawaysHi": [
      "निचली पत्तियों से शुरू होकर ऊपर की पत्तियां पीली पड़कर मुरझाने और सूखने लगती हैं",
      "तने को चीरकर देखने पर भीतर की नसें भूरी या काली दिखाई देती हैं",
      "मिट्टी जनित रोग है; ट्राइकोडर्मा और नीम की खली का प्रयोग सबसे असरदार है"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      },
      {
        "name": "Neem Cake Organic Fertilizer",
        "type": "organic",
        "brand": "Agri Neem Cake",
        "price": "₹950 – ₹1,350 / 50kg bag",
        "query": "Neem cake fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Cotton (ಹತ್ತಿ)",
    "cropKn": "ಹತ್ತಿ",
    "cropHi": "कपास (कॉटन)",
    "emoji": "🌱",
    "disease": "Cotton Leaf Curl Virus (CLCuV)",
    "diseaseKn": "ಹತ್ತಿ ಎಲೆ ಮುದುಡು ವೈರಸ್",
    "diseaseHi": "कपास पर्ण कुंचन वायरस (लीफ कर्ल वायरस)",
    "severity": "High",
    "remedy": "Control whitefly vector (Bemisia tabaci) by spraying Diafenthiuron 50 WP @ 1 g/L or Afidopyropen 50 g/L ME @ 2 mL/L or Pyriproxyfen 10% + Fenpropathrin 15% EC @ 1.5 mL/L.",
    "remedyKn": "ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಿಸಲು Diafenthiuron 50 WP @ 1 g/L ಅಥವಾ Afidopyropen 50 g/L @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "सफेद मक्खी की रोकथाम के लिए Diafenthiuron 50 WP @ 1 g/L या Afidopyropen 50 g/L @ 2 mL/L का छिड़काव करें।",
    "prevention": "Eradicate weed hosts like Abutilon indicum and Parthenium. Use yellow sticky traps @ 20/acre.",
    "preventionKn": "ಹೊಲದ ಬದಿಗಳಲ್ಲಿರುವ ಕಳೆ ಗಿಡಗಳನ್ನು ನಾಶಮಾಡಿ. ಎಕರೆಗೆ 20 ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "preventionHi": "खेत की मेड़ों से खरपतवार नष्ट करें। 20 पीले चिपचिपे ट्रैप प्रति एकड़ लगाएं।",
    "organicTip": "Spray 5% Neem seed kernel extract (NSKE) or Neem oil 10000 PPM @ 3 mL/L weekly.",
    "organicTipKn": "ಪ್ರತಿ ವಾರ 5% ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ 10000 PPM @ 3 mL/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "साप्ताहिक रूप से 5% नीम का अर्क या नीम का तेल 10000 PPM @ 3 mL/L का छिड़काव करें।",
    "fertilizer": "Apply Micronutrient spray (Zinc + Boron + Magnesium Sulphate @ 5 g/L) to relieve leaf curling stress.",
    "fertilizerKn": "ಎಲೆ ಮುದುಡುವಿಕೆ ನಿವಾರಿಸಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಸಿಂಪಡಣೆ (Zinc + Boron + MgSO4 @ 5 g/L) ಮಾಡಿ.",
    "fertilizerHi": "पत्तियों के मुड़ने से राहत के लिए सूक्ष्म पोषक तत्व (Zinc + Boron + MgSO4 @ 5 g/L) का छिड़काव करें।",
    "scheme": "Mission for Integrated Development of Agriculture",
    "schemeLink": "https://agricoop.nic.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Upward or downward leaf curling with severe vein thickening on lower leaf surface",
      "Formation of enations (cup-shaped leafy outgrowths) under main veins",
      "Transmitted strictly by whiteflies; keeping whitefly count low is critical"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಅಥವಾ ಕೆಳಮುಖವಾಗಿ ಮುದುಡಿಕೊಂಡು, ನರಗಳು ದಪ್ಪಗಾಗುತ್ತವೆ",
      "ಎಲೆಯ ನರಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬಟ್ಟಲಿನಾಕಾರದ ಎಲೆ ಗಂಟುಗಳು (ಇನೇಶನ್ಸ್) ಉಂಟಾಗುತ್ತವೆ",
      "ಬಿಳಿ ನೊಣಗಳಿಂದ ಮಾತ್ರ ಈ ವೈರಸ್ ಹರಡುತ್ತದೆ; ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣವೇ ಇದಕ್ಕೆ ಮುಖ್ಯ ಪರಿಹಾರ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां ऊपर या नीचे की ओर मुड़ जाती हैं और निचली सतह पर नसें मोटी हो जाती हैं",
      "पत्तियों की मुख्य नसों के नीचे प्याले जैसी छोटी पत्तियां (इनेशन) निकल आती हैं",
      "यह केवल सफेद मक्खी द्वारा फैलता है; सफेद मक्खी पर नियंत्रण ही इसका मुख्य उपाय है"
    ],
    "products": [
      {
        "name": "Diafenthiuron 50 WP",
        "type": "chemical",
        "brand": "Pegasus (Syngenta)",
        "price": "₹620 – ₹880 / 250g",
        "query": "Diafenthiuron 50 WP Pegasus"
      },
      {
        "name": "Afidopyropen 50 g/L ME",
        "type": "chemical",
        "brand": "Sefina (BASF)",
        "price": "₹850 – ₹1,200 / 250mL",
        "query": "Afidopyropen Sefina BASF"
      },
      {
        "name": "Yellow Sticky Traps",
        "type": "organic",
        "brand": "Agri Sticky Traps",
        "price": "₹220 – ₹320 / pack of 10",
        "query": "Yellow sticky traps agriculture"
      }
    ]
  },
  {
    "crop": "Sugarcane (ಕಬ್ಬು)",
    "cropKn": "ಕಬ್ಬು",
    "cropHi": "गन्ना (ईख)",
    "emoji": "🎋",
    "disease": "Red Rot (Colletotrichum falcatum)",
    "diseaseKn": "ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ",
    "diseaseHi": "गन्ना लाल सड़न रोग (रेड रॉट)",
    "severity": "High",
    "remedy": "Treat setts with Carbendazim 50 WP @ 1 g/L or Thiophanate-methyl 70 WP @ 1.5 g/L for 15 minutes before planting. Rogue out infected clumps and apply bleaching powder @ 10 kg/ha in irrigation channel.",
    "remedyKn": "ನಾಟಿ ಮಾಡುವ ಮುನ್ನ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು Carbendazim 50 WP @ 1 g/L ದ್ರಾವಣದಲ್ಲಿ 15 ನಿಮಿಷ ನೆನೆಸಿ. ರೋಗಪೀಡಿತ ಬುಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ.",
    "remedyHi": "बुवाई से पहले गन्ने के टुकड़ों को Carbendazim 50 WP @ 1 g/L में 15 मिनट भिगोएं। रोगी पौधों को उखाड़ें और नाली में ब्लीचिंग पाउडर डालें।",
    "prevention": "Plant certified disease-free setts from nursery crop. Avoid waterlogging; provide deep drainage trenches.",
    "preventionKn": "ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬಿತ್ತನೆ ಕಬ್ಬು ಬಳಸಿ. ನೀರು ನಿಲ್ಲದಂತೆ ಆಳವಾದ ಬಸಿಗಾಲುವೆಗಳನ್ನು ನಿರ್ಮಿಸಿ.",
    "preventionHi": "प्रमाणित रोगमुक्त गन्ने की पौध लगाएं। जलजमाव रोकें और गहरी जल निकासी नालियां बनाएं।",
    "organicTip": "Sett treatment with Trichoderma viride @ 10 g/L + Pseudomonas fluorescens @ 10 g/L for 30 minutes.",
    "organicTipKn": "ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು Trichoderma viride @ 10 g/L ಮತ್ತು Pseudomonas fluorescens @ 10 g/L ದ್ರಾವಣದಲ್ಲಿ 30 ನಿಮಿಷ ನೆನೆಸಿ.",
    "organicTipHi": "टुकड़ों को Trichoderma viride @ 10 g/L और Pseudomonas fluorescens @ 10 g/L में 30 मिनट भिगोएं।",
    "fertilizer": "Apply balanced NPK (250:100:125 kg/ha); avoid excess late nitrogen top-dressing.",
    "fertilizerKn": "ಹೆಕ್ಟೇರ್‌ಗೆ 250:100:125 kg NPK ಗೊಬ್ಬರ ನೀಡಿ; ತಡವಾಗಿ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 250:100:125 kg NPK दें; देर से यूरिया का ऊपरी छिड़काव न करें।",
    "scheme": "Sugarcane Development Programme (SISMA Karnataka)",
    "schemeLink": "https://sugarcane.karnataka.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Third or fourth leaf from top shows yellowing and withering, followed by complete crown drying",
      "Pith shows bright red discoloration with crosswise white patches and alcoholic fermentation odor",
      "\"Cancer of sugarcane\" — completely reject affected fields for seed multiplication"
    ],
    "keyTakeawaysKn": [
      "ಮೇಲಿನ ಮೂರು-ನಾಲ್ಕನೇ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಬಾಡಿ, ಕ್ರಮೇಣ ಇಡೀ ಸುಳಿ ಒಣಗಿಹೋಗುತ್ತದೆ",
      "ಕಬ್ಬನ್ನು ಸೀಳಿದಾಗ ಒಳಗಿನ ತಿರುಳು ಅಡ್ಡಲಾದ ಬಿಳಿ ಪಟ್ಟಿಗಳೊಂದಿಗೆ ಕೆಂಪಾಗಿ ಮದ್ಯದ ವಾಸನೆ ಬೀರುತ್ತದೆ",
      "ಕಬ್ಬಿನ \"ಕ್ಯಾನ್ಸರ್\" ಎಂದು ಕರೆಯಲ್ಪಡುವ ರೋಗ; ರೋಗಪೀಡಿತ ಕಬ್ಬನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಬಿತ್ತನೆಗೆ ಬಳಸಬೇಡಿ"
    ],
    "keyTakeawaysHi": [
      "ऊपर से तीसरी-चौथी पत्ती पीली पड़कर सूखती है और बाद में पूरा अगोला सूख जाता है",
      "चीरने पर भीतरी गूदा चमकदार लाल निकलता है जिसमें सफेद चकत्ते और शराब जैसी गंध आती है",
      "गन्ने का \"कैंसर\" माना जाता है; संक्रमित खेत के गन्ने को कभी भी बीज के लिए न रखें"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin / Dhanustin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Thiophanate-methyl 70 WP",
        "type": "chemical",
        "brand": "Roko (Biostadt)",
        "price": "₹480 – ₹690 / 500g",
        "query": "Thiophanate-methyl 70 WP Roko"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Sugarcane (ಕಬ್ಬು)",
    "cropKn": "ಕಬ್ಬು",
    "cropHi": "गन्ना (ईख)",
    "emoji": "🎋",
    "disease": "Sugarcane Smut (Sporisorium scitamineum)",
    "diseaseKn": "ಕಬ್ಬಿನ ಮಸಿ ರೋಗ (ಸ್ಮಟ್)",
    "diseaseHi": "गन्ना कंडुआ रोग (स्मट)",
    "severity": "High",
    "remedy": "Carefully cover smutted whip with a cloth bag, cut at base, and burn. Dip setts in Propiconazole 25 EC @ 1 mL/L for 15 minutes before planting.",
    "remedyKn": "ಮಸಿ ಚಾವಟಿಯನ್ನು ಬಟ್ಟೆಯ ಚೀಲದಿಂದ ಮುಚ್ಚಿ, ಬುಡದಿಂದ ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ. ನಾಟಿಗೆ ಮುನ್ನ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು Propiconazole 25 EC @ 1 mL/L ನಲ್ಲಿ ನೆನೆಸಿ.",
    "remedyHi": "काले चाबुक को कपड़े की थैली से ढककर नीचे से काटें और जलाएं। बुवाई से पहले टुकड़ों को Propiconazole 25 EC @ 1 mL/L में 15 मिनट डुबोएं।",
    "prevention": "Avoid taking ratoon from a smut-infected crop. Use hot water treated seed setts (52°C for 30 minutes).",
    "preventionKn": "ಮಸಿ ರೋಗಪೀಡಿತ ಕಬ್ಬಿನಿಂದ ಕೂಳೆ ಬೆಳೆ ಇಡಬೇಡಿ. ಬಿಸಿ ನೀರಿನಲ್ಲಿ (52°C ನಲ್ಲಿ 30 ನಿಮಿಷ) ಉಪಚರಿಸಿದ ಬಿತ್ತನೆ ಕಬ್ಬು ಬಳಸಿ.",
    "preventionHi": "कंडुआ लगे खेत से पेड़ी फसल न लें। 52°C गर्म पानी में 30 मिनट उपचारित गन्ने के टुकड़े ही बोएं।",
    "organicTip": "Dip setts in bio-agent Trichoderma harzianum suspension @ 10 g/L.",
    "organicTipKn": "Trichoderma harzianum @ 10 g/L ದ್ರಾವಣದಲ್ಲಿ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು ನೆನೆಸಿ ನಾಟಿ ಮಾಡಿ.",
    "organicTipHi": "Trichoderma harzianum @ 10 g/L के घोल में गन्ने के टुकड़े डुबोकर लगाएं।",
    "fertilizer": "Ensure balanced fertilization with adequate Potash to strengthen rinds.",
    "fertilizerKn": "ಕಬ್ಬಿನ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "गन्ने की बाहरी परत मजबूत करने के लिए पर्याप्त पोटाश खाद दें।",
    "scheme": "State Sugar Commissionerate Subsidy on Certified Seed Setts",
    "schemeLink": "https://sugarcane.karnataka.gov.in/",
    "color": "#475569",
    "keyTakeaways": [
      "Terminal shoot transforms into a long, whip-like unbranched dusty black structure curled like a whip",
      "Whips release millions of sooty black teliospores carried by wind across miles",
      "Always bag before cutting to prevent explosive spore dispersal in field"
    ],
    "keyTakeawaysKn": [
      "ಸುಳಿಯು ಉದ್ದನೆಯ ಚಾವಟಿಯಂತೆ ತಿರುಚಿಕೊಂಡು ಕಪ್ಪು ಮಸಿ ಪುಡಿಯಿಂದ ಆವೃತವಾಗುತ್ತದೆ",
      "ಚಾವಟಿಯಿಂದ ಲಕ್ಷಾಂತರ ಕಪ್ಪು ಮಸಿ ಬೀಜಾಣುಗಳು ಗಾಳಿಯಲ್ಲಿ ಮೈಲಿಗಟ್ಟಲೆ ಹರಡುತ್ತವೆ",
      "ಕತ್ತರಿಸುವ ಮುನ್ನ ಕಡ್ಡಾಯವಾಗಿ ಚೀಲದಿಂದ ಮುಚ್ಚಿ, ಬೀಜಾಣುಗಳು ಗಾಳಿಯಲ್ಲಿ ಹರಡುವುದನ್ನು ತಡೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "मुख्य कली एक लंबे, चाबुक जैसे मुड़े हुए काले पाउडर वाले डंडे में बदल जाती है",
      "इस चाबुक से लाखों काले फफूंद के कण हवा में उड़कर मीलों दूर तक फैलते हैं",
      "काटने से पहले थैली से जरूर ढकें ताकि हवा में काले कण न उड़ें"
    ],
    "products": [
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt (Syngenta)",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Sugarcane (ಕಬ್ಬು)",
    "cropKn": "ಕಬ್ಬು",
    "cropHi": "गन्ना (ईख)",
    "emoji": "🎋",
    "disease": "Grassy Shoot Disease (Phytoplasma)",
    "diseaseKn": "ಕಬ್ಬಿನ ಹುಲ್ಲು ಚಿಗುರು ರೋಗ (GSD)",
    "diseaseHi": "गन्ना घास जैसी पत्तियां रोग (ग्रासी शूट)",
    "severity": "Medium",
    "remedy": "Uproot and destroy diseased stools. Spray Dimethoate 30 EC @ 1.7 mL/L or Malathion 50 EC @ 2 mL/L to control vector aphids (Melanaphis sacchari).",
    "remedyKn": "ರೋಗಪೀಡಿತ ಕಬ್ಬಿನ ಬುಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ. ರೋಗ ಹರಡುವ ಹೇನುಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು Dimethoate 30 EC @ 1.7 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "रोगी थानों को उखाड़कर नष्ट करें। माहू कीट की रोकथाम के लिए Dimethoate 30 EC @ 1.7 mL/L का छिड़काव करें।",
    "prevention": "Aerated Steam Therapy (AST) of seed setts at 54°C for 1 hour. Do not take ratoon from affected crop.",
    "preventionKn": "ಬಿತ್ತನೆ ಕಬ್ಬಿಗೆ ಹಬೆ ಶಾಖೋಪಚಾರ (54°C ನಲ್ಲಿ 1 ಗಂಟೆ) ಮಾಡಿ. ರೋಗಪೀಡಿತ ಬೆಳೆಯಲ್ಲಿ ಕೂಳೆ ಬೆಳೆ ಇಡಬೇಡಿ.",
    "preventionHi": "गन्ने के टुकड़ों को 54°C पर 1 घंटे गर्म भाप से उपचारित करें। संक्रमित फसल की पेड़ी न रखें।",
    "organicTip": "Spray 5% neem seed kernel extract (NSKE) to suppress aphid populations naturally.",
    "organicTipKn": "ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "माहू की रोकथाम के लिए 5% नीम के बीज का अर्क छिड़कें।",
    "fertilizer": "Apply Ferrous Sulphate (FeSO4) @ 25 kg/ha with 50 kg FYM to alleviate severe chlorosis.",
    "fertilizerKn": "ಹಳದಿ ರೋಗ ನಿವಾರಿಸಲು ಹೆಕ್ಟೇರ್‌ಗೆ Ferrous Sulphate @ 25 kg ಗೊಬ್ಬರದೊಂದಿಗೆ ಬೆರೆಸಿ ನೀಡಿ.",
    "fertilizerHi": "पीलापन दूर करने के लिए प्रति हेक्टेयर Ferrous Sulphate @ 25 kg सड़ी खाद में मिलाकर दें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#16a34a",
    "keyTakeaways": [
      "Profuse sprouting of thin, crowded, chlorotic tillers from base giving a bushy grass-like appearance",
      "Canes do not form or remain extremely thin and stunted with nil sugar recovery",
      "Aphid-transmitted phytoplasma; strictly use tissue-cultured disease-free planting material"
    ],
    "keyTakeawaysKn": [
      "ಬುಡದಿಂದ ಅಸಂಖ್ಯಾತ ತೆಳ್ಳನೆಯ ಹಳದಿ ಚಿಗುರುಗಳು ಒಡೆದು ಕಬ್ಬು ಹುಲ್ಲಿನ ಪೊದೆಯಂತೆ ಕಾಣುತ್ತದೆ",
      "ಕಬ್ಬು ಗಂಟು ಕಟ್ಟುವುದಿಲ್ಲ ಅಥವಾ ಅತ್ಯಂತ ತೆಳ್ಳಗಾಗಿ ಸಕ್ಕರೆ ಇಳುವರಿ ಶೂನ್ಯವಾಗುತ್ತದೆ",
      "ಹೇನುಗಳಿಂದ ಹರಡುವ ರೋಗ; ಕಡ್ಡಾಯವಾಗಿ ಅಂಗಾಂಶ ಕೃಷಿಯ ರೋಗಮುಕ್ತ ಕಬ್ಬನ್ನು ಬೆಳೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "तने के आधार से बहुत पतले, पीले कल्ले घने गुच्छों में निकलते हैं और घास का झाड़ बन जाते हैं",
      "गन्ने नहीं बनते या बिल्कुल पतले रह जाते हैं जिससे चीनी का उत्पादन शून्य हो जाता है",
      "माहू द्वारा फैलता है; हमेशा प्रमाणित टिशू कल्चर पौध का ही उपयोग करें"
    ],
    "products": [
      {
        "name": "Dimethoate 30 EC",
        "type": "chemical",
        "brand": "Rogor",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Dimethoate 30 EC Rogor"
      },
      {
        "name": "Ferrous Sulphate 19% Fe",
        "type": "fertilizer",
        "brand": "Multiplex / Agri Grade",
        "price": "₹320 – ₹450 / 10kg",
        "query": "Ferrous Sulphate agriculture"
      }
    ]
  },
  {
    "crop": "Sugarcane (ಕಬ್ಬು)",
    "cropKn": "ಕಬ್ಬು",
    "cropHi": "गन्ना (ईख)",
    "emoji": "🎋",
    "disease": "Early Shoot Borer (Chilo infuscatellus)",
    "diseaseKn": "ಕಬ್ಬಿನ ಮುಂಚಿನ ಸುಳಿ ಕೊರೆಯುವ ಹುಳು",
    "diseaseHi": "गन्ना प्ररोह छेदक (अगेती तना छेदक)",
    "severity": "High",
    "remedy": "Apply Chlorantraniliprole 18.5 SC @ 0.4 mL/L or Fipronil 0.3% GR @ 10 kg/acre in furrows at planting, or spray Chlorantraniliprole 18.5 SC at 35–40 days.",
    "remedyKn": "ನಾಟಿ ವೇಳೆ ಸಾಲಿನಲ್ಲಿ Fipronil 0.3% GR @ 10 kg/acre ಹರಳುಗಳನ್ನು ಹಾಕಿ ಅಥವಾ 35–40 ದಿನಗಳಲ್ಲಿ Chlorantraniliprole 18.5 SC @ 0.4 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "बुवाई के समय Fipronil 0.3% GR @ 10 kg/एकड़ कूड़ों में डालें या 35-40 दिन पर Chlorantraniliprole 18.5 SC @ 0.4 mL/L का छिड़काव करें।",
    "prevention": "Trash mulching @ 3 t/ha at 3 days after planting. Earthing up at 45 days after planting.",
    "preventionKn": "ನಾಟಿಯ 3 ದಿನಗಳಲ್ಲಿ ಎಕರೆಗೆ 1.5 ಟನ್ ಕಬ್ಬಿನ ರವದಿಯನ್ನು ಹೊದಿಸಿ. 45 ದಿನಗಳಲ್ಲಿ ಮಣ್ಣು ಏರಿಸಿ.",
    "preventionHi": "बुवाई के 3 दिन बाद गन्ने की सूखी पत्तियों की मल्चिंग करें। 45 दिन पर पौधों पर मिट्टी चढ़ाएं।",
    "organicTip": "Release egg parasitoid Trichogramma chilonis @ 50,000/acre at weekly intervals from 30 days of planting.",
    "organicTipKn": "ನಾಟಿಯ 30 ದಿನಗಳಿಂದ ವಾರಕ್ಕೊಮ್ಮೆ Trichogramma chilonis ಪರಾವಲಂಬಿಗಳನ್ನು ಎಕರೆಗೆ 50,000 ದಂತೆ ಬಿಡಿ.",
    "organicTipHi": "बुवाई के 30 दिन बाद Trichogramma chilonis @ 50,000/एकड़ साप्ताहिक दर से खेत में छोड़ें।",
    "fertilizer": "Avoid excessive nitrogen in early growth; apply recommended Potash at tillering.",
    "fertilizerKn": "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಹಾಕಬೇಡಿ; ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ ಪೊಟ್ಯಾಶ್ ನೀಡಿ.",
    "fertilizerHi": "शुरुआत में ज्यादा यूरिया न दें; कल्ले फूटते समय पोटाश खाद अवश्य दें।",
    "scheme": "Raitha Samparka Kendra Biocontrol Distribution",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Larva bores into shoot at or near ground level causing \"dead heart\" in shoots up to 3 months old",
      "Dead heart comes out easily when pulled and emits an offensive rotting smell",
      "Trash mulching reduces borer incidence by 60% and conserves soil moisture"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುವು ನೆಲಮಟ್ಟದಲ್ಲಿ ಕಾಂಡವನ್ನು ಕೊರೆದು 3 ತಿಂಗಳೊಳಗಿನ ಎಳೆ ಸುಳಿಗಳನ್ನು ಒಣಗಿಸುತ್ತದೆ (\"ಡೆಡ್ ಹಾರ್ಟ್\")",
      "ಒಣಗಿದ ಸುಳಿಯನ್ನು ಎಳೆದಾಗ ಸುಲಭವಾಗಿ ಕಿತ್ತುಬರುತ್ತದೆ ಮತ್ತು ಕೊಳೆತ ವಾಸನೆ ಬೀರುತ್ತದೆ",
      "ಕಬ್ಬಿನ ರವದಿಯ ಹೊದಿಕೆ ಮಾಡುವುದರಿಂದ ಹುಳುವಿನ ಬಾಧೆ ಶೇ. 60ರಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ ಮತ್ತು ತೇವಾಂಶ ಉಳಿಯುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "कीट जमीन की सतह के पास तने में छेद करके 3 महीने तक के पौधों में \"डेड हार्ट\" बनाता है",
      "मुरझाया अगोला खींचने पर आसानी से निकल आता है और बदबू मारता है",
      "सूखी पत्तियों की मल्चिंग से 60% तक कीट घटता है और जमीन में नमी भी बनी रहती है"
    ],
    "products": [
      {
        "name": "Chlorantraniliprole 18.5 SC (Coragen)",
        "type": "chemical",
        "brand": "FMC Coragen",
        "price": "₹850 – ₹1,150 / 60mL",
        "query": "Chlorantraniliprole 18.5 SC"
      },
      {
        "name": "Fipronil 0.3% GR",
        "type": "chemical",
        "brand": "Regent (Bayer) / Mortar",
        "price": "₹420 – ₹580 / 5kg",
        "query": "Fipronil 0.3 GR"
      }
    ]
  },
  {
    "crop": "Sugarcane (ಕಬ್ಬು)",
    "cropKn": "ಕಬ್ಬು",
    "cropHi": "गन्ना (ईख)",
    "emoji": "🎋",
    "disease": "Pokkah Boeng (Fusarium moniliforme)",
    "diseaseKn": "ಕಬ್ಬಿನ ಪೊಕ್ಕಾ ಬೋಯಿಂಗ್ ರೋಗ (ತಿರುಚು ರೋಗ)",
    "diseaseHi": "गन्ना पोक्का बोइंग रोग (शीर्ष विरूपण)",
    "severity": "Medium",
    "remedy": "Spray Copper Oxychloride 50 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L at the onset of monsoon drizzles.",
    "remedyKn": "ಮುಂಗಾರು ಮಳೆ ಆರಂಭವಾದ ತಕ್ಷಣ Copper Oxychloride 50 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "मानसून की पहली फुहारों के साथ Copper Oxychloride 50 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Avoid highly susceptible varieties like Co 0238. Remove top-rot infected canes.",
    "preventionKn": "Co 0238 ರಂತಹ ಅತಿಯಾಗಿ ರೋಗ ತಗಲುವ ತಳಿಗಳನ್ನು ತಪ್ಪಿಸಿ. ತೀವ್ರವಾಗಿ ಕೊಳೆತ ಕಬ್ಬನ್ನು ತೆಗೆದುಹಾಕಿ.",
    "preventionHi": "Co 0238 जैसी अति-संवेदनशील किस्मों से बचें। गंभीर रूप से सड़े पौधों को उखाड़कर फेंकें।",
    "organicTip": "Foliar spray of Trichoderma harzianum @ 5 g/L with 2% cow urine.",
    "organicTipKn": "Trichoderma harzianum @ 5 g/L ಜೊತೆಗೆ 2% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma harzianum @ 5 g/L के साथ 2% गोमूत्र मिलाकर पत्तियों पर छिड़कें।",
    "fertilizer": "Spray 1% Urea + 1% Potassium Nitrate (13:0:45) after controlling fungal growth to recover shoot vigor.",
    "fertilizerKn": "ಶಿಲೀಂಧ್ರ ನಿಯಂತ್ರಣದ ನಂತರ ಕಬ್ಬಿನ ಚೇತರಿಕೆಗೆ 1% ಯೂರಿಯಾ + 1% ಪೊಟ್ಯಾಶಿಯಂ ನೈಟ್ರೇಟ್ (13:0:45) ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "फफूंद नियंत्रण के बाद 1% यूरिया + 1% पोटेशियम नाइट्रेट (13:0:45) का छिड़काव करें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Chlorosis at leaf base, with leaves becoming crumpled, twisted, deformed, and shortened",
      "In severe \"top rot\" stage, the growing shoot rots completely with reddish lesions",
      "Airborne fungus triggers infection during hot humid cloudy monsoon periods"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಬುಡದಲ್ಲಿ ಹಳದಿಯಾಗಿ, ಎಲೆಗಳು ಸುಕ್ಕುಗಟ್ಟಿ, ತಿರುಚಿಕೊಂಡು ಗಿಡ್ಡವಾಗುತ್ತವೆ",
      "ತೀವ್ರ ಹಂತದಲ್ಲಿ (ಟಾಪ್ ರೊಟ್) ಸುಳಿಯು ಸಂಪೂರ್ಣವಾಗಿ ಕೊಳೆತು ಕೆಂಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಉಷ್ಣ ಮತ್ತು ಮೋಡ ಕವಿದ ಮುಂಗಾರು ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಗಾಳಿಯ ಮೂಲಕ ಈ ರೋಗ ಹರಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों का आधार पीला पड़ जाता है और पत्तियां मुड़कर, सिकुड़कर छोटी रह जाती हैं",
      "गंभीर अवस्था (टॉप रॉट) में अगोला पूरी तरह सड़ जाता है और लाल धारियां बनती हैं",
      "गर्म और नम बादलों वाले मानसून के मौसम में हवा द्वारा यह संक्रमण तेजी से फैलता है"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Potassium Nitrate 13:0:45",
        "type": "fertilizer",
        "brand": "Multiplex / Mahafeed",
        "price": "₹160 – ₹240 / 1kg",
        "query": "Potassium Nitrate 13 0 45"
      }
    ]
  },
  {
    "crop": "Coconut (ತೆಂಗು)",
    "cropKn": "ತೆಂಗು",
    "cropHi": "नारियल",
    "emoji": "🥥",
    "disease": "Rhinoceros Beetle (Oryctes rhinoceros)",
    "diseaseKn": "ಕಪ್ಪು ಕೊಂಬಿನ ಜೀರುಂಡೆ (ರೈನೋಸಿರಸ್ ಜೀರುಂಡೆ)",
    "diseaseHi": "गैंडा भृंग (राइनोसेरोस बीटल)",
    "severity": "High",
    "remedy": "Extract beetles from crown with hooked wire. Place 3 Naphthalene balls (3.5g each) covered with fine sand in bottom 2-3 leaf axils every 45 days.",
    "remedyKn": "ಕೊಕ್ಕೆ ತಂತಿಯಿಂದ ಜೀರುಂಡೆಯನ್ನು ಸುಳಿಯಿಂದ ಹೊರತೆಗೆಯಿರಿ. 2-3 ಎಲೆಗಳ ಬುಡದಲ್ಲಿ ತಲಾ 3 ಡಾಂಬರ್ ಗುಳಿಗೆಗಳನ್ನು ಮರಳಿನೊಂದಿಗೆ ಮುಚ್ಚಿ ಇಡಿ.",
    "remedyHi": "तार के हुक से बीटल को बाहर निकालें। पत्तियों के आधार पर 3 नेफ़थलीन की गोलियां (डामर गोली) रेत से ढककर रखें।",
    "prevention": "Treat farmyard manure pits with Carbaryl 50 WP @ 0.1% or Metarhizium anisopliae to destroy grubs.",
    "preventionKn": "ತಿಪ್ಪೆ ಗುಂಡಿಗಳಿಗೆ Metarhizium anisopliae ಶಿಲೀಂಧ್ರ ಸಿಂಪಡಿಸಿ ಜೀರುಂಡೆಯ ಮರಿಗಳನ್ನು ನಾಶಮಾಡಿ.",
    "preventionHi": "गोबर के गड्ढों में Metarhizium anisopliae डालकर ग्रब (सूंड़ियों) को नष्ट करें।",
    "organicTip": "Spray green muscardine fungus Metarhizium anisopliae @ 5x10^11 spores/m3 of manure pits.",
    "organicTipKn": "ತಿಪ್ಪೆ ಗೊಬ್ಬರದ ಗುಂಡಿಗೆ Metarhizium anisopliae ಹಸಿರು ಶಿಲೀಂಧ್ರವನ್ನು ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "खाद के गड्ढों पर Metarhizium anisopliae फफूंद का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK: 500g N, 320g P2O5, 1200g K2O + 1 kg Magnesium Sulphate per palm/year.",
    "fertilizerKn": "ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕವಾಗಿ 500g N, 320g P, 1200g K ಜೊತೆಗೆ 1 kg ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ ನೀಡಿ.",
    "fertilizerHi": "प्रति पेड़ प्रति वर्ष 500g N, 320g P, 1200g K और 1 kg मैग्नीशियम सल्फेट दें।",
    "scheme": "Coconut Development Board (CDB) Rejuvenation Programme",
    "schemeLink": "https://coconutboard.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "V-shaped or diamond geometric cuts on opened fronds caused by beetle chewing unopened tender spear",
      "Fibrous frass visible at entry borehole in crown",
      "Install Rhinolure pheromone traps @ 1 trap per 2 hectares"
    ],
    "keyTakeawaysKn": [
      "ತೆರೆದ ಗರಿಗಳ ಮೇಲೆ ಇಂಗ್ಲಿಷ್ ‘V’ ಆಕಾರದ ಜ್ಯಾಮಿತೀಯ ಕತ್ತರಿಸಿದ ರಂಧ್ರಗಳು ಕಾಣಿಸುತ್ತವೆ",
      "ಸುಳಿಯ ಬುಡದಲ್ಲಿ ಕತ್ತರಿಸಿದ ತೆಂಗಿನ ನಾರು ಮತ್ತು ಪುಡಿ ಕಂಡುಬರುತ್ತದೆ",
      "ಪ್ರತಿ 2 ಹೆಕ್ಟೇರ್‌ಗೆ ಒಂದರಂತೆ ರೈನೋಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಯನ್ನು ಅಳವಡಿಸಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर अंग्रेजी के ‘V’ आकार के कटे हुए निशान दिखाई देते हैं",
      "पेड़ के शीर्ष पर बोर किए गए छेद से चबाया हुआ रेशा बाहर निकलता है",
      "प्रति 2 हेक्टेयर में एक राइनोल्यूर फेरोमोन ट्रैप अवश्य लगाएं"
    ],
    "products": [
      {
        "name": "Naphthalene Balls (100% Pure)",
        "type": "chemical",
        "brand": "Commercial Pure",
        "price": "₹120 – ₹180 / 500g",
        "query": "Naphthalene balls agriculture"
      },
      {
        "name": "Metarhizium anisopliae Bio-Agent",
        "type": "organic",
        "brand": "Bio-Control Lab",
        "price": "₹190 – ₹270 / 1kg",
        "query": "Metarhizium anisopliae 1kg"
      },
      {
        "name": "Rhinolure Pheromone Trap",
        "type": "organic",
        "brand": "CDB / Pest Control",
        "price": "₹280 – ₹420 / trap",
        "query": "Rhinoceros beetle pheromone trap"
      }
    ]
  },
  {
    "crop": "Coconut (ತೆಂಗು)",
    "cropKn": "ತೆಂಗು",
    "cropHi": "नारियल",
    "emoji": "🥥",
    "disease": "Coconut Bud Rot (Phytophthora palmivora)",
    "diseaseKn": "ತೆಂಗಿನ ಸುಳಿ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "नारियल कली सड़न रोग (बड रॉट)",
    "severity": "High",
    "remedy": "Remove all rotten tissues from central spear. Apply Bordeaux paste (10%) to the cut surface and cover with a perforated polythene cap. Spray 1% Bordeaux mixture on surrounding palms.",
    "remedyKn": "ಕೊಳೆತ ಭಾಗಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತೆಗೆದು 10% ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಲೇಪಿಸಿ. ಸುತ್ತಮುತ್ತಲಿನ ಮರಗಳಿಗೆ 1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "सड़ा हुआ भाग साफ करके 10% बोर्डो पेस्ट लगाएं और प्लास्टिक से ढकें। आसपास के पेड़ों पर 1% बोर्डो मिश्रण छिड़कें।",
    "prevention": "Prophylactic application of 1% Bordeaux mixture before onset of South-West monsoon in May-June.",
    "preventionKn": "ಮುಂಗಾರು ಮಳೆ ಆರಂಭವಾಗುವ ಮುನ್ನ ಮೇ-ಜೂನ್ ತಿಂಗಳಲ್ಲಿ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಸುಳಿಗೆ ಸಿಂಪಡಿಸಿ.",
    "preventionHi": "मानसून शुरू होने से पहले मई-जून में 1% बोर्डो मिश्रण का सुझाई गई मात्रा में छिड़काव करें।",
    "organicTip": "Placement of two Trichoderma viride sachets (10g each) in inner leaf axils of crown.",
    "organicTipKn": "ಸುಳಿಯ ಬುಡದ ಗರಿಗಳಲ್ಲಿ Trichoderma viride ಪೊಟ್ಟಣಗಳನ್ನು ಇರಿಸಿ.",
    "organicTipHi": "पेड़ के शीर्ष पर Trichoderma viride के 2 पाउच रखें।",
    "fertilizer": "Apply 1 kg MOP and 500g Magnesium Sulphate per palm before monsoon to strengthen crown tissues.",
    "fertilizerKn": "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಮರಕ್ಕೆ 1 kg ಪೊಟ್ಯಾಶ್ ಮತ್ತು 500g ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ ನೀಡಿ.",
    "fertilizerHi": "मानसून से पहले प्रति पेड़ 1 kg पोटाश और 500g मैग्नीशियम सल्फेट दें।",
    "scheme": "CDB Coconut Palm Insurance Scheme (CPIS)",
    "schemeLink": "https://coconutboard.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Central spear leaf turns pale, bends over, withers, and rots with foul smell",
      "The entire crown dies once the central bud disintegrates",
      "Immediate action before the spindle rots saves the tree"
    ],
    "keyTakeawaysKn": [
      "ಮರದ ನಡುಸುಳಿ ಹಳದಿಯಾಗಿ, ಬಾಗಿ, ಕೊಳೆತು ದುರ್ವಾಸನೆ ಬೀರುತ್ತದೆ",
      "ಸುಳಿಯು ಸಂಪೂರ್ಣವಾಗಿ ಕೊಳೆತರೆ ಇಡೀ ಮರವೇ ಸತ್ತುಹೋಗುತ್ತದೆ",
      "ಸುಳಿಯು ಸಂಪೂರ್ಣ ನಾಶವಾಗುವ ಮುನ್ನವೇ ಚಿಕಿತ್ಸೆ ನೀಡಿದರೆ ಮರವನ್ನು ಉಳಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "बीच की मुख्य कली पीली होकर झुक जाती है और सड़ी बदबू आने लगती है",
      "एक बार मुख्य कली नष्ट हो जाने पर पूरा नारियल का पेड़ मर जाता है",
      "शुरुआती लक्षण दिखते ही बोर्डो पेस्ट लगाकर पेड़ को बचाया जा सकता है"
    ],
    "products": [
      {
        "name": "Copper Sulphate (Neela Thotha) for Bordeaux",
        "type": "chemical",
        "brand": "Agri Copper Blue",
        "price": "₹240 – ₹360 / 1kg",
        "query": "Copper Sulphate agriculture blue"
      },
      {
        "name": "Bordeaux Mixture Readymade 1%",
        "type": "chemical",
        "brand": "Bordo-Ready / Aries",
        "price": "₹190 – ₹290 / 1kg",
        "query": "Bordeaux mixture ready to use"
      }
    ]
  },
  {
    "crop": "Coconut (ತೆಂಗು)",
    "cropKn": "ತೆಂಗು",
    "cropHi": "नारियल",
    "emoji": "🥥",
    "disease": "Basal Stem Rot / Ganoderma Wilt (Ganoderma lucidum)",
    "diseaseKn": "ಅಣಬೆ ರೋಗ (ಕಾಂಡ ಕೊಳೆ)",
    "diseaseHi": "नारियल तना विगलन (गैनोडर्मा उकठा)",
    "severity": "High",
    "remedy": "Root feeding with Hexaconazole 5 SC @ 2% (20 mL in 100 mL water) per palm at quarterly intervals. Apply 5 kg neem cake + 50g Trichoderma harzianum to soil basin.",
    "remedyKn": "ಪ್ರತಿ 3 ತಿಂಗಳಿಗೊಮ್ಮೆ 20 mL Hexaconazole 5 SC ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ (ರೂಟ್ ಫೀಡಿಂಗ್). ಮರದ ಬುಡಕ್ಕೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು Trichoderma ಹಾಕಿ.",
    "remedyHi": "हर 3 महीने में 20 mL Hexaconazole 5 SC को 100 mL पानी में मिलाकर जड़ द्वारा दें (रूट फीडिंग)। 5 kg नीम की खली और ट्राइकोडर्मा डालें।",
    "prevention": "Isolate affected palms by digging isolation trenches (1m deep, 30cm wide) around basin.",
    "preventionKn": "ರೋಗ ಹರಡದಂತೆ ಮರದ ಸುತ್ತಲೂ 1 ಮೀಟರ್ ಆಳದ ಪ್ರತ್ಯೇಕ ಕಂದಕವನ್ನು (ಐಸೊಲೇಶನ್ ಟ್ರೆಂಚ್) ನಿರ್ಮಿಸಿ.",
    "preventionHi": "संक्रमित पेड़ के चारों ओर 1 मीटर गहरा गड्ढा खोदकर अन्य पेड़ों से अलग करें।",
    "organicTip": "Soil application of Trichoderma viride @ 50g enriched in 50 kg farmyard manure and 5 kg neem cake.",
    "organicTipKn": "50 kg ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು 5 kg ಬೇವಿನ ಹಿಂಡಿಯಲ್ಲಿ 50g Trichoderma ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "50 kg सड़ी गोबर खाद और 5 kg नीम खली में 50g Trichoderma मिलाकर जड़ में डालें।",
    "fertilizer": "Supply abundant Potassium (1.5 kg MOP/palm/year) and avoid waterlogging.",
    "fertilizerKn": "ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕ 1.5 kg ಪೊಟ್ಯಾಶ್ ನೀಡಿ ಮತ್ತು ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "fertilizerHi": "प्रति वर्ष 1.5 kg पोटाश दें और जलजमाव बिल्कुल न होने दें।",
    "scheme": "Karnataka Horticulture Department Disaster Management Support",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Dark reddish-brown gummy bleeding patches at the base of the trunk up to 1.5 meters",
      "Bracket-like woody Ganoderma mushrooms appear at trunk base in terminal stages",
      "Root feeding arrests infection if initiated before crown wilting"
    ],
    "keyTakeawaysKn": [
      "ಕಾಂಡದ ಕೆಳಭಾಗದಲ್ಲಿ 1.5 ಮೀಟರ್ ಎತ್ತರದವರೆಗೆ ಕೆಂಪು-ಕಂದು ಅಂಟು ರಸ ಸೋರುತ್ತದೆ",
      "ಕೊನೆಯ ಹಂತದಲ್ಲಿ ಮರದ ಬುಡದಲ್ಲಿ ಗಟ್ಟಿಯಾದ ಅಣಬೆಗಳು ಬೆಳೆಯುತ್ತವೆ",
      "ಗರಿಗಳು ಒಣಗುವ ಮುನ್ನವೇ ಬೇರಿನ ಮೂಲಕ ಔಷಧಿ ನೀಡಿದರೆ ರೋಗ ನಿಯಂತ್ರಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "तने के निचले हिस्से पर 1.5 मीटर तक गाढ़ा लाल-भूरा गोंद जैसा स्राव निकलता है",
      "अंतिम अवस्था में तने के आधार पर कड़े गैनोडर्मा मशरूम उग आते हैं",
      "अगले चरण में जाने से पहले जड़ द्वारा दवा (रूट फीडिंग) देने से पेड़ बच सकता है"
    ],
    "products": [
      {
        "name": "Hexaconazole 5 SC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 SC Contaf"
      },
      {
        "name": "Neem Cake (Pure Organic)",
        "type": "organic",
        "brand": "Bio Neem Cake",
        "price": "₹950 – ₹1,350 / 50kg",
        "query": "Neem cake fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Coconut (ತೆಂಗು)",
    "cropKn": "ತೆಂಗು",
    "cropHi": "नारियल",
    "emoji": "🥥",
    "disease": "Red Palm Weevil (Rhynchophorus ferrugineus)",
    "diseaseKn": "ಕೆಂಪು ಮೂತಿ ಹುಳು (ರೆಡ್ ಪಾಮ್ ವೀವಿಲ್)",
    "diseaseHi": "लाल ताड़ घुन (रेड पाम वीविल)",
    "severity": "High",
    "remedy": "Stem injection / root feeding with Imidacloprid 17.8 SL @ 10 mL in 100 mL water. Close borehole with cement or clay. Set up Ferrolure pheromone traps @ 1 trap/hectare.",
    "remedyKn": "10 mL Imidacloprid 17.8 SL ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ ಅಥವಾ ಕಾಂಡಕ್ಕೆ ಇಂಜೆಕ್ಷನ್ ಮಾಡಿ. ರಂಧ್ರವನ್ನು ಸಿಮೆಂಟ್‌ನಿಂದ ಮುಚ್ಚಿ.",
    "remedyHi": "10 mL Imidacloprid 17.8 SL को 100 mL पानी में मिलाकर तने में इंजेक्शन दें या जड़ द्वारा दें। छेद को सीमेंट से बंद करें।",
    "prevention": "Avoid cutting green leaves leaving petiole bases. Treat all mechanical wounds with coal tar or copper paste immediately.",
    "preventionKn": "ಹಸಿರು ಗರಿಗಳನ್ನು ಕತ್ತರಿಸಬೇಡಿ. ಯಾವುದೇ ಗಾಯಗಳಾದರೆ ತಕ್ಷಣ ಕೋಲ್‌ಟಾರ್ ಅಥವಾ ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಲೇಪಿಸಿ.",
    "preventionHi": "हरी पत्तियों को न काटें। किसी भी घाव पर तुरंत कोलतार या बोर्डो पेस्ट लगाएं।",
    "organicTip": "Install bucket pheromone traps baited with Ferrolure + fermented sugarcane juice / yeast.",
    "organicTipKn": "ಫೆರೋಲೂರ್ ಜೊತೆಗೆ ಕಬ್ಬಿನ ಹಾಲು ಅಥವಾ ಯೀಸ್ಟ್ ಮಿಶ್ರಣದ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "organicTipHi": "फेरोलूर और गन्ने के रस से युक्त फेरोमोन बकेट ट्रैप लगाएं।",
    "fertilizer": "Maintain tree health with complete organic micronutrient basin management.",
    "fertilizerKn": "ಮರಗಳಿಗೆ ಅಗತ್ಯ ಪೋಷಕಾಂಶ ಹಾಗೂ ಲಘು ಪೋಷಕಾಂಶ ನೀಡಿ ಆರೋಗ್ಯ ಕಾಪಾಡಿ.",
    "fertilizerHi": "संतुलित खाद देकर पेड़ को स्वस्थ रखें।",
    "scheme": "Coconut Development Board Pest Relief Scheme",
    "schemeLink": "https://coconutboard.gov.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Hidden trunk internal feeder; gnawing sound can be heard by placing ear against the trunk",
      "Thick brown liquid oozes from tiny holes on trunk with chewed fibrous frass sticking out",
      "Pheromone trapping captures adult weevils before they lay eggs inside leaf axils"
    ],
    "keyTakeawaysKn": [
      "ಕಾಂಡದ ಒಳಭಾಗದಲ್ಲೇ ತಿನ್ನುವ ಕೀಟ; ಕಾಂಡಕ್ಕೆ ಕಿವಿಗೊಟ್ಟಾಗ ಅಗಿಯುವ ಶಬ್ದ ಕೇಳಿಸುತ್ತದೆ",
      "ಕಾಂಡದ ರಂಧ್ರಗಳಿಂದ ಕಂದು ದ್ರವ ಮತ್ತು ಚೂಪಾದ ನಾರಿನ ಪುಡಿ ಹೊರಬರುತ್ತದೆ",
      "ಮೊಟ್ಟೆ ಇಡುವ ಮುನ್ನವೇ ವಯಸ್ಕ ಮೂತಿ ಹುಳುಗಳನ್ನು ಹಿಡಿಯಲು ಫೆರೋಮೊನ್ ಬಲೆಗಳನ್ನು ಬಳಸಿ"
    ],
    "keyTakeawaysHi": [
      "तने के भीतर छिपकर खाता है; तने पर कान लगाने से चबाने की आवाज साफ सुनाई देती है",
      "तने के छेदों से भूरा तरल और चबाया हुआ रेशा बाहर निकलता दिखाई देता है",
      "अंडे देने से पहले ही वयस्कों को पकड़ने के लिए फेरोमोन ट्रैप लगाएं"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor / Tata Mida",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Ferrolure Weevil Pheromone Trap",
        "type": "organic",
        "brand": "CDB Trap",
        "price": "₹320 – ₹480 / trap",
        "query": "Red palm weevil pheromone trap lure"
      }
    ]
  },
  {
    "crop": "Coconut (ತೆಂಗು)",
    "cropKn": "ತೆಂಗು",
    "cropHi": "नारियल",
    "emoji": "🥥",
    "disease": "Coconut Eriophyid Mite (Aceria guerreronis)",
    "diseaseKn": "ತೆಂಗಿನ ಮೊಗ್ಗು ನುಸಿ (ಎರಿಯೋಫೈಡ್ ನುಸಿ)",
    "diseaseHi": "नारियल माइट (एरियोफिड माइट)",
    "severity": "Medium",
    "remedy": "Root feeding with Azadirachtin 10000 PPM (1%) @ 10 mL in 100 mL water or spray Propargite 57 EC @ 2 mL/L directed onto young buttons (1-3 months old).",
    "remedyKn": "10 mL Azadirachtin (10000 PPM) ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ ಅಥವಾ ಸಣ್ಣ ಕಾಯಿಗಳಿಗೆ (1-3 ತಿಂಗಳ) Propargite 57 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "10 mL Azadirachtin (10000 PPM) को 100 mL पानी में मिलाकर जड़ द्वारा दें या 1-3 महीने की बत्तियों पर Propargite 57 EC @ 2 mL/L का छिड़काव करें।",
    "prevention": "Maintain crown hygiene. Spray water on bunches during dry summer to increase humidity.",
    "preventionKn": "ಗರಿಗಳ ಬುಡವನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಕಾಯಿಗಳ ಗೊಂಚಲುಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸಿ ತೇವಾಂಶ ಕಾಪಾಡಿ.",
    "preventionHi": "पेड़ का शीर्ष साफ रखें। गर्मियों में फल के गुच्छों पर पानी छिड़कें।",
    "organicTip": "Foliar spray of Neem garlic emulsion (2% neem oil + 20g crushed garlic + 5g soap) on young bunches.",
    "organicTipKn": "ಬೇವಿನ ಎಣ್ಣೆ (2%) + ಬೆಳ್ಳುಳ್ಳಿ ಕಷಾಯದ ಮಿಶ್ರಣವನ್ನು ಸಣ್ಣ ಕಾಯಿಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "नीम का तेल (2%) और लहसुन के अर्क का घोल छोटे फलों के गुच्छों पर छिड़कें।",
    "fertilizer": "Apply 1 kg Urea, 1.5 kg DAP, 2 kg MOP, and 50 kg FYM per palm annually to rebuild nut size.",
    "fertilizerKn": "ಕಾಯಿಗಳ ಗಾತ್ರ ಹೆಚ್ಚಿಸಲು ವಾರ್ಷಿಕ 1 kg ಯೂರಿಯಾ, 1.5 kg DAP, 2 kg MOP ಮತ್ತು 50 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "फलों का आकार बढ़ाने के लिए 1 kg यूरिया, 1.5 kg DAP, 2 kg MOP और 50 kg गोबर खाद दें।",
    "scheme": "Coconut Palm Insurance & Quality Enhancement Subsidy",
    "schemeLink": "https://coconutboard.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Pale triangular yellowish-white patches under the perianth (calyx cup) of buttons turning into dark brown warty fissures",
      "Nuts become malformed, stunted, and split with severe shedding of young buttons",
      "Apply neem formulations under calyx tepals where microscopic mites reside"
    ],
    "keyTakeawaysKn": [
      "ಸಣ್ಣ ಕಾಯಿಗಳ ತೊಟ್ಟಿನ ಕೆಳಭಾಗದಲ್ಲಿ ತ್ರಿಕೋನಾಕಾರದ ಬಿಳಿ-ಹಳದಿ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ನಂತರ ಕಂದು ಬಣ್ಣದ ಬಿರುಕುಗಳಾಗುತ್ತವೆ",
      "ಕಾಯಿಗಳು ವಿಕಾರಗೊಂಡು, ಸಣ್ಣದಾಗಿ, ಬಿರುಕು ಬಿಟ್ಟು ಉದುರಿಹೋಗುತ್ತವೆ",
      "ಸೂಕ್ಷ್ಮ ನುಸಿಗಳು ಅಡಗಿರುವ ತೊಟ್ಟಿನ ಕೆಳಭಾಗಕ್ಕೆ ತಲುಪುವಂತೆ ಬೇವಿನ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ"
    ],
    "keyTakeawaysHi": [
      "फल की टोपी (कैलिक्स) के नीचे त्रिकोणीय पीले धब्बे बनते हैं जो बाद में भूरी दरारें बन जाते हैं",
      "नारियल टेढ़े-मेढ़े और छोटे रह जाते हैं तथा समय से पहले झड़ जाते हैं",
      "टोपी के नीचे जहां सूक्ष्म माइट्स छिपे होते हैं, वहां नीम के तेल का छिड़काव करें"
    ],
    "products": [
      {
        "name": "Propargite 57 EC",
        "type": "chemical",
        "brand": "Omite (Dhanuka)",
        "price": "₹480 – ₹680 / 500mL",
        "query": "Propargite 57 EC Omite"
      },
      {
        "name": "Neem Oil 10000 PPM (Azadirachtin 1%)",
        "type": "organic",
        "brand": "Eco-Neem",
        "price": "₹280 – ₹420 / 1L",
        "query": "Neem oil agriculture 10000 ppm"
      }
    ]
  },
  {
    "crop": "Arecanut (ಅಡಿಕೆ)",
    "cropKn": "ಅಡಿಕೆ",
    "cropHi": "सुपारी (अरेकानट)",
    "emoji": "🌴",
    "disease": "Koleroga / Fruit Rot (Phytophthora meadii)",
    "diseaseKn": "ಕೊಳೆ ರೋಗ (ಮಹಾಳಿ)",
    "diseaseHi": "कोलेरोगा (फल सड़न / महाली रोग)",
    "severity": "High",
    "remedy": "Spray 1% Bordeaux mixture before monsoon (May-June) and repeat at 40-day intervals. Fasten polythene bags (Kovera) over arecanut bunches before heavy rains.",
    "remedyKn": "ಮುಂಗಾರು ಆರಂಭಕ್ಕೆ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ (ಮೇ-ಜೂನ್) ಮತ್ತು 40 ದಿನಗಳ ನಂತರ ಪುನರಾವರ್ತಿಸಿ. ಗೊನೆಗಳಿಗೆ ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲಗಳನ್ನು (ಕೋವರ) ಕಟ್ಟಿ ರಕ್ಷಿಸಿ.",
    "remedyHi": "मानसून से पहले (मई-जून) 1% बोर्डो मिश्रण का छिड़काव करें और 40 दिन बाद दोहराएं। भारी बारिश से पहले गुच्छों को पॉलिथीन कवर (कोवेरा) से बांधें।",
    "prevention": "Cover arecanut bunches with UV-stabilized polythene bags before monsoon onset.",
    "preventionKn": "ಮಳೆಗಾಲ ಆರಂಭವಾಗುವ ಮುನ್ನವೇ ಅಡಿಕೆ ಗೊನೆಗಳಿಗೆ ಕವರ್ (ಕೋವರ) ಕಟ್ಟಿ ರಕ್ಷಣೆ ನೀಡಿ.",
    "preventionHi": "मानसून आने से पहले ही सुपारी के गुच्छों पर यूवी पॉलिथीन कवर बांधें।",
    "organicTip": "Apply Trichoderma viride enriched compost around base of palms before monsoon.",
    "organicTipKn": "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಬುಡಕ್ಕೆ Trichoderma viride ಬೆರೆಸಿದ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ನೀಡಿ.",
    "organicTipHi": "मानसून से पहले पेड़ों की जड़ों में ट्राइकोडर्मा युक्त सड़ी खाद डालें।",
    "fertilizer": "Apply 100:40:140 g NPK per palm in two split doses (Sept and Jan).",
    "fertilizerKn": "ಪ್ರತಿ ಮರಕ್ಕೆ 100:40:140 g NPK ಗೊಬ್ಬರವನ್ನು ಸೆಪ್ಟೆಂಬರ್ ಮತ್ತು ಜನವರಿಯಲ್ಲಿ ನೀಡಿ.",
    "fertilizerHi": "प्रति पेड़ 100:40:140 g NPK सितंबर और जनवरी में दो बार में दें।",
    "scheme": "CAMPCO & Karnataka Horticulture Koleroga Subsidy Scheme",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Water-soaked dark green lesions at the base of developing nuts followed by massive nut shedding",
      "Fallen nuts show white felt-like fungal growth in moist ground litter",
      "Bunches must be covered with polythene bags or sprayed with Bordeaux before monsoon rains"
    ],
    "keyTakeawaysKn": [
      "ಅಡಿಕೆ ಕಾಯಿಗಳ ತೊಟ್ಟಿನ ಬಳಿ ಹಸಿರು-ಕಂದು ನೀರಿನ ಕಲೆಗಳು ಉಂಟಾಗಿ ಕಾಯಿಗಳು ರಾಶಿಯಾಗಿ ಉದುರುತ್ತವೆ",
      "ಉದುರಿದ ಅಡಿಕೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂಷ್ಟು ಆವರಿಸುತ್ತದೆ",
      "ಮಳೆಗಾಲ ಆರಂಭವಾಗುವ ಮುನ್ನವೇ ಗೊನೆಗಳಿಗೆ ಕೋವರ ಕಟ್ಟುವುದು ಅಥವಾ ಬೋರ್ಡೋ ಸಿಂಪಡಿಸುವುದು ಅತ್ಯಗತ್ಯ"
    ],
    "keyTakeawaysHi": [
      "सुपारी के डंठल के पास पानीदार धब्बे बनते हैं और कच्ची सुपारियां भारी संख्या में झड़ जाती हैं",
      "जमीन पर गिरी सुपारियों पर सफेद रुई जैसी फफूंद जम जाती है",
      "मानसून से पहले पॉलिथीन कवर बांधना और बोर्डो मिश्रण का छिड़काव ही एकमात्र पक्का उपाय है"
    ],
    "products": [
      {
        "name": "Copper Sulphate (Bordeaux input)",
        "type": "chemical",
        "brand": "Agri Copper Blue",
        "price": "₹240 – ₹360 / 1kg",
        "query": "Copper Sulphate agriculture blue"
      },
      {
        "name": "Ready-to-use Bordeaux Mixture 1%",
        "type": "chemical",
        "brand": "Bordo-Ready",
        "price": "₹190 – ₹290 / 1kg",
        "query": "Bordeaux mixture ready to use"
      },
      {
        "name": "Arecanut Bunch Polythene Covers (Kovera)",
        "type": "organic",
        "brand": "UV Agro Cover",
        "price": "₹350 – ₹480 / 100 bags",
        "query": "Arecanut bunch cover bag"
      }
    ]
  },
  {
    "crop": "Arecanut (ಅಡಿಕೆ)",
    "cropKn": "ಅಡಿಕೆ",
    "cropHi": "सुपारी (अरेकानट)",
    "emoji": "🌴",
    "disease": "Yellow Leaf Disease (Phytoplasma)",
    "diseaseKn": "ಅಡಿಕೆ ಹಳದಿ ಎಲೆ ರೋಗ (YLD)",
    "diseaseHi": "सुपारी पीली पत्ती रोग (येलो लीफ डिजीज)",
    "severity": "High",
    "remedy": "Apply 1 kg Magnesium Sulphate + 2 kg Potassium Chloride (MOP) + 12 kg Neem cake per palm annually to arrest symptom spread. Eradicate severely declined palms.",
    "remedyKn": "ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕ 1 kg ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ + 2 kg ಪೊಟ್ಯಾಶ್ + 12 kg ಬೇವಿನ ಹಿಂಡಿ ನೀಡಿ. ಸಂಪೂರ್ಣ ಹಾಳಾದ ಮರಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.",
    "remedyHi": "प्रति वर्ष प्रति पेड़ 1 kg मैग्नीशियम सल्फेट + 2 kg पोटाश + 12 kg नीम की खली दें। अधिक प्रभावित पेड़ों को हटा दें।",
    "prevention": "Maintain excellent drainage during monsoon. Intercrop with banana, pepper, or cocoa to boost microclimate balance.",
    "preventionKn": "ಮಳೆಗಾಲದಲ್ಲಿ ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬಸಿಗಾಲುವೆಗಳನ್ನು ಮಾಡಿ. ಕಾಳುಮೆಣಸು, ಬಾಳೆ ಅಥವಾ ಕೋಕೋ ಮಿಶ್ರಬೆಳೆ ಬೆಳೆಯಿರಿ.",
    "preventionHi": "उत्तम जल निकासी रखें। केले, काली मिर्च या कोको के साथ मिश्रित खेती करें।",
    "organicTip": "Apply 25 kg enriched compost with biofertilizers (VAM + Azospirillum + Phosphobacteria @ 50g each).",
    "organicTipKn": "ಪ್ರತಿ ಮರಕ್ಕೆ 25 kg ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಜೊತೆಗೆ ಜೈವಿಕ ಗೊಬ್ಬರಗಳನ್ನು (VAM + Azospirillum) ಬೆರೆಸಿ ನೀಡಿ.",
    "organicTipHi": "प्रति पेड़ 25 kg सड़ी खाद में VAM और एजोस्पिरिलम जैव उर्वरक मिलाकर डालें।",
    "fertilizer": "Supply micronutrient blend (Zinc + Boron + Manganese @ 100g/palm/year).",
    "fertilizerKn": "ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕ 100g ಲಘು ಪೋಷಕಾಂಶಗಳ ಮಿಶ್ರಣ (Zinc + Boron + Mn) ನೀಡಿ.",
    "fertilizerHi": "प्रति पेड़ 100g सूक्ष्म पोषक तत्व (जिंक + बोरॉन) प्रति वर्ष दें।",
    "scheme": "Special Arecanut Yellow Leaf Relief Package (Karnataka Govt)",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#eab308",
    "keyTakeaways": [
      "Golden-yellow chlorosis beginning at tips of leaflets in lower whorls advancing inwards",
      "Root system rots and darkens leading to kernel turning soft, black, and non-chewable (chali degradation)",
      "Vector transmitted phytoplasma; balanced nutrition and proper drainage prolong productivity"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಗರಿಗಳ ತುದಿಯಿಂದ ಆರಂಭವಾಗಿ ಚಿನ್ನದ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಒಳಗಿನ ಗರಿಗಳಿಗೆ ಹರಡುತ್ತದೆ",
      "ಬೇರುಗಳು ಕೊಳೆತು ಕಪ್ಪಾಗುತ್ತವೆ ಮತ್ತು ಅಡಿಕೆ ಕಾಳುಗಳು ಮೆದುವಾಗಿ, ಕಪ್ಪಾಗಿ ಗುಣಮಟ್ಟ ಹಾಳಾಗುತ್ತದೆ",
      "ಕೀಟಗಳಿಂದ ಹರಡುವ ರೋಗ; ಸಮತೋಲಿತ ಪೋಷಕಾಂಶ ಮತ್ತು ಉತ್ತಮ ಬಸಿಗಾಲುವೆ ಮರದ ಆಯಸ್ಸನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "निचली पत्तियों की नोक से सुनहरा पीलापन शुरू होकर अंदर की ओर बढ़ता है",
      "जड़ें सड़कर काली हो जाती हैं और सुपारी अंदर से मुलायम और काली पड़ जाती है",
      "संतुलित खाद और जल निकासी से प्रभावित पेड़ों की पैदावार बचाई जा सकती है"
    ],
    "products": [
      {
        "name": "Magnesium Sulphate (Agri Grade)",
        "type": "fertilizer",
        "brand": "Multiplex / Aries",
        "price": "₹450 – ₹650 / 25kg",
        "query": "Magnesium Sulphate agriculture 25kg"
      },
      {
        "name": "MOP (Muriate of Potash)",
        "type": "fertilizer",
        "brand": "IFFCO Potash",
        "price": "₹1,650 – ₹1,800 / 50kg",
        "query": "MOP Potash fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Arecanut (ಅಡಿಕೆ)",
    "cropKn": "ಅಡಿಕೆ",
    "cropHi": "सुपारी (अरेकानट)",
    "emoji": "🌴",
    "disease": "Anabe Roga / Foot Rot (Ganoderma lucidum)",
    "diseaseKn": "ಅಣಬೆ ರೋಗ (ಅಡಿಕೆ ಬುಡ ಕೊಳೆ)",
    "diseaseHi": "अनाबे रोगा (सुपारी पाद विगलन / गैनोडर्मा)",
    "severity": "High",
    "remedy": "Root feeding with Hexaconazole 5 SC @ 2% (20 mL in 100 mL water) 3 times a year. Drench soil around trunk with Captan 50 WP @ 3 g/L.",
    "remedyKn": "ವರ್ಷಕ್ಕೆ 3 ಬಾರಿ 20 mL Hexaconazole 5 SC ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ (ರೂಟ್ ಫೀಡಿಂಗ್). ಬುಡಕ್ಕೆ Captan @ 3 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "साल में 3 बार 20 mL Hexaconazole 5 SC को 100 mL पानी में जड़ द्वारा दें। तने के चारों ओर Captan @ 3 g/L का घोल डालें।",
    "prevention": "Dig isolation trenches around infected palms. Burn uprooted infected stumps and roots.",
    "preventionKn": "ರೋಗಪೀಡಿತ ಮರಗಳ ಸುತ್ತಲೂ ಕಂದಕ ನಿರ್ಮಿಸಿ. ಒಣಗಿದ ಬುಡ ಮತ್ತು ಬೇರುಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.",
    "preventionHi": "संक्रमित पेड़ों के चारों तरफ खाई बनाएं। रोगी ठूंठों और जड़ों को उखाड़कर जलाएं।",
    "organicTip": "Apply 5 kg neem cake + 50g Trichoderma viride enriched FYM per palm every six months.",
    "organicTipKn": "ಪ್ರತಿ 6 ತಿಂಗಳಿಗೊಮ್ಮೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು Trichoderma viride ಬೆರೆಸಿದ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ನೀಡಿ.",
    "organicTipHi": "हर 6 महीने में 5 kg नीम खली और ट्राइकोडर्मा युक्त खाद प्रति पेड़ डालें।",
    "fertilizer": "Apply balanced organic nutrition; avoid damaging roots during weeding and intercultural operations.",
    "fertilizerKn": "ಕಳೆ ಕೀಳುವಾಗ ಮರದ ಬೇರುಗಳಿಗೆ ಗಾಯವಾಗದಂತೆ ಎಚ್ಚರವಹಿಸಿ.",
    "fertilizerHi": "निराई-गुड़ाई के समय जड़ों को कटने से बचाएं।",
    "scheme": "Raitha Sanjeevini Disease Control Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Yellowing of lower fronds which droop down and remain clinging around the stem",
      "Trunk shows dark brown bleeding patches from ground up to 1 meter",
      "Bracket-shaped woody mushrooms sprout at the base of the dead trunk"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಗರಿಗಳು ಹಳದಿಯಾಗಿ ಕೆಳಮುಖವಾಗಿ ಬಾಗಿ ಕಾಂಡಕ್ಕೆ ನೇತಾಡುತ್ತವೆ",
      "ಬುಡದ ಕಾಂಡದಿಂದ ಕಂದು ಬಣ್ಣದ ಅಂಟು ಸೋರುತ್ತದೆ",
      "ಸತ್ತ ಮರದ ಬುಡದಲ್ಲಿ ಮರದಂತಹ ಗಟ್ಟಿಯಾದ ಅಣಬೆಗಳು ಬೆಳೆಯುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "निचली पत्तियां पीली पड़कर नीचे लटक जाती हैं और तने से चिपकी रहती हैं",
      "तने के निचले हिस्से से गहरा भूरा स्राव बहने लगता है",
      "पेड़ के सूखने पर तने के आधार पर कड़े मशरूम निकल आते हैं"
    ],
    "products": [
      {
        "name": "Hexaconazole 5 SC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 SC Contaf"
      },
      {
        "name": "Neem Cake Organic Fertilizer",
        "type": "organic",
        "brand": "Pure Agro Neem Cake",
        "price": "₹950 – ₹1,350 / 50kg",
        "query": "Neem cake fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Arecanut (ಅಡಿಕೆ)",
    "cropKn": "ಅಡಿಕೆ",
    "cropHi": "सुपारी (अरेकानट)",
    "emoji": "🌴",
    "disease": "Inflorescence Dieback & Button Shedding (Colletotrichum gloeosporioides)",
    "diseaseKn": "ಹಿಂಗಾರ ಒಣಗುವಿಕೆ & ಕಾಯಿ ಉದುರುವಿಕೆ",
    "diseaseHi": "सुपारी पुष्पक्रम का सूखना एवं बटन गिरना",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Carbendazim 50 WP @ 1 g/L or Copper Oxychloride 50 WP @ 2.5 g/L on newly opened inflorescences.",
    "remedyKn": "ಹೊಸದಾಗಿ ಅರಳಿದ ಹಿಂಗಾರಗಳ ಮೇಲೆ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "नए खुले पुष्पक्रमों पर Mancozeb 75 WP @ 2 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Remove and destroy dried inflorescences and infected buttons. Provide honeybee hives to improve pollination.",
    "preventionKn": "ಒಣಗಿದ ಹಿಂಗಾರಗಳು ಮತ್ತು ಉದುರಿದ ಕಾಯಿಗಳನ್ನು ತೆಗೆದು ನಾಶಮಾಡಿ. ಪರಾಗಸ್ಪರ್ಶ ಹೆಚ್ಚಿಸಲು ಜೇನುಪೆಟ್ಟಿಗೆಗಳನ್ನು ಇಡಿ.",
    "preventionHi": "सूखे पुष्पक्रमों को काटकर जलाएं। परागण सुधारने के लिए मधुमक्खी के बक्से रखें।",
    "organicTip": "Foliar spray of 5% cow urine + Pseudomonas fluorescens @ 2 g/L on inflorescences.",
    "organicTipKn": "ಹಿಂಗಾರದ ಮೇಲೆ 5% ಗೋಮೂತ್ರ ಮತ್ತು Pseudomonas fluorescens @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "पुष्पक्रम पर 5% गोमूत्र और Pseudomonas fluorescens @ 2 g/L का छिड़काव करें।",
    "fertilizer": "Spray Boron (Solubor 20%) @ 1 g/L during flowering to improve fruit set and reduce button drop.",
    "fertilizerKn": "ಕಾಯಿ ಕಚ್ಚುವಿಕೆ ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಕಾಯಿ ಉದುರುವಿಕೆ ತಡೆಯಲು ಹೂವಾಡುವಾಗ ಬೋರಾನ್ (Solubor 20%) @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "फूल आते समय फल का ठहराव बढ़ाने के लिए बोरॉन (Solubor 20%) @ 1 g/L का छिड़काव करें।",
    "scheme": "National Horticulture Mission (NHM)",
    "schemeLink": "https://midh.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Male flowers show brown spots, dry up, and rachis branches blacken from tip downwards",
      "Female buttons fail to set and drop off in large quantities leaving bare broom-like bunches",
      "Boron application combined with protective fungicide spray doubles nut set"
    ],
    "keyTakeawaysKn": [
      "ಗಂಡು ಹೂವುಗಳ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗಿ, ರೆಂಬೆಗಳ ತುದಿಯಿಂದ ಬುಡದವರೆಗೆ ಕಪ್ಪಾಗಿ ಒಣಗುತ್ತವೆ",
      "ಹೆಣ್ಣು ಹೂವುಗಳು (ಅಡಿಕೆ ಕಾಯಿಗಳು) ಕಚ್ಚದೆ ರಾಶಿಯಾಗಿ ಉದುರಿ ಕೇವಲ ಪೊರಕೆಯಂತಹ ಕಡ್ಡಿಗಳು ಉಳಿಯುತ್ತವೆ",
      "ಬೋರಾನ್ ಮತ್ತು ಶಿಲೀಂಧ್ರನಾಶಕದ ಸಿಂಪಡಣೆಯು ಅಡಿಕೆ ಕಾಯಿ ಕಟ್ಟುವಿಕೆಯನ್ನು ದ್ವಿಗುಣಗೊಳಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "नर फूलों पर भूरे धब्बे बनते हैं और टहनियां ऊपर से नीचे की ओर काली होकर सूख जाती हैं",
      "मादा फूल (बटन) बिना फल बने झड़ जाते हैं और झाड़ू जैसी खाली डंडियां बचती हैं",
      "बोरॉन और फफूंदनाशक का छिड़काव करने से फलों का ठहराव दोगुना हो जाता है"
    ],
    "products": [
      {
        "name": "Solubor Boron 20%",
        "type": "fertilizer",
        "brand": "Multiplex / Aries Boron",
        "price": "₹220 – ₹320 / 500g",
        "query": "Solubor Boron 20 agriculture"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Arecanut (ಅಡಿಕೆ)",
    "cropKn": "ಅಡಿಕೆ",
    "cropHi": "सुपारी (अरेकानट)",
    "emoji": "🌴",
    "disease": "Spindle Bug (Carvalhoia arecae)",
    "diseaseKn": "ಅಡಿಕೆ ಸುಳಿ ತಿಗಣೆ ರೋಗ",
    "diseaseHi": "सुपारी स्पिंडल बग (सुंडी कीट)",
    "severity": "Medium",
    "remedy": "Drench inner leaf axils with Imidacloprid 17.8 SL @ 0.5 mL/L or Dimethoate 30 EC @ 1.5 mL/L.",
    "remedyKn": "ಸುಳಿಯ ಬುಡದ ಗರಿಗಳಿಗೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Dimethoate 30 EC @ 1.5 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों के आधार में Imidacloprid 17.8 SL @ 0.5 mL/L या Dimethoate 30 EC @ 1.5 mL/L का घोल डालें।",
    "prevention": "Clean tree crowns before monsoon. Avoid excessive shading in young plantations.",
    "preventionKn": "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಮರದ ಸುಳಿಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ. ಎಳೆ ತೋಟಗಳಲ್ಲಿ ಅತಿಯಾದ ನೆರಳು ಇರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "preventionHi": "मानसून से पहले पेड़ों का शीर्ष साफ रखें। छोटे बागानों में ज्यादा छाया न रहने दें।",
    "organicTip": "Spray 5% neem seed kernel extract (NSKE) or Neem oil 10000 PPM @ 2 mL/L into the spindle axil.",
    "organicTipKn": "ಸುಳಿಯ ಎಲೆಗಳ ಸಂದಿನಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "सुपारी की कली के बीच 5% नीम का अर्क या नीम का तेल @ 2 mL/L का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK to promote rapid spear leaf expansion.",
    "fertilizerKn": "ಸುಳಿ ಎಲೆಗಳು ಬೇಗನೆ ಅರಳಲು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "पत्तियों के तेजी से फैलाव के लिए संतुलित खाद दें।",
    "scheme": "Raitha Samparka Kendra Extension Advisory",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#d97706",
    "keyTakeaways": [
      "Bright red-and-black bugs live in colonies inside unopened spindle leaves feeding on sap",
      "Leaves open with linear holes, shredded appearance, and brown necrosed lesions",
      "Target insecticide directly into the uppermost spindle whorl"
    ],
    "keyTakeawaysKn": [
      "ತೆರೆಯದ ಸುಳಿಯೊಳಗೆ ಕೆಂಪು-ಕಪ್ಪು ಬಣ್ಣದ ತಿಗಣೆಗಳು ಗುಂಪಾಗಿ ಕುಳಿತು ರಸ ಹೀರುತ್ತವೆ",
      "ಎಲೆಗಳು ತೆರೆದಾಗ ರಂಧ್ರಗಳಿಂದ ಜರಡಿಯಂತೆ ಹರಿದು ಒಣಗಿ ಕಾಣುತ್ತವೆ",
      "ಔಷಧಿಯನ್ನು ನೇರವಾಗಿ ತುದಿಯ ಸುಳಿಯ ಎಲೆಗಳ ಸಂದಿಗೆ ಬೀಳುವಂತೆ ಸಿಂಪಡಿಸಿ"
    ],
    "keyTakeawaysHi": [
      "लाल-काले रंग के कीड़े न खुली कली के अंदर झुंड बनाकर रस चूसते हैं",
      "पत्तियां खुलने पर कटी-फटी और छेद वाली जालीदार दिखती हैं",
      "कीटनाशक को सीधे सबसे ऊपर की नई कली के जोड़ों में डालें"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Neem Oil 10000 PPM",
        "type": "organic",
        "brand": "Eco-Neem",
        "price": "₹220 – ₹350 / 1L",
        "query": "Neem oil agriculture 10000 ppm"
      }
    ]
  },
  {
    "crop": "Coffee (ಕಾಫಿ)",
    "cropKn": "ಕಾಫಿ",
    "cropHi": "कॉफी",
    "emoji": "☕",
    "disease": "Coffee Leaf Rust (Hemileia vastatrix)",
    "diseaseKn": "ಕಾಫಿ ಎಲೆ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "कॉफी रतुआ रोग (लीफ रस्ट)",
    "severity": "High",
    "remedy": "Pre-monsoon spray with 0.5% Bordeaux mixture (May-June). Post-monsoon spray with Hexaconazole 5 EC @ 1 mL/L or Epoxiconazole + Pyraclostrobin (Opera) @ 1 mL/L.",
    "remedyKn": "ಮುಂಗಾರಿಗೆ ಮುನ್ನ (ಮೇ-ಜೂನ್) 0.5% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ. ಮುಂಗಾರಿನ ನಂತರ Hexaconazole 5 EC @ 1 mL/L ಅಥವಾ Opera @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "मानसून से पहले 0.5% बोर्डो मिश्रण छिड़कें। मानसून के बाद Hexaconazole 5 EC @ 1 mL/L या Opera @ 1 mL/L का छिड़काव करें।",
    "prevention": "Prune dead and dense branches to maintain two-tier shade trees. Grow rust-resistant varieties like Sln 795 or Chandragiri.",
    "preventionKn": "ಒಣಗಿದ ರೆಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಸೂರ್ಯನ ಬೆಳಕು ಬೀಳುವಂತೆ ನೆರಳು ನಿರ್ವಹಣೆ ಮಾಡಿ. ಚಂದ್ರಗಿರಿ ಅಥವಾ Sln 795 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "सूखी टहनियों की छंटाई करें ताकि धूप छनकर आ सके। चंद्रागिरी जैसी रतुआ रोधी किस्में लगाएं।",
    "organicTip": "Spray fermented herbal cow urine extract + 1% Bordeaux spray early season.",
    "organicTipKn": "ಹರ್ಬಲ್ ಗೋಮೂತ್ರ ಕಷಾಯ ಮತ್ತು 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "गोमूत्र का अर्क और 1% बोर्डो मिश्रण का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK: 140:90:140 kg/ha in 3 split doses (pre-monsoon, mid-monsoon, post-monsoon).",
    "fertilizerKn": "ಹೆಕ್ಟೇರ್‌ಗೆ 140:90:140 kg NPK ಗೊಬ್ಬರವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 140:90:140 kg NPK तीन बार में (मानसून पूर्व, मध्य और बाद में) दें।",
    "scheme": "Coffee Board of India Replanting & Mechanization Subsidy",
    "schemeLink": "https://coffeeboard.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Yellowish-orange powdery circular lesions on lower leaf surfaces turning into brown necrotic spots",
      "Causes massive defoliation leaving twigs bare (\"dieback\") and reducing next season flower buds",
      "Timely pre-monsoon and post-monsoon sprays provide complete protection"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಕಿತ್ತಳೆ-ಹಳದಿ ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ನಂತರ ಕಂದು ಕಲೆಗಳಾಗುತ್ತವೆ",
      "ಎಲೆಗಳು ಉದುರಿ ರೆಂಬೆಗಳು ಒಣಗುತ್ತವೆ (ಡೈಬ್ಯಾಕ್) ಮತ್ತು ಮುಂದಿನ ವರ್ಷದ ಬೆಳೆ ಇಳುವರಿ ಕುಸಿಯುತ್ತದೆ",
      "ಮುಂಗಾರು ಪೂರ್ವ ಮತ್ತು ಮುಂಗಾರು ನಂತರದ ಸರಿಯಾದ ಸಿಂಪಡಣೆಯಿಂದ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ಸಾಧ್ಯ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की निचली सतह पर नारंगी-पीले पाउडर के गोल चकत्ते बनते हैं जो बाद में सूख जाते हैं",
      "पत्तियां झड़ जाती हैं और टहनियां सूख जाती हैं (डाईबैक), जिससे अगली फसल मारी जाती है",
      "मानसून से पहले और बाद का समयबद्ध छिड़काव ही इसकी सबसे पक्की सुरक्षा है"
    ],
    "products": [
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC Contaf"
      },
      {
        "name": "Pyraclostrobin + Epoxiconazole (Opera)",
        "type": "chemical",
        "brand": "Opera (BASF)",
        "price": "₹980 – ₹1,450 / 500mL",
        "query": "Opera BASF fungicide"
      }
    ]
  },
  {
    "crop": "Coffee (ಕಾಫಿ)",
    "cropKn": "ಕಾಫಿ",
    "cropHi": "कॉफी",
    "emoji": "☕",
    "disease": "Coffee Berry Borer (Hypothenemus hampei)",
    "diseaseKn": "ಕಾಫಿ ಹಣ್ಣು ಕೊರೆಯುವ ಹುಳು",
    "diseaseHi": "कॉफी बेरी छेदक (बेरी बोरर)",
    "severity": "High",
    "remedy": "Install Broca traps baited with ethanol-methanol lure (1:1 ratio) @ 25 traps/ha. Spray Beauveria bassiana @ 5 g/L or Chlorpyrifos 20 EC @ 2 mL/L at 120-150 days after blossom.",
    "remedyKn": "ಹೆಕ್ಟೇರ್‌ಗೆ 25 ಬ್ರೋಕಾ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಹೂವರಳಿದ 120-150 ದಿನಗಳಲ್ಲಿ Beauveria bassiana @ 5 g/L ಅಥವಾ Chlorpyrifos 20 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "प्रति हेक्टेयर 25 ब्रोका ट्रैप लगाएं। फूल आने के 120-150 दिन बाद Beauveria bassiana @ 5 g/L या Chlorpyrifos 20 EC @ 2 mL/L का छिड़काव करें।",
    "prevention": "Clean harvest (strip picking) of all left-over berries from bushes and ground (gleaning) to starve surviving beetles.",
    "preventionKn": "ಗಿಡದಲ್ಲಿ ಮತ್ತು ನೆಲದಲ್ಲಿ ಬಿದ್ದಿರುವ ಎಲ್ಲಾ ಕಾಫಿ ಹಣ್ಣುಗಳನ್ನು ಆರಿಸಿ ತೆಗೆದು (ಗ್ಲೀನಿಂಗ್) ಹುಳುವಿನ ಆಶ್ರಯ ತಪ್ಪಿಸಿ.",
    "preventionHi": "पेड़ों पर और जमीन पर गिरी सभी बची हुई बेरी को पूरी तरह बीनकर नष्ट करें।",
    "organicTip": "Spray entomopathogenic fungus Beauveria bassiana @ 5 g/L with wetting agent in evening.",
    "organicTipKn": "ಸಂಜೆ ವೇಳೆ Beauveria bassiana ಜೈವಿಕ ಶಿಲೀಂಧ್ರ @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "शाम के समय Beauveria bassiana @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Maintain shade and balanced soil fertility to prevent premature berry dropping.",
    "fertilizerKn": "ಕಾಯಿ ಉದುರುವುದು ತಪ್ಪಿಸಲು ಸೂಕ್ತ ನೆರಳು ಮತ್ತು ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ ಮಾಡಿ.",
    "fertilizerHi": "छाया और संतुलित खाद का प्रबंधन करें ताकि बेरी न गिरें।",
    "scheme": "Coffee Board Integrated Pest Management Assistance",
    "schemeLink": "https://coffeeboard.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Tiny round pinhole near the navel (apical disc) of the coffee berry",
      "Beetle excavates galleries inside green and ripe beans destroying commercial grade",
      "Thorough gleaning and harvest hygiene eliminates over 80% pest carryover"
    ],
    "keyTakeawaysKn": [
      "ಕಾಫಿ ಹಣ್ಣಿನ ತುದಿಯ ಬಟನ್ (ತೊಟ್ಟಿನ ವಿರುದ್ಧ ಭಾಗ) ಬಳಿ ಸಣ್ಣ ಗುಂಡಿನಾಕಾರದ ರಂಧ್ರವಿರುತ್ತದೆ",
      "ಹುಳುವು ಬೀಜದೊಳಗೆ ಸುರಂಗ ಕೊರೆದು ಕಾಫಿಯ ಗುಣಮಟ್ಟವನ್ನು ಸಂಪೂರ್ಣ ಹಾಳುಮಾಡುತ್ತದೆ",
      "ನೆಲದಲ್ಲಿ ಬಿದ್ದ ಹಣ್ಣುಗಳನ್ನು ಆರಿಸಿ ಸ್ವಚ್ಛಗೊಳಿಸುವುದರಿಂದ ಶೇ. 80ರಷ್ಟು ಕೀಟ ಬಾಧೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "कॉफी बेरी के सिरे (नाभि) के पास छोटा गोल छेद दिखाई देता है",
      "कीट बीज के अंदर सुरंग बनाकर व्यावसायिक गुणवत्ता को नष्ट कर देता है",
      "जमीन पर गिरी बेरी को बीनकर साफ करने से 80% तक कीट समाप्त हो जाता है"
    ],
    "products": [
      {
        "name": "Beauveria bassiana 1% WP",
        "type": "organic",
        "brand": "Bio-Power / Daman",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Beauveria bassiana 1kg"
      },
      {
        "name": "Broca Pheromone Trap (Berry Borer)",
        "type": "organic",
        "brand": "Coffee Board Lure",
        "price": "₹140 – ₹220 / trap",
        "query": "Coffee berry borer trap lure"
      }
    ]
  },
  {
    "crop": "Coffee (ಕಾಫಿ)",
    "cropKn": "ಕಾಫಿ",
    "cropHi": "कॉफी",
    "emoji": "☕",
    "disease": "Black Rot / Koleroga (Corticium koleroga)",
    "diseaseKn": "ಕಾಫಿ ಕಪ್ಪು ಕೊಳೆ ರೋಗ (ಕೊಲೆರೋಗ)",
    "diseaseHi": "कॉफी ब्लैक रॉट (काला विगलन)",
    "severity": "High",
    "remedy": "Foliar spray with 1% Bordeaux mixture before onset of South-West monsoon and second spray during August-September break.",
    "remedyKn": "ಮುಂಗಾರು ಆರಂಭಕ್ಕೆ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಆಗಸ್ಟ್-ಸೆಪ್ಟೆಂಬರ್ ಮಳೆ ಬಿಡುವಿನಲ್ಲಿ ಎರಡನೇ ಬಾರಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "मानसून से पहले 1% बोर्डो मिश्रण का छिड़काव करें और अगस्त-सितंबर में दोबारा छिड़कें।",
    "prevention": "Thinning of dense shade trees before rainy season to facilitate air circulation and reduce humidity in estate.",
    "preventionKn": "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ನೆರಳು ಮರಗಳ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೋಟದಲ್ಲಿ ಗಾಳಿ-ಬೆಳಕು ಆಡುವಂತೆ ಮಾಡಿ.",
    "preventionHi": "बारिश से पहले छायादार पेड़ों की छंटाई करें ताकि बागान में हवा और धूप आ सके।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L with 2% neem oil emulsion.",
    "organicTipKn": "Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 2% ಬೇವಿನ ಎಣ್ಣೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/L और 2% नीम के तेल का छिड़काव करें।",
    "fertilizer": "Apply adequate Potash to harden branch and leaf cuticles.",
    "fertilizerKn": "ರೆಂಬೆಗಳು ಮತ್ತು ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "टहनियों और पत्तियों को मजबूत करने के लिए पर्याप्त पोटाश दें।",
    "scheme": "Coffee Board Rainfall Insurance & Crop Welfare Scheme",
    "schemeLink": "https://coffeeboard.gov.in/",
    "color": "#1e293b",
    "keyTakeaways": [
      "Blackening and rotting of leaves, developing berries, and green twigs covered by a white mycelial web",
      "Infected leaves detach but remain hanging suspended by fungal threads like pendulums",
      "Heavy monsoon mist and saturated shade trigger sudden explosive outbreaks"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ಕಾಫಿ ಕಾಯಿಗಳು ಮತ್ತು ಹಸಿರು ರೆಂಬೆಗಳು ಕಪ್ಪಾಗಿ ಕೊಳೆತು ಬಿಳಿ ಬೂಷ್ಟಿನ ದಾರಗಳಿಂದ ಆವೃತವಾಗುತ್ತವೆ",
      "ಕೊಳೆತ ಎಲೆಗಳು ತೊಟ್ಟಿನಿಂದ ಕಳಚಿಕೊಂಡರೂ ಶಿಲೀಂಧ್ರದ ದಾರಗಳಿಂದ ನೇತಾಡುತ್ತಿರುತ್ತವೆ",
      "ದಟ್ಟ ನೆರಳು ಮತ್ತು ನಿರಂತರ ಮಳೆ-ಮಂಜು ರೋಗವನ್ನು ವೇಗವಾಗಿ ಉಲ್ಬಣಗೊಳಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां, फल और हरी टहनियां काली पड़कर सड़ जाती हैं और सफेद जाले से ढक जाती हैं",
      "संक्रमित पत्तियां टूटकर भी फफूंद के धागों के सहारे लटकती रहती हैं",
      "अत्यधिक नमी और घनी छाया में यह बीमारी विस्फोटक रूप से फैलती है"
    ],
    "products": [
      {
        "name": "Copper Sulphate for Bordeaux 1%",
        "type": "chemical",
        "brand": "Agri Blue Copper",
        "price": "₹240 – ₹360 / 1kg",
        "query": "Copper Sulphate agriculture blue"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Coffee (ಕಾಫಿ)",
    "cropKn": "ಕಾಫಿ",
    "cropHi": "कॉफी",
    "emoji": "☕",
    "disease": "White Stem Borer (Xylotrechus quadripes)",
    "diseaseKn": "ಕಾಫಿ ಬಿಳಿ ಕಾಂಡ ಕೊರೆಯುವ ದುಂಬಿ",
    "diseaseHi": "कॉफी सफेद तना छेदक (व्हाइट स्टेम बोरर)",
    "severity": "High",
    "remedy": "Stem swabbing / spray with Chlorpyrifos 20 EC @ 600 mL/200L water + 200 mL wetting agent during flight periods (April-May and Oct-Dec). Tracing and uprooting infested bushes.",
    "remedyKn": "ದುಂಬಿಗಳು ಹಾರಾಡುವ ಕಾಲದಲ್ಲಿ (ಏಪ್ರಿಲ್-ಮೇ ಮತ್ತು ಅಕ್ಟೋಬರ್-ಡಿಸೆಂಬರ್) ಕಾಂಡಕ್ಕೆ Chlorpyrifos 20 EC ಲೇಪಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಗುರುತಿಸಿ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.",
    "remedyHi": "कीट के उड़ने के मौसम (अप्रैल-मई और अक्टूबर-दिसंबर) में तने पर Chlorpyrifos 20 EC का लेप लगाएं। ग्रसित पौधों को उखाड़कर जलाएं।",
    "prevention": "Maintain two-tier optimum shade (40–50% sunlight filtration). Bark scraping of stems to remove loose scaly bark where beetles lay eggs.",
    "preventionKn": "ಶೇ. 40-50 ರಷ್ಟು ನೆರಳು ನಿರ್ವಹಿಸಿ. ಮೊಟ್ಟೆ ಇಡುವುದನ್ನು ತಡೆಯಲು ಮರದ ಕಾಂಡದ ಒಣ ಸಿಪ್ಪೆಯನ್ನು ಕೆರೆದು ನಯಗೊಳಿಸಿ (ಬಾರ್ಕ್ ಸ್ಕ್ರ್ಯಾಪಿಂಗ್).",
    "preventionHi": "40-50% छाया बनाए रखें। तने की खुरदरी छाल को खुरचकर साफ करें ताकि कीट अंडे न दे सके।",
    "organicTip": "Stem swabbing with 10% lime wash (slaked lime + resin + neem oil) on main trunk before flight season.",
    "organicTipKn": "ಕಾಂಡಕ್ಕೆ ಸುಣ್ಣ, ರಾಳ ಮತ್ತು ಬೇವಿನ ಎಣ್ಣೆ ಮಿಶ್ರಣವನ್ನು (ಲೈಮ್ ವಾಶ್) ಲೇಪಿಸಿ.",
    "organicTipHi": "तने पर चूना, राल और नीम के तेल का लेप लगाएं।",
    "fertilizer": "Apply balanced micronutrient fertilizer to enhance stem vigor.",
    "fertilizerKn": "ಗಿಡದ ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "तने की मजबूती के लिए संतुलित खाद दें।",
    "scheme": "Coffee Board White Stem Borer Compensation Scheme",
    "schemeLink": "https://coffeeboard.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Larva bores tortuous tunnels inside hardwood stem causing characteristic raised ring-like ridges on bark",
      "Causes yellowing, wilting, branch dieback, and complete death of mature Arabica bushes",
      "Prompt tracing and burning of infested stems is legally required under Coffee Pest Act"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುವು ಗಟ್ಟಿಯಾದ ಮರದ ಕಾಂಡದೊಳಗೆ ಸುರಂಗ ಕೊರೆಯುವುದರಿಂದ ಕಾಂಡದ ಮೇಲೆ ಉಂಗುರದಂತಹ ಏಣುಗಳು ಮೂಡುತ್ತವೆ",
      "ಅರೇಬಿಕಾ ಗಿಡಗಳು ಹಳದಿಯಾಗಿ, ಒಣಗಿ ಸಂಪೂರ್ಣವಾಗಿ ನಾಶವಾಗುತ್ತವೆ",
      "ಬಾಧಿತ ಗಿಡಗಳನ್ನು ಗುರುತಿಸಿ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕುವುದು ಕಾನೂನುಬದ್ಧ ಕಡ್ಡಾಯ ಕ್ರಮವಾಗಿದೆ"
    ],
    "keyTakeawaysHi": [
      "सूंड़ी तने की लकड़ी में टेढ़ी-मेढ़ी सुरंगें बनाती है जिससे तने की छाल पर छल्लेदार उभार बन जाते हैं",
      "अरेबिका कॉफी के पूरे पौधे पीले पड़कर सूख जाते हैं",
      "प्रभावित पौधों को उखाड़कर जलाना कानूनी रूप से अनिवार्य है"
    ],
    "products": [
      {
        "name": "Chlorpyrifos 20 EC",
        "type": "chemical",
        "brand": "Dursban / Classic",
        "price": "₹260 – ₹380 / 1L",
        "query": "Chlorpyrifos 20 EC"
      },
      {
        "name": "Agricultural Lime (Slaked Lime)",
        "type": "organic",
        "brand": "Agri Lime Powder",
        "price": "₹280 – ₹390 / 25kg",
        "query": "Hydrated lime agriculture"
      }
    ]
  },
  {
    "crop": "Coffee (ಕಾಫಿ)",
    "cropKn": "ಕಾಫಿ",
    "cropHi": "कॉफी",
    "emoji": "☕",
    "disease": "Anthracnose / Twig Dieback (Colletotrichum kahawae)",
    "diseaseKn": "ರೆಂಬೆ ಒಣಗುವ ರೋಗ (ಡೈಬ್ಯಾಕ್)",
    "diseaseHi": "कॉफी एन्थ्रेक्नोज (टहनी सूखना / डाईबैक)",
    "severity": "Medium",
    "remedy": "Prune dead twigs 5 cm below infected tissue. Spray Carbendazim 50 WP @ 1 g/L or Copper Oxychloride 50 WP @ 2.5 g/L during post-monsoon flush.",
    "remedyKn": "ಒಣಗಿದ ರೆಂಬೆಗಳನ್ನು ರೋಗದ 5 cm ಕೆಳಭಾಗದಲ್ಲಿ ಕತ್ತರಿಸಿ. Carbendazim 50 WP @ 1 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "संक्रमित टहनियों को 5 cm नीचे से छांटें। Carbendazim 50 WP @ 1 g/L या Copper Oxychloride 50 WP @ 2.5 g/L का छिड़काव करें।",
    "prevention": "Maintain balanced shade. Avoid over-bearing stress by regulating cropping intensity.",
    "preventionKn": "ಸೂಕ್ತ ನೆರಳು ನಿರ್ವಹಣೆ ಮಾಡಿ. ಅತಿಯಾದ ಕಾಯಿ ಬಿಟ್ಟು ಗಿಡ ದುರ್ಬಲವಾಗದಂತೆ ಪೋಷಕಾಂಶ ನೀಡಿ.",
    "preventionHi": "उचित छाया रखें। बहुत अधिक फल आने पर पोषक तत्वों की कमी न होने दें।",
    "organicTip": "Foliar spray of 19:19:19 water-soluble fertilizer @ 5 g/L combined with Trichoderma viride @ 4 g/L.",
    "organicTipKn": "ನೀರಿನಲ್ಲಿ ಕರಗುವ 19:19:19 ಗೊಬ್ಬರ @ 5 g/L ಜೊತೆಗೆ Trichoderma viride @ 4 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "19:19:19 उर्वरक @ 5 g/L के साथ Trichoderma viride @ 4 g/L का छिड़काव करें।",
    "fertilizer": "Foliar spray of Zinc Sulphate @ 2.5 g/L + Urea @ 5 g/L during post-monsoon.",
    "fertilizerKn": "ಮುಂಗಾರಿನ ನಂತರ Zinc Sulphate @ 2.5 g/L ಜೊತೆಗೆ ಯೂರಿಯಾ @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "मानसून के बाद Zinc Sulphate @ 2.5 g/L और यूरिया @ 5 g/L का छिड़काव करें।",
    "scheme": "Coffee Board Soil and Crop Nutrition Advisory",
    "schemeLink": "https://coffeeboard.gov.in/",
    "color": "#854d0e",
    "keyTakeaways": [
      "Yellowing of leaves on bearing twigs followed by drying of branches from tip backward (\"dieback\")",
      "Often precipitated by exhaustion after heavy crop bearing and severe drought/monsoon stress",
      "Post-harvest pruning and restorative nutrition reverses twig decline"
    ],
    "keyTakeawaysKn": [
      "ಕಾಯಿ ಬಿಟ್ಟ ರೆಂಬೆಗಳ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ, ರೆಂಬೆಯ ತುದಿಯಿಂದ ಬುಡದವರೆಗೆ ಒಣಗುತ್ತಾ ಬರುತ್ತದೆ (ಡೈಬ್ಯಾಕ್)",
      "ಹೆಚ್ಚಿನ ಇಳುವರಿಯ ನಂತರ ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ ಮತ್ತು ನೀರಿನ ಒತ್ತಡದಿಂದ ರೋಗ ತೀವ್ರಗೊಳ್ಳುತ್ತದೆ",
      "ಕಟಾವಿನ ನಂತರ ಒಣ ರೆಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಪೋಷಕಾಂಶ ನೀಡುವುದರಿಂದ ಗಿಡ ಪುನಶ್ಚೇತನಗೊಳ್ಳುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "फलों वाली टहनियों की पत्तियां पीली पड़कर ऊपर से नीचे की ओर सूखने लगती हैं (डाईबैक)",
      "अधिक फसल आने के बाद पौधे की कमजोरी और सूखे से यह बीमारी बढ़ती है",
      "कटाई के बाद छंटाई और पर्याप्त खाद देने से पौधे फिर से हरे-भरे हो जाते हैं"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "NPK 19:19:19 Water Soluble",
        "type": "fertilizer",
        "brand": "IFFCO / Mahafeed",
        "price": "₹140 – ₹210 / 1kg",
        "query": "19 19 19 fertilizer 1kg"
      }
    ]
  },
  {
    "crop": "Black Pepper (ಕರಿಮೆಣಸು)",
    "cropKn": "ಕರಿಮೆಣಸು",
    "cropHi": "काली मिर्च (ब्लैक पेपर)",
    "emoji": "🌿",
    "disease": "Quick Wilt / Foot Rot (Phytophthora capsici)",
    "diseaseKn": "ಕರಿಮೆಣಸಿನ ಶೀಘ್ರ ಸೊರಗು ರೋಗ (ಬುಡ ಕೊಳೆ)",
    "diseaseHi": "काली मिर्च द्रुत उकठा रोग (क्विक विल्ट)",
    "severity": "High",
    "remedy": "Apply Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L or Potassium Phosphonate (Akomin) @ 3 mL/L as drench (5-10 L/vine) and foliar spray in May-June and Aug-Sept.",
    "remedyKn": "ಮೇ-ಜೂನ್ ಮತ್ತು ಆಗಸ್ಟ್-ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ Metalaxyl + Mancozeb @ 2 g/L ಅಥವಾ Potassium Phosphonate @ 3 mL/L ದ್ರಾವಣವನ್ನು ಬಳ್ಳಿಗೆ ಸಿಂಪಡಿಸಿ ಬುಡಕ್ಕೆ ಸುರಿಯಿರಿ.",
    "remedyHi": "मई-जून और अगस्त-सितंबर में Metalaxyl + Mancozeb @ 2 g/L या Potassium Phosphonate @ 3 mL/L का छिड़काव करें और जड़ में 5-10 लीटर घोल डालें।",
    "prevention": "Ensure excellent contour drainage in plantation. Provide 1% Bordeaux spray before monsoon.",
    "preventionKn": "ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬಸಿಗಾಲುವೆ ಮಾಡಿ. ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    "preventionHi": "बागान में जल निकासी नालियां बनाएं। मानसून से पहले 1% बोर्डो मिश्रण का छिड़काव करें।",
    "organicTip": "Apply Trichoderma harzianum @ 50g in 5 kg neem cake + FYM to the root basin of each vine in May and Sept.",
    "organicTipKn": "ಪ್ರತಿ ಬಳ್ಳಿಯ ಬುಡಕ್ಕೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ 50g Trichoderma ಬೆರೆಸಿ ಮೇ ಮತ್ತು ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ ಹಾಕಿ.",
    "organicTipHi": "मई और सितंबर में 5 kg नीम खली और सड़ी खाद में 50g ट्राइकोडर्मा मिलाकर प्रति बेल डालें।",
    "fertilizer": "Apply balanced NPK (100:40:140 g/vine/year) in two split doses.",
    "fertilizerKn": "ಪ್ರತಿ ಬಳ್ಳಿಗೆ ವಾರ್ಷಿಕ 100:40:140 g NPK ಗೊಬ್ಬರವನ್ನು ಎರಡು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
    "fertilizerHi": "प्रति बेल 100:40:140 g NPK प्रति वर्ष दो बार में दें।",
    "scheme": "Spices Board of India Pepper Rejuvenation Scheme",
    "schemeLink": "https://indianspices.com/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Sudden wilting, blackening of leaves and spikes, and collapse of entire vine within 10 to 14 days",
      "Collar region rots with peeling of bark leaving fibrous vascular strands",
      "Soil drenching with systemic fungicide or Trichoderma before monsoon is critical"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಮತ್ತು ಕಾಳು ಗೊಂಚಲುಗಳು ಕಪ್ಪಾಗಿ ಕೇವಲ 10 ರಿಂದ 14 ದಿನಗಳಲ್ಲಿ ಇಡೀ ಬಳ್ಳಿ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಬಾಡಿ ಸಾಯುತ್ತದೆ",
      "ಬುಡದ ಕಾಂಡದ ತೊಗಟೆ ಕೊಳೆತು ಸುಲಭವಾಗಿ ಕಳಚಿಕೊಳ್ಳುತ್ತದೆ",
      "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನವೇ ಬುಡಕ್ಕೆ ಸಿಸ್ಟಮಿಕ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ನೀಡುವುದು ಕಡ್ಡಾಯ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां और बालियां काली पड़ जाती हैं और 10 से 14 दिनों में पूरी बेल अचानक सूख जाती है",
      "तने का निचला हिस्सा सड़ जाता है और छाल आसानी से छूटने लगती है",
      "मानसून से पहले जड़ में ट्राइकोडर्मा या सिस्टमिक फफूंदनाशक डालना बेहद जरूरी है"
    ],
    "products": [
      {
        "name": "Potassium Phosphonate (Akomin)",
        "type": "chemical",
        "brand": "Akomin / Biostadt",
        "price": "₹420 – ₹580 / 500mL",
        "query": "Potassium Phosphonate Akomin"
      },
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      },
      {
        "name": "Trichoderma harzianum 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹170 – ₹250 / 1kg",
        "query": "Trichoderma harzianum 1kg"
      }
    ]
  },
  {
    "crop": "Black Pepper (ಕರಿಮೆಣಸು)",
    "cropKn": "ಕರಿಮೆಣಸು",
    "cropHi": "काली मिर्च (ब्लैक पेपर)",
    "emoji": "🌿",
    "disease": "Slow Wilt / Decline (Radopholus similis & Meloidogyne incognita)",
    "diseaseKn": "ಕರಿಮೆಣಸಿನ ನಿಧಾನ ಸೊರಗು ರೋಗ",
    "diseaseHi": "काली मिर्च धीमा उकठा (स्लो विल्ट / सूत्रकृमि)",
    "severity": "Medium",
    "remedy": "Apply Phorate 10G @ 30 g/vine or Carbofuran 3G @ 50 g/vine or Drench with Fluopyram 34.48 SC @ 1 mL/L.",
    "remedyKn": "ಪ್ರತಿ ಬಳ್ಳಿಯ ಬುಡಕ್ಕೆ Phorate 10G @ 30g ಅಥವಾ Carbofuran 3G @ 50g ಹಾಕಿ ಅಥವಾ Fluopyram @ 1 mL/L ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "प्रति बेल Phorate 10G @ 30g या Carbofuran 3G @ 50g डालें या Fluopyram @ 1 mL/L से जड़ में सिंचाई करें।",
    "prevention": "Plant nematode-free rooted cuttings from accredited nurseries. Solarize nursery potting mixture.",
    "preventionKn": "ರೋಗಮುಕ್ತ ನರ್ಸರಿಗಳಿಂದ ತಂದ ಬೇರುಬಿಟ್ಟ ಬಳ್ಳಿಗಳನ್ನು ನೆಡಿ. ನರ್ಸರಿ ಮಣ್ಣನ್ನು ಸೂರ್ಯನ ಬಿಸಿಲಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಒಣಗಿಸಿ.",
    "preventionHi": "प्रमाणित नर्सरी से ही स्वस्थ जड़ वाली कटिंग लगाएं। नर्सरी की मिट्टी का सौरीकरण करें।",
    "organicTip": "Apply bio-nematicide Paecilomyces lilacinus @ 50g in 5 kg neem cake per vine.",
    "organicTipKn": "ಪ್ರತಿ ಬಳ್ಳಿಗೆ 5 kg ಬೇವಿನ ಹಿಂಡಿಯಲ್ಲಿ 50g Paecilomyces lilacinus ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "प्रति बेल 5 kg नीम खली में 50g Paecilomyces lilacinus मिलाकर जड़ों में डालें।",
    "fertilizer": "Apply adequate organic compost and Magnesium Sulphate @ 50g/vine to alleviate foliar chlorosis.",
    "fertilizerKn": "ಹಳದಿ ಬಣ್ಣ ನಿವಾರಿಸಲು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ @ 50g ನೀಡಿ.",
    "fertilizerHi": "पीलापन दूर करने के लिए सड़ी खाद और मैग्नीशियम सल्फेट @ 50g प्रति बेल दें।",
    "scheme": "Spices Board Assistance for Integrated Pest & Disease Management",
    "schemeLink": "https://indianspices.com/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Gradual foliar yellowing, stunting, drooping, and progressive shedding of leaves over several months",
      "Roots exhibit severe galling, necrosis, and rotting of feeder roots by burrowing nematodes",
      "Nematode management combined with neem cake reverses vine decline"
    ],
    "keyTakeawaysKn": [
      "ತಿಂಗಳುಗಳ ಕಾಲ ಎಲೆಗಳು ಕ್ರಮೇಣ ಹಳದಿಯಾಗಿ, ಗಿಡ್ಡವಾಗಿ, ಒಂದೊಂದಾಗಿ ಉದುರುತ್ತಾ ಬಳ್ಳಿ ಕ್ಷೀಣಿಸುತ್ತದೆ",
      "ಬೇರುಗಳಲ್ಲಿ ಗಂಟುಗಳು ಉಂಟಾಗಿ ಪೋಷಕಾಂಶ ಹೀರುವ ಸಣ್ಣ ಬೇರುಗಳು ಕೊಳೆಯುತ್ತವೆ",
      "ಕ್ರಿಮಿನಾಶಕ ಮತ್ತು ಬೇವಿನ ಹಿಂಡಿ ಬಳಕೆಯು ಬಳ್ಳಿಗೆ ಹೊಸ ಜೀವ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "कई महीनों तक पत्तियां धीरे-धीरे पीली पड़कर झड़ती रहती हैं और बेल कमजोर हो जाती है",
      "सूत्रकृमि (निमेटोड) के कारण जड़ों में गांठें बन जाती हैं और पोषक जड़ें सड़ जाती हैं",
      "नीम की खली और जैव-कीटनाशक का प्रयोग बेल को फिर से स्वस्थ बना देता है"
    ],
    "products": [
      {
        "name": "Paecilomyces lilacinus (Bio-Nematicide)",
        "type": "organic",
        "brand": "Bio-Nemato / Agri Clean",
        "price": "₹220 – ₹340 / 1kg",
        "query": "Paecilomyces lilacinus bio nematicide"
      },
      {
        "name": "Neem Cake Pure Organic",
        "type": "organic",
        "brand": "Spices Grade Neem Cake",
        "price": "₹950 – ₹1,350 / 50kg",
        "query": "Neem cake fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Black Pepper (ಕರಿಮೆಣಸು)",
    "cropKn": "ಕರಿಮೆಣಸು",
    "cropHi": "काली मिर्च (ब्लैक पेपर)",
    "emoji": "🌿",
    "disease": "Pollu Disease / Anthracnose (Colletotrichum gloeosporioides)",
    "diseaseKn": "ಕರಿಮೆಣಸಿನ ಪೊಳ್ಳು ರೋಗ (ಕಾಳು ಜೊಳ್ಳು)",
    "diseaseHi": "काली मिर्च पोल्लु रोग (खोखला दाना / एन्थ्रेक्नोज)",
    "severity": "Medium",
    "remedy": "Spray 1% Bordeaux mixture or Carbendazim 50 WP @ 1 g/L or Mancozeb 75 WP @ 2 g/L twice during July-August berry formation.",
    "remedyKn": "ಜುಲೈ-ಆಗಸ್ಟ್ ತಿಂಗಳಲ್ಲಿ ಕಾಳು ಕಟ್ಟುವಾಗ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಎರಡು ಬಾರಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "जुलाई-अगस्त में दाना बनते समय 1% बोर्डो मिश्रण या Carbendazim 50 WP @ 1 g/L का दो बार छिड़काव करें।",
    "prevention": "Provide adequate sunlight to vines by regulating shade of standard trees (Silver Oak).",
    "preventionKn": "ನೆರಳು ಮರಗಳ (ಸಿಲ್ವರ್ ಓಕ್) ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಬಳ್ಳಿಗಳಿಗೆ ಸೂಕ್ತ ಸೂರ್ಯನ ಬೆಳಕು ಸಿಗುವಂತೆ ಮಾಡಿ.",
    "preventionHi": "सिल्वर ओक जैसे छायादार पेड़ों की छंटाई करके बेलों तक पर्याप्त धूप पहुंचाएं।",
    "organicTip": "Spray Pseudomonas fluorescens @ 5 g/L early in morning at fruit set.",
    "organicTipKn": "ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಮುಂಜಾನೆ Pseudomonas fluorescens @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "दाना बनने की शुरुआत में सुबह Pseudomonas fluorescens @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Apply foliar spray of 19:19:19 @ 5 g/L + Boron @ 1 g/L to enhance berry filling and density.",
    "fertilizerKn": "ಕಾಳುಗಳು ಗಟ್ಟಿಯಾಗಿ ತುಂಬಲು 19:19:19 @ 5 g/L ಜೊತೆಗೆ ಬೋರಾನ್ @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "दानों को ठोस और भारी बनाने के लिए 19:19:19 @ 5 g/L और बोरॉन @ 1 g/L का छिड़काव करें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Berries turn brownish-black, shrink, dry up, and become light and hollow (\"pollu\")",
      "Circular brownish necrotic spots with yellow halo develop on leaves",
      "Combined management of anthracnose fungus and pollu beetle protects berry yield"
    ],
    "keyTakeawaysKn": [
      "ಕಾಳುಗಳು ಕಂದು-ಕಪ್ಪಾಗಿ, ಒಣಗಿ, ಟೊಳ್ಳಾಗಿ ಹಗುರವಾಗುತ್ತವೆ (\"ಪೊಳ್ಳು\")",
      "ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಅಂಚಿನ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಶಿಲೀಂಧ್ರ ಮತ್ತು ಪೊಳ್ಳು ಕೀಟಗಳೆರಡರ ಸಕಾಲಿಕ ನಿಯಂತ್ರಣದಿಂದ ಕಾಳು ತೂಕವನ್ನು ಉಳಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "काली मिर्च के दाने सूखकर काले और खोखले हो जाते हैं जिनका कोई वजन नहीं रहता",
      "पत्तियों पर पीले घेरे वाले भूरे धब्बे दिखाई देते हैं",
      "समय पर फफूंदनाशक का छिड़काव करने से दाने ठोस और भारी बनते हैं"
    ],
    "products": [
      {
        "name": "Ready-to-use Bordeaux Mixture 1%",
        "type": "chemical",
        "brand": "Bordo-Ready",
        "price": "₹190 – ₹290 / 1kg",
        "query": "Bordeaux mixture ready to use"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Black Pepper (ಕರಿಮೆಣಸು)",
    "cropKn": "ಕರಿಮೆಣಸು",
    "cropHi": "काली मिर्च (ब्लैक पेपर)",
    "emoji": "🌿",
    "disease": "Phyllosticta Leaf Spot (Phyllosticta piperis)",
    "diseaseKn": "ಕರಿಮೆಣಸಿನ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "काली मिर्च पर्ण चित्ती रोग (फाइलोस्टिक्टा लीफ स्पॉट)",
    "severity": "Low",
    "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Copper Oxychloride 50 WP @ 2.5 g/L at first appearance of circular spots.",
    "remedyKn": "ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "धब्बे दिखते ही Mancozeb 75 WP @ 2 g/L या Copper Oxychloride 50 WP @ 2.5 g/L का छिड़काव करें।",
    "prevention": "Collect and burn fallen diseased leaves. Avoid overcrowding of vines.",
    "preventionKn": "ಉದುರಿದ ರೋಗಪೀಡಿತ ಎಲೆಗಳನ್ನು ಆರಿಸಿ ಸುಟ್ಟುಹಾಕಿ. ಬಳ್ಳಿಗಳು ಅತಿಯಾಗಿ ದಟ್ಟವಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "preventionHi": "गिरी हुई संक्रमित पत्तियों को जलाएं। बेलों को बहुत अधिक घना न होने दें।",
    "organicTip": "Foliar spray of 5% cow urine + Trichoderma viride @ 5 g/L.",
    "organicTipKn": "5% ಗೋಮೂತ್ರ ಮತ್ತು Trichoderma viride @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% गोमूत्र और Trichoderma viride @ 5 g/L का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply balanced micronutrient mixture to strengthen leaf cuticle.",
    "fertilizerKn": "ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಸಿಂಪಡಣೆ ಮಾಡಿ.",
    "fertilizerHi": "पत्तियों को मजबूत करने के लिए सूक्ष्म पोषक तत्व दें।",
    "scheme": "State Horticulture Mission (SHM)",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#64748b",
    "keyTakeaways": [
      "Large circular brown spots on leaves with distinct concentric rings and dark margins",
      "Severely affected leaves yellow prematurely and drop down",
      "Common in young plantations during intermittent rainy spells"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಉಂಗುರಾಕಾರದ ಗೆರೆಗಳಿರುವ ದೊಡ್ಡ ಕಂದು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ತೀವ್ರವಾದಾಗ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಅಕಾಲಿಕವಾಗಿ ಉದುರುತ್ತವೆ",
      "ಮಳೆಗಾಲದ ಬಿಡುವಿನಲ್ಲಿ ಎಳೆ ಬಳ್ಳಿಗಳಲ್ಲಿ ಈ ರೋಗ ಹೆಚ್ಚಾಗಿ ಕಂಡುಬರುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर गहरे किनारों वाले बड़े गोल भूरे धब्बे बनते हैं जिनमें गोल छल्ले दिखते हैं",
      "अधिक असर होने पर पत्तियां पीली होकर समय से पहले गिर जाती हैं",
      "बारिश के मौसम में नई बेलों पर यह बीमारी अधिक देखी जाती है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      }
    ]
  },
  {
    "crop": "Black Pepper (ಕರಿಮೆಣಸು)",
    "cropKn": "ಕರಿಮೆಣಸು",
    "cropHi": "काली मिर्च (ब्लैक पेपर)",
    "emoji": "🌿",
    "disease": "Stunt Virus (Piper Yellow Mottle Virus - PYMoV)",
    "diseaseKn": "ಕರಿಮೆಣಸಿನ ಗಿಡ್ಡಾಗುವ ವೈರಸ್ ರೋಗ",
    "diseaseHi": "काली मिर्च बौना वायरस रोग (स्टंट वायरस)",
    "severity": "High",
    "remedy": "Control mealybug vectors (Ferrisia virgata) by spraying Dimethoate 30 EC @ 1.7 mL/L or Thiamethoxam 25 WG @ 0.3 g/L. Uproot and burn severely stunted unproductive vines.",
    "remedyKn": "ರೋಗ ಹರಡುವ ಹಿಟ್ಟು ತಿಗಣೆಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು Dimethoate 30 EC @ 1.7 mL/L ಅಥವಾ Thiamethoxam 25 WG @ 0.3 g/L ಸಿಂಪಡಿಸಿ. ತೀವ್ರವಾಗಿ ಕುಂಠಿತಗೊಂಡ ಬಳ್ಳಿಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.",
    "remedyHi": "मिलीबग कीट की रोकथाम के लिए Dimethoate 30 EC @ 1.7 mL/L या Thiamethoxam 25 WG @ 0.3 g/L का छिड़काव करें। गंभीर रूप से बौनी बेलों को नष्ट करें।",
    "prevention": "Strictly use virus-indexed disease-free planting material from ICAR-IISR Calicut or accredited nurseries.",
    "preventionKn": "ಸರ್ಕಾರಿ ಮಾನ್ಯತೆ ಪಡೆದ ನರ್ಸರಿಗಳಿಂದ ವೈರಸ್ ಮುಕ್ತ ಸಸಿಗಳನ್ನು ಮಾತ್ರ ನಾಟಿ ಮಾಡಿ.",
    "preventionHi": "हमेशा प्रमाणित रोगमुक्त नर्सरी से ही स्वस्थ पौध लगाएं।",
    "organicTip": "Foliar spray of Fish Amino Acid 5 mL/L + Neem oil 10000 PPM @ 2 mL/L to suppress mealybugs and boost vigor.",
    "organicTipKn": "ಹಿಟ್ಟು ತಿಗಣೆ ನಿಯಂತ್ರಣಕ್ಕೆ ಮೀನಿನ ಅಮೈನೋ ಆಸಿಡ್ 5 mL/L ಜೊತೆಗೆ ಬೇವಿನ ಎಣ್ಣೆ @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "फिश अमीनो एसिड 5 mL/L और नीम का तेल @ 2 mL/L का छिड़काव करें।",
    "fertilizer": "Apply foliar spray of Chelated Zinc @ 1 g/L + Magnesium Sulphate @ 5 g/L to relieve interveinal chlorosis.",
    "fertilizerKn": "ಎಲೆಗಳ ಹಳದಿ ರೋಗ ನಿವಾರಿಸಲು Chelated Zinc @ 1 g/L ಜೊತೆಗೆ ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "पत्तियों का पीलापन दूर करने के लिए चिलेटेड जिंक और मैग्नीशियम सल्फेट का छिड़काव करें।",
    "scheme": "ICAR-IISR Black Pepper Health Advisory",
    "schemeLink": "https://spices.res.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Severe leaf mottling, puckering, crinkling, reduced leaf size, and shortened internodes (\"stunting\")",
      "Spikes become very short with uneven and poor berry setting",
      "Mealybug-transmitted badnavirus; virus-free planting material is the only permanent solution"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಸುಕ್ಕುಗಟ್ಟಿ, ಸಣ್ಣದಾಗಿ, ಗೆಣ್ಣುಗಳು ಗಿಡ್ಡವಾಗಿ ಇಡೀ ಬಳ್ಳಿ ಕುಂಠಿತಗೊಳ್ಳುತ್ತದೆ (\"ಗಿಡ್ಡಾಗುವಿಕೆ\")",
      "ಕಾಳು ಗೊಂಚಲುಗಳು ಅತ್ಯಂತ ಸಣ್ಣದಾಗಿ ಕೇವಲ ಕೆಲವೇ ಕಾಳುಗಳು ಕಚ್ಚುತ್ತವೆ",
      "ಹಿಟ್ಟು ತಿಗಣೆಗಳಿಂದ ಹರಡುವ ವೈರಸ್ ರೋಗ; ಕಡ್ಡಾಯವಾಗಿ ರೋಗಮುಕ್ತ ಸಸಿಗಳನ್ನೇ ನಾಟಿ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां मुड़कर सिकुड़ जाती हैं, छोटी रह जाती हैं और पोरियां छोटी होकर बेल बौनी रह जाती है",
      "बालियां बहुत छोटी बनती हैं और उनमें बहुत कम दाने बैठते हैं",
      "मिलीबग द्वारा फैलता है; हमेशा वायरस-मुक्त प्रमाणित पौध लगाना ही इसका स्थायी इलाज है"
    ],
    "products": [
      {
        "name": "Thiamethoxam 25 WG",
        "type": "chemical",
        "brand": "Actara (Syngenta)",
        "price": "₹220 – ₹340 / 100g",
        "query": "Thiamethoxam 25 WG Actara"
      },
      {
        "name": "Chelated Zinc 12% EDTA",
        "type": "fertilizer",
        "brand": "Multiplex / Aries",
        "price": "₹180 – ₹280 / 250g",
        "query": "Chelated Zinc EDTA 12"
      }
    ]
  },
  {
    "crop": "Tomato (ಟೊಮೇಟೊ)",
    "cropKn": "ಟೊಮೇಟೊ",
    "cropHi": "टमाटर",
    "emoji": "🍅",
    "disease": "Late Blight (Phytophthora infestans)",
    "diseaseKn": "ಲೇಟ್ ಬ್ಲೈಟ್ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "टमाटर लेट ब्लाइट (पछेती अंगमारी)",
    "severity": "High",
    "remedy": "Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2 g/L or Dimethomorph 50 WP @ 1 g/L or Cymoxanil 8% + Mancozeb 64% WP @ 2 g/L at 7-day intervals during overcast wet weather.",
    "remedyKn": "ಮಳೆಗಾಲದ ವಾತಾವರಣದಲ್ಲಿ ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಅಥವಾ Dimethomorph 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "गीले मौसम में हर 7 दिन के अंतराल पर Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L या Dimethomorph 50 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Ensure wider plant spacing for ventilation. Use drip irrigation instead of sprinkler. Destroy lower infected leaves.",
    "preventionKn": "ಉತ್ತಮ ಗಾಳಿಯಾಡುವಂತೆ ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ. ಸ್ಪ್ರಿಂಕ್ಲರ್ ಬದಲಿಗೆ ಹನಿ ನೀರಾವರಿ ಬಳಸಿ. ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ.",
    "preventionHi": "हवा के संचार के लिए पौधों में उचित दूरी रखें। फव्वारे के बजाय ड्रिप सिंचाई अपनाएं। निचली संक्रमित पत्तियों को नष्ट करें।",
    "organicTip": "Spray Trichoderma viride @ 5 g/L + Copper Oxychloride @ 2 g/L early morning.",
    "organicTipKn": "ಬೆಳಗಿನ ಜಾವ Trichoderma viride @ 5 g/L ಅಥವಾ Copper Oxychloride @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "सुबह के समय Trichoderma viride @ 5 g/L या Copper Oxychloride @ 2 g/L का छिड़काव करें।",
    "fertilizer": "Apply Calcium Nitrate @ 5 kg/acre to strengthen plant cell walls against fungal hyphae penetration.",
    "fertilizerKn": "ಕೋಶಭಿತ್ತಿ ಬಲಪಡಿಸಲು ಮತ್ತು ಶಿಲೀಂಧ್ರ ಪ್ರವೇಶ ತಡೆಯಲು ಎಕರೆಗೆ Calcium Nitrate @ 5 kg ನೀಡಿ.",
    "fertilizerHi": "फफूंद के हमले से बचाव हेतु कोशिका संरचना मजबूत करने के लिए Calcium Nitrate @ 5 kg/एकड़ दें।",
    "scheme": "Mission for Integrated Development of Horticulture (MIDH)",
    "schemeLink": "https://midh.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Large water-soaked irregular greenish-black lesions on leaves with white cottony mold underneath in humid mornings",
      "Can destroy an entire tomato crop within 7 to 10 days if left unmanaged",
      "Practice strict crop rotation with non-solanaceous crops"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಮತ್ತು ಮುಂಜಾನೆ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಹತ್ತಿಯಂತಹ ಬೂಷ್ಟು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ",
      "ಸಕಾಲಕ್ಕೆ ನಿಯಂತ್ರಿಸದಿದ್ದರೆ 7 ರಿಂದ 10 ದಿನಗಳಲ್ಲಿ ಇಡೀ ಬೆಳೆಯನ್ನು ನಾಶಮಾಡುತ್ತದೆ",
      "ಟೊಮೇಟೊ ನಂತರ ಸೋಲನೇಸಿ ಕುಟುಂಬವಲ್ಲದ ಇತರ ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर पानीदार काले-हरे धब्बे और सुबह नीचे सफेद रुई जैसी फफूंद की परत बन जाती है",
      "समय पर नियंत्रण न करने पर 7 से 10 दिनों में पूरी टमाटर की फसल नष्ट हो सकती है",
      "टमाटर के बाद अन्य कुल की फसलों के साथ सख्त फसल चक्र अपनाएं"
    ],
    "products": [
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold (Syngenta)",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      },
      {
        "name": "Dimethomorph 50 WP",
        "type": "chemical",
        "brand": "Acrobat (BASF)",
        "price": "₹550 – ₹750 / 100g",
        "query": "Dimethomorph 50 WP Acrobat"
      },
      {
        "name": "Calcium Nitrate 15.5% N + 18.8% Ca",
        "type": "fertilizer",
        "brand": "YaraLiva / IFFCO",
        "price": "₹850 – ₹1,200 / 25kg",
        "query": "Calcium Nitrate fertilizer 25kg"
      }
    ]
  },
  {
    "crop": "Tomato (ಟೊಮೇಟೊ)",
    "cropKn": "ಟೊಮೇಟೊ",
    "cropHi": "टमाटर",
    "emoji": "🍅",
    "disease": "Early Blight (Alternaria solani)",
    "diseaseKn": "ಅರ್ಲಿ ಬ್ಲೈಟ್ ಮುಂಚಿನ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "टमाटर अगेती अंगमारी (अर्ली ब्लाइट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Chlorothalonil 75 WP @ 2 g/L or Azoxystrobin 23 SC @ 1 mL/L.",
    "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Chlorothalonil 75 WP @ 2 g/L ಅಥವಾ Azoxystrobin 23 SC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Mancozeb 75 WP @ 2.5 g/L या Chlorothalonil 75 WP @ 2 g/L या Azoxystrobin 23 SC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Stake tomato plants to keep leaves off the wet soil. Mulch beds with plastic or straw.",
    "preventionKn": "ಗಿಡಗಳಿಗೆ ಕಡ್ಡಿ ಅಥವಾ ತಂತಿ ಕಟ್ಟಿ ಎಲೆಗಳು ಮಣ್ಣಿಗೆ ತಾಗದಂತೆ ನೋಡಿ. ಪ್ಲಾಸ್ಟಿಕ್ ಮಲ್ಚಿಂಗ್ ಬಳಸಿ.",
    "preventionHi": "टमाटर के पौधों को सहारा (स्टेकिंग) दें ताकि पत्ते जमीन से न छुएं। मल्चिंग अपनाएं।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) + cow urine 5%.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के बीज का अर्क और 5% गोमूत्र मिलाकर पत्तियों पर छिड़कें।",
    "fertilizer": "Supply Potassium and micronutrients; avoid nutrient stress which predisposes plants to Alternaria.",
    "fertilizerKn": "ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಮತ್ತು ಲಘು ಪೋಷಕಾಂಶ ನೀಡಿ; ಗಿಡ ದುರ್ಬಲವಾದರೆ ಈ ರೋಗ ಬೇಗ ಬರುತ್ತದೆ.",
    "fertilizerHi": "पर्याप्त पोटाश और सूक्ष्म पोषक तत्व दें; पौधे कमजोर होने पर यह फफूंद तेजी से हमला करती है।",
    "scheme": "Karnataka Raitha Sanjeevini Horticulture Support",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Characteristic dark brown circular spots with concentric rings (\"target-board\" or bullseye effect)",
      "Begins on lowest, oldest leaves and progresses upward defoliating the plant",
      "Staking and mulching reduces soil splashing of spores by over 70%"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಗೆರೆಗಳಿರುವ ಕಂದು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ (\"ಗುರಿ ಫಲಕ\"ದ ಆಕಾರ)",
      "ಕೆಳಗಿನ ಹಳೆಯ ಎಲೆಗಳಿಂದ ಆರಂಭವಾಗಿ ಮೇಲಿನವರೆಗೆ ಗಿಡದ ಎಲೆಗಳನ್ನು ಉದುರಿಸುತ್ತದೆ",
      "ಕಡ್ಡಿ ಕಟ್ಟುವುದು ಮತ್ತು ಮಲ್ಚಿಂಗ್ ಮಾಡುವುದರಿಂದ ರೋಗ ಹರಡುವಿಕೆ ಶೇ. 70ರಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर गोल छल्लेदार गहरे भूरे धब्बे बनते हैं (टारगेट बोर्ड जैसा निशान)",
      "निचली पुरानी पत्तियों से शुरू होकर ऊपर की ओर बढ़ता है और पत्ते गिरा देता है",
      "स्टेकिंग और मल्चिंग से मिट्टी के छींटे नहीं पड़ते और रोग 70% तक घट जाता है"
    ],
    "products": [
      {
        "name": "Chlorothalonil 75 WP",
        "type": "chemical",
        "brand": "Kavach (Syngenta)",
        "price": "₹420 – ₹580 / 500g",
        "query": "Chlorothalonil 75 WP Kavach"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Tomato (ಟೊಮೇಟೊ)",
    "cropKn": "ಟೊಮೇಟೊ",
    "cropHi": "टमाटर",
    "emoji": "🍅",
    "disease": "Tomato Leaf Curl Virus (ToLCV)",
    "diseaseKn": "ಟೊಮೇಟೊ ಎಲೆ ಮುದುಡು ರೋಗ",
    "diseaseHi": "टमाटर पत्ती मरोड़ रोग (लीफ कर्ल वायरस)",
    "severity": "High",
    "remedy": "Control whitefly vector (Bemisia tabaci) with Diafenthiuron 50 WP @ 1 g/L or Cyantraniliprole 10.26 OD @ 1.8 mL/L or Pyriproxyfen 10 EC @ 1.5 mL/L.",
    "remedyKn": "ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ Diafenthiuron 50 WP @ 1 g/L ಅಥವಾ Cyantraniliprole 10.26 OD @ 1.8 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "सफेद मक्खी की रोकथाम के लिए Diafenthiuron 50 WP @ 1 g/L या Cyantraniliprole 10.26 OD @ 1.8 mL/L का छिड़काव करें।",
    "prevention": "Raise seedlings under 40-mesh insect-proof nylon nets. Install yellow sticky traps @ 25/acre.",
    "preventionKn": "40-ಮೆಶ್ ನೈಲಾನ್ ಬಲೆಯಡಿ ಸಸಿಗಳನ್ನು ಬೆಳೆಸಿ. ಎಕರೆಗೆ 25 ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "preventionHi": "नर्सरी को 40-जालीदार नेट हाउस में तैयार करें। 25 पीले चिपचिपे ट्रैप प्रति एकड़ लगाएं।",
    "organicTip": "Spray 5% neem oil emulsion weekly; use barrier crops (maize) around tomato plot.",
    "organicTipKn": "ವಾರಕ್ಕೊಮ್ಮೆ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಹೊಲದ ಸುತ್ತಲೂ ಮೆಕ್ಕೆಜೋಳದ ಗಡಿ ಬೆಳೆ ಹಾಕಿ.",
    "organicTipHi": "साप्ताहिक रूप से नीम के तेल का छिड़काव करें और खेत के चारों ओर मक्के की बॉर्डर फसल लगाएं।",
    "fertilizer": "Foliar spray of 19:19:19 @ 4 g/L + Micronutrients to support growth of infected plants.",
    "fertilizerKn": "ಗಿಡ ಚೇತರಿಸಿಕೊಳ್ಳಲು 19:19:19 @ 4 g/L ಜೊತೆಗೆ ಲಘು ಪೋಷಕಾಂಶಗಳನ್ನು ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "पौधों की बढ़वार बनाए रखने के लिए 19:19:19 @ 4 g/L और सूक्ष्म पोषक तत्वों का छिड़काव करें।",
    "scheme": "National Horticulture Mission Protected Cultivation Scheme",
    "schemeLink": "https://midh.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Upward curling, puckering, crinkling, vein clearing, and severe stunting of plant",
      "Plants assume a bushy stunted habit and fail to set marketable fruits",
      "Whitefly control in nursery stage is the single most important intervention"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಮುದುಡಿಕೊಂಡು, ಹಳದಿಯಾಗಿ, ಗಿಡವು ಗಿಡ್ಡವಾಗಿ ಪೊದೆಯಂತಾಗುತ್ತದೆ",
      "ಗಿಡಗಳು ಹೂವು ಬಿಡುವುದಿಲ್ಲ ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವುದು ಸಂಪೂರ್ಣ ನಿಂತುಹೋಗುತ್ತದೆ",
      "ಸಸಿ ಮಡಿ ಹಂತದಲ್ಲೇ ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಿಸುವುದು ಅತ್ಯಂತ ಪ್ರಮುಖ ಕ್ರಮವಾಗಿದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां ऊपर की ओर मुड़कर कटोरी जैसी हो जाती हैं और पौधा झाड़ीनुमा बौना रह जाता है",
      "पौधों पर फल नहीं लगते और पैदावार पूरी तरह मारी जाती है",
      "नर्सरी अवस्था में ही सफेद मक्खी पर काबू पाना सबसे जरूरी कदम है"
    ],
    "products": [
      {
        "name": "Diafenthiuron 50 WP",
        "type": "chemical",
        "brand": "Pegasus",
        "price": "₹620 – ₹880 / 250g",
        "query": "Diafenthiuron 50 WP Pegasus"
      },
      {
        "name": "Cyantraniliprole 10.26 OD",
        "type": "chemical",
        "brand": "Benevia (FMC)",
        "price": "₹1,250 – ₹1,650 / 180mL",
        "query": "Cyantraniliprole Benevia FMC"
      },
      {
        "name": "Yellow Sticky Traps for Whitefly",
        "type": "organic",
        "brand": "Agri Sticky Pads",
        "price": "₹220 – ₹320 / pack of 10",
        "query": "Yellow sticky traps agriculture"
      }
    ]
  },
  {
    "crop": "Tomato (ಟೊಮೇಟೊ)",
    "cropKn": "ಟೊಮೇಟೊ",
    "cropHi": "टमाटर",
    "emoji": "🍅",
    "disease": "Bacterial Wilt (Ralstonia solanacearum)",
    "diseaseKn": "ಟೊಮೇಟೊ ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಸೊರಗು ರೋಗ",
    "diseaseHi": "टमाटर जीवाणु उकठा रोग (बैक्टीरियल विल्ट)",
    "severity": "High",
    "remedy": "Drench root zone with Copper Oxychloride 50 WP @ 3 g/L + Streptocycline @ 0.2 g/L or apply Bleaching Powder @ 5 kg/acre in irrigation water.",
    "remedyKn": "ಗಿಡದ ಬುಡಕ್ಕೆ Copper Oxychloride 50 WP @ 3 g/L ಜೊತೆಗೆ Streptocycline @ 0.2 g/L ಬೆರೆಸಿ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ. ನೀರಾವರಿ ಜೊತೆಗೆ ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್ ನೀಡಿ.",
    "remedyHi": "जड़ों में Copper Oxychloride 50 WP @ 3 g/L + Streptocycline @ 0.2 g/L का घोल डालें। सिंचाई के पानी में 5 kg/एकड़ ब्लीचिंग पाउडर मिलाएं।",
    "prevention": "Grow wilt-resistant hybrids (e.g., Arka Rakshak, Arka Samrat). Avoid continuous solanaceous cultivation.",
    "preventionKn": "ಅರ್ಕಾ ರಕ್ಷಕ್, ಅರ್ಕಾ ಸಾಮ್ರಾಟ್ ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "अर्का रक्षक, अर्का सम्राट जैसी विल्ट रोधी किस्में लगाएं। फसल चक्र अपनाएं।",
    "organicTip": "Soil application of Pseudomonas fluorescens @ 2.5 kg/acre in 100 kg farmyard manure.",
    "organicTipKn": "100 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ Pseudomonas fluorescens @ 2.5 kg ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "100 kg गोबर खाद में Pseudomonas fluorescens @ 2.5 kg मिलाकर खेत में डालें।",
    "fertilizer": "Apply adequate Potassium to harden vascular bundles. Avoid excess ammonium nitrogen.",
    "fertilizerKn": "ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "पर्याप्त पोटाश दें; अत्यधिक यूरिया के प्रयोग से बचें।",
    "scheme": "ICAR-IIHR Resistant Variety Seed Technology Program",
    "schemeLink": "https://iihr.res.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Sudden wilting and collapse of entire green plant during hot afternoon without prior yellowing",
      "Stem cutting placed in clear water releases continuous milky-white bacterial streaming threads",
      "Arka Rakshak and Arka Samrat are triple-disease resistant hybrids from ICAR-IIHR Bengaluru"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಹಳದಿಯಾಗದೆ ಹಸಿರಾಗಿರುವಾಗಲೇ ಇಡೀ ಗಿಡ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಬಿಸಿಲಿನಲ್ಲಿ ಬಾಡಿ ಸಾಯುತ್ತದೆ",
      "ಕಾಂಡವನ್ನು ಕತ್ತರಿಸಿ ಶುದ್ಧ ನೀರಿನಲ್ಲಿ ಇಟ್ಟಾಗ ಹಾಲಿನಂತಹ ಬಿಳಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ದ್ರವ ದಾರದಂತೆ ಇಳಿಯುತ್ತದೆ",
      "ಬೆಂಗಳೂರಿನ IIHR ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ಅರ್ಕಾ ರಕ್ಷಕ್ ಮತ್ತು ಅರ್ಕಾ ಸಾಮ್ರಾಟ್ ಈ ರೋಗಕ್ಕೆ ನಿರೋಧಕವಾಗಿವೆ"
    ],
    "keyTakeawaysHi": [
      "बिना पत्तियां पीली पड़े पूरा हरा पौधा तेज धूप में अचानक मुरझाकर गिर पड़ता है",
      "तने को काटकर साफ पानी में रखने पर दूधिया सफेद बैक्टीरिया का धागा निकलता दिखाई देता है",
      "ICAR-IIHR की अर्का रक्षक और अर्का सम्राट किस्में इस रोग के खिलाफ पूरी तरह सुरक्षित हैं"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Streptocycline",
        "type": "chemical",
        "brand": "Hindustan Antibiotics",
        "price": "₹45 – ₹70 / 6g",
        "query": "Streptocycline 6g"
      },
      {
        "name": "Pseudomonas fluorescens",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹180 – ₹240 / 1kg",
        "query": "Pseudomonas fluorescens 1kg"
      }
    ]
  },
  {
    "crop": "Tomato (ಟೊಮೇಟೊ)",
    "cropKn": "ಟೊಮೇಟೊ",
    "cropHi": "टमाटर",
    "emoji": "🍅",
    "disease": "Tomato Fruit Borer (Helicoverpa armigera)",
    "diseaseKn": "ಟೊಮೇಟೊ ಕಾಯಿಕೊರೆಯುವ ಹುಳು",
    "diseaseHi": "टमाटर फल छेदक (हेलिकोवर्पा)",
    "severity": "High",
    "remedy": "Spray Chlorantraniliprole 18.5 SC @ 0.3 mL/L or Flubendiamide 39.35 SC @ 0.3 mL/L or Emamectin Benzoate 5 SG @ 0.4 g/L at first flowering and fruit set.",
    "remedyKn": "ಹೂವು ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವಾಗ Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಅಥವಾ Flubendiamide 39.35 SC @ 0.3 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फूल और फल आते समय Chlorantraniliprole 18.5 SC @ 0.3 mL/L या Flubendiamide 39.35 SC @ 0.3 mL/L का छिड़काव करें।",
    "prevention": "Plant African Marigold as trap crop (1 row marigold for every 16 rows of tomato). Install Helilure traps @ 5/acre.",
    "preventionKn": "ಪ್ರತಿ 16 ಸಾಲು ಟೊಮೇಟೊಗೆ 1 ಸಾಲು ಚೆಂಡುಹೂವನ್ನು ಆಕರ್ಷಕ ಬೆಳೆಯಾಗಿ ಬೆಳೆಯಿರಿ. ಎಕರೆಗೆ 5 ಹೆಲಿಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಇಡಿ.",
    "preventionHi": "हर 16 कतार टमाटर के बाद 1 कतार गेंदे की ट्रैप फसल लगाएं। 5 हेलील्यूर फेरोमोन ट्रैप प्रति एकड़ लगाएं।",
    "organicTip": "Release Trichogramma chilonis @ 50,000/acre. Spray HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) @ 250 LE/ha in evening.",
    "organicTipKn": "Trichogramma chilonis ಪರಾವಲಂಬಿಗಳನ್ನು ಬಿಡಿ. ಸಂಜೆ ವೇಳೆ HaNPV ವೈರಸ್ @ 250 LE/ha ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichogramma chilonis छोड़ें और शाम को HaNPV @ 250 LE/हेक्टेयर का छिड़काव करें।",
    "fertilizer": "Apply balanced nutrients with Calcium and Boron to prevent fruit cracking and borer entrance.",
    "fertilizerKn": "ಕಾಯಿ ಬಿರುಕು ಬಿಡುವುದನ್ನು ತಪ್ಪಿಸಲು ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ಬೋರಾನ್ ಲಘು ಪೋಷಕಾಂಶ ನೀಡಿ.",
    "fertilizerHi": "फल फटने से बचाने के लिए कैल्शियम और बोरॉन खाद का प्रयोग करें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#d97706",
    "keyTakeaways": [
      "Caterpillar eats into green and ripe fruits making circular entry holes with head inside and body outside",
      "Affected fruits rot rapidly from secondary fungal infection and drop prematurely",
      "Marigold trap cropping attracts adult moths to lay eggs away from tomato fruits"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುವು ತಲೆಯನ್ನು ಕಾಯಿಯೊಳಗೆ ಇಟ್ಟು ದೇಹವನ್ನು ಹೊರಗಿಟ್ಟು ದುಂಡಗಿನ ರಂಧ್ರ ಮಾಡಿ ತಿನ್ನುತ್ತದೆ",
      "ರಂಧ್ರವಾದ ಕಾಯಿಗಳು ಕೊಳೆತು ಅಕಾಲಿಕವಾಗಿ ಉದುರಿಹೋಗುತ್ತವೆ",
      "ಚೆಂಡುಹೂವನ್ನು ಆಕರ್ಷಕ ಬೆಳೆಯಾಗಿ ಬೆಳೆಯುವುದರಿಂದ ಚಿಟ್ಟೆಗಳು ಟೊಮೇಟೊ ಬದಲು ಚೆಂಡುಹೂವಿನ ಮೇಲೆ ಮೊಟ್ಟೆ ಇಡುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "सूंड़ी फल में गोल छेद बनाकर सिर अंदर और बाकी शरीर बाहर रखकर फल को खाती है",
      "छेद वाले फल सड़ जाते हैं और समय से पहले गिर जाते हैं",
      "गेंदा लगाने से कीट गेंदे पर अंडे देता है और मुख्य फसल बच जाती है"
    ],
    "products": [
      {
        "name": "Chlorantraniliprole 18.5 SC (Coragen)",
        "type": "chemical",
        "brand": "FMC Coragen",
        "price": "₹850 – ₹1,150 / 60mL",
        "query": "Chlorantraniliprole 18.5 SC"
      },
      {
        "name": "Flubendiamide 39.35 SC",
        "type": "chemical",
        "brand": "Fame (Bayer)",
        "price": "₹750 – ₹980 / 100mL",
        "query": "Flubendiamide 39.35 SC Fame"
      },
      {
        "name": "Helilure Fruit Borer Pheromone Trap",
        "type": "organic",
        "brand": "PCI Phero Lures",
        "price": "₹120 – ₹180 / trap",
        "query": "Helicoverpa pheromone trap lure"
      }
    ]
  },
  {
    "crop": "Potato (ಆಲೂಗಡ್ಡೆ)",
    "cropKn": "ಆಲೂಗಡ್ಡೆ",
    "cropHi": "आलू",
    "emoji": "🥔",
    "disease": "Potato Late Blight (Phytophthora infestans)",
    "diseaseKn": "ಆಲೂಗಡ್ಡೆ ಲೇಟ್ ಬ್ಲೈಟ್ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "आलू पछेती अंगमारी (लेट ब्लाइट)",
    "severity": "High",
    "remedy": "Spray Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 2.5 g/L or Dimethomorph 50 WP @ 1 g/L or Metalaxyl + Mancozeb @ 2 g/L at 7-day intervals.",
    "remedyKn": "ಮೋಡ ಕವಿದ ತೇವಾಂಶದ ಹವಾಮಾನದಲ್ಲಿ Curzate @ 2.5 g/L ಅಥವಾ Dimethomorph 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "गीले मौसम में Curzate @ 2.5 g/L या Dimethomorph 50 WP @ 1 g/L का छिड़काव 7 दिन के अंतराल पर करें।",
    "prevention": "Earthing up to cover tubers under 15 cm soil. Destroy infected haulms 10 days before harvest.",
    "preventionKn": "ಗೆಡ್ಡೆಗಳ ಮೇಲೆ 15 cm ಮಣ್ಣು ಏರಿಸಿ. ಕಟಾವಿಗೆ 10 ದಿನ ಮುಂಚೆ ಆಲೂಗಡ್ಡೆ ಸೊಪ್ಪನ್ನು ಕತ್ತರಿಸಿ ನಾಶಮಾಡಿ (ಹಲ್ಮ್ ಕಟ್ಟಿಂಗ್).",
    "preventionHi": "कंदों पर 15 cm मिट्टी चढ़ाएं। खुदाई से 10 दिन पहले पौधों की बेलों को काट दें (हॉलम कटिंग)।",
    "organicTip": "Spray Copper Oxychloride 50 WP @ 2.5 g/L + Trichoderma viride @ 5 g/L early in season.",
    "organicTipKn": "Copper Oxychloride 50 WP @ 2.5 g/L ಜೊತೆಗೆ Trichoderma viride ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Copper Oxychloride 50 WP @ 2.5 g/L और ट्राइकोडर्मा का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply Potash (SOP - Sulphate of Potash) @ 50 kg/acre to strengthen tuber skin resistance.",
    "fertilizerKn": "ಗೆಡ್ಡೆ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಎಕರೆಗೆ 50 kg ಪೊಟ್ಯಾಶ್ (SOP) ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "कंदों की त्वचा मजबूत करने के लिए सल्फेट ऑफ पोटाश (SOP) @ 50 kg/एकड़ दें।",
    "scheme": "Hassan & Kolar Potato Special Crop Insurance Scheme",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Water-soaked dark lesions on leaf tips and margins spreading rapidly across the entire foliage",
      "White mildew bloom on leaf undersides in early mornings during misty rainy days",
      "Tubers rot with granular dry purplish-brown decay in storage"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಅಂಚಿನಲ್ಲಿ ನೀರಿನಂತಹ ಕಪ್ಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ಕೆಲವೇ ದಿನಗಳಲ್ಲಿ ಇಡೀ ಸೊಪ್ಪು ಒಣಗಿಹೋಗುತ್ತದೆ",
      "ಮಂಜು ಮುಸುಕಿದ ಮುಂಜಾನೆ ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಕಾಣಿಸುತ್ತದೆ",
      "ಸಂಗ್ರಹಣೆಯಲ್ಲಿ ಗೆಡ್ಡೆಗಳು ಒಳಭಾಗದಲ್ಲಿ ಕಂದು-ನೇರಳೆ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಕೊಳೆಯುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों के किनारों पर पानीदार काले धब्बे बनते हैं जो पूरी फसल को कुछ ही दिनों में झुलसा देते हैं",
      "कोहरे और बारिश की सुबह पत्तियों के नीचे सफेद फफूंद दिखाई देती है",
      "भंडारण में आलू अंदर से कत्थई-बैंगनी रंग के होकर सड़ जाते हैं"
    ],
    "products": [
      {
        "name": "Cymoxanil 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Curzate (DuPont)",
        "price": "₹550 – ₹780 / 500g",
        "query": "Cymoxanil Mancozeb Curzate"
      },
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      }
    ]
  },
  {
    "crop": "Potato (ಆಲೂಗಡ್ಡೆ)",
    "cropKn": "ಆಲೂಗಡ್ಡೆ",
    "cropHi": "आलू",
    "emoji": "🥔",
    "disease": "Potato Early Blight (Alternaria solani)",
    "diseaseKn": "ಆಲೂಗಡ್ಡೆ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಮುಂಚಿನ ಅಂಗಮಾರಿ",
    "diseaseHi": "आलू अगेती अंगमारी (अर्ली ब्लाइट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Chlorothalonil 75 WP @ 2 g/L or Azoxystrobin 23 SC @ 1 mL/L.",
    "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Chlorothalonil 75 WP @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Mancozeb 75 WP @ 2.5 g/L या Chlorothalonil 75 WP @ 2 g/L का छिड़काव करें।",
    "prevention": "Crop rotation with non-solanaceous crops. Destroy crop residues after harvest.",
    "preventionKn": "ಇತರ ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಕಟಾವಿನ ನಂತರ ಬೆಳೆಯ ಕಸವನ್ನು ಸುಟ್ಟುಹಾಕಿ.",
    "preventionHi": "फसल चक्र अपनाएं। कटाई के बाद फसल अवशेषों को नष्ट करें।",
    "organicTip": "Spray 5% neem seed kernel extract (NSKE) + cow urine 5%.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के बीज का अर्क और 5% गोमूत्र का छिड़काव करें।",
    "fertilizer": "Apply adequate balanced nutrition; avoid plant stress during tuber bulking.",
    "fertilizerKn": "ಗೆಡ್ಡೆ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "fertilizerHi": "आलू फूलते समय संतुलित खाद दें ताकि पौधे कमजोर न पड़ें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Circular to irregular dark brown spots with concentric rings (\"target-board\" rings) on leaves",
      "Causes premature foliage senescence and reduced tuber size",
      "Protect lower canopy leaves before spots spread upwards"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಉಂಗುರಾಕಾರದ ಗೆರೆಗಳುಳ್ಳ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ (\"ಟಾರ್ಗೆಟ್ ಬೋರ್ಡ್\" ಆಕಾರ)",
      "ಸೊಪ್ಪು ಅಕಾಲಿಕವಾಗಿ ಒಣಗಿ ಗೆಡ್ಡೆಗಳ ಗಾತ್ರ ಸಣ್ಣದಾಗುತ್ತದೆ",
      "ಕಲೆಗಳು ಕೆಳಗಿನ ಎಲೆಗಳಿಂದ ಮೇಲಕ್ಕೆ ಹರಡುವ ಮುನ್ನವೇ ಸಿಂಪಡಣೆ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर गोल छल्लेदार गहरे भूरे धब्बे बनते हैं (टारगेट बोर्ड निशान)",
      "पत्ते समय से पहले सूख जाते हैं जिससे आलू का आकार छोटा रह जाता है",
      "निचले पत्तों पर धब्बे दिखते ही तुरंत फफूंदनाशक का छिड़काव करें"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Chlorothalonil 75 WP",
        "type": "chemical",
        "brand": "Kavach",
        "price": "₹420 – ₹580 / 500g",
        "query": "Chlorothalonil 75 WP Kavach"
      }
    ]
  },
  {
    "crop": "Potato (ಆಲೂಗಡ್ಡೆ)",
    "cropKn": "ಆಲೂಗಡ್ಡೆ",
    "cropHi": "आलू",
    "emoji": "🥔",
    "disease": "Black Scurf & Stem Canker (Rhizoctonia solani)",
    "diseaseKn": "ಕಪ್ಪು ಸಿಪ್ಪೆ ರೋಗ & ಕಾಂಡ ಕೊಳೆ (ಬ್ಲಾಕ್ ಸ್ಕರ್ಫ್)",
    "diseaseHi": "आलू ब्लैक स्कर्फ (काला खुरंड रोग)",
    "severity": "Medium",
    "remedy": "Treat seed tubers with Pencycuron 250 SC @ 2.5 mL/L or Carbendazim 50 WP @ 2.5 g/L for 15 minutes before cold storage or planting.",
    "remedyKn": "ನಾಟಿಗೆ ಮುನ್ನ ಗೆಡ್ಡೆಗಳನ್ನು Pencycuron 250 SC @ 2.5 mL/L ಅಥವಾ Carbendazim @ 2.5 g/L ನಲ್ಲಿ 15 ನಿಮಿಷ ನೆನೆಸಿ.",
    "remedyHi": "बुवाई से पहले बीज आलू को Pencycuron 250 SC @ 2.5 mL/L या Carbendazim @ 2.5 g/L में 15 मिनट डुबोकर उपचारित करें।",
    "prevention": "Plant whole seed tubers instead of cut pieces. Regulate irrigation to prevent water stagnation.",
    "preventionKn": "ಕತ್ತರಿಸಿದ ಗೆಡ್ಡೆಗಳ ಬದಲಿಗೆ ಇಡೀ ಗೆಡ್ಡೆಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ. ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "preventionHi": "कटे हुए आलू के बजाय साबुत बीज आलू बोएं। खेत में पानी न रुकने दें।",
    "organicTip": "Treat tubers with Trichoderma viride @ 10 g/kg tuber before planting.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ನಂತೆ ಗೆಡ್ಡೆಗಳಿಗೆ ಲೇಪನ ಮಾಡಿ ನಾಟಿ ಮಾಡಿ.",
    "organicTipHi": "बुवाई से पहले आलू को Trichoderma viride @ 10 g/kg से उपचारित करें।",
    "fertilizer": "Apply well-decomposed FYM with biofertilizers; avoid fresh unrotted manure.",
    "fertilizerKn": "ಚೆನ್ನಾಗಿ ಕಳಿತ ತಿಪ್ಪೆ ಗೊಬ್ಬರ ಮಾತ್ರ ಬಳಸಿ; ಹಸಿ ಸಗಣಿ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "केवल अच्छी तरह सड़ी हुई गोबर खाद डालें; कच्ची खाद बिल्कुल न डालें।",
    "scheme": "National Horticulture Board Potato Cold Chain Scheme",
    "schemeLink": "https://nhb.gov.in/",
    "color": "#475569",
    "keyTakeaways": [
      "Hard, black, dirt-like incrustations (sclerotia) sticking to tuber skin that cannot be washed off with water",
      "Stem canker causes brown sunken lesions on subterranean stems leading to aerial tubers",
      "Pencycuron tuber treatment provides 95% protection against sclerotia formation"
    ],
    "keyTakeawaysKn": [
      "ಗೆಡ್ಡೆಯ ಸಿಪ್ಪೆಯ ಮೇಲೆ ನೀರಿನಿಂದ ತೊಳೆದರೂ ಹೋಗದ ಗಟ್ಟಿಯಾದ ಕಪ್ಪು ಮಣ್ಣಿನಂತಹ ಗಂಟುಗಳು ಅಂಟಿಕೊಂಡಿರುತ್ತವೆ",
      "ಮಣ್ಣೊಳಗಿನ ಕಾಂಡದ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗಿ ಗಿಡದ ಕವಲುಗಳಲ್ಲಿ ಗಾಳಿಯ ಗೆಡ್ಡೆಗಳು (ಏರಿಯಲ್ ಟ್ಯೂಬರ್) ಬೆಳೆಯುತ್ತವೆ",
      "ಪೆನ್ಸಿಕ್ಯುರಾನ್ ಬೀಜೋಪಚಾರವು ಶೇ. 95ರಷ್ಟು ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "आलू की त्वचा पर काले कोयले जैसे कड़े पपड़ीदार दाने चिपक जाते हैं जो धोने से भी नहीं छूटते",
      "जमीन के अंदर तने पर घाव बनने से पौधों की शाखाओं पर हवा में छोटे आलू उग आते हैं",
      "पेन्सीक्यूरॉन से बीजोपचार करने से 95% तक इस रोग से बचाव होता है"
    ],
    "products": [
      {
        "name": "Pencycuron 250 SC",
        "type": "chemical",
        "brand": "Monceren (Bayer)",
        "price": "₹420 – ₹580 / 250mL",
        "query": "Pencycuron 250 SC Monceren"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Potato (ಆಲೂಗಡ್ಡೆ)",
    "cropKn": "ಆಲೂಗಡ್ಡೆ",
    "cropHi": "आलू",
    "emoji": "🥔",
    "disease": "Bacterial Soft Rot (Pectobacterium carotovorum)",
    "diseaseKn": "ಆಲೂಗಡ್ಡೆ ಮೆದು ಕೊಳೆ ರೋಗ (ಸಾಫ್ಟ್ ರೊಟ್)",
    "diseaseHi": "आलू मृदु सड़न रोग (सॉफ्ट रॉट)",
    "severity": "High",
    "remedy": "Dip seed tubers in Streptocycline @ 0.1 g/L + Copper Oxychloride @ 2 g/L for 20 minutes and shade dry. Apply Bleaching Powder @ 5 kg/acre in soil.",
    "remedyKn": "ಗೆಡ್ಡೆಗಳನ್ನು Streptocycline @ 0.1 g/L ಮತ್ತು Copper Oxychloride @ 2 g/L ನಲ್ಲಿ 20 ನಿಮಿಷ ನೆನೆಸಿ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ. ಮಣ್ಣಿಗೆ ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್ ಸೇರಿಸಿ.",
    "remedyHi": "बीज आलू को Streptocycline @ 0.1 g/L + Copper Oxychloride @ 2 g/L में 20 मिनट भिगोकर छाया में सुखाएं। खेत में ब्लीचिंग पाउडर डालें।",
    "prevention": "Harvest in dry weather. Cure tubers at 15–20°C with good ventilation for 10 days before cold storage.",
    "preventionKn": "ಒಣ ಹವಾಮಾನದಲ್ಲಿ ಕಟಾವು ಮಾಡಿ. ಶೀತಲ ಗೋದಾಮಿಗೆ ಹಾಕುವ ಮುನ್ನ 10 ದಿನ ಚೆನ್ನಾಗಿ ಗಾಳಿಯಾಡುವಂತೆ ಒಣಗಿಸಿ ಕ್ಯೂರಿಂಗ್ ಮಾಡಿ.",
    "preventionHi": "सूखे मौसम में आलू खोदें। कोल्ड स्टोरेज में रखने से पहले 10 दिन हवादार जगह पर सुखाकर क्योरिंग करें।",
    "organicTip": "Treat tubers with 10% fresh cow dung filtrate supernatant before planting.",
    "organicTipKn": "ಹಸುವಿನ ಸಗಣಿಯ ತಿಳಿ ನೀರಿನಲ್ಲಿ ಗೆಡ್ಡೆಗಳನ್ನು ಉಪಚರಿಸಿ.",
    "organicTipHi": "गाय के गोबर के 10% छने हुए पानी में आलू डुबोकर लगाएं।",
    "fertilizer": "Apply adequate Calcium to strengthen tuber skin against bacterial enzyme maceration.",
    "fertilizerKn": "ಗೆಡ್ಡೆಯ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಕ್ಯಾಲ್ಸಿಯಂ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "कंदों की त्वचा मजबूत करने के लिए कैल्शियम उर्वरक दें।",
    "scheme": "Mission for Integrated Development of Horticulture",
    "schemeLink": "https://midh.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Tubers turn into a soft, watery, foul-smelling rotting pulpy mass in field and cold storage",
      "Enters tubers through harvest injuries, lenticels, and bruised skin",
      "Curing tubers before storage thickens periderm and seals entry points"
    ],
    "keyTakeawaysKn": [
      "ಗೆಡ್ಡೆಗಳು ಮೆದುವಾಗಿ, ನೀರುಕಾರುತ್ತಾ ತೀವ್ರ ದುರ್ವಾಸನೆಯೊಂದಿಗೆ ಕೊಳೆತು ಮುದ್ದೆಯಾಗುತ್ತವೆ",
      "ಕಟಾವಿನ ಗಾಯಗಳು ಮತ್ತು ಸಿಪ್ಪೆಯ ರಂಧ್ರಗಳ ಮೂಲಕ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಒಳನುಗ್ಗುತ್ತದೆ",
      "ಶೇಖರಣೆಗೆ ಮುನ್ನ ಸರಿಯಾದ ಕ್ಯೂರಿಂಗ್ ಮಾಡುವುದರಿಂದ ಸಿಪ್ಪೆ ದಪ್ಪವಾಗಿ ರೋಗ ಬರುವುದಿಲ್ಲ"
    ],
    "keyTakeawaysHi": [
      "आलू खेत और कोल्ड स्टोरेज में सड़कर बदबूदार पानी जैसा लुगदी बन जाता है",
      "खुदाई की चोटों और छिलके की खरोंचों से यह बैक्टीरिया कंद के अंदर घुसता है",
      "भंडारण से पहले क्योरिंग करने से छिलका सख्त होकर बैक्टीरिया को रोकता है"
    ],
    "products": [
      {
        "name": "Streptocycline Bactericide",
        "type": "chemical",
        "brand": "Hindustan Antibiotics",
        "price": "₹45 – ₹70 / 6g",
        "query": "Streptocycline 6g"
      },
      {
        "name": "Bleaching Powder (Chlorinated Lime)",
        "type": "chemical",
        "brand": "Agri Grade",
        "price": "₹60 – ₹100 / 1kg",
        "query": "Bleaching Powder agriculture"
      }
    ]
  },
  {
    "crop": "Potato (ಆಲೂಗಡ್ಡೆ)",
    "cropKn": "ಆಲೂಗಡ್ಡೆ",
    "cropHi": "आलू",
    "emoji": "🥔",
    "disease": "Potato Leaf Roll Virus (PLRV)",
    "diseaseKn": "ಆಲೂಗಡ್ಡೆ ಎಲೆ ಸುರುಟು ವೈರಸ್ (PLRV)",
    "diseaseHi": "आलू पर्ण लपेटक वायरस (लीफ रोल वायरस)",
    "severity": "Medium",
    "remedy": "Control aphid vectors (Myzus persicae) by spraying Imidacloprid 17.8 SL @ 0.5 mL/L or Thiamethoxam 25 WG @ 0.3 g/L. Uproot infected plants.",
    "remedyKn": "ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Thiamethoxam 25 WG @ 0.3 g/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತುಹಾಕಿ.",
    "remedyHi": "माहू की रोकथाम के लिए Imidacloprid 17.8 SL @ 0.5 mL/L या Thiamethoxam 25 WG @ 0.3 g/L का छिड़काव करें। रोगी पौधों को उखाड़ें।",
    "prevention": "Seed Plot Technique: Grow seed crop in aphid-free window (October to December). Dehaulm when aphid count reaches 20 aphids/100 leaves.",
    "preventionKn": "ಬೀಜ ಪ್ಲಾಟ್ ತಂತ್ರಜ್ಞಾನ: ಹೇನುಗಳಿಲ್ಲದ ಅಕ್ಟೋಬರ್-ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ಬೀಜದ ಬೆಳೆ ಬೆಳೆಯಿರಿ. ಹೇನುಗಳ ಸಂಖ್ಯೆ ಹೆಚ್ಚಾದಾಗ ಸೊಪ್ಪನ್ನು ಕತ್ತರಿಸಿ.",
    "preventionHi": "सीड प्लॉट तकनीक: माहू-मुक्त समय में बीज फसल उगाएं। माहू दिखने पर बेलें काट दें।",
    "organicTip": "Foliar spray of 5% neem oil emulsion with yellow water pan traps @ 10/acre.",
    "organicTipKn": "5% ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಎಕರೆಗೆ 10 ಹಳದಿ ನೀರಿನ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "organicTipHi": "5% नीम के तेल का छिड़काव करें और 10 पीले पानी के ट्रैप प्रति एकड़ लगाएं।",
    "fertilizer": "Balanced NPK; avoid excessive nitrogen that attracts colonizing aphids.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಹೆಚ್ಚಿನ ಸಾರಜನಕವು ಹೇನುಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.",
    "fertilizerHi": "संतुलित खाद दें; ज्यादा यूरिया डालने से माहू का प्रकोप बढ़ता है।",
    "scheme": "Central Potato Research Institute (CPRI) Certified Seed Program",
    "schemeLink": "https://cpri.icar.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Upward rolling of lower leaves into a spoon or cylinder, feeling leathery, brittle and dry to touch",
      "Internal tuber necrosis (\"net necrosis\") seen as a brown network inside cut tubers",
      "Strict adherence to the Seed Plot Technique ensures virus-free seed tubers"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಚಮಚದಂತೆ ಅಥವಾ ಕೊಳವೆಯಂತೆ ಸುರುಟಿಕೊಂಡು, ಚರ್ಮದಂತೆ ಗಟ್ಟಿಯಾಗಿ ಮುಟ್ಟಿದರೆ ಮುರಿದುಹೋಗುತ್ತವೆ",
      "ಗೆಡ್ಡೆಯನ್ನು ಕತ್ತರಿಸಿದಾಗ ಒಳಗಡೆ ಕಂದು ಬಣ್ಣದ ಜಾಲರಿ ಕಲೆಗಳು (ನೆಟ್ ನೆಕ್ರೋಸಿಸ್) ಕಾಣುತ್ತವೆ",
      "ಬೀಜ ಪ್ಲಾಟ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಅನುಸರಿಸುವುದರಿಂದ ವೈರಸ್ ಮುಕ್ತ ಆಲೂಗಡ್ಡೆ ಬೀಜ ಪಡೆಯಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "निचली पत्तियां ऊपर की ओर मुड़कर चम्मच जैसी हो जाती हैं और छूने पर चमड़े जैसी कड़क लगती हैं",
      "आलू को काटने पर भीतर भूरे जाले जैसी धारियां (नेट नेक्रोसिस) दिखाई देती हैं",
      "सीड प्लॉट तकनीक अपनाकर ही वायरस-मुक्त बीज तैयार किया जा सकता है"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Thiamethoxam 25 WG",
        "type": "chemical",
        "brand": "Actara",
        "price": "₹220 – ₹340 / 100g",
        "query": "Thiamethoxam 25 WG Actara"
      }
    ]
  },
  {
    "crop": "Onion (ಈರುಳ್ಳಿ)",
    "cropKn": "ಈರುಳ್ಳಿ",
    "cropHi": "प्याज",
    "emoji": "🧅",
    "disease": "Purple Blotch (Alternaria porri)",
    "diseaseKn": "ಈರುಳ್ಳಿ ನೇರಳೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "प्याज बैंगनी धब्बा रोग (पर्पल ब्लॉच)",
    "severity": "High",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L + Sticker (wetting agent) @ 0.5 mL/L or Tebuconazole 25.9 EC @ 1 mL/L or Difenoconazole 25 EC @ 1 mL/L at 10-day intervals.",
    "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಜೊತೆಗೆ ಅಂಟು ದ್ರವ (Sticker) @ 0.5 mL/L ಅಥವಾ Tebuconazole 25.9 EC @ 1 mL/L ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Mancozeb 75 WP @ 2.5 g/L के साथ चिपकाने वाला पदार्थ (स्टिकर) @ 0.5 mL/L या Tebuconazole 25.9 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Maintain proper plant spacing (15x10 cm). Avoid excessive sprinkler irrigation during cloudy weather.",
    "preventionKn": "ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ. ಮೋಡ ಕವಿದ ವಾತಾವರಣದಲ್ಲಿ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ತಪ್ಪಿಸಿ.",
    "preventionHi": "उचित दूरी (15x10 cm) रखें। बादल वाले मौसम में फव्वारा सिंचाई से बचें।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L + fermented cow urine 5%.",
    "organicTipKn": "Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/L और 5% गोमूत्र का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply Potash (SOP) @ 25 kg/acre + Sulphur @ 10 kg/acre to strengthen leaf wax coating.",
    "fertilizerKn": "ಎಲೆಗಳ ಮೇಲಿನ ಮೇಣದ ಪದರ ಗಟ್ಟಿಯಾಗಲು ಎಕರೆಗೆ 25 kg ಪೊಟ್ಯಾಶ್ ಮತ್ತು 10 kg ಗಂಧಕ (Sulphur) ನೀಡಿ.",
    "fertilizerHi": "पत्तियों की मोमी परत मजबूत करने के लिए 25 kg पोटाश और 10 kg सल्फर प्रति एकड़ दें।",
    "scheme": "National Horticulture Mission Onion Storage & Production Scheme",
    "schemeLink": "https://midh.gov.in/",
    "color": "#7e22ce",
    "keyTakeaways": [
      "Small, sunken, white lesions turning into distinctive purple-brown oval spots with concentric rings",
      "Lesions girdle tubular leaves causing them to topple over prematurely before bulb maturity",
      "Always add a sticking agent (surfactant) because onion leaves are waxy and smooth"
    ],
    "keyTakeawaysKn": [
      "ಸಣ್ಣ ಬಿಳಿ ಕಲೆಗಳು ನೇರಳೆ-ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಉಂಗುರಾಕಾರದ ಗೆರೆಗಳು ಮೂಡುತ್ತವೆ",
      "ಕಲೆಗಳು ಹಬ್ಬಿ ಎಲೆಗಳು ಮುರಿದು ಬಿದ್ದು ಗೆಡ್ಡೆ ಬಲಿಯುವ ಮುನ್ನವೇ ಸೊಪ್ಪು ಒಣಗುತ್ತದೆ",
      "ಈರುಳ್ಳಿ ಎಲೆಗಳು ನಯವಾಗಿರುವುದರಿಂದ ಕಡ್ಡಾಯವಾಗಿ ಅಂಟು ದ್ರವ (Sticker) ಬೆರೆಸಿ ಸಿಂಪಡಿಸಬೇಕು"
    ],
    "keyTakeawaysHi": [
      "छोटे सफेद धब्बे बड़े होकर विशिष्ट बैंगनी-भूरे रंग के छल्लेदार धब्बों में बदल जाते हैं",
      "धब्बे पत्ती को चारों ओर से घेर लेते हैं जिससे पत्तियां समय से पहले टूटकर गिर जाती हैं",
      "प्याज की पत्तियों पर मोम जैसा चिकनापन होता है, इसलिए कीटनाशक में स्टिकर जरूर मिलाएं"
    ],
    "products": [
      {
        "name": "Tebuconazole 25.9 EC",
        "type": "chemical",
        "brand": "Folicur (Bayer)",
        "price": "₹480 – ₹690 / 250mL",
        "query": "Tebuconazole 25.9 EC Folicur"
      },
      {
        "name": "Difenoconazole 25 EC",
        "type": "chemical",
        "brand": "Score (Syngenta)",
        "price": "₹450 – ₹650 / 100mL",
        "query": "Difenoconazole 25 EC Score"
      },
      {
        "name": "Agricultural Spray Adjuvant (Sticker)",
        "type": "organic",
        "brand": "Apsa-80 / Wetcit",
        "price": "₹220 – ₹320 / 500mL",
        "query": "Agricultural spray adjuvant sticker"
      }
    ]
  },
  {
    "crop": "Onion (ಈರುಳ್ಳಿ)",
    "cropKn": "ಈರುಳ್ಳಿ",
    "cropHi": "प्याज",
    "emoji": "🧅",
    "disease": "Basal Rot (Fusarium oxysporum f.sp. cepae)",
    "diseaseKn": "ಈರುಳ್ಳಿ ಬುಡ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "प्याज कंद सड़न रोग (बेसल रॉट)",
    "severity": "High",
    "remedy": "Drench nursery and field with Carbendazim 50 WP @ 1 g/L or Thiophanate-methyl 70 WP @ 1.5 g/L. Dip seedling roots in Carbendazim solution for 15 minutes before transplanting.",
    "remedyKn": "ನಾಟಿಗೆ ಮುನ್ನ ಸಸಿಗಳ ಬೇರನ್ನು Carbendazim @ 1 g/L ದ್ರಾವಣದಲ್ಲಿ 15 ನಿಮಿಷ ನೆನೆಸಿ. ಗದ್ದೆಗೆ Carbendazim ಅಥವಾ Thiophanate-methyl ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "रोपाई से पहले पौध की जड़ों को Carbendazim @ 1 g/L में 15 मिनट डुबोएं। खेत में कार्बेन्डाजिम का घोल डालें।",
    "prevention": "4-year crop rotation with non-allium crops. Deep summer ploughing to solarize resting chlamydospores.",
    "preventionKn": "4 ವರ್ಷಗಳ ಕಾಲ ಇತರ ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ.",
    "preventionHi": "4 साल का गैर-प्याज फसलों के साथ फसल चक्र अपनाएं। गर्मियों में गहरी जुताई करें।",
    "organicTip": "Seed and seedling root dip in Trichoderma viride @ 10 g/L + soil application of Trichoderma in FYM @ 2.5 kg/acre.",
    "organicTipKn": "Trichoderma viride @ 10 g/L ದ್ರಾವಣದಲ್ಲಿ ಸಸಿಗಳ ಬೇರು ಮುಳುಗಿಸಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/L में पौध की जड़ें डुबोएं और सड़ी खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Avoid excess nitrogen fertilization during bulb enlargement stage.",
    "fertilizerKn": "ಗೆಡ್ಡೆ ದಪ್ಪಗಾಗುವ ಹಂತದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡಬೇಡಿ.",
    "fertilizerHi": "प्याज बड़ा होते समय अतिरिक्त यूरिया का प्रयोग न करें।",
    "scheme": "Raitha Samparka Kendra Soil Protection Package",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Progressive yellowing and dying back of leaves from the tips downward",
      "Basal plate of the bulb rots with pinkish-white mycelium and roots completely decay",
      "Seedling root dip in bio-agent or fungicide prior to transplanting gives strong control"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ತುದಿಯಿಂದ ಬುಡದವರೆಗೆ ಕ್ರಮೇಣ ಹಳದಿಯಾಗಿ ಒಣಗುತ್ತಾ ಬರುತ್ತದೆ",
      "ಗೆಡ್ಡೆಯ ಬುಡವು ಗುಲಾಬಿ-ಬಿಳಿ ಬೂಷ್ಟಿನೊಂದಿಗೆ ಕೊಳೆತು, ಬೇರುಗಳು ಸಂಪೂರ್ಣ ನಾಶವಾಗುತ್ತವೆ",
      "ನಾಟಿ ಮಾಡುವ ಮುನ್ನ ಸಸಿಗಳ ಬೇರನ್ನು ಶಿಲೀಂಧ್ರನಾಶಕದಲ್ಲಿ ನೆನೆಸಿ ನಾಟಿ ಮಾಡುವುದು ಅತ್ಯುತ್ತಮ ಪರಿಹಾರ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की नोक से नीचे की ओर पीलापन और सूखना शुरू होता है",
      "प्याज के नीचे का हिस्सा गुलाबी-सफेद फफूंद के साथ सड़ जाता है और जड़ें गायब हो जाती हैं",
      "रोपाई से पहले पौध की जड़ों का उपचार ही इसका सबसे असरदार बचाव है"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Thiophanate-methyl 70 WP",
        "type": "chemical",
        "brand": "Roko",
        "price": "₹480 – ₹690 / 500g",
        "query": "Thiophanate-methyl 70 WP Roko"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Onion (ಈರುಳ್ಳಿ)",
    "cropKn": "ಈರುಳ್ಳಿ",
    "cropHi": "प्याज",
    "emoji": "🧅",
    "disease": "Stemphylium Leaf Blight (Stemphylium vesicarium)",
    "diseaseKn": "ಸ್ಟೆಂಫೈಲಿಯಮ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "प्याज स्टेमफिलियम झुलसा रोग (लीफ ब्लाइट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Iprodione 50 WP @ 2 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L.",
    "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Iprodione 50 WP @ 2 g/L ಅಥವಾ Amistar Top @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Mancozeb 75 WP @ 2.5 g/L या Iprodione 50 WP @ 2 g/L या Amistar Top @ 1 mL/L का छिड़काव करें।",
    "prevention": "Provide adequate spacing for air circulation. Avoid excess overhead irrigation.",
    "preventionKn": "ಉತ್ತಮ ಗಾಳಿಯಾಡುವಂತೆ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ. ಅತಿಯಾಗಿ ನೀರು ಹಾಯಿಸಬೇಡಿ.",
    "preventionHi": "हवा के संचार के लिए उचित दूरी रखें। अधिक सिंचाई न करें।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 5 g/L + sour buttermilk 5%.",
    "organicTipKn": "Pseudomonas fluorescens @ 5 g/L ಜೊತೆಗೆ 5% ಹುಳಿ ಮಜ್ಜಿಗೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 5 g/L और 5% खट्टी छाछ का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK with Sulphur @ 15 kg/acre to boost foliar tolerance.",
    "fertilizerKn": "ಎಕರೆಗೆ 15 kg ಗಂಧಕದೊಂದಿಗೆ (Sulphur) ಸಮತೋಲಿತ NPK ನೀಡಿ.",
    "fertilizerHi": "संतुलित NPK के साथ 15 kg सल्फर प्रति एकड़ अवश्य दें।",
    "scheme": "Mission for Integrated Development of Horticulture",
    "schemeLink": "https://midh.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Small yellow-to-orange flecks developing into elongated spindle-shaped lesions with dark olive-brown centers",
      "Commonly follows thrips feeding injury which provides entry ports for the fungus",
      "Controlling onion thrips simultaneously prevents Stemphylium outbreaks"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಹಳದಿ-ಕಿತ್ತಳೆ ಚುಕ್ಕೆಗಳು ಉದ್ದನೆಯ ಕದಿರಿನ ಆಕಾರದ ಕಡು ಕಂದು ಕಲೆಗಳಾಗುತ್ತವೆ",
      "ಥ್ರಿಪ್ಸ್ ಕೀಟಗಳು ಗಿಡವನ್ನು ಗೀಚಿದ ಗಾಯಗಳ ಮೂಲಕ ಈ ಶಿಲೀಂಧ್ರ ಸುಲಭವಾಗಿ ಒಳನುಗ್ಗುತ್ತದೆ",
      "ಥ್ರಿಪ್ಸ್ ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸುವುದರಿಂದ ಈ ರೋಗ ಬರುವುದನ್ನು ತಡೆಯಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर छोटे पीले-नारंगी धब्बे बाद में लंबे सिगार जैसे गहरे जैतून-भूरे घाव बन जाते हैं",
      "थ्रिप्स कीट द्वारा खरोंचे गए घावों से यह फफूंद तुरंत पौधे में प्रवेश करती है",
      "थ्रिप्स कीट का नियंत्रण करने से स्टेमफिलियम का प्रकोप अपने आप रुक जाता है"
    ],
    "products": [
      {
        "name": "Azoxystrobin + Difenoconazole (Amistar Top)",
        "type": "chemical",
        "brand": "Amistar Top (Syngenta)",
        "price": "₹850 – ₹1,200 / 200mL",
        "query": "Azoxystrobin Difenoconazole Amistar Top"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Onion (ಈರುಳ್ಳಿ)",
    "cropKn": "ಈರುಳ್ಳಿ",
    "cropHi": "प्याज",
    "emoji": "🧅",
    "disease": "Onion Downy Mildew (Peronospora destructor)",
    "diseaseKn": "ಈರುಳ್ಳಿ ಬೂದಿ ರೋಗ (ಡೌನಿ ಮಿಲ್ಡ್ಯೂ)",
    "diseaseHi": "प्याज डाउनी मिल्ड्यू (मृदुरोमिल आसिता)",
    "severity": "High",
    "remedy": "Spray Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L or Cymoxanil + Mancozeb @ 2 g/L + Sticker @ 0.5 mL/L.",
    "remedyKn": "Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಜೊತೆಗೆ ಅಂಟು ದ್ರವ (Sticker) ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L के साथ स्टिकर मिलाकर छिड़काव करें।",
    "prevention": "Avoid low-lying waterlogged soils. Orient planting rows in direction of prevailing wind to speed drying.",
    "preventionKn": "ತಗ್ಗು ಪ್ರದೇಶದಲ್ಲಿ ಈರುಳ್ಳಿ ಬೆಳೆಯಬೇಡಿ. ಗಾಳಿಯಾಡುವ ದಿಕ್ಕಿನಲ್ಲಿ ಸಾಲುಗಳನ್ನು ನಿರ್ಮಿಸಿ.",
    "preventionHi": "निचले जलजमाव वाले खेतों से बचें। हवा के रुख की दिशा में कतारें बनाएं ताकि पत्ते जल्दी सूखें।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L with 2% baking soda solution.",
    "organicTipKn": "Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 2% ಅಡುಗೆ ಸೋಡಾ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/L और 2% बेकिंग सोडा का छिड़काव करें।",
    "fertilizer": "Apply adequate Potassium and avoid excessive irrigation during cool humid periods.",
    "fertilizerKn": "ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ನೀಡಿ ಮತ್ತು ತಂಪಾದ ತೇವಾಂಶದ ದಿನಗಳಲ್ಲಿ ಅತಿಯಾಗಿ ನೀರು ಹಾಯಿಸಬೇಡಿ.",
    "fertilizerHi": "पर्याप्त पोटाश दें और ठंडे मौसम में अधिक पानी न लगाएं।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#15803d",
    "keyTakeaways": [
      "Pale green oval patches on leaves covered by a delicate violet-gray downy velvety growth in morning",
      "Leaves collapse, shrivel, and break over at the affected zone",
      "Cool nights (<15°C) with morning fog and dew favor catastrophic blight"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ತಿಳಿ ಹಸಿರು ಕಲೆಗಳು ಮತ್ತು ಮುಂಜಾನೆ ನೇರಳೆ-ಬೂದು ಬಣ್ಣದ ನಯವಾದ ಬೂಷ್ಟು ಕಾಣಿಸುತ್ತದೆ",
      "ಕಲೆಯಾದ ಜಾಗದಲ್ಲಿ ಎಲೆಗಳು ಸುರುಟಿಕೊಂಡು ಮುರಿದು ಬೀಳುತ್ತವೆ",
      "ತಂಪಾದ ರಾತ್ರಿಗಳು (15°C ಗಿಂತ ಕಡಿಮೆ) ಮತ್ತು ಮುಂಜಾನೆಯ ಮಂಜು ಈ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर हल्के हरे धब्बे और सुबह के समय बैंगनी-धूसर मखमली फफूंद जम जाती है",
      "संक्रमित जगह से पत्तियां सिकुड़कर टूट जाती हैं",
      "ठंडी रातें (15°C से कम) और सुबह का कोहरा इस बीमारी को अचानक फैला देता है"
    ],
    "products": [
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      },
      {
        "name": "Sticker Adjuvant for Onion",
        "type": "organic",
        "brand": "Agro Sticker",
        "price": "₹220 – ₹320 / 500mL",
        "query": "Agricultural spray adjuvant sticker"
      }
    ]
  },
  {
    "crop": "Onion (ಈರುಳ್ಳಿ)",
    "cropKn": "ಈರುಳ್ಳಿ",
    "cropHi": "प्याज",
    "emoji": "🧅",
    "disease": "Onion Thrips (Thrips tabaci)",
    "diseaseKn": "ಈರುಳ್ಳಿ ಥ್ರಿಪ್ಸ್ (ನುಸಿ ಹುಳು)",
    "diseaseHi": "प्याज का थ्रिप्स (चूर्णी कीट)",
    "severity": "High",
    "remedy": "Spray Fipronil 5 SC @ 1.5 mL/L or Spinetoram 11.7 SC @ 0.8 mL/L or Profenofos 50 EC @ 2 mL/L + Sticker @ 0.5 mL/L directed into central leaf sheaths.",
    "remedyKn": "ಸುಳಿಯೊಳಗೆ Fipronil 5 SC @ 1.5 mL/L ಅಥವಾ Spinetoram 11.7 SC @ 0.8 mL/L ಜೊತೆಗೆ ಅಂಟು ದ್ರವ (Sticker) ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों के अंदर Fipronil 5 SC @ 1.5 mL/L या Spinetoram 11.7 SC @ 0.8 mL/L के साथ स्टिकर मिलाकर छिड़काव करें।",
    "prevention": "Install blue sticky traps @ 25/acre. Sprinkler irrigation helps wash away thrips from leaf axils.",
    "preventionKn": "ಎಕರೆಗೆ 25 ನೀಲಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯು ಎಲೆಗಳ ಸಂದಿನಲ್ಲಿರುವ ಥ್ರಿಪ್ಸ್ ಅನ್ನು ತೊಳೆಯಲು ಸಹಕಾರಿ.",
    "preventionHi": "25 नीले चिपचिपे ट्रैप प्रति एकड़ लगाएं। फव्वारा सिंचाई से थ्रिप्स कीट धुल जाते हैं।",
    "organicTip": "Spray Lecanicillium lecanii @ 5 g/L or 5% Neem oil 10000 PPM @ 2 mL/L with liquid soap.",
    "organicTipKn": "Lecanicillium lecanii ಜೈವಿಕ ಕೀಟನಾಶಕ @ 5 g/L ಅಥವಾ 5% ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Lecanicillium lecanii @ 5 g/L या 5% नीम का तेल साबुन के साथ मिलाकर छिड़कें।",
    "fertilizer": "Apply adequate Potassium to harden leaf epidermis against piercing-sucking mouthparts.",
    "fertilizerKn": "ಎಲೆಯ ಮೇಲ್ಮೈ ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "पत्तियों को सख्त बनाने के लिए पर्याप्त पोटाश डालें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#d97706",
    "keyTakeaways": [
      "Silvery-white speckling, blotching, and curling of leaves due to rasping and sucking of sap",
      "Causes \"curling\" and premature drying of leaves severely reducing bulb weight and size",
      "Blue sticky traps are far more attractive to onion thrips than yellow traps"
    ],
    "keyTakeawaysKn": [
      "ರಸ ಹೀರುವುದರಿಂದ ಎಲೆಗಳ ಮೇಲೆ ಬೆಳ್ಳಿಯಂತಹ ಬಿಳಿ ಚುಕ್ಕೆಗಳು ಮೂಡಿ ಎಲೆಗಳು ಮುದುಡುತ್ತವೆ",
      "ಸೊಪ್ಪು ಒಣಗಿ ಗೆಡ್ಡೆಗಳ ಗಾತ್ರ ಮತ್ತು ತೂಕ ಶೇ. 50ರಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ",
      "ಈರುಳ್ಳಿ ಥ್ರಿಪ್ಸ್ ನಿಯಂತ್ರಣಕ್ಕೆ ಹಳದಿ ಬಲೆಗಳಿಗಿಂತ ನೀಲಿ ಅಂಟು ಬಲೆಗಳು ಹೆಚ್ಚು ಪರಿಣಾಮಕಾರಿ"
    ],
    "keyTakeawaysHi": [
      "रस चूसने से पत्तियों पर चांदी जैसे सफेद धब्बे बनते हैं और पत्तियां मुड़ जाती हैं",
      "पत्ते सूखने से प्याज का वजन और आकार आधा रह जाता है",
      "प्याज के थ्रिप्स के लिए पीले से ज्यादा नीले चिपचिपे ट्रैप बहुत असरदार होते हैं"
    ],
    "products": [
      {
        "name": "Fipronil 5 SC",
        "type": "chemical",
        "brand": "Regent (Bayer)",
        "price": "₹380 – ₹550 / 250mL",
        "query": "Fipronil 5 SC Regent"
      },
      {
        "name": "Blue Sticky Traps for Thrips",
        "type": "organic",
        "brand": "Agri Blue Pads",
        "price": "₹240 – ₹350 / pack of 10",
        "query": "Blue sticky traps thrips"
      }
    ]
  },
  {
    "crop": "Chilli (ಮೆಣಸಿನಕಾಯಿ)",
    "cropKn": "ಮೆಣಸಿನಕಾಯಿ",
    "cropHi": "मिर्च (चिल्ली)",
    "emoji": "🌶️",
    "disease": "Chilli Leaf Curl & Murda Complex (Thrips + Mites + Virus)",
    "diseaseKn": "ಮೆಣಸಿನಕಾಯಿ ಮುರಡ ರೋಗ (ಎಲೆ ಮುದುಡು ಕಾಂಪ್ಲೆಕ್ಸ್)",
    "diseaseHi": "मिर्च मुर्डा रोग (पर्ण कुंचन एवं थ्रिप्स-माइट्स)",
    "severity": "High",
    "remedy": "For upward curling (thrips): Fipronil 5 SC @ 1.5 mL/L or Spinetoram 11.7 SC @ 0.8 mL/L. For downward curling (mites): Diafenthiuron 50 WP @ 1 g/L or Spiromesifen 22.9 SC @ 1 mL/L.",
    "remedyKn": "ಮೇಲ್ಮುಖ ಮುದುಡುವಿಕೆಗೆ (ಥ್ರಿಪ್ಸ್): Fipronil 5 SC @ 1.5 mL/L ಅಥವಾ Spinetoram @ 0.8 mL/L. ಕೆಳಮುಖ ಮುದುಡುವಿಕೆಗೆ (ನುಸಿ): Diafenthiuron 50 WP @ 1 g/L ಅಥವಾ Spiromesifen @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "ऊपर मुड़ने पर (थ्रिप्स): Fipronil 5 SC @ 1.5 mL/L या Spinetoram @ 0.8 mL/L। नीचे मुड़ने पर (माइट): Diafenthiuron 50 WP @ 1 g/L या Spiromesifen @ 1 mL/L का छिड़काव करें।",
    "prevention": "Install blue sticky traps @ 15/acre (for thrips) and yellow sticky traps @ 15/acre (for whiteflies). Grow maize/sorghum barrier crop.",
    "preventionKn": "ಎಕರೆಗೆ 15 ನೀಲಿ ಮತ್ತು 15 ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಹೊಲದ ಸುತ್ತಲೂ ಮೆಕ್ಕೆಜೋಳದ ಗಡಿ ಬೆಳೆ ಬೆಳೆಯಿರಿ.",
    "preventionHi": "15 नीले और 15 पीले चिपचिपे ट्रैप प्रति एकड़ लगाएं। चारों तरफ मक्के की बॉर्डर फसल लगाएं।",
    "organicTip": "Foliar spray of sour buttermilk 50 mL/L + Neem oil 10000 PPM @ 3 mL/L weekly.",
    "organicTipKn": "ಪ್ರತಿ ವಾರ 50 mL/L ಹುಳಿ ಮಜ್ಜಿಗೆ ಜೊತೆಗೆ ಬೇವಿನ ಎಣ್ಣೆ @ 3 mL/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "साप्ताहिक रूप से 50 mL/L खट्टी छाछ और नीम का तेल @ 3 mL/L का छिड़काव करें।",
    "fertilizer": "Apply Micronutrient mixture (Zinc + Boron + Magnesium @ 5 g/L) to alleviate curling stress.",
    "fertilizerKn": "ಎಲೆ ಮುದುಡು ನಿವಾರಿಸಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಮಿಶ್ರಣ (Zinc + Boron + Mg @ 5 g/L) ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "पत्तियों के मुड़ने से राहत के लिए सूक्ष्म पोषक तत्व (जिंक + बोरॉन + मैग्नीशियम) छिड़कें।",
    "scheme": "Karnataka Raitha Sanjeevini Chilli Rejuvenation Support",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Upward boat-shaped curling indicates thrips; downward inverted-cup curling indicates yellow mites",
      "Vector control in the first 45 days after transplanting prevents irreversible virus spread",
      "Combination of sticky traps and targeted acaricide/insecticide controls complex completely"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ದೋಣಿಯಾಕಾರದಲ್ಲಿ ಮೇಲ್ಮುಖವಾಗಿ ಮುದುಡಿದರೆ ಥ್ರಿಪ್ಸ್; ಕೆಳಮುಖವಾಗಿ ಬಟ್ಟಲಿನಂತೆ ಮುದುಡಿದರೆ ನುಸಿ ಬಾಧೆ",
      "ನಾಟಿಯ ಮೊದಲ 45 ದಿನಗಳಲ್ಲಿ ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸಿದರೆ ವೈರಸ್ ಹರಡುವುದನ್ನು ತಡೆಯಬಹುದು",
      "ಅಂಟು ಬಲೆಗಳು ಮತ್ತು ಸರಿಯಾದ ಔಷಧ ಸಿಂಪಡಣೆ ಈ ರೋಗವನ್ನು ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां नाव की तरह ऊपर मुड़ें तो थ्रिप्स; उल्टे कटोरे की तरह नीचे मुड़ें तो पीले माइट्स का हमला है",
      "रोपाई के पहले 45 दिनों में कीटों को रोक लेने से वायरस फैलने से बच जाता है",
      "चिपचिपे ट्रैप और सही कीटनाशक के इस्तेमाल से यह रोग पूरी तरह नियंत्रित हो जाता है"
    ],
    "products": [
      {
        "name": "Spiromesifen 22.9 SC",
        "type": "chemical",
        "brand": "Oberon (Bayer)",
        "price": "₹550 – ₹780 / 100mL",
        "query": "Spiromesifen Oberon Bayer"
      },
      {
        "name": "Spinetoram 11.7 SC",
        "type": "chemical",
        "brand": "Delegate (Corteva)",
        "price": "₹950 – ₹1,350 / 100mL",
        "query": "Spinetoram 11.7 SC Delegate"
      },
      {
        "name": "Blue & Yellow Sticky Traps Combo",
        "type": "organic",
        "brand": "Agri Sticky Pads",
        "price": "₹320 – ₹450 / pack of 20",
        "query": "Sticky traps agriculture combo"
      }
    ]
  },
  {
    "crop": "Chilli (ಮೆಣಸಿನಕಾಯಿ)",
    "cropKn": "ಮೆಣಸಿನಕಾಯಿ",
    "cropHi": "मिर्च (चिल्ली)",
    "emoji": "🌶️",
    "disease": "Chilli Anthracnose / Fruit Rot / Dieback (Colletotrichum capsici)",
    "diseaseKn": "ಮೆಣಸಿನಕಾಯಿ ಹಣ್ಣು ಕೊಳೆ & ತುದಿ ಒಣಗುವ ರೋಗ",
    "diseaseHi": "मिर्च फल सड़न एवं डाईबैक (एन्थ्रेक्नोज)",
    "severity": "High",
    "remedy": "Spray Azoxystrobin 23 SC @ 1 mL/L or Difenoconazole 25 EC @ 1 mL/L or Mancozeb 75 WP @ 2.5 g/L during flowering and fruit ripening.",
    "remedyKn": "ಹೂವಾಡುವ ಮತ್ತು ಕಾಯಿ ಮಾಗುವ ಹಂತದಲ್ಲಿ Azoxystrobin 23 SC @ 1 mL/L ಅಥವಾ Difenoconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फूल आते और मिर्च लाल पकते समय Azoxystrobin 23 SC @ 1 mL/L या Difenoconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Seed treatment with Thiram @ 3 g/kg. Collect and burn dried twigs and diseased fruits.",
    "preventionKn": "Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಒಣಗಿದ ರೆಂಬೆಗಳು ಮತ್ತು ಕೊಳೆತ ಕಾಯಿಗಳನ್ನು ಸುಟ್ಟುಹಾಕಿ.",
    "preventionHi": "Thiram @ 3 g/kg से बीजोपचार करें। सूखी टहनियों और सड़े फलों को नष्ट करें।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L + Pseudomonas fluorescens @ 5 g/L at early pod set.",
    "organicTipKn": "ಕಾಯಿ ಕಚ್ಚುವಾಗ Trichoderma viride @ 5 g/L ಮತ್ತು Pseudomonas fluorescens @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "मिर्च बनते समय Trichoderma viride @ 5 g/L और Pseudomonas fluorescens @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Apply Potassium Nitrate (13:0:45) @ 5 g/L during fruit ripening to harden pericarp.",
    "fertilizerKn": "ಕಾಯಿಯ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಹಣ್ಣು ಮಾಗುವಾಗ 13:0:45 @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "मिर्च का छिलका मजबूत करने के लिए 13:0:45 @ 5 g/L का छिड़काव करें।",
    "scheme": "Spices Development Scheme (Byadagi Chilli Focus)",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Circular to elliptical sunken black spots with concentric rings of acervuli on ripe red fruits",
      "Twigs wither and dry from tip backwards turning white-gray (\"dieback\")",
      "Critical to protect ripening fruits; infections destroy commercial value of Byadagi dry chillies"
    ],
    "keyTakeawaysKn": [
      "ಮಾಗಿದ ಕೆಂಪು ಕಾಯಿಗಳ ಮೇಲೆ ಕಪ್ಪು ವೃತ್ತಾಕಾರದ ಕುಳಿಬಿದ್ದ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ರೆಂಬೆಗಳು ತುದಿಯಿಂದ ಬುಡದವರೆಗೆ ಒಣಗಿ ಬೂದು-ಬಿಳಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ (ಡೈಬ್ಯಾಕ್)",
      "ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ ಬೆಳೆಗಾರರು ಹಣ್ಣಾಗುವ ಹಂತದಲ್ಲಿ ಕಡ್ಡಾಯವಾಗಿ ರಕ್ಷಣಾ ಸಿಂಪಡಣೆ ಮಾಡಬೇಕು"
    ],
    "keyTakeawaysHi": [
      "पकी लाल मिर्च पर गोल धंसे हुए काले धब्बे बनते हैं जिनमें काले दाने दिखते हैं",
      "टहनियां ऊपर से नीचे की ओर सूखकर सफेद-धूसर हो जाती हैं (डाईबैक)",
      "मिर्च पकने के समय छिड़काव न करने पर पूरी लाल मिर्च की गुणवत्ता नष्ट हो जाती है"
    ],
    "products": [
      {
        "name": "Azoxystrobin 23 SC",
        "type": "chemical",
        "brand": "Amistar (Syngenta)",
        "price": "₹750 – ₹1,050 / 200mL",
        "query": "Azoxystrobin 23 SC Amistar"
      },
      {
        "name": "Difenoconazole 25 EC",
        "type": "chemical",
        "brand": "Score (Syngenta)",
        "price": "₹450 – ₹650 / 100mL",
        "query": "Difenoconazole 25 EC Score"
      }
    ]
  },
  {
    "crop": "Chilli (ಮೆಣಸಿನಕಾಯಿ)",
    "cropKn": "ಮೆಣಸಿನಕಾಯಿ",
    "cropHi": "मिर्च (चिल्ली)",
    "emoji": "🌶️",
    "disease": "Chilli Powdery Mildew (Leveillula taurica)",
    "diseaseKn": "ಮೆಣಸಿನಕಾಯಿ ಬೂದಿ ರೋಗ",
    "diseaseHi": "मिर्च चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
    "severity": "Medium",
    "remedy": "Spray Wettable Sulphur 80 WP @ 3 g/L or Myclobutanil 10 WP @ 1 g/L or Azoxystrobin + Difenoconazole @ 1 mL/L.",
    "remedyKn": "Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Myclobutanil 10 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Wettable Sulphur 80 WP @ 3 g/L या Myclobutanil 10 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Maintain proper plant spacing. Remove lower infected leaves during dry winter season.",
    "preventionKn": "ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ. ಚಳಿಗಾಲದಲ್ಲಿ ಕೆಳಗಿನ ರೋಗಪೀಡಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.",
    "preventionHi": "पौधों में उचित दूरी रखें। सर्दियों में निचली संक्रमित पत्तियों को तोड़कर हटा दें।",
    "organicTip": "Foliar spray of 10% sour buttermilk or 0.3% baking soda solution.",
    "organicTipKn": "10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಅಥವಾ 0.3% ಅಡುಗೆ ಸೋಡಾ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% खट्टी छाछ या 0.3% बेकिंग सोडा के घोल का छिड़काव करें।",
    "fertilizer": "Avoid excess nitrogen fertilization which stimulates dense succulent growth.",
    "fertilizerKn": "ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ; ಇದು ಎಲೆಗಳನ್ನು ದಟ್ಟವಾಗಿಸಿ ರೋಗ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    "fertilizerHi": "ज्यादा यूरिया न डालें; अत्यधिक नाइट्रोजन से यह फफूंद तेजी से पनपती है।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "White talcum powdery growth on underside of leaves with corresponding chlorotic yellow patches on upper surface",
      "Unlike other powdery mildews, this fungus is endophytic and penetrates deep into leaf mesophyll",
      "Causes severe premature shedding of leaves leaving bare branches"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಮತ್ತು ಮೇಲ್ಭಾಗದಲ್ಲಿ ಹಳದಿ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಇದು ಎಲೆಯ ಒಳಭಾಗಕ್ಕೆ ತೂರಿಕೊಳ್ಳುವ ಶಿಲೀಂಧ್ರವಾಗಿದ್ದು ಎಲೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಒಣಗಿಸುತ್ತದೆ",
      "ಎಲೆಗಳು ಉದುರಿ ಬರಿಯ ಕಡ್ಡಿಗಳು ಮಾತ್ರ ಉಳಿಯುವುದರಿಂದ ಇಳುವರಿ ಕುಸಿಯುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की निचली सतह पर सफेद पाउडर और ऊपरी सतह पर पीले धब्बे दिखाई देते हैं",
      "यह फफूंद पत्ती के अंदर तक घुस जाती है जिससे पत्ते बहुत तेजी से सूखते हैं",
      "पत्तियां झड़ जाती हैं और केवल नंगी टहनियां ही बची रह जाती हैं"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Myclobutanil 10 WP",
        "type": "chemical",
        "brand": "Systhane (Dow)",
        "price": "₹380 – ₹520 / 100g",
        "query": "Myclobutanil 10 WP Systhane"
      }
    ]
  },
  {
    "crop": "Chilli (ಮೆಣಸಿನಕಾಯಿ)",
    "cropKn": "ಮೆಣಸಿನಕಾಯಿ",
    "cropHi": "मिर्च (चिल्ली)",
    "emoji": "🌶️",
    "disease": "Bacterial Leaf Spot (Xanthomonas campestris pv. vesicatoria)",
    "diseaseKn": "ಮೆಣಸಿನಕಾಯಿ ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "मिर्च जीवाणु पर्ण चित्ती रोग (बैक्टीरियल लीफ स्पॉट)",
    "severity": "Medium",
    "remedy": "Spray Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L at 10-day intervals during wet weather.",
    "remedyKn": "Copper Oxychloride 50 WP @ 2.5 g/L ಜೊತೆಗೆ Streptocycline @ 0.1 g/L ಬೆರೆಸಿ 10 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L मिलाकर 10 दिन के अंतराल पर छिड़कें।",
    "prevention": "Soak seeds in 50°C hot water for 25 minutes before sowing. Avoid sprinkler irrigation.",
    "preventionKn": "ಬಿತ್ತನೆ ಮುನ್ನ ಬೀಜಗಳನ್ನು 50°C ಬಿಸಿ ನೀರಿನಲ್ಲಿ 25 ನಿಮಿಷ ನೆನೆಸಿ. ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ತಪ್ಪಿಸಿ.",
    "preventionHi": "बुवाई से पहले बीजों को 50°C गर्म पानी में 25 मिनट रखें। फव्वारा सिंचाई से बचें।",
    "organicTip": "Foliar spray of 20% fresh cow dung slurry supernatant + Copper Hydroxide @ 1.5 g/L.",
    "organicTipKn": "ಹಸುವಿನ ಸಗಣಿ ತಿಳಿ ನೀರು ಅಥವಾ Copper Hydroxide @ 1.5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "गाय के गोबर का छना हुआ पानी या Copper Hydroxide @ 1.5 g/L का छिड़काव करें।",
    "fertilizer": "Postpone nitrogen application until bacterial spotting subsides.",
    "fertilizerKn": "ರೋಗ ಲಕ್ಷಣಗಳು ಕಡಿಮೆಯಾಗುವವರೆಗೆ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡಬೇಡಿ.",
    "fertilizerHi": "रोग नियंत्रित होने तक यूरिया खाद डालना रोक दें।",
    "scheme": "State Horticulture Mission Crop Protection Package",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Small, dark, circular water-soaked spots with raised blisters on leaves and green fruits",
      "Causes severe defoliation and warty scab-like lesions on green chilli pods",
      "Seed treatment with hot water or antibiotics eradicates seed-borne infection"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಮತ್ತು ಹಸಿರು ಕಾಯಿಗಳ ಮೇಲೆ ಸಣ್ಣ ನೀರಿನಂತಹ ಬೊಕ್ಕೆ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಎಲೆಗಳು ಉದುರಿ ಕಾಯಿಗಳ ಮೇಲೆ ಗಟ್ಟಿಯಾದ ಕಜ್ಜಿ ಕಲೆಗಳು ಮೂಡುತ್ತವೆ",
      "ಬಿಸಿ ನೀರಿನ ಬೀಜೋಪಚಾರವು ಬೀಜದಲ್ಲಿರುವ ಬ್ಯಾಕ್ಟೀರಿಯಾವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಾಶಮಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों और हरी मिर्च पर पानीदार उभरे हुए फफोले जैसे छोटे काले धब्बे बनते हैं",
      "पत्तियां झड़ जाती हैं और मिर्च पर खुरंड जैसी पपड़ियां जम जाती हैं",
      "गर्म पानी से बीजोपचार करने से बीज जनित बैक्टीरिया पूरी तरह खत्म हो जाता है"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox 50",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Streptocycline 6g Pouch",
        "type": "chemical",
        "brand": "Hindustan Antibiotics",
        "price": "₹45 – ₹70 / 6g",
        "query": "Streptocycline 6g"
      }
    ]
  },
  {
    "crop": "Chilli (ಮೆಣಸಿನಕಾಯಿ)",
    "cropKn": "ಮೆಣಸಿನಕಾಯಿ",
    "cropHi": "मिर्च (चिल्ली)",
    "emoji": "🌶️",
    "disease": "Chilli Damping Off (Pythium aphanidermatum)",
    "diseaseKn": "ಮೆಣಸಿನಕಾಯಿ ಸಸಿ ಮಡಿ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "मिर्च आर्द्र-पतन (डैम्पिंग ऑफ / नर्सरी गलन)",
    "severity": "High",
    "remedy": "Drench nursery beds with Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L or Copper Oxychloride 50 WP @ 3 g/L at seedling emergence.",
    "remedyKn": "ಸಸಿ ಮಡಿಗೆ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ದ್ರಾವಣದಿಂದ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "नर्सरी की क्यारियों में Metalaxyl + Mancozeb @ 2 g/L या Copper Oxychloride @ 3 g/L के घोल से तर करें।",
    "prevention": "Raise nursery on 15 cm elevated raised beds. Soil solarization of nursery beds with clear polythene sheets for 30 days in summer.",
    "preventionKn": "15 cm ಎತ್ತರದ ಸಸಿ ಮಡಿಗಳನ್ನು ಮಾಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ಹೊದಿಸಿ ಮಣ್ಣನ್ನು ಬಿಸಿಲಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಕಾಯಿಸಿ (ಸಾಯಿಲ್ ಸೋಲರೈಸೇಶನ್).",
    "preventionHi": "15 cm उठी हुई क्यारियां बनाएं। गर्मियों में पारदर्शी पॉलिथीन से 30 दिन मिट्टी का सौरीकरण करें।",
    "organicTip": "Treat seeds with Trichoderma viride @ 10 g/kg + enrich nursery potting soil with Trichoderma viride @ 1 kg/100 kg compost.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಸಸಿ ಮಡಿಯ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/kg से बीजोपचार करें और नर्सरी की मिट्टी में ट्राइकोडर्मा मिलाएं।",
    "fertilizer": "Avoid over-fertilizing seedlings with nitrogen; maintain good bed drainage.",
    "fertilizerKn": "ಸಸಿಗಳಿಗೆ ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ; ನೀರು ಸುಲಭವಾಗಿ ಬಸಿದು ಹೋಗುವಂತೆ ಮಾಡಿ.",
    "fertilizerHi": "नर्सरी में अधिक यूरिया न डालें; पानी की निकासी उत्तम रखें।",
    "scheme": "Mission for Integrated Development of Horticulture",
    "schemeLink": "https://midh.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Pre-emergence damping off: Seeds rot before emerging from soil",
      "Post-emergence damping off: Water-soaked constriction at ground collar causing seedlings to topple over and collapse in circular patches",
      "Raised nursery beds and Trichoderma seed treatment ensure 100% healthy seedlings"
    ],
    "keyTakeawaysKn": [
      "ಮೊಳಕೆಯೊಡೆಯುವ ಮುನ್ನ ಬೀಜಗಳು ಕೊಳೆಯುತ್ತವೆ ಅಥವಾ ಮೊಳಕೆಯೊಡೆದ ನಂತರ ಕಾಂಡದ ಬುಡ ಕೊಳೆತು ಸಸಿಗಳು ನೆಲಕ್ಕುರುಳುತ್ತವೆ",
      "ಸಸಿ ಮಡಿಯಲ್ಲಿ ವೃತ್ತಾಕಾರವಾಗಿ ನೂರಾರು ಸಸಿಗಳು ಒಟ್ಟಿಗೆ ಬಾಡಿ ಸಾಯುತ್ತವೆ",
      "ಎತ್ತರಿಸಿದ ಸಸಿ ಮಡಿ ಮತ್ತು ಟ್ರೈಕೋಡರ್ಮಾ ಬೀಜೋಪಚಾರವು ಶೇ. 100ರಷ್ಟು ಆರೋಗ್ಯಕರ ಸಸಿಗಳನ್ನು ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "उगने से पहले बीज सड़ जाते हैं या उगने के बाद तने के आधार से गलकर पौधे जमीन पर गिर जाते हैं",
      "नर्सरी में गोल पैच में सारे पौधे एक साथ गिरकर गल जाते हैं",
      "उठी हुई क्यारियां और ट्राइकोडर्मा से बीजोपचार शत-प्रतिशत स्वस्थ पौध की गारंटी है"
    ],
    "products": [
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Brinjal / Eggplant (ಬದನೆಕಾಯಿ)",
    "cropKn": "ಬದನೆಕಾಯಿ",
    "cropHi": "बैंगन (ब्रिंजल)",
    "emoji": "🍆",
    "disease": "Shoot and Fruit Borer (Leucinodes orbonalis)",
    "diseaseKn": "ಬದನೆ ಸುಳಿ ಮತ್ತು ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು",
    "diseaseHi": "बैंगन प्ररोह एवं फल छेदक (शूट एंड फ्रूट बोरर)",
    "severity": "High",
    "remedy": "Clip and destroy wilted shoots weekly. Spray Emamectin Benzoate 5 SG @ 0.4 g/L or Chlorantraniliprole 18.5 SC @ 0.4 mL/L or Spinosad 45 SC @ 0.3 mL/L at ETL.",
    "remedyKn": "ವಾರಕ್ಕೊಮ್ಮೆ ಬಾಡಿದ ಸುಳಿಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಮಾಡಿ. Emamectin Benzoate 5 SG @ 0.4 g/L ಅಥವಾ Chlorantraniliprole 18.5 SC @ 0.4 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "मुरझाई टहनियों को काटकर नष्ट करें। Emamectin Benzoate 5 SG @ 0.4 g/L या Chlorantraniliprole 18.5 SC @ 0.4 mL/L का छिड़काव करें।",
    "prevention": "Install Lucin-Lure pheromone traps @ 12 traps/acre. Prompt removal of bored fruits.",
    "preventionKn": "ಎಕರೆಗೆ 12 ಲೂಸಿನ್-ಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಹುಳು ಬಿದ್ದ ಕಾಯಿಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ನಾಶಮಾಡಿ.",
    "preventionHi": "12 लूसिन-ल्यूर फेरोमोन ट्रैप प्रति एकड़ लगाएं। छेद वाले बैंगन तुरंत तोड़कर नष्ट करें।",
    "organicTip": "Release Trichogramma chilonis @ 50,000/acre weekly 4 times from flowering.",
    "organicTipKn": "ಹೂವಾಡುವ ಹಂತದಿಂದ ವಾರಕ್ಕೊಮ್ಮೆ Trichogramma chilonis ಪರಾವಲಂಬಿಗಳನ್ನು ಬಿಡಿ.",
    "organicTipHi": "फूल आते समय Trichogramma chilonis @ 50,000/एकड़ की दर से 4 बार छोड़ें।",
    "fertilizer": "Apply balanced NPK with Potassium; avoid excessive nitrogen promoting soft succulent shoots.",
    "fertilizerKn": "ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ; ಸಮತೋಲಿತ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "ज्यादा यूरिया न डालें जिससे टहनियां नरम होकर कीट को आकर्षित करती हैं।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Drooping, wilting, and drying of tender terminal shoots in vegetative stage",
      "Larva bores into developing fruits making exit holes plugged with excreta and rendering fruits unmarketable",
      "Pheromone mass-trapping and weekly shoot clipping prevents fruit damage"
    ],
    "keyTakeawaysKn": [
      "ಬೆಳವಣಿಗೆ ಹಂತದಲ್ಲಿ ಎಳೆಯ ಸುಳಿಗಳು ಬಾಡಿ ಕೆಳಮುಖವಾಗಿ ಒಣಗುತ್ತವೆ",
      "ಕಾಯಿಗಳೊಳಗೆ ನುಗ್ಗಿ ಹಿಕ್ಕೆಯಿಂದ ಮುಚ್ಚಿದ ರಂಧ್ರಗಳನ್ನು ಮಾಡಿ ಬದನೆಕಾಯಿಯನ್ನು ತಿನ್ನಲು ಯೋಗ್ಯವಲ್ಲದಂತೆ ಮಾಡುತ್ತದೆ",
      "ಫೆರೋಮೊನ್ ಮೋಹಕ ಬಲೆಗಳು ಮತ್ತು ಒಣ ಸುಳಿಗಳನ್ನು ಕತ್ತರಿಸುವುದು ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ"
    ],
    "keyTakeawaysHi": [
      "शुरुआती अवस्था में नई कोमल टहनियां मुरझाकर नीचे लटक जाती हैं और सूख जाती हैं",
      "सूंड़ी फल में घुसकर मल से भरा छेद बना देती है जिससे बैंगन बाजार में बिकने लायक नहीं रहता",
      "फेरोमोन ट्रैप लगाना और मुरझाई टहनियों को तोड़ना इस कीट का सबसे सफल इलाज है"
    ],
    "products": [
      {
        "name": "Emamectin Benzoate 5 SG",
        "type": "chemical",
        "brand": "Proclaim (Syngenta)",
        "price": "₹420 – ₹590 / 100g",
        "query": "Emamectin Benzoate 5 SG"
      },
      {
        "name": "Spinosad 45 SC",
        "type": "chemical",
        "brand": "Tracer (Dow)",
        "price": "₹950 – ₹1,350 / 75mL",
        "query": "Spinosad 45 SC Tracer"
      },
      {
        "name": "Brinjal Fruit Borer Trap (Lucin-Lure)",
        "type": "organic",
        "brand": "PCI Phero Trap",
        "price": "₹130 – ₹190 / trap",
        "query": "Brinjal fruit borer pheromone trap"
      }
    ]
  },
  {
    "crop": "Brinjal / Eggplant (ಬದನೆಕಾಯಿ)",
    "cropKn": "ಬದನೆಕಾಯಿ",
    "cropHi": "बैंगन (ब्रिंजल)",
    "emoji": "🍆",
    "disease": "Bacterial Wilt (Ralstonia solanacearum)",
    "diseaseKn": "ಬದನೆ ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಸೊರಗು ರೋಗ",
    "diseaseHi": "बैंगन जीवाणु उकठा रोग (बैक्टीरियल विल्ट)",
    "severity": "High",
    "remedy": "Root drench with Copper Oxychloride 50 WP @ 3 g/L + Streptocycline @ 0.2 g/L. Apply Bleaching Powder @ 5 kg/acre with irrigation.",
    "remedyKn": "ಗಿಡದ ಬುಡಕ್ಕೆ Copper Oxychloride 50 WP @ 3 g/L ಜೊತೆಗೆ Streptocycline @ 0.2 g/L ಬೆರೆಸಿ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ. ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್ ನೀಡಿ.",
    "remedyHi": "जड़ों में Copper Oxychloride 50 WP @ 3 g/L + Streptocycline @ 0.2 g/L डालें। सिंचाई में 5 kg/एकड़ ब्लीचिंग पाउडर मिलाएं।",
    "prevention": "Cultivate resistant varieties like Arka Anand, Arka Nidhi, Arka Keshav. Avoid tomato-potato rotations.",
    "preventionKn": "ಅರ್ಕಾ ಆನಂದ್, ಅರ್ಕಾ ನಿಧಿ, ಅರ್ಕಾ ಕೇಶವ್ ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "अर्का आनंद, अर्का निधि, अर्का केशव जैसी विल्ट रोधी किस्में लगाएं।",
    "organicTip": "Soil application of Pseudomonas fluorescens @ 2.5 kg/acre enriched in 100 kg farmyard manure.",
    "organicTipKn": "100 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ Pseudomonas fluorescens @ 2.5 kg ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "100 kg गोबर खाद में Pseudomonas fluorescens @ 2.5 kg मिलाकर खेत में डालें।",
    "fertilizer": "Apply adequate Potash; avoid root wounding during hoeing and weeding.",
    "fertilizerKn": "ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ಕಳೆ ಕೀಳುವಾಗ ಬೇರುಗಳಿಗೆ ಗಾಯವಾಗದಂತೆ ಎಚ್ಚರವಹಿಸಿ.",
    "fertilizerHi": "पर्याप्त पोटाश दें; निराई-गुड़ाई में जड़ों को कटने से बचाएं।",
    "scheme": "ICAR-IIHR Vegetable Seed Technology Program",
    "schemeLink": "https://iihr.res.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Sudden wilting of healthy green plants during sunny days followed by complete plant death",
      "Vascular bundle browning inside lower stem with white bacterial streaming in water",
      "Use resistant varieties Arka Anand and Arka Keshav developed by ICAR-IIHR Bengaluru"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಹಸಿರಾಗಿರುವಾಗಲೇ ಬಿಸಿಲಿನಲ್ಲಿ ಗಿಡಗಳು ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಬಾಡಿ ಸಾಯುತ್ತವೆ",
      "ಕಾಂಡವನ್ನು ಸೀಳಿದಾಗ ಒಳಗಿನ ನರಗಳು ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುತ್ತವೆ ಮತ್ತು ನೀರಿನಲ್ಲಿ ಬಿಳಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ದ್ರವ ಸೋರುತ್ತದೆ",
      "ಬೆಂಗಳೂರಿನ IIHR ಬಿಡುಗಡೆ ಮಾಡಿರುವ ಅರ್ಕಾ ಆನಂದ್ ಮತ್ತು ಅರ್ಕಾ ಕೇಶವ್ ತಳಿಗಳು ರೋಗ ನಿರೋಧಕವಾಗಿವೆ"
    ],
    "keyTakeawaysHi": [
      "धूप में हरा-भरा पौधा अचानक मुरझा जाता है और फिर कभी नहीं संभलता",
      "तने को काटकर पानी में रखने पर सफेद बैक्टीरिया का धागा निकलता है",
      "ICAR-IIHR की अर्का आनंद और अर्का केशव किस्में इस रोग से पूरी तरह सुरक्षित हैं"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Pseudomonas fluorescens",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹180 – ₹240 / 1kg",
        "query": "Pseudomonas fluorescens 1kg"
      }
    ]
  },
  {
    "crop": "Brinjal / Eggplant (ಬದನೆಕಾಯಿ)",
    "cropKn": "ಬದನೆಕಾಯಿ",
    "cropHi": "बैंगन (ब्रिंजल)",
    "emoji": "🍆",
    "disease": "Phomopsis Blight & Fruit Rot (Phomopsis vexans)",
    "diseaseKn": "ಬದನೆ ಫೋಮೊಪ್ಸಿಸ್ ಅಂಗಮಾರಿ & ಹಣ್ಣು ಕೊಳೆ",
    "diseaseHi": "बैंगन फोमोप्सिस झुलसा एवं फल सड़न रोग",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L or Azoxystrobin 23 SC @ 1 mL/L upon noticing circular leaf spots or fruit lesions.",
    "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Azoxystrobin 23 SC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L या Azoxystrobin 23 SC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Seed treatment with Thiram @ 3 g/kg. Collect and destroy all infected fruits and crop debris.",
    "preventionKn": "Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ರೋಗಪೀಡಿತ ಕಾಯಿಗಳನ್ನು ಆರಿಸಿ ನಾಶಮಾಡಿ.",
    "preventionHi": "Thiram @ 3 g/kg से बीजोपचार करें। संक्रमित फलों को इकट्ठा करके नष्ट करें।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L combined with 5% cow urine.",
    "organicTipKn": "Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/L और 5% गोमूत्र मिलाकर छिड़काव करें।",
    "fertilizer": "Apply balanced NPK; avoid excessive sprinkler irrigation.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಅತಿಯಾದ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "संतुलित खाद दें; फव्वारा सिंचाई से बचें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Circular buff-colored to brown spots with numerous tiny black pycnidia on leaves",
      "Soft, watery, pale-brown sunken rotting lesions covering large parts of developing brinjal fruits",
      "Seed treatment combined with protective fungicide spray gives complete protection"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಕಪ್ಪು ಚುಕ್ಕೆಗಳುಳ್ಳ ಕಂದು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಬದನೆಕಾಯಿಗಳ ಮೇಲೆ ಮೆದುವಾದ, ನೀರುಕಾರುವ ಕಂದು ಬಣ್ಣದ ದೊಡ್ಡ ಕೊಳೆತ ಗುಳಿಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಬೀಜೋಪಚಾರ ಮತ್ತು ಸರಿಯಾದ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಣೆಯಿಂದ ಬೆಳೆಯನ್ನು ಉಳಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर छोटे काले दानों वाले गोल भूरे धब्बे बनते हैं",
      "बैंगन के फलों पर धंसे हुए पानीदार बड़े भूरे सड़े हुए गड्ढे बन जाते हैं",
      "बीजोपचार और समय पर फफूंदनाशक का छिड़काव फसल को पूरी सुरक्षा देता है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Brinjal / Eggplant (ಬದನೆಕಾಯಿ)",
    "cropKn": "ಬದನೆಕಾಯಿ",
    "cropHi": "बैंगन (ब्रिंजल)",
    "emoji": "🍆",
    "disease": "Little Leaf Disease (Phytoplasma)",
    "diseaseKn": "ಬದನೆ ಕಿರು ಎಲೆ ರೋಗ (ಲಿಟಲ್ ಲೀಫ್)",
    "diseaseHi": "बैंगन लघु पर्ण रोग (लिटिल लीफ ऑफ ब्रिंजल)",
    "severity": "High",
    "remedy": "Spray Dimethoate 30 EC @ 1.7 mL/L or Oxydemeton-methyl 25 EC @ 1.5 mL/L or Imidacloprid 17.8 SL @ 0.5 mL/L to control leafhopper vector (Hishimonus phycitis). Uproot and burn diseased plants.",
    "remedyKn": "ಜಿಗಿಹುಳುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ Dimethoate 30 EC @ 1.7 mL/L ಅಥವಾ Imidacloprid 17.8 SL @ 0.5 mL/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.",
    "remedyHi": "लीफहॉपर कीट की रोकथाम के लिए Dimethoate 30 EC @ 1.7 mL/L या Imidacloprid 17.8 SL @ 0.5 mL/L का छिड़काव करें। रोगी पौधे उखाड़कर जलाएं।",
    "prevention": "Rogue out affected plants as soon as noticed. Dip seedling roots in Tetracycline hydrochloride @ 500 ppm for 15 minutes before transplanting.",
    "preventionKn": "ರೋಗ ಕಂಡ ತಕ್ಷಣ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ. ನಾಟಿಗೆ ಮುನ್ನ ಸಸಿಗಳ ಬೇರನ್ನು ಟೆಟ್ರಾಸೈಕ್ಲಿನ್ ದ್ರಾವಣದಲ್ಲಿ ಮುಳುಗಿಸಿ.",
    "preventionHi": "रोगग्रस्त पौधों को तुरंत उखाड़ें। रोपाई से पहले पौध की जड़ों को टेट्रासाइक्लिन के घोल में डुबोएं।",
    "organicTip": "Spray 5% neem seed kernel extract (NSKE) weekly to repel leafhoppers.",
    "organicTipKn": "ಜಿಗಿಹುಳುಗಳನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸಲು ಪ್ರತಿ ವಾರ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "लीफहॉपर को भगाने के लिए 5% नीम के अर्क का साप्ताहिक छिड़काव करें।",
    "fertilizer": "Foliar spray of Ferrous Sulphate @ 5 g/L to relieve severe chlorosis on surviving branches.",
    "fertilizerKn": "ಹಳದಿ ಬಣ್ಣ ನಿವಾರಿಸಲು Ferrous Sulphate @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "पीलापन दूर करने के लिए फेरस सल्फेट @ 5 g/L का छिड़काव करें।",
    "scheme": "State Horticulture Mission Pest Alert",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#16a34a",
    "keyTakeaways": [
      "Extremely reduced, minute, soft, glabrous leaves produced in dense bushy clusters resembling a witch broom",
      "Plants fail to flower or floral parts transform into green leafy structures (phyllody) bearing no fruits",
      "Leafhopper-transmitted phytoplasma; early rogueing prevents spread"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಅತ್ಯಂತ ಸಣ್ಣದಾಗಿ, ತೆಳ್ಳಗಾಗಿ, ಪೊರಕೆಯಂತೆ ಗುಂಪಾಗಿ ಬೆಳೆಯುತ್ತವೆ",
      "ಹೂವುಗಳು ಅರಳುವುದಿಲ್ಲ ಅಥವಾ ಹೂವುಗಳೇ ಸಣ್ಣ ಎಲೆಗಳಾಗಿ ಬದಲಾಗಿ ಕಾಯಿ ಕಟ್ಟುವುದು ಸಂಪೂರ್ಣ ನಿಲ್ಲುತ್ತದೆ",
      "ಜಿಗಿಹುಳುಗಳಿಂದ ಹರಡುವ ರೋಗ; ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಆರಂಭದಲ್ಲೇ ಕಿತ್ತುಹಾಕುವುದು ಅತ್ಯಗತ್ಯ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां बहुत छोटी, पतली और कोमल होकर झाड़ू जैसे घने गुच्छों में बदल जाती हैं",
      "फूल नहीं आते या फूलों की जगह हरी पत्तियां उग आती हैं और फल बिल्कुल नहीं बनते",
      "लीफहॉपर द्वारा फैलता है; प्रभावित पौधों को शुरू में ही उखाड़कर फेंकें"
    ],
    "products": [
      {
        "name": "Dimethoate 30 EC",
        "type": "chemical",
        "brand": "Rogor",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Dimethoate 30 EC Rogor"
      },
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      }
    ]
  },
  {
    "crop": "Brinjal / Eggplant (ಬದನೆಕಾಯಿ)",
    "cropKn": "ಬದನೆಕಾಯಿ",
    "cropHi": "बैंगन (ब्रिंजल)",
    "emoji": "🍆",
    "disease": "Brinjal Damping Off (Pythium debaryanum)",
    "diseaseKn": "ಬದನೆ ಸಸಿ ಮಡಿ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "बैंगन आर्द्र-पतन (डैम्पिंग ऑफ / नर्सरी सड़न)",
    "severity": "High",
    "remedy": "Drench nursery with Copper Oxychloride 50 WP @ 3 g/L or Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at seedling emergence.",
    "remedyKn": "ಸಸಿ ಮಡಿಗೆ Copper Oxychloride 50 WP @ 3 g/L ಅಥವಾ Metalaxyl + Mancozeb @ 2 g/L ದ್ರಾವಣದಿಂದ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "नर्सरी में Copper Oxychloride 50 WP @ 3 g/L या Metalaxyl + Mancozeb @ 2 g/L के घोल से क्यारी को तर करें।",
    "prevention": "Use raised nursery beds (15 cm high). Solarize nursery soil with transparent polythene in summer.",
    "preventionKn": "15 cm ಎತ್ತರಿಸಿದ ಸಸಿ ಮಡಿಗಳನ್ನು ಮಾಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಮಣ್ಣನ್ನು ಬಿಸಿಲಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಕಾಯಿಸಿ.",
    "preventionHi": "15 cm उठी हुई क्यारियां बनाएं। गर्मियों में पारदर्शी पन्नी से मिट्टी का सौरीकरण करें।",
    "organicTip": "Seed treatment with Trichoderma viride @ 10 g/kg + Pseudomonas fluorescens @ 10 g/kg seed.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ಮತ್ತು Pseudomonas fluorescens @ 10 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/kg और Pseudomonas fluorescens @ 10 g/kg से बीजोपचार करें।",
    "fertilizer": "Avoid excess watering and heavy nitrogen in nursery beds.",
    "fertilizerKn": "ಸಸಿ ಮಡಿಯಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ ಮತ್ತು ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "नर्सरी में जलभराव न होने दें और ज्यादा यूरिया न डालें।",
    "scheme": "Mission for Integrated Development of Horticulture",
    "schemeLink": "https://midh.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Seedlings rot at ground level and topple over in circular patches",
      "High seedling density and poor drainage trigger sudden damping off",
      "Raised beds combined with bioagent seed treatment guarantees healthy seedlings"
    ],
    "keyTakeawaysKn": [
      "ನೆಲಮಟ್ಟದಲ್ಲಿ ಕಾಂಡ ಕೊಳೆತು ಸಸಿಗಳು ನೆಲಕ್ಕುರುಳಿ ಸಾಯುತ್ತವೆ",
      "ದಟ್ಟ ಬಿತ್ತನೆ ಮತ್ತು ನೀರು ನಿಲ್ಲುವ ಸ್ಥಳಗಳಲ್ಲಿ ರೋಗವು ತೀವ್ರವಾಗಿ ಉಲ್ಬಣಗೊಳ್ಳುತ್ತದೆ",
      "ಎತ್ತರಿಸಿದ ಸಸಿ ಮಡಿ ಮತ್ತು ಜೈವಿಕ ಬೀಜೋಪಚಾರದಿಂದ ಆರೋಗ್ಯಕರ ಸಸಿಗಳನ್ನು ಪಡೆಯಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "पौधे जमीन की सतह के पास से गलकर गिर जाते हैं और मर जाते हैं",
      "घनी नर्सरी और पानी भरने से यह फफूंद अचानक फैल जाती है",
      "उठी हुई क्यारियां और जैव-बीजोपचार स्वस्थ पौध की गारंटी है"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Banana (ಬಾಳೆ)",
    "cropKn": "ಬಾಳೆ",
    "cropHi": "केला (बनाना)",
    "emoji": "🍌",
    "disease": "Panama Wilt (Fusarium oxysporum f.sp. cubense - Race 1 & TR4)",
    "diseaseKn": "ಬಾಳೆ ಪನಾಮ ಸೊರಗು ರೋಗ",
    "diseaseHi": "केला पनामा उकठा रोग (पनामा विल्ट)",
    "severity": "High",
    "remedy": "Capsule application or drenching of Carbendazim 50 WP @ 2 g/L into pseudostem/rhizome. Inject 3 mL of 2% Carbendazim into corm. Uproot and burn diseased stools and isolate area with lime.",
    "remedyKn": "ಗೆಡ್ಡೆಗೆ Carbendazim 50 WP @ 2 g/L ದ್ರಾವಣದಿಂದ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ ಅಥವಾ 3 mL ಇಂಜೆಕ್ಟ್ ಮಾಡಿ. ರೋಗಪೀಡಿತ ಬಾಳೆ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ ಸುಣ್ಣ ಹಾಕಿ.",
    "remedyHi": "Carbendazim 50 WP @ 2 g/L का जड़ में घोल डालें या तने में 3 mL इंजेक्शन दें। संक्रमित पौधों को उखाड़कर जलाएं और चूना डालें।",
    "prevention": "Plant tissue culture Grand Naine (G9) plants. Avoid planting susceptible varieties (Nanjangud Rasabale) in infected fields.",
    "preventionKn": "ಅಂಗಾಂಶ ಕೃಷಿಯ ಗ್ರ್ಯಾಂಡ್ ನೈನ್ (G9) ಸಸಿಗಳನ್ನು ನಾಟಿ ಮಾಡಿ. ಸೋಂಕಿತ ಜಮೀನಿನಲ್ಲಿ ರಸಬಾಳೆ ಬೆಳೆಯಬೇಡಿ.",
    "preventionHi": "टिशू कल्चर ग्रैंड नैन (G9) पौधे लगाएं। संक्रमित खेतों में संवेदनशील किस्में न लगाएं।",
    "organicTip": "Dip suckers in Pseudomonas fluorescens @ 10 g/L for 30 minutes. Apply 5 kg neem cake + 50g Trichoderma harzianum per plant.",
    "organicTipKn": "ಸಸಿಗಳನ್ನು Pseudomonas fluorescens @ 10 g/L ನಲ್ಲಿ 30 ನಿಮಿಷ ನೆನೆಸಿ. ಗಿಡಕ್ಕೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು Trichoderma ಹಾಕಿ.",
    "organicTipHi": "कंदों को Pseudomonas fluorescens @ 10 g/L में 30 मिनट डुबोएं। 5 kg नीम खली और ट्राइकोडर्मा डालें।",
    "fertilizer": "Apply 200:50:300 g NPK per plant. High potassium nutrition builds cell resistance.",
    "fertilizerKn": "ಪ್ರತಿ ಗಿಡಕ್ಕೆ 200:50:300 g NPK ಗೊಬ್ಬರ ನೀಡಿ. ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ರೋಗ ತಡೆಯಲು ಅಗತ್ಯ.",
    "fertilizerHi": "प्रति पौधा 200:50:300 g NPK दें। अधिक पोटाश रोग से लड़ने में मदद करता है।",
    "scheme": "ICAR-NRCB Banana Health & Tissue Culture Technology Programme",
    "schemeLink": "https://nrcb.icar.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Yellowing of lower leaf margins progressing inward, followed by petiole buckling and skirt-like hanging around pseudostem",
      "Pseudostem shows longitudinal splitting; cross-section reveals continuous dark reddish-brown vascular discoloration",
      "Soil-borne fungus; Grand Naine (G9) provides high resistance against Race 1"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಎಲೆಗಳ ಅಂಚು ಹಳದಿಯಾಗಿ ಬಾಗಿ, ಗರಿಗಳು ಮುರಿದು ಕಾಂಡದ ಸುತ್ತಲೂ ಲಂಗದಂತೆ ನೇತಾಡುತ್ತವೆ",
      "ಬುಡದ ಕಾಂಡವು ಉದ್ದುದ್ದಕ್ಕೆ ಸೀಳುತ್ತದೆ ಮತ್ತು ಅಡ್ಡವಾಗಿ ಕತ್ತರಿಸಿದಾಗ ಒಳಗಿನ ನರಗಳು ಕಂದು-ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುತ್ತವೆ",
      "ಮಣ್ಣಿನ ಮೂಲಕ ಹರಡುವ ರೋಗ; ಗ್ರ್ಯಾಂಡ್ ನೈನ್ (G9) ತಳಿಯು ಈ ರೋಗಕ್ಕೆ ಉತ್ತಮ ಪ್ರತಿರೋಧಕ ಶಕ್ತಿ ಹೊಂದಿದೆ"
    ],
    "keyTakeawaysHi": [
      "निचली पत्तियों के किनारे पीले होकर मुड़ते हैं और पत्तियां तने के चारों ओर लटक जाती हैं",
      "तने में लंबी दरारें पड़ जाती हैं और काटने पर भीतर की नसें लाल-भूरी दिखाई देती हैं",
      "मिट्टी जनित रोग है; ग्रैंड नैन (G9) किस्म इसके खिलाफ बेहतरीन प्रतिरोधक है"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Trichoderma harzianum",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹170 – ₹250 / 1kg",
        "query": "Trichoderma harzianum 1kg"
      },
      {
        "name": "Tissue Culture Banana G9 Plants",
        "type": "organic",
        "brand": "Horticulture Lab Certified",
        "price": "₹15 – ₹25 / sapling",
        "query": "Grand naine tissue culture banana plant"
      }
    ]
  },
  {
    "crop": "Banana (ಬಾಳೆ)",
    "cropKn": "ಬಾಳೆ",
    "cropHi": "केला (बनाना)",
    "emoji": "🍌",
    "disease": "Sigatoka Leaf Spot (Pseudocercospora fijiensis)",
    "diseaseKn": "ಬಾಳೆ ಸಿಗಟೋಕ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "केला सिगाटोका पर्ण चित्ती रोग (सिगाटोका लीफ स्पॉट)",
    "severity": "High",
    "remedy": "Spray Propiconazole 25 EC @ 1 mL/L + Mineral oil (Banole) @ 10 mL/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L at 20-day intervals during monsoon.",
    "remedyKn": "ಮಳೆಗಾಲದಲ್ಲಿ Propiconazole 25 EC @ 1 mL/L ಜೊತೆಗೆ ಖನಿಜ ತೈಲ (Banole) @ 10 mL/L ಅಥವಾ Amistar Top @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "मानसून में Propiconazole 25 EC @ 1 mL/L + मिनरल ऑयल (बैनोल) @ 10 mL/L या Amistar Top @ 1 mL/L का 20 दिन पर छिड़काव करें।",
    "prevention": "Deleafing: Cut and destroy heavily spotted leaves. Maintain proper spacing (1.8x1.8 m) and good field drainage.",
    "preventionKn": "ಹೆಚ್ಚು ರೋಗಪೀಡಿತ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ (ಡಿಲೀಫಿಂಗ್). ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ ಮತ್ತು ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "preventionHi": "अधिक धब्बों वाली पत्तियों को काटकर जलाएं। उचित दूरी रखें और जल निकासी अच्छी रखें।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 5 g/L combined with mineral oil 1%.",
    "organicTipKn": "Pseudomonas fluorescens @ 5 g/L ಜೊತೆಗೆ 1% ಮಿನರಲ್ ಆಯಿಲ್ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 5 g/L और 1% मिनरल ऑयल का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply Potash (MOP) @ 300g per plant in split doses to harden foliar tissue against fungal penetration.",
    "fertilizerKn": "ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಪ್ರತಿ ಗಿಡಕ್ಕೆ 300g ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರವನ್ನು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
    "fertilizerHi": "पत्तियों को मजबूत करने के लिए प्रति पौधा 300g पोटाश खाद किस्तों में दें।",
    "scheme": "National Horticulture Mission Banana Productivity Scheme",
    "schemeLink": "https://midh.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Small chlorotic specks growing into yellow-brown streaks that rapidly expand into oval necrotic lesions with ash-grey centers",
      "Severe infection burns down functional leaf canopy causing premature fruit ripening and thin unmarketable bunches",
      "Adding mineral oil to triazole fungicide spray enhances control efficacy by 40%"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಹಳದಿ ಗೆರೆಗಳು ಉಂಟಾಗಿ, ನಂತರ ಮಧ್ಯದಲ್ಲಿ ಬೂದಿ ಬಣ್ಣದ ಕಂದು ಕಲೆಗಳಾಗುತ್ತವೆ",
      "ತೀವ್ರವಾದಾಗ ಇಡೀ ಎಲೆಗಳು ಒಣಗಿ, ಗೊನೆಯು ಬಲಿಯುವ ಮುನ್ನವೇ ಅಕಾಲಿಕವಾಗಿ ಹಣ್ಣಾಗುತ್ತದೆ",
      "ಶಿಲೀಂಧ್ರನಾಶಕದೊಂದಿಗೆ ಮಿನರಲ್ ಆಯಿಲ್ (Banole) ಬೆರೆಸಿ ಸಿಂಪಡಿಸುವುದರಿಂದ ರೋಗ ನಿಯಂತ್ರಣ ಶೇ. 40ರಷ್ಟು ಹೆಚ್ಚುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर छोटी पीली धारियां बनती हैं जो बाद में बीच से राख जैसे धूसर बड़े घावों में बदल जाती हैं",
      "गंभीर संक्रमण से पूरी पत्तियां जल जाती हैं और फल समय से पहले छोटे ही पक जाते हैं",
      "फफूंदनाशक में मिनरल ऑयल मिलाने से इसका असर 40% तक बढ़ जाता है"
    ],
    "products": [
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt (Syngenta)",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      },
      {
        "name": "Mineral Oil for Sigatoka (Banole)",
        "type": "chemical",
        "brand": "Banole / Agri Oil",
        "price": "₹320 – ₹480 / 1L",
        "query": "Banole mineral oil banana spray"
      }
    ]
  },
  {
    "crop": "Banana (ಬಾಳೆ)",
    "cropKn": "ಬಾಳೆ",
    "cropHi": "केला (बनाना)",
    "emoji": "🍌",
    "disease": "Banana Bunchy Top Virus (BBTV)",
    "diseaseKn": "ಬಾಳೆ ಗೊಂಚಲು ಸುಳಿ ವೈರಸ್ (ಬಂಚಿ ಟಾಪ್)",
    "diseaseHi": "केला गुच्छा शीर्ष रोग (बंची टॉप वायरस)",
    "severity": "High",
    "remedy": "Control aphid vector (Pentalonia nigronervosa) by injecting Dimethoate 30 EC @ 1 mL/plant or spraying Imidacloprid 17.8 SL @ 0.5 mL/L into leaf axils. Eradicate infected mats by injecting 2,4-D (4g in 100 mL water).",
    "remedyKn": "ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಬಾಳೆ ಗಿಡವನ್ನು ಕೊಲ್ಲಲು 2,4-D ದ್ರಾವಣವನ್ನು ಇಂಜೆಕ್ಟ್ ಮಾಡಿ ಸಂಪೂರ್ಣ ನಾಶಮಾಡಿ.",
    "remedyHi": "माहू की रोकथाम के लिए Imidacloprid 17.8 SL @ 0.5 mL/L पत्तियों के जोड़ों में छिड़कें। रोगी पौधों को नष्ट करने के लिए 2,4-D का इंजेक्शन दें।",
    "prevention": "Strict quarantine and certified virus-free tissue culture plantlets. Avoid collecting suckers from infected plantations.",
    "preventionKn": "ಪ್ರಮಾಣೀಕೃತ ವೈರಸ್ ಮುಕ್ತ ಅಂಗಾಂಶ ಕೃಷಿ ಸಸಿಗಳನ್ನು ಮಾತ್ರ ನಾಟಿ ಮಾಡಿ. ರೋಗಪೀಡಿತ ತೋಟದಿಂದ ಕಂದುಗಳನ್ನು ತರಬೇಡಿ.",
    "preventionHi": "हमेशा प्रमाणित वायरस-मुक्त टिशू कल्चर पौध ही लगाएं। संक्रमित बाग से कंद न लें।",
    "organicTip": "Foliar spray of 5% neem oil emulsion directed into heart leaf axils.",
    "organicTipKn": "ಸುಳಿಯ ಬುಡಕ್ಕೆ 5% ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "कली के बीच 5% नीम के तेल का छिड़काव करें।",
    "fertilizer": "Apply balanced nutrition; avoid over-irrigation.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಅತಿಯಾಗಿ ನೀರು ಕಟ್ಟಬೇಡಿ.",
    "fertilizerHi": "संतुलित खाद दें; अधिक पानी न लगाएं।",
    "scheme": "Plant Quarantine & Certified Nursery Support",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#16a34a",
    "keyTakeaways": [
      "Leaves become progressively smaller, narrow, brittle, chlorotic with upright crowded rosette at crown (\"bunchy top\")",
      "Characteristic dark green \"Morse code\" dots and dashes along secondary leaf veins",
      "Plants infected early never produce bunches; rogueing with aphid control is vital"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಗಿಡ್ಡವಾಗಿ, ಕಿರಿದಾಗಿ, ಸುಲಭವಾಗಿ ಮುರಿಯುವಂತಾಗಿ ಸುಳಿಯಲ್ಲಿ ಪೊರಕೆಯಂತೆ ಗುಂಪಾಗಿ ನಿಲ್ಲುತ್ತವೆ (\"ಗೊಂಚಲು ಸುಳಿ\")",
      "ಎಲೆಯ ನರಗಳ ಉದ್ದಕ್ಕೂ ಗಾಢ ಹಸಿರು ಚುಕ್ಕೆಗಳು ಮತ್ತು ಗೆರೆಗಳು (ಮೋರ್ಸ್ ಕೋಡ್ ನಂತೆ) ಕಾಣಿಸುತ್ತವೆ",
      "ರೋಗಪೀಡಿತ ಗಿಡಗಳು ಗೊನೆ ಬಿಡುವುದಿಲ್ಲ; ರೋಗ ಕಂಡ ತಕ್ಷಣ ಗಿಡವನ್ನು ನಾಶಮಾಡುವುದು ಅತ್ಯಗತ್ಯ"
    ],
    "keyTakeawaysHi": [
      "पत्तियां छोटी, संकरी और कड़क होकर पेड़ के शीर्ष पर रोसेट जैसा गुच्छा बना लेती हैं (बंची टॉप)",
      "पत्तियों की नसों पर गहरे हरे रंग के बिंदु और धारियां (मोर्स कोड जैसी) दिखती हैं",
      "संक्रमित पौधों पर कभी फल नहीं लगते; इन्हें तुरंत नष्ट करना ही एकमात्र उपाय है"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "2,4-D Sodium Salt 80% WP (Herbicide)",
        "type": "chemical",
        "brand": "Weedmar / Fernoxone",
        "price": "₹220 – ₹320 / 500g",
        "query": "2 4 D weedicide agriculture"
      }
    ]
  },
  {
    "crop": "Banana (ಬಾಳೆ)",
    "cropKn": "ಬಾಳೆ",
    "cropHi": "केला (बनाना)",
    "emoji": "🍌",
    "disease": "Banana Rhizome Weevil (Cosmopolites sordidus)",
    "diseaseKn": "ಬಾಳೆ ಗೆಡ್ಡೆ ಕೊರೆಯುವ ಹುಳು (ರೈಜೋಮ್ ವೀವಿಲ್)",
    "diseaseHi": "केला प्रकंद घुन (कंद छेदक / राइजोम वीविल)",
    "severity": "High",
    "remedy": "Pare suckers (trim outer roots) and dip in Chlorpyrifos 20 EC @ 2.5 mL/L for 20 minutes before planting. Apply Fipronil 0.3% GR @ 20 g/plant or Chlorpyrifos 20 EC @ 3 mL/L around base.",
    "remedyKn": "ನಾಟಿಗೆ ಮುನ್ನ ಗೆಡ್ಡೆಯ ಬೇರು ಮತ್ತು ಮೇಲ್ಪದರ ಕತ್ತರಿಸಿ Chlorpyrifos @ 2.5 mL/L ನಲ್ಲಿ 20 ನಿಮಿಷ ನೆನೆಸಿ. ಗಿಡದ ಬುಡಕ್ಕೆ Fipronil 0.3% GR @ 20g ಹಾಕಿ.",
    "remedyHi": "कंदों की छिलाई करके Chlorpyrifos @ 2.5 mL/L में 20 मिनट डुबोएं। पौधों के आधार पर Fipronil 0.3% GR @ 20g डालें।",
    "prevention": "Use disc-on-stump pseudostem traps (split pseudostem pieces laid on ground) to attract and destroy adult weevils manually.",
    "preventionKn": "ಕತ್ತರಿಸಿದ ಬಾಳೆ ದಿಂಡಿನ ತುಂಡುಗಳನ್ನು ನೆಲದ ಮೇಲೆ ಇಟ್ಟು ಆಕರ್ಷಿತವಾದ ದುಂಬಿಗಳನ್ನು ಹಿಡಿದು ನಾಶಮಾಡಿ.",
    "preventionHi": "तने के टुकड़ों को जमीन पर रखकर आकर्षित होने वाले वयस्क भृंगों को इकट्ठा करके मारें।",
    "organicTip": "Apply Beauveria bassiana @ 20g in 2 kg neem cake per plant at planting and earthing up.",
    "organicTipKn": "ನಾಟಿ ವೇಳೆ ಗಿಡಕ್ಕೆ 2 kg ಬೇವಿನ ಹಿಂಡಿಯಲ್ಲಿ 20g Beauveria bassiana ಬೆರೆಸಿ ಹಾಕಿ.",
    "organicTipHi": "बुवाई के समय प्रति पौधा 2 kg नीम खली में 20g Beauveria bassiana मिलाकर डालें।",
    "fertilizer": "Maintain healthy plant nutrition to promote rapid corm development.",
    "fertilizerKn": "ಗೆಡ್ಡೆ ಬಲಗೊಳ್ಳಲು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "कंद की मजबूती के लिए संतुलित खाद दें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Grubs bore extensive dark frass-filled tunnels inside the corm weakening root anchorage",
      "Plants topple over easily during mild wind or rain (\"wind throw\")",
      "Sucker paring and prophylactic dip destroys eggs and young grubs before field planting"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುಗಳು ಗೆಡ್ಡೆಯೊಳಗೆ ಕಪ್ಪು ಸುರಂಗಗಳನ್ನು ಕೊರೆದು ಬೇರುಗಳ ಹಿಡಿತವನ್ನು ದುರ್ಬಲಗೊಳಿಸುತ್ತವೆ",
      "ಸಾಮಾನ್ಯ ಗಾಳಿ ಮಳೆಗೂ ಬಾಳೆ ಗಿಡಗಳು ಬುಡಸಮೇತ ನೆಲಕ್ಕುರುಳುತ್ತವೆ",
      "ಗೆಡ್ಡೆಗಳನ್ನು ನಯವಾಗಿ ಕೆರೆದು (ಪೇರಿಂಗ್) ಔಷಧಿ ದ್ರಾವಣದಲ್ಲಿ ಮುಳುಗಿಸಿ ನಾಟಿ ಮಾಡುವುದು ಅತ್ಯುತ್ತಮ ಕ್ರಮ"
    ],
    "keyTakeawaysHi": [
      "सूंड़ियां कंद के भीतर सुरंगें खोद देती हैं जिससे जड़ें कमजोर हो जाती हैं",
      "हल्की हवा में भी केला जड़ समेत जमीन पर गिर पड़ता है",
      "कंद की छंटाई करके दवा में डुबोकर लगाने से 100% सुरक्षा मिलती है"
    ],
    "products": [
      {
        "name": "Chlorpyrifos 20 EC",
        "type": "chemical",
        "brand": "Dursban",
        "price": "₹260 – ₹380 / 1L",
        "query": "Chlorpyrifos 20 EC"
      },
      {
        "name": "Beauveria bassiana 1% WP",
        "type": "organic",
        "brand": "Bio-Insecticide",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Beauveria bassiana 1kg"
      }
    ]
  },
  {
    "crop": "Banana (ಬಾಳೆ)",
    "cropKn": "ಬಾಳೆ",
    "cropHi": "केला (बनाना)",
    "emoji": "🍌",
    "disease": "Anthracnose & Crown Rot (Colletotrichum musae)",
    "diseaseKn": "ಬಾಳೆ ಕಾಯಿ ಕೊಳೆ & ಆಂಥ್ರಾಕ್ನೋಸ್",
    "diseaseHi": "केला एन्थ्रेक्नोज एवं क्राउन रॉट (फल सड़न)",
    "severity": "Medium",
    "remedy": "Post-harvest dip of fruit bunches in Carbendazim 50 WP @ 1 g/L or Azoxystrobin 23 SC @ 0.5 mL/L. Pre-harvest spray of Mancozeb 75 WP @ 2 g/L on bunches.",
    "remedyKn": "ಕಟಾವಿನ ನಂತರ ಬಾಳೆ ಗೊನೆಯನ್ನು Carbendazim 50 WP @ 1 g/L ದ್ರಾವಣದಲ್ಲಿ ಮುಳುಗಿಸಿ. ಕಟಾವಿಗೆ ಮುನ್ನ ಗೊನೆಗಳಿಗೆ Mancozeb @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "कटाई के बाद फलों को Carbendazim 50 WP @ 1 g/L में डुबोएं। कटाई से पहले गुच्छों पर Mancozeb @ 2 g/L का छिड़काव करें।",
    "prevention": "Cover banana bunches with perforated blue/white polyethylene sleeves immediately after last hand emerges.",
    "preventionKn": "ಕೊನೆಯ ಸೀಪು ಅರಳಿದ ತಕ್ಷಣ ಇಡೀ ಗೊನೆಗೆ ರಂಧ್ರವುಳ್ಳ ಪಾಲಿಥೀನ್ ಕವರ್ ಹೊದಿಸಿ ರಕ್ಷಿಸಿ.",
    "preventionHi": "अंतिम फली निकलने के तुरंत बाद गुच्छों को जालीदार पॉलिथीन कवर से ढकें।",
    "organicTip": "Dip harvested fruit crowns in 1% alum solution or 2% baking soda solution.",
    "organicTipKn": "ಕಟಾವಿನ ನಂತರ ಬಾಳೆ ಸೀಪುಗಳ ತೊಟ್ಟನ್ನು 1% ಪಟಿಕದ (Alum) ದ್ರಾವಣದಲ್ಲಿ ಮುಳುಗಿಸಿ.",
    "organicTipHi": "कटाई के बाद फलों के क्राउन को 1% फिटकरी के घोल में डुबोएं।",
    "fertilizer": "Apply Potassium Nitrate (13:0:45) @ 5 g/L spray on bunches to harden peel.",
    "fertilizerKn": "ಕಾಯಿಯ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಗೊನೆಗಳ ಮೇಲೆ 13:0:45 @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "छिलका मजबूत करने के लिए 13:0:45 @ 5 g/L का गुच्छों पर छिड़काव करें।",
    "scheme": "Agricultural and Processed Food Products Export Development Authority (APEDA) Banana Export Protocol",
    "schemeLink": "https://apeda.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Sunken circular dark brown to black spots on peel producing salmon-pink gelatinous spore tendrils in humid storage",
      "Black rot of the crown tissue causes fingers to detach during transport and handling",
      "Bunch sleeving in field combined with hygienic handling prevents post-harvest rot"
    ],
    "keyTakeawaysKn": [
      "ಹಣ್ಣಿನ ಸಿಪ್ಪೆಯ ಮೇಲೆ ಗುಳಿಬಿದ್ದ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗಿ ಗುಲಾಬಿ ಬಣ್ಣದ ಬೂಷ್ಟು ಮೂಡುತ್ತದೆ",
      "ತೊಟ್ಟು ಕೊಳೆಯುವುದರಿಂದ ಸಾಗಾಣಿಕೆಯ ಸಮಯದಲ್ಲಿ ಬಾಳೆಹಣ್ಣುಗಳು ಸೀಪಿನಿಂದ ಕಳಚಿ ಬೀಳುತ್ತವೆ",
      "ಗೊನೆಗೆ ಕವರ್ ಕಟ್ಟುವುದು ಮತ್ತು ಕಟಾವಿನ ನಂತರದ ಶುಚಿತ್ವವು ರೋಗವನ್ನು ತಡೆಯುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "छिलके पर धंसे हुए काले धब्बे बनते हैं जिन पर गुलाबी रंग की फफूंद जम जाती है",
      "डंठल सड़ने से परिवहन के समय केले गुच्छे से टूटकर गिरने लगते हैं",
      "खेत में गुच्छे पर कवर लगाना और कटाई के बाद साफ-सफाई ही इसका पक्का इलाज है"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Banana Bunch Sleeves (UV Protected)",
        "type": "organic",
        "brand": "Agro Covers",
        "price": "₹380 – ₹550 / 50 covers",
        "query": "Banana bunch cover bags"
      }
    ]
  },
  {
    "crop": "Mango (ಮಾವು)",
    "cropKn": "ಮಾವು",
    "cropHi": "आम (मैंगो)",
    "emoji": "🥭",
    "disease": "Mango Powdery Mildew (Oidium mangiferae)",
    "diseaseKn": "ಮಾವಿನ ಬೂದಿ ರೋಗ",
    "diseaseHi": "आम चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
    "severity": "High",
    "remedy": "Spray Wettable Sulphur 80 WP @ 3 g/L or Hexaconazole 5 EC @ 1 mL/L or Dinocap 48 EC @ 1 mL/L at panicle emergence, full bloom, and fruit set.",
    "remedyKn": "ಹೂಗೊಂಚಲು ಬರುವಾಗ, ಹೂವರಳುವಾಗ ಮತ್ತು ಕಾಯಿ ಕಚ್ಚುವಾಗ Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "बौर निकलते समय, फूल खिलने पर और फल बनते समय Wettable Sulphur 80 WP @ 3 g/L या Hexaconazole 5 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Prune dead criss-cross branches after harvest in August to allow sunlight inside the canopy.",
    "preventionKn": "ಆಗಸ್ಟ್‌ನಲ್ಲಿ ಕಟಾವಿನ ನಂತರ ಒಳಭಾಗದ ಒಣಗಿದ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಸೂರ್ಯನ ಬೆಳಕು ಚೆನ್ನಾಗಿ ಬೀಳುವಂತೆ ಮಾಡಿ.",
    "preventionHi": "अगस्त में कटाई के बाद सूखी और घनी टहनियों की छंटाई करें ताकि पेड़ में धूप आ सके।",
    "organicTip": "Foliar spray of 10% sour buttermilk or fermented neem-cow urine extract.",
    "organicTipKn": "10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಅಥವಾ ಗೋಮೂತ್ರ-ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% खट्टी छाछ या गोमूत्र-नीम के अर्क का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK with Micronutrient spray (Boron 20% @ 1 g/L) before flowering.",
    "fertilizerKn": "ಹೂವಾಡುವ ಮುನ್ನ ಬೋರಾನ್ (Boron 20% @ 1 g/L) ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "बौर आने से पहले बोरॉन (20%) @ 1 g/L का छिड़काव करें।",
    "scheme": "Mission for Integrated Development of Horticulture (MIDH)",
    "schemeLink": "https://midh.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "White talcum-powdery fungal coating on panicles, flowers, and tender young pea-sized fruits",
      "Flowers fail to open and dry up completely, resulting in near total crop loss",
      "Timely 3 sprays starting from bud burst protects the entire blossom"
    ],
    "keyTakeawaysKn": [
      "ಹೂಗೊಂಚಲು, ಹೂವುಗಳು ಮತ್ತು ಬಟಾಣಿ ಗಾತ್ರದ ಎಳೆ ಮಿಡಿಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂಷ್ಟು ಆವರಿಸುತ್ತದೆ",
      "ಹೂವುಗಳು ಅರಳದೆ ಕಪ್ಪಾಗಿ ಒಣಗಿ ಉದುರಿ ಇಳುವರಿ ಶೂನ್ಯವಾಗುತ್ತದೆ",
      "ಮೊಗ್ಗು ಒಡೆಯುವ ಹಂತದಿಂದ ಆರಂಭಿಸಿ ಸರಿಯಾದ 3 ಸಿಂಪಡಣೆಗಳು ಹೂವನ್ನು ಸಂಪೂರ್ಣ ರಕ್ಷಿಸುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "बौर, फूलों और मटर के दाने जितने छोटे फलों पर सफेद पाउडर जैसी फफूंद जम जाती है",
      "फूल खिल नहीं पाते और सूखकर गिर जाते हैं जिससे भारी नुकसान होता है",
      "बौर निकलने की शुरुआत से 3 समयबद्ध छिड़काव पूरी फसल को सुरक्षित रखते हैं"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex / Thiovit",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC Contaf"
      }
    ]
  },
  {
    "crop": "Mango (ಮಾವು)",
    "cropKn": "ಮಾವು",
    "cropHi": "आम (मैंगो)",
    "emoji": "🥭",
    "disease": "Mango Anthracnose (Colletotrichum gloeosporioides)",
    "diseaseKn": "ಮಾವಿನ ಕಪ್ಪು ಚುಕ್ಕೆ ರೋಗ (ಆಂಥ್ರಾಕ್ನೋಸ್)",
    "diseaseHi": "आम एन्थ्रेक्नोज (काला धब्बा रोग)",
    "severity": "High",
    "remedy": "Spray Copper Oxychloride 50 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L or Azoxystrobin 23 SC @ 1 mL/L. Post-harvest hot water treatment of fruits at 52°C for 15 minutes.",
    "remedyKn": "Copper Oxychloride 50 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ. ಕಟಾವಿನ ನಂತರ ಹಣ್ಣುಗಳನ್ನು 52°C ಬಿಸಿ ನೀರಿನಲ್ಲಿ 15 ನಿಮಿಷ ಮುಳುಗಿಸಿ (ಹಾಟ್ ವಾಟರ್ ಟ್ರೀಟ್‌ಮೆಂಟ್).",
    "remedyHi": "Copper Oxychloride 50 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें। कटाई के बाद फलों को 52°C गर्म पानी में 15 मिनट रखें।",
    "prevention": "Prune dead wood and infected panicles after harvest. Spray 1% Bordeaux mixture on pruned trees.",
    "preventionKn": "ಕಟಾವಿನ ನಂತರ ಒಣ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    "preventionHi": "कटाई के बाद सूखी टहनियां काटें और 1% बोर्डो मिश्रण छिड़कें।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 5 g/L during fruit growth.",
    "organicTipKn": "ಕಾಯಿ ಬೆಳೆಯುವಾಗ Pseudomonas fluorescens @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "फल बढ़ते समय Pseudomonas fluorescens @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Apply Calcium Nitrate @ 5 g/L during fruit swelling to thicken skin pericarp.",
    "fertilizerKn": "ಕಾಯಿಯ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು Calcium Nitrate @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "छिलका मजबूत करने के लिए कैल्शियम नाइट्रेट @ 5 g/L का छिड़काव करें।",
    "scheme": "APEDA Mango Export Quality Standards & Packing Protocol",
    "schemeLink": "https://apeda.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Angular brown leaf spots with shot-holes and black necrotic blight of entire blossom panicles",
      "Tear-stain streaks and sunken circular black lesions on ripening fruits",
      "Hot water treatment (52°C for 15 mins) eliminates dormant latent infection in ripe fruit peel"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು ಮತ್ತು ಹೂಗೊಂಚಲು ಸಂಪೂರ್ಣ ಕಪ್ಪಾಗಿ ಒಣಗುತ್ತದೆ",
      "ಹಣ್ಣು ಮಾಗುವಾಗ ಸಿಪ್ಪೆಯ ಮೇಲೆ ಕಣ್ಣೀರಿನಂತಹ ಕಪ್ಪು ಗೆರೆಗಳು ಮತ್ತು ಗುಳಿಬಿದ್ದ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಬಿಸಿ ನೀರಿನ ಉಪಚಾರವು (52°C ನಲ್ಲಿ 15 ನಿಮಿಷ) ಹಣ್ಣಿನ ಸಿಪ್ಪೆಯಲ್ಲಿರುವ ಶಿಲೀಂಧ್ರವನ್ನು ಸಂಪೂರ್ಣ ನಾಶಮಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर भूरे धब्बे और पूरा बौर काला पड़कर झुलस जाता है",
      "पकते समय आम के छिलके पर आंसू जैसी काली धारियां और गोल धंसे हुए काले धब्बे बन जाते हैं",
      "गर्म पानी का उपचार (52°C पर 15 मिनट) पके आमों से फफूंद को पूरी तरह खत्म कर देता है"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Azoxystrobin 23 SC",
        "type": "chemical",
        "brand": "Amistar",
        "price": "₹750 – ₹1,050 / 200mL",
        "query": "Azoxystrobin 23 SC Amistar"
      }
    ]
  },
  {
    "crop": "Mango (ಮಾವು)",
    "cropKn": "ಮಾವು",
    "cropHi": "आम (मैंगो)",
    "emoji": "🥭",
    "disease": "Mango Hopper (Amritodus atkinsoni)",
    "diseaseKn": "ಮಾವಿನ ಜಿಗಿಹುಳು",
    "diseaseHi": "आम का फुदका (मैंगो हॉपर)",
    "severity": "High",
    "remedy": "Spray Imidacloprid 17.8 SL @ 0.3 mL/L or Thiamethoxam 25 WG @ 0.3 g/L or Clothianidin 50 WDG @ 0.2 g/L at flower bud burst.",
    "remedyKn": "ಹೂಮೊಗ್ಗು ಬರುವಾಗ Imidacloprid 17.8 SL @ 0.3 mL/L ಅಥವಾ Thiamethoxam 25 WG @ 0.3 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "बौर निकलते समय Imidacloprid 17.8 SL @ 0.3 mL/L या Thiamethoxam 25 WG @ 0.3 g/L का छिड़काव करें।",
    "prevention": "Prune overcrowding branches to open tree canopy to sunlight. Avoid excessive watering during flowering.",
    "preventionKn": "ಮರದ ಒಳಭಾಗಕ್ಕೆ ಸೂರ್ಯನ ಬೆಳಕು ಬೀಳುವಂತೆ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ. ಹೂವಾಡುವಾಗ ಅತಿಯಾಗಿ ನೀರು ಹಾಯಿಸಬೇಡಿ.",
    "preventionHi": "पेड़ के अंदर धूप जाने के लिए घनी शाखाएं काटें। फूल आते समय अधिक पानी न दें।",
    "organicTip": "Spray entomopathogenic fungus Beauveria bassiana @ 5 g/L or 5% Neem oil 10000 PPM @ 2 mL/L.",
    "organicTipKn": "Beauveria bassiana @ 5 g/L ಅಥವಾ 5% ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Beauveria bassiana @ 5 g/L या 5% नीम के तेल का छिड़काव करें।",
    "fertilizer": "Apply balanced organic nutrients; avoid excessive urea before blooming.",
    "fertilizerKn": "ಹೂವಾಡುವ ಮುನ್ನ ಅತಿಯಾಗಿ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡಬೇಡಿ.",
    "fertilizerHi": "बौर आने से पहले अत्यधिक यूरिया न डालें।",
    "scheme": "Raitha Sanjeevini Mango Pest Relief Scheme",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#d97706",
    "keyTakeaways": [
      "Thousands of hoppers suck sap from emerging blossom and tender leaves causing them to wither and dry",
      "Secrete sugary honeydew leading to heavy sooty mold (Capnodium) blackening the whole canopy",
      "First spray at panicle emergence is crucial to preserve fruit setting"
    ],
    "keyTakeawaysKn": [
      "ಸಾವಿರಾರು ಜಿಗಿಹುಳುಗಳು ಹೂಗೊಂಚಲು ಮತ್ತು ಎಳೆ ಚಿಗುರಿನ ರಸ ಹೀರುವುದರಿಂದ ಹೂವುಗಳು ಒಣಗಿ ಉದುರುತ್ತವೆ",
      "ಇವು ಸಿಹಿ ಅಂಟು ರಸ ಸ್ರವಿಸುವುದರಿಂದ ಇಡೀ ಮರ ಕಪ್ಪು ಬೂಷ್ಟಿನಿಂದ (ಕಾಡಿಗೆ ರೋಗ) ಆವೃತವಾಗುತ್ತದೆ",
      "ಹೂಮೊಗ್ಗು ಒಡೆಯುವ ಹಂತದಲ್ಲೇ ಮಾಡುವ ಮೊದಲ ಸಿಂಪಡಣೆಯು ಕಾಯಿ ಕಚ್ಚುವಿಕೆಯನ್ನು ರಕ್ಷಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "हजारों फुदके बौर और नई पत्तियों का रस चूसकर उन्हें पूरी तरह सुखा देते हैं",
      "यह मीठा चिपचिपा रस छोड़ते हैं जिससे पूरे पेड़ पर काली कालिख (काली फफूंद) जम जाती है",
      "बौर निकलते ही पहला स्प्रे करना फल लगने के लिए सबसे महत्वपूर्ण है"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor (Bayer)",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Thiamethoxam 25 WG",
        "type": "chemical",
        "brand": "Actara",
        "price": "₹220 – ₹340 / 100g",
        "query": "Thiamethoxam 25 WG Actara"
      }
    ]
  },
  {
    "crop": "Mango (ಮಾವು)",
    "cropKn": "ಮಾವು",
    "cropHi": "आम (मैंगो)",
    "emoji": "🥭",
    "disease": "Mango Fruit Fly (Bactrocera dorsalis)",
    "diseaseKn": "ಮಾವಿನ ಹಣ್ಣಿನ ನೊಣ",
    "diseaseHi": "आम की फल मक्खी (फ्रूट फ्लाई)",
    "severity": "High",
    "remedy": "Install Methyl Eugenol pheromone traps @ 6 to 8 traps/acre from 45 days before harvest. Bait spray: Jaggery 100g + Malathion 50 EC 20 mL in 10L water sprayed as coarse droplets on trunk/foliage.",
    "remedyKn": "ಕಟಾವಿಗೆ 45 ದಿನ ಮುಂಚೆ ಎಕರೆಗೆ 6-8 ಮೀಥೈಲ್ ಯುಜೆನಾಲ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ವಿಷಪಾಶ ಸಿಂಪಡಣೆ: 100g ಬೆಲ್ಲ + 20 mL Malathion ಅನ್ನು 10L ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "कटाई से 45 दिन पहले 6-8 मिथाइल यूजेनॉल फेरोमोन ट्रैप प्रति एकड़ लगाएं। विष चुग्गा स्प्रे: 100g गुड़ + 20 mL मैलाथियान को 10L पानी में घोलकर तने पर छिड़कें।",
    "prevention": "Deep ploughing of tree basin after harvest in June-July to expose puparia to birds and sun. Collect and destroy fallen punctured fruits.",
    "preventionKn": "ಜೂನ್-ಜುಲೈನಲ್ಲಿ ಮರದ ಬುಡದಲ್ಲಿ ಆಳವಾಗಿ ಅಗೆದು ಮಣ್ಣಿನಲ್ಲಿರುವ ಕೋಶಗಳನ್ನು ಬಿಸಿಲಿಗೆ ಒಡ್ಡಿ. ಉದುರಿದ ಹಣ್ಣುಗಳನ್ನು ಆರಿಸಿ ಹೂತುಹಾಕಿ.",
    "preventionHi": "जून-जुलाई में पेड़ के नीचे की मिट्टी खोदें ताकि प्यूपा धूप से नष्ट हों। गिरे हुए सड़े फलों को जमीन में गहरा दबाएं।",
    "organicTip": "Install cue-lure / methyl eugenol traps with eco-friendly plywood blocks.",
    "organicTipKn": "ಮೀಥೈಲ್ ಯುಜೆನಾಲ್ ಬಲೆಗಳನ್ನು ತೋಟದಾದ್ಯಂತ ಅಳವಡಿಸಿ.",
    "organicTipHi": "मिथाइल यूजेनॉल ट्रैप का बाग में नियमित उपयोग करें।",
    "fertilizer": "Harvest mature fruits at green hard stage (80% maturity) before ripening on tree.",
    "fertilizerKn": "ಹಣ್ಣು ಮರದಲ್ಲೇ ಮಾಗುವ ಮುನ್ನ ಗಿಳಿಮೂಗು ಹಂತದಲ್ಲಿ (ಶೇ. 80 ಬಲಿತಾಗ) ಕಟಾವು ಮಾಡಿ.",
    "fertilizerHi": "पेड़ पर पकने से पहले 80% परिपक्वता (टपका अवस्था) पर ही आम तोड़ें।",
    "scheme": "Export Vapor Heat Treatment (VHT) and Hot Water Protocol Support (APEDA)",
    "schemeLink": "https://apeda.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Female punctures mature fruit skin to lay eggs inside; white maggots feed on internal pulp turning it brown, watery, and rotten",
      "Infested fruits show a tiny oviposition pinprick with brownish decay and drop prematurely",
      "Methyl eugenol traps capture male flies eliminating breeding over wide areas"
    ],
    "keyTakeawaysKn": [
      "ಹೆಣ್ಣು ನೊಣವು ಕಾಯಿಯ ಸಿಪ್ಪೆಯನ್ನು ಚುಚ್ಚಿ ಮೊಟ್ಟೆ ಇಡುತ್ತದೆ; ಒಳಗೆ ಮರಿಗಳು ತಿರುಳನ್ನು ತಿಂದು ನೀರುಕಾರುವಂತೆ ಕೊಳೆಸುತ್ತವೆ",
      "ಹಣ್ಣಿನ ಮೇಲೆ ಸಣ್ಣ ಚುಚ್ಚಿದ ರಂಧ್ರ ಕಾಣಿಸಿಕೊಂಡು ಹಣ್ಣು ಅಕಾಲಿಕವಾಗಿ ಕೊಳೆತು ಉದುರುತ್ತದೆ",
      "ಮೀಥೈಲ್ ಯುಜೆನಾಲ್ ಬಲೆಗಳು ಗಂಡು ನೊಣಗಳನ್ನು ಆಕರ್ಷಿಸಿ ನಾಶಮಾಡುವ ಮೂಲಕ ಸಂತಾನೋತ್ಪತ್ತಿಯನ್ನು ತಡೆಯುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "मादा मक्खी फल के छिलके में छेद कर अंडे देती है; सूंड़ियां गूदा खाकर उसे बदबूदार पानी बना देती हैं",
      "फल पर डंक का छोटा निशान होता है और वह समय से पहले जमीन पर गिरकर सड़ जाता है",
      "मिथाइल यूजेनॉल ट्रैप नर मक्खियों को मारकर इनका वंश समाप्त कर देते हैं"
    ],
    "products": [
      {
        "name": "Methyl Eugenol Fruit Fly Trap",
        "type": "organic",
        "brand": "Agri Phero Traps",
        "price": "₹140 – ₹220 / unit",
        "query": "Methyl eugenol fruit fly trap"
      },
      {
        "name": "Malathion 50 EC",
        "type": "chemical",
        "brand": "Agri Malathion",
        "price": "₹280 – ₹420 / 1L",
        "query": "Malathion 50 EC"
      }
    ]
  },
  {
    "crop": "Mango (ಮಾವು)",
    "cropKn": "ಮಾವು",
    "cropHi": "आम (मैंगो)",
    "emoji": "🥭",
    "disease": "Mango Malformation (Fusarium mangiferae)",
    "diseaseKn": "ಮಾವಿನ ಹೂಗುಚ್ಛ ವಿರೂಪ ರೋಗ",
    "diseaseHi": "आम विरूपण रोग (मैंगो मालफॉर्मेशन)",
    "severity": "Medium",
    "remedy": "Prune malformed panicles along with 10-15 cm healthy twig and burn. Spray NAA (Planofix) @ 200 ppm (4.5 mL/10L water) in October followed by Carbendazim 50 WP @ 1 g/L at bud burst.",
    "remedyKn": "ವಿಕಾರಗೊಂಡ ಹೂಗೊಂಚಲುಗಳನ್ನು 10-15 cm ಆರೋಗ್ಯಕರ ರೆಂಬೆಯೊಂದಿಗೆ ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ. ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ NAA (Planofix) @ 200 ppm ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "विकृत बौर को 10-15 cm स्वस्थ टहनी सहित काटकर जलाएं। अक्टूबर में NAA (Planofix) @ 200 ppm का छिड़काव करें।",
    "prevention": "Destroy all vegetative bunches in young trees. Do not take scion sticks from malformed trees.",
    "preventionKn": "ಎಳೆ ಗಿಡಗಳಲ್ಲಿ ಬರುವ ವಿಕಾರಗೊಂಡ ಚಿಗುರುಗಳನ್ನು ಕತ್ತರಿಸಿ. ರೋಗಪೀಡಿತ ಮರದಿಂದ ಕಸಿ ಕಡ್ಡಿಗಳನ್ನು ಪಡೆಯಬೇಡಿ.",
    "preventionHi": "छोटे पेड़ों के विकृत गुच्छों को काटें। रोगी पेड़ से कलम (साइन) न लें।",
    "organicTip": "Spray 5% neem oil emulsion to suppress eriophyid mite vectors (Aceria mangiferae).",
    "organicTipKn": "ರೋಗ ಹರಡುವ ನುಸಿಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ 5% ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "माइट्स की रोकथाम के लिए 5% नीम के तेल का छिड़काव करें।",
    "fertilizer": "Apply balanced Micronutrient spray (Zinc + Copper + Manganese) in post-harvest flush.",
    "fertilizerKn": "ಕಟಾವಿನ ನಂತರ ಲಘು ಪೋಷಕಾಂಶಗಳ ಸಿಂಪಡಣೆ ಮಾಡಿ.",
    "fertilizerHi": "कटाई के बाद सूक्ष्म पोषक तत्वों का छिड़काव करें।",
    "scheme": "National Horticulture Mission Orchard Rejuvenation Support",
    "schemeLink": "https://midh.gov.in/",
    "color": "#475569",
    "keyTakeaways": [
      "Panicles become heavily crowded, thickened, shortened, and fleshy like compact cauliflower bunches",
      "Flowers remain sterile and no fruits are produced on malformed clusters",
      "Strict pruning of malformed heads combined with NAA spray in October reduces incidence by 80%"
    ],
    "keyTakeawaysKn": [
      "ಹೂಗೊಂಚಲುಗಳು ದಪ್ಪಗಾಗಿ, ಗಿಡ್ಡವಾಗಿ, ಹೂಕೋಸಿನ ಗಡ್ಡೆಯಂತೆ ಒತ್ತೊತ್ತಾಗಿ ಬೆಳೆಯುತ್ತವೆ",
      "ಹೂವುಗಳಲ್ಲಿ ಪರಾಗಸ್ಪರ್ಶ ನಡೆಯುವುದಿಲ್ಲ ಮತ್ತು ಯಾವುದೇ ಕಾಯಿ ಕಚ್ಚುವುದಿಲ್ಲ",
      "ವಿಕಾರಗೊಂಡ ಗೊಂಚಲುಗಳನ್ನು ಕತ್ತರಿಸಿ ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ ಪ್ಲಾನೊಫಿಕ್ಸ್ ಸಿಂಪಡಿಸುವುದರಿಂದ ರೋಗ ಶೇ. 80ರಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "बौर छोटा, मोटा और फूलगोभी की तरह ठोस गुच्छे में बदल जाता है",
      "फूल बांझ रह जाते हैं और इन विकृत गुच्छों पर कोई फल नहीं लगता",
      "अक्टूबर में बौर की छंटाई और प्लानोफिक्स का स्प्रे इस बीमारी को 80% तक घटा देता है"
    ],
    "products": [
      {
        "name": "Planofix (NAA 4.5% SL)",
        "type": "chemical",
        "brand": "Bayer Planofix",
        "price": "₹140 – ₹220 / 100mL",
        "query": "Planofix Bayer NAA"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Pomegranate (ದಾಳಿಂಬೆ)",
    "cropKn": "ದಾಳಿಂಬೆ",
    "cropHi": "अनार (पोमोग्रेनेट)",
    "emoji": "🍎",
    "disease": "Bacterial Blight / Oily Spot (Xanthomonas axonopodis pv. punicae)",
    "diseaseKn": "ದಾಳಿಂಬೆ ದುಂಡಾಣು ಅಂಗಮಾರಿ (ಎಣ್ಣೆ ಚುಕ್ಕೆ ರೋಗ)",
    "diseaseHi": "अनार तेलीय धब्बा रोग (जीवाणु झुलसा / ऑयली स्पॉट)",
    "severity": "High",
    "remedy": "Spray Streptocycline @ 0.5 g/L + Copper Oxychloride 50 WP @ 2.5 g/L or Bronopol (2-bromo-2-nitropropane-1,3-diol) @ 0.5 g/L. Prune infected twigs 5 cm into healthy wood and apply Bordeaux paste (10%).",
    "remedyKn": "Streptocycline @ 0.5 g/L ಜೊತೆಗೆ Copper Oxychloride @ 2.5 g/L ಅಥವಾ Bronopol @ 0.5 g/L ಸಿಂಪಡಿಸಿ. ಕತ್ತರಿಸಿದ ರೆಂಬೆಗಳಿಗೆ 10% ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಲೇಪಿಸಿ.",
    "remedyHi": "Streptocycline @ 0.5 g/L + Copper Oxychloride @ 2.5 g/L या Bronopol @ 0.5 g/L का छिड़काव करें। कटी टहनियों पर 10% बोर्डो पेस्ट लगाएं।",
    "prevention": "Strict sanitation. Plant certified tissue-cultured disease-free plants from ICAR-NRCP Solapur.",
    "preventionKn": "ತೋಟವನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ. ICAR-NRCP ಸೋಲಾಪುರ ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಸಸಿಗಳನ್ನು ಮಾತ್ರ ನಾಟಿ ಮಾಡಿ.",
    "preventionHi": "बाग में स्वच्छता रखें। ICAR-NRCP सोलापुर से प्रमाणित रोगमुक्त टिशू कल्चर पौध लगाएं।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 5 g/L + cow dung slurry supernatant 10% on fresh flushes.",
    "organicTipKn": "ಹೊಸ ಚಿಗುರಿನ ಮೇಲೆ Pseudomonas fluorescens @ 5 g/L ಮತ್ತು 10% ಸಗಣಿ ತಿಳಿ ನೀರು ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "नई पत्तियों पर Pseudomonas fluorescens @ 5 g/L और 10% गोबर का छना पानी छिड़कें।",
    "fertilizer": "Apply Bleaching Powder @ 10 kg/acre in basin during monsoon. Apply balanced Micronutrients.",
    "fertilizerKn": "ಮಳೆಗಾಲದಲ್ಲಿ ಮರದ ಬುಡಕ್ಕೆ ಎಕರೆಗೆ 10 kg ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್ ನೀಡಿ ಮತ್ತು ಲಘು ಪೋಷಕಾಂಶಗಳನ್ನು ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "मानसून में जड़ों के पास 10 kg/एकड़ ब्लीचिंग पाउडर डालें और सूक्ष्म पोषक तत्व दें।",
    "scheme": "National Research Centre on Pomegranate (ICAR-NRCP) Blight Relief Scheme",
    "schemeLink": "https://nrcpomegranate.icar.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Dark water-soaked \"oily\" spots on leaves and branches turning into black cankers with \"L\" or \"Y\" shaped cracks on fruits",
      "Causes complete fruit cracking, splitting, and unmarketability within weeks of rainy spells",
      "Pruning infected twigs and strict bactericide schedule is the only way to sustain orchards"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು ಮತ್ತು ರೆಂಬೆಗಳ ಮೇಲೆ ಎಣ್ಣೆಯಂತಹ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗಿ ಕಾಯಿಗಳ ಮೇಲೆ \"L\" ಅಥವಾ \"Y\" ಆಕಾರದ ಬಿರುಕುಗಳು ಮೂಡುತ್ತವೆ",
      "ಮಳೆಗಾಲದಲ್ಲಿ ಕಾಯಿಗಳು ಬಿರುಕು ಬಿಟ್ಟು ಸಂಪೂರ್ಣವಾಗಿ ಹಾಳಾಗುತ್ತವೆ",
      "ಸೋಂಕಿತ ರೆಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಹಚ್ಚುವುದು ಮತ್ತು ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ಸಿಂಪಡಿಸುವುದು ಕಡ್ಡಾಯ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों और टहनियों पर काले तेलीय धब्बे बनते हैं और फलों पर \"L\" या \"Y\" आकार की दरारें पड़ जाती हैं",
      "बारिश में फल फट जाते हैं और पूरा बाग बर्बाद हो जाता है",
      "रोगी टहनियों की छंटाई और जीवाणुनाशक का नियमित स्प्रे ही बाग को बचा सकता है"
    ],
    "products": [
      {
        "name": "Streptocycline 6g Pouch",
        "type": "chemical",
        "brand": "Hindustan Antibiotics",
        "price": "₹45 – ₹70 / 6g",
        "query": "Streptocycline 6g"
      },
      {
        "name": "Bronopol (Bactronol)",
        "type": "chemical",
        "brand": "Bactronol / Agri Bio",
        "price": "₹350 – ₹490 / 100g",
        "query": "Bronopol bactericide agriculture"
      },
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      }
    ]
  },
  {
    "crop": "Pomegranate (ದಾಳಿಂಬೆ)",
    "cropKn": "ದಾಳಿಂಬೆ",
    "cropHi": "अनार (पोमोग्रेनेट)",
    "emoji": "🍎",
    "disease": "Pomegranate Wilt Complex (Ceratocystis fimbriata)",
    "diseaseKn": "ದಾಳಿಂಬೆ ಸೊರಗು ರೋಗ (ವಿಲ್ಟ್ ಕಾಂಪ್ಲೆಕ್ಸ್)",
    "diseaseHi": "अनार उकठा रोग (विल्ट कॉम्प्लेक्स / सेराटोसिस्टिस)",
    "severity": "High",
    "remedy": "Root drenching with Propiconazole 25 EC @ 2 mL/L (5 to 10 L solution per plant) or Carbendazim 50 WP @ 2 g/L. Apply Chlorpyrifos 20 EC @ 4 mL/L if shot-hole borer is associated.",
    "remedyKn": "ಪ್ರತಿ ಗಿಡದ ಬುಡಕ್ಕೆ 5-10 ಲೀಟರ್ Propiconazole 25 EC @ 2 mL/L ಅಥವಾ Carbendazim @ 2 g/L ದ್ರಾವಣ ಸುರಿಯಿರಿ (ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ). ಕಾಂಡ ಕೊರೆಯುವ ದುಂಬಿ ನಿಯಂತ್ರಣಕ್ಕೆ Chlorpyrifos ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "प्रति पेड़ 5-10 लीटर Propiconazole 25 EC @ 2 mL/L या Carbendazim @ 2 g/L का घोल जड़ में डालें। शॉट होल बोरर के लिए Chlorpyrifos डालें।",
    "prevention": "Do not flood-irrigate; use double-line drip. Dig isolation trenches around wilting trees. Disinfect pruning shears.",
    "preventionKn": "ಹರಿ ನೀರಾವರಿ ಮಾಡಬೇಡಿ; ಡಬಲ್ ಲೈನ್ ಹನಿ ನೀರಾವರಿ ಬಳಸಿ. ಸೊರಗಿದ ಮರಗಳ ಸುತ್ತ ಕಂದಕ ನಿರ್ಮಿಸಿ.",
    "preventionHi": "खुला पानी न बहाएं; ड्रिप सिंचाई अपनाएं। रोगी पेड़ों के चारों ओर खाई बनाएं।",
    "organicTip": "Soil application of Trichoderma harzianum @ 50g in 10 kg neem cake + FYM per tree twice annually.",
    "organicTipKn": "ವರ್ಷಕ್ಕೆ ಎರಡು ಬಾರಿ 10 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ 50g Trichoderma ಬೆರೆಸಿ ಬುಡಕ್ಕೆ ಹಾಕಿ.",
    "organicTipHi": "साल में दो बार प्रति पेड़ 10 kg नीम खली और सड़ी खाद में 50g ट्राइकोडर्मा मिलाकर डालें।",
    "fertilizer": "Avoid root damage during cultivation; apply balanced nutrients with Zinc and Boron.",
    "fertilizerKn": "ಉಳುಮೆ ಮಾಡುವಾಗ ಬೇರುಗಳಿಗೆ ಗಾಯವಾಗದಂತೆ ಎಚ್ಚರವಹಿಸಿ.",
    "fertilizerHi": "जुताई के समय जड़ों को कटने से बचाएं।",
    "scheme": "Special Pomegranate Wilt Management Scheme (Karnataka Govt)",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Sudden yellowing and drying of leaves on one branch first (partial wilting), progressing to the entire tree within 1–2 months",
      "Stem and root cross-sections show characteristic dark grayish-brown to purplish-black discolored vascular rings",
      "Shot-hole borer (Xylosandrus) acts as vector transmitting Ceratocystis fungus between trees"
    ],
    "keyTakeawaysKn": [
      "ಮೊದಲು ಒಂದು ರೆಂಬೆಯ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಒಣಗುತ್ತವೆ (ಭಾಗಶಃ ಸೊರಗು), ನಂತರ 1-2 ತಿಂಗಳಲ್ಲಿ ಇಡೀ ಮರ ಒಣಗಿ ಸಾಯುತ್ತದೆ",
      "ಕಾಂಡ ಮತ್ತು ಬೇರನ್ನು ಅಡ್ಡಲಾಗಿ ಕತ್ತರಿಸಿದಾಗ ಒಳಗಿನ ನರಗಳು ಗಾಢ ಕಂದು-ನೇರಳೆ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುತ್ತವೆ",
      "ಸಣ್ಣ ಕಾಂಡ ಕೊರೆಯುವ ದುಂಬಿಗಳು ಈ ಶಿಲೀಂಧ್ರವನ್ನು ಮರದಿಂದ ಮರಕ್ಕೆ ಹರಡುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "पहले एक शाखा की पत्तियां पीली पड़कर सूखती हैं, फिर 1-2 महीने में पूरा पेड़ सूख जाता है",
      "तने और जड़ों को काटने पर अंदर गहरा भूरा-बैंगनी छल्लेदार निशान दिखाई देता है",
      "शॉट-होल बोरर कीट इस फफूंद को एक पेड़ से दूसरे पेड़ में फैलाने का काम करता है"
    ],
    "products": [
      {
        "name": "Propiconazole 25 EC (Tilt)",
        "type": "chemical",
        "brand": "Tilt / Result",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      },
      {
        "name": "Chlorpyrifos 20 EC",
        "type": "chemical",
        "brand": "Dursban",
        "price": "₹260 – ₹380 / 1L",
        "query": "Chlorpyrifos 20 EC"
      },
      {
        "name": "Trichoderma harzianum 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹170 – ₹250 / 1kg",
        "query": "Trichoderma harzianum 1kg"
      }
    ]
  },
  {
    "crop": "Pomegranate (ದಾಳಿಂಬೆ)",
    "cropKn": "ದಾಳಿಂಬೆ",
    "cropHi": "अनार (पोमोग्रेनेट)",
    "emoji": "🍎",
    "disease": "Fruit Borer / Anar Butterfly (Deudorix isocrates)",
    "diseaseKn": "ದಾಳಿಂಬೆ ಕಾಯಿ ಕೊರೆಯುವ ಚಿಟ್ಟೆ (ದಾಳಿಂಬೆ ಚಿಟ್ಟೆ)",
    "diseaseHi": "अनार तितली / फल छेदक (अनार बटरफ्लाई)",
    "severity": "High",
    "remedy": "Bag fruits with butter paper bags / non-woven polypropylene bags after fruit set (pea size). Spray Chlorantraniliprole 18.5 SC @ 0.4 mL/L or Spinosad 45 SC @ 0.3 mL/L or Emamectin Benzoate 5 SG @ 0.4 g/L.",
    "remedyKn": "ಕಾಯಿ ಬಟಾಣಿ ಗಾತ್ರದಲ್ಲಿದ್ದಾಗ ಬಟರ್ ಪೇಪರ್ ಚೀಲಗಳಿಂದ ಮುಚ್ಚಿ (ಬ್ಯಾಗಿಂಗ್). Chlorantraniliprole 18.5 SC @ 0.4 mL/L ಅಥವಾ Spinosad 45 SC @ 0.3 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फल मटर बराबर होने पर बटर पेपर बैग से ढकें। Chlorantraniliprole 18.5 SC @ 0.4 mL/L या Spinosad 45 SC @ 0.3 mL/L का छिड़काव करें।",
    "prevention": "Cover young fruits with non-woven polypropylene bags. Remove and burn all infested punctured fruits.",
    "preventionKn": "ಎಳೆ ಕಾಯಿಗಳಿಗೆ ನಾನ್-ವೋವನ್ ಬ್ಯಾಗ್ ಹೊದಿಸಿ. ರಂಧ್ರವಿರುವ ಬಾಧಿತ ಕಾಯಿಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.",
    "preventionHi": "छोटे फलों को कपड़े की थैलियों से ढकें। छेद वाले संक्रमित फलों को तोड़कर जलाएं।",
    "organicTip": "Spray 5% neem seed kernel extract (NSKE) or Neem oil 10000 PPM @ 3 mL/L at egg laying stage.",
    "organicTipKn": "ಮೊಟ್ಟೆ ಇಡುವ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ @ 3 mL/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "अंडे देने के समय 5% नीम के अर्क या नीम के तेल का छिड़काव करें।",
    "fertilizer": "Apply balanced nutrition; avoid excessive growth flush during peak flight season.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "संतुलित खाद दें।",
    "scheme": "National Horticulture Mission Fruit Protection Bagging Subsidy",
    "schemeLink": "https://midh.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Caterpillar bores inside developing fruit, eating seeds and pulp, leaving a circular hole plugged with dark foul-smelling frass",
      "Secondary fungal and bacterial rotting turns fruit into a black rotten shell",
      "Bagging fruits with paper covers before egg laying provides 100% organic foolproof protection"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುವು ಕಾಯಿಯೊಳಗೆ ನುಗ್ಗಿ ಬೀಜಗಳನ್ನು ತಿಂದು ಮಲದಿಂದ ಮುಚ್ಚಿದ ದುಂಡಗಿನ ರಂಧ್ರವನ್ನು ಮಾಡುತ್ತದೆ",
      "ರಂಧ್ರದ ಮೂಲಕ ಶಿಲೀಂಧ್ರ ಪ್ರವೇಶಿಸಿ ಇಡೀ ದಾಳಿಂಬೆ ಕೊಳೆತು ಕಪ್ಪಾಗುತ್ತದೆ",
      "ಕಾಯಿ ಚಿಕ್ಕದಿರುವಾಗಲೇ ಪೇಪರ್ ಕವರ್ ಹಾಕಿ ಮುಚ್ಚುವುದು ಶೇ. 100ರಷ್ಟು ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "सूंड़ी फल के अंदर घुसकर बीजों को खाती है और बाहर बदबूदार मल से भरा छेद छोड़ती है",
      "छेद से फफूंद घुसकर फल को अंदर से सड़ाकर काला कर देती है",
      "फल छोटे होने पर ही थैली से ढकना (बैगिंग) 100% सुरक्षित और अचूक उपाय है"
    ],
    "products": [
      {
        "name": "Chlorantraniliprole 18.5 SC (Coragen)",
        "type": "chemical",
        "brand": "FMC Coragen",
        "price": "₹850 – ₹1,150 / 60mL",
        "query": "Chlorantraniliprole 18.5 SC"
      },
      {
        "name": "Pomegranate Fruit Protection Bags",
        "type": "organic",
        "brand": "Agro Protect Bags",
        "price": "₹350 – ₹480 / 100 bags",
        "query": "Pomegranate fruit protection bags"
      }
    ]
  },
  {
    "crop": "Pomegranate (ದಾಳಿಂಬೆ)",
    "cropKn": "ದಾಳಿಂಬೆ",
    "cropHi": "अनार (पोमोग्रेनेट)",
    "emoji": "🍎",
    "disease": "Pomegranate Anthracnose / Fruit Spot (Colletotrichum gloeosporioides)",
    "diseaseKn": "ದಾಳಿಂಬೆ ಹಣ್ಣಿನ ಕಪ್ಪು ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "अनार एन्थ्रेक्नोज (काला फल धब्बा रोग)",
    "severity": "Medium",
    "remedy": "Spray Azoxystrobin 23 SC @ 1 mL/L or Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L or Carbendazim 50 WP @ 1 g/L.",
    "remedyKn": "Azoxystrobin 23 SC @ 1 mL/L ಅಥವಾ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Azoxystrobin 23 SC @ 1 mL/L या Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Prune dead and dense twigs after harvest. Spray 1% Bordeaux mixture on pruned trees.",
    "preventionKn": "ಕಟಾವಿನ ನಂತರ ಒಣಗಿದ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    "preventionHi": "कटाई के बाद सूखी टहनियां काटें और 1% बोर्डो मिश्रण का छिड़काव करें।",
    "organicTip": "Foliar spray of Pseudomonas fluorescens @ 5 g/L + cow urine 5% on fruits.",
    "organicTipKn": "Pseudomonas fluorescens @ 5 g/L ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 5 g/L और 5% गोमूत्र का फलों पर छिड़काव करें।",
    "fertilizer": "Apply Potassium Nitrate (13:0:45) @ 5 g/L to strengthen fruit rind.",
    "fertilizerKn": "ಕಾಯಿಯ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು 13:0:45 @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "छिलका मजबूत करने के लिए 13:0:45 @ 5 g/L का छिड़काव करें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Small circular dark reddish-brown sunken spots on fruit rind and leaves",
      "Spots coalesce into large black patches spoiling fruit appearance and market grade",
      "High humidity during monsoon encourages rapid fungal proliferation"
    ],
    "keyTakeawaysKn": [
      "ಕಾಯಿಯ ಸಿಪ್ಪೆ ಮತ್ತು ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ದುಂಡಗಿನ ಕಡು ಕಂದು-ಕೆಂಪು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಕಲೆಗಳು ಒಂದಾಗಿ ದೊಡ್ಡ ಕಪ್ಪು ಮಚ್ಚೆಗಳಾಗಿ ದಾಳಿಂಬೆಯ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಯನ್ನು ಹಾಳುಮಾಡುತ್ತವೆ",
      "ಮಳೆಗಾಲದ ತೇವಾಂಶದಲ್ಲಿ ಈ ರೋಗ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "फलों के छिलके और पत्तियों पर गोल धंसे हुए गहरे लाल-भूरे धब्बे बनते हैं",
      "धब्बे मिलकर बड़े काले चकत्ते बन जाते हैं जिससे बाजार में भाव नहीं मिलता",
      "बरसात के नम मौसम में यह फफूंद बहुत तेजी से फैलती है"
    ],
    "products": [
      {
        "name": "Azoxystrobin 23 SC (Amistar)",
        "type": "chemical",
        "brand": "Syngenta Amistar",
        "price": "₹750 – ₹1,050 / 200mL",
        "query": "Azoxystrobin 23 SC Amistar"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Pomegranate (ದಾಳಿಂಬೆ)",
    "cropKn": "ದಾಳಿಂಬೆ",
    "cropHi": "अनार (पोमोग्रेनेट)",
    "emoji": "🍎",
    "disease": "Cercospora Leaf & Fruit Spot (Cercospora punicae)",
    "diseaseKn": "ಸರ್ಕೋಸ್ಪೊರಾ ಎಲೆ ಮತ್ತು ಕಾಯಿ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "अनार सर्कोस्पोरा धब्बा रोग (पर्ण एवं फल चित्ती)",
    "severity": "Low",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Chlorothalonil 75 WP @ 2 g/L or Copper Oxychloride 50 WP @ 2.5 g/L.",
    "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Chlorothalonil 75 WP @ 2 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Mancozeb 75 WP @ 2.5 g/L या Chlorothalonil 75 WP @ 2 g/L या Copper Oxychloride 50 WP @ 2.5 g/L का छिड़काव करें।",
    "prevention": "Collect and burn fallen infected leaves. Maintain proper air movement inside tree canopy.",
    "preventionKn": "ಉದುರಿದ ರೋಗಪೀಡಿತ ಎಲೆಗಳನ್ನು ಸುಟ್ಟುಹಾಕಿ. ಮರದ ಒಳಗೆ ಗಾಳಿಯಾಡುವಂತೆ ಮಾಡಿ.",
    "preventionHi": "गिरी हुई संक्रमित पत्तियों को जलाएं। पेड़ के अंदर हवा का संचार बनाए रखें।",
    "organicTip": "Foliar spray of 1% Bordeaux mixture or Trichoderma viride @ 5 g/L.",
    "organicTipKn": "1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಅಥವಾ Trichoderma viride @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "1% बोर्डो मिश्रण या Trichoderma viride @ 5 g/L का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply balanced micronutrient spray to enhance general foliar resistance.",
    "fertilizerKn": "ಗಿಡದ ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "पत्तियों की मजबूती के लिए सूक्ष्म पोषक तत्व दें।",
    "scheme": "State Horticulture Mission (SHM)",
    "schemeLink": "https://horticulturedir.karnataka.gov.in/",
    "color": "#64748b",
    "keyTakeaways": [
      "Minute dark brown spots with light centers on leaves and small circular dark spots on fruits",
      "Causes premature leaf fall when infection is severe",
      "Controlled easily with preventive copper or dithiocarbamate sprays"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಮಧ್ಯದಲ್ಲಿ ತಿಳಿ ಬಣ್ಣವಿರುವ ಸಣ್ಣ ಕಂದು ಚುಕ್ಕೆಗಳು ಮತ್ತು ಕಾಯಿಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ರೋಗ ತೀವ್ರವಾದಾಗ ಎಲೆಗಳು ಅಕಾಲಿಕವಾಗಿ ಉದುರುತ್ತವೆ",
      "ತಾಮ್ರದ ಅಥವಾ ಮ್ಯಾಂಕೋಜೆಬ್ ಶಿಲೀಂಧ್ರನಾಶಕದಿಂದ ಸುಲಭವಾಗಿ ನಿಯಂತ್ರಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर हल्के केंद्र वाले छोटे भूरे धब्बे और फलों पर काले चकत्ते बनते हैं",
      "रोग बढ़ने पर पत्तियां समय से पहले झड़ जाती हैं",
      "कॉपर या मैंकोजेब के छिड़काव से यह आसानी से नियंत्रित हो जाता है"
    ],
    "products": [
      {
        "name": "Chlorothalonil 75 WP",
        "type": "chemical",
        "brand": "Kavach",
        "price": "₹420 – ₹580 / 500g",
        "query": "Chlorothalonil 75 WP Kavach"
      },
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      }
    ]
  },
  {
    "crop": "Groundnut (ಕಡಲೆಕಾಯಿ)",
    "cropKn": "ಕಡಲೆಕಾಯಿ",
    "cropHi": "मूंगफली (ग्राउंडनट)",
    "emoji": "🥜",
    "disease": "Tikka Leaf Spot (Cercospora arachidicola & personata)",
    "diseaseKn": "ಕಡಲೆಕಾಯಿ ಟಿಕ್ಕಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "मूंगफली टिक्का रोग (पर्ण चित्ती)",
    "severity": "High",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L or Tebuconazole 25.9 EC @ 1 mL/L or Hexaconazole 5 EC @ 1 mL/L at first spot appearance (35–40 days after sowing) and repeat 15 days later.",
    "remedyKn": "ಬಿತ್ತನೆಯ 35-40 ದಿನಗಳಲ್ಲಿ ಚುಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Tebuconazole 25.9 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "बुवाई के 35-40 दिन बाद धब्बे दिखते ही Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L या Tebuconazole 25.9 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Deep summer ploughing. Crop rotation with cereals like pearl millet or sorghum. Seed treatment with Thiram @ 3 g/kg.",
    "preventionKn": "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ. ಜೋಳ ಅಥವಾ ಸಜ್ಜೆಯೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "preventionHi": "गर्मियों में गहरी जुताई करें। बाजरा या ज्वार के साथ फसल चक्र अपनाएं। Thiram @ 3 g/kg से बीजोपचार करें।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) or Pseudomonas fluorescens @ 5 g/L.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಅಥವಾ Pseudomonas fluorescens @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के बीज का अर्क या Pseudomonas fluorescens @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Apply Gypsum @ 200 kg/acre at 40–45 days (flowering) to strengthen pod shells.",
    "fertilizerKn": "ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ (40-45 ದಿನಗಳಲ್ಲಿ) ಎಕರೆಗೆ 200 kg ಜಿಪ್ಸಮ್ (Gypsum) ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "सुईयां बनते समय (40-45 दिन पर) 200 kg जिप्सम प्रति एकड़ डालें ताकि फलियां मजबूत बनें।",
    "scheme": "National Food Security Mission - Oilseeds (NFSM-OS)",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Early leaf spot produces circular reddish-brown spots with prominent bright yellow halo",
      "Late leaf spot produces nearly circular carbon-black spots with faint halo on lower leaf surface",
      "Causes severe premature defoliation leading to poorly filled pods and reduced oil content"
    ],
    "keyTakeawaysKn": [
      "ಅರ್ಲಿ ಸ್ಪಾಟ್: ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಅಂಚಿರುವ ಕೆಂಪು-ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಲೇಟ್ ಸ್ಪಾಟ್: ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಕಪ್ಪು ಬಣ್ಣದ ದುಂಡಗಿನ ಕಲೆಗಳು ಮೂಡುತ್ತವೆ",
      "ಎಲೆಗಳು ಸಂಪೂರ್ಣ ಉದುರಿ ಕಾಳುಗಳು ಸರಿಯಾಗಿ ತುಂಬುವುದಿಲ್ಲ ಮತ್ತು ಎಣ್ಣೆ ಅಂಶ ಕುಸಿಯುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "अगेती पत्ती धब्बा: चमकदार पीले घेरे वाले लाल-भूरे गोल धब्बे बनते हैं",
      "पछेती पत्ती धब्बा: निचली सतह पर काले कोयले जैसे गोल धब्बे बनते हैं",
      "पत्तियां पूरी तरह झड़ जाती हैं जिससे फलियों में दाने नहीं भरते और तेल घट जाता है"
    ],
    "products": [
      {
        "name": "Tebuconazole 25.9 EC",
        "type": "chemical",
        "brand": "Folicur (Bayer)",
        "price": "₹480 – ₹690 / 250mL",
        "query": "Tebuconazole 25.9 EC Folicur"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Agricultural Gypsum (Calcium + Sulphur)",
        "type": "fertilizer",
        "brand": "Agri Gypsum 50kg",
        "price": "₹320 – ₹450 / 50kg",
        "query": "Agricultural gypsum fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Groundnut (ಕಡಲೆಕಾಯಿ)",
    "cropKn": "ಕಡಲೆಕಾಯಿ",
    "cropHi": "मूंगफली (ग्राउंडनट)",
    "emoji": "🥜",
    "disease": "Groundnut Rust (Puccinia arachidis)",
    "diseaseKn": "ಕಡಲೆಕಾಯಿ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "मूंगफली रतुआ रोग (रस्ट)",
    "severity": "High",
    "remedy": "Spray Wettable Sulphur 80 WP @ 3 g/L or Hexaconazole 5 EC @ 1 mL/L or Mancozeb 75 WP @ 2.5 g/L as soon as rust pustules appear.",
    "remedyKn": "ತುಕ್ಕು ಬೊಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फफोले दिखते ही Wettable Sulphur 80 WP @ 3 g/L या Hexaconazole 5 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Eradicate self-sown volunteer groundnut plants during off-season. Grow rust-resistant varieties like ICGV 86590 or GPBD 4.",
    "preventionKn": "ಋತುವಿಲ್ಲದ ಸಮಯದಲ್ಲಿ ಹೊಲದಲ್ಲಿ ತಾವಾಗಿಯೇ ಹುಟ್ಟಿದ ಕಡಲೆಕಾಯಿ ಗಿಡಗಳನ್ನು ನಾಶಮಾಡಿ. GPBD 4 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "मौसम के अलावा उगे जंगली मूंगफली के पौधों को नष्ट करें। GPBD 4 जैसी रतुआ रोधी किस्में लगाएं।",
    "organicTip": "Foliar spray of 5% neem oil emulsion or fresh buttermilk 10%.",
    "organicTipKn": "5% ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ 10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के तेल या 10% खट्टी छाछ का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Ensure balanced fertilization with adequate Potash to reduce rust pustule spread.",
    "fertilizerKn": "ತುಕ್ಕು ರೋಗ ಹರಡುವಿಕೆ ತಡೆಯಲು ಸಮತೋಲಿತ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "रतुआ का फैलाव रोकने के लिए पर्याप्त पोटाश खाद डालें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Numerous tiny, orange to chestnut-brown powdery pustules rupturing lower leaf surface",
      "Unlike Tikka, infected leaves turn brown, dry, and remain attached to the plant (\"scorched look\")",
      "Often occurs simultaneously with late leaf spot causing massive defoliation"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಕಿತ್ತಳೆ-ಕಂದು ಬಣ್ಣದ ಅಸಂಖ್ಯಾತ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಟಿಕ್ಕಾ ರೋಗದಂತಲ್ಲದೆ, ಒಣಗಿದ ಎಲೆಗಳು ಉದುರದೆ ಗಿಡಕ್ಕೆ ಅಂಟಿಕೊಂಡೇ ಸುಟ್ಟಂತೆ ಕಾಣುತ್ತವೆ",
      "ಸಾಮಾನ್ಯವಾಗಿ ಟಿಕ್ಕಾ ರೋಗದ ಜೊತೆಯಲ್ಲೇ ಬಂದು ಬೆಳೆಗೆ ಭಾರಿ ಹಾನಿ ಉಂಟುಮಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की निचली सतह पर नारंगी-भूरे रंग के चूर्ण भरे छोटे-छोटे अनगिनत फफोले बनते हैं",
      "टिक्का के विपरीत इसमें पत्तियां झड़ती नहीं बल्कि पेड़ पर ही सूखकर जली हुई दिखती हैं",
      "अक्सर पछेती टिक्का के साथ मिलकर फसल को पूरी तरह सुखा देता है"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC Contaf"
      }
    ]
  },
  {
    "crop": "Groundnut (ಕಡಲೆಕಾಯಿ)",
    "cropKn": "ಕಡಲೆಕಾಯಿ",
    "cropHi": "मूंगफली (ग्राउंडनट)",
    "emoji": "🥜",
    "disease": "Collar Rot / Crown Rot (Aspergillus niger)",
    "diseaseKn": "ಕಡಲೆಕಾಯಿ ಕಾಲರ್ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "मूंगफली कॉलर सड़न रोग (क्राउन रॉट)",
    "severity": "High",
    "remedy": "Seed treatment with Mancozeb 75 WP @ 3 g/kg or Carbendazim 50 WP @ 2 g/kg seed before sowing. Spot drench affected patches with Carbendazim 50 WP @ 1.5 g/L.",
    "remedyKn": "ಬಿತ್ತನೆ ಮುನ್ನ Mancozeb 75 WP @ 3 g/kg ಅಥವಾ Carbendazim @ 2 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಬಾಧಿತ ಬುಡಕ್ಕೆ Carbendazim ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "बुवाई से पहले Mancozeb 75 WP @ 3 g/kg या Carbendazim @ 2 g/kg से बीजोपचार करें। प्रभावित पौधों में कार्बेन्डाजिम का घोल डालें।",
    "prevention": "Avoid deep sowing of seeds (>5 cm depth). Use undamaged intact kernel seeds with intact testa.",
    "preventionKn": "ಬೀಜಗಳನ್ನು ತುಂಬಾ ಆಳವಾಗಿ (5 cm ಗಿಂತ ಹೆಚ್ಚು) ಬಿತ್ತಬೇಡಿ. ಸಿಪ್ಪೆ ಹಾನಿಯಾಗದ ಸಂಪೂರ್ಣ ಕಾಳುಗಳನ್ನು ಮಾತ್ರ ಬಿತ್ತನೆಗೆ ಬಳಸಿ.",
    "preventionHi": "बीज को 5 cm से ज्यादा गहरा न बोएं। बिना टूटी त्वचा वाले साबुत दाने ही बोएं।",
    "organicTip": "Seed treatment with Trichoderma viride @ 10 g/kg seed + soil application in FYM @ 2 kg/acre.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/kg से बीजोपचार करें और गोबर खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Apply well-rotted farmyard manure; avoid uncomposted fresh manure in seed furrows.",
    "fertilizerKn": "ಚೆನ್ನಾಗಿ ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಬಳಸಿ; ಹಸಿ ಸಗಣಿ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "सड़ी हुई गोबर खाद ही डालें; कच्ची खाद से बचें।",
    "scheme": "Oilseeds Seed Village Program (Subsidized Certified Seeds)",
    "schemeLink": "https://seednet.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Seedlings rot at ground collar region with black soot-like powdery fungal spores covering the stem",
      "Causes sudden post-emergence seedling collapse leaving large gaps in plant stand",
      "Fungicidal seed treatment is 100% mandatory and protects germination"
    ],
    "keyTakeawaysKn": [
      "ನೆಲಮಟ್ಟದಲ್ಲಿ ಸಸಿಗಳ ಬುಡ ಕೊಳೆತು ಕಪ್ಪು ಮಸಿಯಂತಹ ಶಿಲೀಂಧ್ರ ಬೀಜಾಣುಗಳು ಆವರಿಸುತ್ತವೆ",
      "ಮೊಳಕೆಯೊಡೆದ ಸಸಿಗಳು ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಕುಸಿದುಬಿದ್ದು ಹೊಲದಲ್ಲಿ ಸಸಿಗಳ ಸಂಖ್ಯೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ",
      "ಶಿಲೀಂಧ್ರನಾಶಕ ಬೀಜೋಪಚಾರವು ಶೇ. 100ರಷ್ಟು ಪರಿಣಾಮಕಾರಿಯಾಗಿದ್ದು ಮೊಳಕೆ ಉಳಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "तने का निचला हिस्सा जमीन के पास से गल जाता है और उस पर काले पाउडर जैसी फफूंद जम जाती है",
      "उगने के बाद छोटे पौधे अचानक मर जाते हैं जिससे खेत खाली दिखने लगता है",
      "बीजोपचार अनिवार्य है जो अंकुरण के बाद पौधों को 100% सुरक्षा देता है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Groundnut (ಕಡಲೆಕಾಯಿ)",
    "cropKn": "ಕಡಲೆಕಾಯಿ",
    "cropHi": "मूंगफली (ग्राउंडनट)",
    "emoji": "🥜",
    "disease": "Stem Rot / Sclerotium Blight (Sclerotium rolfsii)",
    "diseaseKn": "ಕಡಲೆಕಾಯಿ ಕಾಂಡ ಕೊಳೆ ರೋಗ (ಸ್ಕ್ಲಿರೋಶಿಯಂ ಬ್ಲೈಟ್)",
    "diseaseHi": "मूंगफली तना विगलन रोग (सफेद फफूंद / तना सड़न)",
    "severity": "High",
    "remedy": "Spot drench root and crown zone with Tebuconazole 25.9 EC @ 1.5 mL/L or Hexaconazole 5 SC @ 2 mL/L or Captan 50 WP @ 2.5 g/L.",
    "remedyKn": "ಗಿಡದ ಬುಡಕ್ಕೆ Tebuconazole 25.9 EC @ 1.5 mL/L ಅಥವಾ Hexaconazole 5 SC @ 2 mL/L ದ್ರಾವಣ ಸುರಿಯಿರಿ (ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ).",
    "remedyHi": "पौधों की जड़ों में Tebuconazole 25.9 EC @ 1.5 mL/L या Hexaconazole 5 SC @ 2 mL/L का घोल डालें।",
    "prevention": "Avoid throwing soil over plant crown during intercultural weeding. Remove crop debris after harvest.",
    "preventionKn": "ಎಡೆಕುಂಟೆ ಹೊಡೆಯುವಾಗ ಗಿಡದ ಬುಡಕ್ಕೆ ಮಣ್ಣು ಮುಚ್ಚದಂತೆ ಎಚ್ಚರವಹಿಸಿ. ಕಟಾವಿನ ನಂತರ ಕಸವನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
    "preventionHi": "निराई-गुड़ाई के समय पौधे के तने पर ज्यादा मिट्टी न चढ़ाएं। फसल के ठूंठ नष्ट करें।",
    "organicTip": "Soil application of Trichoderma harzianum @ 2.5 kg/acre enriched in 200 kg neem cake and compost.",
    "organicTipKn": "200 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು ಕಾಂಪೋಸ್ಟ್‌ನಲ್ಲಿ Trichoderma harzianum @ 2.5 kg ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
    "organicTipHi": "200 kg नीम खली और सड़ी खाद में Trichoderma harzianum @ 2.5 kg मिलाकर खेत में डालें।",
    "fertilizer": "Apply Gypsum @ 200 kg/acre at pegging; Calcium suppresses Sclerotium infection.",
    "fertilizerKn": "ಕಾಯಿ ಕಟ್ಟುವಾಗ ಎಕರೆಗೆ 200 kg ಜಿಪ್ಸಮ್ ನೀಡಿ; ಕ್ಯಾಲ್ಸಿಯಂ ಶಿಲೀಂಧ್ರದ ಸೋಂಕನ್ನು ತಡೆಯುತ್ತದೆ.",
    "fertilizerHi": "सुईयां बनते समय 200 kg जिप्सम डालें; कैल्शियम तने को सड़ने से बचाता है।",
    "scheme": "National Mission on Oilseeds and Oil Palm (NMOOP)",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Dense fan-like white cottony mycelium wrapping around the stem base at ground level",
      "Tiny round mustard seed-like brown sclerotia scattered all over the white fungal web and pods",
      "Causes wilting of entire branches and rotting of subterranean pegs and pods"
    ],
    "keyTakeawaysKn": [
      "ನೆಲಮಟ್ಟದಲ್ಲಿ ಕಾಂಡದ ಬುಡದ ಸುತ್ತಲೂ ಬಿಳಿ ಹತ್ತಿಯಂತಹ ಬೂಷ್ಟು ಹರಡಿಕೊಳ್ಳುತ್ತದೆ",
      "ಬಿಳಿ ಬೂಷ್ಟಿನ ಮೇಲೆ ಸಾಸಿವೆ ಕಾಳಿನಂತಹ ಅಸಂಖ್ಯಾತ ಕಂದು ಗಂಟುಗಳು (ಸ್ಕ್ಲಿರೋಶಿಯಾ) ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಇಡೀ ಕೊಂಬೆಗಳು ಬಾಡಿ ಮಣ್ಣೊಳಗಿನ ಕಾಯಿಗಳು ಮತ್ತು ಬೀಜಗಳು ಕೊಳೆತುಹೋಗುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "जमीन की सतह पर तने के चारों ओर सफेद रुई जैसा घना जाला फैल जाता है",
      "सफेद जाले पर सरसों के दाने जैसे गोल भूरे रंग के कण (स्क्लेरोशिया) चिपके रहते हैं",
      "पूरी शाखाएं सूख जाती हैं और जमीन के अंदर फलियां सड़ जाती हैं"
    ],
    "products": [
      {
        "name": "Tebuconazole 25.9 EC",
        "type": "chemical",
        "brand": "Folicur (Bayer)",
        "price": "₹480 – ₹690 / 250mL",
        "query": "Tebuconazole 25.9 EC Folicur"
      },
      {
        "name": "Hexaconazole 5 SC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 SC Contaf"
      }
    ]
  },
  {
    "crop": "Groundnut (ಕಡಲೆಕಾಯಿ)",
    "cropKn": "ಕಡಲೆಕಾಯಿ",
    "cropHi": "मूंगफली (ग्राउंडनट)",
    "emoji": "🥜",
    "disease": "Groundnut Bud Necrosis Virus (GBNV)",
    "diseaseKn": "ಕಡಲೆಕಾಯಿ ಮೊಗ್ಗು ಕೊಳೆ ವೈರಸ್ (ನೆಕ್ರೋಸಿಸ್)",
    "diseaseHi": "मूंगफली कली परिगलन रोग (बड नेक्रोसिस वायरस)",
    "severity": "High",
    "remedy": "Control thrips vector (Thrips palmi) by spraying Imidacloprid 17.8 SL @ 0.5 mL/L or Fipronil 5 SC @ 1.5 mL/L or Dimethoate 30 EC @ 1.7 mL/L. Rogue out infected plants.",
    "remedyKn": "ಥ್ರಿಪ್ಸ್ ನಿಯಂತ್ರಣಕ್ಕೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Fipronil 5 SC @ 1.5 mL/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ.",
    "remedyHi": "थ्रिप्स की रोकथाम के लिए Imidacloprid 17.8 SL @ 0.5 mL/L या Fipronil 5 SC @ 1.5 mL/L का छिड़काव करें। रोगी पौधे उखाड़ें।",
    "prevention": "Early sowing with optimum plant density (33 plants/m2). Intercrop groundnut with pearl millet (bajra) in 3:1 ratio.",
    "preventionKn": "ಸಕಾಲಕ್ಕೆ ದಟ್ಟ ಬಿತ್ತನೆ ಮಾಡಿ. ಕಡಲೆಕಾಯಿಯೊಂದಿಗೆ ಸಜ್ಜೆಯನ್ನು 3:1 ಅನುಪಾತದಲ್ಲಿ ಮಿಶ್ರಬೆಳೆಯಾಗಿ ಬೆಳೆಯಿರಿ.",
    "preventionHi": "समय पर बुवाई करें। मूंगफली के साथ बाजरे की 3:1 में अंतर्वर्ती खेती करें।",
    "organicTip": "Spray 5% neem seed kernel extract (NSKE) weekly; use blue sticky traps @ 20/acre.",
    "organicTipKn": "ಪ್ರತಿ ವಾರ 5% ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಎಕರೆಗೆ 20 ನೀಲಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "organicTipHi": "5% नीम के अर्क का छिड़काव करें और 20 नीले चिपचिपे ट्रैप प्रति एकड़ लगाएं।",
    "fertilizer": "Apply balanced NPK to promote rapid canopy closure.",
    "fertilizerKn": "ಬೆಳೆ ಬೇಗನೆ ನೆಲವನ್ನು ಮುಚ್ಚುವಂತೆ ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "जमीन को जल्दी ढकने के लिए संतुलित खाद दें।",
    "scheme": "Raitha Sanjeevini Pest Relief Package",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Ring spots and chlorotic mottling on young leaflets followed by necrosis of terminal growing bud",
      "Stems show dark brown necrotic streaks and secondary axillary shoots become stunted and bushy",
      "Intercropping with pearl millet acts as a physical barrier reducing thrips landing by 60%"
    ],
    "keyTakeawaysKn": [
      "ಎಳೆ ಎಲೆಗಳ ಮೇಲೆ ಉಂಗುರಾಕಾರದ ಕಲೆಗಳು ಉಂಟಾಗಿ ತುದಿಯ ಮೊಗ್ಗು ಒಣಗಿ ಸಾಯುತ್ತದೆ (\"ಮೊಗ್ಗು ಕೊಳೆ\")",
      "ಕಾಂಡದ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ಗಿಡವು ಗಿಡ್ಡವಾಗಿ ಪೊದೆಯಂತಾಗುತ್ತದೆ",
      "ಸಜ್ಜೆಯೊಂದಿಗೆ ಮಿಶ್ರಬೆಳೆ ಬೆಳೆಯುವುದರಿಂದ ಥ್ರಿಪ್ಸ್ ಕೀಟಗಳ ಪ್ರವೇಶ ಶೇ. 60ರಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "नई पत्तियों पर गोल छल्लेदार धब्बे बनते हैं और तने की मुख्य कली सूखकर मर जाती है",
      "तने पर काली धारियां बन जाती हैं और पौधा झाड़ीनुमा बौना रह जाता है",
      "बाजरे के साथ मिश्रित खेती करने से थ्रिप्स कीट का हमला 60% तक कम हो जाता है"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Blue Sticky Traps",
        "type": "organic",
        "brand": "Agri Blue Pads",
        "price": "₹240 – ₹350 / pack of 10",
        "query": "Blue sticky traps thrips"
      }
    ]
  },
  {
    "crop": "Sunflower (ಸೂರ್ಯಕಾಂತಿ)",
    "cropKn": "ಸೂರ್ಯಕಾಂತಿ",
    "cropHi": "सूरजमुखी",
    "emoji": "🌻",
    "disease": "Alternaria Leaf Blight (Alternaria helianthi)",
    "diseaseKn": "ಸೂರ್ಯಕಾಂತಿ ಆಲ್ಟರ್ನೇರಿಯಾ ಎಲೆ ಅಂಗಮಾರಿ",
    "diseaseHi": "सूरजमुखी अल्टरनेरिया झुलसा (लीफ ब्लाइट)",
    "severity": "High",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L or Iprodione 50 WP @ 2 g/L at 45 and 60 days after sowing.",
    "remedyKn": "ಬಿತ್ತನೆಯ 45 ಮತ್ತು 60 ದಿನಗಳಲ್ಲಿ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "बुवाई के 45 और 60 दिन बाद Mancozeb 75 WP @ 2.5 g/L या Propiconazole 25 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Seed treatment with Carbendazim 50 WP @ 2 g/kg + Thiram 75 WP @ 2 g/kg. Avoid dense planting.",
    "preventionKn": "Carbendazim @ 2 g/kg ಮತ್ತು Thiram @ 2 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ದಟ್ಟ ಬಿತ್ತನೆಯನ್ನು ತಪ್ಪಿಸಿ.",
    "preventionHi": "कार्बेन्डाजिम और थीरम से बीजोपचार करें। बहुत घनी बुवाई न करें।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L + 5% neem seed kernel extract (NSKE).",
    "organicTipKn": "Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/L और 5% नीम के अर्क का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply Potash (MOP) @ 30 kg/acre to improve stem and leaf thickness.",
    "fertilizerKn": "ಕಾಂಡ ಮತ್ತು ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಎಕರೆಗೆ 30 kg ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "तने और पत्तियों की मजबूती के लिए 30 kg पोटाश प्रति एकड़ दें।",
    "scheme": "National Mission on Oilseeds and Oil Palm (NMOOP)",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Dark brown circular to irregular spots with concentric rings surrounded by a yellow chlorotic halo",
      "Causes extensive leaf blighting, premature defoliation, and stem breaking at middle nodes",
      "Fungicide spray at button and flowering stages preserves seed filling and oil percentage"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಅಂಚಿರುವ ಉಂಗುರಾಕಾರದ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಎಲೆಗಳು ಸುಟ್ಟು ಒಣಗಿ, ಮಧ್ಯದ ಗೆಣ್ಣುಗಳಲ್ಲಿ ಕಾಂಡ ಮುರಿದು ಬೀಳುತ್ತದೆ",
      "ಹೂಮೊಗ್ಗು ಮತ್ತು ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಸಿಂಪಡಿಸುವುದರಿಂದ ಕಾಳು ಕಟ್ಟುವಿಕೆ ಮತ್ತು ಎಣ್ಣೆ ಅಂಶ ಹೆಚ್ಚುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर पीले घेरे वाले गोल गहरे भूरे छल्लेदार धब्बे बनते हैं",
      "पत्तियां झुलस जाती हैं और बीच की पोरियों से तना टूट जाता है",
      "बटन और फूल आने की अवस्था में छिड़काव दानों के भराव और तेल की मात्रा को बचाता है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Propiconazole 25 EC",
        "type": "chemical",
        "brand": "Tilt",
        "price": "₹420 – ₹600 / 250mL",
        "query": "Propiconazole 25 EC Tilt"
      }
    ]
  },
  {
    "crop": "Sunflower (ಸೂರ್ಯಕಾಂತಿ)",
    "cropKn": "ಸೂರ್ಯಕಾಂತಿ",
    "cropHi": "सूरजमुखी",
    "emoji": "🌻",
    "disease": "Sunflower Rust (Puccinia helianthi)",
    "diseaseKn": "ಸೂರ್ಯಕಾಂತಿ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "सूरजमुखी रतुआ रोग (रस्ट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Wettable Sulphur 80 WP @ 3 g/L or Hexaconazole 5 EC @ 1 mL/L upon noticing pustules on lower leaves.",
    "remedyKn": "ಕೆಳಗಿನ ಎಲೆಗಳ ಮೇಲೆ ತುಕ್ಕು ಬೊಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "निचली पत्तियों पर फफोले दिखते ही Wettable Sulphur 80 WP @ 3 g/L या Hexaconazole 5 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Deep summer ploughing. Destroy volunteer sunflower plants. Plant tolerant hybrids like KBSH-1 or RSFH-130.",
    "preventionKn": "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ. KBSH-1 ಅಥವಾ RSFH-130 ರಂತಹ ರೋಗ ಸಹಿಷ್ಣು ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "गर्मियों में गहरी जुताई करें। KBSH-1 या RSFH-130 जैसी सहनशील संकर किस्में लगाएं।",
    "organicTip": "Foliar spray of 10% sour buttermilk or fermented neem-cow urine extract.",
    "organicTipKn": "10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಅಥವಾ ಗೋಮೂತ್ರ-ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% खट्टी छाछ या गोमूत्र-नीम के अर्क का छिड़काव करें।",
    "fertilizer": "Avoid late excess nitrogen top-dressing which delays crop maturity and worsens rust.",
    "fertilizerKn": "ತಡವಾಗಿ ಸಾರಜನಕ ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
    "fertilizerHi": "देर से अधिक यूरिया न डालें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Small, circular, reddish-brown powdery pustules scattered on both surfaces of leaves",
      "Later in the season, pustules turn dark black as winter teliospores develop",
      "Heavy infection causes leaves to dry up rapidly reducing 1000-seed test weight"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಸಣ್ಣ ಕೆಂಪು-ಕಂದು ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
      "ಋತುವಿನ ಕೊನೆಯಲ್ಲಿ ಬೊಕ್ಕೆಗಳು ಕಪ್ಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ",
      "ಎಲೆಗಳು ಬೇಗನೆ ಒಣಗಿ ಕಾಳುಗಳ ತೂಕ ಮತ್ತು ಗುಣಮಟ್ಟ ಕಡಿಮೆಯಾಗುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की दोनों सतहों पर छोटे गोल लाल-भूरे पाउडर जैसे फफोले बनते हैं",
      "मौसम के अंत में ये फफोले काले रंग के हो जाते हैं",
      "पत्तियां सूखने से दानों का वजन और उपज घट जाती है"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC Contaf"
      }
    ]
  },
  {
    "crop": "Sunflower (ಸೂರ್ಯಕಾಂತಿ)",
    "cropKn": "ಸೂರ್ಯಕಾಂತಿ",
    "cropHi": "सूरजमुखी",
    "emoji": "🌻",
    "disease": "Sunflower Head Rot / Rhizopus Rot (Rhizopus arrhizus)",
    "diseaseKn": "ಸೂರ್ಯಕಾಂತಿ ಹೂಗುಚ್ಛ ಕೊಳೆ ರೋಗ (ಹೆಡ್ ರೊಟ್)",
    "diseaseHi": "सूरजमुखी मुंडक विगलन (हेड रॉट / राइजोपस रॉट)",
    "severity": "High",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Copper Oxychloride 50 WP @ 2.5 g/L directed onto the back of sunflower heads at flowering and repeat 10 days later.",
    "remedyKn": "ಹೂವಾಡುವಾಗ ಹೂವಿನ ಹಿಂಭಾಗಕ್ಕೆ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Copper Oxychloride @ 2.5 g/L ಬೀಳುವಂತೆ ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फूल खिलते समय मुंडक (फूल के पिछले हिस्से) पर Mancozeb 75 WP @ 2.5 g/L या Copper Oxychloride @ 2.5 g/L का छिड़काव करें।",
    "prevention": "Control head borer caterpillars and birds whose punctures provide entry for Rhizopus spores.",
    "preventionKn": "ಕಾಯಿ ಕೊರೆಯುವ ಹುಳುಗಳು ಮತ್ತು ಹಕ್ಕಿಗಳ ಬಾಧೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ; ಇವುಗಳ ಗಾಯದ ಮೂಲಕ ಶಿಲೀಂಧ್ರ ಒಳನುಗ್ಗುತ್ತದೆ.",
    "preventionHi": "फल छेदक कीट और पक्षियों से बचाएं जिनके घावों से यह फफूंद अंदर घुसती है।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L directly onto sunflower heads.",
    "organicTipKn": "ಹೂಗುಚ್ಛಗಳ ಮೇಲೆ ನೇರವಾಗಿ Trichoderma viride @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "मुंडक पर सीधे Trichoderma viride @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Apply Boron (Solubor 20%) @ 1.5 g/L at star-bud stage to enhance head rind thickness.",
    "fertilizerKn": "ಮೊಗ್ಗು ಹಂತದಲ್ಲಿ ಬೋರಾನ್ (Solubor 20%) @ 1.5 g/L ಸಿಂಪಡಿಸಿ.",
    "fertilizerHi": "कली अवस्था में बोरॉन @ 1.5 g/L का छिड़काव करें।",
    "scheme": "National Mission on Oilseeds and Oil Palm (NMOOP)",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Back of the fleshy head turns water-soaked, soft, brown, and rots with coarse black-whiskered mold",
      "Tissues disintegrate and entire head drops off or seeds shred out completely",
      "Heavy rain during flowering triggers explosive head rot epidemics"
    ],
    "keyTakeawaysKn": [
      "ಹೂವಿನ ಮಾಂಸಲ ಹಿಂಭಾಗವು ಮೆದುವಾಗಿ, ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಕಪ್ಪು ಮೀಸೆಯಂತಹ ಬೂಷ್ಟಿನಿಂದ ಕೊಳೆಯುತ್ತದೆ",
      "ಹೂವು ಸಂಪೂರ್ಣ ಕಳಚಿ ನೆಲಕ್ಕೆ ಬೀಳುತ್ತದೆ ಅಥವಾ ಕಾಳುಗಳು ಉದುರಿಹೋಗುತ್ತವೆ",
      "ಹೂವಾಡುವಾಗ ಬೀಳುವ ನಿರಂತರ ಮಳೆ ಈ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "फूल का पिछला भाग पानीदार, मुलायम और भूरा होकर काले रोएंदार जाले के साथ सड़ जाता है",
      "पूरा फूल टूटकर गिर जाता है या दाने झड़ जाते हैं",
      "फूल आते समय बारिश होने से यह सड़न महामारी का रूप ले लेती है"
    ],
    "products": [
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹420 / 500g",
        "query": "Copper Oxychloride 50 WP"
      },
      {
        "name": "Solubor Boron 20%",
        "type": "fertilizer",
        "brand": "Multiplex Boron",
        "price": "₹220 – ₹320 / 500g",
        "query": "Solubor Boron 20 agriculture"
      }
    ]
  },
  {
    "crop": "Sunflower (ಸೂರ್ಯಕಾಂತಿ)",
    "cropKn": "ಸೂರ್ಯಕಾಂತಿ",
    "cropHi": "सूरजमुखी",
    "emoji": "🌻",
    "disease": "Sunflower Downy Mildew (Plasmopara halstedii)",
    "diseaseKn": "ಸೂರ್ಯಕಾಂತಿ ಬೂದಿ ರೋಗ (ಡೌನಿ ಮಿಲ್ಡ್ಯೂ)",
    "diseaseHi": "सूरजमुखी डाउनी मिल्ड्यू (मृदुरोमिल आसिता)",
    "severity": "High",
    "remedy": "Seed treatment with Metalaxyl 35 WS @ 6 g/kg seed + foliar spray of Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at 20 days.",
    "remedyKn": "Metalaxyl 35 WS @ 6 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು 20 ದಿನಗಳಲ್ಲಿ Metalaxyl + Mancozeb @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "Metalaxyl 35 WS @ 6 g/kg से बीजोपचार करें और 20 दिन बाद Metalaxyl + Mancozeb @ 2 g/L का छिड़काव करें।",
    "prevention": "Rogue out stunted downy-mildewed seedlings within 30 days of sowing. Deep ploughing.",
    "preventionKn": "ಬಿತ್ತನೆಯ 30 ದಿನಗಳೊಳಗೆ ರೋಗಪೀಡಿತ ಕುಂಠಿತ ಸಸಿಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ. ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ.",
    "preventionHi": "30 दिनों के भीतर पीले बौने पौधों को उखाड़कर नष्ट करें। गहरी जुताई करें।",
    "organicTip": "Seed treatment with bio-agent Pseudomonas fluorescens @ 10 g/kg seed.",
    "organicTipKn": "Pseudomonas fluorescens @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "organicTipHi": "Pseudomonas fluorescens @ 10 g/kg से बीजोपचार करें।",
    "fertilizer": "Apply balanced basal nutrition; avoid water stagnation in early vegetative stage.",
    "fertilizerKn": "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "शुरुआत में जलभराव न होने दें और संतुलित खाद दें।",
    "scheme": "Oilseeds Technology Mission (TMO)",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#15803d",
    "keyTakeaways": [
      "Severe seedling stunting, chlorosis spreading along main veins, and white downy fungal felt underneath leaves",
      "Affected plants remain severely dwarfed with horizontal heads that produce no viable seeds",
      "Systemic Metalaxyl seed dressing is the most critical management tool"
    ],
    "keyTakeawaysKn": [
      "ಸಸಿಗಳು ಗಿಡ್ಡವಾಗಿ, ಎಲೆಗಳ ನರಗಳ ಉದ್ದಕ್ಕೂ ಹಳದಿಯಾಗಿ, ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಆವರಿಸುತ್ತದೆ",
      "ಗಿಡಗಳು ಗಿಡ್ಡವಾಗಿಯೇ ಉಳಿದು ಹೂವು ಅಡ್ಡಲಾಗಿ ನಿಂತು ಕಾಳು ಕಟ್ಟುವುದಿಲ್ಲ",
      "ಮೆಟಲಾಕ್ಸಿಲ್ ಬೀಜೋಪಚಾರವು ಈ ರೋಗವನ್ನು ತಡೆಯಲು ಅತ್ಯಂತ ಪ್ರಮುಖ ಕ್ರಮವಾಗಿದೆ"
    ],
    "keyTakeawaysHi": [
      "पौधा बहुत बौना रह जाता है, नसों के पास पत्तियां पीली होती हैं और नीचे सफेद फफूंद जम जाती है",
      "पौधे छोटे रह जाते हैं और सिर क्षैतिज रहकर कोई दाना नहीं बनाते",
      "मेटालेक्सिल से बीजोपचार ही इसका सबसे पक्का बचाव है"
    ],
    "products": [
      {
        "name": "Metalaxyl 35 WS",
        "type": "chemical",
        "brand": "Apron 35 SD (Syngenta)",
        "price": "₹380 – ₹520 / 100g",
        "query": "Metalaxyl 35 WS"
      },
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP",
        "type": "chemical",
        "brand": "Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      }
    ]
  },
  {
    "crop": "Sunflower (ಸೂರ್ಯಕಾಂತಿ)",
    "cropKn": "ಸೂರ್ಯಕಾಂತಿ",
    "cropHi": "सूरजमुखी",
    "emoji": "🌻",
    "disease": "Sunflower Necrosis Virus (Tobacco Streak Virus - TSV)",
    "diseaseKn": "ಸೂರ್ಯಕಾಂತಿ ನೆಕ್ರೋಸಿಸ್ ರೋಗ (ಟಿಎಸ್‌ವಿ)",
    "diseaseHi": "सूरजमुखी परिगलन रोग (नेक्रोसिस वायरस - टीएसवी)",
    "severity": "High",
    "remedy": "Control thrips vector (Scirtothrips dorsalis) by spraying Imidacloprid 17.8 SL @ 0.5 mL/L or Fipronil 5 SC @ 1.5 mL/L at 15 and 30 days after emergence.",
    "remedyKn": "ಥ್ರಿಪ್ಸ್ ನಿಯಂತ್ರಣಕ್ಕೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Fipronil 5 SC @ 1.5 mL/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತುಹಾಕಿ.",
    "remedyHi": "थ्रिप्स की रोकथाम के लिए Imidacloprid 17.8 SL @ 0.5 mL/L या Fipronil 5 SC @ 1.5 mL/L का छिड़काव करें।",
    "prevention": "Destroy weed hosts like Parthenium hysterophorus around fields. Grow border crops (sorghum).",
    "preventionKn": "ಹೊಲದ ಸುತ್ತಮುತ್ತಲಿರುವ ಕಾಂಗ್ರೆಸ್ ಕಳೆ (ಪಾರ್ಥೇನಿಯಂ) ಗಿಡಗಳನ್ನು ಸಂಪೂರ್ಣ ನಾಶಮಾಡಿ. ಗಡಿಯಲ್ಲಿ ಜೋಳ ಅಥವಾ ಸಜ್ಜೆ ಬೆಳೆಯಿರಿ.",
    "preventionHi": "खेत के चारों ओर से गाजरघास (पार्थेनियम) नष्ट करें। बॉर्डर पर ज्वार या बाजरा लगाएं।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) + blue sticky traps @ 20/acre.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಎಕರೆಗೆ 20 ನೀಲಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "organicTipHi": "5% नीम के अर्क का छिड़काव करें और 20 नीले चिपचिपे ट्रैप प्रति एकड़ लगाएं।",
    "fertilizer": "Apply balanced NPK to promote rapid vegetative growth.",
    "fertilizerKn": "ಗಿಡಗಳು ವೇಗವಾಗಿ ಬೆಳೆಯಲು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "पौधों की तेज बढ़वार के लिए संतुलित खाद दें।",
    "scheme": "Raitha Sanjeevini Pest Relief Package",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Mosaic, ring spots, and black necrosis of leaves, petiole, and stem leading to sudden terminal death",
      "Stem develops longitudinal black streaks and head bends over with aborted floral discs",
      "Transmitted by thrips carrying pollen from infected Parthenium weeds"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ತೊಟ್ಟು ಮತ್ತು ಕಾಂಡದ ಮೇಲೆ ಕಪ್ಪು ಪಟ್ಟೆಗಳು ಮೂಡಿ ಸುಳಿಯು ಒಣಗಿ ಸಾಯುತ್ತದೆ (\"ನೆಕ್ರೋಸಿಸ್\")",
      "ಕಾಂಡವು ಕಪ್ಪಾಗಿ ತಿರುಚಿಕೊಂಡು ಹೂವುಗಳು ಕಾಯಿ ಕಟ್ಟುವುದಿಲ್ಲ",
      "ಕಾಂಗ್ರೆಸ್ ಕಳೆ ಗಿಡಗಳ ಪರಾಗವನ್ನು ಹೊತ್ತ ಥ್ರಿಪ್ಸ್ ಕೀಟಗಳಿಂದ ಈ ರೋಗ ಹರಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों, डंठल और तने पर काले घाव बनते हैं जिससे मुख्य कली सूखकर मर जाती है",
      "तने पर काली धारियां बन जाती हैं और फूल मुड़कर दाना नहीं बनाते",
      "गाजरघास के परागकणों को ले जाने वाले थ्रिप्स कीट से यह वायरस फैलता है"
    ],
    "products": [
      {
        "name": "Imidacloprid 17.8 SL",
        "type": "chemical",
        "brand": "Confidor",
        "price": "₹240 – ₹380 / 100mL",
        "query": "Imidacloprid 17.8 SL"
      },
      {
        "name": "Blue Sticky Traps",
        "type": "organic",
        "brand": "Agri Blue Pads",
        "price": "₹240 – ₹350 / pack of 10",
        "query": "Blue sticky traps thrips"
      }
    ]
  },
  {
    "crop": "Soybean (ಸೋಯಾಬೀನ್)",
    "cropKn": "ಸೋಯಾಬೀನ್",
    "cropHi": "सोयाबीन",
    "emoji": "🌱",
    "disease": "Soybean Rust (Phakopsora pachyrhizi)",
    "diseaseKn": "ಸೋಯಾಬೀನ್ ತುಕ್ಕು ರೋಗ",
    "diseaseHi": "सोयाबीन रतुआ रोग (एशियन सोयाबीन रस्ट)",
    "severity": "High",
    "remedy": "Spray Hexaconazole 5 EC @ 1 mL/L or Propiconazole 25 EC @ 1 mL/L or Tebuconazole 25.9 EC @ 1 mL/L upon first detection of tan lesions.",
    "remedyKn": "ಕಂದು ಬಣ್ಣದ ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Hexaconazole 5 EC @ 1 mL/L ಅಥವಾ Tebuconazole 25.9 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "धब्बे दिखते ही Hexaconazole 5 EC @ 1 mL/L या Tebuconazole 25.9 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Early sowing in June. Grow tolerant varieties like DSb 21, DSb 23, or JS 335. Avoid monocropping.",
    "preventionKn": "ಜೂನ್ ಆರಂಭದಲ್ಲೇ ಬಿತ್ತನೆ ಮಾಡಿ. DSb 21 ಅಥವಾ JS 335 ರಂತಹ ರೋಗ ಸಹಿಷ್ಣು ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "जून की शुरुआत में बुवाई करें। DSb 21 या JS 335 जैसी सहनशील किस्में लगाएं।",
    "organicTip": "Foliar spray of 5% neem oil emulsion early in season.",
    "organicTipKn": "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ 5% ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "मौसम की शुरुआत में 5% नीम के तेल का छिड़काव करें।",
    "fertilizer": "Apply Potash (MOP) @ 25 kg/acre to strengthen canopy cell resistance.",
    "fertilizerKn": "ಎಕರೆಗೆ 25 kg ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "25 kg पोटाश प्रति एकड़ दें।",
    "scheme": "National Food Security Mission - Oilseeds (Soybean Focus)",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Tiny polygonal chlorotic spots turning into reddish-brown pustules on underside of leaves",
      "Causes catastrophic defoliation within 10–14 days leading to empty pods",
      "Single well-timed spray of triazole fungicide before R3 pod set saves harvest"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಸಣ್ಣ ಬಹುಭುಜಾಕೃತಿಯ ಕೆಂಪು-ಕಂದು ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಮೂಡುತ್ತವೆ",
      "ಕೇವಲ 10 ರಿಂದ 14 ದಿನಗಳಲ್ಲಿ ಇಡೀ ಎಲೆಗಳು ಉದುರಿ ಕಾಯಿಗಳು ಕಾಳಿಲ್ಲದೆ ಜೊಳ್ಳಾಗುತ್ತವೆ",
      "ಕಾಯಿ ಕಟ್ಟುವ ಹಂತಕ್ಕೆ ಮುನ್ನ ಟ್ರಯಾಜೋಲ್ ಸಿಂಪಡಣೆ ಬೆಳೆಯನ್ನು ಸಂಪೂರ್ಣ ರಕ್ಷಿಸುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों की निचली सतह पर छोटे कोणीय लाल-भूरे रंग के फफोले बनते हैं",
      "10-14 दिनों में पूरी पत्तियां झड़ जाती हैं और फलियां खाली रह जाती हैं",
      "फलियां बनने से पहले ट्राईजोल फफूंदनाशक का स्प्रे पूरी फसल को बचा लेता है"
    ],
    "products": [
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC Contaf"
      },
      {
        "name": "Tebuconazole 25.9 EC",
        "type": "chemical",
        "brand": "Folicur (Bayer)",
        "price": "₹480 – ₹690 / 250mL",
        "query": "Tebuconazole 25.9 EC Folicur"
      }
    ]
  },
  {
    "crop": "Soybean (ಸೋಯಾಬೀನ್)",
    "cropKn": "ಸೋಯಾಬೀನ್",
    "cropHi": "सोयाबीन",
    "emoji": "🌱",
    "disease": "Yellow Mosaic Virus (YMV)",
    "diseaseKn": "ಸೋಯಾಬೀನ್ ಹಳದಿ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
    "diseaseHi": "सोयाबीन पीला मोज़ेक वायरस (YMV)",
    "severity": "High",
    "remedy": "Control whitefly vector (Bemisia tabaci) by spraying Thiamethoxam 25 WG @ 0.3 g/L or Beta-cyfluthrin + Imidacloprid (Solomon) @ 0.7 mL/L. Rogue out infected plants.",
    "remedyKn": "ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ Thiamethoxam 25 WG @ 0.3 g/L ಅಥವಾ Solomon @ 0.7 mL/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ.",
    "remedyHi": "सफेद मक्खी की रोकथाम के लिए Thiamethoxam 25 WG @ 0.3 g/L या Solomon @ 0.7 mL/L का छिड़काव करें। रोगी पौधे उखाड़ें।",
    "prevention": "Seed treatment with Thiamethoxam 30 FS @ 10 mL/kg seed. Install yellow sticky traps @ 20/acre.",
    "preventionKn": "Thiamethoxam 30 FS @ 10 mL/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಎಕರೆಗೆ 20 ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "preventionHi": "Thiamethoxam 30 FS @ 10 mL/kg से बीजोपचार करें। 20 पीले चिपचिपे ट्रैप प्रति एकड़ लगाएं।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) at 15 and 30 days after sowing.",
    "organicTipKn": "ಬಿತ್ತನೆಯ 15 ಮತ್ತು 30 ದಿನಗಳಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "बुवाई के 15 और 30 दिन बाद 5% नीम के अर्क का छिड़काव करें।",
    "fertilizer": "Apply balanced basal NPK; avoid excessive nitrogen top-dressing.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "संतुलित खाद दें; ज्यादा यूरिया न डालें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#eab308",
    "keyTakeaways": [
      "Bright yellow and green mosaic patches on leaves turning completely golden-yellow",
      "Plants produce drastically fewer pods with shriveled, discolored seeds",
      "Seed dressing with Thiamethoxam provides 30-day systemic protection against whitefly"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಹಸಿರು ಮತ್ತು ಹಳದಿ ಬಣ್ಣದ ಮಚ್ಚೆಗಳು ಮೂಡಿ ಕ್ರಮೇಣ ಇಡೀ ಎಲೆ ಬಂಗಾರದ ಹಳದಿಯಾಗುತ್ತದೆ",
      "ಕಾಯಿ ಕಟ್ಟುವುದು ಗಣನೀಯವಾಗಿ ಕಡಿಮೆಯಾಗಿ ಕಾಳುಗಳು ಸುಕ್ಕುಗಟ್ಟುತ್ತವೆ",
      "ಥಯಾಮೆಥೊಕ್ಸಾಮ್ ಬೀಜೋಪಚಾರವು ಬಿಳಿ ನೊಣಗಳ ವಿರುದ್ಧ 30 ದಿನಗಳ ಕಾಲ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर हरे और पीले धब्बे बनते हैं और बाद में पूरी पत्तियां सुनहरी पीली हो जाती हैं",
      "फलियां बहुत कम लगती हैं और दाने सिकुड़कर बदरंग हो जाते हैं",
      "थियामेथोक्सम से बीजोपचार सफेद मक्खी के खिलाफ 30 दिन तक सुरक्षा देता है"
    ],
    "products": [
      {
        "name": "Thiamethoxam 30 FS (Seed Treatment)",
        "type": "chemical",
        "brand": "Cruiser (Syngenta)",
        "price": "₹420 – ₹580 / 100mL",
        "query": "Thiamethoxam 30 FS Cruiser"
      },
      {
        "name": "Beta-cyfluthrin + Imidacloprid (Solomon)",
        "type": "chemical",
        "brand": "Solomon (Bayer)",
        "price": "₹480 – ₹680 / 100mL",
        "query": "Solomon Bayer insecticide"
      }
    ]
  },
  {
    "crop": "Soybean (ಸೋಯಾಬೀನ್)",
    "cropKn": "ಸೋಯಾಬೀನ್",
    "cropHi": "सोयाबीन",
    "emoji": "🌱",
    "disease": "Charcoal Rot (Macrophomina phaseolina)",
    "diseaseKn": "ಸೋಯಾಬೀನ್ ಇದ್ದಿಲು ಕೊಳೆ ರೋಗ (ಚಾರ್ಕೋಲ್ ರೊಟ್)",
    "diseaseHi": "सोयाबीन चारकोल विगलन रोग (चारकोल रॉट)",
    "severity": "High",
    "remedy": "Seed treatment with Carboxin + Thiram @ 2 g/kg seed. Avoid soil moisture deficit during pod development.",
    "remedyKn": "Carboxin + Thiram @ 2 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಕಾಯಿ ಬಲಿಯುವಾಗ ತೇವಾಂಶದ ಕೊರತೆಯಾಗದಂತೆ ನೀರಾವರಿ ಮಾಡಿ.",
    "remedyHi": "Carboxin + Thiram @ 2 g/kg से बीजोपचार करें। फली बनते समय खेत में नमी की कमी न होने दें।",
    "prevention": "Deep summer ploughing. Crop rotation with non-host crops like maize or sorghum.",
    "preventionKn": "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ. ಮೆಕ್ಕೆಜೋಳ ಅಥವಾ ಜೋಳದೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "गर्मियों में गहरी जुताई करें। मक्का या ज्वार के साथ फसल चक्र अपनाएं।",
    "organicTip": "Seed treatment with Trichoderma viride @ 5 g/kg seed + soil application in FYM @ 2.5 kg/acre.",
    "organicTipKn": "Trichoderma viride @ 5 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/kg से बीजोपचार करें और सड़ी खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Apply Potash (MOP) @ 25 kg/acre to strengthen vascular root systems.",
    "fertilizerKn": "ಬೇರುಗಳು ಗಟ್ಟಿಯಾಗಲು ಎಕರೆಗೆ 25 kg ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "जड़ों को मजबूत करने के लिए 25 kg पोटाश प्रति एकड़ दें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#1e293b",
    "keyTakeaways": [
      "Sub-epidermal stem and root tissues become covered with thousands of jet-black charcoal-like microsclerotia",
      "Stem pith turns ashy-gray and shreds easily when split open under hot, dry weather stress",
      "Maintaining soil moisture during flowering and pod development prevents disease trigger"
    ],
    "keyTakeawaysKn": [
      "ಕಾಂಡ ಮತ್ತು ಬೇರಿನ ಒಳಭಾಗದಲ್ಲಿ ಇದ್ದಿಲಿನ ಪುಡಿಯಂತಹ ಸಾವಿರಾರು ಸಣ್ಣ ಕಪ್ಪು ಗಂಟುಗಳು ಆವರಿಸುತ್ತವೆ",
      "ಕಾಂಡದ ಒಳಗಿನ ತಿರುಳು ಬೂದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಬಿಸಿಲಿನ ತಾಪಕ್ಕೆ ಗಿಡಗಳು ಸುಲಭವಾಗಿ ಒಣಗಿ ಮುರಿಯುತ್ತವೆ",
      "ಹೂವಾಡುವ ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ತೇವಾಂಶ ಕಾಪಾಡುವುದರಿಂದ ಈ ರೋಗ ಬರುವುದಿಲ್ಲ"
    ],
    "keyTakeawaysHi": [
      "तने और जड़ों के अंदर कोयले के चूरे जैसे हजारों काले दाने (माइक्रोस्क्लेरोशिया) भर जाते हैं",
      "तने का भीतरी गूदा राख जैसा धूसर होकर चीर-चीर हो जाता है",
      "फूल और फली बनते समय खेत में नमी बनाए रखने से यह बीमारी नहीं पनपती"
    ],
    "products": [
      {
        "name": "Carboxin + Thiram (Vitavax Power)",
        "type": "chemical",
        "brand": "Vitavax Power",
        "price": "₹420 – ₹580 / 500g",
        "query": "Carboxin Thiram Vitavax Power"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Soybean (ಸೋಯಾಬೀನ್)",
    "cropKn": "ಸೋಯಾಬೀನ್",
    "cropHi": "सोयाबीन",
    "emoji": "🌱",
    "disease": "Anthracnose & Pod Blight (Colletotrichum truncatum)",
    "diseaseKn": "ಸೋಯಾಬೀನ್ ಕಾಯಿ ಅಂಗಮಾರಿ ರೋಗ (ಆಂಥ್ರಾಕ್ನೋಸ್)",
    "diseaseHi": "सोयाबीन फली झुलसा एवं एन्थ्रेक्नोज",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L at pod initiation (R3 stage).",
    "remedyKn": "ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Amistar Top @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फली बनते समय Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L या Amistar Top @ 1 mL/L का छिड़काव करें।",
    "prevention": "Seed treatment with Thiram 75 WP @ 3 g/kg seed. Use certified disease-free seeds.",
    "preventionKn": "Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜಗಳನ್ನು ಬಳಸಿ.",
    "preventionHi": "Thiram @ 3 g/kg से बीजोपचार करें। प्रमाणित रोगमुक्त बीज बोएं।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L combined with 5% cow urine.",
    "organicTipKn": "Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "Trichoderma viride @ 5 g/L और 5% गोमूत्र का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply balanced NPK; avoid plant overcrowding.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಗಿಡಗಳು ಅತಿಯಾಗಿ ದಟ್ಟವಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "fertilizerHi": "संतुलित खाद दें; पौधों को बहुत घना न होने दें।",
    "scheme": "National Food Security Mission - Oilseeds",
    "schemeLink": "https://nmoop.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Irregular dark brown lesions on pods, stems, and leaves with black hair-like setose fruiting bodies",
      "Pods turn brown prematurely and abort or produce moldy, shriveled, non-germinating seeds",
      "Protective fungicide spray at early podding prevents yield loss"
    ],
    "keyTakeawaysKn": [
      "ಕಾಯಿಗಳು, ಕಾಂಡ ಮತ್ತು ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕೂದಲುಗಳಂತಹ ಚುಕ್ಕೆಗಳುಳ್ಳ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಕಾಯಿಗಳು ಅಕಾಲಿಕವಾಗಿ ಒಣಗಿ ಕಾಳು ಕಟ್ಟದೆ ಜೊಳ್ಳಾಗುತ್ತವೆ ಅಥವಾ ಬೂಷ್ಟು ಹಿಡಿದ ಸಣ್ಣ ಕಾಳುಗಳಾಗುತ್ತವೆ",
      "ಕಾಯಿ ಕಟ್ಟುವ ಆರಂಭದಲ್ಲೇ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸುವುದರಿಂದ ಇಳುವರಿ ನಷ್ಟ ತಪ್ಪಿಸಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "फलियों, तनों और पत्तियों पर काले बालों जैसे दानों वाले भूरे धब्बे बनते हैं",
      "फलियां समय से पहले सूख जाती हैं और अंदर के दाने सिकुड़कर बदरंग हो जाते हैं",
      "फली बनते समय फफूंदनाशक का छिड़काव करने से भरपूर पैदावार मिलती है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Azoxystrobin + Difenoconazole (Amistar Top)",
        "type": "chemical",
        "brand": "Syngenta Amistar Top",
        "price": "₹850 – ₹1,200 / 200mL",
        "query": "Azoxystrobin Difenoconazole Amistar Top"
      }
    ]
  },
  {
    "crop": "Soybean (ಸೋಯಾಬೀನ್)",
    "cropKn": "ಸೋಯಾಬೀನ್",
    "cropHi": "सोयाबीन",
    "emoji": "🌱",
    "disease": "Girdle Beetle (Obereopsis brevis)",
    "diseaseKn": "ಸೋಯಾಬೀನ್ ಸೊಂಟ ಕೊರೆಯುವ ದುಂಬಿ",
    "diseaseHi": "सोयाबीन गर्डल बीटल (चक्र भृंग)",
    "severity": "High",
    "remedy": "Spray Chlorantraniliprole 18.5 SC @ 0.3 mL/L or Profenofos 50 EC @ 2 mL/L or Triazophos 40 EC @ 2 mL/L upon noticing girdled rings.",
    "remedyKn": "ಸೊಂಟದ ಉಂಗುರಗಳು ಕಂಡ ತಕ್ಷಣ Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಅಥವಾ Profenofos 50 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "छल्लेदार कटाई दिखते ही Chlorantraniliprole 18.5 SC @ 0.3 mL/L या Profenofos 50 EC @ 2 mL/L का छिड़काव करें।",
    "prevention": "Handpick and destroy cut petiole and stem sections during early infestation. Maintain clean field bunds.",
    "preventionKn": "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಕತ್ತರಿಸಿದ ಎಲೆ ತೊಟ್ಟುಗಳನ್ನು ಆರಿಸಿ ನಾಶಮಾಡಿ. ಬದುಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ.",
    "preventionHi": "शुरुआत में कटी हुई टहनियों को इकट्ठा करके नष्ट करें। मेड़ों को साफ रखें।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) or Neem oil 10000 PPM @ 3 mL/L.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ @ 3 mL/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के बीज का अर्क या नीम का तेल @ 3 mL/L का छिड़काव करें।",
    "fertilizer": "Apply balanced NPK; avoid excessive nitrogen promoting soft succulent stems.",
    "fertilizerKn": "ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ; ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "ज्यादा यूरिया न डालें जिससे तना कोमल होकर कीट को आकर्षित करता है।",
    "scheme": "Raitha Sanjeevini Pest Relief Package",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Female beetle makes two parallel ring cuts (girdles) around petiole or stem to deposit an egg between rings",
      "Portion of the branch above the girdle withers, droops, dries up, and drops off within 2–3 days",
      "Larva tunnels inside the main stem down to ground level boring the plant hollow"
    ],
    "keyTakeawaysKn": [
      "ಹೆಣ್ಣು ದುಂಬಿಯು ಕಾಂಡದ ಸುತ್ತಲೂ ಎರಡು ಸಮಾನಾಂತರ ಉಂಗುರದಂತಹ ಸೀಳುಗಳನ್ನು ಮಾಡಿ ಮಧ್ಯದಲ್ಲಿ ಮೊಟ್ಟೆ ಇಡುತ್ತದೆ",
      "ಉಂಗುರದ ಮೇಲ್ಭಾಗದ ಎಲೆ ಮತ್ತು ರೆಂಬೆಯು 2-3 ದಿನಗಳಲ್ಲಿ ಒಣಗಿ ಮುರಿದು ಬೀಳುತ್ತದೆ",
      "ಮರಿ ಹುಳುವು ಕಾಂಡದ ಒಳಭಾಗದಲ್ಲಿ ಕೆಳಮಟ್ಟದವರೆಗೆ ಸುರಂಗ ಕೊರೆದು ಇಡೀ ಗಿಡವನ್ನು ಪೊಳ್ಳು ಮಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "मादा बीटल तने या डंठल पर दो समानांतर छल्लेदार कट लगाकर बीच में अंडा देती है",
      "छल्ले के ऊपर का भाग 2-3 दिन में मुरझाकर सूख जाता है और लटक जाता है",
      "सूंड़ी तने के अंदर जमीन तक सुरंग खोदकर पूरे पौधे को खोखला कर देती है"
    ],
    "products": [
      {
        "name": "Chlorantraniliprole 18.5 SC",
        "type": "chemical",
        "brand": "Coragen (FMC)",
        "price": "₹850 – ₹1,150 / 60mL",
        "query": "Chlorantraniliprole 18.5 SC"
      },
      {
        "name": "Profenofos 50 EC",
        "type": "chemical",
        "brand": "Curacron",
        "price": "₹480 – ₹680 / 500mL",
        "query": "Profenofos 50 EC"
      }
    ]
  },
  {
    "crop": "Chickpea / Bengal Gram (ಕಡಲೆ)",
    "cropKn": "ಕಡಲೆ",
    "cropHi": "चना (बंगाल ग्राम)",
    "emoji": "🌱",
    "disease": "Fusarium Wilt (Fusarium oxysporum f.sp. ciceris)",
    "diseaseKn": "ಕಡಲೆ ಸೊರಗು ರೋಗ (ಫ್ಯುಸಾರಿಯಂ ವಿಲ್ಟ್)",
    "diseaseHi": "चना उकठा रोग (फ्यूजेरियम विल्ट)",
    "severity": "High",
    "remedy": "Seed treatment with Carbendazim 50 WP @ 1 g/kg + Thiram 75 WP @ 2 g/kg seed before sowing. Spot drench wilted patches with Carbendazim 50 WP @ 1.5 g/L.",
    "remedyKn": "Carbendazim @ 1 g/kg ಮತ್ತು Thiram @ 2 g/kg ನೊಂದಿಗೆ ಕಡ್ಡಾಯ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಬಾಧಿತ ಬುಡಕ್ಕೆ Carbendazim @ 1.5 g/L ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "Carbendazim @ 1 g/kg + Thiram @ 2 g/kg से अनिवार्य बीजोपचार करें। उकठा प्रभावित पौधों में कार्बेन्डाजिम का घोल डालें।",
    "prevention": "Cultivate wilt-resistant varieties (JG 11, JAKI 9218, KAK 2). 3-year crop rotation with non-legumes.",
    "preventionKn": "JG 11, JAKI 9218 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ. 3 ವರ್ಷಗಳ ಕಾಲ ಇತರ ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "JG 11, JAKI 9218 जैसी उकठा रोधी किस्में लगाएं। गैर-दलहनी फसलों के साथ 3 साल का फसल चक्र अपनाएं।",
    "organicTip": "Seed treatment with Trichoderma viride @ 10 g/kg seed + soil application in FYM @ 2.5 kg/acre at sowing.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/kg से बीजोपचार करें और गोबर खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Apply Potash (MOP) @ 20 kg/acre; avoid excess soil moisture.",
    "fertilizerKn": "ಎಕರೆಗೆ 20 kg ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "fertilizerHi": "20 kg पोटाश प्रति एकड़ दें; खेत में पानी न रुकने दें।",
    "scheme": "National Food Security Mission - Pulses (NFSM-P)",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Drooping of petioles and rachis, yellowing, withering, and drying of leaves starting from lower canopy",
      "Roots and lower stem show dark brown to black internal vascular discoloration when split open",
      "Resistant varieties JG 11 and JAKI 9218 provide 95% protection against wilt in Karnataka"
    ],
    "keyTakeawaysKn": [
      "ಕೆಳಗಿನ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ, ತೊಟ್ಟುಗಳು ಕೆಳಮುಖವಾಗಿ ಬಾಗಿ ಒಣಗಿಹೋಗುತ್ತವೆ",
      "ಬೇರು ಮತ್ತು ಕಾಂಡವನ್ನು ಸೀಳಿದಾಗ ಒಳಗಿನ ನರಗಳು ಕಂದು-ಕಪ್ಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುತ್ತವೆ",
      "ಕರ್ನಾಟಕಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಲಾದ JG 11 ಮತ್ತು JAKI 9218 ತಳಿಗಳು ಸೊರಗು ರೋಗಕ್ಕೆ ಅತ್ಯುತ್ತಮ ನಿರೋಧಕವಾಗಿವೆ"
    ],
    "keyTakeawaysHi": [
      "निचली पत्तियां पीली पड़कर डंठल नीचे झुक जाते हैं और पौधा सूख जाता है",
      "जड़ों और तने को चीरकर देखने पर भीतर की नसें भूरी-काली दिखाई देती हैं",
      "JG 11 और JAKI 9218 जैसी प्रतिरोधी किस्में इस रोग से 95% तक बचाती हैं"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Chickpea / Bengal Gram (ಕಡಲೆ)",
    "cropKn": "ಕಡಲೆ",
    "cropHi": "चना (बंगाल ग्राम)",
    "emoji": "🌱",
    "disease": "Ascochyta Blight (Ascochyta rabiei)",
    "diseaseKn": "ಕಡಲೆ ಅಸ್ಕೊಕೈಟಾ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "चना एस्कोकाइटा झुलसा (ब्लाइट)",
    "severity": "High",
    "remedy": "Spray Chlorothalonil 75 WP @ 2 g/L or Mancozeb 75 WP @ 2.5 g/L or Azoxystrobin 23 SC @ 1 mL/L upon first appearance of circular spots.",
    "remedyKn": "ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Chlorothalonil 75 WP @ 2 g/L ಅಥವಾ Mancozeb 75 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "धब्बे दिखते ही Chlorothalonil 75 WP @ 2 g/L या Mancozeb 75 WP @ 2.5 g/L का छिड़काव करें।",
    "prevention": "Use certified disease-free seeds. Intercrop with wheat, mustard, or barley.",
    "preventionKn": "ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜಗಳನ್ನು ಬಳಸಿ. ಗೋಧಿ ಅಥವಾ ಸಾಸಿವೆಯೊಂದಿಗೆ ಮಿಶ್ರಬೆಳೆ ಬೆಳೆಯಿರಿ.",
    "preventionHi": "प्रमाणित रोगमुक्त बीज लगाएं। गेहूं या सरसों के साथ मिश्रित खेती करें।",
    "organicTip": "Seed treatment with Trichoderma harzianum @ 10 g/kg seed.",
    "organicTipKn": "Trichoderma harzianum @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
    "organicTipHi": "Trichoderma harzianum @ 10 g/kg से बीजोपचार करें।",
    "fertilizer": "Apply balanced NPK; avoid excessive nitrogen that increases foliar density.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.",
    "fertilizerHi": "संतुलित खाद दें; अत्यधिक यूरिया से बचें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ea580c",
    "keyTakeaways": [
      "Circular circular brown spots with concentric circles of tiny black pycnidia on leaves, stems, and pods",
      "Stem lesions girdle twigs causing them to snap and collapse in circular burnt patches across field",
      "Cool wet weather (15–25°C) with persistent drizzle triggers explosive blights"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ಕಾಂಡ ಮತ್ತು ಕಾಯಿಗಳ ಮೇಲೆ ಸಣ್ಣ ಕಪ್ಪು ಚುಕ್ಕೆಗಳುಳ್ಳ ವೃತ್ತಾಕಾರದ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಕಾಂಡದ ಸುತ್ತಲೂ ಕಲೆಗಳು ಆವರಿಸಿ ರೆಂಬೆಗಳು ಮುರಿದು ಹೊಲದಲ್ಲಿ ಬೆಳೆ ಸುಟ್ಟಂತೆ ಕಾಣುತ್ತದೆ",
      "ತಂಪಾದ ತೇವಾಂಶದ ಹವಾಮಾನ ಮತ್ತು ತುಂತುರು ಮಳೆ ಈ ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों, तनों और फलियों पर काले दानों के छल्लेदार घेरे वाले भूरे धब्बे बनते हैं",
      "तने पर घाव बनने से टहनियां टूटकर गिर जाती हैं और खेत में जले हुए पैच दिखते हैं",
      "ठंडे और रिमझिम बारिश वाले मौसम में यह बीमारी बहुत तेजी से फैलती है"
    ],
    "products": [
      {
        "name": "Chlorothalonil 75 WP",
        "type": "chemical",
        "brand": "Kavach (Syngenta)",
        "price": "₹420 – ₹580 / 500g",
        "query": "Chlorothalonil 75 WP Kavach"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Chickpea / Bengal Gram (ಕಡಲೆ)",
    "cropKn": "ಕಡಲೆ",
    "cropHi": "चना (बंगाल ग्राम)",
    "emoji": "🌱",
    "disease": "Dry Root Rot (Rhizoctonia bataticola)",
    "diseaseKn": "ಕಡಲೆ ಒಣ ಬೇರು ಕೊಳೆ ರೋಗ",
    "diseaseHi": "चना शुष्क जड़ सड़न (ड्राई रूट रॉट)",
    "severity": "High",
    "remedy": "Seed treatment with Carboxin 37.5% + Thiram 37.5% @ 2 g/kg seed. Spot drench affected patches with Carbendazim 50 WP @ 1.5 g/L.",
    "remedyKn": "Carboxin + Thiram @ 2 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಬಾಧಿತ ಬುಡಕ್ಕೆ Carbendazim @ 1.5 g/L ದ್ರಾವಣ ಸುರಿಯಿರಿ.",
    "remedyHi": "Carboxin + Thiram @ 2 g/kg से बीजोपचार करें। प्रभावित पौधों में कार्बेन्डाजिम का घोल डालें।",
    "prevention": "Avoid soil moisture stress during flowering and pod development. Deep summer ploughing.",
    "preventionKn": "ಹೂವಾಡುವ ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ತೇವಾಂಶ ಕೊರತೆಯಾಗದಂತೆ ನೀರು ಹಾಯಿಸಿ. ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ.",
    "preventionHi": "फूल और फली बनते समय खेत में सूखा न पड़ने दें। गर्मियों में गहरी जुताई करें।",
    "organicTip": "Seed treatment with Trichoderma viride @ 10 g/kg + soil application of Trichoderma in 100 kg FYM @ 2.5 kg/acre.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/kg से बीजोपचार करें और गोबर खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Apply adequate Phosphorus and Potassium to foster deep taproot development.",
    "fertilizerKn": "ಬೇರುಗಳು ಆಳವಾಗಿ ಬೆಳೆಯಲು ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "जड़ों के गहरे विकास के लिए फास्फोरस और पोटाश खाद दें।",
    "scheme": "National Food Security Mission - Pulses",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "Appears around flowering and pod filling when temperatures rise above 30°C and soil dries up",
      "Roots turn completely black, brittle, and dry with taproot devoid of lateral secondary feeder roots",
      "Woody stem cylinder shreds into dry fibers with tiny jet-black microsclerotia inside"
    ],
    "keyTakeawaysKn": [
      "ಉಷ್ಣತೆ 30°C ಗಿಂತ ಹೆಚ್ಚಾಗಿ ಮಣ್ಣು ಒಣಗಿದಾಗ ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಈ ರೋಗ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ",
      "ಬೇರುಗಳು ಸಂಪೂರ್ಣ ಕಪ್ಪಾಗಿ, ಒಣಗಿ ಸುಲಭವಾಗಿ ಮುರಿಯುತ್ತವೆ ಮತ್ತು ಸಣ್ಣ ಬೇರುಗಳು ಕಳಚಿಹೋಗುತ್ತವೆ",
      "ಕಾಂಡದ ಒಳಭಾಗದಲ್ಲಿ ಕಪ್ಪು ಸೂಕ್ಷ್ಮ ಗಂಟುಗಳು ಕಂಡುಬರುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "तापमान 30°C से ऊपर जाने और खेत सूखने पर फूल और फली बनने के समय यह बीमारी आती है",
      "जड़ें बिल्कुल काली, सूखी और कड़क हो जाती हैं और सहायक जड़ें झड़ जाती हैं",
      "तने के अंदर छोटे काले दाने भर जाते हैं और तना सूख जाता है"
    ],
    "products": [
      {
        "name": "Carboxin + Thiram (Vitavax Power)",
        "type": "chemical",
        "brand": "Vitavax Power",
        "price": "₹420 – ₹580 / 500g",
        "query": "Carboxin Thiram Vitavax Power"
      },
      {
        "name": "Trichoderma viride 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹160 – ₹230 / 1kg",
        "query": "Trichoderma viride 1kg"
      }
    ]
  },
  {
    "crop": "Chickpea / Bengal Gram (ಕಡಲೆ)",
    "cropKn": "ಕಡಲೆ",
    "cropHi": "चना (बंगाल ग्राम)",
    "emoji": "🌱",
    "disease": "Chickpea Pod Borer (Helicoverpa armigera)",
    "diseaseKn": "ಕಡಲೆ ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು (ಹೆಲಿಕೋವರ್ಪಾ)",
    "diseaseHi": "चना फली छेदक (हेलिकोवर्पा / सुंडी)",
    "severity": "High",
    "remedy": "Spray Chlorantraniliprole 18.5 SC @ 0.3 mL/L or Emamectin Benzoate 5 SG @ 0.4 g/L or Flubendiamide 39.35 SC @ 0.3 mL/L at 1 larva/meter row (ETL).",
    "remedyKn": "ಮೀಟರ್ ಸಾಲಿಗೆ 1 ಹುಳು ಕಂಡಾಗ Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಅಥವಾ Emamectin Benzoate 5 SG @ 0.4 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "प्रति मीटर कतार में 1 सूंड़ी दिखने पर Chlorantraniliprole 18.5 SC @ 0.3 mL/L या Emamectin Benzoate 5 SG @ 0.4 g/L का छिड़काव करें।",
    "prevention": "Install Helilure pheromone traps @ 5/acre. Erect bird perches (T-shaped wooden poles) @ 20/acre for predatory birds.",
    "preventionKn": "ಎಕರೆಗೆ 5 ಹೆಲಿಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಇಡಿ. ಹಕ್ಕಿಗಳು ಕುಳಿತು ಹುಳುಗಳನ್ನು ತಿನ್ನಲು ಎಕರೆಗೆ 20 ‘T’ ಆಕಾರದ ಬೆರ್ಚುಗಳನ್ನು (ಪಕ್ಷಿ ಆಸನ) ಅಳವಡಿಸಿ.",
    "preventionHi": "5 हेलील्यूर फेरोमोन ट्रैप प्रति एकड़ लगाएं। पक्षियों के बैठने के लिए 20 ‘T’ आकार के खूंटे प्रति एकड़ लगाएं।",
    "organicTip": "Spray HaNPV (Helicoverpa NPV) @ 250 LE/ha in evening or Bacillus thuringiensis (Bt) @ 2 g/L.",
    "organicTipKn": "ಸಂಜೆ ವೇಳೆ HaNPV ಜೈವಿಕ ವೈರಸ್ @ 250 LE/ha ಅಥವಾ Bt @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "शाम के समय HaNPV @ 250 LE/हेक्टेयर या Bt @ 2 g/L का छिड़काव करें।",
    "fertilizer": "Apply balanced nutrients; avoid excessive vegetative growth flush.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "संतुलित खाद दें।",
    "scheme": "Raitha Sanjeevini Pest Management Support",
    "schemeLink": "https://raitamitra.karnataka.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Larva defoliates tender leaves first, then feeds on developing green pods making circular holes and eating seeds",
      "Single caterpillar can destroy 30 to 40 pods during its development",
      "Bird perches installed at flowering invite insectivorous birds that feed on larvae naturally"
    ],
    "keyTakeawaysKn": [
      "ಹುಳುವು ಮೊದಲು ಎಲೆಗಳನ್ನು ತಿಂದು, ನಂತರ ಕಾಯಿಗಳಿಗೆ ದುಂಡಗಿನ ರಂಧ್ರಗಳನ್ನು ಮಾಡಿ ಒಳಗಿನ ಕಾಳುಗಳನ್ನು ತಿನ್ನುತ್ತದೆ",
      "ಒಂದು ಹುಳುವು ತನ್ನ ಜೀವಿತಾವಧಿಯಲ್ಲಿ 30 ರಿಂದ 40 ಕಡಲೆ ಕಾಯಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಾಶಮಾಡಬಲ್ಲದು",
      "ಪಕ್ಷಿ ಆಸನಗಳನ್ನು (T-ಬೆರ್ಚು) ಅಳವಡಿಸುವುದರಿಂದ ಪಕ್ಷಿಗಳು ನೈಸರ್ಗಿಕವಾಗಿ ಹುಳುಗಳನ್ನು ಆರಿಸಿ ತಿನ್ನುತ್ತವೆ"
    ],
    "keyTakeawaysHi": [
      "सूंड़ी पहले पत्तियों को खाती है, फिर फलियों में गोल छेद बनाकर अंदर के दानों को चट कर जाती है",
      "एक सूंड़ी अपने जीवनकाल में 30 से 40 फलियों को नष्ट कर देती है",
      "खेत में पक्षियों के बैठने के लिए टी-खूंटे लगाने से चिड़ियां सूंड़ियों को प्राकृतिक रूप से खा जाती हैं"
    ],
    "products": [
      {
        "name": "Chlorantraniliprole 18.5 SC (Coragen)",
        "type": "chemical",
        "brand": "FMC Coragen",
        "price": "₹850 – ₹1,150 / 60mL",
        "query": "Chlorantraniliprole 18.5 SC"
      },
      {
        "name": "Emamectin Benzoate 5 SG",
        "type": "chemical",
        "brand": "Proclaim",
        "price": "₹420 – ₹590 / 100g",
        "query": "Emamectin Benzoate 5 SG"
      },
      {
        "name": "Helilure Pheromone Trap",
        "type": "organic",
        "brand": "PCI Phero Lure",
        "price": "₹120 – ₹180 / trap",
        "query": "Helicoverpa pheromone trap lure"
      }
    ]
  },
  {
    "crop": "Chickpea / Bengal Gram (ಕಡಲೆ)",
    "cropKn": "ಕಡಲೆ",
    "cropHi": "चना (बंगाल ग्राम)",
    "emoji": "🌱",
    "disease": "Chickpea Collar Rot (Sclerotium rolfsii)",
    "diseaseKn": "ಕಡಲೆ ಕಾಲರ್ ಕೊಳೆ ರೋಗ",
    "diseaseHi": "चना कॉलर सड़न रोग (स्क्लेरोशियम कॉलर रॉट)",
    "severity": "Medium",
    "remedy": "Seed treatment with Carboxin + Thiram @ 2 g/kg seed. Spot drench affected patches with Captan 50 WP @ 2.5 g/L or Carbendazim 50 WP @ 1.5 g/L.",
    "remedyKn": "Carboxin + Thiram @ 2 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಬಾಧಿತ ಜಾಗಕ್ಕೆ Captan @ 2.5 g/L ಅಥವಾ Carbendazim @ 1.5 g/L ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.",
    "remedyHi": "Carboxin + Thiram @ 2 g/kg से बीजोपचार करें। प्रभावित पौधों में Captan @ 2.5 g/L या Carbendazim @ 1.5 g/L का घोल डालें।",
    "prevention": "Avoid deep sowing. Clean field of undecomposed crop debris before sowing.",
    "preventionKn": "ಆಳವಾಗಿ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ. ಹೊಲದಲ್ಲಿರುವ ಹಳೆಯ ಕಸಕಡ್ಡಿಗಳನ್ನು ತೆಗೆದು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
    "preventionHi": "गहरी बुवाई न करें। खेत से पुराने डंठल और अवशेष साफ करें।",
    "organicTip": "Soil application of Trichoderma harzianum @ 2.5 kg/acre in 100 kg compost at sowing.",
    "organicTipKn": "100 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ Trichoderma harzianum @ 2.5 kg ಬೆರೆಸಿ ಬಿತ್ತನೆ ವೇಳೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "100 kg सड़ी खाद में Trichoderma harzianum @ 2.5 kg मिलाकर बुवाई पर डालें।",
    "fertilizer": "Apply well-composted manure; avoid unfermented cow dung.",
    "fertilizerKn": "ಚೆನ್ನಾಗಿ ಕಳಿತ ಗೊಬ್ಬರ ಮಾತ್ರ ಬಳಸಿ.",
    "fertilizerHi": "सड़ी हुई खाद का ही प्रयोग करें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#b91c1c",
    "keyTakeaways": [
      "Seedlings turn yellow, droop, and rot at ground collar region within 6 weeks of sowing",
      "White cottony mycelial fan and brown mustard-seed like sclerotia encircle the rotting collar",
      "Deep summer ploughing and Trichoderma seed treatment suppress soil inoculum"
    ],
    "keyTakeawaysKn": [
      "ಬಿತ್ತನೆಯ 6 ವಾರಗಳಲ್ಲಿ ಸಸಿಗಳು ಹಳದಿಯಾಗಿ, ಬುಡ ಕೊಳೆತು ನೆಲಕ್ಕುರುಳುತ್ತವೆ",
      "ಕೊಳೆತ ಕಾಂಡದ ಸುತ್ತಲೂ ಬಿಳಿ ಹತ್ತಿಯಂತಹ ಬೂಷ್ಟು ಮತ್ತು ಸಾಸಿವೆ ಕಾಳಿನಂತಹ ಕಂದು ಗಂಟುಗಳು ಕಾಣಿಸುತ್ತವೆ",
      "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮತ್ತು ಟ್ರೈಕೋಡರ್ಮಾ ಬೀಜೋಪಚಾರವು ರೋಗವನ್ನು ಸಂಪೂರ್ಣ ತಡೆಯುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "बुवाई के 6 हफ्तों के भीतर पौधे पीले पड़कर जमीन के पास से सड़ जाते हैं",
      "सड़े हुए तने पर सफेद रुई जैसा जाला और सरसों के दाने जैसे भूरे दाने दिखते हैं",
      "गर्मियों की गहरी जुताई और ट्राइकोडर्मा बीजोपचार इस फफूंद को खत्म कर देता है"
    ],
    "products": [
      {
        "name": "Captan 50 WP",
        "type": "chemical",
        "brand": "Captaf",
        "price": "₹320 – ₹450 / 500g",
        "query": "Captan 50 WP"
      },
      {
        "name": "Trichoderma harzianum 1% WP",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹170 – ₹250 / 1kg",
        "query": "Trichoderma harzianum 1kg"
      }
    ]
  },
  {
    "crop": "Mung Bean / Green Gram (ಹೆಸರುಕಾಳು)",
    "cropKn": "ಹೆಸರುಕಾಳು",
    "cropHi": "मूंग (हरा चना)",
    "emoji": "🌱",
    "disease": "Mung Bean Yellow Mosaic Virus (MYMV)",
    "diseaseKn": "ಹೆಸರು ಹಳದಿ ಮೊಸಾಯಿಕ್ ವೈರಸ್ (MYMV)",
    "diseaseHi": "मूंग पीला मोज़ेक वायरस रोग (MYMV)",
    "severity": "High",
    "remedy": "Control whitefly vector (Bemisia tabaci) with Thiamethoxam 25 WG @ 0.3 g/L or Dimethoate 30 EC @ 1.7 mL/L or Imidacloprid 17.8 SL @ 0.5 mL/L at first appearance. Rogue out infected plants.",
    "remedyKn": "ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ Thiamethoxam 25 WG @ 0.3 g/L ಅಥವಾ Dimethoate 30 EC @ 1.7 mL/L ಸಿಂಪಡಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ.",
    "remedyHi": "सफेद मक्खी की रोकथाम के लिए Thiamethoxam 25 WG @ 0.3 g/L या Dimethoate 30 EC @ 1.7 mL/L का छिड़काव करें। रोगी पौधों को उखाड़कर नष्ट करें।",
    "prevention": "Seed treatment with Imidacloprid 70 WS @ 5 g/kg or Thiamethoxam 30 FS @ 5 mL/kg seed. Grow resistant varieties (DGGV 2, IPM 02-03).",
    "preventionKn": "Imidacloprid 70 WS @ 5 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. DGGV 2 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "Imidacloprid 70 WS @ 5 g/kg से बीजोपचार करें। DGGV 2 जैसी पीला मोज़ेक रोधी किस्में लगाएं।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) at 15 and 30 days after sowing + yellow sticky traps @ 20/acre.",
    "organicTipKn": "15 ಮತ್ತು 30 ದಿನಗಳಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಎಕರೆಗೆ 20 ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "organicTipHi": "बुवाई के 15 और 30 दिन बाद 5% नीम का अर्क छिड़कें और 20 पीले चिपचिपे ट्रैप लगाएं।",
    "fertilizer": "Apply balanced basal nutrition (25:50:25 kg NPK/ha); avoid excess nitrogen.",
    "fertilizerKn": "ಹೆಕ್ಟೇರ್‌ಗೆ 25:50:25 kg NPK ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 25:50:25 kg NPK संतुलित खाद दें।",
    "scheme": "National Food Security Mission - Pulses (NFSM-P)",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#eab308",
    "keyTakeaways": [
      "Bright yellow mosaic spots intermingled with green patches expanding to turn entire leaf bright golden yellow",
      "Flowering and pod setting severely inhibited with stunted, deformed, empty pods",
      "Seed dressing with systemic neonicotinoid provides vital 30-day whitefly defense"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಮತ್ತು ಹಸಿರು ಚುಕ್ಕೆಗಳು ಮೂಡಿ ಕ್ರಮೇಣ ಇಡೀ ಎಲೆ ಬಂಗಾರದ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತದೆ",
      "ಹೂವು ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವುದು ಸಂಪೂರ್ಣ ನಿಂತುಹೋಗಿ ಗಿಡಗಳು ಬರಿಯದಾಗುತ್ತವೆ",
      "ಬೀಜೋಪಚಾರವು ಬಿಳಿ ನೊಣಗಳ ವಿರುದ್ಧ 30 ದಿನಗಳ ಕಾಲ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर पीले और हरे धब्बे बनते हैं और बाद में पूरी पत्ती चमकदार सुनहरी पीली हो जाती है",
      "फूल और फलियां बनना रुक जाता है और पैदावार शून्य रह जाती है",
      "बीजोपचार करने से सफेद मक्खी के खिलाफ 30 दिन की अचूक सुरक्षा मिलती है"
    ],
    "products": [
      {
        "name": "Thiamethoxam 25 WG",
        "type": "chemical",
        "brand": "Actara",
        "price": "₹220 – ₹340 / 100g",
        "query": "Thiamethoxam 25 WG Actara"
      },
      {
        "name": "Imidacloprid 70 WS (Seed Treatment)",
        "type": "chemical",
        "brand": "Gaucho (Bayer)",
        "price": "₹350 – ₹490 / 100g",
        "query": "Imidacloprid 70 WS Gaucho"
      },
      {
        "name": "Yellow Sticky Traps",
        "type": "organic",
        "brand": "Agri Sticky Pads",
        "price": "₹220 – ₹320 / pack of 10",
        "query": "Yellow sticky traps agriculture"
      }
    ]
  },
  {
    "crop": "Mung Bean / Green Gram (ಹೆಸರುಕಾಳು)",
    "cropKn": "ಹೆಸರುಕಾಳು",
    "cropHi": "मूंग (हरा चना)",
    "emoji": "🌱",
    "disease": "Mung Bean Powdery Mildew (Erysiphe polygoni)",
    "diseaseKn": "ಹೆಸರು ಬೂದಿ ರೋಗ (ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ)",
    "diseaseHi": "मूंग चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
    "severity": "Medium",
    "remedy": "Spray Wettable Sulphur 80 WP @ 3 g/L or Hexaconazole 5 EC @ 1 mL/L or Carbendazim 50 WP @ 1 g/L as soon as powdery specks appear on leaves.",
    "remedyKn": "ಬಿಳಿ ಬೂಷ್ಟು ಚುಕ್ಕೆಗಳು ಕಂಡ ತಕ್ಷಣ Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "पत्तियों पर सफेद पाउडर दिखते ही Wettable Sulphur 80 WP @ 3 g/L या Hexaconazole 5 EC @ 1 mL/L का छिड़काव करें।",
    "prevention": "Early sowing in Kharif / Rabi. Grow powdery mildew tolerant varieties like DGGV 2.",
    "preventionKn": "ಸಕಾಲಕ್ಕೆ ಬಿತ್ತನೆ ಮಾಡಿ. DGGV 2 ರಂತಹ ರೋಗ ಸಹಿಷ್ಣು ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.",
    "preventionHi": "समय पर बुवाई करें। DGGV 2 जैसी सहनशील किस्में लगाएं।",
    "organicTip": "Foliar spray of 10% sour buttermilk or 0.3% baking soda solution.",
    "organicTipKn": "10% ಹುಳಿ ಮಜ್ಜಿಗೆ ಅಥವಾ 0.3% ಅಡುಗೆ ಸೋಡಾ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "10% खट्टी छाछ या 0.3% बेकिंग सोडा के घोल का पत्तियों पर छिड़काव करें।",
    "fertilizer": "Apply adequate Potassium to harden leaf cuticles.",
    "fertilizerKn": "ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "पत्तियों को सख्त बनाने के लिए पर्याप्त पोटाश दें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#ca8a04",
    "keyTakeaways": [
      "White talcum powdery circular patches covering both sides of leaves, stems, and developing green pods",
      "Causes leaves to dry, curl, and shed prematurely severely affecting pod filling",
      "Common in dry weather with high morning humidity during pod development"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ಕಾಂಡ ಮತ್ತು ಕಾಯಿಗಳ ಮೇಲೆ ಬಿಳಿ ಟಾಲ್ಕಮ್ ಪೌಡರ್‌ನಂತಹ ಬೂಷ್ಟು ಕಲೆಗಳು ಆವರಿಸುತ್ತವೆ",
      "ಎಲೆಗಳು ಒಣಗಿ ಉದುರುವುದರಿಂದ ಕಾಯಿಗಳು ಸರಿಯಾಗಿ ತುಂಬುವುದಿಲ್ಲ",
      "ಒಣ ಹವೆ ಮತ್ತು ಮುಂಜಾನೆಯ ಮಂಜು ಇರುವ ಸಮಯದಲ್ಲಿ ರೋಗವು ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों, तनों और फलियों पर सफेद पाउडर के गोल चकत्ते जम जाते हैं",
      "पत्ते सूखकर मुड़ जाते हैं और समय से पहले गिर जाते हैं जिससे फलियां नहीं भरतीं",
      "सूखे मौसम और सुबह की नमी में यह फफूंद बहुत तेजी से फैलती है"
    ],
    "products": [
      {
        "name": "Wettable Sulphur 80 WP",
        "type": "chemical",
        "brand": "Sulfex",
        "price": "₹180 – ₹260 / 1kg",
        "query": "Wettable Sulphur 80 WP"
      },
      {
        "name": "Hexaconazole 5 EC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 EC Contaf"
      }
    ]
  },
  {
    "crop": "Mung Bean / Green Gram (ಹೆಸರುಕಾಳು)",
    "cropKn": "ಹೆಸರುಕಾಳು",
    "cropHi": "मूंग (हरा चना)",
    "emoji": "🌱",
    "disease": "Cercospora Leaf Spot (Cercospora canescens)",
    "diseaseKn": "ಹೆಸರು ಸರ್ಕೋಸ್ಪೊರಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    "diseaseHi": "मूंग सर्कोस्पोरा पर्ण चित्ती (लीफ स्पॉट)",
    "severity": "Medium",
    "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L or Chlorothalonil 75 WP @ 2 g/L at first symptom.",
    "remedyKn": "ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "धब्बे दिखते ही Mancozeb 75 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
    "prevention": "Seed treatment with Thiram @ 3 g/kg seed. Crop rotation with non-legumes.",
    "preventionKn": "Thiram @ 3 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಇತರ ಬೆಳೆಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "preventionHi": "Thiram @ 3 g/kg से बीजोपचार करें। गैर-दलहनी फसलों के साथ फसल चक्र अपनाएं।",
    "organicTip": "Foliar spray of 5% neem seed kernel extract (NSKE) + cow urine 5%.",
    "organicTipKn": "5% ಬೇವಿನ ಕಷಾಯ ಜೊತೆಗೆ 5% ಗೋಮೂತ್ರ ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "5% नीम के बीज का अर्क और 5% गोमूत्र मिलाकर छिड़कें।",
    "fertilizer": "Apply balanced NPK; avoid excessive sprinkler irrigation.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಅತಿಯಾಗಿ ನೀರು ಹಾಯಿಸಬೇಡಿ.",
    "fertilizerHi": "संतुलित खाद दें; अत्यधिक पानी न लगाएं।",
    "scheme": "National Food Security Mission - Pulses",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#b45309",
    "keyTakeaways": [
      "Circular to irregular spots with greyish-white center and distinct reddish-brown borders",
      "Causes extensive defoliation when infection is heavy during rainy spells",
      "Single spray of protective fungicide arrests spread effectively"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ಮಧ್ಯದಲ್ಲಿ ಬೂದು-ಬಿಳಿ ಮತ್ತು ಅಂಚಿನಲ್ಲಿ ಕಡು ಕೆಂಪು-ಕಂದು ಗೆರೆಗಳಿರುವ ಕಲೆಗಳು ಮೂಡುತ್ತವೆ",
      "ಮಳೆಗಾಲದಲ್ಲಿ ರೋಗ ತೀವ್ರವಾಗಿ ಎಲೆಗಳು ಉದುರುತ್ತವೆ",
      "ಶಿಲೀಂಧ್ರನಾಶಕದ ಒಂದು ಸರಿಯಾದ ಸಿಂಪಡಣೆಯಿಂದ ರೋಗವನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ತಡೆಯಬಹುದು"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर बीच से धूसर-सफेद और किनारों से लाल-भूरे रंग के गोल धब्बे बनते हैं",
      "बरसात में पत्तियां बहुत तेजी से झड़ जाती हैं",
      "फफूंदनाशक का एक स्प्रे इस बीमारी को तुरंत रोक देता है"
    ],
    "products": [
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Dithane M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      }
    ]
  },
  {
    "crop": "Mung Bean / Green Gram (ಹೆಸರುಕಾಳು)",
    "cropKn": "ಹೆಸರುಕಾಳು",
    "cropHi": "मूंग (हरा चना)",
    "emoji": "🌱",
    "disease": "Anthracnose & Pod Blight (Colletotrichum lindemuthianum)",
    "diseaseKn": "ಹೆಸರು ಕಾಯಿ ಕಪ್ಪು ಕೊಳೆ ರೋಗ (ಆಂಥ್ರಾಕ್ನೋಸ್)",
    "diseaseHi": "मूंग एन्थ्रेक्नोज एवं फली झुलसा",
    "severity": "Medium",
    "remedy": "Spray Carbendazim 50 WP @ 1 g/L or Mancozeb 75 WP @ 2.5 g/L or Azoxystrobin 23 SC @ 1 mL/L upon noticing sunken pod spots.",
    "remedyKn": "ಕಾಯಿಗಳ ಮೇಲೆ ಗುಳಿಬಿದ್ದ ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Mancozeb 75 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "फलियों पर धंसे हुए धब्बे दिखते ही Carbendazim 50 WP @ 1 g/L या Mancozeb 75 WP @ 2.5 g/L का छिड़काव करें।",
    "prevention": "Seed treatment with Carbendazim 50 WP @ 2 g/kg seed. Burn infected crop residues.",
    "preventionKn": "Carbendazim @ 2 g/kg ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ರೋಗಪೀಡಿತ ಗಿಡದ ಕಸವನ್ನು ಸುಟ್ಟುಹಾಕಿ.",
    "preventionHi": "Carbendazim @ 2 g/kg से बीजोपचार करें। संक्रमित फसल अवशेषों को जलाएं।",
    "organicTip": "Foliar spray of Trichoderma viride @ 5 g/L + Pseudomonas fluorescens @ 5 g/L at pod set.",
    "organicTipKn": "ಕಾಯಿ ಕಟ್ಟುವಾಗ Trichoderma viride @ 5 g/L ಮತ್ತು Pseudomonas fluorescens @ 5 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "फली बनते समय Trichoderma viride @ 5 g/L और Pseudomonas fluorescens @ 5 g/L का छिड़काव करें।",
    "fertilizer": "Apply adequate Potassium to harden pod walls.",
    "fertilizerKn": "ಕಾಯಿಯ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    "fertilizerHi": "फलियों को मजबूत करने के लिए पर्याप्त पोटाश दें।",
    "scheme": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "schemeLink": "https://rkvy.nic.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Circular dark sunken cankers with raised reddish-brown margins on green pods",
      "Seeds inside infected pods become discolored, shriveled, and infected with fungus",
      "Seed treatment completely prevents seedling infection"
    ],
    "keyTakeawaysKn": [
      "ಹಸಿರು ಕಾಯಿಗಳ ಮೇಲೆ ಕೆಂಪು-ಕಂದು ಅಂಚಿರುವ ಗುಳಿಬಿದ್ದ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಕಾಯಿಯೊಳಗಿನ ಕಾಳುಗಳು ಬಣ್ಣಗೆಟ್ಟು, ಸುಕ್ಕುಗಟ್ಟಿ ಶಿಲೀಂಧ್ರದಿಂದ ಹಾಳಾಗುತ್ತವೆ",
      "ಬೀಜೋಪಚಾರವು ಸಸಿ ಹಂತದಲ್ಲಿ ರೋಗ ಬರದಂತೆ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "हरी फलियों पर लाल-भूरे उभरे किनारों वाले गहरे धंसे हुए काले गड्ढे बनते हैं",
      "फलियों के अंदर के दाने सिकुड़कर बदरंग हो जाते हैं",
      "बीजोपचार से छोटे पौधों में यह रोग बिल्कुल नहीं फैलता"
    ],
    "products": [
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Mancozeb 75 WP",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      }
    ]
  },
  {
    "crop": "Mung Bean / Green Gram (ಹೆಸರುಕಾಳು)",
    "cropKn": "ಹೆಸರುಕಾಳು",
    "cropHi": "मूंग (हरा चना)",
    "emoji": "🌱",
    "disease": "Root Rot & Web Blight (Rhizoctonia solani)",
    "diseaseKn": "ಹೆಸರು ಬೇರು ಕೊಳೆ & ಬಲೆ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "मूंग जड़ सड़न एवं वेब ब्लाइट (जाल झुलसा)",
    "severity": "High",
    "remedy": "Seed treatment with Thiram 75 WP @ 2 g/kg + Carbendazim 50 WP @ 1 g/kg seed. Spray Validamycin 3 SL @ 2 mL/L or Hexaconazole 5 SC @ 2 mL/L upon noticing spiderweb-like fungal threads.",
    "remedyKn": "Thiram ಮತ್ತು Carbendazim ನೊಂದಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಬಲೆ ಅಂಗಮಾರಿ ಕಂಡಾಗ Validamycin 3 SL @ 2 mL/L ಅಥವಾ Hexaconazole 5 SC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "थीरम और कार्बेन्डाजिम से बीजोपचार करें। जाले जैसे धागे दिखने पर Validamycin 3 SL @ 2 mL/L या Hexaconazole 5 SC @ 2 mL/L का छिड़काव करें।",
    "prevention": "Avoid sowing in waterlogged heavy soils. Maintain proper plant spacing.",
    "preventionKn": "ನೀರು ನಿಲ್ಲುವ ಜವಗು ಭೂಮಿಯಲ್ಲಿ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ. ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ.",
    "preventionHi": "जलजमाव वाली भारी मिट्टी में बुवाई न करें। उचित दूरी रखें।",
    "organicTip": "Seed treatment with Trichoderma viride @ 10 g/kg + soil application of Trichoderma in FYM @ 2.5 kg/acre.",
    "organicTipKn": "Trichoderma viride @ 10 g/kg ನಂತೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.",
    "organicTipHi": "Trichoderma viride @ 10 g/kg से बीजोपचार करें और गोबर खाद में मिलाकर खेत में डालें।",
    "fertilizer": "Apply balanced NPK; avoid excess moisture in early stages.",
    "fertilizerKn": "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ; ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    "fertilizerHi": "संतुलित खाद दें; शुरुआती दिनों में अधिक पानी से बचें।",
    "scheme": "National Food Security Mission - Pulses",
    "schemeLink": "https://nfsm.gov.in/",
    "color": "#7f1d1d",
    "keyTakeaways": [
      "Leaves show water-soaked spots rapidly enveloped by a fine spiderweb of brown fungal threads sticking leaves together",
      "Seedling roots and hypocotyl rot at ground level causing rapid wilting",
      "Validamycin or Hexaconazole foliar spray breaks fungal web immediately"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಂತಹ ಕಲೆಗಳು ಉಂಟಾಗಿ ಜೇಡರ ಬಲೆಯಂತಹ ಶಿಲೀಂಧ್ರ ದಾರಗಳಿಂದ ಎಲೆಗಳು ಒಂದಕ್ಕೊಂದು ಅಂಟಿಕೊಳ್ಳುತ್ತವೆ",
      "ಸಸಿಗಳ ಬುಡ ಮತ್ತು ಬೇರು ಕೊಳೆತು ಗಿಡಗಳು ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಒಣಗಿ ಸಾಯುತ್ತವೆ",
      "ವ್ಯಾಲಿಡಾಮೈಸಿನ್ ಅಥವಾ ಹೆಕ್ಸಾಕೊನಾಜೋಲ್ ಸಿಂಪಡಣೆಯು ಶಿಲೀಂಧ್ರದ ಬಲೆಯನ್ನು ತಕ್ಷಣವೇ ನಾಶಮಾಡುತ್ತದೆ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर पानीदार धब्बे बनते हैं और मकड़ी के जाले जैसे भूरे धागों से पत्तियां आपस में चिपक जाती हैं",
      "पौधों की जड़ें जमीन के पास से सड़ जाती हैं और पौधा सूख जाता है",
      "वैलिडामाइसिन या हेक्साकोनाजोल का स्प्रे इस जाले को तुरंत खत्म कर देता है"
    ],
    "products": [
      {
        "name": "Validamycin 3 SL",
        "type": "chemical",
        "brand": "Sheathmar / Valida",
        "price": "₹220 – ₹340 / 500mL",
        "query": "Validamycin 3 SL"
      },
      {
        "name": "Hexaconazole 5 SC",
        "type": "chemical",
        "brand": "Contaf Plus",
        "price": "₹280 – ₹420 / 500mL",
        "query": "Hexaconazole 5 SC Contaf"
      }
    ]
  },
  {
  "crop": "Ginger (ಶುಂಠಿ)",
  "cropKn": "ಶುಂಠಿ",
  "cropHi": "अदरक",
  "emoji": "🫚",
  "disease": "Soft Rot / Rhizome Rot (Pythium aphanidermatum)",
  "diseaseKn": "ಮೃದು ಕೊಳೆ ರೋಗ / ಗಡ್ಡೆ ಕೊಳೆ (ಪಿತಿಯಮ್)",
  "diseaseHi": "प्रकंद सड़न / मृदु विगलन रोग (पायथियम)",
  "severity": "High",
  "remedy": "Drench soil with Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L or Copper Oxychloride 50 WP @ 3 g/L. Treat seed rhizomes before planting.",
  "remedyKn": "Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ಅನ್ನು ಬುಡಕ್ಕೆ ಸುರಿಯಿರಿ. ಬಿತ್ತನೆ ಬೀಜಗೆಡ್ಡೆಗಳನ್ನು ನೆಡುವ ಮೊದಲು ಸಂಸ್ಕರಿಸಿ.",
  "remedyHi": "Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L या Copper Oxychloride 50 WP @ 3 g/L का घोल बनाकर पौधों की जड़ों में डालें। बुवाई से पहले बीजों का उपचार करें।",
  "prevention": "Provide raised beds (15 cm high) for excellent drainage. Practice 3-year crop rotation with non-host crops.",
  "preventionKn": "ಉತ್ತಮ ನೀರು ಬಸಿದುಹೋಗಲು 15 cm ಎತ್ತರದ ಮಡಿಗಳನ್ನು ಮಾಡಿ. ಕನಿಷ್ಠ 3 ವರ್ಷಗಳ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
  "preventionHi": "जल निकासी के लिए 15 cm ऊंचे उठे हुए बेड बनाएं। कम से कम 3 साल का फसल चक्र अपनाएं।",
  "organicTip": "Incorporate Trichoderma harzianum enriched FYM @ 2.5 kg/bed during planting.",
  "organicTipKn": "ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ ಪ್ರತಿ ಮಡಿಗೆ 2.5 kg Trichoderma harzianum ಮಿಶ್ರಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.",
  "organicTipHi": "बुवाई के समय प्रति बेड 2.5 kg ट्राइकोडर्मा हरजिएनम मिश्रित गोबर की खाद डालें।",
  "fertilizer": "Apply 100:50:50 kg NPK/ha. Avoid waterlogging during rainy season.",
  "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 100:50:50 kg NPK ಗೊಬ್ಬರ ನೀಡಿ. ಮಳೆಗಾಲದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
  "fertilizerHi": "प्रति हेक्टेयर 100:50:50 kg NPK दें। बारिश के मौसम में खेत में जलजमाव न होने दें।",
  "scheme": "MIDH Mission for Integrated Development of Horticulture",
  "schemeLink": "https://midh.gov.in/",
  "color": "#ca8a04",
  "keyTakeaways": [
    "Causes water-soaked lesions at collar region and foul-smelling rotting rhizomes",
    "Spread rapidly by flood irrigation and infected seed rhizomes",
    "Select only healthy, certified disease-free rhizomes for planting"
  ],
  "keyTakeawaysKn": [
    "ಕಾಂಡದ ಬುಡದಲ್ಲಿ ನೀರುಗುಳ್ಳೆಯಂತಹ ಕಲೆಗಳು ಹಾಗೂ ಗಡ್ಡೆಗಳು ಕೊಳೆತು ದುರ್ವಾಸನೆ ಬೀರುತ್ತವೆ",
    "ಹರಿಯುವ ನೀರಾವರಿ ಹಾಗೂ ರೋಗಪೀಡಿತ ಬೀಜಗೆಡ್ಡೆಗಳಿಂದ ರೋಗವು ತೀವ್ರವಾಗಿ ಹರಡುತ್ತದೆ",
    "ನೆಡಲು ಆರೋಗ್ಯಕರ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗೆಡ್ಡೆಗಳನ್ನು ಮಾತ್ರ ಆಯ್ಕೆಮಾಡಿ"
  ],
  "keyTakeawaysHi": [
    "पौधे के तने के आधार पर पानी सोखे धब्बे और प्रकंद सड़कर दुर्गंध देते हैं",
    "बाढ़ सिंचाई और संक्रमित बीज प्रकंदों से यह रोग तेजी से फैलता है",
    "बुवाई हेतु केवल स्वस्थ एवं प्रमाणित रोगमुक्त प्रकंदों का चयन करें"
  ],
  "products": [
    {
      "name": "Metalaxyl + Mancozeb (Ridomil Gold)",
      "type": "chemical",
      "brand": "Syngenta",
      "price": "₹450 – ₹650 / 250g",
      "query": "Ridomil Gold fungicide"
    },
    {
      "name": "Copper Oxychloride 50 WP",
      "type": "chemical",
      "brand": "Blitox / Tata Rallis",
      "price": "₹280 – ₹380 / 500g",
      "query": "Copper Oxychloride 50 WP"
    },
    {
      "name": "Trichoderma harzianum Bio-Fungicide",
      "type": "organic",
      "brand": "Multiplex / Bio-Care",
      "price": "₹180 – ₹260 / 1kg",
      "query": "Trichoderma harzianum 1kg"
    }
  ]
},
  {
  "crop": "Ginger (ಶುಂಠಿ)",
  "cropKn": "ಶುಂಠಿ",
  "cropHi": "अदरक",
  "emoji": "🫚",
  "disease": "Bacterial Wilt (Ralstonia solanacearum)",
  "diseaseKn": "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೊರಗು ರೋಗ (ರಾಲ್ಸ್ಟೋನಿಯಾ)",
  "diseaseHi": "जीवाणु उकठा / म्लानि रोग (राल्स्टोनिया)",
  "severity": "High",
  "remedy": "Drench soil with Streptocycline @ 0.5 g/L + Copper Oxychloride @ 2 g/L. Uproot and destroy infected clumps with surrounding soil.",
  "remedyKn": "Streptocycline @ 0.5 g/L + Copper Oxychloride @ 2 g/L ದ್ರಾವಣವನ್ನು ಗಿಡದ ಬುಡಕ್ಕೆ ಸುರಿಯಿರಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಬುಡಸಮೇತ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.",
  "remedyHi": "Streptocycline @ 0.5 g/L + Copper Oxychloride @ 2 g/L का घोल बनाकर जड़ों में डालें। ग्रसित पौधों को आसपास की मिट्टी सहित उखाड़कर नष्ट करें।",
  "prevention": "Solarize nursery beds with transparent polythene for 30 days before planting.",
  "preventionKn": "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ನರ್ಸರಿ ಮಡಿಗಳನ್ನು 30 ದಿನಗಳ ಕಾಲ ಪಾಲಿಥೀನ್ ಹಾಳೆ ಹೊದಿಸಿ ಸೂರ್ಯನ ಶಾಖದಿಂದ ಸಂಸ್ಕರಿಸಿ (ಸೋಲಾರೈಜೇಶನ್).",
  "preventionHi": "बुवाई से 30 दिन पहले नर्सरी बेड को पारदर्शी पॉलीथीन से ढककर सौर उपचारित (सोलराइजेशन) करें।",
  "organicTip": "Apply Pseudomonas fluorescens @ 20 g/L as seed treatment and soil drenching.",
  "organicTipKn": "ಬೀಜ ಸಂಸ್ಕರಣೆ ಮತ್ತು ಬುಡಕ್ಕೆ ಸುರಿಯಲು ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 20 g Pseudomonas fluorescens ಬಳಸಿ.",
  "organicTipHi": "बीज उपचार और जड़ों में डालने हेतु 20 g/L स्यूडोमोनास फ्लोरेसेंस का प्रयोग करें।",
  "fertilizer": "Apply recommended potash (50 kg K2O/ha) to enhance plant disease immunity.",
  "fertilizerKn": "ಗಿಡದ ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಷ್ (50 kg K2O/ha) ರಸಗೊಬ್ಬರ ನೀಡಿ.",
  "fertilizerHi": "रोग प्रतिरोधक क्षमता बढ़ाने के लिए अनुशंसित पोटाश (50 kg K2O/ha) का प्रयोग करें।",
  "scheme": "Karnataka Horticulture Crop Loss Relief",
  "schemeLink": "https://horticulture.karnataka.gov.in/",
  "color": "#b45309",
  "keyTakeaways": [
    "Starts with golden yellowing of lower leaves progressing upward",
    "Vascular oozing visible when cut stem is placed in clear water glass",
    "Strict sanitation and quarantine of infected plots is crucial"
  ],
  "keyTakeawaysKn": [
    "ಕೆಳಗಿನ ಎಲೆಗಳು ಚಿನ್ನದ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಕ್ರಮೇಣ ಮೇಲ್ಭಾಗಕ್ಕೆ ಹರಡುತ್ತದೆ",
    "ಕಾಂಡ ಕತ್ತರಿಸಿ ಶುದ್ಧ ನೀರಿನ ಗ್ಲಾಸಿನಲ್ಲಿಟ್ಟರೆ ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಬಿಳಿ ದ್ರವ ಹೊರಬರುತ್ತದೆ",
    "ಸೋಂಕಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕಟ್ಟುನಿಟ್ಟಾದ ಸ್ವಚ್ಛತೆ ಮತ್ತು ನೈರ್ಮಲ್ಯ ಕಾಪಾಡುವುದು ಮುಖ್ಯ"
  ],
  "keyTakeawaysHi": [
    "निचली पत्तियों का सुनहरा पीला पड़ना शुरू होकर ऊपर की ओर बढ़ता है",
    "कटे हुए तने को साफ पानी के गिलास में रखने पर दूधिया जीवाणु स्राव दिखता है",
    "संक्रमित खेतों में स्वच्छता एवं स्वच्छता प्रबंधन बनाए रखना बेहद जरूरी है"
  ],
  "products": [
    {
      "name": "Streptocycline (Streptomycin Sulphate)",
      "type": "chemical",
      "brand": "Hindustan Antibiotics",
      "price": "₹65 – ₹90 / 6g",
      "query": "Streptocycline 6g"
    },
    {
      "name": "Copper Oxychloride 50 WP",
      "type": "chemical",
      "brand": "Blitox",
      "price": "₹280 – ₹380 / 500g",
      "query": "Blitox 500g"
    }
  ]
},
  {
  "crop": "Ginger (ಶುಂಠಿ)",
  "cropKn": "ಶುಂಠಿ",
  "cropHi": "अदरक",
  "emoji": "🫚",
  "disease": "Phyllosticta Leaf Spot (Phyllosticta zingiberi)",
  "diseaseKn": "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (ಫಿಲೋಸ್ಟಿಕ್ಟಾ)",
  "diseaseHi": "पत्ती धब्बा रोग (फाइलोस्टिक्टा)",
  "severity": "Medium",
  "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2 g/L at early symptom onset.",
  "remedyKn": "ರೋಗಲಕ್ಷಣಗಳು ಕಾಣಿಸಿಕೊಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Saaf @ 2 g/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "लक्षण दिखते ही Mancozeb 75 WP @ 2 g/L या Saaf @ 2 g/L का पत्तियों पर छिड़काव करें।",
  "prevention": "Collect and burn heavily spotted dried leaves after harvest to eliminate overwintering spores.",
  "preventionKn": "ಕಟಾವಿನ ನಂತರ ರೋಗಪೀಡಿತ ಒಣ ಎಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ಸುಟ್ಟುಹಾಕಿ ಶಿಲೀಂಧ್ರ ಹರಡುವುದನ್ನು ತಡೆಯಿರಿ.",
  "preventionHi": "कटाई के बाद अधिक धब्बेदार सूखी पत्तियों को इकट्ठा कर जला दें ताकि बीजाणु नष्ट हो जाएं।",
  "organicTip": "Spray 1% Bordeaux mixture or 5% Neem Seed Kernel Extract (NSKE) at 15-day intervals.",
  "organicTipKn": "15 ದಿನಗಳ ಅಂತರದಲ್ಲಿ 1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಅಥವಾ 5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯವನ್ನು (NSKE) ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "15 दिनों के अंतराल पर 1% बोर्डो मिश्रण या 5% नीम के बीज के अर्क (NSKE) का छिड़काव करें।",
  "fertilizer": "Foliar spray of 19:19:19 @ 5 g/L to aid leaf tissue recovery.",
  "fertilizerKn": "ಎಲೆಗಳ ತ್ವರಿತ ಚೇತರಿಕೆಗೆ 19:19:19 ನೀರಿನಲ್ಲಿ ಕರಗುವ ಗೊಬ್ಬರವನ್ನು 5 g/L ನಂತೆ ಸಿಂಪಡಿಸಿ.",
  "fertilizerHi": "पत्तियों की त्वरित रिकवरी के लिए 19:19:19 घुलनशील उर्वरक @ 5 g/L का छिड़काव करें।",
  "scheme": "Raita Mitra Horticulture Advisory",
  "schemeLink": "https://raitamitra.karnataka.gov.in/",
  "color": "#d97706",
  "keyTakeaways": [
    "Oval to elongated spots with white center and dark brown margin on leaves",
    "Spots coalesce causing extensive papery drying of foliage",
    "High humidity and intermittent rains favor rapid leaf spot disease spread"
  ],
  "keyTakeawaysKn": [
    "ಎಲೆಗಳ ಮೇಲೆ ಮಧ್ಯದಲ್ಲಿ ಬಿಳಿ ಮತ್ತು ಅಂಚಿನಲ್ಲಿ ಕಂದು ಬಣ್ಣದ ಅಂಡಾಕಾರದ ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
    "ಕಲೆಗಳು ಒಂದಕ್ಕೊಂದು ಸೇರಿ ಸಂಪೂರ್ಣ ಎಲೆ ಒಣಗಿ ಕಾಗದದಂತಾಗುತ್ತದೆ",
    "ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ಆಗಾಗ ಬರುವ ಮಳೆಯು ಈ ರೋಗದ ತ್ವರಿತ ಹರಡುವಿಕೆಗೆ ಕಾರಣವಾಗುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पत्तियों पर सफेद केंद्र और गहरे भूरे किनारे वाले अंडाकार धब्बे बनते हैं",
    "धब्बे आपस में मिलकर पत्तियों को कागज की तरह सूखा देते हैं",
    "अधिक आर्द्रता और रुक-रुक कर होने वाली बारिश से यह रोग तेजी से फैलता है"
  ],
  "products": [
    {
      "name": "Carbendazim + Mancozeb (Saaf)",
      "type": "chemical",
      "brand": "UPL",
      "price": "₹210 – ₹320 / 250g",
      "query": "Saaf fungicide 250g"
    },
    {
      "name": "Mancozeb 75 WP (Dithane M-45)",
      "type": "chemical",
      "brand": "Indofil",
      "price": "₹240 – ₹360 / 500g",
      "query": "Dithane M-45 500g"
    }
  ]
},
  {
  "crop": "Ginger (ಶುಂಠಿ)",
  "cropKn": "ಶುಂಠಿ",
  "cropHi": "अदरक",
  "emoji": "🫚",
  "disease": "Shoot Borer (Conogethes punctiferalis)",
  "diseaseKn": "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು (ಶೂಟ್ ಬೋರರ್)",
  "diseaseHi": "तना छेदक / प्ररोह बेधक कीट",
  "severity": "Medium",
  "remedy": "Spray Chlorantraniliprole 18.5 SC (Coragen) @ 0.3 mL/L or Quinalphos 25 EC @ 2 mL/L when boring holes are observed.",
  "remedyKn": "ಕಾಂಡದಲ್ಲಿ ರಂಧ್ರಗಳು ಕಂಡಾಗ Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಅಥವಾ Quinalphos 25 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "तने में छेद दिखने पर Chlorantraniliprole 18.5 SC (Coragen) @ 0.3 mL/L या Quinalphos 25 EC @ 2 mL/L का छिड़काव करें।",
  "prevention": "Clip and burn withered yellow central pseudostems containing larvae inside.",
  "preventionKn": "ಒಳಗೆ ಹುಳುಗಳಿರುವ ಬಾಡಿದ ಹಳದಿ ಕೇಂದ್ರ ಕಾಂಡಗಳನ್ನು ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ.",
  "preventionHi": "सूखे हुए पीले केंद्रीय तनों को जिनमें लार्वा मौजूद हों, काटकर जला दें।",
  "organicTip": "Spray Bacillus thuringiensis (Bt) @ 2 g/L or Beauveria bassiana @ 5 g/L in evening.",
  "organicTipKn": "ಸಂಜೆ ವೇಳೆಯಲ್ಲಿ Bacillus thuringiensis (Bt) @ 2 g/L ಅಥವಾ Beauveria bassiana @ 5 g/L ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "शाम के समय बेसिलस थुरिंजिएंसिस (Bt) @ 2 g/L या ब्यूवेरिया बासियाना @ 5 g/L का छिड़काव करें।",
  "fertilizer": "Avoid excessive nitrogen application which produces soft succulent stems prone to borer attack.",
  "fertilizerKn": "ಹೆಚ್ಚು ಸಾರಜನಕ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ; ಮೃದುವಾದ ಕಾಂಡಗಳು ಸುಲಭವಾಗಿ ಹುಳುಗಳ ದಾಳಿಗೆ ತುತ್ತಾಗುತ್ತವೆ.",
  "fertilizerHi": "अत्यधिक नाइट्रोजन देने से बचें, जिससे तने कोमल होकर कीटों के प्रति संवेदनशील हो जाते हैं।",
  "scheme": "Karnataka Pest Surveillance Advisory",
  "schemeLink": "https://raitamitra.karnataka.gov.in/",
  "color": "#f59e0b",
  "keyTakeaways": [
    "Larva bores into pseudostem resulting in central shoot drying ('dead heart')",
    "Frass extruded from borehole at stem base is clear diagnostic clue",
    "Most active during July to October rainy months in Malnad and Coastal Karnataka"
  ],
  "keyTakeawaysKn": [
    "ಹುಳು ಕಾಂಡದೊಳಗೆ ಕೊರೆದು ಕೇಂದ್ರ ಚಿಗುರು ಒಣಗುವಂತೆ ಮಾಡುತ್ತದೆ ('ಡೆಡ್ ಹಾರ್ಟ್')",
    "ಕಾಂಡದ ರಂಧ್ರದಿಂದ ಮರದ ಪುಡಿಯಂತಹ ತ್ಯಾಜ್ಯ ಹೊರಬರುವುದು ಪ್ರಮುಖ ಲಕ್ಷಣವಾಗಿದೆ",
    "ಮಲೆನಾಡು ಮತ್ತು ಕರಾವಳಿ ಕರ್ನಾಟಕದಲ್ಲಿ ಜುಲೈಯಿಂದ ಅಕ್ಟೋಬರ್‌ವರೆಗೆ ಹೆಚ್ಚು ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "लार्वा तने में छेद करके अंदर घुस जाता है जिससे केंद्रीय प्ररोह सूख जाता है ('डेड हार्ट')",
    "तने के छेद से बुरादे जैसा मल निकलना इसका स्पष्ट लक्षण है",
    "कर्नाटक के मलनाड और तटीय इलाकों में जुलाई से अक्टूबर के दौरान यह कीट सर्वाधिक सक्रिय रहता है"
  ],
  "products": [
    {
      "name": "Chlorantraniliprole 18.5 SC (Coragen)",
      "type": "chemical",
      "brand": "FMC",
      "price": "₹180 – ₹240 / 10mL",
      "query": "Coragen insecticide"
    },
    {
      "name": "Beauveria bassiana Bio-Pesticide",
      "type": "organic",
      "brand": "Multiplex Baba",
      "price": "₹190 – ₹280 / 1kg",
      "query": "Beauveria bassiana 1kg"
    }
  ]
},
  {
  "crop": "Ginger (ಶುಂಠಿ)",
  "cropKn": "ಶುಂಠಿ",
  "cropHi": "अदरक",
  "emoji": "🫚",
  "disease": "Dry Rot / Fusarium Yellows (Fusarium oxysporum f. sp. zingiberi)",
  "diseaseKn": "ಒಣ ಕೊಳೆ ರೋಗ (ಫ್ಯುಸಾರಿಯಮ್)",
  "diseaseHi": "सूखा सड़न रोग (फ्यूजेरियम)",
  "severity": "High",
  "remedy": "Drench infected beds with Carbendazim 50 WP @ 2 g/L or Propiconazole 25 EC @ 1 mL/L.",
  "remedyKn": "ರೋಗಪೀಡಿತ ಮಡಿಗಳಿಗೆ Carbendazim 50 WP @ 2 g/L ಅಥವಾ Propiconazole 25 EC @ 1 mL/L ಸುರಿಯಿರಿ.",
  "remedyHi": "संक्रमित क्यारियों में Carbendazim 50 WP @ 2 g/L या Propiconazole 25 EC @ 1 mL/L का घोल डालें।",
  "prevention": "Treat seed rhizomes with Carbendazim 50 WP (2 g/L) for 30 minutes and dry in shade before planting.",
  "preventionKn": "ನೆಡುವ ಮೊದಲು ಬೀಜಗೆಡ್ಡೆಗಳನ್ನು Carbendazim 50 WP (2 g/L) ದ್ರಾವಣದಲ್ಲಿ 30 ನಿಮಿಷ ನೆನೆಸಿ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ.",
  "preventionHi": "बुवाई से पूर्व बीज प्रकंदों को Carbendazim 50 WP (2 g/L) के घोल में 30 मिनट भिगोकर छाया में सुखाएं।",
  "organicTip": "Soil application of Neem cake @ 2 tonnes/ha combined with Trichoderma viride.",
  "organicTipKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 2 ಟನ್ ಬೇವಿನ ಹಿಂಡಿಯೊಂದಿಗೆ Trichoderma viride ಮಿಶ್ರಣ ಮಾಡಿ ಮಣ್ಣಿಗೆ ಹಾಕಿ.",
  "organicTipHi": "प्रति हेक्टेयर 2 टन नीम की खली के साथ ट्राइकोडर्मा विरिडी मिलाकर मिट्टी में प्रयोग करें।",
  "fertilizer": "Ensure adequate calcium and magnesium through dolomite application @ 500 kg/ha in acidic soils.",
  "fertilizerKn": "ಆಮ್ಲೀಯ ಮಣ್ಣಿನಲ್ಲಿ ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 500 kg ಡಾಲೋಮೈಟ್ ಸುಣ್ಣ ಬಳಸಿ ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ಮೆಗ್ನೀಸಿಯಮ್ ಕೊರತೆ ನೀಗಿಸಿ.",
  "fertilizerHi": "अम्लीय मिट्टी में 500 kg/ha डोलोमाइट का प्रयोग कर कैल्शियम व मैग्नीशियम की पर्याप्तता सुनिश्चित करें।",
  "scheme": "PMFBY Crop Insurance for Spices",
  "schemeLink": "https://pmfby.gov.in/",
  "color": "#b45309",
  "keyTakeaways": [
    "Stunted growth with yellowing from tip of lower leaves backwards",
    "Rhizomes show brown internal vascular ring discoloration and dry rot",
    "Nematode infestation severely aggravates Fusarium dry rot incidence"
  ],
  "keyTakeawaysKn": [
    "ಗಿಡದ ಬೆಳವಣಿಗೆ ಕುಂಠಿತವಾಗಿ ಕೆಳ ಎಲೆಗಳ ತುದಿಯಿಂದ ಹಿಂದಕ್ಕೆ ಹಳದಿಯಾಗುತ್ತಾ ಬರುತ್ತದೆ",
    "ಗೆಡ್ಡೆಯ ಒಳಭಾಗದಲ್ಲಿ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು ಮತ್ತು ಒಣ ಕೊಳೆ ಉಂಟಾಗುತ್ತದೆ",
    "ಜಂತುಹುಳುಗಳ ಬಾಧೆಯು ಫ್ಯುಸಾರಿಯಮ್ ಒಣ ಕೊಳೆ ರೋಗವನ್ನು ಮತ್ತಷ್ಟು ತೀವ್ರಗೊಳಿಸುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पौधे का विकास रुक जाता है और निचली पत्तियों की नोक से पीछे की ओर पीलापन बढ़ता है",
    "प्रकंदों के अंदर भूरे रंग का संवहनी छल्ला और सूखा विगलन दिखाई देता है",
    "सूत्रकृमि (नेमाटोड) का प्रकोप इस सूखे सड़न रोग को और अधिक गंभीर बना देता है"
  ],
  "products": [
    {
      "name": "Carbendazim 50 WP (Bavistin)",
      "type": "chemical",
      "brand": "Crystal / Rallis",
      "price": "₹190 – ₹290 / 250g",
      "query": "Bavistin 50 WP"
    },
    {
      "name": "Propiconazole 25 EC (Tilt)",
      "type": "chemical",
      "brand": "Syngenta",
      "price": "₹380 – ₹520 / 250mL",
      "query": "Tilt fungicide"
    }
  ]
},
  {
  "crop": "Turmeric (ಅರಿಶಿನ)",
  "cropKn": "ಅರಿಶಿನ",
  "cropHi": "हल्दी",
  "emoji": "🌿",
  "disease": "Rhizome Rot (Pythium aphanidermatum)",
  "diseaseKn": "ಗೆಡ್ಡೆ ಕೊಳೆ ರೋಗ (ಪಿತಿಯಮ್)",
  "diseaseHi": "प्रकंद विगलन / गांठ सड़न (पायथियम)",
  "severity": "High",
  "remedy": "Drench soil with Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g/L or Copper Oxychloride @ 3 g/L at 15-day intervals.",
  "remedyKn": "Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g/L ಅಥವಾ Copper Oxychloride @ 3 g/L ದ್ರಾವಣವನ್ನು 15 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಗಿಡದ ಬುಡಕ್ಕೆ ಸುರಿಯಿರಿ.",
  "remedyHi": "Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g/L या Copper Oxychloride @ 3 g/L का 15 दिनों के अंतराल पर जड़ों में छिड़काव व ड्रेंचिंग करें।",
  "prevention": "Plant on broad raised beds. Ensure drainage channels are clear before monsoon arrival.",
  "preventionKn": "ಅಗಲವಾದ ಎತ್ತರದ ಮಡಿಗಳಲ್ಲಿ ನೆಡಿ. ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ನೀರು ಹರಿದುಹೋಗುವ ಚರಂಡಿಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
  "preventionHi": "चौड़े उठे हुए बेड पर बुवाई करें। मानसून आने से पहले जलनिकासी की नालियां साफ रखें।",
  "organicTip": "Apply Trichoderma harzianum @ 5 kg/ha mixed with 250 kg well-rotted FYM at planting.",
  "organicTipKn": "ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ 5 kg Trichoderma harzianum ಅನ್ನು 250 kg ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಹಾಕಿ.",
  "organicTipHi": "बुवाई के समय 5 kg ट्राइकोडर्मा को 250 kg अच्छी तरह सड़ी गोबर की खाद में मिलाकर खेत में डालें।",
  "fertilizer": "Apply balanced NPK 150:60:150 kg/ha in 3 equal split doses at 30, 60, and 90 days after planting.",
  "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 150:60:150 kg NPK ಗೊಬ್ಬರವನ್ನು ನಾಟಿ ಮಾಡಿದ 30, 60 ಮತ್ತು 90 ದಿನಗಳಲ್ಲಿ 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
  "fertilizerHi": "प्रति हेक्टेयर 150:60:150 kg NPK बुवाई के 30, 60 और 90 दिनों बाद तीन बराबर भागों में दें।",
  "scheme": "Spices Board Production Subsidy Scheme",
  "schemeLink": "http://www.indianspices.com/",
  "color": "#ca8a04",
  "keyTakeaways": [
    "Lower leaves yellow progressively upward; collar zone turns soft and watery",
    "Pseudostems can be pulled out easily from decaying, putrid rhizome base",
    "Stagnant water and poor drainage are prime triggers of catastrophic outbreaks"
  ],
  "keyTakeawaysKn": [
    "ಕೆಳಗಿನ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಮೇಲಕ್ಕೆ ಹರಡುತ್ತವೆ; ಬುಡದ ಭಾಗವು ಮೃದುವಾಗಿ ಕೊಳೆಯುತ್ತದೆ",
    "ಕೊಳೆತ ಗಡ್ಡೆಯಿಂದ ಕಾಂಡವನ್ನು ಸುಲಭವಾಗಿ ಮೇಲಕ್ಕೆ ಎಳೆಯಬಹುದು",
    "ನಿಂತ ನೀರು ಮತ್ತು ಕಳಪೆ ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆಯು ರೋಗ ತೀವ್ರಗೊಳ್ಳಲು ಪ್ರಮುಖ ಕಾರಣವಾಗಿದೆ"
  ],
  "keyTakeawaysHi": [
    "निचली पत्तियां पीली पड़कर ऊपर बढ़ती हैं; तने का निचला हिस्सा कोमल व बदबूदार हो जाता है",
    "सड़े हुए प्रकंद से तना आसानी से हाथ से खींचकर बाहर निकल आता है",
    "खेत में पानी का रुकना और खराब जलनिकासी इस बीमारी के मुख्य कारण हैं"
  ],
  "products": [
    {
      "name": "Metalaxyl 8% + Mancozeb 64% WP",
      "type": "chemical",
      "brand": "Ridomil Gold / Krilaxyl",
      "price": "₹450 – ₹620 / 250g",
      "query": "Ridomil Gold 250g"
    },
    {
      "name": "Copper Oxychloride 50 WP",
      "type": "chemical",
      "brand": "Blitox",
      "price": "₹280 – ₹380 / 500g",
      "query": "Blitox 500g"
    },
    {
      "name": "Trichoderma harzianum",
      "type": "organic",
      "brand": "Multiplex",
      "price": "₹180 – ₹250 / 1kg",
      "query": "Trichoderma harzianum"
    }
  ]
},
  {
  "crop": "Turmeric (ಅರಿಶಿನ)",
  "cropKn": "ಅರಿಶಿನ",
  "cropHi": "हल्दी",
  "emoji": "🌿",
  "disease": "Colletotrichum Leaf Spot (Colletotrichum capsici)",
  "diseaseKn": "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (ಕೊಲೆಟೊಟ್ರಿಕಮ್)",
  "diseaseHi": "पत्ती धब्बा रोग (कोलेटोट्राइकम)",
  "severity": "Medium",
  "remedy": "Spray Mancozeb 75 WP @ 2.5 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 mL/L.",
  "remedyKn": "Mancozeb 75 WP @ 2.5 g/L ಅಥವಾ Amistar Top @ 1 mL/L ದ್ರಾವಣವನ್ನು ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "Mancozeb 75 WP @ 2.5 g/L या Amistar Top @ 1 mL/L का पत्तियों पर छिड़काव करें।",
  "prevention": "Burn severely infected dried leaves after rhizome harvest to break disease cycle.",
  "preventionKn": "ಕಟಾವಿನ ನಂತರ ರೋಗಪೀಡಿತ ಒಣ ಎಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ಸುಟ್ಟುಹಾಕಿ ರೋಗದ ಚಕ್ರವನ್ನು ಮುರಿಯಿರಿ.",
  "preventionHi": "कटाई के बाद गंभीर रूप से संक्रमित सूखी पत्तियों को जलाकर बीमारी का चक्र तोड़ें।",
  "organicTip": "Spray 1% Bordeaux mixture or 5% Cow urine extract early morning.",
  "organicTipKn": "ಬೆಳಗಿನ ಜಾವ 1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಅಥವಾ 5% ಗೋಮೂತ್ರದ ಕಷಾಯವನ್ನು ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "सुबह के समय 1% बोर्डो मिश्रण या 5% गोमूत्र अर्क का छिड़काव करें।",
  "fertilizer": "Apply micronutrient spray containing Zinc and Boron (Multiplex Turmeric Special @ 2.5 g/L).",
  "fertilizerKn": "ಜಿಂಕ್ ಮತ್ತು ಬೋರಾನ್ ಹೊಂದಿರುವ ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳ ಗೊಬ್ಬರವನ್ನು (2.5 g/L) ಸಿಂಪಡಿಸಿ.",
  "fertilizerHi": "जिंक और बोरॉन युक्त सूक्ष्म पोषक तत्व (हल्दी स्पेशल @ 2.5 g/L) का छिड़काव करें।",
  "scheme": "MIDH Turmeric Mission Subsidy",
  "schemeLink": "https://midh.gov.in/",
  "color": "#d97706",
  "keyTakeaways": [
    "Elliptical brown spots with concentric rings and yellow chlorotic halos on leaves",
    "Spots merge to cause extensive drying and burning of foliage during August-November",
    "Significantly reduces rhizome size, weight, and curcumin content if uncontrolled"
  ],
  "keyTakeawaysKn": [
    "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು ಮತ್ತು ಸುತ್ತಲೂ ಹಳದಿ ವರ್ತುಲಗಳು ಉಂಟಾಗುತ್ತವೆ",
    "ಆಗಸ್ಟ್-ನವೆಂಬರ್ ಅವಧಿಯಲ್ಲಿ ಕಲೆಗಳು ಸೇರಿಕೊಂಡು ಎಲೆಗಳು ಸುಟ್ಟು ಒಣಗಿದಂತಾಗುತ್ತವೆ",
    "ನಿಯಂತ್ರಿಸದಿದ್ದರೆ ಗಡ್ಡೆಯ ಗಾತ್ರ, ತೂಕ ಮತ್ತು ಕುರ್ಕುಮಿನ್ ಅಂಶವನ್ನು ಗಣನೀಯವಾಗಿ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पत्तियों पर गोल छल्लेदार भूरे धब्बे और चारों ओर पीले घेरे दिखाई देते हैं",
    "अगस्त से नवंबर के दौरान धब्बे मिलकर पूरी पत्तियों को झुलसा देते हैं",
    "नियंत्रण न करने पर प्रकंद के आकार, वजन और करक्यूमिन की मात्रा में भारी कमी आती है"
  ],
  "products": [
    {
      "name": "Amistar Top (Azoxystrobin + Difenoconazole)",
      "type": "chemical",
      "brand": "Syngenta",
      "price": "₹650 – ₹850 / 100mL",
      "query": "Amistar Top fungicide"
    },
    {
      "name": "Mancozeb 75 WP (Dithane M-45)",
      "type": "chemical",
      "brand": "Indofil",
      "price": "₹240 – ₹360 / 500g",
      "query": "Dithane M-45"
    }
  ]
},
  {
  "crop": "Turmeric (ಅರಿಶಿನ)",
  "cropKn": "ಅರಿಶಿನ",
  "cropHi": "हल्दी",
  "emoji": "🌿",
  "disease": "Leaf Blotch (Taphrina maculans)",
  "diseaseKn": "ಎಲೆ ಸುಟ್ಟ ರೋಗ / ಬ್ಲಾಚ್ (ಟ್ಯಾಫ್ರಿನಾ)",
  "diseaseHi": "पत्ती झुलसा / ब्लॉट रोग (टैफरीना)",
  "severity": "Medium",
  "remedy": "Spray Copper Oxychloride 50 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L at first appearance of spots.",
  "remedyKn": "ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Copper Oxychloride 50 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "धब्बे दिखते ही Copper Oxychloride 50 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
  "prevention": "Avoid sprinkler irrigation that keeps leaves wet for prolonged hours. Maintain optimum spacing (30x15 cm).",
  "preventionKn": "ಎಲೆಗಳನ್ನು ದೀರ್ಘಕಾಲ ತೇವವಾಗಿಡುವ ಸ್ಪ್ರಿಂಕ್ಲರ್ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ. ಸೂಕ್ತ ಅಂತರವನ್ನು (30x15 cm) ಕಾಪಾಡಿಕೊಳ್ಳಿ.",
  "preventionHi": "फव्वारा सिंचाई से बचें जिससे पत्तियां लंबे समय तक गीली रहती हैं। उचित दूरी (30x15 cm) बनाए रखें।",
  "organicTip": "Spray NSKE 5% (Neem Seed Kernel Extract) with bio-fungicide Pseudomonas fluorescens @ 5 g/L.",
  "organicTipKn": "5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯದೊಂದಿಗೆ Pseudomonas fluorescens @ 5 g/L ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "5% नीम के बीज के अर्क के साथ स्यूडोमोनास फ्लोरेसेंस @ 5 g/L मिलाकर छिड़काव करें।",
  "fertilizer": "Apply Potassium Sulphate (0:0:50) foliar spray @ 5 g/L at 90 and 120 days.",
  "fertilizerKn": "ನಾಟಿ ಮಾಡಿದ 90 ಮತ್ತು 120 ದಿನಗಳಲ್ಲಿ Potassium Sulphate (0:0:50) @ 5 g/L ಸಿಂಪಡಿಸಿ.",
  "fertilizerHi": "90 और 120 दिनों में पोटेशियम सल्फेट (0:0:50) घुलनशील उर्वरक @ 5 g/L का छिड़काव करें।",
  "scheme": "Karnataka Horticulture Department Scheme",
  "schemeLink": "https://horticulture.karnataka.gov.in/",
  "color": "#f59e0b",
  "keyTakeaways": [
    "Characterized by numerous small, bright yellow spots that turn reddish-brown",
    "Appears on both upper and lower leaf surfaces in dense clusters",
    "Frequent rain showers and cool humid days trigger rapid blotch epidemics"
  ],
  "keyTakeawaysKn": [
    "ಎಲೆಗಳ ಮೇಲೆ ಕೆಂಪು-ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವ ಅಸಂಖ್ಯಾತ ಸಣ್ಣ ಪ್ರಕಾಶಮಾನವಾದ ಹಳದಿ ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
    "ಎಲೆಯ ಮೇಲ್ಭಾಗ ಮತ್ತು ಕೆಳಭಾಗ ಎರಡರಲ್ಲೂ ದಟ್ಟವಾದ ಗುಂಪುಗಳಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ",
    "ನಿರಂತರ ಮಳೆ ಮತ್ತು ತಂಪಾದ ತೇವಾಂಶವುಳ್ಳ ವಾತಾವರಣವು ರೋಗವನ್ನು ಉಲ್ಬಣಗೊಳಿಸುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पत्तियों पर अनगिनत छोटे चमकदार पीले धब्बे बनते हैं जो बाद में लाल-भूरे हो जाते हैं",
    "पत्तियों की दोनों सतहों पर घने समूहों में धब्बे दिखाई देते हैं",
    "बार-बार बारिश और नम-ठंडा मौसम इस रोग के तेजी से फैलने का मुख्य कारण है"
  ],
  "products": [
    {
      "name": "Copper Oxychloride 50 WP",
      "type": "chemical",
      "brand": "Blitox",
      "price": "₹280 – ₹380 / 500g",
      "query": "Copper Oxychloride 50 WP"
    },
    {
      "name": "Carbendazim 50 WP (Bavistin)",
      "type": "chemical",
      "brand": "Crystal",
      "price": "₹190 – ₹290 / 250g",
      "query": "Bavistin 250g"
    }
  ]
},
  {
  "crop": "Turmeric (ಅರಿಶಿನ)",
  "cropKn": "ಅರಿಶಿನ",
  "cropHi": "हल्दी",
  "emoji": "🌿",
  "disease": "Shoot Borer (Conogethes punctiferalis)",
  "diseaseKn": "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು (ಶೂಟ್ ಬೋರರ್)",
  "diseaseHi": "तना छेदक कीट (प्ररोह बेधक)",
  "severity": "Medium",
  "remedy": "Spray Flubendiamide 39.35% SC (Fame) @ 0.2 mL/L or Chlorantraniliprole 18.5 SC @ 0.3 mL/L at early borehole detection.",
  "remedyKn": "ರಂಧ್ರಗಳು ಕಂಡ ತಕ್ಷಣ Flubendiamide 39.35% SC (Fame) @ 0.2 mL/L ಅಥವಾ Chlorantraniliprole 18.5 SC @ 0.3 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "छेद दिखते ही Flubendiamide 39.35% SC (Fame) @ 0.2 mL/L या Coragen @ 0.3 mL/L का छिड़काव करें।",
  "prevention": "Prune and destroy yellow withered central pseudostems from fields every week.",
  "preventionKn": "ಪ್ರತಿ ವಾರ ಒಳಗೆ ಹುಳುಗಳಿರುವ ಬಾಡಿದ ಹಳದಿ ಕೇಂದ್ರ ಕಾಂಡಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ.",
  "preventionHi": "हर हफ्ते सूखे हुए पीले केंद्रीय तनों को काटकर खेत से बाहर नष्ट करें।",
  "organicTip": "Spray Neem Oil 10000 PPM @ 3 mL/L or Bacillus thuringiensis (Bt) @ 2 g/L.",
  "organicTipKn": "ಬೇವಿನ ಎಣ್ಣೆ 10000 PPM @ 3 mL/L ಅಥವಾ Bacillus thuringiensis @ 2 g/L ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "नीम का तेल 10000 PPM @ 3 mL/L या बेसिलस थुरिंजिएंसिस @ 2 g/L का छिड़काव करें।",
  "fertilizer": "Split nitrogen applications into 3 doses to avoid lush green succulent vegetative growth.",
  "fertilizerKn": "ಹೆಚ್ಚು ಮೃದುವಾದ ಕಾಂಡದ ಬೆಳವಣಿಗೆಯನ್ನು ತಪ್ಪಿಸಲು ಸಾರಜನಕವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
  "fertilizerHi": "अत्यधिक कोमल वानस्पतिक वृद्धि से बचने के लिए नाइट्रोजन को 3 भागों में दें।",
  "scheme": "Raitha Samparka Kendra Pest Advisory",
  "schemeLink": "https://raitamitra.karnataka.gov.in/",
  "color": "#eab308",
  "keyTakeaways": [
    "Caterpillar bores inside central shoot causing dry dead hearts and yellowing",
    "Small holes on pseudostem with chewed frass hanging out",
    "Most prevalent during monsoon months from July to October"
  ],
  "keyTakeawaysKn": [
    "ಹುಳು ಕೇಂದ್ರ ಕಾಂಡವನ್ನು ಕೊರೆದು ತಿನ್ನುವುದರಿಂದ ಗಿಡ ಒಣಗುತ್ತದೆ ('ಡೆಡ್ ಹಾರ್ಟ್')",
    "ಕಾಂಡದ ರಂಧ್ರದ ಸುತ್ತ ಮರದ ಪುಡಿಯಂತಹ ತ್ಯಾಜ್ಯ ಕಂಡುಬರುತ್ತದೆ",
    "ಜುಲೈಯಿಂದ ಅಕ್ಟೋಬರ್ ವರೆಗಿನ ಮಳೆಗಾಲದ ತಿಂಗಳುಗಳಲ್ಲಿ ಹೆಚ್ಚು ಬಾಧಿಸುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "इल्ली केंद्रीय तने में घुसकर खाती है जिससे बीच का प्ररोह सूख जाता है",
    "तने पर बने छेद से चबाया हुआ अपशिष्ट बाहर लटका दिखाई देता है",
    "जुलाई से अक्टूबर तक मानसून के महीनों में इसका प्रकोप सबसे अधिक होता है"
  ],
  "products": [
    {
      "name": "Fame (Flubendiamide 39.35% SC)",
      "type": "chemical",
      "brand": "Bayer",
      "price": "₹280 – ₹390 / 10mL",
      "query": "Bayer Fame insecticide"
    },
    {
      "name": "Neem Oil 10000 PPM",
      "type": "organic",
      "brand": "EcoNeem",
      "price": "₹250 – ₹380 / 1L",
      "query": "Neem oil agriculture 10000 ppm"
    }
  ]
},
  {
  "crop": "Turmeric (ಅರಿಶಿನ)",
  "cropKn": "ಅರಿಶಿನ",
  "cropHi": "हल्दी",
  "emoji": "🌿",
  "disease": "Root Knot Nematode (Meloidogyne incognita)",
  "diseaseKn": "ಬೇರು ಗಂಟು ಜಂತುಹುಳು ರೋಗ",
  "diseaseHi": "जड़ गांठ सूत्रकृमि रोग (नेमाटोड)",
  "severity": "High",
  "remedy": "Apply Fluopyram 34.48% SC (Velum Prime) @ 1.5 mL/L through drip irrigation or Cartap Hydrochloride 4G @ 25 kg/ha.",
  "remedyKn": "ಹನಿ ನೀರಾವರಿ ಮೂಲಕ Fluopyram 34.48% SC (Velum Prime) @ 1.5 mL/L ಅಥವಾ Cartap Hydrochloride 4G @ 25 kg/ha ಮಣ್ಣಿಗೆ ಹಾಕಿ.",
  "remedyHi": "ड्रिप द्वारा Fluopyram 34.48% SC (Velum Prime) @ 1.5 mL/L या Cartap Hydrochloride 4G @ 25 kg/ha मिट्टी में डालें।",
  "prevention": "Intercrop with African Marigold (Tagetes erecta) to suppress soil nematode populations naturally.",
  "preventionKn": "ಮಣ್ಣಿನಲ್ಲಿ ಜಂತುಹುಳುಗಳ ಸಂತತಿಯನ್ನು ಸ್ವಾಭಾವಿಕವಾಗಿ ನಿಯಂತ್ರಿಸಲು ಚೆಂಡು ಹೂವನ್ನು (ಮ್ಯಾರಿಗೋಲ್ಡ್) ಮಿಶ್ರಬೆಳೆಯಾಗಿ ಬೆಳೆಯಿರಿ.",
  "preventionHi": "नेमाटोड की संख्या कम करने के लिए अफ्रीकन गेंदा (मैरीगोल्ड) को अंतःफसल के रूप में लगाएं।",
  "organicTip": "Apply Paecilomyces lilacinus bio-nematicide @ 5 kg/ha enriched with Neem Cake @ 500 kg/ha.",
  "organicTipKn": "500 kg ಬೇವಿನ ಹಿಂಡಿಯೊಂದಿಗೆ 5 kg Paecilomyces lilacinus ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಹಾಕಿ.",
  "organicTipHi": "500 kg नीम की खली के साथ 5 kg पेसिलोमाइसीस लिलासिनस मिलाकर खेत में प्रयोग करें।",
  "fertilizer": "Incorporate well-decomposed farmyard manure (25 t/ha) to improve soil beneficial microbial diversity.",
  "fertilizerKn": "ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಮತ್ತು ಸೂಕ್ಷ್ಮಾಣು ಜೀವಿಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಹೆಕ್ಟೇರ್‌ಗೆ 25 ಟನ್ ಚೆನ್ನಾಗಿ ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಬಳಸಿ.",
  "fertilizerHi": "मिट्टी के मित्र जीवाणुओं की वृद्धि के लिए 25 टन/हेक्टेयर सड़ी हुई गोबर की खाद मिलाएं।",
  "scheme": "PMFBY Horticultural Risk Coverage",
  "schemeLink": "https://pmfby.gov.in/",
  "color": "#b45309",
  "keyTakeaways": [
    "Stunted chlorotic plants appearing in irregular patches throughout field",
    "Roots and rhizomes develop heavy galling, bead-like swellings and necrotic lesions",
    "Creates infection courts that severely accelerate secondary bacterial and fungal rhizome rots"
  ],
  "keyTakeawaysKn": [
    "ಹೊಲದಲ್ಲಿ ಅಲ್ಲಲ್ಲಿ ಸಣ್ಣ ಪುಟ್ಟ ಪ್ಯಾಚ್‌ಗಳಲ್ಲಿ ಗಿಡಗಳು ಹಳದಿಯಾಗಿ ಬೆಳವಣಿಗೆ ಕುಂಠಿತಗೊಳ್ಳುತ್ತವೆ",
    "ಬೇರುಗಳು ಮತ್ತು ಗಡ್ಡೆಗಳಲ್ಲಿ ಗಂಟುಗಳು, ಊತಗಳು ಮತ್ತು ಕಂದು ರೋಗದ ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
    "ಇದು ಗಡ್ಡೆ ಕೊಳೆ ರೋಗದ ಶಿಲೀಂಧ್ರಗಳು ಸುಲಭವಾಗಿ ಗಿಡವನ್ನು ಆಕ್ರಮಿಸಲು ದಾರಿ ಮಾಡಿಕೊಡುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "खेत में जगह-जगह अनियमित पैचों में पौधों की वृद्धि रुक जाती है और पत्तियां पीली पड़ती हैं",
    "जड़ों और प्रकंदों पर गांठें, दानों जैसी सूजन और भूरे घाव बन जाते हैं",
    "यह घाव बनाकर प्रकंद सड़न पैदा करने वाले फफूंद व जीवाणुओं का संक्रमण कई गुना बढ़ा देता है"
  ],
  "products": [
    {
      "name": "Velum Prime (Fluopyram 34.48% SC)",
      "type": "chemical",
      "brand": "Bayer",
      "price": "₹1,450 – ₹1,850 / 250mL",
      "query": "Velum Prime Bayer"
    },
    {
      "name": "Paecilomyces lilacinus Bio-Nematicide",
      "type": "organic",
      "brand": "Multiplex Bio-Nematode",
      "price": "₹220 – ₹320 / 1kg",
      "query": "Paecilomyces lilacinus 1kg"
    }
  ]
},
  {
  "crop": "Cardamom (ಏಲಕ್ಕಿ)",
  "cropKn": "ಏಲಕ್ಕಿ",
  "cropHi": "इलायची",
  "emoji": "🌱",
  "disease": "Capsule Rot / Azhukal (Phytophthora meadii)",
  "diseaseKn": "ಕಾಯಿ ಕೊಳೆ ರೋಗ / ಅಳುಕಲ್ ರೋಗ",
  "diseaseHi": "अझुकल / कैप्सूल सड़न रोग (फाइटोफ्थोरा)",
  "severity": "High",
  "remedy": "Spray 1% Bordeaux mixture or Potassium Phosphite (Akomin) @ 3 mL/L on panicles, leaves, and base before monsoon.",
  "remedyKn": "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ತೆನೆಗಳು, ಎಲೆಗಳು ಮತ್ತು ಬುಡಕ್ಕೆ 1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಅಥವಾ Akomin @ 3 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "मानसून से पहले 1% बोर्डो मिश्रण या पोटेशियम फॉस्फाइट @ 3 mL/L का पत्तियों और गुच्छों पर छिड़काव करें।",
  "prevention": "Provide clean weeding around plant basin and remove decaying organic matter before heavy rains.",
  "preventionKn": "ಭಾರೀ ಮಳೆಗೆ ಮುನ್ನ ಗಿಡದ ಬುಡದ ಸುತ್ತ ಕಳೆ ಕೀಳಿಸಿ ಕೊಳೆಯುವ ಎಲೆ ಕಸಕಡ್ಡಿಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
  "preventionHi": "भारी बारिश से पहले पौधों के थालों की सफाई करें और सड़ने वाले कचरे को हटा दें।",
  "organicTip": "Apply Trichoderma harzianum @ 50 g/clump mixed with compost twice a year.",
  "organicTipKn": "ವರ್ಷಕ್ಕೆ ಎರಡು ಬಾರಿ ಪ್ರತಿ ಗಿಡದ ಬುಡಕ್ಕೆ 50 g Trichoderma harzianum ಮಿಶ್ರಿತ ಕಾಂಪೋಸ್ಟ್ ಗೊಬ್ಬರ ಹಾಕಿ.",
  "organicTipHi": "साल में दो बार प्रति पौधे 50 g ट्राइकोडर्मा कंपोस्ट खाद के साथ जड़ों में डालें।",
  "fertilizer": "Apply 75:75:150 kg NPK/ha in split doses. Extra potash enhances disease tolerance.",
  "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 75:75:150 kg NPK ಗೊಬ್ಬರ ನೀಡಿ. ಹೆಚ್ಚಿನ ಪೊಟ್ಯಾಷ್ ರೋಗ ನಿರೋಧಕತೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
  "fertilizerHi": "75:75:150 kg NPK/ha विभाजित मात्रा में दें। अतिरिक्त पोटाश रोग सहनशीलता बढ़ाता है।",
  "scheme": "Spices Board Replantation and Disease Control Subsidy",
  "schemeLink": "http://www.indianspices.com/",
  "color": "#b45309",
  "keyTakeaways": [
    "Affects capsules, panicles, leaves, and rhizomes during monsoon in Western Ghats",
    "Immature capsules turn dull brown, rot, and shed excessively (Azhukal)",
    "Continuous rain, high humidity (>95%) and poor canopy shade regulation trigger outbreaks"
  ],
  "keyTakeawaysKn": [
    "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ಮಳೆಗಾಲದಲ್ಲಿ ಕಾಯಿಗಳು, ತೆನೆಗಳು, ಎಲೆಗಳು ಮತ್ತು ಗಡ್ಡೆಗಳನ್ನು ಬಾಧಿಸುತ್ತದೆ",
    "ಎಳೆಯ ಕಾಯಿಗಳು ಮಸುಕು ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಕೊಳೆತು ಉದುರುತ್ತವೆ (ಅಳುಕಲ್)",
    "ನಿರಂತರ ಮಳೆ, ಅತಿಯಾದ ತೇವಾಂಶ ಮತ್ತು ನೆರಳಿನ ಸರಿಯಾದ ನಿರ್ವಹಣೆ ಇಲ್ಲದಿರುವುದು ರೋಗಕ್ಕೆ ಕಾರಣ"
  ],
  "keyTakeawaysHi": [
    "पश्चिमी घाट में मानसून के दौरान कैप्सूल, गुच्छे, पत्तियों और प्रकंदों को प्रभावित करता है",
    "कच्चे कैप्सूल मटमैले भूरे होकर सड़ जाते हैं और तेजी से झड़ते हैं (अझुकल)",
    "लगातार बारिश, 95% से अधिक नमी और अनियंत्रित छाया इस रोग को बढ़ाती है"
  ],
  "products": [
    {
      "name": "Bordeaux Mixture / Copper Sulphate",
      "type": "chemical",
      "brand": "Standard Agri",
      "price": "₹220 – ₹350 / 1kg",
      "query": "Copper Sulphate Bordeaux"
    },
    {
      "name": "Akomin (Potassium Phosphite)",
      "type": "chemical",
      "brand": "Biostadt",
      "price": "₹450 – ₹650 / 500mL",
      "query": "Akomin Biostadt"
    }
  ]
},
  {
  "crop": "Cardamom (ಏಲಕ್ಕಿ)",
  "cropKn": "ಏಲಕ್ಕಿ",
  "cropHi": "इलायची",
  "emoji": "🌱",
  "disease": "Katte / Mosaic Disease (Cardamom Mosaic Virus)",
  "diseaseKn": "ಕತ್ತೆ ರೋಗ / ಮೊಸಾಯಿಕ್ ರೋಗ",
  "diseaseHi": "कट्टे रोग / मोज़ेक वायरस रोग",
  "severity": "High",
  "remedy": "No chemical cure for virus. Systematically rogue and destroy infected clumps. Spray Dimethoate 30 EC @ 2 mL/L to kill aphid vectors.",
  "remedyKn": "ವೈರಸ್‌ಗೆ ಯಾವುದೇ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಪಡಿಸಿ. ರೋಗ ಹರಡುವ ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ Dimethoate 30 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "वायरस का कोई रासायनिक इलाज नहीं है। ग्रसित पौधों को उखाड़कर तुरंत नष्ट करें। माहू (एफिड) कीट के नियंत्रण हेतु Dimethoate 30 EC @ 2 mL/L का छिड़काव करें।",
  "prevention": "Use only tissue culture or certified virus-free seedlings for fresh planting.",
  "preventionKn": "ಹೊಸ ನಾಟಿಗೆ ಅಂಗಾಂಶ ಕೃಷಿ (ಟಿಶ್ಯೂ ಕಲ್ಚರ್) ಅಥವಾ ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಸಸಿಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ.",
  "preventionHi": "नए रोपण के लिए केवल टिशू कल्चर या प्रमाणित वायरस-मुक्त पौधों का उपयोग करें।",
  "organicTip": "Spray Verticillium lecanii @ 5 g/L or Fish Oil Rosin Soap (FORS) @ 20 g/L for aphid vector control.",
  "organicTipKn": "ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ Verticillium lecanii @ 5 g/L ಅಥವಾ ಮೀನೆಣ್ಣೆ ಸಾಬೂನು (FORS) @ 20 g/L ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "माहू नियंत्रण के लिए वर्टिसिलियम लेकानी @ 5 g/L या फिश ऑयल रोजिन सोप @ 20 g/L का छिड़काव करें।",
  "fertilizer": "Maintain optimum shade (50-60%) and organic mulching to support plant vigor.",
  "fertilizerKn": "ಗಿಡಗಳ ಚೈತನ್ಯ ಕಾಪಾಡಲು ಸೂಕ್ತ ನೆರಳು (50-60%) ಮತ್ತು ಸಾವಯವ ಹೊದಿಕೆಯನ್ನು ಒದಗಿಸಿ.",
  "fertilizerHi": "पौधों के स्वास्थ्य के लिए 50-60% छाया और जैविक मल्चिंग बनाए रखें।",
  "scheme": "Spices Board Katte Eradication Campaign",
  "schemeLink": "http://www.indianspices.com/",
  "color": "#dc2626",
  "keyTakeaways": [
    "Young leaves show interrupted pale green or chlorotic stripes parallel to veins",
    "Infected clumps become stunted and yield drops by over 80-90%",
    "Transmitted non-persistently by banana aphid (Pentalonia nigronervosa)"
  ],
  "keyTakeawaysKn": [
    "ಎಳೆಯ ಎಲೆಗಳ ನರಗಳಿಗೆ ಸಮಾನಾಂತರವಾಗಿ ತಿಳಿ ಹಸಿರು ಅಥವಾ ಹಳದಿ ಪಟ್ಟೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
    "ಸೋಂಕಿತ ಗಿಡಗಳು ಕುಂಠಿತಗೊಂಡು ಇಳುವರಿ ಶೇ. 80-90 ರಷ್ಟು ಕುಸಿಯುತ್ತದೆ",
    "ಬಾಳೆ ಹೇನು (Pentalonia nigronervosa) ಕೀಟದ ಮೂಲಕ ರೋಗವು ಹರಡುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "नई पत्तियों की नसों के समानांतर हल्के हरे या पीले रंग की धारियां दिखाई देती हैं",
    "संक्रमित पौधे बौने रह जाते हैं और पैदावार में 80-90% तक की भारी गिरावट आती है",
    "केले के माहू (एफिड) कीट द्वारा यह वायरस एक पौधे से दूसरे में फैलता है"
  ],
  "products": [
    {
      "name": "Rogor (Dimethoate 30 EC)",
      "type": "chemical",
      "brand": "FMC / Rallis",
      "price": "₹180 – ₹260 / 250mL",
      "query": "Rogor Dimethoate"
    },
    {
      "name": "Verticillium lecanii Bio-Pesticide",
      "type": "organic",
      "brand": "Multiplex",
      "price": "₹220 – ₹320 / 1kg",
      "query": "Verticillium lecanii"
    }
  ]
},
  {
  "crop": "Cardamom (ಏಲಕ್ಕಿ)",
  "cropKn": "ಏಲಕ್ಕಿ",
  "cropHi": "इलायची",
  "emoji": "🌱",
  "disease": "Chenthal / Leaf Blight (Colletotrichum gloeosporioides)",
  "diseaseKn": "ಚೆಂತಾಲ್ ರೋಗ / ಎಲೆ ರೋಗ",
  "diseaseHi": "चेंथल / पत्ती झुलसा रोग (कोलेटोट्राइकम)",
  "severity": "Medium",
  "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Carbendazim 50 WP @ 1 g/L at first appearance of leaf spots.",
  "remedyKn": "ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಂಡಾಗ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "पत्तियों पर धब्बे दिखते ही Mancozeb 75 WP @ 2 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
  "prevention": "Regulate shade trees in estate to prevent excessive direct sunlight on cardamom canopy.",
  "preventionKn": "ನೇರ ಬಿಸಿಲು ಎಲೆಗಳ ಮೇಲೆ ಬೀಳದಂತೆ ತೋಟದಲ್ಲಿ ನೆರಳು ನೀಡುವ ಮರಗಳ ರೆಂಬೆಗಳನ್ನು ಸೂಕ್ತವಾಗಿ ಕತ್ತರಿಸಿ ನಿರ್ವಹಿಸಿ.",
  "preventionHi": "इलायची पर सीधी धूप से बचाव के लिए बागान में छायादार पेड़ों की शाखाओं को सही ढंग से छांटें।",
  "organicTip": "Spray Pseudomonas fluorescens @ 20 g/L or 1% Bordeaux mixture.",
  "organicTipKn": "ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 20 g Pseudomonas fluorescens ಅಥವಾ 1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "20 g/L स्यूडोमोनास फ्लोरेसेंस या 1% बोर्डो मिश्रण का छिड़काव करें।",
  "fertilizer": "Apply foliar micronutrient complex (Multiplex Cardamom Special @ 2.5 g/L) to replenish damaged leaves.",
  "fertilizerKn": "ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳ ಚೇತರಿಕೆಗೆ ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳ ಗೊಬ್ಬರವನ್ನು (2.5 g/L) ಸಿಂಪಡಿಸಿ.",
  "fertilizerHi": "क्षतिग्रस्त पत्तियों की रिकवरी हेतु सूक्ष्म पोषक तत्व (इलायची स्पेशल @ 2.5 g/L) का छिड़काव करें।",
  "scheme": "Karnataka Spices Crop Development Scheme",
  "schemeLink": "https://horticulture.karnataka.gov.in/",
  "color": "#d97706",
  "keyTakeaways": [
    "Large water-soaked spots turn reddish-brown with yellow halo (Chenthal)",
    "Leaves dry up and tear prematurely, reducing photosynthetic capacity",
    "Favored by bright sunshine following monsoon showers in hill regions"
  ],
  "keyTakeawaysKn": [
    "ಎಲೆಗಳ ಮೇಲೆ ದೊಡ್ಡ ಕೆಂಪು-ಕಂದು ಬಣ್ಣದ ಕಲೆಗಳು ಮತ್ತು ಸುತ್ತಲೂ ಹಳದಿ ಬಣ್ಣ ಉಂಟಾಗುತ್ತದೆ (ಚೆಂತಾಲ್)",
    "ಎಲೆಗಳು ಒಣಗಿ ಅಕಾಲಿಕವಾಗಿ ಹರಿದುಹೋಗುತ್ತವೆ ಮತ್ತು ಗಿಡದ ಆಹಾರ ತಯಾರಿಸುವ ಶಕ್ತಿ ಕುಗ್ಗುತ್ತದೆ",
    "ಮಲೆನಾಡಿನಲ್ಲಿ ಮಳೆಯ ನಂತರ ಬರುವ ಪ್ರಖರ ಬಿಸಿಲಿನಿಂದ ಈ ರೋಗವು ಹೆಚ್ಚಾಗುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पत्तियों पर बड़े लाल-भूरे धब्बे बनते हैं जिनके चारों ओर पीला घेरा होता है (चेंथल)",
    "पत्तियां सूखकर समय से पहले फट जाती हैं, जिससे प्रकाश संश्लेषण घट जाता है",
    "पहाड़ी क्षेत्रों में बारिश के बाद तेज धूप निकलने पर यह बीमारी तेजी से पनपती है"
  ],
  "products": [
    {
      "name": "Mancozeb 75 WP (Dithane M-45)",
      "type": "chemical",
      "brand": "Indofil",
      "price": "₹240 – ₹360 / 500g",
      "query": "Dithane M-45"
    },
    {
      "name": "Carbendazim 50 WP (Bavistin)",
      "type": "chemical",
      "brand": "Crystal",
      "price": "₹190 – ₹290 / 250g",
      "query": "Bavistin"
    }
  ]
},
  {
  "crop": "Cardamom (ಏಲಕ್ಕಿ)",
  "cropKn": "ಏಲಕ್ಕಿ",
  "cropHi": "इलायची",
  "emoji": "🌱",
  "disease": "Cardamom Thrips (Sciothrips cardamomi)",
  "diseaseKn": "ಏಲಕ್ಕಿ ಥ್ರಿಪ್ಸ್ ಕೀಟ",
  "diseaseHi": "इलायची थ्रिप्स कीट",
  "severity": "High",
  "remedy": "Spray Fipronil 5 SC @ 1.5 mL/L or Spinosad 45 SC @ 0.3 mL/L targeting panicles and flower buds.",
  "remedyKn": "ತೆನೆಗಳು ಮತ್ತು ಹೂವಿನ ಮೊಗ್ಗುಗಳನ್ನು ಗುರಿಯಾಗಿಸಿ Fipronil 5 SC @ 1.5 mL/L ಅಥವಾ Spinosad 45 SC @ 0.3 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "गुच्छों और कलियों पर Fipronil 5 SC @ 1.5 mL/L या Spinosad 45 SC @ 0.3 mL/L का छिड़काव करें।",
  "prevention": "Remove dry sheaths and trash from clump base before summer to eliminate sheltering thrips.",
  "preventionKn": "ಬೇಸಿಗೆಗೆ ಮುನ್ನ ಒಣ ಎಲೆ ಕವಚಗಳು ಮತ್ತು ಕಸವನ್ನು ಗಿಡದ ಬುಡದಿಂದ ತೆಗೆದು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
  "preventionHi": "गर्मियों से पहले पौधों के आधार से सूखे पत्ते और कचरा हटाकर थ्रिप्स के छिपने की जगह नष्ट करें।",
  "organicTip": "Spray Neem Seed Kernel Extract (NSKE 5%) or Lecanicillium lecanii @ 5 g/L.",
  "organicTipKn": "5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE) ಅಥವಾ Lecanicillium lecanii @ 5 g/L ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "5% नीम के बीज का अर्क (NSKE) या लेकेनीसिलियम लेकानी @ 5 g/L का छिड़काव करें।",
  "fertilizer": "Ensure adequate irrigation during dry season to reduce plant stress and thrips vulnerability.",
  "fertilizerKn": "ಬೇಸಿಗೆಯಲ್ಲಿ ಗಿಡದ ಒತ್ತಡ ಮತ್ತು ಥ್ರಿಪ್ಸ್ ಬಾಧೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ನಿಯಮಿತ ನೀರಾವರಿ ಒದಗಿಸಿ.",
  "fertilizerHi": "गर्मियों में पर्याप्त सिंचाई करें ताकि तनाव कम हो और थ्रिप्स का प्रकोप न बढ़े।",
  "scheme": "Spices Board Quality Improvement Scheme",
  "schemeLink": "http://www.indianspices.com/",
  "color": "#f59e0b",
  "keyTakeaways": [
    "Punctures flowers and capsules causing scabby, wart-like growths on pods ('Cardamom Scab')",
    "Damaged capsules fetch 50-70% lower market price due to poor appearance",
    "Most destructive during flowering and capsule setting from February to May"
  ],
  "keyTakeawaysKn": [
    "ಹೂವು ಮತ್ತು ಕಾಯಿಗಳನ್ನು ಚುಚ್ಚಿ ಕಾಯಿಗಳ ಮೇಲೆ ಒರಟಾದ ಗಂಟುಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ ('ಸ್ಕೇಬ್')",
    "ಹಾನಿಗೊಳಗಾದ ಕಾಯಿಗಳು ಕಳಪೆ ನೋಟದಿಂದಾಗಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಶೇ. 50-70 ರಷ್ಟು ಕಡಿಮೆ ಬೆಲೆ ಪಡೆಯುತ್ತವೆ",
    "ಫೆಬ್ರವರಿಯಿಂದ ಮೇ ತಿಂಗಳವರೆಗೆ ಹೂಬಿಡುವ ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚು ಹಾನಿಕಾರಕ"
  ],
  "keyTakeawaysHi": [
    "फूलों और कैप्सूल पर खुरचकर मस्से जैसी परत बना देता है जिसे 'कार्डमम स्कैब' कहते हैं",
    "खराब रूप-रंग के कारण बाजार में इन कैप्सूल की कीमत 50-70% तक गिर जाती है",
    "फरवरी से मई तक फूल आने और फल बनने के समय यह सबसे अधिक नुकसान पहुंचाता है"
  ],
  "products": [
    {
      "name": "Fipronil 5 SC (Regent)",
      "type": "chemical",
      "brand": "Bayer",
      "price": "₹280 – ₹420 / 250mL",
      "query": "Regent Fipronil Bayer"
    },
    {
      "name": "Spinosad 45 SC (Tracer)",
      "type": "chemical",
      "brand": "Corteva",
      "price": "₹650 – ₹950 / 75mL",
      "query": "Tracer Spinosad"
    }
  ]
},
  {
  "crop": "Cardamom (ಏಲಕ್ಕಿ)",
  "cropKn": "ಏಲಕ್ಕಿ",
  "cropHi": "इलायची",
  "emoji": "🌱",
  "disease": "Rhizome Rot / Clump Rot (Pythium vexans)",
  "diseaseKn": "ಗೆಡ್ಡೆ ಕೊಳೆ ರೋಗ / ಕ್ಲಂಪ್ ರಫ್",
  "diseaseHi": "प्रकंद विगलन / क्लंप रॉट",
  "severity": "High",
  "remedy": "Drench infected clump basins with Copper Oxychloride 50 WP @ 3 g/L or Metalaxyl-M @ 2.5 g/L.",
  "remedyKn": "ರೋಗಪೀಡಿತ ಗಿಡದ ಬುಡಕ್ಕೆ Copper Oxychloride 50 WP @ 3 g/L ಅಥವಾ Metalaxyl-M @ 2.5 g/L ಸುರಿಯಿರಿ.",
  "remedyHi": "संक्रमित पौधों की थालों में Copper Oxychloride 50 WP @ 3 g/L या Metalaxyl-M @ 2.5 g/L का घोल डालें।",
  "prevention": "Improve soil drainage in valleys and depressions where water stagnation occurs.",
  "preventionKn": "ನೀರು ನಿಲ್ಲುವ ತಗ್ಗು ಪ್ರದೇಶಗಳಲ್ಲಿ ಒಳಚರಂಡಿ ಕಾಲುವೆಗಳನ್ನು ನಿರ್ಮಿಸಿ ನೀರು ಸರಾಗವಾಗಿ ಹರಿಯುವಂತೆ ಮಾಡಿ.",
  "preventionHi": "निचले और ढलान वाले क्षेत्रों में जलनिकासी की समुचित व्यवस्था करें ताकि पानी न रुके।",
  "organicTip": "Incorporate Neem cake @ 1 kg/clump mixed with Trichoderma viride.",
  "organicTipKn": "ಪ್ರತಿ ಗಿಡಕ್ಕೆ 1 kg ಬೇವಿನ ಹಿಂಡಿಯೊಂದಿಗೆ Trichoderma viride ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಹಾಕಿ.",
  "organicTipHi": "प्रति पौधा 1 kg नीम की खली के साथ ट्राइकोडर्मा विरिडी मिलाकर मिट्टी में डालें।",
  "fertilizer": "Apply lime or dolomite @ 1 kg/clump every 2-3 years to correct soil acidity in plantations.",
  "fertilizerKn": "ಮಣ್ಣಿನ ಆಮ್ಲೀಯತೆ ಸರಿಪಡಿಸಲು ಪ್ರತಿ 2-3 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಪ್ರತಿ ಗಿಡಕ್ಕೆ 1 kg ಸುಣ್ಣ ಅಥವಾ ಡಾಲೋಮೈಟ್ ಹಾಕಿ.",
  "fertilizerHi": "मिट्टी की अम्लता दूर करने के लिए हर 2-3 साल में प्रति पौधा 1 kg चूना या डोलोमाइट डालें।",
  "scheme": "PMFBY Horticultural Crop Protection",
  "schemeLink": "https://pmfby.gov.in/",
  "color": "#b45309",
  "keyTakeaways": [
    "Base of tiller turns brown, soft, and watery; shoots lodge easily at ground level",
    "Underground rhizome decays into foul-smelling pulpy mass",
    "Occurs heavily in water-saturated soils during peak monsoons"
  ],
  "keyTakeawaysKn": [
    "ಕಾಂಡದ ಬುಡ ಕಂದು, ಮೃದುವಾಗಿ ನೆಲಮಟ್ಟದಲ್ಲಿ ಸುಲಭವಾಗಿ ಮುರಿದು ಬೀಳುತ್ತದೆ",
    "ಭೂಮಿಯೊಳಗಿನ ಗಡ್ಡೆ ಕೊಳೆತು ದುರ್ವಾಸನೆ ಬೀರುವ ಮೆದು ಮುದ್ದೆಯಾಗುತ್ತದೆ",
    "ಭಾರೀ ಮಳೆಗಾಲದಲ್ಲಿ ನೀರು ನಿಲ್ಲುವ ಮಣ್ಣಿನಲ್ಲಿ ರೋಗವು ತೀವ್ರವಾಗಿ ಹರಡುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "तने का निचला हिस्सा भूरा, मुलायम होकर जमीन की सतह से आसानी से गिर जाता है",
    "जमीन के अंदर का प्रकंद सड़कर बदबूदार गूदे में बदल जाता है",
    "चरम मानसून के दौरान अत्यधिक गीली मिट्टी वाले क्षेत्रों में यह बीमारी गंभीर होती है"
  ],
  "products": [
    {
      "name": "Copper Oxychloride 50 WP",
      "type": "chemical",
      "brand": "Blitox",
      "price": "₹280 – ₹380 / 500g",
      "query": "Blitox 500g"
    },
    {
      "name": "Trichoderma viride Bio-Fungicide",
      "type": "organic",
      "brand": "Bio-Care",
      "price": "₹180 – ₹260 / 1kg",
      "query": "Trichoderma viride"
    }
  ]
},
  {
  "crop": "Papaya (ಪರಂಗಿ)",
  "cropKn": "ಪರಂಗಿ",
  "cropHi": "पपीता",
  "emoji": "🍈",
  "disease": "Papaya Ring Spot Virus (PRSV)",
  "diseaseKn": "ಪರಂಗಿ ರಿಂಗ್ ಸ್ಪಾಟ್ ವೈರಸ್ ರೋಗ (PRSV)",
  "diseaseHi": "पपीता रिंग स्पॉट वायरस रोग (PRSV)",
  "severity": "High",
  "remedy": "No chemical cure for virus. Rogue and burn infected trees immediately. Spray Imidacloprid 17.8 SL @ 0.3 mL/L to suppress aphid vectors.",
  "remedyKn": "ವೈರಸ್‌ಗೆ ರಾಸಾಯನಿಕ ಪರಿಹಾರವಿಲ್ಲ. ರೋಗಪೀಡಿತ ಮರಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ. ರೋಗ ಹರಡುವ ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ Imidacloprid 17.8 SL @ 0.3 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "वायरस का कोई रासायनिक इलाज नहीं है। संक्रमित पेड़ों को तुरंत उखाड़कर जला दें। माहू (एफिड) कीट नियंत्रण हेतु Imidacloprid 17.8 SL @ 0.3 mL/L का छिड़काव करें।",
  "prevention": "Raise nursery under 40-mesh insect-proof nylon nets. Avoid planting near cucurbitaceous vegetables.",
  "preventionKn": "40-ಮೆಶ್ ಕೀಟನಿರೋಧಕ ನೈಲಾನ್ ಬಲೆಗಳ ಅಡಿಯಲ್ಲಿ ನರ್ಸರಿ ಸಸಿಗಳನ್ನು ಬೆಳೆಸಿ. ಕುಂಬಳಕಾಯಿ ಜಾತಿಯ ಬೆಳೆಗಳ ಪಕ್ಕದಲ್ಲಿ ಪರಂಗಿ ನೆಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
  "preventionHi": "40-जाल वाली कीट-अवरोधक नायलॉन जाली के नीचे नर्सरी तैयार करें। कद्दू वर्गीय सब्जियों के पास पपीता लगाने से बचें।",
  "organicTip": "Spray 10% Raw Cow Milk or NSKE 5% at weekly intervals to reduce aphid transmission.",
  "organicTipKn": "ಹೇನುಗಳಿಂದ ರೋಗ ಹರಡುವುದನ್ನು ಕಡಿಮೆ ಮಾಡಲು ವಾರಕ್ಕೊಮ್ಮೆ 10% ಹಸಿ ಹಸುವಿನ ಹಾಲು ಅಥವಾ 5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "एफिड्स के प्रसार को रोकने के लिए साप्ताहिक अंतराल पर 10% कच्चे गाय के दूध या 5% नीम अर्क का छिड़काव करें।",
  "fertilizer": "Apply 250:250:500 g NPK per plant per year in 6 bimonthly split applications.",
  "fertilizerKn": "ಪ್ರತಿ ಗಿಡಕ್ಕೆ ವರ್ಷಕ್ಕೆ 250:250:500 g NPK ಗೊಬ್ಬರವನ್ನು 6 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
  "fertilizerHi": "प्रति पौधा प्रति वर्ष 250:250:500 g NPK उर्वरक 6 द्विमासिक भागों में दें।",
  "scheme": "MIDH Papaya Cultivation Subsidy",
  "schemeLink": "https://midh.gov.in/",
  "color": "#dc2626",
  "keyTakeaways": [
    "Leaves show vein clearing, severe mosaic mottling, and shoestring deformities",
    "Fruits develop distinctive dark green ring-spots and concentric circles",
    "Transmitted non-persistently within minutes by transient aphids"
  ],
  "keyTakeawaysKn": [
    "ಎಲೆಗಳು ನರಗಳ ಬಿಳಿಯಾಗುವಿಕೆ, ದಟ್ಟ ಮೊಸಾಯಿಕ್ ಕಲೆಗಳು ಮತ್ತು ಸಣ್ಣ ದಾರದಂತಹ ಆಕಾರಕ್ಕೆ ತಿರುಗುತ್ತವೆ",
    "ಕಾಯಿಗಳ ಮೇಲೆ ವಿಶಿಷ್ಟ ಕಡು ಹಸಿರು ಉಂಗುರದಂತಹ ಕಲೆಗಳು ಮತ್ತು ವೃತ್ತಗಳು ಉಂಟಾಗುತ್ತವೆ",
    "ಹೇನುಗಳ ಮೂಲಕ ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಒಂದು ಗಿಡದಿಂದ ಇನ್ನೊಂದು ಗಿಡಕ್ಕೆ ಹರಡುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पत्तियों की नसें साफ होकर गहरा मोज़ेक और धागे जैसी विकृति बन जाती है",
    "फलों पर स्पष्ट गहरे हरे रंग के छल्लेनुमा धब्बे और गोल घेरे दिखाई देते हैं",
    "उड़ते हुए माहू (एफिड) कीटों द्वारा यह वायरस कुछ ही मिनटों में फैल जाता है"
  ],
  "products": [
    {
      "name": "Confidor (Imidacloprid 17.8 SL)",
      "type": "chemical",
      "brand": "Bayer",
      "price": "₹250 – ₹380 / 100mL",
      "query": "Confidor Bayer"
    },
    {
      "name": "Neem Oil 10000 PPM",
      "type": "organic",
      "brand": "EcoNeem",
      "price": "₹240 – ₹360 / 1L",
      "query": "Neem oil agriculture"
    }
  ]
},
  {
  "crop": "Papaya (ಪರಂಗಿ)",
  "cropKn": "ಪರಂಗಿ",
  "cropHi": "पपीता",
  "emoji": "🍈",
  "disease": "Anthracnose (Colletotrichum gloeosporioides)",
  "diseaseKn": "ಆಂಥ್ರಾಕ್ನೋಸ್ / ಕಪ್ಪು ಚುಕ್ಕೆ ರೋಗ",
  "diseaseHi": "एन्थ्रेक्नोज / फल सड़न रोग (कोलेटोट्राइकम)",
  "severity": "Medium",
  "remedy": "Spray Azoxystrobin 23% SC @ 1 mL/L or Carbendazim 50 WP @ 1 g/L or Mancozeb 75 WP @ 2.5 g/L at 15-day intervals.",
  "remedyKn": "15 ದಿನಗಳ ಅಂತರದಲ್ಲಿ Azoxystrobin 23% SC @ 1 mL/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "15 दिनों के अंतराल पर Azoxystrobin 23% SC @ 1 mL/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
  "prevention": "Harvest fruits at color-break stage. Avoid fruit bruising and post-harvest injuries.",
  "preventionKn": "ಕಾಯಿಗಳು ಬಣ್ಣ ಬದಲಾಗುವ ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ. ಕಾಯಿಗಳಿಗೆ ಪೆಟ್ಟಾಗದಂತೆ ಎಚ್ಚರವಹಿಸಿ.",
  "preventionHi": "फलों के रंग बदलने की अवस्था में ही तुड़ाई करें। फलों को चोट और खरोंच से बचाएं।",
  "organicTip": "Dip harvested fruits in hot water (48°C) for 20 minutes to prevent post-harvest rot.",
  "organicTipKn": "ಕಟಾವಿನ ನಂತರ ಕಾಯಿ ಕೊಳೆಯುವುದನ್ನು ತಡೆಯಲು 48°C ಬಿಸಿ ನೀರಿನಲ್ಲಿ 20 ನಿಮಿಷಗಳ ಕಾಲ ಅದ್ದಿ.",
  "organicTipHi": "तुड़ाई के बाद फलों को 48°C गर्म पानी में 20 मिनट डुबोएं ताकि सड़न से बचाव हो सके।",
  "fertilizer": "Ensure adequate Boron application (Solubor @ 1 g/L foliar spray) to prevent fruit latex bleeding.",
  "fertilizerKn": "ಕಾಯಿಯಿಂದ ಹಾಲು ಸೋರುವುದನ್ನು ತಡೆಯಲು ಬೋರಾನ್ (Solubor @ 1 g/L) ಸಿಂಪಡಿಸಿ.",
  "fertilizerHi": "फलों से दूध रिसाव रोकने के लिए बोरॉन (सॉल्यूबोर @ 1 g/L) का छिड़काव करें।",
  "scheme": "Karnataka Post-Harvest Management Support",
  "schemeLink": "https://horticulture.karnataka.gov.in/",
  "color": "#d97706",
  "keyTakeaways": [
    "Starts as small circular water-soaked sunken spots on ripening fruit surface",
    "Spots enlarge with pinkish-orange fungal gelatinous spore masses in center",
    "Warm rainy weather (28-32°C) causes devastating fruit spoilage during transit"
  ],
  "keyTakeawaysKn": [
    "ಹಣ್ಣಾಗುವ ಕಾಯಿಗಳ ಮೇಲೆ ಸಣ್ಣ ವೃತ್ತಾಕಾರದ ನೀರಿನಂತಹ ತಗ್ಗಾದ ಕಲೆಗಳು ಆರಂಭವಾಗುತ್ತವೆ",
    "ಕಲೆಗಳ ಮಧ್ಯದಲ್ಲಿ ಗುಲಾಬಿ-ಕಿತ್ತಳೆ ಬಣ್ಣದ ಶಿಲೀಂಧ್ರ ಬೀಜಕಗಳ ಪದರ ಉಂಟಾಗುತ್ತದೆ",
    "ಬಿಸಿ ಮತ್ತು ಮಳೆಯ ವಾತಾವರಣದಲ್ಲಿ ಸಾಗಾಣಿಕೆ ವೇಳೆ ಹಣ್ಣುಗಳು ಕೊಳೆಯುತ್ತವೆ"
  ],
  "keyTakeawaysHi": [
    "पकते फलों की सतह पर छोटे गोल धंसे हुए पानी सोखे धब्बे बनते हैं",
    "धब्बों के केंद्र में गुलाबी-नारंगी चिपचिपे फफूंद बीजाणु दिखाई देते हैं",
    "गर्म व नम मौसम में परिवहन और भंडारण के दौरान फल तेजी से सड़ते हैं"
  ],
  "products": [
    {
      "name": "Azoxystrobin 23% SC (Amistar)",
      "type": "chemical",
      "brand": "Syngenta",
      "price": "₹550 – ₹750 / 100mL",
      "query": "Amistar fungicide"
    },
    {
      "name": "Carbendazim 50 WP",
      "type": "chemical",
      "brand": "Bavistin",
      "price": "₹190 – ₹290 / 250g",
      "query": "Bavistin 250g"
    }
  ]
},
  {
  "crop": "Papaya (ಪರಂಗಿ)",
  "cropKn": "ಪರಂಗಿ",
  "cropHi": "पपीता",
  "emoji": "🍈",
  "disease": "Foot Rot / Stem Rot (Pythium aphanidermatum)",
  "diseaseKn": "ಬುಡ ಕೊಳೆ ರೋಗ / ಕಾಂಡ ಕೊಳೆ",
  "diseaseHi": "तना विगलन / फुट रॉट रोग (पायथियम)",
  "severity": "High",
  "remedy": "Drench trunk base with Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L or Copper Oxychloride 50 WP @ 3 g/L.",
  "remedyKn": "ಮರದ ಕಾಂಡದ ಬುಡಕ್ಕೆ Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ಸುರಿಯಿರಿ.",
  "remedyHi": "तने के आधार पर Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L या Copper Oxychloride 50 WP @ 3 g/L का घोल डालें।",
  "prevention": "Never allow irrigation water to touch tree stem directly; plant on mounds or raised ridges.",
  "preventionKn": "ನೀರಾವರಿ ನೀರು ನೇರವಾಗಿ ಕಾಂಡಕ್ಕೆ ತಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ; ದಿಬ್ಬ ಅಥವಾ ಸಾಲುಗಳ ಮೇಲೆ ಸಸಿಗಳನ್ನು ನೆಡಿ.",
  "preventionHi": "सिंचाई का पानी कभी भी सीधे तने को न छूने दें; मेड़ों या उठे हुए टीलों पर पौधे लगाएं।",
  "organicTip": "Apply Trichoderma viride @ 50 g/tree mixed with Neem cake @ 500 g around root zone.",
  "organicTipKn": "ಬೇರಿನ ಭಾಗಕ್ಕೆ 50 g Trichoderma viride ಮತ್ತು 500 g ಬೇವಿನ ಹಿಂಡಿ ಮಿಶ್ರಣ ಮಾಡಿ ಹಾಕಿ.",
  "organicTipHi": "जड़ों के पास 50 g ट्राइकोडर्मा विरिडी और 500 g नीम की खली मिलाकर डालें।",
  "fertilizer": "Ensure excellent soil aeration; avoid heavy clayey soils with poor drainage.",
  "fertilizerKn": "ಮಣ್ಣಿನಲ್ಲಿ ಗಾಳಿಯಾಡುವಿಕೆ ಉತ್ತಮವಾಗಿರಲಿ; ನೀರು ನಿಲ್ಲುವ ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಪರಂಗಿ ಬೆಳೆಯಬೇಡಿ.",
  "fertilizerHi": "मिट्टी में हवा का आवागमन बनाए रखें; भारी चिकनी और जलभराव वाली मिट्टी से बचें।",
  "scheme": "PMFBY Horticulture Crop Relief",
  "schemeLink": "https://pmfby.gov.in/",
  "color": "#b45309",
  "keyTakeaways": [
    "Water-soaked dark lesions appear on stem at ground collar region",
    "Bark sloughs off exposing rotting internal vascular tissues",
    "Trees topple over in strong winds due to complete basal rot"
  ],
  "keyTakeawaysKn": [
    "ನೆಲಮಟ್ಟದ ಕಾಂಡದ ಬುಡದಲ್ಲಿ ನೀರಿನಂತಹ ಕಪ್ಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
    "ತೊಗಟೆ ಕಿತ್ತುಬಂದು ಒಳಗಿನ ನಾಳೀಯ ಅಂಗಾಂಶಗಳು ಕೊಳೆಯುತ್ತವೆ",
    "ಬುಡ ಸಂಪೂರ್ಣ ಕೊಳೆಯುವುದರಿಂದ ಗಾಳಿಗೆ ಮರಗಳು ನೆಲಕ್ಕುರುಳುತ್ತವೆ"
  ],
  "keyTakeawaysHi": [
    "जमीन के पास तने के निचले हिस्से पर पानी सोखे काले धब्बे दिखाई देते हैं",
    "छाल उतरने लगती है और अंदर के संवहनी ऊतक सड़ जाते हैं",
    "निचला हिस्सा सड़ने से तेज हवा में पेड़ आसानी से गिर जाते हैं"
  ],
  "products": [
    {
      "name": "Metalaxyl 8% + Mancozeb 64% (Ridomil Gold)",
      "type": "chemical",
      "brand": "Syngenta",
      "price": "₹450 – ₹650 / 250g",
      "query": "Ridomil Gold 250g"
    },
    {
      "name": "Copper Oxychloride 50 WP (Blitox)",
      "type": "chemical",
      "brand": "Rallis",
      "price": "₹280 – ₹380 / 500g",
      "query": "Blitox 500g"
    }
  ]
},
  {
  "crop": "Papaya (ಪರಂಗಿ)",
  "cropKn": "ಪರಂಗಿ",
  "cropHi": "पपीता",
  "emoji": "🍈",
  "disease": "Powdery Mildew (Oidium caricae)",
  "diseaseKn": "ಬೂದಿ ರೋಗ (ಪೌಡ್ರಿ ಮಿಲ್ಡ್ಯೂ)",
  "diseaseHi": "चूर्णिल आसिता / पाउडरी मिल्ड्यू",
  "severity": "Medium",
  "remedy": "Spray Wettable Sulphur 80 WP @ 2.5 g/L or Hexaconazole 5 EC @ 1 mL/L or Dinocap 48 EC @ 1 mL/L.",
  "remedyKn": "Wettable Sulphur 80 WP @ 2.5 g/L ಅಥವಾ Hexaconazole 5 EC @ 1 mL/L ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "Wettable Sulphur 80 WP @ 2.5 g/L या Hexaconazole 5 EC @ 1 mL/L का पत्तियों पर छिड़काव करें।",
  "prevention": "Provide adequate plant spacing (2.1 x 2.1 m) to ensure sunlight penetration and ventilation.",
  "preventionKn": "ಸಾಕಷ್ಟು ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ಗಾಳಿಯಾಡಲು ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರವನ್ನು (2.1 x 2.1 m) ಕಾಪಾಡಿಕೊಳ್ಳಿ.",
  "preventionHi": "धूप और हवा के संचार के लिए पौधों के बीच उचित दूरी (2.1 x 2.1 मीटर) रखें।",
  "organicTip": "Spray 0.5% Baking soda (Sodium Bicarbonate) or Ampelomyces quisqualis bio-fungicide.",
  "organicTipKn": "0.5% ಅಡುಗೆ ಸೋಡಾ ದ್ರಾವಣ ಅಥವಾ Ampelomyces quisqualis ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "0.5% बेकिंग सोडा का घोल या एम्पेलोमाइसीस क्विसक्वालिस का छिड़काव करें।",
  "fertilizer": "Avoid excessive nitrogen which promotes soft foliage vulnerable to powdery mildew.",
  "fertilizerKn": "ಹೆಚ್ಚು ಸಾರಜನಕ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ, ಇದು ಬೂದಿ ರೋಗಕ್ಕೆ ತುತ್ತಾಗುವ ಎಲೆಗಳ ಬೆಳವಣಿಗೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
  "fertilizerHi": "अत्यधिक नाइट्रोजन से बचें जो कोमल पत्तियों को बढ़ाकर फफूंद के लिए अनुकूल बनाता है।",
  "scheme": "Karnataka Raitha Mithra Advisory",
  "schemeLink": "https://raitamitra.karnataka.gov.in/",
  "color": "#ca8a04",
  "keyTakeaways": [
    "White powdery fungal coating on lower surface of leaves and fruit skin",
    "Infected leaves crinkle, curl downward, turn yellow and dry prematurely",
    "Prevalent during dry cool winter and early summer months (November-March)"
  ],
  "keyTakeawaysKn": [
    "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಮತ್ತು ಕಾಯಿಯ ಸಿಪ್ಪೆಯ ಮೇಲೆ ಬಿಳಿ ಬೂದಿಯಂತಹ ಶಿಲೀಂಧ್ರ ಪದರ ಉಂಟಾಗುತ್ತದೆ",
    "ರೋಗಪೀಡಿತ ಎಲೆಗಳು ಸುರುಟಿಕೊಂಡು, ಕೆಳಮುಖವಾಗಿ ಬಾಗಿ, ಹಳದಿಯಾಗಿ ಒಣಗುತ್ತವೆ",
    "ಚಳಿಗಾಲ ಮತ್ತು ಆರಂಭಿಕ ಬೇಸಿಗೆಯ ಒಣ ವಾತಾವರಣದಲ್ಲಿ (ನವೆಂಬರ್-ಮಾರ್ಚ್) ಹೆಚ್ಚು ಬಾಧಿಸುತ್ತದೆ"
  ],
  "keyTakeawaysHi": [
    "पत्तियों की निचली सतह और फलों की त्वचा पर सफेद चूर्ण जैसी फफूंद जम जाती है",
    "संक्रमित पत्तियां मुड़कर, नीचे की ओर झुककर, पीली पड़कर सूख जाती हैं",
    "सर्दियों और शुरुआती गर्मियों के शुष्क मौसम (नवंबर से मार्च) में यह रोग अधिक फैलता है"
  ],
  "products": [
    {
      "name": "Sulfex (Wettable Sulphur 80 WP)",
      "type": "chemical",
      "brand": "UPL",
      "price": "₹190 – ₹280 / 1kg",
      "query": "Sulfex Sulphur 80 WP"
    },
    {
      "name": "Contaf Plus (Hexaconazole 5 SC)",
      "type": "chemical",
      "brand": "Tata Rallis",
      "price": "₹240 – ₹350 / 250mL",
      "query": "Contaf Plus Rallis"
    }
  ]
},
  {
  "crop": "Papaya (ಪರಂಗಿ)",
  "cropKn": "ಪರಂಗಿ",
  "cropHi": "पपीता",
  "emoji": "🍈",
  "disease": "Papaya Mealybug (Paracoccus marginatus)",
  "diseaseKn": "ಪರಂಗಿ ಹಿಟ್ಟು ತಿಗಣೆ (ಮೀಲಿಬಗ್)",
  "diseaseHi": "पपीता मिलीबग कीट",
  "severity": "High",
  "remedy": "Spray Profenofos 50 EC @ 2 mL/L or Thiamethoxam 25 WG @ 0.5 g/L with 1 mL/L wetting agent (sticker).",
  "remedyKn": "Profenofos 50 EC @ 2 mL/L ಅಥವಾ Thiamethoxam 25 WG @ 0.5 g/L ಅನ್ನು ಅಂಟು ದ್ರಾವಣದೊಂದಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
  "remedyHi": "Profenofos 50 EC @ 2 mL/L या Thiamethoxam 25 WG @ 0.5 g/L को स्टीकर (चिपकाने वाले पदार्थ) के साथ मिलाकर छिड़कें।",
  "prevention": "Prune and destroy heavily infested leaves and fruits. Band tree trunk with sticky polythene.",
  "preventionKn": "ಹೆಚ್ಚು ಕೀಟಬಾಧಿತ ಎಲೆ ಮತ್ತು ಕಾಯಿಗಳನ್ನು ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ. ಮರದ ಕಾಂಡಕ್ಕೆ ಜಿಗುಟಾದ ಪಾಲಿಥೀನ್ ಪಟ್ಟಿ ಕಟ್ಟಿ.",
  "preventionHi": "अधिक ग्रसित पत्तियों और फलों को काटकर नष्ट करें। तने पर चिपचिपा प्लास्टिक बैंड लगाएं।",
  "organicTip": "Release Acerophagus papayae parasitoids @ 100 per village or spray Fish Oil Rosin Soap (FORS) @ 25 g/L.",
  "organicTipKn": "Acerophagus papayae ಪರಾವಲಂಬಿ ಕೀಟಗಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡಿ ಅಥವಾ ಮೀನೆಣ್ಣೆ ಸಾಬೂನು (FORS) @ 25 g/L ಸಿಂಪಡಿಸಿ.",
  "organicTipHi": "ऐसरोफैगस पपाए परजीवी मित्र कीट छोड़ें या फिश ऑयल रोजिन सोप (FORS) @ 25 g/L का छिड़काव करें।",
  "fertilizer": "Avoid over-application of nitrogenous fertilizers which causes pest flare-ups.",
  "fertilizerKn": "ಕೀಟಗಳ ಸಂಖ್ಯೆ ಹೆಚ್ಚಾಗುವುದನ್ನು ತಡೆಯಲು ಅತಿಯಾದ ಸಾರಜನಕ ರಸಗೊಬ್ಬರ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ.",
  "fertilizerHi": "अत्यधिक यूरिया के प्रयोग से बचें जिससे मिलीबग का प्रकोप बढ़ता है।",
  "scheme": "ICAR-NBAIR Biological Control Advisory",
  "schemeLink": "https://www.nbair.res.in/",
  "color": "#dc2626",
  "keyTakeaways": [
    "White waxy cottony mealybugs colonize leaves, stems, and fruits in heavy clusters",
    "Excrete honeydew that fosters black sooty mold coating, halting photosynthesis",
    "Biological control using encyrtid parasitoids is proven permanent solution"
  ],
  "keyTakeawaysKn": [
    "ಬಿಳಿ ಹತ್ತಿಯಂತಹ ಮೇಣದ ಹೊದಿಕೆಯ ಕೀಟಗಳು ಎಲೆಗಳು, ಕಾಂಡಗಳು ಮತ್ತು ಕಾಯಿಗಳ ಮೇಲೆ ದಟ್ಟವಾಗಿ ಆವರಿಸುತ್ತವೆ",
    "ಇವು ಸ್ರವಿಸುವ ಜಿಗುಟಾದ ದ್ರವದಿಂದ ಕಪ್ಪು ಮಸಿ ರೋಗ ಬೆಳೆದು ಆಹಾರ ತಯಾರಿಕೆ ನಿಲ್ಲುತ್ತದೆ",
    "ಪರಾವಲಂಬಿ ಕೀಟಗಳನ್ನು ಬಳಸಿ ಜೈವಿಕ ನಿಯಂತ್ರಣ ಮಾಡುವುದು ಅತ್ಯಂತ ಯಶಸ್ವಿ ಶಾಶ್ವತ ಪರಿಹಾರವಾಗಿದೆ"
  ],
  "keyTakeawaysHi": [
    "सफेद मोमी कपास जैसे मिलीबग पत्तियों, तनों और फलों पर भारी समूहों में चिपक जाते हैं",
    "इनके द्वारा छोड़े गए चिपचिपे तरल पर काली फफूंद (सूटी मोल्ड) जम जाती है जिससे प्रकाश संश्लेषण रुक जाता है",
    "परजीवी मित्र कीट (Acerophagus) द्वारा जैविक नियंत्रण इसका सबसे सफल स्थायी समाधान है"
  ],
  "products": [
    {
      "name": "Actara (Thiamethoxam 25 WG)",
      "type": "chemical",
      "brand": "Syngenta",
      "price": "₹240 – ₹360 / 100g",
      "query": "Actara Syngenta"
    },
    {
      "name": "Fish Oil Rosin Soap (FORS)",
      "type": "organic",
      "brand": "Agri-Care",
      "price": "₹180 – ₹280 / 1kg",
      "query": "Fish oil rosin soap"
    }
  ]
}
];

export const demoCards = [
  {
    "crop": "Paddy / Rice (ಭತ್ತ)",
    "cropKn": "ಭತ್ತ",
    "cropHi": "धान (चावल)",
    "disease": "Blast Disease (Pyricularia oryzae)",
    "diseaseKn": "ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    "diseaseHi": "ब्लास्ट रोग (झोंका रोग)",
    "severity": "High",
    "image": "/crops/paddy_blast.png",
    "fallbackImage": "/crops/Paddy.jpg",
    "remedy": "Spray Tricyclazole 75 WP @ 0.6 g/L or Carbendazim 50 WP @ 1 g/L at tillering stage.",
    "remedyKn": "ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ Tricyclazole 75 WP @ 0.6 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅನ್ನು ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "कल्ले फूटने की अवस्था में Tricyclazole 75 WP @ 0.6 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।",
    "fertilizer": "Apply 120:60:60 kg NPK/ha in split doses. Avoid excess N during cloudy weather.",
    "fertilizerKn": "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ 120:60:60 kg NPK ಗೊಬ್ಬರವನ್ನು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
    "fertilizerHi": "प्रति हेक्टेयर 120:60:60 kg NPK उर्वरक विभाजित मात्रा में दें।",
    "prevention": "Maintain proper water level (2-5 cm). Burn or bury infected crop straw.",
    "preventionKn": "ಗದ್ದೆಯಲ್ಲಿ 2-5 cm ನೀರಿನ ಮಟ್ಟ ಕಾಯ್ದುಕೊಳ್ಳಿ. ಸೋಂಕಿತ ಹುಲ್ಲನ್ನು ನಾಶಮಾಡಿ.",
    "preventionHi": "खेत में 2-5 cm पानी रखें। संक्रमित पुआल को जलाएं।",
    "organicTip": "Spray Pseudomonas fluorescens @ 2.5 kg/ha as foliar spray early morning.",
    "organicTipKn": "ಬೆಳಗಿನ ಜಾವ 2.5 kg/ha ನಂತೆ Pseudomonas fluorescens ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "सुबह के समय Pseudomonas fluorescens @ 2.5 kg/ha का छिड़काव करें।",
    "scheme": "PMFBY Pradhan Mantri Fasal Bima Yojana",
    "schemeLink": "https://pmfby.gov.in/",
    "color": "#f59e0b",
    "keyTakeaways": [
      "Affects leaves, neck, and panicles causing spindle-shaped lesions",
      "High humidity (>90%) and cool night temperatures trigger severe outbreaks",
      "Use resistant varieties like BPT 5204 or KMP 101"
    ],
    "keyTakeawaysKn": [
      "ಎಲೆಗಳು, ಕುತ್ತಿಗೆ ಮತ್ತು ತೆನೆಯ ಮೇಲೆ ಕದಿರಿನ ಆಕಾರದ ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ",
      "ಶೇ. 90ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು ತಂಪಾದ ರಾತ್ರಿಗಳು ರೋಗವನ್ನು ತೀವ್ರಗೊಳಿಸುತ್ತವೆ",
      "BPT 5204 ಅಥವಾ KMP 101 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों, तने और बालियों पर नाव के आकार के धब्बे बनते हैं",
      "90% से अधिक आर्द्रता और ठंडी रातें इस बीमारी को तेजी से फैलाती हैं",
      "BPT 5204 या KMP 101 जैसी रोग प्रतिरोधी किस्मों की बुवाई करें"
    ],
    "products": [
      {
        "name": "Tricyclazole 75 WP",
        "type": "chemical",
        "brand": "Beam / Baan / Dhanuka",
        "price": "₹450 – ₹650 / 250g",
        "query": "Tricyclazole 75 WP"
      },
      {
        "name": "Carbendazim 50 WP",
        "type": "chemical",
        "brand": "Bavistin / Dhanustin",
        "price": "₹190 – ₹280 / 250g",
        "query": "Carbendazim 50 WP"
      },
      {
        "name": "Pseudomonas fluorescens",
        "type": "organic",
        "brand": "Bio-Fungicide",
        "price": "₹180 – ₹240 / 1kg",
        "query": "Pseudomonas fluorescens 1kg"
      },
      {
        "name": "NPK 120:60:60 (DAP + MOP + Urea)",
        "type": "fertilizer",
        "brand": "IFFCO / KRIBHCO",
        "price": "₹1,350 / 50kg DAP, ₹267 / 45kg Urea",
        "query": "DAP fertilizer 50kg"
      }
    ]
  },
  {
    "crop": "Tomato (ಟೊಮೇಟೊ)",
    "cropKn": "ಟೊಮೇಟೊ",
    "cropHi": "टमाटर",
    "disease": "Late Blight (Phytophthora infestans)",
    "diseaseKn": "ಲೇಟ್ ಬ್ಲೈಟ್ ಅಂಗಮಾರಿ ರೋಗ",
    "diseaseHi": "टमाटर लेट ब्लाइट (पछेती अंगमारी)",
    "severity": "High",
    "image": "/crops/tomato_late_blight.png",
    "fallbackImage": "/crops/Tomato.jpg",
    "remedy": "Spray Mancozeb 75 WP @ 2 g/L or Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at 7-day intervals during wet weather.",
    "remedyKn": "ಮಳೆಗಾಲದಲ್ಲಿ ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "remedyHi": "गीले मौसम में हर 7 दिन के अंतराल पर Mancozeb 75 WP @ 2 g/L या Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L का छिड़काव करें।",
    "fertilizer": "Apply Calcium Nitrate @ 5 kg/acre to strengthen cell wall structure against fungal penetration.",
    "fertilizerKn": "ಕೋಶಭಿತ್ತಿ ಬಲಪಡಿಸಲು ಮತ್ತು ಶಿಲೀಂಧ್ರ ಪ್ರವೇಶ ತಡೆಯಲು ಎಕರೆಗೆ Calcium Nitrate @ 5 kg ನೀಡಿ.",
    "fertilizerHi": "फफूंद के हमले से बचाव हेतु कोशिका संरचना मजबूत करने के लिए Calcium Nitrate @ 5 kg/एकड़ दें।",
    "prevention": "Ensure wider plant spacing for air ventilation. Use drip irrigation instead of sprinkler. Destroy lower infected leaves.",
    "preventionKn": "ಉತ್ತಮ ಗಾಳಿಯಾಡುವಂತೆ ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ. ಸ್ಪ್ರಿಂಕ್ಲರ್ ಬದಲಿಗೆ ಹನಿ ನೀರಾವರಿ ಬಳಸಿ.",
    "preventionHi": "हवा के संचार के लिए पौधों में उचित दूरी रखें। फव्वारे के बजाय ड्रिप सिंचाई अपनाएं।",
    "organicTip": "Spray Trichoderma viride @ 5 g/L + Copper Oxychloride @ 2 g/L early morning.",
    "organicTipKn": "ಬೆಳಗಿನ ಜಾವ Trichoderma viride @ 5 g/L ಅಥವಾ Copper Oxychloride @ 2 g/L ಸಿಂಪಡಿಸಿ.",
    "organicTipHi": "सुबह के समय Trichoderma viride @ 5 g/L या Copper Oxychloride @ 2 g/L का छिड़काव करें।",
    "scheme": "Mission for Integrated Development of Horticulture (MIDH)",
    "schemeLink": "https://midh.gov.in/",
    "color": "#dc2626",
    "keyTakeaways": [
      "Causes dark, water-soaked lesions on leaves and white fungal bloom underneath in humid conditions",
      "Can destroy an entire tomato crop within 7 to 10 days if left unmanaged",
      "Practice strict crop rotation with non-solanaceous crops"
    ],
    "keyTakeawaysKn": [
      "ತೇವಾಂಶದ ವಾತಾವರಣದಲ್ಲಿ ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಮತ್ತು ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಉಂಟಾಗುತ್ತದೆ",
      "ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ನಿಯಂತ್ರಿಸದಿದ್ದರೆ 7 ರಿಂದ 10 ದಿನಗಳಲ್ಲಿ ಇಡೀ ಬೆಳೆಯನ್ನು ನಾಶಮಾಡುತ್ತದೆ",
      "ಟೊಮೇಟೊ ಬೆಳೆದ ಜಾಗದಲ್ಲಿ ಕಡ್ಡಾಯವಾಗಿ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ"
    ],
    "keyTakeawaysHi": [
      "पत्तियों पर गहरे पानीदार धब्बे और नीचे सफेद फफूंद की परत बन जाती है",
      "समय पर नियंत्रण न करने पर 7 से 10 दिनों में पूरी टमाटर की फसल नष्ट हो सकती है",
      "टमाटर के बाद अन्य कुल की फसलों के साथ सख्त फसल चक्र अपनाएं"
    ],
    "products": [
      {
        "name": "Metalaxyl + Mancozeb (Ridomil Gold)",
        "type": "chemical",
        "brand": "Syngenta Ridomil Gold",
        "price": "₹480 – ₹680 / 500g",
        "query": "Metalaxyl Mancozeb 72 WP"
      },
      {
        "name": "Mancozeb 75 WP (Dithane M-45)",
        "type": "chemical",
        "brand": "Indofil M-45",
        "price": "₹240 – ₹350 / 500g",
        "query": "Mancozeb 75 WP"
      },
      {
        "name": "Calcium Nitrate Fertilizer",
        "type": "fertilizer",
        "brand": "YaraLiva / IFFCO",
        "price": "₹850 – ₹1,200 / 25kg",
        "query": "Calcium Nitrate fertilizer 25kg"
      },
      {
        "name": "Copper Oxychloride 50 WP",
        "type": "chemical",
        "brand": "Blitox",
        "price": "₹280 – ₹390 / 500g",
        "query": "Copper Oxychloride 50 WP"
      }
    ]
  },
];

export const UNIQUE_CROPS = [...new Set(CROP_DISEASES.map(d => d.crop))];


export function getLocalizedCropName(cropKey, lang) {
  if (!cropKey || cropKey === 'NO_CROP') return lang === 'hi' ? 'फ़सल चुनें' : lang === 'kn' ? 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' : 'Select crop';
  if (cropKey === 'AUTO_DETECT') return lang === 'hi' ? 'ऑटो-डिटेक्ट' : lang === 'kn' ? 'ಸ್ವಯಂ ಪತ್ತೆ' : 'Auto-Detect';
  const item = CROP_DISEASES.find(d => d.crop === cropKey);
  if (!item) {
    if (lang === 'hi') return cropKey.includes('(') ? cropKey.split('/')[1]?.replace(/[()]/g, '').trim() || cropKey : cropKey;
    if (lang === 'kn') return cropKey.includes('(') ? cropKey.split('(')[1]?.split('/')[0]?.trim() || cropKey : cropKey;
    return cropKey.split('(')[0].trim();
  }
  if (lang === 'hi') return item.cropHi || item.crop;
  if (lang === 'kn') return item.cropKn || item.crop;
  return item.crop.split('(')[0].trim();
}



