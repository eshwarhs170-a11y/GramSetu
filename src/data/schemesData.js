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
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1612392062631-94cc28c80e53?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1592837330752-6a68393b4822?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    badge: { en: 'SHG Loan @ 0%', kn: 'ಶೂನ್ಯ ಬಡ್ಡಿ ಸಾಲ', hi: '0% ब्याज ऋण' },
    badgeClass: 'badge-info',
    ministry: { en: 'Women & Child Development Dept., Karnataka', kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'महिला एवं बाल विकास विभाग' },
    applyLink: 'https://dwcd.karnataka.gov.in/',
    trackerUrl: 'https://dwcd.karnataka.gov.in/'
  }
];

// ============================================================
// 5. FINANCIAL ASSISTANCE, CROP LOANS & INSURANCE CALCULATORS
// ============================================================
export const agriFinancialAssistance = [
  {
    id: 'kcc-crop-loan',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&q=80',
    title: { en: 'Raitha Samparka Kendra (RSK) Network', kn: 'ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಜಾಲ', hi: 'रायथा संपर्क केंद्र (RSK) नेटवर्क' },
    desc: { en: 'Over 745+ RSKs across all taluks providing subsidized seeds, soil sample collection, fertilizers, and pest management advisory.', kn: 'ರಾಜ್ಯದ ಎಲ್ಲಾ ತಾಲೂಕುಗಳಲ್ಲಿ 745+ ಆರ್‌ಎಸ್‌ಕೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದು ರಿಯಾಯಿತಿ ಬೀಜ, ಮಣ್ಣು ಪರೀಕ್ಷೆ ಹಾಗೂ ರೋಗ ನಿಯಂತ್ರಣ ಮಾಹಿತಿ ನೀಡುತ್ತವೆ.', hi: 'कर्नाटक की सभी तहसीलों में 745+ केंद्र जहां सब्सिडी वाले बीज, उर्वरक और कृषि सलाह मिलती है।' },
    contact: 'Kisan Call Centre Toll-Free: 1800-180-1551 / 080-22212804',
    actionText: { en: 'Locate Nearest RSK', kn: 'ಹತ್ತಿರದ RSK ಪತ್ತೆಹಚ್ಚಿ', hi: 'निकटतम RSK खोजें' },
    link: 'https://raitamitra.karnataka.gov.in/'
  },
  {
    type: 'KVK',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
    title: { en: 'Krishi Vigyan Kendras (ICAR - KVKs)', kn: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಗಳು (KVK)', hi: 'कृषि विज्ञान केंद्र (KVK)' },
    desc: { en: '33+ ICAR-KVKs in Karnataka conducting Krishi Melas, live field demonstrations, drone training, and certified seed production workshops.', kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ 33+ ಕೆವಿಕೆಗಳು ಕೃಷಿ ಮೇಳ, ಡ್ರೋನ್ ತರಬೇತಿ, ಸುಧಾರಿತ ತಳಿಗಳ ಪ್ರದರ್ಶನ ಹಾಗೂ ಕಾರ್ಯಾಗಾರಗಳನ್ನು ಆಯೋಜಿಸುತ್ತವೆ.', hi: 'कर्नाटक में 33+ केंद्र जो कृषि मेला, ड्रोन प्रशिक्षण और उन्नत तकनीकों का लाइव प्रदर्शन करते हैं।' },
    contact: 'UAS Bengaluru: 080-23330153 | UAS Dharwad: 0836-2448321',
    actionText: { en: 'View Krishi Mela Calendar', kn: 'ಕೃಷಿ ಮೇಳ ವೇಳಾಪಟ್ಟಿ', hi: 'कृषि मेला कैलेंडर' },
    link: 'https://kvk.icar.gov.in/'
  },
  {
    type: 'SoilCard',
    img: 'https://images.unsplash.com/photo-1627920769852-5c21f5fb3d0f?w=600&q=80',
    title: { en: 'Digital Soil Health Portal & Testing Labs', kn: 'ಡಿಜಿಟಲ್ ಮಣ್ಣು ಪರೀಕ್ಷೆ & ಪ್ರಯೋಗಾಲಯ', hi: 'डिजिटल मृदा स्वास्थ्य और प्रयोगशाला' },
    desc: { en: 'Access your parcel-wise Soil Health Card, get micro-nutrient recommendations, and find the nearest government testing lab.', kn: 'ನಿಮ್ಮ ಸರ್ವೆ ನಂಬರ್‌ನ ಮಣ್ಣಿನ ಪರೀಕ್ಷಾ ವರದಿ ಪರಿಶೀಲಿಸಿ ಹಾಗೂ ಹತ್ತಿರದ ಜಿಲ್ಲಾ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಕೇಂದ್ರದ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.', hi: 'अपने खेत का मृदा स्वास्थ्य कार्ड डाउनलोड करें और अनुशंसित उर्वरक मात्रा जानें।' },
    contact: 'Helpline: 011-23381012',
    actionText: { en: 'Download Soil Card', kn: 'ಮಣ್ಣಿನ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್', hi: 'सॉइल कार्ड डाउनलोड' },
    link: 'https://soilhealth.dac.gov.in/'
  },
  {
    type: 'WeatherAlert',
    img: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
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

export const kaScholarships = [
  {
    id: 'vidyasiri-scholarship',
    category: 'Scholarship',
    level: 'State',
    beneficiary: ['Students (Backward Classes)'],
    objective: 'Food & Accommodation',
    stage: 'College/Hostel',
    districtSpecific: ['All'],
    title: { en: 'Vidyasiri Food and Accommodation Scholarship', kn: 'ವಿದ್ಯಾಸಿರಿ ಊಟ ಮತ್ತು ವಸತಿ ವಿದ್ಯಾರ್ಥಿವೇತನ', hi: 'विद्यासिरी भोजन और आवास छात्रवृत्ति' },
    desc: { 
      en: 'Provides boarding and lodging assistance for students from backward classes studying in post-matric courses who did not get hostel admission.', 
      kn: 'ವಿದ್ಯಾರ್ಥಿನಿಲಯಗಳಲ್ಲಿ ಪ್ರವೇಶ ಪಡೆಯದ ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಊಟ ಮತ್ತು ವಸತಿ ಸಹಾಯ ಒದಗಿಸುವ ಯೋಜನೆ.', 
      hi: 'पिछड़े वर्गों के छात्रों के लिए भोजन और आवास सहायता।' 
    },
    eligibility: {
      en: 'Students belonging to backward classes in Karnataka pursuing post-matric courses without hostel accommodation.',
      kn: 'ಹಾಸ್ಟೆಲ್ ಸೌಲಭ್ಯ ಪಡೆಯದ ಕರ್ನಾಟಕದ ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'कर्नाटक में पिछड़े वर्गों के छात्र जिन्हें हॉस्टल नहीं मिला है।'
    },
    exclusions: {
      en: 'Students already residing in government/aided hostels.',
      kn: 'ಈಗಾಗಲೇ ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್‌ಗಳಲ್ಲಿ ವಾಸಿಸುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'सरकारी हॉस्टल में रहने वाले छात्र।'
    },
    benefits: {
      subsidyPercent: 'Monthly Stipend',
      maxLimit: '₹1,500 / month (10 months)',
      mode: 'DBT to Aadhaar linked bank account',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar, Caste/Income Certificate, College Admission Proof, Bank Details.',
      kn: 'ಆಧಾರ್, ಜಾತಿ/ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಕಾಲೇಜು ಪ್ರವೇಶ ಪುರಾವೆ, ಬ್ಯಾಂಕ್ ವಿವರಗಳು.',
      hi: 'आधार, जाति/आय प्रमाण पत्र, कॉलेज प्रवेश प्रमाण, बैंक विवरण।'
    },
    processSteps: [
      { step: 1, title: { en: 'Online Application', kn: 'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ', hi: 'ऑनलाइन आवेदन' }, desc: { en: 'Apply through State Scholarship Portal (SSP).', kn: 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP) ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'SSP पोर्टल के माध्यम से आवेदन करें।' } },
      { step: 2, title: { en: 'Verification', kn: 'ಪರಿಶೀಲನೆ', hi: 'सत्यापन' }, desc: { en: 'Document verification by college and department officials.', kn: 'ಕಾಲೇಜು ಮತ್ತು ಇಲಾಖೆ ಅಧಿಕಾರಿಗಳಿಂದ ದಾಖಲೆ ಪರಿಶೀಲನೆ.', hi: 'कॉलेज और विभाग द्वारा दस्तावेज़ सत्यापन।' } },
      { step: 3, title: { en: 'Approval', kn: 'ಅನುಮೋದನೆ', hi: 'मंजूरी' }, desc: { en: 'Final approval from Backward Classes Welfare Department.', kn: 'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆಯಿಂದ ಅಂತಿಮ ಅನುಮೋದನೆ.', hi: 'अंतिम मंजूरी।' } },
      { step: 4, title: { en: 'Fund Disbursement', kn: 'ಹಣ ಬಿಡುಗಡೆ', hi: 'फंड वितरण' }, desc: { en: 'Amount credited directly to bank account via DBT.', kn: 'ಹಣ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.', hi: 'सीधे बैंक खाते में ट्रांसफर।' } }
    ],
    timeline: 'Application deadline: August 31, 2026',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    badge: { en: 'Student Aid', kn: 'ವಿದ್ಯಾರ್ಥಿ ನೆರವು', hi: 'छात्र सहायता' },
    badgeClass: 'badge-info',
    ministry: { en: 'Dept of Backward Classes Welfare', kn: 'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'पिछड़ा वर्ग कल्याण विभाग' },
    applyLink: 'https://ssp.postmatric.karnataka.gov.in/',
    trackerUrl: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'pre-matric-st',
    category: 'Scholarship',
    level: 'State',
    beneficiary: ['ST Students (Class 9-10)'],
    objective: 'Education Support',
    stage: 'School',
    districtSpecific: ['All'],
    title: { en: 'Pre-Matric Scholarships for ST Students', kn: 'ಪರಿಶಿಷ್ಟ ಪಂಗಡದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮೆಟ್ರಿಕ್-ಪೂರ್ವ ವಿದ್ಯಾರ್ಥಿವೇತನ', hi: 'एसटी छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति' },
    desc: { 
      en: 'Financial assistance for Scheduled Tribe students studying in classes 9 and 10 to reduce dropout rates and support education.', 
      kn: '೯ ಮತ್ತು ೧೦ನೇ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿರುವ ಪರಿಶಿಷ್ಟ ಪಂಗಡದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆರ್ಥಿಕ ನೆರವು.', 
      hi: '9वीं और 10वीं कक्षा में पढ़ने वाले एसटी छात्रों के लिए वित्तीय सहायता।' 
    },
    eligibility: {
      en: 'ST students studying in Class 9-10 in recognized schools with family income below ₹2 Lakh.',
      kn: 'ಕುಟುಂಬದ ಆದಾಯ ₹೨ ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಇರುವ ೯-೧೦ನೇ ತರಗತಿಯ ಪರಿಶಿಷ್ಟ ಪಂಗಡದ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: 'कक्षा 9-10 में पढ़ने वाले एसटी छात्र, पारिवारिक आय ₹2 लाख से कम।'
    },
    exclusions: {
      en: 'Students studying in unrecognised schools or receiving other state scholarships.',
      kn: 'ಮಾನ್ಯತೆ ಪಡೆಯದ ಶಾಲೆಗಳಲ್ಲಿ ಓದುತ್ತಿರುವವರು.',
      hi: 'गैर-मान्यता प्राप्त स्कूलों के छात्र।'
    },
    benefits: {
      subsidyPercent: 'Annual Grant',
      maxLimit: '₹2,250 to ₹3,000 / year (plus adhoc grant)',
      mode: 'DBT',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Aadhaar, Caste Certificate, Income Certificate, School ID.',
      kn: 'ಆಧಾರ್, ಜಾತಿ, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಶಾಲಾ ಗುರುತಿನ ಚೀಟಿ.',
      hi: 'आधार, जाति, आय प्रमाण पत्र, स्कूल आईडी।'
    },
    processSteps: [
      { step: 1, title: { en: 'Apply Online', kn: 'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ', hi: 'ऑनलाइन आवेदन' }, desc: { en: 'Apply via SSP portal.', kn: 'SSP ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', hi: 'SSP पोर्टल के माध्यम से आवेदन करें।' } },
      { step: 2, title: { en: 'School Verification', kn: 'ಶಾಲಾ ಪರಿಶೀಲನೆ', hi: 'स्कूल सत्यापन' }, desc: { en: 'Headmaster verifies student details and attendance.', kn: 'ಮುಖ್ಯೋಪಾಧ್ಯಾಯರಿಂದ ಪರಿಶೀಲನೆ.', hi: 'हेडमास्टर द्वारा सत्यापन।' } },
      { step: 3, title: { en: 'Department Approval', kn: 'ಇಲಾಖೆ ಅನುಮೋದನೆ', hi: 'विभाग मंजूरी' }, desc: { en: 'Tribal Welfare department approves the list.', kn: 'ಬುಡಕಟ್ಟು ಕಲ್ಯಾಣ ಇಲಾಖೆಯಿಂದ ಅನುಮೋದನೆ.', hi: 'आदिवासी कल्याण विभाग द्वारा मंजूरी।' } },
      { step: 4, title: { en: 'Disbursement', kn: 'ಹಣ ಬಿಡುಗಡೆ', hi: 'वितरण' }, desc: { en: 'Credited directly to student bank account.', kn: 'ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.', hi: 'छात्र के बैंक खाते में जमा।' } }
    ],
    timeline: 'Application deadline: September 30, 2026',
    img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
    badge: { en: 'Pre-Matric', kn: 'ಮೆಟ್ರಿಕ್ ಪೂರ್ವ', hi: 'प्री-मैट्रिक' },
    badgeClass: 'badge-primary',
    ministry: { en: 'Tribal Welfare Department', kn: 'ಬುಡಕಟ್ಟು ಕಲ್ಯಾಣ ಇಲಾಖೆ', hi: 'आदिवासी कल्याण विभाग' },
    applyLink: 'https://ssp.postmatric.karnataka.gov.in/',
    trackerUrl: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'vidyadhan-scholarship',
    category: 'Scholarship',
    level: 'NGO/Private',
    beneficiary: ['Class 11 & 12 Students'],
    objective: 'Higher Education',
    stage: 'PUC/Class 11-12',
    districtSpecific: ['All'],
    title: { en: 'Vidyadhan Scholarship Program', kn: 'ವಿದ್ಯಾಧನ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಕಾರ್ಯಕ್ರಮ', hi: 'विद्याधन छात्रवृत्ति कार्यक्रम' },
    desc: { 
      en: 'Provided by Sarojini Damodaran Foundation for economically backward students who have completed Class 10 to pursue Class 11 & 12.', 
      kn: '೧೦ನೇ ತರಗತಿ ಪಾಸಾದ ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ೧೧ ಮತ್ತು ೧೨ನೇ ತರಗತಿ ಓದಲು ನೆರವು.', 
      hi: '10वीं पास आर्थिक रूप से पिछड़े छात्रों को 11वीं और 12वीं पढ़ने के लिए सहायता।' 
    },
    eligibility: {
      en: 'Completed Class 10 with 90% marks (85% for disabled) and family income below ₹2 Lakh.',
      kn: '೧೦ನೇ ತರಗತಿಯಲ್ಲಿ ಶೇ.೯೦ ಅಂಕಗಳೊಂದಿಗೆ ಉತ್ತೀರ್ಣರಾದವರು, ಕುಟುಂಬದ ಆದಾಯ ₹೨ ಲಕ್ಷದೊಳಗೆ.',
      hi: '90% अंकों के साथ 10वीं पास, आय ₹2 लाख से कम।'
    },
    exclusions: {
      en: 'Students not meeting the merit criteria or income limit.',
      kn: 'ಅರ್ಹತಾ ಮಾನದಂಡ ತಲುಪದವರು.',
      hi: 'मेरिट और आय मानदंड को पूरा न करने वाले छात्र।'
    },
    benefits: {
      subsidyPercent: 'Financial Grant',
      maxLimit: '₹10,000 / year (Class 11 & 12)',
      mode: 'Bank Transfer',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Class 10 Marksheet, Income Certificate, Passport Size Photo.',
      kn: '೧೦ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿ, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಫೋಟೋ.',
      hi: '10वीं की मार्कशीट, आय प्रमाण पत्र, फोटो।'
    },
    processSteps: [
      { step: 1, title: { en: 'Apply Online', kn: 'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ', hi: 'ऑनलाइन आवेदन' }, desc: { en: 'Register on Vidyadhan portal.', kn: 'ವಿದ್ಯಾಧನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ.', hi: 'विद्याधन पोर्टल पर रजिस्टर करें।' } },
      { step: 2, title: { en: 'Shortlisting', kn: 'ಶಾರ್ಟ್‌ಲಿಸ್ಟಿಂಗ್', hi: 'शॉर्टलिस्टिंग' }, desc: { en: 'Candidates shortlisted based on academic merit and income.', kn: 'ಅಂಕಗಳ ಆಧಾರದ ಮೇಲೆ ಆಯ್ಕೆ.', hi: 'मेरिट के आधार पर शॉर्टलिस्टिंग।' } },
      { step: 3, title: { en: 'Interview', kn: 'ಸಂದರ್ಶನ', hi: 'साक्षात्कार' }, desc: { en: 'Online or in-person interview.', kn: 'ಸಂದರ್ಶನ ಪ್ರಕ್ರಿಯೆ.', hi: 'इंटरव्यू प्रक्रिया।' } },
      { step: 4, title: { en: 'Selection', kn: 'ಆಯ್ಕೆ', hi: 'चयन' }, desc: { en: 'Final selection and fund disbursement.', kn: 'ಅಂತಿಮ ಆಯ್ಕೆ ಮತ್ತು ಹಣ ಬಿಡುಗಡೆ.', hi: 'अंतिम चयन और फंड वितरण।' } }
    ],
    timeline: 'Ongoing / Refer Official Website',
    img: 'https://images.unsplash.com/photo-1546410531-ea4cea477149?w=800&q=80',
    badge: { en: 'Merit Scholarship', kn: 'ಮೆರಿಟ್ ಸ್ಕಾಲರ್‌ಶಿಪ್', hi: 'मेरिट छात्रवृत्ति' },
    badgeClass: 'badge-warning',
    ministry: { en: 'Sarojini Damodaran Foundation', kn: 'ಸರೋಜಿನಿ ದಾಮೋದರನ್ ಫೌಂಡೇಶನ್', hi: 'सरोजिनी दामोदरन फाउंडेशन' },
    applyLink: 'https://www.vidyadhan.org/apply',
    trackerUrl: 'https://www.vidyadhan.org/'
  },
  {
    id: 'b4s-college-scholarship',
    category: 'Scholarship',
    level: 'NGO/Private',
    beneficiary: ['College/UG Students'],
    objective: 'Higher Education Fee Waiver',
    stage: 'Undergraduate',
    districtSpecific: ['All'],
    title: { en: 'Buddy4Study College Admission Scholarship', kn: 'ಬಡ್ಡಿ4ಸ್ಟಡಿ ಕಾಲೇಜು ಪ್ರವೇಶ ವಿದ್ಯಾರ್ಥಿವೇತನ', hi: 'Buddy4Study कॉलेज एडमिशन छात्रवृत्ति' },
    desc: { 
      en: 'A special program by Buddy4Study offering tuition fee waivers and scholarships for Class 12 passed students seeking admission to partner colleges.', 
      kn: '೧೨ನೇ ತರಗತಿ ಪಾಸಾದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕಾಲೇಜು ಪ್ರವೇಶಕ್ಕಾಗಿ ಬಡ್ಡಿ4ಸ್ಟಡಿ ನೀಡುವ ವಿದ್ಯಾರ್ಥಿವೇತನ.', 
      hi: '12वीं पास छात्रों के लिए कॉलेज एडमिशन के लिए Buddy4Study छात्रवृत्ति।' 
    },
    eligibility: {
      en: 'Class 12 passed students looking for UG admissions in 2026-27 session.',
      kn: '೨೦೨೬-೨೭ ಸಾಲಿನಲ್ಲಿ ಪದವಿ ಪ್ರವೇಶ ಪಡೆಯಬಯಸುವ ೧೨ನೇ ತರಗತಿ ಪಾಸಾದ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      hi: '2026-27 में यूजी एडमिशन चाहने वाले 12वीं पास छात्र।'
    },
    exclusions: {
      en: 'Students already enrolled in non-partner institutions without applying.',
      kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸದೆ ಪ್ರವೇಶ ಪಡೆದವರು.',
      hi: 'बिना आवेदन किए प्रवेश लेने वाले छात्र।'
    },
    benefits: {
      subsidyPercent: 'Fee Waiver / Grant',
      maxLimit: 'Up to 100% Tuition Fee Waiver',
      mode: 'Direct to Institute / Bank',
      interestSubvention: 'N/A'
    },
    documents: {
      en: 'Class 12 Marksheet, ID Proof, Address Proof.',
      kn: '೧೨ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿ, ಗುರುತಿನ ಚೀಟಿ.',
      hi: '12वीं की मार्कशीट, आईडी प्रूफ।'
    },
    processSteps: [
      { step: 1, title: { en: 'Registration', kn: 'ನೋಂದಣಿ', hi: 'पंजीकरण' }, desc: { en: 'Register on Buddy4Study portal.', kn: 'ಬಡ್ಡಿ4ಸ್ಟಡಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ.', hi: 'Buddy4Study पोर्टल पर रजिस्टर करें।' } },
      { step: 2, title: { en: 'Counseling', kn: 'ಕೌನ್ಸೆಲಿಂಗ್', hi: 'काउंसलिंग' }, desc: { en: 'Attend counseling session for institute selection.', kn: 'ಕಾಲೇಜು ಆಯ್ಕೆಗಾಗಿ ಕೌನ್ಸೆಲಿಂಗ್.', hi: 'कॉलेज चयन के लिए काउंसलिंग।' } },
      { step: 3, title: { en: 'Admission', kn: 'ಪ್ರವೇಶ', hi: 'प्रवेश' }, desc: { en: 'Complete admission formalities.', kn: 'ಪ್ರವೇಶ ಪ್ರಕ್ರಿಯೆ ಪೂರ್ಣಗೊಳಿಸಿ.', hi: 'प्रवेश प्रक्रिया पूरी करें।' } },
      { step: 4, title: { en: 'Scholarship Award', kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಂಜೂರು', hi: 'छात्रवृत्ति पुरस्कार' }, desc: { en: 'Fee waiver applied to college tuition.', kn: 'ಕಾಲೇಜು ಶುಲ್ಕದಲ್ಲಿ ವಿನಾಯಿತಿ.', hi: 'कॉलेज ट्यूशन में छूट।' } }
    ],
    timeline: 'Application deadline: August 31, 2026',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    badge: { en: 'Fee Waiver', kn: 'ಶುಲ್ಕ ವಿನಾಯಿತಿ', hi: 'फीस छूट' },
    badgeClass: 'badge-success',
    ministry: { en: 'Buddy4Study Partners', kn: 'ಬಡ್ಡಿ4ಸ್ಟಡಿ ಪಾಲುದಾರರು', hi: 'Buddy4Study पार्टनर्स' },
    applyLink: 'https://www.buddy4study.com/',
    trackerUrl: 'https://www.buddy4study.com/'
  }
];
