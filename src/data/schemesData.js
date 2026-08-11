export const kaSchemes = [
  // ==========================================
  // AGRICULTURE
  // ==========================================
  {
    id: 'pm-kisan',
    category: 'Agriculture',
    districtSpecific: ['All'],
    title: { en: 'PM Kisan Samman Nidhi', kn: 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ ನಿಧಿ', hi: 'PM किसान सम्मान निधि' },
    desc: { 
      en: 'Central government program providing ₹6,000 per year in three equal instalments directly into the bank accounts of land-holding families.', 
      kn: 'ವಾರ್ಷಿಕ ₹6,000 ಪ್ರೋತ್ಸಾಹಧನವನ್ನು ತಲಾ ₹2,000 ನಂತೆ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡುವ ಯೋಜನೆ.', 
      hi: '₹6,000 प्रति वर्ष 3 समान किस्तों में सीधे किसानों के खाते में।' 
    },
    eligibility: {
      en: 'All landholding farmer families across the state.',
      kn: 'ರಾಜ್ಯದ ಜಮೀನು ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು.',
      hi: 'सभी भूमिधारक किसान परिवार।'
    },
    documents: {
      en: 'Aadhaar, Land Registry Details, Bank Passbook, e-KYC.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ ಪತ್ರ, ಬ್ಯಾಂಕ್ ಖಾತೆ, ಇ-ಕೆವೈಸಿ.',
      hi: 'आधार, भूमि दस्तावेज, बैंक खाता, ई-केवाईसी।'
    },
    img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80',
    badge: { en: 'Active', kn: 'ಸಕ್ರಿಯ', hi: 'सक्रिय' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of Agriculture, GoI', kn: 'ಕೃಷಿ ಸಚಿವಾಲಯ, ಭಾರತ', hi: 'कृषि मंत्रालय, भारत सरकार' },
    applyLink: 'https://pmkisan.gov.in/'
  },
  {
    id: 'pmfby',
    category: 'Agriculture',
    districtSpecific: ['All'],
    title: { en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', kn: 'ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ', hi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)' },
    desc: { 
      en: 'Crop insurance scheme providing financial support to farmers in the event of failure of any notified crop as a result of natural calamities, pests & diseases.', 
      kn: 'ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳು, ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳ ಪರಿಣಾಮವಾಗಿ ಬೆಳೆ ಹಾನಿಯಾದಲ್ಲಿ ರೈತರಿಗೆ ವಿಮಾ ರಕ್ಷಣೆ.', 
      hi: 'प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल खराब होने की स्थिति में वित्तीय सहायता।' 
    },
    eligibility: {
      en: 'All farmers including sharecroppers and tenant farmers growing notified crops.',
      kn: 'ಎಲ್ಲಾ ರೈತರು (ಗೇಣಿದಾರರು ಸೇರಿ) ಅಧಿಸೂಚಿತ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯುವವರು.',
      hi: 'सभी किसान जो अधिसूचित फसलें उगाते हैं।'
    },
    documents: {
      en: 'Aadhaar, Land Records, Bank Passbook, Sowing Certificate.',
      kn: 'ಆಧಾರ್, ಭೂ ದಾಖಲೆ (ಪಹಣಿ), ಬ್ಯಾಂಕ್ ಖಾತೆ, ಬಿತ್ತನೆ ಪ್ರಮಾಣಪತ್ರ.',
      hi: 'आधार, भूमि रिकॉर्ड, बैंक पासबुक, बुवाई प्रमाण पत्र।'
    },
    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    badge: { en: 'Check Deadlines', kn: 'ಕೊನೆಯ ದಿನಾಂಕ ಪರಿಶೀಲಿಸಿ', hi: 'अंतिम तिथि जांचें' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Ministry of Agriculture & Farmers Welfare', kn: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ', hi: 'कृषि एवं किसान कल्याण मंत्रालय' },
    applyLink: 'https://pmfby.gov.in/'
  },
  {
    id: 'kisan-credit-card',
    category: 'Agriculture',
    districtSpecific: ['All'],
    title: { en: 'Kisan Credit Card (KCC)', kn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC)', hi: 'किसान क्रेडिट कार्ड (KCC)' },
    desc: { 
      en: 'Provides farmers with timely access to adequate credit for agricultural expenses at concessional interest rates.', 
      kn: 'ಕೃಷಿ ವೆಚ್ಚಗಳಿಗಾಗಿ ರಿಯಾಯಿತಿ ಬಡ್ಡಿ ದರದಲ್ಲಿ ಸಕಾಲಿಕ ಸಾಲ ಸೌಲಭ್ಯ ಒದಗಿಸುತ್ತದೆ.', 
      hi: 'किसानों को रियायती ब्याज दरों पर कृषि खर्च के लिए ऋण सुविधा।' 
    },
    eligibility: {
      en: 'Farmers, Tenant Farmers, Share Croppers, SHGs, and JLGs involved in agriculture/allied activities.',
      kn: 'ರೈತರು, ಗೇಣಿದಾರರು ಮತ್ತು ಕೃಷಿ/ಪಶುಸಂಗೋಪನೆ ಮಾಡುವ ಸ್ವಸಹಾಯ ಸಂಘಗಳು.',
      hi: 'सभी किसान, पशुपालक और मछुआरे।'
    },
    documents: {
      en: 'Aadhaar, PAN Card, Land Records, Passport Photo.',
      kn: 'ಆಧಾರ್, ಪ್ಯಾನ್ ಕಾರ್ಡ್, ಭೂ ದಾಖಲೆಗಳು, ಪಾಸ್‌ಪೋರ್ಟ್ ಫೋಟೋ.',
      hi: 'आधार, पैन कार्ड, भूमि रिकॉर्ड, फोटो।'
    },
    img: 'https://images.unsplash.com/photo-1589828135898-d14fb4081c70?w=600&q=80',
    badge: { en: 'Apply via Bank', kn: 'ಬ್ಯಾಂಕ್ ಮೂಲಕ ಅರ್ಜಿ', hi: 'बैंक के माध्यम से आवेदन' },
    badgeClass: 'badge-info',
    ministry: { en: 'Ministry of Finance & RBI', kn: 'ಹಣಕಾಸು ಸಚಿವಾಲಯ ಮತ್ತು ಆರ್‌ಬಿಐ', hi: 'वित्त मंत्रालय एवं आरबीआई' },
    applyLink: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card'
  },
  {
    id: 'rkvy-soil',
    category: 'Agriculture',
    districtSpecific: ['All'],
    title: { en: 'RKVY - Soil Health & Fertility', kn: 'ಆರ್‌ಕೆವಿವೈ - ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಫಲವತ್ತತೆ', hi: 'RKVY - मृदा स्वास्थ्य' },
    desc: { 
      en: 'Promotes soil test-based nutrient management through the distribution of Soil Health Cards to farmers.', 
      kn: 'ರೈತರಿಗೆ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್‌ಗಳನ್ನು ವಿತರಿಸುವ ಮೂಲಕ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಆಧಾರಿತ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ.', 
      hi: 'मृदा स्वास्थ्य कार्ड के माध्यम से उर्वरक प्रबंधन को बढ़ावा।' 
    },
    eligibility: {
      en: 'All farmers. Contact local RSK (Raitha Samparka Kendra) for soil testing.',
      kn: 'ಎಲ್ಲಾ ರೈತರು. ಮಣ್ಣು ಪರೀಕ್ಷೆಗಾಗಿ ಸ್ಥಳೀಯ RSK ಸಂಪರ್ಕಿಸಿ.',
      hi: 'सभी किसान।'
    },
    documents: {
      en: 'Land Details, Farmer Registration ID (FRUITS).',
      kn: 'ಭೂಮಿಯ ವಿವರಗಳು, ರೈತ ನೋಂದಣಿ ಐಡಿ (FRUITS).',
      hi: 'भूमि का विवरण।'
    },
    img: 'https://images.unsplash.com/photo-1627920769852-5c21f5fb3d0f?w=600&q=80',
    badge: { en: 'Contact RSK', kn: 'RSK ಸಂಪರ್ಕಿಸಿ', hi: 'RSK से संपर्क करें' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept. of Agriculture, Karnataka', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'कृषि विभाग, कर्नाटक' },
    applyLink: 'https://soilhealth.dac.gov.in/'
  },
  {
    id: 'coffee-dev',
    category: 'Agriculture',
    districtSpecific: ['Chikkamagaluru', 'Kodagu', 'Hassan'],
    title: { en: 'Coffee Development Program', kn: 'ಕಾಫಿ ಅಭಿವೃದ್ಧಿ ಯೋಜನೆ', hi: 'कॉफी विकास कार्यक्रम' },
    desc: { 
      en: 'Subsidies and technical assistance for replanting, water augmentation, and quality upgradation of Coffee estates.', 
      kn: 'ಕಾಫಿ ತೋಟಗಳ ಮರು-ನೆಡುವಿಕೆ, ನೀರಾವರಿ ಮತ್ತು ಗುಣಮಟ್ಟ ಸುಧಾರಣೆಗೆ ಸಹಾಯಧನ.', 
      hi: 'कॉफी बागानों के विकास और गुणवत्ता सुधार के लिए सब्सिडी।' 
    },
    eligibility: {
      en: 'Registered coffee growers in traditional areas (Kodagu, Chikkamagaluru, Hassan).',
      kn: 'ಮಲೆನಾಡು ಭಾಗದ ನೋಂದಾಯಿತ ಕಾಫಿ ಬೆಳೆಗಾರರು.',
      hi: 'पंजीकृत कॉफी उत्पादक।'
    },
    documents: {
      en: 'Coffee Board Registration Certificate, Land RTC, Bank Details.',
      kn: 'ಕಾಫಿ ಬೋರ್ಡ್ ನೋಂದಣಿ ಪತ್ರ, ಪಹಣಿ, ಬ್ಯಾಂಕ್ ವಿವರ.',
      hi: 'कॉफी बोर्ड पंजीकरण, भूमि रिकॉर्ड।'
    },
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    badge: { en: 'Malnad Region', kn: 'ಮಲೆನಾಡು', hi: 'मलनाड क्षेत्र' },
    badgeClass: 'badge-success',
    ministry: { en: 'Coffee Board of India', kn: 'ಕಾಫಿ ಮಂಡಳಿ', hi: 'कॉफी बोर्ड' },
    applyLink: 'https://www.indiacoffee.org/'
  },
  {
    id: 'raitha-siri',
    category: 'Agriculture',
    districtSpecific: ['All'],
    title: { en: 'Raitha Siri Scheme', kn: 'ರೈತ ಸಿರಿ ಯೋಜನೆ', hi: 'रैता सिरि योजना' },
    desc: { 
      en: 'Provides assistance of ₹10,000 per hectare for organic millets cultivation to promote sustainable agriculture and water-saving crops.', 
      kn: 'ಸಾವಯವ ಸಿರಿಧಾನ್ಯಗಳ ಬೇಸಾಯಕ್ಕಾಗಿ ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000 ಪ್ರೋತ್ಸಾಹಧನ ನೀಡಿ ನೀರಿನ ಮಿತವ್ಯಯದ ಬೆಳೆಗಳನ್ನು ಉತ್ತೇಜಿಸುವ ಯೋಜನೆ.', 
      hi: 'जैविक बाजरा की खेती के लिए ₹10,000 प्रति हेक्टेयर सहायता प्रदान करता है।' 
    },
    eligibility: {
      en: 'Small and marginal farmers holding valid land registry (Pahani/RTC) in Karnataka.',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಸಿಂಧು ಭೂ ದಾಖಲೆ ಹೊಂದಿರುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.',
      hi: 'कर्नाटक के छोटे किसान।'
    },
    documents: {
      en: 'Aadhaar Card, Land RTC (Pahani), Bank Account copy, Millet cultivation declaration.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ/RTC, ಬ್ಯಾಂಕ್ ವಿವರಗಳು, ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುತ್ತಿರುವ ಘೋಷಣೆ ಪತ್ರ.',
      hi: 'आधार कार्ड, भूमि दस्तावेज, बैंक खाता विवरण।'
    },
    img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80',
    badge: { en: 'Eligible', kn: 'ಅರ್ಹರು', hi: 'पात्र' },
    badgeClass: 'badge-success',
    ministry: { en: 'Dept. of Agriculture, Karnataka', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'कृषि विभाग, कर्नाटक' },
    applyLink: 'https://raitamitra.karnataka.gov.in/'
  },

  // ==========================================
  // WOMEN, CHILD & HEALTH
  // ==========================================
  {
    id: 'gruha-lakshmi',
    category: 'Women & Health',
    districtSpecific: ['All'],
    title: { en: 'Gruha Lakshmi Scheme', kn: 'ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ', hi: 'गृह लक्ष्मी योजना' },
    desc: { 
      en: 'Direct Benefit Transfer (DBT) of ₹2,000 monthly to the woman head of household in BPL and Antyodaya cards.', 
      kn: 'ಆದ್ಯತಾ ಪಡಿತರ ಚೀಟಿಗಳಲ್ಲಿ (BPL / ಅಂತ್ಯೋದಯ) ಮನೆ ಯಜಮಾನಿ ಎಂದು ಗುರುತಿಸಲ್ಪಟ್ಟ ಮಹಿಳೆಗೆ ಮಾಸಿಕ ₹2,000 ನೇರ ವರ್ಗಾವಣೆ.', 
      hi: 'महिला मुखिया को ₹2,000 मासिक सीधे बैंक ट्रांसफर।' 
    },
    eligibility: {
      en: 'Woman heads of households in Karnataka with valid BPL/AAY cards. Tax payers and government employees excluded.',
      kn: 'ರಾಜ್ಯದ ಬಿಪಿಎಲ್/ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಮಹಿಳಾ ಮುಖ್ಯಸ್ಥರು.',
      hi: 'कर्नाटक की बीपीएल महिला मुखिया।'
    },
    documents: {
      en: 'Aadhaar Card of Self & Spouse, Ration Card, Bank Account linked with Aadhaar.',
      kn: 'ಅರ್ಜಿದಾರರು ಮತ್ತು ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್, ಪಡಿತರ ಚೀಟಿ, ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'आधार कार्ड, राशन कार्ड, बैंक खाता।'
    },
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    badge: { en: 'DBT Scheme', kn: 'DBT ಯೋಜನೆ', hi: 'DBT योजना' },
    badgeClass: 'badge-success',
    ministry: { en: 'Women & Child Development Dept.', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
    applyLink: 'https://sevasindhuservices.karnataka.gov.in/'
  },
  {
    id: 'stree-shakti',
    category: 'Women & Health',
    districtSpecific: ['All'],
    title: { en: 'Stree Shakti - Women Empowerment', kn: 'ಸ್ತ್ರೀ ಶಕ್ತಿ ಯೋಜನೆ', hi: 'स्त्री शक्ति योजना' },
    desc: { 
      en: 'Empowers rural women by organizing them into Self-Help Groups (SHGs) and providing micro-credit and revolving funds.', 
      kn: 'ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರನ್ನು ಸ್ವಸಹಾಯ ಸಂಘಗಳಾಗಿ (SHG) ಸಂಘಟಿಸಿ ಕಿರುಸಾಲ ಮತ್ತು ಸುತ್ತು ನಿಧಿ ಒದಗಿಸಿ ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.', 
      hi: 'ग्रामीण महिलाओं को स्व-सहायता समूहों (SHG) के माध्यम से सूक्ष्म ऋण प्रदान करना।' 
    },
    eligibility: {
      en: 'Rural women forming a Self Help Group (15-20 members) below poverty line or landless agricultural laborers.',
      kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬದ ಅಥವಾ ಭೂರಹಿತ ಕೃಷಿ ಕಾರ್ಮಿಕ ಮಹಿಳೆಯರು ರಚಿಸಿದ ಸ್ವಸಹಾಯ ಸಂಘ.',
      hi: 'गरीबी रेखा से नीचे की ग्रामीण महिलाएं।'
    },
    documents: {
      en: 'BPL Card, Aadhaar, SHG Bank Account.',
      kn: 'ಬಿಪಿಎಲ್ ಕಾರ್ಡ್, ಆಧಾರ್, ಸಂಘದ ಬ್ಯಾಂಕ್ ಖಾತೆ.',
      hi: 'बीपीएल कार्ड, आधार, बैंक खाता।'
    },
    img: 'https://images.unsplash.com/photo-1603597395015-8167f1dc219d?w=600&q=80',
    badge: { en: 'SHG Support', kn: 'ಸ್ವಸಹಾಯ ಸಂಘ', hi: 'SHG समर्थन' },
    badgeClass: 'badge-info',
    ministry: { en: 'Women & Child Development Dept.', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
    applyLink: 'https://dwcd.karnataka.gov.in/'
  },
  {
    id: 'bhagya-lakshmi',
    category: 'Women & Health',
    districtSpecific: ['All'],
    title: { en: 'Bhagya Lakshmi - Girl Child Support', kn: 'ಭಾಗ್ಯ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ', hi: 'भाग्य लक्ष्मी योजना' },
    desc: { 
      en: 'Financial assistance for the birth of girl children in BPL families to improve sex ratio and educate girls. A bond is deposited in the child’s name.', 
      kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬಗಳಲ್ಲಿ ಹೆಣ್ಣು ಮಗು ಜನಿಸಿದರೆ ಅವರ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಬಾಂಡ್ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'बीपीएल परिवारों में बालिकाओं के जन्म पर वित्तीय सहायता और बॉन्ड।' 
    },
    eligibility: {
      en: 'Girl children born in BPL families. Up to two girl children per family.',
      kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬದಲ್ಲಿ ಜನಿಸಿದ ಗರಿಷ್ಠ ಇಬ್ಬರು ಹೆಣ್ಣುಮಕ್ಕಳು.',
      hi: 'बीपीएल परिवारों में जन्मी बालिकाएं (अधिकतम 2)।'
    },
    documents: {
      en: 'Birth Certificate, BPL Card, Mother’s Aadhaar.',
      kn: 'ಜನನ ಪ್ರಮಾಣಪತ್ರ, ಬಿಪಿಎಲ್ ಕಾರ್ಡ್, ತಾಯಿಯ ಆಧಾರ್.',
      hi: 'जन्म प्रमाण पत्र, बीपीएल कार्ड, आधार।'
    },
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
    badge: { en: 'Child Future', kn: 'ಮಕ್ಕಳ ಭವಿಷ್ಯ', hi: 'बालिका भविष्य' },
    badgeClass: 'badge-success',
    ministry: { en: 'Women & Child Development Dept.', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
    applyLink: 'https://dwcd.karnataka.gov.in/'
  },
  {
    id: 'madilu-kit',
    category: 'Women & Health',
    districtSpecific: ['All'],
    title: { en: 'Madilu Kit Yojana', kn: 'ಮಡಿಲು ಕಿಟ್ ಯೋಜನೆ', hi: 'मडिलु किट योजना' },
    desc: { 
      en: 'Provides a kit containing essential items for postnatal care of the mother and the newborn child to encourage institutional deliveries.', 
      kn: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಹೆರಿಗೆಯಾದ ತಾಯಿ ಮತ್ತು ನವಜಾತ ಶಿಶುವಿನ ಆರೈಕೆಗಾಗಿ ಅಗತ್ಯ ವಸ್ತುಗಳ ‘ಮಡಿಲು ಕಿಟ್’ ವಿತರಣೆ.', 
      hi: 'सरकारी अस्पतालों में प्रसव के बाद मां और नवजात शिशु के लिए आवश्यक किट।' 
    },
    eligibility: {
      en: 'BPL women delivering in Government Hospitals in Karnataka.',
      kn: 'ಕರ್ನಾಟಕದ ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಹೆರಿಗೆಯಾದ ಬಿಪಿಎಲ್ ಮಹಿಳೆಯರು.',
      hi: 'सरकारी अस्पतालों में प्रसव करने वाली बीपीएल महिलाएं।'
    },
    documents: {
      en: 'BPL Card, Mother & Child Tracking System (MCTS) ID, Discharge Summary.',
      kn: 'ಬಿಪಿಎಲ್ ಕಾರ್ಡ್, MCTS ಗುರುತಿನ ಚೀಟಿ, ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶ.',
      hi: 'बीपीएल कार्ड, अस्पताल के दस्तावेज।'
    },
    img: 'https://images.unsplash.com/photo-1544027429-de982703fb7a?w=600&q=80',
    badge: { en: 'Maternal Care', kn: 'ತಾಯಂದಿರ ಆರೈಕೆ', hi: 'मातृत्व देखभाल' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept. of Health & Family Welfare', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'स्वास्थ्य एवं परिवार कल्याण विभाग' },
    applyLink: 'https://arogya.karnataka.gov.in/'
  },
  {
    id: 'ayushman-bharat',
    category: 'Women & Health',
    districtSpecific: ['All'],
    title: { en: 'Ayushman Bharat - Arogya Karnataka', kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ - ಆರೋಗ್ಯ ಕರ್ನಾಟಕ', hi: 'आयुष्मान भारत - आरोग्य कर्नाटक' },
    desc: { 
      en: 'Covers up to ₹5 Lakhs per family annually for free secondary and tertiary healthcare services at government and empanelled private hospitals.', 
      kn: 'ಸರ್ಕಾರಿ ಮತ್ತು ನೊಂದಾಯಿತ ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಚಿಕಿತ್ಸೆಗೆ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ವಿಮಾ ಸೌಲಭ್ಯ.', 
      hi: 'सरकारी और सूचीबद्ध निजी अस्पतालों में इलाज के लिए ₹5 लाख तक का कवर।' 
    },
    eligibility: {
      en: 'All Karnataka residents. BPL families receive 100% free treatment; APL families receive 30% co-payment support.',
      kn: 'ರಾಜ್ಯದ ಎಲ್ಲಾ ನಿವಾಸಿಗಳು. ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ದಾರರಿಗೆ ಪೂರ್ಣ ಉಚಿತ ಸೌಲಭ್ಯ.',
      hi: 'कर्नाटक के सभी निवासी।'
    },
    documents: {
      en: 'Aadhaar Card, Ration Card (BPL/APL).',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಡಿತರ ಚೀಟಿ (BPL/APL).',
      hi: 'आधार कार्ड, राशन कार्ड।'
    },
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    badge: { en: 'Health Cover', kn: 'ಆರೋಗ್ಯ ವಿಮೆ', hi: 'स्वास्थ्य कवर' },
    badgeClass: 'badge-info',
    ministry: { en: 'Ministry of Health and Family Welfare', kn: 'ಆರೋಗ್ಯ ಸಚಿವಾಲಯ', hi: 'स्वास्थ्य मंत्रालय' },
    applyLink: 'https://arogya.karnataka.gov.in/'
  },
  {
    id: 'pm-ujjwala',
    category: 'Women & Health',
    districtSpecific: ['All'],
    title: { en: 'PM Ujjwala Yojana', kn: 'ಪಿಎಂ ಉಜ್ವಲ ಯೋಜನೆ', hi: 'पीएम उज्ज्वला योजना' },
    desc: { 
      en: 'Provides LPG connections to women from BPL households to replace unclean cooking fuels with clean and more efficient LPG.', 
      kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬದ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी गैस कनेक्शन।' 
    },
    eligibility: {
      en: 'Adult women belonging to BPL households or Antyodaya Anna Yojana (AAY).',
      kn: 'ಬಿಪಿಎಲ್ ಅಥವಾ ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ವಯಸ್ಕ ಮಹಿಳೆಯರು.',
      hi: 'बीपीएल या अंत्योदय राशन कार्ड वाली महिलाएं।'
    },
    documents: {
      en: 'Aadhaar (Applicant and family), BPL Ration Card, Bank Account.',
      kn: 'ಆಧಾರ್, ಬಿಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ, ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ.',
      hi: 'आधार, बीपीएल राशन कार्ड, बैंक खाता।'
    },
    img: 'https://images.unsplash.com/photo-1596765798933-77d079946d3e?w=600&q=80',
    badge: { en: 'LPG Connection', kn: 'ಎಲ್‌ಪಿಜಿ ಸಂಪರ್ಕ', hi: 'एलपीजी कनेक्शन' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Ministry of Petroleum and Natural Gas', kn: 'ಪೆಟ್ರೋಲಿಯಂ ಮತ್ತು ನೈಸರ್ಗಿಕ ಅನಿಲ ಸಚಿವಾಲಯ', hi: 'पेट्रोलियम और प्राकृतिक गैस मंत्रालय' },
    applyLink: 'https://www.pmuy.gov.in/'
  },

  // ==========================================
  // RURAL INFRASTRUCTURE
  // ==========================================
  {
    id: 'mgnregs',
    category: 'Infrastructure',
    districtSpecific: ['All'],
    title: { en: 'MGNREGS - Rural Employment', kn: 'ನರೇಗಾ ಯೋಜನೆ (MGNREGA)', hi: 'मनरेगा (MGNREGS)' },
    desc: { 
      en: 'Guarantees 100 days of wage employment in a financial year to rural households for unskilled manual work.', 
      kn: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದಲ್ಲಿ ಕೌಶಲ್ಯರಹಿತ ಕಾರ್ಮಿಕರಿಗೆ ಆರ್ಥಿಕ ವರ್ಷದಲ್ಲಿ 100 ದಿನಗಳ ಉದ್ಯೋಗ ಖಾತರಿ.', 
      hi: 'ग्रामीण क्षेत्रों में अकुशल श्रमिकों के लिए 100 दिनों के रोजगार की गारंटी।' 
    },
    eligibility: {
      en: 'Adult members of a rural household willing to do unskilled manual work.',
      kn: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ವಯಸ್ಕ ಸದಸ್ಯರು ಉದ್ಯೋಗ ಮಾಡಲು ಸಿದ್ಧರಾಗಿರುವವರು.',
      hi: 'शारीरिक श्रम करने के इच्छुक ग्रामीण वयस्क।'
    },
    documents: {
      en: 'Job Card, Aadhaar, Bank Passbook.',
      kn: 'ನರೇಗಾ ಜಾಬ್ ಕಾರ್ಡ್, ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'जॉब कार्ड, आधार, बैंक खाता।'
    },
    img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=600&q=80',
    badge: { en: 'Job Guarantee', kn: 'ಉದ್ಯೋಗ ಖಾತರಿ', hi: 'रोजगार गारंटी' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Ministry of Rural Development', kn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ', hi: 'ग्रामीण विकास मंत्रालय' },
    applyLink: 'https://nrega.nic.in/'
  },
  {
    id: 'pmay-g',
    category: 'Infrastructure',
    districtSpecific: ['All'],
    title: { en: 'PMAY-G (Housing)', kn: 'ಪಿಎಂಎವೈ-ಗ್ರಾಮೀಣ (ವಸತಿ)', hi: 'पीएमएवाई-जी (आवास)' },
    desc: { 
      en: 'Financial assistance for the construction of pucca houses with basic amenities for rural houseless families.', 
      kn: 'ಗ್ರಾಮೀಣ ಭೂರಹಿತ ಮತ್ತು ವಸತಿಹೀನ ಕುಟುಂಬಗಳಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಿಕೊಳ್ಳಲು ಆರ್ಥಿಕ ಸಹಾಯ.', 
      hi: 'ग्रामीण बेघर परिवारों के लिए पक्के घर के निर्माण हेतु वित्तीय सहायता।' 
    },
    eligibility: {
      en: 'Houseless families or those living in zero/one/two room kutcha houses (identified via SECC data).',
      kn: 'ಸ್ವಂತ ಮನೆ ಇಲ್ಲದವರು ಅಥವಾ ಕಚ್ಚಾ ಮನೆಯಲ್ಲಿ ವಾಸಿಸುತ್ತಿರುವ ಗ್ರಾಮೀಣರು.',
      hi: 'बेघर परिवार या कच्चे घरों में रहने वाले लोग।'
    },
    documents: {
      en: 'Aadhaar, Job Card, Bank Account, SECC ID.',
      kn: 'ಆಧಾರ್, ನರೇಗಾ ಜಾಬ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಖಾತೆ, SECC ಗುರುತು.',
      hi: 'आधार, जॉब कार्ड, बैंक खाता।'
    },
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    badge: { en: 'Rural Housing', kn: 'ಗ್ರಾಮೀಣ ವಸತಿ', hi: 'ग्रामीण आवास' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of Rural Development', kn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ', hi: 'ग्रामीण विकास मंत्रालय' },
    applyLink: 'https://pmayg.nic.in/'
  },
  {
    id: 'jal-jeevan',
    category: 'Infrastructure',
    districtSpecific: ['All'],
    title: { en: 'Jal Jeevan Mission', kn: 'ಜಲ ಜೀವನ್ ಮಿಷನ್', hi: 'जल जीवन मिशन' },
    desc: { 
      en: 'Ensures functional household tap connections (FHTC) providing safe drinking water to every rural household.', 
      kn: 'ಪ್ರತಿಯೊಂದು ಗ್ರಾಮೀಣ ಮನೆಗೂ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ನಲ್ಲಿ ಸಂಪರ್ಕ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'प्रत्येक ग्रामीण घर में नल से शुद्ध पेयजल की आपूर्ति।' 
    },
    eligibility: {
      en: 'All rural households without a tap connection.',
      kn: 'ನಲ್ಲಿ ಸಂಪರ್ಕವಿಲ್ಲದ ಎಲ್ಲಾ ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳು.',
      hi: 'सभी ग्रामीण घर जिनमें नल कनेक्शन नहीं है।'
    },
    documents: {
      en: 'Contact local Gram Panchayat or Village Water & Sanitation Committee (VWSC).',
      kn: 'ಸ್ಥಳೀಯ ಗ್ರಾಮ ಪಂಚಾಯತ್ ಅಥವಾ VWSC ಸಂಪರ್ಕಿಸಿ.',
      hi: 'ग्राम पंचायत से संपर्क करें।'
    },
    img: 'https://images.unsplash.com/photo-1548811579-017fc2a7f23e?w=600&q=80',
    badge: { en: 'Tap Water', kn: 'ನಲ್ಲಿ ನೀರು', hi: 'नल जल' },
    badgeClass: 'badge-info',
    ministry: { en: 'Ministry of Jal Shakti', kn: 'ಜಲ ಶಕ್ತಿ ಸಚಿವಾಲಯ', hi: 'जल शक्ति मंत्रालय' },
    applyLink: 'https://jaljeevanmission.gov.in/'
  },
  {
    id: 'pmgsy',
    category: 'Infrastructure',
    districtSpecific: ['All'],
    title: { en: 'PMGSY - Rural Roads', kn: 'ಪಿಎಂಜಿಎಸ್‌ವೈ (ಗ್ರಾಮೀಣ ರಸ್ತೆ)', hi: 'पीएमजीएसवाई (ग्रामीण सड़कें)' },
    desc: { 
      en: 'Pradhan Mantri Gram Sadak Yojana provides all-weather road connectivity to unconnected rural habitations.', 
      kn: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಿಗೆ ಸರ್ವಋತು ರಸ್ತೆ ಸಂಪರ್ಕ ಒದಗಿಸುವ ಕೇಂದ್ರ ಸರ್ಕಾರದ ಯೋಜನೆ.', 
      hi: 'ग्रामीण क्षेत्रों को पक्की सड़कों से जोड़ने की योजना।' 
    },
    eligibility: {
      en: 'Implemented at Gram Panchayat/District level. Citizens can request road development via local reps.',
      kn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಮೂಲಕ ರಸ್ತೆ ಅಭಿವೃದ್ಧಿಗೆ ಮನವಿ ಸಲ್ಲಿಸಬಹುದು.',
      hi: 'ग्राम पंचायत के माध्यम से लागू।'
    },
    documents: {
      en: 'Community Petition / Panchayat Resolution.',
      kn: 'ಪಂಚಾಯತ್ ಠರಾವು / ಸಾರ್ವಜನಿಕರ ಮನವಿ.',
      hi: 'पंचायत प्रस्ताव।'
    },
    img: 'https://images.unsplash.com/photo-1580982559099-232a4e22e9e6?w=600&q=80',
    badge: { en: 'Road Connectivity', kn: 'ರಸ್ತೆ ಸಂಪರ್ಕ', hi: 'सड़क संपर्क' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Ministry of Rural Development', kn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ', hi: 'ग्रामीण विकास मंत्रालय' },
    applyLink: 'https://omms.nic.in/'
  },
  {
    id: 'svamitva',
    category: 'Infrastructure',
    districtSpecific: ['All'],
    title: { en: 'SVAMITVA Yojana', kn: 'ಸ್ವಾಮಿತ್ವ ಯೋಜನೆ', hi: 'स्वामित्व योजना' },
    desc: { 
      en: 'Provides rural citizens with a “Record of Rights” (Property Cards) to use their rural residential properties as a financial asset.', 
      kn: 'ಗ್ರಾಮೀಣ ಆಸ್ತಿಗಳಿಗೆ ಆಸ್ತಿ ಕಾರ್ಡ್ (Property Card) ಒದಗಿಸುವ ಮೂಲಕ ಆಸ್ತಿಯ ಮಾಲೀಕತ್ವ ಹಕ್ಕು ನೀಡುವುದು.', 
      hi: 'ग्रामीण आवासीय संपत्तियों के लिए संपत्ति कार्ड (प्रॉपर्टी कार्ड) प्रदान करना।' 
    },
    eligibility: {
      en: 'Residents of rural inhabited areas (Abadi areas) in mapped villages.',
      kn: 'ಗ್ರಾಮೀಣ ವಸತಿ ಪ್ರದೇಶದ (ಗ್ರಾಮ ಠಾಣಾ) ನಿವಾಸಿಗಳು.',
      hi: 'ग्रामीण आबाद क्षेत्रों के निवासी।'
    },
    documents: {
      en: 'Aadhaar, Existing tax receipts / property proof. Verified via Drone mapping.',
      kn: 'ಆಧಾರ್, ಕಂದಾಯ ರಶೀದಿ. ಡ್ರೋನ್ ಸಮೀಕ್ಷೆ ಮೂಲಕ ಪರಿಶೀಲನೆ.',
      hi: 'आधार, संपत्ति का प्रमाण।'
    },
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80',
    badge: { en: 'Property Card', kn: 'ಆಸ್ತಿ ಕಾರ್ಡ್', hi: 'संपत्ति कार्ड' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Ministry of Panchayati Raj', kn: 'ಪಂಚಾಯತ್ ರಾಜ್ ಸಚಿವಾಲಯ', hi: 'पंचायती राज मंत्रालय' },
    applyLink: 'https://svamitva.nic.in/'
  },

  // ==========================================
  // FINANCE & DIGITAL
  // ==========================================
  {
    id: 'pm-jan-dhan',
    category: 'Finance',
    districtSpecific: ['All'],
    title: { en: 'PM Jan Dhan Yojana (PMJDY)', kn: 'ಪಿಎಂ ಜನ್ ಧನ್ ಯೋಜನೆ', hi: 'पीएम जन धन योजना' },
    desc: { 
      en: 'National mission for financial inclusion ensuring access to a basic savings bank account, credit, insurance, and pension.', 
      kn: 'ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಬ್ಯಾಂಕ್ ಖಾತೆ, ವಿಮೆ ಮತ್ತು ಪಿಂಚಣಿ ಸೌಲಭ್ಯ ಒದಗಿಸುವ ಆರ್ಥಿಕ ಸೇರ್ಪಡೆ ಯೋಜನೆ.', 
      hi: 'सभी के लिए बैंक खाता, बीमा और पेंशन सुविधा सुनिश्चित करना।' 
    },
    eligibility: {
      en: 'Any Indian citizen aged 10 years or older without an existing bank account.',
      kn: 'ಬ್ಯಾಂಕ್ ಖಾತೆ ಹೊಂದಿಲ್ಲದ 10 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಯಾವುದೇ ಭಾರತೀಯ ನಾಗರಿಕ.',
      hi: 'बैंक खाता न रखने वाले 10 वर्ष से अधिक आयु के नागरिक।'
    },
    documents: {
      en: 'Aadhaar Card, Passport Size Photo (No minimum balance required).',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಾಸ್‌ಪೋರ್ಟ್ ಫೋಟೋ (ಕನಿಷ್ಠ ಬ್ಯಾಲೆನ್ಸ್ ಅಗತ್ಯವಿಲ್ಲ).',
      hi: 'आधार कार्ड, फोटो (जीरो बैलेंस)।'
    },
    img: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=80',
    badge: { en: 'Zero Balance', kn: 'ಶೂನ್ಯ ಬ್ಯಾಲೆನ್ಸ್', hi: 'जीरो बैलेंस' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of Finance', kn: 'ಹಣಕಾಸು ಸಚಿವಾಲಯ', hi: 'वित्त मंत्रालय' },
    applyLink: 'https://pmjdy.gov.in/'
  },
  {
    id: 'pmgdisha',
    category: 'Finance',
    districtSpecific: ['All'],
    title: { en: 'PMGDISHA - Digital Literacy', kn: 'ಪಿಎಂಜಿದಿಶಾ (ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ)', hi: 'PMGDISHA - डिजिटल साक्षरता' },
    desc: { 
      en: 'Pradhan Mantri Gramin Digital Saksharta Abhiyaan aims to make rural households digitally literate by teaching basic computer and smartphone skills.', 
      kn: 'ಗ್ರಾಮೀಣ ಜನರಿಗೆ ಮೂಲಭೂತ ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಸುವ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತಾ ಅಭಿಯಾನ.', 
      hi: 'ग्रामीण क्षेत्रों में कंप्यूटर और स्मार्टफोन के उपयोग का बुनियादी प्रशिक्षण।' 
    },
    eligibility: {
      en: 'One person from every eligible rural household (Age 14-60) not digitally literate.',
      kn: 'ಡಿಜಿಟಲ್ ಜ್ಞಾನವಿಲ್ಲದ ಗ್ರಾಮೀಣ ಕುಟುಂಬದ ಒಬ್ಬ ಸದಸ್ಯ (14-60 ವರ್ಷ).',
      hi: 'प्रति ग्रामीण परिवार एक सदस्य (14-60 वर्ष)।'
    },
    documents: {
      en: 'Aadhaar Card. Register at nearest CSC (Common Service Centre).',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್. ಹತ್ತಿರದ ಸಿಎಸ್‌ಸಿ (CSC) ಕೇಂದ್ರದಲ್ಲಿ ನೋಂದಾಯಿಸಿ.',
      hi: 'आधार कार्ड (CSC पर पंजीकरण)।'
    },
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    badge: { en: 'Free Training', kn: 'ಉಚಿತ ತರಬೇತಿ', hi: 'मुफ्त प्रशिक्षण' },
    badgeClass: 'badge-info',
    ministry: { en: 'MeitY', kn: 'ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಸಚಿವಾಲಯ', hi: 'MeitY' },
    applyLink: 'https://www.pmgdisha.in/'
  },
  {
    id: 'day-nrlm',
    category: 'Finance',
    districtSpecific: ['All'],
    title: { en: 'DAY-NRLM - Rural Livelihoods', kn: 'ದೀನ್‌ದಯಾಳ್ ಅಂತ್ಯೋದಯ ಯೋಜನೆ', hi: 'DAY-NRLM आजीविका मिशन' },
    desc: { 
      en: 'Deendayal Antyodaya Yojana-NRLM mobilizes rural poor households into Self Help Groups to improve their livelihoods and access to formal credit.', 
      kn: 'ಗ್ರಾಮೀಣ ಬಡ ಕುಟುಂಬಗಳನ್ನು ಸ್ವಸಹಾಯ ಸಂಘಗಳಾಗಿ ಸಂಘಟಿಸಿ ಜೀವನೋಪಾಯ ಸುಧಾರಿಸುವ ಮತ್ತು ಸಾಲ ಸೌಲಭ್ಯ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'ग्रामीण गरीब परिवारों को स्वयं सहायता समूहों (SHG) में संगठित कर आजीविका में सुधार।' 
    },
    eligibility: {
      en: 'Rural poor households identified through SECC or participatory rural appraisal.',
      kn: 'SECC ಅಡಿಯಲ್ಲಿ ಗುರುತಿಸಲಾದ ಗ್ರಾಮೀಣ ಬಡ ಕುಟುಂಬಗಳು.',
      hi: 'SECC द्वारा पहचाने गए ग्रामीण गरीब परिवार।'
    },
    documents: {
      en: 'Aadhaar, BPL Card. Done via Gram Panchayat.',
      kn: 'ಆಧಾರ್, ಬಿಪಿಎಲ್ ಕಾರ್ಡ್. ಗ್ರಾಮ ಪಂಚಾಯತ್ ಮೂಲಕ.',
      hi: 'आधार, बीपीएल कार्ड।'
    },
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    badge: { en: 'Livelihood', kn: 'ಜೀವನೋಪಾಯ', hi: 'आजीविका' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Ministry of Rural Development', kn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ', hi: 'ग्रामीण विकास मंत्रालय' },
    applyLink: 'https://aajeevika.gov.in/'
  },

  // ==========================================
  // SCHOLARSHIPS
  // ==========================================
  {
    id: 'nsp-portal',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'NSP - National Scholarship Portal', kn: 'NSP - ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್', hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)' },
    desc: { 
      en: 'A unified portal for various Central and UGC/AICTE scholarship schemes for minority, SC/ST, and low-income students from Class 1 to Ph.D.', 
      kn: 'ಅಲ್ಪಸಂಖ್ಯಾತ, ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಮತ್ತು ಬಡ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕೇಂದ್ರ ಸರ್ಕಾರದ ವಿವಿಧ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಏಕೀಕೃತ ಪೋರ್ಟಲ್.', 
      hi: 'सभी केंद्रीय और राज्य छात्रवृत्तियों के लिए एकीकृत पोर्टल।' 
    },
    eligibility: {
      en: 'Depends on the specific scheme (Pre-Matric, Post-Matric, Merit-cum-Means).',
      kn: 'ವಿವಿಧ ಯೋಜನೆಗಳಿಗೆ ಅನುಗುಣವಾಗಿ (ಮೆಟ್ರಿಕ್ ಪೂರ್ವ, ಮೆಟ್ರಿಕ್ ನಂತರದ).',
      hi: 'विभिन्न योजनाओं के अनुसार।'
    },
    documents: {
      en: 'Aadhaar, Income Certificate, Caste Certificate, Previous Marks Card, Bank Passbook.',
      kn: 'ಆಧಾರ್, ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ, ಅಂಕಪಟ್ಟಿ, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'आधार, आय/जाति प्रमाण, मार्कशीट।'
    },
    img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
    badge: { en: 'One-Stop Portal', kn: 'ಏಕೀಕೃತ ಪೋರ್ಟಲ್', hi: 'वन-स्टॉप पोर्टल' },
    badgeClass: 'badge-success',
    ministry: { en: 'Govt. of India', kn: 'ಭಾರತ ಸರ್ಕಾರ', hi: 'भारत सरकार' },
    applyLink: 'https://scholarships.gov.in/'
  },
  {
    id: 'pm-scholarship',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'PM Scholarship Scheme (PMSS)', kn: 'ಪಿಎಂ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಯೋಜನೆ (PMSS)', hi: 'पीएम छात्रवृत्ति योजना (PMSS)' },
    desc: { 
      en: 'Promotes technical and professional education for the dependent wards/widows of ex-servicemen, CAPFs & AR personnel.', 
      kn: 'ಮಾಜಿ ಸೈನಿಕರು ಹಾಗೂ CAPF ಸಿಬ್ಬಂದಿಯ ಮಕ್ಕಳು ಮತ್ತು ವಿಧವೆಯರಿಗೆ ವೃತ್ತಿಪರ/ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ವಿದ್ಯಾರ್ಥಿವೇತನ.', 
      hi: 'पूर्व सैनिकों और CAPF कर्मियों के बच्चों/विधवाओं के लिए तकनीकी शिक्षा हेतु।' 
    },
    eligibility: {
      en: 'Wards/widows of Ex-Servicemen joining recognized professional/technical degree courses (BE, MBBS, etc.).',
      kn: 'ವೃತ್ತಿಪರ/ತಾಂತ್ರಿಕ ಪದವಿಗೆ ಸೇರಿರುವ ಮಾಜಿ ಸೈನಿಕರ ಮಕ್ಕಳು/ವಿಧವೆಯರು.',
      hi: 'मान्यता प्राप्त तकनीकी/व्यावसायिक डिग्री कोर्स में पढ़ने वाले बच्चे।'
    },
    documents: {
      en: 'Ex-Servicemen Proof, 10+2 Marks Card, Aadhaar, Bonafide Certificate.',
      kn: 'ಮಾಜಿ ಸೈನಿಕ ಪ್ರಮಾಣಪತ್ರ, 10+2 ಅಂಕಪಟ್ಟಿ, ಕಾಲೇಜು ದೃಢೀಕರಣ.',
      hi: 'पूर्व सैनिक प्रमाण, 10+2 मार्कशीट, कॉलेज प्रमाण पत्र।'
    },
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    badge: { en: 'For Ex-Servicemen', kn: 'ಮಾಜಿ ಸೈನಿಕರಿಗೆ', hi: 'पूर्व सैनिकों के लिए' },
    badgeClass: 'badge-info',
    ministry: { en: 'Kendriya Sainik Board / MHA', kn: 'ಕೇಂದ್ರೀಯ ಸೈನಿಕ ಮಂಡಳಿ', hi: 'केंद्रीय सैनिक बोर्ड' },
    applyLink: 'https://scholarships.gov.in/'
  },
  {
    id: 'pm-yasasvi',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'PM-YASASVI Scheme', kn: 'ಪಿಎಂ-ಯಶಸ್ವಿ ಯೋಜನೆ', hi: 'पीएम-यशस्वी योजना' },
    desc: { 
      en: 'PM Young Achievers Scholarship Award Scheme for Vibrant India for OBC, EBC and DNT students studying in Class 9 and Class 11.', 
      kn: '9 ಮತ್ತು 11 ನೇ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿರುವ ಓಬಿಸಿ, ಇಬಿಸಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಯುವ ಸಾಧಕರ ವಿದ್ಯಾರ್ಥಿವೇತನ.', 
      hi: 'कक्षा 9 और 11 में पढ़ने वाले OBC/EBC छात्रों के लिए युवा अचीवर्स छात्रवृत्ति।' 
    },
    eligibility: {
      en: 'OBC/EBC/DNT students studying in identified Top Schools with parental income < ₹2.5 Lakhs.',
      kn: 'ಗುರುತಿಸಲಾದ ಉನ್ನತ ಶಾಲೆಗಳಲ್ಲಿ ಓದುತ್ತಿರುವ ಓಬಿಸಿ ವಿದ್ಯಾರ್ಥಿಗಳು, ಆದಾಯ ₹2.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ.',
      hi: 'पारिवारिक आय ₹2.5 लाख से कम।'
    },
    documents: {
      en: 'Aadhaar, Income Certificate, Caste Certificate.',
      kn: 'ಆಧಾರ್, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ.',
      hi: 'आधार, आय और जाति प्रमाण पत्र।'
    },
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    badge: { en: 'Top Schools', kn: 'ಉನ್ನತ ಶಾಲೆಗಳಿಗೆ', hi: 'शीर्ष स्कूलों के लिए' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Ministry of Social Justice', kn: 'ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಸಚಿವಾಲಯ', hi: 'सामाजिक न्याय मंत्रालय' },
    applyLink: 'https://yet.nta.ac.in/'
  },
  {
    id: 'nmmss',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'NMMSS - Means-cum-Merit', kn: 'NMMSS ವಿದ್ಯಾರ್ಥಿವೇತನ', hi: 'NMMSS छात्रवृत्ति' },
    desc: { 
      en: 'National Means-cum-Merit Scholarship Scheme provides ₹12,000 per annum to meritorious students of economically weaker sections to arrest dropouts at class 8.', 
      kn: 'ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು 8ನೇ ತರಗತಿಯ ನಂತರ ಶಾಲೆಯಿಂದ ಹೊರಗುಳಿಯುವುದನ್ನು ತಪ್ಪಿಸಲು ವಾರ್ಷಿಕ ₹12,000 ನೆರವು.', 
      hi: 'आर्थिक रूप से कमजोर वर्गों के मेधावी छात्रों के लिए प्रति वर्ष ₹12,000।' 
    },
    eligibility: {
      en: 'Students studying in Govt/Aided schools scoring min 55% in Class 7. Family income < ₹3.5 Lakhs.',
      kn: '7ನೇ ತರಗತಿಯಲ್ಲಿ ಶೇ 55% ಅಂಕ ಗಳಿಸಿದ ಸರ್ಕಾರಿ ಶಾಲೆಯ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'सरकारी स्कूलों में कक्षा 8 में पढ़ने वाले छात्र।'
    },
    documents: {
      en: 'Selection Test result, Income Certificate, Aadhaar.',
      kn: 'ಆಯ್ಕೆ ಪರೀಕ್ಷೆ ಫಲಿತಾಂಶ, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಆಧಾರ್.',
      hi: 'चयन परीक्षा परिणाम, आय प्रमाण पत्र।'
    },
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
    badge: { en: 'School Level', kn: 'ಶಾಲಾ ಹಂತ', hi: 'स्कूली स्तर' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Ministry of Education', kn: 'ಶಿಕ್ಷಣ ಸಚಿವಾಲಯ', hi: 'शिक्षा मंत्रालय' },
    applyLink: 'https://scholarships.gov.in/'
  },
  {
    id: 'pm-usp',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'PM-USP Central Sector Scholarship', kn: 'ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ಸ್ಕಾಲರ್‌ಶಿಪ್', hi: 'पीएम-यूएसपी सेंट्रल सेक्टर स्कॉलरशिप' },
    desc: { 
      en: 'Provides financial assistance to meritorious students from low-income families to meet their day-to-day expenses while pursuing higher studies.', 
      kn: 'ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬದ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಆರ್ಥಿಕ ಸಹಾಯ.', 
      hi: 'उच्च शिक्षा प्राप्त करने के लिए कम आय वाले परिवारों के मेधावी छात्रों को वित्तीय सहायता।' 
    },
    eligibility: {
      en: 'Top 20th percentile in Class 12 board exams, pursuing regular graduation/PG, family income < ₹4.5 Lakhs.',
      kn: 'ಪಿಯುಸಿಯಲ್ಲಿ ಉನ್ನತ ಶ್ರೇಣಿಯಲ್ಲಿ ಉತ್ತೀರ್ಣರಾಗಿ ಪದವಿ/ಪಿಜಿ ಓದುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'कक्षा 12 की बोर्ड परीक्षा में शीर्ष 20% प्रतिशत वाले छात्र।'
    },
    documents: {
      en: 'Board Exam Marks, Aadhaar, Income Certificate.',
      kn: 'ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಯ ಅಂಕಪಟ್ಟಿ, ಆಧಾರ್, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ.',
      hi: 'कक्षा 12 की मार्कशीट, आधार, आय प्रमाण।'
    },
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    badge: { en: 'For UG/PG', kn: 'ಪದವಿ/ಪಿಜಿಗೆ', hi: 'स्नातक/पीजी के लिए' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept of Higher Education', kn: 'ಉನ್ನತ ಶಿಕ್ಷಣ ಇಲಾಖೆ', hi: 'उच्च शिक्षा विभाग' },
    applyLink: 'https://scholarships.gov.in/'
  }
];
