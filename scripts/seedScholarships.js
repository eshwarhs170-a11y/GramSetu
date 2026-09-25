import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Firebase Config
const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API_KEY",
  authDomain: "gramsetu-ed75a.firebaseapp.com",
  projectId: "gramsetu-ed75a",
  storageBucket: "gramsetu-ed75a.firebasestorage.app",
  messagingSenderId: "190769157449",
  appId: "1:190769157449:web:84ff601639847a88a8f698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const scholarships = [
  {
    id: 'raitha-vidya-nidhi',
    titleEn: 'Mukhyamantri Raitha Vidya Nidhi (Farmers Children)',
    titleKn: 'ಮುಖ್ಯಮಂತ್ರಿ ರೈತ ವಿದ್ಯಾನಿಧಿ (ರೈತರ ಮಕ್ಕಳಿಗೆ)',
    classReqEn: 'Class 8th to PG / Professional',
    classReqKn: '೮ನೇ ತರಗತಿಯಿಂದ ಸ್ನಾತಕೋತ್ತರ / ವೃತ್ತಿಪರ',
    incomeLimitEn: 'Farmers with FRUITS ID',
    incomeLimitKn: 'ಫ್ರೂಟ್ಸ್ (FRUITS) ಐಡಿ ಹೊಂದಿರುವ ರೈತರು',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'lic-golden-jubilee',
    titleEn: 'LIC Golden Jubilee Scholarship',
    titleKn: 'ಎಲ್ಐಸಿ ಸುವರ್ಣ ಮಹೋತ್ಸವ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: '10th/12th Pass pursuing UG/Diploma',
    classReqKn: '೧೦ನೇ/೧೨ನೇ ಉತ್ತೀರ್ಣರಾಗಿರುವ ಪದವಿ/ಡಿಪ್ಲೊಮಾ ವಿದ್ಯಾರ್ಥಿಗಳು',
    incomeLimitEn: '₹2.5 Lakh/year',
    incomeLimitKn: '₹2.5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-12-31',
    openDate: null,
    link: 'https://licindia.in/'
  },
  {
    id: 'ssp-karnataka',
    titleEn: 'Karnataka SSW Scholarships (SC/ST/OBC/Farmers)',
    titleKn: 'ಕರ್ನಾಟಕ SSW ವಿದ್ಯಾರ್ಥಿವೇತನ (SC/ST/OBC/ರೈತರು)',
    classReqEn: '8th–12th / UG / PG',
    classReqKn: '೮ ರಿಂದ ೧೨ನೇ / ಪದವಿ / ಪಿಜಿ',
    incomeLimitEn: '₹2.5 Lakh/year',
    incomeLimitKn: '₹2.5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'bcwd-vidyasiri',
    titleEn: 'BCWD Vidyasiri (Food & Accommodation)',
    titleKn: 'ಬಿಸಿಡಬ್ಲ್ಯೂಡಿ ವಿದ್ಯಾಸಿರಿ (ಊಟ ಮತ್ತು ವಸತಿ)',
    classReqEn: 'Post-Matric (PUC/Degree/PG)',
    classReqKn: 'ಮೆಟ್ರಿಕ್ ನಂತರದ (PUC/ಪದವಿ/ಪಿಜಿ)',
    incomeLimitEn: '₹2.5 Lakh/year',
    incomeLimitKn: '₹2.5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-11-30',
    openDate: null,
    link: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'vidyadhan',
    titleEn: 'Vidyadhan Scholarship Program',
    titleKn: 'ವಿದ್ಯಾಧನ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಕಾರ್ಯಕ್ರಮ',
    classReqEn: '10th Pass pursuing 11th/12th',
    classReqKn: '೧೦ನೇ ಉತ್ತೀರ್ಣ (೧೧/೧೨ನೇ ತರಗತಿ)',
    incomeLimitEn: '₹2 Lakh/year',
    incomeLimitKn: '₹2 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-07-15',
    openDate: null,
    link: 'https://www.vidyadhan.org/'
  },
  {
    id: 'prabhuddha-overseas',
    titleEn: 'Prabhuddha Overseas Scholarship (SC/ST)',
    titleKn: 'ಪ್ರಬುದ್ಧ ಸಾಗರೋತ್ತರ ವಿದ್ಯಾರ್ಥಿವೇತನ (SC/ST)',
    classReqEn: 'UG/PG/PhD Abroad',
    classReqKn: 'ವಿದೇಶದಲ್ಲಿ ಪದವಿ/ಸ್ನಾತಕೋತ್ತರ/ಪಿಎಚ್‌ಡಿ',
    incomeLimitEn: '₹8 Lakh/year',
    incomeLimitKn: '₹8 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-09-30',
    openDate: null,
    link: 'https://ssp.postmatric.karnataka.gov.in/'
  },
  {
    id: 'colgate-keep-smiling',
    titleEn: 'Keep India Smiling Foundational Scholarship',
    titleKn: 'ಕೀಪ್ ಇಂಡಿಯಾ ಸ್ಮೈಲಿಂಗ್ ವಿದ್ಯಾರ್ಥಿವೇತನ (Colgate)',
    classReqEn: 'Class 11 to UG',
    classReqKn: '೧೧ನೇ ತರಗತಿಯಿಂದ ಪದವಿ',
    incomeLimitEn: '₹5 Lakh/year',
    incomeLimitKn: '₹5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-12-31',
    openDate: null,
    link: 'https://www.buddy4study.com/'
  },
  {
    id: 'loreal-women-science',
    titleEn: "L'Oréal India For Young Women In Science",
    titleKn: 'ಲೋರಿಯಲ್ ಇಂಡಿಯಾ ಯಂಗ್ ವುಮೆನ್ ಇನ್ ಸೈನ್ಸ್',
    classReqEn: '12th Pass (Science) girls',
    classReqKn: '೧೨ನೇ ಉತ್ತೀರ್ಣ (ವಿಜ್ಞಾನ) ವಿದ್ಯಾರ್ಥಿನಿಯರು',
    incomeLimitEn: '₹6 Lakh/year',
    incomeLimitKn: '₹6 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-10-15',
    openDate: null,
    link: 'https://www.buddy4study.com/'
  },
  {
    id: 'santoor-women',
    titleEn: "Santoor Women's Scholarship",
    titleKn: 'ಸಂತೂರ್ ಮಹಿಳಾ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: '12th Pass (Govt School) girls',
    classReqKn: '೧೨ನೇ ಉತ್ತೀರ್ಣ (ಸರ್ಕಾರಿ ಶಾಲೆ) ವಿದ್ಯಾರ್ಥಿನಿಯರು',
    incomeLimitEn: 'Preference to lower income',
    incomeLimitKn: 'ಕಡಿಮೆ ಆದಾಯದವರಿಗೆ ಆದ್ಯತೆ',
    deadline: '2026-09-15',
    openDate: null,
    link: 'https://www.santoorscholarships.com/'
  },
  {
    id: 'pre-matric-minority',
    titleEn: 'Pre-Matric Scholarship for Minorities',
    titleKn: 'ಅಲ್ಪಸಂಖ್ಯಾತರಿಗೆ ಮೆಟ್ರಿಕ್ ಪೂರ್ವ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: 'Class 1 to 10',
    classReqKn: '೧ ರಿಂದ ೧೦ನೇ ತರಗತಿ',
    incomeLimitEn: '₹1 Lakh/year',
    incomeLimitKn: '₹1 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'jk-tyre-shiksha',
    titleEn: 'JK Tyre Shiksha Sarthi Scholarship',
    titleKn: 'ಜೆಕೆ ಟೈರ್ ಶಿಕ್ಷಾ ಸಾರಥಿ (ಚಾಲಕರ ಮಕ್ಕಳಿಗೆ)',
    classReqEn: 'UG/Diploma (Daughters of CV drivers)',
    classReqKn: 'ಪದವಿ/ಡಿಪ್ಲೊಮಾ (ಚಾಲಕರ ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ)',
    incomeLimitEn: 'No strict limit',
    incomeLimitKn: 'ನಿರ್ದಿಷ್ಟ ಮಿತಿಯಿಲ್ಲ',
    deadline: '2026-11-30',
    openDate: null,
    link: 'https://www.buddy4study.com/'
  },
  {
    id: 'nmmss',
    titleEn: 'National Means-cum-Merit (NMMSS)',
    titleKn: 'ರಾಷ್ಟ್ರೀಯ ಮೀನ್ಸ್-ಕಮ್-ಮೆರಿಟ್ (NMMSS)',
    classReqEn: '8th–12th Class',
    classReqKn: '೮ ರಿಂದ ೧೨ನೇ ತರಗತಿ',
    incomeLimitEn: '₹3.5 Lakh/year',
    incomeLimitKn: '₹3.5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'aicte-pragati',
    titleEn: 'AICTE Pragati Scholarship for Girls',
    titleKn: 'AICTE ಪ್ರಗತಿ ಹೆಣ್ಣುಮಕ್ಕಳ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: 'Diploma / UG (Technical)',
    classReqKn: 'ಡಿಪ್ಲೊಮಾ / ತಾಂತ್ರಿಕ ಪದವಿ (BE)',
    incomeLimitEn: '₹8.0 Lakh/year',
    incomeLimitKn: '₹8.0 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2025-03-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'pm-yasasvi',
    titleEn: 'PM-YASASVI Scholarship Scheme',
    titleKn: 'ಪಿಎಂ-ಯಶಸ್ವಿ ಯೋಜನೆ (PM-YASASVI)',
    classReqEn: '9th–12th / UG',
    classReqKn: '೯ ರಿಂದ ೧೨ನೇ / ಪದವಿ',
    incomeLimitEn: '₹2.5 Lakh/year',
    incomeLimitKn: '₹2.5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'pm-usp',
    titleEn: 'PM-USP Central Sector Scholarship',
    titleKn: 'ಪಿಎಂ-ಯುಎಸ್‌ಪಿ ಸೆಂಟ್ರಲ್ ಸೆಕ್ಟರ್ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: '12th Pass / UG / PG',
    classReqKn: '೧೨ನೇ ಉತ್ತೀರ್ಣ / ಪದವಿ / ಪಿಜಿ',
    incomeLimitEn: '₹4.5 Lakh/year',
    incomeLimitKn: '₹4.5 ಲಕ್ಷ/ವರ್ಷ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'pmss-defence',
    titleEn: 'PM Scholarship Scheme (PMSS) — Ex-Servicemen',
    titleKn: 'ಪಿಎಂ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಯೋಜನೆ (PMSS) — ರಕ್ಷಣಾ ಪಡೆ',
    classReqEn: 'Professional UG (BE, MBBS)',
    classReqKn: 'ವೃತ್ತಿಪರ ಪದವಿಗಳು (BE, MBBS)',
    incomeLimitEn: 'Ex-Servicemen Wards',
    incomeLimitKn: 'ಮಾಜಿ ಸೈನಿಕರ ಮಕ್ಕಳಿಗೆ',
    deadline: '2026-12-31',
    openDate: null,
    link: 'https://ksb.gov.in/'
  },
  {
    id: 'post-matric-scst',
    titleEn: 'Post-Matric SC/ST Scholarship',
    titleKn: 'ಮೆಟ್ರಿಕ್ ನಂತರದ SC/ST ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: '11th / 12th / UG / PG',
    classReqKn: '೧೧ನೇ / ೧೨ನೇ / ಪದವಿ / ಪಿಜಿ',
    incomeLimitEn: 'Below ₹2.5 Lakh/year',
    incomeLimitKn: '₹2.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ',
    deadline: '2025-03-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'aicte-swanath',
    titleEn: 'AICTE Swanath Scholarship',
    titleKn: 'AICTE ಸ್ವನಾಥ್ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: 'UG Degree / Diploma / Tech',
    classReqKn: 'ಪದವಿ / ಡಿಪ್ಲೊಮಾ / ತಾಂತ್ರಿಕ',
    incomeLimitEn: 'Above ₹8.0 Lakh / Open to Orphans',
    incomeLimitKn: '₹8.0 ಲಕ್ಷ ಮೀರದ / ಅನಾಥರಿಗೆ ಮುಕ್ತ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'inspire-she',
    titleEn: 'INSPIRE Scholarship for Higher Education (SHE)',
    titleKn: 'INSPIRE ಉನ್ನತ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿವೇತನ (SHE)',
    classReqEn: 'Basic/Natural Sciences UG/PG',
    classReqKn: 'ಮೂಲ ವಿಜ್ಞಾನ UG/PG',
    incomeLimitEn: 'Merit-based — ₹80,000/year',
    incomeLimitKn: 'ಮೆರಿಟ್ ಆಧಾರ — ₹80,000/ವರ್ಷ',
    deadline: '2026-11-01',
    openDate: '2026-11-01',
    link: 'https://online-inspire.gov.in/'
  },
  {
    id: 'aicte-saksham',
    titleEn: 'AICTE Saksham Scholarship (Differently-Abled)',
    titleKn: 'AICTE ಸಕ್ಷಮ್ ವಿದ್ಯಾರ್ಥಿವೇತನ (ವಿಕಲಚೇತನ)',
    classReqEn: 'Technical Diploma / UG Degree',
    classReqKn: 'ತಾಂತ್ರಿಕ ಡಿಪ್ಲೊಮಾ / ಪದವಿ',
    incomeLimitEn: '₹8.0 Lakh/year — ₹50,000/year award',
    incomeLimitKn: '₹8.0 ಲಕ್ಷ/ವರ್ಷ — ₹50,000/ವರ್ಷ ಪ್ರಶಸ್ತಿ',
    deadline: '2024-12-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'ugc-pg',
    titleEn: 'National Fellowship for PG Studies (UGC)',
    titleKn: 'PG ಅಧ್ಯಯನಕ್ಕೆ ರಾಷ್ಟ್ರೀಯ ಫೆಲೋಶಿಪ್ (UGC)',
    classReqEn: 'Postgraduate (PG)',
    classReqKn: 'ಸ್ನಾತಕೋತ್ತರ (PG)',
    incomeLimitEn: 'Merit-based — ₹15,000/month',
    incomeLimitKn: 'ಮೆರಿಟ್ ಆಧಾರ — ₹15,000/ತಿಂಗಳು',
    deadline: '2025-01-31',
    openDate: null,
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'manf',
    titleEn: 'Maulana Azad National Fellowship (MANF)',
    titleKn: 'ಮೌಲಾನಾ ಆಜಾದ್ ರಾಷ್ಟ್ರೀಯ ಫೆಲೋಶಿಪ್ (MANF)',
    classReqEn: 'Minority Research Scholars (M.Phil/PhD)',
    classReqKn: 'ಅಲ್ಪಸಂಖ್ಯಾತ ಸಂಶೋಧನಾ ವಿದ್ಯಾರ್ಥಿಗಳು (M.Phil/PhD)',
    incomeLimitEn: 'As per UGC norms',
    incomeLimitKn: 'UGC ನಿಯಮಗಳ ಪ್ರಕಾರ',
    deadline: null,
    openDate: '2027-01-01',
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'hdfc-ecss',
    titleEn: 'HDFC Bank Parivartan ECSS Scholarship',
    titleKn: 'HDFC ಬ್ಯಾಂಕ್ ಪರಿವರ್ತನ್ ECSS ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: 'Class 6 to Postgraduate',
    classReqKn: '6ನೇ ತರಗತಿಯಿಂದ ಸ್ನಾತಕೋತ್ತರ',
    incomeLimitEn: '₹2.5 Lakh/year — up to ₹75,000 award',
    incomeLimitKn: '₹2.5 ಲಕ್ಷ/ವರ್ಷ — ₹75,000 ವರೆಗೆ ಪ್ರಶಸ್ತಿ',
    deadline: '2026-10-31',
    openDate: null,
    link: 'https://www.buddy4study.com/'
  },
  {
    id: 'sbi-asha',
    titleEn: 'SBI Foundation Asha Scholarship',
    titleKn: 'SBI ಫೌಂಡೇಶನ್ ಆಶಾ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    classReqEn: 'Class 6 to Undergraduate',
    classReqKn: '6ನೇ ತರಗತಿಯಿಂದ ಪದವಿ',
    incomeLimitEn: '₹3.0 Lakh/year — ₹15,000 to ₹5,00,000 award',
    incomeLimitKn: '₹3.0 ಲಕ್ಷ/ವರ್ಷ — ₹15,000 ರಿಂದ ₹5,00,000',
    deadline: '2026-09-19',
    openDate: null,
    link: 'https://www.buddy4study.com/'
  }
];

async function updateFirestore() {
  console.log("Seeding Firestore scholarships...");
  try {
    for (const sch of scholarships) {
      await setDoc(doc(collection(db, 'scholarships'), sch.id), sch);
      console.log(`Added document: ${sch.id}`);
    }
    console.log("Firestore scholarships seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating Firestore:", error);
    process.exit(1);
  }
}

updateFirestore();
