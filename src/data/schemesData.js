import { scholarshipSchemes } from './scholarshipsData.js';

export const kaSchemes = [
  // ==========================================
  // AGRICULTURE & ALLIED
  // ==========================================
  {
    id: 'pm-kisan',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Large Landholders'],
    objective: 'Income Support',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'PM Kisan Samman Nidhi', kn: 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ ನಿಧಿ', hi: 'PM किसान सम्मान निधि' },
    desc: { 
      en: 'Central government income support scheme providing ₹6,000 per year in three equal instalments of ₹2,000 directly into Aadhaar-linked bank accounts.', 
      kn: 'ವಾರ್ಷಿಕ ₹6,000 ಪ್ರೋತ್ಸಾಹಧನವನ್ನು ತಲಾ ₹2,000 ನಂತೆ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ರೈತರ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರವಾಗಿ ಜಮೆ ಮಾಡುವ ಯೋಜನೆ.', 
      hi: '₹6,000 प्रति वर्ष 3 समान किस्तों (₹2,000 प्रत्येक) में सीधे किसानों के आधार लिंक बैंक खाते में।' 
    },
    eligibility: {
      en: 'All landholding farmer families with cultivable landholding in their names across India.',
      kn: 'ತಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು.',
      hi: 'अपने नाम पर कृषि योग्य भूमि रखने वाले सभी किसान परिवार।'
    },
    exclusions: {
      en: 'Institutional landholders, serving/retired Govt employees, income taxpayers, constitutional post holders, professionals (Doctors, Engineers, CA).',
      kn: 'ಸಾಂಸ್ಥಿಕ ಭೂಮಾಲೀಕರು, ಹಾಲಿ/ನಿವೃತ್ತ ಸರ್ಕಾರಿ ನೌಕರರು, ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರು, ಸಾಂವಿಧಾನಿಕ ಹುದ್ದೆ ಹೊಂದಿರುವವರು.',
      hi: 'संस्थागत भूमिधारक, सरकारी कर्मचारी, आयकर दाता, संवैधानिक पदधारक।'
    },
    benefits: {
      subsidyPercent: '100% Direct Grant',
      maxLimit: '₹6,000 / year (₹2,000 x 3 instalments)',
      mode: 'Direct Benefit Transfer (DBT)',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar Card, Land Registry Details (RTC/Pahani), Active Bank Passbook, e-KYC verification.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ ಪತ್ರ (RTC), ಸಕ್ರಿಯ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್, ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲನೆ.',
      hi: 'आधार कार्ड, भूमि दस्तावेज (खतौनी/RTC), बैंक पासबुक, ई-केवाईसी।'
    },
    processSteps: [
      { step: 1, title: { en: 'Registration & e-KYC', kn: 'ನೋಂದಣಿ ಮತ್ತು ಇ-ಕೆವೈಸಿ', hi: 'पंजीकरण और ई-केवाईसी' }, desc: { en: 'Register on PM-KISAN portal or via local Gram One / CSC center with Aadhaar OTP.', kn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್ ಅಥವಾ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಆಧಾರ್ ಮೂಲಕ ನೋಂದಾಯಿಸಿ.', hi: 'पीएम-किसान पोर्टल या ग्राम वन/सीएससी पर पंजीकरण करें।' } },
      { step: 2, title: { en: 'Land Record Seeding', kn: 'ಭೂ ದಾಖಲೆ ಜೋಡಣೆ', hi: 'भूमि रिकॉर्ड लिंक' }, desc: { en: 'Verify land RTC / Survey number through FRUITS Karnataka integration.', kn: 'ಫ್ರೂಟ್ಸ್ ತಂತ್ರಾಂಶದೊಂದಿಗೆ ಪಹಣಿ ಸಂಖ್ಯೆ ಜೋಡಿಸಿ.', hi: 'कर्नाटक FRUITS पोर्टल के माध्यम से भूमि खसरा सत्यापित करें।' } },
      { step: 3, title: { en: 'State Approval', kn: 'ರಾಜ್ಯ ಸರ್ಕಾರದ ಅನುಮೋದನೆ', hi: 'राज्य सत्यापन' }, desc: { en: 'Taluk Agriculture Officer (ADA) approves identity and land eligibility.', kn: 'ತಾಲೂಕು ಕೃಷಿ ಅಧಿಕಾರಿಗಳಿಂದ ಪರಿಶೀಲನೆ ಮತ್ತು ಅನುಮೋದನೆ.', hi: 'तालुक कृषि अधिकारी द्वारा भौतिक सत्यापन।' } },
      { step: 4, title: { en: 'DBT Credit', kn: 'ನೇರ ನಗದು ಜಮೆ', hi: 'डीबीटी भुगतान' }, desc: { en: 'Direct credit into Aadhaar-linked NPCI mapped bank account every 4 months.', kn: 'ಪ್ರತಿ 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಹಣ ವರ್ಗಾವಣೆ.', hi: 'हर 4 महीने में बैंक खाते में ₹2,000 की किस्त ट्रांसफर।' } }
    ],
    timeline: '15 - 30 Days for verification & inclusion in upcoming cycle',
    img: '/schemes/pm-kisan.jpg',
    badge: { en: 'Central DBT', kn: 'ಕೇಂದ್ರ DBT', hi: 'केंद्रीय डीबीटी' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of Agriculture & Farmers Welfare, GoI', kn: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ, ಭಾರತ', hi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार' },
    applyLink: 'https://pmkisan.gov.in/',
    trackerUrl: 'https://pmkisan.gov.in/BeneficiaryStatus_New.aspx'
  },
  {
    id: 'pmfby',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Large Landholders', 'Women Farmers', 'Tenant Farmers'],
    objective: 'Crop Insurance',
    stage: 'Harvesting',
    districtSpecific: ['All'],
    title: { en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', kn: 'ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ', hi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)' },
    desc: { 
      en: 'Comprehensive crop insurance covering non-preventable natural risks (drought, flood, unseasonal rains, pest attacks) from pre-sowing to post-harvest.', 
      kn: 'ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳು, ಅನಾವೃಷ್ಟಿ, ಪ್ರವಾಹ, ಕೀಟ ಮತ್ತು ರೋಗಗಳಿಂದ ಬೆಳೆ ಹಾನಿಯಾದಲ್ಲಿ ರೈತರಿಗೆ ಸಂಪೂರ್ಣ ವಿಮಾ ರಕ್ಷಣೆ.', 
      hi: 'प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल नुकसान की स्थिति में व्यापक वित्तीय बीमा कवर।' 
    },
    eligibility: {
      en: 'All farmers including loanee, non-loanee, sharecroppers, and tenant farmers growing notified crops in notified areas.',
      kn: 'ಅಧಿಸೂಚಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಅಧಿಸೂಚಿತ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯುವ ಎಲ್ಲಾ ರೈತರು (ಸಾಲ ಪಡೆದ ಮತ್ತು ಸಾಲ ಪಡೆಯದ, ಗೇಣಿದಾರರು ಸೇರಿ).',
      hi: 'अधिसूचित फसलों को उगाने वाले सभी ऋणी, गैर-ऋणी, बटाईदार और काश्तकार किसान।'
    },
    exclusions: {
      en: 'Losses due to war, nuclear risks, malicious damage, preventable negligence, or crops not notified in the area.',
      kn: 'ಉದ್ದೇಶಪೂರ್ವಕ ಹಾನಿ, ಯುದ್ಧ, ನಿರ್ಲಕ್ಷ್ಯ ಅಥವಾ ಅಧಿಸೂಚಿತವಲ್ಲದ ಬೆಳೆಗಳಿಗೆ ವಿಮೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.',
      hi: 'युद्ध, जानबूझकर किए गए नुकसान या गैर-अधिसूचित फसलों पर नुकसान देय नहीं।'
    },
    benefits: {
      subsidyPercent: 'Nominal premium (1.5% Rabi, 2% Kharif, 5% Commercial/Horticulture)',
      maxLimit: 'Full Sum Insured based on Scale of Finance (up to ₹50,000 - ₹1,50,000/acre)',
      mode: 'Direct Bank Settlement within 30 days of assessment',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar Card, Land RTC (Pahani), Sowing Certificate / Crop Declaration, Bank Passbook copy.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ (RTC), ಬಿತ್ತನೆ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಘೋಷಣೆ, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'आधार कार्ड, भूमि दस्तावेज (RTC), बुवाई प्रमाण पत्र, बैंक पासबुक।'
    },
    processSteps: [
      { step: 1, title: { en: 'Crop & Area Notification', kn: 'ಬೆಳೆ ಅಧಿಸೂಚನೆ', hi: 'फसल अधिसूचना' }, desc: { en: 'Check notification cutoff dates for your taluk via Samrakshane portal.', kn: 'ಸಂರಕ್ಷಣೆ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ ತಾಲೂಕಿನ ಕೊನೆಯ ದಿನಾಂಕ ಪರಿಶೀಲಿಸಿ.', hi: 'संरक्षणे पोर्टल पर अपनी तहसील की अंतिम तिथि देखें।' } },
      { step: 2, title: { en: 'Premium Payment', kn: 'ವಿಮಾ ಕಂತು ಪಾವತಿ', hi: 'प्रीमियम भुगतान' }, desc: { en: 'Pay minimal 1.5%-2% premium through CSC, Bank, or Samrakshane portal.', kn: 'ಗ್ರಾಮ ಒನ್/ಸಿಎಸ್‌ಸಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ಮೂಲಕ ಕೇವಲ 1.5% - 2% ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಿ.', hi: 'सीएससी, बैंक या पोर्टल के माध्यम से 1.5%-2% प्रीमियम जमा करें।' } },
      { step: 3, title: { en: 'Damage Intimation (72 hrs)', kn: '72 ಗಂಟೆಯೊಳಗೆ ಮಾಹಿತಿ', hi: '72 घंटे में सूचना' }, desc: { en: 'Report localized calamity or unseasonal rain on Crop Insurance App within 72 hours.', kn: 'ಸ್ಥಳೀಯ ಬೆಳೆ ಹಾನಿಯಾದರೆ 72 ಗಂಟೆಗಳಲ್ಲಿ ಕ್ರಾಪ್ ಇನ್ಶುರೆನ್ಸ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಮಾಹಿತಿ ನೀಡಿ.', hi: 'फसल नुकसान के 72 घंटे के भीतर क्रॉप इंश्योरेंस ऐप पर सूचना दें।' } },
      { step: 4, title: { en: 'Claim Disbursement', kn: 'ಪರಿಹಾರ ಬಿಡುಗಡೆ', hi: 'दावा निपटान' }, desc: { en: 'Automatic claim transfer post crop-cutting experiments and joint survey.', kn: 'ಬೆಳೆ ಕಟಾವು ಪ್ರಯೋಗ ಹಾಗೂ ಸರ್ವೇ ನಂತರ ನೇರವಾಗಿ ಖಾತೆಗೆ ಪರಿಹಾರ.', hi: 'संयुक्त सर्वेक्षण के बाद खाते में सीधे दावा राशि का भुगतान।' } }
    ],
    timeline: 'Cutoff seasonal; Claim settlement within 30-45 days of survey',
    img: '/schemes/pmfby.jpg',
    badge: { en: 'Crop Cover', kn: 'ಬೆಳೆ ರಕ್ಷಣೆ', hi: 'फसल बीमा' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Ministry of Agriculture & Farmers Welfare, GoI', kn: 'ಕೃಷಿ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ', hi: 'कृषि एवं किसान कल्याण मंत्रालय' },
    applyLink: 'https://samrakshane.karnataka.gov.in/',
    trackerUrl: 'https://samrakshane.karnataka.gov.in/PublicWebPages/SearchStatus.aspx'
  },
  {
    id: 'kisan-credit-card',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Large Landholders', 'Women Farmers', 'Youth/Agri-Startups', 'FPOs'],
    objective: 'Mechanization',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Kisan Credit Card (KCC) & Interest Subvention', kn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC)', hi: 'किसान क्रेडिट कार्ड (KCC)' },
    desc: { 
      en: 'Provides farmers with revolving credit at subsidized 4% p.a. interest rate for seasonal cultivation expenses, post-harvest needs, animal husbandry, and maintenance.', 
      kn: 'ಕೃಷಿ ವೆಚ್ಚಗಳು, ಬಿತ್ತನೆ ಬೀಜ, ರಸಗೊಬ್ಬರ ಮತ್ತು ಪಶುಸಂಗೋಪನೆಗಾಗಿ ಶೇ 4% ರಿಯಾಯಿತಿ ಬಡ್ಡಿ ದರದಲ್ಲಿ ಸಕಾಲಿಕ ಸಾಲ ಸೌಲಭ್ಯ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'खेती की लागत, बीज, उर्वरक और पशुपालन के लिए 4% रियायती ब्याज दर पर समय पर अल्पकालिक ऋण।' 
    },
    eligibility: {
      en: 'Individual owner cultivators, tenant farmers, sharecroppers, SHGs, and JLGs involved in agriculture, fisheries, and dairy.',
      kn: 'ಸ್ವಂತ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತರು, ಗೇಣಿದಾರರು, ಪಶುಪಾಲಕರು ಹಾಗೂ ಸ್ವಸಹಾಯ ಸಂಘಗಳು.',
      hi: 'व्यक्तिगत किसान, काश्तकार, बटाईदार, डेयरी व मत्स्य पालक।'
    },
    exclusions: {
      en: 'Defaulters of previous bank loans without restructuring or individuals with invalid identity credentials.',
      kn: 'ಹಿಂದಿನ ಕೃಷಿ ಸಾಲವನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಮರುಪಾವತಿಸದ ಸುಸ್ತಿ ಸಾಲಗಾರರು.',
      hi: 'बैंक के पुराने डिफॉल्टर या अमान्य दस्तावेज वाले व्यक्ति।'
    },
    benefits: {
      subsidyPercent: 'Interest Subvention of 3% for prompt repayment (effective rate 4% p.a.)',
      maxLimit: 'Up to ₹3,00,000 without collateral up to ₹1,60,000',
      mode: 'Revolving Credit ATM / RuPay Card',
      interestSubvention: '4.0% per annum (7% nominal minus 3% prompt repayment rebate)'
    },
    documents: {
      en: 'Aadhaar Card, PAN Card, Land RTC / Pahani, Passport Photo, No-Dues declaration.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪ್ಯಾನ್ ಕಾರ್ಡ್, ಭೂ ಪಹಣಿ (RTC), ಭಾವಚಿತ್ರ, ಸಾಲ ಬಾಕಿ ಇಲ್ಲದ ದೃಢೀಕರಣ ಪತ್ರ.',
      hi: 'आधार, पैन कार्ड, भूमि रिकॉर्ड, पासपोर्ट फोटो, नो-ड्यूज शपथ पत्र।'
    },
    processSteps: [
      { step: 1, title: { en: 'Application Form', kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ', hi: 'आवेदन पत्र' }, desc: { en: 'Fill single-page simplified KCC form at nearest Commercial/Grameena Bank or PACS.', kn: 'ಹತ್ತಿರದ ಗ್ರಾಮೀಣ ಬ್ಯಾಂಕ್, ರಾಷ್ಟ್ರೀಕೃತ ಬ್ಯಾಂಕ್ ಅಥವಾ ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಪತ್ತಿನ ಸಹಕಾರ ಸಂಘದಲ್ಲಿ ಅರ್ಜಿ ನೀಡಿ.', hi: 'निकटतम बैंक शाखा या पीएसीएस में 1-पेज का सरलीकृत केसीसी फॉर्म भरें।' } },
      { step: 2, title: { en: 'Land Record Verification', kn: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ', hi: 'दस्तावेज सत्यापन' }, desc: { en: 'Bank verifies RTC through Karnataka Bhoomi online portal within 7 days.', kn: 'ಭೂಮಿ ತಂತ್ರಾಂಶದ ಮೂಲಕ ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಗಳು ಪಹಣಿ ಪರಿಶೀಲನೆ ನಡೆಸುತ್ತಾರೆ.', hi: 'भूमि रिकॉर्ड का ऑनलाइन पोर्टल से 7 दिनों में सत्यापन।' } },
      { step: 3, title: { en: 'Card & Limit Sanction', kn: 'ಕಾರ್ಡ್ ವಿತರಣೆ', hi: 'कार्ड स्वीकृति' }, desc: { en: 'RuPay KCC Card issued with valid credit limit linked to cropping pattern.', kn: 'ಬೆಳೆ ಪದ್ಧತಿಗೆ ಅನುಗುಣವಾಗಿ ರುಪೇ ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ವಿತರಣೆ.', hi: 'फसल चक्र के अनुसार निर्धारित सीमा वाला RuPay KCC जारी किया जाता है।' } }
    ],
    timeline: '14 Days guaranteed under RBI Citizen Charter',
    img: '/schemes/kisan-credit-card.jpg',
    badge: { en: '4% Interest Loan', kn: '೪% ಬಡ್ಡಿ ಸಾಲ', hi: '4% ब्याज ऋण' },
    badgeClass: 'badge-info',
    ministry: { en: 'Ministry of Finance & NABARD', kn: 'ಹಣಕಾಸು ಸಚಿವಾಲಯ ಮತ್ತು ನಬಾರ್ಡ್', hi: 'वित्त मंत्रालय एवं नाबार्ड' },
    applyLink: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card',
    trackerUrl: 'https://jansamarth.in/'
  },
  {
    id: 'raitha-siri',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers', 'Organic Farming'],
    objective: 'Organic Farming',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Raitha Siri Scheme (Millet Subsidy)', kn: 'ರೈತ ಸಿರಿ ಯೋಜನೆ (ಸಿರಿಧಾನ್ಯ ಪ್ರೋತ್ಸಾಹಧನ)', hi: 'रैता सिरि योजना (बाजरा प्रोत्साहन)' },
    desc: { 
      en: 'Karnataka state incentive providing ₹10,000 per hectare directly to farmers cultivating minor millets (Ragi, Jowar, Foxtail, Little millet, etc.) to promote sustainable farming.', 
      kn: 'ಸಿರಿಧಾನ್ಯಗಳಾದ ನವಣೆ, ಸಾಮೆ, ಹಾರಕ, ಕೊರಲೆ, ಊದಲು ಮತ್ತು ರಾಗಿ ಬೆಳೆಯುವ ರೈತರಿಗೆ ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000 ನೇರ ಪ್ರೋತ್ಸಾಹಧನ ನೀಡುವ ರಾಜ್ಯ ಸರ್ಕಾರದ ಯೋಜನೆ.', 
      hi: 'कर्नाटक के किसानों को मोटे अनाज (रागी, ज्वार, बाजरा, कंगनी) की खेती के लिए ₹10,000 प्रति हेक्टेयर प्रत्यक्ष प्रोत्साहन।' 
    },
    eligibility: {
      en: 'Small and marginal farmers holding valid RTC in Karnataka cultivating any of the 6 notified minor millets.',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಸಿಂಧು ಪಹಣಿ ಹೊಂದಿರುವ ಮತ್ತು 6 ಅಧಿಸೂಚಿತ ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.',
      hi: 'कर्नाटक के सभी छोटे किसान जो अधिसूचित मोटे अनाज उगाते हैं।'
    },
    exclusions: {
      en: 'Non-agricultural landholders or farmers cultivating commercial sugarcane/tobacco in place of millets.',
      kn: 'ಕೃಷಿಯೇತರ ಭೂಮಾಲೀಕರು ಅಥವಾ ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯದ ರೈತರು.',
      hi: 'गैर-कृषि भूमिधारक अथवा गैर-मोटे अनाज उत्पादक।'
    },
    benefits: {
      subsidyPercent: 'Direct incentive of ₹10,000 / hectare',
      maxLimit: 'Up to ₹20,000 (Maximum 2 hectares per farmer family)',
      mode: 'DBT directly to Aadhaar seeded bank account in 2 phases',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar Card, Land RTC (Pahani), FRUITS FID number, Bank Account Details, Crop Sowing Photo verification.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ ಪತ್ರ, ಫ್ರೂಟ್ಸ್ ಐಡಿ (FID), ಬ್ಯಾಂಕ್ ಖಾತೆ ಪ್ರತಿ, ಬೆಳೆ ಸಮೀಕ್ಷೆ ಫೋಟೋ.',
      hi: 'आधार, भूमि RTC, FRUITS आईडी, बैंक खाता, फसल सर्वे फोटो।'
    },
    processSteps: [
      { step: 1, title: { en: 'FRUITS & Sowing Registration', kn: 'ಫ್ರೂಟ್ಸ್ ಹಾಗೂ ಬಿತ್ತನೆ ನೋಂದಣಿ', hi: 'पंजीकरण व बुवाई' }, desc: { en: 'Register crop in Karnataka Farmers Crop Survey App / RSK center.', kn: 'ರೈತರು ಕೃಷಿ ಇಲಾಖೆಯ ಬೆಳೆ ಸಮೀಕ್ಷೆ ಆ್ಯಪ್‌ನಲ್ಲಿ ಸಿರಿಧಾನ್ಯ ಬಿತ್ತನೆಯನ್ನು ದಾಖಲಿಸಬೇಕು.', hi: 'कर्नाटक फसल सर्वे ऐप पर मोटे अनाज की बुवाई दर्ज करें।' } },
      { step: 2, title: { en: 'RSK Physical Inspection', kn: 'ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ', hi: 'भौतिक सत्यापन' }, desc: { en: 'Agricultural Assistant conducts GPS geotagged verification of the millet field.', kn: 'ಕೃಷಿ ಅಧಿಕಾರಿಗಳು ಜಮೀನಿಗೆ ಭೇಟಿ ನೀಡಿ ಜಿಪಿಎಸ್ ಫೋಟೋ ಮೂಲಕ ದೃಢೀಕರಿಸುತ್ತಾರೆ.', hi: 'कृषि सहायक द्वारा जीपीएस आधारित फील्ड सत्यापन।' } },
      { step: 3, title: { en: 'DBT Installment Release', kn: 'ಹಣ ಜಮೆ', hi: 'डीबीटी भुगतान' }, desc: { en: '₹6,000 after seedling establishment + ₹4,000 at flowering stage.', kn: 'ಮೊದಲ ಹಂತದಲ್ಲಿ ₹6,000 ಮತ್ತು ಬೆಳೆ ಬಂದ ನಂತರ ₹4,000 ಖಾತೆಗೆ ಜಮೆ.', hi: 'दो किस्तों (₹6,000 + ₹4,000) में खाते में सीधे भुगतान।' } }
    ],
    timeline: '21 Days post crop survey validation',
    img: '/schemes/raitha-siri.jpg',
    badge: { en: 'State Incentive', kn: 'ರಾಜ್ಯ ಪ್ರೋತ್ಸಾಹಧನ', hi: 'राज्य प्रोत्साहन' },
    badgeClass: 'badge-success',
    ministry: { en: 'Dept. of Agriculture, Govt of Karnataka', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ', hi: 'कृषि विभाग, कर्नाटक सरकार' },
    applyLink: 'https://raitamitra.karnataka.gov.in/',
    trackerUrl: 'https://fruits.karnataka.gov.in/'
  },
  {
    id: 'krishi-bhagya',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers'],
    objective: 'Water Conservation',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Krishi Bhagya Scheme (Farm Ponds & Drip)', kn: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ (ಕೃಷಿ ಹೊಂಡ & ಹನಿ ನೀರಾವರಿ)', hi: 'कृषि भाग्य योजना (खेत तालाब एवं ड्रिप)' },
    desc: { 
      en: 'Karnataka government flagship scheme offering up to 90% subsidy for constructing farm ponds (Krishi Honda), polythene lining, diesel pumps, and micro-irrigation in rainfed areas.', 
      kn: 'ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶಗಳ ರೈತರಿಗೆ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ, ಪಾಲಿಥೀನ್ ಹೊದಿಕೆ, ಡೀಸೆಲ್ ಪಂಪ್‌ಸೆಟ್ ಮತ್ತು ಹನಿ ನೀರಾವರಿ ಘಟಕಗಳಿಗೆ ಶೇ 90% ವರೆಗೆ ಸಹಾಯಧನ.', 
      hi: 'वर्षा आधारित क्षेत्रों में खेत तालाब (कृषि होंडा), पॉलीथिन लाइनिंग, पंप और सूक्ष्म सिंचाई पर 90% तक सब्सिडी।' 
    },
    eligibility: {
      en: 'Farmers in rainfed agro-climatic zones across Karnataka having minimum 1 acre land.',
      kn: 'ಕರ್ನಾಟಕದ ಮಳೆಯಾಶ್ರಿತ ತಾಲೂಕುಗಳಲ್ಲಿ ಕನಿಷ್ಠ 1 ಎಕರೆ ಕೃಷಿ ಜಮೀನು ಹೊಂದಿರುವ ರೈತರು.',
      hi: 'वर्षा आधारित तहसीलों में कम से कम 1 एकड़ भूमि वाले किसान।'
    },
    exclusions: {
      en: 'Farmers in fully canal-irrigated command areas or those who already availed farm pond subsidy in the last 5 years.',
      kn: 'ಸಂಪೂರ್ಣ ನೀರಾವರಿ ಅಚ್ಚುಕಟ್ಟು ಪ್ರದೇಶದವರು ಅಥವಾ ಕಳೆದ 5 ವರ್ಷದಲ್ಲಿ ಈ ಸೌಲಭ್ಯ ಪಡೆದವರು.',
      hi: 'नहरी सिंचित क्षेत्र या पिछले 5 वर्षों में लाभ प्राप्त किसान।'
    },
    benefits: {
      subsidyPercent: '90% subsidy for SC/ST farmers, 80% subsidy for General farmers',
      maxLimit: 'Up to ₹1,50,000 for Farm Pond + Diesel Pump + Drip Irrigation package',
      mode: 'In-kind machinery excavation & direct vendor subsidy voucher',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Land RTC, Aadhaar Card, Caste Certificate (for SC/ST 90% subsidy), FRUITS ID, Bank Passbook copy.',
      kn: 'ಪಹಣಿ (RTC), ಆಧಾರ್ ಕಾರ್ಡ್, ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ 90% ಸಬ್ಸಿಡಿಗೆ), ಫ್ರೂಟ್ಸ್ ಐಡಿ.',
      hi: 'भूमि दस्तावेज, आधार कार्ड, जाति प्रमाण पत्र, फ्रूट्स आईडी।'
    },
    processSteps: [
      { step: 1, title: { en: 'Application at RSK', kn: 'ಆರ್‌ಎಸ್‌ಕೆಯಲ್ಲಿ ಅರ್ಜಿ', hi: 'आरएसके पर आवेदन' }, desc: { en: 'Submit application at Raitha Samparka Kendra with land coordinates.', kn: 'ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ದಾಖಲೆಗಳೊಂದಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'निकटतम रायथा संपर्क केंद्र (RSK) पर आवेदन जमा करें।' } },
      { step: 2, title: { en: 'Site Feasibility & Work Order', kn: 'ಸ್ಥಳ ತಪಾಸಣೆ & ಕಾರ್ಯಾಜ್ಞೆ', hi: 'स्थल निरीक्षण' }, desc: { en: 'Junior Engineer visits farm to verify catchment area and issues work sanction.', kn: 'ಕೃಷಿ ಇಂಜಿನಿಯರ್ ಸ್ಥಳ ಪರಿಶೀಲಿಸಿ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣಕ್ಕೆ ಅನುಮೋದನೆ ನೀಡುತ್ತಾರೆ.', hi: 'इंजीनियर द्वारा साइट निरीक्षण के बाद कार्य आदेश जारी।' } },
      { step: 3, title: { en: 'Excavation & Lining', kn: 'ಹೊಂಡ ನಿರ್ಮಾಣ & ಲೈನಿಂಗ್', hi: 'तालाब निर्माण' }, desc: { en: 'Construction of pond using registered JCB and polythene membrane installation.', kn: 'ಅನುಮೋದಿತ ಜೆಸಿಬಿ ಮೂಲಕ ಹೊಂಡ ನಿರ್ಮಿಸಿ ಟಾರ್ಪಾಲಿನ್ ಅಳವಡಿಕೆ.', hi: 'तालाब खुदाई और तिरपाल/पॉलीथिन लाइनिंग की स्थापना।' } },
      { step: 4, title: { en: 'Verification & Fund Release', kn: 'ಪರಿಶೀಲನೆ & ಹಣ ಬಿಡುಗಡೆ', hi: 'अंतिम सत्यापन व भुगतान' }, desc: { en: 'GPS camera measurement and direct DBT reimbursement to farmer account.', kn: 'ಅಧಿಕಾರಿಗಳ ಅಂತಿಮ ತಪಾಸಣೆ ನಂತರ ರೈತರ ಖಾತೆಗೆ ಸಹಾಯಧನ ಜಮೆ.', hi: 'जीपीएस फोटो सत्यापन के बाद सीधे खाते में सब्सिडी का भुगतान।' } }
    ],
    timeline: '30 - 45 Days from application to sanction',
    img: '/schemes/krishi-bhagya.jpg',
    badge: { en: '90% Subsidy', kn: '೯೦% ಸಹಾಯಧನ', hi: '90% सब्सिडी' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept. of Agriculture, Karnataka', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ', hi: 'कृषि विभाग, कर्नाटक' },
    applyLink: 'https://raitamitra.karnataka.gov.in/',
    trackerUrl: 'https://fruits.karnataka.gov.in/'
  },
  {
    id: 'pm-kusum',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers', 'FPOs'],
    objective: 'Mechanization',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'PM KUSUM - Solar Irrigation Pumps', kn: 'ಪಿಎಂ ಕುಸುಮ್ - ಸೋಲಾರ್ ಪಂಪ್‌ಸೆಟ್ ಯೋಜನೆ', hi: 'पीएम कुसुम - सोलर कृषि पंप योजना' },
    desc: { 
      en: 'Provides standalone off-grid Solar Water Pumps (3HP to 7.5HP) with up to 60% combined Central & State subsidy, replacing expensive diesel pump sets and unreliable grid power.', 
      kn: 'ರೈತರಿಗೆ ಕೃಷಿ ನೀರಾವರಿಗಾಗಿ ಶೇ 60% ಸಹಾಯಧನದೊಂದಿಗೆ 3HP ನಿಂದ 7.5HP ವರೆಗಿನ ಉಚಿತ ಸೌರಶಕ್ತಿ ಚಾಲಿತ ಪಂಪ್‌ಸೆಟ್ (ಸೋಲಾರ್ ಪಂಪ್) ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'किसानों को 60% तक संयुक्त सब्सिडी पर 3HP से 7.5HP क्षमता के स्टैंडअलोन सोलर सिंचाई पंप उपलब्ध कराना।' 
    },
    eligibility: {
      en: 'Individual farmers, water user associations, and farmer groups with a dug well/borewell not having grid electricity connectivity.',
      kn: 'ವಿದ್ಯುತ್ ಸಂಪರ್ಕವಿಲ್ಲದ ಕೊಳವೆಬಾವಿ ಅಥವಾ ತೆರೆದ ಬಾವಿ ಹೊಂದಿರುವ ರೈತರು.',
      hi: 'बिजली कनेक्शन रहित बोरवेल या कुआं रखने वाले किसान।'
    },
    exclusions: {
      en: 'Farms already having energized grid connections under free power quota.',
      kn: 'ಈಗಾಗಲೇ ನಿಯಮಿತ ಗ್ರಿಡ್ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಹೊಂದಿರುವ ಪಂಪ್‌ಸೆಟ್‌ಗಳು.',
      hi: 'पहले से ग्रिड बिजली से जुड़े अधिकृत पंप।'
    },
    benefits: {
      subsidyPercent: '60% Subsidy (30% Central + 30% Karnataka KREDL), Farmer share only 40% (loan available for 30%)',
      maxLimit: 'Up to ₹2,50,000 subsidy on 7.5 HP Solar Pump Package',
      mode: 'Turnkey physical installation by empanelled solar vendors',
      interestSubvention: 'Bank loan available at KCC rates for farmer contribution'
    },
    documents: {
      en: 'Aadhaar Card, Land RTC, Groundwater test/Borewell certificate, Bank Passbook, Passport Photo.',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್, ಪಹಣಿ (RTC), ಕೊಳವೆಬಾವಿ ಪ್ರಮಾಣಪತ್ರ, ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ.',
      hi: 'आधार, भूमि खतौनी, बोरवेल प्रमाण पत्र, बैंक पासबुक।'
    },
    processSteps: [
      { step: 1, title: { en: 'Online Application', kn: 'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ', hi: 'ऑनलाइन आवेदन' }, desc: { en: 'Apply via KREDL Karnataka Kusum portal with required documents.', kn: 'KREDL ಕರ್ನಾಟಕ ಕುಸುಮ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'KREDL कुसुम पोर्टल पर आवेदन भरें।' } },
      { step: 2, title: { en: 'Deposit Farmer Share', kn: 'ರೈತರ ವಂತಿಕೆ ಪಾವತಿ', hi: 'किसान अंशदान' }, desc: { en: 'Pay initial 10% farmer share after document verification.', kn: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ ನಂತರ ನಿಗದಿತ ವಂತಿಕೆ ಮೊತ್ತ ಪಾವತಿಸಿ.', hi: 'दस्तावेज सत्यापन के बाद 10% अंशदान जमा करें।' } },
      { step: 3, title: { en: 'Solar Panel & Pump Installation', kn: 'ಸೋಲಾರ್ ಪ್ಯಾನಲ್ ಅಳವಡಿಕೆ', hi: 'सोलर पंप स्थापना' }, desc: { en: 'Certified agency delivers panels, structure, controller and DC pump.', kn: 'ಅಧಿಕೃತ ಕಂಪನಿಯು ಸೋಲಾರ್ ಪ್ಯಾನಲ್ ಮತ್ತು ಮೋಟಾರ್ ಅಳವಡಿಕೆ ಮಾಡುತ್ತದೆ.', hi: 'अधिकृत एजेंसी द्वारा सोलर पैनल, मोटर और कंट्रोलर की स्थापना।' } }
    ],
    timeline: '45 - 60 Days for site inspection & complete installation',
    img: '/schemes/pm-kusum.jpg',
    badge: { en: '60% Subsidy', kn: '೬೦% ಸಬ್ಸಿಡಿ', hi: '60% सब्सिडी' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of New & Renewable Energy & KREDL', kn: 'ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನ ಸಚಿವಾಲಯ & KREDL', hi: 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय' },
    applyLink: 'https://kredlinfo.in/',
    trackerUrl: 'https://pmkusum.mnre.gov.in/'
  },
  {
    id: 'rkvy-mechanization',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers', 'Youth/Agri-Startups', 'FPOs'],
    objective: 'Mechanization',
    stage: 'Harvesting',
    districtSpecific: ['All'],
    title: { en: 'Farm Mechanization & CHC (RKVY)', kn: 'ಕೃಷಿ ಯಾಂತ್ರೀಕರಣ ಮತ್ತು ಬಾಡಿಗೆ ಆಧಾರಿತ ಸೇವಾ ಕೇಂದ್ರ', hi: 'कृषि यंत्रीकरण एवं कस्टम हायरिंग' },
    desc: { 
      en: 'Up to 50% subsidy on purchase of Tractors, Power Tillers, Rotavators, Multi-crop Harvesters, and establishment of Custom Hiring Centers (CHC) for FPOs.', 
      kn: 'ಟ್ರ್ಯಾಕ್ಟರ್, ಪವರ್ ಟಿಲ್ಲರ್, ರೋಟವೇಟರ್ ಮತ್ತು ಕಟಾವು ಯಂತ್ರಗಳ ಖರೀದಿಗೆ ಶೇ 50% ರಿಯಾಯಿತಿ ಹಾಗೂ ಎಫ್‌ಪಿಒಗಳಿಗೆ ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಬಾಡಿಗೆ ಕೇಂದ್ರ ಸ್ಥಾಪಿಸಲು ನೆರವು.', 
      hi: 'ट्रैक्टर, पावर टिलर, रीपर, हार्वेस्टर की खरीद पर 50% तक सब्सिडी और FPO के लिए कस्टम हायरिंग सेंटर।' 
    },
    eligibility: {
      en: 'Small/Marginal farmers, registered FPOs, and rural youth entrepreneurs with valid agricultural land.',
      kn: 'ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು, ನೋಂದಾಯಿತ ಎಫ್‌ಪಿಒಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ಯುವ ಉದ್ಯಮಿಗಳು.',
      hi: 'छोटे किसान, पंजीकृत FPO एवं ग्रामीण युवा।'
    },
    exclusions: {
      en: 'Beneficiaries who purchased the same farm implement under government subsidy within last 3 years.',
      kn: 'ಕಳೆದ 3 ವರ್ಷಗಳಲ್ಲಿ ಅದೇ ಕೃಷಿ ಯಂತ್ರೋಪಕರಣಕ್ಕೆ ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಪಡೆದವರು.',
      hi: 'पिछले 3 वर्षों में समान कृषि उपकरण पर सब्सिडी ले चुके व्यक्ति।'
    },
    benefits: {
      subsidyPercent: '50% for SC/ST/Women/Small farmers; 40% for General',
      maxLimit: 'Up to ₹1,00,000 for Tillers, up to ₹3,00,000 for Mini-Tractors, up to ₹10,00,000 for CHC',
      mode: 'Direct payment to authorized OEM equipment dealer / DBT rebate',
      interestSubvention: 'Bank tie-up via NABARD mechanization loans'
    },
    documents: {
      en: 'Aadhaar, Land Pahani (RTC), FRUITS ID, Bank Passbook, Equipment Quotation from authorized dealer.',
      kn: 'ಆಧಾರ್, ಪಹಣಿ (RTC), ಫ್ರೂಟ್ಸ್ ಐಡಿ, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್, ಅಧಿಕೃತ ಡೀಲರ್ ಕೊಟೇಶನ್.',
      hi: 'आधार, भूमि खतौनी, FRUITS आईडी, अधिकृत डीलर कोटेशन।'
    },
    processSteps: [
      { step: 1, title: { en: 'RSK Token Generation', kn: 'ಟೋಕನ್ ಪಡೆಯಿರಿ', hi: 'टोकन प्राप्त करें' }, desc: { en: 'Register target equipment on Karnataka K-Kisan / FRUITS portal.', kn: 'ಕೆ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಯಂತ್ರೋಪಕರಣ ಆಯ್ಕೆ ಮಾಡಿ ಟೋಕನ್ ಪಡೆಯಿರಿ.', hi: 'के-किसान पोर्टल पर उपकरण चुनकर ऑनलाइन टोकन प्राप्त करें।' } },
      { step: 2, title: { en: 'Permit & Delivery', kn: 'ಪರ್ಮಿಟ್ & ವಿತರಣೆ', hi: 'परमिट एवं डिलीवरी' }, desc: { en: 'Purchase implement from approved dealer using official permit.', kn: 'ಅನುಮೋದಿತ ಡೀಲರ್ ಮೂಲಕ ಅಧಿಕೃತ ಪರ್ಮಿಟ್‌ನೊಂದಿಗೆ ಯಂತ್ರ ಖರೀದಿ.', hi: 'स्वीकृत डीलर से उपकरण की डिलीवरी प्राप्त करें।' } },
      { step: 3, title: { en: 'GPS Physical Verification', kn: 'ಭೌತಿಕ ಪರಿಶೀಲನೆ', hi: 'भौतिक सत्यापन' }, desc: { en: 'Chassis number verification by Assistant Director of Agriculture (ADA).', kn: 'ಕೃಷಿ ಅಧಿಕಾರಿಗಳಿಂದ ಯಂತ್ರದ ಚಾಸಿಸ್ ಸಂಖ್ಯೆ ಹಾಗೂ ಲೈವ್ ಫೋಟೋ ಪರಿಶೀಲನೆ.', hi: 'सहायक कृषि निदेशक द्वारा चेसिस नंबर और जीपीएस फोटो सत्यापन।' } }
    ],
    timeline: '30 Days from token allocation',
    img: '/schemes/rkvy-mechanization.jpg',
    badge: { en: '50% Subsidy', kn: '೫೦% ಸಹಾಯಧನ', hi: '50% सब्सिडी' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Dept. of Agriculture, Karnataka & MoA GoI', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'कृषि विभाग, कर्नाटक' },
    applyLink: 'https://raitamitra.karnataka.gov.in/',
    trackerUrl: 'https://fruits.karnataka.gov.in/'
  },
  {
    id: 'fpo-formation',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['FPOs', 'Youth/Agri-Startups', 'Small/Marginal Farmers'],
    objective: 'Post-Harvest',
    stage: 'Marketing',
    districtSpecific: ['All'],
    title: { en: 'Formation & Promotion of 10,000 FPOs (NABARD / SFAC)', kn: 'ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳ (FPO) ರಚನೆ ಮತ್ತು ಪ್ರೋತ್ಸಾಹ ಯೋಜನೆ', hi: '10,000 किसान उत्पादक संगठनों (FPO) का गठन' },
    desc: { 
      en: 'Central sector scheme providing matching equity grants up to ₹15 Lakhs per FPO and ₹18 Lakh management support over 3 years to create collective bargaining and direct market access.', 
      kn: 'ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳಿಗೆ (FPO) ಗರಿಷ್ಠ ₹15 ಲಕ್ಷದವರೆಗೆ ಇಕ್ವಿಟಿ ಅನುದಾನ ಮತ್ತು 3 ವರ್ಷಗಳ ನಿರ್ವಹಣಾ ವೆಚ್ಚಕ್ಕಾಗಿ ₹18 ಲಕ್ಷ ಸಹಾಯಧನ ನೀಡುವ ಯೋಜನೆ.', 
      hi: 'प्रत्येक FPO को ₹15 लाख तक का इक्विटी अनुदान और 3 वर्षों के लिए ₹18 लाख तक वित्तीय प्रबंधन सहायता।' 
    },
    eligibility: {
      en: 'FPOs registered under Companies Act or Co-operative Societies Act with minimum 300 farmer members in plains (100 in hilly areas).',
      kn: 'ಕನಿಷ್ಠ 300 ರೈತ ಸದಸ್ಯರನ್ನು ಹೊಂದಿರುವ ನೋಂದಾಯಿತ ರೈತ ಉತ್ಪಾದಕ ಕಂಪನಿಗಳು (FPO) ಅಥವಾ ಸಹಕಾರ ಸಂಘಗಳು.',
      hi: 'मैदानी क्षेत्रों में न्यूनतम 300 (पहाड़ी में 100) किसान सदस्यों वाली पंजीकृत FPO कंपनियां।'
    },
    exclusions: {
      en: 'Private for-profit proprietary firms without broad-based farmer membership.',
      kn: 'ಖಾಸಗಿ ಲಾಭದಾಯಕ ಏಕವ್ಯಕ್ತಿ ಸಂಸ್ಥೆಗಳು.',
      hi: 'व्यक्तिगत निजी फर्में या गैर-किसान समूह।'
    },
    benefits: {
      subsidyPercent: '1:1 Matching Equity Grant up to ₹2,000 per farmer member (Max ₹15 Lakhs)',
      maxLimit: '₹15 Lakhs Equity Grant + ₹18 Lakhs Operational Grant + Credit Guarantee cover up to ₹2 Crore',
      mode: 'Direct bank grant disbursement via NABARD / SFAC / NCDC',
      interestSubvention: 'Credit Guarantee Scheme without collateral'
    },
    documents: {
      en: 'FPO Registration Certificate, PAN Card, MoA & AoA, Member Shareholder list with Aadhaar & Land records, Bank Account details.',
      kn: 'ಎಫ್‌ಪಿಒ ನೋಂದಣಿ ಪತ್ರ, ಪ್ಯಾನ್ ಕಾರ್ಡ್, ಬೈಲಾ, ಸದಸ್ಯರ ಪಟ್ಟಿ ಮತ್ತು ಪಹಣಿ ದಾಖಲೆಗಳು.',
      hi: 'FPO पंजीकरण प्रमाण, पैन कार्ड, शेयरधारक सूची, बैंक विवरण।'
    },
    processSteps: [
      { step: 1, title: { en: 'FPO Formation & Mobilization', kn: 'ರೈತರ ಸಂಘಟನೆ', hi: 'FPO गठन' }, desc: { en: 'Cluster-based Business Organization (CBBO) helps farmers form company.', kn: 'ಸಿಬಿಬಿಒ ಸಂಸ್ಥೆಯ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ 300 ರೈತರನ್ನು ಒಗ್ಗೂಡಿಸಿ ಕಂಪನಿ ನೋಂದಾಯಿಸಿ.', hi: 'CBBO की मदद से 300 किसानों को जोड़कर कंपनी रजिस्टर करें।' } },
      { step: 2, title: { en: 'Apply for Equity Grant', kn: 'ಇಕ್ವಿಟಿ ಅನುದಾನಕ್ಕೆ ಅರ್ಜಿ', hi: 'अनुदान आवेदन' }, desc: { en: 'Apply online via SFAC/NABARD e-portal with shareholder details.', kn: 'ನಬಾರ್ಡ್ / ಎಸ್‌ಎಫ್‌ಎಸಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಇಕ್ವಿಟಿ ಅನುದಾನಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'नाबार्ड/SFAC पोर्टल पर ऑनलाइन इक्विटी ग्रांट का आवेदन करें।' } },
      { step: 3, title: { en: 'Grant Credit & Operations', kn: 'ಅನುದಾನ ಬಿಡುಗಡೆ', hi: 'राशि आवंटन' }, desc: { en: 'Funds released directly to FPO bank account for machinery and procurement.', kn: 'ರೈತರ ಉತ್ಪನ್ನ ಖರೀದಿ ಹಾಗೂ ಗ್ರೇಡಿಂಗ್ ಘಟಕಕ್ಕೆ ನೇರ ನಿಧಿ ಬಿಡುಗಡೆ.', hi: 'खरीद और प्रसंस्करण इकाई के लिए FPO खाते में फंड ट्रांसफर।' } }
    ],
    timeline: '45 - 90 Days for committee approval',
    img: '/schemes/fpo-formation.jpg',
    badge: { en: '₹15 Lakh Grant', kn: '₹೧೫ ಲಕ್ಷ ಅನುದಾನ', hi: '₹15 लाख अनुदान' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Ministry of Agriculture & NABARD', kn: 'ಕೃಷಿ ಸಚಿವಾಲಯ ಮತ್ತು ನಬಾರ್ಡ್', hi: 'कृषि मंत्रालय एवं नाबार्ड' },
    applyLink: 'https://www.nabard.org/content1.aspx?id=594&catid=23&mid=530',
    trackerUrl: 'https://enam.gov.in/'
  },
  {
    id: 'pm-aif',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Youth/Agri-Startups', 'FPOs', 'Large Landholders', 'Small/Marginal Farmers'],
    objective: 'Post-Harvest',
    stage: 'Post-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Agriculture Infrastructure Fund (AIF)', kn: 'ಕೃಷಿ ಮೂಲಸೌಕರ್ಯ ನಿಧಿ (AIF)', hi: 'कृषि अवसंरचना कोष (AIF)' },
    desc: { 
      en: 'Pan-India financing facility providing 3% interest subvention and credit guarantee for building post-harvest infrastructure: Cold storages, Warehouses, Sorting & Grading units, and Primary Processing.', 
      kn: 'ಕೊಯ್ಲೋತ್ತರ ಮೂಲಸೌಕರ್ಯಗಳಾದ ಶೀತಲಗೃಹ, ಗೋದಾಮು, ಗ್ರೇಡಿಂಗ್ ಮತ್ತು ಪ್ರಾಥಮಿಕ ಸಂಸ್ಕರಣಾ ಘಟಕ ನಿರ್ಮಿಸಲು ಶೇ 3% ಬಡ್ಡಿ ರಿಯಾಯಿತಿಯೊಂದಿಗೆ ಸುಲಭ ಸಾಲ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'कोल्ड स्टोरेज, गोदाम, ग्रेडिंग और प्राथमिक प्रसंस्करण इकाइयों के निर्माण के लिए 3% ब्याज छूट और क्रेडिट गारंटी।' 
    },
    eligibility: {
      en: 'Agri-entrepreneurs, Startups, FPOs, PACS, SHGs, and Individual Farmers creating post-harvest assets.',
      kn: 'ಕೃಷಿ ಉದ್ಯಮಿಗಳು, ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳು, ಎಫ್‌ಪಿಒಗಳು, ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಪತ್ತಿನ ಸಹಕಾರ ಸಂಘಗಳು ಮತ್ತು ರೈತರು.',
      hi: 'कृषि उद्यमी, स्टार्टअप, FPO, पैक्स, स्वयं सहायता समूह एवं किसान।'
    },
    exclusions: {
      en: 'Trading activities without physical post-harvest processing or value addition.',
      kn: 'ಕೇವಲ ಮಧ್ಯವರ್ತಿ ವ್ಯಾಪಾರ ಚಟುವಟಿಕೆಗಳು (ಸಂಸ್ಕರಣೆ ಅಥವಾ ಶೇಖರಣೆ ಇಲ್ಲದ ಯೋಜನೆಗಳು).',
      hi: 'बिना प्रसंस्करण या भंडारण की विशुद्ध व्यापारिक इकाइयां।'
    },
    benefits: {
      subsidyPercent: '3% per annum Interest Subvention for loans up to ₹2 Crore for max 7 years',
      maxLimit: 'Loan up to ₹2 Crore with CGTMSE Credit Guarantee fee paid by GoI',
      mode: 'Bank Loan with automatic interest rebate routed via AIF Portal',
      interestSubvention: '3% p.a. subvention for 7 years'
    },
    documents: {
      en: 'Detailed Project Report (DPR), Land records / Lease agreement, KYC (Aadhaar/PAN), Bank statements, Net worth certificate.',
      kn: 'ವಿವರವಾದ ಯೋಜನಾ ವರದಿ (DPR), ಭೂ ದಾಖಲೆ ಅಥವಾ ಗುತ್ತಿಗೆ ಪತ್ರ, ಪ್ಯಾನ್, ಆಧಾರ್, ಬ್ಯಾಂಕ್ ವಿವರ.',
      hi: 'विस्तृत परियोजना रिपोर्ट (DPR), भूमि या लीज दस्तावेज, केवाईसी, बैंक स्टेटमेंट।'
    },
    processSteps: [
      { step: 1, title: { en: 'Portal Registration', kn: 'ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಣಿ', hi: 'पोर्टल पंजीकरण' }, desc: { en: 'Submit DPR on national AIF portal and select preferred lending bank.', kn: 'ಎಐಎಫ್ ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಡಿಪಿಆರ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ.', hi: 'AIF पोर्टल पर डीपीआर अपलोड कर बैंक चुनें।' } },
      { step: 2, title: { en: 'Ministry & Bank Appraisal', kn: 'ಸಚಿವಾಲಯ ಹಾಗೂ ಬ್ಯಾಂಕ್ ಪರಿಶೀಲನೆ', hi: 'तकनीकी मूल्यांकन' }, desc: { en: 'MoA reviews project within 7 days, forwarded to bank for loan sanction.', kn: 'ಸಚಿವಾಲಯ 7 ದಿನದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ ಸಾಲ ಮಂಜೂರಾತಿಗೆ ಬ್ಯಾಂಕಿಗೆ ಕಳುಹಿಸುತ್ತದೆ.', hi: 'मंत्रालय 7 दिनों में समीक्षा कर बैंक को अग्रेषित करता है।' } },
      { step: 3, title: { en: 'Disbursement & Interest Rebate', kn: 'ಸಾಲ ವಿತರಣೆ & ಬಡ್ಡಿ ರಿಯಾಯಿತಿ', hi: 'ऋण व ब्याज छूट' }, desc: { en: 'Bank disburses loan and interest subvention gets credited automatically.', kn: 'ಬ್ಯಾಂಕ್ ಸಾಲ ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ ಮತ್ತು 3% ಬಡ್ಡಿ ರಿಯಾಯಿತಿ ನೇರವಾಗಿ ಅನ್ವಯವಾಗುತ್ತದೆ.', hi: 'बैंक ऋण जारी करता है और 3% ब्याज छूट सीधे लागू होती है।' } }
    ],
    timeline: '30 - 45 Days for complete bank sanction',
    img: '/schemes/pm-aif.jpg',
    badge: { en: '3% Interest Rebate', kn: '೩% ಬಡ್ಡಿ ರಿಯಾಯಿತಿ', hi: '3% ब्याज छूट' },
    badgeClass: 'badge-success',
    ministry: { en: 'Ministry of Agriculture & Farmers Welfare, GoI', kn: 'ಕೃಷಿ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ', hi: 'कृषि एवं किसान कल्याण मंत्रालय' },
    applyLink: 'https://agriinfra.dac.gov.in/',
    trackerUrl: 'https://agriinfra.dac.gov.in/Home/BeneficiaryDashboard'
  },
  {
    id: 'soil-health-card',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Large Landholders', 'Women Farmers'],
    objective: 'Soil Health',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Soil Health Card Scheme (RKVY Soil)', kn: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ (ಸಾಯಿಲ್ ಹೆಲ್ತ್ ಕಾರ್ಡ್)', hi: 'मृदा स्वास्थ्य कार्ड योजना' },
    desc: { 
      en: 'Provides customized 12-parameter soil test reports (Macro & Micro nutrients, pH, EC, Organic Carbon) with scientific fertilizer recommendations to lower cultivation costs.', 
      kn: 'ರೈತರ ಜಮೀನಿನ ಮಣ್ಣಿನ 12 ಪೋಷಕಾಂಶಗಳ ಪರೀಕ್ಷಾ ವರದಿ ಹಾಗೂ ಸೂಕ್ತ ರಸಗೊಬ್ಬರ ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರ ಬಳಕೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಉಚಿತ ಯೋಜನೆ.', 
      hi: 'खेत की मिट्टी के 12 प्रमुख पोषक तत्वों की जांच रिपोर्ट और उपयुक्त उर्वरक उपयोग की वैज्ञानिक सलाह।' 
    },
    eligibility: {
      en: 'All farmers possessing cultivable agricultural land across Karnataka.',
      kn: 'ಕರ್ನಾಟಕದ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತರು.',
      hi: 'कृषि योग्य भूमि रखने वाले सभी किसान।'
    },
    exclusions: {
      en: 'None. Available to all agricultural landholders.',
      kn: 'ಯಾವುದೇ ನಿರ್ಬಂಧವಿಲ್ಲ, ಎಲ್ಲಾ ರೈತರಿಗೂ ಮುಕ್ತ.',
      hi: 'कोई अपवर्जन नहीं, सभी किसानों हेतु।'
    },
    benefits: {
      subsidyPercent: '100% Free soil testing and advisory report distribution',
      maxLimit: 'Free soil testing per survey grid every 2 years',
      mode: 'Printed laminated Soil Health Card + Digital SMS/WhatsApp report',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Land RTC / Survey Number, Farmer Name, Aadhaar number, FRUITS ID.',
      kn: 'ಪಹಣಿ (RTC), ಸರ್ವೆ ನಂಬರ್, ರೈತರ ಹೆಸರು, ಆಧಾರ್, ಫ್ರೂಟ್ಸ್ ಐಡಿ.',
      hi: 'भूमि खसरा संख्या, किसान का नाम, आधार, FRUITS आईडी।'
    },
    processSteps: [
      { step: 1, title: { en: 'Soil Sample Collection', kn: 'ಮಣ್ಣಿನ ಮಾದರಿ ಸಂಗ್ರಹ', hi: 'नमूना एकत्रीकरण' }, desc: { en: 'Soil sample collected by RSK staff or farmer following V-shape digging protocol.', kn: 'ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದ ಸಿಬ್ಬಂದಿ ಜಮೀನಿನಿಂದ ವೈಜ್ಞಾನಿಕವಾಗಿ ಮಣ್ಣಿನ ಮಾದರಿ ಸಂಗ್ರಹಿಸುತ್ತಾರೆ.', hi: 'RSK कर्मचारियों द्वारा वी-आकार में मिट्टी का नमूना लेना।' } },
      { step: 2, title: { en: 'Laboratory Testing', kn: 'ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷೆ', hi: 'प्रयोगशाला परीक्षण' }, desc: { en: 'Analyzed at District Soil Testing Laboratory (STLs) for 12 nutrient parameters.', kn: 'ಜಿಲ್ಲಾ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ 12 ಪೋಷಕಾಂಶಗಳ ಪರೀಕ್ಷೆ ನಡೆಸಲಾಗುತ್ತದೆ.', hi: 'जिला मृदा परीक्षण प्रयोगशाला में 12 पोषक तत्वों की जांच।' } },
      { step: 3, title: { en: 'Card Generation & Delivery', kn: 'ಕಾರ್ಡ್ ವಿತರಣೆ', hi: 'कार्ड वितरण' }, desc: { en: 'Laminated card and crop fertilizer advisory handed over at Gram Panchayat / RSK.', kn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಅಥವಾ ಆರ್‌ಎಸ್‌ಕೆ ಮೂಲಕ ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು ಕಾರ್ಡ್ ವಿತರಣೆ.', hi: 'ग्राम पंचायत या RSK द्वारा लैमिनेटेड कार्ड व उर्वरक सलाह पत्र वितरण।' } }
    ],
    timeline: '14 - 21 Days from sample submission',
    img: '/schemes/soil-health-card.jpg',
    badge: { en: '100% Free', kn: 'ಉಚಿತ ಪರೀಕ್ಷೆ', hi: '100% मुफ्त' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept. of Agriculture, Karnataka & GoI', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'कृषि विभाग, भारत सरकार' },
    applyLink: 'https://soilhealth.dac.gov.in/',
    trackerUrl: 'https://soilhealth.dac.gov.in/soilfertilitymap'
  },
  {
    id: 'coffee-dev',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Large Landholders', 'Women Farmers'],
    objective: 'Export Promotion',
    stage: 'Harvesting',
    districtSpecific: ['Chikkamagaluru', 'Kodagu', 'Hassan'],
    title: { en: 'Coffee Development Program', kn: 'ಕಾಫಿ ಅಭಿವೃದ್ಧಿ ಯೋಜನೆ', hi: 'कॉफी विकास कार्यक्रम' },
    desc: { 
      en: 'Subsidies and technical assistance for replanting, water augmentation, eco-pulpers, and quality upgradation of Coffee estates in Western Ghats districts.', 
      kn: 'ಕಾಫಿ ತೋಟಗಳ ಮರು-ನೆಡುವಿಕೆ, ನೀರಾವರಿ, ಇಕೋ-ಪಲ್ಪರ್ ಯಂತ್ರ ಮತ್ತು ಗುಣಮಟ್ಟ ಸುಧಾರಣೆಗೆ ಕಾಫಿ ಮಂಡಳಿಯಿಂದ ಸಹಾಯಧನ.', 
      hi: 'कॉफी बागानों के पुनर्रोपण, जल संचयन, पर्यावरण अनुकूल पल्पर और गुणवत्ता सुधार के लिए सब्सिडी।' 
    },
    eligibility: {
      en: 'Registered coffee growers in traditional Malnad areas (Kodagu, Chikkamagaluru, Hassan) holding valid Coffee Board permits.',
      kn: 'ಮಲೆನಾಡು ಭಾಗದ (ಕೊಡಗು, ಚಿಕ್ಕಮಗಳೂರು, ಹಾಸನ) ನೋಂದಾಯಿತ ಕಾಫಿ ಬೆಳೆಗಾರರು.',
      hi: 'पारंपरिक क्षेत्रों (कोडागु, चिकमगलूर, हासन) के पंजीकृत कॉफी उत्पादक।'
    },
    exclusions: {
      en: 'Unauthorized encroachments on forest lands without valid revenue land titles.',
      kn: 'ಸಿಂಧು ಕಂದಾಯ ಭೂಮಿ ದಾಖಲೆ ಇಲ್ಲದ ಒತ್ತುವರಿ ಪ್ರದೇಶಗಳು.',
      hi: 'अनाधिकृत वन भूमि पर स्थित बागान।'
    },
    benefits: {
      subsidyPercent: 'Up to 40% subsidy for small growers (< 10 hectares)',
      maxLimit: 'Up to ₹2,50,000 for Water Augmentation & Processing Units',
      mode: 'Direct reimbursement to planter bank account',
      interestSubvention: 'Coffee Board replanting loan interest subvention'
    },
    documents: {
      en: 'Coffee Board Registration Certificate (CRC), Land RTC, Bank Account details, Machinery invoice.',
      kn: 'ಕಾಫಿ ಬೋರ್ಡ್ ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರ, ಪಹಣಿ (RTC), ಬ್ಯಾಂಕ್ ವಿವರ, ಯಂತ್ರ ಖರೀದಿಯ ಬಿಲ್.',
      hi: 'कॉफी बोर्ड पंजीकरण (CRC), भूमि RTC, बैंक विवरण, उपकरण बिल।'
    },
    processSteps: [
      { step: 1, title: { en: 'Online CRC Application', kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ', hi: 'आवेदन' }, desc: { en: 'Apply on Coffee Board portal with estate survey number.', kn: 'ಕಾಫಿ ಮಂಡಳಿಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'कॉफी बोर्ड पोर्टल पर आवेदन करें।' } },
      { step: 2, title: { en: 'Field Verification', kn: 'ತೋಟ ಪರಿಶೀಲನೆ', hi: 'स्थल सत्यापन' }, desc: { en: 'Liaison officer inspects estate and approves subsidy quote.', kn: 'ಕಾಫಿ ಮಂಡಳಿ ಅಧಿಕಾರಿಗಳು ತೋಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.', hi: 'फील्ड अधिकारी द्वारा बागान का भौतिक सत्यापन।' } },
      { step: 3, title: { en: 'Fund Disbursement', kn: 'ಸಹಾಯಧನ ಜಮೆ', hi: 'अनुदान भुगतान' }, desc: { en: 'Subsidy credited directly post installation.', kn: 'ಯಂತ್ರ ಅಳವಡಿಕೆ ಪೂರ್ಣಗೊಂಡ ನಂತರ ಖಾತೆಗೆ ಸಬ್ಸಿಡಿ ಜಮೆ.', hi: 'कार्य पूरा होने के बाद सीधे खाते में सब्सिडी।' } }
    ],
    timeline: '30 Days post field inspection',
    img: '/schemes/coffee-dev.png',
    badge: { en: 'Malnad Region', kn: 'ಮಲೆನಾಡು', hi: 'मलनाड क्षेत्र' },
    badgeClass: 'badge-success',
    ministry: { en: 'Coffee Board of India, Ministry of Commerce', kn: 'ಕಾಫಿ ಮಂಡಳಿ, ವಾಣಿಜ್ಯ ಸಚಿವಾಲಯ', hi: 'कॉफी बोर्ड, वाणिज्य मंत्रालय' },
    applyLink: 'https://www.indiacoffee.org/',
    trackerUrl: 'https://www.indiacoffee.org/'
  },

  // ==========================================
  // WOMEN & SOCIAL WELFARE
  // ==========================================
  {
    id: 'gruha-lakshmi',
    category: 'Women',
    level: 'State',
    beneficiary: ['Women Farmers', 'Women'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Gruha Lakshmi Scheme', kn: 'ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ', hi: 'गृह लक्ष्मी योजना' },
    desc: { 
      en: 'Flagship Karnataka DBT scheme providing ₹2,000 monthly financial assistance to the woman head of household in BPL, APL, and Antyodaya ration cards.', 
      kn: 'ರಾಜ್ಯದ ಬಿಪಿಎಲ್, ಎಪಿಎಲ್ ಹಾಗೂ ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿಗಳಲ್ಲಿ ಕುಟುಂಬದ ಯಜಮಾನಿ ಎಂದು ಗುರುತಿಸಲ್ಪಟ್ಟ ಮಹಿಳೆಗೆ ಮಾಸಿಕ ₹2,000 ನೇರ ಆರ್ಥಿಕ ನೆರವು ನೀಡುವ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ.', 
      hi: 'बीपीएल, एपीएल और अंत्योदय राशन कार्डों में परिवार की महिला मुखिया को ₹2,000 मासिक प्रत्यक्ष बैंक ट्रांसफर।' 
    },
    eligibility: {
      en: 'Woman head of household registered on Karnataka Food & Civil Supplies Ration Card (BPL/APL/AAY).',
      kn: 'ಕರ್ನಾಟಕ ಆಹಾರ ಇಲಾಖೆಯ ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥೆ (ಯಜಮಾನಿ) ಎಂದು ನಮೂದಾಗಿರುವ ಮಹಿಳೆ.',
      hi: 'कर्नाटक के राशन कार्ड में दर्ज परिवार की महिला मुखिया।'
    },
    exclusions: {
      en: 'Woman head or her husband paying Income Tax (IT) or filing GST returns, or serving as regular Government employees.',
      kn: 'ಮಹಿಳೆ ಅಥವಾ ಆಕೆಯ ಪತಿ ಆದಾಯ ತೆರಿಗೆ (IT) ಪಾವತಿದಾರರಾಗಿದ್ದರೆ ಅಥವಾ ಸರ್ಕಾರಿ ನೌಕರರಾಗಿದ್ದರೆ ಸೌಲಭ್ಯ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.',
      hi: 'महिला या उसका पति आयकर दाता, जीएसटी दाता या सरकारी कर्मचारी होने पर अपात्र।'
    },
    benefits: {
      subsidyPercent: '100% Monthly Cash Grant of ₹2,000',
      maxLimit: '₹24,000 per year per household',
      mode: 'Aadhaar-based Direct Benefit Transfer (DBT) directly into bank account',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar Card of Woman Head, Aadhaar Card of Spouse, Karnataka Ration Card number, Aadhaar-linked Bank Passbook.',
      kn: 'ಯಜಮಾನಿಯ ಆಧಾರ್ ಕಾರ್ಡ್, ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್, ಪಡಿತರ ಚೀಟಿ ಸಂಖ್ಯೆ, ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'महिला व पति का आधार कार्ड, राशन कार्ड संख्या, बैंक पासबुक।'
    },
    processSteps: [
      { step: 1, title: { en: 'Seva Sindhu Registration', kn: 'ಸೇವಾ ಸಿಂಧು ನೋಂದಣಿ', hi: 'सेवा सिंधु पंजीकरण' }, desc: { en: 'Apply at Gram One, Karnataka One, Bapuji Seva Kendra, or online portal.', kn: 'ಗ್ರಾಮ ಒನ್, ಕರ್ನಾಟಕ ಒನ್, ಬಾಪೂಜಿ ಸೇವಾ ಕೇಂದ್ರ ಅಥವಾ ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ.', hi: 'ग्राम वन, कर्नाटक वन या सेवा सिंधु पोर्टल पर पंजीकरण करें।' } },
      { step: 2, title: { en: 'E-KYC & Tax Verification', kn: 'ತೆರಿಗೆ ಪರಿಶೀಲನೆ', hi: 'ई-केवाईसी व कर जांच' }, desc: { en: 'Automated verification against Income Tax and GST database.', kn: 'ಆದಾಯ ತೆರಿಗೆ ಹಾಗೂ ಜಿಎಸ್‌ಟಿ ಡೇಟಾಬೇಸ್ ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತ ಪರಿಶೀಲನೆ.', hi: 'आयकर और जीएसटी डेटाबेस से स्वचालित सत्यापन।' } },
      { step: 3, title: { en: 'Monthly DBT Credit', kn: 'ಮಾಸಿಕ ಹಣ ಜಮೆ', hi: 'मासिक डीबीटी' }, desc: { en: '₹2,000 credited automatically every month to NPCI-mapped account.', kn: 'ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರವಾಗಿ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.', hi: 'हर माह सीधे बैंक खाते में ₹2,000 का ट्रांसफर।' } }
    ],
    timeline: 'Immediate token generation; Approval in 15 days',
    img: '/schemes/gruha-lakshmi.jpg',
    badge: { en: '₹2,000/Month', kn: '₹೨,೦೦೦/ತಿಂಗಳಿಗೆ', hi: '₹2,000/माह' },
    badgeClass: 'badge-success',
    ministry: { en: 'Dept. of Women & Child Development, Karnataka', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
    applyLink: 'https://sevasindhuservices.karnataka.gov.in/',
    trackerUrl: 'https://sevasindhuservices.karnataka.gov.in/'
  },
  {
    id: 'stree-shakti',
    category: 'Women',
    level: 'State',
    beneficiary: ['Women Farmers', 'Women', 'Small/Marginal Farmers'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Stree Shakti - Women Empowerment & Micro-Credit', kn: 'ಸ್ತ್ರೀ ಶಕ್ತಿ ಸಂಘ ಯೋಜನೆ (ಕಿರುಸಾಲ & ಪ್ರೋತ್ಸಾಹಧನ)', hi: 'स्त्री शक्ति - महिला सशक्तिकरण एवं सूक्ष्म ऋण' },
    desc: { 
      en: 'Empowers rural women by organizing them into Self-Help Groups (SHGs) and providing revolving funds of ₹25,000 and bank-linked zero-interest / low-interest micro-loans.', 
      kn: 'ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರನ್ನು ಸ್ವಸಹಾಯ ಸಂಘಗಳಾಗಿ (SHG) ಸಂಘಟಿಸಿ ₹25,000 ಸುತ್ತು ನಿಧಿ ಹಾಗೂ ಶೂನ್ಯ ಬಡ್ಡಿದರದ ಆರ್ಥಿಕ ನೆರವು ನೀಡಿ ಸಬಲೀಕರಣಗೊಳಿಸುವ ಯೋಜನೆ.', 
      hi: 'ग्रामीण महिलाओं के स्वयं सहायता समूहों (SHG) को ₹25,000 रिवाल्विंग फंड और कम ब्याज वाले सूक्ष्म ऋण प्रदान करना।' 
    },
    eligibility: {
      en: 'Rural women aged 18 to 60 forming a registered SHG with at least 15 members from BPL/economically backward families.',
      kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬಗಳ 18 ರಿಂದ 60 ವರ್ಷ ವಯಸ್ಸಿನ ಕನಿಷ್ಠ 15 ಮಹಿಳೆಯರನ್ನು ಒಳಗೊಂಡ ನೋಂದಾಯಿತ ಸ್ವಸಹಾಯ ಸಂಘಗಳು.',
      hi: 'बीपीएल परिवारों की 18-60 वर्ष आयु की महिलाओं का 15 सदस्यीय पंजीकृत स्वयं सहायता समूह।'
    },
    exclusions: {
      en: 'Defaulter groups or members currently employed in full-time government service.',
      kn: 'ಸರ್ಕಾರಿ ನೌಕರರು ಅಥವಾ ಹಿಂದಿನ ಸಾಲ ಸುಸ್ತಿ ಮಾಡಿದ ಸಂಘಗಳು.',
      hi: 'डिफॉल्टर समूह या नियमित सरकारी कर्मचारी।'
    },
    benefits: {
      subsidyPercent: 'Revolving fund grant of ₹25,000 + Zero-interest bank loans up to ₹3,00,000 for SHG',
      maxLimit: 'Up to ₹3,00,000 at 0% to 4% interest per group',
      mode: 'Bank loan linked to Stree Shakti / Sanjeevini NRLM',
      interestSubvention: 'Zero interest for prompt repayments'
    },
    documents: {
      en: 'SHG Registration Certificate, Bank Account Details, Member Aadhaar & Ration Cards, Resolution Book.',
      kn: 'ಸಂಘದ ನೋಂದಣಿ ಪತ್ರ, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್, ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್, ನಿರ್ಣಯ ಪುಸ್ತಕ.',
      hi: 'समूह पंजीकरण पत्र, बैंक पासबुक, सदस्यों के आधार व राशन कार्ड।'
    },
    processSteps: [
      { step: 1, title: { en: 'SHG Formation & Grading', kn: 'ಸಂಘ ರಚನೆ & ಗ್ರೇಡಿಂಗ್', hi: 'समूह गठन' }, desc: { en: 'Form SHG through Gram Panchayat Anganwadi worker or CDPO office.', kn: 'ಅಂಗನವಾಡಿ ಕಾರ್ಯಕರ್ತೆ ಅಥವಾ ಸಿಡಿಪಿಒ ಕಚೇರಿ ಮೂಲಕ ಸಂಘ ರಚಿಸಿ.', hi: 'आंगनबाड़ी या सीडीपीओ के माध्यम से समूह गठित करें।' } },
      { step: 2, title: { en: 'Revolving Fund Release', kn: 'ಸುತ್ತು ನಿಧಿ ಬಿಡುಗಡೆ', hi: 'निधि आवंटन' }, desc: { en: 'Receive ₹25,000 government revolving seed capital.', kn: 'ಸಂಘದ ಉಳಿತಾಯ ಆಧಾರದ ಮೇಲೆ ₹25,000 ಸರ್ಕಾರಿ ಸುತ್ತು ನಿಧಿ ಪಡೆಯಿರಿ.', hi: '₹25,000 का सरकारी रिवाल्विंग फंड प्राप्त करें।' } },
      { step: 3, title: { en: 'Bank Loan Linkage', kn: 'ಬ್ಯಾಂಕ್ ಸಾಲ ಜೋಡಣೆ', hi: 'बैंक ऋण' }, desc: { en: 'Avail subsidized micro-enterprise loan for sheep, poultry, or tailoring.', kn: 'ಕುರಿ ಸಾಕಾಣಿಕೆ, ಹೈನುಗಾರಿಕೆ ಅಥವಾ ಹೊಲಿಗೆ ಯಂತ್ರಕ್ಕಾಗಿ ಬಡ್ಡಿರಹಿತ ಸಾಲ ಪಡೆಯಿರಿ.', hi: 'लघु उद्यमों हेतु शून्य ब्याज पर बैंक ऋण प्राप्त करें।' } }
    ],
    timeline: '30 Days post SHG grading',
    img: '/schemes/stree-shakti.jpg',
    badge: { en: 'SHG Loan @ 0%', kn: 'ಶೂನ್ಯ ಬಡ್ಡಿ ಸಾಲ', hi: '0% ब्याज ऋण' },
    badgeClass: 'badge-info',
    ministry: { en: 'Women & Child Development Dept., Karnataka', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
    applyLink: 'https://dwcd.karnataka.gov.in/',
    trackerUrl: 'https://dwcd.karnataka.gov.in/'
  },

  // ==========================================
  // KARNATAKA GUARANTEE & EXTRA GOVT SCHEMES
  // ==========================================
  {
    id: 'yuva-nidhi',
    category: 'Finance',
    level: 'State',
    beneficiary: ['Youth/Agri-Startups', 'Students'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Yuva Nidhi Scheme (Unemployment Allowance)', kn: 'ಯುವ ನಿಧಿ ಯೋಜನೆ (ನಿರುದ್ಯೋಗ ಭತ್ಯೆ)', hi: 'युवा निधि योजना (बेरोजगारी भत्ता)' },
    desc: { 
      en: 'Flagship Karnataka 5th Guarantee providing ₹3,000 per month for unemployed Graduates and ₹1,500 per month for unemployed Diploma holders for up to 2 years via Direct Benefit Transfer.', 
      kn: 'ಪದವಿ ಪಡೆದು 6 ತಿಂಗಳಾದರೂ ಉದ್ಯೋಗ ದೊರೆಯದ ಯುವಕ-ಯುವತಿಯರಿಗೆ ಮಾಸಿಕ ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಪದವೀಧರರಿಗೆ ಮಾಸಿಕ ₹1,500 ನಿರುದ್ಯೋಗ ಭತ್ಯೆ ನೀಡುವ ರಾಜ್ಯ ಸರ್ಕಾರದ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ.', 
      hi: 'बेरोजगार स्नातकों को ₹3,000/माह और डिप्लोमा धारकों को ₹1,500/माह की वित्तीय सहायता 2 वर्ष तक सीधे बैंक खाते में।' 
    },
    eligibility: {
      en: 'Karnataka domicile students passing Degree or Diploma who remain unemployed for minimum 6 months from graduation date and not enrolled in higher education.',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಮುಗಿಸಿ ಕನಿಷ್ಠ 6 ತಿಂಗಳು ಕಳೆದರೂ ಉದ್ಯೋಗ ಸಿಗದ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕೆ ದಾಖಲಾಗದ ರಾಜ್ಯದ ನಿವಾಸಿಗಳು.',
      hi: 'कर्नाटक के निवासी जिन्होंने डिग्री या डिप्लोमा पूरा किया हो और कम से कम 6 माह से बेरोजगार हों।'
    },
    exclusions: {
      en: 'Employed in Govt/Private sector, drawing benefits from any apprentice stipend, or paying income tax.',
      kn: 'ಸರ್ಕಾರಿ ಅಥವಾ ಖಾಸಗಿ ನೌಕರರು, ಅಪ್ರೆಂಟಿಸ್ ಸ್ಟೈಪೆಂಡ್ ಪಡೆಯುತ್ತಿರುವವರು ಅಥವಾ ಆದಾಯ ತೆರಿಗೆದಾರರು.',
      hi: 'सरकारी/निजी नौकरी करने वाले या प्रशिक्षु वजीफा पाने वाले युवा।'
    },
    benefits: {
      subsidyPercent: '100% Monthly DBT Allowance',
      maxLimit: '₹3,000 / month (Degree) | ₹1,500 / month (Diploma) for up to 24 months',
      mode: 'Aadhaar-seeded Direct Benefit Transfer (DBT)',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Degree / Diploma Certificate & Marks Cards, Karnataka Domicile Certificate, Aadhaar Card, Bank Passbook, Self-Declaration of unemployment.',
      kn: 'ಪದವಿ/ಡಿಪ್ಲೊಮಾ ಅಂಕಪಟ್ಟಿ, ಕರ್ನಾಟಕ ವಾಸಸ್ಥಳ ದೃಢೀಕರಣ, ಆಧಾರ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್, ನಿರುದ್ಯೋಗ ಸ್ವಯಂ ಘೋಷಣೆ.',
      hi: 'डिग्री/डिप्लोमा प्रमाण पत्र, कर्नाटक अधिवास प्रमाण पत्र, आधार कार्ड, बैंक पासबुक, बेरोजगारी स्व-घोषणा पत्र।'
    },
    processSteps: [
      { step: 1, title: { en: 'Seva Sindhu Registration', kn: 'ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಣಿ', hi: 'सेवा सिंधु पर पंजीकरण' }, desc: { en: 'Apply online on Seva Sindhu or via Gram One / Karnataka One center.', kn: 'ಸೇವಾ ಸಿಂಧು ಅಥವಾ ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಆಧಾರ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'सेवा सिंधु या ग्राम वन केंद्र पर ऑनलाइन आवेदन करें।' } },
      { step: 2, title: { en: 'University & Nadakacheri Verification', kn: 'ವಿಶ್ವವಿದ್ಯಾಲಯ & ನಾಡಕಚೇರಿ ಪರಿಶೀಲನೆ', hi: 'दस्तावेज सत्यापन' }, desc: { en: 'Automated verification with university graduation database and PF/ESIC records.', kn: 'ವಿಶ್ವವಿದ್ಯಾಲಯದ ಫಲಿತಾಂಶ ಹಾಗೂ ಪಿಎಫ್/ಇಎಸ್‌ಐಸಿ ಡೇಟಾಬೇಸ್ ಮೂಲಕ ಪರಿಶೀಲನೆ.', hi: 'विश्वविद्यालय और ईपीएफओ डेटाबेस से स्वचालित सत्यापन।' } },
      { step: 3, title: { en: 'Monthly DBT Disbursement', kn: 'ಮಾಸಿಕ ನಗದು ಜಮೆ', hi: 'मासिक डीबीटी भुगतान' }, desc: { en: 'Direct allowance credited to Aadhaar-linked bank account every month.', kn: 'ಪ್ರತಿ ತಿಂಗಳೂ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಹಣ ಜಮೆ.', hi: 'हर महीने सीधे बैंक खाते में भत्ते का अंतरण।' } }
    ],
    timeline: '15 Days for verification & approval',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    badge: { en: '₹3,000 / Month', kn: '₹೩,೦೦೦ / ತಿಂಗಳಿಗೆ', hi: '₹3,000 / माह' },
    badgeClass: 'badge-success',
    ministry: { en: 'Dept. of Skill Development & Livelihood, Karnataka', kn: 'ಕೌಶಲ್ಯಾಭಿವೃದ್ಧಿ ಮತ್ತು ಜೀವನೋಪಾಯ ಇಲಾಖೆ', hi: 'कौशल विकास एवं आजीविका विभाग' },
    applyLink: 'https://sevasindhuservices.karnataka.gov.in/',
    trackerUrl: 'https://sevasindhuservices.karnataka.gov.in/'
  },
  {
    id: 'gruha-jyothi',
    category: 'Finance',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women', 'All Landholders'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Gruha Jyothi Scheme (Free Domestic Power)', kn: 'ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆ (ಉಚಿತ ಗೃಹ ವಿದ್ಯುತ್)', hi: 'गृह ज्योति योजना (मुफ्त घरेलू बिजली)' },
    desc: { 
      en: 'Karnataka government guarantee providing up to 200 units of zero-bill domestic electricity every month to all residential households based on average historical consumption plus 10%.', 
      kn: 'ರಾಜ್ಯದ ಎಲ್ಲಾ ಗೃಹಬಳಕೆ ವಿದ್ಯುತ್ ಗ್ರಾಹಕರಿಗೆ ಮಾಸಿಕ 200 ಯೂನಿಟ್‌ವರೆಗೆ ಉಚಿತ ವಿದ್ಯುತ್ ಒದಗಿಸುವ ಜನಪ್ರಿಯ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ.', 
      hi: 'कर्नाटक के सभी घरेलू बिजली उपभोक्ताओं को प्रतिमाह 200 यूनिट तक मुफ्त बिजली (शून्य बिजली बिल)।' 
    },
    eligibility: {
      en: 'All domestic/residential electricity consumers in Karnataka with active ESCOM connection (BESCOM, MESCOM, HESCOM, GESCOM, CESC).',
      kn: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಎಸ್ಕಾಂಗಳ (ಬೆಸ್ಕಾಂ, ಮೆಸ್ಕಾಂ, ಹೆಸ್ಕಾಂ, ಜೆಸ್ಕಾಂ, ಸಿಇಎಸ್‌ಸಿ) ಗೃಹಬಳಕೆ ವಿದ್ಯುತ್ ಮೀಟರ್ ಹೊಂದಿರುವ ಗ್ರಾಹಕರು.',
      hi: 'कर्नाटक के सभी घरेलू बिजली मीटर कनेक्शन धारक।'
    },
    exclusions: {
      en: 'Commercial connections, industrial power, non-domestic agricultural pump meters under separate schemes.',
      kn: 'ವಾಣಿಜ್ಯ ಮತ್ತು ಕೈಗಾರಿಕಾ ಸಂಪರ್ಕಗಳು, ಕೃಷಿ ಪಂಪ್‌ಸೆಟ್‌ಗಳು (ಕೃಷಿ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಈಗಾಗಲೇ ಪ್ರತ್ಯೇಕ ಉಚಿತ ವಿದ್ಯುತ್ ನೀಡಲಾಗಿದೆ).',
      hi: 'व्यावसायिक एवं औद्योगिक बिजली कनेक्शन।'
    },
    benefits: {
      subsidyPercent: '100% Free electricity up to 200 units',
      maxLimit: 'Up to 200 units/month (Average usage + 10% entitlement)',
      mode: 'Zero Bill directly delivered by ESCOM meter reader',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Electricity Account ID (Account ID from Bill), Aadhaar Card, Consumer Name matching Aadhaar.',
      kn: 'ವಿದ್ಯುತ್ ಬಿಲ್‌ನ ಅಕೌಂಟ್ ಐಡಿ (Account ID), ಆಧಾರ್ ಕಾರ್ಡ್, ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ.',
      hi: 'बिजली बिल की खाता संख्या (Account ID), आधार कार्ड।'
    },
    processSteps: [
      { step: 1, title: { en: 'Seva Sindhu Linking', kn: 'ಖಾತೆ ಸಂಖ್ಯೆ ಜೋಡಣೆ', hi: 'खाता लिंक' }, desc: { en: 'Link Account ID with Aadhaar on Seva Sindhu Gruha Jyothi portal.', kn: 'ಸೇವಾ ಸಿಂಧು ಗೃಹ ಜ್ಯೋತಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವಿದ್ಯುತ್ ಅಕೌಂಟ್ ಐಡಿ ಮತ್ತು ಆಧಾರ್ ಜೋಡಿಸಿ.', hi: 'सेवा सिंधु पोर्टल पर बिजली बिल खाता आईडी और आधार लिंक करें।' } },
      { step: 2, title: { en: 'Entitlement Calculation', kn: 'ಅರ್ಹತಾ ಯೂನಿಟ್ ಲೆಕ್ಕಾಚಾರ', hi: 'पात्रता निर्धारण' }, desc: { en: 'System computes average annual consumption + 10% bonus units.', kn: 'ಹಿಂದಿನ 1 ವರ್ಷದ ಸರಾಸರಿ ಬಳಕೆ + 10% ಉಚಿತ ಯೂನಿಟ್‌ಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.', hi: 'पिछले 1 वर्ष की औसत खपत + 10% के आधार पर मासिक कोटा तय।' } },
      { step: 3, title: { en: 'Zero Bill Issue', kn: 'ಶೂನ್ಯ ಬಿಲ್ ವಿತರಣೆ', hi: 'शून्य बिल जारी' }, desc: { en: 'Meter reader delivers Zero Electricity Bill monthly.', kn: 'ಪ್ರತಿ ತಿಂಗಳು ಶೂನ್ಯ ಮೊತ್ತದ ಬಿಲ್ ಗ್ರಾಹಕರಿಗೆ ವಿತರಣೆಯಾಗುತ್ತದೆ.', hi: 'प्रतिमाह शून्य राशि का बिजली बिल प्राप्त होता है।' } }
    ],
    timeline: 'Immediate registration; Bill subsidy from subsequent billing cycle',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    badge: { en: 'Up to 200 Units Free', kn: '೨೦೦ ಯೂನಿಟ್ ಉಚಿತ', hi: '200 यूनिट मुफ्त' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Energy Department, Govt of Karnataka', kn: 'ಇಂಧನ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ', hi: 'ऊर्जा विभाग, कर्नाटक सरकार' },
    applyLink: 'https://sevasindhugs.karnataka.gov.in/gruhajyothi/',
    trackerUrl: 'https://sevasindhugs.karnataka.gov.in/'
  },
  {
    id: 'shakti-scheme',
    category: 'Women',
    level: 'State',
    beneficiary: ['Women Farmers', 'Women', 'Students'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Shakti Scheme (Free Bus Transit for Women)', kn: 'ಶಕ್ತಿ ಯೋಜನೆ (ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ)', hi: 'शक्ति योजना (महिलाओं के लिए मुफ्त बस यात्रा)' },
    desc: { 
      en: 'Karnataka government flagship scheme offering 100% free road transport bus travel to all domicile women, girls, and transgender persons across KSRTC, BMTC, NWKRTC, and KKRTC state-run buses.', 
      kn: 'ರಾಜ್ಯದ ಎಲ್ಲಾ ಮಹಿಳೆಯರು, ವಿದ್ಯಾರ್ಥಿನಿಯರು ಹಾಗೂ ತೃತೀಯ ಲಿಂಗಿಗಳಿಗೆ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ, ಬಿಎಂಟಿಸಿ, ಈಶಾನ್ಯ ಮತ್ತು ವಾಯವ್ಯ ಸಾರಿಗೆ ಬಸ್‌ಗಳಲ್ಲಿ ಸಂಪೂರ್ಣ ಉಚಿತ ಪ್ರಯಾಣ ಸೌಲಭ್ಯ.', 
      hi: 'कर्नाटक की सभी महिलाओं और छात्राओं के लिए राज्य परिवहन बसों (KSRTC/BMTC) में 100% मुफ्त बस यात्रा।' 
    },
    eligibility: {
      en: 'All women, girl students, and transgender residents of Karnataka holding any state-issued photo ID (Aadhaar, Voter ID, Ration Card, Driving License).',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುವ ಎಲ್ಲಾ ಮಹಿಳೆಯರು, ವಿದ್ಯಾರ್ಥಿನಿಯರು (ಆಧಾರ್, ವೋಟರ್ ಐಡಿ, ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವವರು).',
      hi: 'कर्नाटक की सभी स्थायी निवासी महिलाएं और छात्राएं।'
    },
    exclusions: {
      en: 'AC luxury buses (Airavat, Flybus, Rajahamsa, Ambari) and interstate route portions beyond Karnataka borders.',
      kn: 'ಐಷಾರಾಮಿ ಎಸಿ ಬಸ್‌ಗಳು (ಐರಾವತ, ಅಂಬಾರಿ) ಮತ್ತು ಹೊರರಾಜ್ಯದ ಗಡಿ ಮೀರಿದ ಪ್ರಯಾಣಕ್ಕೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.',
      hi: 'एसी/लक्जरी बसें (ऐरावत, अंबाती) और राज्य की सीमाओं के बाहर की यात्रा।'
    },
    benefits: {
      subsidyPercent: '100% Fare Waiver (Zero Ticket Cost)',
      maxLimit: 'Unlimited daily and monthly bus travel across Karnataka',
      mode: 'Zero Fare Physical / Smart Card Ticket issued by bus conductor',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar Card or Karnataka Government issued ID showing Karnataka address.',
      kn: 'ಕರ್ನಾಟಕ ವಿಳಾಸವಿರುವ ಆಧಾರ್ ಕಾರ್ಡ್, ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಅಥವಾ ಶಾಲಾ-ಕಾಲೇಜು ಐಡಿ.',
      hi: 'कर्नाटक का पता दर्शाने वाला आधार कार्ड या मतदाता पहचान पत्र।'
    },
    processSteps: [
      { step: 1, title: { en: 'Board Bus & Show ID', kn: 'ಬಸ್ ಹತ್ತಿ ಗುರುತಿನ ಚೀಟಿ ತೋರಿಸಿ', hi: 'पहचान पत्र दिखाएं' }, desc: { en: 'Show Aadhaar or domicile photo ID to bus conductor upon boarding.', kn: 'ಬಸ್ ಹತ್ತಿದಾಗ ನಿರ್ವಾಹಕರಿಗೆ ಆಧಾರ್ ಕಾರ್ಡ್ ತೋರಿಸಿ.', hi: 'बस में चढ़ते समय परिचालक को आधार कार्ड दिखाएं।' } },
      { step: 2, title: { en: 'Zero-Fare Ticket Issued', kn: 'ಶೂನ್ಯ ಶುಲ್ಕದ ಟಿಕೆಟ್ ಪಡೆಯಿರಿ', hi: 'शून्य टिकट जारी' }, desc: { en: 'Conductor issues computerized Zero-Fare Shakti ticket instantly.', kn: 'ನಿರ್ವಾಹಕರು ತಕ್ಷಣವೇ ಶೂನ್ಯ ಮೊತ್ತದ ಶಕ್ತಿ ಟಿಕೆಟ್ ನೀಡುತ್ತಾರೆ.', hi: 'कंडक्टर तुरंत शून्य टिकट जारी करता है।' } }
    ],
    timeline: 'Instant — Valid every day on all ordinary / express buses',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    badge: { en: '100% Free Travel', kn: 'ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ', hi: 'मुफ्त यात्रा' },
    badgeClass: 'badge-success',
    ministry: { en: 'Transport Department, Govt of Karnataka', kn: 'ಸಾರಿಗೆ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ', hi: 'परिवहन विभाग, कर्नाटक सरकार' },
    applyLink: 'https://transport.karnataka.gov.in/',
    trackerUrl: 'https://transport.karnataka.gov.in/'
  },
  {
    id: 'anna-bhagya',
    category: 'Finance',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women', 'All Landholders'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Anna Bhagya Scheme (Food Security & DBT)', kn: 'ಅನ್ನ ಭಾಗ್ಯ ಯೋಜನೆ (ಉಚಿತ ಅಕ್ಕಿ & ನಗದು ವರ್ಗಾವಣೆ)', hi: 'अन्न भाग्य योजना (मुफ्त खाद्यान्न व डीबीटी)' },
    desc: { 
      en: 'Guarantees 10 kg of food grains per person per month for BPL and Antyodaya households (5 kg free rice + ₹170 cash DBT per head for remaining 5 kg directly into bank accounts).', 
      kn: 'ರಾಜ್ಯದ ಬಿಪಿಎಲ್ ಮತ್ತು ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿದಾರರಿಗೆ ಪ್ರತಿ ಸದಸ್ಯರಿಗೆ ತಲಾ 10 ಕೆಜಿ ಆಹಾರ ಧಾನ್ಯ (5 ಕೆಜಿ ಉಚಿತ ಅಕ್ಕಿ + 5 ಕೆಜಿ ಬದಲಿಗೆ ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ₹170 ನೇರ ನಗದು ವರ್ಗಾವಣೆ).', 
      hi: 'बीपीएल परिवारों को प्रतिमाह प्रति व्यक्ति 10 किग्रा खाद्यान्न (5 किग्रा मुफ्त चावल + 5 किग्रा के बदले ₹170 प्रति व्यक्ति डीबीटी कैश)।' 
    },
    eligibility: {
      en: 'All active BPL and Antyodaya (AAY) ration cardholders in Karnataka linked with Aadhaar.',
      kn: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಸಕ್ರಿಯ ಬಿಪಿಎಲ್ ಮತ್ತು ಅಂತ್ಯೋದಯ (AAY) ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಕುಟುಂಬಗಳು.',
      hi: 'कर्नाटक के सभी सक्रिय बीपीएल एवं अंत्योदय राशन कार्ड धारक।'
    },
    exclusions: {
      en: 'APL cardholders, government servants, and income tax paying families.',
      kn: 'ಎಪಿಎಲ್ ಕಾರ್ಡ್‌ದಾರರು, ಸರ್ಕಾರಿ ನೌಕರರು ಮತ್ತು ಆದಾಯ ತೆರಿಗೆದಾರರು.',
      hi: 'एपीएल कार्ड धारक एवं आयकर दाता।'
    },
    benefits: {
      subsidyPercent: '100% Free Foodgrain + Direct DBT Cash',
      maxLimit: '5 kg free food grains + ₹170 per person DBT monthly',
      mode: 'Fair Price Shop (Ration Shop) distribution + NPCI Bank DBT',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'BPL / Antyodaya Ration Card, Aadhaar Card seeded with bank account.',
      kn: 'ಬಿಪಿಎಲ್ ಅಥವಾ ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿ, ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜೋಡಣೆಯಾದ ಆಧಾರ್ ಸಂಖ್ಯೆ.',
      hi: 'बीपीएल/अंत्योदय राशन कार्ड, आधार लिंक बैंक खाता।'
    },
    processSteps: [
      { step: 1, title: { en: 'Biometric Authentication', kn: 'ಬಯೋಮೆಟ್ರಿಕ್ ದೃಢೀಕರಣ', hi: 'बायोमेट्रिक सत्यापन' }, desc: { en: 'Collect monthly 5kg free rice at nearest Fair Price Shop using thumbprint.', kn: 'ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ಹೆಬ್ಬೆಟ್ಟು ಗುರುತು ನೀಡಿ 5 ಕೆಜಿ ಉಚಿತ ಅಕ್ಕಿ ಪಡೆಯಿರಿ.', hi: 'उचित मूल्य की दुकान पर बायोमेट्रिक देकर मुफ्त चावल प्राप्त करें।' } },
      { step: 2, title: { en: 'DBT Credit for 5kg Cash', kn: 'ನಗದು ಜಮೆ', hi: 'डीबीटी नकद हस्तांतरण' }, desc: { en: 'Additional ₹170/person credited directly to card head bank account.', kn: 'ಉಳಿದ 5 ಕೆಜಿಯ ಹಣ ₹170 ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ನೇರವಾಗಿ ಯಜಮಾನಿಯ ಖಾತೆಗೆ ಜಮೆ.', hi: 'अतिरिक्त 5 किग्रा का ₹170 प्रति सदस्य सीधे बैंक में ट्रांसफर।' } }
    ],
    timeline: 'Monthly recurring distribution',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    badge: { en: '10kg / ₹170 DBT', kn: '೧೦ ಕೆಜಿ / ₹೧೭೦ DBT', hi: '10 किग्रा / ₹170 डीबीटी' },
    badgeClass: 'badge-success',
    ministry: { en: 'Food, Civil Supplies & Consumer Affairs Dept, Karnataka', kn: 'ಆಹಾರ, ನಾಗರಿಕ ಸರಬರಾಜು ಮತ್ತು ಗ್ರಾಹಕರ ವ್ಯವಹಾರಗಳ ಇಲಾಖೆ', hi: 'खाद्य एवं नागरिक आपूर्ति विभाग' },
    applyLink: 'https://ahara.kar.nic.in/',
    trackerUrl: 'https://ahara.kar.nic.in/'
  },
  {
    id: 'ksheera-dhare',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers', 'Large Landholders'],
    objective: 'Income Support',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Ksheera Dhare (Milk Incentive Scheme - ₹5/Litre)', kn: 'ಕ್ಷೀರ ಧಾರೆ ಯೋಜನೆ (ಹಾಲಿನ ಪ್ರೋತ್ಸಾಹಧನ ₹೫/ಲೀಟರ್)', hi: 'क्षीर धारा योजना (दूध प्रोत्साहन ₹5/लीटर)' },
    desc: { 
      en: 'Karnataka state direct cash incentive providing ₹5 per litre directly into the bank accounts of dairy farmers supplying milk to registered KMF (Nandini) Milk Producers Cooperative Societies (MPCS).', 
      kn: 'ಕೆಎಂಎಫ್ (ನಂದಿನಿ) ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘಗಳಿಗೆ ನಿತ್ಯ ಹಾಲು ಪೂರೈಸುವ ರೈತರಿಗೆ ಲೀಟರ್‌ಗೆ ₹5 ನೇರ ಪ್ರೋತ್ಸಾಹಧನ ನೀಡುವ ರಾಜ್ಯ ಸರ್ಕಾರದ ಮಹತ್ವದ ಹೈನುಗಾರಿಕೆ ಯೋಜನೆ.', 
      hi: 'केएमएफ (नंदिनी) दुग्ध उत्पादक सहकारी समितियों को दूध आपूर्ति करने वाले किसानों को ₹5 प्रति लीटर का सीधा बैंक प्रोत्साहन।' 
    },
    eligibility: {
      en: 'All dairy farmers in Karnataka who pour milk regularly to primary Milk Producers Cooperative Societies (MPCS) affiliated to KMF District Milk Unions.',
      kn: 'ಕರ್ನಾಟಕದ ಜಿಲ್ಲಾ ಹಾಲು ಒಕ್ಕೂಟಗಳ ವ್ಯಾಪ್ತಿಯ ಪ್ರಾಥಮಿಕ ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘಗಳಿಗೆ ಹಾಲು ಪೂರೈಸುವ ಎಲ್ಲಾ ರೈತರು.',
      hi: 'केएमएफ से संबद्ध प्राथमिक दुग्ध सहकारी समितियों के सदस्य किसान।'
    },
    exclusions: {
      en: 'Private milk vendorship not linked to official KMF/Nandini cooperative societies.',
      kn: 'ಖಾಸಗಿ ಡೇರಿಗಳಿಗೆ ಅಥವಾ ಹೊರಗಡೆ ಮಾರಾಟ ಮಾಡುವ ಹಾಲು.',
      hi: 'निजी डेयरियों को दूध बेचने वाले उत्पादक।'
    },
    benefits: {
      subsidyPercent: 'Direct Incentive of ₹5.00 per litre',
      maxLimit: 'Paid on 100% of milk poured (Average ₹3,000 to ₹15,000/month per farmer)',
      mode: 'Monthly Direct Benefit Transfer (DBT) to Aadhaar-linked Bank Account',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'MPCS Member Passbook / Producer Code, Aadhaar Card, Active Bank Passbook linked to NPCI.',
      kn: 'ಹಾಲು ಸಂಘದ ಸದಸ್ಯತ್ವ ಪಾಸ್‌ಬುಕ್ / ಕೋಡ್, ಆಧಾರ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'दुग्ध समिति का सदस्य पासबुक, आधार कार्ड, बैंक पासबुक।'
    },
    processSteps: [
      { step: 1, title: { en: 'Daily Milk Pouring & Measurement', kn: 'ಹಾಲು ಪೂರೈಕೆ & ಫ್ಯಾಟ್ ಪರೀಕ್ಷೆ', hi: 'दूध आपूर्ति व मापन' }, desc: { en: 'Pour milk daily at village MPCS; automatic FAT/SNF testing records volume in AMCU.', kn: 'ಗ್ರಾಮದ ಹಾಲು ಸಂಘಕ್ಕೆ ಹಾಲು ಹಾಕಿ; ಎಎಂಸಿಯು ಯಂತ್ರದಲ್ಲಿ ತೂಕ ಹಾಗೂ ಫ್ಯಾಟ್ ದಾಖಲಾಗುತ್ತದೆ.', hi: 'गांव की दुग्ध समिति में दूध मापें और फैट की पर्ची प्राप्त करें।' } },
      { step: 2, title: { en: 'Society Data Sync to KMF', kn: 'ಕೆಎಂಎಫ್ ಡೇಟಾ ಜೋಡಣೆ', hi: 'डेटा समन्वय' }, desc: { en: 'Litre totals are synchronized with Ksheera Dhare government portal.', kn: 'ಮಾಸಿಕ ಪೂರೈಸಿದ ಹಾಲಿನ ಪ್ರಮಾಣವನ್ನು ಕ್ಷೀರಧಾರೆ ಪೋರ್ಟಲ್‌ಗೆ ರವಾನಿಸಲಾಗುತ್ತದೆ.', hi: 'मासिक दूध मात्रा का विवरण सरकारी पोर्टल पर अपडेट होता है।' } },
      { step: 3, title: { en: 'DBT Cash Credit', kn: 'ನೇರ ಹಣ ಜಮೆ', hi: 'खाते में भुगतान' }, desc: { en: '₹5/litre credited directly to farmer account by Karnataka Animal Husbandry Dept.', kn: 'ಲೀಟರ್‌ಗೆ ₹5 ರಂತೆ ಒಟ್ಟು ಮೊತ್ತ ನೇರವಾಗಿ ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.', hi: '₹5 प्रति लीटर की दर से राशि सीधे बैंक खाते में ट्रांसफर।' } }
    ],
    timeline: 'Monthly recurring DBT payment',
    img: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&q=80',
    badge: { en: '₹5 / Litre Direct DBT', kn: '₹೫ / ಲೀಟರ್ ನೇರ DBT', hi: '₹5 / लीटर डीबीटी' },
    badgeClass: 'badge-success',
    ministry: { en: 'Dept. of Animal Husbandry & Fisheries, Karnataka & KMF', kn: 'ಪಶುಸಂಗೋಪನೆ ಮತ್ತು ಮೀನುಗಾರಿಕೆ ಇಲಾಖೆ & ಕೆಎಂಎಫ್', hi: 'पशुपालन विभाग, कर्नाटक एवं केएमएफ' },
    applyLink: 'https://ahvs.karnataka.gov.in/',
    trackerUrl: 'https://kmfnandini.coop/'
  },
  {
    id: 'anugraha-scheme',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers'],
    objective: 'Crop Insurance',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Anugraha Scheme (Livestock Accidental Death Relief)', kn: 'ಅನುಗ್ರಹ ಯೋಜನೆ (ಜಾನುವಾರು ಆಕಸ್ಮಿಕ ಸಾವು ಪರಿಹಾರ)', hi: 'अनुग्रह योजना (पशु आकस्मिक मृत्यु मुआवजा)' },
    desc: { 
      en: 'Provides prompt ex-gratia compensation of ₹10,000 for death of cattle/cow/bullocks and ₹5,000 for accidental death of sheep/goats, providing a safety net to rural livestock owners.', 
      kn: 'ರೈತರ ಹಸು, ಎತ್ತು, ಎಮ್ಮೆಗಳು ಆಕಸ್ಮಿಕವಾಗಿ ಮರಣ ಹೊಂದಿದರೆ ₹10,000 ಹಾಗೂ ಕುರಿ/ಮೇಕೆಗಳು ಮೃತಪಟ್ಟರೆ ₹5,000 ತಕ್ಷಣದ ಆರ್ಥಿಕ ಪರಿಹಾರ ನೀಡುವ ರಾಜ್ಯ ಸರ್ಕಾರದ ಯೋಜನೆ.', 
      hi: 'गाय, बैल या भैंस की आकस्मिक मृत्यु पर ₹10,000 और भेड़/बकरी की मृत्यु पर ₹5,000 का त्वरित सरकारी मुआवजा।' 
    },
    eligibility: {
      en: 'All farmers and shepherds residing in Karnataka rearing cattle, buffaloes, sheep, or goats holding valid ear-tags or certified by government veterinary officer.',
      kn: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಸಣ್ಣ ರೈತರು ಮತ್ತು ಕುರಿಗಾಹಿಗಳು (ಸರ್ಕಾರಿ ಪಶು ವೈದ್ಯಾಧಿಕಾರಿಗಳಿಂದ ತಪಾಸಣೆಗೊಳಪಟ್ಟ ಜಾನುವಾರುಗಳು).',
      hi: 'कर्नाटक के सभी किसान व पशुपालक।'
    },
    exclusions: {
      en: 'Natural old age mortality without post-mortem report or commercial slaughter.',
      kn: 'ಸ್ವಾಭಾವಿಕ ಮುಪ್ಪು ಸಾವು ಅಥವಾ ವಧೆ ಮಾಡಿದ ಜಾನುವಾರುಗಳಿಗೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.',
      hi: 'प्राकृतिक वृद्धावस्था या वध के मामले।'
    },
    benefits: {
      subsidyPercent: '100% Direct Cash Compensation',
      maxLimit: '₹10,000 for Cow/Bull/Buffalo | ₹5,000 for Sheep/Goat (up to 3 per owner)',
      mode: 'DBT payment to livestock owner bank account',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Post-Mortem Report from Veterinary Officer, Ear Tag photo of deceased animal, Aadhaar Card, Bank Passbook, FIR copy in accident cases.',
      kn: 'ಪಶುವೈದ್ಯಾಧಿಕಾರಿಯ ಮರಣೋತ್ತರ ಪರೀಕ್ಷಾ ವರದಿ (ಪಿಎಂ ರಿಪೋರ್ಟ್), ಇಯರ್ ಟ್ಯಾಗ್ ಫೋಟೋ, ಆಧಾರ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'पशु चिकित्सक की पोस्टमार्टम रिपोर्ट, कान के टैग का फोटो, आधार, बैंक पासबुक।'
    },
    processSteps: [
      { step: 1, title: { en: 'Intimation to Veterinary Hospital', kn: 'ಪಶು ಆಸ್ಪತ್ರೆಗೆ ಮಾಹಿತಿ', hi: 'पशु अस्पताल में सूचना' }, desc: { en: 'Inform local Veterinary Assistant Surgeon (VAS) within 24 hours of animal death.', kn: 'ಜಾನುವಾರು ಮೃತಪಟ್ಟ 24 ಗಂಟೆಯೊಳಗೆ ಸ್ಥಳೀಯ ಪಶು ಆಸ್ಪತ್ರೆಗೆ ಮಾಹಿತಿ ನೀಡಿ.', hi: 'पशु की मृत्यु के 24 घंटे के भीतर निकटतम पशु चिकित्सालय को सूचित करें।' } },
      { step: 2, title: { en: 'Post-Mortem & Geotagging', kn: 'ಮರಣೋತ್ತರ ಪರೀಕ್ಷೆ', hi: 'पोस्टमार्टम व फोटो' }, desc: { en: 'Doctor visits spot, performs post-mortem, and takes geotagged photographs.', kn: 'ಪಶು ವೈದ್ಯಾಧಿಕಾರಿ ಸ್ಥಳಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಮರಣೋತ್ತರ ಪರೀಕ್ಷೆ ನಡೆಸಿ ವರದಿ ಸಿದ್ಧಪಡಿಸುತ್ತಾರೆ.', hi: 'पशु चिकित्सक द्वारा मौके पर पोस्टमार्टम और जीपीएस फोटो अपलोड।' } },
      { step: 3, title: { en: 'Direct Compensation Transfer', kn: 'ಖಾತೆಗೆ ಪರಿಹಾರ ಜಮೆ', hi: 'सीधे खाते में मुआवजा' }, desc: { en: 'Compensation credited directly to farmer bank account within 15 days.', kn: '15 ದಿನಗಳೊಳಗೆ ರೈತರ ಖಾತೆಗೆ ನೇರವಾಗಿ ₹10,000 ಅಥವಾ ₹5,000 ಜಮೆ.', hi: '15 दिनों के भीतर किसान के बैंक खाते में मुआवजा राशि ट्रांसफर।' } }
    ],
    timeline: '15 Days post post-mortem report',
    img: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=600&q=80',
    badge: { en: '₹10,000 Cattle Relief', kn: '₹೧೦,೦೦೦ ಪರಿಹಾರ', hi: '₹10,000 मुआवजा' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept. of Animal Husbandry & Veterinary Services, Karnataka', kn: 'ಪಶುಸಂಗೋಪನೆ ಮತ್ತು ಪಶುವೈದ್ಯಕೀಯ ಸೇವಾ ಇಲಾಖೆ', hi: 'पशुपालन एवं पशु चिकित्सा सेवा विभाग' },
    applyLink: 'https://ahvs.karnataka.gov.in/',
    trackerUrl: 'https://ahvs.karnataka.gov.in/'
  },
  {
    id: 'ganga-kalyana',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Women Farmers'],
    objective: 'Water Conservation',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Ganga Kalyana Scheme (Free Irrigation Borewells)', kn: 'ಗಂಗಾ ಕಲ್ಯಾಣ ಯೋಜನೆ (ಉಚಿತ ಕೊಳವೆಬಾವಿ & ಪಂಪ್‌ಸೆಟ್)', hi: 'गंगा कल्याण योजना (मुफ्त सिंचाई बोरवेल)' },
    desc: { 
      en: 'Flagship Karnataka welfare scheme providing 100% subsidized individual or community borewell drilling, submersible pump sets, energization, and PVC pipeline installation for small/marginal farmers.', 
      kn: 'ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ ಕೃಷಿ ನೀರಾವರಿಗಾಗಿ ಸಂಪೂರ್ಣ ಉಚಿತ ಕೊಳವೆಬಾವಿ ಕೊರೆಯಿಸಿ, ಸಬ್‌ಮರ್ಸಿಬಲ್ ಪಂಪ್‌ಸೆಟ್, ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಹಾಗೂ ಪೈಪ್‌ಲೈನ್ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'छोटे व सीमांत किसानों को 100% सब्सिडी पर मुफ्त बोरवेल खनन, पंपसेट, बिजली कनेक्शन और पाइपलाइन स्थापना।' 
    },
    eligibility: {
      en: 'Small/Marginal farmers belonging to SC, ST, and Backward Classes (Cat 1, 2A, 2B, 3A, 3B) having 1.20 to 5.00 acres of agricultural land.',
      kn: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ, ಪರಿಶಿಷ್ಟ ಪಂಗಡ ಹಾಗೂ ಹಿಂದುಳಿದ ವರ್ಗಗಳ 1.20 ರಿಂದ 5 ಎಕರೆ ಕೃಷಿ ಜಮೀನು ಹೊಂದಿರುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.',
      hi: 'एससी, एसटी और पिछड़ा वर्ग के 1.2 से 5 एकड़ कृषि भूमि वाले किसान।'
    },
    exclusions: {
      en: 'Farmers who previously availed borewell subsidy or land situated in categorized groundwater over-exploited zones without recharge.',
      kn: 'ಹಿಂದೆ ಗಂಗಾ ಕಲ್ಯಾಣ ಸೌಲಭ್ಯ ಪಡೆದವರು ಅಥವಾ ಅಂತರ್ಜಲ ಅತೀವ ಶೋಷಿತ ಪ್ರದೇಶದಲ್ಲಿ ಜಮೀನಿರುವವರು.',
      hi: 'पहले गंगा कल्याण लाभ प्राप्त किसान या अति-शोषित भूजल क्षेत्र।'
    },
    benefits: {
      subsidyPercent: '100% Free Complete Turnkey Package',
      maxLimit: 'Up to ₹3,50,000 per borewell installation + pump + power line',
      mode: 'Turnkey execution via Corporation approved drilling rigs and KPTCL energization',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Land RTC (Pahani), Caste Certificate (RD Number), Income Certificate (Family Income < ₹2.0 Lakh), Small Farmer Certificate from Tahsildar, Aadhaar Card.',
      kn: 'ಪಹಣಿ (RTC), ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (RD ಸಂಖ್ಯೆ), ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (< ₹2.0 ಲಕ್ಷ), ಸಣ್ಣ ರೈತರ ದೃಢೀಕರಣ ಪತ್ರ, ಆಧಾರ್ ಕಾರ್ಡ್.',
      hi: 'भूमि दस्तावेज (RTC), जाति प्रमाण पत्र, आय प्रमाण पत्र, छोटे किसान का प्रमाण पत्र, आधार कार्ड।'
    },
    processSteps: [
      { step: 1, title: { en: 'Seva Sindhu Online Application', kn: 'ಸೇವಾ ಸಿಂಧುವಿನಲ್ಲಿ ಅರ್ಜಿ', hi: 'ऑनलाइन आवेदन' }, desc: { en: 'Apply online on Seva Sindhu choosing concerned development corporation (D. Devaraj Urs, Ambedkar, Valmiki).', kn: 'ಸೇವಾ ಸಿಂಧು ಅಥವಾ ಕರ್ನಾಟಕ ಒನ್ ಮೂಲಕ ಆಯಾ ಅಭಿವೃದ್ಧಿ ನಿಗಮಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'सेवा सिंधु के माध्यम से संबंधित विकास निगम को आवेदन करें।' } },
      { step: 2, title: { en: 'Hydrogeologist Survey', kn: 'ಅಂತರ್ಜಲ ತಜ್ಞರ ಸ್ಥಳ ಪರಿಶೀಲನೆ', hi: 'भूजल वैज्ञानिक सर्वेक्षण' }, desc: { en: 'Groundwater scientist inspects farm and marks successful water point.', kn: 'ಸರ್ಕಾರಿ ಜಿಯಾಲಜಿಸ್ಟ್ ಜಮೀನಿಗೆ ಭೇಟಿ ನೀಡಿ ಕೊಳವೆಬಾವಿ ಪಾಯಿಂಟ್ ಗುರುತಿಸುತ್ತಾರೆ.', hi: 'सरकारी भूवैज्ञानिक द्वारा खेत पर वाटर पॉइंट का चिह्नीकरण।' } },
      { step: 3, title: { en: 'Drilling & Electrification', kn: 'ಕೊಳವೆಬಾವಿ ಕೊರೆಯುವಿಕೆ & ವಿದ್ಯುತ್ ಸಂಪರ್ಕ', hi: 'खनन व विद्युतीकरण' }, desc: { en: 'Government contractor completes drilling, pump installation, and ESCOM power connection free of cost.', kn: 'ನಿಗಮದ ವತಿಯಿಂದ ಉಚಿತವಾಗಿ ಬೋರ್‌ವೆಲ್ ಕೊರೆದು, ಪಂಪ್ ಹಾಗೂ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಲ್ಪಿಸಲಾಗುತ್ತದೆ.', hi: 'ठेकेदार द्वारा बोरवेल खनन, पंप स्थापना व बिजली कनेक्शन मुफ्त में पूर्ण।' } }
    ],
    timeline: '60 - 90 Days from committee selection',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    badge: { en: '100% Free Borewell', kn: 'ಉಚಿತ ಕೊಳವೆಬಾವಿ', hi: '100% मुफ्त बोरवेल' },
    badgeClass: 'badge-success',
    ministry: { en: 'Social Welfare & Backward Classes Dept, Karnataka', kn: 'ಸಮಾಜ ಕಲ್ಯಾಣ ಹಾಗೂ ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'समाज कल्याण एवं पिछड़ा वर्ग विभाग' },
    applyLink: 'https://kmdc.karnataka.gov.in/en',
    trackerUrl: 'https://sevasindhuservices.karnataka.gov.in/'
  },
  {
    id: 'krishi-yantra-dhare',
    category: 'Agriculture',
    level: 'State',
    beneficiary: ['Small/Marginal Farmers', 'Tenant Farmers', 'Women Farmers'],
    objective: 'Mechanization',
    stage: 'Harvesting',
    districtSpecific: ['All'],
    title: { en: 'Krishi Yantra Dhare (Custom Hiring Centres)', kn: 'ಕೃಷಿ ಯಂತ್ರ ಧಾರೆ (ಬಾಡಿಗೆ ಆಧಾರಿತ ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಕೇಂದ್ರ)', hi: 'कृषि यंत्र धारे (कस्टम हायरिंग केंद्र)' },
    desc: { 
      en: 'Karnataka government network of 1,000+ Hobli-level Custom Hiring Service Centres (CHSC) providing modern tractors, combine harvesters, rotavators, and weeders at 50% to 75% subsidized hourly hire charges to small and marginal farmers.', 
      kn: 'ದುಬಾರಿ ಯಂತ್ರಗಳನ್ನು ಕೊಳ್ಳಲಾಗದ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ ಹೋಬಳಿ ಮಟ್ಟದ ಕೇಂದ್ರಗಳಲ್ಲಿ ಟ್ರ್ಯಾಕ್ಟರ್, ಕಟಾವು ಯಂತ್ರ, ರೋಟವೇಟರ್‌ಗಳನ್ನು ಮಾರುಕಟ್ಟೆ ದರಕ್ಕಿಂತ 50% ರಿಯಾಯಿತಿ ಬಾಡಿಗೆ ದರದಲ್ಲಿ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'छोटे किसानों को ट्रैक्टर, हार्वेस्टर, रोटावेटर जैसे आधुनिक उपकरण बाजार से 50-75% सस्ती किराए दरों पर उपलब्ध कराना।' 
    },
    eligibility: {
      en: 'All farmers across Karnataka holding agricultural land or tenant farmer certificates; priority given to small and marginal farmers.',
      kn: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಸಣ್ಣ, ಅತಿ ಸಣ್ಣ ಮತ್ತು ಗೇಣಿ ರೈತರು (ಪಹಣಿ ಅಥವಾ ಕೃಷಿ ಗುರುತಿನ ಚೀಟಿ ಹೊಂದಿರುವವರು).',
      hi: 'कर्नाटक के सभी किसान व बटाईदार।'
    },
    exclusions: {
      en: 'Commercial industrial earthmoving works outside agriculture.',
      kn: 'ಕೃಷಿಯೇತರ ವಾಣಿಜ್ಯ ಮತ್ತು ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಕಾಮಗಾರಿಗಳು.',
      hi: 'गैर-कृषि वाणिज्यिक कार्य।'
    },
    benefits: {
      subsidyPercent: '50% to 75% Subsidized Hourly Hire Tariffs',
      maxLimit: 'Savings up to ₹8,000 to ₹15,000 per crop season per farmer',
      mode: 'On-demand equipment booking with verified operator',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Land RTC / FRUITS FID number, Aadhaar Card, Mobile Number for SMS booking.',
      kn: 'ಪಹಣಿ (RTC), ಫ್ರೂಟ್ಸ್ ಐಡಿ (FID), ಆಧಾರ್ ಕಾರ್ಡ್, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ.',
      hi: 'भूमि RTC, FRUITS आईडी, आधार कार्ड।'
    },
    processSteps: [
      { step: 1, title: { en: 'Call Nearest CHSC Center', kn: 'ಹತ್ತಿರದ ಕೇಂದ್ರಕ್ಕೆ ಕರೆ ಮಾಡಿ', hi: 'निकटतम केंद्र पर संपर्क' }, desc: { en: 'Book required implement (Tractor, Harvester, Digger) at Hobli RSK / CHSC center.', kn: 'ಹೋಬಳಿಯ ಕೃಷಿ ಯಂತ್ರ ಧಾರೆ ಕೇಂದ್ರ ಅಥವಾ ಆರ್‌ಎಸ್‌ಕೆಗೆ ಭೇಟಿ ನೀಡಿ ಬುಕ್ ಮಾಡಿ.', hi: 'होबली केंद्र या मोबाइल ऐप पर आवश्यक कृषि उपकरण बुक करें।' } },
      { step: 2, title: { en: 'Operator Deployment to Field', kn: 'ಜಮೀನಿಗೆ ಯಂತ್ರ ಆಗಮನ', hi: 'खेत पर मशीन की डिलीवरी' }, desc: { en: 'Trained technician operates implement at farmer\'s field with digital meter.', kn: 'ತರಬೇತಿ ಪಡೆದ ಆಪರೇಟರ್ ಯಂತ್ರದೊಂದಿಗೆ ಜಮೀನಿಗೆ ಬಂದು ಕೆಲಸ ನಿರ್ವಹಿಸುತ್ತಾರೆ.', hi: 'प्रशिक्षित ऑपरेटर डिजिटल मीटर के साथ खेत पर काम करता है।' } },
      { step: 3, title: { en: 'Subsidized Fee Payment', kn: 'ರಿಯಾಯಿತಿ ಬಾಡಿಗೆ ಪಾವತಿ', hi: 'रियायती किराए का भुगतान' }, desc: { en: 'Pay officially notified government subsidized hourly tariff and get printed receipt.', kn: 'ಸರ್ಕಾರ ನಿಗದಿಪಡಿಸಿದ ರಿಯಾಯಿತಿ ದರವನ್ನು ಪಾವತಿಸಿ ರಸೀದಿ ಪಡೆಯಿರಿ.', hi: 'सरकारी रियायती दर पर भुगतान कर रसीद प्राप्त करें।' } }
    ],
    timeline: 'Service on date of scheduled booking',
    img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80',
    badge: { en: '50% Discount Hire', kn: '೫೦% ರಿಯಾಯಿತಿ ಬಾಡಿಗೆ', hi: '50% छूट किराया' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Dept. of Agriculture, Govt of Karnataka', kn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ', hi: 'कृषि विभाग, कर्नाटक सरकार' },
    applyLink: 'https://raitamitra.karnataka.gov.in/',
    trackerUrl: 'https://raitamitra.karnataka.gov.in/'
  },
  {
    id: 'pmksy-micro-irrigation',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Small/Marginal Farmers', 'Large Landholders', 'Women Farmers'],
    objective: 'Water Conservation',
    stage: 'Pre-Harvest',
    districtSpecific: ['All'],
    title: { en: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY - Drip & Sprinkler)', kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚಾಯಿ ಯೋಜನೆ (ಹನಿ ಮತ್ತು ತುಂತುರು ನೀರಾವರಿ)', hi: 'प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप एवं स्प्रिंकलर)' },
    desc: { 
      en: 'Provides 75% to 90% direct subsidy for installing micro-irrigation systems (Drip and Sprinkler) on farmland, saving up to 60% water and increasing crop yields significantly.', 
      kn: 'ರೈತರ ಜಮೀನಿನಲ್ಲಿ ಹನಿ ನೀರಾವರಿ ಹಾಗೂ ತುಂತುರು ನೀರಾವರಿ ಘಟಕಗಳನ್ನು ಅಳವಡಿಸಲು ಶೇ 75% ರಿಂದ 90% ವರೆಗೆ ಭಾರಿ ಸಹಾಯಧನ ನೀಡುವ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಜಂಟಿ ಯೋಜನೆ.', 
      hi: 'खेत में ड्रिप और स्प्रिंकलर सिंचाई प्रणाली लगाने पर 75% से 90% तक सब्सिडी।' 
    },
    eligibility: {
      en: 'All farmers possessing cultivable land with a dedicated water source (well, borewell, or farm pond). SC/ST get 90% subsidy, General get 75%.',
      kn: 'ಸ್ವಂತ ನೀರಾವರಿ ಮೂಲ (ಬಾವಿ, ಬೋರ್‌ವೆಲ್, ಹೊಂಡ) ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತರು. ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ರೈತರಿಗೆ ಶೇ 90%, ಸಾಮಾನ್ಯ ರೈತರಿಗೆ ಶೇ 75% ಸಬ್ಸಿಡಿ.',
      hi: 'सिंचाई का साधन रखने वाले सभी किसान (एससी/एसटी हेतु 90%, सामान्य हेतु 75% सब्सिडी)।'
    },
    exclusions: {
      en: 'Farmers who availed micro-irrigation subsidy on the same land survey number within the last 5 years.',
      kn: 'ಕಳೆದ 5 ವರ್ಷಗಳಲ್ಲಿ ಅದೇ ಸರ್ವೆ ನಂಬರ್‌ಗೆ ಹನಿ ನೀರಾವರಿ ಸೌಲಭ್ಯ ಪಡೆದವರು.',
      hi: 'पिछले 5 वर्षों में समान भूमि पर ड्रिप सब्सिडी ले चुके किसान।'
    },
    benefits: {
      subsidyPercent: '90% Subsidy for SC/ST | 75% Subsidy for General Farmers',
      maxLimit: 'Up to ₹1,00,000 per hectare (Maximum 5 hectares)',
      mode: 'Direct supply and installation by empanelled BIS-certified drip companies (Jain, Netafim, EPC)',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Land RTC (Pahani), Water and Electricity Certificate / Borewell photo, Aadhaar Card, Caste Certificate, FRUITS ID, Farm sketch.',
      kn: 'ಪಹಣಿ (RTC), ನೀರಿನ ಮೂಲ ದೃಢೀಕರಣ ಪತ್ರ, ಆಧಾರ್ ಕಾರ್ಡ್, ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ, ಫ್ರೂಟ್ಸ್ ಐಡಿ.',
      hi: 'भूमि दस्तावेज, जल स्रोत प्रमाण, आधार कार्ड, जाति प्रमाण पत्र, FRUITS आईडी।'
    },
    processSteps: [
      { step: 1, title: { en: 'Online Application at RSK', kn: 'ಆರ್‌ಎಸ್‌ಕೆಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ', hi: 'आरएसके पर आवेदन' }, desc: { en: 'Submit application along with land sketch and water source certificate at RSK.', kn: 'ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ದಾಖಲೆಗಳೊಂದಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'रायथा संपर्क केंद्र पर आवेदन और खेत का नक्शा जमा करें।' } },
      { step: 2, title: { en: 'Company Site Survey & Design', kn: 'ಕಂಪನಿ ಇಂಜಿನಿಯರ್ ಸಮೀಕ್ಷೆ', hi: 'साइट सर्वेक्षण' }, desc: { en: 'Registered micro-irrigation engineer surveys pressure and prepares technical design.', kn: 'ನೋಂದಾಯಿತ ಕಂಪನಿ ಇಂಜಿನಿಯರ್ ಜಮೀನು ಪರಿಶೀಲಿಸಿ ಪೈಪ್‌ಲೈನ್ ವಿನ್ಯಾಸ ರೂಪಿಸುತ್ತಾರೆ.', hi: 'इंजीनियर द्वारा खेत का सर्वेक्षण और ड्रिप डिजाइन तैयार करना।' } },
      { step: 3, title: { en: 'Installation & Inspection', kn: 'ಅಳವಡಿಕೆ & ಜಂಟಿ ತಪಾಸಣೆ', hi: 'स्थापना व सत्यापन' }, desc: { en: 'Complete turnkey installation of filters, mainline, and drippers followed by GPS audit.', kn: 'ಫಿಲ್ಟರ್, ಮುಖ್ಯ ಪೈಪ್ ಮತ್ತು ಡ್ರಿಪ್ ಲೈನ್‌ಗಳ ಅಳವಡಿಕೆ ಹಾಗೂ ಅಧಿಕಾರಿಗಳ ಅಂತಿಮ ತಪಾಸಣೆ.', hi: 'ड्रिप व फिल्टर की स्थापना के बाद सरकारी टीम द्वारा जीपीएस सत्यापन।' } }
    ],
    timeline: '30 - 45 Days from application',
    img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&q=80',
    badge: { en: 'Up to 90% Subsidy', kn: '೯೦% ಸಹಾಯಧನ', hi: '90% सब्सिडी' },
    badgeClass: 'badge-success',
    ministry: { en: 'Dept. of Horticulture & Agriculture, Karnataka', kn: 'ತೋಟಗಾರಿಕೆ ಮತ್ತು ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ', hi: 'बागवानी एवं कृषि विभाग, कर्नाटक' },
    applyLink: 'https://horticulturedir.karnataka.gov.in/',
    trackerUrl: 'https://pmksy.gov.in/'
  },
  {
    id: 'matsya-sampada',
    category: 'Agriculture',
    level: 'Central',
    beneficiary: ['Youth/Agri-Startups', 'Small/Marginal Farmers', 'Women Farmers'],
    objective: 'Post-Harvest',
    stage: 'All-Season',
    districtSpecific: ['All'],
    title: { en: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY - Fisheries)', kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮತ್ಸ್ಯ ಸಂಪದ ಯೋಜನೆ (ಮೀನುಗಾರಿಕೆ & ಜಲಕೃಷಿ)', hi: 'प्रधानमंत्री मत्स्य संपदा योजना (मत्स्य पालन)' },
    desc: { 
      en: 'Provides 40% to 60% capital financial subsidy for construction of new fish ponds, biofloc units, recirculating aquaculture systems (RAS), fingerling stocking, and refrigerated three-wheelers.', 
      kn: 'ಹೊಸ ಮೀನು ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ, ಬಯೋಫ್ಲೋಕ್ ಘಟಕ, ಮರಿ ಮೀನು ಸಂಗ್ರಹಣೆ ಹಾಗೂ ಮೀನು ಸಾಗಾಣಿಕೆ ವಾಹನಗಳ ಖರೀದಿಗೆ ಶೇ 40% ರಿಂದ 60% ವರೆಗೆ ಸಹಾಯಧನ ನೀಡುವ ಯೋಜನೆ.', 
      hi: 'मछली पालन तालाब निर्माण, बायोफ्लॉक यूनिट, मछली बीज और परिवहन वाहनों पर 40% से 60% तक सरकारी सब्सिडी।' 
    },
    eligibility: {
      en: 'Individual fish farmers, SHGs, JLGs, fisheries cooperatives, and rural youth having at least 0.5 acre land with water access.',
      kn: 'ಕನಿಷ್ಠ 0.5 ಎಕರೆ ಜಮೀನು ಮತ್ತು ನೀರು ಹೊಂದಿರುವ ರೈತರು, ಯುವಕರು, ಮೀನುಗಾರರ ಸಹಕಾರ ಸಂಘಗಳು.',
      hi: 'कम से कम 0.5 एकड़ भूमि और पानी की सुविधा रखने वाले किसान व युवा।'
    },
    exclusions: {
      en: 'Unregistered fishing on disputed water bodies.',
      kn: 'ವಿವಾದಿತ ಜಲಮೂಲಗಳು ಅಥವಾ ಅನಧಿಕೃತ ಪ್ರದೇಶಗಳು.',
      hi: 'अनाधिकृत या विवादित जल निकाय।'
    },
    benefits: {
      subsidyPercent: '60% for SC/ST/Women | 40% for General Category',
      maxLimit: 'Up to ₹4,20,000 for 1-hectare pond construction + fingerlings + feed package',
      mode: 'DBT bank subsidy linked to project progress milestones',
      interestSubvention: 'KCC Fisheries loan at 4% interest'
    },
    documents: {
      en: 'Land RTC / Lease Deed, Water source test report, Detailed Project Report (DPR), Aadhaar, Bank Passbook, Caste Certificate.',
      kn: 'ಪಹಣಿ ಅಥವಾ ಗುತ್ತಿಗೆ ಪತ್ರ, ನೀರಿನ ಗುಣಮಟ್ಟ ವರದಿ, ಯೋಜನಾ ವರದಿ (DPR), ಆಧಾರ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್.',
      hi: 'भूमि RTC/लीज दस्तावेज, डीपीआर, आधार कार्ड, बैंक पासबुक।'
    },
    processSteps: [
      { step: 1, title: { en: 'Submit DPR to District Fisheries Office', kn: 'ಜಿಲ್ಲಾ ಮೀನುಗಾರಿಕೆ ಇಲಾಖೆಗೆ ಡಿಪಿಆರ್', hi: 'डीपीआर जमा करें' }, desc: { en: 'Submit project report and application to Assistant Director of Fisheries (ADF).', kn: 'ಸಹಾಯಕ ಮೀನುಗಾರಿಕೆ ನಿರ್ದೇಶಕರ (ADF) ಕಚೇರಿಗೆ ಯೋಜನಾ ವರದಿ ಸಲ್ಲಿಸಿ.', hi: 'सहायक मत्स्य निदेशक कार्यालय में प्रोजेक्ट रिपोर्ट जमा करें।' } },
      { step: 2, title: { en: 'Technical Sanction & Work Order', kn: 'ತಾಂತ್ರಿಕ ಮಂಜೂರಾತಿ', hi: 'तकनीकी स्वीकृति' }, desc: { en: 'District Level Committee sanctions subsidy quote and issues work order.', kn: 'ಜಿಲ್ಲಾ ಸಮಿತಿಯು ಪರಿಶೀಲಿಸಿ ಕಾಮಗಾರಿಗೆ ಅಧಿಕೃತ ಅನುಮೋದನೆ ನೀಡುತ್ತದೆ.', hi: 'जिला समिति द्वारा मूल्यांकन के बाद कार्य आदेश जारी।' } },
      { step: 3, title: { en: 'Construction & Staged DBT', kn: 'ನಿರ್ಮಾಣ & ಹಂತವಾರು ಹಣ ಬಿಡುಗಡೆ', hi: 'निर्माण व अनुदान' }, desc: { en: 'Complete pond construction; subsidy released in 2 instalments post field verification.', kn: 'ಹೊಂಡ ನಿರ್ಮಾಣದ ನಂತರ ಪರಿಶೀಲನೆ ನಡೆಸಿ 2 ಕಂತುಗಳಲ್ಲಿ ಸಹಾಯಧನ ಜಮೆ.', hi: 'तालाब निर्माण के बाद भौतिक निरीक्षण और 2 किस्तों में सब्सिडी का भुगतान।' } }
    ],
    timeline: '45 Days for district committee approval',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    badge: { en: '60% Fisheries Grant', kn: '೬೦% ಮೀನುಗಾರಿಕೆ ಸಬ್ಸಿಡಿ', hi: '60% सब्सिडी' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Dept. of Fisheries, Ministry of Fisheries GoI & Karnataka', kn: 'ಮೀನುಗಾರಿಕೆ ಇಲಾಖೆ, ಭಾರತ ಸರ್ಕಾರ & ಕರ್ನಾಟಕ', hi: 'मत्स्य पालन विभाग, भारत सरकार व कर्नाटक' },
    applyLink: 'https://pmmsy.dof.gov.in/',
    trackerUrl: 'https://pmmsy.dof.gov.in/'
  },

  // ==========================================
  // SCHOLARSHIPS INTEGRATION
  // ==========================================
  ...scholarshipSchemes
];

// ============================================================
// 5. FINANCIAL ASSISTANCE, CROP LOANS & INSURANCE CALCULATORS
// ============================================================
export const agriFinancialAssistance = [
  {
    id: 'kcc-crop-loan',
    img: '/schemes/kisan-credit-card.jpg',
    title: { en: 'Kisan Credit Card (KCC) Short-Term Crop Loan', kn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC) ಅಲ್ಪಾವಧಿ ಬೆಳೆ ಸಾಲ', hi: 'किसान क्रेडिट कार्ड अल्पकालिक फसल ऋण' },
    category: 'Crop Loan',
    interestRate: '4% p.a. (with prompt repayment incentive)',
    limit: 'Up to ₹3,00,000 per farmer family',
    moratorium: 'Repayment linked to crop harvesting season (6 to 12 months)',
    features: [
      { en: 'Collateral-free loan up to ₹1.60 Lakhs', kn: '₹1.60 ಲಕ್ಷದವರೆಗೆ ಯಾವುದೇ ಆಸ್ತಿ ಅಡಮಾನವಿಲ್ಲದೆ ಸಾಲ', hi: '₹1.60 लाख तक बिना किसी बंधक (Collateral) के ऋण' },
      { en: 'ATM-cum-RuPay Kisan Card for easy withdrawals', kn: 'ಎಟಿಎಂ ಹಾಗೂ ಶಾಪಿಂಗ್‌ಗಾಗಿ ರುಪೇ ಕಿಸಾನ್ ಕಾರ್ಡ್', hi: 'एटीएम और निकासी के लिए RuPay किसान कार्ड' },
      { en: 'Covers crop production, household consumption, and post-harvest maintenance', kn: 'ಬೆಳೆ ಉತ್ಪಾದನೆ, ಮನೆ ಬಳಕೆ ಹಾಗೂ ಕೊಯ್ಲೋತ್ತರ ವೆಚ್ಚ ಭರಿಸುತ್ತದೆ', hi: 'फसल उत्पादन, घरेलू खर्च और रखरखाव की पूर्ति' }
    ],
    bankPartners: ['State Bank of India', 'Karnataka Gramin Bank', 'Canara Bank', 'Apex / District DCC Banks'],
    applyUrl: 'https://jansamarth.in/'
  },
  {
    id: 'pmfby-insurance-detail',
    img: '/schemes/pmfby.jpg',
    title: { en: 'PMFBY Crop Insurance Slabs & Settlement Guide', kn: 'ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ ಪ್ರೀಮಿಯಂ ದರಗಳು & ಪರಿಹಾರ', hi: 'पीएम फसल बीमा प्रीमियम दरें और दावा प्रक्रिया' },
    category: 'Insurance',
    interestRate: 'Subsidized premium by GoI & Govt of Karnataka',
    limit: 'Full Sum Insured based on Scale of Finance (₹25,000 - ₹90,000/acre)',
    moratorium: 'Claims cleared within 30 days of damage survey',
    features: [
      { en: 'Kharif Crops: Farmer pays only 2.0% of Sum Insured', kn: 'ಖಾರೀಫ್ ಬೆಳೆಗಳು: ರೈತರು ಕೇವಲ 2.0% ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಬೇಕು', hi: 'खरीफ फसलें: किसान को केवल 2% प्रीमियम देना होगा' },
      { en: 'Rabi Crops: Farmer pays only 1.5% of Sum Insured', kn: 'ರಬಿ ಬೆಳೆಗಳು: ರೈತರು ಕೇವಲ 1.5% ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಬೇಕು', hi: 'रबी फसलें: किसान को केवल 1.5% प्रीमियम देना होगा' },
      { en: 'Commercial / Horticulture: Farmer pays only 5.0% premium', kn: 'ವಾಣಿಜ್ಯ ಮತ್ತು ತೋಟಗಾರಿಕೆ ಬೆಳೆಗಳು: ಕೇವಲ 5.0% ಪ್ರೀಮಿಯಂ', hi: 'व्यावसायिक/बागवानी फसलें: केवल 5% प्रीमियम' },
      { en: '72-Hour local crop loss intimation on 1800-180-1551', kn: 'ಸ್ಥಳೀಯ ಬೆಳೆ ಹಾನಿಗೆ 72 ಗಂಟೆಯೊಳಗೆ 1800-180-1551 ಗೆ ಕರೆ ಮಾಡಿ', hi: '72 घंटे के भीतर टोल फ्री नंबर 1800-180-1551 पर सूचना दें' }
    ],
    bankPartners: ['Agriculture Insurance Company of India', 'HDFC ERGO', 'SBI General'],
    applyUrl: 'https://samrakshane.karnataka.gov.in/'
  },
  {
    id: 'nabard-startup-grant',
    img: '/schemes/fpo-formation.jpg',
    title: { en: 'NABARD Agri-Startup & FPO Capital Grants', kn: 'ನಬಾರ್ಡ್ ಕೃಷಿ ಸ್ಟಾರ್ಟ್‌ಅಪ್ & ಎಫ್‌ಪಿಒ ಅನುದಾನಗಳು', hi: 'नाबार्ड कृषि स्टार्टअप और FPO अनुदान' },
    category: 'Grants & Startups',
    interestRate: 'Grants (0% repayment) & Subsidized Term Loans',
    limit: 'Up to ₹25 Lakhs for Startups | ₹15 Lakhs Equity for FPOs',
    moratorium: '2-year moratorium on term loans with 7-year repayment',
    features: [
      { en: 'Agri-Business Incubator grant support up to ₹25 Lakhs via NABARD / UAS Dharwad & Bengaluru', kn: 'ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾಲಯಗಳ ಮೂಲಕ ₹25 ಲಕ್ಷದವರೆಗೆ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಅನುದಾನ', hi: 'कृषि विश्वविद्यालयों के माध्यम से ₹25 लाख तक स्टार्टअप अनुदान' },
      { en: 'Credit Guarantee Scheme up to ₹2 Crore for registered FPOs', kn: 'ಎಫ್‌ಪಿಒಗಳಿಗೆ ₹2 ಕೋಟಿಯವರೆಗೆ ಕ್ರೆಡಿಟ್ ಗ್ಯಾರಂಟಿ ಕವರ್', hi: 'FPO के लिए ₹2 करोड़ तक का क्रेडिट गारंटी कवर' },
      { en: 'Custom Hiring Centers (CHC) 40-50% capital subsidy', kn: 'ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಬಾಡಿಗೆ ಕೇಂದ್ರಕ್ಕೆ 40-50% ಬಂಡವಾಳ ಸಬ್ಸಿಡಿ', hi: 'कस्टम हायरिंग सेंटर पर 40-50% पूंजीगत सब्सिडी' }
    ],
    bankPartners: ['NABARD', 'SIDBI', 'Karnataka State Co-operative Apex Bank'],
    applyUrl: 'https://www.nabard.org/'
  }
];

// ============================================================
// 6. TECHNICAL SUPPORT, ADVISORY SERVICES & RSK/KVK DIRECTORY
// ============================================================
export const agriAdvisoryAndCenters = [
  {
    type: 'RSK',
    img: '/schemes/rsk-network.jpg',
    title: { en: 'Raitha Samparka Kendra (RSK) Network', kn: 'ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಜಾಲ', hi: 'रायथा संपर्क केंद्र (RSK) नेटवर्क' },
    desc: { en: 'Over 745+ RSKs across all taluks providing subsidized seeds, soil sample collection, fertilizers, and pest management advisory.', kn: 'ರಾಜ್ಯದ ಎಲ್ಲಾ ತಾಲೂಕುಗಳಲ್ಲಿ 745+ ಆರ್‌ಎಸ್‌ಕೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದು ರಿಯಾಯಿತಿ ಬೀಜ, ಮಣ್ಣು ಪರೀಕ್ಷೆ ಹಾಗೂ ರೋಗ ನಿಯಂತ್ರಣ ಮಾಹಿತಿ ನೀಡುತ್ತವೆ.', hi: 'कर्नाटक की सभी तहसीलों में 745+ केंद्र जहां सब्सिडी वाले बीज, उर्वरक और कृषि सलाह मिलती है।' },
    contact: 'Kisan Call Centre Toll-Free: 1800-180-1551 / 080-22212804',
    actionText: { en: 'Locate Nearest RSK', kn: 'ಹತ್ತಿರದ RSK ಪತ್ತೆಹಚ್ಚಿ', hi: 'निकटतम RSK खोजें' },
    link: 'https://raitamitra.karnataka.gov.in/'
  },
  {
    type: 'KVK',
    img: '/schemes/kvk-centers.jpg',
    title: { en: 'Krishi Vigyan Kendras (ICAR - KVKs)', kn: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಗಳು (KVK)', hi: 'कृषि विज्ञान केंद्र (KVK)' },
    desc: { en: '33+ ICAR-KVKs in Karnataka conducting Krishi Melas, live field demonstrations, drone training, and certified seed production workshops.', kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ 33+ ಕೆವಿಕೆಗಳು ಕೃಷಿ ಮೇಳ, ಡ್ರೋನ್ ತರಬೇತಿ, ಸುಧಾರಿತ ತಳಿಗಳ ಪ್ರದರ್ಶನ ಹಾಗೂ ಕಾರ್ಯಾಗಾರಗಳನ್ನು ಆಯೋಜಿಸುತ್ತವೆ.', hi: 'कर्नाटक में 33+ केंद्र जो कृषि मेला, ड्रोन प्रशिक्षण और उन्नत तकनीकों का लाइव प्रदर्शन करते हैं।' },
    contact: 'UAS Bengaluru: 080-23330153 | UAS Dharwad: 0836-2448321',
    actionText: { en: 'View Krishi Mela Calendar', kn: 'ಕೃಷಿ ಮೇಳ ವೇಳಾಪಟ್ಟಿ', hi: 'कृषि मेला कैलेंडर' },
    link: 'https://kvk.icar.gov.in/'
  },
  {
    type: 'SoilCard',
    img: '/schemes/soil-health-card.jpg',
    title: { en: 'Digital Soil Health Portal & Testing Labs', kn: 'ಡಿಜಿಟಲ್ ಮಣ್ಣು ಪರೀಕ್ಷೆ & ಪ್ರಯೋಗಾಲಯ', hi: 'डिजिटल मृदा स्वास्थ्य और प्रयोगशाला' },
    desc: { en: 'Access your parcel-wise Soil Health Card, get micro-nutrient recommendations, and find the nearest government testing lab.', kn: 'ನಿಮ್ಮ ಸರ್ವೆ ನಂಬರ್‌ನ ಮಣ್ಣಿನ ಪರೀಕ್ಷಾ ವರದಿ ಪರಿಶೀಲಿಸಿ ಹಾಗೂ ಹತ್ತಿರದ ಜಿಲ್ಲಾ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಕೇಂದ್ರದ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.', hi: 'अपने खेत का मृदा स्वास्थ्य कार्ड डाउनलोड करें और अनुशंसित उर्वरक मात्रा जानें।' },
    contact: 'Helpline: 011-23381012',
    actionText: { en: 'Download Soil Card', kn: 'ಮಣ್ಣಿನ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್', hi: 'सॉइल कार्ड डाउनलोड' },
    link: 'https://soilhealth.dac.gov.in/'
  },
  {
    type: 'WeatherAlert',
    img: '/schemes/varuna-mitra.jpg',
    title: { en: 'KSNDMC Varuna Mitra Weather & Agromet Advisory', kn: 'ವರುಣ ಮಿತ್ರ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ (KSNDMC)', hi: 'वरुण मित्र मौसम एवं कृषि सलाह' },
    desc: { en: 'Gram Panchayat level rain forecasts, drought alerts, and crop-specific advisory updated every 15 minutes by KSNDMC.', kn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಮಟ್ಟದ ಮಳೆ ಮುನ್ಸೂಚನೆ, ಬರ ಎಚ್ಚರಿಕೆ ಹಾಗೂ ಬೆಳೆವಾರು ಹವಾಮಾನ ಸಲಹೆಗಳನ್ನು 24x7 ಪಡೆಯಿರಿ.', hi: 'ग्राम पंचायत स्तर पर वर्षा पूर्वानुमान और सूखा अलर्ट 24x7 उपलब्ध।' },
    contact: 'Varuna Mitra 24x7 Helpline: 9243345433',
    actionText: { en: 'Call Varuna Mitra 24x7', kn: 'ವರುಣ ಮಿತ್ರ ಕರೆ ಮಾಡಿ', hi: 'वरुण मित्र से जुड़ें' },
    link: 'https://ksndmc.karnataka.gov.in/'
  }
];

// ============================================================
// 7. SUCCESS STORIES & IMPACT DATA
// ============================================================
export const schemesSuccessStories = [
  {
    id: 1,
    name: 'Basavaraj Shivappa Patil',
    village: 'Sindhanur, Raichur District',
    scheme: 'PM-KUSUM Solar Pump & Drip Irrigation',
    benefitReceived: 'Installed 5HP Solar Pump with 60% subsidy (₹1.85 Lakh saved) + Drip Irrigation',
    quote: {
      en: 'Earlier I spent ₹35,000 every season on diesel for borewell irrigation. With PM-KUSUM solar pump and drip, my paddy and chilli yield increased by 28% with zero electricity cost.',
      kn: 'ಮೊದಲು ಪ್ರತಿ ಋತುವಿನಲ್ಲಿ ಬೋರ್‌ವೆಲ್ ಡೀಸೆಲ್‌ಗಾಗಿ ₹35,000 ಖರ್ಚಾಗುತ್ತಿತ್ತು. ಸೋಲಾರ್ ಪಂಪ್ ಅಳವಡಿಸಿದ ನಂತರ ವಿದ್ಯುತ್ ಬಿಲ್ ಶೂನ್ಯವಾಗಿದ್ದು, ಮೆಣಸಿನಕಾಯಿ ಇಳುವರಿ ಶೇ 28% ಹೆಚ್ಚಾಗಿದೆ.',
      hi: 'पहले बोरवेल के डीजल पर हर सीजन ₹35,000 खर्च होते थे। कुसुम सोलर पंप के बाद बिजली खर्च शून्य और मिर्च की पैदावार में 28% की वृद्धि हुई।'
    },
    image: '/testimonials/basavaraj-kusum.png',
    bannerImage: '/testimonials/basavaraj-kusum.png',
    stat: '+28% Crop Yield'
  },
  {
    id: 2,
    name: 'Gangamma Manjunath',
    village: 'Holalkere, Chitradurga District',
    scheme: 'Raitha Siri (Millet Subsidy) & Krishi Honda',
    benefitReceived: '₹20,000 Millet DBT incentive + 90% Subsidized Farm Pond (Krishi Honda)',
    quote: {
      en: 'Constructing Krishi Honda helped me harvest rainwater during dry spells. Cultivating Foxtail millet (Navane) fetched me ₹4,200/quintal in APMC alongside the ₹10,000/ha subsidy.',
      kn: 'ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಿಸಿದ್ದರಿಂದ ಮಳೆ ಕೈಕೊಟ್ಟಾಗಲೂ ನವಣೆ ಬೆಳೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಸಾಧ್ಯವಾಯಿತು. ಎಪಿಎಂಸಿಯಲ್ಲಿ ಉತ್ತಮ ಧಾರಣೆ ಜತೆಗೆ ಸರ್ಕಾರದ ಪ್ರೋತ್ಸಾಹಧನವೂ ಖಾತೆಗೆ ಜಮೆಯಾಯಿತು.',
      hi: 'कृषि होंडा (खेत तालाब) ने सूखे के समय फसल को बचाया। नवणे बाजरे की खेती से अच्छा मुनाफा और ₹10,000/हेक्टेयर की सब्सिडी मिली।'
    },
    image: '/testimonials/gangamma-krishi-honda.png',
    bannerImage: '/testimonials/gangamma-krishi-honda.png',
    stat: '₹1.4L Net Income'
  },
  {
    id: 3,
    name: 'Sahyadri Organic Farmers FPO',
    village: 'Mudigere, Chikkamagaluru District',
    scheme: 'Formation of 10,000 FPOs & AIF Cold Storage',
    benefitReceived: '₹15 Lakh Equity Grant + ₹1.2 Crore AIF Term Loan with 3% Interest Subvention',
    quote: {
      en: 'Our 420-member FPO set up a primary spice and coffee grading unit. Farmers now get 18% higher spot prices by eliminating local middlemen completely.',
      kn: 'ನಮ್ಮ 420 ಸದಸ್ಯರ ಎಫ್‌ಪಿಒ ಕಾಫಿ ಹಾಗೂ ಸಂಬಾರ ಪದಾರ್ಥಗಳ ಗ್ರೇಡಿಂಗ್ ಘಟಕ ಸ್ಥಾಪಿಸಿದೆ. ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ರೈತರಿಗೆ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಶೇ 18% ಹೆಚ್ಚಿನ ಬೆಲೆ ಸಿಗುತ್ತಿದೆ.',
      hi: 'हमारे 420 किसान सदस्यों वाले FPO ने ग्रेडिंग यूनिट लगाई। बिचौलियों को हटाकर किसानों को 18% अधिक मूल्य मिल रहा है।'
    },
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    stat: '420+ Farmers Empowered'
  }
];

export const schemesImpactStats = {
  totalBeneficiaries: '54.2 Lakh',
  totalDisbursed: '₹18,450 Cr',
  solarPumpsInstalled: '42,800+',
  insuredLandArea: '36.5 Lakh Hectares',
  activeFPOs: '850+ Registered'
};

// ============================================================
// 8. GRIEVANCE REDRESSAL & FAQS
// ============================================================
export const schemesFaqs = [
  {
    q: { en: 'Why is my PM-Kisan instalment delayed or showing "Aadhaar Not Seeded"?', kn: 'ನನ್ನ ಪಿಎಂ-ಕಿಸಾನ್ ಕಂತು ಏಕೆ ಬಂದಿಲ್ಲ ಅಥವಾ "Aadhaar Not Seeded" ಎಂದೇಕೆ ತೋರಿಸುತ್ತಿದೆ?', hi: 'मेरी पीएम-किसान की किस्त क्यों रुकी है या "Aadhaar Not Seeded" क्यों दिख रहा है?' },
    a: {
      en: 'NPCI bank account mapping and e-KYC are mandatory. Visit your bank branch or Post Office to enable Aadhaar Seeding / DBT flag, and complete face/OTP e-KYC on the PM-Kisan portal.',
      kn: 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ ಜೋಡಣೆ (NPCI Mapping) ಮತ್ತು ಇ-ಕೆವೈಸಿ ಕಡ್ಡಾಯವಾಗಿದೆ. ಹತ್ತಿರದ ಅಂಚೆ ಕಚೇರಿ ಅಥವಾ ಬ್ಯಾಂಕ್‌ಗೆ ಭೇಟಿ ನೀಡಿ ಡಿಬಿಟಿ ಸಕ್ರಿಯಗೊಳಿಸಿ.',
      hi: 'बैंक खाते में एनपीसीआई आधार सीडिंग और ई-केवाईसी अनिवार्य है। अपने बैंक या डाकघर जाकर डीबीटी सक्षम कराएं।'
    },
    category: 'Payment Delays'
  },
  {
    q: { en: 'How do I claim crop damage under PMFBY if heavy rains wash away my crops?', kn: 'ಅಕಾಲಿಕ ಮಳೆಯಿಂದ ಬೆಳೆ ಹಾನಿಯಾದರೆ ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆಯಡಿ ಪರಿಹಾರ ಪಡೆಯುವುದು ಹೇಗೆ?', hi: 'अतिवृष्टि से फसल खराब होने पर पीएम फसल बीमा के तहत दावा कैसे करें?' },
    a: {
      en: 'Intimate crop loss within 72 hours of occurrence using the Crop Insurance App or by calling 1800-180-1551 with policy/Aadhaar details. A joint survey will be conducted in 7 days.',
      kn: 'ಬೆಳೆ ಹಾನಿಯಾದ 72 ಗಂಟೆಯೊಳಗೆ ಕ್ರಾಪ್ ಇನ್ಶುರೆನ್ಸ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ 1800-180-1551 ಗೆ ಕರೆ ಮಾಡಿ ದೂರು ದಾಖಲಿಸಿ. ಅಧಿಕಾರಿಗಳು 7 ದಿನದಲ್ಲಿ ಸರ್ವೇ ಮಾಡುತ್ತಾರೆ.',
      hi: 'नुकसान के 72 घंटे के भीतर क्रॉप इंश्योरेंस ऐप पर फोटो अपलोड करें या 1800-180-1551 पर कॉल करें। 7 दिनों में सर्वेक्षण होगा।'
    },
    category: 'Insurance Claims'
  },
  {
    q: { en: 'Can tenant farmers and sharecroppers apply for Kisan Credit Card (KCC)?', kn: 'ಗೇಣಿದಾರ ರೈತರು ಹಾಗೂ ಜಮೀನು ಬಾಡಿಗೆ ಪಡೆದವರು ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC) ಪಡೆಯಬಹುದೇ?', hi: 'क्या बटाईदार और काश्तकार किसान भी केसीसी लोन ले सकते हैं?' },
    a: {
      en: 'Yes. Tenant farmers and oral lessees can avail KCC loans up to ₹50,000 - ₹1,60,000 through Joint Liability Groups (JLGs) without requiring land ownership papers.',
      kn: 'ಹೌದು. ಗೇಣಿದಾರರು ಜಂಟಿ ಬಾಧ್ಯತಾ ಸಂಘಗಳ (JLG) ಮೂಲಕ ಯಾವುದೇ ಭೂ ಒಡೆತನದ ದಾಖಲೆ ಇಲ್ಲದೆ ₹50,000 ದಿಂದ ₹1.60 ಲಕ್ಷದವರೆಗೆ ಕೆಸಿಸಿ ಸಾಲ ಪಡೆಯಬಹುದು.',
      hi: 'हां, बटाईदार किसान संयुक्त देयता समूह (JLG) बनाकर बिना भूमि दस्तावेजों के ₹1.60 लाख तक का केसीसी ले सकते हैं।'
    },
    category: 'Eligibility'
  },
  {
    q: { en: 'What should I do if my subsidy application is rejected at the Taluk level?', kn: 'ತಾಲೂಕು ಮಟ್ಟದಲ್ಲಿ ಸಬ್ಸಿಡಿ ಅರ್ಜಿ ತಿರಸ್ಕೃತಗೊಂಡರೆ ಏನು ಮಾಡಬೇಕು?', hi: 'यदि तहसील स्तर पर सब्सिडी आवेदन खारिज हो जाए तो क्या करें?' },
    a: {
      en: 'Check the specific rejection reason on the Seva Sindhu / FRUITS portal. You can submit an appeal to the Joint Director of Agriculture (JDA) or register a grievance on Janaspandana (1902).',
      kn: 'ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತಿರಸ್ಕಾರದ ಕಾರಣ ಪರಿಶೀಲಿಸಿ. ದಾಖಲೆಗಳನ್ನು ಸರಿಪಡಿಸಿ ಜಿಲ್ಲಾ ಕೃಷಿ ಜಂಟಿ ನಿರ್ದೇಶಕರಿಗೆ (JDA) ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಿ ಅಥವಾ ಜನಸ್ಪಂದನ 1902 ಗೆ ದೂರು ನೀಡಿ.',
      hi: 'सेवा सिंधु पोर्टल पर अस्वीकृति का कारण देखें। सुधरे दस्तावेजों के साथ जनस्पंदना (1902) पर शिकायत दर्ज करें।'
    },
    category: 'Rejections & Grievances'
  }
];

export const grievanceHelpdesks = [
  {
    name: 'Janaspandana Karnataka (Integrated Public Grievance)',
    tollFree: '1902 / 080-22032582',
    portalUrl: 'https://ipgrs.karnataka.gov.in/',
    timings: '24x7 All Days',
    type: 'State'
  },
  {
    name: 'Central CPGRAMS Grievance Portal (GoI)',
    tollFree: '1800-11-5501',
    portalUrl: 'https://pgportal.gov.in/',
    timings: '9:00 AM - 6:00 PM (Mon-Sat)',
    type: 'Central'
  },
  {
    name: 'Kisan Call Centre (Agriculture Dept)',
    tollFree: '1800-180-1551',
    portalUrl: 'https://daccrowd.dac.gov.in/',
    timings: '6:00 AM - 10:00 PM (All 7 Days, 22 Languages)',
    type: 'AgriSpecial'
  }
];
