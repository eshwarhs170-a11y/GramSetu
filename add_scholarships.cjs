const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/components/VillagerScreens.jsx');
let content = fs.readFileSync(file, 'utf8');

const newArray = `[
              {
                title: lang === 'kn' ? 'ರೈತ ವಿದ್ಯಾநிதி ಯೋಜನೆ' : 'Rytha Vidyanidhi Yojane',
                amount: '₹2,500 - ₹11,000 / Year',
                eligibility: lang === 'kn' ? 'ನೋಂದಾಯಿತ ರೈತರ ಮಕ್ಕಳು (FRUITS ID)' : 'Children of registered farmers in Karnataka',
                source: t('sspPortal'),
                link: 'https://ssp.postmatric.karnataka.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ರಾಷ್ಟ್ರೀಯ ಸಾಧನ-ಮತ್ತು-ಮೆರಿಟ್ (NMMSS)' : 'National Means-cum-Merit (NMMSS)',
                amount: '₹12,000 / Year',
                eligibility: lang === 'kn' ? 'ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು (9-12)' : 'School students with financial need and merit (Class 9-12)',
                source: 'NSP Portal',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಮೆಟ್ರಿಕ್-ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ (SC/ST/OBC)' : 'Post-Matric Scholarship (SC/ST/OBC)',
                amount: 'Fee Support + Maintenance',
                eligibility: lang === 'kn' ? '10ನೇ ತರಗತಿ ನಂತರದ SC/ST/OBC ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Eligible SC/ST/OBC students after Class 10 (UG/PG)',
                source: 'NSP / SSP Portal',
                link: 'https://ssp.postmatric.karnataka.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಕೇಂದ್ರ ವಲಯದ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ (CSSS)' : 'Central Sector Scheme of Scholarship (CSSS)',
                amount: '₹10,000 - ₹20,000 / Year',
                eligibility: lang === 'kn' ? 'ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬಗಳ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು (UG/PG)' : 'Meritorious students from lower-income families (UG/PG)',
                source: 'NSP Portal',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಪಿಎಂ ಯಶಸ್ವಿ ಯೋಜನೆ (PM YASASVI)' : 'PM YASASVI Scheme',
                amount: '₹75,000 - ₹1,25,000 / Year',
                eligibility: lang === 'kn' ? 'OBC, EBC ಮತ್ತು DNT ವಿದ್ಯಾರ್ಥಿಗಳು' : 'OBC, EBC and DNT students (School / Higher ed)',
                source: 'NTA / NSP Portal',
                link: 'https://yet.nta.ac.in/'
              },
              {
                title: lang === 'kn' ? 'AICTE ಪ್ರಗತಿ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'AICTE Pragati Scholarship for Girls',
                amount: '₹50,000 / Year',
                eligibility: lang === 'kn' ? 'ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಓದುತ್ತಿರುವ ಹುಡುಗಿಯರು' : 'Girls studying eligible technical diploma/degree courses',
                source: 'AICTE / NSP',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'AICTE ಸಕ್ಷಮ್ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'AICTE Saksham Scholarship',
                amount: '₹50,000 / Year',
                eligibility: lang === 'kn' ? 'ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣದಲ್ಲಿ ಅಂಗವಿಕಲ ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Eligible students with disabilities in technical education',
                source: 'AICTE / NSP',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಇನ್‌ಸ್ಪೈರ್ ವಿದ್ಯಾರ್ಥಿವೇತನ (SHE)' : 'INSPIRE Scholarship (SHE)',
                amount: '₹80,000 / Year',
                eligibility: lang === 'kn' ? 'ಮೂಲ ವಿಜ್ಞಾನದಲ್ಲಿ ಉನ್ನತ ಶಿಕ್ಷಣ (UG/PG)' : 'Students pursuing eligible basic/natural sciences with merit',
                source: 'DST Portal',
                link: 'https://online-inspire.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಪಿಜಿ ಅಧ್ಯಯನಕ್ಕೆ ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'National Scholarship for PG Studies',
                amount: '₹15,000 / Month',
                eligibility: lang === 'kn' ? 'ಪ್ರತಿಭಾವಂತ ಸ್ನಾತಕೋತ್ತರ ವಿದ್ಯಾರ್ಥಿಗಳು (PG)' : 'Eligible meritorious postgraduate students',
                source: 'UGC / NSP',
                link: 'https://scholarships.gov.in/'
              },
              {
                title: lang === 'kn' ? 'ಮೌಲಾನಾ ಆಜಾದ್ ಫೆಲೋಶಿಪ್ (MANF)' : 'Maulana Azad National Fellowship (MANF)',
                amount: 'Fellowship amount',
                eligibility: lang === 'kn' ? 'ಅಲ್ಪಸಂಖ್ಯಾತ ಸಂಶೋಧನಾ ವಿದ್ವಾಂಸರು' : 'Eligible minority research scholars',
                source: 'UGC',
                link: 'https://ugc.ac.in/'
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
            ]`;

const regex = /\[\s*\{\s*title: lang === 'kn' \? 'ರೈತ ವಿದ್ಯಾநிதி ಯೋಜನೆ'[\s\S]*?\]/;

if (regex.test(content)) {
  content = content.replace(regex, newArray);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Scholarships successfully added!');
} else {
  console.log('Regex match failed!');
}
