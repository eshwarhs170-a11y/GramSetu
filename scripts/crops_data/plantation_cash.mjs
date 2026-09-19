export const PLANTATION_CASH = [
  // ── 1. COTTON ──
  {
    crop: 'Cotton (ಹತ್ತಿ / कपास)',
    cropKn: 'ಹತ್ತಿ',
    cropHi: 'कपास (कॉटन)',
    emoji: '🌱',
    diseases: [
      {
        disease: 'Pink Bollworm (Pectinophora gossypiella)',
        diseaseKn: 'ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು',
        diseaseHi: 'गुलाबी सुंडी (पिंक बॉलवर्म)',
        severity: 'High',
        remedy: 'Install pheromone traps (Pectino-Lure) @ 8/acre. Spray Profenofos 50 EC @ 2 mL/L or Emamectin Benzoate 5 SG @ 0.4 g/L or Chlorantraniliprole 18.5 SC @ 0.3 mL/L at ETL (8 moths/trap/day).',
        remedyKn: 'ಎಕರೆಗೆ 8 ಪೆಕ್ಟಿನೋ-ಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಕೀಟ ಬಾಧೆ ಮಿತಿ ಮೀರಿದಾಗ Profenofos 50 EC @ 2 mL/L ಅಥವಾ Emamectin Benzoate 5 SG @ 0.4 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'खेत में 8 पेक्टिनो-ल्यूर फेरोमोन ट्रैप प्रति एकड़ लगाएं। कीट दिखने पर Profenofos 50 EC @ 2 mL/L या Emamectin Benzoate 5 SG @ 0.4 g/L का छिड़काव करें।',
        prevention: 'Avoid ratoon cotton crop. Terminate crop by December-January to break pest life cycle. Shred and deep plough stalks.',
        preventionKn: 'ಹತ್ತಿ ಕೂಳೆ ಬೆಳೆಯನ್ನು ಇಡಬೇಡಿ. ಡಿಸೆಂಬರ್-ಜನವರಿ ವೇಳೆಗೆ ಬೆಳೆಯನ್ನು ಮುಕ್ತಾಯಗೊಳಿಸಿ ಕೀಟದ ಜೀವನ ಚಕ್ರವನ್ನು ತುಂಡರಿಸಿ.',
        preventionHi: 'कपास की पेड़ी (रतून) फसल न लें। दिसंबर-जनवरी तक फसल खत्म करके डंठलों को नष्ट करें ताकि कीट का जीवन चक्र टूटे।',
        organicTip: 'Release Trichogramma bactrae egg parasitoid @ 60,000/acre at weekly intervals 4–5 times from flowering.',
        organicTipKn: 'ಹೂವಾಡುವ ಹಂತದಿಂದ ವಾರಕ್ಕೊಮ್ಮೆ Trichogramma bactrae ಪರಾವಲಂಬಿಗಳನ್ನು ಎಕರೆಗೆ 60,000 ದಂತೆ 4–5 ಬಾರಿ ಬಿಡಿ.',
        organicTipHi: 'फूल आने पर साप्ताहिक रूप से Trichogramma bactrae @ 60,000/एकड़ की दर से 4-5 बार छोड़ें।',
        fertilizer: 'Apply 150:75:75 kg NPK/ha. Avoid late excess nitrogen which promotes tender green squares.',
        fertilizerKn: 'ಹೆಕ್ಟೇರ್‌ಗೆ 150:75:75 kg NPK ಗೊಬ್ಬರ ನೀಡಿ. ತಡವಾಗಿ ಹೆಚ್ಚಿನ ಯೂರಿಯಾ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 150:75:75 kg NPK दें। देर से ज्यादा यूरिया देने से बचें।',
        scheme: 'Special Pink Bollworm Management Programme (CICR Nagpur)',
        schemeLink: 'https://cicr.org.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Larvae bore inside bolls through tiny pinholes and seal the entry, feeding on developing seeds',
          'Causes "rosette flowers", stained damaged lint, and premature boll opening',
          'Install PBW pheromone traps within 45 days of sowing'
        ],
        keyTakeawaysKn: [
          'ಹುಳುಗಳು ಕಾಯಿಯೊಳಗೆ ನುಗ್ಗಿ ರಂಧ್ರವನ್ನು ಮುಚ್ಚಿಕೊಂಡು ಬೀಜಗಳನ್ನು ತಿನ್ನುತ್ತವೆ',
          'ಗುಲಾಬಿ ಬಣ್ಣದ ಹೂವುಗಳು ಮುದುಡಿ "ರೊಸೆಟ್ ಹೂವು"ಗಳಾಗುತ್ತವೆ ಮತ್ತು ಹತ್ತಿಯ ಗುಣಮಟ್ಟ ಹಾಳಾಗುತ್ತದೆ',
          'ಬಿತ್ತನೆಯ 45 ದಿನಗಳ ಒಳಗಾಗಿಯೇ ಫೆರೋಮೊನ್ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಹೊಲದಲ್ಲಿ ಅಳವಡಿಸಿ'
        ],
        keyTakeawaysHi: [
          'सुंडी छोटे छेद से गूलर में घुसकर छेद बंद कर लेती है और अंदर के बीजों को खाती है',
          'फूल "गुलाब के फूल" जैसे मुड़ जाते हैं और रुई खराब व दागदार हो जाती है',
          'बुवाई के 45 दिनों के भीतर ही फेरोमोन ट्रैप खेत में लगा दें'
        ],
        products: [
          { name: 'Profenofos 50 EC', type: 'chemical', brand: 'Curacron (Syngenta) / Carina', price: '₹480 – ₹680 / 500mL', query: 'Profenofos 50 EC' },
          { name: 'Emamectin Benzoate 5 SG', type: 'chemical', brand: 'Proclaim', price: '₹420 – ₹590 / 100g', query: 'Emamectin Benzoate 5 SG' },
          { name: 'Pink Bollworm Pheromone Trap (Pectino-Lure)', type: 'organic', brand: 'PCI / Agri Lures', price: '₹130 – ₹190 / trap', query: 'Pink bollworm pheromone trap lure' }
        ]
      },
      {
        disease: 'Bacterial Blight / Black Arm (Xanthomonas citri pv. malvacearum)',
        diseaseKn: 'ಕಪ್ಪು ತೋಳು ರೋಗ (ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್)',
        diseaseHi: 'कपास जीवाणु झुलसा (ब्लैक आर्म रोग)',
        severity: 'High',
        remedy: 'Spray Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L at first notice of angular spots.',
        remedyKn: 'ಕೋನಾಕಾರದ ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Copper Oxychloride 50 WP @ 2.5 g/L ಜೊತೆಗೆ Streptocycline @ 0.1 g/L ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'कोणीय धब्बे दिखते ही Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L मिलाकर छिड़काव करें।',
        prevention: 'Delinting seeds with concentrated Sulphuric Acid (100 mL/kg seed) followed by seed treatment.',
        preventionKn: 'ಬೀಜಗಳಿಗೆ ಸಾರಗುಂದಿದ ಗಂಧಕಾಮ್ಲದಿಂದ ರೋಮ ನಿವಾರಣೆ (ಡಿಲಿಂಟಿಂಗ್) ಮಾಡಿ ಬೀಜೋಪಚಾರ ಮಾಡಿ.',
        preventionHi: 'सल्फ्यूरिक एसिड से बीजों की रुई हटाकर (डिलिंटिंग) उपचारित करें।',
        organicTip: 'Foliar spray of fresh cow dung extract 5% + Copper Hydroxide @ 1.5 g/L.',
        organicTipKn: '5% ಹಸುವಿನ ಸಗಣಿ ತಿಳಿ ನೀರು ಅಥವಾ Copper Hydroxide @ 1.5 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '5% ताजा गाय के गोबर का अर्क या Copper Hydroxide @ 1.5 g/L का छिड़काव करें।',
        fertilizer: 'Apply adequate Potassium (MOP); Potash enhances plant vascular wall resistance.',
        fertilizerKn: 'ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ; ಇದು ಗಿಡದ ನರಗಳನ್ನು ಗಟ್ಟಿಗೊಳಿಸಿ ರೋಗ ತಡೆಯುತ್ತದೆ.',
        fertilizerHi: 'पर्याप्त पोटाश डालें; पोटाश तने की नसों को मजबूत बनाकर रोग से बचाता है।',
        scheme: 'Technology Mission on Cotton (TMC)',
        schemeLink: 'https://ministryoftextiles.gov.in/',
        color: '#b91c1c',
        keyTakeaways: [
          'Angular water-soaked spots on leaves bounded by veinlets, later turning dark reddish-brown',
          'Elongated black lesions on stems and branches causing "black arm" dieback and breakage',
          'Acid delinting destroys seed-borne bacteria completely'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ನರಗಳ ನಡುವೆ ಕೋನಾಕಾರದ ನೀರಿನಂತಹ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ನಂತರ ಕಪ್ಪು-ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ',
          'ಕಾಂಡ ಮತ್ತು ರೆಂಬೆಗಳ ಮೇಲೆ ಉದ್ದನೆಯ ಕಪ್ಪು ಕಲೆಗಳು ಉಂಟಾಗಿ ರೆಂಬೆಗಳು ಮುರಿದು ಬೀಳುತ್ತವೆ ("ಕಪ್ಪು ತೋಳು")',
          'ಆಸಿಡ್ ಡಿಲಿಂಟಿಂಗ್ ಬೀಜದಲ್ಲಿರುವ ಬ್ಯಾಕ್ಟೀರಿಯಾವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಾಶಮಾಡುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की नसों के बीच कोणीय पानीदार धब्बे बनते हैं जो बाद में काले-लाल हो जाते हैं',
          'तनों और शाखाओं पर लंबे काले घाव बनते हैं जिससे शाखाएं टूट जाती हैं (ब्लैक आर्म)',
          'एसिड डिलिंटिंग से बीज जनित बैक्टीरिया पूरी तरह खत्म हो जाता है'
        ],
        products: [
          { name: 'Copper Oxychloride 50 WP', type: 'chemical', brand: 'Blitox 50', price: '₹280 – ₹420 / 500g', query: 'Copper Oxychloride 50 WP' },
          { name: 'Streptocycline', type: 'chemical', brand: 'Hindustan Antibiotics', price: '₹45 – ₹70 / 6g', query: 'Streptocycline 6g' }
        ]
      },
      {
        disease: 'Grey Mildew / Dahiya (Ramularia areola)',
        diseaseKn: 'ಹತ್ತಿ ಬೂದಿ ರೋಗ (ದಹಿಯಾ)',
        diseaseHi: 'कपास धहिया रोग (ग्रे मिल्ड्यू)',
        severity: 'Medium',
        remedy: 'Spray Wettable Sulphur 80 WP @ 3 g/L or Carbendazim 50 WP @ 1 g/L or Kresoxim-methyl 44.3 SC @ 1 mL/L.',
        remedyKn: 'Wettable Sulphur 80 WP @ 3 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಅಥವಾ Kresoxim-methyl 44.3 SC @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'Wettable Sulphur 80 WP @ 3 g/L या Carbendazim 50 WP @ 1 g/L या Kresoxim-methyl 44.3 SC @ 1 mL/L का छिड़काव करें।',
        prevention: 'Wider row spacing (90x60 cm or 120x60 cm) for air circulation. Avoid dense canopy.',
        preventionKn: 'ಸಾಲುಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ (90x60 cm) ಕಾಯ್ದುಕೊಳ್ಳಿ. ಗಾಳಿಯಾಡುವಂತೆ ಮಾಡಿ.',
        preventionHi: 'कतारों में उचित दूरी (90x60 cm) रखें ताकि धूप और हवा मिल सके।',
        organicTip: 'Foliar spray of 10% sour buttermilk or fermented bio-wash.',
        organicTipKn: '10% ಹುಳಿ ಮಜ್ಜಿಗೆಯ ತಿಳಿ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '10% खट्टी छाछ के घोल का पत्तियों पर छिड़काव करें।',
        fertilizer: 'Avoid excess nitrogen in late season that stimulates excessive leafy canopy.',
        fertilizerKn: 'ಹಿಂಗಾರು ಹಂತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ನೀಡುವುದನ್ನು ತಪ್ಪಿಸಿ.',
        fertilizerHi: 'फसल के अंतिम चरण में अत्यधिक यूरिया न दें।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#64748b',
        keyTakeaways: [
          'Pale, angular, translucent spots on upper leaf surface with powdery white-gray frost on underside',
          'Causes severe premature defoliation and reduction in boll size',
          'Common in late Kharif when nights are cool and humid'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ತಿಳಿ ಕೋನಾಕಾರದ ಕಲೆಗಳು ಮತ್ತು ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಮಂಜಿನಂತಹ ಬೂಷ್ಟು ಕಾಣಿಸುತ್ತದೆ',
          'ಕಾಯಿಗಳು ಕಟ್ಟುವುದು ಕಡಿಮೆಯಾಗಿ ಎಲೆಗಳು ಅಕಾಲಿಕವಾಗಿ ಉದುರಿಹೋಗುತ್ತವೆ',
          'ತಂಪಾದ ರಾತ್ರಿಗಳು ಮತ್ತು ತೇವಾಂಶವಿರುವ ನವೆಂಬರ್-ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ಹೆಚ್ಚು ಕಾಡುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की ऊपरी सतह पर हल्के धब्बे और निचली सतह पर सफेद-धूसर पाउडर जैसी फफूंद जमती है',
          'पत्तियां समय से पहले झड़ जाती हैं और गूलर का आकार छोटा रह जाता है',
          'ठंडी रातों और नम मौसम में यह बीमारी बहुत तेजी से फैलती है'
        ],
        products: [
          { name: 'Wettable Sulphur 80 WP', type: 'chemical', brand: 'Sulfex', price: '₹180 – ₹260 / 1kg', query: 'Wettable Sulphur 80 WP' },
          { name: 'Kresoxim-methyl 44.3 SC', type: 'chemical', brand: 'Ergon / Stroby', price: '₹750 – ₹1,050 / 250mL', query: 'Kresoxim-methyl 44.3 SC' }
        ]
      },
      {
        disease: 'Fusarium Wilt (Fusarium oxysporum f.sp. vasinfectum)',
        diseaseKn: 'ಹತ್ತಿ ಸೊರಗು ರೋಗ (ಫ್ಯುಸಾರಿಯಂ ವಿಲ್ಟ್)',
        diseaseHi: 'कपास उकठा रोग (फ्यूजेरियम विल्ट)',
        severity: 'High',
        remedy: 'Spot drench affected and surrounding plants with Carbendazim 50 WP @ 1.5 g/L or Copper Oxychloride 50 WP @ 3 g/L.',
        remedyKn: 'ಸೊರಗಿದ ಗಿಡಗಳ ಬುಡಕ್ಕೆ Carbendazim 50 WP @ 1.5 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 3 g/L ದ್ರಾವಣದಿಂದ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.',
        remedyHi: 'प्रभावित और आसपास के पौधों की जड़ों में Carbendazim 50 WP @ 1.5 g/L या Copper Oxychloride 50 WP @ 3 g/L का घोल डालें।',
        prevention: 'Grow wilt-resistant varieties. Follow crop rotation with sorghum or millets for 2–3 seasons.',
        preventionKn: 'ಸೊರಗು ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಜೋಳ ಅಥವಾ ರಾಗಿ ಬೆಳೆಗಳೊಂದಿಗೆ 2-3 ವರ್ಷ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.',
        preventionHi: 'उकठा रोधी किस्में लगाएं। ज्वार या बाजरे के साथ 2-3 साल का फसल चक्र अपनाएं।',
        organicTip: 'Apply Trichoderma viride @ 2.5 kg/acre mixed in 200 kg neem cake and FYM at sowing.',
        organicTipKn: 'ಬಿತ್ತನೆ ವೇಳೆ ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿದ Trichoderma viride @ 2.5 kg ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.',
        organicTipHi: 'बुवाई के समय नीम की खली और सड़ी खाद में मिलाकर Trichoderma viride @ 2.5 kg प्रति एकड़ डालें।',
        fertilizer: 'Apply Potash (MOP) @ 50 kg/ha to mitigate vascular wilting stress.',
        fertilizerKn: 'ಹೆಕ್ಟೇರ್‌ಗೆ 50 kg ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 50 kg पोटाश खाद डालें।',
        scheme: 'Raitha Sanjeevini Soil Health Support',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#7f1d1d',
        keyTakeaways: [
          'Yellowing, loss of turgidity, drooping, and drying of leaves starting from bottom to top',
          'Characteristic dark brown to black vascular browning visible when stem is split open',
          'Soil-borne fungus; biological soil enrichment is the best preventive method'
        ],
        keyTakeawaysKn: [
          'ಕೆಳಗಿನ ಎಲೆಗಳಿಂದ ಆರಂಭವಾಗಿ ಮೇಲಿನವರೆಗೆ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಬಾಡಿ ಒಣಗಿಹೋಗುತ್ತವೆ',
          'ಕಾಂಡವನ್ನು ಸೀಳಿ ನೋಡಿದಾಗ ಒಳಗಿನ ನರಗಳು ಕಂದು-ಕಪ್ಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುತ್ತವೆ',
          'ಮಣ್ಣಿನ ಮೂಲಕ ಹರಡುವ ರೋಗ; ಜೈವಿಕ ಗೊಬ್ಬರ ಹಾಗೂ ಬೇವಿನ ಹಿಂಡಿ ಬಳಕೆ ಅತ್ಯುತ್ತಮ ಪರಿಹಾರ'
        ],
        keyTakeawaysHi: [
          'निचली पत्तियों से शुरू होकर ऊपर की पत्तियां पीली पड़कर मुरझाने और सूखने लगती हैं',
          'तने को चीरकर देखने पर भीतर की नसें भूरी या काली दिखाई देती हैं',
          'मिट्टी जनित रोग है; ट्राइकोडर्मा और नीम की खली का प्रयोग सबसे असरदार है'
        ],
        products: [
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' },
          { name: 'Trichoderma viride 1% WP', type: 'organic', brand: 'Bio-Fungicide', price: '₹160 – ₹230 / 1kg', query: 'Trichoderma viride 1kg' },
          { name: 'Neem Cake Organic Fertilizer', type: 'organic', brand: 'Agri Neem Cake', price: '₹950 – ₹1,350 / 50kg bag', query: 'Neem cake fertilizer 50kg' }
        ]
      },
      {
        disease: 'Cotton Leaf Curl Virus (CLCuV)',
        diseaseKn: 'ಹತ್ತಿ ಎಲೆ ಮುದುಡು ವೈರಸ್',
        diseaseHi: 'कपास पर्ण कुंचन वायरस (लीफ कर्ल वायरस)',
        severity: 'High',
        remedy: 'Control whitefly vector (Bemisia tabaci) by spraying Diafenthiuron 50 WP @ 1 g/L or Afidopyropen 50 g/L ME @ 2 mL/L or Pyriproxyfen 10% + Fenpropathrin 15% EC @ 1.5 mL/L.',
        remedyKn: 'ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಿಸಲು Diafenthiuron 50 WP @ 1 g/L ಅಥವಾ Afidopyropen 50 g/L @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'सफेद मक्खी की रोकथाम के लिए Diafenthiuron 50 WP @ 1 g/L या Afidopyropen 50 g/L @ 2 mL/L का छिड़काव करें।',
        prevention: 'Eradicate weed hosts like Abutilon indicum and Parthenium. Use yellow sticky traps @ 20/acre.',
        preventionKn: 'ಹೊಲದ ಬದಿಗಳಲ್ಲಿರುವ ಕಳೆ ಗಿಡಗಳನ್ನು ನಾಶಮಾಡಿ. ಎಕರೆಗೆ 20 ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
        preventionHi: 'खेत की मेड़ों से खरपतवार नष्ट करें। 20 पीले चिपचिपे ट्रैप प्रति एकड़ लगाएं।',
        organicTip: 'Spray 5% Neem seed kernel extract (NSKE) or Neem oil 10000 PPM @ 3 mL/L weekly.',
        organicTipKn: 'ಪ್ರತಿ ವಾರ 5% ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ 10000 PPM @ 3 mL/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'साप्ताहिक रूप से 5% नीम का अर्क या नीम का तेल 10000 PPM @ 3 mL/L का छिड़काव करें।',
        fertilizer: 'Apply Micronutrient spray (Zinc + Boron + Magnesium Sulphate @ 5 g/L) to relieve leaf curling stress.',
        fertilizerKn: 'ಎಲೆ ಮುದುಡುವಿಕೆ ನಿವಾರಿಸಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಸಿಂಪಡಣೆ (Zinc + Boron + MgSO4 @ 5 g/L) ಮಾಡಿ.',
        fertilizerHi: 'पत्तियों के मुड़ने से राहत के लिए सूक्ष्म पोषक तत्व (Zinc + Boron + MgSO4 @ 5 g/L) का छिड़काव करें।',
        scheme: 'Mission for Integrated Development of Agriculture',
        schemeLink: 'https://agricoop.nic.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Upward or downward leaf curling with severe vein thickening on lower leaf surface',
          'Formation of enations (cup-shaped leafy outgrowths) under main veins',
          'Transmitted strictly by whiteflies; keeping whitefly count low is critical'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಅಥವಾ ಕೆಳಮುಖವಾಗಿ ಮುದುಡಿಕೊಂಡು, ನರಗಳು ದಪ್ಪಗಾಗುತ್ತವೆ',
          'ಎಲೆಯ ನರಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬಟ್ಟಲಿನಾಕಾರದ ಎಲೆ ಗಂಟುಗಳು (ಇನೇಶನ್ಸ್) ಉಂಟಾಗುತ್ತವೆ',
          'ಬಿಳಿ ನೊಣಗಳಿಂದ ಮಾತ್ರ ಈ ವೈರಸ್ ಹರಡುತ್ತದೆ; ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣವೇ ಇದಕ್ಕೆ ಮುಖ್ಯ ಪರಿಹಾರ'
        ],
        keyTakeawaysHi: [
          'पत्तियां ऊपर या नीचे की ओर मुड़ जाती हैं और निचली सतह पर नसें मोटी हो जाती हैं',
          'पत्तियों की मुख्य नसों के नीचे प्याले जैसी छोटी पत्तियां (इनेशन) निकल आती हैं',
          'यह केवल सफेद मक्खी द्वारा फैलता है; सफेद मक्खी पर नियंत्रण ही इसका मुख्य उपाय है'
        ],
        products: [
          { name: 'Diafenthiuron 50 WP', type: 'chemical', brand: 'Pegasus (Syngenta)', price: '₹620 – ₹880 / 250g', query: 'Diafenthiuron 50 WP Pegasus' },
          { name: 'Afidopyropen 50 g/L ME', type: 'chemical', brand: 'Sefina (BASF)', price: '₹850 – ₹1,200 / 250mL', query: 'Afidopyropen Sefina BASF' },
          { name: 'Yellow Sticky Traps', type: 'organic', brand: 'Agri Sticky Traps', price: '₹220 – ₹320 / pack of 10', query: 'Yellow sticky traps agriculture' }
        ]
      }
    ]
  },

  // ── 2. SUGARCANE ──
  {
    crop: 'Sugarcane (ಕಬ್ಬು / गन्ना)',
    cropKn: 'ಕಬ್ಬು',
    cropHi: 'गन्ना (ईख)',
    emoji: '🎋',
    diseases: [
      {
        disease: 'Red Rot (Colletotrichum falcatum)',
        diseaseKn: 'ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ',
        diseaseHi: 'गन्ना लाल सड़न रोग (रेड रॉट)',
        severity: 'High',
        remedy: 'Treat setts with Carbendazim 50 WP @ 1 g/L or Thiophanate-methyl 70 WP @ 1.5 g/L for 15 minutes before planting. Rogue out infected clumps and apply bleaching powder @ 10 kg/ha in irrigation channel.',
        remedyKn: 'ನಾಟಿ ಮಾಡುವ ಮುನ್ನ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು Carbendazim 50 WP @ 1 g/L ದ್ರಾವಣದಲ್ಲಿ 15 ನಿಮಿಷ ನೆನೆಸಿ. ರೋಗಪೀಡಿತ ಬುಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ.',
        remedyHi: 'बुवाई से पहले गन्ने के टुकड़ों को Carbendazim 50 WP @ 1 g/L में 15 मिनट भिगोएं। रोगी पौधों को उखाड़ें और नाली में ब्लीचिंग पाउडर डालें।',
        prevention: 'Plant certified disease-free setts from nursery crop. Avoid waterlogging; provide deep drainage trenches.',
        preventionKn: 'ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬಿತ್ತನೆ ಕಬ್ಬು ಬಳಸಿ. ನೀರು ನಿಲ್ಲದಂತೆ ಆಳವಾದ ಬಸಿಗಾಲುವೆಗಳನ್ನು ನಿರ್ಮಿಸಿ.',
        preventionHi: 'प्रमाणित रोगमुक्त गन्ने की पौध लगाएं। जलजमाव रोकें और गहरी जल निकासी नालियां बनाएं।',
        organicTip: 'Sett treatment with Trichoderma viride @ 10 g/L + Pseudomonas fluorescens @ 10 g/L for 30 minutes.',
        organicTipKn: 'ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು Trichoderma viride @ 10 g/L ಮತ್ತು Pseudomonas fluorescens @ 10 g/L ದ್ರಾವಣದಲ್ಲಿ 30 ನಿಮಿಷ ನೆನೆಸಿ.',
        organicTipHi: 'टुकड़ों को Trichoderma viride @ 10 g/L और Pseudomonas fluorescens @ 10 g/L में 30 मिनट भिगोएं।',
        fertilizer: 'Apply balanced NPK (250:100:125 kg/ha); avoid excess late nitrogen top-dressing.',
        fertilizerKn: 'ಹೆಕ್ಟೇರ್‌ಗೆ 250:100:125 kg NPK ಗೊಬ್ಬರ ನೀಡಿ; ತಡವಾಗಿ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 250:100:125 kg NPK दें; देर से यूरिया का ऊपरी छिड़काव न करें।',
        scheme: 'Sugarcane Development Programme (SISMA Karnataka)',
        schemeLink: 'https://sugarcane.karnataka.gov.in/',
        color: '#b91c1c',
        keyTakeaways: [
          'Third or fourth leaf from top shows yellowing and withering, followed by complete crown drying',
          'Pith shows bright red discoloration with crosswise white patches and alcoholic fermentation odor',
          '"Cancer of sugarcane" — completely reject affected fields for seed multiplication'
        ],
        keyTakeawaysKn: [
          'ಮೇಲಿನ ಮೂರು-ನಾಲ್ಕನೇ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಬಾಡಿ, ಕ್ರಮೇಣ ಇಡೀ ಸುಳಿ ಒಣಗಿಹೋಗುತ್ತದೆ',
          'ಕಬ್ಬನ್ನು ಸೀಳಿದಾಗ ಒಳಗಿನ ತಿರುಳು ಅಡ್ಡಲಾದ ಬಿಳಿ ಪಟ್ಟಿಗಳೊಂದಿಗೆ ಕೆಂಪಾಗಿ ಮದ್ಯದ ವಾಸನೆ ಬೀರುತ್ತದೆ',
          'ಕಬ್ಬಿನ "ಕ್ಯಾನ್ಸರ್" ಎಂದು ಕರೆಯಲ್ಪಡುವ ರೋಗ; ರೋಗಪೀಡಿತ ಕಬ್ಬನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಬಿತ್ತನೆಗೆ ಬಳಸಬೇಡಿ'
        ],
        keyTakeawaysHi: [
          'ऊपर से तीसरी-चौथी पत्ती पीली पड़कर सूखती है और बाद में पूरा अगोला सूख जाता है',
          'चीरने पर भीतरी गूदा चमकदार लाल निकलता है जिसमें सफेद चकत्ते और शराब जैसी गंध आती है',
          'गन्ने का "कैंसर" माना जाता है; संक्रमित खेत के गन्ने को कभी भी बीज के लिए न रखें'
        ],
        products: [
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin / Dhanustin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' },
          { name: 'Thiophanate-methyl 70 WP', type: 'chemical', brand: 'Roko (Biostadt)', price: '₹480 – ₹690 / 500g', query: 'Thiophanate-methyl 70 WP Roko' },
          { name: 'Trichoderma viride 1% WP', type: 'organic', brand: 'Bio-Fungicide', price: '₹160 – ₹230 / 1kg', query: 'Trichoderma viride 1kg' }
        ]
      },
      {
        disease: 'Sugarcane Smut (Sporisorium scitamineum)',
        diseaseKn: 'ಕಬ್ಬಿನ ಮಸಿ ರೋಗ (ಸ್ಮಟ್)',
        diseaseHi: 'गन्ना कंडुआ रोग (स्मट)',
        severity: 'High',
        remedy: 'Carefully cover smutted whip with a cloth bag, cut at base, and burn. Dip setts in Propiconazole 25 EC @ 1 mL/L for 15 minutes before planting.',
        remedyKn: 'ಮಸಿ ಚಾವಟಿಯನ್ನು ಬಟ್ಟೆಯ ಚೀಲದಿಂದ ಮುಚ್ಚಿ, ಬುಡದಿಂದ ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ. ನಾಟಿಗೆ ಮುನ್ನ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು Propiconazole 25 EC @ 1 mL/L ನಲ್ಲಿ ನೆನೆಸಿ.',
        remedyHi: 'काले चाबुक को कपड़े की थैली से ढककर नीचे से काटें और जलाएं। बुवाई से पहले टुकड़ों को Propiconazole 25 EC @ 1 mL/L में 15 मिनट डुबोएं।',
        prevention: 'Avoid taking ratoon from a smut-infected crop. Use hot water treated seed setts (52°C for 30 minutes).',
        preventionKn: 'ಮಸಿ ರೋಗಪೀಡಿತ ಕಬ್ಬಿನಿಂದ ಕೂಳೆ ಬೆಳೆ ಇಡಬೇಡಿ. ಬಿಸಿ ನೀರಿನಲ್ಲಿ (52°C ನಲ್ಲಿ 30 ನಿಮಿಷ) ಉಪಚರಿಸಿದ ಬಿತ್ತನೆ ಕಬ್ಬು ಬಳಸಿ.',
        preventionHi: 'कंडुआ लगे खेत से पेड़ी फसल न लें। 52°C गर्म पानी में 30 मिनट उपचारित गन्ने के टुकड़े ही बोएं।',
        organicTip: 'Dip setts in bio-agent Trichoderma harzianum suspension @ 10 g/L.',
        organicTipKn: 'Trichoderma harzianum @ 10 g/L ದ್ರಾವಣದಲ್ಲಿ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು ನೆನೆಸಿ ನಾಟಿ ಮಾಡಿ.',
        organicTipHi: 'Trichoderma harzianum @ 10 g/L के घोल में गन्ने के टुकड़े डुबोकर लगाएं।',
        fertilizer: 'Ensure balanced fertilization with adequate Potash to strengthen rinds.',
        fertilizerKn: 'ಕಬ್ಬಿನ ಸಿಪ್ಪೆ ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'गन्ने की बाहरी परत मजबूत करने के लिए पर्याप्त पोटाश खाद दें।',
        scheme: 'State Sugar Commissionerate Subsidy on Certified Seed Setts',
        schemeLink: 'https://sugarcane.karnataka.gov.in/',
        color: '#475569',
        keyTakeaways: [
          'Terminal shoot transforms into a long, whip-like unbranched dusty black structure curled like a whip',
          'Whips release millions of sooty black teliospores carried by wind across miles',
          'Always bag before cutting to prevent explosive spore dispersal in field'
        ],
        keyTakeawaysKn: [
          'ಸುಳಿಯು ಉದ್ದನೆಯ ಚಾವಟಿಯಂತೆ ತಿರುಚಿಕೊಂಡು ಕಪ್ಪು ಮಸಿ ಪುಡಿಯಿಂದ ಆವೃತವಾಗುತ್ತದೆ',
          'ಚಾವಟಿಯಿಂದ ಲಕ್ಷಾಂತರ ಕಪ್ಪು ಮಸಿ ಬೀಜಾಣುಗಳು ಗಾಳಿಯಲ್ಲಿ ಮೈಲಿಗಟ್ಟಲೆ ಹರಡುತ್ತವೆ',
          'ಕತ್ತರಿಸುವ ಮುನ್ನ ಕಡ್ಡಾಯವಾಗಿ ಚೀಲದಿಂದ ಮುಚ್ಚಿ, ಬೀಜಾಣುಗಳು ಗಾಳಿಯಲ್ಲಿ ಹರಡುವುದನ್ನು ತಡೆಯಿರಿ'
        ],
        keyTakeawaysHi: [
          'मुख्य कली एक लंबे, चाबुक जैसे मुड़े हुए काले पाउडर वाले डंडे में बदल जाती है',
          'इस चाबुक से लाखों काले फफूंद के कण हवा में उड़कर मीलों दूर तक फैलते हैं',
          'काटने से पहले थैली से जरूर ढकें ताकि हवा में काले कण न उड़ें'
        ],
        products: [
          { name: 'Propiconazole 25 EC', type: 'chemical', brand: 'Tilt (Syngenta)', price: '₹420 – ₹600 / 250mL', query: 'Propiconazole 25 EC Tilt' },
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' }
        ]
      },
      {
        disease: 'Grassy Shoot Disease (Phytoplasma)',
        diseaseKn: 'ಕಬ್ಬಿನ ಹುಲ್ಲು ಚಿಗುರು ರೋಗ (GSD)',
        diseaseHi: 'गन्ना घास जैसी पत्तियां रोग (ग्रासी शूट)',
        severity: 'Medium',
        remedy: 'Uproot and destroy diseased stools. Spray Dimethoate 30 EC @ 1.7 mL/L or Malathion 50 EC @ 2 mL/L to control vector aphids (Melanaphis sacchari).',
        remedyKn: 'ರೋಗಪೀಡಿತ ಕಬ್ಬಿನ ಬುಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಮಾಡಿ. ರೋಗ ಹರಡುವ ಹೇನುಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು Dimethoate 30 EC @ 1.7 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'रोगी थानों को उखाड़कर नष्ट करें। माहू कीट की रोकथाम के लिए Dimethoate 30 EC @ 1.7 mL/L का छिड़काव करें।',
        prevention: 'Aerated Steam Therapy (AST) of seed setts at 54°C for 1 hour. Do not take ratoon from affected crop.',
        preventionKn: 'ಬಿತ್ತನೆ ಕಬ್ಬಿಗೆ ಹಬೆ ಶಾಖೋಪಚಾರ (54°C ನಲ್ಲಿ 1 ಗಂಟೆ) ಮಾಡಿ. ರೋಗಪೀಡಿತ ಬೆಳೆಯಲ್ಲಿ ಕೂಳೆ ಬೆಳೆ ಇಡಬೇಡಿ.',
        preventionHi: 'गन्ने के टुकड़ों को 54°C पर 1 घंटे गर्म भाप से उपचारित करें। संक्रमित फसल की पेड़ी न रखें।',
        organicTip: 'Spray 5% neem seed kernel extract (NSKE) to suppress aphid populations naturally.',
        organicTipKn: 'ಹೇನುಗಳ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ 5% ಬೇವಿನ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'माहू की रोकथाम के लिए 5% नीम के बीज का अर्क छिड़कें।',
        fertilizer: 'Apply Ferrous Sulphate (FeSO4) @ 25 kg/ha with 50 kg FYM to alleviate severe chlorosis.',
        fertilizerKn: 'ಹಳದಿ ರೋಗ ನಿವಾರಿಸಲು ಹೆಕ್ಟೇರ್‌ಗೆ Ferrous Sulphate @ 25 kg ಗೊಬ್ಬರದೊಂದಿಗೆ ಬೆರೆಸಿ ನೀಡಿ.',
        fertilizerHi: 'पीलापन दूर करने के लिए प्रति हेक्टेयर Ferrous Sulphate @ 25 kg सड़ी खाद में मिलाकर दें।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#16a34a',
        keyTakeaways: [
          'Profuse sprouting of thin, crowded, chlorotic tillers from base giving a bushy grass-like appearance',
          'Canes do not form or remain extremely thin and stunted with nil sugar recovery',
          'Aphid-transmitted phytoplasma; strictly use tissue-cultured disease-free planting material'
        ],
        keyTakeawaysKn: [
          'ಬುಡದಿಂದ ಅಸಂಖ್ಯಾತ ತೆಳ್ಳನೆಯ ಹಳದಿ ಚಿಗುರುಗಳು ಒಡೆದು ಕಬ್ಬು ಹುಲ್ಲಿನ ಪೊದೆಯಂತೆ ಕಾಣುತ್ತದೆ',
          'ಕಬ್ಬು ಗಂಟು ಕಟ್ಟುವುದಿಲ್ಲ ಅಥವಾ ಅತ್ಯಂತ ತೆಳ್ಳಗಾಗಿ ಸಕ್ಕರೆ ಇಳುವರಿ ಶೂನ್ಯವಾಗುತ್ತದೆ',
          'ಹೇನುಗಳಿಂದ ಹರಡುವ ರೋಗ; ಕಡ್ಡಾಯವಾಗಿ ಅಂಗಾಂಶ ಕೃಷಿಯ ರೋಗಮುಕ್ತ ಕಬ್ಬನ್ನು ಬೆಳೆಯಿರಿ'
        ],
        keyTakeawaysHi: [
          'तने के आधार से बहुत पतले, पीले कल्ले घने गुच्छों में निकलते हैं और घास का झाड़ बन जाते हैं',
          'गन्ने नहीं बनते या बिल्कुल पतले रह जाते हैं जिससे चीनी का उत्पादन शून्य हो जाता है',
          'माहू द्वारा फैलता है; हमेशा प्रमाणित टिशू कल्चर पौध का ही उपयोग करें'
        ],
        products: [
          { name: 'Dimethoate 30 EC', type: 'chemical', brand: 'Rogor', price: '₹280 – ₹420 / 500mL', query: 'Dimethoate 30 EC Rogor' },
          { name: 'Ferrous Sulphate 19% Fe', type: 'fertilizer', brand: 'Multiplex / Agri Grade', price: '₹320 – ₹450 / 10kg', query: 'Ferrous Sulphate agriculture' }
        ]
      },
      {
        disease: 'Early Shoot Borer (Chilo infuscatellus)',
        diseaseKn: 'ಕಬ್ಬಿನ ಮುಂಚಿನ ಸುಳಿ ಕೊರೆಯುವ ಹುಳು',
        diseaseHi: 'गन्ना प्ररोह छेदक (अगेती तना छेदक)',
        severity: 'High',
        remedy: 'Apply Chlorantraniliprole 18.5 SC @ 0.4 mL/L or Fipronil 0.3% GR @ 10 kg/acre in furrows at planting, or spray Chlorantraniliprole 18.5 SC at 35–40 days.',
        remedyKn: 'ನಾಟಿ ವೇಳೆ ಸಾಲಿನಲ್ಲಿ Fipronil 0.3% GR @ 10 kg/acre ಹರಳುಗಳನ್ನು ಹಾಕಿ ಅಥವಾ 35–40 ದಿನಗಳಲ್ಲಿ Chlorantraniliprole 18.5 SC @ 0.4 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'बुवाई के समय Fipronil 0.3% GR @ 10 kg/एकड़ कूड़ों में डालें या 35-40 दिन पर Chlorantraniliprole 18.5 SC @ 0.4 mL/L का छिड़काव करें।',
        prevention: 'Trash mulching @ 3 t/ha at 3 days after planting. Earthing up at 45 days after planting.',
        preventionKn: 'ನಾಟಿಯ 3 ದಿನಗಳಲ್ಲಿ ಎಕರೆಗೆ 1.5 ಟನ್ ಕಬ್ಬಿನ ರವದಿಯನ್ನು ಹೊದಿಸಿ. 45 ದಿನಗಳಲ್ಲಿ ಮಣ್ಣು ಏರಿಸಿ.',
        preventionHi: 'बुवाई के 3 दिन बाद गन्ने की सूखी पत्तियों की मल्चिंग करें। 45 दिन पर पौधों पर मिट्टी चढ़ाएं।',
        organicTip: 'Release egg parasitoid Trichogramma chilonis @ 50,000/acre at weekly intervals from 30 days of planting.',
        organicTipKn: 'ನಾಟಿಯ 30 ದಿನಗಳಿಂದ ವಾರಕ್ಕೊಮ್ಮೆ Trichogramma chilonis ಪರಾವಲಂಬಿಗಳನ್ನು ಎಕರೆಗೆ 50,000 ದಂತೆ ಬಿಡಿ.',
        organicTipHi: 'बुवाई के 30 दिन बाद Trichogramma chilonis @ 50,000/एकड़ साप्ताहिक दर से खेत में छोड़ें।',
        fertilizer: 'Avoid excessive nitrogen in early growth; apply recommended Potash at tillering.',
        fertilizerKn: 'ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾರಜನಕ ಹಾಕಬೇಡಿ; ಕವಲೊಡೆಯುವ ಹಂತದಲ್ಲಿ ಪೊಟ್ಯಾಶ್ ನೀಡಿ.',
        fertilizerHi: 'शुरुआत में ज्यादा यूरिया न दें; कल्ले फूटते समय पोटाश खाद अवश्य दें।',
        scheme: 'Raitha Samparka Kendra Biocontrol Distribution',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Larva bores into shoot at or near ground level causing "dead heart" in shoots up to 3 months old',
          'Dead heart comes out easily when pulled and emits an offensive rotting smell',
          'Trash mulching reduces borer incidence by 60% and conserves soil moisture'
        ],
        keyTakeawaysKn: [
          'ಹುಳುವು ನೆಲಮಟ್ಟದಲ್ಲಿ ಕಾಂಡವನ್ನು ಕೊರೆದು 3 ತಿಂಗಳೊಳಗಿನ ಎಳೆ ಸುಳಿಗಳನ್ನು ಒಣಗಿಸುತ್ತದೆ ("ಡೆಡ್ ಹಾರ್ಟ್")',
          'ಒಣಗಿದ ಸುಳಿಯನ್ನು ಎಳೆದಾಗ ಸುಲಭವಾಗಿ ಕಿತ್ತುಬರುತ್ತದೆ ಮತ್ತು ಕೊಳೆತ ವಾಸನೆ ಬೀರುತ್ತದೆ',
          'ಕಬ್ಬಿನ ರವದಿಯ ಹೊದಿಕೆ ಮಾಡುವುದರಿಂದ ಹುಳುವಿನ ಬಾಧೆ ಶೇ. 60ರಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ ಮತ್ತು ತೇವಾಂಶ ಉಳಿಯುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'कीट जमीन की सतह के पास तने में छेद करके 3 महीने तक के पौधों में "डेड हार्ट" बनाता है',
          'मुरझाया अगोला खींचने पर आसानी से निकल आता है और बदबू मारता है',
          'सूखी पत्तियों की मल्चिंग से 60% तक कीट घटता है और जमीन में नमी भी बनी रहती है'
        ],
        products: [
          { name: 'Chlorantraniliprole 18.5 SC (Coragen)', type: 'chemical', brand: 'FMC Coragen', price: '₹850 – ₹1,150 / 60mL', query: 'Chlorantraniliprole 18.5 SC' },
          { name: 'Fipronil 0.3% GR', type: 'chemical', brand: 'Regent (Bayer) / Mortar', price: '₹420 – ₹580 / 5kg', query: 'Fipronil 0.3 GR' }
        ]
      },
      {
        disease: 'Pokkah Boeng (Fusarium moniliforme)',
        diseaseKn: 'ಕಬ್ಬಿನ ಪೊಕ್ಕಾ ಬೋಯಿಂಗ್ ರೋಗ (ತಿರುಚು ರೋಗ)',
        diseaseHi: 'गन्ना पोक्का बोइंग रोग (शीर्ष विरूपण)',
        severity: 'Medium',
        remedy: 'Spray Copper Oxychloride 50 WP @ 2.5 g/L or Carbendazim 50 WP @ 1 g/L at the onset of monsoon drizzles.',
        remedyKn: 'ಮುಂಗಾರು ಮಳೆ ಆರಂಭವಾದ ತಕ್ಷಣ Copper Oxychloride 50 WP @ 2.5 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'मानसून की पहली फुहारों के साथ Copper Oxychloride 50 WP @ 2.5 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।',
        prevention: 'Avoid highly susceptible varieties like Co 0238. Remove top-rot infected canes.',
        preventionKn: 'Co 0238 ರಂತಹ ಅತಿಯಾಗಿ ರೋಗ ತಗಲುವ ತಳಿಗಳನ್ನು ತಪ್ಪಿಸಿ. ತೀವ್ರವಾಗಿ ಕೊಳೆತ ಕಬ್ಬನ್ನು ತೆಗೆದುಹಾಕಿ.',
        preventionHi: 'Co 0238 जैसी अति-संवेदनशील किस्मों से बचें। गंभीर रूप से सड़े पौधों को उखाड़कर फेंकें।',
        organicTip: 'Foliar spray of Trichoderma harzianum @ 5 g/L with 2% cow urine.',
        organicTipKn: 'Trichoderma harzianum @ 5 g/L ಜೊತೆಗೆ 2% ಗೋಮೂತ್ರ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'Trichoderma harzianum @ 5 g/L के साथ 2% गोमूत्र मिलाकर पत्तियों पर छिड़कें।',
        fertilizer: 'Spray 1% Urea + 1% Potassium Nitrate (13:0:45) after controlling fungal growth to recover shoot vigor.',
        fertilizerKn: 'ಶಿಲೀಂಧ್ರ ನಿಯಂತ್ರಣದ ನಂತರ ಕಬ್ಬಿನ ಚೇತರಿಕೆಗೆ 1% ಯೂರಿಯಾ + 1% ಪೊಟ್ಯಾಶಿಯಂ ನೈಟ್ರೇಟ್ (13:0:45) ಸಿಂಪಡಿಸಿ.',
        fertilizerHi: 'फफूंद नियंत्रण के बाद 1% यूरिया + 1% पोटेशियम नाइट्रेट (13:0:45) का छिड़काव करें।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#ca8a04',
        keyTakeaways: [
          'Chlorosis at leaf base, with leaves becoming crumpled, twisted, deformed, and shortened',
          'In severe "top rot" stage, the growing shoot rots completely with reddish lesions',
          'Airborne fungus triggers infection during hot humid cloudy monsoon periods'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಬುಡದಲ್ಲಿ ಹಳದಿಯಾಗಿ, ಎಲೆಗಳು ಸುಕ್ಕುಗಟ್ಟಿ, ತಿರುಚಿಕೊಂಡು ಗಿಡ್ಡವಾಗುತ್ತವೆ',
          'ತೀವ್ರ ಹಂತದಲ್ಲಿ (ಟಾಪ್ ರೊಟ್) ಸುಳಿಯು ಸಂಪೂರ್ಣವಾಗಿ ಕೊಳೆತು ಕೆಂಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ಉಷ್ಣ ಮತ್ತು ಮೋಡ ಕವಿದ ಮುಂಗಾರು ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಗಾಳಿಯ ಮೂಲಕ ಈ ರೋಗ ಹರಡುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों का आधार पीला पड़ जाता है और पत्तियां मुड़कर, सिकुड़कर छोटी रह जाती हैं',
          'गंभीर अवस्था (टॉप रॉट) में अगोला पूरी तरह सड़ जाता है और लाल धारियां बनती हैं',
          'गर्म और नम बादलों वाले मानसून के मौसम में हवा द्वारा यह संक्रमण तेजी से फैलता है'
        ],
        products: [
          { name: 'Copper Oxychloride 50 WP', type: 'chemical', brand: 'Blitox', price: '₹280 – ₹420 / 500g', query: 'Copper Oxychloride 50 WP' },
          { name: 'Potassium Nitrate 13:0:45', type: 'fertilizer', brand: 'Multiplex / Mahafeed', price: '₹160 – ₹240 / 1kg', query: 'Potassium Nitrate 13 0 45' }
        ]
      }
    ]
  },

  // ── 3. COCONUT ──
  {
    crop: 'Coconut (ತೆಂಗು / नारियल)',
    cropKn: 'ತೆಂಗು',
    cropHi: 'नारियल',
    emoji: '🥥',
    diseases: [
      {
        disease: 'Rhinoceros Beetle (Oryctes rhinoceros)',
        diseaseKn: 'ಕಪ್ಪು ಕೊಂಬಿನ ಜೀರುಂಡೆ (ರೈನೋಸಿರಸ್ ಜೀರುಂಡೆ)',
        diseaseHi: 'गैंडा भृंग (राइनोसेरोस बीटल)',
        severity: 'High',
        remedy: 'Extract beetles from crown with hooked wire. Place 3 Naphthalene balls (3.5g each) covered with fine sand in bottom 2-3 leaf axils every 45 days.',
        remedyKn: 'ಕೊಕ್ಕೆ ತಂತಿಯಿಂದ ಜೀರುಂಡೆಯನ್ನು ಸುಳಿಯಿಂದ ಹೊರತೆಗೆಯಿರಿ. 2-3 ಎಲೆಗಳ ಬುಡದಲ್ಲಿ ತಲಾ 3 ಡಾಂಬರ್ ಗುಳಿಗೆಗಳನ್ನು ಮರಳಿನೊಂದಿಗೆ ಮುಚ್ಚಿ ಇಡಿ.',
        remedyHi: 'तार के हुक से बीटल को बाहर निकालें। पत्तियों के आधार पर 3 नेफ़थलीन की गोलियां (डामर गोली) रेत से ढककर रखें।',
        prevention: 'Treat farmyard manure pits with Carbaryl 50 WP @ 0.1% or Metarhizium anisopliae to destroy grubs.',
        preventionKn: 'ತಿಪ್ಪೆ ಗುಂಡಿಗಳಿಗೆ Metarhizium anisopliae ಶಿಲೀಂಧ್ರ ಸಿಂಪಡಿಸಿ ಜೀರುಂಡೆಯ ಮರಿಗಳನ್ನು ನಾಶಮಾಡಿ.',
        preventionHi: 'गोबर के गड्ढों में Metarhizium anisopliae डालकर ग्रब (सूंड़ियों) को नष्ट करें।',
        organicTip: 'Spray green muscardine fungus Metarhizium anisopliae @ 5x10^11 spores/m3 of manure pits.',
        organicTipKn: 'ತಿಪ್ಪೆ ಗೊಬ್ಬರದ ಗುಂಡಿಗೆ Metarhizium anisopliae ಹಸಿರು ಶಿಲೀಂಧ್ರವನ್ನು ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'खाद के गड्ढों पर Metarhizium anisopliae फफूंद का छिड़काव करें।',
        fertilizer: 'Apply balanced NPK: 500g N, 320g P2O5, 1200g K2O + 1 kg Magnesium Sulphate per palm/year.',
        fertilizerKn: 'ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕವಾಗಿ 500g N, 320g P, 1200g K ಜೊತೆಗೆ 1 kg ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ ನೀಡಿ.',
        fertilizerHi: 'प्रति पेड़ प्रति वर्ष 500g N, 320g P, 1200g K और 1 kg मैग्नीशियम सल्फेट दें।',
        scheme: 'Coconut Development Board (CDB) Rejuvenation Programme',
        schemeLink: 'https://coconutboard.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'V-shaped or diamond geometric cuts on opened fronds caused by beetle chewing unopened tender spear',
          'Fibrous frass visible at entry borehole in crown',
          'Install Rhinolure pheromone traps @ 1 trap per 2 hectares'
        ],
        keyTakeawaysKn: [
          'ತೆರೆದ ಗರಿಗಳ ಮೇಲೆ ಇಂಗ್ಲಿಷ್ ‘V’ ಆಕಾರದ ಜ್ಯಾಮಿತೀಯ ಕತ್ತರಿಸಿದ ರಂಧ್ರಗಳು ಕಾಣಿಸುತ್ತವೆ',
          'ಸುಳಿಯ ಬುಡದಲ್ಲಿ ಕತ್ತರಿಸಿದ ತೆಂಗಿನ ನಾರು ಮತ್ತು ಪುಡಿ ಕಂಡುಬರುತ್ತದೆ',
          'ಪ್ರತಿ 2 ಹೆಕ್ಟೇರ್‌ಗೆ ಒಂದರಂತೆ ರೈನೋಲ್ಯೂರ್ ಮೋಹಕ ಬಲೆಯನ್ನು ಅಳವಡಿಸಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियों पर अंग्रेजी के ‘V’ आकार के कटे हुए निशान दिखाई देते हैं',
          'पेड़ के शीर्ष पर बोर किए गए छेद से चबाया हुआ रेशा बाहर निकलता है',
          'प्रति 2 हेक्टेयर में एक राइनोल्यूर फेरोमोन ट्रैप अवश्य लगाएं'
        ],
        products: [
          { name: 'Naphthalene Balls (100% Pure)', type: 'chemical', brand: 'Commercial Pure', price: '₹120 – ₹180 / 500g', query: 'Naphthalene balls agriculture' },
          { name: 'Metarhizium anisopliae Bio-Agent', type: 'organic', brand: 'Bio-Control Lab', price: '₹190 – ₹270 / 1kg', query: 'Metarhizium anisopliae 1kg' },
          { name: 'Rhinolure Pheromone Trap', type: 'organic', brand: 'CDB / Pest Control', price: '₹280 – ₹420 / trap', query: 'Rhinoceros beetle pheromone trap' }
        ]
      },
      {
        disease: 'Coconut Bud Rot (Phytophthora palmivora)',
        diseaseKn: 'ತೆಂಗಿನ ಸುಳಿ ಕೊಳೆ ರೋಗ',
        diseaseHi: 'नारियल कली सड़न रोग (बड रॉट)',
        severity: 'High',
        remedy: 'Remove all rotten tissues from central spear. Apply Bordeaux paste (10%) to the cut surface and cover with a perforated polythene cap. Spray 1% Bordeaux mixture on surrounding palms.',
        remedyKn: 'ಕೊಳೆತ ಭಾಗಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತೆಗೆದು 10% ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಲೇಪಿಸಿ. ಸುತ್ತಮುತ್ತಲಿನ ಮರಗಳಿಗೆ 1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'सड़ा हुआ भाग साफ करके 10% बोर्डो पेस्ट लगाएं और प्लास्टिक से ढकें। आसपास के पेड़ों पर 1% बोर्डो मिश्रण छिड़कें।',
        prevention: 'Prophylactic application of 1% Bordeaux mixture before onset of South-West monsoon in May-June.',
        preventionKn: 'ಮುಂಗಾರು ಮಳೆ ಆರಂಭವಾಗುವ ಮುನ್ನ ಮೇ-ಜೂನ್ ತಿಂಗಳಲ್ಲಿ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಸುಳಿಗೆ ಸಿಂಪಡಿಸಿ.',
        preventionHi: 'मानसून शुरू होने से पहले मई-जून में 1% बोर्डो मिश्रण का सुझाई गई मात्रा में छिड़काव करें।',
        organicTip: 'Placement of two Trichoderma viride sachets (10g each) in inner leaf axils of crown.',
        organicTipKn: 'ಸುಳಿಯ ಬುಡದ ಗರಿಗಳಲ್ಲಿ Trichoderma viride ಪೊಟ್ಟಣಗಳನ್ನು ಇರಿಸಿ.',
        organicTipHi: 'पेड़ के शीर्ष पर Trichoderma viride के 2 पाउच रखें।',
        fertilizer: 'Apply 1 kg MOP and 500g Magnesium Sulphate per palm before monsoon to strengthen crown tissues.',
        fertilizerKn: 'ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಮರಕ್ಕೆ 1 kg ಪೊಟ್ಯಾಶ್ ಮತ್ತು 500g ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ ನೀಡಿ.',
        fertilizerHi: 'मानसून से पहले प्रति पेड़ 1 kg पोटाश और 500g मैग्नीशियम सल्फेट दें।',
        scheme: 'CDB Coconut Palm Insurance Scheme (CPIS)',
        schemeLink: 'https://coconutboard.gov.in/',
        color: '#b91c1c',
        keyTakeaways: [
          'Central spear leaf turns pale, bends over, withers, and rots with foul smell',
          'The entire crown dies once the central bud disintegrates',
          'Immediate action before the spindle rots saves the tree'
        ],
        keyTakeawaysKn: [
          'ಮರದ ನಡುಸುಳಿ ಹಳದಿಯಾಗಿ, ಬಾಗಿ, ಕೊಳೆತು ದುರ್ವಾಸನೆ ಬೀರುತ್ತದೆ',
          'ಸುಳಿಯು ಸಂಪೂರ್ಣವಾಗಿ ಕೊಳೆತರೆ ಇಡೀ ಮರವೇ ಸತ್ತುಹೋಗುತ್ತದೆ',
          'ಸುಳಿಯು ಸಂಪೂರ್ಣ ನಾಶವಾಗುವ ಮುನ್ನವೇ ಚಿಕಿತ್ಸೆ ನೀಡಿದರೆ ಮರವನ್ನು ಉಳಿಸಬಹುದು'
        ],
        keyTakeawaysHi: [
          'बीच की मुख्य कली पीली होकर झुक जाती है और सड़ी बदबू आने लगती है',
          'एक बार मुख्य कली नष्ट हो जाने पर पूरा नारियल का पेड़ मर जाता है',
          'शुरुआती लक्षण दिखते ही बोर्डो पेस्ट लगाकर पेड़ को बचाया जा सकता है'
        ],
        products: [
          { name: 'Copper Sulphate (Neela Thotha) for Bordeaux', type: 'chemical', brand: 'Agri Copper Blue', price: '₹240 – ₹360 / 1kg', query: 'Copper Sulphate agriculture blue' },
          { name: 'Bordeaux Mixture Readymade 1%', type: 'chemical', brand: 'Bordo-Ready / Aries', price: '₹190 – ₹290 / 1kg', query: 'Bordeaux mixture ready to use' }
        ]
      },
      {
        disease: 'Basal Stem Rot / Ganoderma Wilt (Ganoderma lucidum)',
        diseaseKn: 'ಅಣಬೆ ರೋಗ (ಕಾಂಡ ಕೊಳೆ / ಗ್ಯಾನೋಡರ್ಮಾ)',
        diseaseHi: 'नारियल तना विगलन (गैनोडर्मा उकठा)',
        severity: 'High',
        remedy: 'Root feeding with Hexaconazole 5 SC @ 2% (20 mL in 100 mL water) per palm at quarterly intervals. Apply 5 kg neem cake + 50g Trichoderma harzianum to soil basin.',
        remedyKn: 'ಪ್ರತಿ 3 ತಿಂಗಳಿಗೊಮ್ಮೆ 20 mL Hexaconazole 5 SC ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ (ರೂಟ್ ಫೀಡಿಂಗ್). ಮರದ ಬುಡಕ್ಕೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು Trichoderma ಹಾಕಿ.',
        remedyHi: 'हर 3 महीने में 20 mL Hexaconazole 5 SC को 100 mL पानी में मिलाकर जड़ द्वारा दें (रूट फीडिंग)। 5 kg नीम की खली और ट्राइकोडर्मा डालें।',
        prevention: 'Isolate affected palms by digging isolation trenches (1m deep, 30cm wide) around basin.',
        preventionKn: 'ರೋಗ ಹರಡದಂತೆ ಮರದ ಸುತ್ತಲೂ 1 ಮೀಟರ್ ಆಳದ ಪ್ರತ್ಯೇಕ ಕಂದಕವನ್ನು (ಐಸೊಲೇಶನ್ ಟ್ರೆಂಚ್) ನಿರ್ಮಿಸಿ.',
        preventionHi: 'संक्रमित पेड़ के चारों ओर 1 मीटर गहरा गड्ढा खोदकर अन्य पेड़ों से अलग करें।',
        organicTip: 'Soil application of Trichoderma viride @ 50g enriched in 50 kg farmyard manure and 5 kg neem cake.',
        organicTipKn: '50 kg ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು 5 kg ಬೇವಿನ ಹಿಂಡಿಯಲ್ಲಿ 50g Trichoderma ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ನೀಡಿ.',
        organicTipHi: '50 kg सड़ी गोबर खाद और 5 kg नीम खली में 50g Trichoderma मिलाकर जड़ में डालें।',
        fertilizer: 'Supply abundant Potassium (1.5 kg MOP/palm/year) and avoid waterlogging.',
        fertilizerKn: 'ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕ 1.5 kg ಪೊಟ್ಯಾಶ್ ನೀಡಿ ಮತ್ತು ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        fertilizerHi: 'प्रति वर्ष 1.5 kg पोटाश दें और जलजमाव बिल्कुल न होने दें।',
        scheme: 'Karnataka Horticulture Department Disaster Management Support',
        schemeLink: 'https://horticulturedir.karnataka.gov.in/',
        color: '#7f1d1d',
        keyTakeaways: [
          'Dark reddish-brown gummy bleeding patches at the base of the trunk up to 1.5 meters',
          'Bracket-like woody Ganoderma mushrooms appear at trunk base in terminal stages',
          'Root feeding arrests infection if initiated before crown wilting'
        ],
        keyTakeawaysKn: [
          'ಕಾಂಡದ ಕೆಳಭಾಗದಲ್ಲಿ 1.5 ಮೀಟರ್ ಎತ್ತರದವರೆಗೆ ಕೆಂಪು-ಕಂದು ಅಂಟು ರಸ ಸೋರುತ್ತದೆ',
          'ಕೊನೆಯ ಹಂತದಲ್ಲಿ ಮರದ ಬುಡದಲ್ಲಿ ಗಟ್ಟಿಯಾದ ಅಣಬೆಗಳು ಬೆಳೆಯುತ್ತವೆ',
          'ಗರಿಗಳು ಒಣಗುವ ಮುನ್ನವೇ ಬೇರಿನ ಮೂಲಕ ಔಷಧಿ ನೀಡಿದರೆ ರೋಗ ನಿಯಂತ್ರಿಸಬಹುದು'
        ],
        keyTakeawaysHi: [
          'तने के निचले हिस्से पर 1.5 मीटर तक गाढ़ा लाल-भूरा गोंद जैसा स्राव निकलता है',
          'अंतिम अवस्था में तने के आधार पर कड़े गैनोडर्मा मशरूम उग आते हैं',
          'अगले चरण में जाने से पहले जड़ द्वारा दवा (रूट फीडिंग) देने से पेड़ बच सकता है'
        ],
        products: [
          { name: 'Hexaconazole 5 SC', type: 'chemical', brand: 'Contaf Plus', price: '₹280 – ₹420 / 500mL', query: 'Hexaconazole 5 SC Contaf' },
          { name: 'Neem Cake (Pure Organic)', type: 'organic', brand: 'Bio Neem Cake', price: '₹950 – ₹1,350 / 50kg', query: 'Neem cake fertilizer 50kg' }
        ]
      },
      {
        disease: 'Red Palm Weevil (Rhynchophorus ferrugineus)',
        diseaseKn: 'ಕೆಂಪು ಮೂತಿ ಹುಳು (ರೆಡ್ ಪಾಮ್ ವೀವಿಲ್)',
        diseaseHi: 'लाल ताड़ घुन (रेड पाम वीविल)',
        severity: 'High',
        remedy: 'Stem injection / root feeding with Imidacloprid 17.8 SL @ 10 mL in 100 mL water. Close borehole with cement or clay. Set up Ferrolure pheromone traps @ 1 trap/hectare.',
        remedyKn: '10 mL Imidacloprid 17.8 SL ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ ಅಥವಾ ಕಾಂಡಕ್ಕೆ ಇಂಜೆಕ್ಷನ್ ಮಾಡಿ. ರಂಧ್ರವನ್ನು ಸಿಮೆಂಟ್‌ನಿಂದ ಮುಚ್ಚಿ.',
        remedyHi: '10 mL Imidacloprid 17.8 SL को 100 mL पानी में मिलाकर तने में इंजेक्शन दें या जड़ द्वारा दें। छेद को सीमेंट से बंद करें।',
        prevention: 'Avoid cutting green leaves leaving petiole bases. Treat all mechanical wounds with coal tar or copper paste immediately.',
        preventionKn: 'ಹಸಿರು ಗರಿಗಳನ್ನು ಕತ್ತರಿಸಬೇಡಿ. ಯಾವುದೇ ಗಾಯಗಳಾದರೆ ತಕ್ಷಣ ಕೋಲ್‌ಟಾರ್ ಅಥವಾ ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಲೇಪಿಸಿ.',
        preventionHi: 'हरी पत्तियों को न काटें। किसी भी घाव पर तुरंत कोलतार या बोर्डो पेस्ट लगाएं।',
        organicTip: 'Install bucket pheromone traps baited with Ferrolure + fermented sugarcane juice / yeast.',
        organicTipKn: 'ಫೆರೋಲೂರ್ ಜೊತೆಗೆ ಕಬ್ಬಿನ ಹಾಲು ಅಥವಾ ಯೀಸ್ಟ್ ಮಿಶ್ರಣದ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
        organicTipHi: 'फेरोलूर और गन्ने के रस से युक्त फेरोमोन बकेट ट्रैप लगाएं।',
        fertilizer: 'Maintain tree health with complete organic micronutrient basin management.',
        fertilizerKn: 'ಮರಗಳಿಗೆ ಅಗತ್ಯ ಪೋಷಕಾಂಶ ಹಾಗೂ ಲಘು ಪೋಷಕಾಂಶ ನೀಡಿ ಆರೋಗ್ಯ ಕಾಪಾಡಿ.',
        fertilizerHi: 'संतुलित खाद देकर पेड़ को स्वस्थ रखें।',
        scheme: 'Coconut Development Board Pest Relief Scheme',
        schemeLink: 'https://coconutboard.gov.in/',
        color: '#b45309',
        keyTakeaways: [
          'Hidden trunk internal feeder; gnawing sound can be heard by placing ear against the trunk',
          'Thick brown liquid oozes from tiny holes on trunk with chewed fibrous frass sticking out',
          'Pheromone trapping captures adult weevils before they lay eggs inside leaf axils'
        ],
        keyTakeawaysKn: [
          'ಕಾಂಡದ ಒಳಭಾಗದಲ್ಲೇ ತಿನ್ನುವ ಕೀಟ; ಕಾಂಡಕ್ಕೆ ಕಿವಿಗೊಟ್ಟಾಗ ಅಗಿಯುವ ಶಬ್ದ ಕೇಳಿಸುತ್ತದೆ',
          'ಕಾಂಡದ ರಂಧ್ರಗಳಿಂದ ಕಂದು ದ್ರವ ಮತ್ತು ಚೂಪಾದ ನಾರಿನ ಪುಡಿ ಹೊರಬರುತ್ತದೆ',
          'ಮೊಟ್ಟೆ ಇಡುವ ಮುನ್ನವೇ ವಯಸ್ಕ ಮೂತಿ ಹುಳುಗಳನ್ನು ಹಿಡಿಯಲು ಫೆರೋಮೊನ್ ಬಲೆಗಳನ್ನು ಬಳಸಿ'
        ],
        keyTakeawaysHi: [
          'तने के भीतर छिपकर खाता है; तने पर कान लगाने से चबाने की आवाज साफ सुनाई देती है',
          'तने के छेदों से भूरा तरल और चबाया हुआ रेशा बाहर निकलता दिखाई देता है',
          'अंडे देने से पहले ही वयस्कों को पकड़ने के लिए फेरोमोन ट्रैप लगाएं'
        ],
        products: [
          { name: 'Imidacloprid 17.8 SL', type: 'chemical', brand: 'Confidor / Tata Mida', price: '₹240 – ₹380 / 100mL', query: 'Imidacloprid 17.8 SL' },
          { name: 'Ferrolure Weevil Pheromone Trap', type: 'organic', brand: 'CDB Trap', price: '₹320 – ₹480 / trap', query: 'Red palm weevil pheromone trap lure' }
        ]
      },
      {
        disease: 'Coconut Eriophyid Mite (Aceria guerreronis)',
        diseaseKn: 'ತೆಂಗಿನ ಮೊಗ್ಗು ನುಸಿ (ಎರಿಯೋಫೈಡ್ ನುಸಿ)',
        diseaseHi: 'नारियल माइट (एरियोफिड माइट)',
        severity: 'Medium',
        remedy: 'Root feeding with Azadirachtin 10000 PPM (1%) @ 10 mL in 100 mL water or spray Propargite 57 EC @ 2 mL/L directed onto young buttons (1-3 months old).',
        remedyKn: '10 mL Azadirachtin (10000 PPM) ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ ಅಥವಾ ಸಣ್ಣ ಕಾಯಿಗಳಿಗೆ (1-3 ತಿಂಗಳ) Propargite 57 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: '10 mL Azadirachtin (10000 PPM) को 100 mL पानी में मिलाकर जड़ द्वारा दें या 1-3 महीने की बत्तियों पर Propargite 57 EC @ 2 mL/L का छिड़काव करें।',
        prevention: 'Maintain crown hygiene. Spray water on bunches during dry summer to increase humidity.',
        preventionKn: 'ಗರಿಗಳ ಬುಡವನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ. ಬೇಸಿಗೆಯಲ್ಲಿ ಕಾಯಿಗಳ ಗೊಂಚಲುಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸಿ ತೇವಾಂಶ ಕಾಪಾಡಿ.',
        preventionHi: 'पेड़ का शीर्ष साफ रखें। गर्मियों में फल के गुच्छों पर पानी छिड़कें।',
        organicTip: 'Foliar spray of Neem garlic emulsion (2% neem oil + 20g crushed garlic + 5g soap) on young bunches.',
        organicTipKn: 'ಬೇವಿನ ಎಣ್ಣೆ (2%) + ಬೆಳ್ಳುಳ್ಳಿ ಕಷಾಯದ ಮಿಶ್ರಣವನ್ನು ಸಣ್ಣ ಕಾಯಿಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'नीम का तेल (2%) और लहसुन के अर्क का घोल छोटे फलों के गुच्छों पर छिड़कें।',
        fertilizer: 'Apply 1 kg Urea, 1.5 kg DAP, 2 kg MOP, and 50 kg FYM per palm annually to rebuild nut size.',
        fertilizerKn: 'ಕಾಯಿಗಳ ಗಾತ್ರ ಹೆಚ್ಚಿಸಲು ವಾರ್ಷಿಕ 1 kg ಯೂರಿಯಾ, 1.5 kg DAP, 2 kg MOP ಮತ್ತು 50 kg ತಿಪ್ಪೆ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'फलों का आकार बढ़ाने के लिए 1 kg यूरिया, 1.5 kg DAP, 2 kg MOP और 50 kg गोबर खाद दें।',
        scheme: 'Coconut Palm Insurance & Quality Enhancement Subsidy',
        schemeLink: 'https://coconutboard.gov.in/',
        color: '#ca8a04',
        keyTakeaways: [
          'Pale triangular yellowish-white patches under the perianth (calyx cup) of buttons turning into dark brown warty fissures',
          'Nuts become malformed, stunted, and split with severe shedding of young buttons',
          'Apply neem formulations under calyx tepals where microscopic mites reside'
        ],
        keyTakeawaysKn: [
          'ಸಣ್ಣ ಕಾಯಿಗಳ ತೊಟ್ಟಿನ ಕೆಳಭಾಗದಲ್ಲಿ ತ್ರಿಕೋನಾಕಾರದ ಬಿಳಿ-ಹಳದಿ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ನಂತರ ಕಂದು ಬಣ್ಣದ ಬಿರುಕುಗಳಾಗುತ್ತವೆ',
          'ಕಾಯಿಗಳು ವಿಕಾರಗೊಂಡು, ಸಣ್ಣದಾಗಿ, ಬಿರುಕು ಬಿಟ್ಟು ಉದುರಿಹೋಗುತ್ತವೆ',
          'ಸೂಕ್ಷ್ಮ ನುಸಿಗಳು ಅಡಗಿರುವ ತೊಟ್ಟಿನ ಕೆಳಭಾಗಕ್ಕೆ ತಲುಪುವಂತೆ ಬೇವಿನ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ'
        ],
        keyTakeawaysHi: [
          'फल की टोपी (कैलिक्स) के नीचे त्रिकोणीय पीले धब्बे बनते हैं जो बाद में भूरी दरारें बन जाते हैं',
          'नारियल टेढ़े-मेढ़े और छोटे रह जाते हैं तथा समय से पहले झड़ जाते हैं',
          'टोपी के नीचे जहां सूक्ष्म माइट्स छिपे होते हैं, वहां नीम के तेल का छिड़काव करें'
        ],
        products: [
          { name: 'Propargite 57 EC', type: 'chemical', brand: 'Omite (Dhanuka)', price: '₹480 – ₹680 / 500mL', query: 'Propargite 57 EC Omite' },
          { name: 'Neem Oil 10000 PPM (Azadirachtin 1%)', type: 'organic', brand: 'Eco-Neem', price: '₹280 – ₹420 / 1L', query: 'Neem oil agriculture 10000 ppm' }
        ]
      }
    ]
  },

  // ── 4. ARECANUT ──
  {
    crop: 'Arecanut (ಅಡಿಕೆ / सुपारी)',
    cropKn: 'ಅಡಿಕೆ',
    cropHi: 'सुपारी (अरेकानट)',
    emoji: '🌴',
    diseases: [
      {
        disease: 'Koleroga / Fruit Rot (Phytophthora meadii)',
        diseaseKn: 'ಕೊಳೆ ರೋಗ (ಮಹಾಳಿ)',
        diseaseHi: 'कोलेरोगा (फल सड़न / महाली रोग)',
        severity: 'High',
        remedy: 'Spray 1% Bordeaux mixture before monsoon (May-June) and repeat at 40-day intervals. Fasten polythene bags (Kovera) over arecanut bunches before heavy rains.',
        remedyKn: 'ಮುಂಗಾರು ಆರಂಭಕ್ಕೆ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ (ಮೇ-ಜೂನ್) ಮತ್ತು 40 ದಿನಗಳ ನಂತರ ಪುನರಾವರ್ತಿಸಿ. ಗೊನೆಗಳಿಗೆ ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲಗಳನ್ನು (ಕೋವರ) ಕಟ್ಟಿ ರಕ್ಷಿಸಿ.',
        remedyHi: 'मानसून से पहले (मई-जून) 1% बोर्डो मिश्रण का छिड़काव करें और 40 दिन बाद दोहराएं। भारी बारिश से पहले गुच्छों को पॉलिथीन कवर (कोवेरा) से बांधें।',
        prevention: 'Cover arecanut bunches with UV-stabilized polythene bags before monsoon onset.',
        preventionKn: 'ಮಳೆಗಾಲ ಆರಂಭವಾಗುವ ಮುನ್ನವೇ ಅಡಿಕೆ ಗೊನೆಗಳಿಗೆ ಕವರ್ (ಕೋವರ) ಕಟ್ಟಿ ರಕ್ಷಣೆ ನೀಡಿ.',
        preventionHi: 'मानसून आने से पहले ही सुपारी के गुच्छों पर यूवी पॉलिथीन कवर बांधें।',
        organicTip: 'Apply Trichoderma viride enriched compost around base of palms before monsoon.',
        organicTipKn: 'ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಬುಡಕ್ಕೆ Trichoderma viride ಬೆರೆಸಿದ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ನೀಡಿ.',
        organicTipHi: 'मानसून से पहले पेड़ों की जड़ों में ट्राइकोडर्मा युक्त सड़ी खाद डालें।',
        fertilizer: 'Apply 100:40:140 g NPK per palm in two split doses (Sept and Jan).',
        fertilizerKn: 'ಪ್ರತಿ ಮರಕ್ಕೆ 100:40:140 g NPK ಗೊಬ್ಬರವನ್ನು ಸೆಪ್ಟೆಂಬರ್ ಮತ್ತು ಜನವರಿಯಲ್ಲಿ ನೀಡಿ.',
        fertilizerHi: 'प्रति पेड़ 100:40:140 g NPK सितंबर और जनवरी में दो बार में दें।',
        scheme: 'CAMPCO & Karnataka Horticulture Koleroga Subsidy Scheme',
        schemeLink: 'https://horticulturedir.karnataka.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Water-soaked dark green lesions at the base of developing nuts followed by massive nut shedding',
          'Fallen nuts show white felt-like fungal growth in moist ground litter',
          'Bunches must be covered with polythene bags or sprayed with Bordeaux before monsoon rains'
        ],
        keyTakeawaysKn: [
          'ಅಡಿಕೆ ಕಾಯಿಗಳ ತೊಟ್ಟಿನ ಬಳಿ ಹಸಿರು-ಕಂದು ನೀರಿನ ಕಲೆಗಳು ಉಂಟಾಗಿ ಕಾಯಿಗಳು ರಾಶಿಯಾಗಿ ಉದುರುತ್ತವೆ',
          'ಉದುರಿದ ಅಡಿಕೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂಷ್ಟು ಆವರಿಸುತ್ತದೆ',
          'ಮಳೆಗಾಲ ಆರಂಭವಾಗುವ ಮುನ್ನವೇ ಗೊನೆಗಳಿಗೆ ಕೋವರ ಕಟ್ಟುವುದು ಅಥವಾ ಬೋರ್ಡೋ ಸಿಂಪಡಿಸುವುದು ಅತ್ಯಗತ್ಯ'
        ],
        keyTakeawaysHi: [
          'सुपारी के डंठल के पास पानीदार धब्बे बनते हैं और कच्ची सुपारियां भारी संख्या में झड़ जाती हैं',
          'जमीन पर गिरी सुपारियों पर सफेद रुई जैसी फफूंद जम जाती है',
          'मानसून से पहले पॉलिथीन कवर बांधना और बोर्डो मिश्रण का छिड़काव ही एकमात्र पक्का उपाय है'
        ],
        products: [
          { name: 'Copper Sulphate (Bordeaux input)', type: 'chemical', brand: 'Agri Copper Blue', price: '₹240 – ₹360 / 1kg', query: 'Copper Sulphate agriculture blue' },
          { name: 'Ready-to-use Bordeaux Mixture 1%', type: 'chemical', brand: 'Bordo-Ready', price: '₹190 – ₹290 / 1kg', query: 'Bordeaux mixture ready to use' },
          { name: 'Arecanut Bunch Polythene Covers (Kovera)', type: 'organic', brand: 'UV Agro Cover', price: '₹350 – ₹480 / 100 bags', query: 'Arecanut bunch cover bag' }
        ]
      },
      {
        disease: 'Yellow Leaf Disease (Phytoplasma)',
        diseaseKn: 'ಅಡಿಕೆ ಹಳದಿ ಎಲೆ ರೋಗ (YLD)',
        diseaseHi: 'सुपारी पीली पत्ती रोग (येलो लीफ डिजीज)',
        severity: 'High',
        remedy: 'Apply 1 kg Magnesium Sulphate + 2 kg Potassium Chloride (MOP) + 12 kg Neem cake per palm annually to arrest symptom spread. Eradicate severely declined palms.',
        remedyKn: 'ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕ 1 kg ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ + 2 kg ಪೊಟ್ಯಾಶ್ + 12 kg ಬೇವಿನ ಹಿಂಡಿ ನೀಡಿ. ಸಂಪೂರ್ಣ ಹಾಳಾದ ಮರಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.',
        remedyHi: 'प्रति वर्ष प्रति पेड़ 1 kg मैग्नीशियम सल्फेट + 2 kg पोटाश + 12 kg नीम की खली दें। अधिक प्रभावित पेड़ों को हटा दें।',
        prevention: 'Maintain excellent drainage during monsoon. Intercrop with banana, pepper, or cocoa to boost microclimate balance.',
        preventionKn: 'ಮಳೆಗಾಲದಲ್ಲಿ ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬಸಿಗಾಲುವೆಗಳನ್ನು ಮಾಡಿ. ಕಾಳುಮೆಣಸು, ಬಾಳೆ ಅಥವಾ ಕೋಕೋ ಮಿಶ್ರಬೆಳೆ ಬೆಳೆಯಿರಿ.',
        preventionHi: 'उत्तम जल निकासी रखें। केले, काली मिर्च या कोको के साथ मिश्रित खेती करें।',
        organicTip: 'Apply 25 kg enriched compost with biofertilizers (VAM + Azospirillum + Phosphobacteria @ 50g each).',
        organicTipKn: 'ಪ್ರತಿ ಮರಕ್ಕೆ 25 kg ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಜೊತೆಗೆ ಜೈವಿಕ ಗೊಬ್ಬರಗಳನ್ನು (VAM + Azospirillum) ಬೆರೆಸಿ ನೀಡಿ.',
        organicTipHi: 'प्रति पेड़ 25 kg सड़ी खाद में VAM और एजोस्पिरिलम जैव उर्वरक मिलाकर डालें।',
        fertilizer: 'Supply micronutrient blend (Zinc + Boron + Manganese @ 100g/palm/year).',
        fertilizerKn: 'ಪ್ರತಿ ಮರಕ್ಕೆ ವಾರ್ಷಿಕ 100g ಲಘು ಪೋಷಕಾಂಶಗಳ ಮಿಶ್ರಣ (Zinc + Boron + Mn) ನೀಡಿ.',
        fertilizerHi: 'प्रति पेड़ 100g सूक्ष्म पोषक तत्व (जिंक + बोरॉन) प्रति वर्ष दें।',
        scheme: 'Special Arecanut Yellow Leaf Relief Package (Karnataka Govt)',
        schemeLink: 'https://horticulturedir.karnataka.gov.in/',
        color: '#eab308',
        keyTakeaways: [
          'Golden-yellow chlorosis beginning at tips of leaflets in lower whorls advancing inwards',
          'Root system rots and darkens leading to kernel turning soft, black, and non-chewable (chali degradation)',
          'Vector transmitted phytoplasma; balanced nutrition and proper drainage prolong productivity'
        ],
        keyTakeawaysKn: [
          'ಕೆಳಗಿನ ಗರಿಗಳ ತುದಿಯಿಂದ ಆರಂಭವಾಗಿ ಚಿನ್ನದ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಒಳಗಿನ ಗರಿಗಳಿಗೆ ಹರಡುತ್ತದೆ',
          'ಬೇರುಗಳು ಕೊಳೆತು ಕಪ್ಪಾಗುತ್ತವೆ ಮತ್ತು ಅಡಿಕೆ ಕಾಳುಗಳು ಮೆದುವಾಗಿ, ಕಪ್ಪಾಗಿ ಗುಣಮಟ್ಟ ಹಾಳಾಗುತ್ತದೆ',
          'ಕೀಟಗಳಿಂದ ಹರಡುವ ರೋಗ; ಸಮತೋಲಿತ ಪೋಷಕಾಂಶ ಮತ್ತು ಉತ್ತಮ ಬಸಿಗಾಲುವೆ ಮರದ ಆಯಸ್ಸನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'निचली पत्तियों की नोक से सुनहरा पीलापन शुरू होकर अंदर की ओर बढ़ता है',
          'जड़ें सड़कर काली हो जाती हैं और सुपारी अंदर से मुलायम और काली पड़ जाती है',
          'संतुलित खाद और जल निकासी से प्रभावित पेड़ों की पैदावार बचाई जा सकती है'
        ],
        products: [
          { name: 'Magnesium Sulphate (Agri Grade)', type: 'fertilizer', brand: 'Multiplex / Aries', price: '₹450 – ₹650 / 25kg', query: 'Magnesium Sulphate agriculture 25kg' },
          { name: 'MOP (Muriate of Potash)', type: 'fertilizer', brand: 'IFFCO Potash', price: '₹1,650 – ₹1,800 / 50kg', query: 'MOP Potash fertilizer 50kg' }
        ]
      },
      {
        disease: 'Anabe Roga / Foot Rot (Ganoderma lucidum)',
        diseaseKn: 'ಅಣಬೆ ರೋಗ (ಅಡಿಕೆ ಬುಡ ಕೊಳೆ)',
        diseaseHi: 'अनाबे रोगा (सुपारी पाद विगलन / गैनोडर्मा)',
        severity: 'High',
        remedy: 'Root feeding with Hexaconazole 5 SC @ 2% (20 mL in 100 mL water) 3 times a year. Drench soil around trunk with Captan 50 WP @ 3 g/L.',
        remedyKn: 'ವರ್ಷಕ್ಕೆ 3 ಬಾರಿ 20 mL Hexaconazole 5 SC ಅನ್ನು 100 mL ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಬೇರಿನ ಮೂಲಕ ನೀಡಿ (ರೂಟ್ ಫೀಡಿಂಗ್). ಬುಡಕ್ಕೆ Captan @ 3 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'साल में 3 बार 20 mL Hexaconazole 5 SC को 100 mL पानी में जड़ द्वारा दें। तने के चारों ओर Captan @ 3 g/L का घोल डालें।',
        prevention: 'Dig isolation trenches around infected palms. Burn uprooted infected stumps and roots.',
        preventionKn: 'ರೋಗಪೀಡಿತ ಮರಗಳ ಸುತ್ತಲೂ ಕಂದಕ ನಿರ್ಮಿಸಿ. ಒಣಗಿದ ಬುಡ ಮತ್ತು ಬೇರುಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.',
        preventionHi: 'संक्रमित पेड़ों के चारों तरफ खाई बनाएं। रोगी ठूंठों और जड़ों को उखाड़कर जलाएं।',
        organicTip: 'Apply 5 kg neem cake + 50g Trichoderma viride enriched FYM per palm every six months.',
        organicTipKn: 'ಪ್ರತಿ 6 ತಿಂಗಳಿಗೊಮ್ಮೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು Trichoderma viride ಬೆರೆಸಿದ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ನೀಡಿ.',
        organicTipHi: 'हर 6 महीने में 5 kg नीम खली और ट्राइकोडर्मा युक्त खाद प्रति पेड़ डालें।',
        fertilizer: 'Apply balanced organic nutrition; avoid damaging roots during weeding and intercultural operations.',
        fertilizerKn: 'ಕಳೆ ಕೀಳುವಾಗ ಮರದ ಬೇರುಗಳಿಗೆ ಗಾಯವಾಗದಂತೆ ಎಚ್ಚರವಹಿಸಿ.',
        fertilizerHi: 'निराई-गुड़ाई के समय जड़ों को कटने से बचाएं।',
        scheme: 'Raitha Sanjeevini Disease Control Support',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#7f1d1d',
        keyTakeaways: [
          'Yellowing of lower fronds which droop down and remain clinging around the stem',
          'Trunk shows dark brown bleeding patches from ground up to 1 meter',
          'Bracket-shaped woody mushrooms sprout at the base of the dead trunk'
        ],
        keyTakeawaysKn: [
          'ಕೆಳಗಿನ ಗರಿಗಳು ಹಳದಿಯಾಗಿ ಕೆಳಮುಖವಾಗಿ ಬಾಗಿ ಕಾಂಡಕ್ಕೆ ನೇತಾಡುತ್ತವೆ',
          'ಬುಡದ ಕಾಂಡದಿಂದ ಕಂದು ಬಣ್ಣದ ಅಂಟು ಸೋರುತ್ತದೆ',
          'ಸತ್ತ ಮರದ ಬುಡದಲ್ಲಿ ಮರದಂತಹ ಗಟ್ಟಿಯಾದ ಅಣಬೆಗಳು ಬೆಳೆಯುತ್ತವೆ'
        ],
        keyTakeawaysHi: [
          'निचली पत्तियां पीली पड़कर नीचे लटक जाती हैं और तने से चिपकी रहती हैं',
          'तने के निचले हिस्से से गहरा भूरा स्राव बहने लगता है',
          'पेड़ के सूखने पर तने के आधार पर कड़े मशरूम निकल आते हैं'
        ],
        products: [
          { name: 'Hexaconazole 5 SC', type: 'chemical', brand: 'Contaf Plus', price: '₹280 – ₹420 / 500mL', query: 'Hexaconazole 5 SC Contaf' },
          { name: 'Neem Cake Organic Fertilizer', type: 'organic', brand: 'Pure Agro Neem Cake', price: '₹950 – ₹1,350 / 50kg', query: 'Neem cake fertilizer 50kg' }
        ]
      },
      {
        disease: 'Inflorescence Dieback & Button Shedding (Colletotrichum gloeosporioides)',
        diseaseKn: 'ಹಿಂಗಾರ ಒಣಗುವಿಕೆ & ಕಾಯಿ ಉದುರುವಿಕೆ',
        diseaseHi: 'सुपारी पुष्पक्रम का सूखना एवं बटन गिरना',
        severity: 'Medium',
        remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Carbendazim 50 WP @ 1 g/L or Copper Oxychloride 50 WP @ 2.5 g/L on newly opened inflorescences.',
        remedyKn: 'ಹೊಸದಾಗಿ ಅರಳಿದ ಹಿಂಗಾರಗಳ ಮೇಲೆ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'नए खुले पुष्पक्रमों पर Mancozeb 75 WP @ 2 g/L या Carbendazim 50 WP @ 1 g/L का छिड़काव करें।',
        prevention: 'Remove and destroy dried inflorescences and infected buttons. Provide honeybee hives to improve pollination.',
        preventionKn: 'ಒಣಗಿದ ಹಿಂಗಾರಗಳು ಮತ್ತು ಉದುರಿದ ಕಾಯಿಗಳನ್ನು ತೆಗೆದು ನಾಶಮಾಡಿ. ಪರಾಗಸ್ಪರ್ಶ ಹೆಚ್ಚಿಸಲು ಜೇನುಪೆಟ್ಟಿಗೆಗಳನ್ನು ಇಡಿ.',
        preventionHi: 'सूखे पुष्पक्रमों को काटकर जलाएं। परागण सुधारने के लिए मधुमक्खी के बक्से रखें।',
        organicTip: 'Foliar spray of 5% cow urine + Pseudomonas fluorescens @ 2 g/L on inflorescences.',
        organicTipKn: 'ಹಿಂಗಾರದ ಮೇಲೆ 5% ಗೋಮೂತ್ರ ಮತ್ತು Pseudomonas fluorescens @ 2 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'पुष्पक्रम पर 5% गोमूत्र और Pseudomonas fluorescens @ 2 g/L का छिड़काव करें।',
        fertilizer: 'Spray Boron (Solubor 20%) @ 1 g/L during flowering to improve fruit set and reduce button drop.',
        fertilizerKn: 'ಕಾಯಿ ಕಚ್ಚುವಿಕೆ ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಕಾಯಿ ಉದುರುವಿಕೆ ತಡೆಯಲು ಹೂವಾಡುವಾಗ ಬೋರಾನ್ (Solubor 20%) @ 1 g/L ಸಿಂಪಡಿಸಿ.',
        fertilizerHi: 'फूल आते समय फल का ठहराव बढ़ाने के लिए बोरॉन (Solubor 20%) @ 1 g/L का छिड़काव करें।',
        scheme: 'National Horticulture Mission (NHM)',
        schemeLink: 'https://midh.gov.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Male flowers show brown spots, dry up, and rachis branches blacken from tip downwards',
          'Female buttons fail to set and drop off in large quantities leaving bare broom-like bunches',
          'Boron application combined with protective fungicide spray doubles nut set'
        ],
        keyTakeawaysKn: [
          'ಗಂಡು ಹೂವುಗಳ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗಿ, ರೆಂಬೆಗಳ ತುದಿಯಿಂದ ಬುಡದವರೆಗೆ ಕಪ್ಪಾಗಿ ಒಣಗುತ್ತವೆ',
          'ಹೆಣ್ಣು ಹೂವುಗಳು (ಅಡಿಕೆ ಕಾಯಿಗಳು) ಕಚ್ಚದೆ ರಾಶಿಯಾಗಿ ಉದುರಿ ಕೇವಲ ಪೊರಕೆಯಂತಹ ಕಡ್ಡಿಗಳು ಉಳಿಯುತ್ತವೆ',
          'ಬೋರಾನ್ ಮತ್ತು ಶಿಲೀಂಧ್ರನಾಶಕದ ಸಿಂಪಡಣೆಯು ಅಡಿಕೆ ಕಾಯಿ ಕಟ್ಟುವಿಕೆಯನ್ನು ದ್ವಿಗುಣಗೊಳಿಸುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'नर फूलों पर भूरे धब्बे बनते हैं और टहनियां ऊपर से नीचे की ओर काली होकर सूख जाती हैं',
          'मादा फूल (बटन) बिना फल बने झड़ जाते हैं और झाड़ू जैसी खाली डंडियां बचती हैं',
          'बोरॉन और फफूंदनाशक का छिड़काव करने से फलों का ठहराव दोगुना हो जाता है'
        ],
        products: [
          { name: 'Solubor Boron 20%', type: 'fertilizer', brand: 'Multiplex / Aries Boron', price: '₹220 – ₹320 / 500g', query: 'Solubor Boron 20 agriculture' },
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Indofil M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' }
        ]
      },
      {
        disease: 'Spindle Bug (Carvalhoia arecae)',
        diseaseKn: 'ಅಡಿಕೆ ಸುಳಿ ತಿಗಣೆ ರೋಗ',
        diseaseHi: 'सुपारी स्पिंडल बग (सुंडी कीट)',
        severity: 'Medium',
        remedy: 'Drench inner leaf axils with Imidacloprid 17.8 SL @ 0.5 mL/L or Dimethoate 30 EC @ 1.5 mL/L.',
        remedyKn: 'ಸುಳಿಯ ಬುಡದ ಗರಿಗಳಿಗೆ Imidacloprid 17.8 SL @ 0.5 mL/L ಅಥವಾ Dimethoate 30 EC @ 1.5 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'पत्तियों के आधार में Imidacloprid 17.8 SL @ 0.5 mL/L या Dimethoate 30 EC @ 1.5 mL/L का घोल डालें।',
        prevention: 'Clean tree crowns before monsoon. Avoid excessive shading in young plantations.',
        preventionKn: 'ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಮರದ ಸುಳಿಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ. ಎಳೆ ತೋಟಗಳಲ್ಲಿ ಅತಿಯಾದ ನೆರಳು ಇರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        preventionHi: 'मानसून से पहले पेड़ों का शीर्ष साफ रखें। छोटे बागानों में ज्यादा छाया न रहने दें।',
        organicTip: 'Spray 5% neem seed kernel extract (NSKE) or Neem oil 10000 PPM @ 2 mL/L into the spindle axil.',
        organicTipKn: 'ಸುಳಿಯ ಎಲೆಗಳ ಸಂದಿನಲ್ಲಿ 5% ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'सुपारी की कली के बीच 5% नीम का अर्क या नीम का तेल @ 2 mL/L का छिड़काव करें।',
        fertilizer: 'Apply balanced NPK to promote rapid spear leaf expansion.',
        fertilizerKn: 'ಸುಳಿ ಎಲೆಗಳು ಬೇಗನೆ ಅರಳಲು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'पत्तियों के तेजी से फैलाव के लिए संतुलित खाद दें।',
        scheme: 'Raitha Samparka Kendra Extension Advisory',
        schemeLink: 'https://raitamitra.karnataka.gov.in/',
        color: '#d97706',
        keyTakeaways: [
          'Bright red-and-black bugs live in colonies inside unopened spindle leaves feeding on sap',
          'Leaves open with linear holes, shredded appearance, and brown necrosed lesions',
          'Target insecticide directly into the uppermost spindle whorl'
        ],
        keyTakeawaysKn: [
          'ತೆರೆಯದ ಸುಳಿಯೊಳಗೆ ಕೆಂಪು-ಕಪ್ಪು ಬಣ್ಣದ ತಿಗಣೆಗಳು ಗುಂಪಾಗಿ ಕುಳಿತು ರಸ ಹೀರುತ್ತವೆ',
          'ಎಲೆಗಳು ತೆರೆದಾಗ ರಂಧ್ರಗಳಿಂದ ಜರಡಿಯಂತೆ ಹರಿದು ಒಣಗಿ ಕಾಣುತ್ತವೆ',
          'ಔಷಧಿಯನ್ನು ನೇರವಾಗಿ ತುದಿಯ ಸುಳಿಯ ಎಲೆಗಳ ಸಂದಿಗೆ ಬೀಳುವಂತೆ ಸಿಂಪಡಿಸಿ'
        ],
        keyTakeawaysHi: [
          'लाल-काले रंग के कीड़े न खुली कली के अंदर झुंड बनाकर रस चूसते हैं',
          'पत्तियां खुलने पर कटी-फटी और छेद वाली जालीदार दिखती हैं',
          'कीटनाशक को सीधे सबसे ऊपर की नई कली के जोड़ों में डालें'
        ],
        products: [
          { name: 'Imidacloprid 17.8 SL', type: 'chemical', brand: 'Confidor', price: '₹240 – ₹380 / 100mL', query: 'Imidacloprid 17.8 SL' },
          { name: 'Neem Oil 10000 PPM', type: 'organic', brand: 'Eco-Neem', price: '₹220 – ₹350 / 1L', query: 'Neem oil agriculture 10000 ppm' }
        ]
      }
    ]
  },

  // ── 5. COFFEE ──
  {
    crop: 'Coffee (ಕಾಫಿ / कॉफी)',
    cropKn: 'ಕಾಫಿ',
    cropHi: 'कॉफी',
    emoji: '☕',
    diseases: [
      {
        disease: 'Coffee Leaf Rust (Hemileia vastatrix)',
        diseaseKn: 'ಕಾಫಿ ಎಲೆ ತುಕ್ಕು ರೋಗ',
        diseaseHi: 'कॉफी रतुआ रोग (लीफ रस्ट)',
        severity: 'High',
        remedy: 'Pre-monsoon spray with 0.5% Bordeaux mixture (May-June). Post-monsoon spray with Hexaconazole 5 EC @ 1 mL/L or Epoxiconazole + Pyraclostrobin (Opera) @ 1 mL/L.',
        remedyKn: 'ಮುಂಗಾರಿಗೆ ಮುನ್ನ (ಮೇ-ಜೂನ್) 0.5% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ. ಮುಂಗಾರಿನ ನಂತರ Hexaconazole 5 EC @ 1 mL/L ಅಥವಾ Opera @ 1 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'मानसून से पहले 0.5% बोर्डो मिश्रण छिड़कें। मानसून के बाद Hexaconazole 5 EC @ 1 mL/L या Opera @ 1 mL/L का छिड़काव करें।',
        prevention: 'Prune dead and dense branches to maintain two-tier shade trees. Grow rust-resistant varieties like Sln 795 or Chandragiri.',
        preventionKn: 'ಒಣಗಿದ ರೆಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಸೂರ್ಯನ ಬೆಳಕು ಬೀಳುವಂತೆ ನೆರಳು ನಿರ್ವಹಣೆ ಮಾಡಿ. ಚಂದ್ರಗಿರಿ ಅಥವಾ Sln 795 ರಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.',
        preventionHi: 'सूखी टहनियों की छंटाई करें ताकि धूप छनकर आ सके। चंद्रागिरी जैसी रतुआ रोधी किस्में लगाएं।',
        organicTip: 'Spray fermented herbal cow urine extract + 1% Bordeaux spray early season.',
        organicTipKn: 'ಹರ್ಬಲ್ ಗೋಮೂತ್ರ ಕಷಾಯ ಮತ್ತು 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'गोमूत्र का अर्क और 1% बोर्डो मिश्रण का छिड़काव करें।',
        fertilizer: 'Apply balanced NPK: 140:90:140 kg/ha in 3 split doses (pre-monsoon, mid-monsoon, post-monsoon).',
        fertilizerKn: 'ಹೆಕ್ಟೇರ್‌ಗೆ 140:90:140 kg NPK ಗೊಬ್ಬರವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.',
        fertilizerHi: 'प्रति हेक्टेयर 140:90:140 kg NPK तीन बार में (मानसून पूर्व, मध्य और बाद में) दें।',
        scheme: 'Coffee Board of India Replanting & Mechanization Subsidy',
        schemeLink: 'https://coffeeboard.gov.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Yellowish-orange powdery circular lesions on lower leaf surfaces turning into brown necrotic spots',
          'Causes massive defoliation leaving twigs bare ("dieback") and reducing next season flower buds',
          'Timely pre-monsoon and post-monsoon sprays provide complete protection'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಕಿತ್ತಳೆ-ಹಳದಿ ಬಣ್ಣದ ಪುಡಿ ಬೊಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಂಡು ನಂತರ ಕಂದು ಕಲೆಗಳಾಗುತ್ತವೆ',
          'ಎಲೆಗಳು ಉದುರಿ ರೆಂಬೆಗಳು ಒಣಗುತ್ತವೆ (ಡೈಬ್ಯಾಕ್) ಮತ್ತು ಮುಂದಿನ ವರ್ಷದ ಬೆಳೆ ಇಳುವರಿ ಕುಸಿಯುತ್ತದೆ',
          'ಮುಂಗಾರು ಪೂರ್ವ ಮತ್ತು ಮುಂಗಾರು ನಂತರದ ಸರಿಯಾದ ಸಿಂಪಡಣೆಯಿಂದ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ಸಾಧ್ಯ'
        ],
        keyTakeawaysHi: [
          'पत्तियों की निचली सतह पर नारंगी-पीले पाउडर के गोल चकत्ते बनते हैं जो बाद में सूख जाते हैं',
          'पत्तियां झड़ जाती हैं और टहनियां सूख जाती हैं (डाईबैक), जिससे अगली फसल मारी जाती है',
          'मानसून से पहले और बाद का समयबद्ध छिड़काव ही इसकी सबसे पक्की सुरक्षा है'
        ],
        products: [
          { name: 'Hexaconazole 5 EC', type: 'chemical', brand: 'Contaf Plus', price: '₹280 – ₹420 / 500mL', query: 'Hexaconazole 5 EC Contaf' },
          { name: 'Pyraclostrobin + Epoxiconazole (Opera)', type: 'chemical', brand: 'Opera (BASF)', price: '₹980 – ₹1,450 / 500mL', query: 'Opera BASF fungicide' }
        ]
      },
      {
        disease: 'Coffee Berry Borer (Hypothenemus hampei)',
        diseaseKn: 'ಕಾಫಿ ಹಣ್ಣು ಕೊರೆಯುವ ಹುಳು',
        diseaseHi: 'कॉफी बेरी छेदक (बेरी बोरर)',
        severity: 'High',
        remedy: 'Install Broca traps baited with ethanol-methanol lure (1:1 ratio) @ 25 traps/ha. Spray Beauveria bassiana @ 5 g/L or Chlorpyrifos 20 EC @ 2 mL/L at 120-150 days after blossom.',
        remedyKn: 'ಹೆಕ್ಟೇರ್‌ಗೆ 25 ಬ್ರೋಕಾ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಹೂವರಳಿದ 120-150 ದಿನಗಳಲ್ಲಿ Beauveria bassiana @ 5 g/L ಅಥವಾ Chlorpyrifos 20 EC @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'प्रति हेक्टेयर 25 ब्रोका ट्रैप लगाएं। फूल आने के 120-150 दिन बाद Beauveria bassiana @ 5 g/L या Chlorpyrifos 20 EC @ 2 mL/L का छिड़काव करें।',
        prevention: 'Clean harvest (strip picking) of all left-over berries from bushes and ground (gleaning) to starve surviving beetles.',
        preventionKn: 'ಗಿಡದಲ್ಲಿ ಮತ್ತು ನೆಲದಲ್ಲಿ ಬಿದ್ದಿರುವ ಎಲ್ಲಾ ಕಾಫಿ ಹಣ್ಣುಗಳನ್ನು ಆರಿಸಿ ತೆಗೆದು (ಗ್ಲೀನಿಂಗ್) ಹುಳುವಿನ ಆಶ್ರಯ ತಪ್ಪಿಸಿ.',
        preventionHi: 'पेड़ों पर और जमीन पर गिरी सभी बची हुई बेरी को पूरी तरह बीनकर नष्ट करें।',
        organicTip: 'Spray entomopathogenic fungus Beauveria bassiana @ 5 g/L with wetting agent in evening.',
        organicTipKn: 'ಸಂಜೆ ವೇಳೆ Beauveria bassiana ಜೈವಿಕ ಶಿಲೀಂಧ್ರ @ 5 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'शाम के समय Beauveria bassiana @ 5 g/L का छिड़काव करें।',
        fertilizer: 'Maintain shade and balanced soil fertility to prevent premature berry dropping.',
        fertilizerKn: 'ಕಾಯಿ ಉದುರುವುದು ತಪ್ಪಿಸಲು ಸೂಕ್ತ ನೆರಳು ಮತ್ತು ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ ಮಾಡಿ.',
        fertilizerHi: 'छाया और संतुलित खाद का प्रबंधन करें ताकि बेरी न गिरें।',
        scheme: 'Coffee Board Integrated Pest Management Assistance',
        schemeLink: 'https://coffeeboard.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Tiny round pinhole near the navel (apical disc) of the coffee berry',
          'Beetle excavates galleries inside green and ripe beans destroying commercial grade',
          'Thorough gleaning and harvest hygiene eliminates over 80% pest carryover'
        ],
        keyTakeawaysKn: [
          'ಕಾಫಿ ಹಣ್ಣಿನ ತುದಿಯ ಬಟನ್ (ತೊಟ್ಟಿನ ವಿರುದ್ಧ ಭಾಗ) ಬಳಿ ಸಣ್ಣ ಗುಂಡಿನಾಕಾರದ ರಂಧ್ರವಿರುತ್ತದೆ',
          'ಹುಳುವು ಬೀಜದೊಳಗೆ ಸುರಂಗ ಕೊರೆದು ಕಾಫಿಯ ಗುಣಮಟ್ಟವನ್ನು ಸಂಪೂರ್ಣ ಹಾಳುಮಾಡುತ್ತದೆ',
          'ನೆಲದಲ್ಲಿ ಬಿದ್ದ ಹಣ್ಣುಗಳನ್ನು ಆರಿಸಿ ಸ್ವಚ್ಛಗೊಳಿಸುವುದರಿಂದ ಶೇ. 80ರಷ್ಟು ಕೀಟ ಬಾಧೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'कॉफी बेरी के सिरे (नाभि) के पास छोटा गोल छेद दिखाई देता है',
          'कीट बीज के अंदर सुरंग बनाकर व्यावसायिक गुणवत्ता को नष्ट कर देता है',
          'जमीन पर गिरी बेरी को बीनकर साफ करने से 80% तक कीट समाप्त हो जाता है'
        ],
        products: [
          { name: 'Beauveria bassiana 1% WP', type: 'organic', brand: 'Bio-Power / Daman', price: '₹180 – ₹260 / 1kg', query: 'Beauveria bassiana 1kg' },
          { name: 'Broca Pheromone Trap (Berry Borer)', type: 'organic', brand: 'Coffee Board Lure', price: '₹140 – ₹220 / trap', query: 'Coffee berry borer trap lure' }
        ]
      },
      {
        disease: 'Black Rot / Koleroga (Corticium koleroga)',
        diseaseKn: 'ಕಾಫಿ ಕಪ್ಪು ಕೊಳೆ ರೋಗ (ಕೊಲೆರೋಗ)',
        diseaseHi: 'कॉफी ब्लैक रॉट (काला विगलन)',
        severity: 'High',
        remedy: 'Foliar spray with 1% Bordeaux mixture before onset of South-West monsoon and second spray during August-September break.',
        remedyKn: 'ಮುಂಗಾರು ಆರಂಭಕ್ಕೆ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಆಗಸ್ಟ್-ಸೆಪ್ಟೆಂಬರ್ ಮಳೆ ಬಿಡುವಿನಲ್ಲಿ ಎರಡನೇ ಬಾರಿ ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'मानसून से पहले 1% बोर्डो मिश्रण का छिड़काव करें और अगस्त-सितंबर में दोबारा छिड़कें।',
        prevention: 'Thinning of dense shade trees before rainy season to facilitate air circulation and reduce humidity in estate.',
        preventionKn: 'ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ನೆರಳು ಮರಗಳ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೋಟದಲ್ಲಿ ಗಾಳಿ-ಬೆಳಕು ಆಡುವಂತೆ ಮಾಡಿ.',
        preventionHi: 'बारिश से पहले छायादार पेड़ों की छंटाई करें ताकि बागान में हवा और धूप आ सके।',
        organicTip: 'Foliar spray of Trichoderma viride @ 5 g/L with 2% neem oil emulsion.',
        organicTipKn: 'Trichoderma viride @ 5 g/L ಜೊತೆಗೆ 2% ಬೇವಿನ ಎಣ್ಣೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'Trichoderma viride @ 5 g/L और 2% नीम के तेल का छिड़काव करें।',
        fertilizer: 'Apply adequate Potash to harden branch and leaf cuticles.',
        fertilizerKn: 'ರೆಂಬೆಗಳು ಮತ್ತು ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಸಾಕಷ್ಟು ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'टहनियों और पत्तियों को मजबूत करने के लिए पर्याप्त पोटाश दें।',
        scheme: 'Coffee Board Rainfall Insurance & Crop Welfare Scheme',
        schemeLink: 'https://coffeeboard.gov.in/',
        color: '#1e293b',
        keyTakeaways: [
          'Blackening and rotting of leaves, developing berries, and green twigs covered by a white mycelial web',
          'Infected leaves detach but remain hanging suspended by fungal threads like pendulums',
          'Heavy monsoon mist and saturated shade trigger sudden explosive outbreaks'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು, ಕಾಫಿ ಕಾಯಿಗಳು ಮತ್ತು ಹಸಿರು ರೆಂಬೆಗಳು ಕಪ್ಪಾಗಿ ಕೊಳೆತು ಬಿಳಿ ಬೂಷ್ಟಿನ ದಾರಗಳಿಂದ ಆವೃತವಾಗುತ್ತವೆ',
          'ಕೊಳೆತ ಎಲೆಗಳು ತೊಟ್ಟಿನಿಂದ ಕಳಚಿಕೊಂಡರೂ ಶಿಲೀಂಧ್ರದ ದಾರಗಳಿಂದ ನೇತಾಡುತ್ತಿರುತ್ತವೆ',
          'ದಟ್ಟ ನೆರಳು ಮತ್ತು ನಿರಂತರ ಮಳೆ-ಮಂಜು ರೋಗವನ್ನು ವೇಗವಾಗಿ ಉಲ್ಬಣಗೊಳಿಸುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियां, फल और हरी टहनियां काली पड़कर सड़ जाती हैं और सफेद जाले से ढक जाती हैं',
          'संक्रमित पत्तियां टूटकर भी फफूंद के धागों के सहारे लटकती रहती हैं',
          'अत्यधिक नमी और घनी छाया में यह बीमारी विस्फोटक रूप से फैलती है'
        ],
        products: [
          { name: 'Copper Sulphate for Bordeaux 1%', type: 'chemical', brand: 'Agri Blue Copper', price: '₹240 – ₹360 / 1kg', query: 'Copper Sulphate agriculture blue' },
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' }
        ]
      },
      {
        disease: 'White Stem Borer (Xylotrechus quadripes)',
        diseaseKn: 'ಕಾಫಿ ಬಿಳಿ ಕಾಂಡ ಕೊರೆಯುವ ದುಂಬಿ',
        diseaseHi: 'कॉफी सफेद तना छेदक (व्हाइट स्टेम बोरर)',
        severity: 'High',
        remedy: 'Stem swabbing / spray with Chlorpyrifos 20 EC @ 600 mL/200L water + 200 mL wetting agent during flight periods (April-May and Oct-Dec). Tracing and uprooting infested bushes.',
        remedyKn: 'ದುಂಬಿಗಳು ಹಾರಾಡುವ ಕಾಲದಲ್ಲಿ (ಏಪ್ರಿಲ್-ಮೇ ಮತ್ತು ಅಕ್ಟೋಬರ್-ಡಿಸೆಂಬರ್) ಕಾಂಡಕ್ಕೆ Chlorpyrifos 20 EC ಲೇಪಿಸಿ. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಗುರುತಿಸಿ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.',
        remedyHi: 'कीट के उड़ने के मौसम (अप्रैल-मई और अक्टूबर-दिसंबर) में तने पर Chlorpyrifos 20 EC का लेप लगाएं। ग्रसित पौधों को उखाड़कर जलाएं।',
        prevention: 'Maintain two-tier optimum shade (40–50% sunlight filtration). Bark scraping of stems to remove loose scaly bark where beetles lay eggs.',
        preventionKn: 'ಶೇ. 40-50 ರಷ್ಟು ನೆರಳು ನಿರ್ವಹಿಸಿ. ಮೊಟ್ಟೆ ಇಡುವುದನ್ನು ತಡೆಯಲು ಮರದ ಕಾಂಡದ ಒಣ ಸಿಪ್ಪೆಯನ್ನು ಕೆರೆದು ನಯಗೊಳಿಸಿ (ಬಾರ್ಕ್ ಸ್ಕ್ರ್ಯಾಪಿಂಗ್).',
        preventionHi: '40-50% छाया बनाए रखें। तने की खुरदरी छाल को खुरचकर साफ करें ताकि कीट अंडे न दे सके।',
        organicTip: 'Stem swabbing with 10% lime wash (slaked lime + resin + neem oil) on main trunk before flight season.',
        organicTipKn: 'ಕಾಂಡಕ್ಕೆ ಸುಣ್ಣ, ರಾಳ ಮತ್ತು ಬೇವಿನ ಎಣ್ಣೆ ಮಿಶ್ರಣವನ್ನು (ಲೈಮ್ ವಾಶ್) ಲೇಪಿಸಿ.',
        organicTipHi: 'तने पर चूना, राल और नीम के तेल का लेप लगाएं।',
        fertilizer: 'Apply balanced micronutrient fertilizer to enhance stem vigor.',
        fertilizerKn: 'ಗಿಡದ ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.',
        fertilizerHi: 'तने की मजबूती के लिए संतुलित खाद दें।',
        scheme: 'Coffee Board White Stem Borer Compensation Scheme',
        schemeLink: 'https://coffeeboard.gov.in/',
        color: '#b91c1c',
        keyTakeaways: [
          'Larva bores tortuous tunnels inside hardwood stem causing characteristic raised ring-like ridges on bark',
          'Causes yellowing, wilting, branch dieback, and complete death of mature Arabica bushes',
          'Prompt tracing and burning of infested stems is legally required under Coffee Pest Act'
        ],
        keyTakeawaysKn: [
          'ಹುಳುವು ಗಟ್ಟಿಯಾದ ಮರದ ಕಾಂಡದೊಳಗೆ ಸುರಂಗ ಕೊರೆಯುವುದರಿಂದ ಕಾಂಡದ ಮೇಲೆ ಉಂಗುರದಂತಹ ಏಣುಗಳು ಮೂಡುತ್ತವೆ',
          'ಅರೇಬಿಕಾ ಗಿಡಗಳು ಹಳದಿಯಾಗಿ, ಒಣಗಿ ಸಂಪೂರ್ಣವಾಗಿ ನಾಶವಾಗುತ್ತವೆ',
          'ಬಾಧಿತ ಗಿಡಗಳನ್ನು ಗುರುತಿಸಿ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕುವುದು ಕಾನೂನುಬದ್ಧ ಕಡ್ಡಾಯ ಕ್ರಮವಾಗಿದೆ'
        ],
        keyTakeawaysHi: [
          'सूंड़ी तने की लकड़ी में टेढ़ी-मेढ़ी सुरंगें बनाती है जिससे तने की छाल पर छल्लेदार उभार बन जाते हैं',
          'अरेबिका कॉफी के पूरे पौधे पीले पड़कर सूख जाते हैं',
          'प्रभावित पौधों को उखाड़कर जलाना कानूनी रूप से अनिवार्य है'
        ],
        products: [
          { name: 'Chlorpyrifos 20 EC', type: 'chemical', brand: 'Dursban / Classic', price: '₹260 – ₹380 / 1L', query: 'Chlorpyrifos 20 EC' },
          { name: 'Agricultural Lime (Slaked Lime)', type: 'organic', brand: 'Agri Lime Powder', price: '₹280 – ₹390 / 25kg', query: 'Hydrated lime agriculture' }
        ]
      },
      {
        disease: 'Anthracnose / Twig Dieback (Colletotrichum kahawae)',
        diseaseKn: 'ರೆಂಬೆ ಒಣಗುವ ರೋಗ (ಡೈಬ್ಯಾಕ್)',
        diseaseHi: 'कॉफी एन्थ्रेक्नोज (टहनी सूखना / डाईबैक)',
        severity: 'Medium',
        remedy: 'Prune dead twigs 5 cm below infected tissue. Spray Carbendazim 50 WP @ 1 g/L or Copper Oxychloride 50 WP @ 2.5 g/L during post-monsoon flush.',
        remedyKn: 'ಒಣಗಿದ ರೆಂಬೆಗಳನ್ನು ರೋಗದ 5 cm ಕೆಳಭಾಗದಲ್ಲಿ ಕತ್ತರಿಸಿ. Carbendazim 50 WP @ 1 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'संक्रमित टहनियों को 5 cm नीचे से छांटें। Carbendazim 50 WP @ 1 g/L या Copper Oxychloride 50 WP @ 2.5 g/L का छिड़काव करें।',
        prevention: 'Maintain balanced shade. Avoid over-bearing stress by regulating cropping intensity.',
        preventionKn: 'ಸೂಕ್ತ ನೆರಳು ನಿರ್ವಹಣೆ ಮಾಡಿ. ಅತಿಯಾದ ಕಾಯಿ ಬಿಟ್ಟು ಗಿಡ ದುರ್ಬಲವಾಗದಂತೆ ಪೋಷಕಾಂಶ ನೀಡಿ.',
        preventionHi: 'उचित छाया रखें। बहुत अधिक फल आने पर पोषक तत्वों की कमी न होने दें।',
        organicTip: 'Foliar spray of 19:19:19 water-soluble fertilizer @ 5 g/L combined with Trichoderma viride @ 4 g/L.',
        organicTipKn: 'ನೀರಿನಲ್ಲಿ ಕರಗುವ 19:19:19 ಗೊಬ್ಬರ @ 5 g/L ಜೊತೆಗೆ Trichoderma viride @ 4 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '19:19:19 उर्वरक @ 5 g/L के साथ Trichoderma viride @ 4 g/L का छिड़काव करें।',
        fertilizer: 'Foliar spray of Zinc Sulphate @ 2.5 g/L + Urea @ 5 g/L during post-monsoon.',
        fertilizerKn: 'ಮುಂಗಾರಿನ ನಂತರ Zinc Sulphate @ 2.5 g/L ಜೊತೆಗೆ ಯೂರಿಯಾ @ 5 g/L ಸಿಂಪಡಿಸಿ.',
        fertilizerHi: 'मानसून के बाद Zinc Sulphate @ 2.5 g/L और यूरिया @ 5 g/L का छिड़काव करें।',
        scheme: 'Coffee Board Soil and Crop Nutrition Advisory',
        schemeLink: 'https://coffeeboard.gov.in/',
        color: '#854d0e',
        keyTakeaways: [
          'Yellowing of leaves on bearing twigs followed by drying of branches from tip backward ("dieback")',
          'Often precipitated by exhaustion after heavy crop bearing and severe drought/monsoon stress',
          'Post-harvest pruning and restorative nutrition reverses twig decline'
        ],
        keyTakeawaysKn: [
          'ಕಾಯಿ ಬಿಟ್ಟ ರೆಂಬೆಗಳ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ, ರೆಂಬೆಯ ತುದಿಯಿಂದ ಬುಡದವರೆಗೆ ಒಣಗುತ್ತಾ ಬರುತ್ತದೆ (ಡೈಬ್ಯಾಕ್)',
          'ಹೆಚ್ಚಿನ ಇಳುವರಿಯ ನಂತರ ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ ಮತ್ತು ನೀರಿನ ಒತ್ತಡದಿಂದ ರೋಗ ತೀವ್ರಗೊಳ್ಳುತ್ತದೆ',
          'ಕಟಾವಿನ ನಂತರ ಒಣ ರೆಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಪೋಷಕಾಂಶ ನೀಡುವುದರಿಂದ ಗಿಡ ಪುನಶ್ಚೇತನಗೊಳ್ಳುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'फलों वाली टहनियों की पत्तियां पीली पड़कर ऊपर से नीचे की ओर सूखने लगती हैं (डाईबैक)',
          'अधिक फसल आने के बाद पौधे की कमजोरी और सूखे से यह बीमारी बढ़ती है',
          'कटाई के बाद छंटाई और पर्याप्त खाद देने से पौधे फिर से हरे-भरे हो जाते हैं'
        ],
        products: [
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' },
          { name: 'NPK 19:19:19 Water Soluble', type: 'fertilizer', brand: 'IFFCO / Mahafeed', price: '₹140 – ₹210 / 1kg', query: '19 19 19 fertilizer 1kg' }
        ]
      }
    ]
  },

  // ── 6. BLACK PEPPER ──
  {
    crop: 'Black Pepper (ಕರಿಮೆಣಸು / काली मिर्च)',
    cropKn: 'ಕರಿಮೆಣಸು',
    cropHi: 'काली मिर्च (ब्लैक पेपर)',
    emoji: '🌿',
    diseases: [
      {
        disease: 'Quick Wilt / Foot Rot (Phytophthora capsici)',
        diseaseKn: 'ಕರಿಮೆಣಸಿನ ಶೀಘ್ರ ಸೊರಗು ರೋಗ (ಬುಡ ಕೊಳೆ)',
        diseaseHi: 'काली मिर्च द्रुत उकठा रोग (क्विक विल्ट)',
        severity: 'High',
        remedy: 'Apply Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L or Potassium Phosphonate (Akomin) @ 3 mL/L as drench (5-10 L/vine) and foliar spray in May-June and Aug-Sept.',
        remedyKn: 'ಮೇ-ಜೂನ್ ಮತ್ತು ಆಗಸ್ಟ್-ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ Metalaxyl + Mancozeb @ 2 g/L ಅಥವಾ Potassium Phosphonate @ 3 mL/L ದ್ರಾವಣವನ್ನು ಬಳ್ಳಿಗೆ ಸಿಂಪಡಿಸಿ ಬುಡಕ್ಕೆ ಸುರಿಯಿರಿ.',
        remedyHi: 'मई-जून और अगस्त-सितंबर में Metalaxyl + Mancozeb @ 2 g/L या Potassium Phosphonate @ 3 mL/L का छिड़काव करें और जड़ में 5-10 लीटर घोल डालें।',
        prevention: 'Ensure excellent contour drainage in plantation. Provide 1% Bordeaux spray before monsoon.',
        preventionKn: 'ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬಸಿಗಾಲುವೆ ಮಾಡಿ. ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.',
        preventionHi: 'बागान में जल निकासी नालियां बनाएं। मानसून से पहले 1% बोर्डो मिश्रण का छिड़काव करें।',
        organicTip: 'Apply Trichoderma harzianum @ 50g in 5 kg neem cake + FYM to the root basin of each vine in May and Sept.',
        organicTipKn: 'ಪ್ರತಿ ಬಳ್ಳಿಯ ಬುಡಕ್ಕೆ 5 kg ಬೇವಿನ ಹಿಂಡಿ ಮತ್ತು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದಲ್ಲಿ 50g Trichoderma ಬೆರೆಸಿ ಮೇ ಮತ್ತು ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ ಹಾಕಿ.',
        organicTipHi: 'मई और सितंबर में 5 kg नीम खली और सड़ी खाद में 50g ट्राइकोडर्मा मिलाकर प्रति बेल डालें।',
        fertilizer: 'Apply balanced NPK (100:40:140 g/vine/year) in two split doses.',
        fertilizerKn: 'ಪ್ರತಿ ಬಳ್ಳಿಗೆ ವಾರ್ಷಿಕ 100:40:140 g NPK ಗೊಬ್ಬರವನ್ನು ಎರಡು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.',
        fertilizerHi: 'प्रति बेल 100:40:140 g NPK प्रति वर्ष दो बार में दें।',
        scheme: 'Spices Board of India Pepper Rejuvenation Scheme',
        schemeLink: 'https://indianspices.com/',
        color: '#dc2626',
        keyTakeaways: [
          'Sudden wilting, blackening of leaves and spikes, and collapse of entire vine within 10 to 14 days',
          'Collar region rots with peeling of bark leaving fibrous vascular strands',
          'Soil drenching with systemic fungicide or Trichoderma before monsoon is critical'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು ಮತ್ತು ಕಾಳು ಗೊಂಚಲುಗಳು ಕಪ್ಪಾಗಿ ಕೇವಲ 10 ರಿಂದ 14 ದಿನಗಳಲ್ಲಿ ಇಡೀ ಬಳ್ಳಿ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಬಾಡಿ ಸಾಯುತ್ತದೆ',
          'ಬುಡದ ಕಾಂಡದ ತೊಗಟೆ ಕೊಳೆತು ಸುಲಭವಾಗಿ ಕಳಚಿಕೊಳ್ಳುತ್ತದೆ',
          'ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನವೇ ಬುಡಕ್ಕೆ ಸಿಸ್ಟಮಿಕ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ನೀಡುವುದು ಕಡ್ಡಾಯ'
        ],
        keyTakeawaysHi: [
          'पत्तियां और बालियां काली पड़ जाती हैं और 10 से 14 दिनों में पूरी बेल अचानक सूख जाती है',
          'तने का निचला हिस्सा सड़ जाता है और छाल आसानी से छूटने लगती है',
          'मानसून से पहले जड़ में ट्राइकोडर्मा या सिस्टमिक फफूंदनाशक डालना बेहद जरूरी है'
        ],
        products: [
          { name: 'Potassium Phosphonate (Akomin)', type: 'chemical', brand: 'Akomin / Biostadt', price: '₹420 – ₹580 / 500mL', query: 'Potassium Phosphonate Akomin' },
          { name: 'Metalaxyl 8% + Mancozeb 64% WP', type: 'chemical', brand: 'Ridomil Gold', price: '₹480 – ₹680 / 500g', query: 'Metalaxyl Mancozeb 72 WP' },
          { name: 'Trichoderma harzianum 1% WP', type: 'organic', brand: 'Bio-Fungicide', price: '₹170 – ₹250 / 1kg', query: 'Trichoderma harzianum 1kg' }
        ]
      },
      {
        disease: 'Slow Wilt / Decline (Radopholus similis & Meloidogyne incognita)',
        diseaseKn: 'ಕರಿಮೆಣಸಿನ ನಿಧಾನ ಸೊರಗು ರೋಗ',
        diseaseHi: 'काली मिर्च धीमा उकठा (स्लो विल्ट / सूत्रकृमि)',
        severity: 'Medium',
        remedy: 'Apply Phorate 10G @ 30 g/vine or Carbofuran 3G @ 50 g/vine or Drench with Fluopyram 34.48 SC @ 1 mL/L.',
        remedyKn: 'ಪ್ರತಿ ಬಳ್ಳಿಯ ಬುಡಕ್ಕೆ Phorate 10G @ 30g ಅಥವಾ Carbofuran 3G @ 50g ಹಾಕಿ ಅಥವಾ Fluopyram @ 1 mL/L ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ.',
        remedyHi: 'प्रति बेल Phorate 10G @ 30g या Carbofuran 3G @ 50g डालें या Fluopyram @ 1 mL/L से जड़ में सिंचाई करें।',
        prevention: 'Plant nematode-free rooted cuttings from accredited nurseries. Solarize nursery potting mixture.',
        preventionKn: 'ರೋಗಮುಕ್ತ ನರ್ಸರಿಗಳಿಂದ ತಂದ ಬೇರುಬಿಟ್ಟ ಬಳ್ಳಿಗಳನ್ನು ನೆಡಿ. ನರ್ಸರಿ ಮಣ್ಣನ್ನು ಸೂರ್ಯನ ಬಿಸಿಲಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಒಣಗಿಸಿ.',
        preventionHi: 'प्रमाणित नर्सरी से ही स्वस्थ जड़ वाली कटिंग लगाएं। नर्सरी की मिट्टी का सौरीकरण करें।',
        organicTip: 'Apply bio-nematicide Paecilomyces lilacinus @ 50g in 5 kg neem cake per vine.',
        organicTipKn: 'ಪ್ರತಿ ಬಳ್ಳಿಗೆ 5 kg ಬೇವಿನ ಹಿಂಡಿಯಲ್ಲಿ 50g Paecilomyces lilacinus ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.',
        organicTipHi: 'प्रति बेल 5 kg नीम खली में 50g Paecilomyces lilacinus मिलाकर जड़ों में डालें।',
        fertilizer: 'Apply adequate organic compost and Magnesium Sulphate @ 50g/vine to alleviate foliar chlorosis.',
        fertilizerKn: 'ಹಳದಿ ಬಣ್ಣ ನಿವಾರಿಸಲು ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ @ 50g ನೀಡಿ.',
        fertilizerHi: 'पीलापन दूर करने के लिए सड़ी खाद और मैग्नीशियम सल्फेट @ 50g प्रति बेल दें।',
        scheme: 'Spices Board Assistance for Integrated Pest & Disease Management',
        schemeLink: 'https://indianspices.com/',
        color: '#ca8a04',
        keyTakeaways: [
          'Gradual foliar yellowing, stunting, drooping, and progressive shedding of leaves over several months',
          'Roots exhibit severe galling, necrosis, and rotting of feeder roots by burrowing nematodes',
          'Nematode management combined with neem cake reverses vine decline'
        ],
        keyTakeawaysKn: [
          'ತಿಂಗಳುಗಳ ಕಾಲ ಎಲೆಗಳು ಕ್ರಮೇಣ ಹಳದಿಯಾಗಿ, ಗಿಡ್ಡವಾಗಿ, ಒಂದೊಂದಾಗಿ ಉದುರುತ್ತಾ ಬಳ್ಳಿ ಕ್ಷೀಣಿಸುತ್ತದೆ',
          'ಬೇರುಗಳಲ್ಲಿ ಗಂಟುಗಳು ಉಂಟಾಗಿ ಪೋಷಕಾಂಶ ಹೀರುವ ಸಣ್ಣ ಬೇರುಗಳು ಕೊಳೆಯುತ್ತವೆ',
          'ಕ್ರಿಮಿನಾಶಕ ಮತ್ತು ಬೇವಿನ ಹಿಂಡಿ ಬಳಕೆಯು ಬಳ್ಳಿಗೆ ಹೊಸ ಜೀವ ನೀಡುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'कई महीनों तक पत्तियां धीरे-धीरे पीली पड़कर झड़ती रहती हैं और बेल कमजोर हो जाती है',
          'सूत्रकृमि (निमेटोड) के कारण जड़ों में गांठें बन जाती हैं और पोषक जड़ें सड़ जाती हैं',
          'नीम की खली और जैव-कीटनाशक का प्रयोग बेल को फिर से स्वस्थ बना देता है'
        ],
        products: [
          { name: 'Paecilomyces lilacinus (Bio-Nematicide)', type: 'organic', brand: 'Bio-Nemato / Agri Clean', price: '₹220 – ₹340 / 1kg', query: 'Paecilomyces lilacinus bio nematicide' },
          { name: 'Neem Cake Pure Organic', type: 'organic', brand: 'Spices Grade Neem Cake', price: '₹950 – ₹1,350 / 50kg', query: 'Neem cake fertilizer 50kg' }
        ]
      },
      {
        disease: 'Pollu Disease / Anthracnose (Colletotrichum gloeosporioides)',
        diseaseKn: 'ಕರಿಮೆಣಸಿನ ಪೊಳ್ಳು ರೋಗ (ಕಾಳು ಜೊಳ್ಳು)',
        diseaseHi: 'काली मिर्च पोल्लु रोग (खोखला दाना / एन्थ्रेक्नोज)',
        severity: 'Medium',
        remedy: 'Spray 1% Bordeaux mixture or Carbendazim 50 WP @ 1 g/L or Mancozeb 75 WP @ 2 g/L twice during July-August berry formation.',
        remedyKn: 'ಜುಲೈ-ಆಗಸ್ಟ್ ತಿಂಗಳಲ್ಲಿ ಕಾಳು ಕಟ್ಟುವಾಗ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಅಥವಾ Carbendazim 50 WP @ 1 g/L ಎರಡು ಬಾರಿ ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'जुलाई-अगस्त में दाना बनते समय 1% बोर्डो मिश्रण या Carbendazim 50 WP @ 1 g/L का दो बार छिड़काव करें।',
        prevention: 'Provide adequate sunlight to vines by regulating shade of standard trees (Silver Oak / Erythrina).',
        preventionKn: 'ನೆರಳು ಮರಗಳ (ಸಿಲ್ವರ್ ಓಕ್) ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಬಳ್ಳಿಗಳಿಗೆ ಸೂಕ್ತ ಸೂರ್ಯನ ಬೆಳಕು ಸಿಗುವಂತೆ ಮಾಡಿ.',
        preventionHi: 'सिल्वर ओक जैसे छायादार पेड़ों की छंटाई करके बेलों तक पर्याप्त धूप पहुंचाएं।',
        organicTip: 'Spray Pseudomonas fluorescens @ 5 g/L early in morning at fruit set.',
        organicTipKn: 'ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಮುಂಜಾನೆ Pseudomonas fluorescens @ 5 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'दाना बनने की शुरुआत में सुबह Pseudomonas fluorescens @ 5 g/L का छिड़काव करें।',
        fertilizer: 'Apply foliar spray of 19:19:19 @ 5 g/L + Boron @ 1 g/L to enhance berry filling and density.',
        fertilizerKn: 'ಕಾಳುಗಳು ಗಟ್ಟಿಯಾಗಿ ತುಂಬಲು 19:19:19 @ 5 g/L ಜೊತೆಗೆ ಬೋರಾನ್ @ 1 g/L ಸಿಂಪಡಿಸಿ.',
        fertilizerHi: 'दानों को ठोस और भारी बनाने के लिए 19:19:19 @ 5 g/L और बोरॉन @ 1 g/L का छिड़काव करें।',
        scheme: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        schemeLink: 'https://rkvy.nic.in/',
        color: '#b45309',
        keyTakeaways: [
          'Berries turn brownish-black, shrink, dry up, and become light and hollow ("pollu")',
          'Circular brownish necrotic spots with yellow halo develop on leaves',
          'Combined management of anthracnose fungus and pollu beetle protects berry yield'
        ],
        keyTakeawaysKn: [
          'ಕಾಳುಗಳು ಕಂದು-ಕಪ್ಪಾಗಿ, ಒಣಗಿ, ಟೊಳ್ಳಾಗಿ ಹಗುರವಾಗುತ್ತವೆ ("ಪೊಳ್ಳು")',
          'ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಅಂಚಿನ ಕಂದು ಕಲೆಗಳು ಉಂಟಾಗುತ್ತವೆ',
          'ಶಿಲೀಂಧ್ರ ಮತ್ತು ಪೊಳ್ಳು ಕೀಟಗಳೆರಡರ ಸಕಾಲಿಕ ನಿಯಂತ್ರಣದಿಂದ ಕಾಳು ತೂಕವನ್ನು ಉಳಿಸಬಹುದು'
        ],
        keyTakeawaysHi: [
          'काली मिर्च के दाने सूखकर काले और खोखले हो जाते हैं जिनका कोई वजन नहीं रहता',
          'पत्तियों पर पीले घेरे वाले भूरे धब्बे दिखाई देते हैं',
          'समय पर फफूंदनाशक का छिड़काव करने से दाने ठोस और भारी बनते हैं'
        ],
        products: [
          { name: 'Ready-to-use Bordeaux Mixture 1%', type: 'chemical', brand: 'Bordo-Ready', price: '₹190 – ₹290 / 1kg', query: 'Bordeaux mixture ready to use' },
          { name: 'Carbendazim 50 WP', type: 'chemical', brand: 'Bavistin', price: '₹190 – ₹280 / 250g', query: 'Carbendazim 50 WP' }
        ]
      },
      {
        disease: 'Phyllosticta Leaf Spot (Phyllosticta piperis)',
        diseaseKn: 'ಕರಿಮೆಣಸಿನ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ',
        diseaseHi: 'काली मिर्च पर्ण चित्ती रोग (फाइलोस्टिक्टा लीफ स्पॉट)',
        severity: 'Low',
        remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Copper Oxychloride 50 WP @ 2.5 g/L at first appearance of circular spots.',
        remedyKn: 'ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ Mancozeb 75 WP @ 2 g/L ಅಥವಾ Copper Oxychloride 50 WP @ 2.5 g/L ಸಿಂಪಡಿಸಿ.',
        remedyHi: 'धब्बे दिखते ही Mancozeb 75 WP @ 2 g/L या Copper Oxychloride 50 WP @ 2.5 g/L का छिड़काव करें।',
        prevention: 'Collect and burn fallen diseased leaves. Avoid overcrowding of vines.',
        preventionKn: 'ಉದುರಿದ ರೋಗಪೀಡಿತ ಎಲೆಗಳನ್ನು ಆರಿಸಿ ಸುಟ್ಟುಹಾಕಿ. ಬಳ್ಳಿಗಳು ಅತಿಯಾಗಿ ದಟ್ಟವಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        preventionHi: 'गिरी हुई संक्रमित पत्तियों को जलाएं। बेलों को बहुत अधिक घना न होने दें।',
        organicTip: 'Foliar spray of 5% cow urine + Trichoderma viride @ 5 g/L.',
        organicTipKn: '5% ಗೋಮೂತ್ರ ಮತ್ತು Trichoderma viride @ 5 g/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: '5% गोमूत्र और Trichoderma viride @ 5 g/L का पत्तियों पर छिड़काव करें।',
        fertilizer: 'Apply balanced micronutrient mixture to strengthen leaf cuticle.',
        fertilizerKn: 'ಎಲೆಗಳು ಗಟ್ಟಿಯಾಗಲು ಲಘು ಪೋಷಕಾಂಶಗಳ ಸಿಂಪಡಣೆ ಮಾಡಿ.',
        fertilizerHi: 'पत्तियों को मजबूत करने के लिए सूक्ष्म पोषक तत्व दें।',
        scheme: 'State Horticulture Mission (SHM)',
        schemeLink: 'https://horticulturedir.karnataka.gov.in/',
        color: '#64748b',
        keyTakeaways: [
          'Large circular brown spots on leaves with distinct concentric rings and dark margins',
          'Severely affected leaves yellow prematurely and drop down',
          'Common in young plantations during intermittent rainy spells'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳ ಮೇಲೆ ಉಂಗುರಾಕಾರದ ಗೆರೆಗಳಿರುವ ದೊಡ್ಡ ಕಂದು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
          'ತೀವ್ರವಾದಾಗ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಅಕಾಲಿಕವಾಗಿ ಉದುರುತ್ತವೆ',
          'ಮಳೆಗಾಲದ ಬಿಡುವಿನಲ್ಲಿ ಎಳೆ ಬಳ್ಳಿಗಳಲ್ಲಿ ಈ ರೋಗ ಹೆಚ್ಚಾಗಿ ಕಂಡುಬರುತ್ತದೆ'
        ],
        keyTakeawaysHi: [
          'पत्तियों पर गहरे किनारों वाले बड़े गोल भूरे धब्बे बनते हैं जिनमें गोल छल्ले दिखते हैं',
          'अधिक असर होने पर पत्तियां पीली होकर समय से पहले गिर जाती हैं',
          'बारिश के मौसम में नई बेलों पर यह बीमारी अधिक देखी जाती है'
        ],
        products: [
          { name: 'Mancozeb 75 WP', type: 'chemical', brand: 'Dithane M-45', price: '₹240 – ₹350 / 500g', query: 'Mancozeb 75 WP' },
          { name: 'Copper Oxychloride 50 WP', type: 'chemical', brand: 'Blitox', price: '₹280 – ₹420 / 500g', query: 'Copper Oxychloride 50 WP' }
        ]
      },
      {
        disease: 'Stunt Virus (Piper Yellow Mottle Virus - PYMoV)',
        diseaseKn: 'ಕರಿಮೆಣಸಿನ ಗಿಡ್ಡಾಗುವ ವೈರಸ್ ರೋಗ',
        diseaseHi: 'काली मिर्च बौना वायरस रोग (स्टंट वायरस)',
        severity: 'High',
        remedy: 'Control mealybug vectors (Ferrisia virgata) by spraying Dimethoate 30 EC @ 1.7 mL/L or Thiamethoxam 25 WG @ 0.3 g/L. Uproot and burn severely stunted unproductive vines.',
        remedyKn: 'ರೋಗ ಹರಡುವ ಹಿಟ್ಟು ತಿಗಣೆಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು Dimethoate 30 EC @ 1.7 mL/L ಅಥವಾ Thiamethoxam 25 WG @ 0.3 g/L ಸಿಂಪಡಿಸಿ. ತೀವ್ರವಾಗಿ ಕುಂಠಿತಗೊಂಡ ಬಳ್ಳಿಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.',
        remedyHi: 'मिलीबग कीट की रोकथाम के लिए Dimethoate 30 EC @ 1.7 mL/L या Thiamethoxam 25 WG @ 0.3 g/L का छिड़काव करें। गंभीर रूप से बौनी बेलों को नष्ट करें।',
        prevention: 'Strictly use virus-indexed disease-free planting material from ICAR-IISR Calicut or accredited nurseries.',
        preventionKn: 'ಸರ್ಕಾರಿ ಮಾನ್ಯತೆ ಪಡೆದ ನರ್ಸರಿಗಳಿಂದ ವೈರಸ್ ಮುಕ್ತ ಸಸಿಗಳನ್ನು ಮಾತ್ರ ನಾಟಿ ಮಾಡಿ.',
        preventionHi: 'हमेशा प्रमाणित रोगमुक्त नर्सरी से ही स्वस्थ पौध लगाएं।',
        organicTip: 'Foliar spray of Fish Amino Acid 5 mL/L + Neem oil 10000 PPM @ 2 mL/L to suppress mealybugs and boost vigor.',
        organicTipKn: 'ಹಿಟ್ಟು ತಿಗಣೆ ನಿಯಂತ್ರಣಕ್ಕೆ ಮೀನಿನ ಅಮೈನೋ ಆಸಿಡ್ 5 mL/L ಜೊತೆಗೆ ಬೇವಿನ ಎಣ್ಣೆ @ 2 mL/L ಸಿಂಪಡಿಸಿ.',
        organicTipHi: 'फिश अमीनो एसिड 5 mL/L और नीम का तेल @ 2 mL/L का छिड़काव करें।',
        fertilizer: 'Apply foliar spray of Chelated Zinc @ 1 g/L + Magnesium Sulphate @ 5 g/L to relieve interveinal chlorosis.',
        fertilizerKn: 'ಎಲೆಗಳ ಹಳದಿ ರೋಗ ನಿವಾರಿಸಲು Chelated Zinc @ 1 g/L ಜೊತೆಗೆ ಮೆಗ್ನೀಷಿಯಂ ಸಲ್ಫೇಟ್ @ 5 g/L ಸಿಂಪಡಿಸಿ.',
        fertilizerHi: 'पत्तियों का पीलापन दूर करने के लिए चिलेटेड जिंक और मैग्नीशियम सल्फेट का छिड़काव करें।',
        scheme: 'ICAR-IISR Black Pepper Health Advisory',
        schemeLink: 'https://spices.res.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Severe leaf mottling, puckering, crinkling, reduced leaf size, and shortened internodes ("stunting")',
          'Spikes become very short with uneven and poor berry setting',
          'Mealybug-transmitted badnavirus; virus-free planting material is the only permanent solution'
        ],
        keyTakeawaysKn: [
          'ಎಲೆಗಳು ಸುಕ್ಕುಗಟ್ಟಿ, ಸಣ್ಣದಾಗಿ, ಗೆಣ್ಣುಗಳು ಗಿಡ್ಡವಾಗಿ ಇಡೀ ಬಳ್ಳಿ ಕುಂಠಿತಗೊಳ್ಳುತ್ತದೆ ("ಗಿಡ್ಡಾಗುವಿಕೆ")',
          'ಕಾಳು ಗೊಂಚಲುಗಳು ಅತ್ಯಂತ ಸಣ್ಣದಾಗಿ ಕೇವಲ ಕೆಲವೇ ಕಾಳುಗಳು ಕಚ್ಚುತ್ತವೆ',
          'ಹಿಟ್ಟು ತಿಗಣೆಗಳಿಂದ ಹರಡುವ ವೈರಸ್ ರೋಗ; ಕಡ್ಡಾಯವಾಗಿ ರೋಗಮುಕ್ತ ಸಸಿಗಳನ್ನೇ ನಾಟಿ ಮಾಡಿ'
        ],
        keyTakeawaysHi: [
          'पत्तियां मुड़कर सिकुड़ जाती हैं, छोटी रह जाती हैं और पोरियां छोटी होकर बेल बौनी रह जाती है',
          'बालियां बहुत छोटी बनती हैं और उनमें बहुत कम दाने बैठते हैं',
          'मिलीबग द्वारा फैलता है; हमेशा वायरस-मुक्त प्रमाणित पौध लगाना ही इसका स्थायी इलाज है'
        ],
        products: [
          { name: 'Thiamethoxam 25 WG', type: 'chemical', brand: 'Actara (Syngenta)', price: '₹220 – ₹340 / 100g', query: 'Thiamethoxam 25 WG Actara' },
          { name: 'Chelated Zinc 12% EDTA', type: 'fertilizer', brand: 'Multiplex / Aries', price: '₹180 – ₹280 / 250g', query: 'Chelated Zinc EDTA 12' }
        ]
      }
    ]
  }
];
