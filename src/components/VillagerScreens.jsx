import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  Landmark, TrendingUp, Megaphone, ClipboardList, IndianRupee,
  Droplets, Zap, Route, GraduationCap, Activity, Sprout, Trash2, MapPin,
  Camera, Phone, Home, Map,
  Building2, Wheat, ArrowUp, ArrowDown, Minus,
  Bell, ShieldCheck, RefreshCw, Sparkles, CheckCircle2, Star
} from 'lucide-react'
import { db } from '../firebase'
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore'

// ===================== KARNATAKA DATA =====================

export const kaSchemes = [
  {
    id: 'raitha-siri',
    category: 'Agriculture',
    districtSpecific: ['Mysuru', 'Mandya', 'Ramanagara'],
    title: { en: 'Raitha Siri Scheme', kn: 'ರೈತ ಸಿರಿ ಯೋಜನೆ', hi: 'रैता सिरि योजना' },
    desc: { 
      en: 'Provides assistance of ₹10,000 per hectare for organic millets cultivation to promote sustainable agriculture and water-saving crops.', 
      kn: 'ಸಾವಯವ ಸಿರಿಧಾನ್ಯಗಳ ಬೇಸಾಯಕ್ಕಾಗಿ ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000 ಪ್ರೋತ್ಸಾಹಧನ ನೀಡಿ ನೀರಿನ ಮಿತವ್ಯಯದ ಬೆಳೆಗಳನ್ನು ಉತ್ತೇಜಿಸುವ ಯೋಜನೆ.', 
      hi: 'जैविक बाजरा की खेती के लिए ₹10,000 प्रति हेक्टेयर सहायता प्रदान करता है।' 
    },
    eligibility: {
      en: 'Small and marginal farmers holding valid land registry (Pahani/RTC) in Karnataka.',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಸಿಂಧು ಭೂ ದಾಖಲೆ ಹೊಂದಿರುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.',
      hi: 'ಕರ್ನಾಟಕದ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.'
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
  },
  {
    id: 'krishi-bhagya',
    category: 'Agriculture',
    districtSpecific: ['Tumkuru', 'Belagavi', 'Ramanagara'],
    title: { en: 'Krishi Bhagya Yojane', kn: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ', hi: 'कृषि भाग्य योजना' },
    desc: { 
      en: 'Provides up to 80-90% subsidy for construction of farm ponds (Krishi Honda), polythene lining, diesel pumpsets, and micro/drip irrigation installations.', 
      kn: 'ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ, ಪಾಲಿಥೀನ್ ಹೊದಿಕೆ, ಡೀಸೆಲ್ ಪಂಪ್‌ಸೆಟ್ ಮತ್ತು ಹನಿ/ತುಂತುರು ನೀರಾವರಿ ಸ್ಥಾಪನೆಗೆ 80-90% ವರೆಗೆ ಸಬ್ಸಿಡಿ.', 
      hi: 'कृषि तालाब, डीजल पंपसेट और ड्रिप सिंचाई पर 80-90% सब्सिडी।' 
    },
    eligibility: {
      en: 'Rainfed agriculture farmers in drought-prone taluks of Karnataka.',
      kn: 'ಕರ್ನಾಟಕದ ಒಣ ಬೇಸಾಯ ಹಾಗೂ ಮಳೆ ಆಶ್ರಿತ ಪ್ರದೇಶದ ಕೃಷಿಕರು.',
      hi: 'ಕರ್ನಾಟಕದ ಮಳೆ ಆಶ್ರಿತ ಪ್ರದೇಶದ ಕೃಷಿಕರು.'
    },
    documents: {
      en: 'Land RTC, Survey Map, Identity Proof, Bank Passbook.',
      kn: 'RTC, ಭೂ ನಕ್ಷೆ, ಗುರುತಿನ ಚೀಟಿ, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'भूमि दस्तावेज़, पहचान पत्र, बैंक पासबुक।'
    },
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
    badge: { en: 'Check Eligibility', kn: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ', hi: 'पात्रता जांचें' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Horticulture & Agriculture Dept.', kn: 'ತೋಟಗಾರಿಕೆ ಮತ್ತು ಕೃಷಿ ಇಲಾಖೆ', hi: 'बागवानी एवं कृषि विभाग' },
  },
  {
    id: 'pm-kisan',
    category: 'Finance',
    districtSpecific: ['All'],
    title: { en: 'PM Kisan Samman Nidhi', kn: 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ ನಿಧಿ', hi: 'PM किसान सम्मान निधि' },
    desc: { 
      en: 'Central government program providing ₹6,000 per year in three equal instalments directly into the Aadhaar-linked bank accounts of land-holding families.', 
      kn: 'ವಾರ್ಷಿಕ ₹6,000 ಪ್ರೋತ್ಸಾಹಧನವನ್ನು ತಲಾ ₹2,000 ನಂತೆ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ರೈತರ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡುವ ಯೋಜನೆ.', 
      hi: '₹6,000 प्रति वर्ष 3 समान किस्तों में सीधे किसानों के खाते में।' 
    },
    eligibility: {
      en: 'All landholding farmer families across the state (with exclusions for institutional land holders).',
      kn: 'ರಾಜ್ಯದ ಜಮೀನು ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು.',
      hi: 'सभी भूमिधारक किसान परिवार।'
    },
    documents: {
      en: 'Aadhaar, Land Registry Details, Bank Passbook, KYC verification.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ ಪತ್ರ, ಬ್ಯಾಂಕ್ ಖಾತೆ, ಇ-ಕೆವೈಸಿ.',
      hi: 'आधार, भूमि दस्तावेज, बैंक खाता, ई-केवाईसी।'
    },
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
    badge: { en: 'Active', kn: 'ಸಕ್ರಿಯ', hi: 'सक्रिय' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of Agriculture, GoI', kn: 'ಕೃಷಿ ಸಚಿವಾಲಯ, ಭಾರತ', hi: 'कृषि मंत्रालय, भारत सरकार' },
  },
  {
    id: 'ayushman-arogya',
    category: 'Health',
    districtSpecific: ['All'],
    title: { en: 'Ayushman Arogya Karnataka', kn: 'ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಕರ್ನಾಟಕ', hi: 'आयुष्मान आरोग्य कर्नाटक' },
    desc: { 
      en: 'Covers up to ₹5 Lakhs per family annually for free secondary and tertiary healthcare services at government and empanelled private hospitals.', 
      kn: 'ಸರ್ಕಾರಿ ಮತ್ತು ನೊಂದಾಯಿತ ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ದ್ವಿತೀಯ ಮತ್ತು ತೃತೀಯ ಹಂತದ ಚಿಕಿತ್ಸೆಗೆ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ವಿಮಾ ಸೌಲಭ್ಯ.', 
      hi: 'सरकारी और सूचीबद्ध निजी अस्पतालों में इलाज के लिए ₹5 लाख तक का कवर।' 
    },
    eligibility: {
      en: 'All Karnataka residents. BPL families receive 100% free treatment; APL families receive 30% co-payment support.',
      kn: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ನಿವಾಸಿಗಳು. ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ದಾರರಿಗೆ ಪೂರ್ಣ ಉಚಿತ ಸೌಲಭ್ಯ.',
      hi: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ನಿವಾಸಿಗಳು.'
    },
    documents: {
      en: 'Aadhaar Card, Ration Card (BPL/APL).',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಡಿತರ ಚೀಟಿ (BPL/APL).',
      hi: 'आधार कार्ड, राशन कार्ड।'
    },
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    badge: { en: 'Applied', kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ', hi: 'आवेदित' },
    badgeClass: 'badge-info',
    ministry: { en: 'Dept. of Health & Family Welfare', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'स्वास्थ्य एवं परिवार कल्याण विभाग' },
  },
  {
    id: 'gruha-lakshmi',
    category: 'Women',
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
      hi: 'ಕರ್ನಾಟಕದ ಬಿಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಮಹಿಳೆಯರು.'
    },
    documents: {
      en: 'Aadhaar Card of Self & Spouse, Ration Card, Bank Account linked with Aadhaar.',
      kn: 'ಅರ್ಜಿದಾರರು ಮತ್ತು ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್, ಪಡಿತರ ಚೀಟಿ, ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'आधार कार्ड, राशन कार्ड, बैंक खाता।'
    },
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    badge: { en: 'Eligible', kn: 'ಅರ್ಹರು', hi: 'पात्र' },
    badgeClass: 'badge-success',
    ministry: { en: 'Women & Child Development Dept.', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
  },
  {
    id: 'bhoomi-rtc',
    category: 'Finance',
    districtSpecific: ['All'],
    title: { en: 'Bhoomi — Land Records Portal', kn: 'ಭೂಮಿ — ಭೂ ದಾಖಲೆಗಳು', hi: 'भूमि — भूमि रिकॉर्ड' },
    desc: { 
      en: 'Enables quick online downloads of RTC (Pahani), Mutation register status, and survey maps directly without visiting the Taluk office.', 
      kn: 'ತಾಲೂಕು ಕಚೇರಿಗೆ ಅಲೆಯದೆ ಪಹಣಿ/RTC ಪತ್ರ, ಮ್ಯುಟೇಶನ್ ನೋಂದಣಿ ದಾಖಲೆ ಮತ್ತು ನಕ್ಷೆಗಳನ್ನು ಆನ್‌ಲೈನ್ ಮೂಲಕ ಪಡೆಯುವ ವ್ಯವಸ್ಥೆ.', 
      hi: 'ऑनलाइन आरटीसी (पहानी) और म्यूटेशन रिकॉर्ड डाउनलोड करने की सुविधा।' 
    },
    eligibility: {
      en: 'Any landholding citizen in Karnataka.',
      kn: 'ರಾಜ್ಯದಲ್ಲಿ ಜಮೀನು ಹೊಂದಿರುವ ಯಾವುದೇ ನಾಗರಿಕರು.',
      hi: 'Any landholding citizen in Karnataka.'
    },
    documents: {
      en: 'Survey number, Owner name details.',
      kn: 'ಸರ್ವೆ ನಂಬರ್, ಹಿಸ್ಸಾ ನಂಬರ್, ಮಾಲೀಕರ ಹೆಸರು.',
      hi: 'ಸರ್ವೆ ನಂಬರ್, ಮಾಲೀಕರ ಹೆಸರು.'
    },
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    badge: { en: 'Digital Service', kn: 'ಡಿಜಿಟಲ್ ಸೇವೆ', hi: 'डिजिटल सेवा' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Revenue Department, Karnataka', kn: 'ಕಂದಾಯ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'राजस्व विभाग, कर्नाटक' },
  },
  {
    id: 'raitha-vidya-nidhi',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'Rytha Vidyanidhi Yojane', kn: 'ರೈತ ವಿದ್ಯಾநிதி ಯೋಜನೆ', hi: 'रैता विद्यानिधि योजना' },
    desc: { 
      en: 'Karnataka government scholarship providing ₹2,500 to ₹11,000 per year directly to the bank accounts of farmers\' children pursuing higher education.', 
      kn: 'ರೈತರ ಮಕ್ಕಳು ಉನ್ನತ ಶಿಕ್ಷಣ ಪಡೆಯಲು ಪ್ರೋತ್ಸಾಹಿಸಲು ವಾರ್ಷಿಕ ₹2,500 ರಿಂದ ₹11,000 ವರೆಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ನೀಡುವ ಯೋಜನೆ.', 
      hi: 'किसानों के बच्चों के लिए उच्च शिक्षा हेतु ₹2,500 से ₹11,000 वार्षिक छात्रवृत्ति।' 
    },
    eligibility: {
      en: 'Children of registered farmers in Karnataka, enrolled in a recognized post-matric course.',
      kn: 'ಕರ್ನಾಟಕದ ನೋಂದಾಯಿತ ರೈತರ ಮಕ್ಕಳು, ಪ್ರವೇಶ ಪಡೆದಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'कर्नाटक के पंजीकृत किसानों के बच्चे जो उच्च शिक्षा प्राप्त कर रहे हैं।'
    },
    documents: {
      en: 'Aadhaar, parent\'s FRUITS ID, College Admission fee receipt, Bank Passbook copy.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ತಂದೆ/ತಾಯಿಯ FRUITS ID, ಕಾಲೇಜು ಶುಲ್ಕದ ರಶೀದಿ, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'आधार, माता-पिता की FRUITS ID, कॉलेज रसीद, बैंक पासबुक।'
    },
    img: 'https://images.unsplash.com/photo-1427504494785-319cecb4ce79?w=600&q=80',
    badge: { en: 'Open', kn: 'ತೆರೆದಿದೆ', hi: 'सक्रिय' },
    badgeClass: 'badge-success',
    ministry: { en: 'State Scholarship Portal (SSP), Karnataka', kn: 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶ (SSP), ಕರ್ನಾಟಕ', hi: 'राज्य छात्रवृत्ति पोर्टल, कर्नाटक' },
    buddyUrl: 'https://www.buddy4study.com/article/raitha-vidya-nidhi-scholarship',
    source: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'hdfc-parivartan-ecss',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'HDFC Bank Parivartan ECSS', kn: 'ಎಚ್‌ಡಿಎಫ್‌ಸಿ ಪರಿವರ್ತನ್ ಸ್ಕಾಲರ್‌ಶಿಪ್', hi: 'एचडीएफसी परिवर्तन छात्रवृत्ति' },
    desc: { 
      en: 'CSR initiative supporting students facing financial crisis, with special preference given to children of small/marginal farmers or families in distress.', 
      kn: 'ಆರ್ಥಿಕ ಸಂಕಷ್ಟದಲ್ಲಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ, ವಿಶೇಷವಾಗಿ ಸಣ್ಣ ರೈತರ ಮಕ್ಕಳಿಗೆ ನೀಡಲಾಗುವ ವಾರ್ಷಿಕ ಆರ್ಥಿಕ ನೆರವು.', 
      hi: 'वित्तीय संकट का सामना कर रहे छात्रों के लिए वित्तीय सहायता, किसानों के बच्चों को प्राथमिकता।' 
    },
    eligibility: {
      en: 'Students in Class 1 to PG, facing financial crisis or whose parents are small farmers.',
      kn: '1ನೇ ತರಗತಿಯಿಂದ ಪಿಜಿ ವರೆಗೆ ಓದುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು, ಆರ್ಥಿಕ ತೊಂದರೆಯಿರುವ ಕುಟುಂಬಗಳು.',
      hi: 'कक्षा 1 से पीजी तक के छात्र जो वित्तीय संकट या किसान परिवारों से हैं।'
    },
    documents: {
      en: 'Aadhaar Card, Income Certificate, Previous mark sheet, Crisis declaration or farmer proof.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ, ಅಂಕಪಟ್ಟಿ, ಕೃಷಿಕರಾಗಿರುವ ದೃಢೀಕರಣ ಪತ್ರ.',
      hi: 'आधार, आय प्रमाण पत्र, पिछली अंकतालिका, किसान होने का प्रमाण।'
    },
    img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
    badge: { en: 'Apply via Buddy4Study', kn: 'Buddy4Study ಮೂಲಕ ಅರ್ಜಿ', hi: 'बडी4स्टडी द्वारा आवेदन' },
    badgeClass: 'badge-primary',
    ministry: { en: 'HDFC Foundation & Buddy4Study.com', kn: 'ಎಚ್‌ಡಿಎಫ್‌ಸಿ ಮತ್ತು ಬಡ್ಡಿ4ಸ್ಟಡಿ.ಕಾಮ್', hi: 'एचडीएफसी फाउंडेशन एवं बडी4स्टडी' },
    buddyUrl: 'https://www.buddy4study.com/article/hdfc-educational-crisis-scholarship',
    source: 'https://www.buddy4study.com/'
  },
  {
    id: 'sbi-asha-scholarship',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'SBI Foundation Asha Scholarship', kn: 'ಎಸ್‌ಬಿಐ ಆಶಾ ವಿದ್ಯಾರ್ಥಿವೇತನ', hi: 'एसबीआई आशा छात्रवृत्ति' },
    desc: { 
      en: 'Supports meritorious students from low-income families, including farming households, to continue their school education or undergraduate studies.', 
      kn: 'ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬಗಳು ಹಾಗೂ ರೈತ ಕುಟುಂಬಗಳ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶಿಕ್ಷಣ ಮುಂದುವರಿಸಲು ನೆರವು ನೀಡುವ ಯೋಜನೆ.', 
      hi: 'कम आय वाले परिवारों और किसान परिवारों के मेधावी छात्रों को छात्रवृत्ति।' 
    },
    eligibility: {
      en: 'Meritorious students from Class 9 to UG courses, with family income under ₹3 Lakhs per annum.',
      kn: '9ನೇ ತರಗತಿಯಿಂದ ಪದವಿ ವಿದ್ಯಾರ್ಥಿಗಳು, ವಾರ್ಷಿಕ ಆದಾಯ ₹3 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಇರುವ ಕುಟುಂಬಗಳು.',
      hi: 'कक्षा 9 से यूजी तक के मेधावी छात्र जिनकी पारिवारिक आय ₹3 लाख से कम हो।'
    },
    documents: {
      en: 'Aadhaar, Income Proof, Previous year marks list, School/College Fee Receipt.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ, ಅಂಕಪಟ್ಟಿ, ಶಾಲಾ ದಾಖಲಾತಿ ರಶೀದಿ.',
      hi: 'आधार, आय प्रमाण, पिछली अंकतालिका, कॉलेज रसीद।'
    },
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    badge: { en: 'Apply via Buddy4Study', kn: 'Buddy4Study ಮೂಲಕ ಅರ್ಜಿ', hi: 'बडी4स्टडी द्वारा आवेदन' },
    badgeClass: 'badge-primary',
    ministry: { en: 'SBI Foundation & Buddy4Study.com', kn: 'ಎಸ್‌ಬಿಐ ಫೌಂಡೇಶನ್ ಮತ್ತು ಬಡ್ಡಿ4ಸ್ಟಡಿ', hi: 'एसबीआई फाउंडेशन एवं बडी4स्टडी' },
    buddyUrl: 'https://www.buddy4study.com/page/sbi-asha-scholarship-program',
    source: 'https://www.buddy4study.com/'
  },
  {
    id: 'vidyasiri-scholarship',
    category: 'Scholarship',
    districtSpecific: ['All'],
    title: { en: 'Vidyasiri Scholarship', kn: 'ವಿದ್ಯಾಸಿರಿ ವಿದ್ಯಾರ್ಥಿವೇತನ', hi: 'विद्यासिरी छात्रवृत्ति' },
    desc: { 
      en: 'Provides boarding and lodging assistance to students from backward classes pursuing post-matric courses who are residents of rural areas.', 
      kn: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗಕ್ಕಾಗಿ ಊಟ ಮತ್ತು ವಸತಿ ಸೌಲಭ್ಯ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'ग्रामीण क्षेत्रों के पिछड़े वर्ग के छात्रों को मैट्रिक के बाद के पाठ्यक्रमों के लिए भोजन और आवास सहायता।' 
    },
    eligibility: {
      en: 'OBC students (Cat 1, 2A, 3A, 3B) studying at least 5 km away from their native place.',
      kn: 'ತಮ್ಮ ಸ್ವಂತ ಊರಿನಿಂದ ಕನಿಷ್ಠ 5 ಕಿ.ಮೀ ದೂರದಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಒಬಿಸಿ (ಪ್ರವರ್ಗ 1, 2ಎ, 3ಎ, 3ಬಿ) ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'ओबीसी छात्र जो अपने मूल स्थान से कम से कम 5 किमी दूर पढ़ रहे हैं।'
    },
    documents: {
      en: 'Aadhaar, Caste & Income Certificate, SSLC Marks Card, College Admission Details.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ ಅಂಕಪಟ್ಟಿ, ಕಾಲೇಜು ದಾಖಲಾತಿ.',
      hi: 'आधार, जाति और आय प्रमाण पत्र, एसएसएलसी अंकतालिका, कॉलेज प्रवेश विवरण।'
    },
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    badge: { en: 'Open on SSP', kn: 'SSP ನಲ್ಲಿ ಲಭ್ಯ', hi: 'SSP पर सक्रिय' },
    badgeClass: 'badge-success',
    ministry: { en: 'Backward Classes Welfare Dept, Karnataka', kn: 'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'पिछड़ा वर्ग कल्याण विभाग, कर्नाटक' },
    buddyUrl: 'https://bcwd.karnataka.gov.in/',
    source: 'https://ssp.postmatric.karnataka.gov.in/'
  }
]

export const kaPrices = [
  { crop: 'Ragi (ರಾಗಿ)', unit: 'per quintal', price: '₹3,846', change: '+₹54', trend: 'up', market: 'APMC Bengaluru', img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150&q=80' },
  { crop: 'Areca Nut (ಅಡಿಕೆ)', unit: 'per quintal', price: '₹42,000', change: '+₹1,200', trend: 'up', market: 'APMC Shimoga', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80' },
  { crop: 'Coffee (ಕಾಫಿ)', unit: 'per quintal', price: '₹28,500', change: '-₹500', trend: 'down', market: 'APMC Chikkamagaluru', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80' },
  { crop: 'Silk Cocoon (ರೇಷ್ಮೆ)', unit: 'per kg', price: '₹580', change: '+₹20', trend: 'up', market: 'Silk Exchange, Ramanagara', img: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=150&q=80' },
  { crop: 'Jowar (ಜೋಳ)', unit: 'per quintal', price: '₹3,180', change: '-₹40', trend: 'down', market: 'APMC Dharwad', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&q=80' },
  { crop: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', unit: 'per quintal', price: '₹2,090', change: '+₹30', trend: 'up', market: 'APMC Davangere', img: 'https://images.unsplash.com/photo-1551754626-78724e3960d7?w=150&q=80' },
  { crop: 'Tomato (ಟೊಮೇಟೊ)', unit: 'per kg', price: '₹22', change: '-₹5', trend: 'down', market: 'APMC Kolar', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80' },
  { crop: 'Onion (ಈರುಳ್ಳಿ)', unit: 'per kg', price: '₹18', change: '+₹2', trend: 'up', market: 'APMC Gadag', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=150&q=80' },
  { crop: 'Sugarcane (ಕಬ್ಬು)', unit: 'per tonne', price: '₹3,200', change: '₹0', trend: 'neutral', market: 'APMC Mandya', img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=150&q=80' },
  { crop: 'Turmeric (ಅರಿಶಿನ)', unit: 'per quintal', price: '₹13,500', change: '+₹200', trend: 'up', market: 'APMC Chamarajanagar', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80' },
  { crop: 'Coconut (ತೆಂಗಿನಕಾಯಿ)', unit: 'per 100 nuts', price: '₹1,800', change: '+₹50', trend: 'up', market: 'APMC Tumkuru', img: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=150&q=80' },
  { crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal', price: '₹6,200', change: '-₹100', trend: 'down', market: 'APMC Chitradurga', img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=150&q=80' },
]

export const kaAnnouncements = [
  {
    id: 1,
    title: { en: 'Free Krishi Mela — Mysuru GKVK', kn: 'ಉಚಿತ ಕೃಷಿ ಮೇಳ — ಮೈಸೂರು GKVK', hi: 'मुफ्त कृषि मेला — मैसूर GKVK' },
    date: '10 Aug 2026', category: 'Agriculture',
    desc: { 
      en: 'UAS Dharwad is organizing a free agriculture exhibition at GKVK Mysuru. Featuring high-yield seeds demonstration, organic farming tutorials, pesticide guidance, and free soil testing camps.', 
      kn: 'ಯುಎಎಸ್ ಧಾರವಾಡ ಮೈಸೂರು ಜಿಕೆವಿಕೆಯಲ್ಲಿ ಉಚಿತ ಬೃಹತ್ ಕೃಷಿ ಮೇಳವನ್ನು ಆಯೋಜಿಸುತ್ತಿದೆ. ಸುಧಾರಿತ ಬೀಜಗಳು, ಸಾವಯವ ಕೃಷಿ ಪದ್ಧತಿ ಮತ್ತು ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಶಿಬಿರ ಇರಲಿವೆ.', 
      hi: 'UAS धारवाड़ मैसूर GKVK में मुफ्त कृषि मेला आयोजित करेगा। बीज, कीटनाशक मार्गदर्शन, मिट्टी परीक्षण।' 
    },
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    urgent: true,
  },
  {
    id: 2,
    title: { en: 'Ragi MSP Procurement Registration Begins', kn: 'ರಾಗಿ MSP ಖರೀದಿ ನೋಂದಣಿ ಆರಂಭ', hi: 'रागी MSP खरीद शुरू' },
    date: '08 Aug 2026', category: 'Agriculture',
    desc: { 
      en: 'Karnataka Food Corporation begins MSP procurement registration of Ragi at ₹3,846 per quintal. Bring Aadhaar, bank passbook, and land records to the nearest APMC registration counter.', 
      kn: 'ಕರ್ನಾಟಕ ಆಹಾರ ನಿಗಮವು ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಯೋಜನೆಯಡಿ ₹3,846 ಕ್ವಿಂಟಾಲ್‌ ದರದಲ್ಲಿ ರಾಗಿ ಖರೀದಿಸಲು ನೋಂದಣಿ ಆರಂಭಿಸಿದೆ. ಹತ್ತಿರದ ಎಪಿಎಂಸಿಗೆ ಆಧಾರ್ ಹಾಗೂ ಜಮೀನು ದಾಖಲೆ ತನ್ನಿ.', 
      hi: 'कर्नाटक खाद्य निगम ₹3,846/क्विंतल पर रागी खरीद शुरू। आधार और भूमि रिकॉर्ड लाएं।' 
    },
    img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80',
    urgent: true,
  },
]

export const initialComplaints = [
  { id: 'GS-KA-0456', title: 'Hand Pump Not Working — Ward 3', status: 'inprogress', date: '2 Aug 2026', category: 'Water Supply', assignedTo: 'Gram Panchayat, Ramanagar', lastUpdate: 'Inspection scheduled for 10 Aug by AEE', photo: null },
  { id: 'GS-KA-0389', title: 'Street Light Broken — Mysuru Road', status: 'resolved', date: '20 Jul 2026', category: 'Electricity / BESCOM', assignedTo: 'BESCOM', lastUpdate: 'Resolved on 28 Jul 2026', photo: null },
  { id: 'GS-KA-0312', title: 'School Building Roof Leaking — GPS Ramanagar', status: 'pending', date: '15 Jul 2026', category: 'Schools / DDPI', assignedTo: 'DDPI Office, Mysuru', lastUpdate: 'Pending review', photo: null },
]

const kaComplaintCategories = [
  [Droplets,      { en: 'Water Supply', kn: 'ನೀರು ಸರಬರಾಜು', hi: 'जल आपूर्ति' }],
  [Zap,           { en: 'Electricity / BESCOM', kn: 'ವಿದ್ಯುತ್ / BESCOM', hi: 'बिजली / BESCOM' }],
  [Route,         { en: 'Roads & Paths', kn: 'ರಸ್ತೆ ಮತ್ತು ದಾರಿ', hi: 'सड़क और रास्ते' }],
  [GraduationCap, { en: 'Schools / DDPI', kn: 'ಶಾಲೆ / DDPI', hi: 'स्कूल / DDPI' }],
  [Activity,      { en: 'PHC / Health', kn: 'PHC / ಆರೋಗ್ಯ', hi: 'PHC / स्वास्थ्य' }],
  [Sprout,        { en: 'Agriculture / RSK', kn: 'ಕೃಷಿ / RSK', hi: 'कृषि / RSK' }],
  [Trash2,        { en: 'Sanitation / BBMP', kn: 'ಸ್ವಚ್ಛತೆ', hi: 'स्वच्छता' }],
  [MapPin,        { en: 'Bhoomi / Land Records', kn: 'ಭೂಮಿ / ಭೂ ದಾಖಲೆ', hi: 'भूमि रिकॉर्ड' }],
]

let globalComplaints = [...initialComplaints]
const notifyComplaintListeners = () => {
  if (window.onComplaintsUpdated) {
    window.onComplaintsUpdated([...globalComplaints])
  }
}

export function HomeScreen() {
  const { t, lang } = useLanguage()
  const [userName, setUserName] = useState('ರಾಮಪ್ಪ ಗೌಡ')
  const [userDistrict, setUserDistrict] = useState('Mysuru')
  const [userTaluk, setUserTaluk] = useState('Mysuru Taluk')
  const [roleMode, setRoleMode] = useState('farmer')

  const loadProfile = () => {
    const sName = window.localStorage.getItem('citizen_name')
    const sDist = window.localStorage.getItem('citizen_district')
    const sTaluk = window.localStorage.getItem('citizen_taluk')
    if (sName) setUserName(sName)
    if (sDist) setUserDistrict(sDist)
    if (sTaluk) setUserTaluk(sTaluk)
  }

  useEffect(() => {
    loadProfile()
    window.addEventListener('profileUpdate', loadProfile)
    return () => window.removeEventListener('profileUpdate', loadProfile)
  }, [])

  return (
    <div className="animate-fadeInUp">
      <div className="welcome-banner">
        <div className="welcome-banner-bg" />
        <div className="welcome-banner-bg2" />
        <div className="welcome-banner-text">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {lang === 'kn' ? `${userName} ಅವರಿಗೆ ಸ್ವಾಗತ!` : `Welcome, ${userName}!`}
            <Sparkles size={20} style={{ color: '#fbbf24', flexShrink: 0 }} />
          </h2>
          <p>{userTaluk}, {userDistrict} District, Karnataka</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle2 size={12} />PM Kisan Active
            </span>
            <span className="badge badge-warning">ರಾಗಿ MSP ಖರೀದಿ ಶುರು</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>1 {t('newAlerts')}</span>
          </div>
        </div>
        <div className="welcome-banner-img">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80"
            alt="Karnataka farmer"
            style={{ borderRadius: 12, height: 110, objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Dynamic Profile Selector in Home Screen */}
      <div className="card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              {lang === 'kn' ? 'ನಿಮ್ಮ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ:' : 'Select Your Category:'}
            </h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
              {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ ರೈತ ಅಥವಾ ವಿದ್ಯಾರ್ಥಿ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ' : 'Select Farmer or Student mode to customize your view'}
            </p>
          </div>
          <div style={{ display: 'inline-flex', background: 'var(--bg-main)', padding: 4, borderRadius: 10, border: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setRoleMode('farmer')}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: roleMode === 'farmer' ? 'var(--primary)' : 'transparent',
                color: roleMode === 'farmer' ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >
              🌾 {lang === 'kn' ? 'ರೈತ' : 'Farmer'}
            </button>
            <button
              onClick={() => setRoleMode('student')}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: roleMode === 'student' ? 'var(--primary)' : 'transparent',
                color: roleMode === 'student' ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >
              🎓 {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ' : 'Student'}
            </button>
          </div>
        </div>
      </div>

      {roleMode === 'student' && (
        <div className="animate-fadeInUp card" style={{ marginBottom: 20, border: '1.5px solid var(--primary-light)', background: '#f0fdf4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>🎓</span>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
              {t('availableScholarships')}
            </h4>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            {lang === 'kn'
              ? 'ರೈತರು ಮತ್ತು ಸಣ್ಣ ವರ್ಗಗಳ ಮಕ್ಕಳಿಗಾಗಿ ಲಭ್ಯವಿರುವ ಪರಿಶೀಲಿಸಿದ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು. ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಲಿಂಕ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.'
              : 'Verified post-matric and CSR scholarships supporting children of farmers and rural students. Click links below to apply.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              {
                title: lang === 'kn' ? 'ರೈತ ವಿದ್ಯಾநிதி ಯೋಜನೆ' : 'Rytha Vidyanidhi Yojane',
                amount: '₹2,500 - ₹11,000 / Year',
                eligibility: lang === 'kn' ? 'ನೋಂದಾಯಿತ ರೈತರ ಮಕ್ಕಳು (FRUITS ID)' : 'Children of registered farmers in Karnataka',
                source: t('sspPortal'),
                link: 'https://ssp.postmatric.karnataka.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಎಚ್‌ಡಿಎಫ್‌ಸಿ ಪರಿವರ್ತನ್ ಸ್ಕಾಲರ್‌ಶಿಪ್' : 'HDFC Bank Parivartan ECSS',
                amount: 'Up to ₹75,000 / Year',
                eligibility: lang === 'kn' ? 'ಬಡತನ ಅಥವಾ ಆರ್ಥಿಕ ಸಂಕಷ್ಟದಲ್ಲಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Students facing financial crisis / small farmers',
                source: t('buddyStudy'),
                link: 'https://www.buddy4study.com/'
              },
              {
                title: lang === 'kn' ? 'ಎಸ್‌ಬಿಐ ಆಶಾ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'SBI Foundation Asha Scholarship',
                amount: '₹15,000 - ₹5,00,000 / Year',
                eligibility: lang === 'kn' ? 'ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬಗಳ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Meritorious students from low-income families',
                source: t('buddyStudy'),
                link: 'https://www.buddy4study.com/'
              }
            ].map((sch, sIdx) => (
              <div key={sIdx} style={{ background: '#fff', borderRadius: 10, padding: 14, border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h5 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>{sch.title}</h5>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>{sch.amount}</div>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '0 0 4px 0' }}><strong>Eligible:</strong> {sch.eligibility}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 12px 0' }}><strong>Platform:</strong> {sch.source}</p>
                </div>
                <a
                  href={sch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 11, padding: '4px 8px' }}
                >
                  Apply Online 🔗
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="stats-grid">
        {[
          { Icon: Landmark,         labelKey: 'activeSchemes',    value: '6',      color: '#dbeafe', iconColor: '#1d4ed8', trend: '+1 Raitha Siri' },
          { Icon: ClipboardList,    labelKey: 'myComplaints',     value: String(globalComplaints.length), color: '#fee2e2', iconColor: '#dc2626', trend: `${globalComplaints.filter(c => c.status === 'resolved').length} resolved` },
          { Icon: Bell,             labelKey: 'newAlerts',        value: '4',      color: '#fef3c7', iconColor: '#d97706', trend: '2 urgent' },
          { Icon: IndianRupee,      labelKey: 'benefitsReceived', value: '₹6,000', color: '#d1fae5', iconColor: '#15803d', trend: 'PM Kisan 2026' },
        ].map((s, i) => (
          <div className="stat-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-icon" style={{ background: s.color, color: s.iconColor }}>
              <s.Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="stat-info">
              <p>{t(s.labelKey)}</p>
              <p>{s.value}</p>
              <span>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div>
          <div className="section-title">
            <h3>{t('todayPrices')} {lang === 'kn' ? `(${userDistrict} APMC)` : `(${userDistrict} APMC)`}</h3>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="market-table">
                <thead><tr><th>{t('cropCol')}</th><th>{t('priceCol')}</th><th>{t('changeCol')}</th></tr></thead>
                <tbody>
                  {(kaPrices.filter(p => p.market.includes(userDistrict)).length > 0 
                    ? kaPrices.filter(p => p.market.includes(userDistrict)) 
                    : kaPrices.slice(0, 5)).map((p, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <img src={p.img} alt={p.crop} className="crop-img" style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} onError={e => { e.target.style.display='none' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.crop}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.market}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700 }}>{p.price}</td>
                      <td className={p.trend === 'up' ? 'price-up' : p.trend === 'down' ? 'price-down' : 'price-neutral'}>
                        <span style={{ display:'flex', alignItems:'center', gap: 3 }}>
                          {p.trend === 'up' ? <ArrowUp size={12}/> : p.trend === 'down' ? <ArrowDown size={12}/> : <Minus size={12}/>} {p.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="section-title">
            <h3>{t('recentAnnounce')} {lang === 'kn' ? `(${userDistrict})` : `(${userDistrict})`}</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(kaAnnouncements.filter(a => a.targetDistrict === userDistrict || a.targetDistrict === 'All' || !a.targetDistrict).length > 0
              ? kaAnnouncements.filter(a => a.targetDistrict === userDistrict || a.targetDistrict === 'All' || !a.targetDistrict).slice(0, 2)
              : kaAnnouncements.slice(0, 2)).map((a, i) => (
              <div className="card" key={i} style={{ padding: 16, display: 'flex', gap: 14 }}>
                <img src={a.img} alt="" style={{ width: 80, height: 60, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {a.urgent && <span className="badge badge-danger" style={{ fontSize: 10 }}>{t('urgent')}</span>}
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.date}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title[lang] || a.title.en}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{(a.desc[lang] || a.desc.en).slice(0, 80)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SchemesScreen() {
  const { t, lang } = useLanguage()
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [appliedSchemes, setAppliedSchemes] = useState({})
  const [schemes, setSchemes] = useState(kaSchemes)
  const [loadingSchemes, setLoadingSchemes] = useState(true)

  // Fetch from Firestore, fall back to static data
  useEffect(() => {
    const q = query(collection(db, 'schemes'))
    getDocs(q)
      .then(snap => {
        if (!snap.empty) {
          setSchemes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        }
      })
      .catch(() => {/* silent fallback to static data */})
      .finally(() => setLoadingSchemes(false))
  }, [])

  const categories = ['All', 'Agriculture', 'Finance', 'Health', 'Women', 'Scholarship']

  const filteredSchemes = categoryFilter === 'All' 
    ? schemes 
    : schemes.filter(s => s.category === categoryFilter)

  const handleApplySubmit = (e) => {
    e.preventDefault()
    if (selectedScheme) {
      setAppliedSchemes(prev => ({ ...prev, [selectedScheme.id]: 'Applied' }))
      setApplyModalOpen(false)
      alert(lang === 'kn' ? 'ಯೋಜನೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!' : 'Successfully applied for the scheme!')
    }
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700 }}>🏛️ {t('schemesTitle')}</h3>
        
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #e11d48 0%, #eab308 50%, #16a34a 100%)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 28 }}>🏛️</span>
        <div>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>ಕರ್ನಾಟಕ ಸರ್ಕಾರ — Government of Karnataka</p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12 }}>Check your eligibility, requirements and apply digitally for central and state government schemes.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filteredSchemes.map((s, i) => {
          const status = appliedSchemes[s.id] || (s.id === 'pm-kisan' ? 'Active' : s.id === 'ayushman-arogya' ? 'Applied' : 'Eligible')
          const badgeClass = status === 'Active' ? 'badge-success' : status === 'Applied' ? 'badge-info' : 'badge-warning'
          return (
            <div className="scheme-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="scheme-card-img">
                <img src={s.img} alt={s.title[lang] || s.title.en} />
                <div className="scheme-card-img-overlay" />
                <div className="scheme-card-overlay-badge">
                  <span className={`badge ${badgeClass}`}>{status}</span>
                </div>
              </div>
              <div className="scheme-card-body">
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{s.ministry[lang] || s.ministry.en}</div>
                <h4>{s.title[lang] || s.title.en}</h4>
                <p style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.desc[lang] || s.desc.en}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 12 }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setSelectedScheme(s)
                      setApplyModalOpen(true)
                    }}
                    disabled={status === 'Active' || status === 'Applied'}
                  >
                    {status === 'Eligible' ? t('checkEligibility') : status}
                  </button>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setSelectedScheme(s)}
                  >
                    {t('learnMore')}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedScheme && !applyModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 550, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24, position: 'relative' }}>
            <button 
              onClick={() => setSelectedScheme(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>{selectedScheme.title[lang] || selectedScheme.title.en}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{selectedScheme.ministry[lang] || selectedScheme.ministry.en}</p>
            
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Description / ವಿವರಣೆ</h5>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{selectedScheme.desc[lang] || selectedScheme.desc.en}</p>
            </div>

            {selectedScheme.id === 'raitha-vidya-nidhi' && (
              <div style={{ marginBottom: 16, padding: 12, border: '1px solid #fed7aa', background: '#fff7ed', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ fontWeight: 600, fontSize: 13, color: '#c2410c', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  🎓 Course-wise Scholarship Rates (Annual) / ಕೋರ್ಸ್‌ವಾರು ವಿವರಗಳು
                </h5>
                <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #fdba74', color: '#c2410c', fontWeight: 600 }}>
                        <th style={{ padding: '6px 4px' }}>Course / ಕೋರ್ಸ್</th>
                        <th style={{ padding: '6px 4px' }}>Boys / ಬಾಲಕರು</th>
                        <th style={{ padding: '6px 4px' }}>Girls / ಬಾಲಕಿಯರು</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { course: 'Class 8 - 10 (Girls only)', boys: '-', girls: '₹2,500' },
                        { course: 'Class 11 & 12 (PUC)', boys: '₹2,500', girls: '₹3,000' },
                        { course: 'ITI / Diploma / Polytechnic', boys: '₹5,000', girls: '₹5,500' },
                        { course: 'General Degrees (BA, BSc, BCom)', boys: '₹5,000', girls: '₹5,500' },
                        { course: 'Professional Degrees (BE, MBBS, Law, Agri)', boys: '₹10,000', girls: '₹11,000' },
                        { course: 'Post Graduation (PG / PhD)', boys: '₹10,000', girls: '₹11,000' },
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #ffedd5' }}>
                          <td style={{ padding: '6px 4px', fontWeight: 500 }}>{item.course}</td>
                          <td style={{ padding: '6px 4px', color: '#ea580c' }}>{item.boys}</td>
                          <td style={{ padding: '6px 4px', color: '#ea580c', fontWeight: 600 }}>{item.girls}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: '#7c2d12', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <p>
                    ℹ️ Verification and details sourced from{' '}
                    <a href={selectedScheme.buddyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#c2410c', fontWeight: 600 }}>
                      Buddy4Study Article 🔗
                    </a>
                  </p>
                  <p>
                    🌐 Apply online on the Karnataka{' '}
                    <a href={selectedScheme.source} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#c2410c', fontWeight: 600 }}>
                      State Scholarship Portal (SSP) 🔗
                    </a>
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 16, padding: 12, background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <h5 style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary-dark)', marginBottom: 4 }}>Eligibility / ಅರ್ಹತೆ</h5>
              <p style={{ fontSize: 13 }}>{selectedScheme.eligibility[lang] || selectedScheme.eligibility.en}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h5 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Required Documents / ಅಗತ್ಯ ದಾಖಲೆಗಳು</h5>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedScheme.documents[lang] || selectedScheme.documents.en}</p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setApplyModalOpen(true)}
                disabled={appliedSchemes[selectedScheme.id] === 'Applied' || selectedScheme.id === 'pm-kisan' || selectedScheme.id === 'ayushman-arogya'}
              >
                Apply Now / ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ
              </button>
              <button className="btn btn-outline" onClick={() => setSelectedScheme(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {applyModalOpen && selectedScheme && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: 16 }}>
          <form className="card" onSubmit={handleApplySubmit} style={{ maxWidth: 500, width: '100%', padding: 24, position: 'relative' }}>
            <button 
              type="button"
              onClick={() => setApplyModalOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Application: {selectedScheme.title[lang] || selectedScheme.title.en}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Please confirm your details for Karnataka DBT submission</p>

            <div className="form-group" style={{ marginBottom: 12 }}>
              <label className="form-label">Full Name / ಪೂರ್ಣ ಹೆಸರು</label>
              <input className="form-input" defaultValue={window.localStorage.getItem('citizen_name') || 'ರಾಮಪ್ಪ ಗೌಡ'} required />
            </div>

            <div className="form-group" style={{ marginBottom: 12 }}>
              <label className="form-label">Aadhaar Card Number / ಆಧಾರ್ ಸಂಖ್ಯೆ</label>
              <input className="form-input" defaultValue="XXXX-XXXX-5678" readOnly />
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Land Registry ID (Pahani RTC Number)</label>
              <input className="form-input" placeholder="e.g. MR-2024-8902/B" required defaultValue="RTC-MY-RMN-2026" />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Submit Application
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setApplyModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export function MarketScreen() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [marketFilter, setMarketFilter] = useState('All')
  const [prices, setPrices] = useState(kaPrices)
  const [loadingPrices, setLoadingPrices] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  
  const [landArea, setLandArea] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('Ragi (ರಾಗಿ)')
  const [calcResult, setCalcResult] = useState(null)

  // Fetch live prices from Firestore, fall back to static
  useEffect(() => {
    getDocs(collection(db, 'prices'))
      .then(snap => {
        if (!snap.empty) {
          setPrices(snap.docs.map(d => ({ ...d.data() })))
          setLastUpdated(new Date().toLocaleTimeString('en-IN'))
        }
      })
      .catch(() => {})
      .finally(() => setLoadingPrices(false))
  }, [])

  const markets = ['All', 'APMC Bengaluru', 'APMC Shimoga', 'APMC Chikkamagaluru', 'APMC Dharwad', 'APMC Tumkuru', 'APMC Mandya']

  const filteredPrices = prices.filter(p => {
    const matchesSearch = p.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.market.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMarket = marketFilter === 'All' || p.market === marketFilter
    return matchesSearch && matchesMarket
  })

  const calculateEstimate = (e) => {
    e.preventDefault()
    if (!landArea || isNaN(landArea)) return
    
    const yieldConfig = {
      'Ragi (ರಾಗಿ)': { yield: 12, price: 3846 },
      'Areca Nut (ಅಡಿಕೆ)': { yield: 8, price: 42000 },
      'Jowar (ಜೋಳ)': { yield: 15, price: 3180 },
      'Maize (ಮೆಕ್ಕೆಜೋಳ)': { yield: 22, price: 2090 },
      'Sugarcane (ಕಬ್ಬು)': { yield: 35, price: 3200 },
    }

    const config = yieldConfig[selectedCrop] || { yield: 10, price: 3000 }
    const estYield = (parseFloat(landArea) * config.yield).toFixed(1)
    const estRevenue = Math.round(estYield * config.price)

    setCalcResult({
      yield: estYield,
      revenue: estRevenue.toLocaleString('en-IN')
    })
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: 'none' }}>
          <div style={{ fontSize: 12, color: '#065f46', fontWeight: 600, marginBottom: 4 }}>{t('todayBest')}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#064e3b' }}>Areca Nut ₹42,000/q</div>
          <div style={{ fontSize: 13, color: '#047857', marginTop: 4 }}>↑ APMC Shimoga</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)', border: 'none' }}>
          <div style={{ fontSize: 12, color: '#991b1b', fontWeight: 600, marginBottom: 4 }}>{t('biggestDrop')}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#7f1d1d' }}>Coffee -₹500/q</div>
          <div style={{ fontSize: 13, color: '#b91c1c', marginTop: 4 }}>↓ APMC Chikkamagaluru</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--primary)' }}>🧮 Crop Yield & Income Estimator</h4>
          <form onSubmit={calculateEstimate} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 150 }}>
              <label className="form-label" style={{ fontSize: 12 }}>Land Size (Acres) / ಜಮೀನು (ಎಕರೆ)</label>
              <input 
                type="number" 
                step="0.1" 
                className="form-input" 
                placeholder="e.g. 2.5" 
                value={landArea}
                onChange={e => setLandArea(e.target.value)}
                required 
              />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 180 }}>
              <label className="form-label" style={{ fontSize: 12 }}>Select Crop / ಬೆಳೆ ಆಯ್ಕೆ</label>
              <select 
                className="form-input"
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
              >
                <option>Ragi (ರಾಗಿ)</option>
                <option>Areca Nut (ಅಡಿಕೆ)</option>
                <option>Jowar (ಜೋಳ)</option>
                <option>Maize (ಮೆಕ್ಕೆಜೋಳ)</option>
                <option>Sugarcane (ಕಬ್ಬು)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ height: 44 }}>Estimate / ಲೆಕ್ಕಾಚಾರ</button>
          </form>

          {calcResult && (
            <div style={{ marginTop: 16, padding: 14, background: 'var(--primary-glow)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Estimated Harvest Yield:</span>
                <p style={{ fontSize: 16, fontWeight: 700 }}>{calcResult.yield} Quintals/Tonnes</p>
              </div>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Approx. APMC Value:</span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary-dark)' }}>₹{calcResult.revenue}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>🏪 Live APMC Price Directory</div>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search crop or market..." 
            style={{ maxWidth: 260, padding: '6px 12px', fontSize: 13 }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {markets.map(m => (
            <button 
              key={m} 
              className={`btn btn-sm ${marketFilter === m ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={() => setMarketFilter(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="market-table" style={{ width: '100%', minWidth: 500 }}>
          <thead>
            <tr>
              <th>{t('cropCol')}</th>
              <th>{t('marketCol')}</th>
              <th>{t('priceCol')}</th>
              <th>{t('changeCol')}</th>
              <th>{t('unitCol')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.map((p, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={p.img}
                      alt={p.crop}
                      style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-light)' }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <span style={{ fontWeight: 600 }}>{p.crop}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{p.market}</td>
                <td style={{ fontWeight: 700, fontSize: 15 }}>{p.price}</td>
                <td className={p.trend === 'up' ? 'price-up' : p.trend === 'down' ? 'price-down' : 'price-neutral'}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {p.trend === 'up' ? <ArrowUp size={13}/> : p.trend === 'down' ? <ArrowDown size={13}/> : <Minus size={13}/>} {p.change}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{p.unit}</td>
              </tr>
            ))}
            {filteredPrices.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>No matching crops found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AnnouncementsScreen() {
  const { t, lang } = useLanguage()
  const filters = ['filterAll', 'filterUrgent', 'filterAgriculture', 'filterGovt']
  const [active, setActiveF] = useState('filterAll')
  const [selectedAnnounce, setSelectedAnnounce] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [phoneSub, setPhoneSub] = useState('')
  const [announcements, setAnnouncements] = useState(kaAnnouncements)

  // Fetch live announcements from Firestore, fall back to static
  useEffect(() => {
    getDocs(collection(db, 'announcements'))
      .then(snap => {
        if (!snap.empty) {
          setAnnouncements(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        }
      })
      .catch(() => {})
  }, [])

  const getFilteredAnnouncements = () => {
    if (active === 'filterUrgent') return announcements.filter(a => a.urgent)
    if (active === 'filterAgriculture') return announcements.filter(a => a.category === 'Agriculture')
    if (active === 'filterGovt') return announcements.filter(a => a.category === 'Government')
    return announcements
  }

  const handleSubscribeSubmit = (e) => {
    e.preventDefault()
    if (phoneSub.length === 10) {
      setIsSubscribed(true)
    }
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              className={`btn btn-sm ${active === f ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveF(f)}
            >
              {t(f)}
            </button>
          ))}
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={() => setSelectedAnnounce({ id: 'subscribe-widget' })}
        >
          🔔 Subscribe to SMS Alerts
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {getFilteredAnnouncements().map((a, i) => (
          <div className="announcement-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
            <div className="announcement-card-img">
              <img src={a.img} alt="" />
              <div className="announcement-card-img-overlay" />
            </div>
            <div className="announcement-card-body" style={{ flexGrow: 1 }}>
              <div className="meta">
                {a.urgent && <span className="badge badge-danger" style={{ fontSize: 10 }}>{t('urgent')}</span>}
                <span className="badge badge-primary" style={{ fontSize: 10 }}>{a.category}</span>
                <span>{a.date}</span>
              </div>
              <h4>{a.title[lang] || a.title.en}</h4>
              <p style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc[lang] || a.desc.en}</p>
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-light)' }}>
              <button 
                className="btn btn-sm btn-outline w-full" 
                style={{ justifyContent: 'center' }}
                onClick={() => setSelectedAnnounce(a)}
              >
                {t('readMore')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAnnounce && selectedAnnounce.id !== 'subscribe-widget' && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 500, width: '100%', padding: 24, position: 'relative' }}>
            <button 
              onClick={() => setSelectedAnnounce(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              {selectedAnnounce.urgent && <span className="badge badge-danger">{t('urgent')}</span>}
              <span className="badge badge-primary">{selectedAnnounce.category}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selectedAnnounce.date}</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{selectedAnnounce.title[lang] || selectedAnnounce.title.en}</h3>
            <img src={selectedAnnounce.img} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>{selectedAnnounce.desc[lang] || selectedAnnounce.desc.en}</p>
            <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => setSelectedAnnounce(null)}>Close</button>
          </div>
        </div>
      )}

      {selectedAnnounce && selectedAnnounce.id === 'subscribe-widget' && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div className="card" style={{ maxWidth: 420, width: '100%', padding: 24, position: 'relative' }}>
            <button 
              onClick={() => setSelectedAnnounce(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>🔔 Get Local Alerts via SMS</h3>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribeSubmit} className="login-form">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  Receive instant announcements regarding MSP crop procurement rates, Gram Panchayat meetings and weather warnings.
                </p>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Mobile Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="9876543210" 
                    value={phoneSub}
                    onChange={e => setPhoneSub(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Subscribe
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: 48 }}>✅</span>
                <h4 style={{ fontWeight: 700, marginTop: 8 }}>Subscribed Successfully!</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>You will now receive village alerts on +91 {phoneSub}</p>
                <button className="btn btn-outline w-full" style={{ marginTop: 20, justifyContent: 'center' }} onClick={() => { setSelectedAnnounce(null); setIsSubscribed(false); setPhoneSub(''); }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function ComplaintScreen() {
  const { t, lang } = useLanguage()
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [newComplaintId, setNewComplaintId] = useState('')

  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [taluk, setTaluk] = useState('Mysuru Taluk')
  const [photoUri, setPhotoUri] = useState(null)
  const [userName, setUserName] = useState('')
  const [userDistrict, setUserDistrict] = useState('Mysuru')

  // Camera states
  const [cameraMode, setCameraMode] = useState('idle') // idle | requesting | live | captured | denied | unsupported | file
  const [cameraError, setCameraError] = useState('')
  const videoRef = React.useRef(null)
  const canvasRef = React.useRef(null)
  const streamRef = React.useRef(null)

  useEffect(() => {
    const sName = window.localStorage.getItem('citizen_name')
    const sDist = window.localStorage.getItem('citizen_district')
    const sTaluk = window.localStorage.getItem('citizen_taluk')
    if (sName) setUserName(sName)
    if (sDist) setUserDistrict(sDist)
    if (sTaluk) { setTaluk(sTaluk); setLocation(sTaluk.replace(' Taluk', '') + ' Village') }
    return () => stopCamera()
  }, [])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }

  const openCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraMode('unsupported')
      return
    }
    setCameraMode('requesting')
    setCameraError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      streamRef.current = stream
      setCameraMode('live')
      // Attach stream to video element after render
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      }, 100)
    } catch (err) {
      stopCamera()
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraMode('denied')
        setCameraError('Camera permission was denied. Please allow camera access in your browser settings and try again.')
      } else if (err.name === 'NotFoundError') {
        setCameraMode('unsupported')
        setCameraError('No camera found on this device. Use file upload instead.')
      } else {
        setCameraMode('unsupported')
        setCameraError('Could not open camera: ' + err.message)
      }
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    setPhotoUri(dataUrl)
    stopCamera()
    setCameraMode('captured')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB allowed.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoUri(ev.target.result)
      setCameraMode('captured')
    }
    reader.readAsDataURL(file)
  }

  const retakePhoto = () => {
    setPhotoUri(null)
    stopCamera()
    setCameraMode('idle')
  }

  const handleComplaintSubmit = async (e) => {
    e.preventDefault()
    if (!selected || !subject || !description) return

    const randomId = 'GS-KA-0' + Math.floor(500 + Math.random() * 500)
    const newComplaintObj = {
      id: randomId,
      title: `${subject} — ${location}`,
      status: 'pending',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: selected,
      assignedTo: `Taluk Office, ${taluk}`,
      lastUpdate: 'Assigned to nodal officer',
      submittedBy: userName || 'Anonymous',
      district: userDistrict,
      taluk,
      createdAt: serverTimestamp()
    }

    // Save to Firestore (skip photo as it's base64 and too large)
    try {
      await addDoc(collection(db, 'complaints'), { ...newComplaintObj, photo: null })
    } catch (err) {
      console.warn('Firestore write failed, saving locally:', err)
    }

    // Also update local state
    globalComplaints = [{ ...newComplaintObj, photo: photoUri }, ...globalComplaints]
    notifyComplaintListeners()
    stopCamera()
    setNewComplaintId(randomId)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelected(''); setSubject(''); setDescription('')
    setPhotoUri(null); stopCamera(); setCameraMode('idle'); setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t('complaintSubmitted')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
          {t('complaintId')}: <strong>{newComplaintId}</strong>
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 420, marginBottom: 24 }}>
          {t('complaintMsg')}
        </p>
        <button className="btn btn-primary" onClick={handleReset}>{t('fileAnother')}</button>
      </div>
    )
  }

  return (
    <div className="animate-fadeInUp">
      <div className="complaint-form">
        {/* Step 1: Category */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('step1')}</h3>
          <div className="complaint-category-grid">
            {kaComplaintCategories.map(([IconComp, labels]) => {
              const label = labels[lang] || labels.en
              return (
                <button
                  type="button"
                  key={label}
                  className={`complaint-category-btn ${selected === label ? 'selected' : ''}`}
                  onClick={() => setSelected(label)}
                >
                  <IconComp size={20} strokeWidth={1.8} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: Details form */}
        {selected && (
          <form className="card animate-fadeInUp" style={{ marginBottom: 20 }} onSubmit={handleComplaintSubmit}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('step2')}</h3>
            <div className="login-form" style={{ gap: 16 }}>

              {/* Auto-filled from login */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Applicant Name / ಅರ್ಜಿದಾರರ ಹೆಸರು</label>
                  <input className="form-input" value={userName || 'Enter your name'} readOnly style={{ background: 'var(--bg-main)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">District / ಜಿಲ್ಲೆ</label>
                  <input className="form-input" value={userDistrict} readOnly style={{ background: 'var(--bg-main)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('complaintSubject')} / ವಿಷಯ *</label>
                <input
                  className="form-input"
                  placeholder={`Describe your ${selected} issue briefly`}
                  value={subject} onChange={e => setSubject(e.target.value)} required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('complaintDesc')} / ವಿವರಣೆ *</label>
                <textarea
                  className="form-input" rows={4}
                  placeholder="ವಿಸ್ತೃತ ವಿವರಣೆ / Detailed description..."
                  style={{ resize: 'vertical' }}
                  value={description} onChange={e => setDescription(e.target.value)} required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">{t('complaintLocation')} / ಸ್ಥಳ</label>
                  <input className="form-input" placeholder="ಉದಾ: ವಾರ್ಡ್ 3"
                    value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">ತಾಲೂಕು / Taluk</label>
                  <input className="form-input" value={taluk} readOnly style={{ background: 'var(--bg-main)' }} />
                </div>
              </div>

              {/* ── REAL CAMERA SECTION ── */}
              <div className="form-group">
                <label className="form-label">
                  📷 {t('attachPhoto')} / ಫೋಟೋ ತೆಗೆಯಿರಿ
                  <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>(Optional)</span>
                </label>

                {/* Guide steps */}
                {cameraMode === 'idle' && (
                  <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {/* Guide banner */}
                    <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', padding: '14px 18px', borderBottom: '1px solid #bbf7d0' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#15803d', marginBottom: 6 }}>📋 How to take a complaint photo / ಫೋಟೋ ಹೇಗೆ ತೆಗೆಯಬೇಕು:</p>
                      <ol style={{ fontSize: 12, color: '#166534', paddingLeft: 18, margin: 0, lineHeight: 2 }}>
                        <li>Click <strong>"Open Camera"</strong> — allow camera permission when browser asks</li>
                        <li>Point your camera at the <strong>problem area</strong> clearly</li>
                        <li>Click the <strong>📸 Capture</strong> button to take the photo</li>
                        <li>Review the photo — retake if needed</li>
                      </ol>
                    </div>
                    <div style={{ padding: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}
                        onClick={openCamera}
                      >
                        <Camera size={16} strokeWidth={2} style={{ marginRight: 6 }} />
                        Open Camera / ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ
                      </button>
                      <label
                        style={{
                          flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 6, padding: '10px 16px', border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 14,
                          fontWeight: 600, color: 'var(--text-secondary)', background: '#fff', transition: 'all 0.2s'
                        }}
                      >
                        📁 Upload File
                        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                )}

                {/* Requesting permission */}
                {cameraMode === 'requesting' && (
                  <div style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'center', background: 'var(--primary-glow)' }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>📡</div>
                    <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14 }}>Requesting camera permission...</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                      ✋ Your browser will ask for camera access — click <strong>"Allow"</strong> to continue
                    </p>
                  </div>
                )}

                {/* Live camera preview */}
                {cameraMode === 'live' && (
                  <div style={{ border: '2px solid var(--primary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000' }}>
                    <div style={{ background: '#111', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444', animation: 'pulse 1.5s ease infinite' }} />
                      <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Camera Live — Point at problem area</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginLeft: 'auto' }}>ಸಮಸ್ಯೆ ಇರುವ ಸ್ಥಳಕ್ಕೆ ಕ್ಯಾಮೆರಾ ತೋರಿಸಿ</span>
                    </div>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: '100%', maxHeight: 320, display: 'block', objectFit: 'cover' }}
                    />
                    <div style={{ background: '#111', padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ flex: 1, justifyContent: 'center', maxWidth: 200 }}
                        onClick={capturePhoto}
                      >
                        📸 Capture Photo / ಚಿತ್ರ ತೆಗೆಯಿರಿ
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                        onClick={retakePhoto}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />

                {/* Photo captured */}
                {cameraMode === 'captured' && photoUri && (
                  <div style={{ border: '2px solid var(--success)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <div style={{ background: '#f0fdf4', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #bbf7d0' }}>
                      <span style={{ color: '#15803d', fontWeight: 700, fontSize: 13 }}>✅ Photo Captured Successfully!</span>
                      <button type="button" onClick={retakePhoto} style={{ marginLeft: 'auto', color: 'var(--primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none' }}>
                        🔄 Retake / ಮತ್ತೆ ತೆಗೆಯಿರಿ
                      </button>
                    </div>
                    <img src={photoUri} alt="Complaint evidence" style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '10px 14px', background: '#f9fafb', fontSize: 12, color: 'var(--text-muted)' }}>
                      📌 This photo will be attached to your complaint as evidence
                    </div>
                  </div>
                )}

                {/* Permission denied */}
                {(cameraMode === 'denied' || cameraMode === 'unsupported') && (
                  <div style={{ border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: 16, background: '#fff5f5' }}>
                    <p style={{ color: '#dc2626', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
                      {cameraMode === 'denied' ? '🚫 Camera Permission Denied' : '📵 Camera Not Available'}
                    </p>
                    <p style={{ color: '#7f1d1d', fontSize: 13, marginBottom: 14 }}>{cameraError}</p>
                    {cameraMode === 'denied' && (
                      <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#374151' }}>
                        <strong>How to allow camera in Chrome:</strong><br />
                        1. Click the 🔒 lock icon in the browser address bar<br />
                        2. Find "Camera" → select "Allow"<br />
                        3. Refresh the page and try again
                      </div>
                    )}
                    <label style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '10px 18px', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 14,
                      fontWeight: 600, background: '#fff', color: 'var(--primary)'
                    }}>
                      📁 Upload Photo Instead
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                )}
              </div>

              <div className="otp-hint">{t('escalationNote')}</div>
              <button type="submit" className="btn btn-primary" style={{ padding: '14px 24px', justifyContent: 'center' }}>
                {t('submitComplaint')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export function ComplaintStatusScreen() {
  const { t } = useLanguage()
  const [complaints, setComplaints] = useState([...globalComplaints])
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Listen to Firestore complaints in real-time
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const firestoreComplaints = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        // Merge with local (local ones have photos which are not stored in Firestore)
        const localIds = new Set(firestoreComplaints.map(c => c.id))
        const localOnly = globalComplaints.filter(c => !localIds.has(c.id))
        setComplaints([...localOnly, ...firestoreComplaints])
      }
    }, () => {
      // On error, just show local complaints
      setComplaints([...globalComplaints])
    })

    // Also listen to local updates
    window.onComplaintsUpdated = (updatedList) => {
      setComplaints(prev => {
        const fsIds = new Set(prev.filter(c => c.createdAt).map(c => c.id))
        const newLocal = updatedList.filter(c => !fsIds.has(c.id))
        return [...newLocal, ...prev.filter(c => c.createdAt)]
      })
    }

    return () => {
      unsubscribe()
      window.onComplaintsUpdated = null
    }
  }, [])

  const filteredComplaints = complaints.filter(c => 
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.id?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 20 }}>
        <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
          <span>🔍</span>
          <input 
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 15 }} 
            placeholder={t('searchComplaint')} 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredComplaints.map((c, i) => (
          <div className="complaint-status-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`complaint-status-indicator ${c.status}`} />
            <div className="complaint-status-content">
              <h4>{c.title}</h4>
              <p>{c.lastUpdate}</p>
              <div className="complaint-status-meta">
                <span>🎫 {c.id}</span>
                <span>📁 {c.category}</span>
                <span>📅 {c.date}</span>
                <span>🏛️ {c.assignedTo}</span>
                <span className={`badge ${c.status === 'resolved' ? 'badge-success' : c.status === 'inprogress' ? 'badge-info' : 'badge-warning'}`}>
                  {c.status === 'resolved' ? t('resolved') : c.status === 'inprogress' ? t('inProgress') : t('pending')}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filteredComplaints.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
            No complaints found.
          </div>
        )}
      </div>
    </div>
  )
}

export function ProfileScreen() {
  const { t, lang } = useLanguage()
  const [userName, setUserName] = useState('ರಾಮಪ್ಪ ಗೌಡ')
  const [userDistrict, setUserDistrict] = useState('Mysuru')
  const [userTaluk, setUserTaluk] = useState('Mysuru Taluk')
  const [userPhone, setUserPhone] = useState('+91 98765 43210')
  const [userAadhaar, setUserAadhaar] = useState('XXXX-XXXX-5678')
  const [userLand, setUserLand] = useState('2.5 Acres — Ragi & Mulberry')
  const [userBank, setUserBank] = useState('Canara Bank (Karnataka Based)')
  const [userAccount, setUserAccount] = useState('XXXX XXXX 9012')
  const [userIfsc, setUserIfsc] = useState('CNRB0002789')

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editDistrict, setEditDistrict] = useState('')
  const [editTaluk, setEditTaluk] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editAadhaar, setEditAadhaar] = useState('')
  const [editLand, setEditLand] = useState('')
  const [editBank, setEditBank] = useState('')
  const [editAccount, setEditAccount] = useState('')
  const [editIfsc, setEditIfsc] = useState('')

  const districtsOfKarnataka = [
    { name: 'Mysuru', taluks: ['Mysuru Taluk', 'Nanjangud Taluk', 'Hunsur Taluk', 'T.Narasipura Taluk'] },
    { name: 'Ramanagara', taluks: ['Ramanagara Taluk', 'Channapatna Taluk', 'Kanakapura Taluk', 'Magadi Taluk'] },
    { name: 'Mandya', taluks: ['Mandya Taluk', 'Maddur Taluk', 'Malavalli Taluk', 'Srirangapatna Taluk'] },
    { name: 'Tumkuru', taluks: ['Tumkuru Taluk', 'Sira Taluk', 'Tiptur Taluk', 'Madhugiri Taluk'] },
    { name: 'Belagavi', taluks: ['Belagavi Taluk', 'Gokak Taluk', 'Athani Taluk', 'Chikodi Taluk'] },
  ]

  const handleDistrictChange = (distName) => {
    setEditDistrict(distName)
    const found = districtsOfKarnataka.find(d => d.name === distName)
    if (found && found.taluks.length > 0) {
      setEditTaluk(found.taluks[0])
    }
  }

  useEffect(() => {
    const sName = window.localStorage.getItem('citizen_name')
    const sDist = window.localStorage.getItem('citizen_district')
    const sTaluk = window.localStorage.getItem('citizen_taluk')
    const sPhone = window.localStorage.getItem('citizen_phone')
    const sAadhaar = window.localStorage.getItem('citizen_aadhaar')
    const sLand = window.localStorage.getItem('citizen_land')
    const sBank = window.localStorage.getItem('citizen_bank')
    const sAccount = window.localStorage.getItem('citizen_account')
    const sIfsc = window.localStorage.getItem('citizen_ifsc')

    if (sName) setUserName(sName)
    if (sDist) setUserDistrict(sDist)
    if (sTaluk) setUserTaluk(sTaluk)
    if (sPhone) setUserPhone(sPhone.startsWith('+91') ? sPhone : '+91 ' + sPhone.slice(0, 5) + ' ' + sPhone.slice(5))
    if (sAadhaar) setUserAadhaar(sAadhaar)
    if (sLand) setUserLand(sLand)
    if (sBank) setUserBank(sBank)
    if (sAccount) setUserAccount(sAccount)
    if (sIfsc) setUserIfsc(sIfsc)
  }, [])

  const startEditing = () => {
    setEditName(userName)
    setEditDistrict(userDistrict)
    setEditTaluk(userTaluk)
    setEditPhone(userPhone.replace('+91 ', '').replace(/\s+/g, ''))
    setEditAadhaar(userAadhaar)
    setEditLand(userLand)
    setEditBank(userBank)
    setEditAccount(userAccount)
    setEditIfsc(userIfsc)
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    
    window.localStorage.setItem('citizen_name', editName)
    window.localStorage.setItem('citizen_district', editDistrict)
    window.localStorage.setItem('citizen_taluk', editTaluk)
    window.localStorage.setItem('citizen_phone', editPhone)
    window.localStorage.setItem('citizen_aadhaar', editAadhaar)
    window.localStorage.setItem('citizen_land', editLand)
    window.localStorage.setItem('citizen_bank', editBank)
    window.localStorage.setItem('citizen_account', editAccount)
    window.localStorage.setItem('citizen_ifsc', editIfsc)

    setUserName(editName)
    setUserDistrict(editDistrict)
    setUserTaluk(editTaluk)
    setUserPhone('+91 ' + editPhone.slice(0, 5) + ' ' + editPhone.slice(5))
    setUserAadhaar(editAadhaar)
    setUserLand(editLand)
    setUserBank(editBank)
    setUserAccount(editAccount)
    setUserIfsc(editIfsc)

    setIsEditing(false)

    window.dispatchEvent(new Event('profileUpdate'))
  }

  if (isEditing) {
    const activeDistrictObj = districtsOfKarnataka.find(d => d.name === editDistrict) || districtsOfKarnataka[0]
    return (
      <form onSubmit={handleSave} className="animate-fadeInUp card" style={{ maxWidth: 650, margin: '0 auto', padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--primary)' }}>✏️ Edit Profile Details</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Name / ಪೂರ್ಣ ಹೆಸರು</label>
            <input 
              type="text" 
              className="form-input" 
              value={editName} 
              onChange={e => setEditName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-input" style={{ width: 60, flexShrink: 0 }} value="+91" readOnly />
              <input 
                type="tel" 
                className="form-input" 
                value={editPhone} 
                onChange={e => setEditPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                required 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">District / ಜಿಲ್ಲೆ</label>
            <select 
              className="form-input" 
              value={editDistrict} 
              onChange={e => handleDistrictChange(e.target.value)} 
              required
            >
              {districtsOfKarnataka.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Taluk / ತಾಲೂಕು</label>
            <select 
              className="form-input" 
              value={editTaluk} 
              onChange={e => setEditTaluk(e.target.value)} 
              required
            >
              {activeDistrictObj.taluks.map(tOption => (
                <option key={tOption} value={tOption}>{tOption}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Aadhaar Number / ಆಧಾರ್ ಸಂಖ್ಯೆ</label>
            <input 
              type="text" 
              className="form-input" 
              value={editAadhaar} 
              onChange={e => setEditAadhaar(e.target.value)} 
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Land Holding (Acres / Crop)</label>
            <input 
              type="text" 
              className="form-input" 
              value={editLand} 
              onChange={e => setEditLand(e.target.value)} 
              placeholder="e.g. 2.5 Acres - Ragi"
            />
          </div>
        </div>

        <h4 style={{ fontSize: 14, fontWeight: 700, margin: '20px 0 10px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)', paddingBottom: 6 }}>💳 Bank Account Details (for DBT)</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Bank Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={editBank} 
              onChange={e => setEditBank(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Account Number</label>
            <input 
              type="text" 
              className="form-input" 
              value={editAccount} 
              onChange={e => setEditAccount(e.target.value)} 
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 24, maxWidth: '50%' }}>
          <label className="form-label">IFSC Code</label>
          <input 
            type="text" 
            className="form-input" 
            value={editIfsc} 
            onChange={e => setEditIfsc(e.target.value)} 
          />
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    )
  }

  return (
    <div className="animate-fadeInUp">
      <div className="content-grid">
        <div>
          <div className="card" style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff', margin: '0 auto 16px', fontWeight: 700 }}>
              {userName.charAt(0)}
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>{userName}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>{userTaluk}, {userDistrict}, Karnataka</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <span className="badge badge-success">Aadhaar Verified</span>
              <span className="badge badge-primary">PM Kisan Active</span>
              <span className="badge badge-warning">Raitha Siri</span>
            </div>
            <button className="btn btn-outline" onClick={startEditing} style={{ marginTop: 16 }}>✏️ {t('edit')}</button>
          </div>
          <div className="card">
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('personalDetails')}</h4>
            {[
              [Phone,    t('mobile'),      userPhone],
              [Home,     t('village'),     userTaluk + ' Village'],
              [Map,      t('taluk'),       userTaluk],
              [Building2,t('district'),    userDistrict + ', Karnataka'],
              [ShieldCheck, t('aadhaar'),  userAadhaar],
              [Wheat,    'Land (ಜಮೀನು)',   userLand],
            ].map(([Icon, label, val]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={17} strokeWidth={1.8} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('activeSchemesList')}</h4>
            {[
              { name: 'PM Kisan Samman Nidhi', status: 'Active', next: 'Next instalment: Dec 2026' },
              { name: 'Raitha Siri', status: 'Active', next: 'Seeds & tools received 2026' },
              { name: 'Krishi Bhagya', status: 'Applied', next: 'Drip irrigation subsidy applied' },
              { name: 'Ayushman Arogya Karnataka', status: 'Active', next: 'Card valid till 2028' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.next}</p>
                </div>
                <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('bankDetails')}</h4>
            {[
              ['Bank', userBank],
              ['Branch', userDistrict + ' Main Branch'],
              ['Account', userAccount],
              ['IFSC', userIfsc],
              ['DBT Linked', '✅ Aadhaar Linked'],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 14 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{l}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
